import MiniSearch from 'minisearch';
import type { SearchRecord } from './content/types';

export type SearchHit = SearchRecord & { score: number; terms: string[] };
export type SearchIndex = MiniSearch<SearchRecord>;

export function buildIndex(records: SearchRecord[]): SearchIndex {
  const index = new MiniSearch<SearchRecord>({
    fields: ['heading', 'chapterTitle', 'text'],
    storeFields: [
      'courseSlug',
      'courseTitle',
      'chapterSlug',
      'chapterTitle',
      'headingId',
      'heading',
      'text',
    ],
    searchOptions: {
      boost: { heading: 3, chapterTitle: 1.5 },
      prefix: true,
      // Short words are matched exactly (plus prefix) to avoid noisy fuzzy hits.
      fuzzy: (term) => (term.length > 5 ? 0.2 : false),
      combineWith: 'AND',
    },
  });
  index.addAll(records);
  return index;
}

export function runSearch(
  index: SearchIndex,
  query: string,
  limit = 50,
): SearchHit[] {
  const q = query.trim();
  if (q.length < 2) return [];
  return index
    .search(q)
    .slice(0, limit)
    .map((r) => ({
      id: r.id,
      courseSlug: r.courseSlug,
      courseTitle: r.courseTitle,
      chapterSlug: r.chapterSlug,
      chapterTitle: r.chapterTitle,
      headingId: r.headingId,
      heading: r.heading,
      text: r.text,
      score: r.score,
      terms: r.terms,
    }));
}

/** Keeps rank order but caps hits per course so one course cannot fill the list. */
export function diversify(
  hits: SearchHit[],
  perCourse = 3,
  total = 10,
): SearchHit[] {
  const count = new Map<string, number>();
  const out: SearchHit[] = [];
  for (const h of hits) {
    const n = count.get(h.courseSlug) ?? 0;
    if (n >= perCourse) continue;
    count.set(h.courseSlug, n + 1);
    out.push(h);
    if (out.length >= total) break;
  }
  return out;
}

export function hitHref(
  r: Pick<SearchRecord, 'courseSlug' | 'chapterSlug' | 'headingId'>,
): string {
  return `/courses/${r.courseSlug}/${r.chapterSlug}${r.headingId ? `#${r.headingId}` : ''}`;
}

export type SnippetPart = { text: string; match: boolean };

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** A short excerpt around the first match, split so matches can be highlighted. */
export function snippetParts(
  text: string,
  terms: string[],
  length = 170,
): SnippetPart[] {
  const clean = terms.filter(Boolean);
  if (!clean.length) return [{ text: text.slice(0, length), match: false }];
  const re = new RegExp(`(${clean.map(escapeRe).join('|')})`, 'gi');
  const first = text.search(re);
  const start = first > 40 ? first - 40 : 0;
  let excerpt = text.slice(start, start + length);
  if (start > 0) excerpt = '…' + excerpt;
  if (start + length < text.length) excerpt += '…';
  return excerpt
    .split(re)
    .filter((p) => p !== '')
    .map((p) => ({
      text: p,
      match: clean.some((t) => t.toLowerCase() === p.toLowerCase()),
    }));
}

let loading: Promise<SearchIndex> | null = null;

/** Fetches the index once (members only) and shares it between the palette and /search. */
export function loadIndex(): Promise<SearchIndex> {
  if (!loading) {
    loading = fetch('/api/search-index', { credentials: 'same-origin' })
      .then(async (res) => {
        if (!res.ok || !res.headers.get('content-type')?.includes('json')) {
          throw new Error('Search is unavailable. Try signing in again.');
        }
        return buildIndex((await res.json()) as SearchRecord[]);
      })
      .catch((err) => {
        loading = null;
        throw err;
      });
  }
  return loading;
}

export function groupByCourse(
  hits: SearchHit[],
): { courseSlug: string; courseTitle: string; hits: SearchHit[] }[] {
  const groups = new Map<
    string,
    { courseSlug: string; courseTitle: string; hits: SearchHit[] }
  >();
  for (const h of hits) {
    const g = groups.get(h.courseSlug) ?? {
      courseSlug: h.courseSlug,
      courseTitle: h.courseTitle,
      hits: [],
    };
    g.hits.push(h);
    groups.set(h.courseSlug, g);
  }
  return [...groups.values()];
}
