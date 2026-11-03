import fs from 'node:fs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  allowedSlugs,
  filterGlossary,
  filterRecords,
  isMissingSchema,
} from '../src/lib/access-calc';
import { validateImport } from '../src/lib/admin/csv';
import {
  computeTeam,
  filterAndSort,
  needsNudge,
  summarise,
  type MemberRow,
  type ProgressRow,
} from '../src/lib/admin/stats';
import { buildGlossary, buildSearchRecords } from '../src/lib/content/build';
import { loadCourses } from '../src/lib/content/load';
import { ONBOARDING_SLUG } from '../src/lib/constants';
import type { Course } from '../src/lib/content/types';

const ALL = ['onb', 'seo', 'cyber'];

describe('allowedSlugs', () => {
  const base = { allSlugs: ALL, forEveryone: ['cyber'], roleCourses: ['seo'] };
  it('gives admins every course', () => {
    expect([...allowedSlugs({ ...base, isAdmin: true })].sort()).toEqual([
      'cyber',
      'onb',
      'seo',
    ]);
  });
  it('gives others their role courses plus courses for everyone', () => {
    expect([...allowedSlugs({ ...base, isAdmin: false })].sort()).toEqual([
      'cyber',
      'seo',
    ]);
  });
  it('gives a member with no role only the courses for everyone', () => {
    expect([
      ...allowedSlugs({ ...base, isAdmin: false, roleCourses: [] }),
    ]).toEqual(['cyber']);
  });
  it('gives a member with no role and no everyone-courses nothing', () => {
    expect(
      allowedSlugs({
        ...base,
        isAdmin: false,
        roleCourses: [],
        forEveryone: [],
      }).size,
    ).toBe(0);
  });
  it('ignores slugs of courses that no longer exist', () => {
    const s = allowedSlugs({
      ...base,
      isAdmin: false,
      roleCourses: ['deleted-course'],
      forEveryone: ['also-gone'],
    });
    expect(s.size).toBe(0);
  });
});

describe('filtering content by access', () => {
  const courses = loadCourses();
  const allowed = new Set(['cyber-security-basics']);

  it('search records only come from allowed courses', () => {
    const out = filterRecords(buildSearchRecords(courses), allowed);
    expect(out.length).toBeGreaterThan(0);
    expect(out.every((r) => allowed.has(r.courseSlug))).toBe(true);
  });

  it('glossary drops definitions and terms from courses the member cannot see', () => {
    const out = filterGlossary(buildGlossary(courses), allowed);
    expect(out.length).toBeGreaterThan(0);
    for (const e of out)
      for (const d of e.definitions)
        for (const c of d.courses) expect(allowed.has(c.slug)).toBe(true);
    // "ROAS" only appears in other courses, so it must be gone
    expect(out.some((e) => e.term.toLowerCase() === 'roas')).toBe(false);
  });

  it('an empty allowance leaks nothing', () => {
    expect(filterRecords(buildSearchRecords(courses), new Set())).toEqual([]);
    expect(filterGlossary(buildGlossary(courses), new Set())).toEqual([]);
  });
});

describe('isMissingSchema', () => {
  it('recognises the errors you get before migration 0002 has been run', () => {
    expect(isMissingSchema({ code: '42703' })).toBe(true);
    expect(isMissingSchema({ code: '42P01' })).toBe(true);
    expect(
      isMissingSchema({
        code: 'PGRST205',
        message: 'Could not find the table',
      }),
    ).toBe(true);
    expect(
      isMissingSchema({ message: 'column members.role_id does not exist' }),
    ).toBe(true);
    expect(isMissingSchema({ code: '23505', message: 'duplicate key' })).toBe(
      false,
    );
    expect(isMissingSchema(null)).toBe(false);
  });
});

