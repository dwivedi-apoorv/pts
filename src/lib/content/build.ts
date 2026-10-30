import GithubSlugger from 'github-slugger';
import type { Root, RootContent } from 'mdast';
import { parseMarkdown } from './parse';
import type { Course, GlossaryEntry, SearchRecord } from './types';

const INLINE = new Set([
  'paragraph',
  'heading',
  'emphasis',
  'strong',
  'link',
  'linkReference',
  'delete',
  'tableCell',
]);

export function plainText(node: Root | RootContent): string {
  if (
    node.type === 'text' ||
    node.type === 'inlineCode' ||
    node.type === 'code'
  )
    return node.value;
  if (node.type === 'image') return node.alt ?? '';
  if (node.type === 'break') return ' ';
  if ('children' in node) {
    const parts = (node.children as RootContent[]).map(plainText);
    return INLINE.has(node.type) ? parts.join('') : parts.join(' ');
  }
  return '';
}

const clean = (s: string) => s.replace(/\s+/g, ' ').trim();

export function buildSearchRecords(courses: Course[]): SearchRecord[] {
  const records: SearchRecord[] = [];
  for (const course of courses) {
    for (const ch of course.chapters) {
      const base = {
        courseSlug: course.slug,
        courseTitle: course.title,
        chapterSlug: ch.slug,
        chapterTitle: ch.title,
      };
      const idBase = `${course.slug}/${ch.slug}`;
      const root = parseMarkdown(ch.markdown);
      const slugger = new GithubSlugger();
      let current: { headingId?: string; heading: string; texts: string[] } = {
        heading: ch.title,
        texts: [],
      };
      const flush = () => {
        const text = clean(current.texts.join(' '));
        if (!text && !current.headingId) return;
        records.push({
          ...base,
          id: current.headingId ? `${idBase}#${current.headingId}` : idBase,
          headingId: current.headingId,
          heading: current.heading,
          text,
        });
      };
      for (const node of root.children) {
        if (node.type === 'heading' && (node.depth === 2 || node.depth === 3)) {
          flush();
          const heading = clean(plainText(node));
          current = { headingId: slugger.slug(heading), heading, texts: [] };
        } else current.texts.push(plainText(node));
      }
      flush();

      // Q&A questions get anchors "q-<number>"; glossary and knowledge check
      // use "glossary" and "knowledge-check". The lesson reader must render
      // those ids.
      for (const q of ch.qa ?? []) {
        const answer = clean(plainText(parseMarkdown(q.answerMarkdown)));
        records.push({
          ...base,
          id: `${idBase}#q-${q.number}`,
          headingId: `q-${q.number}`,
          heading: q.question,
          text: answer,
        });
      }
      if (ch.kind === 'glossary-check') {
        if (course.glossary.length) {
          records.push({
            ...base,
            id: `${idBase}#glossary`,
            headingId: 'glossary',
            heading: 'Glossary',
            text: course.glossary
              .map((g) => `${g.term}: ${g.meaning}`)
              .join(' '),
          });
        }
        if (course.knowledgeCheck.length) {
          records.push({
            ...base,
            id: `${idBase}#knowledge-check`,
            headingId: 'knowledge-check',
            heading: 'Knowledge check',
            text: course.knowledgeCheck
              .map((q) => `${q.question} ${q.answer ?? ''}`)
              .join(' '),
          });
        }
      }
    }
  }
  return records;
}

export function buildGlossary(courses: Course[]): GlossaryEntry[] {
  const byTerm = new Map<string, GlossaryEntry>();
  for (const course of courses) {
    for (const g of course.glossary) {
      const key = g.term.trim().toLowerCase();
      let entry = byTerm.get(key);
      if (!entry) {
        const first = g.term.trim().charAt(0).toUpperCase();
        entry = {
          term: g.term.trim(),
          letter: /[A-Z]/.test(first) ? first : '#',
          definitions: [],
        };
        byTerm.set(key, entry);
      }
      const norm = g.meaning.trim().toLowerCase();
      const def = entry.definitions.find(
        (d) => d.meaning.trim().toLowerCase() === norm,
      );
      const ref = { slug: course.slug, title: course.title };
      if (def) {
        if (!def.courses.some((c) => c.slug === ref.slug))
          def.courses.push(ref);
      } else
        entry.definitions.push({ meaning: g.meaning.trim(), courses: [ref] });
    }
  }
  return [...byTerm.values()].sort((a, b) =>
    a.term.localeCompare(b.term, 'en', { sensitivity: 'base' }),
  );
}
