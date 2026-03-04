'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { SendResultsEmail } from '@/components/ui/SendResultsEmail';
import { calculateHumanDesign } from '@/lib/humanDesign';
import type { HumanDesignProfile } from '@/lib/humanDesign';
import { typeContent, centerContent } from '@/lib/data/human-design-content';
import { loadBirthData, saveBirthData } from '@/lib/birthData';
import { CitySelect } from '@/components/ui/CitySelect';
import type { City } from '@/lib/cities';
import { isValidDate } from '@/lib/utils';

const loadingSymbols = ['⚛️', '🔮', '✨', '🌀', '💫'];

// Section icons
const SECTION_ICONS: Record<string, string> = {
  profile: '◈',
  centers: '⬡',
  authority: '◎',
  channels: '⟡',
  cross: '✦',
  strengths: '↗',
  challenges: '↙',
  career: '▣',
  relationships: '♡',
};

/** Split a prose paragraph into bullet points (by sentence) */
function PointList({ text, icon = '·' }: { text: string; icon?: string }) {
  // Split on sentence boundaries: period/exclamation/question followed by space and capital letter
  const points = text
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (points.length <= 1) {
    return <p className="text-sm text-[#655E78] leading-relaxed">{text}</p>;
  }

  return (
    <ul className="space-y-2.5">
      {points.map((point, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-[#655E78] leading-relaxed">
          <span className="text-[#B8903A] mt-0.5 flex-shrink-0 text-xs">{icon}</span>
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

// Center layout positions for SVG body graph
// viewBox: 0 0 300 480
const CENTER_SHAPES: Record<string, { shape: 'triangle-up' | 'triangle-down' | 'square' | 'diamond' | 'triangle-right-up' | 'triangle-right-down' | 'triangle-left-down'; x: number; y: number; size: number; label: string }> = {
  Head: { shape: 'triangle-up', x: 150, y: 28, size: 38, label: 'Head' },
  Ajna: { shape: 'triangle-down', x: 150, y: 96, size: 34, label: 'Ajna' },
  Throat: { shape: 'square', x: 129, y: 150, size: 42, label: 'Throat' },
  G: { shape: 'diamond', x: 150, y: 228, size: 38, label: 'G' },
  Heart: { shape: 'triangle-right-up', x: 210, y: 210, size: 30, label: 'Heart' },
  Sacral: { shape: 'square', x: 129, y: 284, size: 42, label: 'Sacral' },
  'Solar Plexus': { shape: 'triangle-right-down', x: 210, y: 295, size: 32, label: 'SP' },
  Spleen: { shape: 'triangle-left-down', x: 88, y: 295, size: 32, label: 'Spleen' },
  Root: { shape: 'square', x: 129, y: 360, size: 42, label: 'Root' },
};

// Channel connections between centers (line endpoints approximate center positions)
const CENTER_POSITIONS: Record<string, { cx: number; cy: number }> = {
  Head: { cx: 150, cy: 28 },
  Ajna: { cx: 150, cy: 96 },
  Throat: { cx: 150, cy: 171 },
  G: { cx: 150, cy: 228 },
  Heart: { cx: 220, cy: 218 },
  Sacral: { cx: 150, cy: 305 },
  'Solar Plexus': { cx: 220, cy: 310 },
  Spleen: { cx: 80, cy: 310 },
  Root: { cx: 150, cy: 381 },
};

// Channel definitions matching lib/humanDesign.ts
const CHANNEL_CENTER_MAP: Record<string, [string, string]> = {
  '20-34': ['Throat', 'Sacral'],
  '34-57': ['Sacral', 'Spleen'],
  '20-57': ['Throat', 'Spleen'],
  '1-8': ['G', 'Throat'],
  '13-33': ['G', 'Throat'],
  '7-31': ['G', 'Throat'],
  '10-20': ['G', 'Throat'],
  '25-51': ['G', 'Heart'],
  '21-45': ['Heart', 'Throat'],
  '26-44': ['Heart', 'Spleen'],
  '50-27': ['Spleen', 'Sacral'],
  '59-6': ['Sacral', 'Solar Plexus'],
  '42-53': ['Sacral', 'Root'],
  '3-60': ['Sacral', 'Root'],
  '9-52': ['Sacral', 'Root'],
  '54-32': ['Root', 'Spleen'],
  '19-49': ['Root', 'Solar Plexus'],
  '39-55': ['Root', 'Solar Plexus'],
  '36-35': ['Solar Plexus', 'Throat'],
  '64-47': ['Head', 'Ajna'],
  '61-24': ['Head', 'Ajna'],
  '63-4': ['Head', 'Ajna'],
  '17-62': ['Ajna', 'Throat'],
  '43-23': ['Ajna', 'Throat'],
  '11-56': ['Ajna', 'Throat'],
  '48-16': ['Spleen', 'Throat'],
  '28-38': ['Spleen', 'Root'],
  '18-58': ['Spleen', 'Root'],
  '2-14': ['G', 'Sacral'],
  '5-15': ['G', 'Sacral'],
  '10-34': ['G', 'Sacral'],
  '10-57': ['G', 'Spleen'],
  '12-22': ['Throat', 'Solar Plexus'],
  '29-46': ['Sacral', 'G'],
  '30-41': ['Solar Plexus', 'Root'],
  '37-40': ['Solar Plexus', 'Heart'],
};

function CenterShape({
  name,
  defined,
  x,
  y,
  size,
  shape,
}: {
  name: string;
  defined: boolean;
  x: number;
  y: number;
  size: number;
  shape: string;
}) {
  const fill = defined ? '#FF8FA3' : 'none';
  const stroke = defined ? '#B8903A' : '#2D2640';
  const strokeOpacity = defined ? 1 : 0.3;
  const strokeWidth = defined ? 1.5 : 1;

  const sharedProps = {
    fill,
    stroke,
    strokeOpacity,
    strokeWidth,
  };

  if (shape === 'square') {
    return (
      <rect
        x={x}
        y={y}
        width={size}
        height={size}
        rx={2}
        {...sharedProps}
      />
    );
  }

  if (shape === 'diamond') {
    const cx = x;
    const cy = y;
    const half = size * 0.7;
    return (
      <polygon
        points={`${cx},${cy - half} ${cx + half},${cy} ${cx},${cy + half} ${cx - half},${cy}`}
        {...sharedProps}
      />
    );
  }

  if (shape === 'triangle-up') {
    const cx = x;
    const cy = y;
    const h = size;
    const w = size * 1.2;
    return (
      <polygon
        points={`${cx},${cy - h * 0.6} ${cx - w / 2},${cy + h * 0.4} ${cx + w / 2},${cy + h * 0.4}`}
        {...sharedProps}
      />
    );
  }

  if (shape === 'triangle-down') {
    const cx = x;
    const cy = y;
    const h = size;
    const w = size * 1.2;
    return (
      <polygon
        points={`${cx},${cy + h * 0.6} ${cx - w / 2},${cy - h * 0.4} ${cx + w / 2},${cy - h * 0.4}`}
        {...sharedProps}
      />
    );
  }

  if (shape === 'triangle-right-up') {
    const cx = x;
    const cy = y;
    const h = size * 0.85;
    return (
      <polygon
        points={`${cx - h * 0.5},${cy - h * 0.6} ${cx + h * 0.8},${cy} ${cx - h * 0.5},${cy + h * 0.6}`}
        {...sharedProps}
      />
    );
  }

  if (shape === 'triangle-right-down') {
    const cx = x;
    const cy = y;
    const h = size * 0.85;
    return (
      <polygon
        points={`${cx - h * 0.5},${cy - h * 0.6} ${cx + h * 0.8},${cy} ${cx - h * 0.5},${cy + h * 0.6}`}
        {...sharedProps}
      />
    );
  }

  if (shape === 'triangle-left-down') {
    const cx = x;
    const cy = y;
    const h = size * 0.85;
    return (
      <polygon
        points={`${cx + h * 0.5},${cy - h * 0.6} ${cx - h * 0.8},${cy} ${cx + h * 0.5},${cy + h * 0.6}`}
        {...sharedProps}
      />
    );
  }

  return null;
}

function BodyGraph({ profile }: { profile: HumanDesignProfile }) {
  // Parse active channel strings into gate pair keys
  const activeChannelKeys = profile.channels.map((ch) => {
    const match = ch.match(/^(\d+)-(\d+)/);
    if (!match) return null;
    return `${match[1]}-${match[2]}`;
  }).filter(Boolean) as string[];

  return (
    <svg
      viewBox="0 0 300 430"
      className="w-full max-w-[260px] mx-auto"
      aria-label="Human Design Body Graph"
    >
      {/* Channel lines */}
      {activeChannelKeys.map((key) => {
        const centers = CHANNEL_CENTER_MAP[key];
        if (!centers) return null;
        const [cA, cB] = centers;
        const posA = CENTER_POSITIONS[cA];
        const posB = CENTER_POSITIONS[cB];
        if (!posA || !posB) return null;
        return (
          <line
            key={key}
            x1={posA.cx}
            y1={posA.cy}
            x2={posB.cx}
            y2={posB.cy}
            stroke="#FF8FA3"
            strokeWidth={3}
            strokeOpacity={0.6}
            strokeLinecap="round"
          />
        );
      })}

      {/* Center shapes */}
      {Object.entries(CENTER_SHAPES).map(([name, cfg]) => {
        const defined = profile.definedCenters.includes(name);
        return (
          <g key={name}>
            <CenterShape
              name={name}
              defined={defined}
              x={cfg.x}
              y={cfg.y}
              size={cfg.size}
              shape={cfg.shape}
            />
            {/* Label */}
            <text
              x={CENTER_POSITIONS[name].cx}
              y={CENTER_POSITIONS[name].cy + (cfg.shape === 'triangle-up' ? 2 : cfg.shape === 'triangle-down' ? 2 : cfg.shape === 'diamond' ? 4 : 0)}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="7.5"
              fill={defined ? '#5C3D0A' : '#655E78'}
              fontWeight={defined ? '600' : '400'}
              style={{ fontFamily: 'system-ui, sans-serif' }}
            >
              {cfg.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function HumanDesignPage() {
  const [showResults, setShowResults] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [profile, setProfile] = useState<HumanDesignProfile | null>(null);
  const [formData, setFormData] = useState({ birthdate: '', birthtime: '' });
  const [birthCity, setBirthCity] = useState<City | null>(null);
  const [birthCityDisplay, setBirthCityDisplay] = useState('');
  const [dateError, setDateError] = useState<string | null>(null);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    const stored = loadBirthData();
    if (stored) {
      setFormData({
        birthdate: stored.birthdate || '',
        birthtime: stored.birthtime || '',
      });
      if (stored.birthplace) {
        const displayName = `${stored.birthplace.name}, ${stored.birthplace.country}`;
        setBirthCity({
          label: displayName,
          value: displayName,
          lat: stored.birthplace.lat,
          lng: stored.birthplace.lng,
          country: stored.birthplace.country,
        });
        setBirthCityDisplay(displayName);
      }
      // Auto-calculate if we have valid birth data
      if (stored.birthdate && isValidDate(stored.birthdate)) {
        setShowLoading(true);
        setLoadingIndex(0);
        const interval = setInterval(() => {
          setLoadingIndex(prev => (prev + 1) % loadingSymbols.length);
        }, 400);
        intervalsRef.current = [interval];
        setTimeout(() => {
          clearInterval(interval);
          const lng = stored.birthplace?.lng;
          const result = calculateHumanDesign(stored.birthdate, stored.birthtime || '12:00', lng);
          setProfile(result);
          setShowLoading(false);
          setShowResults(true);
        }, 3000);
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
      birthplace: birthCity
        ? { name: birthCity.label, country: birthCity.country || '', lat: birthCity.lat, lng: birthCity.lng }
        : null,
    });

    setShowLoading(true);
    setLoadingIndex(0);

    const interval = setInterval(() => {
      setLoadingIndex(prev => (prev + 1) % loadingSymbols.length);
    }, 400);
    intervalsRef.current = [interval];

    await new Promise(resolve => setTimeout(resolve, 3000));
    clearInterval(interval);

    const result = calculateHumanDesign(formData.birthdate, formData.birthtime || '12:00', birthCity?.lng);
    setProfile(result);
    setShowLoading(false);
    setShowResults(true);
  };

  const handleBack = () => {
    setShowResults(false);
    setProfile(null);
  };

  const tc = profile ? typeContent[profile.type] : null;

  const pageContent = (
    <div className="min-h-screen bg-[#F0EBF8] flex flex-col">
      <Navigation />

      <main className="flex-1">
        {showLoading ? (
          /* Loading Screen */
          <div className="min-h-[80vh] flex flex-col items-center justify-center">
            <div className="text-center max-w-sm mx-auto px-4">
              <div className="flex items-center justify-center gap-3 mb-10">
                {loadingSymbols.map((sym, i) => (
                  <span
                    key={i}
                    className="text-3xl transition-all duration-300"
                    style={{
                      opacity: i === loadingIndex ? 1 : 0.2,
                      transform: i === loadingIndex ? 'scale(1.4)' : 'scale(1)',
                    }}
                  >
                    {sym}
                  </span>
                ))}
              </div>
              <p className="font-serif text-2xl text-[#2D2640] mb-3">
                Mapping your design...
              </p>
              <p className="text-sm text-[#655E78]">
                Calculating your type, authority, and body graph centers
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
                  Human Design
                </h1>
                <p className="mt-5 text-lg text-[#655E78] leading-relaxed">
                  Your personal operating manual. Human Design shows how you&apos;re wired to make decisions, what drains you, and what lights you up. Based on your exact birth time.
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
                    <label htmlFor="hd-birthdate" className="block text-sm text-[#655E78] mb-2">
                      Date of birth
                    </label>
                    <input
                      type="date"
                      id="hd-birthdate"
                      required
                      value={formData.birthdate}
                      onChange={(e) => {
                        setFormData({ ...formData, birthdate: e.target.value });
                        setDateError(null);
                      }}
                      className={`w-full px-4 py-3 border rounded-lg bg-white focus:outline-none transition-colors ${
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
                    <label htmlFor="hd-birthtime" className="block text-sm text-[#655E78] mb-2">
                      Time of birth
                    </label>
                    <input
                      type="time"
                      id="hd-birthtime"
                      required
                      value={formData.birthtime}
                      onChange={(e) => setFormData({ ...formData, birthtime: e.target.value })}
                      className={`w-full px-4 py-3 border border-[#2D2640]/10 rounded-lg bg-white focus:outline-none focus:border-[#2D2640]/30 transition-colors ${
                        formData.birthtime
                          ? 'text-[#2D2640] [&::-webkit-datetime-edit]:text-[#2D2640]'
                          : 'text-[#655E78]/50 [&::-webkit-datetime-edit]:text-[#655E78]/50'
                      }`}
                    />
                    <p className="mt-2 text-xs text-[#655E78]">
                      Exact birth time affects your type and authority. Noon is a reasonable estimate if unknown.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm text-[#655E78] mb-2">
                      Place of birth
                    </label>
                    <CitySelect
                      value={birthCityDisplay}
                      onChange={(city) => {
                        setBirthCity(city);
                        setBirthCityDisplay(city ? city.label : '');
                      }}
                      placeholder="Type a city name..."
                      className="w-full"
                    />
                    <p className="mt-2 text-xs text-[#655E78]">
                      Birth location improves accuracy, especially for Moon placement.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 rounded-lg bg-[#2D2640] text-[#F0EBF8] text-sm tracking-wide hover:bg-[#1E1835] transition-colors mt-4"
                  >
                    Map my design
                  </button>
                </form>
              </div>
            </section>
          </>
        ) : profile && tc ? (
          /* Results */
          <>
            {/* Back + Hero */}
            <section className="container-editorial pt-8 pb-10 md:pt-12">
              <button
                onClick={handleBack}
                className="text-sm text-[#655E78] hover:text-[#2D2640] transition-colors mb-6 flex items-center gap-2"
              >
                <span>←</span> Enter different details
              </button>

              <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[#655E78] mb-3">Your Human Design</p>
                  <h1 className="font-serif text-4xl md:text-5xl text-[#2D2640] leading-[1.1] tracking-tight">
                    {profile.type}
                  </h1>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg bg-[#C9DAF0]">
                      <p className="text-[10px] uppercase tracking-widest text-[#2D2640] mb-1">Strategy</p>
                      <p className="text-sm font-medium text-[#2D2640]">{profile.strategy}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#F2D1DC]">
                      <p className="text-[10px] uppercase tracking-widest text-[#2D2640] mb-1">Authority</p>
                      <p className="text-sm font-medium text-[#2D2640]">{profile.authority}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#D4E8CB]">
                      <p className="text-[10px] uppercase tracking-widest text-[#2D2640] mb-1">Signature</p>
                      <p className="text-sm font-medium text-[#2D2640]">{tc.signature}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-[#F9DFC9]">
                      <p className="text-[10px] uppercase tracking-widest text-[#2D2640] mb-1">When You&apos;re Off Track</p>
                      <p className="text-sm font-medium text-[#2D2640]">{tc.theme}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <PointList text={tc.overview.split('\n\n')[0]} icon="◆" />
                  </div>
                </div>

                {/* Body Graph */}
                <div className="flex flex-col items-center">
                  <div className="w-full rounded-2xl bg-[#E8E3F0] p-6 pt-5">
                    <p className="text-xs uppercase tracking-widest text-[#655E78] mb-4 text-center">Body Graph</p>
                    <div className="w-full max-w-[260px] mx-auto">
                      <BodyGraph profile={profile} />
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-5 text-xs text-[#655E78]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm bg-[#FF8FA3]" />
                        <span>Defined</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-sm border border-[#2D2640]/30 bg-transparent" />
                        <span>Undefined</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-4 h-0.5 bg-[#FF8FA3] opacity-60" />
                        <span>Channel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Profile */}
            <section className="container-editorial py-12 md:py-14">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-8 flex items-center gap-3">
                <span className="text-[#B8903A]">{SECTION_ICONS.profile}</span> Your Profile
              </h2>

              <div className="rounded-lg p-6 md:p-8 max-w-2xl bg-[#E0D8EE]">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif text-4xl text-[#2D2640]">{profile.profile}</span>
                  <span className="text-base text-[#655E78]">{profile.profileName}</span>
                </div>
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Centers */}
            <section className="container-editorial py-12 md:py-14">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-2 flex items-center gap-3">
                <span className="text-[#B8903A]">{SECTION_ICONS.centers}</span> Your Centers
              </h2>
              <p className="text-sm text-[#655E78] mb-8">
                Defined centers are fixed sources of energy. Undefined centers are open to amplifying the energies of others.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.centers.map((center) => {
                  const cc = centerContent[center.name];
                  if (!cc) return null;
                  return (
                    <div
                      key={center.name}
                      className={`border rounded-lg px-4 py-3 transition-colors ${
                        center.defined
                          ? 'border-[#FF8FA3]/40 bg-[#FF8FA3]/5'
                          : 'border-[#2D2640]/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-[#2D2640]">{cc.name.replace(' Center', '').replace(' (Self/Identity)', '').replace(' (Will/Ego)', '').replace(' (Emotional)', '')}</p>
                        <span
                          className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full flex-shrink-0 ${
                            center.defined
                              ? 'bg-[#FF8FA3]/20 text-[#C4365A]'
                              : 'bg-[#2D2640]/8 text-[#655E78]'
                          }`}
                        >
                          {center.defined ? 'Defined' : 'Open'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>


            {/* Channels */}
            {profile.channels.length > 0 && (
              <>
                <section className="container-editorial py-12 md:py-14">
                  <h2 className="font-serif text-2xl text-[#2D2640] mb-2 flex items-center gap-3">
                    <span className="text-[#B8903A]">{SECTION_ICONS.channels}</span> Active Channels
                  </h2>
                  <p className="text-sm text-[#655E78] mb-8">
                    Channels are formed when two connected gates are both active, creating a defined circuit between centers.
                  </p>

                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {profile.channels.map((channel) => (
                      <div
                        key={channel}
                        className="border border-[#2D2640]/10 rounded-lg px-4 py-3 flex items-center gap-3"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[#FF8FA3] flex-shrink-0" />
                        <span className="text-sm text-[#2D2640]">{channel}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="container-editorial">
                  <div className="h-px bg-[#2D2640]/10" />
                </div>
              </>
            )}

            {/* Incarnation Cross */}
            <section className="container-editorial py-12 md:py-14">
              <h2 className="font-serif text-2xl text-[#2D2640] mb-8 flex items-center gap-3">
                <span className="text-[#B8903A]">{SECTION_ICONS.cross}</span> Incarnation Cross
              </h2>

              <div className="rounded-lg p-6 md:p-8 max-w-xl bg-[#FBF0C4]">
                <p className="font-serif text-xl text-[#2D2640] mb-4">{profile.incarnationCross}</p>
                <PointList
                  text="Your Incarnation Cross represents the overarching theme of your life purpose. The larger story you are here to live and embody. It is derived from the four gates active at the Sun and Earth positions at the time of your birth and the moment 88 days prior."
                  icon="✦"
                />
              </div>
            </section>

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
                      Understand what your design actually means
                    </h2>
                    <p className="text-lg text-[#655E78] leading-relaxed max-w-lg mx-auto">
                      Human Design shows how you&apos;re wired. Your natal chart shows why. The full reading connects both systems so you can actually use your design in real life.
                    </p>
                  </div>

                  <ul className="max-w-sm mx-auto mb-6 space-y-3">
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      How your authority shapes decision-making
                    </li>
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      What each defined and open center means for you
                    </li>
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      Gate and channel interpretations
                    </li>
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      Strengths, challenges, career, and relationships
                    </li>
                    <li className="flex items-start gap-2 text-[#2D2640]/70 text-sm">
                      <span className="text-[#FF8FA3] mt-0.5">&#183;</span>
                      Incarnation cross and life purpose deep dive
                    </li>
                  </ul>

                  <div className="text-center">
                    <Link
                      href="/shop"
                      className="inline-block px-8 py-3.5 bg-[#2D2640] text-[#F0EBF8] rounded-lg text-sm font-medium hover:bg-[#1E1835] transition-colors"
                    >
                      Get your Human Design reading &mdash; $35
                    </Link>
                    <p className="text-xs text-[#655E78]/60 mt-4">Personalised report delivered within 48 hours</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="container-editorial">
              <div className="h-px bg-[#2D2640]/10" />
            </div>

            {/* Save Results */}
            <section className="container-editorial py-12 md:py-16">
              <div className="max-w-xl mx-auto text-center">
                <h2 className="font-serif text-2xl text-[#2D2640] mb-4">Save your results</h2>
                <p className="text-[#655E78] mb-8">Get your Human Design profile sent to your inbox.</p>
                <SendResultsEmail type="human-design" data={profile} />
              </div>
            </section>

            {/* Also Explore */}
            <section className="container-editorial pb-12">
              <p className="text-center text-sm text-[#655E78]">
                Also explore:{' '}
                <a href="/your-chart" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Birth Chart</a>
                {' · '}
                <a href="/bazi" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">BaZi</a>
                {' · '}
                <a href="/numerology" className="text-[#2D2640] underline underline-offset-2 hover:text-[#FF8FA3] transition-colors">Numerology</a>
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
