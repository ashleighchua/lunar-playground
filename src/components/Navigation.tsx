'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavigationProps {
  currentPage?: 'home' | 'your-chart' | 'today' | 'compatibility' | 'travel' | 'about';
}

export function Navigation({ currentPage }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/your-chart', label: 'Your Chart', key: 'your-chart' },
    { href: '/today', label: 'Today', key: 'today' },
    { href: '/compatibility', label: 'Compatibility', key: 'compatibility' },
    { href: '/travel', label: 'Travel', key: 'travel' },
    { href: '/about', label: 'About', key: 'about' },
  ];

  return (
    <nav className="container-editorial py-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Images/Untitled (1920 x 1080 px) (6).png"
            alt="The Lunar Playground"
            width={96}
            height={96}
            className="h-24 w-auto"
          />
          <span className="font-serif text-xl text-[#2A2A2A]">The Lunar Playground</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={`text-sm transition-colors ${
                currentPage === link.key
                  ? 'text-[#2A2A2A]'
                  : 'text-[#6B6B6B] hover:text-[#2A2A2A]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-[#2A2A2A]"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-6 pb-4 border-t border-[#2A2A2A]/10 pt-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg transition-colors ${
                  currentPage === link.key
                    ? 'text-[#2A2A2A]'
                    : 'text-[#6B6B6B] hover:text-[#2A2A2A]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
