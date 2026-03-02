import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | The Lunar Playground',
  description: 'Astrology insights, moon phase guidance, and cosmic wisdom. Read the latest from The Lunar Playground.',
  openGraph: {
    title: 'Blog | The Lunar Playground',
    description: 'Astrology insights, moon phase guidance, and cosmic wisdom.',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
