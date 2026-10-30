import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/env';
import { signOut } from '@/app/(auth)/login/actions';
import { SearchPalette } from './search-palette';

export function AppHeader({
  name,
  isAdmin = false,
}: {
  name: string;
  isAdmin?: boolean;
}) {
  const monogram = APP_NAME.split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/80 sticky top-0 z-30 border-b backdrop-blur">
      <a
        href="#main"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded-md focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-1.5 px-3 sm:gap-4 sm:px-4">
        <Link
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-2 font-semibold tracking-tight"
        >
          <span className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-md text-xs font-bold sm:hidden">
            {monogram}
          </span>
          <span className="truncate max-sm:sr-only">{APP_NAME}</span>
        </Link>
        <nav
          aria-label="Main"
          className="flex min-w-0 [scrollbar-width:none] items-center gap-0.5 overflow-x-auto text-sm whitespace-nowrap [&::-webkit-scrollbar]:hidden"
        >
          <Link
            href="/"
            className="hover:bg-muted rounded-md px-1.5 py-1.5 sm:px-2.5"
          >
            Courses
          </Link>
          <Link
            href="/glossary"
            className="hover:bg-muted rounded-md px-1.5 py-1.5 sm:px-2.5"
          >
            Glossary
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className="hover:bg-muted rounded-md px-1.5 py-1.5 sm:px-2.5"
            >
              Admin
            </Link>
          )}
          <Link
            href="/me"
            className="hover:bg-muted rounded-md px-1.5 py-1.5 sm:px-2.5"
          >
            Progress
          </Link>
        </nav>
        <form
          action={signOut}
          className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3"
        >
          <SearchPalette />
          <span className="text-muted-foreground hidden text-sm sm:inline">
            {name}
          </span>
          <Button type="submit" variant="outline" size="sm">
            <LogOutIcon aria-hidden />{' '}
            <span className="max-sm:sr-only">Sign out</span>
          </Button>
        </form>
      </div>
    </header>
  );
}
