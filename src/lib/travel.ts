// Curated destinations for each planetary line
// Excludes: Ukraine, Russia, Syria, Yemen, Sudan, South Sudan, Myanmar, Libya, Somalia,
// Afghanistan, Iraq, North Korea, Iran, Venezuela, Haiti, Central African Republic,
// Mali, Burkina Faso, Niger, Ethiopia, Pakistan, Lebanon

export interface Destination {
  city: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
}

// Sun Line - Confidence & Identity
export const sunDestinations: Destination[] = [
  { city: 'Los Angeles', country: 'USA', lat: 34.05, lng: -118.24, description: 'A city that celebrates self-expression and reinvention. Here, your confidence could find its stage—whether in creative pursuits or simply in how you carry yourself through sun-drenched days.' },
  { city: 'Barcelona', country: 'Spain', lat: 41.39, lng: 2.17, description: 'Where art and identity merge on every corner. This city encourages you to be boldly yourself, surrounded by Gaudí\'s defiant architecture and Mediterranean light.' },
  { city: 'Dubai', country: 'UAE', lat: 25.20, lng: 55.27, description: 'A city built on ambition and vision. Your Sun line here suggests a place where you could step into a bigger version of yourself, surrounded by those who dream large.' },
  { city: 'Sydney', country: 'Australia', lat: -33.87, lng: 151.21, description: 'Bright, confident, and unapologetically itself. Sydney\'s energy could amplify your sense of self, helping you shine in ways you haven\'t yet discovered.' },
  { city: 'Milan', country: 'Italy', lat: 45.46, lng: 9.19, description: 'Where personal style becomes identity. Milan could help you refine how you present yourself to the world—polished, intentional, unmistakably you.' },
  { city: 'Rio de Janeiro', country: 'Brazil', lat: -22.91, lng: -43.17, description: 'A city that celebrates life loudly and joyfully. Your confidence could flourish here, where self-expression is not just accepted but expected.' },
  { city: 'Cape Town', country: 'South Africa', lat: -33.93, lng: 18.42, description: 'Where nature\'s grandeur meets human resilience. This dramatic landscape could help you connect with your own inner strength and presence.' },
  { city: 'Monaco', country: 'Monaco', lat: 43.74, lng: 7.42, description: 'Small but impossibly glamorous. Monaco\'s energy could help you step into a more confident, polished version of yourself.' },
  { city: 'Singapore', country: 'Singapore', lat: 1.35, lng: 103.82, description: 'Efficient, modern, and forward-thinking. Singapore could help you organize your sense of self into something clean and purposeful.' },
  { city: 'Marrakech', country: 'Morocco', lat: 31.63, lng: -8.01, description: 'A city of sensory richness and ancient confidence. Here you might discover parts of your identity that everyday life keeps hidden.' },
  { city: 'Nashville', country: 'USA', lat: 36.16, lng: -86.78, description: 'Where authentic self-expression is the currency. Nashville could help you find your voice and the confidence to use it.' },
  { city: 'Gold Coast', country: 'Australia', lat: -28.02, lng: 153.43, description: 'Sun-soaked and laid-back confident. A place where you could settle into a more relaxed but equally assured sense of self.' },
  { city: 'Cannes', country: 'France', lat: 43.55, lng: 7.02, description: 'Where being seen is an art form. Cannes could help you become more comfortable in the spotlight, more at ease with visibility.' },
  { city: 'Tel Aviv', country: 'Israel', lat: 32.08, lng: 34.78, description: 'Creative, bold, and unapologetically modern. Tel Aviv\'s entrepreneurial energy could fuel your confidence in new directions.' },
  { city: 'Miami', country: 'USA', lat: 25.76, lng: -80.19, description: 'Vibrant, diverse, and always performing. Miami\'s energy could help you embrace the more colorful, confident parts of your personality.' },
];

