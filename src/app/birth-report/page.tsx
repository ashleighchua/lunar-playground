'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
import { BigThreeTriangle } from '@/components/BigThreeTriangle';
import { CoreDrivesVisual, type CoreDrivePlanet } from '@/components/CoreDrivesVisual';
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
import {
  getArchetype,
  getElementBalance,
  generateSynthesis,
  getQuickStats,
} from '@/lib/executiveSummary';
import {
  operatingSystemInsights,
  coreDrivesInsights,
  emotionalPatternInsights,
  relationshipInsights,
  workInsights,
  shadowInsights,
  getTakeawaysInsight,
} from '@/lib/keyInsights';
import {
  operatingSystemQuestions,
  emotionalPatternQuestions,
  relationshipQuestions,
  workQuestions,
  shadowQuestions,
} from '@/lib/reflectionQuestions';
import { practicalAnchors } from '@/lib/practicalAnchors';
import { FadeInSection } from '@/components/FadeInSection';

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

// Card sections for navigation
const cardSections = [
  { id: 'operating-system', title: 'Operating System' },
  { id: 'core-drives', title: 'Core Drives' },
  { id: 'emotional-pattern', title: 'Emotional Pattern' },
  { id: 'relationship-blueprint', title: 'Relationships' },
  { id: 'work-style', title: 'Work & Impact' },
  { id: 'shadow-growth', title: 'Shadow & Growth' },
  // { id: 'timing', title: 'Timing' },  // Hidden for future feature
  // { id: 'environment', title: 'Environment' },  // Hidden for future feature
  { id: 'takeaways', title: 'Takeaways' },
];

