import { eq } from 'drizzle-orm';
import { getDb } from '../../db';
import { orders, generationJobs, type GenerationJobStatus } from '../../db/schema';
import type { FactsPayload } from '../reportFacts/types';

export interface CreateOrderInput {
  stripeSessionId: string;
  productType: string;
  customerEmail: string;
  /** No default at the DB level on purpose — every caller must decide explicitly. */
  subscribeToMailingList: boolean;
}

/**
 * Idempotent insert keyed on `stripeSessionId`. Returns the new order's id,
 * or `null` if this session id was already recorded — the caller (the
 * Stripe webhook) must treat `null` as "already handled, do not enqueue
 * generation again," since Stripe retries webhook delivery.
 */
export async function createOrderIfNew(input: CreateOrderInput): Promise<number | null> {
  const db = getDb();
  const [row] = await db
    .insert(orders)
    .values(input)
    .onConflictDoNothing({ target: orders.stripeSessionId })
    .returning({ id: orders.id });
  return row?.id ?? null;
}

export async function createGenerationJob(orderId: number): Promise<number> {
  const db = getDb();
  const [row] = await db
    .insert(generationJobs)
    .values({ orderId, status: 'pending' })
    .returning({ id: generationJobs.id });
  return row.id;
}

export interface JobStatusExtra {
  houseSystem?: string;
  factsPayload?: FactsPayload[];
  pdfBlobUrl?: string;
  heldReason?: string;
}

export async function setJobStatus(jobId: number, status: GenerationJobStatus, extra: JobStatusExtra = {}): Promise<void> {
  const db = getDb();
  await db
    .update(generationJobs)
    .set({ status, updatedAt: new Date(), ...extra })
    .where(eq(generationJobs.id, jobId));
}
