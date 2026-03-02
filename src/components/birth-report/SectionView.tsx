'use client';

import { getSectionConfig } from '@/lib/sectionConfig';
import { MONTH_ABBREVIATIONS } from '@/lib/utils';
import { CheckoutButton } from '@/components/CheckoutButton';
import { OperatingSystemSection } from './sections/OperatingSystemSection';
import { CoreDrivesSection } from './sections/CoreDrivesSection';
import { DecisionMakingSection } from './sections/DecisionMakingSection';
import { EmotionalPatternSection } from './sections/EmotionalPatternSection';
import { RestRechargeSection } from './sections/RestRechargeSection';
import { RelationshipBlueprintSection } from './sections/RelationshipBlueprintSection';
import { WorkImpactSection } from './sections/WorkImpactSection';
import { ShadowGrowthSection } from './sections/ShadowGrowthSection';
import { TakeawaysSection } from './sections/TakeawaysSection';
import type { ZodiacSign } from '@/lib/moon';
import type { ChartData } from '@/lib/ephemeris';

interface SectionViewProps {
  sectionId: string;
  sunSign: ZodiacSign;
  moonSignName: string | null;
  risingSignName: string | null;
  mercurySignName: string | null;
  venusSignName: string | null;
  marsSignName: string | null;
  saturnSignName: string | null;
  onBack: () => void;
  viewedSections: Set<string>;
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

export function SectionView({
  sectionId,
  sunSign,
  moonSignName,
  risingSignName,
  mercurySignName,
  venusSignName,
  marsSignName,
  saturnSignName,
  onBack,
  viewedSections,
  birthdate,
  birthtime,
  birthplace,
}: SectionViewProps) {
  const section = getSectionConfig(sectionId);

  return (
    <div className="container-editorial py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back button + birth info */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="text-sm text-[#7B7394] hover:text-[#2D2640] transition-colors flex items-center gap-2"
          >
            <span>&larr;</span> Back to your chart
          </button>
          {birthdate && (
            <p className="text-xs text-[#7B7394]/60">
              {formatBirthInfo(birthdate, birthtime, birthplace)}
            </p>
          )}
        </div>

        {/* Section content */}
        <div className="mb-8">
          {sectionId === 'operating-system' && (
            <OperatingSystemSection
              sunSign={sunSign}
              moonSignName={moonSignName}
              risingSignName={risingSignName}
            />
          )}

          {sectionId === 'core-drives' && (
            <CoreDrivesSection
              mercurySignName={mercurySignName}
              venusSignName={venusSignName}
              marsSignName={marsSignName}
              saturnSignName={saturnSignName}
            />
          )}

          {sectionId === 'decision-making' && (
            <DecisionMakingSection
              decisionSign={mercurySignName || sunSign.name}
            />
          )}

          {sectionId === 'emotional-pattern' && (
            <EmotionalPatternSection
              emotionalSign={moonSignName || sunSign.name}
            />
          )}

          {sectionId === 'rest-recharge' && (
            <RestRechargeSection
              restSign={moonSignName || sunSign.name}
            />
          )}

          {sectionId === 'relationship-blueprint' && (
            <RelationshipBlueprintSection
              relationshipSign={moonSignName || sunSign.name}
            />
          )}

          {sectionId === 'work-style' && (
            <WorkImpactSection
              sunSignName={sunSign.name}
            />
          )}

          {sectionId === 'shadow-growth' && (
            <ShadowGrowthSection
              sunSignName={sunSign.name}
            />
          )}

          {sectionId === 'takeaways' && (
            <TakeawaysSection
              sunSignName={sunSign.name}
              moonSignName={moonSignName}
            />
          )}
        </div>

        {/* Post-section CTA */}
        <div className="bg-gradient-to-br from-[#2D2640] to-[#3D3D3D] rounded-2xl p-6 md:p-8 text-center mb-8">
          <p className="text-[#F0EBF8]/60 text-xs uppercase tracking-wider mb-2">Go deeper</p>
          <h3 className="font-serif text-xl text-[#F0EBF8] mb-3">
            Unlock all 9 sections of your natal chart
          </h3>
          <p className="text-[#F0EBF8]/70 text-sm mb-5 max-w-md mx-auto">
            Get your decision-making style, emotional patterns, relationship blueprint, and more in a comprehensive personalized reading.
          </p>
          <div className="max-w-xs mx-auto">
            <CheckoutButton productId="natal-chart" label="Get your full reading — $35" />
          </div>
        </div>

        {/* Explore another section */}
        <div className="text-center">
          <button
            onClick={onBack}
            className="text-sm text-[#7B7394] hover:text-[#2D2640] transition-colors"
          >
            Explore another section &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
