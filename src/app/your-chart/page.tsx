'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SendResultsEmail } from '@/components/ui/SendResultsEmail';
import { Navigation } from '@/components/Navigation';
import { CitySelect } from '@/components/ui/CitySelect';
import {
  getMoonPhase,
  getSunSign,
  getChineseZodiac,
  getLifePathNumber,
  parseBirthDateTime,
  type MoonPhase,
  type ZodiacSign,
  type ChineseZodiac,
  type LifePathNumber,
} from '@/lib/moon';
import { calculateChart, type ChartData, type BirthData } from '@/lib/ephemeris';
import { getTimezoneForCountry, type City } from '@/lib/cities';
import {
  getZodiacIcon,
  SunIcon,
  MoonIcon,
  RisingIcon,
} from '@/components/icons/ZodiacIcons';
import { getChineseZodiacIcon } from '@/components/icons/ChineseZodiacIcons';
import { saveBirthData } from '@/lib/birthData';

// Moon phase emojis for loading animation
const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

// Validate if a date string represents a real date
function isValidDate(dateString: string): boolean {
  if (!dateString) return false;

  const [year, month, day] = dateString.split('-').map(Number);

  // Check basic ranges
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  // Check if the date actually exists (handles Feb 30, etc.)
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year &&
         date.getMonth() === month - 1 &&
         date.getDate() === day;
}

