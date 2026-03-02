'use client';

import { useState } from 'react';
import Image from 'next/image';

const insights = [
  { image: '/Images/card-sun.png', label: 'Location', text: 'Exactly why certain cities light you up and others drain you' },
  { image: '/Images/card-vase.png', label: 'Career', text: 'The career path that actually fits your energy, not someone else\'s template' },
  { image: '/Images/card-moon.png', label: 'Timing', text: 'When to push forward and when to wait (and trusting the timing)' },
  { image: '/Images/card-crystal.png', label: 'Patterns', text: 'Why that relationship pattern keeps repeating, and how to break it' },
  { image: '/Images/card-star.png', label: 'Strengths', text: 'The strengths you\'ve been overlooking because nobody showed you the map' },
];

function TarotCard({ card }: { card: typeof insights[0] }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      onClick={() => setRevealed((r) => !r)}
      className="relative w-[140px] h-[210px] md:w-[160px] md:h-[240px] lg:w-[180px] lg:h-[270px] rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 focus:outline-none"
    >
      {/* Card image (front) */}
      <Image
        src={card.image}
        alt={card.label}
        fill
        className="object-cover transition-opacity duration-500"
        style={{ opacity: revealed ? 0.15 : 1 }}
        sizes="180px"
      />

      {/* Revealed text overlay */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-4 transition-opacity duration-500"
        style={{
          opacity: revealed ? 1 : 0,
          background: revealed ? 'rgba(45, 38, 64, 0.85)' : 'transparent',
        }}
      >
        <span className="text-lg mb-3" style={{ color: '#FF8FA3' }}>&#10022;</span>
        <p className="font-serif text-sm md:text-base leading-relaxed text-center" style={{ color: '#F0EBF8' }}>
          {card.text}
        </p>
      </div>
    </button>
  );
}

export function ImagineCards() {
  return (
    <section className="container-editorial py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl" style={{ color: '#2D2640' }}>
          Imagine knowing...
        </h2>
        <p className="mt-3 text-sm" style={{ color: '#7B7394' }}>Tap a card to reveal</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-4xl mx-auto">
        {insights.map((card, i) => (
          <TarotCard key={i} card={card} />
        ))}
      </div>
    </section>
  );
}
