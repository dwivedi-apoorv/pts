import { beforeEach, describe, expect, it, vi } from 'vitest';
import { buildGlossary } from '../src/lib/content/build';
import { loadCourses } from '../src/lib/content/load';
import type { SearchRecord } from '../src/lib/content/types';
import { buildSearchRecords } from '../src/lib/content/build';
import { renderMarkdown } from '../src/lib/markdown';
import {
  buildIndex,
  diversify,
  groupByCourse,
  hitHref,
  runSearch,
  snippetParts,
} from '../src/lib/search-client';

const courses = loadCourses();
const records: SearchRecord[] = buildSearchRecords(courses);
const index = buildIndex(records);
const slugsOf = (q: string) => [
  ...new Set(runSearch(index, q).map((h) => h.courseSlug)),
];

describe('search', () => {
  it('finds ROAS in several courses, top hits mention it', () => {
    const hits = runSearch(index, 'ROAS');
    expect(slugsOf('ROAS')).toEqual(
      expect.arrayContaining([
        'performance-marketing-basics',
        'analytics-reporting-basics',
      ]),
    );
    expect(new Set(hits.map((h) => h.courseSlug)).size).toBeGreaterThan(2);
    for (const h of hits.slice(0, 5))
      expect(`${h.heading} ${h.text}`.toLowerCase()).toContain('roas');
  });

  it('finds backlink sections in the SEO course', () => {
    const hits = runSearch(index, 'backlink');
    expect(
      hits.some(
        (h) =>
          h.courseSlug === 'seo-basics' && /off-page/i.test(h.chapterTitle),
      ),
    ).toBe(true);
  });

  it('finds reconciliation in the analytics course, ranked before near matches', () => {
    const hits = runSearch(index, 'reconciliation');
    expect(hits.length).toBeGreaterThan(0);
    const exact = (h: (typeof hits)[number]) =>
      `${h.heading} ${h.text}`.toLowerCase().includes('reconciliation');
    // Fuzzy matching may add weaker near-matches (for example "conciliation"),
    // but every exact match must come first and be in the analytics course.
    const firstNonExact = hits.findIndex((h) => !exact(h));
    const exactHits =
      firstNonExact === -1 ? hits : hits.slice(0, firstNonExact);
    expect(exactHits.length).toBeGreaterThan(0);
    expect(
      exactHits.every((h) => h.courseSlug === 'analytics-reporting-basics'),
    ).toBe(true);
    expect(hits.filter(exact)).toHaveLength(exactHits.length);
  });

  it('matches prefixes and tolerates a typo in longer words', () => {
    expect(runSearch(index, 'backlin').length).toBeGreaterThan(0);
    expect(runSearch(index, 'reconcilation').length).toBeGreaterThan(0);
  });

  it('ranks a heading match above a body-only match', () => {
    const [top] = runSearch(index, 'backlinks');
    expect(
      top.heading.toLowerCase() + top.chapterTitle.toLowerCase(),
    ).toContain('backlink');
  });

  it('returns nothing for very short or unknown queries', () => {
    expect(runSearch(index, 'a')).toEqual([]);
    expect(runSearch(index, 'zzzqqqxxx')).toEqual([]);
  });

  it('every result link points at an anchor that exists on the lesson page', () => {
    const htmlByChapter = new Map<string, string>();
    const html = (courseSlug: string, chapterSlug: string) => {
      const key = `${courseSlug}/${chapterSlug}`;
      if (!htmlByChapter.has(key)) {
        const ch = courses
          .find((c) => c.slug === courseSlug)!
          .chapters.find((c) => c.slug === chapterSlug)!;
        htmlByChapter.set(key, renderMarkdown(ch.markdown));
      }
      return htmlByChapter.get(key)!;
    };
    for (const r of records) {
      const course = courses.find((c) => c.slug === r.courseSlug)!;
      const chapter = course.chapters.find((c) => c.slug === r.chapterSlug)!;
      expect(chapter, r.id).toBeTruthy();
      if (!r.headingId) continue;
      const href = hitHref(r);
      expect(href).toBe(
        `/courses/${r.courseSlug}/${r.chapterSlug}#${r.headingId}`,
      );
      const special =
        r.headingId === 'glossary' || r.headingId === 'knowledge-check';
      const qa = /^q-(\d+)$/.exec(r.headingId);
      if (special) expect(chapter.kind, r.id).toBe('glossary-check');
      else if (qa)
        expect(
          chapter.qa?.some((q) => q.number === Number(qa[1])),
          r.id,
        ).toBe(true);
      else
        expect(html(r.courseSlug, r.chapterSlug), r.id).toContain(
          `id="${r.headingId}"`,
        );
    }
  });

  it('palette results span courses instead of one course filling the list', () => {
    const top = diversify(runSearch(index, 'roas', 100));
    expect(top.length).toBeLessThanOrEqual(10);
    expect(new Set(top.map((h) => h.courseSlug)).size).toBeGreaterThan(2);
    const per = new Map<string, number>();
    for (const h of top)
      per.set(h.courseSlug, (per.get(h.courseSlug) ?? 0) + 1);
    for (const n of per.values()) expect(n).toBeLessThanOrEqual(3);
  });

  it('groups hits by course in rank order', () => {
    const groups = groupByCourse(runSearch(index, 'roas'));
    expect(new Set(groups.map((g) => g.courseSlug)).size).toBe(groups.length);
  });

  it('builds highlighted snippets around the match', () => {
    const parts = snippetParts(
      'Return on ad spend, or ROAS, shows revenue per dollar of advertising.',
      ['roas'],
    );
    expect(parts.find((p) => p.match)?.text).toBe('ROAS');
    expect(parts.map((p) => p.text).join('')).toContain('ROAS');
  });

  it('does not treat regex characters in terms as patterns', () => {
    expect(() => snippetParts('a (b) c', ['(b'])).not.toThrow();
  });
});

