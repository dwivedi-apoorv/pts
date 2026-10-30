import { emailSchema } from '../validation';

export const MESSAGES = {
  notRegistered:
    'This email is not registered. Please contact your administrator.',
  generic: 'If this email is registered, a code has been sent.',
  throttled: 'Please wait a minute before requesting another code.',
  tooMany: 'Too many code requests. Please try again later.',
  sendFailed: 'We could not send the code right now. Please try again shortly.',
} as const;

export const LIMITS = {
  emailCooldownSeconds: 60,
  emailPerHour: 5,
  ipPerHour: 20,
} as const;

export type Member = {
  id: string;
  email: string;
  active: boolean;
  role: 'learner' | 'admin';
  auth_user_id: string | null;
};

export type OtpDeps = {
  now(): Date;
  revealUnregistered: boolean;
  /** Number of requests since `since`, by email or by ip. */
  countRequests(
    filter: { email?: string; ip?: string },
    since: Date,
  ): Promise<number>;
  recordRequest(email: string, ip: string | null): Promise<void>;
  cleanupOld(before: Date): Promise<void>;
  findMember(email: string): Promise<Member | null>;
  /** Creates or finds the auth user and stores its id on the member row. */
  ensureAuthUser(member: Member): Promise<void>;
  sendOtp(
    email: string,
  ): Promise<{ error?: { message: string; status?: number } }>;
};

export type OtpResult =
  | { ok: true; message?: string }
  | { ok: false; message: string; field?: 'email' };

export async function requestOtpCore(
  deps: OtpDeps,
  rawEmail: unknown,
  ip: string | null,
): Promise<OtpResult> {
  const parsed = emailSchema.safeParse(rawEmail);
  if (!parsed.success) {
    return {
      ok: false,
      message: 'Enter a valid email address.',
      field: 'email',
    };
  }
  const email = parsed.data;
  const now = deps.now();
  const secondsAgo = (s: number) => new Date(now.getTime() - s * 1000);

  // Throttle first, and count every attempt (registered or not).
  const [lastMinute, lastHour, ipHour] = await Promise.all([
    deps.countRequests({ email }, secondsAgo(LIMITS.emailCooldownSeconds)),
    deps.countRequests({ email }, secondsAgo(3600)),
    ip ? deps.countRequests({ ip }, secondsAgo(3600)) : Promise.resolve(0),
  ]);
  if (lastMinute >= 1) return { ok: false, message: MESSAGES.throttled };
  if (lastHour >= LIMITS.emailPerHour || ipHour >= LIMITS.ipPerHour) {
    return { ok: false, message: MESSAGES.tooMany };
  }
  await deps.recordRequest(email, ip);
  await deps.cleanupOld(secondsAgo(24 * 3600));

  const member = await deps.findMember(email);
  if (!member || !member.active) {
    // Nothing is sent to Supabase for unknown or inactive emails.
    return deps.revealUnregistered
      ? { ok: false, message: MESSAGES.notRegistered }
      : { ok: true, message: MESSAGES.generic };
  }

  await deps.ensureAuthUser(member);
  const { error } = await deps.sendOtp(email);
  if (error) {
    if (
      error.status === 429 ||
      /rate limit|security purposes/i.test(error.message)
    ) {
      return { ok: false, message: MESSAGES.throttled };
    }
    return { ok: false, message: MESSAGES.sendFailed };
  }
  return {
    ok: true,
    message: deps.revealUnregistered ? undefined : MESSAGES.generic,
  };
}
