import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  LIMITS,
  MESSAGES,
  requestOtpCore,
  type Member,
  type OtpDeps,
} from '../src/lib/auth/request-otp';
import { safeNext } from '../src/lib/redirect';

const member: Member = {
  id: 'm1',
  email: 'ann@example.com',
  active: true,
  role: 'learner',
  auth_user_id: null,
};

function makeDeps(overrides: Partial<OtpDeps> & { members?: Member[] } = {}) {
  const log: { email: string; ip: string | null; at: Date }[] = [];
  const members = overrides.members ?? [member];
  const deps: OtpDeps = {
    now: () => new Date('2026-01-01T12:00:00Z'),
    revealUnregistered: true,
    countRequests: vi.fn(
      async (f, since) =>
        log.filter(
          (r) =>
            r.at >= since &&
            (f.email ? r.email === f.email : true) &&
            (f.ip ? r.ip === f.ip : true),
        ).length,
    ),
    recordRequest: vi.fn(async (email, ip) => {
      log.push({ email, ip, at: new Date('2026-01-01T12:00:00Z') });
    }),
    cleanupOld: vi.fn(async () => {}),
    findMember: vi.fn(
      async (email) => members.find((m) => m.email === email) ?? null,
    ),
    ensureAuthUser: vi.fn(async () => {}),
    sendOtp: vi.fn(async () => ({})),
    ...overrides,
  };
  return { deps, log };
}

describe('requestOtpCore', () => {
  it('never sends for an unknown email', async () => {
    const { deps } = makeDeps();
    const res = await requestOtpCore(deps, 'nobody@example.com', '1.1.1.1');
    expect(res).toEqual({ ok: false, message: MESSAGES.notRegistered });
    expect(deps.sendOtp).not.toHaveBeenCalled();
    expect(deps.ensureAuthUser).not.toHaveBeenCalled();
  });

  it('never sends for an inactive member', async () => {
    const { deps } = makeDeps({ members: [{ ...member, active: false }] });
    const res = await requestOtpCore(deps, 'ann@example.com', null);
    expect(res.ok).toBe(false);
    expect(deps.sendOtp).not.toHaveBeenCalled();
  });

  it('returns the generic message when REVEAL_UNREGISTERED is false', async () => {
    const { deps } = makeDeps({ revealUnregistered: false });
    const res = await requestOtpCore(deps, 'nobody@example.com', null);
    expect(res).toEqual({ ok: true, message: MESSAGES.generic });
    expect(deps.sendOtp).not.toHaveBeenCalled();
  });

  it('sends for an active member, normalising case and spaces', async () => {
    const { deps } = makeDeps();
    const res = await requestOtpCore(deps, '  ANN@Example.com ', null);
    expect(res.ok).toBe(true);
    expect(deps.ensureAuthUser).toHaveBeenCalledWith(member);
    expect(deps.sendOtp).toHaveBeenCalledWith('ann@example.com');
  });

  it('rejects an invalid email without touching the database', async () => {
    const { deps } = makeDeps();
    const res = await requestOtpCore(deps, 'not-an-email', null);
    expect(res.ok).toBe(false);
    expect(deps.recordRequest).not.toHaveBeenCalled();
  });

  it('allows only one request per email per minute', async () => {
    const { deps } = makeDeps();
    expect((await requestOtpCore(deps, 'ann@example.com', null)).ok).toBe(true);
    const second = await requestOtpCore(deps, 'ann@example.com', null);
    expect(second).toEqual({ ok: false, message: MESSAGES.throttled });
    expect(deps.sendOtp).toHaveBeenCalledTimes(1);
  });

  it('limits requests per email per hour', async () => {
    const { deps, log } = makeDeps();
    const base = new Date('2026-01-01T12:00:00Z').getTime();
    for (let i = 1; i <= LIMITS.emailPerHour; i++) {
      log.push({
        email: 'ann@example.com',
        ip: null,
        at: new Date(base - (i * 600 + 60) * 1000 + 3000 * 1000),
      });
    }
    // all five are older than 60s but inside the hour
    const old = log.map((r) => ({ ...r, at: new Date(base - 120_000) }));
    log.splice(0, log.length, ...old);
    const res = await requestOtpCore(deps, 'ann@example.com', null);
    expect(res).toEqual({ ok: false, message: MESSAGES.tooMany });
    expect(deps.sendOtp).not.toHaveBeenCalled();
  });

  it('limits requests per IP per hour, even for unknown emails', async () => {
    const { deps, log } = makeDeps();
    const base = new Date('2026-01-01T12:00:00Z').getTime();
    for (let i = 0; i < LIMITS.ipPerHour; i++) {
      log.push({
        email: `u${i}@example.com`,
        ip: '9.9.9.9',
        at: new Date(base - 120_000),
      });
    }
    const res = await requestOtpCore(deps, 'other@example.com', '9.9.9.9');
    expect(res).toEqual({ ok: false, message: MESSAGES.tooMany });
    // a different IP is unaffected
    expect((await requestOtpCore(deps, 'ann@example.com', '8.8.8.8')).ok).toBe(
      true,
    );
  });

  it('turns a Supabase rate-limit error into the friendly throttle message', async () => {
    const { deps } = makeDeps({
      sendOtp: vi.fn(async () => ({
        error: { message: 'email rate limit exceeded', status: 429 },
      })),
    });
    const res = await requestOtpCore(deps, 'ann@example.com', null);
    expect(res).toEqual({ ok: false, message: MESSAGES.throttled });
  });
});

