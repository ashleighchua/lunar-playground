'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { CitySelect } from '@/components/ui/CitySelect';
import { SendResultsEmail } from '@/components/ui/SendResultsEmail';
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
import { SunIcon, MoonIcon, RisingIcon } from '@/components/icons/ZodiacIcons';
import { loadBirthData, saveBirthData } from '@/lib/birthData';
import {
  sunSignOverview,
  moonSignOverview,
  risingSignOverview,
  personalityArchitecture,
  relationshipPatterns,
  workAndPurpose,
  shadowAndGrowth,
  timingPatterns,
  environmentSensitivity,
  practicalTakeaways,
  getElement,
} from '@/lib/chartInterpretations';
import {
  sunOrientation,
  moonProcessing,
  risingPresentation,
  generateIntegration,
  generateCentralTension,
  generateDayToDay,
  generateBalanceStatement,
  generateReportFraming,
} from '@/lib/operatingSystem';
import {
  mercuryThinking,
  venusConnecting,
  marsActing,
  saturnPressure,
  generateUnderlyingPattern,
  generateDrivesInteraction,
  generateAlignmentSupport,
  generateStrengthStatement,
} from '@/lib/coreDrives';
import {
  defaultRhythm,
  underPressure,
  regulationCost,
  returnToBalance,
  signalToNotice,
} from '@/lib/emotionalPattern';
import {
  safetyNeeds,
  showingLove,
  misunderstandingPattern,
  relationshipStrain,
  whatHelps,
  returnQuestion,
} from '@/lib/relationshipBlueprint';
import {
  workMotivation,
  ambitionStyle,
  authorityRelationship,
  bestWorkEnvironment,
  burnoutPattern,
  workCheckIn,
} from '@/lib/workStyle';
import {
  recurringFriction,
  patternInMotion,
  internalContradiction,
  blindSpot,
  growthInPractice,
  relevanceCue,
} from '@/lib/shadowGrowth';
import {
  leanInto,
  watchFor,
  practicalReframe,
  howToUseReport,
} from '@/lib/practicalTakeaways';

const moonPhases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];

