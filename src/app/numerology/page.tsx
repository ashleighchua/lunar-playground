'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SendResultsEmail } from '@/components/ui/SendResultsEmail';
import { getNumerologyProfile } from '@/lib/numerology';
import type { NumerologyProfile } from '@/lib/numerology';
import { numberMeanings, numerologyFaqs } from '@/lib/data/numerology-content';
import { loadBirthData, saveBirthData } from '@/lib/birthData';

type PageState = 'form' | 'loading' | 'results';

// Digits in the 3x3 Lo Shu grid layout
const GRID_LAYOUT = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// Colour palette for cards — muted accent colours matching the site's warm, esoteric vibe
const CARD_THEMES = {
  birthday:      { accent: '#D4A0A0', bg: '#F2D5D5', icon: '\u{1F382}' },  // dusty rose
  talent:        { accent: '#A89BC4', bg: '#E0D8EE', icon: '\u{2728}' },  // muted lavender
  energy:        { accent: '#C4A876', bg: '#F0E6CE', icon: '\u{26A1}' },  // warm gold
  missing:       { accent: '#8AAFB8', bg: '#D4E6EA', icon: '\u{1F50D}' },  // sage teal
  innate:        { accent: '#9CB896', bg: '#DAE8D7', icon: '\u{1F331}' },  // dusty sage
  strengths:     { accent: '#9CB896', bg: '#D4E8CB', icon: '\u{1F4AA}' },  // dusty sage
  challenges:    { accent: '#C4956A', bg: '#F9DFC9', icon: '\u{1F525}' },  // warm terracotta
  career:        { accent: '#8A9BB8', bg: '#C9DAF0', icon: '\u{1F680}' },  // muted steel blue
  relationships: { accent: '#C4A0B8', bg: '#EAD8E4', icon: '\u{1F49C}' },  // dusty mauve
} as const;

// Grid cell colours — muted tones matching the site palette
const GRID_COLORS = [
  '#D4A0A0', // 1 - dusty rose
  '#C4A876', // 2 - warm gold
  '#9CB896', // 3 - dusty sage
  '#8A9BB8', // 4 - steel blue
  '#A89BC4', // 5 - lavender
  '#C4A0B8', // 6 - dusty mauve
  '#8AAFB8', // 7 - sage teal
  '#C4956A', // 8 - terracotta
  '#7A746C', // 9 - warm taupe
];

