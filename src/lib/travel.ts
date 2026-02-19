export interface Destination {
  city: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
}

// Category info for astrocartography UI
export const categoryInfo = {
  sun: {
    name: 'Sun Line',
    title: 'Career & Identity',
    symbol: '☉',
    description: 'The city where you step into your power. Where your career ignites and people see the real you.',
  },
  jupiter: {
    name: 'Jupiter Line',
    title: 'Growth & Abundance',
    symbol: '♃',
    description: 'The city where opportunity won\'t stop knocking. Where luck compounds and your career takes off.',
  },
  venus: {
    name: 'Venus Line',
    title: 'Love & Connection',
    symbol: '♀',
    description: 'The city where love finds you. Where deep connection happens naturally and beauty surrounds you.',
  },
  moon: {
    name: 'Moon Line',
    title: 'Home & Belonging',
    symbol: '☽',
    description: 'The city where your soul exhales. Where you finally feel at home.',
  },
  mercury: {
    name: 'Mercury Line',
    title: 'Communication & Ideas',
    symbol: '☿',
    description: 'The city where your mind catches fire. Where ideas flow and the right people listen.',
  },
  mars: {
    name: 'Mars Line',
    title: 'Drive & Ambition',
    symbol: '♂',
    description: 'The city where your ambition has teeth. Where action creates real, tangible results.',
  },
};
