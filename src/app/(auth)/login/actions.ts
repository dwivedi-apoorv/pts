'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  MESSAGES,
  requestOtpCore,
  type OtpResult,
} from '@/lib/auth/request-otp';
import { findMemberByEmail, realOtpDeps } from '@/lib/auth/otp-deps';
import { revealUnregistered } from '@/lib/env';
import { safeNext } from '@/lib/redirect';
import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { emailSchema, otpTokenSchema } from '@/lib/validation';

const MIN_MS = 700;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function clientIp(): Promise<string | null> {
  const h = await headers();
  const forwarded = h.get('x-forwarded-for')?.split(',')[0]?.trim();
  return forwarded || h.get('x-real-ip') || null;
}

export async function requestOtp(email: string): Promise<OtpResult> {
  const started = Date.now();
  let result: OtpResult;
  try {
    result = await requestOtpCore(realOtpDeps(), email, await clientIp());
  } catch (err) {
    console.error(
      'requestOtp failed',
      err instanceof Error ? err.message : 'unknown',
    );
    result = { ok: false, message: MESSAGES.sendFailed };
  }
  // When unregistered emails are not revealed, keep timing uniform too.
  if (!revealUnregistered()) {
    const wait = MIN_MS - (Date.now() - started);
    if (wait > 0) await sleep(wait);
  }
  return result;
}

export type VerifyResult = { ok: false; message: string };

export async function verifyOtp(
  email: string,
  token: string,
  next?: string,
): Promise<VerifyResult> {
  const e = emailSchema.safeParse(email);
  const t = otpTokenSchema.safeParse(token);
  if (!e.success || !t.success) {
    return { ok: false, message: 'Enter the 6-digit code from your email.' };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email: e.data,
    token: t.data,
    type: 'email',
  });
  if (error || !data.user) {
    const throttled = error?.status === 429;
    return {
      ok: false,
      message: throttled
        ? 'Too many attempts. Please wait a minute and try again.'
        : 'That code is no longer valid. Check the latest email or request a new code.',
    };
  }

  // The member must still exist and be active.
  const member = await findMemberByEmail(e.data);
  if (!member || !member.active) {
    await supabase.auth.signOut();
    return { ok: false, message: MESSAGES.notRegistered };
  }

  const admin = createAdminClient();
  await admin
    .from('members')
    .update({
      last_login_at: new Date().toISOString(),
      auth_user_id: data.user.id,
    })
    .eq('id', member.id);

  redirect(safeNext(next));
}

/** Ends any stale session (used on /login after a rejection). */
export async function clearSession(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
