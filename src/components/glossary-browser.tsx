'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { GlossaryEntry } from '@/lib/content/types';
import { InlineMd } from './inline-md';

type CourseRef = {
  slug: string;
  title: string;
  glossaryChapter: string | null;
};

export function GlossaryBrowser({
  entries,
  courses,
}: {
  entries: GlossaryEntry[];
  courses: CourseRef[];
}) {
  const [q, setQ] = useState('');
  const [course, setCourse] = useState<string>('all');
  const chapterOf = (slug: string) =>
    courses.find((c) => c.slug === slug)?.glossaryChapter;

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return entries
      .map((e) => ({
        ...e,
        definitions: e.definitions.filter(
          (d) => course === 'all' || d.courses.some((c) => c.slug === course),
        ),
      }))
      .filter((e) => e.definitions.length > 0)
      .filter(
        (e) =>
          !needle ||
          e.term.toLowerCase().includes(needle) ||
          e.definitions.some((d) => d.meaning.toLowerCase().includes(needle)),
      );
  }, [entries, q, course]);

  const letters = [...new Set(entries.map((e) => e.letter))].sort();
  const available = new Set(shown.map((e) => e.letter));
  const grouped = letters
    .filter((l) => available.has(l))
    .map((l) => ({ letter: l, items: shown.filter((e) => e.letter === l) }));

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="g-search" className="sr-only">
            Search glossary
          </label>
          <Input
            id="g-search"
            type="search"
            placeholder="Search terms and meanings…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="g-course" className="sr-only">
            Filter by course
          </label>
          <select
            id="g-course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="border-input bg-background focus-visible:ring-ring/50 h-8 w-full rounded-lg border px-2.5 text-sm focus-visible:ring-3 focus-visible:outline-none sm:w-72"
          >
            <option value="all">All courses</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <nav aria-label="Jump to letter" className="mt-4 flex flex-wrap gap-1">
        {letters.map((l) =>
          available.has(l) ? (
            <a
              key={l}
              href={`#letter-${l}`}
              className="hover:bg-muted focus-visible:ring-ring/50 inline-flex size-8 items-center justify-center rounded-md border text-sm font-medium focus-visible:ring-3 focus-visible:outline-none"
            >
              {l}
            </a>
          ) : (
            <span
              key={l}
              aria-hidden
              className="text-muted-foreground/50 inline-flex size-8 items-center justify-center rounded-md border border-dashed text-sm"
            >
              {l}
            </span>
          ),
        )}
      </nav>

      <p className="text-muted-foreground mt-4 text-sm" aria-live="polite">
        {shown.length} term{shown.length === 1 ? '' : 's'}
      </p>

      {grouped.length === 0 && (
        <div className="mt-4 rounded-lg border p-6 text-center text-sm">
          No terms match.{' '}
          <Button
            variant="link"
            size="sm"
            onClick={() => {
              setQ('');
              setCourse('all');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}

      {grouped.map((g) => (
        <section
          key={g.letter}
          id={`letter-${g.letter}`}
          aria-labelledby={`h-${g.letter}`}
          className="mt-8 scroll-mt-20"
        >
          <h2
            id={`h-${g.letter}`}
            className="text-muted-foreground border-b pb-1 text-lg font-semibold"
          >
            {g.letter}
          </h2>
          <dl className="mt-3 space-y-5">
            {g.items.map((e) => (
              <div key={e.term}>
                <dt className="font-semibold">
                  <InlineMd text={e.term} />
                </dt>
                {e.definitions.map((d, i) => (
                  <dd key={i} className="mt-1 text-sm">
                    <p>
                      <InlineMd text={d.meaning} />
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-1.5">
                      {d.courses.map((c) => {
                        const ch = chapterOf(c.slug);
                        return ch ? (
                          <Link
                            key={c.slug}
                            href={`/courses/${c.slug}/${ch}#glossary`}
                          >
                            <Badge variant="outline" className="hover:bg-muted">
                              {c.title}
                            </Badge>
                          </Link>
                        ) : (
                          <Badge key={c.slug} variant="outline">
                            {c.title}
                          </Badge>
                        );
                      })}
                    </p>
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
