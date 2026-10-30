import { GlossaryBrowser } from '@/components/glossary-browser';
import { requireMember } from '@/lib/auth';
import { getCourses, getGlossary } from '@/lib/content';

export const metadata = { title: 'Glossary' };

export default async function GlossaryPage() {
  await requireMember();
  const courses = getCourses().map((c) => ({
    slug: c.slug,
    title: c.title,
    glossaryChapter:
      c.chapters.find((ch) => ch.kind === 'glossary-check')?.slug ?? null,
  }));
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Glossary</h1>
      <p className="text-muted-foreground mt-1 text-sm">
        Every term from every course. Where courses explain a term differently,
        each meaning is shown with its course.
      </p>
      <GlossaryBrowser entries={getGlossary()} courses={courses} />
    </main>
  );
}
