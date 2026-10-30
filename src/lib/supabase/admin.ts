import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { serviceRoleKey, supabaseEnv } from '../env';

/** Service-role client. Bypasses RLS: only use after requireAdmin() or for auth plumbing. */
export function createAdminClient() {
  return createClient(supabaseEnv().url, serviceRoleKey(), {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
