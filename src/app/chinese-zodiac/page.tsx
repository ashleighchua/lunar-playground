'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { getChineseZodiac } from '@/lib/chineseZodiac';
import type { ChineseZodiacProfile } from '@/lib/chineseZodiac';
import { zodiacContent, zodiacFaqs } from '@/lib/data/zodiac-content';
import { loadBirthData, saveBirthData } from '@/lib/birthData';
import { SendResultsEmail } from '@/components/ui/SendResultsEmail';

type PageState = 'form' | 'loading' | 'results';

const LOADING_EMOJIS = ['🐉', '🐍', '🐎', '🐏', '🐒', '🐓', '🐕', '🐖', '🐀', '🐂', '🐅', '🐇'];

const ANIMAL_EMOJIS: Record<string, string> = {
  Rat: '🐀',
  Ox: '🐂',
  Tiger: '🐅',
  Rabbit: '🐇',
  Dragon: '🐉',
  Snake: '🐍',
  Horse: '🐎',
  Goat: '🐏',
  Monkey: '🐒',
  Rooster: '🐓',
  Dog: '🐕',
  Pig: '🐖',
};

const ELEMENT_COLORS: Record<string, string> = {
  Metal: 'text-[#8B8B8B]',
  Water: 'text-[#4A7FA5]',
  Wood: 'text-[#4A6B44]',
  Fire: 'text-[#C4542A]',
  Earth: 'text-[#A07840]',
};

const ELEMENT_BG: Record<string, string> = {
  Metal: 'bg-[#8B8B8B]/10',
  Water: 'bg-[#4A7FA5]/10',
  Wood: 'bg-[#4A6B44]/10',
  Fire: 'bg-[#C4542A]/10',
  Earth: 'bg-[#A07840]/10',
};

