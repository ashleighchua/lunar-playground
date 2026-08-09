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
}

export const products: Product[] = [
  {
    id: 'natal-chart',
    title: 'Natal Chart Reading',
    subtitle: 'Who you are at your core',
    description: 'A deep reading of your birth chart covering personality, patterns, relationships, and growth edges. The foundation for understanding everything else.',
    price: '$35',
    priceAmount: 3500,
    features: [
      'Big Three analysis (Sun, Moon, Rising)',
      'Core drives and communication style',
      'Relationship blueprint and work patterns',
      'Shadow work and growth edges',
    ],
    ctaText: 'Uncover your core patterns',
    icon: '☉',
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
