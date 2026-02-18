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
    id: 'astrocartography',
    title: 'Relocation Report',
    subtitle: 'Find the city where everything clicks',
    description: 'A personalised relocation astrology reading that maps your planetary lines and reveals which cities activate career breakthroughs, love, and personal transformation.',
    price: '$47',
    priceAmount: 4700,
    features: [
      'All 6 planetary lines mapped and interpreted',
      'Top 3 cities matched to your goals',
      'Line crossings and power zones revealed',
      'Career, love, and growth potential by location',
      'Delivered as a detailed PDF report',
    ],
    ctaText: 'Get Your Relocation Report',
    badge: 'Most Popular',
    icon: '🌍',
  },
  {
    id: 'natal-chart',
    title: 'Natal Chart Reading',
    subtitle: 'Your complete personality blueprint',
    description: 'A comprehensive analysis of your birth chart covering personality, patterns, and potential.',
    price: '$30',
    priceAmount: 3000,
    features: [
      'Big Three analysis (Sun, Moon, Rising)',
      'Core drives and communication style',
      'Relationship blueprint and work patterns',
      'Shadow work and growth edges',
    ],
    ctaText: 'Order Reading',
    icon: '☉',
  },
  {
    id: 'combo',
    title: 'Relocation + Natal Deep Dive',
    subtitle: 'Know who you are. Find where you belong.',
    description: 'The premium package. Understand your chart, then discover which cities bring out the best in you — with cross-referenced insights you won\'t get from separate readings.',
    price: '$90',
    priceAmount: 9000,
    priceNote: 'premium package',
    features: [
      'Everything in both readings',
      'Cross-referenced location insights',
      'How your personality expresses differently by city',
      'Your ideal city for career, love, and growth',
    ],
    ctaText: 'Get the Deep Dive',
    badge: 'Best Value',
    icon: '✦',
  },
  {
    id: 'mini-course',
    title: 'Read Your Own Chart',
    subtitle: 'Mini course on relocation astrology',
    description: 'Learn to read your own relocation astrology chart with this self-paced guide.',
    price: '$7',
    priceAmount: 700,
    features: [
      'Understand your planetary lines',
      'Learn to evaluate any city',
      'Practical relocation framework',
      'Self-paced, keep forever',
    ],
    ctaText: 'Get the Course',
    icon: '📖',
  },
];
