'use client';

import { useState } from 'react';
import { BigThreeTriangle } from '@/components/BigThreeTriangle';
import { SunIcon, MoonIcon, RisingIcon } from '@/components/icons/ZodiacIcons';
import {
  sunOrientation,
  moonProcessing,
  risingPresentation,
  generateCentralTension,
  generateDayToDay,
} from '@/lib/operatingSystem';
import { operatingSystemInsights } from '@/lib/keyInsights';
import { operatingSystemQuestions } from '@/lib/reflectionQuestions';
import type { ZodiacSign } from '@/lib/moon';

interface OperatingSystemSectionProps {
  sunSign: ZodiacSign;
  moonSignName: string | null;
  risingSignName: string | null;
}

export function OperatingSystemSection({ sunSign, moonSignName, risingSignName }: OperatingSystemSectionProps) {
  const [hoveredBigThree, setHoveredBigThree] = useState<'sun' | 'moon' | 'rising' | null>(null);
  const [showReflections, setShowReflections] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#7A746C]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Your Operating System</h2>
          <p className="text-sm text-[#655E78] leading-relaxed">
            The three lenses that shape how you experience life
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0">
        {/* Big Three Triangle Visualization */}
        <div className="mb-8 flex justify-center">
          <BigThreeTriangle
            sunSign={sunSign?.name}
            moonSign={moonSignName}
            risingSign={risingSignName}
            className="w-full max-w-lg"
            hoveredNode={hoveredBigThree}
            onNodeHover={setHoveredBigThree}
          />
        </div>

        {/* Big Three - Color-coded descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Sun */}
          {sunSign && (
            <div
              className={`rounded-xl p-5 transition-all duration-200 cursor-pointer border ${
                hoveredBigThree === 'sun'
                  ? 'bg-[#F5D89A] border-[#F5D89A]'
                  : 'bg-white border-[#2D2640]/5 hover:bg-[#F5D89A]/50 hover:border-[#F5D89A]/50'
              }`}
              onMouseEnter={() => setHoveredBigThree('sun')}
              onMouseLeave={() => setHoveredBigThree(null)}
            >
              <div className="flex items-center gap-2 mb-3">
                <SunIcon size={18} className="text-[--sun-glyph]" />
                <span className="text-xs tracking-wide uppercase text-[--sun-glyph]/70">Sun</span>
                <span className="text-[--sun-glyph]/40">&middot;</span>
                <span className="font-serif text-[--sun-glyph]">{sunSign.name}</span>
              </div>
              <p className="text-sm text-[#655E78] mb-2">Your core identity</p>
              {sunOrientation[sunSign.name] && (
                <p className="text-[#2D2640]/80 text-sm leading-relaxed">{sunOrientation[sunSign.name]}</p>
              )}
            </div>
          )}

          {/* Moon */}
          {moonSignName ? (
            <div
              className={`rounded-xl p-5 transition-all duration-200 cursor-pointer border ${
                hoveredBigThree === 'moon'
                  ? 'bg-[#E4D6CC] border-[#E4D6CC]'
                  : 'bg-white border-[#2D2640]/5 hover:bg-[#E4D6CC]/50 hover:border-[#E4D6CC]/50'
              }`}
              onMouseEnter={() => setHoveredBigThree('moon')}
              onMouseLeave={() => setHoveredBigThree(null)}
            >
              <div className="flex items-center gap-2 mb-3">
                <MoonIcon size={18} className="text-[--moon-glyph]" />
                <span className="text-xs tracking-wide uppercase text-[--moon-glyph]/70">Moon</span>
                <span className="text-[--moon-glyph]/40">&middot;</span>
                <span className="font-serif text-[--moon-glyph]">{moonSignName}</span>
              </div>
              <p className="text-sm text-[#655E78] mb-2">Your inner world</p>
              {moonProcessing[moonSignName] && (
                <p className="text-[#2D2640]/80 text-sm leading-relaxed">{moonProcessing[moonSignName]}</p>
              )}
            </div>
          ) : (
            <div className="bg-[#FAFAF8] rounded-xl p-5 border border-[#2D2640]/5">
              <div className="flex items-center gap-2 mb-3">
                <MoonIcon size={18} className="text-[--moon-glyph]/40" />
                <span className="text-xs tracking-wide uppercase text-[--moon-glyph]/40">Moon</span>
              </div>
              <p className="text-sm text-[#655E78]/60">Requires birth time and place</p>
            </div>
          )}

          {/* Rising */}
          {risingSignName ? (
            <div
              className={`rounded-xl p-5 transition-all duration-200 cursor-pointer border ${
                hoveredBigThree === 'rising'
                  ? 'bg-[#D8E0D2] border-[#D8E0D2]'
                  : 'bg-white border-[#2D2640]/5 hover:bg-[#D8E0D2]/50 hover:border-[#D8E0D2]/50'
              }`}
              onMouseEnter={() => setHoveredBigThree('rising')}
              onMouseLeave={() => setHoveredBigThree(null)}
            >
              <div className="flex items-center gap-2 mb-3">
                <RisingIcon size={18} className="text-[--rising-glyph]" />
                <span className="text-xs tracking-wide uppercase text-[--rising-glyph]/70">Rising</span>
                <span className="text-[--rising-glyph]/40">&middot;</span>
                <span className="font-serif text-[--rising-glyph]">{risingSignName}</span>
              </div>
              <p className="text-sm text-[#655E78] mb-2">How others see you</p>
              {risingPresentation[risingSignName] && (
                <p className="text-[#2D2640]/80 text-sm leading-relaxed">{risingPresentation[risingSignName]}</p>
              )}
            </div>
          ) : (
            <div className="bg-[#FAFAF8] rounded-xl p-5 border border-[#2D2640]/5">
              <div className="flex items-center gap-2 mb-3">
                <RisingIcon size={18} className="text-[--rising-glyph]/40" />
                <span className="text-xs tracking-wide uppercase text-[--rising-glyph]/40">Rising</span>
              </div>
              <p className="text-sm text-[#655E78]/60">Requires birth time and place</p>
            </div>
          )}
        </div>

        {/* Key Insight Callout */}
        <div className="mb-6 bg-gradient-to-r from-[#FF8FA3]/10 to-[#FF8FA3]/5 border-l-4 border-[#FF8FA3] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-[#FF8FA3] text-lg mt-0.5">&#9889;</span>
            <div>
              <p className="text-xs tracking-wider uppercase text-[#C4365A] mb-2">Key Insight</p>
              <p className="text-[#2D2640] text-sm leading-relaxed font-medium">
                {moonSignName && operatingSystemInsights[sunSign.name]?.[moonSignName]
                  ? operatingSystemInsights[sunSign.name][moonSignName]
                  : `Your ${sunSign.name} Sun is your foundation, the core of who you're becoming. Everything else in your chart dances around this center.`}
              </p>
            </div>
          </div>
        </div>

        {/* The tension section */}
        <div className="space-y-6">
          <div className="bg-[#F5F3F0] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#8A8099]">&#9878;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">The tension you carry</p>
            </div>
            <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-5">
              {generateCentralTension(sunSign.name, moonSignName, risingSignName)}
            </p>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#8A8099]">&#10147;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">You&apos;ll notice this pattern when</p>
            </div>
            <ul className="space-y-2">
              {generateDayToDay(sunSign.name, moonSignName).split('\n\u2022 ').filter(Boolean).slice(0, 4).map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-[#2D2640]/80 text-sm">
                  <span className="text-[#8A8099] mt-0.5">&middot;</span>
                  <span>{item.replace('\u2022 ', '')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reflection Questions */}
        {operatingSystemQuestions[sunSign.name as keyof typeof operatingSystemQuestions] && (
          <div className="mt-6">
            <button
              onClick={() => setShowReflections(!showReflections)}
              className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] hover:bg-[#F5F3F0] rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#655E78] group-hover:text-[#2D2640]">&#128221;</span>
                <span className="text-sm text-[#655E78] group-hover:text-[#2D2640]">Reflect on this</span>
              </div>
              <span className={`text-[#655E78] transition-transform ${showReflections ? 'rotate-180' : ''}`}>
                &#9660;
              </span>
            </button>
            {showReflections && (
              <div className="mt-3 p-5 bg-[#FAFAF8] rounded-xl space-y-4">
                {operatingSystemQuestions[sunSign.name as keyof typeof operatingSystemQuestions].map((question, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#FF8FA3] mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <p className="text-[#2D2640]/80 text-sm leading-relaxed italic">{question}</p>
                  </div>
                ))}
                <p className="text-xs text-[#655E78] pt-2 border-t border-[#2D2640]/5">
                  Take a moment to journal or simply sit with these questions.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
