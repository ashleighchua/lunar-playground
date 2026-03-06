import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import FeedbackButton from '@/components/FeedbackButton';

const GA_MEASUREMENT_ID = 'G-MP7S8LJ1XG';
const CLARITY_PROJECT_ID = 'uy38asrmsr';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: 'The Lunar Playground | Astrology, BaZi, Human Design & Relocation Readings',
  description: 'Six ancient systems, one birth date. Free tools and personalised readings that cross-reference astrology, BaZi, Human Design, and relocation analysis for deeper clarity.',
  icons: {
    icon: '/Images/logo.png',
    apple: '/Images/logo.png',
  },
  openGraph: {
    title: 'The Lunar Playground | Astrology, BaZi, Human Design & Relocation Readings',
    description: 'Six ancient systems, one birth date. Free tools and personalised readings that cross-reference astrology, BaZi, Human Design, and relocation analysis for deeper clarity.',
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
    description: 'Six ancient systems, one birth date. Free tools and personalised readings that cross-reference astrology, BaZi, Human Design, and relocation analysis for deeper clarity.',
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
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
              description: 'Relocation astrology specialist blending Western astrology, Chinese zodiac, BaZi, numerology, and human design.',
              serviceType: 'Astrology Reading',
              areaServed: 'Worldwide',
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Astrology Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Birth Chart Report',
                      description: 'Personalised birth chart analysis with sun, moon, and rising sign interpretations.',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Astrocartography Report',
                      description: 'Relocation astrology mapping showing your best cities for career, love, and personal growth.',
                    },
                  },
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
