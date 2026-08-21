import { and, eq, isNotNull, lt } from 'drizzle-orm';
import { getDb } from '../../db';
import { orders, generationJobs } from '../../db/schema';
import { getLatestGenerationJobForOrder } from './jobs';

/**
 * Birth data and computed chart facts are the sensitive part of an order;
 * the finished PDF is a low-risk deliverable kept indefinitely (Blob
 * storage cost is trivial) so a late "can you resend it?" request stays
 * answerable after this window closes. 150 days clears common ~120-day
 * card dispute windows with margin — for the automated products, delivery
 * happens within minutes of purchase, so a shorter window would risk
 * scrubbing the facts needed to contest a dispute before it even lands.
 */
export const RETENTION_DAYS = 150;

/**
 * Order ids with a `ready` job older than `cutoff` whose birth data hasn't
 * been scrubbed yet. `orders.birthData IS NOT NULL` doubles as the
 * idempotency signal for a cron re-run — see `scrubOrderPii` for why.
 * `limit` bounds a single invocation regardless of backlog size; a large
 * backlog just catches up over a few daily runs instead of risking a
 * timeout in one.
 */
export async function findOrderIdsEligibleForCleanup(cutoff: Date, limit = 200): Promise<number[]> {
  const db = getDb();
  const rows = await db
    .selectDistinct({ id: orders.id })
    .from(orders)
    .innerJoin(generationJobs, eq(generationJobs.orderId, orders.id))
    .where(and(isNotNull(orders.birthData), eq(generationJobs.status, 'ready'), lt(generationJobs.updatedAt, cutoff)))
    .limit(limit);
  return rows.map((r) => r.id);
}

/**
 * Nulls out the sensitive fields for one order. Resolves the canonical job
 * via `getLatestGenerationJobForOrder` (jobs.ts) rather than trusting the
 * eligibility query's join directly — `orderId` has no unique constraint
 * on generation_jobs, so this is the one place allowed to pick "the" job
 * for an order.
 *
 * Write order matters for crash-safety: `generationJobs.factsPayload` is
 * nulled FIRST, `orders.birthData` LAST. If a run dies between the two
 * writes, this ordering guarantees the row is still flagged eligible next
 * time (birthData survived), and re-nulling an already-null factsPayload
 * is a harmless no-op. Deliberately does NOT touch `generationJobs.
 * updatedAt` — that's part of the eligibility filter above, so bumping it
 * here would make an interrupted row silently drop out of eligibility
 * before birthData is scrubbed. `pdfBlobUrl` is untouched — the PDF is
 * intentionally kept indefinitely, not on this retention clock.
 */
export async function scrubOrderPii(orderId: number): Promise<void> {
  const db = getDb();
  const job = await getLatestGenerationJobForOrder(orderId);
  if (job) {
    await db.update(generationJobs).set({ factsPayload: null }).where(eq(generationJobs.id, job.id));
  }
  await db.update(orders).set({ birthData: null }).where(eq(orders.id, orderId));
}
