import fs from 'node:fs';
import path from 'node:path';
import { courseConfig } from '../../../content/courses.config';
import { ContentError, parseCourse } from './parse';
import type { Course } from './types';

export function loadCourses(root: string = process.cwd()): Course[] {
  const dir = path.join(root, 'content', 'courses');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
  const configured = new Set(courseConfig.map((c) => c.file));
  for (const f of files) {
    if (!configured.has(f)) {
      throw new ContentError(
        `content/courses/${f}`,
        null,
        'this file is not listed in content/courses.config.ts',
      );
    }
  }
  const slugs = new Set<string>();
  const courses = courseConfig.map((cfg) => {
    if (slugs.has(cfg.slug)) {
      throw new ContentError(
        'content/courses.config.ts',
        null,
        `duplicate course slug "${cfg.slug}"`,
      );
    }
    slugs.add(cfg.slug);
    const file = `content/courses/${cfg.file}`;
    if (!files.includes(cfg.file)) {
      throw new ContentError(
        file,
        null,
        'listed in content/courses.config.ts but the file does not exist',
      );
    }
    return parseCourse(
      file,
      fs.readFileSync(path.join(dir, cfg.file), 'utf8'),
      cfg,
    );
  });
  return courses.sort((a, b) => a.order - b.order);
}
