import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type Stripe from 'stripe';
import { parseBirthDetails } from '@/lib/parseBirthDetails';
import { escapeHtml, unsubscribeFooter } from '@/lib/email/unsubscribeFooter';
import { products } from '@/data/products';
import { createOrderIfNew } from '@/lib/reportGeneration/jobs';

export async function POST(request: NextRequest) {
  const { default: StripeSDK } = await import('stripe');
  const stripe = new StripeSDK(process.env.STRIPE_SECRET_KEY!);
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    // Skip if this payment came through a checkout session — that event handles it
    const sessions = await stripe.checkout.sessions.list({ payment_intent: paymentIntent.id, limit: 1 });
    if (sessions.data.length > 0) {
      return NextResponse.json({ received: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);
    const amount = '$' + (paymentIntent.amount / 100).toFixed(0);
    const customerEmail = paymentIntent.receipt_email || paymentIntent.metadata?.email || '';
    const customerName = paymentIntent.metadata?.name || '';
    const description = paymentIntent.description || 'Direct payment';

    try {
      const { error } = await resend.emails.send({
        from: 'The Lunar Playground <noreply@thelunarplayground.com>',
        to: ['thelunarplayground@gmail.com'],
        subject: `Payment received: ${amount}`,
        html: generateDirectPaymentEmail({ amount, customerEmail, customerName, description, paymentIntentId: paymentIntent.id }),
      });
      // resend.emails.send() does NOT throw on an API-level failure (invalid
      // key, unverified domain, etc.) — it resolves with { data: null, error }.
      // Checked explicitly everywhere in this file now; previously this was
      // silently swallowed, indistinguishable from a real send.
      if (error) console.error('Failed to send direct payment notification:', error);
    } catch (err) {
      console.error('Failed to send direct payment notification:', err);
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const productTitle = session.metadata?.productTitle || 'Unknown product';
    const customerEmail = session.customer_details?.email;
    const customerName = session.customer_details?.name || '';

    const birthDetails = (session.custom_fields as Array<{ key: string; text?: { value?: string } }> | undefined)
      ?.find(f => f.key === 'birth_details')?.text?.value || '';
    const citiesOfInterest = (session.custom_fields as Array<{ key: string; text?: { value?: string } }> | undefined)
      ?.find(f => f.key === 'cities_of_interest')?.text?.value || '';

    if (!customerEmail) {
      console.error('No customer email found for session:', session.id);
      return NextResponse.json({ received: true });
    }

    // Record an order row for products routed through the automated
    // relocation-report pipeline (Phase 5+). Idempotent on session.id since
    // Stripe retries webhook delivery — createOrderIfNew no-ops on a repeat.
    // A genuine DB failure here returns 500 (not the unconditional 200 the
    // rest of this handler uses for best-effort email sends) so Stripe
    // retries: losing this row silently would mean a paid customer's order
    // never gets automated, with nothing else to catch it.
    const inScopeProduct = products.find((p) => p.id === productId && p.reportTier);
    if (inScopeProduct) {
      try {
        await createOrderIfNew({
          stripeSessionId: session.id,
          productType: inScopeProduct.id,
          customerEmail,
          subscribeToMailingList: true, // public checkout is opt-out, matching the mailing-list subscribe below
        });
      } catch (err) {
        console.error('Failed to record order for session:', session.id, err);
        return NextResponse.json({ error: 'Failed to record order' }, { status: 500 });
      }
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    if (productId === 'mini-course') {
      // Send the astrocartography guide PDF
      try {
        const pdfPath = join(process.cwd(), 'public', 'guides', 'How to Read Your Astrocartography Chart — Lunar Playground.pdf');
        const pdfBuffer = await readFile(pdfPath);

        const { error } = await resend.emails.send({
          from: 'The Lunar Playground <noreply@thelunarplayground.com>',
          replyTo: 'thelunarplayground@gmail.com',
          to: [customerEmail],
          subject: 'Your Astrocartography Guide is Here',
          html: generateGuideEmail(customerEmail),
          attachments: [
            {
              filename: 'How to Read Your Astrocartography Chart.pdf',
              content: pdfBuffer.toString('base64'),
            },
          ],
        });

        if (error) console.error('Failed to send guide PDF:', error);
        else console.log('Guide PDF sent to:', customerEmail);
      } catch (err) {
        console.error('Failed to send guide PDF:', err);
      }
    } else {
      // For reading products, send order confirmation to customer
      try {
        const { error } = await resend.emails.send({
          from: 'The Lunar Playground <noreply@thelunarplayground.com>',
          replyTo: 'thelunarplayground@gmail.com',
          to: [customerEmail],
          subject: `Order Confirmed — ${productTitle}`,
          html: generateOrderConfirmationEmail(productTitle, customerEmail),
        });

        if (error) console.error('Failed to send order confirmation:', error);
        else console.log('Order confirmation sent to:', customerEmail);
      } catch (err) {
        console.error('Failed to send order confirmation:', err);
      }
    }

    // Auto-subscribe customer to mailing list (opt-out model)
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      try {
        await resend.contacts.create({ email: customerEmail, audienceId, unsubscribed: false });
      } catch {
        // Ignore duplicate contact errors
      }
    }

    // Notify owner of every order
    const parsed = parseBirthDetails(birthDetails);
    try {
      const { error } = await resend.emails.send({
        from: 'The Lunar Playground <noreply@thelunarplayground.com>',
        to: ['thelunarplayground@gmail.com'],
        subject: `New order: ${productTitle}`,
        html: generateOwnerNotificationEmail({
          productTitle,
          customerEmail,
          customerName,
          birthDetails,
          citiesOfInterest,
          sessionId: session.id,
          parsedDate: parsed.date,
          parsedTime: parsed.time,
          parsedPlace: parsed.place,
        }),
      });

      if (error) console.error('Failed to send owner notification:', error);
      else console.log('Owner notification sent for session:', session.id);
    } catch (err) {
      console.error('Failed to send owner notification:', err);
    }
  }

  return NextResponse.json({ received: true });
}

function generateDirectPaymentEmail(data: {
  amount: string;
  customerEmail: string;
  customerName: string;
  description: string;
  paymentIntentId: string;
}): string {
  const rows = [
    ['Amount', data.amount],
    ...(data.description ? [['Description', escapeHtml(data.description)]] : []),
    ...(data.customerName ? [['From', escapeHtml(data.customerName)]] : []),
    ...(data.customerEmail ? [['Email', escapeHtml(data.customerEmail)]] : []),
    ['Stripe ID', escapeHtml(data.paymentIntentId)],
  ];

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding: 10px 12px; color: #655E78; font-size: 13px; white-space: nowrap; vertical-align: top;">${label}</td>
        <td style="padding: 10px 12px; color: #2D2640; font-size: 13px; word-break: break-word;">${value}</td>
      </tr>`)
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
    <body style="margin: 0; padding: 0; background-color: #F0EBF8; font-family: Georgia, 'Times New Roman', serif;">
      <div style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">
        <div style="text-align: center; font-size: 20px; color: #8A8099; margin-bottom: 16px;">&#10022;</div>
        <div style="text-align: center; font-size: 22px; color: #2D2640; margin-bottom: 4px;">Payment Received</div>
        <div style="text-align: center; color: #655E78; font-size: 14px; margin-bottom: 32px;">${data.amount}</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #E8E4DE;">
          ${tableRows}
        </table>
        <div style="text-align: center; margin-top: 28px;">
          <a href="https://dashboard.stripe.com/payments" style="display: inline-block; background: #2D2640; color: white; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-size: 13px;">View in Stripe</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateOwnerNotificationEmail(data: {
  productTitle: string;
  customerEmail: string;
  customerName: string;
  birthDetails: string;
  citiesOfInterest: string;
  sessionId: string;
  parsedDate: string | null;
  parsedTime: string | null;
  parsedPlace: string | null;
}): string {
  const parsedSummary = [data.parsedDate, data.parsedTime, data.parsedPlace].filter(Boolean).join(' · ');

  const rows = [
    ['Product', escapeHtml(data.productTitle)],
    ['Customer email', escapeHtml(data.customerEmail)],
    ...(data.customerName ? [['Customer name', escapeHtml(data.customerName)]] : []),
    ...(data.birthDetails ? [['Birth details (raw)', escapeHtml(data.birthDetails)]] : []),
    ...(parsedSummary ? [['Birth details (parsed)', escapeHtml(parsedSummary)]] : []),
    ...(data.citiesOfInterest ? [['Cities of interest', escapeHtml(data.citiesOfInterest)]] : []),
    ['Stripe session', escapeHtml(data.sessionId)],
  ];

  const tableRows = rows
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding: 10px 12px; color: #655E78; font-size: 13px; white-space: nowrap; vertical-align: top;">${label}</td>
        <td style="padding: 10px 12px; color: #2D2640; font-size: 13px; word-break: break-word;">${value}</td>
      </tr>`
    )
    .join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #F0EBF8; font-family: Georgia, 'Times New Roman', serif;">
      <div style="max-width: 560px; margin: 0 auto; padding: 48px 24px;">

        <div style="text-align: center; font-size: 20px; color: #8A8099; margin-bottom: 16px;">&#10022;</div>
        <div style="text-align: center; font-size: 22px; color: #2D2640; margin-bottom: 4px;">New Order</div>
        <div style="text-align: center; color: #655E78; font-size: 14px; margin-bottom: 32px;">${escapeHtml(data.productTitle)}</div>

        <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; background: white; border-radius: 10px; overflow: hidden; border: 1px solid #E8E4DE;">
          ${tableRows}
        </table>

        <div style="text-align: center; margin-top: 28px;">
          <a href="https://dashboard.stripe.com/payments" style="display: inline-block; background: #2D2640; color: white; padding: 10px 22px; border-radius: 8px; text-decoration: none; font-size: 13px;">View in Stripe</a>
        </div>

      </div>
    </body>
    </html>
  `;
}

function generateGuideEmail(email: string): string {
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
          Your guide is ready.
        </p>
        <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 28px;">
          Thank you for trusting me with this part of your journey. Your copy of <strong style="color: #2D2640;">How to Read Your Astrocartography Chart</strong> is attached — it's yours to keep.
        </p>
        <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 28px;">
          If anything comes up, I'm at
          <a href="mailto:thelunarplayground@gmail.com" style="color: #2D2640;">thelunarplayground@gmail.com</a>.
        </p>
        <p style="color: #2D2640; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 36px;">
          Ashleigh
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

function generateOrderConfirmationEmail(productTitle: string, email: string): string {
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
          Received with gratitude.
        </p>
        <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 28px;">
          Your <strong style="color: #2D2640;">${productTitle}</strong> order is confirmed. Add a few birth details and your reading will be ready shortly after.
        </p>
        <p style="color: #4A4A4A; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 28px;">
          If anything comes up, I'm at
          <a href="mailto:thelunarplayground@gmail.com" style="color: #2D2640;">thelunarplayground@gmail.com</a>.
        </p>
        <p style="color: #2D2640; font-size: 15px; line-height: 1.8; text-align: center; margin: 0 0 36px;">
          Ashleigh
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
