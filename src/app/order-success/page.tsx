import Link from 'next/link';
import { Navigation } from '@/components/Navigation';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation />

      <main className="container-editorial py-24 md:py-32">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#D4A84B]/15 flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">&#10003;</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-4">
            Thank you for your order
          </h1>
          <p className="text-[#6B6B6B] leading-relaxed mb-3">
            Your reading is now in the queue. I'll get started on it and send you updates as I work on your report.
          </p>
          <p className="text-[#6B6B6B] leading-relaxed mb-8">
            Most readings are delivered within 1-3 business days. Check your email for a confirmation from Stripe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block px-6 py-3.5 bg-[#2A2A2A] text-[#FAF7F2] rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium text-sm"
            >
              Back to home
            </Link>
            <a
              href="mailto:thelunarplayground@gmail.com"
              className="inline-block px-6 py-3.5 border border-[#2A2A2A]/20 text-[#2A2A2A] rounded-lg hover:bg-[#2A2A2A] hover:text-[#FAF7F2] transition-colors text-sm"
            >
              Questions? Email me
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
