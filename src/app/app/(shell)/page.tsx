'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadBirthData } from '@/lib/birthData';
import { getBigThree, type BigThree } from '@/lib/bigThree';
import { BigThreeChips } from '@/components/app/BigThreeChips';
import { SkyTonightCard } from '@/components/app/SkyTonightCard';
import { RevealCard } from '@/components/app/RevealCard';

const PAIN_CARDS = [
  { glyph: '☉', title: 'Should I move?', text: 'Some places make you feel like yourself. Others slowly drain you. We can tell you which is which before you pack a box.' },
  { glyph: '☾', title: 'Why do I feel stuck?', text: 'Real talk, it might not be you. It might be where you are.' },
  { glyph: '✦', title: 'Tokyo vs. London', text: "Not random. Different places bring out different sides of you. We'll show you why." },
  { glyph: '♡', title: 'Same relationship', text: "There's a pattern. Once you see it, you can actually break it." },
  { glyph: '⚙', title: 'Wrong job, every time', text: "Some work fits how you're built. Some really doesn't. We'll show you which." },
];

function greeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning.';
  if (hour < 18) return 'Good afternoon.';
  return 'Good evening.';
}

function todayLabel(): string {
  return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export default function AppHomePage() {
  const [bigThree, setBigThree] = useState<BigThree | null>(null);

  useEffect(() => {
    const stored = loadBirthData();
    if (!stored) return;
    getBigThree(stored).then(setBigThree);
  }, []);

  return (
    <div className="px-5.5 pt-20 pb-30 flex flex-col gap-5">
      <div>
        <div className="text-[11px] tracking-[0.22em] uppercase text-[#FF8FA3] mb-1.5">{todayLabel()}</div>
        <div className="font-serif text-[34px] font-medium leading-[1.05]">{greeting()}</div>
      </div>

      <SkyTonightCard />

      <BigThreeChips bigThree={bigThree} />

      <Link
        href="/app/readings/relocation"
        className="rounded-[22px] p-6 relative overflow-hidden block"
        style={{
          background: 'linear-gradient(140deg, #2D2640 0%, #1E1835 55%, #1E1835 100%)',
          border: '1px solid rgba(255,143,163,0.35)',
        }}
      >
        <div
          className="text-[10.5px] tracking-[0.16em] uppercase text-[#FF8FA3] inline-block px-2.5 py-1.5 rounded-full"
          style={{ background: 'rgba(255,143,163,0.12)' }}
        >
          Most popular · $35
        </div>
        <div className="font-serif text-[27px] leading-[1.1] mt-3.5 mb-2">
          Where would you<br />actually thrive?
        </div>
        <div className="text-[13.5px] text-[#F0EBF8]/60 leading-relaxed mb-4">
          Your birth chart, mapped across the globe. Some cities light you up. Others drain you.
        </div>
        <div className="text-[#FF8FA3] text-sm font-medium">See your lines →</div>
      </Link>

      <div>
        <div className="font-serif text-[23px] mb-1">Sound familiar?</div>
        <div className="text-xs text-[#F0EBF8]/45 mb-3">Tap a card to reveal</div>
        <div className="flex gap-3 overflow-x-auto -mx-5.5 px-5.5 pb-1.5">
          {PAIN_CARDS.map((card) => (
            <RevealCard key={card.title} {...card} />
          ))}
        </div>
      </div>

      <div className="rounded-[18px] border border-[#F0EBF8]/10 bg-white/4 px-5 py-4.5">
        <div className="font-serif italic text-[18px] leading-relaxed text-[#F0EBF8]/85">
          &ldquo;I moved across the world because my chart told me to. Sounded unhinged. It worked.&rdquo;
        </div>
        <div className="text-xs text-[#F0EBF8]/50 mt-2">
          — Ashleigh, your reader ·{' '}
          <Link href="/about" className="text-[#FF8FA3]">Read my story</Link>
        </div>
      </div>
    </div>
  );
}