// Jupiter Line - Luck & Career
export const jupiterDestinations: Destination[] = [
  { city: 'New York', country: 'USA', lat: 40.71, lng: -74.01, description: 'The city of opportunity, where ambition meets chance. Your Jupiter line suggests luck could find you here—in unexpected meetings, open doors, and the right place at the right time.' },
  { city: 'London', country: 'UK', lat: 51.51, lng: -0.13, description: 'A global crossroads where careers are made. Jupiter here suggests expansion through connections, institutions, and the kind of luck that looks like preparation meeting opportunity.' },
  { city: 'Tokyo', country: 'Japan', lat: 35.68, lng: 139.69, description: 'Where precision meets possibility. Your Jupiter line in Tokyo suggests career growth through mastery—luck that comes from being exceptionally good at what you do.' },
  { city: 'Hong Kong', country: 'Hong Kong', lat: 22.32, lng: 114.17, description: 'A city built on commerce and chance. Jupiter here suggests financial luck and career opportunities that could exceed your expectations.' },
  { city: 'Zurich', country: 'Switzerland', lat: 47.37, lng: 8.54, description: 'Where stability and opportunity coexist. Your Jupiter line suggests luck through solid foundations—career growth that compounds over time.' },
  { city: 'San Francisco', country: 'USA', lat: 37.77, lng: -122.42, description: 'Where innovation creates luck. Jupiter here suggests you could be in the right place when the next big thing emerges.' },
  { city: 'Berlin', country: 'Germany', lat: 52.52, lng: 13.41, description: 'A city of reinvention and creative opportunity. Jupiter suggests luck through unconventional paths—success that doesn\'t look like everyone else\'s.' },
  { city: 'Toronto', country: 'Canada', lat: 43.65, lng: -79.38, description: 'Stable, diverse, and full of quiet opportunity. Your Jupiter line here suggests steady career growth and the luck of being in a place that rewards reliability.' },
  { city: 'Amsterdam', country: 'Netherlands', lat: 52.37, lng: 4.90, description: 'Where progressive thinking creates opportunity. Jupiter here suggests luck through being ahead of the curve, in a city that values innovation.' },
  { city: 'Seoul', country: 'South Korea', lat: 37.57, lng: 126.98, description: 'Dynamic and rapidly evolving. Your Jupiter line suggests riding waves of growth—luck that comes from being in a place on the rise.' },
  { city: 'Melbourne', country: 'Australia', lat: -37.81, lng: 144.96, description: 'Creative and commercially vibrant. Jupiter here suggests luck at the intersection of culture and commerce.' },
  { city: 'Stockholm', country: 'Sweden', lat: 59.33, lng: 18.07, description: 'Innovation capital of the Nordics. Your Jupiter line suggests luck through forward-thinking ventures and a culture that supports new ideas.' },
  { city: 'Dublin', country: 'Ireland', lat: 53.35, lng: -6.26, description: 'A tech hub with old soul. Jupiter suggests luck through the global connections that flow through this small but mighty city.' },
  { city: 'Shanghai', country: 'China', lat: 31.23, lng: 121.47, description: 'Where East meets West in commerce. Your Jupiter line suggests opportunities at a scale that might not exist elsewhere.' },
  { city: 'Austin', country: 'USA', lat: 30.27, lng: -97.74, description: 'Where creativity and tech collide. Jupiter here suggests luck in emerging industries and a culture that celebrates unconventional success.' },
];

// Venus Line - Love & Creativity
export const venusDestinations: Destination[] = [
  { city: 'Paris', country: 'France', lat: 48.86, lng: 2.35, description: 'The city of love needs no explanation. Your Venus line here suggests romance could find you in unexpected moments—a glance across a café, a conversation that changes everything.' },
  { city: 'Florence', country: 'Italy', lat: 43.77, lng: 11.25, description: 'Where beauty is a way of life. Venus here suggests your creativity could flourish, surrounded by centuries of artistic inspiration.' },
  { city: 'Buenos Aires', country: 'Argentina', lat: -34.60, lng: -58.38, description: 'Passionate, dramatic, and deeply romantic. Your Venus line suggests love that burns bright here—whether with a person or with life itself.' },
  { city: 'Kyoto', country: 'Japan', lat: 35.01, lng: 135.77, description: 'Where beauty lives in restraint. Venus here suggests a refined aesthetic sensibility emerging, and perhaps a love that grows slowly and deeply.' },
  { city: 'Lisbon', country: 'Portugal', lat: 38.72, lng: -9.14, description: 'Melancholic and beautiful. Your Venus line suggests creative inspiration born from longing, and love affairs tinged with sweet sadness.' },
  { city: 'Vienna', country: 'Austria', lat: 48.21, lng: 16.37, description: 'Where classical beauty still breathes. Venus here suggests romance through culture—love letters, concert halls, and coffee houses.' },
  { city: 'Havana', country: 'Cuba', lat: 23.11, lng: -82.37, description: 'Faded grandeur and irresistible rhythm. Your Venus line suggests love affairs that feel like time travel, creativity sparked by beautiful decay.' },
  { city: 'Prague', country: 'Czech Republic', lat: 50.08, lng: 14.44, description: 'A fairytale city that inspires romance. Venus here suggests the kind of love story you\'d read in a novel.' },
  { city: 'Santorini', country: 'Greece', lat: 36.39, lng: 25.46, description: 'Iconic beauty against impossible blue. Your Venus line suggests romance that feels destined, creativity that flows effortlessly.' },
  { city: 'Cartagena', country: 'Colombia', lat: 10.39, lng: -75.51, description: 'Colorful, warm, and deeply sensual. Venus here suggests opening to love in ways you might resist elsewhere.' },
  { city: 'Venice', country: 'Italy', lat: 45.44, lng: 12.32, description: 'Romance crystallized in stone and water. Your Venus line suggests love that feels impossible and inevitable at once.' },
  { city: 'Bruges', country: 'Belgium', lat: 51.21, lng: 3.22, description: 'Quietly beautiful, almost unbearably romantic. Venus suggests a slower, deeper kind of love blooming here.' },
  { city: 'Seville', country: 'Spain', lat: 37.39, lng: -6.00, description: 'Where passion is performed daily. Your Venus line suggests creative fire and love that announces itself boldly.' },
  { city: 'Jaipur', country: 'India', lat: 26.92, lng: 75.79, description: 'The pink city, opulent and romantic. Venus here suggests love that feels royal, creativity inspired by color and craft.' },
  { city: 'Charleston', country: 'USA', lat: 32.78, lng: -79.93, description: 'Southern charm crystallized. Your Venus line suggests romance with good manners, creativity rooted in tradition.' },
];

