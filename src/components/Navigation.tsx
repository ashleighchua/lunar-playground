'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  currentPage?: 'home' | 'your-chart' | 'today' | 'transit' | 'compatibility' | 'astrocartography' | 'blog' | 'about' | 'shop' | 'reviews' | 'faq';
}

export function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Key links visible on desktop
  const desktopLinks = [
    { href: '/astrocartography', label: 'Relocation Reading', key: 'astrocartography' },
    { href: '/shop', label: 'Shop', key: 'shop' },
  ];

  // All links in hamburger menu
  const allLinks = [
    { href: '/astrocartography', label: 'Relocation Reading', key: 'astrocartography' },
    { href: '/shop', label: 'Shop', key: 'shop' },
    { href: '/birth-report', label: 'Birth Chart', key: 'your-chart' },
    { href: '/transit', label: 'Sky Guide', key: 'transit' },
    { href: '/blog', label: 'Blog', key: 'blog' },
    { href: '/reviews', label: 'Reviews', key: 'reviews' },
    { href: '/faq', label: 'FAQ', key: 'faq' },
    { href: '/about', label: 'About', key: 'about' },
  ];

  return (
    <nav className="bg-[#2A2A2A]">
      <div className="container-editorial py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/Images/logo.png"
              alt="The Lunar Playground"
              width={52}
              height={52}
              className="rounded-full"
            />
            <span className="font-serif text-xl text-[#FAF7F2]">The Lunar Playground</span>
          </Link>

          {/* Desktop: Key links + hamburger */}
          <div className="hidden md:flex items-center gap-8">
            {desktopLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`text-sm transition-colors hover:text-[#FAF7F2]/70 ${
                  currentPage === link.key ? 'text-[#FAF7F2]' : 'text-[#FAF7F2]/90'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-[#FAF7F2] hover:text-[#FAF7F2]/70 transition-colors"
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
            className="md:hidden p-2 text-[#FAF7F2]"
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
          <div className="mt-4 pb-2 border-t border-[#FAF7F2]/10 pt-4">
            <div className="flex flex-col gap-4">
              {allLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg transition-colors hover:text-[#FAF7F2]/70 ${
                    currentPage === link.key ? 'text-[#FAF7F2]' : 'text-[#FAF7F2]/80'
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
