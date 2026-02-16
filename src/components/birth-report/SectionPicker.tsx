'use client';

import Link from 'next/link';
import { sectionConfigs, type SectionConfig } from '@/lib/sectionConfig';

export const FREE_SECTIONS = ['operating-system', 'core-drives'];

interface SectionPickerProps {
  viewedSections: Set<string>;
  onSelect: (sectionId: string) => void;
}

export function SectionPicker({ viewedSections, onSelect }: SectionPickerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {sectionConfigs.map((section) => {
        const isFree = FREE_SECTIONS.includes(section.id);
        return (
          <SectionCard
            key={section.id}
            section={section}
            viewed={viewedSections.has(section.id)}
            locked={!isFree}
            onSelect={() => isFree ? onSelect(section.id) : undefined}
          />
        );
      })}
    </div>
  );
}

function SectionCard({
  section,
  viewed,
  locked,
  onSelect,
}: {
  section: SectionConfig;
  viewed: boolean;
  locked: boolean;
  onSelect: () => void;
}) {
  if (locked) {
    return (
      <div className="text-left bg-white/60 rounded-2xl border border-[#2A2A2A]/5 overflow-hidden relative">
        <div className="flex">
          <div className="w-1 flex-shrink-0 bg-[#2A2A2A]/10" />
          <div className="flex-1 p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg text-[#2A2A2A]/25">
                  {section.planetSymbol}
                </span>
                <span className="font-serif text-lg text-[#2A2A2A]/40">{section.title}</span>
              </div>
              <svg className="w-4 h-4 text-[#2A2A2A]/25 flex-shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="text-xs text-[#6B6B6B]/40 mb-1">{section.subtitle}</p>
            <p className="text-sm text-[#2A2A2A]/30 leading-relaxed mb-3">{section.description}</p>
            <Link
              href="/shop"
              className="text-xs text-[#D4A84B] hover:text-[#8B6914] transition-colors"
            >
              Unlock with full reading &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onSelect}
      className="text-left bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all overflow-hidden group cursor-pointer"
    >
      <div className="flex">
        <div className="w-1 flex-shrink-0" style={{ backgroundColor: section.accentColor }} />
        <div className="flex-1 p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg" style={{ color: section.accentColor }}>
                {section.planetSymbol}
              </span>
              <span className="font-serif text-lg text-[#2A2A2A]">{section.title}</span>
            </div>
            {viewed && (
              <span className="text-[#9CB896] text-sm flex-shrink-0 ml-2">{'\u2713'}</span>
            )}
          </div>
          <p className="text-xs text-[#6B6B6B] mb-1">{section.subtitle}</p>
          <p className="text-sm text-[#2A2A2A]/70 leading-relaxed mb-3">{section.description}</p>
          <span className="text-xs text-[#D4A84B] group-hover:text-[#8B6914] transition-colors">
            Read more &rarr;
          </span>
        </div>
      </div>
    </button>
  );
}
