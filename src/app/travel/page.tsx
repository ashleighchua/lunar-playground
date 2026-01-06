'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CitySelect } from '@/components/ui/CitySelect';
import type { City } from '@/lib/cities';

export default function TravelPage() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Navigation */}
      <nav className="container-editorial py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-serif text-xl text-[#2A2A2A]">
            The Lunar Playground
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <Link href="/your-chart" className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors">
              Your Chart
            </Link>
            <Link href="/today" className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors">
              Today
            </Link>
            <Link href="/compatibility" className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors">
              Compatibility
            </Link>
            <Link href="/travel" className="text-sm text-[#2A2A2A]">
              Travel
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container-editorial pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
            Where to Travel
          </h1>
          <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
            Your chart drawn across the globe. Astrocartography reveals places where
            different parts of you might feel amplified, challenged, or at ease.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Explainer */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16">
          <div className="max-w-md">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-6">
              How it works
            </h2>
            <div className="space-y-4 text-[#6B6B6B] leading-relaxed">
              <p>
                At the moment you were born, each planet occupied a specific position
                in the sky. But that same moment looked different from different places
                on Earth.
              </p>
              <p>
                Astrocartography maps these differences—showing you where your Sun line
                runs (places of visibility and vitality), where your Moon line falls
                (places of emotional resonance), and more.
              </p>
              <p>
                This isn&apos;t about good or bad places. It&apos;s about understanding
                why certain cities feel like home while others feel like a challenge.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
              Generate your map
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="birthdate" className="block text-sm text-[#6B6B6B] mb-2">
                  Date of birth
                </label>
                <input
                  type="date"
                  id="birthdate"
                  className="w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent text-[#2A2A2A] focus:outline-none focus:border-[#2A2A2A]/30 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="birthtime" className="block text-sm text-[#6B6B6B] mb-2">
                  Time of birth
                </label>
                <input
                  type="time"
                  id="birthtime"
                  className="w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent text-[#2A2A2A] focus:outline-none focus:border-[#2A2A2A]/30 transition-colors"
                />
                <p className="mt-2 text-xs text-[#6B6B6B]">
                  Accurate birth time is especially important for astrocartography.
                </p>
              </div>

              <div>
                <label className="block text-sm text-[#6B6B6B] mb-2">
                  Place of birth
                </label>
                <CitySelect
                  value={selectedCity?.label || ''}
                  onChange={(city) => setSelectedCity(city)}
                  placeholder="Search for a city..."
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#2A2A2A] text-[#FAF7F2] text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors mt-4"
              >
                See my map
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Planetary Lines Legend */}
      <section className="container-editorial py-16 md:py-24">
        <h2 className="font-serif text-2xl text-[#2A2A2A] mb-12">
          The planetary lines
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">Sun Lines</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Where you feel seen, vital, and expressive. Good for career visibility
              and personal growth.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">Moon Lines</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Where you feel emotionally at home. Places of comfort, intuition,
              and inner life.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">Venus Lines</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Where beauty, love, and pleasure are amplified. Romantic destinations
              and artistic inspiration.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">Mars Lines</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">
              Where your drive and energy intensify. Challenging but potentially
              transformative places.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container-editorial py-16 border-t border-[#2A2A2A]/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="font-serif text-lg text-[#2A2A2A]">The Lunar Playground</p>
            <p className="text-sm text-[#6B6B6B] mt-1">For reflection, not prediction.</p>
          </div>
          <div className="flex gap-8 text-sm text-[#6B6B6B]">
            <Link href="/about" className="hover:text-[#2A2A2A] transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
