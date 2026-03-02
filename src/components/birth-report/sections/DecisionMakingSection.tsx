'use client';

import {
  decisionStyle,
  decisionTriggers,
  decisionBlindSpots,
  decisionReframe,
} from '@/lib/decisionMaking';

interface DecisionMakingSectionProps {
  decisionSign: string; // mercurySignName || sunSign.name
}

export function DecisionMakingSection({ decisionSign }: DecisionMakingSectionProps) {
  const styleText = decisionStyle[decisionSign] || '';
  const styleParagraphs = styleText.split('\n\n').filter(Boolean);
  const triggers = decisionTriggers[decisionSign] || [];
  const blindSpotText = decisionBlindSpots[decisionSign] || '';
  const reframeText = decisionReframe[decisionSign] || '';

  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#6B8DAB]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#EEF3F7]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">How You Make Decisions</h2>
          <p className="text-sm text-[#7B7394] leading-relaxed">
            Your natural decision-making style based on Mercury in {decisionSign}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 space-y-6">
        {/* Your decision style */}
        {styleText && (
          <div className="bg-[#F5F8FA] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#6B8DAB]">&#9881;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#5B7B9A]">Your decision style</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
              {styleParagraphs[0]}
            </p>
            {styleParagraphs[1] && (
              <p className="text-[#2D2640]/80 text-sm leading-relaxed italic">
                {styleParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* When to trust your decision */}
        {triggers.length > 0 && (
          <div className="bg-[#EDF4ED] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#4A6B44]">&#10003;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">Trust your decision when</p>
            </div>
            <ul className="space-y-3">
              {triggers.map((trigger, i) => (
                <li key={i} className="flex items-start gap-2 text-[#2D2640]/80 text-sm">
                  <span className="text-[#9CB896] mt-0.5">&middot;</span>
                  <span>{trigger}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Watch out for / Reframe side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blindSpotText && (
            <div className="bg-[#FEF3E8] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#FF8FA3]">&#9888;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#C4365A]">Watch out for</p>
              </div>
              <p className="text-[#2D2640] text-sm leading-relaxed">
                {blindSpotText}
              </p>
            </div>
          )}

          {reframeText && (
            <div className="bg-[#F0EBF8] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#FFB88C]">&#128161;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">A helpful reframe</p>
              </div>
              <p className="text-[#2D2640] text-sm leading-relaxed">
                {reframeText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
