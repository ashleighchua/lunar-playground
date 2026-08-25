'use client';

import { useState } from 'react';
import { MONTH_ABBREVIATIONS } from '@/lib/utils';
import { SunIcon, MoonIcon, RisingIcon } from '@/components/icons/ZodiacIcons';
import { SectionPicker } from './SectionPicker';
import { ShareButtons } from '@/components/ShareButtons';
import { ShareableChart } from '@/components/ShareableChart';
import { CheckoutButton } from '@/components/CheckoutButton';
import {
  getArchetype,
  getElementBalance,
  generateSynthesis,
  getQuickStats,
} from '@/lib/executiveSummary';
import type { ZodiacSign } from '@/lib/moon';

interface SummaryScreenProps {
  sunSign: ZodiacSign;
  moonSignName: string | null;
  risingSignName: string | null;
  onSelectSection: (sectionId: string) => void;
  viewedSections: Set<string>;
  onReenterDetails: () => void;
  userEmail: string;
  onEmailCapture: (email: string) => void;
  birthdate: string;
  birthtime: string;
  birthplace: string | null;
}

function formatBirthInfo(birthdate: string, birthtime: string, birthplace: string | null): string {
  if (!birthdate) return '';
  const [year, month, day] = birthdate.split('-').map(Number);
  let result = `${day} ${MONTH_ABBREVIATIONS[month - 1]} ${year}`;
  if (birthtime) result += ` at ${birthtime}`;
  if (birthplace) result += `, ${birthplace}`;
  return result;
}

