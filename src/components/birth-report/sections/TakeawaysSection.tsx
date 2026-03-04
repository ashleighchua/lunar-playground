'use client';

import {
  leanInto,
  watchFor,
  practicalReframe,
} from '@/lib/practicalTakeaways';
import { practicalAnchors } from '@/lib/practicalAnchors';
import { getTakeawaysInsight } from '@/lib/keyInsights';

interface TakeawaysSectionProps {
  sunSignName: string;
  moonSignName: string | null;
}

export function TakeawaysSection({ sunSignName, moonSignName }: TakeawaysSectionProps) {
  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#7A746C]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Practical Takeaways</h2>
          <p className="text-sm text-[#655E78] leading-relaxed">
            A grounded summary for daily use
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0">
        {/* Key Insight Callout */}
        <div className="mb-6 bg-gradient-to-r from-[#9CB896]/15 to-[#9CB896]/5 border-l-4 border-[#9CB896] rounded-r-xl p-5">
          <div className="flex items-start gap-3">
            <span className="text-[#9CB896] text-lg mt-0.5">&#9889;</span>
            <div>
              <p className="text-xs tracking-wider uppercase text-[#4A6B44] mb-2">Key Insight</p>
              <p className="text-[#2D2640] text-sm leading-relaxed font-medium">
                {getTakeawaysInsight(sunSignName, moonSignName)}
              </p>
            </div>
          </div>
        </div>

        {/* Lean into / Watch for */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {leanInto[sunSignName] && (
            <div className="bg-[#F0EBF8] rounded-xl p-5">
              <p className="text-xs tracking-wider uppercase text-[#C4365A] mb-1">Lean into</p>
              <p className="text-xs text-[#655E78] mb-4">Strengths that grow when used deliberately</p>
              <ul className="space-y-3">
                {leanInto[sunSignName].map((item, i) => {
                  const words = item.split(' ');
                  const emphasisEnd = Math.min(3, words.findIndex(w => w.length > 6) + 1) || 3;
                  const emphasis = words.slice(0, emphasisEnd).join(' ');
                  const rest = words.slice(emphasisEnd).join(' ');
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#FF8FA3] mt-0.5 text-sm">{'\u2192'}</span>
                      <span className="text-[#2D2640]/80 leading-relaxed text-sm">
                        <span className="text-[#2D2640]">{emphasis}</span>
                        {rest && ` ${rest}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {watchFor[sunSignName] && (
            <div className="bg-[#F5F3F0] rounded-xl p-5">
              <p className="text-xs tracking-wider uppercase text-[#5A5E64] mb-1">Watch for</p>
              <p className="text-xs text-[#655E78] mb-4">Patterns that emerge quietly under strain</p>
              <ul className="space-y-3">
                {watchFor[sunSignName].map((item, i) => {
                  const words = item.split(' ');
                  const emphasisEnd = Math.min(3, words.findIndex(w => w.length > 6) + 1) || 3;
                  const emphasis = words.slice(0, emphasisEnd).join(' ');
                  const rest = words.slice(emphasisEnd).join(' ');
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#7A746C] mt-0.5 text-sm">&middot;</span>
                      <span className="text-[#2D2640]/80 leading-relaxed text-sm">
                        <span className="text-[#2D2640]/80">{emphasis}</span>
                        {rest && ` ${rest}`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* One practical reframe */}
        {practicalReframe[sunSignName] && (
          <div className="bg-[#F0EBE3] rounded-xl p-6 md:p-8 mb-6">
            <p className="text-xs tracking-wider uppercase text-[#655E78] mb-4">One practical reframe</p>
            {(() => {
              const reframeText = practicalReframe[sunSignName];
              const paragraphs = reframeText.split('\n\n').filter(Boolean);
              const mainPoint = paragraphs[0] || '';
              const supporting = paragraphs.slice(1).join('\n\n');
              return (
                <>
                  <p className="font-serif text-lg text-[#2D2640] leading-relaxed mb-4">{mainPoint}</p>
                  {supporting && <p className="text-[#655E78] text-sm leading-relaxed">{supporting}</p>}
                </>
              );
            })()}
          </div>
        )}

        {/* This Week */}
        {practicalAnchors[sunSignName as keyof typeof practicalAnchors] && (
          <div className="bg-white border border-[#2D2640]/10 rounded-xl p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#9CB896] animate-pulse" />
              <p className="text-xs tracking-wider uppercase text-[#4A6B44]">This Week</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-[#9CB896] mt-0.5 flex-shrink-0 font-medium">Try:</span>
                <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                  {practicalAnchors[sunSignName as keyof typeof practicalAnchors].tryThis}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#FF8FA3] mt-0.5 flex-shrink-0 font-medium">Notice:</span>
                <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                  {practicalAnchors[sunSignName as keyof typeof practicalAnchors].notice}
                </p>
              </div>
              <div className="pt-3 border-t border-[#2D2640]/5">
                <p className="text-xs text-[#655E78] mb-2">Micro-experiment (5 min)</p>
                <p className="text-[#2D2640] text-sm leading-relaxed font-medium">
                  {practicalAnchors[sunSignName as keyof typeof practicalAnchors].microExperiment}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
