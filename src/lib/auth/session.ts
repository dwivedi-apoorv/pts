import 'server-only';
import { cache } from 'react';
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { createClient } from '../supabase/server';
import type { Member } from './request-otp';

export type CurrentMember = {
  user: { id: string; email: string };
  member: Member & { full_name: string | null };
};

/**
 * Returns the signed-in, active member or redirects to /login. Re-reads the
 * members row on every request so deactivation and role changes apply at once.
 */
export const requireMember = cache(async (): Promise<CurrentMember> => {
  await connection();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) redirect('/login');

  const { data: member } = await supabase
    .from('members')
    .select('id,email,full_name,role,active,auth_user_id')
    .eq('auth_user_id', data.user.id)
    .maybeSingle();

  if (!member || !member.active) redirect('/login?reason=not-registered');
  return {
    user: { id: data.user.id, email: data.user.email ?? member.email },
    member: member as CurrentMember['member'],
  };
});

export async function requireAdmin(): Promise<CurrentMember> {
  const current = await requireMember();
  if (current.member.role !== 'admin') redirect('/');
  return current;
}
