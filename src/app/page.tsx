import Link from 'next/link';
import { Star } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HomeBirthForm } from '@/components/HomeBirthForm';
import { ImagineCards } from '@/components/ImagineCards';
import { SystemConstellation } from '@/components/SystemConstellation';
import { featuredReviews } from '@/data/reviews';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation currentPage="explore" />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-editorial pt-12 pb-8 md:pt-20 md:pb-12">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4">Six Systems. One Complete Picture.</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D2640] leading-[1.1] tracking-tight">
              <span className="text-gradient-gold">Stop guessing who you are.</span>
            </h1>
            <p className="mt-6 text-lg text-[#655E78] leading-relaxed max-w-lg mx-auto">
              Your birth date already has the answers. This is where you find them.
            </p>
          </div>
        </section>

        {/* Client island: Birth form + tools grid */}
        <HomeBirthForm />

        {/* Divider */}
        <div className="container-editorial">
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* "Imagine Knowing" - Tarot Flip Cards */}
        <ImagineCards />

        {/* Divider */}
        <div className="container-editorial">
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* How It All Connects */}
        <SystemConstellation />

        {/* Divider */}
        <div className="container-editorial">
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* About Teaser */}
        <section className="container-editorial py-12 md:py-16">
          <div className="max-w-xl mx-auto text-center">
            <p className="text-lg text-[#655E78] leading-relaxed italic mb-6">
              &ldquo;I moved to the other side of the world because my astrocartography said to. I left a career that looked perfect on paper because my BaZi said the timing was right. It all sounded unhinged. Until it worked. Now I read charts for people who are ready to trust what the data is telling them.&rdquo;
            </p>
            <p className="font-serif text-[#2D2640] mb-4">Ashleigh</p>
            <Link
              href="/about"
              className="text-xs text-[#655E78] hover:text-[#2D2640] transition-colors underline underline-offset-2"
            >
              Read my story
            </Link>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="divider-mystic">
            <span className="divider-star">&#10022; &#10022; &#10022;</span>
          </div>
        </div>

        {/* Social Proof */}
        <section className="container-editorial py-12 md:py-16">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] text-center mb-8">What clients say</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {featuredReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-2xl border border-[#2D2640]/5 p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#FF8FA3] text-[#FF8FA3]" />
                  ))}
                </div>
                <p className="text-sm text-[#655E78] leading-relaxed italic">
                  &ldquo;{review.text}&rdquo;
                </p>
                <p className="mt-3 text-xs text-[#8A8099]">{review.source}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
