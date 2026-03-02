'use client';

import { useState, useEffect } from 'react';
import type { SectionConfig } from '@/lib/sectionConfig';

interface SectionLoadingScreenProps {
  section: SectionConfig;
}

export function SectionLoadingScreen({ section }: SectionLoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % section.loadingMessages.length);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 50);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [section.loadingMessages.length]);

  return (
    <div
      className="min-h-[80vh] flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: section.accentBg }}
    >
      <div className="animate-fade-in text-center">
        <div
          className="text-7xl mb-8 inline-block animate-pulse"
          style={{ color: section.accentColor }}
        >
          {section.planetSymbol}
        </div>
      </div>

      <div className="h-12 flex items-center">
        <p
          key={messageIndex}
          className="animate-fade-in font-serif text-lg md:text-xl text-[#2D2640]/80 text-center"
        >
          {section.loadingMessages[messageIndex]}
        </p>
      </div>

      <div className="w-48 h-0.5 bg-[#2D2640]/10 rounded-full mt-8 overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-50 ease-linear"
          style={{
            backgroundColor: section.accentColor,
            width: `${progress}%`,
          }}
        />
      </div>
    </div>
  );
}
