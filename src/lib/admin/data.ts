import 'server-only';
import { getCourses } from '../content';
import { createAdminClient } from '../supabase/admin';
import {
  computeTeam,
  type ActivityRow,
  type MemberRow,
  type ProgressRow,
} from './stats';

type Db = ReturnType<typeof createAdminClient>;
const PAGE = 1000;

/** PostgREST returns at most 1000 rows per request, so page through everything. */
async function fetchAll<T>(
  db: Db,
  table: string,
  columns: string,
  order: string,
  userId?: string,
): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += PAGE) {
    let q = db.from(table).select(columns);
    if (userId) q = q.eq('user_id', userId);
    const { data, error } = await q
      .order(order, { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw error;
    out.push(...(data as unknown as T[]));
    if (!data || data.length < PAGE) break;
  }
  return out;
}

const MEMBER_COLS =
  'id,email,full_name,role,active,auth_user_id,last_login_at,created_at';
type Stamp = { user_id: string; updated_at: string };

export async function loadTeam() {
  const db = createAdminClient();
  const [members, progress, positions, checks, ticks] = await Promise.all([
    fetchAll<MemberRow>(db, 'members', MEMBER_COLS, 'created_at'),
    fetchAll<ProgressRow>(
      db,
      'chapter_progress',
      'user_id,course_slug,chapter_slug,completed_at',
      'completed_at',
    ),
    fetchAll<Stamp>(db, 'course_position', 'user_id,updated_at', 'updated_at'),
    fetchAll<Stamp>(
      db,
      'self_check_results',
      'user_id,updated_at',
      'updated_at',
    ),
    fetchAll<Stamp>(db, 'checklist_items', 'user_id,updated_at', 'updated_at'),
  ]);
  const activity: ActivityRow[] = [...positions, ...checks, ...ticks].map(
    (r) => ({ user_id: r.user_id, at: r.updated_at }),
  );
  const courses = getCourses();
  return {
    courses,
    members,
    team: computeTeam({ courses, members, progress, activity }),
  };
}

export type SelfCheckRow = {
  user_id: string;
  course_slug: string;
  question_key: string;
  result: 'got_it' | 'review';
  updated_at: string;
};

export async function loadMemberDetail(id: string) {
  const db = createAdminClient();
  const { data: member, error } = await db
    .from('members')
    .select(MEMBER_COLS)
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  if (!member) return null;
  const uid = (member as MemberRow).auth_user_id;
  const [progress, checks, positions, ticks] = uid
    ? await Promise.all([
        fetchAll<ProgressRow>(
          db,
          'chapter_progress',
          'user_id,course_slug,chapter_slug,completed_at',
          'completed_at',
          uid,
        ),
        fetchAll<SelfCheckRow>(
          db,
          'self_check_results',
          'user_id,course_slug,question_key,result,updated_at',
          'updated_at',
          uid,
        ),
        fetchAll<Stamp>(
          db,
          'course_position',
          'user_id,updated_at',
          'updated_at',
          uid,
        ),
        fetchAll<Stamp>(
          db,
          'checklist_items',
          'user_id,updated_at',
          'updated_at',
          uid,
        ),
      ])
    : [[], [], [], []];
  const activity: ActivityRow[] = uid
    ? [...checks, ...positions, ...ticks].map((r) => ({
        user_id: uid,
        at: r.updated_at,
      }))
    : [];
  const courses = getCourses();
  const [team] = computeTeam({
    courses,
    members: [member as MemberRow],
    progress,
    activity,
  });
  return { courses, member: team, progress, checks };
}

export async function loadSelfCheckAll() {
  const db = createAdminClient();
  const [members, rows] = await Promise.all([
    fetchAll<MemberRow>(db, 'members', MEMBER_COLS, 'created_at'),
    fetchAll<SelfCheckRow>(
      db,
      'self_check_results',
      'user_id,course_slug,question_key,result,updated_at',
      'updated_at',
    ),
  ]);
  return { members, rows, courses: getCourses() };
}
