'use client';

import { useState, useEffect } from 'react';

const sections = [
  { id: 'operating-system', label: 'Operating System' },
  { id: 'core-drives', label: 'Core Drives' },
  { id: 'emotional-pattern', label: 'Emotional Pattern' },
  { id: 'relationship-blueprint', label: 'Relationships' },
  { id: 'work-style', label: 'Work Style' },
  { id: 'shadow-growth', label: 'Shadow & Growth' },
  { id: 'takeaways', label: 'Takeaways' },
];

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min((scrollTop / docHeight) * 100, 100);
      setProgress(scrollProgress);

      // Show progress bar after scrolling past first section
      const firstSection = document.getElementById('operating-system');
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight * 0.5);
      }

      // Find current section
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            current = section.id;
          }
        }
      }
      setCurrentSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const currentLabel = sections.find(s => s.id === currentSection)?.label || '';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 print-hidden">
      {/* Progress bar */}
      <div className="h-1 bg-[var(--paper-muted)]">
        <div
          className="h-full bg-gradient-to-r from-[var(--sun-stroke)] via-[var(--moon-stroke)] to-[var(--rising-stroke)] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Current section indicator */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-[var(--border-soft)] text-xs text-[var(--ink-secondary)]">
          {currentLabel}
        </div>
      </div>
    </div>
  );
}
