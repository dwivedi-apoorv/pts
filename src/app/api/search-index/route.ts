import records from '@/generated/search-index.json';
import { getAllowedSlugs } from '@/lib/access';
import { filterRecords } from '@/lib/access-calc';
import { requireMember } from '@/lib/auth';
import type { SearchRecord } from '@/lib/content/types';

// Course content is internal: this is only served to signed-in, active members.
export async function GET() {
  await requireMember();
  const allowed = await getAllowedSlugs();
  return Response.json(filterRecords(records as SearchRecord[], allowed), {
    headers: { 'Cache-Control': 'private, max-age=300' },
  });
}
