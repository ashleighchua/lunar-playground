import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Astrocartography Map | The Lunar Playground',
  description: 'Discover your best places to live, work, and travel with your personalised astrocartography map. See where your planetary lines fall across the globe.',
  openGraph: {
    title: 'Astrocartography Map | The Lunar Playground',
    description: 'Discover your best places to live, work, and travel with your personalised astrocartography map.',
    images: [{ url: '/Images/og-image.png', width: 1200, height: 630, alt: 'The Lunar Playground' }],
  },
};

export default function AstrocartographyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