export default function YourChartPage() {
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [formData, setFormData] = useState({
    birthdate: '',
    birthtime: '',
  });
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [birthMoon, setBirthMoon] = useState<MoonPhase | null>(null);
  const [sunSign, setSunSign] = useState<ZodiacSign | null>(null);
  const [chineseZodiac, setChineseZodiac] = useState<ChineseZodiac | null>(null);
  const [lifePath, setLifePath] = useState<LifePathNumber | null>(null);
  const [ephemerisChart, setEphemerisChart] = useState<ChartData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate date
    if (!isValidDate(formData.birthdate)) {
      setDateError('Please enter a valid birth date');
      return;
    }

    setDateError(null);

    // Save birth data for use on other pages
    saveBirthData({
      birthdate: formData.birthdate,
      birthtime: formData.birthtime,
      birthplace: selectedCity ? {
        name: selectedCity.label,
        country: selectedCity.country || '',
        lat: selectedCity.lat,
        lng: selectedCity.lng,
      } : null,
    });

    setIsCalculating(true);
    setShowLoading(true);
    setLoadingPhase(0);

    // Start the loading animation
    const loadingInterval = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % moonPhases.length);
    }, 200);

    // Calculate basic chart data from birth date
    const birthDate = parseBirthDateTime(formData.birthdate, formData.birthtime || undefined);
    setBirthMoon(getMoonPhase(birthDate));
    setSunSign(getSunSign(birthDate));
    setChineseZodiac(getChineseZodiac(birthDate));
    setLifePath(getLifePathNumber(birthDate));

    // Calculate ephemeris data for Moon sign and Rising sign
    if (selectedCity && formData.birthtime) {
      const [year, month, day] = formData.birthdate.split('-').map(Number);
      const [hour, minute] = formData.birthtime.split(':').map(Number);

      // Get timezone from country lookup, fallback to longitude-based estimate
      const countryTz = selectedCity.country
        ? getTimezoneForCountry(selectedCity.country)
        : null;

      // Fallback: estimate from longitude if country not found
      const rawTz = selectedCity.lng / 15;
      const fallbackTz = selectedCity.lng >= 0
        ? Math.ceil(rawTz)
        : Math.floor(rawTz);

      const timezone = countryTz !== null ? countryTz : fallbackTz;

      const birthData: BirthData = {
        year,
        month,
        day,
        hour,
        minute,
        latitude: selectedCity.lat,
        longitude: selectedCity.lng,
        timezone,
      };

      try {
        const chart = await calculateChart(birthData);
        setEphemerisChart(chart);
      } catch (error) {
        console.error('Error calculating ephemeris:', error);
        setEphemerisChart(null);
      }
    } else {
      setEphemerisChart(null);
    }

    // Keep loading screen visible for at least 3 seconds for effect
    await new Promise(resolve => setTimeout(resolve, 3000));

    clearInterval(loadingInterval);
    setIsCalculating(false);
    setShowLoading(false);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navigation currentPage="your-chart" />

      <main className="flex-1">
      {showLoading ? (
        // Loading Screen with Moon Phases Animation
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <div className="text-center">
            {/* Moon phases animation - all 8 phases with active one highlighted */}
            <div
              className="flex items-center justify-center gap-2 mb-8"
              style={{
                filter: 'saturate(0.3) brightness(1.1)',
              }}
            >
              {moonPhases.map((phase, index) => (
                <span
                  key={index}
                  className={`text-4xl transition-all duration-200 ${
                    index === loadingPhase
                      ? 'opacity-100 scale-125'
                      : index <= loadingPhase
                      ? 'opacity-60'
                      : 'opacity-20'
                  }`}
                >
                  {phase}
                </span>
              ))}
            </div>
            <p className="font-serif text-2xl text-[#2A2A2A] mb-2">
              Reading the stars...
            </p>
            <p className="text-sm text-[#6B6B6B]">
              Calculating your birth chart
            </p>
          </div>
        </div>
      ) : !showResults ? (
        <>
          {/* Hero */}
          <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
                Your Chart
              </h1>
              <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
                The sky at the moment you arrived. Your sun, moon, rising, and the
                lunar phase that colored your first breath.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2A2A2A]/10" />
          </div>

          {/* Form Section */}
          <section className="container-editorial py-12 md:py-16 min-h-[60vh] flex items-center justify-center">
            <div className="max-w-md w-full text-center">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">
                Enter your birth details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <label htmlFor="birthdate" className="block text-sm text-[#6B6B6B] mb-2">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="birthdate"
                    required
                    value={formData.birthdate}
                    onChange={(e) => {
                      setFormData({ ...formData, birthdate: e.target.value });
                      setDateError(null);
                    }}
                    className={`w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none transition-colors ${
                      formData.birthdate
                        ? 'text-[#2A2A2A] [&::-webkit-datetime-edit]:text-[#2A2A2A] [&::-webkit-datetime-edit-fields-wrapper]:text-[#2A2A2A]'
                        : 'text-[#6B6B6B]/50 [&::-webkit-datetime-edit]:text-[#6B6B6B]/50 [&::-webkit-datetime-edit-fields-wrapper]:text-[#6B6B6B]/50'
                    } ${
                      dateError
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#2A2A2A]/10 focus:border-[#2A2A2A]/30'
                    }`}
                  />
                  {dateError && (
                    <p className="mt-2 text-sm text-red-500">{dateError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="birthtime" className="block text-sm text-[#6B6B6B] mb-2">
                    Time of birth
                  </label>
                  <input
                    type="time"
                    id="birthtime"
                    value={formData.birthtime}
                    onChange={(e) => setFormData({ ...formData, birthtime: e.target.value })}
                    className={`w-full px-4 py-3 border border-[#2A2A2A]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2A2A2A]/30 transition-colors ${
                      formData.birthtime
                        ? 'text-[#2A2A2A] [&::-webkit-datetime-edit]:text-[#2A2A2A] [&::-webkit-datetime-edit-fields-wrapper]:text-[#2A2A2A]'
                        : 'text-[#6B6B6B]/50 [&::-webkit-datetime-edit]:text-[#6B6B6B]/50 [&::-webkit-datetime-edit-fields-wrapper]:text-[#6B6B6B]/50'
                    }`}
                  />
                  <p className="mt-2 text-xs text-[#6B6B6B]">
                    If you don&apos;t know your exact time, noon is a reasonable estimate.
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
                  disabled={isCalculating}
                  className="w-full px-8 py-4 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate my chart'}
                </button>
              </form>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Results: Birth Moon Hero */}
          <section className="container-editorial pt-8 pb-8 md:pt-12 md:pb-12">
            <button
              onClick={handleBack}
              className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-4 flex items-center gap-2"
            >
              <span>←</span> Enter different details
            </button>

            {birthMoon && (
              <div className="mt-4 flex flex-col items-center text-center">
                <p className="text-sm text-[#6B6B6B] tracking-wide uppercase mb-4">
                  The night you were born
                </p>
                <div
                  className="text-[120px] md:text-[180px] leading-none"
                  style={{
                    filter: 'saturate(0.3) brightness(1.1)',
                    opacity: 0.85
                  }}
                >
                  {birthMoon.emoji}
                </div>
                <p className="text-sm text-[#6B6B6B] mt-2">
                  {birthMoon.illumination}% illuminated
                </p>
                <h1 className="font-serif text-2xl md:text-3xl text-[#2A2A2A] leading-[1.1] mt-6">
                  {birthMoon.name}
                </h1>
                <p className="mt-4 text-base text-[#6B6B6B] leading-relaxed max-w-lg">
                  {birthMoon.description}
                </p>
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2A2A2A]/10" />
          </div>

          {/* Your Chart - Big Three */}
          <section className="container-editorial pt-12 md:pt-16">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-12">
              Your chart
            </h2>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Sun Sign Card */}
              <div className="p-6 md:p-8 border border-[#2A2A2A]/10 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <SunIcon size={24} className="text-[#2A2A2A]" />
                  <span className="text-xs tracking-wide uppercase text-[#6B6B6B]">Sun</span>
                </div>
                {sunSign && (
                  <>
                    {(() => {
                      const ZodiacIcon = getZodiacIcon(sunSign.name);
                      return <ZodiacIcon size={64} className="text-[#2A2A2A] mb-4" />;
                    })()}
                    <p className="font-serif text-2xl text-[#2A2A2A] mb-1">{sunSign.name}</p>
                    <p className="text-xs text-[#6B6B6B] mb-4">{sunSign.element} · {sunSign.quality}</p>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {sunSign.description}
                    </p>
                  </>
                )}
              </div>

              {/* Moon Sign Card */}
              <div className="p-6 md:p-8 border border-[#2A2A2A]/10 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MoonIcon size={24} className="text-[#2A2A2A]" />
                  <span className="text-xs tracking-wide uppercase text-[#6B6B6B]">Moon</span>
                </div>
                {ephemerisChart?.moon ? (
                  <>
                    {(() => {
                      const ZodiacIcon = getZodiacIcon(ephemerisChart.moon.sign);
                      return <ZodiacIcon size={64} className="text-[#2A2A2A] mb-4" />;
                    })()}
                    <p className="font-serif text-2xl text-[#2A2A2A] mb-1">{ephemerisChart.moon.sign}</p>
                    <p className="text-xs text-[#6B6B6B] mb-4">{ephemerisChart.moon.element} · {ephemerisChart.moon.quality}</p>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {ephemerisChart.moon.description}
                    </p>
                  </>
                ) : (
                  <div className="text-sm text-[#6B6B6B]">
                    <p className="mb-2">Requires birth time and place</p>
                    <p className="text-xs">The moon moves quickly through the zodiac, so exact timing matters.</p>
                  </div>
                )}
              </div>

              {/* Rising Sign Card */}
              <div className="p-6 md:p-8 border border-[#2A2A2A]/10 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <RisingIcon size={24} className="text-[#2A2A2A]" />
                  <span className="text-xs tracking-wide uppercase text-[#6B6B6B]">Rising</span>
                </div>
                {ephemerisChart?.rising ? (
                  <>
                    {(() => {
                      const ZodiacIcon = getZodiacIcon(ephemerisChart.rising.sign);
                      return <ZodiacIcon size={64} className="text-[#2A2A2A] mb-4" />;
                    })()}
                    <p className="font-serif text-2xl text-[#2A2A2A] mb-1">{ephemerisChart.rising.sign}</p>
                    <p className="text-xs text-[#6B6B6B] mb-4">{ephemerisChart.rising.element} · {ephemerisChart.rising.quality}</p>
                    <p className="text-sm text-[#6B6B6B] leading-relaxed">
                      {ephemerisChart.rising.description}
                    </p>
                  </>
                ) : (
                  <div className="text-sm text-[#6B6B6B]">
                    <p className="mb-2">Requires birth time and place</p>
                    <p className="text-xs">The rising sign changes every two hours.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Chinese Zodiac & Life Path */}
          <section className="container-editorial pt-12 pb-12 md:pb-16">
            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-12">
              Additional insights
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Chinese Zodiac Card */}
              {chineseZodiac && (
                <div className="p-6 md:p-8 border border-[#2A2A2A]/10 rounded-lg">
                  <p className="text-xs tracking-wide uppercase text-[#6B6B6B] mb-4">Chinese Zodiac</p>
                  {(() => {
                    const AnimalIcon = getChineseZodiacIcon(chineseZodiac.animal);
                    return <AnimalIcon size={48} className="text-[#2A2A2A] mb-4" />;
                  })()}
                  <div className="flex items-baseline gap-3 mb-4">
                    <p className="font-serif text-2xl text-[#2A2A2A]">
                      {chineseZodiac.element} {chineseZodiac.animal}
                    </p>
                    <span className="text-xs text-[#6B6B6B]">{chineseZodiac.yinYang}</span>
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {chineseZodiac.animalDescription.split('.').slice(0, 2).join('.')}.
                  </p>
                </div>
              )}

              {/* Life Path Card */}
              {lifePath && (
                <div className="p-6 md:p-8 border border-[#2A2A2A]/10 rounded-lg">
                  <p className="text-xs tracking-wide uppercase text-[#6B6B6B] mb-4">Life Path Number</p>
                  <div className="flex items-baseline gap-3 mb-4">
                    <p className="font-serif text-4xl text-[#2A2A2A]">{lifePath.number}</p>
                    {lifePath.isMasterNumber && (
                      <span className="px-2 py-1 text-xs tracking-wide uppercase bg-[#2A2A2A]/10 text-[#2A2A2A]">
                        Master Number
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {lifePath.description}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2A2A2A]/10" />
          </div>

          {/* Email Results */}
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">
                Save your chart
              </h2>
              <p className="text-[#6B6B6B] mb-8">
                We&apos;ll send your full chart to your inbox so you can revisit it anytime.
              </p>
              <SendResultsEmail
                type="your-chart"
                data={{
                  birthMoon: birthMoon ? {
                    name: birthMoon.name,
                    emoji: birthMoon.emoji,
                    illumination: birthMoon.illumination,
                    description: birthMoon.description,
                  } : null,
                  sunSign: sunSign ? {
                    name: sunSign.name,
                    description: sunSign.description,
                  } : null,
                  moonSign: ephemerisChart?.moon ? {
                    name: ephemerisChart.moon.sign,
                    description: ephemerisChart.moon.description,
                  } : null,
                  risingSign: ephemerisChart?.rising ? {
                    name: ephemerisChart.rising.sign,
                    description: ephemerisChart.rising.description,
                  } : null,
                  chineseZodiac: chineseZodiac ? {
                    animal: `${chineseZodiac.element} ${chineseZodiac.animal}`,
                    description: chineseZodiac.animalDescription,
                  } : null,
                  lifePath: lifePath ? {
                    number: lifePath.number,
                    description: lifePath.description,
                  } : null,
                }}
              />
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2A2A2A]/10" />
          </div>

          {/* Next Steps */}
          <section className="container-editorial py-8 md:py-12">
            <p className="text-sm text-[#6B6B6B] mb-4">
              Want to explore more?
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/compatibility"
                className="px-6 py-3 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] text-sm hover:bg-[#1a1a1a] transition-colors"
              >
                Check compatibility
              </Link>
              <Link
                href="/travel"
                className="px-6 py-3 rounded-lg border border-[#2A2A2A]/20 text-[#2A2A2A] text-sm hover:border-[#2A2A2A]/40 transition-colors"
              >
                Explore your travel map
              </Link>
            </div>
          </section>
        </>
      )}
      </main>

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