// Moon Line - Home & Comfort
export const moonDestinations: Destination[] = [
  { city: 'Copenhagen', country: 'Denmark', lat: 55.68, lng: 12.57, description: 'The birthplace of hygge. Your Moon line suggests deep comfort here—the kind of belonging that seeps into your bones over candlelit dinners and quiet evenings.' },
  { city: 'Vancouver', country: 'Canada', lat: 49.28, lng: -123.12, description: 'Where nature and city find balance. The Moon here suggests a place your nervous system could finally relax, surrounded by ocean and mountains.' },
  { city: 'Edinburgh', country: 'Scotland', lat: 55.95, lng: -3.19, description: 'Cozy despite the weather, perhaps because of it. Your Moon line suggests a place where solitude feels nourishing rather than lonely.' },
  { city: 'Queenstown', country: 'New Zealand', lat: -45.03, lng: 168.66, description: 'Dramatic beauty that somehow feels safe. The Moon here suggests a refuge—a place to process, heal, and eventually emerge renewed.' },
  { city: 'Reykjavik', country: 'Iceland', lat: 64.15, lng: -21.94, description: 'Stark, beautiful, and introspective. Your Moon line suggests deep emotional work happening here, in a landscape that doesn\'t let you hide.' },
  { city: 'Bruges', country: 'Belgium', lat: 51.21, lng: 3.22, description: 'Quietly preserved, almost suspended in time. The Moon here suggests comfort in tradition, in things that stay the same.' },
  { city: 'Kyoto', country: 'Japan', lat: 35.01, lng: 135.77, description: 'Where ritual creates comfort. Your Moon line suggests finding home in practices—tea ceremonies, temple visits, the rhythm of seasons.' },
  { city: 'Porto', country: 'Portugal', lat: 41.16, lng: -8.63, description: 'Unpretentious and welcoming. The Moon suggests a place where you could be accepted as you are, without performance.' },
  { city: 'Bergen', country: 'Norway', lat: 60.39, lng: 5.32, description: 'Cocooned by mountains and fjords. Your Moon line suggests safety in dramatic landscape—comfort in nature\'s embrace.' },
  { city: 'Hobart', country: 'Australia', lat: -42.88, lng: 147.33, description: 'At the edge of the world, deeply peaceful. The Moon here suggests the comfort of remoteness, of being far from everything.' },
  { city: 'Bath', country: 'UK', lat: 51.38, lng: -2.36, description: 'Built for relaxation, literally. Your Moon line suggests restoration—a place to heal what needs healing.' },
  { city: 'Salzburg', country: 'Austria', lat: 47.80, lng: 13.04, description: 'Music and mountains in perfect proportion. The Moon suggests emotional nourishment through beauty and culture.' },
  { city: 'Victoria', country: 'Canada', lat: 48.43, lng: -123.37, description: 'English gardens on the Pacific. Your Moon line suggests a gentle landing place—comfort without compromise.' },
  { city: 'Galway', country: 'Ireland', lat: 53.27, lng: -9.05, description: 'Where strangers become friends over pints. The Moon suggests belonging through warmth, through the simple act of showing up.' },
  { city: 'Chiang Mai', country: 'Thailand', lat: 18.79, lng: 98.98, description: 'Slow, spiritual, and welcoming to seekers. Your Moon line suggests a place to retreat, reflect, and find unexpected comfort.' },
];

