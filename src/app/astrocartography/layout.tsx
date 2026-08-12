import type { Metadata } from 'next';
import { astrocartographyFaqs } from '@/lib/astrocartography/interpretations';

export const metadata: Metadata = {
  title: 'Astrocartography Map | The Lunar Playground',
  description: 'Discover your best places to live, work, and travel with your personalised astrocartography map. See where your planetary lines fall across the globe.',
  openGraph: {
    title: 'Astrocartography Map | The Lunar Playground',
    description: 'Discover your best places to live, work, and travel with your personalised astrocartography map.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const astrocartographyAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Astrocartography Map',
  url: 'https://thelunarplayground.com/astrocartography',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free astrocartography map. Discover your Sun, Moon, Venus, and Jupiter lines and the best places to live, work, and travel.',
};

const astrocartographyFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: astrocartographyFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function AstrocartographyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(astrocartographyAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(astrocartographyFaqJsonLd) }}
      />
      {children}
    </>
  );
}
