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
    id: 'full-blueprint',
    title: 'The Complete Architecture',
    subtitle: 'Your complete operating manual across every system',
    description: 'Western astrology, BaZi, Human Design, and relocation astrology, all woven into one unified reading. Understand who you are, how you\'re designed, what drives you, and where you\'ll thrive.',
    price: '$139',
    priceAmount: 13900,
    priceNote: 'signature package',
    features: [
      'Full natal chart reading (Sun, Moon, Rising + all major placements)',
      'BaZi Four Pillars destiny and timing analysis',
      'Human Design Type, Strategy, and Authority',
      'Relocation report with top cities and planetary lines',
      'Unified interpretation across all systems',
    ],
    ctaText: 'See every layer of your chart',
    badge: 'Best Value',
    icon: '✦',
  },
  {
    id: 'know-yourself',
    title: 'The Integrated Profile',
    subtitle: 'Three systems, one clear picture of who you are',
    description: 'Your natal chart, BaZi, and Human Design layered together. For when you want deep self-understanding without the relocation component.',
    price: '$99',
    priceAmount: 9900,
    features: [
      'Full natal chart reading',
      'BaZi Four Pillars and element balance',
      'Human Design Type, Strategy, and Authority',
      'Cross-system personality insights',
    ],
    ctaText: 'See yourself from three angles',
    icon: '🔮',
  },
  {
    id: 'bazi',
    title: 'BaZi Reading',
    subtitle: 'Your destiny blueprint and timing',
    description: 'The Four Pillars of Destiny reveal your elemental makeup, natural strengths, and the timing of key life phases. Ancient Chinese wisdom applied to your modern life.',
    price: '$50',
    priceAmount: 5000,
    features: [
      'Four Pillars breakdown with Day Master analysis',
      'Five Elements balance and strength assessment',
      'Favorable elements, colours, and directions',
      'Timing insights for career and relationships',
    ],
    ctaText: 'Reveal your timing blueprint',
    icon: '🌳',
  },
  {
    id: 'astrocartography',
    title: 'Relocation Report',
    subtitle: 'Find the city where everything clicks',
    description: 'Your birth chart mapped across the globe. Discover which cities activate career breakthroughs, love, and personal transformation based on your planetary lines.',
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
    id: 'human-design',
    title: 'Human Design Reading',
    subtitle: 'How you\'re designed to make decisions',
    description: 'Your Type, Strategy, and Authority decoded. Understand how you\'re built to interact with the world, make decisions, and use your energy correctly.',
    price: '$35',
    priceAmount: 3500,
    features: [
      'Type, Strategy, and Authority explained',
      'Profile and Incarnation Cross',
      'Defined and undefined centres',
      'Practical guidance for daily life',
    ],
    ctaText: 'Decode how you\'re wired',
    icon: '⚛️',
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
