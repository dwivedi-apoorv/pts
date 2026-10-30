import { Badge } from '@/components/ui/badge';
import { STATUS_LABEL, type CourseStatus } from '@/lib/progress-calc';

export function StatusChip({ status }: { status: CourseStatus }) {
  return (
    <Badge
      variant={
        status === 'completed'
          ? 'default'
          : status === 'in-progress'
            ? 'secondary'
            : 'outline'
      }
    >
      {STATUS_LABEL[status]}
    </Badge>
  );
}
