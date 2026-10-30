import { describe, expect, it } from 'vitest';
import { continueChapter, courseProgress } from '../src/lib/progress-calc';
import type { Course } from '../src/lib/content/types';

const course = {
  slug: 'c',
  chapters: ['a', 'b', 'c', 'd'].map((slug, i) => ({ slug, index: i + 1 })),
} as unknown as Course;

describe('courseProgress', () => {
  it('is completed chapters over total chapters', () => {
    const p = courseProgress(course, ['a', 'b']);
    expect(p).toMatchObject({
      done: 2,
      total: 4,
      percent: 50,
      status: 'in-progress',
    });
  });
  it('reports not started and completed', () => {
    expect(courseProgress(course, []).status).toBe('not-started');
    expect(courseProgress(course, ['a', 'b', 'c', 'd']).status).toBe(
      'completed',
    );
  });
  it('ignores saved chapters that no longer exist', () => {
    const p = courseProgress(course, [
      'a',
      'removed-chapter',
      'another-old-one',
    ]);
    expect(p.done).toBe(1);
    expect(p.percent).toBe(25);
  });
  it('does not double count duplicates', () => {
    expect(courseProgress(course, ['a', 'a', 'a']).done).toBe(1);
  });
  it('never exceeds 100 when everything plus stale rows are saved', () => {
    expect(courseProgress(course, ['a', 'b', 'c', 'd', 'x', 'y']).percent).toBe(
      100,
    );
  });
});

describe('continueChapter', () => {
  it('resumes at the last visited chapter when it still exists', () => {
    expect(continueChapter(course, courseProgress(course, ['a']), 'c')).toBe(
      'c',
    );
  });
  it('falls back to the first unfinished chapter', () => {
    expect(
      continueChapter(course, courseProgress(course, ['a', 'b']), 'gone'),
    ).toBe('c');
    expect(continueChapter(course, courseProgress(course, []))).toBe('a');
  });
  it('falls back to the first chapter when everything is done', () => {
    expect(
      continueChapter(course, courseProgress(course, ['a', 'b', 'c', 'd'])),
    ).toBe('a');
  });
});
