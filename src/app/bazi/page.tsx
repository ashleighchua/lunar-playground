'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SendResultsEmail } from '@/components/ui/SendResultsEmail';
import { calculateBaZi } from '@/lib/bazi';
import type { BaZiProfile } from '@/lib/bazi';
import { dayMasterContent, elementContent, patternDescriptions, baziFaqs } from '@/lib/data/bazi-content';
import { loadBirthData, saveBirthData } from '@/lib/birthData';
import { isValidDate } from '@/lib/utils';

const loadingElements = ['🌳', '🔥', '🏔️', '⚔️', '💧'];

const ELEMENT_COLORS: Record<string, { bar: string; text: string }> = {
  wood:  { bar: '#7A9A7E', text: '#5C7A60' },
  fire:  { bar: '#C4737B', text: '#A85560' },
  earth: { bar: '#C4A862', text: '#A68D4A' },
  metal: { bar: '#9A9CAE', text: '#6E7085' },
  water: { bar: '#6B85A3', text: '#4E6A85' },
};

const ELEMENT_DOT_COLORS: Record<string, string> = {
  Wood: '#7A9A7E',
  Fire: '#C4737B',
  Earth: '#C4A862',
  Metal: '#9A9CAE',
  Water: '#6B85A3',
};

const ELEMENT_CARD_BG: Record<string, string> = {
  Wood: '#E8F0E4',
  Fire: '#F5E4E6',
  Earth: '#F2ECDB',
  Metal: '#ECEDF2',
  Water: '#E2EAF0',
};

