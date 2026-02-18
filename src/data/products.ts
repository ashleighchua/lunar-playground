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
    price: '$50',
    priceAmount: 5000,
    features: [
      'All major planetary lines mapped and interpreted',
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
    title: 'The Complete Reading',
    subtitle: 'Know who you are. Find where you belong. See how you shift.',
    description: 'Everything in one package. Your natal chart, your relocation report, plus a relocated chart for your chosen city — showing exactly how your placements express differently when you move.',
    price: '$90',
    priceAmount: 9000,
    priceNote: 'premium package',
    features: [
      'Full natal chart reading',
      'Full relocation report with all major planetary lines',
      '1 relocated chart for your chosen city',
      'How your placements shift in your new location',
    ],
    ctaText: 'Get the Full Package',
    badge: 'Best Value',
    icon: '✦',
  },
  {
    id: 'mini-course',
    title: 'Read Your Own Chart',
    subtitle: 'Mini course on relocation astrology',
    description: 'Learn to read your own relocation astrology chart with this self-paced guide.',
    price: '$20',
    priceAmount: 2000,
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
