import 'server-only';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { requireMember } from './auth';
import { allowedSlugs, isMissingSchema } from './access-calc';
import { getCourses } from './content';
import { createAdminClient } from './supabase/admin';

/**
 * The course slugs the signed-in member may see: admins see all; everyone else
 * sees courses flagged "for everyone" plus their role's courses.
 *
 * Until migration 0002_roles.sql has been run there are no roles to read, so
 * everything stays visible instead of locking the whole team out.
 */
export const getAllowedSlugs = cache(async (): Promise<Set<string>> => {
  const { member } = await requireMember();
  const allSlugs = getCourses().map((c) => c.slug);
  if (member.role === 'admin') return new Set(allSlugs);

  const db = createAdminClient();
  const [settings, own] = await Promise.all([
    db.from('course_settings').select('course_slug').eq('for_everyone', true),
    db.from('members').select('role_id').eq('id', member.id).maybeSingle(),
  ]);
  if (isMissingSchema(settings.error) || isMissingSchema(own.error))
    return new Set(allSlugs);
  if (settings.error) throw settings.error;
  if (own.error) throw own.error;

  const roleId =
    (own.data as { role_id: string | null } | null)?.role_id ?? null;
  let roleCourses: string[] = [];
  if (roleId) {
    const { data, error } = await db
      .from('role_courses')
      .select('course_slug')
      .eq('role_id', roleId);
    if (error) throw error;
    roleCourses = data.map((r) => r.course_slug);
  }
  return allowedSlugs({
    isAdmin: false,
    allSlugs,
    forEveryone: settings.data.map((r) => r.course_slug),
    roleCourses,
  });
});

/** 404 for a course the member is not assigned, the same as one that does not exist. */
export async function requireCourseAccess(courseSlug: string): Promise<void> {
  if (!(await getAllowedSlugs()).has(courseSlug)) notFound();
}
