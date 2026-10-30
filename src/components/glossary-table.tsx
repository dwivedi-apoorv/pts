'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { InlineMd } from './inline-md';

export function GlossaryTable({
  entries,
}: {
  entries: { term: string; meaning: string }[];
}) {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const rows = needle
    ? entries.filter((e) =>
        `${e.term} ${e.meaning}`.toLowerCase().includes(needle),
      )
    : entries;
  return (
    <div>
      <label htmlFor="glossary-filter" className="sr-only">
        Filter glossary terms
      </label>
      <Input
        id="glossary-filter"
        type="search"
        placeholder="Filter terms…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="mb-3 max-w-sm"
        data-print-hide
      />
      <div
        className="overflow-x-auto rounded-md border"
        role="region"
        aria-label="Glossary table"
        tabIndex={0}
      >
        <table className="w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th scope="col" className="w-1/3 px-3 py-2 font-semibold">
                Term
              </th>
              <th scope="col" className="px-3 py-2 font-semibold">
                Meaning
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((e) => (
              <tr key={e.term} className="even:bg-muted/40 border-t">
                <th
                  scope="row"
                  className="px-3 py-2 text-left align-top font-medium"
                >
                  <InlineMd text={e.term} />
                </th>
                <td className="px-3 py-2 align-top">
                  <InlineMd text={e.meaning} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="text-muted-foreground px-3 py-6 text-center"
                >
                  No terms match “{q}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