function isValidDate(dateString: string): boolean {
  if (!dateString) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export default function BirthReportPage() {
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [formData, setFormData] = useState({ birthdate: '', birthtime: '' });
  const [dateError, setDateError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [birthMoon, setBirthMoon] = useState<MoonPhase | null>(null);
  const [sunSign, setSunSign] = useState<ZodiacSign | null>(null);
  const [chineseZodiac, setChineseZodiac] = useState<ChineseZodiac | null>(null);
  const [lifePath, setLifePath] = useState<LifePathNumber | null>(null);
  const [ephemerisChart, setEphemerisChart] = useState<ChartData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    const savedData = loadBirthData();
    if (savedData) {
      setFormData({
        birthdate: savedData.birthdate || '',
        birthtime: savedData.birthtime || '',
      });
      if (savedData.birthplace) {
        setSelectedCity({
          label: savedData.birthplace.name,
          country: savedData.birthplace.country,
          lat: savedData.birthplace.lat,
          lng: savedData.birthplace.lng,
        } as City);
      }
    }
  }, []);

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

    setIsCalculating(true);
    setShowLoading(true);
    setLoadingPhase(0);

    const loadingInterval = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % moonPhases.length);
    }, 200);

    const birthDate = parseBirthDateTime(formData.birthdate, formData.birthtime || undefined);
    setBirthMoon(getMoonPhase(birthDate));
    setSunSign(getSunSign(birthDate));
    setChineseZodiac(getChineseZodiac(birthDate));
    setLifePath(getLifePathNumber(birthDate));

    if (selectedCity && formData.birthtime) {
      const [year, month, day] = formData.birthdate.split('-').map(Number);
      const [hour, minute] = formData.birthtime.split(':').map(Number);
      const countryTz = selectedCity.country ? getTimezoneForCountry(selectedCity.country) : null;
      const rawTz = selectedCity.lng / 15;
      const fallbackTz = selectedCity.lng >= 0 ? Math.ceil(rawTz) : Math.floor(rawTz);
      const timezone = countryTz !== null ? countryTz : fallbackTz;

      const birthData: BirthData = {
        year, month, day, hour, minute,
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

    await new Promise(resolve => setTimeout(resolve, 3500));
    clearInterval(loadingInterval);
    setIsCalculating(false);
    setShowLoading(false);
    setShowResults(true);
  };

  // Get chart data for interpretations
  const moonSignName = ephemerisChart?.moon?.sign || null;
  const risingSignName = ephemerisChart?.rising?.sign || null;
  const mercurySignName = ephemerisChart?.mercury?.sign || null;
  const venusSignName = ephemerisChart?.venus?.sign || null;
  const marsSignName = ephemerisChart?.mars?.sign || null;
  const saturnSignName = ephemerisChart?.saturn?.sign || null;
  const sunElement = sunSign ? getElement(sunSign.name) : 'Fire';

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navigation currentPage="your-chart" />

      <main className="flex-1">
        {showLoading ? (
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center">
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
              <p className="font-serif text-2xl text-[#2A2A2A] mb-2">Mapping your cosmos</p>
              <p className="text-sm text-[#6B6B6B]">Building your comprehensive chart report</p>
            </div>
          </div>
        ) : !showResults ? (
          <>
            {/* Hero */}
            <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
              <div className="max-w-2xl">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2A2A2A] leading-[1.1] tracking-tight">
                  Your Birth Chart
                </h1>
                <p className="mt-6 text-lg text-[#6B6B6B] leading-relaxed">
                  A comprehensive exploration of your personality, patterns, and potential.
                  Not prediction. Reflection.
                </p>
              </div>
            </section>

            <div className="container-editorial"><div className="h-px bg-[#2A2A2A]/10" /></div>

            {/* Form */}
            <section className="container-editorial py-12 md:py-16 min-h-[60vh] flex items-center justify-center">
              <div className="max-w-md w-full text-center">
                <h2 className="font-serif text-2xl text-[#2A2A2A] mb-8">Enter your birth details</h2>
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div>
                    <label htmlFor="birthdate" className="block text-sm text-[#6B6B6B] mb-2">Date of birth</label>
                    <input
                      type="date"
                      id="birthdate"
                      required
                      value={formData.birthdate}
                      onChange={(e) => { setFormData({ ...formData, birthdate: e.target.value }); setDateError(null); }}
                      className={`w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none transition-colors ${
                        formData.birthdate ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/50'
                      } ${dateError ? 'border-red-400' : 'border-[#2A2A2A]/10 focus:border-[#2A2A2A]/30'}`}
                    />
                    {dateError && <p className="mt-2 text-sm text-red-500">{dateError}</p>}
                  </div>

                  <div>
                    <label htmlFor="birthtime" className="block text-sm text-[#6B6B6B] mb-2">Time of birth</label>
                    <input
                      type="time"
                      id="birthtime"
                      value={formData.birthtime}
                      onChange={(e) => setFormData({ ...formData, birthtime: e.target.value })}
                      className={`w-full px-4 py-3 border border-[#2A2A2A]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2A2A2A]/30 transition-colors ${
                        formData.birthtime ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/50'
                      }`}
                    />
                    <p className="mt-2 text-xs text-[#6B6B6B]">For most accurate results. If unknown, some sections will be limited.</p>
                  </div>

                  <div>
                    <label className="block text-sm text-[#6B6B6B] mb-2">Place of birth</label>
                    <CitySelect
                      value={selectedCity?.label || ''}
                      onChange={(city) => setSelectedCity(city)}
                      placeholder="Search for a city..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="w-full px-8 py-4 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] text-sm tracking-wide hover:bg-[#1a1a1a] transition-colors mt-8 disabled:opacity-50"
                  >
                    {isCalculating ? 'Calculating...' : 'Generate my report'}
                  </button>
                </form>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Report Header */}
            <section className="container-editorial pt-8 pb-6 md:pt-12">
              <button
                onClick={() => setShowResults(false)}
                className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-6 flex items-center gap-2"
              >
                <span>←</span> Enter different details
              </button>
              <h1 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-2">Your Chart</h1>
              <p className="text-[#6B6B6B]">A scan-friendly dashboard of your cosmic blueprint</p>
            </section>

            {/* ============================================ */}
            {/* CARD-BASED DASHBOARD */}
            {/* ============================================ */}
            <section className="container-editorial py-8">
              <div className="grid gap-6 md:gap-8">

                {/* ============================================ */}
                {/* CARD 1: YOUR OPERATING SYSTEM */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Your Operating System</h2>
                  <p className="text-sm text-[#6B6B6B] mb-8">The three lenses that shape how you experience life</p>

                  {/* Big Three - Integrative Format */}
                  <div className="space-y-6 mb-8">
                    {/* Sun */}
                    {sunSign && (
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 pt-1">
                          <div className="flex items-center gap-2">
                            <SunIcon size={18} className="text-[#B8A090]" />
                            <span className="text-xs tracking-wide uppercase text-[#6B6B6B]">Sun</span>
                            <span className="text-[#6B6B6B]">·</span>
                            <span className="font-serif text-[#2A2A2A]">{sunSign.name}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {sunSign && sunOrientation[sunSign.name] && (
                      <p className="text-[#6B6B6B] leading-relaxed -mt-2 pl-0">{sunOrientation[sunSign.name]}</p>
                    )}

                    {/* Moon */}
                    {moonSignName ? (
                      <>
                        <div className="flex gap-4 pt-2">
                          <div className="flex-shrink-0 pt-1">
                            <div className="flex items-center gap-2">
                              <MoonIcon size={18} className="text-[#B8A090]" />
                              <span className="text-xs tracking-wide uppercase text-[#6B6B6B]">Moon</span>
                              <span className="text-[#6B6B6B]">·</span>
                              <span className="font-serif text-[#2A2A2A]">{moonSignName}</span>
                            </div>
                          </div>
                        </div>
                        {moonProcessing[moonSignName] && (
                          <p className="text-[#6B6B6B] leading-relaxed -mt-2">{moonProcessing[moonSignName]}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-[#6B6B6B] italic">Moon sign requires birth time and place</p>
                    )}

                    {/* Rising */}
                    {risingSignName ? (
                      <>
                        <div className="flex gap-4 pt-2">
                          <div className="flex-shrink-0 pt-1">
                            <div className="flex items-center gap-2">
                              <RisingIcon size={18} className="text-[#B8A090]" />
                              <span className="text-xs tracking-wide uppercase text-[#6B6B6B]">Rising</span>
                              <span className="text-[#6B6B6B]">·</span>
                              <span className="font-serif text-[#2A2A2A]">{risingSignName}</span>
                            </div>
                          </div>
                        </div>
                        {risingPresentation[risingSignName] && (
                          <p className="text-[#6B6B6B] leading-relaxed -mt-2">{risingPresentation[risingSignName]}</p>
                        )}
                      </>
                    ) : (
                      <p className="text-sm text-[#6B6B6B] italic">Rising sign requires birth time and place</p>
                    )}
                  </div>

                  {/* How these three work together */}
                  {sunSign && (
                    <div className="border-t border-[#2A2A2A]/5 pt-6 space-y-6">
                      <div>
                        <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">How these three work together</h3>
                        <p className="text-[#6B6B6B] leading-relaxed">
                          {generateIntegration(sunSign.name, moonSignName, risingSignName)}
                        </p>
                      </div>

                      {/* The central tension */}
                      <div>
                        <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The central tension</h3>
                        <p className="text-[#6B6B6B] leading-relaxed">
                          {generateCentralTension(sunSign.name, moonSignName, risingSignName)}
                        </p>
                      </div>

                      {/* What this looks like day to day */}
                      <div>
                        <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">What this looks like day to day</h3>
                        <p className="text-sm text-[#6B6B6B] mb-3">You&apos;ll notice this pattern when:</p>
                        <ul className="text-[#6B6B6B] leading-relaxed space-y-2">
                          {generateDayToDay(sunSign.name, moonSignName).split('\n• ').map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#B8A090] mt-1">•</span>
                              <span>{item.replace('• ', '')}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Balance statement */}
                      <div className="bg-[#FAF7F2] rounded-xl p-5">
                        <p className="text-[#6B6B6B] leading-relaxed">
                          {generateBalanceStatement(sunSign.name, moonSignName, risingSignName)}
                        </p>
                      </div>

                      {/* Report framing */}
                      <p className="text-sm text-[#6B6B6B] italic">
                        {generateReportFraming(sunSign.name, moonSignName)}
                      </p>
                    </div>
                  )}
                </div>

                {/* ============================================ */}
                {/* CARD 2: YOUR CORE DRIVES */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Your Core Drives</h2>
                  <p className="text-sm text-[#6B6B6B] mb-8">How you think, connect, act, and grow under pressure</p>

                  {/* The underlying pattern - opens the card */}
                  {mercurySignName && venusSignName && marsSignName && (
                    <div className="mb-8">
                      <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The underlying pattern</h3>
                      <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                        {generateUnderlyingPattern(mercurySignName, venusSignName, marsSignName, saturnSignName)}
                      </div>
                    </div>
                  )}

                  {/* Individual placements as flowing sections */}
                  <div className="space-y-8">
                    {/* Mercury - How you think */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg text-[#B8A090]">☿</span>
                        <h3 className="font-serif text-lg text-[#2A2A2A]">How you think</h3>
                        {mercurySignName && <span className="text-sm text-[#6B6B6B]">· {mercurySignName}</span>}
                      </div>
                      {mercurySignName && mercuryThinking[mercurySignName] ? (
                        <p className="text-[#6B6B6B] leading-relaxed">{mercuryThinking[mercurySignName]}</p>
                      ) : (
                        <p className="text-sm text-[#6B6B6B] italic">Requires birth time and place</p>
                      )}
                    </div>

                    {/* Venus - How you connect */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg text-[#B8A090]">♀</span>
                        <h3 className="font-serif text-lg text-[#2A2A2A]">How you connect and commit</h3>
                        {venusSignName && <span className="text-sm text-[#6B6B6B]">· {venusSignName}</span>}
                      </div>
                      {venusSignName && venusConnecting[venusSignName] ? (
                        <p className="text-[#6B6B6B] leading-relaxed">{venusConnecting[venusSignName]}</p>
                      ) : (
                        <p className="text-sm text-[#6B6B6B] italic">Requires birth time and place</p>
                      )}
                    </div>

                    {/* Mars - How you act */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg text-[#B8A090]">♂</span>
                        <h3 className="font-serif text-lg text-[#2A2A2A]">How you act and assert</h3>
                        {marsSignName && <span className="text-sm text-[#6B6B6B]">· {marsSignName}</span>}
                      </div>
                      {marsSignName && marsActing[marsSignName] ? (
                        <p className="text-[#6B6B6B] leading-relaxed">{marsActing[marsSignName]}</p>
                      ) : (
                        <p className="text-sm text-[#6B6B6B] italic">Requires birth time and place</p>
                      )}
                    </div>

                    {/* Saturn - Where pressure shapes you */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg text-[#B8A090]">♄</span>
                        <h3 className="font-serif text-lg text-[#2A2A2A]">Where pressure shapes you over time</h3>
                        {saturnSignName && <span className="text-sm text-[#6B6B6B]">· {saturnSignName}</span>}
                      </div>
                      {saturnSignName && saturnPressure[saturnSignName] ? (
                        <p className="text-[#6B6B6B] leading-relaxed">{saturnPressure[saturnSignName]}</p>
                      ) : (
                        <p className="text-sm text-[#6B6B6B] italic">Requires birth time and place</p>
                      )}
                    </div>
                  </div>

                  {/* How these drives interact */}
                  {mercurySignName && venusSignName && marsSignName && (
                    <div className="border-t border-[#2A2A2A]/5 mt-8 pt-6 space-y-6">
                      <div>
                        <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">How these drives interact</h3>
                        <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                          {generateDrivesInteraction(mercurySignName, venusSignName, marsSignName, saturnSignName)}
                        </div>
                      </div>

                      {/* What supports alignment */}
                      <div>
                        <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">What supports alignment</h3>
                        <p className="text-sm text-[#6B6B6B] mb-3">Alignment comes from:</p>
                        <ul className="text-[#6B6B6B] leading-relaxed space-y-2">
                          {generateAlignmentSupport(mercurySignName, venusSignName, marsSignName, saturnSignName).map((tip, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#B8A090] mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Closing strength statement */}
                      <div className="bg-[#FAF7F2] rounded-xl p-5">
                        <p className="text-[#6B6B6B] leading-relaxed">
                          {generateStrengthStatement(mercurySignName, venusSignName, marsSignName, saturnSignName)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ============================================ */}
                {/* CARD 3: EMOTIONAL PATTERN IN MOTION */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Emotional Pattern in Motion</h2>
                  <p className="text-sm text-[#6B6B6B] mb-8">How you process, regulate, and move through feelings</p>

                  {(() => {
                    const emotionalSign = moonSignName || sunSign?.name;
                    if (!emotionalSign) return null;

                    return (
                      <div className="space-y-8">
                        {/* Default rhythm */}
                        {defaultRhythm[emotionalSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Your default emotional rhythm</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {defaultRhythm[emotionalSign]}
                            </div>
                          </div>
                        )}

                        {/* Under pressure */}
                        {underPressure[emotionalSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The pattern under pressure</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {underPressure[emotionalSign]}
                            </div>
                          </div>
                        )}

                        {/* Cost of over-regulation */}
                        {regulationCost[emotionalSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The cost of over-regulation</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {regulationCost[emotionalSign]}
                            </div>
                          </div>
                        )}

                        {/* Return to balance */}
                        {returnToBalance[emotionalSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">How you return to balance</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {returnToBalance[emotionalSign]}
                            </div>
                          </div>
                        )}

                        {/* Signal to notice */}
                        {signalToNotice[emotionalSign] && (
                          <div className="bg-[#FAF7F2] rounded-xl p-5">
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">A useful signal to notice</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {signalToNotice[emotionalSign]}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* ============================================ */}
                {/* CARD 4: RELATIONSHIP BLUEPRINT */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Relationship Blueprint</h2>
                  <p className="text-sm text-[#6B6B6B] mb-8">How you bond, attach, and stay connected</p>

                  {(() => {
                    const relationshipSign = moonSignName || sunSign?.name;
                    if (!relationshipSign) return null;

                    return (
                      <div className="space-y-8">
                        {/* What you need to feel safe */}
                        {safetyNeeds[relationshipSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">What you need to feel safe</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {safetyNeeds[relationshipSign]}
                            </div>
                          </div>
                        )}

                        {/* How you show love */}
                        {showingLove[relationshipSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">How you show love</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {showingLove[relationshipSign]}
                            </div>
                          </div>
                        )}

                        {/* Pattern that causes misunderstanding */}
                        {misunderstandingPattern[relationshipSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The pattern that causes misunderstanding</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {misunderstandingPattern[relationshipSign]}
                            </div>
                          </div>
                        )}

                        {/* Where relationships strain */}
                        {relationshipStrain[relationshipSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Where relationships strain</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {relationshipStrain[relationshipSign]}
                            </div>
                          </div>
                        )}

                        {/* What actually helps */}
                        {whatHelps[relationshipSign] && (
                          <div>
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">What actually helps relationships work</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {whatHelps[relationshipSign]}
                            </div>
                          </div>
                        )}

                        {/* Question to return to */}
                        {returnQuestion[relationshipSign] && (
                          <div className="bg-[#FAF7F2] rounded-xl p-5">
                            <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">A useful question to return to</h3>
                            <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                              {returnQuestion[relationshipSign]}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* ============================================ */}
                {/* CARD 5: WORK AND IMPACT STYLE */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Work and Impact Style</h2>
                  <p className="text-sm text-[#6B6B6B] mb-8">How you engage with contribution, authority, and effort</p>

                  {sunSign && (
                    <div className="space-y-8">
                      {/* What motivates beyond money */}
                      {workMotivation[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">What motivates you beyond money</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {workMotivation[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* How ambition shows up */}
                      {ambitionStyle[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">How ambition really shows up</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {ambitionStyle[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Authority relationship */}
                      {authorityRelationship[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Your relationship with authority</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {authorityRelationship[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Best work environment */}
                      {bestWorkEnvironment[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Where you do your best work</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {bestWorkEnvironment[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Burnout pattern */}
                      {burnoutPattern[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">How burnout actually develops for you</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {burnoutPattern[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Check-in moment */}
                      {workCheckIn[sunSign.name] && (
                        <div className="bg-[#FAF7F2] rounded-xl p-5">
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-2">A useful check-in moment</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {workCheckIn[sunSign.name]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ============================================ */}
                {/* CARD 6: SHADOW AND GROWTH EDGE */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Shadow and Growth Edge</h2>
                  <p className="text-sm text-[#6B6B6B] mb-8">The pattern that shows up under pressure</p>

                  {sunSign && (
                    <div className="space-y-8">
                      {/* Recurring friction */}
                      {recurringFriction[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The recurring friction</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {recurringFriction[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Pattern in motion */}
                      {patternInMotion[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The pattern in motion</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {patternInMotion[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Internal contradiction */}
                      {internalContradiction[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The internal contradiction</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {internalContradiction[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Blind spot */}
                      {blindSpot[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">The blind spot to watch</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {blindSpot[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Growth in practice */}
                      {growthInPractice[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">What growth actually looks like in practice</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {growthInPractice[sunSign.name]}
                          </div>
                        </div>
                      )}

                      {/* Relevance cue */}
                      {relevanceCue[sunSign.name] && (
                        <div className="bg-[#FAF7F2] rounded-xl p-5">
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {relevanceCue[sunSign.name]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ============================================ */}
                {/* CARD 7: TIMING WITHOUT PREDICTION */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Timing Without Prediction</h2>
                  <p className="text-sm text-[#6B6B6B] mb-6">How you experience time, change, and cycles</p>

                  {sunSign && timingPatterns[sunSign.name] && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">How you experience change</h3>
                        <p className="text-sm text-[#6B6B6B] leading-relaxed">{timingPatterns[sunSign.name].experienceOfChange}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">Cyclic patterns</h3>
                          <p className="text-sm text-[#6B6B6B] leading-relaxed">{timingPatterns[sunSign.name].cyclicPatterns}</p>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">Recurring themes</h3>
                          <p className="text-sm text-[#6B6B6B] leading-relaxed">{timingPatterns[sunSign.name].recurringThemes}</p>
                        </div>
                      </div>

                      <div className="bg-[#FAF7F2] rounded-xl p-5">
                        <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">Working with time</h3>
                        <p className="text-sm text-[#6B6B6B] leading-relaxed">{timingPatterns[sunSign.name].workingWithTime}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ============================================ */}
                {/* CARD 8: ENVIRONMENT AND PLACE */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Environment and Place</h2>
                  <p className="text-sm text-[#6B6B6B] mb-6">How location and surroundings affect your energy</p>

                  {environmentSensitivity[sunElement] && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">Environmental needs</h3>
                        <p className="text-sm text-[#6B6B6B] leading-relaxed">{environmentSensitivity[sunElement].environmentalNeeds}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-[#FAF7F2] rounded-xl p-5">
                          <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">Places that may feel heavier</h3>
                          <p className="text-sm text-[#6B6B6B] leading-relaxed">{environmentSensitivity[sunElement].heavierPlaces}</p>
                        </div>

                        <div className="bg-[#FAF7F2] rounded-xl p-5">
                          <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">Places that may feel lighter</h3>
                          <p className="text-sm text-[#6B6B6B] leading-relaxed">{environmentSensitivity[sunElement].lighterPlaces}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-[#2A2A2A] mb-2">Choosing locations</h3>
                        <p className="text-sm text-[#6B6B6B] leading-relaxed">{environmentSensitivity[sunElement].choosingLocations}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* ============================================ */}
                {/* CARD 9: PRACTICAL TAKEAWAYS */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
                  <h2 className="font-serif text-2xl text-[#2A2A2A] mb-2">Practical Takeaways</h2>
                  <p className="text-sm text-[#6B6B6B] mb-8">A grounded summary for daily use</p>

                  {sunSign && (
                    <div className="space-y-8">
                      {/* Lean into */}
                      {leanInto[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Lean into</h3>
                          <p className="text-sm text-[#6B6B6B] mb-4">These are strengths that grow when you use them deliberately.</p>
                          <ul className="space-y-3">
                            {leanInto[sunSign.name].map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="text-[#B8A090] mt-0.5">•</span>
                                <span className="text-[#6B6B6B] leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Watch for */}
                      {watchFor[sunSign.name] && (
                        <div>
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">Watch for</h3>
                          <p className="text-sm text-[#6B6B6B] mb-4">These patterns tend to emerge quietly under strain.</p>
                          <ul className="space-y-3">
                            {watchFor[sunSign.name].map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <span className="text-[#6B6B6B] mt-0.5">•</span>
                                <span className="text-[#6B6B6B] leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Practical reframe */}
                      {practicalReframe[sunSign.name] && (
                        <div className="border-t border-[#2A2A2A]/5 pt-6">
                          <h3 className="font-serif text-lg text-[#2A2A2A] mb-3">One practical reframe</h3>
                          <div className="text-[#6B6B6B] leading-relaxed whitespace-pre-line">
                            {practicalReframe[sunSign.name]}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ============================================ */}
                {/* HOW TO USE */}
                {/* ============================================ */}
                <div className="bg-[#2A2A2A] rounded-2xl p-6 md:p-8 text-[#FAF7F2]">
                  <h2 className="font-serif text-xl mb-4">How to use this report</h2>
                  <div className="text-[#FAF7F2]/80 text-sm leading-relaxed whitespace-pre-line">
                    {howToUseReport}
                  </div>
                </div>

              </div>
            </section>

            <div className="container-editorial"><div className="h-px bg-[#2A2A2A]/10" /></div>

            {/* Save / Email */}
            <section className="container-editorial py-12">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Save your report</h2>
                <p className="text-[#6B6B6B] mb-8">We&apos;ll send a summary to your inbox.</p>
                <SendResultsEmail
                  type="your-chart"
                  data={{
                    birthMoon: birthMoon ? { name: birthMoon.name, emoji: birthMoon.emoji, illumination: birthMoon.illumination, description: birthMoon.description } : null,
                    sunSign: sunSign ? { name: sunSign.name, description: sunSign.description } : null,
                    moonSign: ephemerisChart?.moon ? { name: ephemerisChart.moon.sign, description: ephemerisChart.moon.description } : null,
                    risingSign: ephemerisChart?.rising ? { name: ephemerisChart.rising.sign, description: ephemerisChart.rising.description } : null,
                    mercurySign: ephemerisChart?.mercury ? { name: ephemerisChart.mercury.sign, description: ephemerisChart.mercury.description } : null,
                    venusSign: ephemerisChart?.venus ? { name: ephemerisChart.venus.sign, description: ephemerisChart.venus.description } : null,
                    marsSign: ephemerisChart?.mars ? { name: ephemerisChart.mars.sign, description: ephemerisChart.mars.description } : null,
                    saturnSign: ephemerisChart?.saturn ? { name: ephemerisChart.saturn.sign, description: ephemerisChart.saturn.description } : null,
                    chineseZodiac: chineseZodiac ? { animal: `${chineseZodiac.element} ${chineseZodiac.animal}`, description: chineseZodiac.animalDescription } : null,
                    lifePath: lifePath ? { number: lifePath.number, description: lifePath.description } : null,
                  }}
                />
              </div>
            </section>

            <div className="container-editorial"><div className="h-px bg-[#2A2A2A]/10" /></div>

            {/* Continue exploring */}
            <section className="container-editorial py-8 md:py-12">
              <p className="text-sm text-[#6B6B6B] mb-4">Continue exploring</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/transit" className="px-6 py-3 rounded-lg bg-[#2A2A2A] text-[#FAF7F2] text-sm hover:bg-[#1a1a1a] transition-colors">
                  Today&apos;s sky guide
                </Link>
                <Link href="/compatibility" className="px-6 py-3 rounded-lg border border-[#2A2A2A]/20 text-[#2A2A2A] text-sm hover:border-[#2A2A2A]/40 transition-colors">
                  Check compatibility
                </Link>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="container-editorial py-8">
              <p className="text-xs text-[#6B6B6B]/60 text-center max-w-xl mx-auto">
                This report uses astrology as a reflective framework, not prediction.
                It describes tendencies and patterns, not certainties.
                Take what resonates. Leave what doesn&apos;t.
              </p>
            </section>
          </>
        )}
      </main>

      <footer className="py-8">
        <div className="container-editorial">
          <div className="flex justify-end">
            <div className="flex gap-8 text-sm text-[#6B6B6B]">
              <Link href="/privacy" className="hover:text-[#2A2A2A] transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-[#2A2A2A] transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
