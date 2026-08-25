import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { OrderIntakeForm } from '@/components/OrderIntakeForm';
import { getOrderByStripeSessionId } from '@/lib/reportGeneration/jobs';
import { products } from '@/data/products';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tell Us About You | The Lunar Playground',
  robots: { index: false, follow: false },
};

// Stripe redirects here immediately after payment, but webhook delivery
// (which inserts the order row) is async and can lag by a few seconds — a
// short bounded retry here covers the common case without needing any
// client-side polling infrastructure for what's normally a sub-second gap.
async function findOrderWithRetry(sessionId: string) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const order = await getOrderByStripeSessionId(sessionId);
    if (order) return order;
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  return null;
}

function StatusPage({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />
      <main className="container-editorial py-24 md:py-32">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-4">{title}</h1>
          <p className="text-[#655E78] leading-relaxed mb-8">{body}</p>
          <Link
            href="/"
            className="inline-block px-6 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-lg hover:bg-[#1E1835] transition-colors font-medium text-sm"
          >
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default async function OrderIntakePage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <StatusPage
        title="Missing order"
        body="We couldn't find your order. If you just paid, check your confirmation email for the right link."
      />
    );
  }

  const order = await findOrderWithRetry(sessionId);

  if (!order) {
    return (
      <StatusPage
        title="Still setting up your order"
        body="This is taking a little longer than usual. Refresh this page in a few seconds — if it still doesn't show up, email us and we'll sort it out."
      />
    );
  }

  if (order.birthData) {
    return (
      <StatusPage title="Already on it" body="We've already got your details for this order — your reading is on the way." />
    );
  }

  const product = products.find((p) => p.id === order.productType);

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />
      <main className="container-editorial py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-3">Tell us about you</h1>
          <p className="text-[#655E78] leading-relaxed mb-10">A few details and we&apos;ll get started on your {product?.title ?? 'reading'}.</p>
          <OrderIntakeForm sessionId={sessionId} reportTier={product?.reportTier} />
        </div>
      </main>
    </div>
  );
}
