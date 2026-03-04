'use client';

import { useState } from 'react';
import {
  workMotivation,
  ambitionStyle,
  authorityRelationship,
  bestWorkEnvironment,
  burnoutPattern,
  workCheckIn,
} from '@/lib/workStyle';
import { workInsights } from '@/lib/keyInsights';
import { workQuestions } from '@/lib/reflectionQuestions';

interface WorkImpactSectionProps {
  sunSignName: string;
}

export function WorkImpactSection({ sunSignName }: WorkImpactSectionProps) {
  const [showReflections, setShowReflections] = useState(false);

  const motivationText = workMotivation[sunSignName] || '';
  const motivationParagraphs = motivationText.split('\n\n').filter(Boolean);

  const ambitionText = ambitionStyle[sunSignName] || '';
  const ambitionParagraphs = ambitionText.split('\n\n').filter(Boolean);

  const authorityText = authorityRelationship[sunSignName] || '';
  const authorityParagraphs = authorityText.split('\n\n').filter(Boolean);

  const environmentText = bestWorkEnvironment[sunSignName] || '';
  const environmentParagraphs = environmentText.split('\n\n').filter(Boolean);

  const burnoutText = burnoutPattern[sunSignName] || '';
  const burnoutParagraphs = burnoutText.split('\n\n').filter(Boolean);
  const burnoutSignals = burnoutText.match(/• ([^\n]+)/g)?.map(s => s.replace('• ', '')) || [];

  const checkInText = workCheckIn[sunSignName] || '';
  const checkInParagraphs = checkInText.split('\n\n').filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#7A746C]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Work and Impact Style</h2>
          <p className="text-sm text-[#655E78] leading-relaxed">
            How you engage with contribution, authority, and effort
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 space-y-6">
        {/* Key Insight Callout */}
        <div className="bg-gradient-to-r from-[#FF8FA3]/10 to-[#FF8FA3]/5 border-l-4 border-[#FF8FA3] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-[#FF8FA3] text-lg mt-0.5">&#9889;</span>
            <div>
              <p className="text-xs tracking-wider uppercase text-[#C4365A] mb-2">Key Insight</p>
              <p className="text-[#2D2640] text-sm leading-relaxed font-medium">
                {workInsights[sunSignName as keyof typeof workInsights] ||
                 "Your work style reflects your core identity. The goal isn't to change it, but to find environments where it thrives."}
              </p>
            </div>
          </div>
        </div>

        {/* What motivates you */}
        {motivationText && (
          <div className="bg-[#F0EBF8] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FF8FA3]">&#9733;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">What motivates you</p>
            </div>
            <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">{motivationParagraphs[0]}</p>
            {motivationParagraphs[1] && <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">{motivationParagraphs[1]}</p>}
            {motivationParagraphs[2] && <p className="text-[#2D2640]/80 text-sm leading-relaxed italic">{motivationParagraphs[2]}</p>}
          </div>
        )}

        {/* How ambition shows up */}
        {ambitionText && (
          <div className="bg-[#F0EBF8] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#8A8099]">&#10138;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">How ambition shows up</p>
            </div>
            <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">{ambitionParagraphs[0]}</p>
            {ambitionParagraphs[1] && <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">{ambitionParagraphs[1]}</p>}
            {ambitionParagraphs[2] && <p className="text-[#2D2640]/80 text-sm leading-relaxed italic">{ambitionParagraphs[2]}</p>}
          </div>
        )}

        {/* Your relationship with authority */}
        {authorityText && (
          <div className="bg-[#F5F3F0] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#7A746C]">&#9830;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">Your relationship with authority</p>
            </div>
            <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">{authorityParagraphs[0]}</p>
            {authorityParagraphs[1] && <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">{authorityParagraphs[1]}</p>}
            {authorityParagraphs[2] && <p className="text-[#2D2640]/80 text-sm italic">{authorityParagraphs[2]}</p>}
          </div>
        )}

        {/* Best Work and Burnout - side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {environmentText && (
            <div className="bg-[#EDF4ED] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#4A6B44]">&#9788;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">Where you do your best work</p>
              </div>
              <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">{environmentParagraphs[0]}</p>
              {environmentParagraphs[1] && <p className="text-[#2D2640]/80 text-sm leading-relaxed">{environmentParagraphs[1]}</p>}
            </div>
          )}

          {burnoutText && (
            <div className="bg-[#F5EBE8] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#8B6B60]">&#9888;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">How burnout develops for you</p>
              </div>
              <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-4">{burnoutParagraphs[0]}</p>
              {burnoutSignals.length > 0 && (
                <ul className="space-y-3 mb-4">
                  {burnoutSignals.slice(0, 4).map((signal, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#2D2640]/80 text-sm">
                      <span className="text-[#D4B8A4] mt-0.5">&middot;</span>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              )}
              {burnoutParagraphs[2] && <p className="text-[#2D2640]/80 text-sm leading-relaxed">{burnoutParagraphs[2]}</p>}
            </div>
          )}
        </div>

        {/* Anchor box - Check-in */}
        {checkInText && (
          <div className="bg-[#F0EBE3] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#FF8FA3] mt-2 animate-pulse" />
              <div>
                <p className="text-xs tracking-wider uppercase text-[#655E78] mb-3">A useful check-in</p>
                <p className="font-serif text-lg text-[#2D2640] leading-relaxed mb-2">{checkInParagraphs[0]}</p>
                {checkInParagraphs[1] && <p className="text-[#655E78] text-sm">{checkInParagraphs[1]}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Reflection Questions */}
        {workQuestions[sunSignName as keyof typeof workQuestions] && (
          <div className="mt-2">
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
                {workQuestions[sunSignName as keyof typeof workQuestions].map((question, i) => (
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
