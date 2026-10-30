import type { GlossaryEntry, SearchRecord } from './content/types';

/** Which course slugs a member may see. Admins see everything. */
export function allowedSlugs(args: {
  isAdmin: boolean;
  allSlugs: string[];
  forEveryone: Iterable<string>;
  roleCourses: Iterable<string>;
}): Set<string> {
  const known = new Set(args.allSlugs);
  if (args.isAdmin) return known;
  const out = new Set<string>();
  // Only slugs that still exist count, so a deleted course never leaks through old rows.
  for (const s of [...args.forEveryone, ...args.roleCourses])
    if (known.has(s)) out.add(s);
  return out;
}

export function filterRecords(
  records: SearchRecord[],
  allowed: Set<string>,
): SearchRecord[] {
  return records.filter((r) => allowed.has(r.courseSlug));
}

/** Keeps only definitions from allowed courses, and drops terms with none left. */
export function filterGlossary(
  entries: GlossaryEntry[],
  allowed: Set<string>,
): GlossaryEntry[] {
  return entries
    .map((e) => ({
      ...e,
      definitions: e.definitions
        .map((d) => ({
          ...d,
          courses: d.courses.filter((c) => allowed.has(c.slug)),
        }))
        .filter((d) => d.courses.length > 0),
    }))
    .filter((e) => e.definitions.length > 0);
}

/** Postgres / PostgREST codes that mean "the roles migration has not been run yet". */
export function isMissingSchema(
  error: { code?: string; message?: string } | null | undefined,
): boolean {
  if (!error) return false;
  return (
    ['42703', '42P01', 'PGRST204', 'PGRST205'].includes(error.code ?? '') ||
    /does not exist|schema cache/i.test(error.message ?? '')
  );
}
