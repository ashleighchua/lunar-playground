'use client';

import { useState } from 'react';
import { Star, Pause, Play } from 'lucide-react';
import { reviews, type Review } from '@/data/reviews';

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-80 h-52 shrink-0 flex flex-col bg-[#FAFAFF] border border-[#D6CFE3] rounded-2xl p-6 shadow-glow-gold">
      <div className="flex gap-1 mb-3">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-[#FF8FA3] text-[#FF8FA3]" />
        ))}
      </div>
      <p className="text-sm text-[#5A5472] leading-relaxed italic line-clamp-5">
        &ldquo;{review.text}&rdquo;
      </p>
      <p className="mt-auto pt-3 text-xs text-[#8A8099]">{review.handle} · {review.source}</p>
    </div>
  );
}

export function ReviewsMarquee() {
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const paused = manuallyPaused || hovered;

  return (
    <section className="py-12 md:py-16">
      <div className="container-editorial flex items-center justify-center gap-3 mb-8">
        <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] text-center">What clients say</h2>
        <button
          type="button"
          onClick={() => setManuallyPaused((p) => !p)}
          aria-pressed={manuallyPaused}
          aria-label={manuallyPaused ? 'Play testimonials scroll' : 'Pause testimonials scroll'}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#D6CFE3] text-[#655E78] hover:text-[#2D2640] hover:border-[#2D2640]/30 transition-colors"
        >
          {manuallyPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
        </button>
      </div>
      <div
        role="region"
        aria-label="Client testimonials"
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <div
          className="motion-persist flex items-stretch w-max gap-5 px-5"
          style={{
            animation: 'marquee 55s linear infinite',
            animationPlayState: paused ? 'paused' : 'running',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
          <div className="contents" aria-hidden="true">
            {reviews.map((review) => (
              <ReviewCard key={`dup-${review.id}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
