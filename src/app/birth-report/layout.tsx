import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birth Chart Report | The Lunar Playground',
  description: 'Get your personalised birth chart report. Explore your operating system, core drives, emotional patterns, relationship blueprint, and more.',
  openGraph: {
    title: 'Birth Chart Report | The Lunar Playground',
    description: 'Get your personalised birth chart report with deep insights into your cosmic blueprint.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function BirthReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
