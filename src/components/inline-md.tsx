/** Renders the few inline marks used in glossary text: `code` and **bold**. */
export function InlineMd({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('`') ? (
          <code
            key={i}
            className="bg-muted rounded px-1 py-0.5 font-mono text-[0.9em]"
          >
            {p.slice(1, -1)}
          </code>
        ) : p.startsWith('**') ? (
          <strong key={i}>{p.slice(2, -2)}</strong>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
