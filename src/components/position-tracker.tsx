'use client';

import { useEffect } from 'react';
import { recordPosition } from '@/lib/progress-actions';

/** Saves "last visited chapter" when a lesson opens. */
export function PositionTracker({
  courseSlug,
  chapterSlug,
}: {
  courseSlug: string;
  chapterSlug: string;
}) {
  useEffect(() => {
    void recordPosition(courseSlug, chapterSlug).catch(() => {});
  }, [courseSlug, chapterSlug]);
  return null;
}
