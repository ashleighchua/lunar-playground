import type { Metadata, Viewport } from 'next';
import { Figtree, Fraunces } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import FeedbackButton from '@/components/FeedbackButton';

const GA_MEASUREMENT_ID = 'G-MP7S8LJ1XG';
const CLARITY_PROJECT_ID = 'uy38asrmsr';

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'The Lunar Playground | Natal Chart & Relocation Astrology Readings',
  description: 'Should I move? Why do I feel stuck? Where would I thrive? Your birth chart already knows. Natal chart readings, relocation reports, and free tools to find out.',
  icons: {
    icon: '/Images/logo.png',
    apple: '/Images/logo.png',
  },
  openGraph: {
    title: 'The Lunar Playground | Natal Chart & Relocation Astrology Readings',
    description: 'Should I move? Why do I feel stuck? Where would I thrive? Your birth chart already knows. Natal chart readings, relocation reports, and free tools to find out.',
    url: 'https://thelunarplayground.com',
    siteName: 'The Lunar Playground',
    images: [
      {
        url: '/Images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Lunar Playground',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Lunar Playground',
    description: 'Should I move? Why do I feel stuck? Where would I thrive? Your birth chart already knows. Natal chart readings, relocation reports, and free tools to find out.',
    images: ['/Images/og-image.png'],
  },
  metadataBase: new URL('https://thelunarplayground.com'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${fraunces.variable}`}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'The Lunar Playground',
              url: 'https://thelunarplayground.com',
              description: 'Relocation astrology specialist. Birth chart readings, astrocartography, and personalised relocation reports.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://thelunarplayground.com/blog?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'The Lunar Playground',
              url: 'https://thelunarplayground.com',
              description: 'Relocation astrology specialist. Natal chart readings and relocation reports, plus free tools to explore your chart.',
              serviceType: 'Astrology Reading',
              areaServed: 'Worldwide',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Astrology Services',
                itemListElement: [
                  { '@type': 'Offer', price: '35', priceCurrency: 'USD', itemOffered: { '@type': 'Service', name: 'Natal Chart Reading', description: 'A deep reading of your birth chart covering personality, patterns, relationships, and growth edges.' } },
                  { '@type': 'Offer', price: '35', priceCurrency: 'USD', itemOffered: { '@type': 'Service', name: 'Relocation Report', description: 'Your birth chart mapped across the globe to find cities that activate career, love, and transformation.' } },
                  { '@type': 'Offer', price: '20', priceCurrency: 'USD', itemOffered: { '@type': 'Service', name: 'Read Your Own Chart', description: 'A self-paced guide to reading your own relocation astrology chart.' } },
                ],
              },
            }),
          }}
        />

        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        {/* Microsoft Clarity */}
        <Script id="microsoft-clarity" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <FeedbackButton />
      </body>
    </html>
  );
}
