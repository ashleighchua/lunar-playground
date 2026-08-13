import { Resend } from 'resend';
import { escapeHtml, unsubscribeFooter } from '../email/unsubscribeFooter';

/**
 * Delivers the finished report PDF by email, reusing the Resend +
 * base64-attachment pattern already proven in the Stripe webhook's guide-PDF
 * delivery (src/app/api/webhooks/stripe/route.ts's generateGuideEmail).
 *
 * `subscribeToMailingList` is read by the caller off the order row
 * (`orders.subscribeToMailingList`, NOT NULL with no default) rather than
 * being a parameter this function could silently default — the order row is
 * the one place that decision gets made, at order-creation time, so an
 * admin/Fiverr-tool order can never accidentally inherit the Stripe path's
 * subscribe-by-default behavior.
 */

export interface DeliverReportOptions {
  customerEmail: string;
  pdfBytes: Uint8Array;
  productTitle: string;
  subscribeToMailingList: boolean;
}

export async function deliverReport(options: DeliverReportOptions): Promise<void> {
  const { customerEmail, pdfBytes, productTitle, subscribeToMailingList } = options;
  const resend = new Resend(process.env.RESEND_API_KEY!);

  const { error } = await resend.emails.send({
    from: 'The Lunar Playground <noreply@thelunarplayground.com>',
    replyTo: 'thelunarplayground@gmail.com',
    to: [customerEmail],
    subject: `Your ${productTitle} is Ready`,
    html: generateReportReadyEmail(customerEmail, productTitle),
    attachments: [
      {
        filename: `${productTitle.replace(/[^a-z0-9]+/gi, '-')}.pdf`,
        content: Buffer.from(pdfBytes).toString('base64'),
      },
    ],
  });
  // The Resend SDK does NOT throw on an API-level failure (invalid key,
  // unverified domain, bad recipient) — it resolves with { data: null,
  // error }. Found live: a delivery silently "succeeded" while nothing was
  // ever sent, because this wasn't checked. Throwing here is what lets
  // orchestrate.ts's failure-convergence catch actually see this failure
  // and hold the job for review instead of marking it 'ready'.
  if (error) {
    throw new Error(`Resend delivery to ${customerEmail} failed: ${error.name} — ${error.message}`);
  }

  if (subscribeToMailingList) {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({ email: customerEmail, audienceId, unsubscribed: false });
      } catch {
        // Ignore duplicate contact errors, matching the existing webhook pattern.
      }
    }
  }
}

/**
 * Owner alert for the failure-convergence path (see orchestrate.ts): any
 * uncaught error in the pipeline — exhausted grounding retries, a PDF render
 * crash, an AI Gateway outage — lands the job at 'held-for-review' instead
 * of leaving it stuck at 'generating' with no one aware. Reuses the same
 * plain-table owner-notification style already proven in the Stripe
 * webhook's generateOwnerNotificationEmail.
 */
export async function notifyOwnerHeldForReview(options: { orderId: number; jobId: number; reason: string }): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { orderId, jobId, reason } = options;

  const { error } = await resend.emails.send({
    from: 'The Lunar Playground <noreply@thelunarplayground.com>',
    to: ['thelunarplayground@gmail.com'],
    subject: `Report held for review — order #${orderId}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"></head>
      <body style="margin: 0; padding: 0; background-color: #F0EBF8; font-family: Georgia, 'Times New Roman', serif;">
        <div style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">
          <div style="text-align: center; font-size: 20px; color: #8A8099; margin-bottom: 16px;">&#10022;</div>
          <div style="text-align: center; font-size: 22px; color: #2D2640; margin-bottom: 4px;">Held for Review</div>
          <div style="text-align: center; color: #655E78; font-size: 14px; margin-bottom: 32px;">Order #${orderId} · Job #${jobId}</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #E8E4DE;">
            <tr>
              <td style="padding: 10px 12px; color: #655E78; font-size: 13px; white-space: nowrap; vertical-align: top;">Reason</td>
              <td style="padding: 10px 12px; color: #2D2640; font-size: 13px; word-break: break-word;">${escapeHtml(reason)}</td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `,
  });
  // Same reasoning as deliverReport() above — an alert that silently fails
  // to send is actively harmful here, since the whole point is making sure
  // a held-for-review order doesn't go unnoticed. Letting this throw means
  // Workflow DevKit's default step retry gets a chance to redeliver it; the
  // job's DB status is already durably set to 'held-for-review' by the time
  // this runs (see orchestrate.ts), so a persistent alert failure doesn't
  // lose that state even if this step ultimately exhausts its retries.
  if (error) {
    throw new Error(`Resend owner alert for order #${orderId} failed: ${error.name} — ${error.message}`);
  }
}

function generateReportReadyEmail(email: string, productTitle: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #F0EBF8; font-family: Georgia, 'Times New Roman', serif;">
      <div style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">

        <div style="text-align: center; font-size: 20px; color: #8A8099; margin-bottom: 24px;">&#10022;</div>

        <div style="text-align: center; margin-bottom: 8px;">
          <div style="font-size: 26px; color: #2D2640; letter-spacing: 0.5px;">The Lunar Playground</div>
        </div>

        <div style="text-align: center; color: #8A8099; font-size: 14px; letter-spacing: 6px; margin-bottom: 36px;">
          &#9789; &#8212;&#8212;&#8212;&#8212;&#8212;&#8212;&#8212; &#9790;
        </div>

        <p style="color: #2D2640; font-size: 17px; line-height: 1.8; text-align: center; margin: 0 0 28px;">
          Your reading is ready.
        </p>
        <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 28px;">
          Your <strong style="color: #2D2640;">${productTitle}</strong> is attached — it's yours to keep.
        </p>
        <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 28px;">
          If anything comes up, I'm at
          <a href="mailto:thelunarplayground@gmail.com" style="color: #2D2640;">thelunarplayground@gmail.com</a>.
        </p>
        <p style="color: #2D2640; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 36px;">
          Astro Ashleigh
        </p>

        <div style="text-align: center; color: #8A8099; font-size: 14px; letter-spacing: 6px; margin-bottom: 24px;">
          &#8212;&#8212;&#8212;&#8212;&#8212; &#10022; &#8212;&#8212;&#8212;&#8212;&#8212;
        </div>

        <div style="text-align: center;">
          <p style="color: #655E78; font-size: 13px; font-style: italic; margin: 0 0 12px;">
            "A playground, not a prophecy."
          </p>
          <p style="color: #2D2640; font-size: 14px; margin: 0 0 4px;">The Lunar Playground</p>
          <p style="color: #655E78; font-size: 12px; margin: 0 0 12px;">Multiple systems. One full picture.</p>
          <a href="https://www.thelunarplayground.com" style="color: #655E78; font-size: 12px; text-decoration: none;">
            www.thelunarplayground.com
          </a>
        </div>
        ${unsubscribeFooter(email)}

      </div>
    </body>
    </html>
  `;
}
