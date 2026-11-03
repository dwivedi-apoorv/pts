import 'server-only';
import contentJson from '@/generated/content.json';
import glossaryJson from '@/generated/glossary.json';
import { courseCategories } from '../../content/courses.config';
import { groupByCategory } from './categories';
import type { Chapter, Course, GlossaryEntry } from './content/types';

const courses = (contentJson as unknown as Course[])
  .slice()
  .sort((a, b) => a.order - b.order);

export const getCourses = (): Course[] => courses;
/** Courses under their category headings, in the order set in content/courses.config.ts. */
export const groupCourses = <T extends { category: string }>(list: T[]) =>
  groupByCategory(list, courseCategories);
export const getCourse = (slug: string): Course | undefined =>
  courses.find((c) => c.slug === slug);
export const getGlossary = (): GlossaryEntry[] =>
  glossaryJson as unknown as GlossaryEntry[];

export function getChapter(
  course: Course,
  slug: string,
): { chapter: Chapter; prev?: Chapter; next?: Chapter } | undefined {
  const i = course.chapters.findIndex((c) => c.slug === slug);
  if (i < 0) return undefined;
  return {
    chapter: course.chapters[i],
    prev: course.chapters[i - 1],
    next: course.chapters[i + 1],
  };
}

export type { Chapter, Course, GlossaryEntry };
