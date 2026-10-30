import { Suspense } from 'react';
import { APP_NAME } from '@/lib/env';
import { LoginForm } from './LoginForm';

export const metadata = { title: `Sign in · ${APP_NAME}` };

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold tracking-tight">{APP_NAME}</h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Sign in with the work email your administrator registered.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="h-40" aria-hidden />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
