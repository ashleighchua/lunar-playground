import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Order Confirmed | The Lunar Playground',
  description: 'Your order has been confirmed. Thank you for your purchase from The Lunar Playground.',
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
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
          <p className="text-[#7B7394] leading-relaxed mb-3">
            Your reading is now in the queue. I'll get started on it and send you updates as I work on your report.
          </p>
          <p className="text-[#7B7394] leading-relaxed mb-8">
            Most readings are delivered within 1-3 business days. Check your email for a confirmation from Stripe.
          </p>
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
