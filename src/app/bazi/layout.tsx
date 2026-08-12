import type { Metadata } from 'next';
import { baziFaqs } from '@/lib/data/bazi-content';

export const metadata: Metadata = {
  title: 'BaZi Four Pillars Calculator | The Lunar Playground',
  description: 'Calculate your BaZi Four Pillars of Destiny chart. Discover your Day Master, elemental balance, and Chinese astrological profile.',
  openGraph: {
    title: 'BaZi Four Pillars Calculator | The Lunar Playground',
    description: 'Calculate your BaZi Four Pillars of Destiny chart and discover your Day Master.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const baziAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'BaZi Four Pillars Calculator',
  url: 'https://thelunarplayground.com/bazi',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free BaZi Four Pillars of Destiny calculator. Discover your Day Master, elemental balance, and Chinese astrological profile.',
};

const baziFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: baziFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function BaZiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baziAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(baziFaqJsonLd) }}
      />
      {children}
    </>
  );
}
