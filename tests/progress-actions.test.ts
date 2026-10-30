import { beforeEach, describe, expect, it, vi } from 'vitest';

type Call = {
  table: string;
  op: string;
  payload?: unknown;
  opts?: unknown;
  filters?: [string, unknown][];
};
let calls: Call[];
let dbError: unknown;
let allowedSlugs: string[];

function builder(table: string) {
  const call: Call = { table, op: '', filters: [] };
  const done = () => {
    calls.push(call);
    return Promise.resolve({ error: dbError });
  };
  const b: Record<string, unknown> = {
    upsert(payload: unknown, opts: unknown) {
      Object.assign(call, { op: 'upsert', payload, opts });
      return done();
    },
    delete() {
      call.op = 'delete';
      return b;
    },
    eq(col: string, val: unknown) {
      call.filters!.push([col, val]);
      return b;
    },
    then(res: (v: unknown) => unknown) {
      return done().then(res);
    },
  };
  return b;
}

beforeEach(() => {
  calls = [];
  dbError = null;
  allowedSlugs = [
    'project-management-onboarding',
    'seo-basics',
    'cyber-security-basics',
    'posh-awareness',
  ];
  vi.resetModules();
  vi.doMock('next/cache', () => ({ revalidatePath: vi.fn() }));
  vi.doMock('@/lib/access', () => ({
    getAllowedSlugs: async () => new Set(allowedSlugs),
  }));
  vi.doMock('@/lib/auth', () => ({
    requireMember: async () => ({ user: { id: 'session-user' }, member: {} }),
  }));
  vi.doMock('@/lib/supabase/server', () => ({
    createClient: async () => ({ from: (t: string) => builder(t) }),
  }));
});

async function actions() {
  return import('../src/lib/progress-actions');
}
async function realKeys() {
  const { loadCourses } = await import('../src/lib/content/load');
  const course = loadCourses()[0];
  const item = course.chapters.flatMap((c) => c.checklistItems ?? [])[0];
  return {
    course,
    chapter: course.chapters[0],
    item,
    question: course.knowledgeCheck[0],
  };
}

describe('progress actions', () => {
  it('marks a chapter complete idempotently, using the session user id', async () => {
    const { setChapterComplete } = await actions();
    const { course, chapter } = await realKeys();
    expect(await setChapterComplete(course.slug, chapter.slug, true)).toEqual({
      ok: true,
    });
    expect(calls[0]).toMatchObject({
      table: 'chapter_progress',
      op: 'upsert',
      payload: {
        user_id: 'session-user',
        course_slug: course.slug,
        chapter_slug: chapter.slug,
      },
      opts: { ignoreDuplicates: true },
    });
    // a second call is the same write, so it cannot create a duplicate row
    await setChapterComplete(course.slug, chapter.slug, true);
    expect(calls[1]).toEqual(calls[0]);
  });

  it("un-completes by deleting only the caller's row", async () => {
    const { setChapterComplete } = await actions();
    const { course, chapter } = await realKeys();
    await setChapterComplete(course.slug, chapter.slug, false);
    expect(calls[0].op).toBe('delete');
    expect(calls[0].filters).toContainEqual(['user_id', 'session-user']);
  });

  it('rejects unknown courses, chapters, items and questions without writing', async () => {
    const a = await actions();
    const { course, chapter } = await realKeys();
    expect((await a.setChapterComplete('nope', chapter.slug, true)).ok).toBe(
      false,
    );
    expect((await a.setChapterComplete(course.slug, 'nope', true)).ok).toBe(
      false,
    );
    expect((await a.recordPosition(course.slug, 'nope')).ok).toBe(false);
    expect((await a.setChecklistItem(course.slug, 'deadbeef', true)).ok).toBe(
      false,
    );
    expect(
      (await a.setSelfCheckResult(course.slug, '1-deadbeef', 'got_it')).ok,
    ).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it('refuses to save progress for a course that is not assigned to the member', async () => {
    allowedSlugs = ['seo-basics'];
    const a = await actions();
    const { course, chapter, item, question } = await realKeys(); // the first course, onboarding
    expect(course.slug).toBe('project-management-onboarding');
    expect(
      (await a.setChapterComplete(course.slug, chapter.slug, true)).ok,
    ).toBe(false);
    expect((await a.recordPosition(course.slug, chapter.slug)).ok).toBe(false);
    expect((await a.setChecklistItem(course.slug, item.key, true)).ok).toBe(
      false,
    );
    expect(
      (await a.setSelfCheckResult(course.slug, question.key, 'got_it')).ok,
    ).toBe(false);
    expect(calls).toHaveLength(0);
  });

  it('rejects malformed input', async () => {
    const a = await actions();
    const { course, chapter } = await realKeys();
    expect(
      (await a.setSelfCheckResult(course.slug, 'x', 'maybe' as never)).ok,
    ).toBe(false);
    expect(
      (await a.setChapterComplete(course.slug, chapter.slug, 'yes' as never))
        .ok,
    ).toBe(false);
    expect((await a.setChapterComplete('', '', true)).ok).toBe(false);
  });

  it('saves a checklist tick and a self-check result', async () => {
    const a = await actions();
    const { course, item, question } = await realKeys();
    expect(await a.setChecklistItem(course.slug, item.key, true)).toEqual({
      ok: true,
    });
    expect(
      await a.setSelfCheckResult(course.slug, question.key, 'review'),
    ).toEqual({ ok: true });
    expect(calls[0]).toMatchObject({
      table: 'checklist_items',
      payload: { user_id: 'session-user', checked: true },
    });
    expect(calls[1]).toMatchObject({
      table: 'self_check_results',
      payload: { result: 'review' },
    });
  });

  it('reports a failed save instead of throwing', async () => {
    dbError = { message: 'boom' };
    const { setChapterComplete } = await actions();
    const { course, chapter } = await realKeys();
    const res = await setChapterComplete(course.slug, chapter.slug, true);
    expect(res.ok).toBe(false);
  });
});
