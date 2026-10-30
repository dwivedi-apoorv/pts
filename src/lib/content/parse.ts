import { createHash } from 'node:crypto';
import GithubSlugger from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import type { List, ListItem, Root, RootContent } from 'mdast';
import type { Chapter, Course } from './types';

export class ContentError extends Error {
  constructor(
    public file: string,
    public line: number | null,
    message: string,
  ) {
    super(`${file}${line ? `:${line}` : ''}: ${message}`);
    this.name = 'ContentError';
  }
}

export type CourseMeta = {
  slug: string;
  description: string;
  order: number;
  badge?: string;
};

type Line = { text: string; no: number; fenced: boolean };

const LABEL_RE =
  /^\*\*\s*(Glossary|Knowledge check|Answer guide)\s*:?\s*\*\*\s*:?\s*$/i;
const H1_RE = /^#(?!#)\s+(.+?)\s*#*\s*$/;
const H2_RE = /^##(?!#)\s+(.+?)\s*#*\s*$/;
const QA_Q_RE = /^\*\*(\d+)\.\s+(.+?)\*\*\s*$/;
const LIST_ITEM_RE = /^(\d+)[.)]\s+(.*)$/;
const SEPARATOR_RE = /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

export function normalizeSource(raw: string): string {
  return raw.replace(/^﻿/, '').replace(/\r\n?/g, '\n').replace(/ /g, ' ');
}

export function hash8(text: string): string {
  return createHash('sha1')
    .update(text.trim().replace(/\s+/g, ' '))
    .digest('hex')
    .slice(0, 8);
}

export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function countWords(text: string): number {
  return text.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
}

export function readingMinutes(words: number): number {
  return Math.max(1, Math.ceil(words / 200));
}

