export type Course = {
  slug: string;
  title: string;
  description: string;
  order: number;
  badge?: string;
  intro: string; // markdown before first ##
  chapters: Chapter[];
  glossary: { term: string; meaning: string }[];
  knowledgeCheck: {
    number: number;
    key: string;
    question: string;
    answer?: string;
  }[];
  stats: { words: number; readingMinutes: number; chapterCount: number };
};

export type Chapter = {
  slug: string;
  index: number; // 1-based position in the file
  title: string;
  markdown: string; // body with glossary/knowledge-check blocks removed
  headings: { id: string; text: string; level: 2 | 3 }[];
  kind: 'standard' | 'qa' | 'glossary-check';
  qa?: { number: number; question: string; answerMarkdown: string }[];
  checklistItems?: { key: string; text: string }[];
  readingMinutes: number;
};

export type SearchRecord = {
  id: string;
  courseSlug: string;
  courseTitle: string;
  chapterSlug: string;
  chapterTitle: string;
  headingId?: string;
  heading: string;
  text: string;
};

export type GlossaryEntry = {
  term: string;
  letter: string;
  definitions: {
    meaning: string;
    courses: { slug: string; title: string }[];
  }[];
};
