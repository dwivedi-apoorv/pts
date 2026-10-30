import type { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';
import { ChecklistGroup, ChecklistItem } from './checklist-group';

type HastNode = {
  type: string;
  value?: string;
  tagName?: string;
  children?: HastNode[];
};

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  return (node.children ?? []).map(textOf).join('');
}
const collapse = (s: string) => s.replace(/\s+/g, ' ').trim();

function Heading({
  level,
  id,
  children,
}: {
  level: 2 | 3 | 4;
  id?: string;
  children?: React.ReactNode;
}) {
  const Tag = `h${level}` as 'h2' | 'h3' | 'h4';
  return (
    <Tag id={id} className="group">
      {children}
      {id && (
        <a
          href={`#${id}`}
          aria-label="Link to this section"
          className="text-muted-foreground ml-2 no-underline opacity-0 group-hover:opacity-100 focus:opacity-100"
        >
          #
        </a>
      )}
    </Tag>
  );
}

/**
 * Renders lesson markdown. Raw HTML in the source is never rendered. Checklist
 * items become interactive when `checklist` (the chapter's item keys) is given.
 */
export function LessonMarkdown({
  markdown,
  courseSlug,
  checklist,
  checked,
  className,
}: {
  markdown: string;
  courseSlug?: string;
  checklist?: { key: string; text: string }[];
  checked?: Record<string, boolean>;
  className?: string;
}) {
  // Keys by item text, in document order, so duplicate texts get distinct keys.
  const keys = new Map<string, string[]>();
  for (const item of checklist ?? []) {
    const t = collapse(item.text);
    keys.set(t, [...(keys.get(t) ?? []), item.key]);
  }

  // A list renders before its items, so keys are claimed once per item and
  // remembered by the item's position in the source.
  let tableCount = 0;
  const claimed = new Map<string, string | undefined>();
  const keyFor = (node: HastNode): string | undefined => {
    const pos = (
      node as HastNode & { position?: { start: { offset?: number } } }
    ).position;
    const id = String(pos?.start.offset ?? '');
    if (id && claimed.has(id)) return claimed.get(id);
    const text = collapse(
      textOf({
        ...node,
        children: (node.children ?? []).filter((c) => c.tagName !== 'input'),
      }),
    );
    const key = keys.get(text)?.shift();
    if (id) claimed.set(id, key);
    return key;
  };

  return (
    <div
      className={cn(
        'lesson prose prose-zinc dark:prose-invert prose-headings:tracking-tight prose-a:text-primary max-w-none',
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={{
          h2: ({ id, children }) => (
            <Heading level={2} id={id}>
              {children}
            </Heading>
          ),
          h3: ({ id, children }) => (
            <Heading level={3} id={id}>
              {children}
            </Heading>
          ),
          h4: ({ id, children }) => (
            <Heading level={4} id={id}>
              {children}
            </Heading>
          ),
          table: ({ children }) => (
            <div
              className="not-prose my-6 overflow-x-auto rounded-md border"
              role="region"
              aria-label={`Table ${++tableCount}`}
              tabIndex={0}
            >
              <table className="lesson prose prose-zinc dark:prose-invert w-full max-w-none [&_*]:my-0 [&_th]:text-left">
                {children}
              </table>
            </div>
          ),
          a: ({ href, children }) => {
            const external = href?.startsWith('http');
            return (
              <a
                href={href}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {children}
              </a>
            );
          },
          ul: ({
            node,
            className: cls,
            children,
            ...rest
          }: ComponentProps<'ul'> & { node?: HastNode }) => {
            if (!cls?.includes('contains-task-list') || !node || !courseSlug) {
              return (
                <ul className={cls} {...rest}>
                  {children}
                </ul>
              );
            }
            const groupKeys = (node.children ?? [])
              .filter((c) => c.tagName === 'li')
              .map(keyFor)
              .filter((k): k is string => Boolean(k));
            if (!groupKeys.length) return <ul className={cls}>{children}</ul>;
            return (
              <ChecklistGroup
                courseSlug={courseSlug}
                keys={groupKeys}
                initial={checked ?? {}}
              >
                {children}
              </ChecklistGroup>
            );
          },
          li: ({
            node,
            className: cls,
            children,
            ...rest
          }: ComponentProps<'li'> & { node?: HastNode }) => {
            if (!cls?.includes('task-list-item') || !node) {
              return (
                <li className={cls} {...rest}>
                  {children}
                </li>
              );
            }
            const itemKey = keyFor(node);
            const body = (
              Array.isArray(children) ? children : [children]
            ).filter(
              (c) =>
                !(
                  typeof c === 'object' &&
                  c &&
                  'type' in c &&
                  c.type === 'input'
                ),
            );
            return (
              <li className={cn(cls, 'list-none pl-0')}>
                {itemKey ? (
                  <ChecklistItem itemKey={itemKey}>{body}</ChecklistItem>
                ) : (
                  <span>{body}</span>
                )}
              </li>
            );
          },
          input: () => null,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
