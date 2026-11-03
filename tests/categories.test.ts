import { describe, expect, it } from 'vitest';
import { courseCategories, courseConfig } from '../content/courses.config';
import { groupByCategory } from '../src/lib/categories';
import { loadCourses } from '../src/lib/content/load';

describe('groupByCategory', () => {
  const order = ['A', 'B', 'C'];
  const item = (id: string, category: string) => ({ id, category });

  it('groups under headings in the configured order, keeping course order inside a group', () => {
    const out = groupByCategory(
      [item('1', 'B'), item('2', 'A'), item('3', 'B'), item('4', 'C')],
      order,
    );
    expect(out.map((g) => g.category)).toEqual(['A', 'B', 'C']);
    expect(out[1].courses.map((c) => c.id)).toEqual(['1', '3']);
  });

  it('omits categories with no courses', () => {
    expect(
      groupByCategory([item('1', 'C')], order).map((g) => g.category),
    ).toEqual(['C']);
    expect(groupByCategory([], order)).toEqual([]);
  });

  it('puts an unknown category at the end instead of dropping the course', () => {
    const out = groupByCategory([item('1', 'Mystery'), item('2', 'A')], order);
    expect(out.map((g) => g.category)).toEqual(['A', 'Mystery']);
  });
});

describe('course categories in the config', () => {
  it('every course has a known category', () => {
    for (const c of courseConfig)
      expect(courseCategories, c.slug).toContain(c.category);
  });

  it('every category has at least one course', () => {
    for (const cat of courseCategories)
      expect(
        courseConfig.some((c) => c.category === cat),
        cat,
      ).toBe(true);
  });

  it('order numbers follow the category order, so every list shows the same sequence', () => {
    const sorted = [...courseConfig].sort((a, b) => a.order - b.order);
    const ranks = sorted.map((c) => courseCategories.indexOf(c.category));
    expect(ranks).toEqual([...ranks].sort((a, b) => a - b));
  });

  it('the parsed courses carry their category', () => {
    for (const c of loadCourses()) expect(c.category.length).toBeGreaterThan(0);
  });
});
