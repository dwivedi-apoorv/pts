'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const items = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/members', label: 'Members' },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 border-b">
      {items.map((i) => {
        const active = i.exact ? path === i.href : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              '-mb-px border-b-2 px-3 py-2 text-sm font-medium',
              active
                ? 'border-primary text-foreground'
                : 'text-muted-foreground hover:text-foreground border-transparent',
            )}
          >
            {i.label}
          </Link>
        );
      })}
      <a
        href="/admin/export?type=progress"
        className="text-muted-foreground hover:text-foreground ml-auto px-3 py-2 text-sm"
      >
        Export CSV
      </a>
    </nav>
  );
}
