import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CheckoutButton } from '@/components/CheckoutButton';
import { products } from '@/data/products';

export const metadata = {
  title: 'Personalised Readings | The Lunar Playground',
  description: 'Personalised astrology and metaphysics readings written for your unique chart. Western astrology, BaZi, Human Design, and relocation astrology.',
};

// Bundles shown as hero cards, individual readings below
const bundleIds = ['full-blueprint', 'know-yourself'];
const individualIds = ['bazi', 'astrocartography', 'natal-chart', 'human-design', 'mini-course'];

export default function ShopPage() {
  const bundles = products.filter(p => bundleIds.includes(p.id));
  const individuals = products.filter(p => individualIds.includes(p.id));

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation currentPage="shop" />

      {/* Hero */}
      <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4">Personalised Readings</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-4">
            <span className="text-gradient-gold">The reading that finally makes it click.</span>
          </h1>
          <p className="text-[#655E78] leading-relaxed">
            Your full chart, your timing, and the patterns no one has connected for you yet.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="divider-mystic">
          <span className="divider-star">&#10022; &#10022; &#10022;</span>
        </div>
      </div>

      {/* Bundle Products (Hero Cards) */}
      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#655E78] text-center mb-8">Bundles</p>
          <div className="grid md:grid-cols-2 gap-6">
            {bundles.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#FF8FA3]/15 p-8 shadow-glow-gold hover:shadow-glow-gold-hover transition-all relative flex flex-col"
              >
                {product.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#FF8FA3]/15 text-[#C4365A] text-xs tracking-wider uppercase rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className="text-3xl mb-4 block text-center">{product.icon}</span>
                <h3 className="font-serif text-xl text-[#2D2640] mb-1 text-center">{product.title}</h3>
                <p className="text-sm text-[#655E78] mb-4 text-center">{product.subtitle}</p>
                <p className="text-[#655E78] leading-relaxed mb-6 text-center text-sm">{product.description}</p>
                <ul className="space-y-2 mb-8">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#2D2640]/80">
                      <span className="text-[#FF8FA3] mt-0.5">&#10022;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto text-center">
                  <div className="mb-4">
                    <span className="font-serif text-2xl text-[#2D2640]">{product.price}</span>
                    {product.priceNote && (
                      <span className="text-sm text-[#655E78] ml-2">{product.priceNote}</span>
                    )}
                  </div>
                  <CheckoutButton productId={product.id} label={product.ctaText} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidance */}
      <section className="container-editorial py-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-sm text-[#655E78] leading-relaxed">
            Want the full picture? Go with <span className="text-[#2D2640] font-medium">The Complete Architecture</span>.
            Want to understand yourself first? Start with <span className="text-[#2D2640] font-medium">The Integrated Profile</span>.
            Already know which system speaks to you? Grab an individual reading below.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="divider-mystic">
          <span className="divider-star">&#10022; &#10022; &#10022;</span>
        </div>
      </div>

      {/* Individual Readings */}
      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#655E78] text-center mb-8">Individual Readings</p>
          <div className="grid md:grid-cols-2 gap-6">
            {individuals.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-[#2D2640]/5 p-8 shadow-glow-gold hover:shadow-glow-gold-hover transition-all relative flex flex-col"
              >
                {product.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-[#FF8FA3]/15 text-[#C4365A] text-xs tracking-wider uppercase rounded-full">
                    {product.badge}
                  </span>
                )}
                <span className="text-3xl mb-4 block text-center">{product.icon}</span>
                <h3 className="font-serif text-xl text-[#2D2640] mb-1 text-center">{product.title}</h3>
                <p className="text-sm text-[#655E78] mb-4 text-center">{product.subtitle}</p>
                <p className="text-[#655E78] leading-relaxed mb-6 text-center text-sm">{product.description}</p>
                <ul className="space-y-2 mb-8">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#2D2640]/80">
                      <span className="text-[#FF8FA3] mt-0.5">·</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto text-center">
                  <div className="mb-4">
                    <span className="font-serif text-2xl text-[#2D2640]">{product.price}</span>
                    {product.priceNote && (
                      <span className="text-sm text-[#655E78] ml-2">{product.priceNote}</span>
                    )}
                  </div>
                  <CheckoutButton productId={product.id} label={product.ctaText} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="divider-mystic">
          <span className="divider-star">&#10022; &#10022; &#10022;</span>
        </div>
      </div>

      {/* FAQ Preview */}
      <section className="container-editorial py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl text-[#2D2640] text-center mb-8">Common questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-[#2D2640] mb-2">How long does delivery take?</h3>
              <p className="text-sm text-[#655E78] leading-relaxed">
                Most readings are delivered within 1-3 business days. I&apos;ll send you updates as I work on your report.
              </p>
            </div>
            <div className="h-px bg-[#2D2640]/5" />
            <div>
              <h3 className="font-medium text-[#2D2640] mb-2">What do I need to provide?</h3>
              <p className="text-sm text-[#655E78] leading-relaxed">
                Your date of birth, time of birth (as accurate as possible), and place of birth. For relocation readings, it helps to know cities you&apos;re interested in.
              </p>
            </div>
            <div className="h-px bg-[#2D2640]/5" />
            <div>
              <h3 className="font-medium text-[#2D2640] mb-2">Who writes the readings?</h3>
              <p className="text-sm text-[#655E78] leading-relaxed">
                Every reading is written by me (Ashleigh) after studying your individual chart across multiple systems. No AI, no templates.
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link href="/faq" className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors">
              View all FAQ &rarr;
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
