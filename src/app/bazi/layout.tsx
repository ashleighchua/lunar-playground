import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BaZi Four Pillars Calculator | The Lunar Playground',
  description: 'Calculate your BaZi Four Pillars of Destiny chart. Discover your Day Master, elemental balance, and Chinese astrological profile.',
  openGraph: {
    title: 'BaZi Four Pillars Calculator | The Lunar Playground',
    description: 'Calculate your BaZi Four Pillars of Destiny chart and discover your Day Master.',
  },
};

export default function BaZiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
