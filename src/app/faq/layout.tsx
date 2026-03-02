import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | The Lunar Playground',
  description: 'Frequently asked questions about birth chart readings, astrocartography, relocation astrology, and how The Lunar Playground works.',
  openGraph: {
    title: 'FAQ | The Lunar Playground',
    description: 'Frequently asked questions about birth chart readings and astrocartography.',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
