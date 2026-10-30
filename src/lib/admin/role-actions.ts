'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { isMissingSchema } from '../access-calc';
import { requireAdmin } from '../auth';
import { getCourses } from '../content';
import { createAdminClient } from '../supabase/admin';
import { logAudit } from './audit';

export type RoleResult =
  { ok: true; message?: string } | { ok: false; message: string };
const fail = (message: string): RoleResult => ({ ok: false, message });
const GENERIC = 'Something went wrong. Please try again.';
const NEEDS_MIGRATION =
  'Roles are not set up yet. Run supabase/migrations/0002_roles.sql in the Supabase SQL editor first.';

const knownSlugs = () => new Set(getCourses().map((c) => c.slug));

const roleInput = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Give the role a name')
    .max(60, 'Role names can be up to 60 characters'),
  description: z
    .string()
    .trim()
    .max(300, 'The description can be up to 300 characters')
    .transform((s) => (s === '' ? null : s))
    .nullable()
    .optional(),
  courses: z.array(z.string().min(1).max(200)).max(200),
});

function done(message?: string): RoleResult {
  revalidatePath('/', 'layout');
  return { ok: true, message };
}

function checkCourses(slugs: string[]): string[] | null {
  const known = knownSlugs();
  const unique = [...new Set(slugs)];
  return unique.every((s) => known.has(s)) ? unique : null;
}

async function writeCourses(
  db: ReturnType<typeof createAdminClient>,
  roleId: string,
  slugs: string[],
) {
  const del = await db.from('role_courses').delete().eq('role_id', roleId);
  if (del.error) return del.error;
  if (slugs.length === 0) return null;
  const ins = await db
    .from('role_courses')
    .insert(slugs.map((course_slug) => ({ role_id: roleId, course_slug })));
  return ins.error;
}

export async function createRole(input: {
  name: string;
  description?: string | null;
  courses: string[];
}): Promise<RoleResult> {
  const { member: actor } = await requireAdmin();
  const parsed = roleInput.safeParse(input);
  if (!parsed.success)
    return fail(parsed.error.issues[0]?.message ?? 'Invalid input.');
  const courses = checkCourses(parsed.data.courses);
  if (!courses) return fail('One of the selected courses does not exist.');

  const db = createAdminClient();
  const { data, error } = await db
    .from('roles')
    .insert({
      name: parsed.data.name,
      description: parsed.data.description ?? null,
    })
    .select('id')
    .single();
  if (error) {
    if (isMissingSchema(error)) return fail(NEEDS_MIGRATION);
    return fail(
      error.code === '23505'
        ? 'A role with that name already exists.'
        : GENERIC,
    );
  }
  const werr = await writeCourses(db, data.id, courses);
  if (werr) return fail(GENERIC);
  await logAudit(actor, 'role.create', null, {
    name: parsed.data.name,
    courses,
  });
  return done('Role created.');
}

export async function updateRole(input: {
  id: string;
  name: string;
  description?: string | null;
  courses: string[];
}): Promise<RoleResult> {
  const { member: actor } = await requireAdmin();
  const parsed = roleInput.extend({ id: z.uuid() }).safeParse(input);
  if (!parsed.success)
    return fail(parsed.error.issues[0]?.message ?? 'Invalid input.');
  const courses = checkCourses(parsed.data.courses);
  if (!courses) return fail('One of the selected courses does not exist.');

  const db = createAdminClient();
  const { data: existing, error: lookup } = await db
    .from('roles')
    .select('id')
    .eq('id', parsed.data.id)
    .maybeSingle();
  if (isMissingSchema(lookup)) return fail(NEEDS_MIGRATION);
  if (!existing) return fail('That role no longer exists.');
  const { error } = await db
    .from('roles')
    .update({
      name: parsed.data.name,
      description: parsed.data.description ?? null,
    })
    .eq('id', parsed.data.id);
  if (error)
    return fail(
      error.code === '23505'
        ? 'A role with that name already exists.'
        : GENERIC,
    );
  if (await writeCourses(db, parsed.data.id, courses)) return fail(GENERIC);
  await logAudit(actor, 'role.update', null, {
    name: parsed.data.name,
    courses,
  });
  return done(
    'Role updated. Members with this role see the change straight away.',
  );
}

export async function deleteRole(roleId: string): Promise<RoleResult> {
  const { member: actor } = await requireAdmin();
  const parsed = z.uuid().safeParse(roleId);
  if (!parsed.success) return fail('Invalid request.');
  const db = createAdminClient();
  const { data: role, error: lookup } = await db
    .from('roles')
    .select('id,name')
    .eq('id', parsed.data)
    .maybeSingle();
  if (isMissingSchema(lookup)) return fail(NEEDS_MIGRATION);
  if (!role) return fail('That role no longer exists.');
  const { count } = await db
    .from('members')
    .select('id', { count: 'exact', head: true })
    .eq('role_id', parsed.data);
  // Members keep their account; they just fall back to the "for everyone" courses.
  const { error } = await db.from('roles').delete().eq('id', parsed.data);
  if (error) return fail(GENERIC);
  await logAudit(actor, 'role.delete', null, {
    name: role.name,
    membersAffected: count ?? 0,
  });
  return done(
    count
      ? `Role deleted. ${count} member${count === 1 ? ' now has' : 's now have'} no role.`
      : 'Role deleted.',
  );
}

export async function setCourseForEveryone(
  courseSlug: string,
  forEveryone: boolean,
): Promise<RoleResult> {
  const { member: actor } = await requireAdmin();
  const parsed = z
    .object({ slug: z.string().min(1).max(200), on: z.boolean() })
    .safeParse({ slug: courseSlug, on: forEveryone });
  if (!parsed.success) return fail('Invalid request.');
  if (!knownSlugs().has(parsed.data.slug))
    return fail('That course does not exist.');
  const db = createAdminClient();
  const { error } = await db
    .from('course_settings')
    .upsert(
      { course_slug: parsed.data.slug, for_everyone: parsed.data.on },
      { onConflict: 'course_slug' },
    );
  if (error) return fail(isMissingSchema(error) ? NEEDS_MIGRATION : GENERIC);
  await logAudit(actor, 'course.everyone', null, {
    course: parsed.data.slug,
    forEveryone: parsed.data.on,
  });
  return done(
    parsed.data.on
      ? 'Now visible to everyone.'
      : 'No longer visible to everyone.',
  );
}
