'use client';

import {
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UserCheckIcon,
  UserXIcon,
} from 'lucide-react';
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
  addMember,
  deleteMember,
  setMemberActive,
  updateMember,
  type AdminResult,
} from '@/lib/admin/actions';

export type MemberLite = {
  id: string;
  email: string;
  full_name: string | null;
  role: 'learner' | 'admin';
  role_id?: string | null;
  active: boolean;
};

export type RoleOption = { id: string; name: string };

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-8 w-full rounded-lg border px-2.5 text-sm focus-visible:ring-3 focus-visible:outline-none';

function report(res: AdminResult | null) {
  if (!res) toast.error('Something went wrong. Please try again.');
  else if (res.ok) toast.success(res.message ?? 'Done.');
  else toast.error(res.message);
  return Boolean(res?.ok);
}

type FormValues = {
  full_name: string;
  email: string;
  role: 'learner' | 'admin';
  role_id: string | null;
};

function MemberForm({
  initial,
  roles,
  submitLabel,
  onSubmit,
  pending,
  onCancel,
}: {
  initial: FormValues;
  roles: RoleOption[] | null;
  submitLabel: string;
  onSubmit: (v: FormValues) => void;
  pending: boolean;
  onCancel: () => void;
}) {
  const [v, setV] = useState(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(v);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor="m-name" className="mb-1 block text-sm font-medium">
          Full name
        </label>
        <Input
          id="m-name"
          value={v.full_name}
          maxLength={120}
          onChange={(e) => setV({ ...v, full_name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="m-email" className="mb-1 block text-sm font-medium">
          Work email
        </label>
        <Input
          id="m-email"
          type="email"
          required
          value={v.email}
          onChange={(e) => setV({ ...v, email: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="m-access" className="mb-1 block text-sm font-medium">
          Access level
        </label>
        <select
          id="m-access"
          value={v.role}
          onChange={(e) =>
            setV({ ...v, role: e.target.value as 'learner' | 'admin' })
          }
          className={selectClass}
        >
          <option value="learner">Learner</option>
          <option value="admin">
            Admin (manages members and sees every course)
          </option>
        </select>
      </div>
      {roles && (
        <div>
          <label htmlFor="m-role" className="mb-1 block text-sm font-medium">
            Role
          </label>
          <select
            id="m-role"
            value={v.role_id ?? ''}
            onChange={(e) => setV({ ...v, role_id: e.target.value || null })}
            className={selectClass}
          >
            <option value="">No role (only courses for everyone)</option>
            {roles.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <p className="text-muted-foreground mt-1 text-xs">
            The role decides which courses this member sees. Admins always see
            every course.
          </p>
        </div>
      )}
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending || !v.email}>
          {pending ? 'Saving…' : submitLabel}
        </Button>
      </DialogFooter>
    </form>
  );
}

export function AddMemberButton({ roles }: { roles: RoleOption[] | null }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <PlusIcon aria-hidden /> Add member
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a member</DialogTitle>
            <DialogDescription>
              They will be able to sign in with a code sent to this email.
            </DialogDescription>
          </DialogHeader>
          <MemberForm
            initial={{
              full_name: '',
              email: '',
              role: 'learner',
              role_id: null,
            }}
            roles={roles}
            submitLabel="Add member"
            pending={pending}
            onCancel={() => setOpen(false)}
            onSubmit={(v) =>
              start(async () => {
                const res = await addMember({
                  ...v,
                  role_id: roles ? v.role_id : undefined,
                }).catch(() => null);
                if (report(res)) setOpen(false);
              })
            }
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export function MemberRowActions({
  member,
  isSelf,
  roles,
}: {
  member: MemberLite;
  isSelf: boolean;
  roles: RoleOption[] | null;
}) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [pending, start] = useTransition();

  return (
    <div className="flex flex-wrap items-center justify-end gap-1">
      <Button
        size="sm"
        variant="outline"
        onClick={() => setEditing(true)}
        aria-label={`Edit ${member.email}`}
      >
        <PencilIcon aria-hidden /> Edit
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={pending || (isSelf && member.active)}
        title={isSelf ? 'You cannot deactivate your own account' : undefined}
        onClick={() =>
          start(async () => {
            report(
              await setMemberActive(member.id, !member.active).catch(
                () => null,
              ),
            );
          })
        }
        aria-label={`${member.active ? 'Deactivate' : 'Reactivate'} ${member.email}`}
      >
        {member.active ? (
          <UserXIcon aria-hidden />
        ) : (
          <UserCheckIcon aria-hidden />
        )}
        {member.active ? 'Deactivate' : 'Reactivate'}
      </Button>
      <Button
        size="sm"
        variant="outline"
        disabled={isSelf}
        title={isSelf ? 'You cannot delete your own account' : undefined}
        onClick={() => setDeleting(true)}
        aria-label={`Delete ${member.email}`}
        className="text-destructive"
      >
        <Trash2Icon aria-hidden /> Delete
      </Button>

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit member</DialogTitle>
            <DialogDescription>
              Changing the email also changes the address their sign-in codes go
              to.
            </DialogDescription>
          </DialogHeader>
          <MemberForm
            initial={{
              full_name: member.full_name ?? '',
              email: member.email,
              role: member.role,
              role_id: member.role_id ?? null,
            }}
            roles={roles}
            submitLabel="Save changes"
            pending={pending}
            onCancel={() => setEditing(false)}
            onSubmit={(v) =>
              start(async () => {
                const res = await updateMember({
                  id: member.id,
                  ...v,
                  role_id: roles ? v.role_id : undefined,
                }).catch(() => null);
                if (report(res)) setEditing(false);
              })
            }
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleting} onOpenChange={setDeleting}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {member.full_name || member.email}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This permanently deletes the member, their sign-in account and all
              of their progress. It cannot be undone. To keep their history,
              deactivate them instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={() =>
                start(async () => {
                  const res = await deleteMember(member.id).catch(() => null);
                  if (report(res)) setDeleting(false);
                })
              }
            >
              {pending ? 'Deleting…' : 'Delete member'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
