import type { Metadata } from 'next';
import { zodiacFaqs } from '@/lib/data/zodiac-content';

export const metadata: Metadata = {
  title: 'Chinese Zodiac Calculator | The Lunar Playground',
  description: 'Find your Chinese zodiac animal sign, element, and personality profile. Discover what the Chinese zodiac reveals about you.',
  openGraph: {
    title: 'Chinese Zodiac Calculator | The Lunar Playground',
    description: 'Find your Chinese zodiac animal sign, element, and personality profile.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const zodiacAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Chinese Zodiac Calculator',
  url: 'https://thelunarplayground.com/chinese-zodiac',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free Chinese zodiac calculator. Find your animal sign, element, personality profile, and compatibility.',
};

const zodiacFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: zodiacFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function ChineseZodiacLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zodiacAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(zodiacFaqJsonLd) }}
      />
      {children}
    </>
  );
}
