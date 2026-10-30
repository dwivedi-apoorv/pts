import fs from 'node:fs';
import path from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Db = SupabaseClient<any, 'public', any>;
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const sql = fs.readFileSync(
  path.join('supabase/migrations/0001_init.sql'),
  'utf8',
);

describe('migration: row level security (static check)', () => {
  const tables = [...sql.matchAll(/create table public\.(\w+)/g)].map(
    (m) => m[1],
  );

  it('has the expected tables', () => {
    expect(tables.sort()).toEqual(
      [
        'admin_audit',
        'chapter_progress',
        'checklist_items',
        'course_position',
        'members',
        'otp_requests',
        'self_check_results',
      ].sort(),
    );
  });

  it.each(tables)('%s has RLS enabled', (t) => {
    expect(sql).toMatch(
      new RegExp(`alter table public\\.${t}\\s+enable row level security`),
    );
  });

  it.each([
    'chapter_progress',
    'course_position',
    'self_check_results',
    'checklist_items',
  ])('%s only allows a user their own rows', (t) => {
    const policy = new RegExp(
      `create policy "[^"]+" on public\\.${t}\\s+for all using \\(user_id = auth\\.uid\\(\\)\\) with check \\(user_id = auth\\.uid\\(\\)\\)`,
    );
    expect(sql).toMatch(policy);
  });

  it('gives clients no policy on otp_requests or admin_audit', () => {
    expect(sql).not.toMatch(/create policy[^;]+on public\.otp_requests/);
    expect(sql).not.toMatch(/create policy[^;]+on public\.admin_audit/);
  });

  it('lets members read only their own member row', () => {
    expect(sql).toMatch(
      /on public\.members\s+for select using \(auth_user_id = auth\.uid\(\)\)/,
    );
    expect(sql).not.toMatch(
      /on public\.members\s+for (all|update|insert|delete)/,
    );
  });
});

// Runs against a real (local or throwaway) Supabase project. Set:
//   SUPABASE_TEST_URL, SUPABASE_TEST_ANON_KEY, SUPABASE_TEST_SERVICE_KEY
// It creates two temporary users and deletes them afterwards.
const url = process.env.SUPABASE_TEST_URL;
const anon = process.env.SUPABASE_TEST_ANON_KEY;
const service = process.env.SUPABASE_TEST_SERVICE_KEY;

describe.skipIf(!url || !anon || !service)(
  'RLS against a live Supabase',
  () => {
    let admin: Db;
    const stamp = Date.now();
    const pw = 'Test-pass-12345';
    const users: Record<'a' | 'b', { id: string; email: string; client: Db }> =
      {} as never;

    beforeAll(async () => {
      admin = createClient(url!, service!, { auth: { persistSession: false } });
      for (const k of ['a', 'b'] as const) {
        const email = `rls-${k}-${stamp}@example.com`;
        const { data, error } = await admin.auth.admin.createUser({
          email,
          password: pw,
          email_confirm: true,
        });
        if (error) throw error;
        const client = createClient(url!, anon!, {
          auth: { persistSession: false },
        });
        const signIn = await client.auth.signInWithPassword({
          email,
          password: pw,
        });
        if (signIn.error) throw signIn.error;
        users[k] = { id: data.user.id, email, client };
      }
    });

    afterAll(async () => {
      for (const k of ['a', 'b'] as const)
        if (users[k]) await admin.auth.admin.deleteUser(users[k].id);
    });

    it("user B cannot read, change or delete user A's progress", async () => {
      const a = users.a;
      const b = users.b;
      const row = {
        user_id: a.id,
        course_slug: 'rls-test',
        chapter_slug: 'one',
      };
      expect(
        (await a.client.from('chapter_progress').insert(row)).error,
      ).toBeNull();

      const read = await b.client
        .from('chapter_progress')
        .select('*')
        .eq('course_slug', 'rls-test');
      expect(read.data).toEqual([]);

      await b.client
        .from('chapter_progress')
        .update({ chapter_slug: 'hacked' })
        .eq('user_id', a.id);
      await b.client.from('chapter_progress').delete().eq('user_id', a.id);
      const still = await a.client
        .from('chapter_progress')
        .select('*')
        .eq('course_slug', 'rls-test');
      expect(still.data).toHaveLength(1);
      expect(still.data![0].chapter_slug).toBe('one');
    });

    it('user B cannot insert rows as user A', async () => {
      const res = await users.b.client.from('self_check_results').insert({
        user_id: users.a.id,
        course_slug: 'rls-test',
        question_key: '1-abc',
        result: 'got_it',
      });
      expect(res.error).not.toBeNull();
    });

    it('clients cannot touch otp_requests, admin_audit or other members', async () => {
      const otp = await users.a.client.from('otp_requests').select('*');
      expect(otp.data ?? []).toEqual([]);
      const audit = await users.a.client.from('admin_audit').select('*');
      expect(audit.data ?? []).toEqual([]);
      const ins = await users.a.client
        .from('members')
        .insert({ email: `x-${stamp}@example.com` });
      expect(ins.error).not.toBeNull();
    });
  },
);
