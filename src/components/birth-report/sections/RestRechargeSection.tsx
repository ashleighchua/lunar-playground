'use client';

import {
  restStyle,
  depletionSigns,
  quickResets,
  deepRestNeeds,
  restMistakes,
} from '@/lib/restRecharge';

interface RestRechargeSectionProps {
  restSign: string; // moonSignName || sunSign.name
}

export function RestRechargeSection({ restSign }: RestRechargeSectionProps) {
  const styleText = restStyle[restSign] || '';
  const styleParagraphs = styleText.split('\n\n').filter(Boolean);
  const depletion = depletionSigns[restSign] || [];
  const resets = quickResets[restSign] || [];
  const deepNeedsText = deepRestNeeds[restSign] || '';
  const mistakeText = restMistakes[restSign] || '';

  return (
    <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#9CB896]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#EDF4ED]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">How You Rest & Recharge</h2>
          <p className="text-sm text-[#655E78] leading-relaxed">
            What actually restores you based on Moon in {restSign}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0 space-y-6">
        {/* Your recharge style */}
        {styleText && (
          <div className="bg-[#EDF4ED] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#4A6B44]">&#9728;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">Your recharge style</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed mb-3">
              {styleParagraphs[0]}
            </p>
            {styleParagraphs[1] && (
              <p className="text-[#2D2640]/80 text-sm leading-relaxed">
                {styleParagraphs[1]}
              </p>
            )}
          </div>
        )}

        {/* Signs of depletion / Quick resets side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {depletion.length > 0 && (
            <div className="bg-[#F5EBE8] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#8B6B60]">&#9888;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">Signs you&apos;re running on empty</p>
              </div>
              <ul className="space-y-3">
                {depletion.map((sign, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#2D2640]/80 text-sm">
                    <span className="text-[#FFB88C] mt-0.5">&middot;</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {resets.length > 0 && (
            <div className="bg-[#F5F8FA] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#6B8DAB]">&#9889;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#5B7B9A]">Quick resets</p>
              </div>
              <ul className="space-y-3">
                {resets.map((reset, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#2D2640]/80 text-sm">
                    <span className="text-[#6B8DAB] mt-0.5">&middot;</span>
                    <span>{reset}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Deep rest needs */}
        {deepNeedsText && (
          <div className="bg-[#F0EBF8] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FFB88C]">&#127769;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">When you&apos;re truly depleted</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed">
              {deepNeedsText}
            </p>
          </div>
        )}

        {/* Rest mistake to avoid */}
        {mistakeText && (
          <div className="bg-[#FEF3E8] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#FF8FA3]">&#128161;</span>
              <p className="text-xs font-medium tracking-wide uppercase text-[#C4365A]">Rest mistake to avoid</p>
            </div>
            <p className="text-[#2D2640] text-sm leading-relaxed">
              {mistakeText}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
