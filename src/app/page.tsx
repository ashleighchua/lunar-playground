import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HomeHero } from '@/components/HomeHero';
import { ImagineCards } from '@/components/ImagineCards';
import { CheckoutButton } from '@/components/CheckoutButton';
import { ReviewsMarquee } from '@/components/ReviewsMarquee';
import { products } from '@/data/products';

export default function HomePage() {
  const natalChart = products.find((p) => p.id === 'natal-chart')!;
  const relocationReport = products.find((p) => p.id === 'astrocartography')!;
  const combined = products.find((p) => p.id === 'relocation-birth-chart')!;
  const miniCourse = products.find((p) => p.id === 'mini-course');

  return (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation currentPage="explore" />

      <main className="flex-1">
        <HomeHero />

        {/* Divider (pink) */}
        <div className="container-editorial">
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* "Sound familiar?" - Flip Cards */}
        <ImagineCards />

        {/* Divider (indigo) */}
        <div className="flex items-center justify-center gap-2 py-2 max-w-160 mx-auto">
          <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(166, 180, 255, 0.5), transparent)' }} />
          <span className="text-[#A6B4FF] text-[9px] tracking-[8px] opacity-70">&#10022; &#10022; &#10022;</span>
          <span className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(166, 180, 255, 0.5), transparent)' }} />
        </div>

        {/* The Offer */}
        <section id="readings" className="container-editorial py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] text-center mb-2">Two readings, or both together.</h2>
            <p className="text-[#655E78] text-center mb-10">One to understand yourself. One to know where to go. Or get both in one.</p>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              {/* Natal Chart - neutral border, subtle coral shadow */}
              <div
                className="bg-[#FAFAFF] border border-[#D6CFE3] rounded-3xl p-6 md:p-8 flex flex-col gap-3"
                style={{ boxShadow: '0 0 20px rgba(255, 143, 163, 0.12), 0 4px 16px -4px rgba(45, 38, 64, 0.06)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex w-11 h-11 rounded-full bg-[#FFF0F3] border border-[#FFB8C6] items-center justify-center text-xl text-[#C4365A]">
                    {natalChart.icon}
                  </span>
                  <span className="font-serif text-2xl text-[#2D2640]">{natalChart.price}</span>
                </div>
                <h3 className="font-serif text-xl text-[#2D2640]">{natalChart.title}</h3>
                <p className="font-semibold text-[#C4365A] text-sm">{natalChart.subtitle}</p>
                <p className="text-[#5A5472] text-sm leading-relaxed">{natalChart.description}</p>
                <div className="mt-auto pt-2">
                  <CheckoutButton
                    productId={natalChart.id}
                    label={natalChart.ctaText}
                    className="block w-full text-center px-6 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-full font-semibold transition-colors hover:bg-[#FF5C7A] hover:text-white disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Relocation Report - indigo border + glow, badge */}
              <div
                className="relative bg-[#FAFAFF] border border-[#A6B4FF] rounded-3xl p-6 md:p-8 flex flex-col gap-3"
                style={{ boxShadow: '0 0 28px rgba(166, 180, 255, 0.28), 0 4px 16px -4px rgba(45, 38, 64, 0.06)' }}
              >
                {relocationReport.badge && (
                  <span
                    className="absolute -top-3 right-5.5 bg-[#A6B4FF] text-[#2D2640] rounded-full px-3.5 py-1.25 text-[11px] font-bold uppercase"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {relocationReport.badge}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span className="inline-flex w-11 h-11 rounded-full bg-[#E8EDF8] border border-[#A6B4FF] items-center justify-center text-xl">
                    {relocationReport.icon}
                  </span>
                  <span className="font-serif text-2xl text-[#2D2640]">{relocationReport.price}</span>
                </div>
                <h3 className="font-serif text-xl text-[#2D2640]">{relocationReport.title}</h3>
                <p className="font-semibold text-[#5A60B0] text-sm">{relocationReport.subtitle}</p>
                <p className="text-[#5A5472] text-sm leading-relaxed">{relocationReport.description}</p>
                <div className="mt-auto pt-2">
                  <CheckoutButton
                    productId={relocationReport.id}
                    label={relocationReport.ctaText}
                    className="block w-full text-center px-6 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-full font-semibold transition-colors hover:bg-[#7B8AE0] hover:text-white disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Relocation + Birth Chart - gold border + glow, badge */}
              <div
                className="relative bg-[#FAFAFF] border border-[#E3C567] rounded-3xl p-6 md:p-8 flex flex-col gap-3"
                style={{ boxShadow: '0 0 28px rgba(227, 197, 103, 0.28), 0 4px 16px -4px rgba(45, 38, 64, 0.06)' }}
              >
                {combined.badge && (
                  <span
                    className="absolute -top-3 right-5.5 bg-[#E3C567] text-[#2D2640] rounded-full px-3.5 py-1.25 text-[11px] font-bold uppercase"
                    style={{ letterSpacing: '0.08em' }}
                  >
                    {combined.badge}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <span className="inline-flex w-11 h-11 rounded-full bg-[#FBF3DD] border border-[#E3C567] items-center justify-center text-xl">
                    {combined.icon}
                  </span>
                  <span className="font-serif text-2xl text-[#2D2640]">{combined.price}</span>
                </div>
                <h3 className="font-serif text-xl text-[#2D2640]">{combined.title}</h3>
                <p className="font-semibold text-[#A5822F] text-sm">{combined.subtitle}</p>
                <p className="text-[#5A5472] text-sm leading-relaxed">{combined.description}</p>
                <div className="mt-auto pt-2">
                  <CheckoutButton
                    productId={combined.id}
                    label={combined.ctaText}
                    className="block w-full text-center px-6 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-full font-semibold transition-colors hover:bg-[#E3C567] hover:text-[#2D2640] disabled:opacity-60"
                  />
                </div>
              </div>
            </div>
            {miniCourse && (
              <p className="text-center text-sm text-[#5A5472] mt-8">
                Not ready to buy?{' '}
                <Link href={`/shop#${miniCourse.id}`} className="font-semibold underline underline-offset-2 hover:text-[#2D2640] transition-colors">
                  Learn to read it yourself for {miniCourse.price}.
                </Link>
              </p>
            )}
          </div>
        </section>

        {/* Trust / origin story */}
        <section
          id="story"
          className="relative text-[#F0EBF8] px-4 md:px-12 py-14 md:py-24 text-center mt-6 md:mt-12"
          style={{ background: 'linear-gradient(180deg, #2D2640 0%, #1A1628 100%)' }}
        >
          <span className="absolute top-[22%] left-[12%] text-[#FFB8C6] text-xs" style={{ animation: 'twinkle 3s ease-in-out infinite' }} aria-hidden="true">&#10022;</span>
          <span className="absolute top-[60%] right-[10%] text-[#A6B4FF] text-base" style={{ animation: 'twinkle 4s ease-in-out infinite 1s' }} aria-hidden="true">&#10022;</span>
          <span className="absolute bottom-[18%] left-[28%] text-[#7EDAB9] text-xs" style={{ animation: 'twinkle 3.5s ease-in-out infinite 1.8s' }} aria-hidden="true">&#10022;</span>
          <span className="absolute top-[15%] right-[26%] text-[#FFD4B8] text-xs" style={{ animation: 'twinkle 4.2s ease-in-out infinite .5s' }} aria-hidden="true">&#10022;</span>
          <div className="max-w-160 mx-auto relative">
            <span className="text-2xl inline-block" style={{ animation: 'floaty 6s ease-in-out infinite' }} aria-hidden="true">&#9789;</span>
            <p className="mt-4 font-serif italic text-lg md:text-xl leading-relaxed">
              &ldquo;I moved across the world because my chart told me to. Sounded unhinged. It worked. Now I help people figure out if that pull they feel is real, before they act on it.&rdquo;
            </p>
            <p className="mt-5 font-semibold">Ashleigh</p>
            <Link
              href="/about"
              className="inline-block mt-1.5 text-sm text-[#B5B0C8] underline underline-offset-2 hover:text-[#FFB8C6] transition-colors"
            >
              Read my story
            </Link>
          </div>
        </section>

        {/* Social Proof */}
        <ReviewsMarquee />
      </main>

      <Footer />
    </div>
  );
}