// Mercury Line - Communication & Learning
export const mercuryDestinations: Destination[] = [
  { city: 'Oxford', country: 'UK', lat: 51.75, lng: -1.25, description: 'Where knowledge lives in the stones themselves. Your Mercury line suggests intellectual awakening here—ideas that could reshape how you think.' },
  { city: 'Boston', country: 'USA', lat: 42.36, lng: -71.06, description: 'Academia meets innovation. Mercury here suggests your mind could sharpen through discourse, through being surrounded by people who think for a living.' },
  { city: 'Cairo', country: 'Egypt', lat: 30.04, lng: 31.24, description: 'Where ancient wisdom still echoes. Your Mercury line suggests learning that goes deep—understanding that changes you.' },
  { city: 'Athens', country: 'Greece', lat: 37.98, lng: 23.73, description: 'The birthplace of Western philosophy. Mercury here suggests grappling with big questions, in a place where they were first asked.' },
  { city: 'Fez', country: 'Morocco', lat: 34.03, lng: -5.00, description: 'Home to the world\'s oldest university. Your Mercury line suggests ancient knowledge finding you through unexpected channels.' },
  { city: 'Cambridge', country: 'UK', lat: 52.21, lng: 0.12, description: 'Rigorous, beautiful, and slightly intimidating. Mercury suggests you could rise to intellectual challenges you\'d avoid elsewhere.' },
  { city: 'Heidelberg', country: 'Germany', lat: 49.40, lng: 8.69, description: 'Romantic and scholarly at once. Your Mercury line suggests ideas that come through beauty, learning that feels like pleasure.' },
  { city: 'Varanasi', country: 'India', lat: 25.32, lng: 83.01, description: 'Where sacred knowledge has flowed for millennia. Mercury here suggests wisdom that can\'t be found in books.' },
  { city: 'Dublin', country: 'Ireland', lat: 53.35, lng: -6.26, description: 'Literary to its core. Your Mercury line suggests words finding you here—the right book, the right conversation, at the right time.' },
  { city: 'Cusco', country: 'Peru', lat: -13.53, lng: -71.97, description: 'Where Incan wisdom still whispers. Mercury suggests learning through experience, through places that predate your understanding.' },
  { city: 'Salamanca', country: 'Spain', lat: 40.97, lng: -5.66, description: 'Golden stone and golden knowledge. Your Mercury line suggests clarity coming through study, through immersion in learning.' },
  { city: 'Taipei', country: 'Taiwan', lat: 25.03, lng: 121.57, description: 'Where traditional and modern knowledge merge. Mercury suggests bridging worlds, translating between ways of thinking.' },
  { city: 'Leuven', country: 'Belgium', lat: 50.88, lng: 4.70, description: 'A university town that breathes scholarship. Your Mercury line suggests focused learning in a place built for it.' },
  { city: 'Kathmandu', country: 'Nepal', lat: 27.72, lng: 85.32, description: 'Where Eastern philosophy is lived, not just studied. Mercury suggests understanding that comes through presence.' },
  { city: 'Santa Fe', country: 'USA', lat: 35.69, lng: -105.94, description: 'Where creativity and spirituality intersect. Your Mercury line suggests learning through art, through beauty, through experience.' },
];

// Calculate destination based on birth date, time, and category
export function calculateDestination(
  birthDate: Date,
  birthTime: string | undefined,
  category: 'sun' | 'jupiter' | 'venus' | 'moon' | 'mercury'
): Destination {
  // Create a seed from birth date and time
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth();
  const day = birthDate.getDate();

  let hourSeed = 12; // default if no time
  if (birthTime) {
    const [hour, minute] = birthTime.split(':').map(Number);
    hourSeed = hour + (minute / 60);
  }

  // Create a deterministic seed
  const seed = (year * 365 + month * 31 + day) * 24 + hourSeed;

  // Get the appropriate destination list
  const destinations = {
    sun: sunDestinations,
    jupiter: jupiterDestinations,
    venus: venusDestinations,
    moon: moonDestinations,
    mercury: mercuryDestinations,
  }[category];

  // Use seed to select destination (deterministic for same input)
  const index = Math.floor(seed * 7919) % destinations.length; // 7919 is a prime for better distribution

  return destinations[index];
}

// Category info
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
};
