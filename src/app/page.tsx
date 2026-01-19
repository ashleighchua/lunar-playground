'use client';

import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { BirthDataForm } from '@/components/BirthDataForm';
import { getCurrentMoonPhase } from '@/lib/moon';
import { getMoonPhaseFelt, feltExperience } from '@/lib/transitContent';

// Calculate approximate moon sign for a given date
function getMoonSign(date: Date): string {
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

  const referenceDate = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));
  const referenceSignIndex = 3; // Cancer

  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceReference = (date.getTime() - referenceDate.getTime()) / msPerDay;

  const daysPerSign = 27.3 / 12;
  const signOffset = Math.floor(daysSinceReference / daysPerSign);

  const currentSignIndex = (referenceSignIndex + signOffset) % 12;
  return signs[currentSignIndex >= 0 ? currentSignIndex : currentSignIndex + 12];
}

const reportSections = [
  {
    title: 'Operating System',
    description: 'Your Sun, Moon, and Rising working together',
    icon: '☉',
  },
  {
    title: 'Core Drives',
    description: 'Mercury, Venus, Mars, Saturn - how you think, connect, act, and persist',
    icon: '☿',
  },
  {
    title: 'Emotional Pattern',
    description: 'Your default rhythm and how you return to balance',
    icon: '☽',
  },
  {
    title: 'Relationship Blueprint',
    description: 'What you need to feel safe and how you show love',
    icon: '♡',
  },
  {
    title: 'Work & Impact',
    description: 'What motivates you and where burnout develops',
    icon: '⬡',
  },
  {
    title: 'Shadow & Growth',
    description: 'The pattern under pressure and the path through it',
    icon: '◐',
  },
];

