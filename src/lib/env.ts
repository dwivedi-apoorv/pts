function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing environment variable ${name}. Copy .env.example to .env.local and fill it in.`,
    );
  }
  return value;
}

export function supabaseEnv() {
  return {
    url: required(
      'NEXT_PUBLIC_SUPABASE_URL',
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    anonKey: required(
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    ),
  };
}

export function serviceRoleKey() {
  return required(
    'SUPABASE_SERVICE_ROLE_KEY',
    process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

export function emailEnv() {
  return {
    apiKey: required('RESEND_API_KEY', process.env.RESEND_API_KEY),
    from: required('EMAIL_FROM', process.env.EMAIL_FROM),
  };
}

/** Defaults to true: show "This email is not registered". */
export function revealUnregistered() {
  return process.env.REVEAL_UNREGISTERED !== 'false';
}

export const APP_NAME =
  process.env.NEXT_PUBLIC_APP_NAME || 'DigiRocket Technologies';
