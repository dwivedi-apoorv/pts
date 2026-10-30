'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireMember } from '@/lib/auth';
import { getChapter, getCourse } from '@/lib/content';
import { createClient } from '@/lib/supabase/server';

export type ActionResult = { ok: true } | { ok: false; message: string };

const FAIL = {
  ok: false,
  message: 'Could not save. Please try again.',
} as const;
const slug = z.string().min(1).max(200);

/**
 * Every action: requireMember() first, zod-validate the input, check it against
 * the real content, then write with the user-scoped client so RLS applies.
 * The user id always comes from the session, never from the client.
 */
async function context() {
  const { user } = await requireMember();
  return { userId: user.id, supabase: await createClient() };
}

function fail(message: string): ActionResult {
  return { ok: false, message };
}

export async function setChapterComplete(
  courseSlug: string,
  chapterSlug: string,
  completed: boolean,
): Promise<ActionResult> {
  const input = z
    .object({ courseSlug: slug, chapterSlug: slug, completed: z.boolean() })
    .safeParse({ courseSlug, chapterSlug, completed });
  if (!input.success) return fail('Invalid request.');
  const course = getCourse(input.data.courseSlug);
  if (!course || !getChapter(course, input.data.chapterSlug))
    return fail('That chapter does not exist.');

  const { userId, supabase } = await context();
  const base = {
    user_id: userId,
    course_slug: course.slug,
    chapter_slug: input.data.chapterSlug,
  };
  const { error } = input.data.completed
    ? // Idempotent: completing twice keeps the first completion date.
      await supabase.from('chapter_progress').upsert(base, {
        onConflict: 'user_id,course_slug,chapter_slug',
        ignoreDuplicates: true,
      })
    : await supabase
        .from('chapter_progress')
        .delete()
        .eq('user_id', userId)
        .eq('course_slug', course.slug)
        .eq('chapter_slug', input.data.chapterSlug);
  if (error) return FAIL;
  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function recordPosition(
  courseSlug: string,
  chapterSlug: string,
): Promise<ActionResult> {
  const input = z
    .object({ courseSlug: slug, chapterSlug: slug })
    .safeParse({ courseSlug, chapterSlug });
  if (!input.success) return fail('Invalid request.');
  const course = getCourse(input.data.courseSlug);
  if (!course || !getChapter(course, input.data.chapterSlug))
    return fail('That chapter does not exist.');

  const { userId, supabase } = await context();
  const { error } = await supabase.from('course_position').upsert(
    {
      user_id: userId,
      course_slug: course.slug,
      chapter_slug: input.data.chapterSlug,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,course_slug' },
  );
  return error ? FAIL : { ok: true };
}

export async function setChecklistItem(
  courseSlug: string,
  itemKey: string,
  checked: boolean,
): Promise<ActionResult> {
  const input = z
    .object({
      courseSlug: slug,
      itemKey: z.string().min(1).max(64),
      checked: z.boolean(),
    })
    .safeParse({ courseSlug, itemKey, checked });
  if (!input.success) return fail('Invalid request.');
  const course = getCourse(input.data.courseSlug);
  const known = course?.chapters.some((c) =>
    c.checklistItems?.some((i) => i.key === input.data.itemKey),
  );
  if (!course || !known) return fail('That checklist item no longer exists.');

  const { userId, supabase } = await context();
  const { error } = await supabase.from('checklist_items').upsert(
    {
      user_id: userId,
      course_slug: course.slug,
      item_key: input.data.itemKey,
      checked: input.data.checked,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,course_slug,item_key' },
  );
  return error ? FAIL : { ok: true };
}

export async function setSelfCheckResult(
  courseSlug: string,
  questionKey: string,
  result: 'got_it' | 'review',
): Promise<ActionResult> {
  const input = z
    .object({
      courseSlug: slug,
      questionKey: z.string().min(1).max(64),
      result: z.enum(['got_it', 'review']),
    })
    .safeParse({ courseSlug, questionKey, result });
  if (!input.success) return fail('Invalid request.');
  const course = getCourse(input.data.courseSlug);
  if (!course?.knowledgeCheck.some((q) => q.key === input.data.questionKey)) {
    return fail('That question no longer exists.');
  }

  const { userId, supabase } = await context();
  const { error } = await supabase.from('self_check_results').upsert(
    {
      user_id: userId,
      course_slug: course.slug,
      question_key: input.data.questionKey,
      result: input.data.result,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'user_id,course_slug,question_key' },
  );
  return error ? FAIL : { ok: true };
}
