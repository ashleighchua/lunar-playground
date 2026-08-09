'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  currentPage?: 'home' | 'your-chart' | 'today' | 'transit' | 'compatibility' | 'astrocartography' | 'blog' | 'about' | 'shop' | 'reviews' | 'faq' | 'explore' | 'bazi' | 'numerology' | 'human-design' | 'chinese-zodiac';
}

export function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Key links visible on desktop
  const desktopLinks = [
    { href: '/', label: 'Explore', key: 'explore' },
    { href: '/shop', label: 'Readings', key: 'shop' },
    { href: '/blog', label: 'Blog', key: 'blog' },
    { href: '/about', label: 'About', key: 'about' },
  ];

  // All links in hamburger menu
  const allLinks = [
    { href: '/', label: 'Explore', key: 'explore' },
    { href: '/shop', label: 'Readings', key: 'shop' },
    { href: '/blog', label: 'Blog', key: 'blog' },
    { href: '/reviews', label: 'Reviews', key: 'reviews' },
    { href: '/faq', label: 'FAQ', key: 'faq' },
    { href: '/about', label: 'About', key: 'about' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#1A1628]/85 backdrop-blur-md border-b border-[#A6B4FF]/20">
      <div className="container-editorial py-3.5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="text-lg text-[#A6B4FF]" aria-hidden="true">&#9789;</span>
            <Image
              src="/Images/logo.png"
              alt="The Lunar Playground"
              width={52}
              height={39}
              className="rounded-full object-cover w-[44px] h-[44px]"
              priority
            />
            <span className="font-serif text-lg text-[#F0EBF8]">The Lunar Playground</span>
          </Link>

          {/* Desktop: Key links + CTA + hamburger */}
          <div className="hidden md:flex items-center gap-7">
            {desktopLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-white ${
                  currentPage === link.key ? 'text-white' : 'text-[#B5B0C8]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/shop"
              className="inline-flex items-center bg-[#FF8FA3] text-[#1A1628] rounded-full px-5 py-2 text-sm font-semibold whitespace-nowrap hover:bg-[#FFB8C6] transition-colors"
            >
              Get a reading
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#F0EBF8] hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M4 8h16M4 16h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile: Hamburger only (CTA lives in the slide-down menu to avoid crowding) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#F0EBF8]"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Slide-down menu (both mobile and desktop hamburger) */}
        {isMenuOpen && (
          <div className="mt-4 pb-2 border-t border-[#F0EBF8]/10 pt-4">
            <div className="flex flex-col gap-4">
              {allLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg transition-colors hover:text-white ${
                    currentPage === link.key ? 'text-white' : 'text-[#B5B0C8]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className="md:hidden inline-flex w-fit items-center bg-[#FF8FA3] text-[#1A1628] rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-[#FFB8C6] transition-colors mt-1"
              >
                Get a reading
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
