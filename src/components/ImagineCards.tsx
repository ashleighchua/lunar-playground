'use client';

import { useState } from 'react';

const insights = [
  { title: 'Should I move?', icon: '☉', ring: '#FFB8C6', fill: '#FFF0F3', body: 'Some places make you feel like yourself. Others slowly drain you. We can tell you which is which before you pack a box.' },
  { title: 'Why do I feel stuck?', icon: '⚱', ring: '#C4BCD4', fill: '#EBE6F2', body: 'Real talk, it might not be you. It might be where you are.' },
  { title: 'Tokyo vs. London', icon: '☾', ring: '#A6B4FF', fill: '#E8EDF8', body: 'Not random. Different places bring out different sides of you. We’ll show you why.' },
  { title: 'Same relationship', icon: '♡', ring: '#FFD4B8', fill: '#FFF3EB', body: 'There’s a pattern. Once you see it, you can actually break it.' },
  { title: 'Wrong job, every time', icon: '✦', ring: '#B8E8D4', fill: '#EDFAF4', body: 'Some work fits how you’re built. Some really doesn’t. We’ll show you which.' },
];

function FlipCard({ card }: { card: typeof insights[0] }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      onClick={() => setRevealed((r) => !r)}
      aria-pressed={revealed}
      aria-label={`${card.title}, tap to reveal`}
      className="w-55 min-h-50 px-4.5 py-6 rounded-[20px] flex flex-col items-center justify-center gap-2.5 text-center transition-all duration-300 focus:outline-none"
      style={{
        background: revealed ? card.fill : '#FAFAFF',
        border: `1px solid ${card.ring}`,
        boxShadow: revealed ? '0 8px 28px -8px rgba(45, 38, 64, 0.22)' : '0 4px 16px -4px rgba(45, 38, 64, 0.08)',
        transform: revealed ? 'translateY(-4px)' : 'none',
      }}
    >
      <span className="text-[22px]">{revealed ? '✦' : card.icon}</span>
      <span className="font-serif text-lg font-medium leading-snug text-[#2D2640]">{card.title}</span>
      <span className="text-sm leading-relaxed" style={{ color: revealed ? '#5A5472' : '#8A8099' }}>
        {revealed ? card.body : 'Tap to reveal'}
      </span>
    </button>
  );
}

export function ImagineCards() {
  return (
    <section id="familiar" className="container-editorial py-12 md:py-16">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl md:text-4xl" style={{ color: '#2D2640' }}>
          Sound familiar?
        </h2>
        <p className="mt-3 text-sm" style={{ color: '#655E78' }}>Tap a card to reveal</p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-5 max-w-4xl mx-auto">
        {insights.map((card, i) => (
          <FlipCard key={i} card={card} />
        ))}
      </div>
    </section>
  );
}
