import 'server-only';
import { APP_NAME, emailEnv, revealUnregistered } from '../env';
import { createAdminClient } from '../supabase/admin';
import { sendOtpEmail } from '../email/send-otp';
import type { Member, OtpDeps } from './request-otp';

const MEMBER_COLUMNS = 'id,email,active,role,auth_user_id';

export async function findMemberByEmail(email: string): Promise<Member | null> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .from('members')
    .select(MEMBER_COLUMNS)
    .eq('email', email)
    .maybeSingle();
  if (error) throw error;
  return (data as Member | null) ?? null;
}

async function findAuthUserIdByEmail(email: string): Promise<string | null> {
  const admin = createAdminClient();
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await admin.auth.admin.listUsers({
      page,
      perPage: 1000,
    });
    if (error) throw error;
    const hit = data.users.find((u) => u.email?.toLowerCase() === email);
    if (hit) return hit.id;
    if (data.users.length < 1000) break;
  }
  return null;
}

/** Makes sure an auth user exists for the member and is linked on the member row. */
export async function ensureAuthUser(member: Member): Promise<void> {
  if (member.auth_user_id) return;
  const admin = createAdminClient();
  let id: string | null = null;
  const created = await admin.auth.admin.createUser({
    email: member.email,
    email_confirm: true,
  });
  if (created.data?.user) id = created.data.user.id;
  else if (
    created.error &&
    /already|registered|exists/i.test(created.error.message)
  ) {
    id = await findAuthUserIdByEmail(member.email);
  } else if (created.error) throw created.error;
  if (!id)
    throw new Error('Could not create or find the auth user for this member');
  const { error } = await admin
    .from('members')
    .update({ auth_user_id: id })
    .eq('id', member.id);
  if (error) throw error;
  member.auth_user_id = id;
}

export function realOtpDeps(): OtpDeps {
  const admin = createAdminClient();
  return {
    now: () => new Date(),
    revealUnregistered: revealUnregistered(),
    async countRequests(filter, since) {
      let q = admin
        .from('otp_requests')
        .select('id', { count: 'exact', head: true })
        .gte('requested_at', since.toISOString());
      if (filter.email) q = q.eq('email', filter.email);
      if (filter.ip) q = q.eq('ip', filter.ip);
      const { count, error } = await q;
      if (error) throw error;
      return count ?? 0;
    },
    async recordRequest(email, ip) {
      const { error } = await admin.from('otp_requests').insert({ email, ip });
      if (error) throw error;
    },
    async cleanupOld(before) {
      await admin
        .from('otp_requests')
        .delete()
        .lt('requested_at', before.toISOString());
    },
    findMember: findMemberByEmail,
    ensureAuthUser,
    async sendOtp(email) {
      const { apiKey, from } = emailEnv();
      return sendOtpEmail({
        to: email,
        appName: APP_NAME,
        apiKey,
        from,
        // generateLink creates the code without emailing anything.
        async generateCode(to) {
          const { data, error } = await admin.auth.admin.generateLink({
            type: 'magiclink',
            email: to,
          });
          if (error) return { error: error.message };
          return { code: data.properties?.email_otp };
        },
      });
    },
  };
}
