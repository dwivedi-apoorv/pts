'use client';

import { useRef } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onComplete: (value: string) => void;
  disabled?: boolean;
};

const LENGTH = 6;

export function OtpInput({ value, onChange, onComplete, disabled }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = Array.from({ length: LENGTH }, (_, i) => value[i] ?? '');

  const update = (next: string) => {
    const clean = next.replace(/\D/g, '').slice(0, LENGTH);
    onChange(clean);
    if (clean.length === LENGTH) onComplete(clean);
    return clean;
  };

  return (
    <div
      className="flex gap-2"
      role="group"
      aria-label="6-digit sign-in code"
      onPaste={(e) => {
        e.preventDefault();
        const clean = update(e.clipboardData.getData('text'));
        refs.current[Math.min(clean.length, LENGTH - 1)]?.focus();
      }}
    >
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          value={d}
          disabled={disabled}
          inputMode="numeric"
          autoComplete={i === 0 ? 'one-time-code' : 'off'}
          aria-label={`Digit ${i + 1}`}
          maxLength={1}
          autoFocus={i === 0}
          className="h-12 w-full min-w-0 rounded-md border border-zinc-300 bg-white text-center text-xl font-semibold tabular-nums focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/40 focus:outline-none disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-900"
          onChange={(e) => {
            const typed = e.target.value.replace(/\D/g, '');
            if (!typed) return;
            // Replace this digit; extra characters (autofill) spill into following boxes.
            const next = update(value.slice(0, i) + typed + value.slice(i + 1));
            refs.current[
              Math.min(i + typed.length, LENGTH - 1, next.length)
            ]?.focus();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Backspace') {
              e.preventDefault();
              if (d) onChange(value.slice(0, i) + value.slice(i + 1));
              else if (i > 0) {
                onChange(value.slice(0, i - 1) + value.slice(i));
                refs.current[i - 1]?.focus();
              }
            } else if (e.key === 'ArrowLeft') refs.current[i - 1]?.focus();
            else if (e.key === 'ArrowRight') refs.current[i + 1]?.focus();
          }}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
}
