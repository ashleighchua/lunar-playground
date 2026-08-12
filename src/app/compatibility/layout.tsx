import type { Metadata } from 'next';
import { compatibilityFaqs } from '@/lib/data/compatibility-data';

export const metadata: Metadata = {
  title: 'Zodiac Compatibility Calculator | The Lunar Playground',
  description: 'Check your zodiac sign compatibility. Get detailed relationship insights, strengths, challenges, and tips for all 144 sign combinations.',
  openGraph: {
    title: 'Zodiac Compatibility Calculator | The Lunar Playground',
    description: 'Check your zodiac sign compatibility with detailed relationship insights.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const compatibilityAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Zodiac Compatibility Calculator',
  url: 'https://thelunarplayground.com/compatibility',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free zodiac compatibility calculator. Check relationship insights, strengths, challenges, and tips for all 144 sign combinations.',
};

const compatibilityFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: compatibilityFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function CompatibilityLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compatibilityAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compatibilityFaqJsonLd) }}
      />
      {children}
    </>
  );
}