/** Split a prose paragraph into shorter bullet points by splitting on sentence boundaries */
function toBulletPoints(text: string, max = 4): string[] {
  const sentences = text
    .split(/(?<=\.)\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  // Group short sentences together, keep to `max` bullets
  const points: string[] = [];
  let current = '';
  for (const s of sentences) {
    if (!current) {
      current = s;
    } else if (current.length + s.length < 120 && points.length < max - 1) {
      current += ' ' + s;
    } else {
      points.push(current);
      current = s;
    }
    if (points.length >= max) break;
  }
  if (current && points.length < max) points.push(current);
  return points.slice(0, max);
}

function EnergyGrid({ energyGrid }: { energyGrid: Record<number, number> }) {
  const maxCount = Math.max(...Object.values(energyGrid));

  return (
    <svg
      viewBox="0 0 210 210"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[220px] mx-auto"
      aria-label="Energy Grid"
    >
      {GRID_LAYOUT.map((row, rowIdx) =>
        row.map((digit, colIdx) => {
          const count = energyGrid[digit] ?? 0;
          const cx = colIdx * 70 + 35;
          const cy = rowIdx * 70 + 35;
          const isPresent = count > 0;
          const color = GRID_COLORS[digit - 1];

          // Scale radius: base 18, up to 28 for max occurrences
          const radius = isPresent
            ? 18 + Math.min((count - 1) / Math.max(maxCount - 1, 1), 1) * 10
            : 18;

          // Opacity scales with count
          const fillOpacity = isPresent
            ? 0.55 + Math.min((count - 1) / Math.max(maxCount - 1, 1), 1) * 0.35
            : 0;

          return (
            <g key={digit}>
              <rect
                x={colIdx * 70 + 2}
                y={rowIdx * 70 + 2}
                width={66}
                height={66}
                rx={10}
                fill={isPresent ? color : 'transparent'}
                fillOpacity={isPresent ? 0.08 : 0}
                stroke="#2D2640"
                strokeOpacity={0.08}
                strokeWidth={1}
              />
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill={isPresent ? color : 'transparent'}
                fillOpacity={fillOpacity}
                stroke={isPresent ? color : '#2D2640'}
                strokeOpacity={isPresent ? 0.6 : 0.15}
                strokeWidth={isPresent ? 0 : 1.5}
              />
              <text
                x={cx}
                y={cy + 5}
                textAnchor="middle"
                fontSize={isPresent ? 16 : 14}
                fontWeight={isPresent ? '600' : '400'}
                fill={isPresent ? '#2D2640' : '#2D2640'}
                fillOpacity={isPresent ? 0.8 : 0.25}
                fontFamily="serif"
              >
                {digit}
              </text>
              {count > 1 &&
                Array.from({ length: Math.min(count - 1, 3) }).map((_, i) => (
                  <circle
                    key={i}
                    cx={cx - ((Math.min(count - 1, 3) - 1) * 5) / 2 + i * 5}
                    cy={cy + radius - 6}
                    r={2}
                    fill={color}
                    fillOpacity={0.7}
                  />
                ))}
            </g>
          );
        })
      )}
    </svg>
  );
}

function LoadingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % digits.length);
    }, 333);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col items-center justify-center px-4">
      <div className="flex gap-3 mb-8">
        {digits.map((d, i) => (
          <span
            key={d}
            className="font-serif text-2xl transition-all duration-300"
            style={{
              color: i === activeIndex ? GRID_COLORS[i] : '#2D2640',
              opacity: i === activeIndex ? 1 : 0.2,
              transform: i === activeIndex ? 'scale(1.4)' : 'scale(1)',
              display: 'inline-block',
            }}
          >
            {d}
          </span>
        ))}
      </div>
      <p className="font-serif text-xl text-[#2D2640] mb-2">Calculating your numbers...</p>
      <p className="text-sm text-[#655E78]">Mapping the vibrations of your birth date</p>
    </div>
  );
}

