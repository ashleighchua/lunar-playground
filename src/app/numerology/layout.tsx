import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Numerology Calculator | The Lunar Playground',
  description: 'Calculate your Life Path Number, Expression Number, and Soul Urge Number. Discover what numerology reveals about your purpose.',
  openGraph: {
    title: 'Numerology Calculator | The Lunar Playground',
    description: 'Calculate your Life Path Number and discover what numerology reveals about your purpose.',
  },
};

export default function NumerologyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