export default function BaZiPage() {
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [profile, setProfile] = useState<BaZiProfile | null>(null);
  const [formData, setFormData] = useState({
    birthdate: '',
    birthtime: '',
    gender: '' as 'Male' | 'Female' | 'Non-binary' | '',
  });
  const [dateError, setDateError] = useState<string | null>(null);
  const [genderError, setGenderError] = useState<string | null>(null);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    const stored = loadBirthData();
    if (stored) {
      const gender = (stored.gender === 'Male' || stored.gender === 'Female' || stored.gender === 'Non-binary')
        ? stored.gender : '';
      setFormData(prev => ({
        ...prev,
        birthdate: stored.birthdate || '',
        birthtime: stored.birthtime || '',
        gender,
      }));

      // Auto-calculate if we have all required data
      if (stored.birthdate && isValidDate(stored.birthdate) && gender) {
        setShowLoading(true);
        setLoadingIndex(0);
        const interval = setInterval(() => {
          setLoadingIndex(prev => (prev + 1) % loadingElements.length);
        }, 400);
        intervalsRef.current = [interval];
        setTimeout(() => {
          clearInterval(interval);
          const result = calculateBaZi(stored.birthdate, stored.birthtime || '12:00', gender);
          setProfile(result);
          setShowLoading(false);
          setShowResults(true);
        }, 3000);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!isValidDate(formData.birthdate)) {
      setDateError('Please enter a valid birth date');
      hasError = true;
    } else {
      setDateError(null);
    }

    if (!formData.gender) {
      setGenderError('Please select your gender');
      hasError = true;
    } else {
      setGenderError(null);
    }

    if (hasError) return;

    saveBirthData({
      birthdate: formData.birthdate,
      birthtime: formData.birthtime,
      birthplace: null,
      gender: formData.gender,
    });

    setShowLoading(true);
    setLoadingIndex(0);

    const interval = setInterval(() => {
      setLoadingIndex(prev => (prev + 1) % loadingElements.length);
    }, 400);
    intervalsRef.current = [interval];

    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);

    const result = calculateBaZi(formData.birthdate, formData.birthtime || '12:00', formData.gender);
    setProfile(result);
    setShowLoading(false);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
    setProfile(null);
  };

  const renderPillarCell = (pillar: BaZiProfile['yearPillar'], label: string) => (
    <div className="flex flex-col text-center">
      <div className="text-xs tracking-widest uppercase text-[#655E78] mb-3 pb-2 border-b border-[#2D2640]/10">
        {label}
      </div>
      <div className="py-3 border-b border-[#2D2640]/10">
        <div className="text-2xl font-serif text-[#2D2640] leading-none mb-1">
          {pillar.stemChinese}
        </div>
        <div className="text-xs text-[#2D2640] font-medium mt-2">{pillar.heavenlyStem}</div>
        <div
          className="text-[10px] mt-1 font-medium uppercase tracking-wide"
          style={{ color: elementContent[pillar.stemElement]?.color || '#655E78' }}
        >
          {pillar.stemElement}
        </div>
      </div>
      <div className="py-3">
        <div className="text-2xl font-serif text-[#2D2640] leading-none mb-1">
          {pillar.branchChinese}
        </div>
        <div className="text-xs text-[#2D2640] font-medium mt-2">{pillar.earthlyBranch}</div>
        <div
          className="text-[10px] mt-1 font-medium uppercase tracking-wide"
          style={{ color: elementContent[pillar.branchElement]?.color || '#655E78' }}
        >
          {pillar.branchElement}
        </div>
      </div>
    </div>
  );

  const dmContent = profile ? dayMasterContent[profile.dayMaster] : null;

  const pageContent = (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation />

      <main className="flex-1">
        {showLoading ? (
          /* Loading Screen */
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center max-w-sm mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-10">
                {loadingElements.map((el, i) => (
                  <span
                    key={i}
                    className="text-3xl transition-all duration-300"
                    style={{
                      opacity: i === loadingIndex ? 1 : 0.2,
                      transform: i === loadingIndex ? 'scale(1.4)' : 'scale(1)',
                    }}
                  >
                    {el}
                  </span>
                ))}
              </div>
              <p className="font-serif text-2xl text-[#2D2640] mb-3">
                Reading your Four Pillars...
              </p>
              <p className="text-sm text-[#655E78]">
                Mapping your heavenly stems and earthly branches
              </p>
            </div>
          </div>
        ) : !showResults ? (
          /* Form */
          <>
            <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4">Free Tool</p>
                <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] leading-[1.1] tracking-tight">
                  BaZi Four Pillars
                </h1>
                <p className="mt-5 text-lg text-[#655E78] leading-relaxed">
                  Think of it like a weather report for your life. BaZi maps the Five Elements active at your birth to show your strengths, your timing, and when to make your move.
                </p>
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            <section className="container-editorial py-12 md:py-16 min-h-[55vh] flex items-center justify-center">
              <div className="max-w-md w-full">
                <h2 className="font-serif text-2xl text-[#2D2640] mb-8 text-center">
                  Enter your birth details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="bazi-birthdate" className="block text-sm text-[#655E78] mb-2">
                      Date of birth
                    </label>
                    <input
                      type="date"
                      id="bazi-birthdate"
                      required
                      value={formData.birthdate}
                      onChange={(e) => {
                        setFormData({ ...formData, birthdate: e.target.value });
                        setDateError(null);
                      }}
                      className={`w-full px-4 py-3 border rounded-lg bg-transparent focus:outline-none transition-colors ${
                        formData.birthdate
                          ? 'text-[#2D2640] [&::-webkit-datetime-edit]:text-[#2D2640]'
                          : 'text-[#655E78]/50 [&::-webkit-datetime-edit]:text-[#655E78]/50'
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
                    <label htmlFor="bazi-birthtime" className="block text-sm text-[#655E78] mb-2">
                      Time of birth
                    </label>
                    <input
                      type="time"
                      id="bazi-birthtime"
                      required
                      value={formData.birthtime}
                      onChange={(e) => setFormData({ ...formData, birthtime: e.target.value })}
                      className={`w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors ${
                        formData.birthtime
                          ? 'text-[#2D2640] [&::-webkit-datetime-edit]:text-[#2D2640]'
                          : 'text-[#655E78]/50 [&::-webkit-datetime-edit]:text-[#655E78]/50'
                      }`}
                    />
                    <p className="mt-2 text-xs text-[#655E78]">
                      Time determines your Hour Pillar. Noon is a reasonable estimate if unknown.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-[#655E78] mb-3">
                      Gender
                    </label>
                    <div className="flex gap-4">
                      {(['Male', 'Female', 'Non-binary'] as const).map((g) => (
                        <label
                          key={g}
                          className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-lg cursor-pointer transition-colors ${
                            formData.gender === g
                              ? 'border-[#2D2640] bg-[#2D2640]/5'
                              : 'border-[#2D2640]/10 hover:border-[#2D2640]/30'
                          } ${genderError ? 'border-red-300' : ''}`}
                        >
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={formData.gender === g}
                            onChange={() => {
                              setFormData({ ...formData, gender: g });
                              setGenderError(null);
                            }}
                            className="sr-only"
                          />
                          <span className="text-sm text-[#2D2640]">{g}</span>
                        </label>
                      ))}
                    </div>
                    {genderError && (
                      <p className="mt-2 text-sm text-red-500">{genderError}</p>
                    )}
                    <p className="mt-2 text-xs text-[#655E78]">
                      Classical BaZi uses gender for luck pillar direction. Non-binary uses a neutral calculation.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors mt-4"
                  >
                    Calculate my Four Pillars
                  </button>
                </form>
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* What is BaZi + Five Elements (static, always visible) */}
            <section className="container-editorial py-12 md:py-16">
              <div className="max-w-2xl mb-10">
                <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-4">What is BaZi?</h2>
                <p className="text-[#655E78] leading-relaxed">
                  BaZi, or Four Pillars of Destiny, is a Chinese astrological system that maps the elemental energy present at the moment of your birth. It breaks your birth date and time into four pillars, Year, Month, Day, and Hour, each built from a Heavenly Stem and an Earthly Branch. Together, they reveal your dominant elements, your Day Master (the core &ldquo;you&rdquo; of the chart), and the patterns that shape your personality, career, and relationships.
                </p>
              </div>

              <h3 className="font-serif text-xl text-[#2D2640] mb-6">The Five Elements</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.values(elementContent).map((el) => (
                  <div key={el.name} className="rounded-lg border border-[#2D2640]/10 p-5">
                    <div className="text-2xl mb-2">{el.emoji}</div>
                    <p className="font-serif text-lg text-[#2D2640] mb-2">{el.name}</p>
                    <p className="text-sm text-[#655E78] leading-relaxed">{el.qualities}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Ten Day Masters (static, always visible) */}
            <section className="container-editorial py-12 md:py-16">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-2">The Ten Day Masters</h2>
              <p className="text-[#655E78] mb-8 max-w-2xl">
                Your Day Master is the Heavenly Stem of your Day Pillar, the element at the center of your chart. Here&apos;s what each one represents.
              </p>
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                {Object.values(dayMasterContent).map((dm) => (
                  <div key={dm.stem} className="border-b border-[#2D2640]/10 pb-6 md:pb-8">
                    <p className="font-serif text-lg text-[#2D2640] mb-1">
                      {dm.stem} {dm.element} ({dm.yinYang})
                    </p>
                    <p className="text-sm text-[#655E78] italic mb-2">{dm.metaphor}</p>
                    <p className="text-sm text-[#655E78] leading-relaxed">{dm.overview}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* FAQ (static, always visible) */}
            <section className="container-editorial py-12 md:py-16">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-8">Common Questions</h2>
              <div className="max-w-2xl space-y-8">
                {baziFaqs.map((item, i) => (
                  <div key={i}>
                    <h3 className="font-serif text-lg text-[#2D2640] mb-2">{item.q}</h3>
                    <p className="text-[#655E78] leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : profile && dmContent ? (
          /* Results */
          <>
            {/* Back Button + Hero */}
            <section className="container-editorial pt-8 pb-10 md:pt-12">
              <button
                onClick={handleBack}
                className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-6 flex items-center gap-2"
              >
                <span>←</span> Enter different details
              </button>

              <div>
                <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">Day Master</p>
                <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] leading-[1.1] tracking-tight">
                  {profile.dayMaster} {profile.dayMasterElement}
                </h1>
                <p className="mt-2 text-lg text-[#655E78]">
                  {profile.dayMasterYinYang} · {dmContent.metaphor}
                </p>
                <p className="mt-5 text-base text-[#655E78] leading-relaxed">
                  {dmContent.overview}
                </p>
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Four Pillars Table */}
            <section className="container-editorial py-12 md:py-14">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-2">Your Four Pillars</h2>
              <p className="text-sm text-[#655E78] mb-8">
                The four columns of your BaZi chart: Year, Month, Day, and Hour.
              </p>

              <div className="rounded-lg overflow-hidden bg-[#E8DED4]">
                <div className="grid grid-cols-4 divide-x divide-[#2D2640]/10">
                  {/* Header row */}
                  {(['Year', 'Month', 'Day', 'Hour'] as const).map((label) => (
                    <div key={label} className="text-center py-3 bg-[#2D2640]/[0.05]">
                      <span className="text-xs uppercase tracking-widest text-[#2D2640]">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Heavenly Stems row */}
                <div className="grid grid-cols-4 divide-x divide-[#2D2640]/10 border-t border-[#2D2640]/10">
                  {[profile.yearPillar, profile.monthPillar, profile.dayPillar, profile.hourPillar].map((pillar, i) => (
                    <div key={i} className="py-4 px-2 text-center">
                      <div className="text-3xl font-serif text-[#2D2640] leading-none mb-2">
                        {pillar.stemChinese}
                      </div>
                      <div className="text-xs font-medium text-[#2D2640]">{pillar.heavenlyStem}</div>
                      <div
                        className="text-[10px] uppercase tracking-wide mt-1 font-medium"
                        style={{ color: elementContent[pillar.stemElement]?.color || '#655E78' }}
                      >
                        {pillar.stemElement}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Earthly Branches row */}
                <div className="grid grid-cols-4 divide-x divide-[#2D2640]/10 border-t border-[#2D2640]/10">
                  {[profile.yearPillar, profile.monthPillar, profile.dayPillar, profile.hourPillar].map((pillar, i) => (
                    <div key={i} className="py-4 px-2 text-center bg-[#2D2640]/[0.04]">
                      <div className="text-3xl font-serif text-[#2D2640] leading-none mb-2">
                        {pillar.branchChinese}
                      </div>
                      <div className="text-xs font-medium text-[#2D2640]">{pillar.earthlyBranch}</div>
                      <div
                        className="text-[10px] uppercase tracking-wide mt-1 font-medium"
                        style={{ color: elementContent[pillar.branchElement]?.color || '#655E78' }}
                      >
                        {pillar.branchElement}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#655E78]">Top row:</span>
                  <span className="text-xs text-[#2D2640]">Heavenly Stem</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#655E78]">Bottom row:</span>
                  <span className="text-xs text-[#2D2640]">Earthly Branch</span>
                </div>
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Five Elements */}
            <section className="container-editorial py-12 md:py-14">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-2">Five Elements Balance</h2>
              <p className="text-sm text-[#655E78] mb-8">
                The distribution of elemental energy across your four pillars.
              </p>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                <div className="space-y-4">
                  {(Object.entries(profile.fiveElements) as [string, number][]).map(([element, pct]) => (
                    <div key={element}>
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base">{elementContent[element.charAt(0).toUpperCase() + element.slice(1)]?.emoji}</span>
                          <span className="text-sm text-[#2D2640] capitalize font-medium">{element}</span>
                        </div>
                        <span className="text-sm font-medium" style={{ color: ELEMENT_COLORS[element]?.text }}>{pct}%</span>
                      </div>
                      <div className="h-2 bg-[#2D2640]/8 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${pct}%`, backgroundColor: ELEMENT_COLORS[element]?.bar }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg p-6 md:p-8" style={{ backgroundColor: ELEMENT_CARD_BG[profile.dominantElement] || '#F0EBF8' }}>
                    <p className="text-xs uppercase tracking-widest text-[#2D2640] mb-3">Dominant Element</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ELEMENT_DOT_COLORS[profile.dominantElement] || '#9CA3AF' }} />
                      <p className="font-serif text-xl text-[#2D2640]">{profile.dominantElement}</p>
                    </div>
                    <p className="text-sm text-[#655E78] leading-relaxed">
                      {elementContent[profile.dominantElement]?.qualities}
                    </p>
                  </div>

                  <div className="rounded-lg p-6 md:p-8" style={{ backgroundColor: ELEMENT_CARD_BG[profile.weakestElement] || '#F0EBF8' }}>
                    <p className="text-xs uppercase tracking-widest text-[#2D2640] mb-3">Weakest Element</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full opacity-40" style={{ backgroundColor: ELEMENT_DOT_COLORS[profile.weakestElement] || '#9CA3AF' }} />
                      <p className="font-serif text-xl text-[#2D2640]">{profile.weakestElement}</p>
                    </div>
                    <p className="text-sm text-[#655E78] leading-relaxed">
                      This element is underrepresented in your chart. Cultivating its qualities can bring greater balance.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Gated preview + CTA */}
            <section className="container-editorial">
              {/* Blurred preview of gated content */}
              <div className="relative select-none pointer-events-none" aria-hidden="true">
                <div className="blur-[3px] opacity-60">
                  <div className="py-12 md:py-14">
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                      <div className="border border-[#2D2640]/10 rounded-lg p-6 md:p-8">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">Day Master Strength</p>
                        <p className="font-serif text-2xl text-[#2D2640] mb-4">{profile.strength}</p>
                        <p className="text-sm text-[#655E78] leading-relaxed">
                          Your Day Master element reveals how you approach life and the energy you carry. Understanding its strength helps you know when to push forward and when to seek support.
                        </p>
                      </div>
                      <div className="border border-[#2D2640]/10 rounded-lg p-6 md:p-8">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">Favorable Elements</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {profile.favorableElements.slice(0, 2).map((el) => (
                            <span
                              key={el}
                              className="px-3 py-1.5 rounded-full text-sm font-medium text-white"
                              style={{ backgroundColor: elementContent[el]?.color || '#655E78' }}
                            >
                              {elementContent[el]?.emoji} {el}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-[#655E78] leading-relaxed">
                          Surrounding yourself with these elemental energies supports your natural strengths and brings greater harmony to your life.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 md:gap-6 mt-6">
                      <div className="border border-[#2D2640]/10 rounded-lg p-5">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">Lucky Colors</p>
                        <p className="text-sm text-[#2D2640]">Revealed in full report</p>
                      </div>
                      <div className="border border-[#2D2640]/10 rounded-lg p-5">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">Directions</p>
                        <p className="text-sm text-[#2D2640]">Revealed in full report</p>
                      </div>
                      <div className="border border-[#2D2640]/10 rounded-lg p-5">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">Numbers</p>
                        <p className="text-sm text-[#2D2640]">Revealed in full report</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-[#2D2640]/10" />

                  <div className="py-12 md:py-14">
                    <h2 className="font-serif text-2xl text-[#2D2640] mb-8">Your Chart Pattern</h2>
                    <div className="border border-[#2D2640]/10 rounded-lg p-6 md:p-8 max-w-2xl">
                      <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">{profile.pattern}</p>
                      <p className="text-sm text-[#655E78] leading-relaxed">
                        Your chart pattern reflects a unique blend of elemental forces that shapes how you engage with the world.
                      </p>
                    </div>
                  </div>

                  <div className="h-px bg-[#2D2640]/10" />

                  <div className="py-12 md:py-14">
                    <h2 className="font-serif text-2xl text-[#2D2640] mb-8">
                      {profile.dayMaster} {profile.dayMasterElement} - Deeper Insights
                    </h2>
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                      <div className="border border-[#2D2640]/10 rounded-lg p-6 md:p-8">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4">Personality</p>
                        <p className="text-sm text-[#655E78] leading-relaxed">Your core personality traits and natural tendencies are revealed through your Day Master.</p>
                      </div>
                      <div className="border border-[#2D2640]/10 rounded-lg p-6 md:p-8">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4">Career</p>
                        <p className="text-sm text-[#655E78] leading-relaxed">Your ideal career path and professional strengths are shaped by your elemental balance.</p>
                      </div>
                      <div className="border border-[#2D2640]/10 rounded-lg p-6 md:p-8">
                        <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4">Relationships</p>
                        <p className="text-sm text-[#655E78] leading-relaxed">How you connect with others and your relational patterns stem from your chart structure.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gradient overlay to fade out the blurred content */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#F0EBF8]/0 via-[#F0EBF8]/40 to-[#F0EBF8]" />
              </div>

              {/* CTA card overlaid */}
              <div className="relative -mt-32 pb-12 md:pb-16">
                <div className="max-w-3xl mx-auto">
                  <div className="bg-[#F0E6D6] rounded-2xl p-8 md:p-12">
                    <div className="text-center mb-8">
                      <span className="text-xs tracking-[0.15em] uppercase text-[#C4365A]">Go deeper</span>
                      <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] mt-4 mb-4">
                        Unlock your full BaZi reading
                      </h2>
                      <p className="text-lg text-[#655E78] leading-relaxed max-w-lg mx-auto">
                        Your BaZi shows the timing and structure. Your natal chart shows the why. The full reading connects both and reveals how to work with your elemental balance.
                      </p>
                    </div>

                    <ul className="max-w-sm mx-auto mb-6 space-y-3">
                      <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                        <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                        Day Master strength and what it means for you
                      </li>
                      <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                        <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                        Favorable elements, lucky colors, directions and numbers
                      </li>
                      <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                        <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                        Personality, career, and relationship insights
                      </li>
                      <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                        <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                        Your unique chart pattern interpreted
                      </li>
                    </ul>

                    <div className="text-center">
                      <Link
                        href="/shop"
                        className="inline-block px-8 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-lg text-sm font-medium hover:bg-[#1E1835] transition-colors"
                      >
                        Get your BaZi reading &mdash; $50
                      </Link>
                      <p className="text-xs text-[#655E78]/60 mt-4">Or save with The Complete Architecture &mdash; $139</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Save Results */}
            <section className="py-12 md:py-16 px-6">
              <div className="max-w-xl mx-auto">
                <div className="bg-[#E8E3F0] rounded-2xl p-8 md:p-10 text-center">
                  <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Save your results</h2>
                  <p className="text-[#655E78] mb-8">Get your BaZi Four Pillars reading sent to your inbox.</p>
                  <SendResultsEmail type="bazi" data={profile} />
                </div>
              </div>
            </section>

            {/* Also Explore */}
            <section className="pb-12 px-6">
              <p className="text-center text-sm text-[#655E78]">
                Also explore:{' '}
                <a href="/your-chart" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Birth Chart</a>
                {' · '}
                <a href="/chinese-zodiac" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Chinese Zodiac</a>
                {' · '}
                <a href="/human-design" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Human Design</a>
              </p>
            </section>
          </>
        ) : null}
      </main>

      <Footer />
    </div>
  );

  return pageContent;
}
