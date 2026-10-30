import fs from 'node:fs';
import path from 'node:path';
import { buildGlossary, buildSearchRecords } from '../src/lib/content/build';
import { loadCourses } from '../src/lib/content/load';
import { ContentError } from '../src/lib/content/parse';

const root = process.cwd();
const out = path.join(root, 'src', 'generated');

try {
  const courses = loadCourses(root);
  fs.mkdirSync(out, { recursive: true });
  const write = (name: string, data: unknown) =>
    fs.writeFileSync(path.join(out, name), JSON.stringify(data));
  const records = buildSearchRecords(courses);
  const glossary = buildGlossary(courses);
  write('content.json', courses);
  write('search-index.json', records);
  write('glossary.json', glossary);
  const chapters = courses.reduce((n, c) => n + c.chapters.length, 0);
  console.log(
    `content: ${courses.length} courses, ${chapters} chapters, ${records.length} search records, ${glossary.length} glossary terms`,
  );
} catch (err) {
  if (err instanceof ContentError) {
    console.error(`\nContent error: ${err.message}\n`);
    process.exit(1);
  }
  throw err;
}
