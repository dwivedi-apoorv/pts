import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Course } from '@/lib/content/types';
import type { CourseProgress } from '@/lib/progress-calc';
import { ProgressBar } from './progress-bar';
import { StatusChip } from './status-chip';

/** One course as a row in the dashboard list. The whole row is the link. */
export function CourseCard({
  course,
  progress,
}: {
  course: Course;
  progress: CourseProgress;
}) {
  return (
    <li className="hover:bg-muted/50 focus-within:bg-muted/50 relative flex flex-col gap-3 px-4 py-4 transition-colors motion-reduce:transition-none sm:flex-row sm:items-center sm:gap-6 sm:px-5">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-base font-semibold">
            <Link
              href={`/courses/${course.slug}`}
              className="after:absolute after:inset-0 focus:outline-none"
            >
              {course.title}
            </Link>
          </h3>
          {course.badge && <Badge>{course.badge}</Badge>}
          <StatusChip status={progress.status} />
        </div>
        <p className="text-muted-foreground mt-1 text-sm">
          {course.description}
        </p>
        <p className="text-muted-foreground mt-1 text-xs">
          {course.stats.chapterCount} chapters · about{' '}
          {course.stats.readingMinutes} min reading
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-3 sm:w-56">
        <ProgressBar
          percent={progress.percent}
          label={`${course.title} progress`}
        />
        <span className="w-10 text-right text-sm tabular-nums">
          {progress.percent}%
        </span>
        <ChevronRightIcon
          aria-hidden
          className="text-muted-foreground hidden size-4 shrink-0 sm:block"
        />
      </div>
    </li>
  );
}
