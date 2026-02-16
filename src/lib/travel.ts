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
    title: 'Confidence & Identity',
    symbol: '☉',
    description: 'Places where you feel most yourself, where your natural confidence shines.',
  },
  jupiter: {
    name: 'Jupiter Line',
    title: 'Luck & Career',
    symbol: '♃',
    description: 'Places where opportunity finds you, where fortune favors your endeavors.',
  },
  venus: {
    name: 'Venus Line',
    title: 'Love & Creativity',
    symbol: '♀',
    description: 'Places where beauty calls to you, where romance and art intertwine.',
  },
  moon: {
    name: 'Moon Line',
    title: 'Home & Comfort',
    symbol: '☽',
    description: 'Places where your soul feels at rest, where belonging comes naturally.',
  },
  mercury: {
    name: 'Mercury Line',
    title: 'Communication & Learning',
    symbol: '☿',
    description: 'Places where your mind comes alive, where ideas flow freely.',
  },
  mars: {
    name: 'Mars Line',
    title: 'Energy & Drive',
    symbol: '♂',
    description: 'Places where your ambition ignites, where action creates results.',
  },
};
