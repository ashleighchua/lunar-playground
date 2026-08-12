import type { Metadata } from 'next';
import { transitFaqs } from '@/lib/transitContent';

export const metadata: Metadata = {
  title: 'Daily Moon Transit | The Lunar Playground',
  description: 'Track today\'s moon sign and phase, plus this week\'s lunar transits. See what the current lunar energy means for you.',
  openGraph: {
    title: 'Daily Moon Transit | The Lunar Playground',
    description: 'Track today\'s moon sign and phase, plus this week\'s lunar transits.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const transitAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Daily Moon Transit Tracker',
  url: 'https://thelunarplayground.com/transit',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free daily moon transit tracker. See today\'s and this week\'s moon sign, phase, and what it means.',
};

const transitFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: transitFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function TransitLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transitAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(transitFaqJsonLd) }}
      />
      {children}
    </>
  );
}
