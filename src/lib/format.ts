const date = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeZone: 'UTC',
});
const dateTime = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'UTC',
});

export const formatDate = (iso: string | null | undefined) =>
  iso ? date.format(new Date(iso)) : 'Never';
export const formatDateTime = (iso: string | null | undefined) =>
  iso ? `${dateTime.format(new Date(iso))} UTC` : 'Never';

export function daysAgo(iso: string | null | undefined, now: Date): string {
  if (!iso) return 'never';
  const d = Math.floor((now.getTime() - new Date(iso).getTime()) / 86_400_000);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : `${d} days ago`;
}
