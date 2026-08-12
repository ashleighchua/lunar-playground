import type { Metadata } from 'next';
import { humanDesignFaqs } from '@/lib/data/human-design-content';

export const metadata: Metadata = {
  title: 'Human Design Calculator | The Lunar Playground',
  description: 'Calculate your Human Design type, authority, profile, and defined centers. Discover your unique energetic blueprint.',
  openGraph: {
    title: 'Human Design Calculator | The Lunar Playground',
    description: 'Calculate your Human Design type, authority, profile, and defined centers.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const humanDesignAppJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Human Design Calculator',
  url: 'https://thelunarplayground.com/human-design',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free Human Design calculator. Discover your type, strategy, authority, profile, and defined centers.',
};

const humanDesignFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: humanDesignFaqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function HumanDesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(humanDesignAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(humanDesignFaqJsonLd) }}
      />
      {children}
    </>
  );
}
