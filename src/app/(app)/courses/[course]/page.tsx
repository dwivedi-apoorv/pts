import { CheckCircle2Icon, CircleIcon } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { ProgressBar } from '@/components/progress-bar';
import { StatusChip } from '@/components/status-chip';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { requireMember } from '@/lib/auth';
import { getCourse, getCourses } from '@/lib/content';
import { courseProgress, continueChapter } from '@/lib/progress-calc';
import { getUserProgress } from '@/lib/progress';

export function generateStaticParams() {
  return getCourses().map((c) => ({ course: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/courses/[course]'>): Promise<Metadata> {
  const course = getCourse((await params).course);
  return { title: course?.title ?? 'Course' };
}

export default async function CoursePage({
  params,
}: PageProps<'/courses/[course]'>) {
  const { user } = await requireMember();
  const course = getCourse((await params).course);
  if (!course) notFound();

  const all = await getUserProgress(user.id);
  const progress = courseProgress(course, all.completed[course.slug] ?? []);
  const last = all.positions.find((p) => p.course === course.slug)?.chapter;
  const target = continueChapter(course, progress, last);
  const checkChapter = course.chapters.find((c) => c.kind === 'glossary-check');

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <Breadcrumbs
        items={[{ label: 'Courses', href: '/' }, { label: course.title }]}
      />
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {course.badge && <Badge>{course.badge}</Badge>}
        <StatusChip status={progress.status} />
      </div>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">
        {course.title}
      </h1>
      <p className="text-muted-foreground mt-2">{course.description}</p>
      <p className="text-muted-foreground mt-2 text-sm">
        {course.stats.chapterCount} chapters · about{' '}
        {course.stats.readingMinutes} min reading
      </p>

      <div className="mt-5 flex items-center gap-3">
        <ProgressBar
          percent={progress.percent}
          label={`${course.title} progress`}
        />
        <span className="w-24 text-right text-sm tabular-nums">
          {progress.done} of {progress.total}
        </span>
      </div>

      <Link
        href={`/courses/${course.slug}/${target}`}
        className={`${buttonVariants({ size: 'lg' })} mt-5`}
      >
        {progress.status === 'not-started'
          ? 'Start course'
          : progress.status === 'completed'
            ? 'Review course'
            : 'Continue'}
      </Link>

      {progress.status === 'completed' && checkChapter && (
        <p className="bg-card mt-5 rounded-lg border p-4 text-sm">
          You have completed every chapter. Nice work.{' '}
          <Link
            href={`/courses/${course.slug}/${checkChapter.slug}#knowledge-check`}
            className="text-primary font-medium underline"
          >
            Try the knowledge check
          </Link>{' '}
          to test yourself.
        </p>
      )}

      <h2 className="mt-10 text-lg font-semibold">Chapters</h2>
      <ol className="mt-3 divide-y rounded-xl border">
        {course.chapters.map((ch) => {
          const done = progress.completed.has(ch.slug);
          return (
            <li key={ch.slug}>
              <Link
                href={`/courses/${course.slug}/${ch.slug}`}
                className="hover:bg-muted/60 focus-visible:bg-muted/60 flex items-center gap-3 px-4 py-3 focus-visible:outline-none"
              >
                {done ? (
                  <CheckCircle2Icon
                    className="text-primary size-5 shrink-0"
                    aria-label="Completed"
                  />
                ) : (
                  <CircleIcon
                    className="text-muted-foreground size-5 shrink-0"
                    aria-label="Not completed"
                  />
                )}
                <span className="text-muted-foreground w-6 shrink-0 text-sm tabular-nums">
                  {ch.index}.
                </span>
                <span className="min-w-0 flex-1 font-medium">{ch.title}</span>
                {last === ch.slug && <Badge variant="secondary">Resume</Badge>}
                <span className="text-muted-foreground hidden shrink-0 text-sm sm:inline">
                  {ch.readingMinutes} min
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </main>
  );
}
