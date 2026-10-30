/** Accepts only same-site relative paths; anything else becomes "/". */
export function safeNext(next: unknown): string {
  if (typeof next !== 'string') return '/';
  if (!next.startsWith('/') || next.startsWith('//')) return '/';
  if (next.includes('\\') || /[\u0000-\u001f\u007f]/.test(next)) return '/';
  return next;
}
