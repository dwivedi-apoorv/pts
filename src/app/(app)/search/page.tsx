import { SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchResults } from '@/components/search-results';
import { requireMember } from '@/lib/auth';

export const metadata = { title: 'Search' };

export default async function SearchPage({
  searchParams,
}: PageProps<'/search'>) {
  await requireMember();
  const raw = (await searchParams).q;
  const q = (Array.isArray(raw) ? raw[0] : raw) ?? '';

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Search</h1>
      <form action="/search" role="search" className="mt-4 flex gap-2">
        <label htmlFor="q" className="sr-only">
          Search all courses
        </label>
        <Input
          id="q"
          name="q"
          type="search"
          defaultValue={q}
          placeholder="Search all courses…"
          autoFocus={!q}
        />
        <Button type="submit">
          <SearchIcon aria-hidden /> Search
        </Button>
      </form>
      <SearchResults query={q} />
    </main>
  );
}
