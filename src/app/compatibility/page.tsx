'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { renderZodiacIcon } from '@/components/icons/ZodiacIcons';
import {
  ZodiacSign,
  zodiacSigns,
  signDates,
  signElements,
  signDescriptions,
  getCompatibility,
} from '@/lib/data/compatibility-data';

const ELEMENT_BG: Record<string, string> = {
  Fire: '#F0D0D4',    // rose
  Earth: '#E8DABA',   // warm sand
  Air: '#D6CCE6',     // lavender
  Water: '#B8CCDF',   // blue
};

const ELEMENT_BORDER: Record<string, string> = {
  Fire: '#C4737B',
  Earth: '#C4A862',
  Air: '#A89BC4',
  Water: '#6B85A3',
};

export default function Compatibility2Page() {
  const [sign1, setSign1] = useState<ZodiacSign | null>(null);
  const [sign2, setSign2] = useState<ZodiacSign | null>(null);
  const [pageState, setPageState] = useState<'selection' | 'loading' | 'results'>('selection');
  const [loadingStep, setLoadingStep] = useState(0);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
  const loadingSteps = [
    'Comparing elemental energies...',
    'Reading relationship dynamics...',
    'Mapping your compatibility...',
  ];

  // Loading animation
  useEffect(() => {
    if (pageState !== 'loading') return;

    const phaseInterval = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % moonPhases.length);
    }, 200);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => Math.min(prev + 1, loadingSteps.length - 1));
    }, 1000);

    const timer = setTimeout(() => {
      setPageState('results');
    }, 3500);

    return () => {
      clearInterval(phaseInterval);
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [pageState]);

  const handleSignClick = (sign: ZodiacSign) => {
    if (!sign1) {
      setSign1(sign);
    } else if (!sign2) {
      setSign2(sign);
      setLoadingStep(0);
      setLoadingPhase(0);
      setPageState('loading');
    }
  };

  const handleReset = () => {
    setSign1(null);
    setSign2(null);
    setPageState('selection');
    setLoadingStep(0);
    setLoadingPhase(0);
    setEmail('');
    setEmailSent(false);
    setSubscribeToNewsletter(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !sign1 || !sign2 || !compatibility) return;

    setEmailSending(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email,
          type: 'compatibility',
          subscribe: subscribeToNewsletter,
          data: {
            person1: {
              name: sign1,
              moonEmoji: signElements[sign1].symbol,
            },
            person2: {
              name: sign2,
              moonEmoji: signElements[sign2].symbol,
            },
            moonCompatibility: compatibility.overview,
            elementCompatibility: `${sign1} (${signElements[sign1].element}) and ${sign2} (${signElements[sign2].element}) - ${compatibility.level} compatibility at ${compatibility.percentage}%`,
            overallReading: `Strengths: ${compatibility.strengths.join('. ')}. Tips: ${compatibility.tips.join('. ')}`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      setEmailSent(true);
    } catch (error) {
      console.error('Email send error:', error);
    } finally {
      setEmailSending(false);
    }
  };

  const compatibility = sign1 && sign2 ? getCompatibility(sign1, sign2) : null;

  return (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation currentPage="compatibility" />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D2640] leading-[1.1] tracking-tight">
              Compatibility
            </h1>
            <p className="mt-6 text-lg text-[#7B7394] leading-relaxed">
              {!sign1
                ? 'Select your zodiac sign to begin.'
                : !sign2
                ? 'Now select their sign.'
                : `${sign1} & ${sign2}`}
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2D2640]/10" />
        </div>

        {/* Sign Selection */}
        {pageState === 'selection' && (
          <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16 min-h-[60vh]">
            {sign1 && (
              <button
                onClick={handleReset}
                className="text-sm text-[#7B7394] hover:text-[#2D2640] transition-colors mb-12"
              >
                ← Start over
              </button>
            )}
            <div className="max-w-4xl w-full mx-auto flex flex-col items-center min-h-[50vh]">

              {/* Selected signs display */}
              {sign1 && (
                <div className="flex items-center justify-center gap-8 mb-12">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full flex items-center justify-center text-[#F0EBF8]" style={{ backgroundColor: ELEMENT_BORDER[signElements[sign1].element] || '#8A8099' }}>
                      {renderZodiacIcon(sign1, 48)}
                    </div>
                    <p className="mt-3 font-serif text-xl text-[#2D2640]">{sign1}</p>
                    <p className="text-sm text-[#7B7394]">{signElements[sign1].element}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-4xl text-[#7B7394]">&</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#8A8099]/40 flex items-center justify-center text-[#7B7394] text-2xl">
                      ?
                    </div>
                    <p className="mt-3 font-serif text-xl text-[#7B7394]">Their sign</p>
                    <p className="text-sm text-transparent">.</p>
                  </div>
                </div>
              )}

              <h2 className="font-serif text-2xl text-[#2D2640] mb-8 text-center">
                {!sign1 ? 'Choose your sign' : 'Choose their sign'}
              </h2>

              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 justify-items-center">
                {zodiacSigns.map((sign) => {
                  const isSelected = sign === sign1;
                  const element = signElements[sign].element;
                  const bg = ELEMENT_BG[element] || '#F0EBF8';
                  const border = ELEMENT_BORDER[element] || '#8A8099';

                  return (
                    <button
                      key={sign}
                      onClick={() => handleSignClick(sign)}
                      className={`group flex flex-col items-center p-4 rounded-lg transition-all w-full ${
                        isSelected
                          ? 'ring-2 ring-offset-2 ring-offset-[#F0EBF8]'
                          : 'hover:scale-105'
                      }`}
                      style={{
                        backgroundColor: bg,
                        borderColor: isSelected ? border : 'transparent',
                        ...(isSelected ? { ringColor: border } as React.CSSProperties : {}),
                      }}
                    >
                      <div className="mb-2 text-[#2D2640]">
                        {renderZodiacIcon(sign, 32)}
                      </div>
                      <p className="text-sm font-medium text-[#2D2640]">
                        {sign}
                      </p>
                      <p className="text-xs mt-1 text-[#7B7394]">
                        {signDates[sign]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Loading */}
        {pageState === 'loading' && (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-8" style={{ filter: 'saturate(0.3) brightness(1.1)' }}>
                {moonPhases.map((phase, index) => (
                  <span
                    key={index}
                    className={`text-4xl transition-all duration-200 ${
                      index === loadingPhase ? 'opacity-100 scale-125' : index <= loadingPhase ? 'opacity-60' : 'opacity-20'
                    }`}
                  >
                    {phase}
                  </span>
                ))}
              </div>
              <p className="font-serif text-2xl text-[#2D2640] mb-6">Mapping your cosmos</p>
              <p
                key={loadingStep}
                className="text-sm text-[#2D2640] mb-4 animate-pulse"
              >
                {loadingSteps[loadingStep]}
              </p>
              <div className="w-48 h-px bg-[#2D2640]/10 rounded-full overflow-hidden mx-auto">
                <div
                  className="h-full bg-[#FF8FA3]/50 transition-all duration-1000 ease-out"
                  style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {pageState === 'results' && sign1 && sign2 && compatibility && (
          <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
            <button
              onClick={handleReset}
              className="text-sm text-[#7B7394] hover:text-[#2D2640] transition-colors mb-12"
            >
              ← Try another pairing
            </button>
            <div className="max-w-3xl mx-auto">

              {/* Signs header */}
              <div className="flex items-center justify-center gap-8 mb-12">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-[#F0EBF8]" style={{ backgroundColor: ELEMENT_BORDER[signElements[sign1].element] || '#8A8099' }}>
                    {renderZodiacIcon(sign1, 48)}
                  </div>
                  <p className="mt-3 font-serif text-xl text-[#2D2640]">{sign1}</p>
                  <p className="text-sm text-[#7B7394]">{signElements[sign1].element}</p>
                </div>
                <div className="text-center">
                  <span className="text-4xl text-[#7B7394]">&</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full flex items-center justify-center text-[#F0EBF8]" style={{ backgroundColor: ELEMENT_BORDER[signElements[sign2].element] || '#8A8099' }}>
                    {renderZodiacIcon(sign2, 48)}
                  </div>
                  <p className="mt-3 font-serif text-xl text-[#2D2640]">{sign2}</p>
                  <p className="text-sm text-[#7B7394]">{signElements[sign2].element}</p>
                </div>
              </div>

              {/* Compatibility description */}
              <div className="text-center mb-16">
                <div className="inline-block px-6 py-3 border border-[#2D2640]/10">
                  <p className="font-serif text-lg text-[#2D2640]">
                    {compatibility.level === 'High' ? 'Natural Harmony' :
                     compatibility.level === 'Moderate' ? 'Balanced Energy' :
                     'Takes Effort'}
                  </p>
                </div>
              </div>

              {/* Overview */}
              <div className="mb-10">
                <h2 className="font-serif text-xl text-[#2D2640] mb-4">Overview</h2>
                <p className="text-[#7B7394] leading-relaxed text-lg">
                  {compatibility.overview}
                </p>
              </div>

              {/* Sign descriptions */}
              <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-xl border" style={{ backgroundColor: ELEMENT_BG[signElements[sign1].element], borderColor: ELEMENT_BORDER[signElements[sign1].element] + '30' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{ color: ELEMENT_BORDER[signElements[sign1].element] }}>{renderZodiacIcon(sign1, 22)}</span>
                    <h3 className="font-serif text-base text-[#2D2640]">{sign1}</h3>
                    <span className="text-xs text-[#7B7394] ml-auto">{signElements[sign1].element}</span>
                  </div>
                  <p className="text-sm text-[#2D2640]/70 leading-relaxed">
                    {signDescriptions[sign1]}
                  </p>
                </div>
                <div className="p-6 rounded-xl border" style={{ backgroundColor: ELEMENT_BG[signElements[sign2].element], borderColor: ELEMENT_BORDER[signElements[sign2].element] + '30' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <span style={{ color: ELEMENT_BORDER[signElements[sign2].element] }}>{renderZodiacIcon(sign2, 22)}</span>
                    <h3 className="font-serif text-base text-[#2D2640]">{sign2}</h3>
                    <span className="text-xs text-[#7B7394] ml-auto">{signElements[sign2].element}</span>
                  </div>
                  <p className="text-sm text-[#2D2640]/70 leading-relaxed">
                    {signDescriptions[sign2]}
                  </p>
                </div>
              </div>

              {/* Strengths */}
              <div className="mb-10 p-6 rounded-xl bg-[#F0F5EE] border border-[#5C7A60]/15">
                <h2 className="font-serif text-xl text-[#2D2640] mb-4 flex items-center gap-2">
                  <span className="text-[#5C7A60]">&#10038;</span> Strengths of This Pairing
                </h2>
                <ul className="space-y-2">
                  {compatibility.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sm text-[#5C7A60] mt-0.5">&#10003;</span>
                      <span className="text-sm text-[#2D2640]/70 leading-relaxed">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Growth */}
              <div className="mb-10 p-6 rounded-xl bg-[#F5F0EE] border border-[#A85560]/15">
                <h2 className="font-serif text-xl text-[#2D2640] mb-4 flex items-center gap-2">
                  <span className="text-[#A85560]">&#9672;</span> Areas for Growth
                </h2>
                <ul className="space-y-2">
                  {compatibility.challenges.map((challenge, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sm text-[#A85560] mt-0.5">&#9675;</span>
                      <span className="text-sm text-[#2D2640]/70 leading-relaxed">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tips */}
              <div className="mb-10 p-6 rounded-xl bg-[#EEF0F5] border border-[#4E6A85]/15">
                <h2 className="font-serif text-xl text-[#2D2640] mb-4 flex items-center gap-2">
                  <span className="text-[#4E6A85]">&#10147;</span> Making It Work
                </h2>
                <ul className="space-y-2">
                  {compatibility.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-sm text-[#4E6A85] mt-0.5">&#8594;</span>
                      <span className="text-sm text-[#2D2640]/70 leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

              <p className="text-xs text-[#7B7394]/60 mt-8 text-center">
                This is meant for reflection, not professional guidance. Take what resonates, leave what doesn&apos;t.
              </p>
          </section>
        )}

        {/* CTA */}
        {pageState === 'results' && sign1 && sign2 && compatibility && (
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#F0E6D6] rounded-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <span className="text-xs tracking-[0.15em] uppercase text-[#C4365A]">Go deeper</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] mt-4 mb-4">
                    Get your full relationship blueprint
                  </h2>
                  <p className="text-lg text-[#7B7394] leading-relaxed max-w-lg mx-auto">
                    This free tool shows sun sign compatibility. Your full report analyses both birth charts for a complete picture.
                  </p>
                </div>

                <ul className="max-w-sm mx-auto mb-6 space-y-3">
                  <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                    <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                    Full birth chart compatibility, not just sun signs
                  </li>
                  <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                    <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                    Venus, Mars, and Moon sign dynamics explored
                  </li>
                  <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                    <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                    Communication styles and emotional needs mapped
                  </li>
                  <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                    <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                    Delivered as a detailed PDF report
                  </li>
                </ul>

                <div className="text-center">
                  <Link
                    href="/shop"
                    className="inline-block px-8 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-lg text-sm font-medium hover:bg-[#1E1835] transition-colors"
                  >
                    Get The Full Blueprint &mdash; $139
                  </Link>
                  <p className="text-xs text-[#7B7394]/60 mt-4">Personalised report delivered within 48 hours</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Email Results Section */}
        {pageState === 'results' && sign1 && sign2 && compatibility && (
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-xl mx-auto text-center">
              {!emailSent ? (
                <>
                  <div className="bg-[#F5F3F0] rounded-2xl p-8 md:p-10">
                    <h2 className="font-serif text-2xl text-[#2D2640] mb-4">
                      Save your reading
                    </h2>
                    <p className="text-[#7B7394] mb-8">
                      Get your {sign1} & {sign2} compatibility sent to your inbox.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 px-5 py-4 rounded-lg border border-[#2D2640]/10 bg-white text-[#2D2640] placeholder-[#7B7394]/50 focus:outline-none focus:ring-2 focus:ring-[#8A8099]/30 focus:border-[#8A8099]/50 transition-colors"
                          required
                        />
                        <button
                          type="submit"
                          disabled={emailSending}
                          className="px-8 py-4 rounded-lg bg-[#8A8099] text-white hover:bg-[#A89080] transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                          {emailSending ? 'Sending...' : 'Send to me'}
                        </button>
                      </div>
                      <label className="flex items-center justify-center gap-2 cursor-pointer mt-4">
                        <input
                          type="checkbox"
                          checked={subscribeToNewsletter}
                          onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                          className="w-4 h-4 rounded border-[#2D2640]/20 accent-[#8A8099]"
                        />
                        <span className="text-sm text-[#7B7394]">
                          Also receive occasional notes from Lunar Playground
                        </span>
                      </label>
                    </form>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-serif text-2xl text-[#2D2640] mb-4">
                    On its way
                  </h2>
                  <p className="text-[#7B7394]">
                    Check your inbox for your {sign1} & {sign2} compatibility reading.
                  </p>
                </>
              )}
            </div>
          </section>
        )}

        {/* Try another pairing */}
        {pageState === 'results' && (
          <section className="container-editorial pb-12">
            <div className="text-center">
              <button
                onClick={handleReset}
                className="text-sm text-[#7B7394] hover:text-[#2D2640] transition-colors"
              >
                ← Try another pairing
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
