export type GuardAction = 'deactivate' | 'demote' | 'delete';

const WORDS: Record<GuardAction, string> = {
  deactivate: 'deactivate',
  demote: 'remove the admin role from',
  delete: 'delete',
};

/**
 * Admin guard rails. Returns an error message, or null when the action is allowed.
 * `activeAdminIds` are the ids of all currently active admins.
 */
export function checkGuardRails(args: {
  actorId: string;
  target: { id: string; role: 'learner' | 'admin'; active: boolean };
  action: GuardAction;
  activeAdminIds: string[];
}): string | null {
  const { actorId, target, action, activeAdminIds } = args;
  if (target.id === actorId)
    return `You cannot ${WORDS[action]} your own account.`;
  const isActiveAdmin = target.role === 'admin' && target.active;
  if (
    isActiveAdmin &&
    activeAdminIds.filter((id) => id !== target.id).length === 0
  ) {
    return `You cannot ${WORDS[action]} the last active admin.`;
  }
  return null;
}
