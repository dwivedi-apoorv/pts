'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { clearSession, requestOtp, verifyOtp } from './actions';
import { OtpInput } from './OtpInput';

const COOLDOWN = 60;
const button =
  'inline-flex h-11 w-full items-center justify-center rounded-md bg-indigo-600 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/40 focus:ring-offset-2 disabled:opacity-50 dark:focus:ring-offset-zinc-950';
const link =
  'text-sm text-indigo-700 underline underline-offset-2 hover:text-indigo-900 disabled:cursor-not-allowed disabled:text-zinc-500 disabled:no-underline dark:text-indigo-300';

export function LoginForm() {
  const params = useSearchParams();
  const next = params.get('next') ?? undefined;
  const reason = params.get('reason');

  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState<string | null>(
    reason === 'not-registered'
      ? 'This email is not registered. Please contact your administrator.'
      : null,
  );
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);
  const [pending, startTransition] = useTransition();
  const submitting = useRef(false);

  useEffect(() => {
    if (reason) void clearSession();
  }, [reason]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  const sendCode = (resend = false) =>
    startTransition(async () => {
      setMessage(null);
      setInfo(null);
      const res = await requestOtp(email);
      if (!res.ok) {
        setMessage(res.message);
        if (resend) setCooldown(0);
        return;
      }
      setStep('code');
      setCode('');
      setCooldown(COOLDOWN);
      setInfo(
        res.message ??
          `We sent a 6-digit code to ${email.trim().toLowerCase()}.`,
      );
    });

  const submitCode = (token: string) => {
    if (submitting.current) return;
    submitting.current = true;
    startTransition(async () => {
      setMessage(null);
      const res = await verifyOtp(email, token, next);
      // On success the action redirects, so we only get here on failure.
      if (res && !res.ok) {
        setMessage(res.message);
        setCode('');
      }
      submitting.current = false;
    });
  };

  return (
    <div>
      {step === 'email' ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendCode();
          }}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block h-11 w-full rounded-md border border-zinc-300 bg-white px-3 text-base focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/40 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <button type="submit" disabled={pending || !email} className={button}>
            {pending ? 'Sending…' : 'Email me a code'}
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{info}</p>
          <OtpInput
            value={code}
            onChange={setCode}
            onComplete={submitCode}
            disabled={pending}
          />
          <button
            type="button"
            className={button}
            disabled={pending || code.length !== 6}
            onClick={() => submitCode(code)}
          >
            {pending ? 'Checking…' : 'Sign in'}
          </button>
          <div className="flex items-center justify-between">
            <button
              type="button"
              className={link}
              disabled={cooldown > 0 || pending}
              onClick={() => sendCode(true)}
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
            </button>
            <button
              type="button"
              className={link}
              onClick={() => {
                setStep('email');
                setCode('');
                setMessage(null);
                setInfo(null);
              }}
            >
              Use a different email
            </button>
          </div>
        </div>
      )}
      <p
        role="alert"
        aria-live="polite"
        className="mt-4 min-h-5 text-sm text-red-700 dark:text-red-400"
      >
        {message}
      </p>
    </div>
  );
}