export function SummaryScreen({
  sunSign,
  moonSignName,
  risingSignName,
  onSelectSection,
  viewedSections,
  onReenterDetails,
  userEmail,
  onEmailCapture,
  birthdate,
  birthtime,
  birthplace,
}: SummaryScreenProps) {
  const [emailInput, setEmailInput] = useState('');
  const [emailSaved, setEmailSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleEmailSubmit = () => {
    if (emailInput) {
      onEmailCapture(emailInput);
      setEmailSaved(true);
    }
  };

  return (
    <div className="container-editorial py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <button
          onClick={onReenterDetails}
          className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-4 flex items-center gap-2"
        >
          <span>&larr;</span> Enter different details
        </button>

        <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-2">Your Chart</h1>
        {birthdate && (
          <p className="text-sm text-[#655E78] mb-6">
            {formatBirthInfo(birthdate, birthtime, birthplace)}
          </p>
        )}

        {/* Combined Summary + Sections Box */}
        <div className="bg-[#F0E6D6] rounded-2xl overflow-hidden shadow-lg mb-8">
          <div className="p-6 md:p-8">
            {/* Archetype Title */}
            <div className="text-center mb-6">
              <p className="text-xs tracking-widest uppercase text-[#655E78] mb-2">Your Archetype</p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-3">
                {getArchetype(sunSign.name, moonSignName)}
              </h2>
              <p className="text-sm text-[#655E78]">
                {sunSign.name} Sun &middot; {moonSignName || 'Unknown'} Moon
              </p>
            </div>

            {/* Big Three Quick View */}
            <div className="flex justify-center gap-4 md:gap-8 mb-6">
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FF8FA3]/30 flex items-center justify-center mb-2 mx-auto">
                  <SunIcon size={24} className="text-[#FF8FA3]" />
                </div>
                <p className="text-xs text-[#655E78] mb-0.5">Sun</p>
                <p className="text-sm text-[#2D2640] font-medium">{sunSign.name}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#FFB88C]/30 flex items-center justify-center mb-2 mx-auto">
                  <MoonIcon size={24} className="text-[#8B7A6B]" />
                </div>
                <p className="text-xs text-[#655E78] mb-0.5">Moon</p>
                <p className="text-sm text-[#2D2640] font-medium">{moonSignName || '-'}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#9CB896]/30 flex items-center justify-center mb-2 mx-auto">
                  <RisingIcon size={24} className="text-[#6B8B60]" />
                </div>
                <p className="text-xs text-[#655E78] mb-0.5">Rising</p>
                <p className="text-sm text-[#2D2640] font-medium">{risingSignName || '-'}</p>
              </div>
            </div>

            {/* Synthesis Statement */}
            <div className="bg-white/50 rounded-xl p-5 mb-6">
              <p className="text-[#2D2640]/80 text-sm md:text-base leading-relaxed text-center">
                {generateSynthesis(sunSign.name, moonSignName, risingSignName)}
              </p>
            </div>

            {/* Element Balance & Quick Stats */}
            {(() => {
              const elements = getElementBalance(sunSign.name, moonSignName, risingSignName);
              const stats = getQuickStats(sunSign.name, moonSignName, risingSignName);
              return (
                <div className="flex flex-wrap justify-center gap-3">
                  {elements.dominant && (
                    <div className="px-4 py-2 rounded-full bg-white/50 text-[#2D2640]/80 text-xs">
                      <span className="text-[#655E78] mr-1">Element:</span>
                      <span className="font-medium">{elements.dominant}</span>
                    </div>
                  )}
                  {stats.map((stat, i) => (
                    <div key={i} className="px-4 py-2 rounded-full bg-white/50 text-[#2D2640]/80 text-xs">
                      <span className="text-[#655E78] mr-1">{stat.label}:</span>
                      <span className="font-medium">{stat.value}</span>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* Share your Big Three */}
            <div className="mt-6 pt-5 border-t border-[#2D2640]/10 text-center">
              <p className="text-xs text-[#655E78] mb-3">Share your chart with friends</p>
              <ShareButtons
                title="My Birth Chart"
                text={`I'm a ${sunSign.name} Sun, ${moonSignName} Moon, ${risingSignName} Rising \u2728 Get your birth chart at`}
                onGenerateImage={() => setShowShareModal(true)}
              />
            </div>
          </div>

          {/* Divider between summary and sections */}
          <div className="border-t border-[#2D2640]/10 mx-6 md:mx-8" />

          {/* Section Picker inside the box */}
          <div className="p-6 md:p-8">
            <p className="text-xs tracking-widest uppercase text-[#655E78] mb-4 text-center">Your Reading</p>
            <SectionPicker
              viewedSections={viewedSections}
              onSelect={onSelectSection}
            />
          </div>
        </div>

        {/* Unlock CTA */}
        <div className="bg-gradient-to-br from-[#2D2640] to-[#3D3D3D] rounded-2xl p-6 md:p-8 text-center mb-8">
          <p className="text-[#F0EBF8]/50 text-xs uppercase tracking-wider mb-2">Full natal chart reading</p>
          <h3 className="font-serif text-2xl md:text-3xl text-[#F0EBF8] mb-3">
            Unlock your complete chart
          </h3>
          <p className="text-[#F0EBF8]/70 text-sm mb-2 max-w-md mx-auto">
            Get all 9 sections with personalized insights on your decision-making, emotional patterns, relationships, career, and more.
          </p>
          <p className="text-[#FF8FA3] text-2xl font-serif mb-5">$5</p>
          <div className="max-w-xs mx-auto">
            <CheckoutButton productId="natal-chart" label="Unlock Now" />
          </div>
        </div>


        {/* Email capture (if no email yet) */}
        {!userEmail && !emailSaved && (
          <div className="bg-[#F5F3F0] rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[#655E78]">&#9993;</span>
              <p className="text-sm text-[#655E78]">Want to save your reading?</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 sm:w-48 px-3 py-2 border border-[#2D2640]/10 rounded-lg bg-white text-sm focus:outline-none focus:border-[#2D2640]/30 text-[#2D2640] placeholder:text-[#655E78]/40"
                onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
              />
              <button
                onClick={handleEmailSubmit}
                disabled={!emailInput}
                className="px-4 py-2 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm hover:bg-[#1E1835] transition-colors disabled:opacity-50 whitespace-nowrap"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {emailSaved && (
          <div className="bg-[#EDF4ED] rounded-xl p-4 text-center mb-8">
            <p className="text-sm text-[#4A6B44]">&#10003; We&apos;ll send a summary to your inbox.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12">
          <p className="text-xs text-[#655E78]/60 text-center max-w-xl mx-auto">
            This report uses astrology as a reflective framework, not prediction.
            It describes tendencies and patterns, not certainties.
            Take what resonates. Leave what doesn&apos;t.
          </p>
        </div>
      </div>

      {/* Shareable Chart Modal */}
      {showShareModal && moonSignName && risingSignName && (
        <ShareableChart
          sunSign={sunSign.name}
          moonSign={moonSignName}
          risingSign={risingSignName}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}
