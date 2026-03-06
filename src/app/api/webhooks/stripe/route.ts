import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { readFile } from 'fs/promises';
import { join } from 'path';
import type Stripe from 'stripe';

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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const productId = session.metadata?.productId;
    const customerEmail = session.customer_details?.email;

    if (!customerEmail) {
      console.error('No customer email found for session:', session.id);
      return NextResponse.json({ received: true });
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);

    if (productId === 'mini-course') {
      // Send the astrocartography guide PDF
      try {
        const pdfPath = join(process.cwd(), 'public', 'guides', 'How to Read Your Astrocartography Chart — Lunar Playground.pdf');
        const pdfBuffer = await readFile(pdfPath);

        await resend.emails.send({
          from: 'The Lunar Playground <noreply@thelunarplayground.com>',
          replyTo: 'thelunarplayground@gmail.com',
          to: [customerEmail],
          subject: 'Your Astrocartography Guide is Here',
          html: generateGuideEmail(),
          attachments: [
            {
              filename: 'How to Read Your Astrocartography Chart.pdf',
              content: pdfBuffer.toString('base64'),
            },
          ],
        });

        console.log('Guide PDF sent to:', customerEmail);
      } catch (err) {
        console.error('Failed to send guide PDF:', err);
      }
    } else {
      // For reading products, send order confirmation
      const productTitle = session.metadata?.productTitle || 'your reading';
      try {
        await resend.emails.send({
          from: 'The Lunar Playground <noreply@thelunarplayground.com>',
          replyTo: 'thelunarplayground@gmail.com',
          to: [customerEmail],
          subject: `Order Confirmed — ${productTitle}`,
          html: generateOrderConfirmationEmail(productTitle),
        });

        console.log('Order confirmation sent to:', customerEmail);
      } catch (err) {
        console.error('Failed to send order confirmation:', err);
      }
    }
  }

  return NextResponse.json({ received: true });
}

function generateGuideEmail(): string {
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

      </div>
    </body>
    </html>
  `;
}

function generateOrderConfirmationEmail(productTitle: string): string {
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
          Your <strong style="color: #2D2640;">${productTitle}</strong> is now in the works. I'll be with your chart shortly and will send your reading within 1-3 days.
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

      </div>
    </body>
    </html>
  `;
}
