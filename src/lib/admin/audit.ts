import 'server-only';
import { createAdminClient } from '../supabase/admin';

export type AuditAction =
  | 'member.add'
  | 'member.edit'
  | 'member.deactivate'
  | 'member.reactivate'
  | 'member.delete'
  | 'member.import'
  | 'export.progress'
  | 'export.selfcheck';

/** Best effort: a failed audit write is logged but never blocks the action itself. */
export async function logAudit(
  actor: { id: string; email: string },
  action: AuditAction,
  targetEmail: string | null,
  details?: Record<string, unknown>,
) {
  const { error } = await createAdminClient()
    .from('admin_audit')
    .insert({
      admin_member_id: actor.id,
      admin_email: actor.email,
      action,
      target_email: targetEmail,
      details: details ?? null,
    });
  if (error) console.error('audit log failed:', error.code ?? 'unknown');
}
