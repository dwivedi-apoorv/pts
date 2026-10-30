'use client';

import { useEffect, useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export type QaItem = {
  number: number;
  question: string;
  answer: React.ReactNode;
};

export function QaAccordion({ items }: { items: QaItem[] }) {
  const [open, setOpen] = useState<string[]>([]);
  const allOpen = open.length === items.length;

  // Deep links such as #q-7 open that question.
  useEffect(() => {
    const m = /^#q-(\d+)$/.exec(window.location.hash);
    // Runs once after hydration; reading the hash during render would mismatch the server HTML.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (m) setOpen([`q-${m[1]}`]);
  }, []);

  return (
    <div>
      <h2 className="sr-only">Client questions</h2>
      <div className="mb-2 flex items-center justify-between" data-print-hide>
        <p className="text-muted-foreground text-sm">
          {items.length} questions
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            setOpen(allOpen ? [] : items.map((i) => `q-${i.number}`))
          }
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </Button>
      </div>
      <Accordion
        multiple
        value={open}
        onValueChange={setOpen}
        className="rounded-lg border px-4"
      >
        {items.map((item) => (
          <AccordionItem
            key={item.number}
            value={`q-${item.number}`}
            id={`q-${item.number}`}
            className="scroll-mt-20"
          >
            <AccordionTrigger className="py-3 text-base">
              <span>
                <span className="text-muted-foreground mr-2 tabular-nums">
                  {item.number}.
                </span>
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent keepMounted>
              <div className="pb-3 text-base">{item.answer}</div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
