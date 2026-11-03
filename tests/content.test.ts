import fs from 'node:fs';
import path from 'node:path';
import { beforeAll, describe, expect, it } from 'vitest';
import expected from './fixtures/expected-chapters.json';
import { courseConfig } from '../content/courses.config';
import { buildGlossary, buildSearchRecords } from '../src/lib/content/build';
import { loadCourses } from '../src/lib/content/load';
import { ContentError, parseCourse } from '../src/lib/content/parse';
import type { Course } from '../src/lib/content/types';
import { renderMarkdown } from '../src/lib/markdown';

const meta = { slug: 'x', description: 'd', order: 1 };
let courses: Course[];
const bySlug = (slug: string) => courses.find((c) => c.slug === slug)!;

beforeAll(() => {
  courses = loadCourses();
});

const countTables = (md: string) => {
  let fence = false;
  let n = 0;
  for (const line of md.split('\n')) {
    if (/^\s*```/.test(line)) fence = !fence;
    if (!fence && /^\|?\s*:?-{3,}:?\s*\|/.test(line)) n++;
  }
  return n;
};

describe('real course files', () => {
  it('loads every configured course, sorted by order', () => {
    const configured = [...courseConfig].sort((a, b) => a.order - b.order);
    expect(courses.map((c) => c.slug)).toEqual(configured.map((c) => c.slug));
    // orders are unique, so the sequence is unambiguous
    expect(new Set(courseConfig.map((c) => c.order)).size).toBe(
      courseConfig.length,
    );
  });

  it.each(Object.entries(expected))('%s has %i chapters', (slug, count) => {
    expect(bySlug(slug).chapters).toHaveLength(count);
    expect(bySlug(slug).stats.chapterCount).toBe(count);
  });

  it('has unique course and chapter slugs and a glossary', () => {
    expect(new Set(courses.map((c) => c.slug)).size).toBe(courses.length);
    for (const c of courses) {
      expect(new Set(c.chapters.map((ch) => ch.slug)).size).toBe(
        c.chapters.length,
      );
      expect(c.glossary.length).toBeGreaterThan(0);
      c.chapters.forEach((ch, i) => expect(ch.index).toBe(i + 1));
    }
  });

  it('pairs knowledge-check questions with answers', () => {
    for (const c of courses) {
      expect(c.knowledgeCheck.length).toBeGreaterThanOrEqual(10);
      const answered = c.knowledgeCheck.filter((q) => q.answer).length;
      if (c.slug === 'project-management-onboarding') {
        expect(c.knowledgeCheck).toHaveLength(10);
        expect(answered).toBe(0);
      } else expect(answered).toBe(c.knowledgeCheck.length);
    }
  });

  it('parses client Q&A chapters', () => {
    const analytics = bySlug('analytics-reporting-basics');
    const qa = analytics.chapters.find((c) => c.kind === 'qa')!;
    expect(qa.qa).toHaveLength(30);
    for (const c of courses.filter(
      (c) => c.slug !== 'project-management-onboarding',
    )) {
      const ch = c.chapters.find((x) =>
        /questions and sample answers/i.test(x.title),
      )!;
      expect(ch, c.slug).toBeTruthy();
      expect(ch.kind).toBe('qa');
      expect(ch.qa!.length).toBeGreaterThanOrEqual(20);
    }
  });

  it('finds the onboarding checklist in chapter 10', () => {
    const ch = bySlug('project-management-onboarding').chapters[9];
    expect(ch.kind).toBe('glossary-check');
    expect(ch.checklistItems!.length).toBe(8);
    expect(new Set(ch.checklistItems!.map((i) => i.key)).size).toBe(8);
  });

  it('removes glossary and knowledge-check blocks from lesson markdown', () => {
    for (const c of courses) {
      const last = c.chapters[c.chapters.length - 1];
      expect(last.markdown).not.toMatch(/\*\*Glossary\*\*/);
      expect(last.markdown).not.toMatch(/\*\*Knowledge check\*\*/);
      expect(last.markdown).not.toMatch(/\*\*Answer guide\*\*/);
    }
  });

  it('keeps every table when rendering', () => {
    for (const cfg of courseConfig) {
      const src = fs.readFileSync(
        path.join('content/courses', cfg.file),
        'utf8',
      );
      const c = bySlug(cfg.slug);
      const html = [c.intro, ...c.chapters.map((ch) => ch.markdown)]
        .map(renderMarkdown)
        .join('\n');
      const rendered = (html.match(/<table>/g) ?? []).length;
      const glossaryTables = c.glossary.length ? 1 : 0;
      expect(rendered + glossaryTables).toBe(countTables(src));
    }
  });

  it('keeps chapter slugs when a heading is renumbered', () => {
    const cfg = courseConfig.find(
      (c) => c.slug === 'analytics-reporting-basics',
    )!;
    const src = fs.readFileSync(path.join('content/courses', cfg.file), 'utf8');
    expect(src).toContain('## 13. Data quality checks');
    const edited = src.replace(
      '## 13. Data quality checks',
      '## 14. Data quality checks',
    );
    const a = parseCourse('a.md', src, meta);
    const b = parseCourse('b.md', edited, meta);
    expect(b.chapters.map((c) => c.slug)).toEqual(
      a.chapters.map((c) => c.slug),
    );
    expect(b.chapters[12].slug).toBe('data-quality-checks');
    expect(b.chapters[12].index).toBe(13);
  });

  it('reading time is words / 200 rounded up, minimum 1', () => {
    for (const c of courses) {
      expect(c.stats.readingMinutes).toBe(
        Math.max(1, Math.ceil(c.stats.words / 200)),
      );
      for (const ch of c.chapters)
        expect(ch.readingMinutes).toBeGreaterThanOrEqual(1);
    }
  });

  it('heading ids match the rendered HTML ids', () => {
    for (const c of courses) {
      for (const ch of c.chapters) {
        const html = renderMarkdown(ch.markdown);
        for (const h of ch.headings) expect(html).toContain(`id="${h.id}"`);
      }
    }
  });
});

describe('search index and glossary', () => {
  it('finds ROAS, backlink and reconciliation across courses', () => {
    const records = buildSearchRecords(courses);
    for (const term of ['roas', 'backlink', 'reconciliation']) {
      const hits = records.filter((r) =>
        `${r.heading} ${r.text}`.toLowerCase().includes(term),
      );
      expect(hits.length, term).toBeGreaterThan(0);
    }
    expect(new Set(records.map((r) => r.id)).size).toBe(records.length);
  });

  it('merges identical glossary meanings across courses', () => {
    const g = buildGlossary(courses);
    const total = courses.reduce((n, c) => n + c.glossary.length, 0);
    expect(g.length).toBeLessThan(total);
    expect(g.every((e) => e.definitions.length > 0)).toBe(true);
  });
});

describe('error handling', () => {
  const doc = (body: string) => `# Title\n\nIntro.\n\n${body}`;

  it('names file and line for a missing title', () => {
    expect(() => parseCourse('f.md', '## 1. A\ntext', meta)).toThrow(
      /^f\.md:1:/,
    );
  });

  it('rejects a second # title', () => {
    expect(() =>
      parseCourse('f.md', doc('## 1. A\n\n# Another\n'), meta),
    ).toThrow(/f\.md:7: only one/);
  });

  it('rejects duplicate chapter slugs', () => {
    const src = doc('## 1. Same\ntext\n\n## 2. Same\ntext\n');
    expect(() => parseCourse('f.md', src, meta)).toThrow(
      /f\.md:8: .*same slug/,
    );
  });

  it('rejects a glossary without a table', () => {
    const src = doc('## 1. A\n\n**Glossary**\n\nnot a table\n');
    expect(() => parseCourse('f.md', src, meta)).toThrow(ContentError);
    expect(() => parseCourse('f.md', src, meta)).toThrow(
      /f\.md:\d+: expected a table/,
    );
  });

  it('rejects mismatched question and answer counts', () => {
    const src = doc(
      '## 1. A\n\n**Knowledge check**\n\n1. Q1\n2. Q2\n\n**Answer guide**\n\n1. A1\n',
    );
    expect(() => parseCourse('f.md', src, meta)).toThrow(
      /2 questions but .* 1 answers/,
    );
  });

  it('falls back to standard rendering with fewer than 3 questions', () => {
    const src = doc(
      '## 1. Client questions\n\n**1. One?**\nYes.\n\n**2. Two?**\nNo.\n',
    );
    expect(parseCourse('f.md', src, meta).chapters[0].kind).toBe('standard');
  });

  it('is tolerant of CRLF, BOM, non-breaking spaces and label colons', () => {
    const body =
      '## 1.\u00a0Terms\n\n**Glossary:**\n\n| Term | Meaning |\n| --- | --- |\n| A | B |\n';
    const src = ('\uFEFF' + doc(body)).replace(/\n/g, '\r\n');
    const c = parseCourse('f.md', src, meta);
    expect(c.glossary).toEqual([{ term: 'A', meaning: 'B' }]);
    expect(c.chapters[0].slug).toBe('terms');
  });

  it('ignores headings and labels inside code fences', () => {
    const src = doc(
      '## 1. A\n\n```\n# not a title\n## not a chapter\n**Glossary**\n```\n',
    );
    const c = parseCourse('f.md', src, meta);
    expect(c.chapters).toHaveLength(1);
    expect(c.glossary).toHaveLength(0);
  });

  it('fails on files missing from the config', () => {
    const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR ?? '/tmp', 'lp-'));
    fs.mkdirSync(path.join(tmp, 'content/courses'), { recursive: true });
    fs.writeFileSync(path.join(tmp, 'content/courses/stray.md'), '# x');
    expect(() => loadCourses(tmp)).toThrow(
      /stray\.md: this file is not listed/,
    );
  });
});
