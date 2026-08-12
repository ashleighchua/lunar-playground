import type { Metadata } from 'next';
import { numerologyFaqs } from '@/lib/data/numerology-content';

export const metadata: Metadata = {
  title: 'Numerology Calculator | The Lunar Playground',
  description: 'Calculate your Life Path Number, Birthday Number, and Energy Grid. Discover what numerology reveals about your purpose.',
  openGraph: {
    title: 'Numerology Calculator | The Lunar Playground',
    description: 'Calculate your Life Path Number and discover what numerology reveals about your purpose.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const numerologyAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Numerology Calculator',
  url: 'https://thelunarplayground.com/numerology',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free numerology calculator. Discover your Life Path Number, Birthday Number, Talent Number, and Energy Grid.',
};

const numerologyFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: numerologyFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function NumerologyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(numerologyAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(numerologyFaqJsonLd) }}
      />
      {children}
    </>
  );
}
