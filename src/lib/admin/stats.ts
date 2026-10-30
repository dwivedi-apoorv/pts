import type { Course } from '../content/types';
import { courseProgress, type CourseProgress } from '../progress-calc';

export type MemberRow = {
  id: string;
  email: string;
  full_name: string | null;
  role: 'learner' | 'admin';
  active: boolean;
  auth_user_id: string | null;
  last_login_at: string | null;
  created_at: string;
};
export type ProgressRow = {
  user_id: string;
  course_slug: string;
  chapter_slug: string;
  completed_at: string;
};
export type ActivityRow = { user_id: string; at: string };

export type TeamMember = MemberRow & {
  perCourse: Record<string, CourseProgress>;
  overallPercent: number;
  chaptersDone: number;
  coursesCompleted: number;
  lastActivity: string | null;
  onboardingComplete: boolean;
};

export type TeamSummary = {
  activeMembers: number;
  neverLoggedIn: number;
  averageCompletion: number;
  coursesCompleted: number;
};

const DAY = 24 * 3600 * 1000;
export const NUDGE_DAYS = 14;

const later = (a: string | null, b: string | null) =>
  a && b ? (a > b ? a : b) : (a ?? b);

export function computeTeam(input: {
  courses: Course[];
  members: MemberRow[];
  progress: ProgressRow[];
  activity: ActivityRow[];
}): TeamMember[] {
  const { courses, members, progress, activity } = input;
  const done = new Map<string, Map<string, string[]>>();
  const last = new Map<string, string>();
  for (const r of progress) {
    const byCourse = done.get(r.user_id) ?? new Map<string, string[]>();
    byCourse.set(r.course_slug, [
      ...(byCourse.get(r.course_slug) ?? []),
      r.chapter_slug,
    ]);
    done.set(r.user_id, byCourse);
    last.set(r.user_id, later(last.get(r.user_id) ?? null, r.completed_at)!);
  }
  for (const a of activity)
    last.set(a.user_id, later(last.get(a.user_id) ?? null, a.at)!);

  const totalChapters = courses.reduce((n, c) => n + c.chapters.length, 0);
  const first = courses[0];

  return members.map((m) => {
    const byCourse =
      (m.auth_user_id && done.get(m.auth_user_id)) ||
      new Map<string, string[]>();
    const perCourse: Record<string, CourseProgress> = {};
    let chaptersDone = 0;
    let coursesCompleted = 0;
    for (const c of courses) {
      const p = courseProgress(c, byCourse.get(c.slug) ?? []);
      perCourse[c.slug] = p;
      chaptersDone += p.done;
      if (p.status === 'completed') coursesCompleted++;
    }
    return {
      ...m,
      perCourse,
      chaptersDone,
      coursesCompleted,
      overallPercent: totalChapters
        ? Math.round((chaptersDone / totalChapters) * 100)
        : 0,
      lastActivity: later(
        m.auth_user_id ? (last.get(m.auth_user_id) ?? null) : null,
        m.last_login_at,
      ),
      onboardingComplete: first
        ? perCourse[first.slug].status === 'completed'
        : true,
    };
  });
}

export function summarise(team: TeamMember[]): TeamSummary {
  const active = team.filter((m) => m.active);
  return {
    activeMembers: active.length,
    neverLoggedIn: active.filter((m) => !m.last_login_at).length,
    averageCompletion: active.length
      ? Math.round(
          active.reduce((n, m) => n + m.overallPercent, 0) / active.length,
        )
      : 0,
    coursesCompleted: active.reduce((n, m) => n + m.coursesCompleted, 0),
  };
}

/** Active members with incomplete onboarding and no activity for 14 days. */
export function needsNudge(
  team: TeamMember[],
  now: Date = new Date(),
): TeamMember[] {
  return team.filter((m) => {
    if (!m.active || m.onboardingComplete) return false;
    // A brand-new member is measured from when they were added.
    const ref = m.lastActivity ?? m.created_at;
    return now.getTime() - new Date(ref).getTime() > NUDGE_DAYS * DAY;
  });
}

export type SortKey = 'name' | 'login' | 'progress';

export function filterAndSort(
  team: TeamMember[],
  opts: {
    sort?: SortKey;
    role?: 'learner' | 'admin' | 'all';
    status?: 'active' | 'inactive' | 'all';
  },
): TeamMember[] {
  const name = (m: TeamMember) => (m.full_name || m.email).toLowerCase();
  const out = team.filter(
    (m) =>
      (!opts.role || opts.role === 'all' || m.role === opts.role) &&
      (!opts.status ||
        opts.status === 'all' ||
        (opts.status === 'active') === m.active),
  );
  const sort = opts.sort ?? 'name';
  return out.sort((a, b) => {
    if (sort === 'progress')
      return (
        b.overallPercent - a.overallPercent || name(a).localeCompare(name(b))
      );
    if (sort === 'login') {
      // most recent first; never logged in last
      if (!a.last_login_at && !b.last_login_at)
        return name(a).localeCompare(name(b));
      if (!a.last_login_at) return 1;
      if (!b.last_login_at) return -1;
      return b.last_login_at.localeCompare(a.last_login_at);
    }
    return name(a).localeCompare(name(b));
  });
}

/** Colour band for a percentage cell. Text is always shown too, so colour is not the only cue. */
export function band(
  percent: number,
): 'none' | 'low' | 'mid' | 'high' | 'done' {
  if (percent <= 0) return 'none';
  if (percent < 34) return 'low';
  if (percent < 67) return 'mid';
  if (percent < 100) return 'high';
  return 'done';
}
