import { Suspense } from 'react';
import { AppHeader } from '@/components/app-header';
import { Skeleton } from '@/components/ui/skeleton';
import { requireMember } from '@/lib/auth';

async function Shell({ children }: { children: React.ReactNode }) {
  const { member, user } = await requireMember();
  return (
    <>
      <AppHeader
        name={member.full_name ?? user.email}
        isAdmin={member.role === 'admin'}
      />
      <div id="main" className="flex-1">
        {children}
      </div>
    </>
  );
}

function ShellFallback() {
  return (
    <div
      className="mx-auto w-full max-w-6xl space-y-4 px-4 py-8"
      aria-busy="true"
    >
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-32 w-full" />
      <div className="grid gap-4 sm:grid-cols-2">
        <Skeleton className="h-44" />
        <Skeleton className="h-44" />
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<ShellFallback />}>
      <Shell>{children}</Shell>
    </Suspense>
  );
}
