import { describe, expect, it } from 'vitest';
import { csvCell, parseCsv, toCsv, validateImport } from '../src/lib/admin/csv';
import { checkGuardRails } from '../src/lib/admin/guards';
import {
  band,
  computeTeam,
  filterAndSort,
  needsNudge,
  summarise,
  type MemberRow,
  type ProgressRow,
} from '../src/lib/admin/stats';
import { ONBOARDING_SLUG } from '../src/lib/constants';
import type { Course } from '../src/lib/content/types';

const mkCourse = (slug: string, chapters: string[]) =>
  ({
    slug,
    chapters: chapters.map((s, i) => ({ slug: s, index: i + 1 })),
  }) as unknown as Course;
const courses = [
  mkCourse(ONBOARDING_SLUG, ['a', 'b']),
  mkCourse('seo', ['x', 'y', 'z', 'w']),
];
const member = (o: Partial<MemberRow> & { id: string }): MemberRow => ({
  email: `${o.id}@x.com`,
  full_name: o.id,
  role: 'learner',
  active: true,
  auth_user_id: `u-${o.id}`,
  last_login_at: null,
  created_at: '2026-01-01T00:00:00Z',
  ...o,
});
const prog = (
  u: string,
  course: string,
  ch: string,
  at = '2026-02-01T00:00:00Z',
): ProgressRow => ({
  user_id: `u-${u}`,
  course_slug: course,
  chapter_slug: ch,
  completed_at: at,
});

describe('computeTeam / summarise', () => {
  const members = [
    member({ id: 'ann', last_login_at: '2026-03-01T00:00:00Z' }),
    member({ id: 'bob' }),
    member({ id: 'cy', active: false }),
  ];
  const progress = [
    prog('ann', ONBOARDING_SLUG, 'a'),
    prog('ann', ONBOARDING_SLUG, 'b'),
    prog('ann', 'seo', 'x'),
    prog('ann', 'seo', 'gone-chapter'),
    prog('bob', ONBOARDING_SLUG, 'a'),
  ];
  const team = computeTeam({ courses, members, progress, activity: [] });
  const ann = team.find((m) => m.id === 'ann')!;

  it('computes per course and overall percentages, ignoring removed chapters', () => {
    expect(ann.perCourse[ONBOARDING_SLUG].percent).toBe(100);
    expect(ann.perCourse.seo.percent).toBe(25);
    expect(ann.chaptersDone).toBe(3);
    expect(ann.overallPercent).toBe(50); // 3 of 6
    expect(ann.coursesCompleted).toBe(1);
    expect(ann.onboardingComplete).toBe(true);
  });
  it('handles members with no auth user or no progress', () => {
    const none = computeTeam({
      courses,
      members: [member({ id: 'z', auth_user_id: null })],
      progress,
      activity: [],
    })[0];
    expect(none.overallPercent).toBe(0);
    expect(none.lastActivity).toBeNull();
  });
  it('uses the latest of progress, other activity and login as last activity', () => {
    const t = computeTeam({
      courses,
      members,
      progress,
      activity: [{ user_id: 'u-ann', at: '2026-04-01T00:00:00Z' }],
    });
    expect(t.find((m) => m.id === 'ann')!.lastActivity).toBe(
      '2026-04-01T00:00:00Z',
    );
  });
  it('summarises active members only', () => {
    expect(summarise(team)).toEqual({
      activeMembers: 2,
      neverLoggedIn: 1,
      averageCompletion: 34,
      coursesCompleted: 1,
    });
  });
});

describe('needsNudge', () => {
  const now = new Date('2026-06-30T00:00:00Z');
  const team = computeTeam({
    courses,
    members: [
      member({ id: 'stale', created_at: '2026-01-01T00:00:00Z' }),
      member({ id: 'new', created_at: '2026-06-25T00:00:00Z' }),
      member({
        id: 'busy',
        created_at: '2026-01-01T00:00:00Z',
        last_login_at: '2026-06-28T00:00:00Z',
      }),
      member({ id: 'done', created_at: '2026-01-01T00:00:00Z' }),
      member({ id: 'off', created_at: '2026-01-01T00:00:00Z', active: false }),
    ],
    progress: [
      prog('done', ONBOARDING_SLUG, 'a'),
      prog('done', ONBOARDING_SLUG, 'b'),
    ],
    activity: [],
  });
  it('lists active members with unfinished onboarding and 14 days of silence', () => {
    expect(needsNudge(team, now).map((m) => m.id)).toEqual(['stale']);
  });
});

