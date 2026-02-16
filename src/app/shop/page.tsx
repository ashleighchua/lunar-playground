import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { CheckoutButton } from '@/components/CheckoutButton';
import { products } from '@/data/products';

export const metadata = {
  title: 'Astrology Readings | The Lunar Playground',
  description: 'Personalized astrocartography and natal chart readings. Discover your best cities and understand your chart.',
};

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation currentPage="shop" />

      {/* Hero */}
      <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-[#D4A84B]/15 text-[#8B6914] text-xs tracking-wider uppercase rounded-full mb-4">
            Personalized Readings
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2A2A2A] mb-4">
            Readings
          </h1>
          <p className="text-[#6B6B6B] leading-relaxed">
            Each reading is tailored to your unique birth chart and the questions that matter most to you.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Products Grid */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-8 hover:shadow-xl transition-all relative flex flex-col"
            >
              {product.badge && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-[#D4A84B]/15 text-[#8B6914] text-xs tracking-wider uppercase rounded-full">
                  {product.badge}
                </span>
              )}
              <span className="text-3xl mb-4 block">{product.icon}</span>
              <h3 className="font-serif text-xl text-[#2A2A2A] mb-1">{product.title}</h3>
              <p className="text-sm text-[#6B6B6B] mb-4">{product.subtitle}</p>
              <p className="text-[#6B6B6B] leading-relaxed mb-6">{product.description}</p>
              <ul className="space-y-2 mb-8">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#2A2A2A]/80">
                    <span className="text-[#D4A84B] mt-0.5">·</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <div className="mb-4">
                  <span className="font-serif text-2xl text-[#2A2A2A]">{product.price}</span>
                  {product.priceNote && (
                    <span className="text-sm text-[#6B6B6B] ml-2">{product.priceNote}</span>
                  )}
                </div>
                <CheckoutButton productId={product.id} label={product.ctaText} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* FAQ Preview */}
      <section className="container-editorial py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-[#2A2A2A] text-center mb-8">Common questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-[#2A2A2A] mb-2">How long does delivery take?</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Most readings are delivered within 1-3 business days. I&apos;ll send you updates as I work on your report.
              </p>
            </div>
            <div className="h-px bg-[#2A2A2A]/5" />
            <div>
              <h3 className="font-medium text-[#2A2A2A] mb-2">What do I need to provide?</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Your date of birth, time of birth (as accurate as possible), and place of birth. For astrocartography, it helps to know cities you&apos;re interested in.
              </p>
            </div>
            <div className="h-px bg-[#2A2A2A]/5" />
            <div>
              <h3 className="font-medium text-[#2A2A2A] mb-2">Who writes the readings?</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">
                Every reading is written by me (Ashleigh), based on your individual chart. Each report is tailored to your specific placements and questions.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors">
              View all FAQ &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container-editorial">
          <div className="flex justify-end">
            <div className="flex gap-8 text-sm text-[#6B6B6B]">
              <Link href="/reviews" className="hover:text-[#2A2A2A] transition-colors">Reviews</Link>
              <Link href="/faq" className="hover:text-[#2A2A2A] transition-colors">FAQ</Link>
              <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#2A2A2A] transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
