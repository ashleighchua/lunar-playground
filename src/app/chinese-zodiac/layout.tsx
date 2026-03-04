import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chinese Zodiac Calculator | The Lunar Playground',
  description: 'Find your Chinese zodiac animal sign, element, and personality profile. Discover what the Chinese zodiac reveals about you.',
  openGraph: {
    title: 'Chinese Zodiac Calculator | The Lunar Playground',
    description: 'Find your Chinese zodiac animal sign, element, and personality profile.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function ChineseZodiacLayout({ children }: { children: React.ReactNode }) {
  return children;
}