function toLines(source: string): Line[] {
  let fence: string | null = null;
  return source.split('\n').map((text, i) => {
    const m = /^\s*(```+|~~~+)/.exec(text);
    let fenced = fence !== null;
    if (m) {
      const marker = m[1][0];
      if (fence === null) {
        fence = marker;
        fenced = true;
      } else if (fence === marker) {
        fence = null;
        fenced = true;
      }
    }
    return { text, no: i + 1, fenced };
  });
}

const processor = unified().use(remarkParse).use(remarkGfm);
export function parseMarkdown(markdown: string): Root {
  return processor.parse(markdown) as Root;
}

function collapseBlank(lines: string[]): string {
  return lines
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function splitRow(text: string): string[] {
  let t = text.trim();
  if (t.startsWith('|')) t = t.slice(1);
  if (t.endsWith('|') && !t.endsWith('\\|')) t = t.slice(0, -1);
  return t.split(/(?<!\\)\|/).map((c) => c.trim().replace(/\\\|/g, '|'));
}

type NumberedItem = { number: number; text: string; line: number };

type ChapterScan = {
  keep: Line[];
  glossary: { term: string; meaning: string }[];
  questions: NumberedItem[];
  answers: NumberedItem[];
  hasGlossary: boolean;
  hasCheck: boolean;
};

function scanChapter(file: string, body: Line[]): ChapterScan {
  const keep: Line[] = [];
  const out: ChapterScan = {
    keep,
    glossary: [],
    questions: [],
    answers: [],
    hasGlossary: false,
    hasCheck: false,
  };
  const seen = new Set<string>();
  let i = 0;
  while (i < body.length) {
    const line = body[i];
    const label = line.fenced ? null : LABEL_RE.exec(line.text.trim());
    if (!label) {
      keep.push(line);
      i++;
      continue;
    }
    const name = label[1].toLowerCase();
    if (seen.has(name)) {
      throw new ContentError(
        file,
        line.no,
        `"${label[1]}" appears twice in the same chapter`,
      );
    }
    seen.add(name);
    i++;
    while (i < body.length && body[i].text.trim() === '') i++;

    if (name === 'glossary') {
      out.hasGlossary = true;
      const start = i;
      const rows: Line[] = [];
      while (i < body.length && body[i].text.trim().startsWith('|')) {
        rows.push(body[i]);
        i++;
      }
      if (rows.length < 3 || !SEPARATOR_RE.test(rows[1].text.trim())) {
        throw new ContentError(
          file,
          body[start]?.no ?? line.no,
          'expected a table (Term | Meaning, separator row, then rows) after **Glossary**',
        );
      }
      for (const row of rows.slice(2)) {
        const cells = splitRow(row.text);
        if (cells.length !== 2 || !cells[0] || !cells[1]) {
          throw new ContentError(
            file,
            row.no,
            `glossary rows need exactly two filled columns (Term | Meaning), found: "${row.text.trim()}"`,
          );
        }
        out.glossary.push({ term: cells[0], meaning: cells[1] });
      }
    } else {
      const items: NumberedItem[] = [];
      while (i < body.length) {
        const t = body[i].text;
        const m = LIST_ITEM_RE.exec(t);
        if (m) {
          items.push({
            number: Number(m[1]),
            text: m[2].trim(),
            line: body[i].no,
          });
          i++;
        } else if (t.trim() === '') {
          // blank lines are allowed only if the list continues afterwards
          let j = i;
          while (j < body.length && body[j].text.trim() === '') j++;
          if (
            j < body.length &&
            (LIST_ITEM_RE.test(body[j].text) || /^\s+\S/.test(body[j].text))
          ) {
            i = j;
          } else break;
        } else if (/^\s+\S/.test(t) && items.length > 0) {
          items[items.length - 1].text += '\n' + t.trim();
          i++;
        } else break;
      }
      if (items.length === 0) {
        throw new ContentError(
          file,
          line.no,
          `expected a numbered list after **${label[1]}**`,
        );
      }
      if (name === 'knowledge check') {
        out.hasCheck = true;
        out.questions = items;
      } else out.answers = items;
    }
  }
  if (out.answers.length && !out.questions.length) {
    throw new ContentError(
      file,
      null,
      '**Answer guide** found without a **Knowledge check** in the same chapter',
    );
  }
  if (out.answers.length && out.answers.length !== out.questions.length) {
    throw new ContentError(
      file,
      out.answers[0].line,
      `the knowledge check has ${out.questions.length} questions but the answer guide has ${out.answers.length} answers`,
    );
  }
  return out;
}

function parseQa(
  file: string,
  keep: Line[],
): { preamble: Line[]; qa: NonNullable<Chapter['qa']> } | null {
  const idx: number[] = [];
  keep.forEach((l, i) => {
    if (!l.fenced && QA_Q_RE.test(l.text.trim())) idx.push(i);
  });
  if (idx.length < 3) return null;
  const qa: NonNullable<Chapter['qa']> = [];
  const nums = new Set<number>();
  idx.forEach((start, n) => {
    const end = idx[n + 1] ?? keep.length;
    const m = QA_Q_RE.exec(keep[start].text.trim())!;
    const number = Number(m[1]);
    if (nums.has(number)) {
      throw new ContentError(
        file,
        keep[start].no,
        `client question number ${number} is used twice`,
      );
    }
    nums.add(number);
    const answerMarkdown = collapseBlank(
      keep.slice(start + 1, end).map((l) => l.text),
    );
    if (!answerMarkdown) {
      throw new ContentError(
        file,
        keep[start].no,
        `client question ${number} has no answer text`,
      );
    }
    qa.push({ number, question: m[2].trim(), answerMarkdown });
  });
  return { preamble: keep.slice(0, idx[0]), qa };
}

function extractHeadings(root: Root): Chapter['headings'] {
  const slugger = new GithubSlugger();
  const out: Chapter['headings'] = [];
  for (const node of root.children) {
    if (node.type === 'heading' && (node.depth === 2 || node.depth === 3)) {
      const text = toString(node);
      out.push({ id: slugger.slug(text), text, level: node.depth });
    }
  }
  return out;
}

function extractChecklist(root: Root): { key: string; text: string }[] {
  const items: { key: string; text: string }[] = [];
  const used = new Map<string, number>();
  const walk = (nodes: RootContent[]) => {
    for (const n of nodes) {
      if (n.type === 'listItem' && (n as ListItem).checked != null) {
        const first = (n as ListItem).children[0];
        const text = (first ? toString(first) : toString(n)).trim();
        let key = hash8(text);
        const c = (used.get(key) ?? 0) + 1;
        used.set(key, c);
        if (c > 1) key = `${key}-${c}`;
        items.push({ key, text });
      }
      if ('children' in n) walk((n as List).children as RootContent[]);
    }
  };
  walk(root.children);
  return items;
}

export function parseCourse(
  file: string,
  raw: string,
  meta: CourseMeta,
): Course {
  const lines = toLines(normalizeSource(raw));
  const first = lines.find((l) => l.text.trim() !== '');
  const h1m = first && !first.fenced ? H1_RE.exec(first.text.trim()) : null;
  if (!first || !h1m) {
    throw new ContentError(
      file,
      first?.no ?? 1,
      'the file must start with a single "# Course title" line',
    );
  }
  const title = h1m[1].replace(/[*`]/g, '').trim();
  for (const l of lines) {
    if (l.no > first.no && !l.fenced && H1_RE.test(l.text)) {
      throw new ContentError(
        file,
        l.no,
        'only one "# " title is allowed; use "## " for chapters',
      );
    }
  }
  const h2s = lines.filter((l) => !l.fenced && H2_RE.test(l.text));
  if (h2s.length === 0) {
    throw new ContentError(
      file,
      null,
      'no chapters found (lines starting with "## ")',
    );
  }
  const intro = collapseBlank(
    lines.filter((l) => l.no > first.no && l.no < h2s[0].no).map((l) => l.text),
  );

  const chapters: Chapter[] = [];
  const glossary: Course['glossary'] = [];
  const knowledgeCheck: Course['knowledgeCheck'] = [];
  const slugs = new Map<string, number>();
  let totalWords = countWords(intro);

  h2s.forEach((h, n) => {
    const next = h2s[n + 1]?.no ?? Infinity;
    const body = lines.filter((l) => l.no > h.no && l.no < next);
    const rawTitle = H2_RE.exec(h.text)![1].replace(/[*`]/g, '').trim();
    const chTitle = rawTitle.replace(/^\d+[.)]\s+/, '').trim();
    const slug = slugify(chTitle);
    if (!slug) {
      throw new ContentError(
        file,
        h.no,
        `chapter title "${rawTitle}" produces an empty slug`,
      );
    }
    if (slugs.has(slug)) {
      throw new ContentError(
        file,
        h.no,
        `chapter "${chTitle}" has the same slug ("${slug}") as the chapter on line ${slugs.get(slug)}; rename one of them`,
      );
    }
    slugs.set(slug, h.no);

    const scan = scanChapter(file, body);
    let kind: Chapter['kind'] = 'standard';
    let markdownLines = scan.keep;
    let qa: Chapter['qa'];
    if (scan.hasGlossary || scan.hasCheck) kind = 'glossary-check';
    else if (/\b(client|employee|common) questions\b/i.test(chTitle)) {
      const parsed = parseQa(file, scan.keep);
      if (parsed) {
        kind = 'qa';
        qa = parsed.qa;
        markdownLines = parsed.preamble;
      }
    }
    glossary.push(...scan.glossary);
    scan.questions.forEach((q, qi) => {
      knowledgeCheck.push({
        number: q.number,
        key: `${q.number}-${hash8(q.text)}`,
        question: q.text,
        answer: scan.answers[qi]?.text,
      });
    });

    const markdown = collapseBlank(markdownLines.map((l) => l.text));
    const root = parseMarkdown(markdown);
    const words = countWords(body.map((l) => l.text).join('\n'));
    totalWords += words;
    const checklist = extractChecklist(root);
    const chapter: Chapter = {
      slug,
      index: n + 1,
      title: chTitle,
      markdown,
      headings: extractHeadings(root),
      kind,
      readingMinutes: readingMinutes(words),
    };
    if (qa) chapter.qa = qa;
    if (checklist.length) chapter.checklistItems = checklist;
    chapters.push(chapter);
  });

  const dupKeys = new Set<string>();
  for (const q of knowledgeCheck) {
    if (dupKeys.has(q.key)) {
      throw new ContentError(
        file,
        null,
        `knowledge check question ${q.number} is duplicated`,
      );
    }
    dupKeys.add(q.key);
  }

  return {
    slug: meta.slug,
    title,
    description: meta.description,
    order: meta.order,
    ...(meta.badge ? { badge: meta.badge } : {}),
    intro,
    chapters,
    glossary,
    knowledgeCheck,
    stats: {
      words: totalWords,
      readingMinutes: readingMinutes(totalWords),
      chapterCount: chapters.length,
    },
  };
}
