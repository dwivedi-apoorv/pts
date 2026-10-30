import { beforeEach, describe, expect, it, vi } from 'vitest';

const ME = '00000000-0000-4000-8000-000000000001';
const OTHER_ADMIN = '00000000-0000-4000-8000-000000000002';
const LEARNER = '00000000-0000-4000-8000-000000000003';

type M = {
  id: string;
  email: string;
  role: 'admin' | 'learner';
  active: boolean;
  auth_user_id: string | null;
  full_name: null;
};
let members: M[];
let authCalls: string[];
let deleted: string[];

function db() {
  const q = (table: string) => {
    const f: Record<string, unknown> = {};
    const b: Record<string, unknown> = {
      select: () => b,
      eq: (c: string, v: unknown) => ((f[c] = v), b),
      maybeSingle: async () => ({
        data:
          members.find((m) =>
            Object.entries(f).every(([k, v]) => (m as never)[k] === v),
          ) ?? null,
      }),
      delete: () => ({
        eq: async (_c: string, id: string) => (
          deleted.push(id),
          { error: null }
        ),
      }),
      insert: async () => ({ error: null }),
      update: () => ({ eq: async () => ({ error: null }) }),
      then: (res: (v: unknown) => unknown) =>
        res({
          data: members
            .filter((m) =>
              Object.entries(f).every(([k, v]) => (m as never)[k] === v),
            )
            .map((m) => ({ id: m.id })),
        }),
    };
    void table;
    return b;
  };
  return {
    from: q,
    auth: {
      admin: {
        updateUserById: async (id: string, body: unknown) => (
          authCalls.push(`update:${id}:${JSON.stringify(body)}`),
          { error: null }
        ),
        deleteUser: async (id: string) => (
          authCalls.push(`delete:${id}`),
          { error: null }
        ),
      },
    },
  };
}

beforeEach(() => {
  members = [
    {
      id: ME,
      email: 'me@x.com',
      role: 'admin',
      active: true,
      auth_user_id: 'a1',
      full_name: null,
    },
    {
      id: OTHER_ADMIN,
      email: 'two@x.com',
      role: 'admin',
      active: true,
      auth_user_id: 'a2',
      full_name: null,
    },
    {
      id: LEARNER,
      email: 'l@x.com',
      role: 'learner',
      active: true,
      auth_user_id: 'a3',
      full_name: null,
    },
  ];
  authCalls = [];
  deleted = [];
  vi.resetModules();
  vi.doMock('next/cache', () => ({ revalidatePath: vi.fn() }));
  vi.doMock('@/lib/auth', () => ({
    requireAdmin: async () => ({ member: { id: ME, email: 'me@x.com' } }),
  }));
  vi.doMock('../src/lib/auth', () => ({
    requireAdmin: async () => ({ member: { id: ME, email: 'me@x.com' } }),
  }));
  vi.doMock('../src/lib/supabase/admin', () => ({
    createAdminClient: () => db(),
  }));
  vi.doMock('../src/lib/admin/audit', () => ({ logAudit: vi.fn() }));
  vi.doMock('../src/lib/auth/otp-deps', () => ({ ensureAuthUser: vi.fn() }));
});

const actions = () => import('../src/lib/admin/actions');

describe('admin guard rails through the real actions', () => {
  it('blocks deleting, deactivating or demoting yourself', async () => {
    const a = await actions();
    for (const r of [
      await a.deleteMember(ME),
      await a.setMemberActive(ME, false),
      await a.updateMember({ id: ME, email: 'me@x.com', role: 'learner' }),
    ]) {
      expect(r.ok).toBe(false);
      expect(r.ok ? '' : r.message).toMatch(/your own account/);
    }
    expect(authCalls).toEqual([]);
    expect(deleted).toEqual([]);
  });

  it('blocks removing the last active admin', async () => {
    members[0].active = false; // only OTHER_ADMIN is active
    const a = await actions();
    const r = await a.deleteMember(OTHER_ADMIN);
    expect(r.ok ? '' : r.message).toMatch(/last active admin/);
    expect((await a.setMemberActive(OTHER_ADMIN, false)).ok).toBe(false);
    expect(
      (
        await a.updateMember({
          id: OTHER_ADMIN,
          email: 'two@x.com',
          role: 'learner',
        })
      ).ok,
    ).toBe(false);
    expect(deleted).toEqual([]);
  });

  it('deactivating bans the sign-in account, reactivating lifts it', async () => {
    const a = await actions();
    expect((await a.setMemberActive(LEARNER, false)).ok).toBe(true);
    expect((await a.setMemberActive(LEARNER, true)).ok).toBe(true);
    expect(authCalls).toEqual([
      'update:a3:{"ban_duration":"876000h"}',
      'update:a3:{"ban_duration":"none"}',
    ]);
  });

  it('deleting removes the auth user (which cascades progress) and the member', async () => {
    const a = await actions();
    expect((await a.deleteMember(LEARNER)).ok).toBe(true);
    expect(authCalls).toEqual(['delete:a3']);
    expect(deleted).toEqual([LEARNER]);
  });

  it('refuses to give a member a role that does not exist', async () => {
    const a = await actions();
    const res = await a.addMember({
      email: 'new@x.com',
      role: 'learner',
      role_id: '00000000-0000-4000-8000-0000000000ee',
    });
    expect(res.ok ? '' : res.message).toMatch(/role no longer exists/);
    const upd = await a.updateMember({
      id: LEARNER,
      email: 'l@x.com',
      role: 'learner',
      role_id: '00000000-0000-4000-8000-0000000000ee',
    });
    expect(upd.ok ? '' : upd.message).toMatch(/role no longer exists/);
  });

  it('rejects a malformed role id', async () => {
    const a = await actions();
    expect(
      (
        await a.addMember({
          email: 'new@x.com',
          role: 'learner',
          role_id: 'not-a-uuid',
        })
      ).ok,
    ).toBe(false);
  });

  it('rejects malformed ids and input', async () => {
    const a = await actions();
    expect((await a.deleteMember('not-a-uuid')).ok).toBe(false);
    expect((await a.addMember({ email: 'nope', role: 'learner' })).ok).toBe(
      false,
    );
    expect(
      (await a.addMember({ email: 'a@x.com', role: 'boss' as never })).ok,
    ).toBe(false);
  });
});
