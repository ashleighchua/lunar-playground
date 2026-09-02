import { NextRequest, NextResponse } from 'next/server';
import { start } from 'workflow/api';
import { ADMIN_SESSION_COOKIE, verifySessionCookieValue } from '@/lib/adminAuth';
import { generateRelocationReport } from '@/lib/reportGeneration/orchestrate';

/**
 * Manual recovery trigger for a `generation_jobs` row stuck at
 * 'held-for-review' — re-runs the same durable workflow the Stripe webhook
 * and admin order tool already use, from scratch, against the existing job
 * id. `loadOrderAndJob` re-reads the order/job fresh from the DB, so this is
 * safe to call on a job in any status; a second run just overwrites the
 * stale `held_reason`/status once it completes.
 *
 * Gated behind the same admin session cookie as `/admin/relocation-order`
 * (not a CRON_SECRET bearer token) — this is a human clicking a button in
 * the browser after logging in, not a scheduled server-to-server call.
 */
export async function POST(request: NextRequest) {
  const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE.name)?.value;
  if (!verifySessionCookieValue(sessionCookie)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const jobId = body?.jobId;
  if (typeof jobId !== 'number' || !Number.isInteger(jobId)) {
    return NextResponse.json({ error: 'jobId must be an integer' }, { status: 400 });
  }

  await start(generateRelocationReport, [jobId]);

  return NextResponse.json({ ok: true, jobId });
}
