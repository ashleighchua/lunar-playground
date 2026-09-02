'use client';

import { useEffect, useRef, useState } from 'react';

const questions = [
  { text: 'Should I move?', color: '#FFB8C6' },
  { text: 'Why do I feel stuck?', color: '#A6B4FF' },
  { text: 'Where would I actually thrive?', color: '#7EDAB9' },
];

const stars = [
  { top: '16%', left: '10%', color: '#FFB8C6', size: 13, duration: 3, delay: 0 },
  { top: '64%', left: '6%', color: '#A6B4FF', size: 10, duration: 4.4, delay: 1.2 },
  { top: '26%', left: '38%', color: '#7EDAB9', size: 9, duration: 3.6, delay: 0.6 },
  { top: '10%', left: '58%', color: '#FFD4B8', size: 12, duration: 4, delay: 1.8 },
  { top: '74%', left: '46%', color: '#FFB8C6', size: 8, duration: 5, delay: 2.4 },
  { top: '44%', left: '20%', color: '#A6B4FF', size: 15, duration: 3.2, delay: 2 },
  { top: '82%', left: '78%', color: '#7EDAB9', size: 11, duration: 4.6, delay: 0.3 },
  { top: '8%', left: '84%', color: '#FFB88C', size: 10, duration: 3.8, delay: 1 },
];

const ROTATE_MS = 1500;
const FADE_MS = 300;

export function HomeHero() {
  const [q, setQ] = useState(0);
  const [qVisible, setQVisible] = useState(true);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    intervalRef.current = setInterval(() => {
      setQVisible(false);
      timeoutRef.current = setTimeout(() => {
        setQ((prev) => (prev + 1) % questions.length);
        setQVisible(true);
      }, FADE_MS);
    }, ROTATE_MS);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [reducedMotion, paused]);

  const goQ = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setQVisible(false);
    timeoutRef.current = setTimeout(() => {
      setQ(i);
      setQVisible(true);
    }, 250);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMx((e.clientX - r.left) / r.width - 0.5);
    setMy((e.clientY - r.top) / r.height - 0.5);
  };

  const starTransform = reducedMotion ? undefined : `translate(${(-mx * 22).toFixed(1)}px, ${(-my * 16).toFixed(1)}px)`;
  const moonTransform = reducedMotion ? undefined : `translate(${(mx * 12).toFixed(1)}px, ${(my * 10).toFixed(1)}px)`;

  return (
    <section
      id="top"
      onMouseMove={reducedMotion ? undefined : handleMouseMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative overflow-hidden text-[#F0EBF8] px-4 md:px-12 pt-16 md:pt-24 lg:pt-30 pb-22.5 md:pb-30 lg:pb-37.5"
      style={{ background: 'linear-gradient(180deg, #1A1628 0%, #2D2640 78%, #F0EBF8 100%)' }}
    >
      {/* Twinkling stars */}
      <div
        className="absolute -inset-10 pointer-events-none transition-transform duration-300 ease-out"
        style={{ transform: starTransform }}
        aria-hidden="true"
      >
        {stars.map((s, i) => (
          <span
            key={i}
            className="absolute"
            style={{
              top: s.top,
              left: s.left,
              color: s.color,
              fontSize: s.size,
              animation: `twinkle ${s.duration}s ease-in-out infinite ${s.delay}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>

      <div className="max-w-280 mx-auto grid md:grid-cols-2 gap-8 md:gap-14 items-center relative">
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.22em] uppercase text-[#A6B4FF]">
            ✦ &nbsp;Relocation astrology &amp; natal readings
          </p>
          <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[66px] leading-[1.1] tracking-tight min-h-[2.2em]">
            <em
              aria-hidden="true"
              className="not-italic inline-block transition-all duration-400 ease-in-out"
              style={{
                fontStyle: 'italic',
                color: questions[q].color,
                opacity: qVisible ? 1 : 0,
                transform: qVisible ? 'translateY(0)' : 'translateY(14px)',
              }}
            >
              {questions[q].text}
            </em>
            <span className="sr-only">{questions.map((question) => question.text).join('. ')}.</span>
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-[#B5B0C8] max-w-105">
            The answers aren&apos;t really in the stars. They&apos;re in you. We just help you see them.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#readings"
              className="bg-[#FF8FA3] text-[#1A1628] rounded-full px-7.5 py-3.5 font-bold text-base hover:bg-[#FFB8C6] transition-colors"
              style={{ boxShadow: '0 0 32px rgba(255, 143, 163, 0.4)' }}
            >
              See the readings
            </a>
            <a
              href="#familiar"
              className="bg-transparent text-[#F0EBF8] border border-[#F0EBF8]/40 rounded-full px-7.5 py-3.5 font-semibold text-base hover:border-[#F0EBF8] hover:bg-[#F0EBF8]/8 transition-colors"
            >
              Sound familiar?
            </a>
          </div>
        </div>

        {/* Moon graphic */}
        <div
          className="relative min-h-75 md:min-h-95 lg:min-h-110 flex items-center justify-center transition-transform duration-400 ease-out"
          style={{ transform: moonTransform }}
          aria-hidden="true"
        >
          <div
            className="absolute w-75 md:w-85 lg:w-95 h-75 md:h-85 lg:h-95 rounded-full border border-dashed border-[#A6B4FF]/35"
            style={{ animation: 'spinSlow 60s linear infinite' }}
          />
          <div className="absolute w-95 md:w-107.5 lg:w-120 h-95 md:h-107.5 lg:h-120 rounded-full border border-[#A6B4FF]/15" />
          <div
            className="w-45 md:w-52.5 lg:w-60 h-45 md:h-52.5 lg:h-60 rounded-full"
            style={{
              background: 'radial-gradient(circle at 34% 30%, #FDFBFF 0%, #DCE2FF 45%, #A6B4FF 100%)',
              animation: 'moonglow 6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -mt-1.75 -ml-1.75"
            style={{ animation: 'orbit 22s linear infinite', animationFillMode: 'forwards' }}
          >
            <span className="block w-3.5 h-3.5 rounded-full bg-[#FF8FA3]" style={{ boxShadow: '0 0 14px rgba(255, 143, 163, 0.9)' }} />
          </div>
          <div
            className="absolute top-1/2 left-1/2 -mt-1.25 -ml-1.25"
            style={{ animation: 'orbit2 34s linear infinite', animationFillMode: 'forwards' }}
          >
            <span className="block w-2.5 h-2.5 rounded-full bg-[#7EDAB9]" style={{ boxShadow: '0 0 12px rgba(126, 218, 185, 0.9)' }} />
          </div>
        </div>
      </div>

      {/* Pagination dots */}
      <div className="absolute left-0 right-0 bottom-6.5 flex justify-center gap-2">
        {questions.map((question, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goQ(i)}
            aria-label={`Show question ${i + 1}: ${question.text}`}
            aria-current={i === q}
            className="h-2 rounded-full border-none cursor-pointer p-0 transition-all duration-300"
            style={{
              width: i === q ? '22px' : '8px',
              background: i === q ? question.color : 'rgba(240, 235, 248, 0.35)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
