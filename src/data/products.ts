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
    title: 'Astrocartography Reading',
    subtitle: 'Your chart mapped across the globe',
    description: 'A personalized analysis of your planetary lines with city recommendations tailored to your goals.',
    price: '$30',
    priceAmount: 3000,
    priceNote: 'for 3 cities',
    features: [
      'Your planetary lines mapped and interpreted',
      'Top 3 cities personalized to your chart',
      'Line crossings and power zones identified',
      'Delivered as a detailed PDF report',
    ],
    ctaText: 'Order Reading',
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
    title: 'Astrocartography + Natal Chart',
    subtitle: 'The complete picture',
    description: 'Both readings together at a discounted rate. Understand who you are and where you thrive.',
    price: '$55',
    priceAmount: 5500,
    priceNote: 'save $5',
    features: [
      'Everything in both readings',
      'Cross-referenced insights',
      'How your personality expresses differently by location',
      'Best value for the full picture',
    ],
    ctaText: 'Order Bundle',
    badge: 'Best Value',
    icon: '✦',
  },
  {
    id: 'mini-course',
    title: 'Read Your Own Chart',
    subtitle: 'Mini course on astrocartography',
    description: 'Learn to read your own astrocartography chart with this self-paced guide.',
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
