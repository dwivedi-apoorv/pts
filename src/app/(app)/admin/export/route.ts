import { logAudit } from '@/lib/admin/audit';
import { toCsv } from '@/lib/admin/csv';
import { loadSelfCheckAll, loadTeam } from '@/lib/admin/data';
import { requireAdmin } from '@/lib/auth';

const file = (name: string, body: string) =>
  new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${name}"`,
      'Cache-Control': 'no-store',
    },
  });

export async function GET(request: Request) {
  const { member: actor } = await requireAdmin();
  const type = new URL(request.url).searchParams.get('type');
  const stamp = new Date().toISOString().slice(0, 10);

  if (type === 'progress') {
    const { courses, team } = await loadTeam();
    const rows: unknown[][] = [
      [
        'Name',
        'Email',
        'Role',
        'Active',
        'Last login',
        'Last activity',
        ...courses.map((c) => `${c.title} (%)`),
        'Overall (%)',
        'Chapters done',
      ],
      ...team.map((m) => [
        m.full_name ?? '',
        m.email,
        m.role,
        m.active ? 'yes' : 'no',
        m.last_login_at ?? '',
        m.lastActivity ?? '',
        ...courses.map((c) => m.perCourse[c.slug].percent),
        m.overallPercent,
        m.chaptersDone,
      ]),
    ];
    await logAudit(actor, 'export.progress', null, { rows: team.length });
    return file(`progress-${stamp}.csv`, toCsv(rows));
  }

  if (type === 'selfcheck') {
    const { members, rows, courses } = await loadSelfCheckAll();
    const byUser = new Map(
      members.filter((m) => m.auth_user_id).map((m) => [m.auth_user_id!, m]),
    );
    const out: unknown[][] = [
      [
        'Name',
        'Email',
        'Course',
        'Question number',
        'Question',
        'Result (self-reported)',
        'Updated',
      ],
    ];
    for (const r of rows) {
      const m = byUser.get(r.user_id);
      const course = courses.find((c) => c.slug === r.course_slug);
      const q = course?.knowledgeCheck.find((k) => k.key === r.question_key);
      out.push([
        m?.full_name ?? '',
        m?.email ?? '(deleted member)',
        course?.title ?? r.course_slug,
        q?.number ?? '',
        q?.question ?? '(question was edited or removed)',
        r.result === 'got_it' ? 'Got it' : 'Need to review',
        r.updated_at,
      ]);
    }
    await logAudit(actor, 'export.selfcheck', null, { rows: rows.length });
    return file(`self-check-${stamp}.csv`, toCsv(out));
  }

  return new Response('Use ?type=progress or ?type=selfcheck', { status: 400 });
}
