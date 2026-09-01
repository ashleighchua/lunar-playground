'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WorldMap } from '@/components/WorldMap';
import { CitySelect } from '@/components/ui/CitySelect';
import type { City } from '@/lib/cities';
import {
  categoryInfo,
  type Destination
} from '@/lib/travel';
import { calculateAstrocartography, type AstrocartographyResult } from '@/lib/astrocartography';
import { getInterpretation, astrocartographyFaqs } from '@/lib/astrocartography/interpretations';
import { loadBirthData } from '@/lib/birthData';
import { estimateTimezone } from '@/lib/ephemeris';
import { getCityCharacter } from '@/data/cityCharacters';

type Category = 'sun' | 'jupiter' | 'venus' | 'moon' | 'mercury' | 'mars';

const CATEGORY_BG: Record<string, string> = {
  venus: '#F2D1DC',   // soft pink
  jupiter: '#D4E8CB',  // soft green
  sun: '#F0E6CE',     // warm sand
  moon: '#C9DAF0',    // soft blue
};

// SVG Planet Icons with consistent stroke width
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
    case 'mercury':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
          <circle cx="12" cy="10" r="4" />
          <path d="M12 14v6" />
          <path d="M9 18h6" />
          <path d="M8 6c0 0 2-2 4-2s4 2 4 2" />
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
    case 'mars':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} className={className}>
          <circle cx="10" cy="14" r="5" />
          <path d="M14.5 9.5L19 5" />
          <path d="M15 5h4v4" />
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

