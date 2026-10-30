import { snippetParts } from '@/lib/search-client';

export function Snippet({ text, terms }: { text: string; terms: string[] }) {
  return (
    <span>
      {snippetParts(text, terms).map((p, i) =>
        p.match ? (
          <mark
            key={i}
            className="text-foreground rounded-sm bg-yellow-200 px-0.5 dark:bg-yellow-500/30"
          >
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </span>
  );
}
