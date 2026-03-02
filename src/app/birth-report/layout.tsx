import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Birth Chart Report | The Lunar Playground',
  description: 'Get your personalised birth chart report. Explore your operating system, core drives, emotional patterns, relationship blueprint, and more.',
  openGraph: {
    title: 'Birth Chart Report | The Lunar Playground',
    description: 'Get your personalised birth chart report with deep insights into your cosmic blueprint.',
  },
};

export default function BirthReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}
