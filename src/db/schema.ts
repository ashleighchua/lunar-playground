import { pgTable, pgEnum, serial, text, timestamp, jsonb, integer, boolean, uniqueIndex, index } from 'drizzle-orm/pg-core';

/**
 * One row per Stripe checkout for an in-scope product (Relocation Report,
 * Relocation + Birth Chart, or the Complete Architecture bundle's relocation
 * component). `stripeSessionId` is unique so the webhook can insert-or-noop
 * on `checkout.session.completed` — Stripe retries webhook delivery, and
 * generation must only ever be enqueued once per real purchase.
 *
 * `subscribeToMailingList` has no default and every insert path must set it
 * explicitly (Stripe webhook: true, admin/Fiverr tool: false) — a silent
 * default here is exactly how a Fiverr client who never opted in would end
 * up auto-subscribed.
 */
export const orders = pgTable(
  'orders',
  {
    id: serial('id').primaryKey(),
    stripeSessionId: text('stripe_session_id').notNull(),
    productType: text('product_type').notNull(), // 'relocation-report' | 'relocation-birth-chart' | 'bundle-relocation-component'
    customerEmail: text('customer_email').notNull(),
    subscribeToMailingList: boolean('subscribe_to_mailing_list').notNull(),
    // Populated by the post-checkout intake page (not built yet); null between
    // purchase and intake completion.
    birthData: jsonb('birth_data'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex('orders_stripe_session_id_unique').on(table.stripeSessionId)]
);

export const GENERATION_JOB_STATUSES = ['pending', 'generating', 'ready', 'held-for-review'] as const;
export type GenerationJobStatus = (typeof GENERATION_JOB_STATUSES)[number];

export const generationJobStatus = pgEnum('generation_job_status', GENERATION_JOB_STATUSES);

/**
 * Per-order generation state. Stores the frozen `FactsPayload` set and
 * `houseSystem` actually used, so a future methodology change (e.g. adding
 * Placidus alongside Whole Sign) never leaves an already-delivered report
 * unreproducible or unexplained. `status` starting at 'held-for-review' is
 * the confirmed policy outcome when grounding fails twice — never
 * auto-ship a degraded plain-facts version.
 */
export const generationJobs = pgTable(
  'generation_jobs',
  {
    id: serial('id').primaryKey(),
    orderId: integer('order_id')
      .notNull()
      .references(() => orders.id),
    status: generationJobStatus('status').notNull().default('pending'),
    houseSystem: text('house_system'),
    factsPayload: jsonb('facts_payload'),
    pdfBlobUrl: text('pdf_blob_url'),
    heldReason: text('held_reason'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('generation_jobs_order_id_idx').on(table.orderId)]
);
