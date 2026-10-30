import { RolesManager } from '@/components/admin/roles-manager';
import { loadRoles } from '@/lib/admin/data';
import { requireAdmin } from '@/lib/auth';
import { getCourses } from '@/lib/content';

export const metadata = { title: 'Roles' };

export default async function RolesPage() {
  await requireAdmin();
  const data = await loadRoles();
  const courses = getCourses().map((c) => ({ slug: c.slug, title: c.title }));

  return (
    <main className="mt-6">
      <h1 className="text-lg font-semibold">Roles and course assignment</h1>
      <p className="text-muted-foreground text-sm">
        Choose which courses each role sees. A member has one role. Admins
        always see every course.
      </p>
      {data.enabled ? (
        <RolesManager
          courses={courses}
          roles={data.roles}
          forEveryone={data.forEveryone}
        />
      ) : (
        <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          <p className="font-semibold">
            Roles are not set up in the database yet.
          </p>
          <p className="mt-1">
            Open the Supabase <strong>SQL Editor</strong>, paste the contents of{' '}
            <code>supabase/migrations/0002_roles.sql</code> and run it. Then
            reload this page. Until then every member keeps seeing every course.
          </p>
        </div>
      )}
    </main>
  );
}
