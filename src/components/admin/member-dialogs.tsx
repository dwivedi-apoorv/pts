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
  active: boolean;
};

const selectClass =
  'border-input bg-background focus-visible:ring-ring/50 h-8 w-full rounded-lg border px-2.5 text-sm focus-visible:ring-3 focus-visible:outline-none';

function report(res: AdminResult | null) {
  if (!res) toast.error('Something went wrong. Please try again.');
  else if (res.ok) toast.success(res.message ?? 'Done.');
  else toast.error(res.message);
  return Boolean(res?.ok);
}

function MemberForm({
  initial,
  submitLabel,
  onSubmit,
  pending,
  onCancel,
}: {
  initial: { full_name: string; email: string; role: 'learner' | 'admin' };
  submitLabel: string;
  onSubmit: (v: {
    full_name: string;
    email: string;
    role: 'learner' | 'admin';
  }) => void;
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
        <label htmlFor="m-role" className="mb-1 block text-sm font-medium">
          Role
        </label>
        <select
          id="m-role"
          value={v.role}
          onChange={(e) =>
            setV({ ...v, role: e.target.value as 'learner' | 'admin' })
          }
          className={selectClass}
        >
          <option value="learner">Learner</option>
          <option value="admin">Admin</option>
        </select>
      </div>
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

export function AddMemberButton() {
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
            initial={{ full_name: '', email: '', role: 'learner' }}
            submitLabel="Add member"
            pending={pending}
            onCancel={() => setOpen(false)}
            onSubmit={(v) =>
              start(async () => {
                const res = await addMember(v).catch(() => null);
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
}: {
  member: MemberLite;
  isSelf: boolean;
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
            }}
            submitLabel="Save changes"
            pending={pending}
            onCancel={() => setEditing(false)}
            onSubmit={(v) =>
              start(async () => {
                const res = await updateMember({ id: member.id, ...v }).catch(
                  () => null,
                );
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