describe('safeNext', () => {
  it('keeps relative paths', () => {
    expect(safeNext('/courses/seo-basics?x=1')).toBe('/courses/seo-basics?x=1');
  });
  it.each([
    'https://evil.com',
    '//evil.com',
    '/\\evil.com',
    'javascript:alert(1)',
    'courses',
    '/ok\nhttps://evil.com',
    undefined,
    42,
  ])('rejects %s', (v) => {
    expect(safeNext(v)).toBe('/');
  });
});

describe('requireMember', () => {
  const redirect = vi.fn((to: string) => {
    throw new Error(`REDIRECT:${to}`);
  });
  let user: { id: string; email: string } | null;
  let row: Record<string, unknown> | null;

  beforeEach(() => {
    vi.resetModules();
    redirect.mockClear();
    user = { id: 'u1', email: 'ann@example.com' };
    row = {
      id: 'm1',
      email: 'ann@example.com',
      full_name: 'Ann',
      role: 'learner',
      active: true,
      auth_user_id: 'u1',
    };
    vi.doMock('next/navigation', () => ({ redirect }));
    vi.doMock('next/server', () => ({ connection: async () => {} }));
    vi.doMock('react', () => ({ cache: <T>(fn: T) => fn }));
    vi.doMock('../src/lib/supabase/server', () => ({
      createClient: async () => ({
        auth: { getUser: async () => ({ data: { user }, error: null }) },
        from: () => ({
          select: () => ({
            eq: () => ({ maybeSingle: async () => ({ data: row }) }),
          }),
        }),
      }),
    }));
  });

  it('returns the member when active', async () => {
    const { requireMember } = await import('../src/lib/auth/session');
    const res = await requireMember();
    expect(res.member.role).toBe('learner');
  });

  it('rejects inactive members', async () => {
    row!.active = false;
    const { requireMember } = await import('../src/lib/auth/session');
    await expect(requireMember()).rejects.toThrow(
      'REDIRECT:/login?reason=not-registered',
    );
  });

  it('rejects users without a member row', async () => {
    row = null;
    const { requireMember } = await import('../src/lib/auth/session');
    await expect(requireMember()).rejects.toThrow(
      'REDIRECT:/login?reason=not-registered',
    );
  });

  it('redirects signed-out visitors to /login', async () => {
    user = null;
    const { requireMember } = await import('../src/lib/auth/session');
    await expect(requireMember()).rejects.toThrow('REDIRECT:/login');
  });

  it('requireAdmin rejects learners and accepts admins', async () => {
    const { requireAdmin } = await import('../src/lib/auth/session');
    await expect(requireAdmin()).rejects.toThrow('REDIRECT:/');
    row!.role = 'admin';
    await expect(requireAdmin()).resolves.toBeTruthy();
  });
});
