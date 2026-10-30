'use client';

import { ListIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type TocItem = { id: string; text: string; level: 2 | 3 };

function useActiveId(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-80px 0px -65% 0px' },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function Links({
  items,
  active,
  onClick,
}: {
  items: TocItem[];
  active: string | null;
  onClick?: () => void;
}) {
  return (
    <ul className="space-y-1 text-sm">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onClick}
            aria-current={active === item.id ? 'location' : undefined}
            className={cn(
              'text-muted-foreground hover:text-foreground block rounded-sm border-l-2 py-1 pl-3',
              item.level === 3 && 'pl-6',
              active === item.id
                ? 'border-primary text-foreground font-medium'
                : 'border-transparent',
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Sticky "On this page" list for large screens. */
export function Toc({ items }: { items: TocItem[] }) {
  const active = useActiveId(items.map((i) => i.id));
  if (!items.length) return null;
  return (
    <nav
      aria-label="On this page"
      className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto"
      data-print-hide
    >
      <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wide uppercase">
        On this page
      </p>
      <Links items={items} active={active} />
    </nav>
  );
}

/** Collapsible "On this page" bar for small screens. */
export function MobileToc({ items }: { items: TocItem[] }) {
  const [open, setOpen] = useState(false);
  const active = useActiveId(items.map((i) => i.id));
  if (!items.length) return null;
  return (
    <nav
      aria-label="On this page"
      className="bg-card rounded-lg border lg:hidden"
      data-print-hide
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-2 px-3 py-2.5 text-sm font-medium"
      >
        <ListIcon className="size-4" aria-hidden /> On this page
      </button>
      {open && (
        <div className="border-t px-3 py-2">
          <Links items={items} active={active} onClick={() => setOpen(false)} />
        </div>
      )}
    </nav>
  );
}
