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
    <nav className="bg-[#2D2640]">
      <div className="container-editorial py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Images/logo.png"
              alt="The Lunar Playground"
              width={52}
              height={39}
              className="rounded-full object-cover w-[52px] h-[52px]"
              priority
            />
            <span className="font-serif text-xl text-[#F0EBF8]">The Lunar Playground</span>
          </Link>

          {/* Desktop: Key links + hamburger */}
          <div className="hidden md:flex items-center gap-8">
            {desktopLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm transition-colors hover:text-[#F0EBF8]/70 ${
                  currentPage === link.key ? 'text-[#F0EBF8]' : 'text-[#F0EBF8]/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#F0EBF8] hover:text-[#F0EBF8]/70 transition-colors"
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

          {/* Mobile: Hamburger only */}
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
                  className={`text-lg transition-colors hover:text-[#F0EBF8]/70 ${
                    currentPage === link.key ? 'text-[#F0EBF8]' : 'text-[#F0EBF8]/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
