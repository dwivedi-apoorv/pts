import type { Course } from './content/types';

export type CourseStatus = 'not-started' | 'in-progress' | 'completed';

export type CourseProgress = {
  done: number;
  total: number;
  percent: number;
  status: CourseStatus;
  completed: Set<string>;
};

/** Only chapters that still exist count, so removed chapters never inflate progress. */
export function courseProgress(
  course: Course,
  completedSlugs: Iterable<string>,
): CourseProgress {
  const existing = new Set(course.chapters.map((c) => c.slug));
  const completed = new Set([...completedSlugs].filter((s) => existing.has(s)));
  const total = course.chapters.length;
  const done = completed.size;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  const status: CourseStatus =
    done === 0 ? 'not-started' : done >= total ? 'completed' : 'in-progress';
  return { done, total, percent, status, completed };
}

export const STATUS_LABEL: Record<CourseStatus, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  completed: 'Completed',
};

/** Where "Start/Continue" should go for a course. */
export function continueChapter(
  course: Course,
  progress: CourseProgress,
  lastSlug?: string,
): string {
  if (lastSlug && course.chapters.some((c) => c.slug === lastSlug))
    return lastSlug;
  const firstOpen = course.chapters.find(
    (c) => !progress.completed.has(c.slug),
  );
  return (firstOpen ?? course.chapters[0]).slug;
}
