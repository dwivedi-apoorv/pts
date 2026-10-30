'use client';

import {
  CheckCircle2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button, buttonVariants } from '@/components/ui/button';
import { setChapterComplete } from '@/lib/progress-actions';

type Target = { href: string; title: string } | null;

/**
 * Previous / Mark complete / Next, as a footer row on desktop and a fixed bar on
 * phones. Marking complete moves on to the next chapter; arrow keys navigate.
 */
export function LessonFooter({
  courseSlug,
  chapterSlug,
  initialCompleted,
  prev,
  next,
}: {
  courseSlug: string;
  chapterSlug: string;
  initialCompleted: boolean;
  prev: Target;
  next: Target;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initialCompleted);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (
        t &&
        (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))
      )
        return;
      if (e.key === 'ArrowLeft' && prev) router.push(prev.href);
      if (e.key === 'ArrowRight' && next) router.push(next.href);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, router]);

  const toggle = async () => {
    if (busy) return;
    const target = !completed;
    setBusy(true);
    setCompleted(target); // optimistic
    const res = await setChapterComplete(courseSlug, chapterSlug, target).catch(
      () => null,
    );
    setBusy(false);
    if (!res?.ok) {
      setCompleted(!target);
      toast.error(res?.message ?? 'Could not save. Please try again.');
      return;
    }
    if (target) {
      if (next) router.push(next.href);
      else
        toast.success(
          'Chapter complete. That was the last chapter of the course.',
        );
    }
  };

  const completeButton = (compact: boolean) => (
    <Button
      type="button"
      variant={completed ? 'secondary' : 'default'}
      size={compact ? 'default' : 'lg'}
      onClick={toggle}
      disabled={busy}
      aria-pressed={completed}
    >
      {completed ? (
        <CheckCircle2Icon aria-hidden />
      ) : (
        <CircleIcon aria-hidden />
      )}
      {completed
        ? compact
          ? 'Completed'
          : 'Completed (undo)'
        : compact
          ? 'Complete'
          : 'Mark as complete'}
    </Button>
  );

  const navLink = (t: Target, dir: 'prev' | 'next', compact: boolean) =>
    t ? (
      <Link
        href={t.href}
        rel={dir}
        className={buttonVariants({
          variant: 'outline',
          size: compact ? 'default' : 'lg',
        })}
      >
        {dir === 'prev' && <ChevronLeftIcon aria-hidden />}
        {compact
          ? dir === 'prev'
            ? 'Prev'
            : 'Next'
          : dir === 'prev'
            ? 'Previous'
            : 'Next'}
        {dir === 'next' && <ChevronRightIcon aria-hidden />}
      </Link>
    ) : (
      <span className="w-0" />
    );

  return (
    <>
      <nav
        aria-label="Chapter navigation"
        className="mt-10 hidden items-center justify-between gap-3 border-t pt-6 md:flex"
        data-print-hide
      >
        {navLink(prev, 'prev', false)}
        {completeButton(false)}
        {navLink(next, 'next', false)}
      </nav>
      <div className="h-16 md:hidden" aria-hidden />
      <nav
        aria-label="Chapter navigation"
        className="bg-background/95 fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-2 border-t px-3 py-2 backdrop-blur md:hidden"
        data-print-hide
      >
        {navLink(prev, 'prev', true)}
        {completeButton(true)}
        {navLink(next, 'next', true)}
      </nav>
    </>
  );
}
