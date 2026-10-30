import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { CourseCard } from '@/components/course-card';
import { buttonVariants } from '@/components/ui/button';
import { getAllowedSlugs } from '@/lib/access';
import { requireMember } from '@/lib/auth';
import { getChapter, getCourse, getCourses } from '@/lib/content';
import { courseProgress } from '@/lib/progress-calc';
import { getUserProgress } from '@/lib/progress';

export const metadata = { title: 'Courses' };

export default async function Dashboard() {
  const { member, user } = await requireMember();
  const [progress, allowed] = await Promise.all([
    getUserProgress(user.id),
    getAllowedSlugs(),
  ]);
  const courses = getCourses().filter((c) => allowed.has(c.slug));
  const firstName = (member.full_name ?? user.email.split('@')[0]).split(
    ' ',
  )[0];

  const last = progress.positions
    .map((p) => {
      const course = allowed.has(p.course) ? getCourse(p.course) : undefined;
      const found = course && getChapter(course, p.chapter);
      return course && found ? { course, chapter: found.chapter } : null;
    })
    .find(Boolean);
  const first = courses[0];
  const none = courses.length === 0;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome, {firstName}
      </h1>

      {none ? (
        <section className="bg-card mt-6 rounded-xl border p-6">
          <h2 className="font-semibold">No courses assigned yet</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Your administrator has not given you a role yet. Once they do, your
            courses will appear here. Ask them if you were expecting to see
            something.
          </p>
        </section>
      ) : (
        <section
          aria-labelledby="continue"
          className="bg-card mt-6 rounded-xl border p-5"
        >
          <h2
            id="continue"
            className="text-muted-foreground text-sm font-medium"
          >
            {last ? 'Continue where you left off' : 'Get started'}
          </h2>
          {last ? (
            <>
              <p className="mt-1 font-semibold">{last.chapter.title}</p>
              <p className="text-muted-foreground text-sm">
                {last.course.title}
              </p>
              <Link
                href={`/courses/${last.course.slug}/${last.chapter.slug}`}
                className={`${buttonVariants()} mt-3`}
              >
                Continue <ArrowRightIcon aria-hidden />
              </Link>
            </>
          ) : (
            <>
              <p className="mt-1 font-semibold">{first.title}</p>
              <p className="text-muted-foreground text-sm">
                Begin with your first course.
              </p>
              <Link
                href={`/courses/${first.slug}`}
                className={`${buttonVariants()} mt-3`}
              >
                Start the first course <ArrowRightIcon aria-hidden />
              </Link>
            </>
          )}
        </section>
      )}

      <section aria-labelledby="courses" className="mt-10">
        <h2 id="courses" className="text-lg font-semibold">
          Your courses
        </h2>
        <p className="text-muted-foreground mt-1 text-sm">
          Start with onboarding if it is in your list, then work through the
          rest in any order.
        </p>
        <ul className="mt-4 divide-y overflow-hidden rounded-xl border">
          {courses.map((course) => (
            <CourseCard
              key={course.slug}
              course={course}
              progress={courseProgress(
                course,
                progress.completed[course.slug] ?? [],
              )}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