function NumberBadge({
  number,
  size = 'md',
  color,
}: {
  number: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}) {
  const sizeClasses = {
    sm: 'w-10 h-10 text-base',
    md: 'w-14 h-14 text-xl',
    lg: 'w-24 h-24 text-4xl',
  };

  const borderColor = color || '#FF8FA3';
  const bgColor = color || '#FF8FA3';

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-serif flex-shrink-0`}
      style={{
        border: `2px solid ${borderColor}60`,
        backgroundColor: `${bgColor}14`,
        color: '#2D2640',
      }}
    >
      {number}
    </div>
  );
}

function ColorCard({
  label,
  theme,
  children,
}: {
  label: string;
  theme: keyof typeof CARD_THEMES;
  children: React.ReactNode;
}) {
  const t = CARD_THEMES[theme];
  return (
    <div
      className="rounded-lg p-6 md:p-8"
      style={{ backgroundColor: t.bg }}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{t.icon}</span>
        <p className="text-xs uppercase tracking-widest font-medium text-[#2D2640]">{label}</p>
      </div>
      {children}
    </div>
  );
}

/** Render a prose block as bullet points with a dot icon */
function BulletList({ text, color }: { text: string; color: string }) {
  const points = toBulletPoints(text);
  return (
    <ul className="space-y-2.5">
      {points.map((pt, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm text-[#2D2640]/75 leading-relaxed">
          <span
            className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: color }}
          />
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  );
}

function ResultsView({
  profile,
  birthDate,
  onBack,
}: {
  profile: NumerologyProfile;
  birthDate: string;
  onBack: () => void;
}) {
  const lifeMeaning = numberMeanings[profile.lifePathNumber];
  const birthdayMeaning = numberMeanings[profile.birthdayNumber];
  const talentMeaning = numberMeanings[profile.talentNumber];

  // Keyword tag colours cycling
  const tagColors = ['bg-[#F0EBE8]', 'bg-[#EDE9F0]', 'bg-[#E8EDE6]', 'bg-[#F0ECD6]'];

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />

      <main className="container-editorial py-12 md:py-16">
        {/* Back button */}
        <button
          onClick={onBack}
          className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-10 flex items-center gap-2"
        >
          <span>←</span>
          <span>Try a different date</span>
        </button>

        {/* Hero section */}
        <div className="mb-14">
          <p className="text-xs uppercase tracking-widest text-[#655E78] mb-6">Your Numerology Profile</p>
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
            <NumberBadge number={profile.lifePathNumber} size="lg" color="#A89BC4" />
            <div className="flex-1">
              <p className="text-sm text-[#655E78] mb-1">Life Path Number</p>
              <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] mb-4">
                {lifeMeaning?.title ?? `Number ${profile.lifePathNumber}`}
              </h1>
              {lifeMeaning?.keywords && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {lifeMeaning.keywords.map((kw, i) => (
                    <span
                      key={kw}
                      className={`text-xs uppercase tracking-widest text-[#2D2640]/70 ${tagColors[i % tagColors.length]} rounded-full px-3 py-1`}
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}
              {lifeMeaning?.description && (
                <BulletList text={lifeMeaning.description.replace(/\n\n/g, ' ')} color="#A89BC4" />
              )}
            </div>
          </div>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Birthday Number */}
          <ColorCard label="Birthday Number" theme="birthday">
            <div className="flex items-center gap-5 mb-4">
              <NumberBadge number={profile.birthdayNumber} size="md" color={CARD_THEMES.birthday.accent} />
              <div>
                <p className="font-serif text-lg text-[#2D2640]">
                  {birthdayMeaning?.title ?? `Number ${profile.birthdayNumber}`}
                </p>
                {birthdayMeaning?.keywords && (
                  <p className="text-sm text-[#2D2640]/50">
                    {birthdayMeaning.keywords.slice(0, 2).join(' \u00B7 ')}
                  </p>
                )}
              </div>
            </div>
            {birthdayMeaning?.description && (
              <BulletList text={birthdayMeaning.description.replace(/\n\n/g, ' ')} color={CARD_THEMES.birthday.accent} />
            )}
          </ColorCard>

          {/* Talent Number */}
          <ColorCard label="Talent Number" theme="talent">
            <div className="flex items-center gap-5 mb-4">
              <NumberBadge number={profile.talentNumber} size="md" color={CARD_THEMES.talent.accent} />
              <div>
                <p className="font-serif text-lg text-[#2D2640]">
                  {talentMeaning?.title ?? `Number ${profile.talentNumber}`}
                </p>
                {talentMeaning?.keywords && (
                  <p className="text-sm text-[#2D2640]/50">
                    {talentMeaning.keywords.slice(0, 2).join(' \u00B7 ')}
                  </p>
                )}
              </div>
            </div>
            {talentMeaning?.description && (
              <BulletList text={talentMeaning.description.replace(/\n\n/g, ' ')} color={CARD_THEMES.talent.accent} />
            )}
            <p className="text-xs text-[#2D2640]/40 mt-4 italic">
              Calculated from your birth month + day, not raw digits
            </p>
          </ColorCard>

          {/* Energy Grid */}
          <ColorCard label="Energy Grid" theme="energy">
            <ul className="space-y-2 mb-5">
              <li className="flex items-start gap-2 text-sm text-[#2D2640]/70">
                <span className="mt-0.5">{'\u{1F534}'}</span>
                <span>Larger, coloured circles = more occurrences</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-[#2D2640]/70">
                <span className="mt-0.5">{'\u{26AA}'}</span>
                <span>Faint outlines = missing from your date</span>
              </li>
            </ul>
            <EnergyGrid energyGrid={profile.energyGrid} />
          </ColorCard>

          {/* Missing & Innate Numbers */}
          <div className="flex flex-col gap-6">
            {/* Missing Numbers */}
            <ColorCard label="Missing Numbers" theme="missing">
              {profile.missingNumbers.length === 0 ? (
                <p className="text-sm text-[#2D2640]/70 leading-relaxed">
                  Your birth date contains all nine digits. A rare completeness suggesting broad versatility.
                </p>
              ) : (
                <>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {profile.missingNumbers.map((n) => (
                      <div
                        key={n}
                        className="w-10 h-10 rounded-full border border-dashed border-[#2D2640]/20 flex items-center justify-center font-serif text-[#655E78] text-base"
                      >
                        {n}
                      </div>
                    ))}
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-[#2D2640]/70">
                      <span className="mt-0.5">{'\u{1F4A1}'}</span>
                      <span>Energies to consciously cultivate this lifetime</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#2D2640]/70">
                      <span className="mt-0.5">{'\u{1F33F}'}</span>
                      <span>Often become areas of profound growth</span>
                    </li>
                  </ul>
                </>
              )}
            </ColorCard>

            {/* Innate Numbers */}
            <ColorCard label="Innate Numbers" theme="innate">
              <div className="flex flex-wrap gap-3 mb-4">
                {profile.innateNumbers.map((n) => (
                  <div
                    key={n}
                    className="w-10 h-10 rounded-full bg-[#F5F3F0] border border-[#2D2640]/10 flex items-center justify-center font-serif text-[#2D2640] text-base"
                  >
                    {n}
                  </div>
                ))}
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-[#2D2640]/70">
                  <span className="mt-0.5">{'\u{2B50}'}</span>
                  <span>Unique digits encoded in your birth date</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-[#2D2640]/70">
                  <span className="mt-0.5">{'\u{1F48E}'}</span>
                  <span>The raw vibrational material of your personality</span>
                </li>
              </ul>
            </ColorCard>
          </div>
        </div>

        {/* Life Path deep dive */}
        {lifeMeaning && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ColorCard label="Strengths" theme="strengths">
              <BulletList text={lifeMeaning.strengths} color={CARD_THEMES.strengths.accent} />
            </ColorCard>
            <ColorCard label="Challenges" theme="challenges">
              <BulletList text={lifeMeaning.challenges} color={CARD_THEMES.challenges.accent} />
            </ColorCard>
            <ColorCard label="Career" theme="career">
              <BulletList text={lifeMeaning.career} color={CARD_THEMES.career.accent} />
            </ColorCard>
            <ColorCard label="Relationships" theme="relationships">
              <BulletList text={lifeMeaning.relationships} color={CARD_THEMES.relationships.accent} />
            </ColorCard>
          </div>
        )}

        {/* Upsell CTA */}
        <div className="bg-[#F0E6D6] rounded-2xl p-8 md:p-12 mb-8">
          <div className="text-center mb-8">
            <span className="text-xs tracking-[0.15em] uppercase text-[#C4365A]">Go deeper</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#2D2640] mt-4 mb-4">
              Want the full picture?
            </h2>
            <p className="text-lg text-[#655E78] leading-relaxed max-w-lg mx-auto">
              Your numbers are one layer. When the same pattern shows up in your numerology, your natal chart, and your BaZi, that&apos;s when you know it&apos;s real. The Complete Architecture connects them all.
            </p>
          </div>

          <ul className="max-w-sm mx-auto mb-6 space-y-3">
            <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
              <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
              Full natal chart with all planetary placements
            </li>
            <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
              <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
              BaZi, Human Design &amp; numerology combined
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
            <p className="text-xs text-[#655E78]/60 mt-4">Personalised report delivered within 48 hours</p>
          </div>
        </div>

        {/* Save Results */}
        <div className="bg-[#F5F3F0] rounded-2xl p-8 md:p-10 text-center">
          <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Save your results</h2>
          <p className="text-[#655E78] mb-8">Get your numerology profile sent to your inbox.</p>
          <SendResultsEmail type="numerology" data={profile} />
        </div>

        {/* Also Explore */}
        <div className="py-12 text-center">
          <p className="text-sm text-[#655E78]">
            Also explore:{' '}
            <a href="/your-chart" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Birth Chart</a>
            {' · '}
            <a href="/bazi" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">BaZi</a>
            {' · '}
            <a href="/chinese-zodiac" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Chinese Zodiac</a>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function FormView({ onSubmit }: { onSubmit: (date: string) => void }) {
  const [birthDate, setBirthDate] = useState('');

  useEffect(() => {
    const saved = loadBirthData();
    if (saved?.birthdate) {
      setBirthDate(saved.birthdate);
      // Auto-calculate — skip form
      onSubmit(saved.birthdate);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    saveBirthData({
      birthdate: birthDate,
      birthtime: '',
      birthplace: null,
    });
    onSubmit(birthDate);
  };

  const previewItems = [
    { label: 'Life Path', desc: 'Your core purpose', icon: '\u{1F52E}' },
    { label: 'Birthday Number', desc: 'Your natural gifts', icon: '\u{1F382}' },
    { label: 'Talent Number', desc: 'Innate abilities', icon: '\u{2728}' },
    { label: 'Energy Grid', desc: 'Vibrational map', icon: '\u{26A1}' },
  ];

  return (
    <div className="min-h-screen bg-[#F0EBF8]">
      <Navigation />

      <main className="container-editorial py-16 md:py-24">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4">Free Tool</p>
            <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] mb-4">
              Numerology Profile
            </h1>
            <p className="text-[#655E78] leading-relaxed text-base max-w-md mx-auto">
              Your birthday is doing more than you think. Numerology breaks it down into your Life Path, Birthday Number, Energy Grid, and the patterns hiding in plain sight.
            </p>
          </div>

          {/* Form */}
          <div className="border border-[#2D2640]/10 rounded-2xl p-6 md:p-8 bg-white/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-[#655E78] mb-2" htmlFor="birthDate">
                  Date of birth
                </label>
                <input
                  id="birthDate"
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-transparent focus:outline-none focus:border-[#2D2640]/30 transition-colors text-[#2D2640]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#2D2640] text-[#F0EBF8] rounded-lg hover:bg-[#1E1835] transition-colors px-6 py-3 font-medium"
              >
                Calculate My Numbers
              </button>
            </form>
          </div>

          {/* What you will get */}
          <div className="mt-10 grid grid-cols-2 gap-4 text-center">
            {previewItems.map((item) => (
              <div key={item.label} className="bg-white border border-[#2D2640]/5 rounded-2xl p-4 shadow-sm">
                <span className="text-xl block mb-2">{item.icon}</span>
                <p className="font-serif text-sm text-[#2D2640] mb-1">{item.label}</p>
                <p className="text-xs text-[#655E78]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="container-editorial">
        <div className="h-px bg-[#2D2640]/10" />
      </div>

      {/* What is Numerology? (static, always visible) */}
      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-2xl mx-auto mb-10">
          <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-4">What is Numerology?</h2>
          <p className="text-[#655E78] leading-relaxed">
            Numerology is the study of the numbers hidden inside your name and birth date. Every number carries its own vibration, and the way those numbers combine in your birth date reveals your Life Path (your core purpose), your Birthday Number (a natural talent), and the patterns and gaps that shape how you move through the world.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <h3 className="font-serif text-xl text-[#2D2640] mb-6">The Life Path Numbers</h3>
          <div className="space-y-8">
            {Object.values(numberMeanings).map((n) => (
              <div key={n.number} className="border-b border-[#2D2640]/10 pb-8">
                <p className="font-serif text-lg text-[#2D2640] mb-2">
                  {n.number} &mdash; {n.title}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {n.keywords.map((kw) => (
                    <span key={kw} className="text-xs uppercase tracking-widest text-[#655E78] bg-[#EDE9F0] rounded-full px-3 py-1">
                      {kw}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-[#655E78] leading-relaxed whitespace-pre-line">{n.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-editorial">
        <div className="h-px bg-[#2D2640]/10" />
      </div>

      {/* FAQ (static, always visible) */}
      <section className="container-editorial py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-[#2D2640] mb-8">Common Questions</h2>
          <div className="space-y-8">
            {numerologyFaqs.map((item, i) => (
              <div key={i}>
                <h3 className="font-serif text-lg text-[#2D2640] mb-2">{item.q}</h3>
                <p className="text-[#655E78] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function NumerologyPage() {
  const [pageState, setPageState] = useState<PageState>('form');
  const [profile, setProfile] = useState<NumerologyProfile | null>(null);
  const [birthDate, setBirthDate] = useState('');

  const handleFormSubmit = (date: string) => {
    setBirthDate(date);
    setPageState('loading');

    // 3-second loading then compute
    setTimeout(() => {
      const computed = getNumerologyProfile(date);
      setProfile(computed);
      setPageState('results');
    }, 3000);
  };

  const handleBack = () => {
    setProfile(null);
    setPageState('form');
  };

  return (
    <>
      {pageState === 'form' && <FormView onSubmit={handleFormSubmit} />}
      {pageState === 'loading' && <LoadingScreen />}
      {pageState === 'results' && profile && (
        <ResultsView profile={profile} birthDate={birthDate} onBack={handleBack} />
      )}
    </>
  );
}
