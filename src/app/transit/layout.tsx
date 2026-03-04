import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transit Calendar | The Lunar Playground',
  description: 'Track your personal astrological transits. See upcoming planetary aspects and how they affect your birth chart.',
  openGraph: {
    title: 'Transit Calendar | The Lunar Playground',
    description: 'Track your personal astrological transits and upcoming planetary aspects.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function TransitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
