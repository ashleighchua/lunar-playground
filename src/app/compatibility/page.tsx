'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CitySelect } from '@/components/ui/CitySelect';
import { Navigation } from '@/components/Navigation';
import type { City } from '@/lib/cities';

export default function CompatibilityPage() {
  const [city1, setCity1] = useState<City | null>(null);
  const [city2, setCity2] = useState<City | null>(null);
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation currentPage="compatibility" />

      {/* Hero */}
      <section className="container-editorial pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
            Compatibility
          </h1>
          <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
            How two charts speak to each other. Not prediction, but illumination—
            the patterns, tensions, and harmonies between you.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="container-editorial">
        <div className="h-px bg-[#2A2A2A]/10" />
      </div>

      {/* Form Section */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Person 1 */}
          <div>
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
              First person
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="name1" className="block text-sm text-[#6B6B6B] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name1"
                  placeholder="Their name"
                  className="w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent text-[#2A2A2A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#2A2A2A]/30 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="birthdate1" className="block text-sm text-[#6B6B6B] mb-2">
                  Date of birth
                </label>
                <input
                  type="date"
                  id="birthdate1"
                  className="w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent text-[#2A2A2A] focus:outline-none focus:border-[#2A2A2A]/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#6B6B6B] mb-2">
                  Place of birth
                </label>
                <CitySelect
                  value={city1?.label || ''}
                  onChange={(city) => setCity1(city)}
                  placeholder="Search for a city..."
                />
              </div>
            </div>
          </div>

          {/* Person 2 */}
          <div>
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
              Second person
            </h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="name2" className="block text-sm text-[#6B6B6B] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name2"
                  placeholder="Their name"
                  className="w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent text-[#2A2A2A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:border-[#2A2A2A]/30 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="birthdate2" className="block text-sm text-[#6B6B6B] mb-2">
                  Date of birth
                </label>
                <input
                  type="date"
                  id="birthdate2"
                  className="w-full px-4 py-3 border border-[#2A2A2A]/10 bg-transparent text-[#2A2A2A] focus:outline-none focus:border-[#2A2A2A]/30 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#6B6B6B] mb-2">
                  Place of birth
                </label>
                <CitySelect
                  value={city2?.label || ''}
                  onChange={(city) => setCity2(city)}
                  placeholder="Search for a city..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-md">
          <button
            type="submit"
            className="w-full px-8 py-4 bg-[#2A2A2A] text-[#FAF7F2] text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors"
          >
            Compare charts
          </button>
        </div>
      </section>

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
