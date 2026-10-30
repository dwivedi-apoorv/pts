'use client';

import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { setChecklistItem } from '@/lib/progress-actions';

type Ctx = { checked: Record<string, boolean>; toggle: (key: string) => void };
const ChecklistContext = createContext<Ctx | null>(null);

/** One checkbox list: owns the saved state and shows "x of y done" at the top. */
export function ChecklistGroup({
  courseSlug,
  keys,
  initial,
  children,
}: {
  courseSlug: string;
  keys: string[];
  initial: Record<string, boolean>;
  children: React.ReactNode;
}) {
  const [checked, setChecked] = useState(initial);
  const done = keys.filter((k) => checked[k]).length;

  const toggle = async (key: string) => {
    const next = !checked[key];
    setChecked((c) => ({ ...c, [key]: next })); // optimistic
    const res = await setChecklistItem(courseSlug, key, next).catch(() => null);
    if (!res?.ok) {
      setChecked((c) => ({ ...c, [key]: !next })); // roll back
      toast.error(res?.message ?? 'Could not save. Please try again.');
    }
  };

  return (
    <ChecklistContext.Provider value={{ checked, toggle }}>
      <p
        aria-live="polite"
        className="text-muted-foreground text-sm font-medium"
      >
        {done} of {keys.length} done
      </p>
      <ul className="contains-task-list">{children}</ul>
    </ChecklistContext.Provider>
  );
}

export function ChecklistItem({
  itemKey,
  children,
}: {
  itemKey: string;
  children: React.ReactNode;
}) {
  const ctx = useContext(ChecklistContext);
  const checked = ctx?.checked[itemKey] ?? false;
  return (
    <div className="flex items-start gap-3 py-1">
      <Checkbox
        checked={checked}
        onCheckedChange={() => ctx?.toggle(itemKey)}
        aria-label="Mark item done"
        className="mt-1"
      />
      <span
        className={checked ? 'text-muted-foreground line-through' : undefined}
      >
        {children}
      </span>
    </div>
  );
}
