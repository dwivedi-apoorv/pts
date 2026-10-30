import { z } from 'zod';

/** Small RFC 4180 parser: quoted fields, escaped quotes, commas and newlines inside quotes. */
export function parseCsv(text: string): string[][] {
  const src = text.replace(/^﻿/, '');
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let quoted = false;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (quoted) {
      if (c === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"' && field === '') quoted = true;
    else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && src[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      if (row.some((f) => f.trim() !== '')) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((f) => f.trim() !== '')) rows.push(row);
  return rows;
}

/** Quote when needed, and neutralise spreadsheet formulas (= + - @ at the start of a cell). */
export function csvCell(value: unknown): string {
  let s = value == null ? '' : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows: unknown[][]): string {
  return rows.map((r) => r.map(csvCell).join(',')).join('\r\n') + '\r\n';
}

export type ImportRow = {
  line: number;
  email: string;
  full_name: string;
  role: 'learner' | 'admin';
  errors: string[];
};

const emailOk = z.email();
export const MAX_IMPORT_ROWS = 500;

/** Validates pasted or uploaded CSV with columns email,full_name,role. */
export function validateImport(
  text: string,
  existingEmails: Set<string>,
): { rows: ImportRow[]; fatal?: string } {
  const table = parseCsv(text);
  if (table.length === 0) return { rows: [], fatal: 'The file is empty.' };
  const header = table[0].map((h) =>
    h.trim().toLowerCase().replace(/\s+/g, '_'),
  );
  const col = (...names: string[]) =>
    header.findIndex((h) => names.includes(h));
  const iEmail = col('email', 'work_email');
  if (iEmail < 0)
    return {
      rows: [],
      fatal:
        'The first row must be a header with an "email" column (email,full_name,role).',
    };
  const iName = col('full_name', 'name', 'fullname');
  const iRole = col('role');
  const body = table.slice(1);
  if (body.length === 0)
    return { rows: [], fatal: 'There are no member rows under the header.' };
  if (body.length > MAX_IMPORT_ROWS)
    return {
      rows: [],
      fatal: `Import up to ${MAX_IMPORT_ROWS} members at a time.`,
    };

  const seen = new Map<string, number>();
  const rows = body.map((cells, i): ImportRow => {
    const line = i + 2;
    const errors: string[] = [];
    const email = (cells[iEmail] ?? '').trim().toLowerCase();
    const full_name = (iName >= 0 ? (cells[iName] ?? '') : '').trim();
    const roleRaw = (iRole >= 0 ? (cells[iRole] ?? '') : '')
      .trim()
      .toLowerCase();
    if (!email) errors.push('Email is missing');
    else if (!emailOk.safeParse(email).success) errors.push('Invalid email');
    else if (existingEmails.has(email)) errors.push('Already a member');
    else if (seen.has(email))
      errors.push(`Duplicate of line ${seen.get(email)}`);
    if (email && !seen.has(email)) seen.set(email, line);
    if (full_name.length > 120) errors.push('Name is too long');
    if (roleRaw && roleRaw !== 'learner' && roleRaw !== 'admin')
      errors.push('Role must be learner or admin');
    return {
      line,
      email,
      full_name,
      role: roleRaw === 'admin' ? 'admin' : 'learner',
      errors,
    };
  });
  return { rows };
}