describe('getAllowedSlugs (server)', () => {
  type R = { data: unknown; error: { code?: string; message?: string } | null };
  let tables: Record<string, R>;
  let role: 'admin' | 'learner';

  beforeEach(() => {
    vi.resetModules();
    role = 'learner';
    tables = {
      course_settings: {
        data: [{ course_slug: 'cyber-security-basics' }],
        error: null,
      },
      members: { data: { role_id: 'r1' }, error: null },
      role_courses: { data: [{ course_slug: 'seo-basics' }], error: null },
    };
    vi.doMock('react', () => ({ cache: <T>(fn: T) => fn }));
    vi.doMock('next/navigation', () => ({
      notFound: () => {
        throw new Error('NOT_FOUND');
      },
    }));
    vi.doMock('../src/lib/auth', () => ({
      requireMember: async () => ({ member: { id: 'm1', role } }),
    }));
    vi.doMock('../src/lib/supabase/admin', () => ({
      createAdminClient: () => ({
        from: (t: string) => {
          const b: Record<string, unknown> = {
            select: () => b,
            eq: () => b,
            maybeSingle: async () => tables[t],
            then: (res: (v: unknown) => unknown) => res(tables[t]),
          };
          return b;
        },
      }),
    }));
  });

  it("returns the role's courses plus courses for everyone", async () => {
    const { getAllowedSlugs } = await import('../src/lib/access');
    expect([...(await getAllowedSlugs())].sort()).toEqual([
      'cyber-security-basics',
      'seo-basics',
    ]);
  });

  it('gives admins every course without reading roles', async () => {
    role = 'admin';
    const { getAllowedSlugs } = await import('../src/lib/access');
    expect((await getAllowedSlugs()).size).toBe(loadCourses().length);
  });

  it('keeps everything visible until the migration has been run', async () => {
    tables.course_settings = {
      data: null,
      error: { code: 'PGRST205', message: 'Could not find the table' },
    };
    const { getAllowedSlugs } = await import('../src/lib/access');
    expect((await getAllowedSlugs()).size).toBe(loadCourses().length);
  });

  it('fails closed on any other database error', async () => {
    tables.course_settings = {
      data: null,
      error: { code: '57014', message: 'timeout' },
    };
    const { getAllowedSlugs } = await import('../src/lib/access');
    await expect(getAllowedSlugs()).rejects.toMatchObject({ code: '57014' });
  });

  it('shows a 404 for a course that is not assigned', async () => {
    const { requireCourseAccess } = await import('../src/lib/access');
    await expect(
      requireCourseAccess('performance-marketing-basics'),
    ).rejects.toThrow('NOT_FOUND');
    await expect(requireCourseAccess('seo-basics')).resolves.toBeUndefined();
  });
});

