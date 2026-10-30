'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin } from '../auth';
import { ensureAuthUser } from '../auth/otp-deps';
import type { Member } from '../auth/request-otp';
import { createAdminClient } from '../supabase/admin';
import { emailSchema } from '../validation';
import { logAudit } from './audit';
import { MAX_IMPORT_ROWS, validateImport, type ImportRow } from './csv';
import { checkGuardRails } from './guards';

export type AdminResult =
  { ok: true; message?: string } | { ok: false; message: string };
const fail = (message: string): AdminResult => ({ ok: false, message });
const GENERIC = 'Something went wrong. Please try again.';
const BAN_FOREVER = '876000h';

const name = z
  .string()
  .trim()
  .max(120, 'Name is too long')
  .transform((s) => (s === '' ? null : s))
  .nullable()
  .optional();
const role = z.enum(['learner', 'admin']);
const id = z.uuid();

type Db = ReturnType<typeof createAdminClient>;
type Row = Member & { full_name: string | null };

async function getMember(db: Db, memberId: string): Promise<Row | null> {
  const { data } = await db
    .from('members')
    .select('id,email,full_name,role,active,auth_user_id')
    .eq('id', memberId)
    .maybeSingle();
  return (data as Row | null) ?? null;
}

async function activeAdminIds(db: Db): Promise<string[]> {
  const { data } = await db
    .from('members')
    .select('id')
    .eq('role', 'admin')
    .eq('active', true);
  return (data ?? []).map((r: { id: string }) => r.id);
}

function done(message?: string): AdminResult {
  revalidatePath('/admin', 'layout');
  return { ok: true, message };
}

export async function addMember(input: {
  full_name?: string | null;
  email: string;
  role: 'learner' | 'admin';
}): Promise<AdminResult> {
  const { member: actor } = await requireAdmin();
  const parsed = z
    .object({ full_name: name, email: emailSchema, role })
    .safeParse(input);
  if (!parsed.success)
    return fail(parsed.error.issues[0]?.message ?? 'Invalid input.');
  const db = createAdminClient();

  const { data, error } = await db
    .from('members')
    .insert({
      email: parsed.data.email,
      full_name: parsed.data.full_name ?? null,
      role: parsed.data.role,
    })
    .select('id,email,active,role,auth_user_id')
    .single();
  if (error)
    return fail(
      error.code === '23505' ? 'That email is already a member.' : GENERIC,
    );

  let message = 'Member added. They can sign in with an emailed code.';
  try {
    await ensureAuthUser(data as Member);
  } catch {
    message =
      'Member added. Their sign-in account will be created the first time they request a code.';
  }
  await logAudit(actor, 'member.add', parsed.data.email, {
    role: parsed.data.role,
  });
  return done(message);
}

export async function updateMember(input: {
  id: string;
  full_name?: string | null;
  email: string;
  role: 'learner' | 'admin';
}): Promise<AdminResult> {
  const { member: actor } = await requireAdmin();
  const parsed = z
    .object({ id, full_name: name, email: emailSchema, role })
    .safeParse(input);
  if (!parsed.success)
    return fail(parsed.error.issues[0]?.message ?? 'Invalid input.');
  const db = createAdminClient();
  const target = await getMember(db, parsed.data.id);
  if (!target) return fail('That member no longer exists.');

  if (target.role === 'admin' && parsed.data.role === 'learner') {
    const blocked = checkGuardRails({
      actorId: actor.id,
      target,
      action: 'demote',
      activeAdminIds: await activeAdminIds(db),
    });
    if (blocked) return fail(blocked);
  }

  const emailChanged = parsed.data.email !== target.email.toLowerCase();
  if (emailChanged) {
    const { data: clash } = await db
      .from('members')
      .select('id')
      .eq('email', parsed.data.email)
      .maybeSingle();
    if (clash) return fail('Another member already uses that email.');
    if (target.auth_user_id) {
      const { error } = await db.auth.admin.updateUserById(
        target.auth_user_id,
        {
          email: parsed.data.email,
          email_confirm: true,
        },
      );
      if (error)
        return fail('Could not update the sign-in email. Nothing was changed.');
    }
  }

  const { error } = await db
    .from('members')
    .update({
      full_name: parsed.data.full_name ?? null,
      email: parsed.data.email,
      role: parsed.data.role,
    })
    .eq('id', target.id);
  if (error) {
    // Keep the two records in step: put the sign-in email back.
    if (emailChanged && target.auth_user_id) {
      await db.auth.admin.updateUserById(target.auth_user_id, {
        email: target.email,
        email_confirm: true,
      });
    }
    return fail(
      error.code === '23505'
        ? 'Another member already uses that email.'
        : GENERIC,
    );
  }
  await logAudit(actor, 'member.edit', parsed.data.email, {
    before: {
      email: target.email,
      role: target.role,
      full_name: target.full_name,
    },
    after: {
      email: parsed.data.email,
      role: parsed.data.role,
      full_name: parsed.data.full_name ?? null,
    },
  });
  return done('Member updated.');
}

