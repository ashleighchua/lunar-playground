import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | The Lunar Playground',
  description: 'Frequently asked questions about birth chart readings, astrocartography, relocation astrology, and how The Lunar Playground works.',
  openGraph: {
    title: 'FAQ | The Lunar Playground',
    description: 'Frequently asked questions about birth chart readings and astrocartography.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

const faqSchemaItems = [
  { q: 'What can I do on this site for free?', a: 'You can generate a full birth chart report, explore your astrocartography map, check your BaZi (Four Pillars) profile, look up your Human Design type, run your numerology, find your Chinese zodiac animal, check compatibility, and see current transits. All free, no sign-up required.' },
  { q: 'Do I need my birth time for the free tools?', a: 'For the most accurate results, yes. Your birth time determines your Rising sign, house placements, and astrocartography lines. Most tools still work with just your date and location, but some sections will be less precise.' },
  { q: 'What\'s the difference between the free tools and the paid readings?', a: 'The free tools give you automated results. The paid readings go deeper: calculated with Swiss Ephemeris and written by AI built to stay true to your exact chart, with every claim checked before it reaches you.' },
  { q: 'What readings do you offer?', a: 'Two. A Natal Chart Reading ($5) for who you are, and a Relocation Report ($5) for where you\'ll thrive. There\'s also a $5 self-guided course for reading your own relocation chart. No bundles.' },
  { q: 'Who writes the readings?', a: 'Both are calculated with Swiss Ephemeris (the same tool real astrologers use) and written by AI Ashleigh built and designed herself, with every line checked against your real chart before it reaches you.' },
  { q: 'How long does delivery take?', a: 'Every paid reading, plus the Read Your Own Chart course, is delivered instantly.' },
  { q: 'Do you still do BaZi or Human Design readings?', a: 'Not as paid readings right now. Ashleigh has narrowed the paid readings down to natal chart and relocation. The free BaZi and Human Design tools are still on the site.' },
  { q: 'Is this the same as a horoscope?', a: 'No. Horoscopes use your Sun sign only. Everything here uses your full birth data, so your results are specific to you.' },
  { q: 'What information do I need to provide?', a: 'Date of birth, time of birth (as exact as possible), and birth location. For the relocation report, it helps to mention cities or regions you\'re curious about.' },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqSchemaItems.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  );
}
