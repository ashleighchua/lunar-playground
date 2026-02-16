'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div
          className="text-7xl mb-8 inline-block animate-pulse"
          style={{ color: section.accentColor }}
        >
          {section.planetSymbol}
        </div>
      </motion.div>

      <div className="h-12 flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="font-serif text-lg md:text-xl text-[#2A2A2A]/80 text-center"
          >
            {section.loadingMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="w-48 h-0.5 bg-[#2A2A2A]/10 rounded-full mt-8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: section.accentColor }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.05, ease: 'linear' }}
        />
      </div>
    </div>
  );
}
