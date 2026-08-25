'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { SendResultsEmail } from '@/components/ui/SendResultsEmail';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
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
import { saveBirthData, loadBirthData } from '@/lib/birthData';
import { isValidDate } from '@/lib/utils';

const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

export default function YourChartPage() {
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const chartLoadingSteps = [
    'Calculating planetary positions at your birth...',
    'Mapping your chart placements...',
    'Preparing your results...',
  ];
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
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  const runCalculation = useCallback(async (date: string, time: string, city: City | null) => {
    setIsCalculating(true);
    setShowLoading(true);
    setLoadingPhase(0);
    setLoadingStep(0);

    const loadingInterval = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % moonPhases.length);
    }, 200);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => Math.min(prev + 1, 2));
    }, 1000);

    intervalsRef.current = [loadingInterval, stepInterval];

    const birthDate = parseBirthDateTime(date, time || undefined);
    setBirthMoon(getMoonPhase(birthDate));
    setSunSign(getSunSign(birthDate));
    setChineseZodiac(getChineseZodiac(birthDate));
    setLifePath(getLifePathNumber(birthDate));

    if (city && time) {
      const [year, month, day] = date.split('-').map(Number);
      const [hour, minute] = time.split(':').map(Number);

      const countryTz = city.country
        ? getTimezoneForCountry(city.country)
        : null;

      const rawTz = city.lng / 15;
      const fallbackTz = city.lng >= 0
        ? Math.ceil(rawTz)
        : Math.floor(rawTz);

      const timezone = countryTz !== null ? countryTz : fallbackTz;

      const birthData: BirthData = {
        year,
        month,
        day,
        hour,
        minute,
        latitude: city.lat,
        longitude: city.lng,
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

    await new Promise(resolve => setTimeout(resolve, 3000));

    clearInterval(loadingInterval);
    clearInterval(stepInterval);
    setIsCalculating(false);
    setShowLoading(false);
    setShowResults(true);
  }, []);

  // Auto-calculate if stored birth data exists
  useEffect(() => {
    const stored = loadBirthData();
    if (stored && stored.birthdate && isValidDate(stored.birthdate)) {
      setFormData({
        birthdate: stored.birthdate,
        birthtime: stored.birthtime || '',
      });

      let city: City | null = null;
      if (stored.birthplace) {
        const displayName = `${stored.birthplace.name}, ${stored.birthplace.country}`;
        city = {
          label: displayName,
          value: displayName,
          lat: stored.birthplace.lat,
          lng: stored.birthplace.lng,
          country: stored.birthplace.country,
        };
        setSelectedCity(city);
      }

      runCalculation(stored.birthdate, stored.birthtime || '', city);
    }
  }, [runCalculation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidDate(formData.birthdate)) {
      setDateError('Please enter a valid birth date');
      return;
    }

    setDateError(null);

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

    runCalculation(formData.birthdate, formData.birthtime, selectedCity);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation currentPage="your-chart" />

      <main className="flex-1">
      {showLoading ? (
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <div className="text-center max-w-md mx-auto">
            <div
              className="flex items-center justify-center gap-2 mb-8"
              style={{ filter: 'saturate(0.3) brightness(1.1)' }}
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
            <p className="font-serif text-2xl text-[#2D2640] mb-6">
              Reading the stars
            </p>
            <div className="space-y-2 text-left px-4">
              {chartLoadingSteps.map((message, i) => (
                <p
                  key={i}
                  className={`text-sm transition-all duration-500 ${
                    i <= loadingStep ? 'text-[#2D2640] opacity-100' : 'text-[#655E78] opacity-0'
                  }`}
                >
                  {i < loadingStep ? '✓' : i === loadingStep ? '·' : ''} {message}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : !showResults ? (
        <>
          {/* Hero */}
          <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D2640] leading-[1.1] tracking-tight">
                Your Chart
              </h1>
              <p className="mt-6 text-lg text-[#655E78] leading-relaxed">
                Your sun, moon, rising, and the lunar phase at the exact moment you showed up. This is the full picture.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          {/* Form Section */}
          <section className="container-editorial py-12 md:py-16 min-h-[60vh] flex items-center justify-center">
            <div className="max-w-md w-full text-center">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-8">
                Enter your birth details
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <label htmlFor="birthdate" className="block text-sm text-[#655E78] mb-2">
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
                        ? 'text-[#2D2640] [&::-webkit-datetime-edit]:text-[#2D2640] [&::-webkit-datetime-edit-fields-wrapper]:text-[#2D2640]'
                        : 'text-[#655E78]/50 [&::-webkit-datetime-edit]:text-[#655E78]/50 [&::-webkit-datetime-edit-fields-wrapper]:text-[#655E78]/50'
                    } ${
                      dateError
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-[#2D2640]/10 focus:border-[#2D2640]/30'
                    }`}
                  />
                  {dateError && (
                    <p className="mt-2 text-sm text-red-500">{dateError}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="birthtime" className="block text-sm text-[#655E78] mb-2">
                    Time of birth
                  </label>
                  <input
                    type="time"
                    id="birthtime"
                    value={formData.birthtime}
                    onChange={(e) => setFormData({ ...formData, birthtime: e.target.value })}
                    className={`w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors ${
                      formData.birthtime
                        ? 'text-[#2D2640] [&::-webkit-datetime-edit]:text-[#2D2640] [&::-webkit-datetime-edit-fields-wrapper]:text-[#2D2640]'
                        : 'text-[#655E78]/50 [&::-webkit-datetime-edit]:text-[#655E78]/50 [&::-webkit-datetime-edit-fields-wrapper]:text-[#655E78]/50'
                    }`}
                  />
                  <p className="mt-2 text-xs text-[#655E78]">
                    If you don&apos;t know your exact time, noon is a reasonable estimate.
                  </p>
                </div>

                <div>
                  <label className="block text-sm text-[#655E78] mb-2">
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
                  className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-4 flex items-center gap-2"
            >
              <span>←</span> Enter different details
            </button>

            {birthMoon && (
              <div className="mt-4 flex flex-col items-center text-center">
                <p className="text-sm text-[#655E78] tracking-wide uppercase mb-4">
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
                <p className="text-sm text-[#655E78] mt-2">
                  {birthMoon.illumination}% illuminated
                </p>
                <h1 className="font-serif text-2xl md:text-3xl text-[#2D2640] leading-[1.1] mt-6">
                  {birthMoon.name}
                </h1>
                <p className="mt-4 text-base text-[#655E78] leading-relaxed max-w-lg">
                  {birthMoon.description}
                </p>
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          {/* Your Chart - Big Three */}
          <section className="container-editorial pt-12 md:pt-16">
            <h2 className="font-serif text-2xl text-[#2D2640] mb-12">
              Your chart
            </h2>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Sun Sign Card */}
              <div className="p-6 md:p-8 border border-[#2D2640]/10 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <SunIcon size={24} className="text-[#2D2640]" />
                  <span className="text-xs tracking-wide uppercase text-[#655E78]">Sun</span>
                </div>
                {sunSign && (
                  <>
                    {(() => {
                      const ZodiacIcon = getZodiacIcon(sunSign.name);
                      return <ZodiacIcon size={64} className="text-[#2D2640] mb-4" />;
                    })()}
                    <p className="font-serif text-2xl text-[#2D2640] mb-1">{sunSign.name}</p>
                    <p className="text-xs text-[#655E78] mb-4">{sunSign.element} · {sunSign.quality}</p>
                    <p className="text-sm text-[#655E78] leading-relaxed">
                      {sunSign.description}
                    </p>
                  </>
                )}
              </div>

              {/* Moon Sign Card */}
              <div className="p-6 md:p-8 border border-[#2D2640]/10 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <MoonIcon size={24} className="text-[#2D2640]" />
                  <span className="text-xs tracking-wide uppercase text-[#655E78]">Moon</span>
                </div>
                {ephemerisChart?.moon ? (
                  <>
                    {(() => {
                      const ZodiacIcon = getZodiacIcon(ephemerisChart.moon.sign);
                      return <ZodiacIcon size={64} className="text-[#2D2640] mb-4" />;
                    })()}
                    <p className="font-serif text-2xl text-[#2D2640] mb-1">{ephemerisChart.moon.sign}</p>
                    <p className="text-xs text-[#655E78] mb-4">{ephemerisChart.moon.element} · {ephemerisChart.moon.quality}</p>
                    <p className="text-sm text-[#655E78] leading-relaxed">
                      {ephemerisChart.moon.description}
                    </p>
                  </>
                ) : (
                  <div className="text-sm text-[#655E78]">
                    <p className="mb-2">Requires birth time and place</p>
                    <p className="text-xs">The moon moves quickly through the zodiac, so exact timing matters.</p>
                  </div>
                )}
              </div>

              {/* Rising Sign Card */}
              <div className="p-6 md:p-8 border border-[#2D2640]/10 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <RisingIcon size={24} className="text-[#2D2640]" />
                  <span className="text-xs tracking-wide uppercase text-[#655E78]">Rising</span>
                </div>
                {ephemerisChart?.rising ? (
                  <>
                    {(() => {
                      const ZodiacIcon = getZodiacIcon(ephemerisChart.rising.sign);
                      return <ZodiacIcon size={64} className="text-[#2D2640] mb-4" />;
                    })()}
                    <p className="font-serif text-2xl text-[#2D2640] mb-1">{ephemerisChart.rising.sign}</p>
                    <p className="text-xs text-[#655E78] mb-4">{ephemerisChart.rising.element} · {ephemerisChart.rising.quality}</p>
                    <p className="text-sm text-[#655E78] leading-relaxed">
                      {ephemerisChart.rising.description}
                    </p>
                  </>
                ) : (
                  <div className="text-sm text-[#655E78]">
                    <p className="mb-2">Requires birth time and place</p>
                    <p className="text-xs">The rising sign changes every two hours.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Chinese Zodiac & Life Path */}
          <section className="container-editorial pt-12 pb-12 md:pb-16">
            <h2 className="font-serif text-2xl text-[#2D2640] mb-12">
              Additional insights
            </h2>

            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {/* Chinese Zodiac Card */}
              {chineseZodiac && (
                <div className="p-6 md:p-8 border border-[#2D2640]/10 rounded-lg">
                  <p className="text-xs tracking-wide uppercase text-[#655E78] mb-4">Chinese Zodiac</p>
                  {(() => {
                    const AnimalIcon = getChineseZodiacIcon(chineseZodiac.animal);
                    return <AnimalIcon size={48} className="text-[#2D2640] mb-4" />;
                  })()}
                  <div className="flex items-baseline gap-3 mb-4">
                    <p className="font-serif text-2xl text-[#2D2640]">
                      {chineseZodiac.element} {chineseZodiac.animal}
                    </p>
                    <span className="text-xs text-[#655E78]">{chineseZodiac.yinYang}</span>
                  </div>
                  <p className="text-sm text-[#655E78] leading-relaxed">
                    {chineseZodiac.animalDescription.split('.').slice(0, 2).join('.')}.
                  </p>
                </div>
              )}

              {/* Life Path Card */}
              {lifePath && (
                <div className="p-6 md:p-8 border border-[#2D2640]/10 rounded-lg">
                  <p className="text-xs tracking-wide uppercase text-[#655E78] mb-4">Life Path Number</p>
                  <div className="flex items-baseline gap-3 mb-4">
                    <p className="font-serif text-4xl text-[#2D2640]">{lifePath.number}</p>
                    {lifePath.isMasterNumber && (
                      <span className="px-2 py-1 text-xs tracking-wide uppercase bg-[#2D2640]/10 text-[#2D2640]">
                        Master Number
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#655E78] leading-relaxed">
                    {lifePath.description}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          {/* Paid Reading CTA */}
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-3xl mx-auto">
              <div className="bg-[#F0E6D6] rounded-2xl p-8 md:p-12">
                <div className="text-center mb-8">
                  <span className="text-xs tracking-[0.15em] uppercase text-[#C4365A]">Go deeper</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] mt-4 mb-4">
                    Get your full birth chart reading
                  </h2>
                  <p className="text-lg text-[#655E78] leading-relaxed max-w-lg mx-auto">
                    This free snapshot shows the highlights. Your full reading layers in BaZi timing and Human Design strategy to reveal the patterns no single system catches alone.
                  </p>
                </div>

                <ul className="max-w-sm mx-auto mb-6 space-y-3">
                  <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                    <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                    All planetary placements fully interpreted
                  </li>
                  <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                    <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                    House placements and aspect patterns
                  </li>
                  <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                    <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                    Career, relationships, and life purpose insights
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
                    Get your natal chart reading &mdash; $5
                  </Link>
                  <p className="text-xs text-[#655E78]/60 mt-4">Delivered instantly</p>
                </div>
              </div>
            </div>
          </section>

          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          {/* Email Results */}
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-4">
                Save your chart
              </h2>
              <p className="text-[#655E78] mb-8">
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

          {/* Also Explore */}
          <section className="container-editorial pb-12">
            <p className="text-center text-sm text-[#655E78]">
              Also explore:{' '}
              <a href="/bazi" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">BaZi</a>
              {' · '}
              <a href="/human-design" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Human Design</a>
              {' · '}
              <a href="/numerology" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Numerology</a>
            </p>
          </section>
        </>
      )}
      </main>

      <Footer />
    </div>
  );
}
