'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F0EBF8] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        {/* Scattered stars */}
        <svg className="absolute top-[15%] left-[12%] w-4 h-4 text-[#2D2640]/10 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.92L16.18 20 12 16.27 7.82 20l1.09-6.81L3.82 9.27l6.09-1.01z" />
        </svg>
        <svg className="absolute top-[22%] right-[18%] w-3 h-3 text-[#2D2640]/8" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.92L16.18 20 12 16.27 7.82 20l1.09-6.81L3.82 9.27l6.09-1.01z" />
        </svg>
        <svg className="absolute bottom-[25%] left-[22%] w-2.5 h-2.5 text-[#2D2640]/10 animate-pulse" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '2s' }}>
          <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.92L16.18 20 12 16.27 7.82 20l1.09-6.81L3.82 9.27l6.09-1.01z" />
        </svg>
        <svg className="absolute top-[35%] right-[8%] w-2 h-2 text-[#2D2640]/6 animate-pulse" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '0.5s' }}>
          <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.92L16.18 20 12 16.27 7.82 20l1.09-6.81L3.82 9.27l6.09-1.01z" />
        </svg>
        <svg className="absolute bottom-[35%] right-[25%] w-3 h-3 text-[#2D2640]/8 animate-pulse" viewBox="0 0 24 24" fill="currentColor" style={{ animationDelay: '1.5s' }}>
          <path d="M12 2l2.09 6.26L20.18 9.27l-5.09 3.92L16.18 20 12 16.27 7.82 20l1.09-6.81L3.82 9.27l6.09-1.01z" />
        </svg>

        {/* Crescent moon */}
        <svg className="absolute top-[10%] right-[30%] w-16 h-16 text-[#2D2640]/[0.04]" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10a40 40 0 1 0 0 80 32 32 0 0 1 0-80z" />
        </svg>

        {/* Orbit rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#2D2640]/[0.04]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-dashed border-[#2D2640]/[0.03]" />
      </div>

      <div className="max-w-md text-center relative z-10">
        {/* Constellation-like icon */}
        <div className="mb-8 flex justify-center">
          <svg className="w-20 h-20 text-[#2D2640]/15" viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="0.75">
            {/* Triangle constellation */}
            <circle cx="40" cy="15" r="2.5" fill="currentColor" />
            <circle cx="20" cy="55" r="2" fill="currentColor" />
            <circle cx="60" cy="55" r="2" fill="currentColor" />
            <line x1="40" y1="15" x2="20" y2="55" strokeDasharray="3 3" />
            <line x1="40" y1="15" x2="60" y2="55" strokeDasharray="3 3" />
            <line x1="20" y1="55" x2="60" y2="55" strokeDasharray="3 3" />
            {/* Smaller accent dots */}
            <circle cx="30" cy="35" r="1" fill="currentColor" opacity="0.5" />
            <circle cx="50" cy="35" r="1" fill="currentColor" opacity="0.5" />
            <circle cx="40" cy="50" r="1" fill="currentColor" opacity="0.3" />
          </svg>
        </div>

        <p className="text-xs uppercase tracking-widest text-[#7B7394] mb-4">Something went wrong</p>
        <h1 className="font-serif text-3xl md:text-4xl text-[#2D2640] mb-4">
          The stars misaligned
        </h1>
        <p className="text-[#7B7394] mb-10 leading-relaxed">
          A cosmic glitch disrupted your reading. Try refreshing, or head back to the homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#2D2640] text-[#F0EBF8] rounded-lg hover:bg-[#1E1835] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-[#2D2640]/10 text-[#2D2640] rounded-lg hover:bg-white/50 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