describe('team statistics with roles', () => {
  const mk = (slug: string, chs: string[]) =>
    ({
      slug,
      chapters: chs.map((s, i) => ({ slug: s, index: i + 1 })),
    }) as unknown as Course;
  const courses = [
    mk(ONBOARDING_SLUG, ['a', 'b']),
    mk('seo', ['x', 'y']),
    mk('cyber', ['p', 'q']),
  ];
  const m = (id: string, o: Partial<MemberRow> = {}): MemberRow => ({
    id,
    email: `${id}@x.com`,
    full_name: id,
    role: 'learner',
    active: true,
    auth_user_id: `u-${id}`,
    last_login_at: null,
    created_at: '2026-01-01T00:00:00Z',
    role_id: null,
    ...o,
  });
  const prog = (u: string, course: string, ch: string): ProgressRow => ({
    user_id: `u-${u}`,
    course_slug: course,
    chapter_slug: ch,
    completed_at: '2026-02-01T00:00:00Z',
  });
  const access = {
    forEveryone: ['cyber'],
    byRole: { dev: ['seo'], pm: [ONBOARDING_SLUG, 'seo'] },
  };

  const team = computeTeam({
    courses,
    members: [
      m('dev', { role_id: 'dev' }),
      m('pm', { role_id: 'pm' }),
      m('norole'),
      m('boss', { role: 'admin' }),
    ],
    progress: [
      prog('dev', 'seo', 'x'),
      prog('dev', ONBOARDING_SLUG, 'a'),
      prog('pm', ONBOARDING_SLUG, 'a'),
      prog('pm', ONBOARDING_SLUG, 'b'),
    ],
    activity: [],
    access,
  });
  const get = (id: string) => team.find((t) => t.id === id)!;

  it('assigns role courses plus courses for everyone, and everything to admins', () => {
    expect([...get('dev').assigned].sort()).toEqual(['cyber', 'seo']);
    expect([...get('pm').assigned].sort()).toEqual([
      'cyber',
      ONBOARDING_SLUG,
      'seo',
    ]);
    expect([...get('norole').assigned]).toEqual(['cyber']);
    expect(get('boss').assigned.size).toBe(3);
  });

  it('counts progress only over assigned courses', () => {
    // dev: 1 of 4 chapters (seo + cyber). The onboarding chapter they did is not counted.
    expect(get('dev').overallPercent).toBe(25);
    expect(get('dev').chaptersDone).toBe(1);
    // pm: 2 of 6 chapters
    expect(get('pm').overallPercent).toBe(33);
    expect(get('pm').coursesCompleted).toBe(1);
  });

  it('does not require onboarding from people it is not assigned to', () => {
    expect(get('dev').onboardingComplete).toBe(true);
    expect(get('pm').onboardingComplete).toBe(true); // finished
    const stale = computeTeam({
      courses,
      members: [m('pm2', { role_id: 'pm' }), m('dev2', { role_id: 'dev' })],
      progress: [],
      activity: [],
      access,
    });
    const now = new Date('2026-06-30T00:00:00Z');
    expect(needsNudge(stale, now).map((t) => t.id)).toEqual(['pm2']); // dev2 does not have onboarding
  });

  it('treats every course as assigned when roles are not set up', () => {
    const t = computeTeam({
      courses,
      members: [m('x')],
      progress: [],
      activity: [],
    });
    expect(t[0].assigned.size).toBe(3);
  });

  it('summary uses assigned totals', () => {
    expect(summarise(team).activeMembers).toBe(4);
    expect(
      filterAndSort(team, { sort: 'progress' })[0].overallPercent,
    ).toBeGreaterThanOrEqual(get('dev').overallPercent);
  });
});

describe('csv import with job_role', () => {
  const roles = new Map([
    ['developer', 'role-1'],
    ['project manager', 'role-2'],
  ]);
  it('matches role names case-insensitively and reports unknown ones', () => {
    const csv =
      'email,full_name,role,job_role\na@x.com,A,learner,Developer\nb@x.com,B,learner,PROJECT MANAGER\nc@x.com,C,learner,Astronaut\nd@x.com,D,learner,\n';
    const { rows } = validateImport(csv, new Set(), roles);
    expect(rows.map((r) => r.role_id)).toEqual([
      'role-1',
      'role-2',
      null,
      null,
    ]);
    expect(rows[2].errors).toEqual(['Unknown role "Astronaut"']);
    expect(rows[3].errors).toEqual([]);
  });
  it('works without a job_role column', () => {
    const { rows } = validateImport('email\na@x.com\n', new Set(), roles);
    expect(rows[0]).toMatchObject({ role_id: null, job_role: '', errors: [] });
  });
});

describe('migration 0002 security', () => {
  const sql = fs.readFileSync('supabase/migrations/0002_roles.sql', 'utf8');
  it.each(['roles', 'role_courses', 'course_settings'])(
    '%s has RLS and no client policy',
    (t) => {
      expect(sql).toMatch(
        new RegExp(`alter table public\\.${t}\\s+enable row level security`),
      );
      expect(sql).not.toMatch(new RegExp(`create policy[^;]+on public\\.${t}`));
    },
  );
  it('adds a nullable role_id to members that falls back to no role when a role is deleted', () => {
    expect(sql).toMatch(
      /add column role_id uuid references public\.roles\(id\) on delete set null/,
    );
  });
  it('deleting a role removes its course links', () => {
    expect(sql).toMatch(
      /role_id uuid not null references public\.roles\(id\) on delete cascade/,
    );
  });
  it('does not weaken the members policy', () => {
    expect(sql).not.toMatch(/create policy[^;]+on public\.members/);
  });
});
