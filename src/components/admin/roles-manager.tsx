'use client';

import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  createRole,
  deleteRole,
  setCourseForEveryone,
  updateRole,
  type RoleResult,
} from '@/lib/admin/role-actions';

export type CourseOption = { slug: string; title: string; category: string };
export type RoleRow = {
  id: string;
  name: string;
  description: string | null;
  courses: string[];
  memberCount: number;
};

function report(res: RoleResult | null) {
  if (!res) toast.error('Something went wrong. Please try again.');
  else if (res.ok) toast.success(res.message ?? 'Done.');
  else toast.error(res.message);
  return Boolean(res?.ok);
}

function CourseChecklist({
  courses,
  selected,
  onToggle,
  idPrefix,
}: {
  courses: CourseOption[];
  selected: Set<string>;
  onToggle: (slug: string) => void;
  idPrefix: string;
}) {
  // `courses` arrives already ordered by category, so consecutive items share a heading.
  const groups: { category: string; items: CourseOption[] }[] = [];
  for (const c of courses) {
    const last = groups[groups.length - 1];
    if (last && last.category === c.category) last.items.push(c);
    else groups.push({ category: c.category, items: [c] });
  }
  return (
    <div className="space-y-4">
      {groups.map((g) => (
        <div key={g.category}>
          <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-wide uppercase">
            {g.category}
          </p>
          <ul className="divide-y rounded-lg border">
            {g.items.map((c) => (
              <li key={c.slug}>
                <label
                  htmlFor={`${idPrefix}-${c.slug}`}
                  className="hover:bg-muted/50 flex cursor-pointer items-center gap-3 px-3 py-2 text-sm"
                >
                  <input
                    id={`${idPrefix}-${c.slug}`}
                    type="checkbox"
                    checked={selected.has(c.slug)}
                    onChange={() => onToggle(c.slug)}
                    className="accent-primary size-4"
                  />
                  {c.title}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function RoleDialog({
  open,
  onOpenChange,
  courses,
  role,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  courses: CourseOption[];
  role: RoleRow | null;
}) {
  const [name, setName] = useState(role?.name ?? '');
  const [description, setDescription] = useState(role?.description ?? '');
  const [selected, setSelected] = useState(new Set(role?.courses ?? []));
  const [pending, start] = useTransition();

  const toggle = (slug: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(slug)) next.add(slug);
      return next;
    });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{role ? 'Edit role' : 'New role'}</DialogTitle>
          <DialogDescription>
            Members with this role see these courses, plus any course marked for
            everyone.
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            start(async () => {
              const payload = { name, description, courses: [...selected] };
              const res = await (
                role
                  ? updateRole({ id: role.id, ...payload })
                  : createRole(payload)
              ).catch(() => null);
              if (report(res)) onOpenChange(false);
            });
          }}
        >
          <div>
            <label
              htmlFor="role-name"
              className="mb-1 block text-sm font-medium"
            >
              Role name
            </label>
            <Input
              id="role-name"
              value={name}
              required
              maxLength={60}
              placeholder="For example: Developer"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="role-desc"
              className="mb-1 block text-sm font-medium"
            >
              Description{' '}
              <span className="text-muted-foreground font-normal">
                (optional)
              </span>
            </label>
            <Input
              id="role-desc"
              value={description}
              maxLength={300}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <fieldset>
            <legend className="mb-1 text-sm font-medium">
              Courses for this role
            </legend>
            <div className="max-h-64 overflow-y-auto">
              <CourseChecklist
                courses={courses}
                selected={selected}
                onToggle={toggle}
                idPrefix="rc"
              />
            </div>
          </fieldset>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending || !name.trim()}>
              {pending ? 'Saving…' : role ? 'Save changes' : 'Create role'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function RolesManager({
  courses,
  roles,
  forEveryone,
}: {
  courses: CourseOption[];
  roles: RoleRow[];
  forEveryone: string[];
}) {
  const [everyone, setEveryone] = useState(new Set(forEveryone));
  const [dialog, setDialog] = useState<{ role: RoleRow | null } | null>(null);
  const [deleting, setDeleting] = useState<RoleRow | null>(null);
  const [pending, start] = useTransition();
  const title = (slug: string) =>
    courses.find((c) => c.slug === slug)?.title ?? slug;

  const toggleEveryone = async (slug: string) => {
    const on = !everyone.has(slug);
    setEveryone((prev) => {
      const next = new Set(prev);
      if (on) next.add(slug);
      else next.delete(slug);
      return next;
    }); // optimistic
    const res = await setCourseForEveryone(slug, on).catch(() => null);
    if (!report(res)) {
      setEveryone((prev) => {
        const next = new Set(prev);
        if (on) next.delete(slug);
        else next.add(slug);
        return next;
      });
    }
  };

  const assignedSomewhere = new Set([
    ...everyone,
    ...roles.flatMap((r) => r.courses),
  ]);
  const unassigned = courses.filter((c) => !assignedSomewhere.has(c.slug));

  return (
    <div className="mt-6 space-y-10">
      <section aria-labelledby="everyone">
        <h2 id="everyone" className="text-lg font-semibold">
          Courses for everyone
        </h2>
        <p className="text-muted-foreground mb-3 text-sm">
          Visible to every member, whatever their role. Good for company-wide
          courses such as security and POSH.
        </p>
        <CourseChecklist
          courses={courses}
          selected={everyone}
          onToggle={toggleEveryone}
          idPrefix="everyone"
        />
      </section>

      <section aria-labelledby="roles">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="roles" className="text-lg font-semibold">
              Roles
            </h2>
            <p className="text-muted-foreground text-sm">
              Give a member a role in <strong>Members</strong>. They then see
              the role&apos;s courses.
            </p>
          </div>
          <Button onClick={() => setDialog({ role: null })}>
            <PlusIcon aria-hidden /> New role
          </Button>
        </div>

        {unassigned.length > 0 && (
          <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
            Not visible to any member yet (admins still see them):{' '}
            {unassigned.map((c) => c.title).join(', ')}.
          </p>
        )}

        {roles.length === 0 ? (
          <p className="mt-4 rounded-lg border p-6 text-center text-sm">
            No roles yet. Create one, for example “Project Manager” or
            “Developer”, and choose its courses.
          </p>
        ) : (
          <ul className="mt-4 divide-y rounded-xl border">
            {roles.map((r) => (
              <li
                key={r.id}
                className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{r.name}</h3>
                    <Badge variant="secondary">
                      {r.memberCount} member{r.memberCount === 1 ? '' : 's'}
                    </Badge>
                  </div>
                  {r.description && (
                    <p className="text-muted-foreground mt-0.5 text-sm">
                      {r.description}
                    </p>
                  )}
                  <p className="mt-2 flex flex-wrap gap-1.5">
                    {r.courses.length === 0 ? (
                      <span className="text-muted-foreground text-sm">
                        No courses yet
                      </span>
                    ) : (
                      r.courses.map((s) => (
                        <Badge key={s} variant="outline">
                          {title(s)}
                        </Badge>
                      ))
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setDialog({ role: r })}
                    aria-label={`Edit ${r.name}`}
                  >
                    <PencilIcon aria-hidden /> Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive"
                    onClick={() => setDeleting(r)}
                    aria-label={`Delete ${r.name}`}
                  >
                    <Trash2Icon aria-hidden /> Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {dialog && (
        <RoleDialog
          key={dialog.role?.id ?? 'new'}
          open
          onOpenChange={(o) => !o && setDialog(null)}
          courses={courses}
          role={dialog.role}
        />
      )}

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(o) => !o && setDeleting(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete the role “{deleting?.name}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleting && deleting.memberCount > 0
                ? `${deleting.memberCount} member${deleting.memberCount === 1 ? '' : 's'} will have no role, and will only see courses marked for everyone until you give them a new role. `
                : ''}
              Their accounts and progress are not affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  if (!deleting) return;
                  const res = await deleteRole(deleting.id).catch(() => null);
                  if (report(res)) setDeleting(null);
                })
              }
            >
              {pending ? 'Deleting…' : 'Delete role'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
