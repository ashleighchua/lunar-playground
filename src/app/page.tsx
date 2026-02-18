'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { CitySelect } from '@/components/ui/CitySelect';
import { getCurrentMoonPhase } from '@/lib/moon';
import { getMoonPhaseFelt } from '@/lib/transitContent';
import { saveBirthData, loadBirthData } from '@/lib/birthData';
import { featuredReviews } from '@/data/reviews';
import type { City } from '@/lib/cities';
import { categoryInfo, type Destination } from '@/lib/travel';
import { calculateAstrocartography, type AstrocartographyResult } from '@/lib/astrocartography';
import { estimateTimezone } from '@/lib/ephemeris';
import { getCityCharacter } from '@/data/cityCharacters';
import { WorldMap } from '@/components/WorldMap';
import { CheckoutButton } from '@/components/CheckoutButton';

type Category = 'sun' | 'jupiter' | 'venus' | 'moon';

function PlanetIcon({ planet, className = '' }: { planet: string; className?: string }) {
  const strokeWidth = 1.5;
  switch (planet) {
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'moon':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
          <path d="M19 12c0 3.866-3.134 7-7 7-2.55 0-4.78-1.365-6-3.404C7.17 17.44 9.39 18.5 12 18.5c3.59 0 6.5-2.91 6.5-6.5 0-2.61-1.06-4.83-2.904-5.996C17.635 7.224 19 9.45 19 12z" />
        </svg>
      );
    case 'venus':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
          <circle cx="12" cy="9" r="5" />
          <path d="M12 14v7" />
          <path d="M9 18h6" />
        </svg>
      );
    case 'jupiter':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
          <path d="M7 4v16" />
          <path d="M7 4c4 0 8 2 8 6s-4 6-8 6" />
          <path d="M4 12h10" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Home() {
  const moonPhase = getCurrentMoonPhase();
  const phaseFelt = getMoonPhaseFelt(moonPhase.name);
  void phaseFelt;

  // Funnel state
  const [funnelStep, setFunnelStep] = useState<'theme' | 'form' | 'loading' | 'result'>('theme');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [astroResult, setAstroResult] = useState<AstrocartographyResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Birth data
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [birthplace, setBirthplace] = useState<City | null>(null);

  const loadingSteps = [
    'Calculating exact planetary positions at your birth...',
    'Projecting planetary lines across the globe...',
    'Mapping line crossings and power zones...',
    'Analyzing angular distances to major cities...',
    'Evaluating line strength by proximity...',
    'Cross-referencing aspect patterns...',
    'Weighing planetary dignity at each location...',
    'Scoring cities against your chart...',
    'Ranking your top matches...',
    'Finding your strongest match...',
  ];

  // Load saved birth data on mount
  useEffect(() => {
    const savedData = loadBirthData();
    if (savedData) {
      setBirthdate(savedData.birthdate);
      setBirthtime(savedData.birthtime);
      if (savedData.birthplace) {
        setBirthplace({
          label: savedData.birthplace.name,
          value: savedData.birthplace.name,
          country: savedData.birthplace.country,
          lat: savedData.birthplace.lat,
          lng: savedData.birthplace.lng,
        });
      }
    }
  }, []);

  // Loading animation + calculation
  useEffect(() => {
    if (funnelStep !== 'loading') return;

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => Math.min(prev + 1, loadingSteps.length - 1));
    }, 1000);

    const timer = setTimeout(() => {
      if (selectedCategory && birthdate) {
        const date = new Date(birthdate);
        const tz = birthplace ? estimateTimezone(birthplace.lng) : 0;
        const calcResult = calculateAstrocartography(date, birthtime || undefined, tz, selectedCategory);
        if (calcResult) {
          const result: Destination = {
            city: calcResult.city,
            country: calcResult.country,
            lat: calcResult.lat,
            lng: calcResult.lng,
            description: calcResult.description,
          };
          setDestination(result);
          setAstroResult(calcResult);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setFunnelStep('result');
        setLoadingStep(0);
      }
    }, 10000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [funnelStep, selectedCategory, birthdate, birthtime, birthplace]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setFunnelStep('form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) return;
    saveBirthData({
      birthdate,
      birthtime,
      birthplace: birthplace ? { name: birthplace.label, country: birthplace.country || '', lat: birthplace.lat, lng: birthplace.lng } : null,
    });
    setFunnelStep('loading');
  };

  const handleReset = () => {
    setFunnelStep('theme');
    setSelectedCategory(null);
    setDestination(null);
    setAstroResult(null);
  };

  const handleTryCategory = (category: Category) => {
    setSelectedCategory(category);
    setDestination(null);
    setAstroResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setFunnelStep('loading');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation currentPage="home" />

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes fadeMessage {
          0% { opacity: 0; transform: translateY(8px); }
          15% { opacity: 1; transform: translateY(0); }
          85% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-8px); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 600; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>

      {/* 1. HERO — Inline Astrocartography Funnel */}
      <section className="relative overflow-hidden bg-starfield">
        {/* Background image with translucent effect */}
        <Image
          src="/Images/Astrocartography.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/80 via-[#FAF7F2]/70 to-[#FAF7F2]" />
        <div className="absolute inset-0 bg-hero-atmosphere pointer-events-none" />

        <div className="relative container-editorial pt-16 pb-12 md:pt-24 md:pb-16">

          {/* Step 1: Theme Selection */}
          {funnelStep === 'theme' && (
            <div className="max-w-2xl mx-auto text-center" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
              <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">
                <span className="text-gradient-gold">Discover where your soul feels most alive</span>
              </h1>
              <p className="mt-4 text-[#6B6B6B] leading-relaxed">
                Your birth chart reveals the city where your career takes off, love finds you,
                <br />or you finally feel at home. Choose what matters most.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8 max-w-lg mx-auto">
                {([
                  ['venus', categoryInfo.venus] as const,
                  ['jupiter', categoryInfo.jupiter] as const,
                  ['sun', categoryInfo.sun] as const,
                  ['moon', categoryInfo.moon] as const,
                ]).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className="group flex flex-col items-center p-6 text-center glass-card rounded-2xl hover:border-[#D4A84B]/30 hover:shadow-glow-gold transition-all cursor-pointer"
                  >
                    <PlanetIcon planet={key} className="w-7 h-7 mb-3 text-[#2A2A2A] group-hover:text-[#D4A84B] transition-colors" />
                    <h3 className="text-sm font-medium text-[#2A2A2A]">{info.title}</h3>
                  </button>
                ))}
              </div>

              <p className="mt-6 text-xs text-[#6B6B6B]/60">No email or signup required</p>
            </div>
          )}

          {/* Step 2: Birth Details Form */}
          {funnelStep === 'form' && selectedCategory && (
            <div className="max-w-md mx-auto text-center" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
              <button
                onClick={() => setFunnelStep('theme')}
                className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-6 cursor-pointer"
              >
                &larr; Back
              </button>

              <div className="flex items-center justify-center gap-3 mb-6">
                <PlanetIcon planet={selectedCategory} className="w-7 h-7 text-[#D4A84B]" />
                <h2 className="font-serif text-2xl text-[#2A2A2A]">
                  {categoryInfo[selectedCategory].title}
                </h2>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-3 text-left">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="block text-xs text-[#6B6B6B] mb-1.5">Date of birth</label>
                    <input
                      type="date"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                      max={new Date().toISOString().split('T')[0]}
                      required
                      className="w-full px-3 py-2.5 rounded-lg border border-[#2A2A2A]/10 bg-white text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D4A84B]/50 transition-colors"
                    />
                  </div>
                  <div className="w-[120px]">
                    <label className="block text-xs text-[#6B6B6B] mb-1.5">Time <span className="text-[#6B6B6B]/50">(optional)</span></label>
                    <input
                      type="time"
                      value={birthtime}
                      onChange={(e) => setBirthtime(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-[#2A2A2A]/10 bg-white text-[#2A2A2A] text-sm focus:outline-none focus:border-[#D4A84B]/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-[#6B6B6B] mb-1.5">Place of birth</label>
                  <CitySelect
                    value={birthplace?.label || ''}
                    onChange={(city) => setBirthplace(city)}
                    placeholder="Type your city..."
                    className="w-full"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!birthdate}
                  className="mt-4 w-full px-8 py-3.5 bg-[#2A2A2A] text-[#FAF7F2] rounded-lg hover:bg-[#1a1a1a] transition-colors font-medium text-sm tracking-wide disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Find my city
                </button>
                <p className="mt-3 text-xs text-[#6B6B6B]/60 text-center">No email or signup required</p>
              </form>
            </div>
          )}

          {/* Step 3: Loading Animation */}
          {funnelStep === 'loading' && (
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center max-w-md">
                {/* Animated globe with orbital ring */}
                <div className="relative w-40 h-40 mb-10">
                  {/* Outer orbital ring */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 160 160"
                    style={{ animation: 'spinSlow 8s linear infinite' }}
                  >
                    <circle cx="80" cy="80" r="70" fill="none" stroke="#D4A84B" strokeWidth="0.5" opacity="0.3" />
                    <circle cx="80" cy="10" r="3" fill="#D4A84B" opacity="0.8" />
                  </svg>
                  {/* Inner orbital ring (counter) */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 160 160"
                    style={{ animation: 'spinSlow 12s linear infinite reverse' }}
                  >
                    <circle cx="80" cy="80" r="50" fill="none" stroke="#C4A88F" strokeWidth="0.5" opacity="0.2" />
                    <circle cx="80" cy="30" r="2" fill="#C4A88F" opacity="0.6" />
                  </svg>
                  {/* Planetary line being drawn */}
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                    <path
                      d="M 20 120 Q 80 40 140 100"
                      fill="none"
                      stroke="#D4A84B"
                      strokeWidth="1.5"
                      strokeDasharray="600"
                      opacity="0.4"
                      style={{ animation: 'drawLine 4s ease-in-out infinite' }}
                    />
                  </svg>
                  {/* Center globe */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-[#2A2A2A]/10 bg-[#FAF7F2] flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#2A2A2A" strokeWidth="0.8" className="w-10 h-10 opacity-30">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20" />
                        <path d="M12 2a15 15 0 0 1 0 20" />
                        <path d="M12 2a15 15 0 0 0 0 20" />
                      </svg>
                    </div>
                  </div>
                  {/* Pulsing dots at cardinal points */}
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-[#D4A84B]"
                      style={{
                        top: `${50 + 42 * Math.sin((i * Math.PI) / 2)}%`,
                        left: `${50 + 42 * Math.cos((i * Math.PI) / 2)}%`,
                        transform: 'translate(-50%, -50%)',
                        animation: `pulse 2s ease-in-out infinite ${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Rotating message */}
                <p
                  key={loadingStep}
                  className="font-serif text-lg text-[#2A2A2A] mb-3"
                  style={{ animation: 'fadeMessage 2.5s ease-in-out' }}
                >
                  {loadingSteps[loadingStep]}
                </p>

                {/* Progress bar */}
                <div className="w-48 h-px bg-[#2A2A2A]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#D4A84B]/50 transition-all duration-1000 ease-out"
                    style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Results + Step 5: Upsell */}
          {funnelStep === 'result' && destination && selectedCategory && (
            <div className="max-w-3xl mx-auto" style={{ animation: 'fadeInUp 0.4s ease-out' }}>
              <button
                onClick={handleReset}
                className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-6 cursor-pointer"
              >
                &larr; Try another category
              </button>

              {/* Result header */}
              <div className="text-center mb-6">
                <p className="text-[#6B6B6B] leading-relaxed">
                  For <span className="text-[#2A2A2A] font-medium">{categoryInfo[selectedCategory].title}</span>, the city that resonates with your chart is
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mt-2">
                  {destination.city}, {destination.country}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <PlanetIcon planet={selectedCategory} className="w-5 h-5 text-[#D4A84B]" />
                  <p className="text-sm text-[#6B6B6B]">
                    {categoryInfo[selectedCategory].name}
                  </p>
                </div>

                {astroResult && (
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs tracking-wide ${
                      astroResult.strength === 'exact'
                        ? 'bg-[#D4A84B]/20 text-[#8B6914]'
                        : astroResult.strength === 'strong'
                        ? 'bg-[#D4A84B]/15 text-[#8B6914]'
                        : 'bg-[#2A2A2A]/5 text-[#6B6B6B]'
                    }`}>
                      {astroResult.strength === 'exact'
                        ? 'Very strong alignment'
                        : astroResult.strength === 'strong'
                        ? 'Strong alignment'
                        : 'Moderate alignment'}
                      {astroResult.distanceMiles > 0 && (
                        <span className="ml-1 opacity-60">
                          ({Math.round(astroResult.distanceMiles)} mi from line)
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </div>

              {/* Map */}
              <div className="mb-8">
                <WorldMap destination={destination} className="w-full" />
              </div>

              {/* Content cards */}
              <div className="space-y-6 pb-4">
                {/* Interpretation + themes */}
                {astroResult?.interpretationShort && (
                  <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-6 shadow-glow-gold">
                    <h3 className="text-xs tracking-[0.15em] uppercase text-[#D4A84B] mb-3">What this means</h3>
                    <p className="font-serif text-lg text-[#2A2A2A] leading-relaxed mb-3">{astroResult.interpretationShort}</p>
                    {astroResult.themes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {astroResult.themes.map((theme) => (
                          <span key={theme} className="px-3 py-1.5 rounded-full border border-[#D4A84B]/20 text-xs text-[#8B6914] bg-[#D4A84B]/5">
                            {theme}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">{destination.description}</p>
                  </div>
                )}

                {/* Vision narrative */}
                {astroResult?.vision && (
                  <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-6 shadow-glow-gold">
                    <h3 className="text-xs tracking-[0.15em] uppercase text-[#D4A84B] mb-3">What life here could look like</h3>
                    <p className="font-serif text-lg text-[#2A2A2A] leading-relaxed">{astroResult.vision}</p>
                  </div>
                )}

                {/* Life area snapshot */}
                {astroResult?.lifeAreas && astroResult.lifeAreas.length > 0 && (
                  <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-6 shadow-glow-gold">
                    <h3 className="text-xs tracking-[0.15em] uppercase text-[#D4A84B] mb-4">
                      Your alignment in {destination.city}
                    </h3>
                    <div className="space-y-3">
                      {astroResult.lifeAreas.map((area) => (
                        <div key={area.category} className="relative">
                          {area.active ? (
                            <div className="flex items-center justify-between py-2">
                              <span className="text-sm text-[#2A2A2A] font-medium">{area.label}</span>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {[0, 1, 2].map((i) => (
                                    <div
                                      key={i}
                                      className={`w-2.5 h-2.5 rounded-full ${
                                        (area.strength === 'strong' && i <= 2) ||
                                        (area.strength === 'active' && i <= 1) ||
                                        (area.strength === 'present' && i === 0)
                                          ? 'bg-[#D4A84B]'
                                          : 'bg-[#2A2A2A]/10'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-xs text-[#6B6B6B] w-16 text-right capitalize">
                                  {area.strength}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between py-2 opacity-40">
                              <span className="text-sm text-[#2A2A2A]">{area.label}</span>
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  {[0, 1, 2].map((i) => (
                                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A]/10" />
                                  ))}
                                </div>
                                <span className="text-xs text-[#6B6B6B] w-16 text-right">
                                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5 inline">
                                    <rect x="3" y="7" width="10" height="7" rx="1.5" />
                                    <path d="M5 7V5a3 3 0 0 1 6 0v2" />
                                  </svg>
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#6B6B6B]/60 mt-4 text-center">
                      Full report reveals all life areas for your top cities
                    </p>
                  </div>
                )}

                {/* City character */}
                {(() => {
                  const character = getCityCharacter(destination.city);
                  if (!character) return null;
                  return (
                    <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-6 shadow-glow-gold">
                      <h3 className="text-xs tracking-[0.15em] uppercase text-[#D4A84B] mb-3">About {destination.city}</h3>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">{character}</p>
                    </div>
                  );
                })()}

                {/* Try other lines */}
                <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-6 shadow-glow-gold">
                  <h3 className="text-xs tracking-[0.15em] uppercase text-[#D4A84B] mb-3">Try your other lines</h3>
                  <p className="text-sm text-[#6B6B6B] mb-4">Each planetary line points to a different city.</p>
                  <div className="flex flex-wrap gap-2">
                    {(['venus', 'jupiter', 'sun', 'moon'] as const)
                      .filter((key) => key !== selectedCategory)
                      .map((key) => (
                        <button
                          key={key}
                          onClick={() => handleTryCategory(key)}
                          className="flex items-center gap-2 px-4 py-2 border border-[#2A2A2A]/10 rounded-full text-sm text-[#2A2A2A] hover:border-[#D4A84B]/40 hover:bg-[#D4A84B]/5 transition-colors cursor-pointer"
                        >
                          <PlanetIcon planet={key} className="w-4 h-4" />
                          {categoryInfo[key].title}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              {/* Paid Upsell */}
              <div className="mt-8 bg-[#F0E6D6] rounded-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <span className="text-xs tracking-[0.15em] uppercase text-[#8B6914]">Go deeper</span>
                  <h2 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] mt-4 mb-4">
                    Get your full relocation report
                  </h2>
                  <p className="text-[#6B6B6B] leading-relaxed max-w-lg mx-auto">
                    This free tool shows one city. Your full relocation report maps all your planetary lines and reveals the cities where your career, love life, and personal growth transform.
                  </p>
                </div>

                <ul className="max-w-sm mx-auto mb-6 space-y-3">
                  <li className="flex items-start gap-2 text-[#2A2A2A]/70 text-sm">
                    <span className="text-[#D4A84B] mt-0.5">&#183;</span>
                    All major planetary lines mapped and interpreted
                  </li>
                  <li className="flex items-start gap-2 text-[#2A2A2A]/70 text-sm">
                    <span className="text-[#D4A84B] mt-0.5">&#183;</span>
                    Top 3 cities personalised to your chart
                  </li>
                  <li className="flex items-start gap-2 text-[#2A2A2A]/70 text-sm">
                    <span className="text-[#D4A84B] mt-0.5">&#183;</span>
                    Line crossings and power zones identified
                  </li>
                  <li className="flex items-start gap-2 text-[#2A2A2A]/70 text-sm">
                    <span className="text-[#D4A84B] mt-0.5">&#183;</span>
                    Delivered as a detailed PDF report
                  </li>
                </ul>

                <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <div className="bg-white rounded-2xl p-5 text-center shadow-glow-gold">
                    <p className="font-serif text-lg text-[#2A2A2A] mb-1">Relocation Report</p>
                    <p className="text-2xl font-serif text-[#2A2A2A] mb-3">$50</p>
                    <CheckoutButton productId="astrocartography" label="Get Your Report" />
                  </div>
                  <div className="bg-white rounded-2xl p-5 text-center border-2 border-[#D4A84B]/30 shadow-glow-gold">
                    <span className="inline-block px-2 py-0.5 bg-[#D4A84B]/15 text-[#8B6914] text-[10px] tracking-wider uppercase rounded-full mb-2">Best Value</span>
                    <p className="font-serif text-lg text-[#2A2A2A] mb-1">The Complete Reading</p>
                    <p className="text-2xl font-serif text-[#2A2A2A] mb-3">$90</p>
                    <CheckoutButton productId="combo" label="Get the Full Package" />
                  </div>
                </div>

              </div>

              <p className="text-xs text-[#6B6B6B]/60 text-center mt-6">
                This is meant for reflection, not professional guidance. Take what resonates, leave what doesn&apos;t.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Below-the-fold sections: only show before results */}
      {funnelStep !== 'result' && funnelStep !== 'loading' && (<>

      {/* 2. SOCIAL PROOF — Reviews */}
      <section className="bg-gradient-to-b from-[#F5F0EB] to-[#FAF7F2] py-16 md:py-20">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-xs tracking-[0.15em] uppercase text-[#6B6B6B] mb-10">
              What clients are saying
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredReviews.map((review) => (
                <div key={review.id} className="text-center">
                  <div className="flex justify-center gap-1 mb-3">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#D4A84B] text-[#D4A84B]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#2A2A2A] leading-relaxed italic">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <p className="text-xs text-[#6B6B6B] mt-2">Verified client</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/reviews" className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors">
                Read all reviews &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE UPGRADE — Paid reading */}
      <section className="container-editorial py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs tracking-[0.15em] uppercase text-[#6B6B6B]">
              Go deeper
            </span>
            <h2 className="font-serif text-3xl md:text-4xl mt-4 mb-4">
              <span className="text-gradient-gold">Find where you belong</span>
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed">
              The free tool shows one city. A full relocation report maps all your planetary lines and tells you exactly where to move for career breakthroughs, love, and personal growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 p-6 text-center relative shadow-glow-gold">
              <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-[#D4A84B]/15 text-[#8B6914] text-[10px] tracking-wider uppercase rounded-full">
                Most Popular
              </span>
              <p className="font-serif text-lg text-[#2A2A2A] mb-1">Relocation Report</p>
              <p className="text-sm text-[#6B6B6B] mb-3">Find the city where everything clicks</p>
              <p className="text-2xl font-serif text-[#2A2A2A] mb-4">$50</p>
              <CheckoutButton productId="astrocartography" label="Get Your Report" />
            </div>
            <div className="bg-white rounded-2xl border-2 border-[#D4A84B]/30 p-6 text-center relative shadow-glow-gold">
              <span className="absolute top-3 right-3 px-2.5 py-0.5 bg-[#D4A84B]/15 text-[#8B6914] text-[10px] tracking-wider uppercase rounded-full">
                Best Value
              </span>
              <p className="font-serif text-lg text-[#2A2A2A] mb-1">The Complete Reading</p>
              <p className="text-sm text-[#6B6B6B] mb-3">Know who you are. Find where you belong. See how you shift.</p>
              <p className="text-2xl font-serif text-[#2A2A2A] mb-4">$90</p>
              <CheckoutButton productId="combo" label="Get the Full Package" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. THE CLOSE — Final CTA */}
      <section className="py-16 md:py-24 bg-[#2A2A2A]">
        <div className="container-editorial">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-serif text-2xl md:text-3xl text-[#FAF7F2] leading-relaxed mb-8">
              Stop wondering.
              <br />
              <span className="text-gradient-gold-light">Find the city that changes everything.</span>
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-4 bg-[#D4A84B] text-[#2A2A2A] rounded-lg hover:bg-[#C49A3F] transition-colors font-medium text-sm tracking-wide"
            >
              Find your city
            </Link>
          </div>
        </div>
      </section>

      </>)}

      {/* Footer */}
      <footer className="py-8">
        <div className="container-editorial">
          <div className="flex justify-end">
            <div className="flex gap-8 text-sm text-[#6B6B6B]">
              <Link href="/reviews" className="hover:text-[#2A2A2A] transition-colors">Reviews</Link>
              <Link href="/faq" className="hover:text-[#2A2A2A] transition-colors">FAQ</Link>
              <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#2A2A2A] transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
