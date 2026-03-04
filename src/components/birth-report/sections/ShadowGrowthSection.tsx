'use client';

import { useState } from 'react';
import {
  recurringFriction,
  patternInMotion,
  internalContradiction,
  blindSpot,
  growthInPractice,
  relevanceCue,
} from '@/lib/shadowGrowth';
import { shadowInsights } from '@/lib/keyInsights';
import { shadowQuestions } from '@/lib/reflectionQuestions';

interface ShadowGrowthSectionProps {
  sunSignName: string;
}

export function ShadowGrowthSection({ sunSignName }: ShadowGrowthSectionProps) {
  const [showReflections, setShowReflections] = useState(false);

  const frictionText = recurringFriction[sunSignName] || '';
  const frictionParagraphs = frictionText.split('\n\n').filter(Boolean);

  const patternText = patternInMotion[sunSignName] || '';
  const triggerMatch = patternText.match(/\*\*Trigger\*\*\n([^\n]+)/);
  const moveMatch = patternText.match(/\*\*Automatic move\*\*\n([^\n]+)/);
  const reliefMatch = patternText.match(/\*\*Short-term relief\*\*\n([^\n]+)/);
  const costMatch = patternText.match(/\*\*Long-term cost\*\*\n([^\n]+)/);
  const closingMatch = patternText.match(/This is not[^.]+\. It's self-protection through ([^.]+)/);
  const selfProtectionType = closingMatch ? closingMatch[1] : '';

  const contradictionText = internalContradiction[sunSignName] || '';
  const contradictionParagraphs = contradictionText.split('\n\n').filter(Boolean);

  const blindSpotText = blindSpot[sunSignName] || '';
  const blindSpotParagraphs = blindSpotText.split('\n\n').filter(Boolean);

  const growthText = growthInPractice[sunSignName] || '';
  const growthParagraphs = growthText.split('\n\n').filter(Boolean);
  const growthBullets = growthText.match(/• ([^\n]+)/g)?.map(s => s.replace('• ', '')) || [];
  const growthClosing = growthParagraphs[growthParagraphs.length - 1];

  const relevanceText = relevanceCue[sunSignName] || '';
  const relevanceParagraphs = relevanceText.split('\n\n').filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#7A746C]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Shadow and Growth Edge</h2>
          <p className="text-sm text-[#655E78] leading-relaxed">
            The pattern that shows up under pressure, and the path through it
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 space-y-6">
        {/* Key Insight Callout */}
        <div className="bg-gradient-to-r from-[#7A746C]/10 to-[#7A746C]/5 border-l-4 border-[#7A746C] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-[#7A746C] text-lg mt-0.5">&#9889;</span>
            <div>
              <p className="text-xs tracking-wider uppercase text-[#5A5E64] mb-2">Key Insight</p>
              <p className="text-[#2D2640] text-sm leading-relaxed font-medium">
                {shadowInsights[sunSignName as keyof typeof shadowInsights] ||
                 "Your shadow isn't something to eliminate. It's something to understand. When you know your triggers, you can choose your response."}
              </p>
            </div>
          </div>
        </div>

        {/* Recurring Friction */}
        {frictionText && (
          <div className="bg-[#F0EBF8] rounded-xl p-5">
            <p className="text-xs tracking-wider uppercase text-[#655E78] mb-3">The recurring friction</p>
            <p className="font-serif text-lg text-[#2D2640] text-sm leading-relaxed mb-3">{frictionParagraphs[0]}</p>
            {frictionParagraphs[1] && (
              <div className="space-y-1 text-[#2D2640]/80">
                {frictionParagraphs[1].split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
              </div>
            )}
            {frictionParagraphs[2] && (
              <p className="text-[#655E78] leading-relaxed mt-3 text-sm italic">{frictionParagraphs[2]}</p>
            )}
          </div>
        )}

        {/* Pattern in Motion - 4-step flow */}
        {patternText && (
          <div className="bg-[#F5F3F0] rounded-xl p-5">
            <p className="text-xs tracking-wider uppercase text-[#7A746C] mb-4">The pattern in motion</p>
            <div className="space-y-4">
              {triggerMatch && (
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#E4CCC4] flex items-center justify-center text-xs text-[#8B6B60] font-medium flex-shrink-0">1</span>
                  <div>
                    <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Trigger</p>
                    <p className="text-[#2D2640]/80">{triggerMatch[1]}</p>
                  </div>
                </div>
              )}
              {moveMatch && (
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#D4B8A4] flex items-center justify-center text-xs text-[#8B5A3C] font-medium flex-shrink-0">2</span>
                  <div>
                    <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Automatic move</p>
                    <p className="text-[#2D2640]/80">{moveMatch[1]}</p>
                  </div>
                </div>
              )}
              {reliefMatch && (
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#D8E0D2] flex items-center justify-center text-xs text-[#4A6B44] font-medium flex-shrink-0">3</span>
                  <div>
                    <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Short-term relief</p>
                    <p className="text-[#2D2640]/80">{reliefMatch[1]}</p>
                  </div>
                </div>
              )}
              {costMatch && (
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#C4C8CC] flex items-center justify-center text-xs text-[#5A5E64] font-medium flex-shrink-0">4</span>
                  <div>
                    <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Long-term cost</p>
                    <p className="text-[#2D2640]/80">{costMatch[1]}</p>
                  </div>
                </div>
              )}
            </div>
            {selfProtectionType && (
              <div className="mt-4 pt-4 border-t border-[#D7D0C6]">
                <p className="text-[#655E78] text-sm italic">
                  This is self-protection through <span className="text-[#2D2640] font-medium">{selfProtectionType}</span>.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Internal Contradiction */}
        {contradictionText && (
          <div className="rounded-xl p-5 border border-dashed border-[#D7D0C6] bg-[#FAFAF8]">
            <p className="text-xs tracking-wider uppercase text-[#7A746C] mb-3">The internal contradiction</p>
            {contradictionParagraphs.slice(0, 2).map((para, i) => (
              <p key={i} className="text-[#2D2640]/80 leading-relaxed mb-2">{para}</p>
            ))}
            {contradictionParagraphs[2] && (
              <div className="mt-3 pt-3 border-t border-[#D7D0C6]/50">
                <p className="text-[#655E78] text-sm">{contradictionParagraphs[2]}</p>
                {contradictionParagraphs[3] && (
                  <p className="text-[#2D2640]/80 text-sm mt-2 italic">{contradictionParagraphs[3]}</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Blind Spot and Growth - side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blindSpotText && (
            <div className="bg-[#F5EBE8] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-[#8B6B60] text-sm mt-1">{'\u26A0'}</span>
                <div className="flex-1">
                  <p className="text-xs tracking-wider uppercase text-[#8B6B60] mb-3">The blind spot to watch</p>
                  <p className="text-[#2D2640] font-medium text-sm leading-relaxed mb-3">{blindSpotParagraphs[0]}</p>
                  {blindSpotParagraphs[1] && (
                    <div className="space-y-1 text-[#655E78] text-sm">
                      {blindSpotParagraphs[1].split('\n').filter(Boolean).map((line, i) => <p key={i}>{line}</p>)}
                    </div>
                  )}
                  {blindSpotParagraphs[2] && (
                    <p className="text-[#2D2640]/80 italic text-sm mt-3">{blindSpotParagraphs[2]}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {growthText && (
            <div className="bg-[#EDF4ED] rounded-xl p-5">
              <div className="flex items-start gap-3">
                <span className="text-[#4A6B44] text-sm mt-1">{'\u2191'}</span>
                <div className="flex-1">
                  <p className="text-xs tracking-wider uppercase text-[#4A6B44] mb-3">What growth looks like</p>
                  <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-4">{growthParagraphs[0]}</p>
                  {growthBullets.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {growthBullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#2D2640]/80 text-sm">
                          <span className="text-[#9CB896]">{'\u2192'}</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {growthClosing && !growthClosing.startsWith('\u2022') && (
                    <div className="border-l-2 border-[#9CB896] pl-4">
                      <p className="text-[#2D2640] text-sm font-medium italic">{growthClosing}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Relevance Cue */}
        {relevanceText && (
          <div className="bg-[#F0EBE3] rounded-xl p-6">
            <div className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-[#7A746C] mt-2 animate-pulse" />
              <div>
                <p className="text-xs tracking-wider uppercase text-[#655E78] mb-3">When this card matters most</p>
                <p className="font-serif text-lg text-[#2D2640] leading-relaxed mb-2">{relevanceParagraphs[0]}</p>
                {relevanceParagraphs[1] && <p className="text-[#655E78] text-sm">{relevanceParagraphs[1]}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Reflection Questions */}
        {shadowQuestions[sunSignName as keyof typeof shadowQuestions] && (
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
                {shadowQuestions[sunSignName as keyof typeof shadowQuestions].map((question, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#7A746C] mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <p className="text-[#2D2640]/80 text-sm leading-relaxed italic">{question}</p>
                  </div>
                ))}
                <p className="text-xs text-[#655E78] pt-2 border-t border-[#2D2640]/5">
                  These questions may bring up discomfort. That&apos;s often where growth happens.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
