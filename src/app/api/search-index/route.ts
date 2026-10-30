import records from '@/generated/search-index.json';
import { requireMember } from '@/lib/auth';

// Course content is internal: this is only served to signed-in, active members.
export async function GET() {
  await requireMember();
  return Response.json(records, {
    headers: { 'Cache-Control': 'private, max-age=300' },
  });
}
