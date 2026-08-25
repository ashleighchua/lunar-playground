import type { ReportTier } from '@/lib/reportGeneration/orderInput';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceAmount: number; // price in cents for Stripe
  priceNote?: string;
  features: string[];
  ctaText: string;
  badge?: string;
  icon: string;
  /** Present only for products routed through the automated relocation-report pipeline (Phase 5+). */
  reportTier?: ReportTier;
}

export const products: Product[] = [
  {
    id: 'natal-chart',
    title: 'Natal Chart Reading',
    subtitle: 'Who you are at your core',
    description: 'Your birth chart, decoded: your Big Three, your core drives, and what each placement means for you specifically.',
    price: '$5',
    priceAmount: 500,
    features: [
      'Big Three analysis (Sun, Moon, Rising)',
      'Every planet, sign, and house explained',
      'Calculated with Swiss Ephemeris, delivered instantly',
    ],
    ctaText: 'Uncover your core patterns',
    icon: '☉',
    reportTier: 'natal-only',
  },
  {
    id: 'astrocartography',
    title: 'Relocation Report',
    subtitle: 'Find the city where everything clicks',
    description: 'Your birth chart mapped across the globe. Discover which cities could boost your career, love life, and personal growth.',
    price: '$35',
    priceAmount: 3500,
    features: [
      'All major planetary lines mapped and interpreted',
      'Top 3 cities matched to your goals',
      'Line crossings and power zones revealed',
      'Career, love, and growth potential by location',
    ],
    ctaText: 'Find where you thrive',
    badge: 'Most Popular',
    icon: '🌍',
    reportTier: 'relocation-only',
  },
  {
    id: 'relocation-birth-chart',
    title: 'Relocation + Birth Chart',
    subtitle: 'Know yourself, then know where to go',
    description: 'Everything from the Natal Chart Reading and Relocation Report in one. Understand who you are, then find the city where it all clicks.',
    price: '$5',
    priceAmount: 500,
    features: [
      'Big Three analysis (Sun, Moon, Rising)',
      'Top 3 cities matched to your goals',
      'How your chart shifts when you relocate',
      'Everything in one reading, one price',
    ],
    ctaText: 'Get the whole picture',
    badge: 'Best Value',
    icon: '🪐',
    reportTier: 'combined',
  },
  {
    id: 'mini-course',
    title: 'Read Your Own Chart',
    subtitle: 'Learn to interpret your relocation astrology',
    description: 'A self-paced guide to reading your own relocation astrology chart. Understand planetary lines, evaluate any city, and make informed decisions about where to live.',
    price: '$20',
    priceAmount: 2000,
    features: [
      'Understand your planetary lines',
      'Learn to evaluate any city',
      'Practical relocation framework',
      'Self-paced, keep forever',
    ],
    ctaText: 'Learn to read your own chart',
    icon: '📖',
  },
];
