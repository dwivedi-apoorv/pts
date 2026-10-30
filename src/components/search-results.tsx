'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  groupByCourse,
  hitHref,
  loadIndex,
  runSearch,
  type SearchHit,
} from '@/lib/search-client';
import { Snippet } from './snippet';

export function SearchResults({ query }: { query: string }) {
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    loadIndex()
      .then((index) => {
        if (!cancelled) setHits(runSearch(index, query, 100));
      })
      .catch((e) => {
        if (!cancelled)
          setError(e instanceof Error ? e.message : 'Search failed.');
      });
    return () => {
      cancelled = true;
    };
  }, [query]);

  if (query.trim().length < 2) {
    return (
      <p className="text-muted-foreground mt-6 text-sm">
        Type at least two letters to search.
      </p>
    );
  }
  if (error) return <p className="text-destructive mt-6 text-sm">{error}</p>;
  if (!hits)
    return <p className="text-muted-foreground mt-6 text-sm">Searching…</p>;
  if (hits.length === 0) {
    return (
      <p className="mt-6 text-sm">
        No results for “{query.trim()}”. Try a shorter or different word.
      </p>
    );
  }

  const groups = groupByCourse(hits);
  return (
    <div className="mt-6 space-y-8" aria-live="polite">
      <p className="text-muted-foreground text-sm">
        {hits.length} result{hits.length === 1 ? '' : 's'} in {groups.length}{' '}
        course{groups.length === 1 ? '' : 's'}
      </p>
      {groups.map((g) => (
        <section key={g.courseSlug} aria-labelledby={`g-${g.courseSlug}`}>
          <h2 id={`g-${g.courseSlug}`} className="text-lg font-semibold">
            {g.courseTitle}{' '}
            <span className="text-muted-foreground text-sm font-normal">
              ({g.hits.length})
            </span>
          </h2>
          <ul className="mt-2 divide-y rounded-xl border">
            {g.hits.map((h) => (
              <li key={h.id}>
                <Link
                  href={hitHref(h)}
                  className="hover:bg-muted/60 focus-visible:bg-muted/60 block px-4 py-3 focus-visible:outline-none"
                >
                  <p className="font-medium">{h.heading}</p>
                  <p className="text-muted-foreground text-xs">
                    {h.chapterTitle}
                  </p>
                  <p className="text-muted-foreground mt-1 text-sm">
                    <Snippet text={h.text} terms={h.terms} />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