export default function ChineseZodiacPage() {
  const [pageState, setPageState] = useState<PageState>('form');
  const [birthdate, setBirthdate] = useState('');
  const [profile, setProfile] = useState<ChineseZodiacProfile | null>(null);
  const [loadingEmoji, setLoadingEmoji] = useState(0);

  // Auto-calculate if birth data exists, otherwise pre-fill form
  useEffect(() => {
    const saved = loadBirthData();
    if (saved?.birthdate) {
      setBirthdate(saved.birthdate);
      // Auto-calculate — skip form
      setPageState('loading');
      setTimeout(() => {
        const result = getChineseZodiac(saved.birthdate);
        setProfile(result);
        setPageState('results');
      }, 3000);
    }
  }, []);

  // Rotate loading emoji
  useEffect(() => {
    if (pageState !== 'loading') return;
    const interval = setInterval(() => {
      setLoadingEmoji((prev) => (prev + 1) % LOADING_EMOJIS.length);
    }, 250);
    return () => clearInterval(interval);
  }, [pageState]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthdate) return;

    // Save birth data for cross-page persistence
    saveBirthData({
      birthdate,
      birthtime: '',
      birthplace: null,
    });

    setPageState('loading');

    // 3-second loading screen then show results
    setTimeout(() => {
      const result = getChineseZodiac(birthdate);
      setProfile(result);
      setPageState('results');
    }, 3000);
  }

  function handleReset() {
    setPageState('form');
    setProfile(null);
  }

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />

      {/* ── FORM STATE ── */}
      {pageState === 'form' && (
        <>
          {/* Hero */}
          <section className="container-editorial pt-8 pb-12 md:pt-12 md:pb-16">
            <div className="max-w-2xl">
              <p className="text-sm text-[#655E78] tracking-wide uppercase mb-4">
                Free Tool
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#2D2640] leading-[1.1] tracking-tight">
                Your Chinese Zodiac
              </h1>
              <p className="mt-5 text-[#655E78] leading-relaxed max-w-lg">
                Your birth year picks your animal. Your animal shows your personality, your strengths, and the element behind how you move through the world.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          {/* Form */}
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="birthdate" className="block text-sm text-[#655E78] mb-2">
                    Your birth date
                  </label>
                  <input
                    id="birthdate"
                    type="date"
                    required
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors text-[#2D2640]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#2D2640] text-[#F0EBF8] rounded-lg hover:bg-[#1E1835] transition-colors font-medium"
                >
                  Reveal my zodiac animal
                </button>
              </form>

              {/* Decorative animal row */}
              <div className="mt-12 flex gap-3 flex-wrap opacity-30">
                {Object.values(ANIMAL_EMOJIS).map((emoji, i) => (
                  <span key={i} className="text-2xl">{emoji}</span>
                ))}
              </div>
            </div>
          </section>

          {/* What you'll learn */}
          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-8">
                What you&rsquo;ll discover
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Your animal & element', desc: 'The animal archetype and elemental energy that define your year of birth.' },
                  { label: 'Core personality', desc: 'Natural strengths and growth areas rooted in centuries of Chinese wisdom.' },
                  { label: 'Career & love insights', desc: 'How your zodiac energy shapes work, relationships, and daily life.' },
                  { label: 'Compatibility', desc: 'Which animals harmonise with yours and where friction may arise.' },
                ].map((item) => (
                  <div key={item.label} className="border border-[#2D2640]/10 rounded-lg p-6">
                    <p className="font-serif text-[#2D2640] mb-2">{item.label}</p>
                    <p className="text-sm text-[#655E78] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          {/* The Twelve Animals (static, always visible) */}
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-2xl mb-10">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-4">The Twelve Animals</h2>
              <p className="text-[#655E78] leading-relaxed">
                The Chinese zodiac runs on a 12-year cycle, with each year ruled by one of twelve animals. Here&rsquo;s the personality archetype behind each one.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8">
              {Object.values(zodiacContent).map((animal) => (
                <div key={animal.animal} className="border-b border-[#2D2640]/10 pb-6 md:pb-8">
                  <p className="font-serif text-lg text-[#2D2640] mb-2">
                    <span className="mr-2">{animal.emoji}</span>
                    {animal.title}
                  </p>
                  {animal.overview.split('\n\n').map((para, i) => (
                    <p key={i} className="text-sm text-[#655E78] leading-relaxed mb-2 last:mb-0">
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="container-editorial">
            <div className="h-px bg-[#2D2640]/10" />
          </div>

          {/* FAQ (static, always visible) */}
          <section className="container-editorial py-12 md:py-16">
            <div className="max-w-2xl">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-8">Common Questions</h2>
              <div className="space-y-8">
                {zodiacFaqs.map((item, i) => (
                  <div key={i}>
                    <h3 className="font-serif text-lg text-[#2D2640] mb-2">{item.q}</h3>
                    <p className="text-[#655E78] leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── LOADING STATE ── */}
      {pageState === 'loading' && (
        <section className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-7xl mb-6 transition-all duration-200">
              {LOADING_EMOJIS[loadingEmoji]}
            </div>
            <p className="font-serif text-2xl text-[#2D2640] mb-2">
              Reading the stars&hellip;
            </p>
            <p className="text-sm text-[#655E78]">
              Consulting the ancient calendar
            </p>
          </div>
        </section>
      )}

      {/* ── RESULTS STATE ── */}
      {pageState === 'results' && profile && (() => {
        const content = zodiacContent[profile.animal];
        const animalEmoji = ANIMAL_EMOJIS[profile.animal] || '🐉';
        const elementColor = ELEMENT_COLORS[profile.element] || 'text-[#2D2640]';
        const elementBg = ELEMENT_BG[profile.element] || 'bg-[#2D2640]/10';

        return (
          <>
            {/* Back button */}
            <div className="container-editorial pt-8 pb-4">
              <button
                onClick={handleReset}
                className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors flex items-center gap-2"
              >
                <span>&#8592;</span>
                <span>Try a different date</span>
              </button>
            </div>

            {/* Hero section */}
            <section className="container-editorial pb-12 md:pb-16">
              <div className="max-w-2xl mx-auto text-center">
                {/* Animal emoji */}
                <div className="text-7xl md:text-8xl mb-6 leading-none">
                  {animalEmoji}
                </div>

                {/* Animal name + meta */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                  <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] leading-tight">
                    The {profile.animal}
                  </h1>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${elementBg} ${elementColor}`}>
                    <span>{profile.elementEmoji}</span>
                    <span>{profile.element}</span>
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm text-[#655E78] bg-[#2D2640]/5">
                    {profile.yinYang}
                  </span>
                </div>

                {/* Personality tagline */}
                <p className="font-serif text-xl text-[#655E78] italic mb-3">
                  &ldquo;{profile.personality}&rdquo;
                </p>

                <p className="text-sm text-[#655E78]">
                  Born in {profile.year} &middot; {profile.element} {profile.animal}
                </p>
              </div>
            </section>

            {/* Divider */}
            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Main content grid */}
            <section className="container-editorial py-12 md:py-16">
              <div className="grid md:grid-cols-2 gap-6">

                {/* Overview card */}
                <div className="rounded-lg p-6 md:p-8 md:col-span-2 bg-[#E8DED4]">
                  <h2 className="font-serif text-xl text-[#2D2640] mb-4">
                    Overview
                  </h2>
                  <div className="space-y-3">
                    {content.overview.split('\n\n').map((para, i) => (
                      <p key={i} className="text-[#655E78] leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Strengths card */}
                <div className="rounded-lg p-6 md:p-8 bg-[#D4E8CB]">
                  <h2 className="font-serif text-xl text-[#2D2640] mb-4">
                    Strengths
                  </h2>
                  <ul className="space-y-3">
                    {content.strengths.map((point, i) => (
                      <li key={i} className="flex gap-3 text-[#655E78] leading-relaxed">
                        <span className="shrink-0 text-[#4A6B44]">&#10024;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Growth Areas card */}
                <div className="rounded-lg p-6 md:p-8 bg-[#F9DFC9]">
                  <h2 className="font-serif text-xl text-[#2D2640] mb-4">
                    Growth Areas
                  </h2>
                  <ul className="space-y-3">
                    {content.weaknesses.map((point, i) => (
                      <li key={i} className="flex gap-3 text-[#655E78] leading-relaxed">
                        <span className="shrink-0 text-[#A07840]">&#127793;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Career card */}
                <div className="rounded-lg p-6 md:p-8 bg-[#C9DAF0]">
                  <h2 className="font-serif text-xl text-[#2D2640] mb-4">
                    Career &amp; Purpose
                  </h2>
                  <ul className="space-y-3">
                    {content.career.map((point, i) => (
                      <li key={i} className="flex gap-3 text-[#655E78] leading-relaxed">
                        <span className="shrink-0 text-[#4A7FA5]">&#9678;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Love card */}
                <div className="rounded-lg p-6 md:p-8 bg-[#F2D1DC]">
                  <h2 className="font-serif text-xl text-[#2D2640] mb-4">
                    Love &amp; Relationships
                  </h2>
                  <ul className="space-y-3">
                    {content.love.map((point, i) => (
                      <li key={i} className="flex gap-3 text-[#655E78] leading-relaxed">
                        <span className="shrink-0 text-[#C4542A]">&#9825;</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compatibility card */}
                <div className="rounded-lg p-6 md:p-8 md:col-span-2 bg-[#D8CEF0]">
                  <h2 className="font-serif text-xl text-[#2D2640] mb-6">
                    Compatibility
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {/* Compatible */}
                    <div>
                      <p className="text-sm text-[#655E78] uppercase tracking-wide mb-4">
                        Harmonious matches
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {profile.compatible.map((animal) => (
                          <div
                            key={animal}
                            className="flex items-center gap-2 px-3 py-2 bg-[#4A6B44]/10 rounded-lg"
                          >
                            <span className="text-lg">{ANIMAL_EMOJIS[animal]}</span>
                            <span className="text-sm text-[#4A6B44] font-medium">{animal}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Challenging */}
                    <div>
                      <p className="text-sm text-[#655E78] uppercase tracking-wide mb-4">
                        Growth through friction
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {profile.challenging.map((animal) => (
                          <div
                            key={animal}
                            className="flex items-center gap-2 px-3 py-2 bg-[#C4542A]/10 rounded-lg"
                          >
                            <span className="text-lg">{ANIMAL_EMOJIS[animal]}</span>
                            <span className="text-sm text-[#C4542A] font-medium">{animal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lucky numbers & colours card */}
                <div className="rounded-lg p-6 md:p-8 md:col-span-2 bg-[#FBF0C4]">
                  <h2 className="font-serif text-xl text-[#2D2640] mb-6">
                    Lucky Numbers &amp; Colours
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-8">
                    {/* Numbers */}
                    <div>
                      <p className="text-sm text-[#655E78] uppercase tracking-wide mb-4">
                        Lucky numbers
                      </p>
                      <div className="flex gap-3">
                        {profile.luckyNumbers.map((num) => (
                          <div
                            key={num}
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg font-medium ${elementBg} ${elementColor}`}
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Colours */}
                    <div>
                      <p className="text-sm text-[#655E78] uppercase tracking-wide mb-4">
                        Lucky colours
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {profile.luckyColors.map((color) => (
                          <span
                            key={color}
                            className="px-3 py-1.5 bg-[#2D2640]/5 rounded-full text-sm text-[#2D2640]"
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Divider */}
            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Upsell CTA */}
            <section className="container-editorial py-12 md:py-16">
              <div className="max-w-3xl mx-auto">
                <div className="bg-[#F0E6D6] rounded-2xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#C4365A]">Go deeper</span>
                    <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] mt-4 mb-4">
                      Want the full picture?
                    </h2>
                    <p className="text-lg text-[#655E78] leading-relaxed max-w-lg mx-auto">
                      Your Chinese Zodiac is one layer. Your BaZi goes deeper into the elements, and your natal chart adds the psychological picture. The Complete Architecture connects them all.
                    </p>
                  </div>

                  <ul className="max-w-sm mx-auto mb-6 space-y-3">
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      Full natal chart with all planetary placements
                    </li>
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      BaZi Four Pillars and Human Design combined
                    </li>
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      Personalised relocation insights
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
                      See every layer of your chart &mdash; $139
                    </Link>
                    <p className="text-xs text-[#655E78] mt-4">Personalised report delivered within 48 hours</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Save Results */}
            <section className="container-editorial py-12 md:py-16">
              <div className="max-w-xl mx-auto">
                <div className="bg-[#F5F3F0] rounded-2xl p-8 md:p-10 text-center">
                  <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Save your results</h2>
                  <p className="text-[#655E78] mb-8">Get your Chinese Zodiac profile sent to your inbox.</p>
                  <SendResultsEmail type="chinese-zodiac" data={profile} />
                </div>
              </div>
            </section>

            {/* Also Explore */}
            <section className="container-editorial pb-12">
              <p className="text-center text-sm text-[#655E78]">
                Also explore:{' '}
                <a href="/bazi" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">BaZi</a>
                {' · '}
                <a href="/numerology" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Numerology</a>
                {' · '}
                <a href="/your-chart" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Birth Chart</a>
              </p>
            </section>
          </>
        );
      })()}

      <Footer />
    </div>
  );
}
