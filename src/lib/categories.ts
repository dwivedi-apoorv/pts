export type CategoryGroup<T> = { category: string; courses: T[] };

/**
 * Groups courses under their category headings. Headings follow `categoryOrder`;
 * a course with an unknown category goes in a group at the end. Courses inside a
 * group keep the order they were given in.
 */
export function groupByCategory<T extends { category: string }>(
  courses: T[],
  categoryOrder: readonly string[],
): CategoryGroup<T>[] {
  const rank = (c: string) => {
    const i = categoryOrder.indexOf(c);
    return i === -1 ? categoryOrder.length : i;
  };
  const groups = new Map<string, T[]>();
  for (const c of courses)
    groups.set(c.category, [...(groups.get(c.category) ?? []), c]);
  return [...groups.entries()]
    .sort(([a], [b]) => rank(a) - rank(b))
    .map(([category, list]) => ({ category, courses: list }));
}
