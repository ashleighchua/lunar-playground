import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { start } from 'workflow/api';
import { generateRelocationReport } from '@/lib/reportGeneration/orchestrate';

/**
 * Manual recovery trigger for a `generation_jobs` row stuck at
 * 'held-for-review' — re-runs the same durable workflow the Stripe webhook
 * and admin order tool already use, from scratch, against the existing job
 * id. `loadOrderAndJob` re-reads the order/job fresh from the DB, so this is
 * safe to call on a job in any status; a second run just overwrites the
 * stale `held_reason`/status once it completes.
 *
 * Reuses the CRON_SECRET bearer-token convention from
 * `api/cron/cleanup-expired-orders` rather than the browser session-cookie
 * admin auth — this is a server-to-server recovery action, not a form a
 * human fills out in the browser.
 */
function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get('authorization') ?? '';
  const expected = `Bearer ${secret}`;
  const headerBuf = Buffer.from(header);
  const expectedBuf = Buffer.from(expected);
  if (headerBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(headerBuf, expectedBuf);
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
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

export async function GET() {
  const secret = process.env.CRON_SECRET;
  return NextResponse.json({ hasSecret: !!secret, length: secret?.length ?? 0 });
}
