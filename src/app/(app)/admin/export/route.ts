import { logAudit } from '@/lib/admin/audit';
import { toCsv } from '@/lib/admin/csv';
import { loadTeam } from '@/lib/admin/data';
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

  return new Response('Use ?type=progress', { status: 400 });
}