describe('combined glossary', () => {
  const glossary = buildGlossary(courses);

  it('lists every distinct term once', () => {
    const terms = new Set(
      courses.flatMap((c) =>
        c.glossary.map((g) => g.term.trim().toLowerCase()),
      ),
    );
    expect(glossary).toHaveLength(terms.size);
  });

  it('shows identical meanings once with all course names', () => {
    const merged = glossary
      .flatMap((e) => e.definitions)
      .filter((d) => d.courses.length > 1);
    expect(merged.length).toBeGreaterThan(0);
    for (const e of glossary) {
      const meanings = e.definitions.map((d) => d.meaning.toLowerCase());
      expect(new Set(meanings).size).toBe(meanings.length);
    }
  });

  it('keeps different meanings separate and attributed', () => {
    const differing = glossary.filter((e) => e.definitions.length > 1);
    for (const e of differing)
      for (const d of e.definitions)
        expect(d.courses.length).toBeGreaterThan(0);
  });

  it('has a letter for each entry that the jump bar can use', () => {
    for (const e of glossary) expect(e.letter).toMatch(/^([A-Z]|#)$/);
  });

  it('every course appears in at least one entry', () => {
    const seen = new Set(
      glossary.flatMap((e) =>
        e.definitions.flatMap((d) => d.courses.map((c) => c.slug)),
      ),
    );
    expect(seen.size).toBe(courses.length);
  });
});

describe('/api/search-index', () => {
  beforeEach(() => vi.resetModules());

  it('returns nothing to a caller who is not a member', async () => {
    vi.doMock('@/lib/auth', () => ({
      requireMember: async () => {
        throw new Error('REDIRECT:/login');
      },
    }));
    const { GET } = await import('../src/app/api/search-index/route');
    await expect(GET()).rejects.toThrow('REDIRECT:/login');
  });

  it('returns the index privately to a member', async () => {
    vi.doMock('@/lib/auth', () => ({ requireMember: async () => ({}) }));
    const { GET } = await import('../src/app/api/search-index/route');
    const res = await GET();
    expect(res.headers.get('cache-control')).toMatch(/^private/);
    const body = (await res.json()) as unknown[];
    expect(body.length).toBe(records.length);
  });
});
