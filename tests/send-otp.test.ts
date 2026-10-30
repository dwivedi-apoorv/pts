import { describe, expect, it, vi } from 'vitest';
import { otpEmail, sendOtpEmail } from '../src/lib/email/send-otp';

const base = {
  to: 'ann@example.com',
  appName: 'Academy',
  apiKey: 'k',
  from: 'learn@x.com',
};

describe('sendOtpEmail', () => {
  it('posts the code to Resend with the API key', async () => {
    const fetchFn = vi.fn(async () => new Response('{}', { status: 200 }));
    const res = await sendOtpEmail({
      ...base,
      generateCode: async () => ({ code: '123456' }),
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(res.error).toBeUndefined();
    const [url, init] = fetchFn.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe('https://api.resend.com/emails');
    expect((init.headers as Record<string, string>).Authorization).toBe(
      'Bearer k',
    );
    const body = JSON.parse(init.body as string);
    expect(body.to).toEqual(['ann@example.com']);
    expect(body.from).toBe('learn@x.com');
    expect(body.html).toContain('123456');
  });

  it('does not call Resend when no code was generated', async () => {
    const fetchFn = vi.fn();
    const res = await sendOtpEmail({
      ...base,
      generateCode: async () => ({ error: 'boom' }),
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(res.error?.message).toBe('boom');
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('refuses to email a code that is not 6 digits', async () => {
    const fetchFn = vi.fn();
    const res = await sendOtpEmail({
      ...base,
      generateCode: async () => ({ code: '12345678' }),
      fetchFn: fetchFn as unknown as typeof fetch,
    });
    expect(res.error?.message).toMatch(/Email OTP Length/);
    expect(fetchFn).not.toHaveBeenCalled();
  });

  it('reports Resend failures with the status', async () => {
    const res = await sendOtpEmail({
      ...base,
      generateCode: async () => ({ code: '123456' }),
      fetchFn: (async () =>
        new Response('no', { status: 429 })) as unknown as typeof fetch,
    });
    expect(res.error?.status).toBe(429);
  });

  it('escapes the app name in the HTML', () => {
    expect(otpEmail('A<b>&', '111111').html).not.toContain('<b>');
  });
});
