'use client';

import { UploadIcon } from 'lucide-react';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import {
  confirmImport,
  previewImport,
  type ImportPreview,
} from '@/lib/admin/actions';

const SAMPLE =
  'email,full_name,role\nanna@example.com,Anna Smith,learner\nraj@example.com,Raj Patel,admin';

export function ImportMembersButton() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [preview, setPreview] = useState<ImportPreview | null>(null);
  const [pending, start] = useTransition();

  const reset = () => {
    setText('');
    setPreview(null);
  };

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <UploadIcon aria-hidden /> Import CSV
      </Button>
      <Dialog
        open={open}
        onOpenChange={(o) => {
          setOpen(o);
          if (!o) reset();
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import members</DialogTitle>
            <DialogDescription>
              Paste CSV or choose a file. Columns:{' '}
              <code>email,full_name,role</code> (role is learner or admin, and
              defaults to learner).
            </DialogDescription>
          </DialogHeader>

          <label htmlFor="csv-file" className="sr-only">
            CSV file
          </label>
          <input
            id="csv-file"
            type="file"
            accept=".csv,text/csv"
            className="text-sm"
            onChange={async (e) => {
              const f = e.target.files?.[0];
              if (f) {
                setText(await f.text());
                setPreview(null);
              }
            }}
          />
          <label htmlFor="csv-text" className="sr-only">
            CSV text
          </label>
          <Textarea
            id="csv-text"
            value={text}
            rows={6}
            placeholder={SAMPLE}
            className="font-mono text-xs"
            onChange={(e) => {
              setText(e.target.value);
              setPreview(null);
            }}
          />

          {preview && !preview.ok && (
            <p role="alert" className="text-destructive text-sm">
              {preview.message}
            </p>
          )}
          {preview?.ok && (
            <div>
              <p className="mb-2 text-sm" aria-live="polite">
                <strong>{preview.valid}</strong> of {preview.rows.length} rows
                are ready to import
                {preview.valid < preview.rows.length
                  ? '. Rows with errors will be skipped.'
                  : '.'}
              </p>
              <div className="max-h-64 overflow-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead className="bg-muted sticky top-0 text-left">
                    <tr>
                      <th className="px-2 py-1.5">Line</th>
                      <th className="px-2 py-1.5">Email</th>
                      <th className="px-2 py-1.5">Name</th>
                      <th className="px-2 py-1.5">Role</th>
                      <th className="px-2 py-1.5">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.rows.map((r) => (
                      <tr key={r.line} className="border-t align-top">
                        <td className="px-2 py-1.5 tabular-nums">{r.line}</td>
                        <td className="px-2 py-1.5">{r.email || '—'}</td>
                        <td className="px-2 py-1.5">{r.full_name || '—'}</td>
                        <td className="px-2 py-1.5">{r.role}</td>
                        <td className="px-2 py-1.5">
                          {r.errors.length ? (
                            <span className="text-destructive">
                              {r.errors.join('; ')}
                            </span>
                          ) : (
                            <Badge variant="secondary">OK</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            {!preview?.ok ? (
              <Button
                disabled={pending || !text.trim()}
                onClick={() =>
                  start(async () =>
                    setPreview(
                      await previewImport(text).catch(() => ({
                        ok: false as const,
                        message: 'Could not read that file.',
                      })),
                    ),
                  )
                }
              >
                {pending ? 'Checking…' : 'Preview'}
              </Button>
            ) : (
              <Button
                disabled={pending || preview.valid === 0}
                onClick={() =>
                  start(async () => {
                    const res = await confirmImport(text).catch(() => null);
                    if (res?.ok) {
                      toast.success(res.message ?? 'Imported.');
                      setOpen(false);
                      reset();
                    } else
                      toast.error(
                        res?.message ?? 'Import failed. Please try again.',
                      );
                  })
                }
              >
                {pending
                  ? 'Importing…'
                  : `Import ${preview.valid} member${preview.valid === 1 ? '' : 's'}`}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
