import { Skeleton } from '@/components/ui/skeleton';

/** The admin layout (with its tabs) stays on screen while a tab's data loads. */
export default function AdminLoading() {
  return (
    <div className="mt-6 space-y-4" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="h-48 w-full" />
    </div>
  );
}
