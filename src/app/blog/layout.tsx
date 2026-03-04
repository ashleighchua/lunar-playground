import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | The Lunar Playground',
  description: 'Honest breakdowns of astrology, BaZi, Human Design, numerology, and how they actually work together. Written by a real human.',
  openGraph: {
    title: 'Blog | The Lunar Playground',
    description: 'Honest breakdowns of astrology, BaZi, Human Design, numerology, and how they actually work together.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
