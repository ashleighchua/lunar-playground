'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { WorldMap } from '@/components/WorldMap';
import { CitySelect } from '@/components/ui/CitySelect';
import type { City } from '@/lib/cities';
import {
  calculateDestination,
  categoryInfo,
  type Destination
} from '@/lib/travel';

type Category = 'sun' | 'jupiter' | 'venus' | 'moon' | 'mercury' | 'mars';

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
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [email, setEmail] = useState('');
  const [subscribeToNewsletter, setSubscribeToNewsletter] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

  // Loading animation
  useEffect(() => {
    if (step !== 'loading') return;

    const interval = setInterval(() => {
      setLoadingPhase((prev) => (prev + 1) % moonPhases.length);
    }, 300);

    // Calculate destination after animation
    const timer = setTimeout(() => {
      if (selectedCategory && birthdate) {
        const date = new Date(birthdate);
        const result = calculateDestination(date, birthtime || undefined, selectedCategory);
        setDestination(result);
        setStep('result');
      }
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [step, selectedCategory, birthdate, birthtime]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setStep('form');
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
    setBirthdate('');
    setBirthtime('');
    setBirthplace(null);
    setDestination(null);
    setEmail('');
    setEmailSent(false);
    setSubscribeToNewsletter(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !destination) return;

    setEmailSending(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Email travel result to:', email, 'Newsletter:', subscribeToNewsletter);
    setEmailSending(false);
    setEmailSent(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navigation currentPage="travel" />

      <main className="flex-1">
        {/* Hero */}
        <section className="container-editorial pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
              Where to Travel
            </h1>
            <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
              Your chart drawn across the globe. Discover a place where a specific part of you
              might feel amplified, called to, or at ease.
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="container-editorial">
          <div className="h-px bg-[#2A2A2A]/10" />
        </div>

        {/* Category Selection Step */}
        {step === 'category' && (
          <section className="container-editorial py-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">
                What are you looking for?
              </h2>
              <p className="text-[#6B6B6B] mb-12">
                Different planetary lines suggest different experiences. Choose what calls to you.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(Object.entries(categoryInfo) as [Category, typeof categoryInfo.sun][]).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className="group flex flex-col items-center p-6 text-center border border-[#2A2A2A]/10 hover:border-[#2A2A2A]/30 transition-colors"
                  >
                    <PlanetIcon planet={key} className="w-8 h-8 mb-4 text-[#2A2A2A]" />
                    <h3 className="font-serif text-lg text-[#2A2A2A] group-hover:underline">
                      {info.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#6B6B6B]">
                      {info.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Form Step */}
        {step === 'form' && selectedCategory && (
          <section className="container-editorial py-16 md:py-24">
            <div className="max-w-md">
              <button
                onClick={() => setStep('category')}
                className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-8"
              >
                ← Back to categories
              </button>

              <div className="flex items-center gap-4 mb-8">
                <PlanetIcon planet={selectedCategory} className="w-8 h-8 text-[#2A2A2A]" />
                <h2 className="font-serif text-2xl text-[#2A2A2A]">
                  {categoryInfo[selectedCategory].title}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="birthdate" className="block text-sm text-[#6B6B6B] mb-2">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                    className={`w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent focus:outline-none focus:border-[#2A2A2A]/30 transition-colors ${birthdate ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/50'}`}
                  />
                </div>

                <div>
                  <label htmlFor="birthtime" className="block text-sm text-[#6B6B6B] mb-2">
                    Time of birth <span className="text-[#6B6B6B]/50">(optional)</span>
                  </label>
                  <input
                    type="time"
                    id="birthtime"
                    value={birthtime}
                    onChange={(e) => setBirthtime(e.target.value)}
                    className={`w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent focus:outline-none focus:border-[#2A2A2A]/30 transition-colors ${birthtime ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/50'}`}
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#6B6B6B] mb-2">
                    Place of birth
                  </label>
                  <CitySelect
                    value={birthplace?.label || ''}
                    onChange={(city) => setBirthplace(city)}
                    placeholder="Search for a city..."
                  />
                  <p className="mt-2 text-xs text-[#6B6B6B]">
                    Your birth location helps map your planetary lines accurately.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-[#2A2A2A] text-[#FAF7F2] text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors mt-4"
                >
                  Find my destination
                </button>
              </form>
            </div>
          </section>
        )}

        {/* Loading Step */}
        {step === 'loading' && (
          <section className="container-editorial py-24 md:py-32 min-h-[60vh] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-center">
              <div
                className="text-7xl md:text-8xl mb-8 transition-all duration-300"
                style={{
                  filter: 'saturate(0.3) brightness(1.1)',
                  opacity: 0.85
                }}
              >
                {moonPhases[loadingPhase]}
              </div>
              <p className="font-serif text-xl text-[#2A2A2A]">
                Drawing your line across the globe...
              </p>
              <p className="text-[#6B6B6B] mt-2">
                Finding where {categoryInfo[selectedCategory!].title.toLowerCase()} awaits
              </p>
            </div>
          </section>
        )}

        {/* Result Step */}
        {step === 'result' && destination && selectedCategory && (
          <>
            <section className="container-editorial pt-8 pb-16 md:pt-12 md:pb-24">
              {/* Left-aligned: Try another category - closer to top */}
              <button
                onClick={handleReset}
                className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-12"
              >
                ← Try another category
              </button>

              {/* Centered: Header and subheader */}
              <div className="text-center mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-2">
                  {destination.city}
                </h2>
                <p className="text-lg text-[#6B6B6B]">
                  {destination.country}
                </p>
              </div>

              {/* Centered: Planet info */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <PlanetIcon planet={selectedCategory} className="w-6 h-6 text-[#6B6B6B]" />
                <p className="text-sm text-[#6B6B6B]">
                  {categoryInfo[selectedCategory].title}
                </p>
              </div>

              {/* Centered: Map */}
              <div className="max-w-3xl mx-auto mb-12">
                <WorldMap
                  destination={destination}
                  className="w-full"
                />
              </div>

              {/* Centered: Description */}
              <div className="max-w-2xl mx-auto text-center mb-12">
                <p className="text-[#6B6B6B] leading-relaxed text-lg">
                  {destination.description}
                </p>
              </div>
            </section>

            {/* Full-width divider */}
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>

            {/* Email Results - Centered */}
            <section className="container-editorial py-16 md:py-24">
              <div className="max-w-xl mx-auto text-center">
                {!emailSent ? (
                  <>
                    <h2 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] mb-4">
                      Save your destination
                    </h2>
                    <p className="text-[#6B6B6B] mb-8">
                      Get your {categoryInfo[selectedCategory].title} reading for {destination.city} sent to your inbox.
                    </p>
                    <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto space-y-4">
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="flex-1 px-4 py-3 rounded-lg border border-[#2A2A2A]/10 bg-[#FAF7F2] text-[#2A2A2A] placeholder-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#C4A484]/30 focus:border-[#C4A484]/50 transition-colors"
                          required
                        />
                        <button
                          type="submit"
                          disabled={emailSending}
                          className="px-6 py-3 rounded-lg bg-[#C4A484] text-white hover:bg-[#B8956E] transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                          {emailSending ? 'Sending...' : 'Send to me'}
                        </button>
                      </div>
                      <label className="inline-flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={subscribeToNewsletter}
                          onChange={(e) => setSubscribeToNewsletter(e.target.checked)}
                          className="w-3 h-3 rounded accent-[#C4A484]"
                        />
                        <span className="text-xs text-[#6B6B6B]">
                          Also receive occasional notes from Lunar Playground
                        </span>
                      </label>
                    </form>
                  </>
                ) : (
                  <>
                    <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">
                      On its way
                    </h2>
                    <p className="text-[#6B6B6B]">
                      Check your inbox for your {destination.city} travel reading.
                    </p>
                  </>
                )}
              </div>
            </section>
          </>
        )}

        {/* Explore More CTA */}
        {step === 'result' && destination && selectedCategory && (
          <>
            <div className="container-editorial">
              <div className="h-px bg-[#2A2A2A]/10" />
            </div>
            <section className="container-editorial py-8 md:py-12">
              <p className="text-sm text-[#6B6B6B] mb-4">
                Curious about other aspects of your chart?
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 border border-[#2A2A2A]/20 text-sm text-[#2A2A2A] hover:border-[#2A2A2A]/40 transition-colors"
                >
                  Explore another line
                </button>
                <Link
                  href="/your-chart"
                  className="px-6 py-3 bg-[#2A2A2A] text-[#FAF7F2] text-sm hover:bg-[#1a1a1a] transition-colors"
                >
                  See your full chart
                </Link>
              </div>
            </section>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="container-editorial py-16">
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
      </footer>
    </div>
  );
}
