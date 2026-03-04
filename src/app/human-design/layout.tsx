import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Human Design Calculator | The Lunar Playground',
  description: 'Calculate your Human Design type, authority, profile, and defined centers. Discover your unique energetic blueprint.',
  openGraph: {
    title: 'Human Design Calculator | The Lunar Playground',
    description: 'Calculate your Human Design type, authority, profile, and defined centers.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function HumanDesignLayout({ children }: { children: React.ReactNode }) {
  return children;
}
