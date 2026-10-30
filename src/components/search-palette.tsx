'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  diversify,
  groupByCourse,
  hitHref,
  loadIndex,
  runSearch,
  type SearchHit,
} from '@/lib/search-client';
import { Snippet } from './snippet';

/** Header search button plus the Cmd/Ctrl+K command palette. */
export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Debounced search; the index is fetched lazily the first time the palette is used.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      if (query.trim().length < 2) {
        setHits([]);
        setState('idle');
        return;
      }
      setState('loading');
      try {
        const index = await loadIndex();
        if (cancelled) return;
        setHits(diversify(runSearch(index, query, 100)));
        setState('idle');
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : 'Search failed.');
        setState('error');
      }
    }, 120);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [query, open]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        aria-keyshortcuts="Control+K Meta+K"
        className="text-muted-foreground"
      >
        <SearchIcon aria-hidden />
        <span className="max-sm:sr-only">Search</span>
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) setQuery('');
        }}
        title="Search courses"
        description="Search every lesson, question and glossary term."
        className="sm:max-w-xl"
      >
        <Command shouldFilter={false} label="Search results">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search lessons, questions and terms… (Ctrl K)"
          />
          <CommandList className="max-h-[60vh]">
            {state === 'loading' && (
              <p className="text-muted-foreground p-4 text-sm">Searching…</p>
            )}
            {state === 'error' && (
              <p className="text-destructive p-4 text-sm">{error}</p>
            )}
            {state === 'idle' &&
              query.trim().length >= 2 &&
              hits.length === 0 && (
                <p className="text-muted-foreground p-4 text-sm">
                  No results for “{query.trim()}”.
                </p>
              )}
            {state === 'idle' && query.trim().length < 2 && (
              <p className="text-muted-foreground p-4 text-sm">
                Type at least two letters.
              </p>
            )}
            {groupByCourse(hits).map((g) => (
              <CommandGroup key={g.courseSlug} heading={g.courseTitle}>
                {g.hits.map((h) => (
                  <CommandItem
                    key={h.id}
                    value={h.id}
                    onSelect={() => go(hitHref(h))}
                    className="items-start"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{h.heading}</p>
                      <p className="text-muted-foreground truncate text-xs">
                        {h.chapterTitle}
                      </p>
                      <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                        <Snippet text={h.text} terms={h.terms} />
                      </p>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
            {hits.length > 0 && (
              <CommandGroup>
                <CommandItem
                  value="__all__"
                  onSelect={() =>
                    go(`/search?q=${encodeURIComponent(query.trim())}`)
                  }
                >
                  See all results for “{query.trim()}”
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
