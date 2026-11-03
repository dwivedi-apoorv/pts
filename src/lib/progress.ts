import 'server-only';
import { cache } from 'react';
import { createClient } from './supabase/server';

export type UserProgress = {
  completed: Record<string, string[]>; // course slug -> chapter slugs
  positions: { course: string; chapter: string; updatedAt: string }[];
};

/** Reads the signed-in member's progress. RLS limits rows to the current user. */
export const getUserProgress = cache(
  async (userId: string): Promise<UserProgress> => {
    const supabase = await createClient();
    const [done, pos] = await Promise.all([
      supabase
        .from('chapter_progress')
        .select('course_slug,chapter_slug')
        .eq('user_id', userId),
      supabase
        .from('course_position')
        .select('course_slug,chapter_slug,updated_at')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false }),
    ]);
    if (done.error) throw done.error;
    if (pos.error) throw pos.error;

    const completed: Record<string, string[]> = {};
    for (const r of done.data)
      (completed[r.course_slug] ??= []).push(r.chapter_slug);
    return {
      completed,
      positions: pos.data.map((r) => ({
        course: r.course_slug,
        chapter: r.chapter_slug,
        updatedAt: r.updated_at,
      })),
    };
  },
);

/** Saved checklist ticks for one course: item key -> checked. */
export const getChecklistState = cache(
  async (
    userId: string,
    courseSlug: string,
  ): Promise<Record<string, boolean>> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('checklist_items')
      .select('item_key,checked')
      .eq('user_id', userId)
      .eq('course_slug', courseSlug);
    if (error) throw error;
    return Object.fromEntries(data.map((r) => [r.item_key, r.checked]));
  },
);
