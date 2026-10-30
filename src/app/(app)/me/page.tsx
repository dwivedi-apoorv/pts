import Link from 'next/link';
import { ProgressBar } from '@/components/progress-bar';
import { StatusChip } from '@/components/status-chip';
import { requireMember } from '@/lib/auth';
import { getCourses } from '@/lib/content';
import { courseProgress } from '@/lib/progress-calc';
import { getUserProgress } from '@/lib/progress';

export const metadata = { title: 'My progress' };

export default async function MePage() {
  const { member, user } = await requireMember();
  const all = await getUserProgress(user.id);
  const rows = getCourses().map((course) => ({
    course,
    progress: courseProgress(course, all.completed[course.slug] ?? []),
  }));
  const done = rows.reduce((n, r) => n + r.progress.done, 0);
  const total = rows.reduce((n, r) => n + r.progress.total, 0);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">My progress</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        {member.full_name ? `${member.full_name} · ` : ''}
        {user.email}
      </p>
      <p className="mt-4 text-sm">
        {done} of {total} chapters completed across all courses.
      </p>
      <ul className="mt-6 space-y-4">
        {rows.map(({ course, progress }) => (
          <li key={course.slug} className="bg-card rounded-xl border p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link
                href={`/courses/${course.slug}`}
                className="font-medium hover:underline"
              >
                {course.title}
              </Link>
              <StatusChip status={progress.status} />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <ProgressBar
                percent={progress.percent}
                label={`${course.title} progress`}
              />
              <span className="w-24 text-right text-sm tabular-nums">
                {progress.done} of {progress.total}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
