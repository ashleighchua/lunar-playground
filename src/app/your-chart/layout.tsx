import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Birth Chart | The Lunar Playground',
  description: 'Generate your free birth chart with sun sign, moon sign, rising sign, and planetary positions. Explore your cosmic blueprint.',
  openGraph: {
    title: 'Your Birth Chart | The Lunar Playground',
    description: 'Generate your free birth chart with sun sign, moon sign, rising sign, and planetary positions.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function YourChartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
