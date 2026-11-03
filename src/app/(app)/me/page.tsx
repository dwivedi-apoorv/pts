import Link from 'next/link';
import { ProgressBar } from '@/components/progress-bar';
import { StatusChip } from '@/components/status-chip';
import { getAllowedSlugs } from '@/lib/access';
import { requireMember } from '@/lib/auth';
import { getCourses, groupCourses } from '@/lib/content';
import { courseProgress } from '@/lib/progress-calc';
import { getUserProgress } from '@/lib/progress';

export const metadata = { title: 'My progress' };

export default async function MePage() {
  const { member, user } = await requireMember();
  const [all, allowed] = await Promise.all([
    getUserProgress(user.id),
    getAllowedSlugs(),
  ]);
  const rows = getCourses()
    .filter((c) => allowed.has(c.slug))
    .map((course) => ({
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
      {groupCourses(
        rows.map((r) => ({ ...r, category: r.course.category })),
      ).map((group, i) => (
        <section
          key={group.category}
          aria-labelledby={`cat-${i}`}
          className="mt-8"
        >
          <h2
            id={`cat-${i}`}
            className="text-muted-foreground text-sm font-semibold tracking-wide uppercase"
          >
            {group.category}
          </h2>
          <ul className="mt-2 space-y-4">
            {group.courses.map(({ course, progress }) => (
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
        </section>
      ))}
    </main>
  );
}
