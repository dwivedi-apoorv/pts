import 'server-only';
import { getCourses } from '../content';
import { isMissingSchema } from '../access-calc';
import { createAdminClient } from '../supabase/admin';
import {
  computeTeam,
  type AccessConfig,
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
const MEMBER_COLS_WITH_ROLE = MEMBER_COLS + ',role_id';
type Stamp = { user_id: string; updated_at: string };

export type RoleInfo = {
  id: string;
  name: string;
  description: string | null;
  courses: string[];
  memberCount: number;
};

export type RolesData = {
  /** False until migration 0002_roles.sql has been run. */
  enabled: boolean;
  roles: RoleInfo[];
  forEveryone: string[];
  access: AccessConfig;
};

const NO_ROLES: RolesData = {
  enabled: false,
  roles: [],
  forEveryone: [],
  access: { forEveryone: [], byRole: {} },
};

/** Members, including role_id. Falls back to no roles if the migration is missing. */
async function fetchMembers(
  db: Db,
): Promise<{ members: MemberRow[]; enabled: boolean }> {
  try {
    return {
      members: await fetchAll<MemberRow>(
        db,
        'members',
        MEMBER_COLS_WITH_ROLE,
        'created_at',
      ),
      enabled: true,
    };
  } catch (err) {
    if (!isMissingSchema(err as { code?: string; message?: string })) throw err;
    return {
      members: await fetchAll<MemberRow>(
        db,
        'members',
        MEMBER_COLS,
        'created_at',
      ),
      enabled: false,
    };
  }
}

export async function loadRoles(members?: MemberRow[]): Promise<RolesData> {
  const db = createAdminClient();
  const [roles, links, settings] = await Promise.all([
    db.from('roles').select('id,name,description').order('name'),
    db.from('role_courses').select('role_id,course_slug'),
    db.from('course_settings').select('course_slug,for_everyone'),
  ]);
  for (const r of [roles, links, settings]) {
    if (isMissingSchema(r.error)) return NO_ROLES;
    if (r.error) throw r.error;
  }
  const byRole: Record<string, string[]> = {};
  for (const l of links.data!) (byRole[l.role_id] ??= []).push(l.course_slug);
  // The Roles page calls this without a members list, so count them here.
  let roleOfMember = members?.map((m) => ({ role_id: m.role_id ?? null }));
  if (!roleOfMember) {
    const { data, error } = await db.from('members').select('role_id');
    if (error) throw error;
    roleOfMember = data as { role_id: string | null }[];
  }
  const counts = new Map<string, number>();
  for (const m of roleOfMember)
    if (m.role_id) counts.set(m.role_id, (counts.get(m.role_id) ?? 0) + 1);
  const forEveryone = settings
    .data!.filter((s) => s.for_everyone)
    .map((s) => s.course_slug);
  return {
    enabled: true,
    roles: roles.data!.map((r) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      courses: byRole[r.id] ?? [],
      memberCount: counts.get(r.id) ?? 0,
    })),
    forEveryone,
    access: { forEveryone, byRole },
  };
}

export async function loadTeam() {
  const db = createAdminClient();
  const [{ members }, progress, positions, checks, ticks] = await Promise.all([
    fetchMembers(db),
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
  const rolesData = await loadRoles(members);
  return {
    courses,
    members,
    roles: rolesData,
    team: computeTeam({
      courses,
      members,
      progress,
      activity,
      access: rolesData.enabled ? rolesData.access : undefined,
    }),
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
  let found = await db
    .from('members')
    .select(MEMBER_COLS_WITH_ROLE)
    .eq('id', id)
    .maybeSingle();
  if (isMissingSchema(found.error)) {
    found = await db
      .from('members')
      .select(MEMBER_COLS)
      .eq('id', id)
      .maybeSingle();
  }
  if (found.error) throw found.error;
  const member = found.data as unknown as MemberRow | null;
  if (!member) return null;
  const uid = member.auth_user_id;
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
  const rolesData = await loadRoles([member]);
  const [team] = computeTeam({
    courses,
    members: [member],
    progress,
    activity,
    access: rolesData.enabled ? rolesData.access : undefined,
  });
  const role = rolesData.roles.find((r) => r.id === member.role_id) ?? null;
  return {
    courses,
    member: team,
    progress,
    checks,
    role,
    forEveryone: rolesData.forEveryone,
    rolesEnabled: rolesData.enabled,
  };
}
