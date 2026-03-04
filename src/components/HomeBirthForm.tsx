'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { loadBirthData, saveBirthData } from '@/lib/birthData';
import { CitySelect } from '@/components/ui/CitySelect';
import type { City } from '@/lib/cities';

const tools = [
  {
    name: 'Birth Chart',
    description: 'Who you are at your core',
    image: '/Images/icon-astrology.png',
    href: '/birth-report?generate=true',
    needsTime: true,
    color: { bg: 'bg-[#FFF0F3]', border: 'border-[#FF8FA3]/25', hover: 'hover:border-[#FF8FA3]/50', text: 'text-[#C4365A]', glow: 'hover:shadow-[0_0_24px_rgba(255,143,163,0.18)]' },
  },
  {
    name: 'Relocation Reading',
    description: 'Where you\'ll thrive',
    image: '/Images/icon-relocation.png',
    href: '/astrocartography',
    needsTime: false,
    color: { bg: 'bg-[#EDFAF4]', border: 'border-[#7EDAB9]/25', hover: 'hover:border-[#7EDAB9]/50', text: 'text-[#3A8A66]', glow: 'hover:shadow-[0_0_24px_rgba(126,218,185,0.18)]' },
  },
  {
    name: 'Chinese Zodiac',
    description: 'Your natural strengths and cycles',
    image: '/Images/icon-chinese-zodiac.png',
    href: '/chinese-zodiac',
    needsTime: false,
    color: { bg: 'bg-[#FFF8EB]', border: 'border-[#FFD166]/25', hover: 'hover:border-[#FFD166]/50', text: 'text-[#B8860B]', glow: 'hover:shadow-[0_0_24px_rgba(255,209,102,0.18)]' },
  },
  {
    name: 'BaZi',
    description: 'Your destiny blueprint and timing',
    image: '/Images/icon-bazi.png',
    href: '/bazi',
    needsTime: true,
    color: { bg: 'bg-[#F0F7EE]', border: 'border-[#A8D5A0]/25', hover: 'hover:border-[#A8D5A0]/50', text: 'text-[#4A7A42]', glow: 'hover:shadow-[0_0_24px_rgba(168,213,160,0.18)]' },
  },
  {
    name: 'Numerology',
    description: 'The numbers shaping your path',
    image: '/Images/icon-numerology.png',
    href: '/numerology',
    needsTime: false,
    color: { bg: 'bg-[#EEF0FF]', border: 'border-[#A6B4FF]/25', hover: 'hover:border-[#A6B4FF]/50', text: 'text-[#5A60B0]', glow: 'hover:shadow-[0_0_24px_rgba(166,180,255,0.18)]' },
  },
  {
    name: 'Human Design',
    description: 'How you\'re designed to make decisions',
    image: '/Images/icon-human-design.png',
    href: '/human-design',
    needsTime: true,
    color: { bg: 'bg-[#F8EEFF]', border: 'border-[#D4A6FF]/25', hover: 'hover:border-[#D4A6FF]/50', text: 'text-[#7B42B0]', glow: 'hover:shadow-[0_0_24px_rgba(212,166,255,0.18)]' },
  },
];

const otherTools = [
  {
    name: 'Sky Guide',
    description: 'Current moon phase and daily guidance',
    image: '/Images/icon-moon.png',
    href: '/transit',
    note: 'No birth details needed',
    color: { bg: 'bg-[#FFF3EB]', border: 'border-[#FFB88C]/25', hover: 'hover:border-[#FFB88C]/50', text: 'text-[#B87040]', glow: 'hover:shadow-[0_0_24px_rgba(255,184,140,0.18)]' },
  },
  {
    name: 'Compatibility',
    description: 'Sun sign compatibility between two people',
    image: '/Images/icon-compatibility.png',
    href: '/compatibility',
    note: 'Requires two people',
    color: { bg: 'bg-[#FFF0F6]', border: 'border-[#FFB3D9]/25', hover: 'hover:border-[#FFB3D9]/50', text: 'text-[#B0426A]', glow: 'hover:shadow-[0_0_24px_rgba(255,179,217,0.18)]' },
  },
];

