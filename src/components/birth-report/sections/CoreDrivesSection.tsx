'use client';

import { useState } from 'react';
import { CoreDrivesVisual, type CoreDrivePlanet } from '@/components/CoreDrivesVisual';
import {
  mercuryThinking,
  venusConnecting,
  marsActing,
  saturnPressure,
  generateDrivesInteraction,
  generateAlignmentSupport,
} from '@/lib/coreDrives';
import { coreDrivesInsights } from '@/lib/keyInsights';

interface CoreDrivesSectionProps {
  mercurySignName: string | null;
  venusSignName: string | null;
  marsSignName: string | null;
  saturnSignName: string | null;
}

export function CoreDrivesSection({ mercurySignName, venusSignName, marsSignName, saturnSignName }: CoreDrivesSectionProps) {
  const [hoveredCoreDrive, setHoveredCoreDrive] = useState<CoreDrivePlanet | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
      {/* Header with accent rail */}
      <div className="flex">
        <div className="w-1 bg-[#7A746C]" />
        <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
          <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Your Core Drives</h2>
          <p className="text-sm text-[#6B6B6B] leading-relaxed">
            How you think, connect, act, and grow under pressure
          </p>
        </div>
      </div>

      <div className="p-6 md:p-8 pt-0">
        {/* Core Drives Visual */}
        <CoreDrivesVisual
          mercurySign={mercurySignName}
          venusSign={venusSignName}
          marsSign={marsSignName}
          saturnSign={saturnSignName}
          className="mb-8"
          hoveredPlanet={hoveredCoreDrive}
          onPlanetHover={setHoveredCoreDrive}
        />

        {/* 2x2 Grid of Core Drives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Mercury */}
          <div
            className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
              hoveredCoreDrive === 'mercury'
                ? 'bg-[#B8C4D1] border-[#B8C4D1]'
                : 'bg-white border-[#2A2A2A]/5 hover:bg-[#B8C4D1]/30 hover:border-[#B8C4D1]/50'
            }`}
            onMouseEnter={() => setHoveredCoreDrive('mercury')}
            onMouseLeave={() => setHoveredCoreDrive(null)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg text-[#5A6B7A]">{'\u263F'}</span>
              <span className="text-xs tracking-wide uppercase text-[#5A6B7A]/70">Mercury</span>
              <span className="text-[#5A6B7A]/40">&middot;</span>
              <span className="font-serif text-[#5A6B7A]">{mercurySignName || '-'}</span>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-2">How you think</p>
            {mercurySignName && mercuryThinking[mercurySignName] ? (
              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{mercuryThinking[mercurySignName]}</p>
            ) : (
              <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
            )}
          </div>

          {/* Venus */}
          <div
            className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
              hoveredCoreDrive === 'venus'
                ? 'bg-[#E4CCC4] border-[#E4CCC4]'
                : 'bg-white border-[#2A2A2A]/5 hover:bg-[#E4CCC4]/30 hover:border-[#E4CCC4]/50'
            }`}
            onMouseEnter={() => setHoveredCoreDrive('venus')}
            onMouseLeave={() => setHoveredCoreDrive(null)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg text-[#8B6B60]">{'\u2640'}</span>
              <span className="text-xs tracking-wide uppercase text-[#8B6B60]/70">Venus</span>
              <span className="text-[#8B6B60]/40">&middot;</span>
              <span className="font-serif text-[#8B6B60]">{venusSignName || '-'}</span>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-2">How you connect</p>
            {venusSignName && venusConnecting[venusSignName] ? (
              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{venusConnecting[venusSignName]}</p>
            ) : (
              <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
            )}
          </div>

          {/* Mars */}
          <div
            className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
              hoveredCoreDrive === 'mars'
                ? 'bg-[#D4B8A4] border-[#D4B8A4]'
                : 'bg-white border-[#2A2A2A]/5 hover:bg-[#D4B8A4]/30 hover:border-[#D4B8A4]/50'
            }`}
            onMouseEnter={() => setHoveredCoreDrive('mars')}
            onMouseLeave={() => setHoveredCoreDrive(null)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg text-[#8B5A3C]">{'\u2642'}</span>
              <span className="text-xs tracking-wide uppercase text-[#8B5A3C]/70">Mars</span>
              <span className="text-[#8B5A3C]/40">&middot;</span>
              <span className="font-serif text-[#8B5A3C]">{marsSignName || '-'}</span>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-2">How you act</p>
            {marsSignName && marsActing[marsSignName] ? (
              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{marsActing[marsSignName]}</p>
            ) : (
              <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
            )}
          </div>

          {/* Saturn */}
          <div
            className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
              hoveredCoreDrive === 'saturn'
                ? 'bg-[#C4C8CC] border-[#C4C8CC]'
                : 'bg-white border-[#2A2A2A]/5 hover:bg-[#C4C8CC]/30 hover:border-[#C4C8CC]/50'
            }`}
            onMouseEnter={() => setHoveredCoreDrive('saturn')}
            onMouseLeave={() => setHoveredCoreDrive(null)}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg text-[#5A5E64]">{'\u2644'}</span>
              <span className="text-xs tracking-wide uppercase text-[#5A5E64]/70">Saturn</span>
              <span className="text-[#5A5E64]/40">&middot;</span>
              <span className="font-serif text-[#5A5E64]">{saturnSignName || '-'}</span>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-2">How you grow</p>
            {saturnSignName && saturnPressure[saturnSignName] ? (
              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{saturnPressure[saturnSignName]}</p>
            ) : (
              <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
            )}
          </div>
        </div>

        {/* Key Insight Callout */}
        {mercurySignName && (
          <div className="mb-6 bg-gradient-to-r from-[#5A6B7A]/10 to-[#5A6B7A]/5 border-l-4 border-[#5A6B7A] rounded-r-xl p-5">
            <div className="flex items-start gap-3">
              <span className="text-[#5A6B7A] text-lg mt-0.5">&#9889;</span>
              <div>
                <p className="text-xs tracking-wider uppercase text-[#5A6B7A] mb-2">Key Insight</p>
                <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                  {coreDrivesInsights[mercurySignName as keyof typeof coreDrivesInsights] ||
                   "Your Mercury placement shapes how you process and communicate. Understanding this is key to working with your natural thinking style."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Sections when data is available */}
        {mercurySignName && venusSignName && marsSignName && (
          <div className="space-y-6">
            {/* When these work together */}
            <div className="bg-[#F5F3F0] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#B8A090]">&#9881;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">When these work together</p>
              </div>
              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                {(() => {
                  const interaction = generateDrivesInteraction(mercurySignName, venusSignName, marsSignName, saturnSignName);
                  return interaction.split('\n\n')[0];
                })()}
              </p>
            </div>

            {/* Aligned vs Misaligned */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#EDF4ED] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#4A6B44]">&#10003;</span>
                  <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">Aligned</p>
                </div>
                <ul className="space-y-3">
                  {(() => {
                    const interaction = generateDrivesInteraction(mercurySignName, venusSignName, marsSignName, saturnSignName);
                    const alignedMatch = interaction.match(/When aligned,([^.]+)/);
                    if (alignedMatch) {
                      const traits = alignedMatch[1].split(/,| and /).map(t => t.trim()).filter(Boolean).slice(0, 4);
                      return traits.map((trait, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                          <span className="text-[#9CB896] mt-0.5">&middot;</span>
                          <span className="capitalize">{trait.replace(/^you're /i, '')}</span>
                        </li>
                      ));
                    }
                    return null;
                  })()}
                </ul>
              </div>

              <div className="bg-[#F5EBE8] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#8B6B60]">&#10007;</span>
                  <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">Misaligned</p>
                </div>
                <ul className="space-y-3">
                  {(() => {
                    const interaction = generateDrivesInteraction(mercurySignName, venusSignName, marsSignName, saturnSignName);
                    const misalignedMatch = interaction.match(/When misaligned,([^.]+)/);
                    if (misalignedMatch) {
                      const traits = misalignedMatch[1].split(/,| and /).map(t => t.trim()).filter(Boolean).slice(0, 4);
                      return traits.map((trait, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                          <span className="text-[#D4B8A4] mt-0.5">&middot;</span>
                          <span className="capitalize">{trait.replace(/^you may /i, '')}</span>
                        </li>
                      ));
                    }
                    return null;
                  })()}
                </ul>
              </div>
            </div>

            {/* What supports alignment */}
            <div className="bg-[#F5F3F0] rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#9CB896]">&#9734;</span>
                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">What supports alignment</p>
              </div>
              <ul className="space-y-3">
                {generateAlignmentSupport(mercurySignName, venusSignName, marsSignName, saturnSignName).slice(0, 4).map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                    <span className="text-[#9CB896] mt-0.5">&middot;</span>
                    <span className="capitalize">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
