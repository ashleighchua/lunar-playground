/**
 * Brief character descriptions for major cities.
 * Used on the astrocartography result page to give context about the destination.
 */

const cityCharacters: Record<string, string> = {
  // Asia
  'Tokyo': 'A city of quiet precision and creative extremes. Ancient temples sit beside neon-lit streets. Known for its food culture, fashion, and a pace that somehow feels both fast and meditative.',
  'Shanghai': 'Where tradition meets ambition. A skyline that reinvents itself constantly, with a thriving arts scene, international energy, and deep cultural roots along the Bund.',
  'Beijing': 'China\'s cultural heart. Centuries of history layered beneath modern ambition. Known for its imperial architecture, creative underground, and a pace that demands presence.',
  'Seoul': 'A city that runs on creative energy. From K-culture to street food markets, Seoul blends hyper-modern design with deep tradition. Fast, stylish, and endlessly interesting.',
  'Bangkok': 'Warm, chaotic, generous. Bangkok rewards those who slow down and look closely. Known for its food, temples, and a nightlife that doesn\'t follow rules.',
  'Singapore': 'Immaculate and multicultural. A small island with outsized ambition. Known for world-class food, green architecture, and a blend of Malay, Chinese, and Indian culture.',
  'Hong Kong': 'Vertical, electric, relentless. A city where East meets West at full speed. Known for its harbor views, dim sum, and an energy that never quite settles.',
  'Taipei': 'Warm, creative, and quietly confident. Night markets, mountain hikes, and some of the best food in Asia. A city that doesn\'t try too hard and wins you over anyway.',
  'Osaka': 'Japan\'s kitchen and comedy capital. Warmer and more direct than Tokyo. Known for street food, an irreverent sense of humor, and a local pride that\'s infectious.',
  'Mumbai': 'Intense, creative, and bursting with life. Bollywood, street food, colonial architecture, and an energy that can be overwhelming and addictive in equal measure.',
  'Delhi': 'Layers of empire and reinvention. Old Delhi\'s chaos meets New Delhi\'s grand avenues. Known for its food, monuments, and a complexity that rewards patience.',
  'Bangalore': 'India\'s tech hub with a garden city soul. Known for its startup culture, craft beer scene, pleasant climate, and a young, progressive energy.',
  'Jakarta': 'Massive, sprawling, and full of surprises. Indonesia\'s capital blends Javanese culture with modern ambition. Known for its food markets and entrepreneurial spirit.',
  'Ho Chi Minh City': 'Fast, warm, and endlessly entrepreneurial. Motorbike-filled streets hide French colonial charm, incredible food, and a forward-looking energy.',
  'Hanoi': 'Poetic and layered. Lakes, temples, and narrow streets filled with the aroma of pho. Slower than Saigon, with a literary, contemplative quality.',
  'Phnom Penh': 'A city rebuilding with grace. French colonial architecture, riverside calm, and a growing creative scene. Quieter and more reflective than its neighbors.',

  // Europe
  'London': 'A city of reinvention. World-class museums, theatre, and parks. Known for its diversity, dry humor, and the way it makes you feel like anything is possible.',
  'Paris': 'Beauty as a way of life. Every street corner is composed. Known for its food, fashion, and a particular quality of light that artists have chased for centuries.',
  'Berlin': 'Raw, creative, and unapologetically itself. A city shaped by history that refuses to stand still. Known for its nightlife, art scene, and affordable creative space.',
  'Rome': 'Every stone has a story. Ancient ruins next to espresso bars. Known for its food, beauty, and a pace of life that insists you slow down and enjoy.',
  'Madrid': 'Warm, late-night, and full of life. Art, tapas, and plazas that come alive after dark. Known for its museums, passion, and a social energy that\'s hard to leave.',
  'Vienna': 'Elegant and intellectual. Coffee houses, classical music, and a quiet grandeur. Known for its architecture, pastry, and a cultural sophistication that feels effortless.',
  'Istanbul': 'Where continents meet. Mosques, bazaars, and the Bosphorus. A city of contrasts that has been inspiring travelers and artists for thousands of years.',
  'St. Petersburg': 'Russia\'s cultural jewel. Canals, palaces, and white nights. Known for its museums, ballet, and a melancholic beauty that gets under your skin.',
  'Bucharest': 'Gritty charm and rapid change. Art deco buildings beside communist blocks. Known for its nightlife, creativity, and an underdog energy that\'s appealing.',

  // Americas
  'New York': 'The city that sets the pace. Art, ambition, and an energy that can make or break you. Known for its diversity, drive, and the feeling that you\'re at the center of everything.',
  'Los Angeles': 'Sun-drenched and sprawling. Where the creative industry lives. Known for its beaches, hiking trails, and a laid-back intensity that\'s uniquely its own.',
  'Chicago': 'Bold architecture and deep roots. Jazz, blues, and a lakefront that rivals any coastline. Known for its food scene, neighborhoods, and midwestern warmth.',
  'Houston': 'Diverse, sprawling, and quietly powerful. NASA, world-class medical centers, and a food scene shaped by dozens of cultures.',
  'Toronto': 'Multicultural and understated. A city that works well and doesn\'t brag about it. Known for its neighborhoods, food diversity, and creative communities.',
  'Mexico City': 'Ancient and avant-garde. World-class museums, street food, and a creative energy that rivals any global capital. Altitude, color, and depth.',
  'Sao Paulo': 'South America\'s creative and financial engine. Concrete jungle with incredible food, art, and nightlife. A city that rewards exploration.',
  'Rio de Janeiro': 'Dramatic beauty between mountains and sea. Known for its beaches, music, and a joy of living that\'s visible everywhere.',
  'Buenos Aires': 'Tango, steak, and intellectual charm. European architecture with Latin soul. Known for its bookshops, cafe culture, and passionate conversations.',
  'Lima': 'The gastronomic capital of South America. Colonial history meets Pacific coastline. Known for its ceviche, creativity, and a cultural renaissance.',
  'Bogota': 'High altitude, high energy. Street art, emerald mountains, and a city transforming itself. Known for its coffee, music, and creative resilience.',
  'Santiago': 'Modern and mountain-backed. Wine country at your doorstep. Known for its food scene, outdoor access, and a pragmatic optimism.',
  'Medellin': 'Reinvention incarnate. Eternal spring weather, innovation, and a warmth that\'s genuine. Known for its transformation, nature, and creative communities.',

  // Africa
  'Lagos': 'West Africa\'s creative powerhouse. Afrobeats, Nollywood, and an entrepreneurial energy that\'s infectious. Intense, vibrant, and impossible to ignore.',
  'Nairobi': 'East Africa\'s hub. Safari at the doorstep, tech innovation in the city. Known for its national parks, coffee, and a growing creative scene.',
  'Johannesburg': 'Gold-built and rapidly evolving. A complex city with world-class art, food, and a resilience forged through history.',
  'Cairo': 'Where civilization began telling its story. The pyramids, the Nile, and a modern city of 20 million. Ancient wonder layered with contemporary chaos.',
  'Casablanca': 'Morocco\'s economic heart. Art deco architecture, Atlantic coastline, and a cosmopolitan energy that bridges Africa and Europe.',
  'Accra': 'Ghana\'s coastal capital. Growing fast with a creative scene, beach culture, and a welcoming energy that draws people back.',

  // Oceania
  'Sydney': 'Harbor city with global ambition. Known for its beaches, opera house, and a outdoor lifestyle that blends surf culture with sophistication.',
  'Melbourne': 'Australia\'s cultural capital. Coffee, street art, and a creative scene that punches above its weight. Known for its laneways, food, and four-seasons-in-a-day weather.',
  'Brisbane': 'Warm, relaxed, and quietly growing. River city with a subtropical vibe. Known for its outdoor lifestyle, proximity to nature, and a friendly ease.',
  'Perth': 'Isolated and beautiful. Indian Ocean sunsets, wine country, and a pace that lets you breathe. Known for its beaches, clean air, and a creative community that thrives in solitude.',

  // Middle East
  'Dubai': 'Ambition built in the desert. Futuristic skyline, luxury shopping, and a multicultural energy. Known for its architecture, beach life, and a relentless drive to be the biggest.',
  'Riyadh': 'Saudi Arabia\'s rapidly opening capital. Ancient history meets modern vision. Known for its transformation, desert landscapes, and growing cultural scene.',
  'Amman': 'Jordan\'s thoughtful capital. Hilltop views, Roman ruins, and a gentleness that\'s increasingly rare. Known for its hospitality, food, and proximity to Petra.',

  // Central Asia / Others
  'Almaty': 'Kazakhstan\'s mountain city. Apple orchards, Soviet architecture, and Tian Shan peaks. Known for its natural beauty, bazaars, and a frontier energy.',
  'Tashkent': 'Uzbekistan\'s modernizing capital. Silk Road heritage beneath Soviet-era buildings. Known for its bazaars, bread, and a quiet cultural renaissance.',
  'Baku': 'Where old meets futuristic on the Caspian Sea. Flame towers, ancient walled city, and an oil-fueled ambition. Known for its architecture and unique East-West blend.',
};

export function getCityCharacter(cityName: string): string | null {
  return cityCharacters[cityName] ?? null;
}
