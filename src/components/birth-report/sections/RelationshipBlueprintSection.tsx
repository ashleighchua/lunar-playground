'use client';

import { useState } from 'react';
import {
  safetyNeeds,
  showingLove,
  misunderstandingPattern,
  relationshipStrain,
  whatHelps,
  returnQuestion,
} from '@/lib/relationshipBlueprint';
import { relationshipInsights } from '@/lib/keyInsights';
import { relationshipQuestions } from '@/lib/reflectionQuestions';

interface RelationshipBlueprintSectionProps {
  relationshipSign: string; // moonSignName || sunSign.name
}

export function RelationshipBlueprintSection({ relationshipSign }: RelationshipBlueprintSectionProps) {
  const [showReflections, setShowReflections] = useState(false);

  const safetyText = safetyNeeds[relationshipSign] || '';
  const safetyParagraphs = safetyText.split('\n\n').filter(Boolean);

  const loveText = showingLove[relationshipSign] || '';
  const loveParagraphs = loveText.split('\n\n').filter(Boolean);

  const misunderstandingText = misunderstandingPattern[relationshipSign] || '';
  const misunderstandingParagraphs = misunderstandingText.split('\n\n').filter(Boolean);

  const strainText = relationshipStrain[relationshipSign] || '';
  const strainParagraphs = strainText.split('\n\n').filter(Boolean);

  const helpsText = whatHelps[relationshipSign] || '';
  const helpsParagraphs = helpsText.split('\n\n').filter(Boolean);

  const questionText = returnQuestion[relationshipSign] || '';
  const questionParagraphs = questionText.split('\n\n').filter(Boolean);

  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#7A746C]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Relationship Blueprint</h2>
          <p className="text-sm text-[#655E78] leading-relaxed">
            How you bond, attach, and stay connected
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 space-y-6">
        {/* Key Insight Callout */}
        <div className="bg-gradient-to-r from-[#E4CCC4]/20 to-[#E4CCC4]/5 border-l-4 border-[#8B6B60] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-[#8B6B60] text-lg mt-0.5">&#9889;</span>
            <div>
              <p className="text-xs tracking-wider uppercase text-[#8B6B60] mb-2">Key Insight</p>
              <p className="text-[#2D2640] text-sm leading-relaxed font-medium">
                {relationshipInsights[relationshipSign as keyof typeof relationshipInsights] ||
                 "Your relationship patterns aren't flaws to fix. They're adaptations that once protected you. Understanding them is the first step to choosing consciously."}
              </p>
            </div>
          </div>
        </div>

        {/* What you need to feel safe */}
        {safetyText && (
          <div className="bg-[#F0EBF8] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB88C]">&#9825;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">What you need to feel safe</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
              {safetyParagraphs[0]}
            </p>
            {safetyParagraphs[1] && (
              <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                {safetyParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* How you show love */}
        {loveText && (
          <div className="bg-[#F0EBF8] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB88C]">&#10084;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">How you show love</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
              {loveParagraphs[0]}
            </p>
            {loveParagraphs[1] && (
              <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                {loveParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* Where misunderstandings begin */}
        {misunderstandingText && (
          <div className="bg-[#F5F3F0] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#7A746C]">&#8644;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">Where misunderstandings begin</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
              {misunderstandingParagraphs[0]}
            </p>
            {misunderstandingParagraphs[1] && (
              <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">
                {misunderstandingParagraphs[1]}
              </p>
            )}
            {misunderstandingParagraphs[2] && (
              <p className="text-[#2D2640]/80 text-sm italic">
                {misunderstandingParagraphs[2]}
              </p>
            )}
          </div>
        )}

        {/* Strain and Helps - side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {strainText && (
            <div className="bg-[#F5EBE8] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#8B6B60]">&#9888;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">Where relationships strain</p>
              </div>
              <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
                {strainParagraphs[0]}
              </p>
              {strainParagraphs[1] && (
                <p className="text-[#2D2640]/80 text-sm leading-relaxed mb-3">
                  {strainParagraphs[1]}
                </p>
              )}
              {strainParagraphs[2] && (
                <p className="text-[#2D2640]/80 text-sm italic">
                  {strainParagraphs[2]}
                </p>
              )}
            </div>
          )}

          {helpsText && (
            <div className="bg-[#EDF4ED] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#4A6B44]">&#10003;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">What actually helps</p>
              </div>
              <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
                {helpsParagraphs[0]}
              </p>
              {helpsParagraphs[1] && (
                <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                  {helpsParagraphs[1]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Anchor box */}
        {questionText && (
          <div className="bg-[#F0EBF8] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB88C]">&#10022;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">A question to return to</p>
            </div>
            <p className="font-serif text-lg text-[#2D2640] leading-relaxed mb-2">
              {questionParagraphs[0]}
            </p>
            {questionParagraphs[1] && (
              <p className="text-[#655E78] text-sm">
                {questionParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* Reflection Questions */}
        {relationshipQuestions[relationshipSign as keyof typeof relationshipQuestions] && (
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
                {relationshipQuestions[relationshipSign as keyof typeof relationshipQuestions].map((question, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#8B6B60] mt-0.5 flex-shrink-0">{i + 1}.</span>
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
