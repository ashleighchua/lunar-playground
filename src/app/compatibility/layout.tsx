import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zodiac Compatibility Calculator | The Lunar Playground',
  description: 'Check your zodiac sign compatibility. Get detailed relationship insights, strengths, challenges, and tips for all 144 sign combinations.',
  openGraph: {
    title: 'Zodiac Compatibility Calculator | The Lunar Playground',
    description: 'Check your zodiac sign compatibility with detailed relationship insights.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function CompatibilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
