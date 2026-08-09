'use client';

import { useState } from 'react';

export function RevealCard({ glyph, title, text }: { glyph: string; title: string; text: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <button
      onClick={() => setRevealed((r) => !r)}
      className="flex-none w-[200px] min-h-[170px] rounded-[18px] p-[18px] text-left border border-[#F0EBF8]/[0.14] flex flex-col justify-between transition-[background] duration-300"
      style={{
        background: revealed
          ? 'linear-gradient(150deg, #2D2640, #1E1835)'
          : 'rgba(255,255,255,0.045)',
      }}
    >
      <div className="text-2xl text-[#FF8FA3]">{glyph}</div>
      <div>
        <div className="font-serif text-[19px] leading-[1.15] mb-1.5">{title}</div>
        <div className="text-[12.5px] leading-snug text-[#F0EBF8]/65">
          {revealed ? text : 'Tap to reveal …'}
        </div>
      </div>
    </button>
  );
}