function BirthReportContent() {
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
  const [activeSection, setActiveSection] = useState<string>('operating-system');
  const [expandedReflections, setExpandedReflections] = useState<Record<string, boolean>>({});
  const [hoveredBigThree, setHoveredBigThree] = useState<'sun' | 'moon' | 'rising' | null>(null);
  const [hoveredCoreDrive, setHoveredCoreDrive] = useState<CoreDrivePlanet | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [showFloatingSave, setShowFloatingSave] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const saveReportRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const hasAutoGenerated = useRef(false);

  // Load saved birth data
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
    // Check for email from landing page
    const storedEmail = sessionStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      sessionStorage.removeItem('userEmail');
    }
  }, []);

  // Scroll spy for active section tracking + floating save button
  useEffect(() => {
    if (!showResults) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const section of cardSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }

      // Show floating save button after scrolling past core-drives section
      // but hide when save section is visible
      const coreDrives = document.getElementById('core-drives');
      const saveSection = saveReportRef.current;

      if (coreDrives && saveSection) {
        const coreDrivesBottom = coreDrives.getBoundingClientRect().bottom;
        const saveSectionTop = saveSection.getBoundingClientRect().top;
        setShowFloatingSave(coreDrivesBottom < 0 && saveSectionTop > window.innerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    setTimeout(handleScroll, 0);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showResults]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleAllReflections = (expand: boolean) => {
    const allKeys = ['operating-system', 'emotional-pattern', 'relationship', 'work', 'shadow'];
    const newState: Record<string, boolean> = {};
    allKeys.forEach(key => { newState[key] = expand; });
    setExpandedReflections(newState);
  };

  const allReflectionsExpanded = ['operating-system', 'emotional-pattern', 'relationship', 'work', 'shadow']
    .every(key => expandedReflections[key]);

  // Core calculation logic - extracted for reuse
  const generateReport = useCallback(async (birthdate: string, birthtime: string, city: City | null) => {
    setIsCalculating(true);
    setShowLoading(true);
    setLoadingPhase(0);

    const loadingInterval = setInterval(() => {
      setLoadingPhase(prev => (prev + 1) % moonPhases.length);
    }, 200);

    const birthDate = parseBirthDateTime(birthdate, birthtime || undefined);
    setBirthMoon(getMoonPhase(birthDate));
    setSunSign(getSunSign(birthDate));
    setChineseZodiac(getChineseZodiac(birthDate));
    setLifePath(getLifePathNumber(birthDate));

    if (city && birthtime) {
      const [year, month, day] = birthdate.split('-').map(Number);
      const [hour, minute] = birthtime.split(':').map(Number);
      const countryTz = city.country ? getTimezoneForCountry(city.country) : null;
      const rawTz = city.lng / 15;
      const fallbackTz = city.lng >= 0 ? Math.ceil(rawTz) : Math.floor(rawTz);
      const timezone = countryTz !== null ? countryTz : fallbackTz;

      const birthData: BirthData = {
        year, month, day, hour, minute,
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

    await new Promise(resolve => setTimeout(resolve, 3500));
    clearInterval(loadingInterval);
    setIsCalculating(false);
    setShowLoading(false);
    setShowResults(true);
  }, []);

  // Auto-generate when coming from landing page with ?generate=true
  useEffect(() => {
    if (searchParams.get('generate') === 'true' && !hasAutoGenerated.current) {
      const savedData = loadBirthData();
      if (savedData?.birthdate && isValidDate(savedData.birthdate)) {
        hasAutoGenerated.current = true;
        const city = savedData.birthplace ? {
          label: savedData.birthplace.name,
          country: savedData.birthplace.country,
          lat: savedData.birthplace.lat,
          lng: savedData.birthplace.lng,
        } as City : null;
        generateReport(savedData.birthdate, savedData.birthtime || '', city);
      }
    }
  }, [searchParams, generateReport]);

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

    generateReport(formData.birthdate, formData.birthtime, selectedCity);
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
                        formData.birthdate ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/60'
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
                        formData.birthtime ? 'text-[#2A2A2A]' : 'text-[#6B6B6B]/60'
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

                  <div className="pt-2">
                    <label htmlFor="email" className="block text-sm text-[#6B6B6B] mb-2">
                      Email <span className="text-[#6B6B6B]/60">(optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-[#2A2A2A]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2A2A2A]/30 transition-colors text-[#2A2A2A] placeholder:text-[#6B6B6B]/40"
                    />
                    <p className="mt-2 text-xs text-[#6B6B6B]">We&apos;ll email you a copy of your report</p>
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
            {/* ============================================ */}
            {/* CARD-BASED DASHBOARD */}
            {/* ============================================ */}
            {/* Report Header with Executive Summary */}
            <section className="container-editorial pt-8 md:pt-12 pb-6">
              <div className="flex gap-8">
                {/* Left Column: Back button, Title, and Sidebar Nav */}
                <div className="hidden lg:block w-56 flex-shrink-0">
                  <button
                    onClick={() => setShowResults(false)}
                    className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-4 flex items-center gap-2"
                  >
                    <span>←</span> Enter different details
                  </button>
                  <h1 className="font-serif text-3xl text-[#2A2A2A] mb-2">Your Chart</h1>
                  <p className="text-sm text-[#6B6B6B] mb-6">A scan-friendly dashboard of your cosmic blueprint</p>

                  {/* Sticky Sidebar Navigation */}
                  <div className="sticky top-24">
                    <p className="text-xs uppercase tracking-wider text-[#6B6B6B] mb-4">Sections</p>
                    <ul className="space-y-1">
                      {cardSections.map((section) => (
                        <li key={section.id}>
                          <button
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                              activeSection === section.id
                                ? 'bg-[#2A2A2A] text-[#FAF7F2]'
                                : 'text-[#6B6B6B] hover:text-[#2A2A2A] hover:bg-[#2A2A2A]/5'
                            }`}
                          >
                            {section.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Column: Executive Summary + Main Content */}
                <div ref={reportRef} className="flex-1 min-w-0">
                  {/* Mobile header */}
                  <div className="lg:hidden mb-6">
                    <button
                      onClick={() => setShowResults(false)}
                      className="text-sm text-[#6B6B6B] hover:text-[#2A2A2A] transition-colors mb-4 flex items-center gap-2"
                    >
                      <span>←</span> Enter different details
                    </button>
                    <h1 className="font-serif text-3xl md:text-4xl text-[#2A2A2A] mb-2">Your Chart</h1>
                    <p className="text-[#6B6B6B]">A scan-friendly dashboard of your cosmic blueprint</p>
                  </div>

                  {/* Executive Summary */}
                  {sunSign && (
                    <div className="bg-gradient-to-br from-[#2A2A2A] to-[#3D3D3D] rounded-2xl overflow-hidden shadow-lg mb-6 md:mb-8">
                      <div className="p-6 md:p-8">
                        {/* Archetype Title */}
                        <div className="text-center mb-6">
                          <p className="text-xs tracking-widest uppercase text-[#FAF7F2]/50 mb-2">Your Archetype</p>
                          <h2 className="font-serif text-3xl md:text-4xl text-[#FAF7F2] mb-3">
                            {getArchetype(sunSign.name, moonSignName)}
                          </h2>
                          <p className="text-sm text-[#FAF7F2]/60">
                            {sunSign.name} Sun · {moonSignName || 'Unknown'} Moon
                          </p>
                        </div>

                        {/* Big Three Quick View */}
                        <div className="flex justify-center gap-4 md:gap-8 mb-6">
                          <div className="text-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#D4A84B]/20 flex items-center justify-center mb-2 mx-auto">
                              <SunIcon size={24} className="text-[#D4A84B]" />
                            </div>
                            <p className="text-xs text-[#FAF7F2]/50 mb-0.5">Sun</p>
                            <p className="text-sm text-[#FAF7F2] font-medium">{sunSign.name}</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#C4A88F]/20 flex items-center justify-center mb-2 mx-auto">
                              <MoonIcon size={24} className="text-[#C4A88F]" />
                            </div>
                            <p className="text-xs text-[#FAF7F2]/50 mb-0.5">Moon</p>
                            <p className="text-sm text-[#FAF7F2] font-medium">{moonSignName || '—'}</p>
                          </div>
                          <div className="text-center">
                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#9CB896]/20 flex items-center justify-center mb-2 mx-auto">
                              <RisingIcon size={24} className="text-[#9CB896]" />
                            </div>
                            <p className="text-xs text-[#FAF7F2]/50 mb-0.5">Rising</p>
                            <p className="text-sm text-[#FAF7F2] font-medium">{risingSignName || '—'}</p>
                          </div>
                        </div>

                        {/* Synthesis Statement */}
                        <div className="bg-[#FAF7F2]/5 rounded-xl p-5 mb-6">
                          <p className="text-[#FAF7F2]/90 text-sm md:text-base leading-relaxed text-center">
                            {generateSynthesis(sunSign.name, moonSignName, risingSignName)}
                          </p>
                        </div>

                        {/* Element Balance & Quick Stats */}
                        {(() => {
                          const elements = getElementBalance(sunSign.name, moonSignName, risingSignName);
                          const stats = getQuickStats(sunSign.name, moonSignName, risingSignName);
                          return (
                            <div className="flex flex-wrap justify-center gap-3">
                              {elements.dominant && (
                                <div className="px-4 py-2 rounded-full bg-[#FAF7F2]/10 text-[#FAF7F2]/80 text-xs">
                                  <span className="text-[#FAF7F2]/50 mr-1">Element:</span>
                                  <span className="font-medium">{elements.dominant}</span>
                                </div>
                              )}
                              {stats.map((stat, i) => (
                                <div key={i} className="px-4 py-2 rounded-full bg-[#FAF7F2]/10 text-[#FAF7F2]/80 text-xs">
                                  <span className="text-[#FAF7F2]/50 mr-1">{stat.label}:</span>
                                  <span className="font-medium">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>

                      {/* Reading time indicator */}
                      <div className="px-6 md:px-8 py-4 bg-[#FAF7F2]/5 border-t border-[#FAF7F2]/10">
                        <div className="flex items-center justify-between text-xs text-[#FAF7F2]/50">
                          <span>7 sections below</span>
                          <span>~10 min read</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-6 md:gap-8">

                {/* ============================================ */}
                {/* TABLE OF CONTENTS - Quick Navigation */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm p-5 md:p-6 lg:hidden">
                  <p className="text-xs tracking-wider uppercase text-[#6B6B6B] mb-4">What&apos;s in your report</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'operating-system', title: 'Operating System', desc: 'Your Big Three' },
                      { id: 'core-drives', title: 'Core Drives', desc: 'How you function' },
                      { id: 'emotional-pattern', title: 'Emotional Pattern', desc: 'How you feel' },
                      { id: 'relationship-blueprint', title: 'Relationships', desc: 'How you connect' },
                      { id: 'work-style', title: 'Work & Impact', desc: 'How you contribute' },
                      { id: 'shadow-growth', title: 'Shadow & Growth', desc: 'Where you grow' },
                      { id: 'takeaways', title: 'Takeaways', desc: 'Practical actions' },
                    ].map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="text-left p-3 rounded-lg bg-[#FAFAF8] hover:bg-[#F5F3F0] transition-colors"
                      >
                        <p className="text-sm text-[#2A2A2A] font-medium">{section.title}</p>
                        <p className="text-xs text-[#6B6B6B]">{section.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Reflection Mode Toggle */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2A2A2A]/5">
                    <span className="text-xs text-[#6B6B6B]">Reflection Questions</span>
                    <button
                      onClick={() => toggleAllReflections(!allReflectionsExpanded)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#2A2A2A]/10 text-[#6B6B6B] hover:bg-[#2A2A2A]/5 transition-colors"
                    >
                      {allReflectionsExpanded ? 'Collapse All' : 'Expand All'}
                    </button>
                  </div>
                </div>

                {/* ============================================ */}
                {/* CARD 1: YOUR OPERATING SYSTEM */}
                {/* ============================================ */}
                <FadeInSection>
                <div id="operating-system" className="scroll-mt-24 bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
                  {/* Header with accent rail */}
                  <div className="flex">
                    <div className="w-1 bg-[#7A746C]" />
                    <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
                      <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Your Operating System</h2>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        The three lenses that shape how you experience life
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-0">
                    {/* Big Three Triangle Visualization */}
                    <div className="mb-8 flex justify-center">
                      <BigThreeTriangle
                        sunSign={sunSign?.name}
                        moonSign={moonSignName}
                        risingSign={risingSignName}
                        className="w-full max-w-lg"
                        hoveredNode={hoveredBigThree}
                        onNodeHover={setHoveredBigThree}
                      />
                    </div>

                    {/* Big Three - Color-coded descriptions */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      {/* Sun */}
                      {sunSign && (
                        <div
                          className={`rounded-xl p-5 transition-all duration-200 cursor-pointer border ${
                            hoveredBigThree === 'sun'
                              ? 'bg-[#F5D89A] border-[#F5D89A]'
                              : 'bg-white border-[#2A2A2A]/5 hover:bg-[#F5D89A]/50 hover:border-[#F5D89A]/50'
                          }`}
                          onMouseEnter={() => setHoveredBigThree('sun')}
                          onMouseLeave={() => setHoveredBigThree(null)}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <SunIcon size={18} className="text-[--sun-glyph]" />
                            <span className="text-xs tracking-wide uppercase text-[--sun-glyph]/70">Sun</span>
                            <span className="text-[--sun-glyph]/40">·</span>
                            <span className="font-serif text-[--sun-glyph]">{sunSign.name}</span>
                          </div>
                          <p className="text-sm text-[#6B6B6B] mb-2">Your core identity</p>
                          {sunOrientation[sunSign.name] && (
                            <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{sunOrientation[sunSign.name]}</p>
                          )}
                        </div>
                      )}

                      {/* Moon */}
                      {moonSignName ? (
                        <div
                          className={`rounded-xl p-5 transition-all duration-200 cursor-pointer border ${
                            hoveredBigThree === 'moon'
                              ? 'bg-[#E4D6CC] border-[#E4D6CC]'
                              : 'bg-white border-[#2A2A2A]/5 hover:bg-[#E4D6CC]/50 hover:border-[#E4D6CC]/50'
                          }`}
                          onMouseEnter={() => setHoveredBigThree('moon')}
                          onMouseLeave={() => setHoveredBigThree(null)}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <MoonIcon size={18} className="text-[--moon-glyph]" />
                            <span className="text-xs tracking-wide uppercase text-[--moon-glyph]/70">Moon</span>
                            <span className="text-[--moon-glyph]/40">·</span>
                            <span className="font-serif text-[--moon-glyph]">{moonSignName}</span>
                          </div>
                          <p className="text-sm text-[#6B6B6B] mb-2">Your inner world</p>
                          {moonProcessing[moonSignName] && (
                            <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{moonProcessing[moonSignName]}</p>
                          )}
                        </div>
                      ) : (
                        <div className="bg-[#FAFAF8] rounded-xl p-5 border border-[#2A2A2A]/5">
                          <div className="flex items-center gap-2 mb-3">
                            <MoonIcon size={18} className="text-[--moon-glyph]/40" />
                            <span className="text-xs tracking-wide uppercase text-[--moon-glyph]/40">Moon</span>
                          </div>
                          <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
                        </div>
                      )}

                      {/* Rising */}
                      {risingSignName ? (
                        <div
                          className={`rounded-xl p-5 transition-all duration-200 cursor-pointer border ${
                            hoveredBigThree === 'rising'
                              ? 'bg-[#D8E0D2] border-[#D8E0D2]'
                              : 'bg-white border-[#2A2A2A]/5 hover:bg-[#D8E0D2]/50 hover:border-[#D8E0D2]/50'
                          }`}
                          onMouseEnter={() => setHoveredBigThree('rising')}
                          onMouseLeave={() => setHoveredBigThree(null)}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            <RisingIcon size={18} className="text-[--rising-glyph]" />
                            <span className="text-xs tracking-wide uppercase text-[--rising-glyph]/70">Rising</span>
                            <span className="text-[--rising-glyph]/40">·</span>
                            <span className="font-serif text-[--rising-glyph]">{risingSignName}</span>
                          </div>
                          <p className="text-sm text-[#6B6B6B] mb-2">How others see you</p>
                          {risingPresentation[risingSignName] && (
                            <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{risingPresentation[risingSignName]}</p>
                          )}
                        </div>
                      ) : (
                        <div className="bg-[#FAFAF8] rounded-xl p-5 border border-[#2A2A2A]/5">
                          <div className="flex items-center gap-2 mb-3">
                            <RisingIcon size={18} className="text-[--rising-glyph]/40" />
                            <span className="text-xs tracking-wide uppercase text-[--rising-glyph]/40">Rising</span>
                          </div>
                          <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
                        </div>
                      )}
                    </div>

                    {/* Key Insight Callout */}
                    {sunSign && (
                      <div className="mb-6 bg-gradient-to-r from-[#D4A84B]/10 to-[#D4A84B]/5 border-l-4 border-[#D4A84B] rounded-r-xl p-5">
                        <div className="flex items-start gap-3">
                          <span className="text-[#D4A84B] text-lg mt-0.5">&#9889;</span>
                          <div>
                            <p className="text-xs tracking-wider uppercase text-[#8B6914] mb-2">Key Insight</p>
                            <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                              {moonSignName && operatingSystemInsights[sunSign.name]?.[moonSignName]
                                ? operatingSystemInsights[sunSign.name][moonSignName]
                                : `Your ${sunSign.name} Sun is your foundation—the core of who you're becoming. Everything else in your chart dances around this center.`}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* The tension section */}
                    {sunSign && (
                      <div className="space-y-6">
                        <div className="bg-[#F5F3F0] rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#B8A090]">&#9878;</span>
                            <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">The tension you carry</p>
                          </div>
                          <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-5">
                            {generateCentralTension(sunSign.name, moonSignName, risingSignName)}
                          </p>

                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#B8A090]">&#10147;</span>
                            <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">You&apos;ll notice this pattern when</p>
                          </div>
                          <ul className="space-y-2">
                            {generateDayToDay(sunSign.name, moonSignName).split('\n• ').filter(Boolean).slice(0, 4).map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                                <span className="text-[#B8A090] mt-0.5">·</span>
                                <span>{item.replace('• ', '')}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Reflection Questions */}
                    {sunSign && operatingSystemQuestions[sunSign.name as keyof typeof operatingSystemQuestions] && (
                      <div className="mt-6">
                        <button
                          onClick={() => setExpandedReflections(prev => ({ ...prev, 'operating-system': !prev['operating-system'] }))}
                          className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] hover:bg-[#F5F3F0] rounded-xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[#6B6B6B] group-hover:text-[#2A2A2A]">&#128221;</span>
                            <span className="text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A]">Reflect on this</span>
                          </div>
                          <span className={`text-[#6B6B6B] transition-transform ${expandedReflections['operating-system'] ? 'rotate-180' : ''}`}>
                            &#9660;
                          </span>
                        </button>
                        {expandedReflections['operating-system'] && (
                          <div className="mt-3 p-5 bg-[#FAFAF8] rounded-xl space-y-4">
                            {operatingSystemQuestions[sunSign.name as keyof typeof operatingSystemQuestions].map((question, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <span className="text-[#D4A84B] mt-0.5 flex-shrink-0">{i + 1}.</span>
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed italic">{question}</p>
                              </div>
                            ))}
                            <p className="text-xs text-[#6B6B6B] pt-2 border-t border-[#2A2A2A]/5">
                              Take a moment to journal or simply sit with these questions.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Breathing space */}
                  <div className="h-2" />
                </div>
                </FadeInSection>

                {/* ============================================ */}
                {/* CARD 2: YOUR CORE DRIVES */}
                {/* ============================================ */}
                <FadeInSection delay={100}>
                <div id="core-drives" className="scroll-mt-24 bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
                  {/* Header with accent rail */}
                  <div className="flex">
                    <div className="w-1 bg-[#7A746C]" />
                    <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
                      <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Your Core Drives</h2>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        How you think, connect, act, and grow under pressure
                      </p>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 pt-0">
                    {/* Core Drives Visual */}
                    <CoreDrivesVisual
                      mercurySign={mercurySignName}
                      venusSign={venusSignName}
                      marsSign={marsSignName}
                      saturnSign={saturnSignName}
                      className="mb-8"
                      hoveredPlanet={hoveredCoreDrive}
                      onPlanetHover={setHoveredCoreDrive}
                    />

                    {/* 2x2 Grid of Core Drives */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {/* Mercury - How you think */}
                      <div
                        className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
                          hoveredCoreDrive === 'mercury'
                            ? 'bg-[#B8C4D1] border-[#B8C4D1]'
                            : 'bg-white border-[#2A2A2A]/5 hover:bg-[#B8C4D1]/30 hover:border-[#B8C4D1]/50'
                        }`}
                        onMouseEnter={() => setHoveredCoreDrive('mercury')}
                        onMouseLeave={() => setHoveredCoreDrive(null)}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg text-[#5A6B7A]">☿</span>
                          <span className="text-xs tracking-wide uppercase text-[#5A6B7A]/70">Mercury</span>
                          <span className="text-[#5A6B7A]/40">·</span>
                          <span className="font-serif text-[#5A6B7A]">{mercurySignName || '—'}</span>
                        </div>
                        <p className="text-sm text-[#6B6B6B] mb-2">How you think</p>
                        {mercurySignName && mercuryThinking[mercurySignName] ? (
                          <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{mercuryThinking[mercurySignName]}</p>
                        ) : (
                          <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
                        )}
                      </div>

                      {/* Venus - How you connect */}
                      <div
                        className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
                          hoveredCoreDrive === 'venus'
                            ? 'bg-[#E4CCC4] border-[#E4CCC4]'
                            : 'bg-white border-[#2A2A2A]/5 hover:bg-[#E4CCC4]/30 hover:border-[#E4CCC4]/50'
                        }`}
                        onMouseEnter={() => setHoveredCoreDrive('venus')}
                        onMouseLeave={() => setHoveredCoreDrive(null)}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg text-[#8B6B60]">♀</span>
                          <span className="text-xs tracking-wide uppercase text-[#8B6B60]/70">Venus</span>
                          <span className="text-[#8B6B60]/40">·</span>
                          <span className="font-serif text-[#8B6B60]">{venusSignName || '—'}</span>
                        </div>
                        <p className="text-sm text-[#6B6B6B] mb-2">How you connect</p>
                        {venusSignName && venusConnecting[venusSignName] ? (
                          <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{venusConnecting[venusSignName]}</p>
                        ) : (
                          <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
                        )}
                      </div>

                      {/* Mars - How you act */}
                      <div
                        className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
                          hoveredCoreDrive === 'mars'
                            ? 'bg-[#D4B8A4] border-[#D4B8A4]'
                            : 'bg-white border-[#2A2A2A]/5 hover:bg-[#D4B8A4]/30 hover:border-[#D4B8A4]/50'
                        }`}
                        onMouseEnter={() => setHoveredCoreDrive('mars')}
                        onMouseLeave={() => setHoveredCoreDrive(null)}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg text-[#8B5A3C]">♂</span>
                          <span className="text-xs tracking-wide uppercase text-[#8B5A3C]/70">Mars</span>
                          <span className="text-[#8B5A3C]/40">·</span>
                          <span className="font-serif text-[#8B5A3C]">{marsSignName || '—'}</span>
                        </div>
                        <p className="text-sm text-[#6B6B6B] mb-2">How you act</p>
                        {marsSignName && marsActing[marsSignName] ? (
                          <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{marsActing[marsSignName]}</p>
                        ) : (
                          <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
                        )}
                      </div>

                      {/* Saturn - How you grow */}
                      <div
                        className={`rounded-xl p-5 transition-all duration-200 border cursor-pointer ${
                          hoveredCoreDrive === 'saturn'
                            ? 'bg-[#C4C8CC] border-[#C4C8CC]'
                            : 'bg-white border-[#2A2A2A]/5 hover:bg-[#C4C8CC]/30 hover:border-[#C4C8CC]/50'
                        }`}
                        onMouseEnter={() => setHoveredCoreDrive('saturn')}
                        onMouseLeave={() => setHoveredCoreDrive(null)}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-lg text-[#5A5E64]">♄</span>
                          <span className="text-xs tracking-wide uppercase text-[#5A5E64]/70">Saturn</span>
                          <span className="text-[#5A5E64]/40">·</span>
                          <span className="font-serif text-[#5A5E64]">{saturnSignName || '—'}</span>
                        </div>
                        <p className="text-sm text-[#6B6B6B] mb-2">How you grow</p>
                        {saturnSignName && saturnPressure[saturnSignName] ? (
                          <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">{saturnPressure[saturnSignName]}</p>
                        ) : (
                          <p className="text-sm text-[#6B6B6B]/60">Requires birth time and place</p>
                        )}
                      </div>
                    </div>

                    {/* Key Insight Callout */}
                    {mercurySignName && (
                      <div className="mb-6 bg-gradient-to-r from-[#5A6B7A]/10 to-[#5A6B7A]/5 border-l-4 border-[#5A6B7A] rounded-r-xl p-5">
                        <div className="flex items-start gap-3">
                          <span className="text-[#5A6B7A] text-lg mt-0.5">&#9889;</span>
                          <div>
                            <p className="text-xs tracking-wider uppercase text-[#5A6B7A] mb-2">Key Insight</p>
                            <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                              {coreDrivesInsights[mercurySignName as keyof typeof coreDrivesInsights] ||
                               "Your Mercury placement shapes how you process and communicate. Understanding this is key to working with your natural thinking style."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Sections when data is available */}
                    {mercurySignName && venusSignName && marsSignName && (
                      <div className="space-y-6">
                        {/* When these work together */}
                        <div className="bg-[#F5F3F0] rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#B8A090]">&#9881;</span>
                            <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">When these work together</p>
                          </div>
                          <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                            {(() => {
                              const interaction = generateDrivesInteraction(mercurySignName, venusSignName, marsSignName, saturnSignName);
                              return interaction.split('\n\n')[0];
                            })()}
                          </p>
                        </div>

                        {/* Aligned vs Misaligned */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Aligned */}
                          <div className="bg-[#EDF4ED] rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[#4A6B44]">&#10003;</span>
                              <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">Aligned</p>
                            </div>
                            <ul className="space-y-3">
                              {(() => {
                                const interaction = generateDrivesInteraction(mercurySignName, venusSignName, marsSignName, saturnSignName);
                                const alignedMatch = interaction.match(/When aligned,([^.]+)/);
                                if (alignedMatch) {
                                  const traits = alignedMatch[1].split(/,| and /).map(t => t.trim()).filter(Boolean).slice(0, 4);
                                  return traits.map((trait, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                                      <span className="text-[#9CB896] mt-0.5">·</span>
                                      <span className="capitalize">{trait.replace(/^you're /i, '')}</span>
                                    </li>
                                  ));
                                }
                                return null;
                              })()}
                            </ul>
                          </div>

                          {/* Misaligned */}
                          <div className="bg-[#F5EBE8] rounded-xl p-5">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-[#8B6B60]">&#10007;</span>
                              <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">Misaligned</p>
                            </div>
                            <ul className="space-y-3">
                              {(() => {
                                const interaction = generateDrivesInteraction(mercurySignName, venusSignName, marsSignName, saturnSignName);
                                const misalignedMatch = interaction.match(/When misaligned,([^.]+)/);
                                if (misalignedMatch) {
                                  const traits = misalignedMatch[1].split(/,| and /).map(t => t.trim()).filter(Boolean).slice(0, 4);
                                  return traits.map((trait, i) => (
                                    <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                                      <span className="text-[#D4B8A4] mt-0.5">·</span>
                                      <span className="capitalize">{trait.replace(/^you may /i, '')}</span>
                                    </li>
                                  ));
                                }
                                return null;
                              })()}
                            </ul>
                          </div>
                        </div>

                        {/* What supports alignment */}
                        <div className="bg-[#F5F3F0] rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[#9CB896]">&#9734;</span>
                            <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">What supports alignment</p>
                          </div>
                          <ul className="space-y-3">
                            {generateAlignmentSupport(mercurySignName, venusSignName, marsSignName, saturnSignName).slice(0, 4).map((tip, i) => (
                              <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                                <span className="text-[#9CB896] mt-0.5">·</span>
                                <span className="capitalize">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Breathing space */}
                  <div className="h-2" />
                </div>
                </FadeInSection>

                {/* ============================================ */}
                {/* CARD 3: EMOTIONAL PATTERN IN MOTION */}
                {/* ============================================ */}
                <FadeInSection delay={100}>
                <div id="emotional-pattern" className="scroll-mt-24 bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
                  {(() => {
                    const emotionalSign = moonSignName || sunSign?.name;
                    if (!emotionalSign) return null;

                    const rhythmText = defaultRhythm[emotionalSign] || '';
                    const rhythmParagraphs = rhythmText.split('\n\n').filter(Boolean);

                    const pressureText = underPressure[emotionalSign] || '';
                    const pressureParagraphs = pressureText.split('\n\n').filter(Boolean);

                    const costText = regulationCost[emotionalSign] || '';
                    const costParagraphs = costText.split('\n\n').filter(Boolean);

                    const balanceText = returnToBalance[emotionalSign] || '';
                    const balanceParagraphs = balanceText.split('\n\n').filter(Boolean);
                    const balanceItems = balanceParagraphs[1]?.split('.').filter(s => s.trim().length > 10).slice(0, 4) || [];

                    const signalText = signalToNotice[emotionalSign] || '';
                    const signalParagraphs = signalText.split('\n\n').filter(Boolean);

                    return (
                      <>
                        {/* Header with accent rail */}
                        <div className="flex">
                          <div className="w-1 bg-[#7A746C]" />
                          <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
                            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Emotional Pattern in Motion</h2>
                            <p className="text-sm text-[#6B6B6B] leading-relaxed">
                              How you process and regulate feeling
                            </p>
                          </div>
                        </div>

                        <div className="p-6 md:p-8 pt-0 space-y-6">
                          {/* Key Insight Callout */}
                          <div className="bg-gradient-to-r from-[#C4A88F]/15 to-[#C4A88F]/5 border-l-4 border-[#C4A88F] rounded-r-xl p-5">
                            <div className="flex items-start gap-3">
                              <span className="text-[#C4A88F] text-lg mt-0.5">&#9889;</span>
                              <div>
                                <p className="text-xs tracking-wider uppercase text-[#8B7355] mb-2">Key Insight</p>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                                  {emotionalPatternInsights[emotionalSign as keyof typeof emotionalPatternInsights] ||
                                   "Your emotional patterns are your body's wisdom. Learning their rhythm helps you respond rather than react."}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Your default rhythm */}
                          {rhythmText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#C4A88F]">&#9835;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">Your default rhythm</p>
                              </div>
                              <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                {rhythmParagraphs[0]}
                              </p>
                              {rhythmParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                  {rhythmParagraphs[1]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* When pressure rises */}
                          {pressureText && (
                            <div className="bg-[#F5F3F0] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#7A746C]">&#9650;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">When pressure rises</p>
                              </div>
                              <p className="text-[#2A2A2A] text-sm leading-relaxed mb-4">
                                {pressureParagraphs[0]}
                              </p>
                              {pressureParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                  {pressureParagraphs[1]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Cost and Balance - side by side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* The cost of over-regulation */}
                            {costText && (
                              <div className="bg-[#F5EBE8] rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-[#8B6B60]">&#9888;</span>
                                  <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">The cost of over-regulation</p>
                                </div>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                  {costParagraphs[0]}
                                </p>
                                {costParagraphs[1] && (
                                  <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                    {costParagraphs[1]}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* How you return to balance */}
                            {balanceText && (
                              <div className="bg-[#EDF4ED] rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-[#4A6B44]">&#8634;</span>
                                  <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">How you return to balance</p>
                                </div>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed mb-4">
                                  {balanceParagraphs[0]}
                                </p>
                                {balanceItems.length > 0 && (
                                  <ul className="space-y-3 mb-4">
                                    {balanceItems.map((item, i) => (
                                      <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                                        <span className="text-[#9CB896] mt-0.5">·</span>
                                        <span>{item.trim()}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {balanceParagraphs[2] && (
                                  <p className="text-[#2A2A2A]/80 text-sm italic">
                                    {balanceParagraphs[2]}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Anchor box - Signal to notice */}
                          {signalText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#C4A88F]">&#9673;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">A signal to notice</p>
                              </div>
                              <p className="font-serif text-lg text-[#2A2A2A] leading-relaxed mb-2">
                                {signalParagraphs[0]}
                              </p>
                              {signalParagraphs[1] && (
                                <p className="text-[#6B6B6B] text-sm">
                                  {signalParagraphs[1]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Reflection Questions */}
                          {emotionalPatternQuestions[emotionalSign as keyof typeof emotionalPatternQuestions] && (
                            <div className="mt-2">
                              <button
                                onClick={() => setExpandedReflections(prev => ({ ...prev, 'emotional-pattern': !prev['emotional-pattern'] }))}
                                className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] hover:bg-[#F5F3F0] rounded-xl transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-[#6B6B6B] group-hover:text-[#2A2A2A]">&#128221;</span>
                                  <span className="text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A]">Reflect on this</span>
                                </div>
                                <span className={`text-[#6B6B6B] transition-transform ${expandedReflections['emotional-pattern'] ? 'rotate-180' : ''}`}>
                                  &#9660;
                                </span>
                              </button>
                              {expandedReflections['emotional-pattern'] && (
                                <div className="mt-3 p-5 bg-[#FAFAF8] rounded-xl space-y-4">
                                  {emotionalPatternQuestions[emotionalSign as keyof typeof emotionalPatternQuestions].map((question, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                      <span className="text-[#C4A88F] mt-0.5 flex-shrink-0">{i + 1}.</span>
                                      <p className="text-[#2A2A2A]/80 text-sm leading-relaxed italic">{question}</p>
                                    </div>
                                  ))}
                                  <p className="text-xs text-[#6B6B6B] pt-2 border-t border-[#2A2A2A]/5">
                                    Take a moment to journal or simply sit with these questions.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Breathing space */}
                        <div className="h-2" />
                      </>
                    );
                  })()}
                </div>
                </FadeInSection>

                {/* ============================================ */}
                {/* CARD 4: RELATIONSHIP BLUEPRINT */}
                {/* ============================================ */}
                <FadeInSection delay={100}>
                <div id="relationship-blueprint" className="scroll-mt-24 bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
                  {(() => {
                    const relationshipSign = moonSignName || sunSign?.name;
                    if (!relationshipSign) return null;

                    const safetyText = safetyNeeds[relationshipSign] || '';
                    const safetyParagraphs = safetyText.split('\n\n').filter(Boolean);

                    const loveText = showingLove[relationshipSign] || '';
                    const loveParagraphs = loveText.split('\n\n').filter(Boolean);

                    const misunderstandingText = misunderstandingPattern[relationshipSign] || '';
                    const misunderstandingParagraphs = misunderstandingText.split('\n\n').filter(Boolean);

                    const strainText = relationshipStrain[relationshipSign] || '';
                    const strainParagraphs = strainText.split('\n\n').filter(Boolean);

                    const helpsText = whatHelps[relationshipSign] || '';
                    const helpsParagraphs = helpsText.split('\n\n').filter(Boolean);

                    const questionText = returnQuestion[relationshipSign] || '';
                    const questionParagraphs = questionText.split('\n\n').filter(Boolean);

                    return (
                      <>
                        {/* Header with accent rail */}
                        <div className="flex">
                          <div className="w-1 bg-[#7A746C]" />
                          <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
                            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Relationship Blueprint</h2>
                            <p className="text-sm text-[#6B6B6B] leading-relaxed">
                              How you bond, attach, and stay connected
                            </p>
                          </div>
                        </div>

                        <div className="p-6 md:p-8 pt-0 space-y-6">
                          {/* Key Insight Callout */}
                          <div className="bg-gradient-to-r from-[#E4CCC4]/20 to-[#E4CCC4]/5 border-l-4 border-[#8B6B60] rounded-r-xl p-5">
                            <div className="flex items-start gap-3">
                              <span className="text-[#8B6B60] text-lg mt-0.5">&#9889;</span>
                              <div>
                                <p className="text-xs tracking-wider uppercase text-[#8B6B60] mb-2">Key Insight</p>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                                  {relationshipInsights[relationshipSign as keyof typeof relationshipInsights] ||
                                   "Your relationship patterns aren't flaws to fix—they're adaptations that once protected you. Understanding them is the first step to choosing consciously."}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* What you need to feel safe */}
                          {safetyText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#C4A88F]">&#9825;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">What you need to feel safe</p>
                              </div>
                              <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                {safetyParagraphs[0]}
                              </p>
                              {safetyParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                  {safetyParagraphs[1]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* How you show love */}
                          {loveText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#C4A88F]">&#10084;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">How you show love</p>
                              </div>
                              <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                {loveParagraphs[0]}
                              </p>
                              {loveParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                  {loveParagraphs[1]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Where misunderstandings begin */}
                          {misunderstandingText && (
                            <div className="bg-[#F5F3F0] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#7A746C]">&#8644;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">Where misunderstandings begin</p>
                              </div>
                              <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                {misunderstandingParagraphs[0]}
                              </p>
                              {misunderstandingParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                  {misunderstandingParagraphs[1]}
                                </p>
                              )}
                              {misunderstandingParagraphs[2] && (
                                <p className="text-[#2A2A2A]/80 text-sm italic">
                                  {misunderstandingParagraphs[2]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Strain and Helps - side by side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Where relationships strain */}
                            {strainText && (
                              <div className="bg-[#F5EBE8] rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-[#8B6B60]">&#9888;</span>
                                  <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">Where relationships strain</p>
                                </div>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                  {strainParagraphs[0]}
                                </p>
                                {strainParagraphs[1] && (
                                  <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                    {strainParagraphs[1]}
                                  </p>
                                )}
                                {strainParagraphs[2] && (
                                  <p className="text-[#2A2A2A]/80 text-sm italic">
                                    {strainParagraphs[2]}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* What actually helps */}
                            {helpsText && (
                              <div className="bg-[#EDF4ED] rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-[#4A6B44]">&#10003;</span>
                                  <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">What actually helps</p>
                                </div>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                  {helpsParagraphs[0]}
                                </p>
                                {helpsParagraphs[1] && (
                                  <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                    {helpsParagraphs[1]}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Anchor box */}
                          {questionText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-6">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#C4A88F]">&#10022;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">A question to return to</p>
                              </div>
                              <p className="font-serif text-lg text-[#2A2A2A] leading-relaxed mb-2">
                                {questionParagraphs[0]}
                              </p>
                              {questionParagraphs[1] && (
                                <p className="text-[#6B6B6B] text-sm">
                                  {questionParagraphs[1]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Reflection Questions */}
                          {relationshipQuestions[relationshipSign as keyof typeof relationshipQuestions] && (
                            <div className="mt-2">
                              <button
                                onClick={() => setExpandedReflections(prev => ({ ...prev, 'relationship': !prev['relationship'] }))}
                                className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] hover:bg-[#F5F3F0] rounded-xl transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-[#6B6B6B] group-hover:text-[#2A2A2A]">&#128221;</span>
                                  <span className="text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A]">Reflect on this</span>
                                </div>
                                <span className={`text-[#6B6B6B] transition-transform ${expandedReflections['relationship'] ? 'rotate-180' : ''}`}>
                                  &#9660;
                                </span>
                              </button>
                              {expandedReflections['relationship'] && (
                                <div className="mt-3 p-5 bg-[#FAFAF8] rounded-xl space-y-4">
                                  {relationshipQuestions[relationshipSign as keyof typeof relationshipQuestions].map((question, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                      <span className="text-[#8B6B60] mt-0.5 flex-shrink-0">{i + 1}.</span>
                                      <p className="text-[#2A2A2A]/80 text-sm leading-relaxed italic">{question}</p>
                                    </div>
                                  ))}
                                  <p className="text-xs text-[#6B6B6B] pt-2 border-t border-[#2A2A2A]/5">
                                    Take a moment to journal or simply sit with these questions.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Breathing space */}
                        <div className="h-2" />
                      </>
                    );
                  })()}
                </div>
                </FadeInSection>

                {/* Mid-report save reminder */}
                {!userEmail && (
                  <div className="bg-[#F5F3F0] rounded-xl p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[#6B6B6B]">&#9993;</span>
                      <p className="text-sm text-[#6B6B6B]">Want to save your progress?</p>
                    </div>
                    <button
                      onClick={() => saveReportRef.current?.scrollIntoView({ behavior: 'smooth' })}
                      className="text-sm px-4 py-2 rounded-full bg-[#2A2A2A] text-[#FAF7F2] hover:bg-[#1a1a1a] transition-colors whitespace-nowrap"
                    >
                      Email me this report
                    </button>
                  </div>
                )}

                {/* ============================================ */}
                {/* CARD 5: WORK AND IMPACT STYLE */}
                {/* ============================================ */}
                <FadeInSection delay={100}>
                <div id="work-style" className="scroll-mt-24 bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
                  {(() => {
                    if (!sunSign) return null;

                    const motivationText = workMotivation[sunSign.name] || '';
                    const motivationParagraphs = motivationText.split('\n\n').filter(Boolean);

                    const ambitionText = ambitionStyle[sunSign.name] || '';
                    const ambitionParagraphs = ambitionText.split('\n\n').filter(Boolean);

                    const authorityText = authorityRelationship[sunSign.name] || '';
                    const authorityParagraphs = authorityText.split('\n\n').filter(Boolean);

                    const environmentText = bestWorkEnvironment[sunSign.name] || '';
                    const environmentParagraphs = environmentText.split('\n\n').filter(Boolean);

                    const burnoutText = burnoutPattern[sunSign.name] || '';
                    const burnoutParagraphs = burnoutText.split('\n\n').filter(Boolean);
                    const burnoutSignals = burnoutText.match(/• ([^\n]+)/g)?.map(s => s.replace('• ', '')) || [];

                    const checkInText = workCheckIn[sunSign.name] || '';
                    const checkInParagraphs = checkInText.split('\n\n').filter(Boolean);

                    return (
                      <>
                        {/* Header with accent rail */}
                        <div className="flex">
                          <div className="w-1 bg-[#7A746C]" />
                          <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
                            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Work and Impact Style</h2>
                            <p className="text-sm text-[#6B6B6B] leading-relaxed">
                              How you engage with contribution, authority, and effort
                            </p>
                          </div>
                        </div>

                        <div className="p-6 md:p-8 pt-0 space-y-6">
                          {/* Key Insight Callout */}
                          <div className="bg-gradient-to-r from-[#D4A84B]/10 to-[#D4A84B]/5 border-l-4 border-[#D4A84B] rounded-r-xl p-5">
                            <div className="flex items-start gap-3">
                              <span className="text-[#D4A84B] text-lg mt-0.5">&#9889;</span>
                              <div>
                                <p className="text-xs tracking-wider uppercase text-[#8B6914] mb-2">Key Insight</p>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                                  {workInsights[sunSign.name as keyof typeof workInsights] ||
                                   "Your work style reflects your core identity. The goal isn't to change it, but to find environments where it thrives."}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* What motivates you */}
                          {motivationText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#D4A84B]">&#9733;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">What motivates you</p>
                              </div>
                              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                {motivationParagraphs[0]}
                              </p>
                              {motivationParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                  {motivationParagraphs[1]}
                                </p>
                              )}
                              {motivationParagraphs[2] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed italic">
                                  {motivationParagraphs[2]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* How ambition shows up */}
                          {ambitionText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#B8A090]">&#10138;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">How ambition shows up</p>
                              </div>
                              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                {ambitionParagraphs[0]}
                              </p>
                              {ambitionParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                  {ambitionParagraphs[1]}
                                </p>
                              )}
                              {ambitionParagraphs[2] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed italic">
                                  {ambitionParagraphs[2]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Your relationship with authority */}
                          {authorityText && (
                            <div className="bg-[#F5F3F0] rounded-xl p-5">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-[#7A746C]">&#9830;</span>
                                <p className="text-xs font-medium tracking-wide uppercase text-[#7A746C]">Your relationship with authority</p>
                              </div>
                              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                {authorityParagraphs[0]}
                              </p>
                              {authorityParagraphs[1] && (
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                  {authorityParagraphs[1]}
                                </p>
                              )}
                              {authorityParagraphs[2] && (
                                <p className="text-[#2A2A2A]/80 text-sm italic">
                                  {authorityParagraphs[2]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Best Work and Burnout - side by side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Where you do your best work */}
                            {environmentText && (
                              <div className="bg-[#EDF4ED] rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-[#4A6B44]">&#9788;</span>
                                  <p className="text-xs font-medium tracking-wide uppercase text-[#4A6B44]">Where you do your best work</p>
                                </div>
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-3">
                                  {environmentParagraphs[0]}
                                </p>
                                {environmentParagraphs[1] && (
                                  <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                    {environmentParagraphs[1]}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* How burnout develops */}
                            {burnoutText && (
                              <div className="bg-[#F5EBE8] rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-[#8B6B60]">&#9888;</span>
                                  <p className="text-xs font-medium tracking-wide uppercase text-[#8B6B60]">How burnout develops for you</p>
                                </div>
                                <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-4">
                                  {burnoutParagraphs[0]}
                                </p>
                                {burnoutSignals.length > 0 && (
                                  <ul className="space-y-3 mb-4">
                                    {burnoutSignals.slice(0, 4).map((signal, i) => (
                                      <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                                        <span className="text-[#D4B8A4] mt-0.5">·</span>
                                        <span>{signal}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                                {burnoutParagraphs[2] && (
                                  <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                    {burnoutParagraphs[2]}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Anchor box - Check-in */}
                          {checkInText && (
                            <div className="bg-[#F0EBE3] rounded-xl p-6">
                              <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#D4A84B] mt-2 animate-pulse" />
                                <div>
                                  <p className="text-xs tracking-wider uppercase text-[#6B6B6B] mb-3">A useful check-in</p>
                                  <p className="font-serif text-lg text-[#2A2A2A] leading-relaxed mb-2">
                                    {checkInParagraphs[0]}
                                  </p>
                                  {checkInParagraphs[1] && (
                                    <p className="text-[#6B6B6B] text-sm">
                                      {checkInParagraphs[1]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Reflection Questions */}
                          {workQuestions[sunSign.name as keyof typeof workQuestions] && (
                            <div className="mt-2">
                              <button
                                onClick={() => setExpandedReflections(prev => ({ ...prev, 'work': !prev['work'] }))}
                                className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] hover:bg-[#F5F3F0] rounded-xl transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-[#6B6B6B] group-hover:text-[#2A2A2A]">&#128221;</span>
                                  <span className="text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A]">Reflect on this</span>
                                </div>
                                <span className={`text-[#6B6B6B] transition-transform ${expandedReflections['work'] ? 'rotate-180' : ''}`}>
                                  &#9660;
                                </span>
                              </button>
                              {expandedReflections['work'] && (
                                <div className="mt-3 p-5 bg-[#FAFAF8] rounded-xl space-y-4">
                                  {workQuestions[sunSign.name as keyof typeof workQuestions].map((question, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                      <span className="text-[#D4A84B] mt-0.5 flex-shrink-0">{i + 1}.</span>
                                      <p className="text-[#2A2A2A]/80 text-sm leading-relaxed italic">{question}</p>
                                    </div>
                                  ))}
                                  <p className="text-xs text-[#6B6B6B] pt-2 border-t border-[#2A2A2A]/5">
                                    Take a moment to journal or simply sit with these questions.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
                </FadeInSection>

                {/* ============================================ */}
                {/* CARD 6: SHADOW AND GROWTH EDGE */}
                {/* ============================================ */}
                <FadeInSection delay={100}>
                <div id="shadow-growth" className="scroll-mt-24 bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
                  {(() => {
                    if (!sunSign) return null;

                    // Parse friction text
                    const frictionText = recurringFriction[sunSign.name] || '';
                    const frictionParagraphs = frictionText.split('\n\n').filter(Boolean);

                    // Parse pattern text - extract trigger, move, relief, cost
                    const patternText = patternInMotion[sunSign.name] || '';
                    const triggerMatch = patternText.match(/\*\*Trigger\*\*\n([^\n]+)/);
                    const moveMatch = patternText.match(/\*\*Automatic move\*\*\n([^\n]+)/);
                    const reliefMatch = patternText.match(/\*\*Short-term relief\*\*\n([^\n]+)/);
                    const costMatch = patternText.match(/\*\*Long-term cost\*\*\n([^\n]+)/);
                    const closingMatch = patternText.match(/This is not[^.]+\. It's self-protection through ([^.]+)/);
                    const selfProtectionType = closingMatch ? closingMatch[1] : '';

                    // Parse contradiction text
                    const contradictionText = internalContradiction[sunSign.name] || '';
                    const contradictionParagraphs = contradictionText.split('\n\n').filter(Boolean);

                    // Parse blind spot text
                    const blindSpotText = blindSpot[sunSign.name] || '';
                    const blindSpotParagraphs = blindSpotText.split('\n\n').filter(Boolean);

                    // Parse growth text - extract bullet points
                    const growthText = growthInPractice[sunSign.name] || '';
                    const growthParagraphs = growthText.split('\n\n').filter(Boolean);
                    const growthBullets = growthText.match(/• ([^\n]+)/g)?.map(s => s.replace('• ', '')) || [];
                    const growthClosing = growthParagraphs[growthParagraphs.length - 1];

                    // Parse relevance text
                    const relevanceText = relevanceCue[sunSign.name] || '';
                    const relevanceParagraphs = relevanceText.split('\n\n').filter(Boolean);

                    return (
                      <>
                        {/* Header with accent rail */}
                        <div className="flex">
                          <div className="w-1 bg-[#7A746C]" />
                          <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
                            <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Shadow and Growth Edge</h2>
                            <p className="text-sm text-[#6B6B6B] leading-relaxed">
                              The pattern that shows up under pressure—and the path through it
                            </p>
                          </div>
                        </div>

                        <div className="p-6 md:p-8 pt-0 space-y-6">
                          {/* Key Insight Callout */}
                          <div className="bg-gradient-to-r from-[#7A746C]/10 to-[#7A746C]/5 border-l-4 border-[#7A746C] rounded-r-xl p-5">
                            <div className="flex items-start gap-3">
                              <span className="text-[#7A746C] text-lg mt-0.5">&#9889;</span>
                              <div>
                                <p className="text-xs tracking-wider uppercase text-[#5A5E64] mb-2">Key Insight</p>
                                <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                                  {shadowInsights[sunSign.name as keyof typeof shadowInsights] ||
                                   "Your shadow isn't something to eliminate—it's something to understand. When you know your triggers, you can choose your response."}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Layer 2: Recurring Friction - Identity statement */}
                          {frictionText && (
                            <div className="bg-[#FAF7F2] rounded-xl p-5">
                              <p className="text-xs tracking-wider uppercase text-[#6B6B6B] mb-3">The recurring friction</p>
                              <p className="font-serif text-lg text-[#2A2A2A] text-sm leading-relaxed mb-3">
                                {frictionParagraphs[0]}
                              </p>
                              {frictionParagraphs[1] && (
                                <div className="space-y-1 text-[#2A2A2A]/80">
                                  {frictionParagraphs[1].split('\n').filter(Boolean).map((line, i) => (
                                    <p key={i}>{line}</p>
                                  ))}
                                </div>
                              )}
                              {frictionParagraphs[2] && (
                                <p className="text-[#6B6B6B] leading-relaxed mt-3 text-sm italic">
                                  {frictionParagraphs[2]}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Layer 3: Pattern in Motion - 4-step flow */}
                          {patternText && (
                            <div className="bg-[#F5F3F0] rounded-xl p-5">
                              <p className="text-xs tracking-wider uppercase text-[#7A746C] mb-4">The pattern in motion</p>

                              <div className="space-y-4">
                                {/* Trigger */}
                                {triggerMatch && (
                                  <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#E4CCC4] flex items-center justify-center text-xs text-[#8B6B60] font-medium flex-shrink-0">1</span>
                                    <div>
                                      <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Trigger</p>
                                      <p className="text-[#2A2A2A]/80">{triggerMatch[1]}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Automatic move */}
                                {moveMatch && (
                                  <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#D4B8A4] flex items-center justify-center text-xs text-[#8B5A3C] font-medium flex-shrink-0">2</span>
                                    <div>
                                      <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Automatic move</p>
                                      <p className="text-[#2A2A2A]/80">{moveMatch[1]}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Short-term relief */}
                                {reliefMatch && (
                                  <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#D8E0D2] flex items-center justify-center text-xs text-[#4A6B44] font-medium flex-shrink-0">3</span>
                                    <div>
                                      <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Short-term relief</p>
                                      <p className="text-[#2A2A2A]/80">{reliefMatch[1]}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Long-term cost */}
                                {costMatch && (
                                  <div className="flex items-start gap-3">
                                    <span className="w-6 h-6 rounded-full bg-[#C4C8CC] flex items-center justify-center text-xs text-[#5A5E64] font-medium flex-shrink-0">4</span>
                                    <div>
                                      <p className="text-xs text-[#7A746C] uppercase tracking-wider mb-1">Long-term cost</p>
                                      <p className="text-[#2A2A2A]/80">{costMatch[1]}</p>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* Self-protection type */}
                              {selfProtectionType && (
                                <div className="mt-4 pt-4 border-t border-[#D7D0C6]">
                                  <p className="text-[#6B6B6B] text-sm italic">
                                    This is self-protection through <span className="text-[#2A2A2A] font-medium">{selfProtectionType}</span>.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Layer 4: Internal Contradiction - dashed border */}
                          {contradictionText && (
                            <div className="rounded-xl p-5 border border-dashed border-[#D7D0C6] bg-[#FAFAF8]">
                              <p className="text-xs tracking-wider uppercase text-[#7A746C] mb-3">The internal contradiction</p>
                              {contradictionParagraphs.slice(0, 2).map((para, i) => (
                                <p key={i} className="text-[#2A2A2A]/80 leading-relaxed mb-2">
                                  {para}
                                </p>
                              ))}
                              {contradictionParagraphs[2] && (
                                <div className="mt-3 pt-3 border-t border-[#D7D0C6]/50">
                                  <p className="text-[#6B6B6B] text-sm">
                                    {contradictionParagraphs[2]}
                                  </p>
                                  {contradictionParagraphs[3] && (
                                    <p className="text-[#2A2A2A]/80 text-sm mt-2 italic">
                                      {contradictionParagraphs[3]}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Layer 5 & 6: Blind Spot and Growth - side by side */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Blind Spot - warning card */}
                            {blindSpotText && (
                              <div className="bg-[#F5EBE8] rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                  <span className="text-[#8B6B60] text-sm mt-1">⚠</span>
                                  <div className="flex-1">
                                    <p className="text-xs tracking-wider uppercase text-[#8B6B60] mb-3">The blind spot to watch</p>
                                    <p className="text-[#2A2A2A] font-medium text-sm leading-relaxed mb-3">
                                      {blindSpotParagraphs[0]}
                                    </p>
                                    {blindSpotParagraphs[1] && (
                                      <div className="space-y-1 text-[#6B6B6B] text-sm">
                                        {blindSpotParagraphs[1].split('\n').filter(Boolean).map((line, i) => (
                                          <p key={i}>{line}</p>
                                        ))}
                                      </div>
                                    )}
                                    {blindSpotParagraphs[2] && (
                                      <p className="text-[#2A2A2A]/80 italic text-sm mt-3">
                                        {blindSpotParagraphs[2]}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Growth in Practice - green hopeful card */}
                            {growthText && (
                              <div className="bg-[#EDF4ED] rounded-xl p-5">
                                <div className="flex items-start gap-3">
                                  <span className="text-[#4A6B44] text-sm mt-1">↑</span>
                                  <div className="flex-1">
                                    <p className="text-xs tracking-wider uppercase text-[#4A6B44] mb-3">What growth looks like</p>
                                    <p className="text-[#2A2A2A]/80 text-sm leading-relaxed mb-4">
                                      {growthParagraphs[0]}
                                    </p>

                                    {/* Growth bullets */}
                                    {growthBullets.length > 0 && (
                                      <ul className="space-y-2 mb-4">
                                        {growthBullets.map((bullet, i) => (
                                          <li key={i} className="flex items-start gap-2 text-[#2A2A2A]/80 text-sm">
                                            <span className="text-[#9CB896]">→</span>
                                            <span>{bullet}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    )}

                                    {/* Closing affirmation */}
                                    {growthClosing && !growthClosing.startsWith('•') && (
                                      <div className="border-l-2 border-[#9CB896] pl-4">
                                        <p className="text-[#2A2A2A] text-sm font-medium italic">
                                          {growthClosing}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Layer 7: Relevance Cue - anchor callout */}
                          {relevanceText && (
                            <div className="bg-[#F0EBE3] rounded-xl p-6">
                              <div className="flex items-start gap-3">
                                <span className="w-2 h-2 rounded-full bg-[#7A746C] mt-2 animate-pulse" />
                                <div>
                                  <p className="text-xs tracking-wider uppercase text-[#6B6B6B] mb-3">When this card matters most</p>
                                  <p className="font-serif text-lg text-[#2A2A2A] leading-relaxed mb-2">
                                    {relevanceParagraphs[0]}
                                  </p>
                                  {relevanceParagraphs[1] && (
                                    <p className="text-[#6B6B6B] text-sm">
                                      {relevanceParagraphs[1]}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Reflection Questions */}
                          {shadowQuestions[sunSign.name as keyof typeof shadowQuestions] && (
                            <div className="mt-2">
                              <button
                                onClick={() => setExpandedReflections(prev => ({ ...prev, 'shadow': !prev['shadow'] }))}
                                className="w-full flex items-center justify-between p-4 bg-[#FAFAF8] hover:bg-[#F5F3F0] rounded-xl transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="text-[#6B6B6B] group-hover:text-[#2A2A2A]">&#128221;</span>
                                  <span className="text-sm text-[#6B6B6B] group-hover:text-[#2A2A2A]">Reflect on this</span>
                                </div>
                                <span className={`text-[#6B6B6B] transition-transform ${expandedReflections['shadow'] ? 'rotate-180' : ''}`}>
                                  &#9660;
                                </span>
                              </button>
                              {expandedReflections['shadow'] && (
                                <div className="mt-3 p-5 bg-[#FAFAF8] rounded-xl space-y-4">
                                  {shadowQuestions[sunSign.name as keyof typeof shadowQuestions].map((question, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                      <span className="text-[#7A746C] mt-0.5 flex-shrink-0">{i + 1}.</span>
                                      <p className="text-[#2A2A2A]/80 text-sm leading-relaxed italic">{question}</p>
                                    </div>
                                  ))}
                                  <p className="text-xs text-[#6B6B6B] pt-2 border-t border-[#2A2A2A]/5">
                                    These questions may bring up discomfort. That&apos;s often where growth happens.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
                </FadeInSection>

                {/* ============================================ */}
                {/* CARD 7: TIMING WITHOUT PREDICTION - Hidden for future feature */}
                {/* ============================================ */}
                {/*
                <div id="timing" className="scroll-mt-24 bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
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
                */}

                {/* ============================================ */}
                {/* CARD 8: ENVIRONMENT AND PLACE - Hidden for future feature */}
                {/* ============================================ */}
                {/*
                <div id="environment" className="scroll-mt-24 bg-white rounded-2xl p-6 md:p-8 border border-[#2A2A2A]/5 shadow-sm">
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
                */}

                {/* ============================================ */}
                {/* CARD 9: PRACTICAL TAKEAWAYS */}
                {/* ============================================ */}
                <FadeInSection delay={100}>
                <div id="takeaways" className="scroll-mt-24 bg-white rounded-2xl border border-[#2A2A2A]/5 shadow-sm overflow-hidden">
                  {/* Header with accent rail */}
                  <div className="flex">
                    <div className="w-1 bg-[#7A746C]" />
                    <div className="flex-1 p-6 md:p-8 bg-gradient-to-r from-[#F5F3F0]/50 to-transparent">
                      <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Practical Takeaways</h2>
                      <p className="text-sm text-[#6B6B6B] leading-relaxed">
                        A grounded summary for daily use
                      </p>
                    </div>
                  </div>

                  {sunSign && (
                    <div className="p-6 md:p-8 pt-0">
                      {/* Key Insight Callout */}
                      <div className="mb-6 bg-gradient-to-r from-[#9CB896]/15 to-[#9CB896]/5 border-l-4 border-[#9CB896] rounded-r-xl p-5">
                        <div className="flex items-start gap-3">
                          <span className="text-[#9CB896] text-lg mt-0.5">&#9889;</span>
                          <div>
                            <p className="text-xs tracking-wider uppercase text-[#4A6B44] mb-2">Key Insight</p>
                            <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                              {getTakeawaysInsight(sunSign.name, moonSignName)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Block 1 & 2: Lean into / Watch for - mirrored columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Lean into - warm accent */}
                        {leanInto[sunSign.name] && (
                          <div className="bg-[#FAF7F2] rounded-xl p-5">
                            <p className="text-xs tracking-wider uppercase text-[#8B6914] mb-1">Lean into</p>
                            <p className="text-xs text-[#6B6B6B] mb-4">Strengths that grow when used deliberately</p>
                            <ul className="space-y-3">
                              {leanInto[sunSign.name].map((item, i) => {
                                // Add micro hierarchy - emphasize first few words
                                const words = item.split(' ');
                                const emphasisEnd = Math.min(3, words.findIndex(w => w.length > 6) + 1) || 3;
                                const emphasis = words.slice(0, emphasisEnd).join(' ');
                                const rest = words.slice(emphasisEnd).join(' ');
                                return (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="text-[#D4A84B] mt-0.5 text-sm">→</span>
                                    <span className="text-[#2A2A2A]/80 leading-relaxed text-sm">
                                      <span className="text-[#2A2A2A]">{emphasis}</span>
                                      {rest && ` ${rest}`}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}

                        {/* Watch for - cooler/muted accent */}
                        {watchFor[sunSign.name] && (
                          <div className="bg-[#F5F3F0] rounded-xl p-5">
                            <p className="text-xs tracking-wider uppercase text-[#5A5E64] mb-1">Watch for</p>
                            <p className="text-xs text-[#6B6B6B] mb-4">Patterns that emerge quietly under strain</p>
                            <ul className="space-y-3">
                              {watchFor[sunSign.name].map((item, i) => {
                                // Add micro hierarchy - emphasize first few words
                                const words = item.split(' ');
                                const emphasisEnd = Math.min(3, words.findIndex(w => w.length > 6) + 1) || 3;
                                const emphasis = words.slice(0, emphasisEnd).join(' ');
                                const rest = words.slice(emphasisEnd).join(' ');
                                return (
                                  <li key={i} className="flex items-start gap-3">
                                    <span className="text-[#7A746C] mt-0.5 text-sm">·</span>
                                    <span className="text-[#2A2A2A]/80 leading-relaxed text-sm">
                                      <span className="text-[#2A2A2A]/80">{emphasis}</span>
                                      {rest && ` ${rest}`}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Block 3: One practical reframe - anchor card */}
                      {practicalReframe[sunSign.name] && (
                        <div className="bg-[#F0EBE3] rounded-xl p-6 md:p-8 mb-6">
                          <p className="text-xs tracking-wider uppercase text-[#6B6B6B] mb-4">One practical reframe</p>
                          {(() => {
                            const reframeText = practicalReframe[sunSign.name];
                            const paragraphs = reframeText.split('\n\n').filter(Boolean);
                            // First paragraph is usually the question/main point
                            const mainPoint = paragraphs[0] || '';
                            const supporting = paragraphs.slice(1).join('\n\n');

                            return (
                              <>
                                <p className="font-serif text-lg text-[#2A2A2A] leading-relaxed mb-4">
                                  {mainPoint}
                                </p>
                                {supporting && (
                                  <p className="text-[#6B6B6B] text-sm leading-relaxed">
                                    {supporting}
                                  </p>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}

                      {/* Block 4: This Week - Practical Micro-Experiments */}
                      {practicalAnchors[sunSign.name as keyof typeof practicalAnchors] && (
                        <div className="bg-white border border-[#2A2A2A]/10 rounded-xl p-5 md:p-6">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="w-2 h-2 rounded-full bg-[#9CB896] animate-pulse" />
                            <p className="text-xs tracking-wider uppercase text-[#4A6B44]">This Week</p>
                          </div>
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <span className="text-[#9CB896] mt-0.5 flex-shrink-0 font-medium">Try:</span>
                              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                {practicalAnchors[sunSign.name as keyof typeof practicalAnchors].tryThis}
                              </p>
                            </div>
                            <div className="flex items-start gap-3">
                              <span className="text-[#D4A84B] mt-0.5 flex-shrink-0 font-medium">Notice:</span>
                              <p className="text-[#2A2A2A]/80 text-sm leading-relaxed">
                                {practicalAnchors[sunSign.name as keyof typeof practicalAnchors].notice}
                              </p>
                            </div>
                            <div className="pt-3 border-t border-[#2A2A2A]/5">
                              <p className="text-xs text-[#6B6B6B] mb-2">Micro-experiment (5 min)</p>
                              <p className="text-[#2A2A2A] text-sm leading-relaxed font-medium">
                                {practicalAnchors[sunSign.name as keyof typeof practicalAnchors].microExperiment}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Completion signal - soft fade/extra padding */}
                  <div className="h-4 bg-gradient-to-b from-white to-[#FAF7F2]/50" />
                </div>
                </FadeInSection>

                {/* ============================================ */}
                {/* HOW TO USE */}
                {/* ============================================ */}
                <div className="bg-[#2A2A2A] rounded-2xl p-6 md:p-8 text-[#FAF7F2]">
                  <h2 className="font-serif text-xl mb-4">How to use this report</h2>
                  <div className="text-[#FAF7F2]/80 text-sm leading-relaxed whitespace-pre-line">
                    {howToUseReport}
                  </div>
                </div>

                {/* ============================================ */}
                {/* SOURCE ATTRIBUTION / METHODOLOGY */}
                {/* ============================================ */}
                <div className="bg-[#FAFAF8] rounded-2xl p-5 md:p-6 border border-[#2A2A2A]/5">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <div className="flex items-center gap-2">
                        <span className="text-[#6B6B6B]">&#9432;</span>
                        <span className="text-sm text-[#6B6B6B]">How we calculated this</span>
                      </div>
                      <span className="text-[#6B6B6B] transition-transform group-open:rotate-180">&#9660;</span>
                    </summary>
                    <div className="mt-4 pt-4 border-t border-[#2A2A2A]/5 space-y-3">
                      <p className="text-xs text-[#6B6B6B] leading-relaxed">
                        <strong className="text-[#2A2A2A]/80">Sun Sign:</strong> Calculated from your birth date using tropical zodiac positions.
                      </p>
                      <p className="text-xs text-[#6B6B6B] leading-relaxed">
                        <strong className="text-[#2A2A2A]/80">Moon &amp; Rising:</strong> Calculated using your birth time and location with ephemeris data for planetary positions.
                      </p>
                      <p className="text-xs text-[#6B6B6B] leading-relaxed">
                        <strong className="text-[#2A2A2A]/80">Interpretations:</strong> Based on traditional astrological principles combined with modern psychological frameworks.
                      </p>
                      <p className="text-xs text-[#6B6B6B]/70 italic pt-2">
                        Astrology is a reflective framework, not a predictive science. These interpretations describe tendencies, not certainties.
                      </p>
                    </div>
                  </details>
                </div>

                {/* ============================================ */}
                {/* FEEDBACK - Did this resonate? */}
                {/* ============================================ */}
                <div className="bg-white rounded-2xl p-5 md:p-6 border border-[#2A2A2A]/5 text-center">
                  <p className="text-sm text-[#6B6B6B] mb-4">Did this report resonate with you?</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        // Could integrate with analytics or feedback system
                        alert('Thank you for your feedback! We\'re glad it resonated.');
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EDF4ED] text-[#4A6B44] hover:bg-[#D8E0D2] transition-colors text-sm"
                    >
                      <span>&#128077;</span>
                      <span>Yes, it did</span>
                    </button>
                    <button
                      onClick={() => {
                        // Could open feedback form
                        alert('Thank you for your feedback. We\'re always working to improve.');
                      }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F3F0] text-[#6B6B6B] hover:bg-[#E8E4DD] transition-colors text-sm"
                    >
                      <span>&#128078;</span>
                      <span>Not quite</span>
                    </button>
                  </div>
                  <p className="text-xs text-[#6B6B6B]/60 mt-4">
                    Your feedback helps us improve the accuracy and usefulness of our reports.
                  </p>
                </div>

                  </div>
                </div>
              </div>
            </section>

            {/* Floating Save Button */}
            {showFloatingSave && (
              <button
                onClick={() => saveReportRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="fixed bottom-20 lg:bottom-8 right-4 lg:right-8 z-50 flex items-center gap-2 px-4 py-3 bg-[#2A2A2A] text-[#FAF7F2] rounded-full shadow-lg hover:bg-[#1a1a1a] transition-all text-sm"
              >
                <span>&#9993;</span>
                <span className="hidden sm:inline">Save report</span>
              </button>
            )}

            {/* Mobile Floating Navigation Bar */}
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-[#2A2A2A]/10 z-50">
              <div className="flex overflow-x-auto scrollbar-hide px-4 py-3 gap-2">
                {cardSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-colors ${
                      activeSection === section.id
                        ? 'bg-[#2A2A2A] text-[#FAF7F2]'
                        : 'bg-[#2A2A2A]/5 text-[#6B6B6B]'
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </div>
            </nav>

            <div className="container-editorial"><div className="h-px bg-[#2A2A2A]/10" /></div>

            {/* Save / Email */}
            <section ref={saveReportRef} className="container-editorial py-12">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="font-serif text-2xl text-[#2A2A2A] mb-4">Save your report</h2>
                <p className="text-[#6B6B6B] mb-8">We&apos;ll send a summary to your inbox.</p>
                <SendResultsEmail
                  defaultEmail={userEmail}
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
              </div>
            </section>

            {/* Disclaimer */}
            <section className="container-editorial py-8 pb-24 lg:pb-8">
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

export default function BirthReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="text-[#6B6B6B]">Loading...</p>
      </div>
    }>
      <BirthReportContent />
    </Suspense>
  );
}