export function HomeBirthForm() {
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [birthplace, setBirthplace] = useState<{ name: string; country: string; lat: number; lng: number } | null>(null);
  const [birthplaceLabel, setBirthplaceLabel] = useState('');
  const [hasDetails, setHasDetails] = useState(false);

  useEffect(() => {
    const stored = loadBirthData();
    if (stored) {
      setBirthdate(stored.birthdate);
      setBirthtime(stored.birthtime || '');
      if (stored.birthplace) {
        setBirthplace(stored.birthplace);
        setBirthplaceLabel(`${stored.birthplace.name}, ${stored.birthplace.country}`);
      }
      setHasDetails(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;
    saveBirthData({ birthdate, birthtime, birthplace });
    setHasDetails(true);
  };

  const handleCityChange = (city: City | null) => {
    if (city) {
      setBirthplace({ name: city.label, country: city.country || '', lat: city.lat, lng: city.lng });
      setBirthplaceLabel(city.label);
    } else {
      setBirthplace(null);
      setBirthplaceLabel('');
    }
  };

  const handleChange = () => {
    setHasDetails(false);
  };

  return (
    <>
      {/* Birth Details Form / Status */}
      <section className="container-editorial pb-8">
        <div className="max-w-md mx-auto">
          {hasDetails ? (
            <div className="bg-white rounded-2xl border border-[#2D2640]/5 p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-[#655E78] mb-2">Your details</p>
              <p className="font-serif text-lg text-[#2D2640]">
                {new Date(birthdate + 'T12:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {birthtime && (
                  <span className="text-[#655E78] font-sans text-sm ml-2">
                    at {birthtime}
                  </span>
                )}
              </p>
              {birthplace && (
                <p className="text-sm text-[#655E78] mt-1">
                  {birthplace.name}
                </p>
              )}
              <button
                onClick={handleChange}
                className="mt-3 text-xs text-[#655E78] hover:text-[#2D2640] transition-colors underline underline-offset-2"
              >
                Change details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#2D2640]/5 p-6 md:p-8">
              <p className="text-xs uppercase tracking-widest text-[#655E78] mb-6 text-center">Enter once, explore everything</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="home-birthdate" className="block text-sm text-[#655E78] mb-2">Date of birth</label>
                  <input
                    id="home-birthdate"
                    type="date"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                    autoComplete="bday"
                    className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="home-birthtime" className="block text-sm text-[#655E78] mb-2">Time of birth <span className="text-[#8A8099]">(optional but recommended)</span></label>
                  <input
                    id="home-birthtime"
                    type="time"
                    value={birthtime}
                    onChange={(e) => setBirthtime(e.target.value)}
                    className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors"
                  />
                  <p className="mt-1.5 text-xs text-[#655E78]">
                    Needed for BaZi, Human Design, and Birth Chart. Other tools work without it.
                  </p>
                </div>
                <div>
                  <label htmlFor="home-birthplace" className="block text-sm text-[#655E78] mb-2">Place of birth <span className="text-[#8A8099]">(optional but recommended)</span></label>
                  <CitySelect
                    value={birthplaceLabel}
                    onChange={handleCityChange}
                    placeholder="Search for your birth city..."
                  />
                  <p className="mt-1.5 text-xs text-[#655E78]">
                    Needed for Birth Chart (rising sign), Human Design, and Relocation Reading.
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors mt-2"
                >
                  Save &amp; Explore
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="divider-mystic">
          <span className="divider-star">&#10022; &#10022; &#10022;</span>
        </div>
      </div>

      {/* Tools Grid */}
      <section className="container-editorial py-12 md:py-16">
        <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] text-center mb-8">Choose a system</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto">
          {tools.map((tool) => {
            const needsTimeButMissing = tool.needsTime && hasDetails && !birthtime;
            return (
              <Link
                key={tool.name}
                href={tool.href}
                className={`group relative ${tool.color.bg} rounded-2xl border ${tool.color.border} ${tool.color.hover} ${tool.color.glow} p-6 transition-all text-center flex flex-col items-center ${
                  !hasDetails ? 'opacity-50 pointer-events-none' : ''
                }`}
                aria-disabled={!hasDetails}
                tabIndex={hasDetails ? 0 : -1}
              >
                <div className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform">
                  <Image src={tool.image} alt={tool.name} width={64} height={64} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-serif text-base md:text-lg text-[#2D2640] mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-[#655E78] leading-relaxed">
                  {tool.description}
                </p>
                {needsTimeButMissing && (
                  <span className={`mt-2 text-xs ${tool.color.text}`}>
                    Add birth time for best results
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Other tools */}
        <div className="mt-8 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-widest text-[#655E78] text-center mb-4">Other tools</p>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {otherTools.map((tool) => (
              <Link
                key={tool.name}
                href={tool.href}
                className={`group ${tool.color.bg} rounded-2xl border ${tool.color.border} ${tool.color.hover} ${tool.color.glow} p-6 transition-all text-center flex flex-col items-center`}
              >
                <div className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform">
                  <Image src={tool.image} alt={tool.name} width={64} height={64} className="w-full h-full object-contain" />
                </div>
                <h3 className="font-serif text-base md:text-lg text-[#2D2640] mb-1">
                  {tool.name}
                </h3>
                <p className="text-sm text-[#655E78] leading-relaxed">
                  {tool.description}
                </p>
                <span className="mt-2 text-xs text-[#8A8099]">
                  {tool.note}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
