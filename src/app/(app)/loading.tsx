import { Skeleton } from '@/components/ui/skeleton';

/**
 * Shown while a page's own data loads. It sits below the shared layout, so
 * client-side navigation between pages shows it straight away instead of
 * waiting on the old page.
 */
export default function Loading() {
  return (
    <div
      className="mx-auto w-full max-w-6xl space-y-4 px-4 py-8"
      aria-busy="true"
      aria-live="polite"
    >
      <span className="sr-only">Loading…</span>
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-28 w-full" />
    </div>
  );
}
