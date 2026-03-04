'use client';

import { useState } from 'react';
import Image from 'next/image';

const systems = [
  {
    name: 'Astrology',
    label: 'The Who',
    image: '/Images/icon-astrology.png',
    color: '#FF8FA3',
    bg: '#FFF0F3',
    description: 'Your personality, your drives, the stuff that makes you annoyingly you.',
  },
  {
    name: 'BaZi',
    label: 'The When',
    image: '/Images/icon-bazi.png',
    color: '#4A7A42',
    bg: '#F0F7EE',
    description: 'Your timing, your seasons, when to push and when to wait.',
  },
  {
    name: 'Human Design',
    label: 'The How',
    image: '/Images/icon-human-design.png',
    color: '#7B42B0',
    bg: '#F8EEFF',
    description: 'How you\u2019re wired to make decisions (and why you keep ignoring it).',
  },
  {
    name: 'Relocation',
    label: 'The Where',
    image: '/Images/icon-relocation.png',
    color: '#3A8A66',
    bg: '#EDFAF4',
    description: 'Where on earth your chart actually lights up.',
  },
];

export function SystemConstellation() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section className="container-editorial py-12 md:py-16">
      <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] text-center mb-10">
        How it all connects
      </h2>

      {/* 4-column grid with constellation lines */}
      <div className="relative max-w-xl mx-auto">
        {/* SVG constellation lines connecting all icons */}
        <svg
          className="absolute inset-0 w-full pointer-events-none"
          style={{ height: '96px' }}
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
        >
          {/* Lines between all 4 nodes: positions at 12.5%, 37.5%, 62.5%, 87.5% */}
          {/* Adjacent connections */}
          <line x1="12.5" y1="10" x2="37.5" y2="10" stroke="#C9C0D8" strokeWidth="0.4" />
          <line x1="37.5" y1="10" x2="62.5" y2="10" stroke="#C9C0D8" strokeWidth="0.4" />
          <line x1="62.5" y1="10" x2="87.5" y2="10" stroke="#C9C0D8" strokeWidth="0.4" />
          {/* Cross connections */}
          <line x1="12.5" y1="10" x2="62.5" y2="10" stroke="#C9C0D8" strokeWidth="0.25" strokeDasharray="1 0.8" />
          <line x1="37.5" y1="10" x2="87.5" y2="10" stroke="#C9C0D8" strokeWidth="0.25" strokeDasharray="1 0.8" />
          <line x1="12.5" y1="10" x2="87.5" y2="10" stroke="#C9C0D8" strokeWidth="0.15" strokeDasharray="0.6 1" />
          {/* Node dots */}
          <circle cx="12.5" cy="10" r="0.8" fill="#D6CFE3" />
          <circle cx="37.5" cy="10" r="0.8" fill="#D6CFE3" />
          <circle cx="62.5" cy="10" r="0.8" fill="#D6CFE3" />
          <circle cx="87.5" cy="10" r="0.8" fill="#D6CFE3" />
        </svg>

        <div className="grid grid-cols-4 gap-2 md:gap-4">
          {systems.map((system, i) => (
            <button
              key={system.name}
              onClick={() => setActive(active === i ? null : i)}
              className="flex flex-col items-center group cursor-pointer relative z-10"
            >
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 overflow-hidden ring-2 ring-[#D6CFE3]/50"
                style={{
                  backgroundColor: system.bg,
                  boxShadow: active === i ? `0 0 24px ${system.color}40` : '0 2px 12px rgba(45,38,64,0.06)',
                }}
              >
                <Image src={system.image} alt={system.name} width={80} height={80} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
              </div>
              <p
                className="font-serif text-base md:text-lg mt-4 transition-colors duration-300"
                style={{ color: active === i ? system.color : '#2D2640' }}
              >
                {system.name}
              </p>
              <p className="text-xs text-[#655E78] mt-1 tracking-wide">
                {system.label}
              </p>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{
                  maxHeight: active === i ? '100px' : '0',
                  opacity: active === i ? 1 : 0,
                }}
              >
                <p className="mt-2 text-xs md:text-sm text-[#655E78] leading-relaxed italic">
                  {system.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Closing line */}
      <div className="mt-10 text-center">
        <p className="font-serif text-xl md:text-2xl text-[#2D2640]">
          I read them together.
        </p>
        <p className="mt-3 text-sm text-[#655E78]">
          Each one catches something the others miss.
        </p>
      </div>
    </section>
  );
}
