const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function otpEmail(appName: string, code: string) {
  const app = escapeHtml(appName);
  return {
    subject: `${code} is your ${appName} sign-in code`,
    text: `Your ${appName} sign-in code is ${code}.\n\nIt expires in 10 minutes. If you did not request it, ignore this email.`,
    html: `<div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#18181b">
  <h2 style="margin:0 0 12px">Your sign-in code</h2>
  <p style="margin:0 0 16px">Use this code to sign in to ${app}:</p>
  <p style="font-size:32px;letter-spacing:8px;font-weight:700;margin:0 0 16px">${escapeHtml(code)}</p>
  <p style="margin:0;color:#52525b;font-size:14px">The code expires in 10 minutes. If you did not request it, ignore this email.</p>
</div>`,
  };
}

export type SendOtpEmailArgs = {
  to: string;
  appName: string;
  /** Asks Supabase for a fresh 6-digit code; sends nothing itself. */
  generateCode: (email: string) => Promise<{ code?: string; error?: string }>;
  apiKey: string;
  from: string;
  fetchFn?: typeof fetch;
};

export async function sendOtpEmail(
  a: SendOtpEmailArgs,
): Promise<{ error?: { message: string; status?: number } }> {
  const { code, error } = await a.generateCode(a.to);
  if (error || !code)
    return { error: { message: error ?? 'No code was generated' } };
  // The login form takes 6 digits. A different length means the Supabase
  // "Email OTP Length" setting is wrong; never email a code nobody can enter.
  if (!/^\d{6}$/.test(code)) {
    console.error(
      `Supabase issued a ${code.length}-character code. Set Authentication > Email OTP Length to 6.`,
    );
    return { error: { message: 'Supabase Email OTP Length must be 6' } };
  }

  const mail = otpEmail(a.appName, code);
  const res = await (a.fetchFn ?? fetch)('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${a.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: a.from, to: [a.to], ...mail }),
  });
  if (!res.ok) {
    return {
      error: {
        message: `Resend responded with ${res.status}`,
        status: res.status,
      },
    };
  }
  return {};
}