describe('filterAndSort', () => {
  const team = computeTeam({
    courses,
    members: [
      member({
        id: 'b',
        full_name: 'Bea',
        last_login_at: '2026-02-01T00:00:00Z',
      }),
      member({
        id: 'a',
        full_name: 'Al',
        role: 'admin',
        last_login_at: '2026-05-01T00:00:00Z',
      }),
      member({ id: 'c', full_name: 'Cy', active: false }),
    ],
    progress: [prog('b', ONBOARDING_SLUG, 'a')],
    activity: [],
  });
  it('sorts by name, last login and progress', () => {
    expect(filterAndSort(team, { sort: 'name' }).map((m) => m.id)).toEqual([
      'a',
      'b',
      'c',
    ]);
    expect(filterAndSort(team, { sort: 'login' }).map((m) => m.id)).toEqual([
      'a',
      'b',
      'c',
    ]);
    expect(filterAndSort(team, { sort: 'progress' })[0].id).toBe('b');
  });
  it('filters by role and status', () => {
    expect(filterAndSort(team, { role: 'admin' }).map((m) => m.id)).toEqual([
      'a',
    ]);
    expect(
      filterAndSort(team, { status: 'inactive' }).map((m) => m.id),
    ).toEqual(['c']);
    expect(
      filterAndSort(team, { status: 'active', role: 'learner' }).map(
        (m) => m.id,
      ),
    ).toEqual(['b']);
  });
  it('bands percentages', () => {
    expect([0, 10, 50, 80, 100].map(band)).toEqual([
      'none',
      'low',
      'mid',
      'high',
      'done',
    ]);
  });
});

describe('guard rails', () => {
  const admin = { id: 'a1', role: 'admin' as const, active: true };
  it('stops admins acting on themselves', () => {
    for (const action of ['deactivate', 'demote', 'delete'] as const) {
      expect(
        checkGuardRails({
          actorId: 'a1',
          target: admin,
          action,
          activeAdminIds: ['a1', 'a2'],
        }),
      ).toMatch(/your own account/);
    }
  });
  it('protects the last active admin', () => {
    const t = { id: 'a2', role: 'admin' as const, active: true };
    expect(
      checkGuardRails({
        actorId: 'a1',
        target: t,
        action: 'delete',
        activeAdminIds: ['a2'],
      }),
    ).toMatch(/last active admin/);
    expect(
      checkGuardRails({
        actorId: 'a1',
        target: t,
        action: 'demote',
        activeAdminIds: ['a1', 'a2'],
      }),
    ).toBeNull();
  });
  it('allows acting on learners and inactive admins', () => {
    expect(
      checkGuardRails({
        actorId: 'a1',
        target: { id: 'l', role: 'learner', active: true },
        action: 'delete',
        activeAdminIds: ['a1'],
      }),
    ).toBeNull();
    expect(
      checkGuardRails({
        actorId: 'a1',
        target: { id: 'a3', role: 'admin', active: false },
        action: 'delete',
        activeAdminIds: ['a1'],
      }),
    ).toBeNull();
  });
});

describe('csv', () => {
  it('parses quotes, commas, newlines in quotes, CRLF and BOM', () => {
    const rows = parseCsv(
      '﻿email,full_name\r\n"a@x.com","Smith, ""Al"""\r\nb@x.com,"Two\nLines"\r\n\r\n',
    );
    expect(rows).toEqual([
      ['email', 'full_name'],
      ['a@x.com', 'Smith, "Al"'],
      ['b@x.com', 'Two\nLines'],
    ]);
  });
  it('escapes cells and neutralises spreadsheet formulas', () => {
    expect(csvCell('a,b')).toBe('"a,b"');
    expect(csvCell('say "hi"')).toBe('"say ""hi"""');
    expect(csvCell('=HYPERLINK("x")')).toBe(`"'=HYPERLINK(""x"")"`);
    expect(csvCell('+1')).toBe("'+1");
    expect(csvCell(null)).toBe('');
    expect(
      toCsv([
        ['a', 1],
        ['b', 2],
      ]),
    ).toBe('a,1\r\nb,2\r\n');
  });
  it('validates an import with errors per line', () => {
    const csv =
      'email,full_name,role\nnew@x.com,New One,learner\nbad-email,Bad,learner\nexists@x.com,Dup,learner\nnew@x.com,Again,learner\nadm@x.com,Ad,admin\nodd@x.com,Odd,boss\n';
    const { rows, fatal } = validateImport(csv, new Set(['exists@x.com']));
    expect(fatal).toBeUndefined();
    expect(rows.map((r) => r.errors)).toEqual([
      [],
      ['Invalid email'],
      ['Already a member'],
      ['Duplicate of line 2'],
      [],
      ['Role must be learner or admin'],
    ]);
    expect(rows[4].role).toBe('admin');
    expect(rows[0].email).toBe('new@x.com');
  });
  it('lower-cases and trims emails, defaults the role', () => {
    const { rows } = validateImport('email\n  Ann@X.com  \n', new Set());
    expect(rows[0]).toMatchObject({
      email: 'ann@x.com',
      role: 'learner',
      errors: [],
    });
  });
  it('reports fatal problems clearly', () => {
    expect(validateImport('', new Set()).fatal).toMatch(/empty/);
    expect(validateImport('name,role\nx,y', new Set()).fatal).toMatch(
      /"email" column/,
    );
    expect(validateImport('email,role\n', new Set()).fatal).toMatch(
      /no member rows/,
    );
  });
});
