import type { Course } from '@/lib/content/types';
import type { SelfCheckResult } from '@/lib/progress';
import { LessonMarkdown } from './lesson-markdown';
import { SelfCheck } from './self-check';

export function KnowledgeCheck({
  courseSlug,
  questions,
  initial,
}: {
  courseSlug: string;
  questions: Course['knowledgeCheck'];
  initial: Record<string, SelfCheckResult>;
}) {
  return (
    <section
      id="knowledge-check"
      aria-labelledby="kc-title"
      className="mt-10 scroll-mt-20"
    >
      <h2 id="kc-title" className="text-xl font-semibold tracking-tight">
        Knowledge check
      </h2>
      <p className="text-muted-foreground mt-1 mb-4 text-sm">
        Answer each question in your own words, then compare with the answer
        guide and mark how you did.
      </p>
      <SelfCheck
        courseSlug={courseSlug}
        initial={initial}
        items={questions.map((q) => ({
          key: q.key,
          number: q.number,
          question: q.question,
          answer: q.answer ? (
            <LessonMarkdown markdown={q.answer} className="prose-sm" />
          ) : null,
        }))}
      />
    </section>
  );
}
