import { put } from '@vercel/blob';

/**
 * Uploads a generated report PDF to private Blob storage, keyed by order id.
 * Private access per the plan's PII posture — customer delivery is via
 * emailed attachment (reusing the existing Resend pattern), not a public
 * link; this copy is the internal/audit record.
 */
export async function uploadReportPdf(orderId: number, pdfBytes: Uint8Array): Promise<string> {
  const blob = await put(`reports/order-${orderId}.pdf`, Buffer.from(pdfBytes), {
    access: 'private',
    addRandomSuffix: false,
    contentType: 'application/pdf',
  });
  return blob.url;
}
