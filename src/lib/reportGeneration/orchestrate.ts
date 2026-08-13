import { eq } from 'drizzle-orm';
import { FatalError } from 'workflow';
import { getDb } from '../../db';
import { orders, generationJobs } from '../../db/schema';
import { setJobStatus, type JobStatusExtra } from './jobs';
import { uploadReportPdf } from './blob';
import { buildFactsForOrder, type OrderFacts } from './buildFacts';
import { narrateOrder, HeldForReviewError, type GeneratedProse } from './narrate';
import { assembleReportContent } from './assemble';
import { renderReportPdf } from './render/pdf';
import type { ReportContent } from './render/template';
import { deliverReport, notifyOwnerHeldForReview } from './deliver';
import type { FactsPayload } from '../reportFacts/types';
import type { RelocationOrderInput } from './orderInput';

/**
 * Durable orchestrator: given a generation_job id, runs
 * facts -> narrate -> assemble -> render -> upload -> deliver as a Vercel
 * Workflow, updating job status at each transition.
 *
 * Business logic (DB, LLM calls, Puppeteer, email) all lives in `"use
 * step"` functions below, which get full Node.js access, automatic retry,
 * and cached/replayable results. The `"use workflow"` function at the
 * bottom only sequences those steps and handles the failure-convergence
 * path — it must stay orchestration-only, since it runs in a sandboxed VM
 * without direct fetch/fs/Node-module access and (per Workflow DevKit's
 * durable-replay model) must not do anything non-deterministic like calling
 * `new Date()` itself.
 */

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------

interface LoadedOrder {
  orderId: number;
  jobId: number;
  customerEmail: string;
  productType: string;
  subscribeToMailingList: boolean;
  orderInput: RelocationOrderInput;
  generatedAt: string; // ISO string — Date isn't a step-argument-safe type to pass back out casually, but IS serializable per Workflow DevKit; ISO string sidesteps any ambiguity.
}

async function loadOrderAndJob(jobId: number): Promise<LoadedOrder> {
  'use step';
  const db = getDb();

  const [job] = await db.select().from(generationJobs).where(eq(generationJobs.id, jobId));
  if (!job) throw new FatalError(`No generation_jobs row for id ${jobId}`);

  const [order] = await db.select().from(orders).where(eq(orders.id, job.orderId));
  if (!order) throw new FatalError(`No orders row for id ${job.orderId}`);
  if (!order.birthData) throw new FatalError(`Order ${order.id} has no birthData yet (intake not completed)`);

  return {
    orderId: order.id,
    jobId: job.id,
    customerEmail: order.customerEmail,
    productType: order.productType,
    subscribeToMailingList: order.subscribeToMailingList,
    orderInput: order.birthData as RelocationOrderInput,
    generatedAt: new Date().toISOString(),
  };
}

async function markStatus(jobId: number, status: 'generating' | 'ready' | 'held-for-review', extra: JobStatusExtra = {}): Promise<void> {
  'use step';
  await setJobStatus(jobId, status, extra);
}

async function runFacts(orderInput: RelocationOrderInput): Promise<OrderFacts> {
  'use step';
  return buildFactsForOrder(orderInput);
}

async function runNarration(orderInput: RelocationOrderInput, facts: OrderFacts): Promise<GeneratedProse> {
  'use step';
  try {
    return await narrateOrder(orderInput, facts);
  } catch (err) {
    if (err instanceof HeldForReviewError) {
      // Narration already exhausted its own internal grounding retries —
      // this is intentional, not transient, so don't let the framework's
      // default step-retry re-run (and re-pay for) the whole thing again.
      throw new FatalError(err.message);
    }
    throw err;
  }
}

async function runAssemble(
  orderInput: RelocationOrderInput,
  facts: OrderFacts,
  prose: GeneratedProse,
  generatedAt: string
): Promise<ReportContent> {
  'use step';
  return assembleReportContent({ input: orderInput, facts, prose, generatedAt: new Date(generatedAt) });
}

async function runRender(reportContent: ReportContent): Promise<Uint8Array> {
  'use step';
  return renderReportPdf(reportContent);
}

async function runUpload(orderId: number, pdfBytes: Uint8Array): Promise<string> {
  'use step';
  return uploadReportPdf(orderId, pdfBytes);
}

async function runDeliver(options: {
  customerEmail: string;
  pdfBytes: Uint8Array;
  productTitle: string;
  subscribeToMailingList: boolean;
}): Promise<void> {
  'use step';
  await deliverReport(options);
}

async function runOwnerAlert(options: { orderId: number; jobId: number; reason: string }): Promise<void> {
  'use step';
  await notifyOwnerHeldForReview(options);
}

function collectFactsPayloads(facts: OrderFacts): FactsPayload[] {
  const payloads: (FactsPayload | undefined)[] = [
    facts.identityFacts,
    ...facts.cities.map((c) => c.angularityFacts),
    ...facts.cities.map((c) => c.relocatedHouseFacts),
    ...Object.values(facts.rankingFacts),
  ];
  return payloads.filter((p): p is FactsPayload => p !== undefined);
}

const PRODUCT_TITLES: Record<string, string> = {
  'relocation-report': 'Relocation Report',
  'relocation-birth-chart': 'Relocation + Birth Chart',
  'bundle-relocation-component': 'Relocation Report',
};

// ---------------------------------------------------------------------------
// Workflow
// ---------------------------------------------------------------------------

export interface GenerateRelocationReportResult {
  status: 'ready' | 'held-for-review';
  pdfBlobUrl?: string;
  reason?: string;
}

export async function generateRelocationReport(jobId: number): Promise<GenerateRelocationReportResult> {
  'use workflow';

  const { orderId, customerEmail, productType, subscribeToMailingList, orderInput, generatedAt } = await loadOrderAndJob(jobId);

  try {
    await markStatus(jobId, 'generating');

    const facts = await runFacts(orderInput);
    const prose = await runNarration(orderInput, facts);
    const reportContent = await runAssemble(orderInput, facts, prose, generatedAt);

    const pdfBytes = await runRender(reportContent);
    const pdfBlobUrl = await runUpload(orderId, pdfBytes);

    await runDeliver({
      customerEmail,
      pdfBytes,
      productTitle: PRODUCT_TITLES[productType] ?? 'Relocation Report',
      subscribeToMailingList,
    });

    await markStatus(jobId, 'ready', {
      pdfBlobUrl,
      houseSystem: facts.chart.houseSystem,
      factsPayload: collectFactsPayloads(facts),
    });

    return { status: 'ready', pdfBlobUrl };
  } catch (err) {
    // Failure convergence: any uncaught error here — narration exhausting
    // its grounding retries (FatalError from runNarration above), a PDF
    // render crash, an AI Gateway outage, exhausted step retries on any
    // step — lands the job at 'held-for-review' with an owner alert,
    // rather than propagating and leaving the job stuck at 'generating'
    // with a customer-facing status page spinning forever.
    const reason = err instanceof Error ? err.message : String(err);
    await markStatus(jobId, 'held-for-review', { heldReason: reason });
    await runOwnerAlert({ orderId, jobId, reason });
    return { status: 'held-for-review', reason };
  }
}
