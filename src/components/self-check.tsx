'use client';

import { CheckIcon, RotateCcwIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { setSelfCheckResult } from '@/lib/progress-actions';

export type SelfCheckItem = {
  key: string;
  number: number;
  question: string;
  answer: React.ReactNode | null; // null when the module has no answer guide
};
type Result = 'got_it' | 'review';

function QuestionCard({
  item,
  result,
  onSave,
}: {
  item: SelfCheckItem;
  result?: Result;
  onSave: (key: string, r: Result) => void;
}) {
  const [text, setText] = useState(''); // never saved
  const [revealed, setRevealed] = useState(false);
  const hasGuide = item.answer !== null;
  const canMark = revealed || !hasGuide || Boolean(result);

  return (
    <div className="bg-card rounded-xl border p-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium">
          <span className="text-muted-foreground mr-2 tabular-nums">
            {item.number}.
          </span>
          {item.question}
        </h3>
        {result && (
          <Badge
            variant={result === 'got_it' ? 'default' : 'secondary'}
            className="shrink-0"
          >
            {result === 'got_it' ? 'Got it' : 'To review'}
          </Badge>
        )}
      </div>

      <label htmlFor={`answer-${item.key}`} className="sr-only">
        Your answer (not saved)
      </label>
      <Textarea
        id={`answer-${item.key}`}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your own answer here first…"
        rows={3}
        className="mt-3"
      />
      <p className="text-muted-foreground mt-1 text-xs">
        What you type here is not saved.
      </p>

      {hasGuide && !revealed && (
        <Button
          type="button"
          variant="outline"
          className="mt-3"
          onClick={() => setRevealed(true)}
        >
          Show answer guide
        </Button>
      )}
      {hasGuide && revealed && (
        <div className="bg-muted/50 mt-3 rounded-lg border p-3">
          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
            Answer guide
          </p>
          {item.answer}
        </div>
      )}
      {!hasGuide && (
        <p className="text-muted-foreground mt-3 text-sm">
          Discuss this with your lead.
        </p>
      )}

      {canMark && (
        <div
          className="mt-3 flex flex-wrap gap-2"
          role="group"
          aria-label="How did you do?"
        >
          <Button
            type="button"
            variant={result === 'got_it' ? 'default' : 'outline'}
            aria-pressed={result === 'got_it'}
            onClick={() => onSave(item.key, 'got_it')}
          >
            <CheckIcon aria-hidden /> I got it
          </Button>
          <Button
            type="button"
            variant={result === 'review' ? 'default' : 'outline'}
            aria-pressed={result === 'review'}
            onClick={() => onSave(item.key, 'review')}
          >
            <RotateCcwIcon aria-hidden /> Need to review
          </Button>
        </div>
      )}
    </div>
  );
}

export function SelfCheck({
  courseSlug,
  items,
  initial,
}: {
  courseSlug: string;
  items: SelfCheckItem[];
  initial: Record<string, Result>;
}) {
  const [results, setResults] = useState(initial);
  const [view, setView] = useState<'one' | 'all'>('one');
  const [onlyMissed, setOnlyMissed] = useState(false);
  const [index, setIndex] = useState(0);

  const got = items.filter((i) => results[i.key] === 'got_it').length;
  const review = items.filter((i) => results[i.key] === 'review').length;
  const notAttempted = items.length - got - review;

  const visible = onlyMissed
    ? items.filter((i) => results[i.key] === 'review')
    : items;
  const current = visible[Math.min(index, Math.max(visible.length - 1, 0))];

  const save = async (key: string, result: Result) => {
    const before = results[key];
    setResults((r) => ({ ...r, [key]: result })); // optimistic
    const res = await setSelfCheckResult(courseSlug, key, result).catch(
      () => null,
    );
    if (!res?.ok) {
      setResults((r) => {
        const next = { ...r };
        if (before) next[key] = before;
        else delete next[key];
        return next;
      });
      toast.error(res?.message ?? 'Could not save. Please try again.');
    }
  };

  return (
    <div>
      <div
        className="bg-card flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3"
        aria-live="polite"
      >
        <p className="text-sm">
          <strong>{got}</strong> got it, <strong>{review}</strong> to review,{' '}
          <strong>{notAttempted}</strong> not attempted
        </p>
        <p className="text-muted-foreground text-xs">
          Self-reported. You mark your own answers.
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant={view === 'one' ? 'default' : 'outline'}
          aria-pressed={view === 'one'}
          onClick={() => setView('one')}
        >
          One at a time
        </Button>
        <Button
          type="button"
          size="sm"
          variant={view === 'all' ? 'default' : 'outline'}
          aria-pressed={view === 'all'}
          onClick={() => setView('all')}
        >
          All questions
        </Button>
        <Button
          type="button"
          size="sm"
          variant={onlyMissed ? 'default' : 'outline'}
          aria-pressed={onlyMissed}
          disabled={review === 0 && !onlyMissed}
          onClick={() => {
            setOnlyMissed((v) => !v);
            setIndex(0);
          }}
        >
          Review the ones I missed ({review})
        </Button>
      </div>

      <div className="mt-4 space-y-3">
        {visible.length === 0 && (
          <p className="text-muted-foreground rounded-lg border p-4 text-sm">
            Nothing marked for review. Turn off the filter to see all questions.
          </p>
        )}
        {view === 'one' && current && (
          <>
            <p className="text-muted-foreground text-sm">
              Question {Math.min(index, visible.length - 1) + 1} of{' '}
              {visible.length}
            </p>
            <QuestionCard
              key={current.key}
              item={current}
              result={results[current.key]}
              onSave={save}
            />
            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                disabled={index <= 0}
                onClick={() => setIndex((i) => i - 1)}
              >
                Previous question
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={index >= visible.length - 1}
                onClick={() => setIndex((i) => i + 1)}
              >
                Next question
              </Button>
            </div>
          </>
        )}
        {view === 'all' &&
          visible.map((item) => (
            <QuestionCard
              key={item.key}
              item={item}
              result={results[item.key]}
              onSave={save}
            />
          ))}
      </div>
    </div>
  );
}
