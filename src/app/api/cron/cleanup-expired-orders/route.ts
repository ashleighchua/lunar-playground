import { timingSafeEqual } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { findOrderIdsEligibleForCleanup, scrubOrderPii, RETENTION_DAYS } from '@/lib/reportGeneration/retention';

/**
 * Vercel Cron sends `Authorization: Bearer ${CRON_SECRET}` on scheduled
 * invocations of a route declared in vercel.json's `crons`. Fails closed if
 * the env var is unset (an unconfigured secret must never mean "open"), and
 * uses a constant-time compare matching this repo's existing convention
 * for shared-secret checks (adminAuth.ts's `verifyPassword`) rather than a
 * plain `!==`.
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

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - RETENTION_DAYS * 24 * 60 * 60 * 1000);
  const orderIds = await findOrderIdsEligibleForCleanup(cutoff);

  let scrubbed = 0;
  const failures: { orderId: number; error: string }[] = [];
  for (const orderId of orderIds) {
    try {
      await scrubOrderPii(orderId);
      scrubbed++;
    } catch (err) {
      failures.push({ orderId, error: err instanceof Error ? err.message : String(err) });
    }
  }

  return NextResponse.json({ eligible: orderIds.length, scrubbed, failures });
}
