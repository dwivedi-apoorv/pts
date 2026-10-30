import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        We could not find that page
      </h1>
      <p className="text-muted-foreground mt-2">
        The link may be old, or the chapter may have been renamed.
      </p>
      <Link href="/" className={`${buttonVariants()} mt-6`}>
        Back to courses
      </Link>
    </main>
  );
}
