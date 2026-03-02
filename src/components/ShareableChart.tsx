'use client';

import { useRef, useState } from 'react';

interface ShareableChartProps {
  sunSign: string;
  moonSign: string;
  risingSign: string;
  birthDate?: string;
  onClose: () => void;
}

const zodiacSymbols: Record<string, string> = {
  Aries: '♈',
  Taurus: '♉',
  Gemini: '♊',
  Cancer: '♋',
  Leo: '♌',
  Virgo: '♍',
  Libra: '♎',
  Scorpio: '♏',
  Sagittarius: '♐',
  Capricorn: '♑',
  Aquarius: '♒',
  Pisces: '♓',
};

const elementColors: Record<string, { bg: string; accent: string }> = {
  Fire: { bg: '#FEF3E8', accent: '#FF8FA3' },    // Aries, Leo, Sagittarius
  Earth: { bg: '#F0EBE3', accent: '#7A746C' },   // Taurus, Virgo, Capricorn
  Air: { bg: '#F5F8FA', accent: '#6B8DAB' },     // Gemini, Libra, Aquarius
  Water: { bg: '#EEF3F7', accent: '#5B7B9A' },   // Cancer, Scorpio, Pisces
};

function getElement(sign: string): string {
  const fireSignsSet = ['Aries', 'Leo', 'Sagittarius'];
  const earthSignsSet = ['Taurus', 'Virgo', 'Capricorn'];
  const airSignsSet = ['Gemini', 'Libra', 'Aquarius'];
  if (fireSignsSet.includes(sign)) return 'Fire';
  if (earthSignsSet.includes(sign)) return 'Earth';
  if (airSignsSet.includes(sign)) return 'Air';
  return 'Water';
}

export function ShareableChart({ sunSign, moonSign, risingSign, birthDate, onClose }: ShareableChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const sunElement = getElement(sunSign);
  const colors = elementColors[sunElement];

  const downloadImage = async () => {
    if (!chartRef.current) return;

    setDownloading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(chartRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: colors.bg,
      });

      const link = document.createElement('a');
      link.download = `my-birth-chart-${sunSign.toLowerCase()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setDownloading(false);
    }
  };

  const shareImage = async () => {
    if (!chartRef.current) return;

    setDownloading(true);
    try {
      const { toPng } = await import('html-to-image');
      const dataUrl = await toPng(chartRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: colors.bg,
      });

      // Convert data URL to blob for sharing
      const response = await fetch(dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `my-birth-chart.png`, { type: 'image/png' });

      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Birth Chart',
          text: `I'm a ${sunSign} Sun, ${moonSign} Moon, ${risingSign} Rising ✨ Get your birth chart at thelunarplayground.com`,
        });
      } else {
        // Fallback to download
        downloadImage();
      }
    } catch (error) {
      console.error('Failed to share image:', error);
      // Fallback to download
      downloadImage();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#7B7394] hover:text-[#2D2640] transition-colors z-10"
          aria-label="Close"
        >
          ✕
        </button>

        <h3 className="font-serif text-xl text-[#2D2640] mb-4 text-center">Share your chart</h3>
        <p className="text-sm text-[#7B7394] text-center mb-6">Download or share your birth chart summary</p>

        {/* The shareable card */}
        <div
          ref={chartRef}
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: colors.bg }}
        >
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: colors.accent }}>
                My Birth Chart
              </p>
              <h2 className="font-serif text-2xl text-[#2D2640]">
                The Big Three
              </h2>
            </div>

            {/* The three signs */}
            <div className="space-y-4">
              {/* Sun */}
              <div className="flex items-center gap-4 bg-white/60 rounded-xl p-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  {zodiacSymbols[sunSign]}
                </div>
                <div>
                  <p className="text-xs tracking-wider uppercase text-[#7B7394]">Sun</p>
                  <p className="font-serif text-lg text-[#2D2640]">{sunSign}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl">☀️</span>
                </div>
              </div>

              {/* Moon */}
              <div className="flex items-center gap-4 bg-white/60 rounded-xl p-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  {zodiacSymbols[moonSign]}
                </div>
                <div>
                  <p className="text-xs tracking-wider uppercase text-[#7B7394]">Moon</p>
                  <p className="font-serif text-lg text-[#2D2640]">{moonSign}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl">🌙</span>
                </div>
              </div>

              {/* Rising */}
              <div className="flex items-center gap-4 bg-white/60 rounded-xl p-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${colors.accent}20` }}
                >
                  {zodiacSymbols[risingSign]}
                </div>
                <div>
                  <p className="text-xs tracking-wider uppercase text-[#7B7394]">Rising</p>
                  <p className="font-serif text-lg text-[#2D2640]">{risingSign}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-2xl">⬆️</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-[#2D2640]/10 text-center">
              <p className="text-xs text-[#7B7394]">
                Get your birth chart at
              </p>
              <p className="text-sm font-medium" style={{ color: colors.accent }}>
                thelunarplayground.com
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={downloadImage}
            disabled={downloading}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#2D2640] text-[#F0EBF8] hover:bg-[#1E1835] transition-colors text-sm disabled:opacity-50"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>{downloading ? 'Generating...' : 'Download'}</span>
          </button>
          {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
            <button
              onClick={shareImage}
              disabled={downloading}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#FF8FA3]/10 text-[#C4365A] hover:bg-[#FF8FA3]/20 transition-colors text-sm disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span>Share</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