export default function Home() {
  const today = new Date();
  const moonPhase = getCurrentMoonPhase();
  const currentMoonSign = getMoonSign(today);
  const phaseFelt = getMoonPhaseFelt(moonPhase.name);

  // Get a short preview of today's felt experience
  const feltPreview = feltExperience[currentMoonSign]?.split('\n')[0] || '';

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation currentPage="home" />

      {/* Hero with Form */}
      <section className="relative overflow-hidden">
        <div className="container-editorial pt-8 pb-16 md:pt-12 md:pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Headline + Form */}
            <div className="relative z-10">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
                Understand yourself
                <br />
                <span className="text-[#6B6B6B]">through the stars</span>
              </h1>
              <p className="mt-6 text-lg text-[#6B6B6B] max-w-md leading-relaxed">
                A comprehensive birth chart report exploring your personality, patterns, and potential. Not prediction. Reflection.
              </p>

              {/* Form */}
              <div className="mt-8 max-w-md">
                <BirthDataForm compact />
              </div>
            </div>

            {/* Right: Report Preview Mockup - Compact */}
            <div className="relative hidden lg:block mt-8">
              {/* Stacked cards effect */}
              <div className="relative">
                {/* Background card 2 (furthest back) */}
                <div className="absolute top-4 left-4 right-0 bottom-0 bg-[#E8E4DE] rounded-2xl" />
                {/* Background card 1 */}
                <div className="absolute top-2 left-2 right-0 bottom-0 bg-[#F0EBE3] rounded-2xl" />

                {/* Main report card */}
                <div className="relative bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-xl overflow-hidden">
                  {/* Report header with archetype */}
                  <div className="p-5 pb-3 border-b border-[#2A2A2A]/5 bg-gradient-to-r from-[#FAF7F2] to-white">
                    <p className="text-xs tracking-wider uppercase text-[#6B6B6B] mb-1">Your Archetype</p>
                    <p className="font-serif text-xl text-[#2A2A2A]">The Visionary Builder</p>
                  </div>

                  {/* Big Three visual - compact */}
                  <div className="p-5 pb-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-[#D4A84B]/20 to-[#D4A84B]/5 flex items-center justify-center mb-1">
                          <span className="text-lg text-[#D4A84B]">☉</span>
                        </div>
                        <p className="text-[10px] text-[#6B6B6B] uppercase tracking-wide">Sun</p>
                        <p className="text-xs font-medium text-[#2A2A2A]">Capricorn</p>
                      </div>
                      <div className="text-center">
                        <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-[#8B9DC3]/20 to-[#8B9DC3]/5 flex items-center justify-center mb-1">
                          <span className="text-lg text-[#8B9DC3]">☽</span>
                        </div>
                        <p className="text-[10px] text-[#6B6B6B] uppercase tracking-wide">Moon</p>
                        <p className="text-xs font-medium text-[#2A2A2A]">Pisces</p>
                      </div>
                      <div className="text-center">
                        <div className="w-11 h-11 mx-auto rounded-full bg-gradient-to-br from-[#7A9E7A]/20 to-[#7A9E7A]/5 flex items-center justify-center mb-1">
                          <span className="text-lg text-[#7A9E7A]">↑</span>
                        </div>
                        <p className="text-[10px] text-[#6B6B6B] uppercase tracking-wide">Rising</p>
                        <p className="text-xs font-medium text-[#2A2A2A]">Virgo</p>
                      </div>
                    </div>
                  </div>

                  {/* Sample insight preview - compact */}
                  <div className="px-5 pb-3">
                    <div className="bg-gradient-to-r from-[#D4A84B]/10 to-[#D4A84B]/5 border-l-3 border-[#D4A84B] rounded-r-lg p-3">
                      <p className="text-[10px] tracking-wider uppercase text-[#8B6914] mb-0.5">Key Insight</p>
                      <p className="text-xs text-[#2A2A2A] leading-relaxed">
                        You lead with ambition but process through feeling.
                      </p>
                    </div>
                  </div>

                  {/* Section previews - compact */}
                  <div className="px-5 pb-5 space-y-2">
                    <div className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-lg">
                      <span className="text-[#7A746C] text-sm">☉</span>
                      <p className="text-xs text-[#2A2A2A] flex-1">Operating System</p>
                      <span className="text-[#6B6B6B] text-xs">→</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-lg">
                      <span className="text-[#7A746C] text-sm">☿</span>
                      <p className="text-xs text-[#2A2A2A] flex-1">Core Drives</p>
                      <span className="text-[#6B6B6B] text-xs">→</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-lg">
                      <span className="text-[#7A746C] text-sm">☽</span>
                      <p className="text-xs text-[#2A2A2A] flex-1">Emotional Pattern</p>
                      <span className="text-[#6B6B6B] text-xs">→</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-lg">
                      <span className="text-[#7A746C] text-sm">♡</span>
                      <p className="text-xs text-[#2A2A2A] flex-1">Relationship Blueprint</p>
                      <span className="text-[#6B6B6B] text-xs">→</span>
                    </div>
                    <div className="flex items-center gap-2 p-2.5 bg-[#FAF7F2] rounded-lg opacity-60">
                      <span className="text-[#7A746C] text-sm">◐</span>
                      <p className="text-xs text-[#2A2A2A] flex-1">+ 2 more sections</p>
                      <span className="text-[#6B6B6B] text-xs">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background moon image - mobile only */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Images/mooncolour.png"
          alt=""
          className="absolute right-0 top-0 translate-x-[40%] -translate-y-[10%] w-[200px] h-auto opacity-30 pointer-events-none lg:hidden"
        />
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* What You'll Discover */}
      <section className="container-editorial py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-4">
            What you&apos;ll discover
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed">
            Your report covers six key dimensions of your chart, each with personalized insights and reflection questions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportSections.map((section) => (
            <div
              key={section.title}
              className="bg-white rounded-xl border border-[#2A2A2A]/5 p-6 hover:shadow-md transition-shadow text-center"
            >
              <div className="w-10 h-10 mx-auto rounded-lg bg-[#FAF7F2] flex items-center justify-center text-[#7A746C] text-lg mb-4">
                {section.icon}
              </div>
              <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">{section.title}</h3>
              <p className="text-sm text-[#6B6B6B] leading-relaxed">{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Sky Guide Section */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B]">
              Daily guidance
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mt-4 mb-6">
              What the sky feels like today
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed mb-4">
              The Moon changes signs every few days, shifting the collective emotional weather. Some days feel easier to start things. Others ask for rest.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed mb-8">
              Check in with the current Moon sign, phase, and what it might mean for your day or week ahead.
            </p>
            <Link
              href="/transit"
              className="inline-block px-6 py-3 rounded-lg border border-[#2A2A2A]/20 text-[#2A2A2A] text-sm tracking-wide hover:bg-[#2A2A2A] hover:text-[#FAF7F2] transition-colors"
            >
              View sky guide
            </Link>
          </div>

          {/* Sky guide preview card */}
          <div className="bg-[#F5F3F0] rounded-2xl p-6 md:p-8">
            <div className="text-center mb-4">
              <span className="text-7xl md:text-8xl" style={{ filter: 'saturate(0.3) brightness(1.1)' }}>
                {moonPhase.emoji}
              </span>
            </div>
            <div className="text-center mb-4">
              <p className="font-serif text-xl text-[#2A2A2A] mb-1">Moon in {currentMoonSign}</p>
              <p className="text-sm text-[#6B6B6B]">{phaseFelt.name}</p>
            </div>
            <p className="text-sm text-[#6B6B6B] leading-relaxed text-center">
              {feltPreview}
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Philosophy */}
      <section className="py-16 md:py-24 bg-[#2A2A2A]">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl text-[#FAF7F2] leading-relaxed">
              Astrology gives language to intuition, making the unseen easier to hold.
            </p>
            <p className="mt-8 text-[#FAF7F2]/60">
              A playground, not a prophecy.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8">
        <div className="container-editorial">
          <div className="flex justify-end">
            <div className="flex gap-8 text-sm text-[#6B6B6B]">
              <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-[#2A2A2A] transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
