import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';
import { getOrderByStripeSessionId, getLatestGenerationJobForOrder } from '@/lib/reportGeneration/jobs';

export const metadata: Metadata = {
  title: 'Order Confirmed | The Lunar Playground',
  description: 'Your order has been confirmed. Thank you for your purchase from The Lunar Playground.',
  robots: { index: false, follow: false },
};

const MANUAL_FALLBACK_BODY = [
  "Your order is confirmed. We'll be in touch shortly with next steps.",
  'Check your email for a confirmation from Stripe.',
];

/**
 * Resolves the real status for automated-pipeline products (every current
 * paid reading, plus the combined product) via generation_jobs, and the
 * instant mini-course delivery via a Stripe session lookup (it never gets an
 * `orders` row — only reportTier products do). Falls back to a generic
 * "order confirmed" message for anything unrecognized (no current live
 * product should hit this) — this page must never error out for someone who
 * just paid.
 */
async function getStatusBody(sessionId: string | undefined): Promise<string[]> {
  if (!sessionId) return MANUAL_FALLBACK_BODY;

  const order = await getOrderByStripeSessionId(sessionId);
  if (order) {
    const job = await getLatestGenerationJobForOrder(order.id);
    switch (job?.status) {
      case 'ready':
        return [
          "Your report is ready — we've sent it to the email you used at checkout. Check your inbox (and spam folder, just in case).",
        ];
      case 'held-for-review':
        return [
          "We're just double-checking a detail in your report to make sure everything lines up before it reaches you. We'll email you as soon as it's ready.",
        ];
      case 'pending':
      case 'generating':
      default:
        return [
          "Your report is generating now — most are ready within a few minutes. We'll email it to you as soon as it's done.",
        ];
    }
  }

  // No `orders` row means this wasn't an automated-pipeline product. Only
  // spend a Stripe API call on something that actually looks like a real
  // checkout session id — this page is public and unauthenticated.
  if (sessionId.startsWith('cs_')) {
    try {
      const { default: Stripe } = await import('stripe');
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (session.metadata?.productId === 'mini-course') {
        return ["Your guide is on its way — we've emailed it to the address you used at checkout."];
      }
    } catch {
      // Bad/expired session id, API error, etc. — fall through to the safe default.
    }
  }

  return MANUAL_FALLBACK_BODY;
}

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;
  const body = await getStatusBody(sessionId);

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />

      <main className="container-editorial py-24 md:py-32">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#FF8FA3]/15 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">&#10003;</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-4">
            Thank you for your order
          </h1>
          {body.map((paragraph, i) => (
            <p key={i} className={`text-[#655E78] leading-relaxed ${i === body.length - 1 ? 'mb-8' : 'mb-3'}`}>
              {paragraph}
            </p>
          ))}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-6 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-lg hover:bg-[#1E1835] transition-colors font-medium text-sm"
            >
              Back to home
            </Link>
            <a
              href="mailto:thelunarplayground@gmail.com"
              className="inline-block px-6 py-3.5 border border-[#2D2640]/20 text-[#2D2640] rounded-lg hover:bg-[#2D2640] hover:text-[#F0EBF8] transition-colors text-sm"
            >
              Questions? Email me
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
