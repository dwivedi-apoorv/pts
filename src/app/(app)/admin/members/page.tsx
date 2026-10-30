import Link from 'next/link';
import {
  AddMemberButton,
  MemberRowActions,
} from '@/components/admin/member-dialogs';
import { ImportMembersButton } from '@/components/admin/import-members';
import { ProgressBar } from '@/components/progress-bar';
import { Badge } from '@/components/ui/badge';
import { requireAdmin } from '@/lib/auth';
import { loadTeam } from '@/lib/admin/data';
import { filterAndSort } from '@/lib/admin/stats';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'Members' };

export default async function MembersPage() {
  const { member: me } = await requireAdmin();
  const { team, roles } = await loadTeam();
  const roleName = new Map(roles.roles.map((r) => [r.id, r.name]));
  const roleOptions = roles.enabled
    ? roles.roles.map((r) => ({ id: r.id, name: r.name }))
    : null;
  const rows = filterAndSort(team, { sort: 'name' });

  return (
    <main className="mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold">Members</h1>
          <p className="text-muted-foreground text-sm">
            {team.length} in total. Only active members on this list can sign
            in.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <ImportMembersButton />
          <AddMemberButton roles={roleOptions} />
        </div>
      </div>

      {rows.length === 0 ? (
        <p className="mt-4 rounded-lg border p-6 text-center text-sm">
          No members yet. Add the first one.
        </p>
      ) : (
        <div
          className="mt-4 overflow-x-auto rounded-xl border"
          role="region"
          aria-label="Members"
          tabIndex={0}
        >
          <table className="w-full text-sm">
            <thead className="bg-muted text-left">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Name
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Email
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Access
                </th>
                {roles.enabled && (
                  <th scope="col" className="px-3 py-2 font-semibold">
                    Role
                  </th>
                )}
                <th scope="col" className="px-3 py-2 font-semibold">
                  Active
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Last login
                </th>
                <th scope="col" className="min-w-32 px-3 py-2 font-semibold">
                  Progress
                </th>
                <th scope="col" className="px-3 py-2 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-t align-middle">
                  <td className="px-3 py-2 font-medium">
                    <Link
                      href={`/admin/members/${m.id}`}
                      className="hover:underline"
                    >
                      {m.full_name || '—'}
                    </Link>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{m.email}</td>
                  <td className="px-3 py-2">
                    <Badge
                      variant={m.role === 'admin' ? 'default' : 'secondary'}
                    >
                      {m.role}
                    </Badge>
                  </td>
                  {roles.enabled && (
                    <td className="px-3 py-2 whitespace-nowrap">
                      {m.role === 'admin' ? (
                        <span className="text-muted-foreground">
                          All courses
                        </span>
                      ) : m.role_id && roleName.get(m.role_id) ? (
                        roleName.get(m.role_id)
                      ) : (
                        <span className="text-muted-foreground">No role</span>
                      )}
                    </td>
                  )}
                  <td className="px-3 py-2">
                    {m.active ? 'Yes' : <Badge variant="outline">No</Badge>}
                  </td>
                  <td className="text-muted-foreground px-3 py-2 whitespace-nowrap">
                    {formatDate(m.last_login_at)}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <ProgressBar
                        percent={m.overallPercent}
                        label={`${m.email} overall progress`}
                      />
                      <span className="w-10 text-right tabular-nums">
                        {m.overallPercent}%
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <MemberRowActions
                      isSelf={m.id === me.id}
                      member={{
                        id: m.id,
                        email: m.email,
                        full_name: m.full_name,
                        role: m.role,
                        role_id: m.role_id ?? null,
                        active: m.active,
                      }}
                      roles={roleOptions}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
