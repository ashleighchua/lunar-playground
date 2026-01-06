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

type Category = 'sun' | 'jupiter' | 'venus' | 'moon' | 'mercury';

export default function TravelPage() {
  const [step, setStep] = useState<'category' | 'form' | 'loading' | 'result'>('category');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [birthdate, setBirthdate] = useState('');
  const [birthtime, setBirthtime] = useState('');
  const [birthplace, setBirthplace] = useState<City | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loadingPhase, setLoadingPhase] = useState(0);

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
            <div className="max-w-3xl">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">
                What are you looking for?
              </h2>
              <p className="text-[#6B6B6B] mb-12">
                Different planetary lines suggest different experiences. Choose what calls to you.
              </p>

              <div className="grid gap-4">
                {(Object.entries(categoryInfo) as [Category, typeof categoryInfo.sun][]).map(([key, info]) => (
                  <button
                    key={key}
                    onClick={() => handleCategorySelect(key)}
                    className="group flex items-start gap-6 p-6 text-left border border-[#2A2A2A]/10 hover:border-[#2A2A2A]/30 transition-colors"
                  >
                    <span className="text-3xl font-light">{info.symbol}</span>
                    <div>
                      <p className="text-xs text-[#6B6B6B] uppercase tracking-wider mb-1">
                        {info.name}
                      </p>
                      <h3 className="font-serif text-lg text-[#2A2A2A] group-hover:underline">
                        {info.title}
                      </h3>
                      <p className="mt-2 text-sm text-[#6B6B6B]">
                        {info.description}
                      </p>
                    </div>
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
                <span className="text-3xl">{categoryInfo[selectedCategory].symbol}</span>
                <div>
                  <p className="text-sm text-[#6B6B6B]">{categoryInfo[selectedCategory].name}</p>
                  <h2 className="font-serif text-2xl text-[#2A2A2A]">
                    {categoryInfo[selectedCategory].title}
                  </h2>
                </div>
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
          <section className="container-editorial py-24 md:py-32">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="text-6xl mb-8 transition-all duration-300">
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
          <section className="container-editorial py-16 md:py-24">
            <div className="max-w-3xl">
              <button
                onClick={handleReset}
                className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-8"
              >
                ← Try another category
              </button>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl">{categoryInfo[selectedCategory].symbol}</span>
                <p className="text-sm text-[#6B6B6B]">
                  Your {categoryInfo[selectedCategory].name}
                </p>
              </div>

              <h2 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-2">
                {destination.city}
              </h2>
              <p className="text-lg text-[#6B6B6B] mb-8">
                {destination.country}
              </p>

              {/* Map */}
              <div className="mb-12 border border-[#2A2A2A]/10 p-4 md:p-8 bg-[#FAF7F2]">
                <WorldMap
                  destination={destination}
                  originLat={birthplace?.lat}
                  originLng={birthplace?.lng}
                  className="w-full"
                />
              </div>

              {/* Description */}
              <div className="max-w-2xl">
                <p className="text-[#6B6B6B] leading-relaxed text-lg">
                  {destination.description}
                </p>
              </div>

              {/* CTA */}
              <div className="mt-16 pt-8 border-t border-[#2A2A2A]/10">
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
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="container-editorial py-16 border-t border-[#2A2A2A]/10">
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