export async function setMemberActive(
  memberId: string,
  active: boolean,
): Promise<AdminResult> {
  const { member: actor } = await requireAdmin();
  const parsed = z
    .object({ id, active: z.boolean() })
    .safeParse({ id: memberId, active });
  if (!parsed.success) return fail('Invalid request.');
  const db = createAdminClient();
  const target = await getMember(db, parsed.data.id);
  if (!target) return fail('That member no longer exists.');

  if (!parsed.data.active) {
    const blocked = checkGuardRails({
      actorId: actor.id,
      target,
      action: 'deactivate',
      activeAdminIds: await activeAdminIds(db),
    });
    if (blocked) return fail(blocked);
  }

  // Ban (or unban) the sign-in account so refresh tokens stop working. Access is
  // also blocked at once by requireMember(), which re-reads `active` on every request.
  if (target.auth_user_id) {
    const { error } = await db.auth.admin.updateUserById(target.auth_user_id, {
      ban_duration: parsed.data.active ? 'none' : BAN_FOREVER,
    });
    if (error)
      return fail('Could not update the sign-in account. Nothing was changed.');
  }
  const { error } = await db
    .from('members')
    .update({ active: parsed.data.active })
    .eq('id', target.id);
  if (error) return fail(GENERIC);
  await logAudit(
    actor,
    parsed.data.active ? 'member.reactivate' : 'member.deactivate',
    target.email,
  );
  return done(
    parsed.data.active
      ? 'Member reactivated.'
      : 'Member deactivated. Their access stops immediately.',
  );
}

export async function deleteMember(memberId: string): Promise<AdminResult> {
  const { member: actor } = await requireAdmin();
  const parsed = id.safeParse(memberId);
  if (!parsed.success) return fail('Invalid request.');
  const db = createAdminClient();
  const target = await getMember(db, parsed.data);
  if (!target) return fail('That member no longer exists.');
  const blocked = checkGuardRails({
    actorId: actor.id,
    target,
    action: 'delete',
    activeAdminIds: await activeAdminIds(db),
  });
  if (blocked) return fail(blocked);

  await logAudit(actor, 'member.delete', target.email, { role: target.role });
  // Deleting the auth user cascades to all of their progress rows.
  if (target.auth_user_id) {
    const { error } = await db.auth.admin.deleteUser(target.auth_user_id);
    if (error)
      return fail('Could not delete the sign-in account. Nothing was deleted.');
  }
  const { error } = await db.from('members').delete().eq('id', target.id);
  if (error) return fail(GENERIC);
  return done('Member and their progress deleted.');
}

const csvText = z.string().max(200_000, 'That file is too large.');

async function existingEmails(db: Db) {
  const { data } = await db.from('members').select('email');
  return new Set(
    (data ?? []).map((r: { email: string }) => r.email.toLowerCase()),
  );
}

export type ImportPreview =
  | { ok: true; rows: ImportRow[]; valid: number }
  | { ok: false; message: string };

/** Validates only; nothing is written until confirmImport. */
export async function previewImport(text: string): Promise<ImportPreview> {
  await requireAdmin();
  const parsed = csvText.safeParse(text);
  if (!parsed.success)
    return { ok: false, message: parsed.error.issues[0].message };
  const { rows, fatal } = validateImport(
    parsed.data,
    await existingEmails(createAdminClient()),
  );
  if (fatal) return { ok: false, message: fatal };
  return {
    ok: true,
    rows,
    valid: rows.filter((r) => r.errors.length === 0).length,
  };
}

export async function confirmImport(text: string): Promise<AdminResult> {
  const { member: actor } = await requireAdmin();
  const parsed = csvText.safeParse(text);
  if (!parsed.success) return fail(parsed.error.issues[0].message);
  const db = createAdminClient();
  // Validate again on the server: never trust the preview the browser saw.
  const { rows, fatal } = validateImport(parsed.data, await existingEmails(db));
  if (fatal) return fail(fatal);
  const valid = rows
    .filter((r) => r.errors.length === 0)
    .slice(0, MAX_IMPORT_ROWS);
  if (valid.length === 0) return fail('There are no valid rows to import.');

  let added = 0;
  for (const r of valid) {
    const { data, error } = await db
      .from('members')
      .insert({ email: r.email, full_name: r.full_name || null, role: r.role })
      .select('id,email,active,role,auth_user_id')
      .single();
    if (error) continue;
    added++;
    try {
      await ensureAuthUser(data as Member);
    } catch {
      // created at first sign-in instead
    }
  }
  await logAudit(actor, 'member.import', null, {
    added,
    skipped: rows.length - added,
  });
  return done(
    `Imported ${added} member${added === 1 ? '' : 's'}${rows.length - added ? `, skipped ${rows.length - added}` : ''}.`,
  );
}