export default function TravelPage() {
  const [step, setStep] = useState<'category' | 'form' | 'loading' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [birthplace, setBirthplace] = useState<City | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [astroResult, setAstroResult] = useState<AstrocartographyResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [revealError, setRevealError] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSendFailed, setEmailSendFailed] = useState(false);

  const loadingSteps = [
    'Calculating planetary positions at your birth...',
    'Mapping planetary lines across the globe...',
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

  // Loading animation
  useEffect(() => {
    if (step !== 'loading') return;

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => Math.min(prev + 1, loadingSteps.length - 1));
    }, 1000);

    // Calculate destination after animation
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
        setStep('result');
        setLoadingStep(0);
      }
    }, 3000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [step, selectedCategory, birthdate, birthtime]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    // Skip form if birth data already exists (e.g. from homepage)
    if (birthdate) {
      setStep('loading');
    } else {
      setStep('form');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthdate) {
      setStep('loading');
    }
  };

  const handleReset = () => {
    setStep('category');
    setSelectedCategory(null);
    setDestination(null);
    setAstroResult(null);
    setEmailSent(false);
    setEmailSendFailed(false);
    // Deliberately not resetting `revealed`/`name`/`email`: once someone has
    // unlocked a result this session, later categories shouldn't re-gate.
  };

  const handleReveal = async (e: React.FormEvent) => {
    e.preventDefault();
    setRevealError('');

    if (!name.trim()) {
      setRevealError('Please enter your name.');
      return;
    }
    if (!email || !email.includes('@')) {
      setRevealError('Please enter a valid email address.');
      return;
    }
    if (!destination || !selectedCategory) return;

    // Unlock immediately — the free reveal shouldn't hang on (or fail because
    // of) the email round-trip below.
    setRevealed(true);
    setEmailSending(true);
    setEmailSendFailed(false);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          name,
          type: 'astrocartography',
          subscribe: true,
          data: {
            destination: {
              name: destination.city,
              country: destination.country,
              description: destination.description,
            },
            category: {
              title: categoryInfo[selectedCategory].title,
              description: categoryInfo[selectedCategory].description,
            },
            planetaryInfluence: `Your ${categoryInfo[selectedCategory].title} line passes through ${destination.city}, ${destination.country}. This is a place where you may experience ${categoryInfo[selectedCategory].description.toLowerCase()}.`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSent(true);
    } catch (error) {
      console.error('Email send error:', error);
      setEmailSendFailed(true);
    } finally {
      setEmailSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation currentPage="astrocartography" />

      <style jsx>{`
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

      <main className="flex-1">
        {/* Category Selection Step */}
        {step === 'category' && (
          <section className="container-editorial py-12 md:py-20">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-3">
                What do you want to <span className="text-gradient-gold">transform</span>?
              </h1>
              <p className="text-[#655E78] mb-10">
                Choose your priority and we&apos;ll find the city where it happens.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {([
                  ['venus', categoryInfo.venus] as const,
                  ['jupiter', categoryInfo.jupiter] as const,
                  ['sun', categoryInfo.sun] as const,
                  ['moon', categoryInfo.moon] as const,
                ]).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className="group flex flex-col items-center p-6 text-center rounded-2xl hover:scale-105 transition-all"
                    style={{ backgroundColor: CATEGORY_BG[key] || '#F0EBF8' }}
                  >
                    <PlanetIcon planet={key} className="w-7 h-7 mb-3 text-[#2D2640]" />
                    <h3 className="text-base font-medium text-[#2D2640]">
                      {info.title}
                    </h3>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* What is Astrocartography? (static, always visible) */}
        {step === 'category' && (
          <>
            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            <section className="container-editorial py-12 md:py-16">
              <div className="max-w-2xl mx-auto mb-10">
                <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-4">What is Astrocartography?</h2>
                <p className="text-[#655E78] leading-relaxed">
                  Astrocartography maps your birth chart onto the globe. Wherever a planet was rising, setting, culminating overhead, or at its lowest point at the moment you were born, that creates a line running across the map, and everywhere that line passes, that planet&rsquo;s energy is especially active for you.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-10">
                {(['sun', 'moon', 'venus', 'jupiter'] as const).map((planetKey) => {
                  const info = categoryInfo[planetKey];
                  const planetName = planetKey.charAt(0).toUpperCase() + planetKey.slice(1);
                  return (
                    <div key={planetKey}>
                      <p className="font-serif text-lg text-[#2D2640] mb-1">
                        <span className="mr-2">{info.symbol}</span>
                        {info.name} &mdash; {info.title}
                      </p>
                      <p className="text-sm text-[#655E78] leading-relaxed mb-4">{info.description}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {(['MC', 'IC', 'AC', 'DC'] as const).map((angle) => {
                          const interp = getInterpretation(planetName, angle);
                          if (!interp) return null;
                          return (
                            <div key={angle} className="border border-[#2D2640]/10 rounded-lg p-4">
                              <p className="text-xs uppercase tracking-widest text-[#655E78] mb-1">{angle} Line</p>
                              <p className="text-sm text-[#2D2640]/80 leading-relaxed">{interp.short}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            <section className="container-editorial py-12 md:py-16">
              <div className="max-w-2xl mx-auto">
                <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-8">Common Questions</h2>
                <div className="space-y-8">
                  {astrocartographyFaqs.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-serif text-lg text-[#2D2640] mb-2">{item.q}</h3>
                      <p className="text-[#655E78] leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* Form Step */}
        {step === 'form' && selectedCategory && (
          <section className="container-editorial pt-8 pb-16 md:pt-12 md:pb-24">
            <button
              onClick={() => setStep('category')}
              className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-12"
            >
              ← Back to categories
            </button>

            <div className="max-w-md mx-auto text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <PlanetIcon planet={selectedCategory} className="w-8 h-8 text-[#2D2640]" />
                <h2 className="font-serif text-2xl text-[#2D2640]">
                  {categoryInfo[selectedCategory].title}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <label htmlFor="birthdate" className="block text-sm text-[#655E78] mb-2">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    required
                    className={`w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-white focus:outline-none focus:border-[#FF8FA3]/50 transition-colors ${birthdate ? 'text-[#2D2640]' : 'text-[#655E78]'}`}
                  />
                </div>

                <div>
                  <label htmlFor="birthtime" className="block text-sm text-[#655E78] mb-2">
                    Time of birth <span className="text-[#655E78]">(optional)</span>
                  </label>
                  <input
                    type="time"
                    id="birthtime"
                    value={birthtime}
                    onChange={(e) => setBirthtime(e.target.value)}
                    className={`w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-white focus:outline-none focus:border-[#FF8FA3]/50 transition-colors ${birthtime ? 'text-[#2D2640]' : 'text-[#655E78]'}`}
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#655E78] mb-2">
                    Place of birth
                  </label>
                  <CitySelect
                    value={birthplace?.label || ''}
                    onChange={(city) => setBirthplace(city)}
                    placeholder="Search for a city..."
                  />
                  <p className="mt-2 text-xs text-[#655E78]">
                    Your birth location helps map your planetary lines accurately.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors mt-4"
                >
                  Find my city
                </button>
              </form>
            </div>
          </section>
        )}

        {/* Loading Step */}
        {step === 'loading' && (
          <section className="container-editorial py-16 md:py-24 min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center max-w-md">
              {/* Animated globe with orbital rings */}
              <div className="relative w-40 h-40 mb-10">
                {/* Outer orbital ring */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 160 160"
                  style={{ animation: 'spinSlow 8s linear infinite' }}
                >
                  <circle cx="80" cy="80" r="70" fill="none" stroke="#FF8FA3" strokeWidth="0.5" opacity="0.3" />
                  <circle cx="80" cy="10" r="3" fill="#FF8FA3" opacity="0.8" />
                </svg>
                {/* Inner orbital ring (counter) */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 160 160"
                  style={{ animation: 'spinSlow 12s linear infinite reverse' }}
                >
                  <circle cx="80" cy="80" r="50" fill="none" stroke="#FFB88C" strokeWidth="0.5" opacity="0.2" />
                  <circle cx="80" cy="30" r="2" fill="#FFB88C" opacity="0.6" />
                </svg>
                {/* Planetary line being drawn */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 160 160">
                  <path
                    d="M 20 120 Q 80 40 140 100"
                    fill="none"
                    stroke="#FF8FA3"
                    strokeWidth="1.5"
                    strokeDasharray="600"
                    opacity="0.4"
                    style={{ animation: 'drawLine 4s ease-in-out infinite' }}
                  />
                </svg>
                {/* Center globe */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#2D2640]/10 bg-[#F0EBF8] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#2D2640" strokeWidth="0.8" className="w-10 h-10 opacity-30">
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
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#FF8FA3]"
                    style={{
                      top: `${50 + 42 * Math.sin((i * Math.PI) / 2)}%`,
                      left: `${50 + 42 * Math.cos((i * Math.PI) / 2)}%`,
                      transform: 'translate(-50%, -50%)',
                      animation: `pulse 2s ease-in-out infinite ${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              {/* Rotating message — fixed height so globe doesn't shift */}
              <div className="h-16 flex items-center justify-center px-4">
                <p
                  key={loadingStep}
                  className="font-serif text-base md:text-lg text-[#2D2640] text-center"
                  style={{ animation: 'fadeMessage 2.5s ease-in-out' }}
                >
                  {loadingSteps[loadingStep]}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-48 h-px bg-[#2D2640]/10 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-[#FF8FA3]/50 transition-all duration-1000 ease-out"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Result Step */}
        {step === 'result' && destination && selectedCategory && (
          <>
            <section className="container-editorial pt-6 pb-4 md:pt-8 md:pb-6">
              {/* Left-aligned: Try another category - closer to top */}
              <button
                onClick={handleReset}
                className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-6"
              >
                ← Try another category
              </button>

              {/* Result liner */}
              <div className="text-center mb-6">
                <p className="text-[#655E78] leading-relaxed">
                  For <span className="text-[#2D2640] font-medium">{categoryInfo[selectedCategory].title}</span>, the city that resonates with your chart is
                </p>
                <h2 className={`font-serif text-3xl md:text-4xl text-[#2D2640] mt-2 ${revealed ? '' : 'blur-[7px] select-none'}`} aria-hidden={!revealed}>
                  {destination.city}, {destination.country}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-3">
                  <PlanetIcon planet={selectedCategory} className="w-5 h-5 text-[#FF8FA3]" />
                  <p className="text-sm text-[#655E78]">
                    {categoryInfo[selectedCategory].name}
                  </p>
                </div>

                {/* Alignment strength */}
                {astroResult && (
                  <div className="mt-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs tracking-wide ${
                      astroResult.strength === 'exact'
                        ? 'bg-[#FF8FA3]/20 text-[#C4365A]'
                        : astroResult.strength === 'strong'
                        ? 'bg-[#FF8FA3]/15 text-[#C4365A]'
                        : 'bg-[#2D2640]/5 text-[#655E78]'
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

              {/* Map + content cards — blurred and inert until name + email are given */}
              <div className={revealed ? '' : 'relative select-none pointer-events-none'} aria-hidden={!revealed}>
                <div className={revealed ? '' : 'blur-[3px] opacity-60'}>
                  {/* Centered: Map */}
                  <div className="max-w-3xl mx-auto mb-8">
                    <WorldMap
                      destination={destination}
                      className="w-full"
                    />
                  </div>

                  {/* Content cards */}
                  <div className="max-w-3xl mx-auto space-y-6 pb-4 md:pb-6">
                    {/* Interpretation + themes */}
                    {astroResult?.interpretationShort && (
                      <div className="bg-white rounded-2xl border border-[#2D2640]/5 p-6 shadow-glow-gold">
                        <h3 className="text-xs tracking-[0.15em] uppercase text-[#FF8FA3] mb-3">
                          What this means
                        </h3>
                        <p className="font-serif text-lg text-[#2D2640] leading-relaxed mb-3">
                          {astroResult.interpretationShort}
                        </p>
                        {astroResult.themes.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {astroResult.themes.map((theme) => (
                              <span key={theme} className="px-3 py-1.5 rounded-full border border-[#FF8FA3]/20 text-xs text-[#C4365A] bg-[#FF8FA3]/5">
                                {theme}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-sm text-[#655E78] leading-relaxed">
                          {destination.description}
                        </p>
                      </div>
                    )}

                    {/* Vision narrative */}
                    {astroResult?.vision && (
                      <div className="bg-white rounded-2xl border border-[#2D2640]/5 p-6 shadow-glow-gold">
                        <h3 className="text-xs tracking-[0.15em] uppercase text-[#FF8FA3] mb-3">
                          What life here could look like
                        </h3>
                        <p className="font-serif text-lg text-[#2D2640] leading-relaxed">
                          {astroResult.vision}
                        </p>
                      </div>
                    )}

                    {/* Life area snapshot */}
                    {astroResult?.lifeAreas && astroResult.lifeAreas.length > 0 && (
                      <div className="bg-white rounded-2xl border border-[#2D2640]/5 p-6 shadow-glow-gold">
                        <h3 className="text-xs tracking-[0.15em] uppercase text-[#FF8FA3] mb-4">
                          Your alignment in {destination.city}
                        </h3>
                        <div className="space-y-3">
                          {astroResult.lifeAreas.map((area) => (
                            <div key={area.category} className="relative">
                              {area.active ? (
                                <div className="flex items-center justify-between py-2">
                                  <span className="text-sm text-[#2D2640] font-medium">{area.label}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                      {[0, 1, 2].map((i) => (
                                        <div
                                          key={i}
                                          className={`w-2.5 h-2.5 rounded-full ${
                                            (area.strength === 'strong' && i <= 2) ||
                                            (area.strength === 'active' && i <= 1) ||
                                            (area.strength === 'present' && i === 0)
                                              ? 'bg-[#FF8FA3]'
                                              : 'bg-[#2D2640]/10'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-xs text-[#655E78] w-16 text-right capitalize">
                                      {area.strength}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-between py-2 opacity-40">
                                  <span className="text-sm text-[#2D2640]">{area.label}</span>
                                  <div className="flex items-center gap-2">
                                    <div className="flex gap-1">
                                      {[0, 1, 2].map((i) => (
                                        <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#2D2640]/10" />
                                      ))}
                                    </div>
                                    <span className="text-xs text-[#655E78] w-16 text-right">
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
                        <p className="text-xs text-[#655E78] mt-4 text-center">
                          Full report reveals all life areas for your top cities
                        </p>
                      </div>
                    )}

                    {/* City character */}
                    {(() => {
                      const character = getCityCharacter(destination.city);
                      if (!character) return null;
                      return (
                        <div className="bg-white rounded-2xl border border-[#2D2640]/5 p-6 shadow-glow-gold">
                          <h3 className="text-xs tracking-[0.15em] uppercase text-[#FF8FA3] mb-3">
                            About {destination.city}
                          </h3>
                          <p className="text-sm text-[#655E78] leading-relaxed">
                            {character}
                          </p>
                        </div>
                      );
                    })()}

                    {/* Try your other lines */}
                    <div className="bg-white rounded-2xl border border-[#2D2640]/5 p-6 shadow-glow-gold">
                      <h3 className="text-xs tracking-[0.15em] uppercase text-[#FF8FA3] mb-3">
                        Try your other lines
                      </h3>
                      <p className="text-sm text-[#655E78] mb-4">
                        Each planetary line points to a different city. See where else your chart takes you.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {([
                          ['venus', categoryInfo.venus] as const,
                          ['jupiter', categoryInfo.jupiter] as const,
                          ['sun', categoryInfo.sun] as const,
                          ['moon', categoryInfo.moon] as const,
                        ]).filter(([key]) => key !== selectedCategory).map(([key, info]) => (
                          <button
                            key={key}
                            onClick={() => {
                              setSelectedCategory(key);
                              setDestination(null);
                              setAstroResult(null);
                              setStep('loading');
                            }}
                            className="flex items-center gap-2 px-4 py-2 border border-[#2D2640]/10 rounded-full text-sm text-[#2D2640] hover:border-[#FF8FA3]/40 hover:bg-[#FF8FA3]/5 transition-colors"
                          >
                            <PlanetIcon planet={key} className="w-4 h-4" />
                            {info.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-[#655E78] text-center">
                      This is meant for reflection, not professional guidance. Take what resonates, leave what doesn&apos;t.
                    </p>
                  </div>
                </div>

                {/* Fade the blurred content into the unlock card below */}
                {!revealed && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F0EBF8]/50 to-[#F0EBF8]" />
                )}
              </div>
            </section>

            {/* Reveal gate — name + email unlock the map and full reading */}
            {!revealed && (
              <section className="container-editorial relative -mt-28 md:-mt-32 pb-12 md:pb-16">
                <div className="max-w-md mx-auto">
                  <div className="bg-white rounded-2xl border border-[#2D2640]/5 shadow-glow-gold p-8 md:p-10 text-center">
                    <h2 className="font-serif text-2xl text-[#2D2640] mb-2">
                      Reveal your city
                    </h2>
                    <p className="text-[#655E78] mb-6">
                      We&apos;ve matched your chart to a city for {categoryInfo[selectedCategory].title.toLowerCase()}. Tell us where to send it.
                    </p>
                    <form onSubmit={handleReveal} className="space-y-3 text-left">
                      <div>
                        <label htmlFor="reveal-name" className="sr-only">Your name</label>
                        <input
                          id="reveal-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full px-5 py-4 rounded-lg border border-[#2D2640]/10 bg-white text-[#2D2640] placeholder-[#655E78]/50 focus:outline-none focus:ring-2 focus:ring-[#8A8099]/30 focus:border-[#8A8099]/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="reveal-email" className="sr-only">Email address</label>
                        <input
                          id="reveal-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-5 py-4 rounded-lg border border-[#2D2640]/10 bg-white text-[#2D2640] placeholder-[#655E78]/50 focus:outline-none focus:ring-2 focus:ring-[#8A8099]/30 focus:border-[#8A8099]/50 transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors"
                      >
                        Reveal my city
                      </button>
                      {revealError && (
                        <p className="text-sm text-red-600 text-center">{revealError}</p>
                      )}
                    </form>
                    <p className="text-xs text-[#655E78] mt-4">
                      We&apos;ll also send you occasional astrology finds and new tools. Unsubscribe anytime.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {revealed && (
              <>
                {/* Paid Reading CTA */}
                <section className="container-editorial py-12 md:py-16">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-[#F0E6D6] rounded-2xl p-8 md:p-12">
                      <div className="text-center mb-8">
                        <span className="text-xs tracking-[0.15em] uppercase text-[#C4365A]">Go deeper</span>
                        <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] mt-4 mb-4">
                          Get your full relocation report
                        </h2>
                        <p className="text-lg text-[#655E78] leading-relaxed max-w-lg mx-auto">
                          This free tool shows one city. Your full relocation report maps all your planetary lines, cross-references them with your natal chart, and reveals the cities where everything clicks.
                        </p>
                      </div>

                      <ul className="max-w-sm mx-auto mb-6 space-y-3">
                        <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                          <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                          All major planetary lines mapped and interpreted
                        </li>
                        <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                          <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                          Top 3 cities personalised to your chart
                        </li>
                        <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                          <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                          Line crossings and power zones identified
                        </li>
                        <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                          <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                          Delivered as a detailed PDF report
                        </li>
                      </ul>


                      <div className="text-center">
                        <a
                          href="/shop"
                          className="inline-block px-8 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-lg text-sm font-medium hover:bg-[#1E1835] transition-colors"
                        >
                          Get your relocation report &mdash; $5
                        </a>
                        <p className="text-xs text-[#655E78] mt-4">Delivered instantly</p>
                        <p className="text-xs text-[#655E78] mt-1">Calculated with Swiss Ephemeris, true to your exact chart</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Full-width divider */}
                <div className="container-editorial">
                  <div className="h-px bg-[#2D2640]/10" />
                </div>

                {/* Quiet email-delivery status — the reveal above already happened */}
                {(emailSending || emailSent || emailSendFailed) && (
                  <section className="container-editorial py-10 md:py-12">
                    <div className="max-w-xl mx-auto text-center">
                      <p className="text-sm text-[#655E78]">
                        {emailSending
                          ? 'Sending your copy…'
                          : emailSent
                          ? `✓ We've also sent your ${categoryInfo[selectedCategory].title.toLowerCase()} reading to ${email}.`
                          : "We couldn't email you a copy just now — everything above is still yours to keep."}
                      </p>
                    </div>
                  </section>
                )}
              </>
            )}
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}
