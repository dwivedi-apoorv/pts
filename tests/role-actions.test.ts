import { beforeEach, describe, expect, it, vi } from 'vitest';

const ADMIN = '00000000-0000-4000-8000-000000000001';
const ROLE = '00000000-0000-4000-8000-0000000000aa';

type Log = {
  table: string;
  op: string;
  payload?: unknown;
  filters: [string, unknown][];
};
let log: Log[];
let roleRow: { id: string; name: string } | null;
let insertError: { code?: string; message?: string } | null;
let audits: unknown[];

function db() {
  return {
    from(table: string) {
      const entry: Log = { table, op: '', filters: [] };
      const b: Record<string, unknown> = {
        select: () => b,
        eq: (c: string, v: unknown) => (entry.filters.push([c, v]), b),
        maybeSingle: async () => ({
          data: table === 'roles' ? roleRow : null,
          error: null,
        }),
        single: async () => (
          log.push({ ...entry, op: 'insert-single' }),
          insertError
            ? { data: null, error: insertError }
            : { data: { id: ROLE }, error: null }
        ),
        insert: (payload: unknown) => {
          entry.op = 'insert';
          entry.payload = payload;
          log.push(entry);
          return table === 'roles' ? b : Promise.resolve({ error: null });
        },
        update: (payload: unknown) => (
          (entry.op = 'update'),
          (entry.payload = payload),
          log.push(entry),
          b
        ),
        upsert: (payload: unknown) => (
          (entry.op = 'upsert'),
          (entry.payload = payload),
          log.push(entry),
          Promise.resolve({ error: null })
        ),
        delete: () => ((entry.op = 'delete'), log.push(entry), b),
        then: (res: (v: unknown) => unknown) => res({ error: null, count: 2 }),
      };
      return b;
    },
  };
}

beforeEach(() => {
  log = [];
  audits = [];
  roleRow = { id: ROLE, name: 'Developer' };
  insertError = null;
  vi.resetModules();
  vi.doMock('next/cache', () => ({ revalidatePath: vi.fn() }));
  vi.doMock('../src/lib/auth', () => ({
    requireAdmin: async () => ({ member: { id: ADMIN, email: 'a@x.com' } }),
  }));
  vi.doMock('../src/lib/supabase/admin', () => ({
    createAdminClient: () => db(),
  }));
  vi.doMock('../src/lib/admin/audit', () => ({
    logAudit: (...a: unknown[]) => audits.push(a),
  }));
});

const actions = () => import('../src/lib/admin/role-actions');

describe('role actions', () => {
  it('creates a role with its courses and audits it', async () => {
    const a = await actions();
    const res = await a.createRole({
      name: '  Developer ',
      description: '',
      courses: ['seo-basics', 'seo-basics', 'cyber-security-basics'],
    });
    expect(res.ok).toBe(true);
    const links = log.find(
      (l) => l.table === 'role_courses' && l.op === 'insert',
    )!;
    expect(links.payload).toEqual([
      { role_id: ROLE, course_slug: 'seo-basics' },
      { role_id: ROLE, course_slug: 'cyber-security-basics' },
    ]);
    expect(
      log.find((l) => l.table === 'roles' && l.op === 'insert')!.payload,
    ).toMatchObject({ name: 'Developer', description: null });
    expect(audits).toHaveLength(1);
  });

  it('rejects unknown courses, empty names and bad ids without writing', async () => {
    const a = await actions();
    expect(
      (await a.createRole({ name: 'X', courses: ['not-a-course'] })).ok,
    ).toBe(false);
    expect((await a.createRole({ name: '   ', courses: [] })).ok).toBe(false);
    expect(
      (await a.updateRole({ id: 'nope', name: 'X', courses: [] })).ok,
    ).toBe(false);
    expect((await a.deleteRole('nope')).ok).toBe(false);
    expect((await a.setCourseForEveryone('not-a-course', true)).ok).toBe(false);
    expect(log).toHaveLength(0);
  });

  it('reports a duplicate role name clearly', async () => {
    insertError = { code: '23505', message: 'duplicate' };
    const a = await actions();
    const res = await a.createRole({ name: 'Developer', courses: [] });
    expect(res.ok ? '' : res.message).toMatch(/already exists/);
  });

  it('tells the admin to run the migration when the tables are missing', async () => {
    insertError = {
      code: 'PGRST205',
      message: 'Could not find the table public.roles in the schema cache',
    };
    const a = await actions();
    const res = await a.createRole({ name: 'Developer', courses: [] });
    expect(res.ok ? '' : res.message).toMatch(/0002_roles\.sql/);
  });

  it('replaces the role courses on update', async () => {
    const a = await actions();
    expect(
      (await a.updateRole({ id: ROLE, name: 'Dev', courses: ['seo-basics'] }))
        .ok,
    ).toBe(true);
    const ops = log.map((l) => `${l.table}:${l.op}`);
    expect(ops).toEqual([
      'roles:update',
      'role_courses:delete',
      'role_courses:insert',
    ]);
  });

  it('deletes a role and says how many members lose it', async () => {
    const a = await actions();
    const res = await a.deleteRole(ROLE);
    expect(res.ok && res.message).toMatch(/2 members now have no role/);
    expect(log.some((l) => l.table === 'roles' && l.op === 'delete')).toBe(
      true,
    );
  });

  it('marks a course for everyone', async () => {
    const a = await actions();
    expect((await a.setCourseForEveryone('posh-awareness', true)).ok).toBe(
      true,
    );
    expect(log[0]).toMatchObject({
      table: 'course_settings',
      op: 'upsert',
      payload: { course_slug: 'posh-awareness', for_everyone: true },
    });
  });
});
