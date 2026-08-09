import Link from 'next/link';
import { Star } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { reviews } from '@/data/reviews';

export const metadata = {
  title: 'Client Reviews | The Lunar Playground',
  description: 'Read what our clients say about their astrocartography and natal chart readings.',
};

const reviewJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'The Lunar Playground',
  url: 'https://thelunarplayground.com',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: String(reviews.length),
    bestRating: '5',
    worstRating: '1',
  },
  review: reviews.map((r) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: String(r.rating),
      bestRating: '5',
    },
    reviewBody: r.text,
    author: {
      '@type': 'Person',
      name: r.handle,
    },
  })),
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <Navigation currentPage="reviews" />

      {/* Hero */}
      <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="max-w-2xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-[#FF8FA3]/15 text-[#C4365A] text-xs tracking-wider uppercase rounded-full mb-4">
            Verified Reviews
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] mb-4">
            What our clients say
          </h1>
          <p className="text-[#655E78] leading-relaxed">
            Real feedback from real readings. All reviews are from verified Fiverr clients.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2D2640]/10" />
      </div>

      {/* Reviews Grid */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-[#2D2640]/5 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF8FA3] text-[#FF8FA3]" />
                ))}
              </div>
              <p className="text-[#2D2640] leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-xs text-[#655E78]">
                {review.handle} · Verified {review.source} client
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2D2640]/10" />
      </div>

      {/* CTA */}
      <section className="container-editorial py-16 md:py-24">
        <div className="bg-[#2D2640] rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-[#F0EBF8] mb-4">
            Ready for your reading?
          </h2>
          <p className="text-[#F0EBF8]/60 mb-8 max-w-md mx-auto">
            Get a personalized astrocartography or natal chart reading and discover insights about yourself.
          </p>
          <Link
            href="/shop"
            className="inline-block px-8 py-3.5 bg-[#FF8FA3] text-[#2D2640] font-medium rounded-lg hover:bg-[#C49A3F] transition-colors"
          >
            View readings
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
