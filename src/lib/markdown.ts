import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

// Raw HTML in markdown is dropped (no allowDangerousHtml) and the output is
// sanitised. rehype-slug runs after sanitising so heading ids are not prefixed.
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSanitize)
  .use(rehypeSlug)
  .use(rehypeStringify);

export function renderMarkdown(markdown: string): string {
  return String(processor.processSync(markdown));
}
