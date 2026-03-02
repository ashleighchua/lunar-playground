'use client';

import { useState } from 'react';
import {
  defaultRhythm,
  underPressure,
  regulationCost,
  returnToBalance,
  signalToNotice,
} from '@/lib/emotionalPattern';
import { emotionalPatternInsights } from '@/lib/keyInsights';
import { emotionalPatternQuestions } from '@/lib/reflectionQuestions';

interface EmotionalPatternSectionProps {
  emotionalSign: string; // moonSignName || sunSign.name
}

export function EmotionalPatternSection({ emotionalSign }: EmotionalPatternSectionProps) {
  const [showReflections, setShowReflections] = useState(false);

  const rhythmText = defaultRhythm[emotionalSign] || '';
  const rhythmParagraphs = rhythmText.split('\n\n').filter(Boolean);

  const pressureText = underPressure[emotionalSign] || '';
  const pressureParagraphs = pressureText.split('\n\n').filter(Boolean);

  const costText = regulationCost[emotionalSign] || '';
  const costParagraphs = costText.split('\n\n').filter(Boolean);

  const balanceText = returnToBalance[emotionalSign] || '';
  const balanceParagraphs = balanceText.split('\n\n').filter(Boolean);
  const balanceItems = balanceParagraphs[1]?.split('.').filter(s => s.trim().length > 10).slice(0, 4) || [];

  const signalText = signalToNotice[emotionalSign] || '';
  const signalParagraphs = signalText.split('\n\n').filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#7A746C]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Emotional Pattern in Motion</h2>
          <p className="text-sm text-[#7B7394] leading-relaxed">
            How you process and regulate feeling
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 space-y-6">
        {/* Key Insight Callout */}
        <div className="bg-gradient-to-r from-[#FFB88C]/15 to-[#FFB88C]/5 border-l-4 border-[#FFB88C] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-[#FFB88C] text-lg mt-0.5">&#9889;</span>
            <div>
              <p className="text-xs tracking-wider uppercase text-[#8B7355] mb-2">Key Insight</p>
              <p className="text-[#2D2640] text-sm leading-relaxed font-medium">
                {emotionalPatternInsights[emotionalSign as keyof typeof emotionalPatternInsights] ||
                 "Your emotional patterns are your body's wisdom. Learning their rhythm helps you respond rather than react."}
              </p>
            </div>
          </div>
        </div>

        {/* Your default rhythm */}
        {rhythmText && (
          <div className="bg-[#F0EBF8] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB88C]">&#9835;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">Your default rhythm</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
              {rhythmParagraphs[0]}
            </p>
            {rhythmParagraphs[1] && (
              <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                {rhythmParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* When pressure rises */}
        {pressureText && (
          <div className="bg-[#F5F3F0] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#7A746C]">&#9650;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">When pressure rises</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed mb-4">
              {pressureParagraphs[0]}
            </p>
            {pressureParagraphs[1] && (
              <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                {pressureParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* Cost and Balance - side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {costText && (
            <div className="bg-[#F5EBE8] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#8B6B60]">&#9888;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">The cost of over-regulation</p>
              </div>
              <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
                {costParagraphs[0]}
              </p>
              {costParagraphs[1] && (
                <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                  {costParagraphs[1]}
                </p>
              )}
            </div>
          )}

          {balanceText && (
            <div className="bg-[#EDF4ED] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#4A6B44]">&#8634;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">How you return to balance</p>
              </div>
              <p className="text-[#2D2640] text-sm leading-relaxed mb-4">
                {balanceParagraphs[0]}
              </p>
              {balanceItems.length > 0 && (
                <ul className="space-y-3 mb-4">
                  {balanceItems.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#2D2640]/80 text-sm">
                      <span className="text-[#9CB896] mt-0.5">&middot;</span>
                      <span>{item.trim()}</span>
                    </li>
                  ))}
                </ul>
              )}
              {balanceParagraphs[2] && (
                <p className="text-[#2D2640]/80 text-sm italic">
                  {balanceParagraphs[2]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Anchor box - Signal to notice */}
        {signalText && (
          <div className="bg-[#F0EBF8] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB88C]">&#9673;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">A signal to notice</p>
            </div>
            <p className="font-serif text-lg text-[#2D2640] leading-relaxed mb-2">
              {signalParagraphs[0]}
            </p>
            {signalParagraphs[1] && (
              <p className="text-[#7B7394] text-sm">
                {signalParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* Reflection Questions */}
        {emotionalPatternQuestions[emotionalSign as keyof typeof emotionalPatternQuestions] && (
          <div className="mt-2">
            <button
              onClick={() => setShowReflections(!showReflections)}
              className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] hover:bg-[#F5F3F0] rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#7B7394] group-hover:text-[#2D2640]">&#128221;</span>
                <span className="text-sm text-[#7B7394] group-hover:text-[#2D2640]">Reflect on this</span>
              </div>
              <span className={`text-[#7B7394] transition-transform ${showReflections ? 'rotate-180' : ''}`}>
                &#9660;
              </span>
            </button>
            {showReflections && (
              <div className="mt-3 p-5 bg-[#FAFAF8] rounded-xl space-y-4">
                {emotionalPatternQuestions[emotionalSign as keyof typeof emotionalPatternQuestions].map((question, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#FFB88C] mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <p className="text-[#2D2640]/80 text-sm leading-relaxed italic">{question}</p>
                  </div>
                ))}
                <p className="text-xs text-[#7B7394] pt-2 border-t border-[#2D2640]/5">
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
