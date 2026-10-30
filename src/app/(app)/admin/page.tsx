import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { requireAdmin } from '@/lib/auth';
import { loadTeam } from '@/lib/admin/data';
import {
  band,
  filterAndSort,
  needsNudge,
  summarise,
  type SortKey,
} from '@/lib/admin/stats';
import { daysAgo, formatDate } from '@/lib/format';
import { cn } from '@/lib/utils';

export const metadata = { title: 'Team overview' };

const BAND_CLASS = {
  none: 'bg-muted text-muted-foreground',
  low: 'bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-200',
  mid: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200',
  high: 'bg-lime-100 text-lime-900 dark:bg-lime-950 dark:text-lime-200',
  done: 'bg-green-200 text-green-950 dark:bg-green-900 dark:text-green-100',
} as const;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const pick = <T extends string>(
  v: string | undefined,
  allowed: readonly T[],
  fallback: T,
): T => (allowed.includes(v as T) ? (v as T) : fallback);

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-8 rounded-lg border px-2.5 text-sm focus-visible:ring-3 focus-visible:outline-none';

export default async function AdminOverview({
  searchParams,
}: PageProps<'/admin'>) {
  await requireAdmin();
  const sp = await searchParams;
  const sort = pick<SortKey>(
    one(sp.sort),
    ['name', 'login', 'progress'],
    'name',
  );
  const role = pick(one(sp.role), ['all', 'learner', 'admin'] as const, 'all');
  const status = pick(
    one(sp.status),
    ['all', 'active', 'inactive'] as const,
    'all',
  );

  const { courses, team } = await loadTeam();
  const now = new Date();
  const summary = summarise(team);
  const rows = filterAndSort(team, { sort, role, status });
  const nudges = needsNudge(team, now);

  const tiles = [
    { label: 'Active members', value: summary.activeMembers },
    { label: 'Never logged in', value: summary.neverLoggedIn },
    { label: 'Average completion', value: `${summary.averageCompletion}%` },
    { label: 'Courses completed (total)', value: summary.coursesCompleted },
  ];

  return (
    <main className="mt-6">
      <h1 className="sr-only">Team overview</h1>
      <section
        aria-label="Summary"
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {tiles.map((t) => (
          <div key={t.label} className="bg-card rounded-xl border p-4">
            <p className="text-3xl font-semibold tabular-nums">{t.value}</p>
            <p className="text-muted-foreground mt-1 text-sm">{t.label}</p>
          </div>
        ))}
      </section>

      <section aria-labelledby="nudge" className="mt-8">
        <h2 id="nudge" className="text-lg font-semibold">
          Needs a nudge
        </h2>
        <p className="text-muted-foreground text-sm">
          Active members who have not finished onboarding and have had no
          activity for 14 days.
        </p>
        {nudges.length === 0 ? (
          <p className="mt-3 rounded-lg border p-4 text-sm">
            Nobody needs a nudge right now.
          </p>
        ) : (
          <ul className="mt-3 divide-y rounded-xl border">
            {nudges.map((m) => (
              <li
                key={m.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
              >
                <Link
                  href={`/admin/members/${m.id}`}
                  className="font-medium hover:underline"
                >
                  {m.full_name || m.email}
                </Link>
                <span className="text-muted-foreground text-sm">
                  Last activity{' '}
                  {m.lastActivity
                    ? daysAgo(m.lastActivity, now)
                    : `none (added ${daysAgo(m.created_at, now)})`}
                  {' · '}onboarding {m.perCourse[courses[0].slug].percent}%
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="matrix" className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="matrix" className="text-lg font-semibold">
            Progress by member
          </h2>
          <form
            action="/admin"
            className="flex flex-wrap items-center gap-2 text-sm"
          >
            <label className="flex items-center gap-1.5">
              Sort
              <select name="sort" defaultValue={sort} className={selectClass}>
                <option value="name">Name</option>
                <option value="login">Last login</option>
                <option value="progress">Overall progress</option>
              </select>
            </label>
            <label className="flex items-center gap-1.5">
              Role
              <select name="role" defaultValue={role} className={selectClass}>
                <option value="all">All</option>
                <option value="learner">Learners</option>
                <option value="admin">Admins</option>
              </select>
            </label>
            <label className="flex items-center gap-1.5">
              Status
              <select
                name="status"
                defaultValue={status}
                className={selectClass}
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <button className={buttonVariants({ size: 'sm' })}>Apply</button>
          </form>
        </div>

        {rows.length === 0 ? (
          <p className="mt-3 rounded-lg border p-6 text-center text-sm">
            No members match these filters.
          </p>
        ) : (
          <div
            className="mt-3 overflow-x-auto rounded-xl border"
            role="region"
            aria-label="Progress matrix"
            tabIndex={0}
          >
            <table className="w-full text-sm">
              <thead className="bg-muted text-left">
                <tr>
                  <th
                    scope="col"
                    className="bg-muted sticky left-0 px-3 py-2 font-semibold"
                  >
                    Member
                  </th>
                  {courses.map((c) => (
                    <th
                      key={c.slug}
                      scope="col"
                      className="min-w-24 px-2 py-2 text-center font-semibold"
                      title={c.title}
                    >
                      {c.title.replace(
                        / for Project Managers| Team Onboarding Module/g,
                        '',
                      )}
                    </th>
                  ))}
                  <th
                    scope="col"
                    className="px-2 py-2 text-center font-semibold"
                  >
                    Overall
                  </th>
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Last login
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((m) => (
                  <tr key={m.id} className="border-t">
                    <th
                      scope="row"
                      className="bg-background sticky left-0 px-3 py-2 text-left font-medium"
                    >
                      <Link
                        href={`/admin/members/${m.id}`}
                        className="hover:underline"
                      >
                        {m.full_name || m.email}
                      </Link>
                      <span className="mt-0.5 flex gap-1">
                        {m.role === 'admin' && (
                          <Badge variant="secondary">Admin</Badge>
                        )}
                        {!m.active && <Badge variant="outline">Inactive</Badge>}
                      </span>
                    </th>
                    {courses.map((c) => {
                      if (!m.assigned.has(c.slug)) {
                        return (
                          <td
                            key={c.slug}
                            className="text-muted-foreground p-1 text-center"
                            title="Not assigned to this member"
                          >
                            <span aria-label={`${c.title}: not assigned`}>
                              —
                            </span>
                          </td>
                        );
                      }
                      const p = m.perCourse[c.slug].percent;
                      return (
                        <td key={c.slug} className="p-1 text-center">
                          <Link
                            href={`/admin/members/${m.id}`}
                            aria-label={`${m.full_name || m.email}, ${c.title}: ${p}%`}
                            className={cn(
                              'block rounded-md px-2 py-1.5 tabular-nums',
                              BAND_CLASS[band(p)],
                            )}
                          >
                            {p}%
                          </Link>
                        </td>
                      );
                    })}
                    <td className="p-1 text-center">
                      <Link
                        href={`/admin/members/${m.id}`}
                        className={cn(
                          'block rounded-md px-2 py-1.5 font-semibold tabular-nums',
                          BAND_CLASS[band(m.overallPercent)],
                        )}
                      >
                        {m.overallPercent}%
                      </Link>
                    </td>
                    <td className="text-muted-foreground px-3 py-2 whitespace-nowrap">
                      {formatDate(m.last_login_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="text-muted-foreground mt-2 text-xs">
          Colour bands: 0% grey, 1 to 33% red, 34 to 66% amber, 67 to 99% light
          green, 100% green. A dash means the course is not assigned to that
          member. Percentages only count assigned courses.
        </p>
      </section>
    </main>
  );
}
