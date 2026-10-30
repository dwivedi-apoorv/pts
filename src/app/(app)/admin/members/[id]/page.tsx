import { CheckCircle2Icon, CircleIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ProgressBar } from '@/components/progress-bar';
import { StatusChip } from '@/components/status-chip';
import { Badge } from '@/components/ui/badge';
import { requireAdmin } from '@/lib/auth';
import { loadMemberDetail } from '@/lib/admin/data';
import { formatDate, formatDateTime } from '@/lib/format';

export const metadata = { title: 'Member progress' };

export default async function MemberDetail({
  params,
}: PageProps<'/admin/members/[id]'>) {
  await requireAdmin();
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const detail = await loadMemberDetail(id);
  if (!detail) notFound();
  const { courses, member: m, progress, checks, role, rolesEnabled } = detail;
  const completedAt = new Map(
    progress.map((p) => [`${p.course_slug}/${p.chapter_slug}`, p.completed_at]),
  );
  const resultByKey = new Map(
    checks.map((c) => [`${c.course_slug}/${c.question_key}`, c]),
  );

  return (
    <main className="mt-6">
      <Link
        href="/admin/members"
        className="text-muted-foreground hover:text-foreground text-sm"
      >
        ← All members
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          {m.full_name || m.email}
        </h1>
        <Badge variant={m.role === 'admin' ? 'default' : 'secondary'}>
          {m.role}
        </Badge>
        {!m.active && <Badge variant="outline">Inactive</Badge>}
      </div>
      <p className="text-muted-foreground text-sm">{m.email}</p>
      {rolesEnabled && (
        <p className="mt-1 text-sm">
          <span className="text-muted-foreground">Role: </span>
          {m.role === 'admin'
            ? 'Admin (sees every course)'
            : (role?.name ?? 'No role (only courses for everyone)')}
        </p>
      )}
      <dl className="mt-4 grid gap-3 sm:grid-cols-4">
        {[
          ['Overall progress', `${m.overallPercent}%`],
          ['Chapters completed', `${m.chaptersDone}`],
          ['Last login', formatDateTime(m.last_login_at)],
          ['Last activity', formatDateTime(m.lastActivity)],
        ].map(([k, v]) => (
          <div key={k} className="bg-card rounded-xl border p-3">
            <dt className="text-muted-foreground text-xs">{k}</dt>
            <dd className="mt-0.5 font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <h2 className="mt-8 text-lg font-semibold">Progress by course</h2>
      <div className="mt-3 space-y-4">
        {courses.map((course) => {
          const p = m.perCourse[course.slug];
          const answered = course.knowledgeCheck.map((q) =>
            resultByKey.get(`${course.slug}/${q.key}`),
          );
          const assigned = m.assigned.has(course.slug);
          const got = answered.filter((a) => a?.result === 'got_it').length;
          const review = answered.filter((a) => a?.result === 'review').length;
          return (
            <section
              key={course.slug}
              className={`bg-card rounded-xl border p-4 ${assigned ? '' : 'opacity-60'}`}
              aria-labelledby={`c-${course.slug}`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 id={`c-${course.slug}`} className="font-semibold">
                  {course.title}
                </h3>
                {assigned ? (
                  <StatusChip status={p.status} />
                ) : (
                  <Badge variant="outline">Not assigned</Badge>
                )}
              </div>
              <div className="mt-3 flex items-center gap-3">
                <ProgressBar
                  percent={p.percent}
                  label={`${course.title} progress`}
                />
                <span className="w-28 text-right text-sm tabular-nums">
                  {p.done} of {p.total} ({p.percent}%)
                </span>
              </div>

              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-medium">
                  Chapters
                </summary>
                <ol className="mt-2 divide-y rounded-lg border">
                  {course.chapters.map((ch) => {
                    const at = completedAt.get(`${course.slug}/${ch.slug}`);
                    return (
                      <li
                        key={ch.slug}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm"
                      >
                        {at ? (
                          <CheckCircle2Icon
                            className="text-primary size-4 shrink-0"
                            aria-label="Completed"
                          />
                        ) : (
                          <CircleIcon
                            className="text-muted-foreground size-4 shrink-0"
                            aria-label="Not completed"
                          />
                        )}
                        <span className="text-muted-foreground w-6 tabular-nums">
                          {ch.index}.
                        </span>
                        <span className="flex-1">{ch.title}</span>
                        <span className="text-muted-foreground text-xs">
                          {at ? formatDate(at) : ''}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </details>

              {course.knowledgeCheck.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-sm font-medium">
                    Self-check (self-reported): {got} got it, {review} to
                    review, {course.knowledgeCheck.length - got - review} not
                    attempted
                  </summary>
                  <ol className="mt-2 divide-y rounded-lg border">
                    {course.knowledgeCheck.map((q, i) => {
                      const a = answered[i];
                      return (
                        <li
                          key={q.key}
                          className="flex items-start gap-2 px-3 py-1.5 text-sm"
                        >
                          <span className="text-muted-foreground w-6 tabular-nums">
                            {q.number}.
                          </span>
                          <span className="flex-1">{q.question}</span>
                          <Badge
                            variant={
                              a?.result === 'got_it'
                                ? 'default'
                                : a
                                  ? 'secondary'
                                  : 'outline'
                            }
                          >
                            {a
                              ? a.result === 'got_it'
                                ? 'Got it'
                                : 'To review'
                              : 'Not attempted'}
                          </Badge>
                        </li>
                      );
                    })}
                  </ol>
                </details>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
