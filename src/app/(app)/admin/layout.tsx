import { Suspense } from 'react';
import { AdminNav } from '@/components/admin/admin-nav';
import { requireAdmin } from '@/lib/auth';

async function Gate({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <>{children}</>;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <AdminNav />
      <Suspense
        fallback={
          <p className="text-muted-foreground mt-6 text-sm">Loading…</p>
        }
      >
        <Gate>{children}</Gate>
      </Suspense>
    </div>
  );
}
