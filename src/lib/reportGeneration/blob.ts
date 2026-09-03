import { put } from '@vercel/blob';

/**
 * Uploads a generated report PDF to private Blob storage, keyed by order id.
 * Private access per the plan's PII posture — customer delivery is via
 * emailed attachment (reusing the existing Resend pattern), not a public
 * link; this copy is the internal/audit record.
 *
 * `allowOverwrite: true` because a fixed-name key (`addRandomSuffix: false`,
 * needed so retries land back on the same URL rather than orphaning old
 * blobs) means retrying a job — the whole point of the admin "Retry a stuck
 * job" tool — always re-uploads onto an existing key once the first attempt
 * gets far enough to succeed. Confirmed live: a second retry after a
 * successful upload failed at this exact step with Vercel Blob's
 * already-exists error before this was added.
 */
export async function uploadReportPdf(orderId: number, pdfBytes: Uint8Array): Promise<string> {
  const blob = await put(`reports/order-${orderId}.pdf`, Buffer.from(pdfBytes), {
    access: 'private',
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: 'application/pdf',
  });
  return blob.url;
}
