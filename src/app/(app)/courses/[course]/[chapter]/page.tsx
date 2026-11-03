import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { GlossaryTable } from '@/components/glossary-table';
import { LessonFooter } from '@/components/lesson-footer';
import { PositionTracker } from '@/components/position-tracker';
import { LessonMarkdown } from '@/components/lesson-markdown';
import { QaAccordion } from '@/components/qa-accordion';
import { MobileToc, Toc, type TocItem } from '@/components/toc';
import { getAllowedSlugs, requireCourseAccess } from '@/lib/access';
import { requireMember } from '@/lib/auth';
import { getChapter, getCourse, getCourses } from '@/lib/content';
import { getChecklistState, getUserProgress } from '@/lib/progress';

export function generateStaticParams() {
  return getCourses().flatMap((c) =>
    c.chapters.map((ch) => ({ course: c.slug, chapter: ch.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<'/courses/[course]/[chapter]'>): Promise<Metadata> {
  const { course, chapter } = await params;
  const c = (await getAllowedSlugs()).has(course)
    ? getCourse(course)
    : undefined;
  const found = c && getChapter(c, chapter);
  return { title: found ? `${found.chapter.title} · ${c.title}` : 'Lesson' };
}

export default async function LessonPage({
  params,
}: PageProps<'/courses/[course]/[chapter]'>) {
  const { user } = await requireMember();
  const { course: courseSlug, chapter: chapterSlug } = await params;
  const course = getCourse(courseSlug);
  const found = course && getChapter(course, chapterSlug);
  if (!course || !found) notFound();
  await requireCourseAccess(course.slug);
  const { chapter, prev, next } = found;

  const [progress, checklistState] = await Promise.all([
    getUserProgress(user.id),
    chapter.checklistItems?.length
      ? getChecklistState(user.id, course.slug)
      : {},
  ]);
  const completed = (progress.completed[course.slug] ?? []).includes(
    chapter.slug,
  );

  const toc: TocItem[] = chapter.headings.map((h) => ({
    id: h.id,
    text: h.text,
    level: h.level,
  }));
  if (chapter.kind === 'glossary-check' && course.glossary.length) {
    toc.push({ id: 'glossary', text: 'Glossary', level: 2 });
  }
  const href = (slug: string) => `/courses/${course.slug}/${slug}`;

  return (
    <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)] gap-10 px-4 py-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
      <main className="min-w-0">
        <Breadcrumbs
          items={[
            { label: 'Courses', href: '/' },
            { label: course.title, href: `/courses/${course.slug}` },
            { label: chapter.title },
          ]}
        />
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          <span className="text-muted-foreground mr-2 tabular-nums">
            {chapter.index}.
          </span>
          {chapter.title}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Chapter {chapter.index} of {course.chapters.length} ·{' '}
          {chapter.readingMinutes} min read
        </p>

        <div className="mt-4">
          <MobileToc items={toc} />
        </div>

        <div className="mt-6 max-w-[72ch]">
          {chapter.markdown && (
            <LessonMarkdown
              markdown={chapter.markdown}
              courseSlug={course.slug}
              checklist={chapter.checklistItems}
              checked={checklistState}
            />
          )}

          {chapter.kind === 'qa' && chapter.qa && (
            <div className={chapter.markdown ? 'mt-6' : ''}>
              <QaAccordion
                items={chapter.qa.map((q) => ({
                  number: q.number,
                  question: q.question,
                  answer: (
                    <LessonMarkdown
                      markdown={q.answerMarkdown}
                      className="prose-base"
                    />
                  ),
                }))}
              />
            </div>
          )}

          {chapter.kind === 'glossary-check' && course.glossary.length > 0 && (
            <section
              id="glossary"
              aria-labelledby="glossary-title"
              className="mt-10 scroll-mt-20"
            >
              <h2
                id="glossary-title"
                className="mb-3 text-xl font-semibold tracking-tight"
              >
                Glossary
              </h2>
              <GlossaryTable entries={course.glossary} />
            </section>
          )}
        </div>

        <PositionTracker courseSlug={course.slug} chapterSlug={chapter.slug} />
        <LessonFooter
          courseSlug={course.slug}
          chapterSlug={chapter.slug}
          initialCompleted={completed}
          prev={prev ? { href: href(prev.slug), title: prev.title } : null}
          next={next ? { href: href(next.slug), title: next.title } : null}
        />
      </main>

      <aside className="hidden lg:block">
        <Toc items={toc} />
      </aside>
    </div>
  );
}
