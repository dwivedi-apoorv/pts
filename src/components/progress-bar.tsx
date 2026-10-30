import { cn } from '@/lib/utils';

export function ProgressBar({
  percent,
  label,
  className,
}: {
  percent: number;
  label: string;
  className?: string;
}) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={cn(
        'bg-muted h-2 w-full overflow-hidden rounded-full',
        className,
      )}
    >
      <div
        className="bg-primary h-full rounded-full transition-[width] motion-reduce:transition-none"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
