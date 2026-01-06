/**
 * Moon phase calculation utilities
 * Based on the synodic month (lunar cycle) of approximately 29.53 days
 */

const LUNAR_CYCLE = 29.53058867; // Average length of lunar cycle in days

// Known new moon reference: December 20, 2025 at 01:43 UTC
const KNOWN_NEW_MOON = new Date(Date.UTC(2025, 11, 20, 1, 43, 0));

export interface MoonPhase {
  name: string;
  emoji: string;
  description: string;
  illumination: number;
  daysIntoCycle: number;
}

const moonPhaseData = [
  {
    name: 'New Moon',
    emoji: '🌑',
    description: 'You arrived in darkness, in potential. New moon souls carry the energy of beginnings—comfortable with uncertainty, drawn to starting fresh. There is something about you that knows how to wait, how to trust what cannot yet be seen.'
  },
  {
    name: 'Waxing Crescent',
    emoji: '🌒',
    description: 'You arrived as intention was taking shape. Waxing crescent souls are builders at heart—patient with process, trusting in gradual emergence. You understand that everything meaningful requires time to unfold.'
  },
  {
    name: 'First Quarter',
    emoji: '🌓',
    description: 'You arrived at a turning point. First quarter souls know how to push through resistance—action-oriented, willing to make the difficult choice. You were born into momentum, into the tension between what was and what is becoming.'
  },
  {
    name: 'Waxing Gibbous',
    emoji: '🌔',
    description: 'You arrived in refinement. Waxing gibbous souls are perfectionists in the best sense—devoted to craft, attentive to detail. You carry an instinct for improvement, for making things better than you found them.'
  },
  {
    name: 'Full Moon',
    emoji: '🌕',
    description: 'You arrived in fullness, in illumination. Full moon souls live in the spotlight—expressive, visible, unable to hide who they are. There is a brightness to you, a quality of being fully seen whether you wish it or not.'
  },
  {
    name: 'Waning Gibbous',
    emoji: '🌖',
    description: 'You arrived as sharing began. Waning gibbous souls are natural teachers—compelled to pass on what they have learned. You carry wisdom that wants to be given away, knowledge that grows by being offered.'
  },
  {
    name: 'Last Quarter',
    emoji: '🌗',
    description: 'You arrived at release. Last quarter souls understand endings—capable of letting go, clearing space for what comes next. You know, perhaps more than others, that completion is its own kind of beginning.'
  },
  {
    name: 'Waning Crescent',
    emoji: '🌘',
    description: 'You arrived in the final surrender. Waning crescent souls are the mystics—contemplative, intuitive, comfortable in the liminal. You were born in the space between, where endings become seeds.'
  },
];

/**
 * Calculate the moon phase for a given date
 */
export function getMoonPhase(date: Date): MoonPhase {
  // Calculate days since the known new moon
  const diffMs = date.getTime() - KNOWN_NEW_MOON.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Get position in current lunar cycle (0 to ~29.53)
  let daysIntoCycle = diffDays % LUNAR_CYCLE;
  if (daysIntoCycle < 0) {
    daysIntoCycle += LUNAR_CYCLE; // Handle dates before reference
  }

  // Calculate illumination percentage (0 at new moon, 100 at full moon)
  // Using a simple sinusoidal approximation
  const illumination = Math.round(
    (1 - Math.cos((daysIntoCycle / LUNAR_CYCLE) * 2 * Math.PI)) / 2 * 100
  );

  // Determine which of the 8 phases we're in
  // Each phase is roughly 3.69 days (29.53 / 8)
  // Offset by half a phase so phases are centered on their peak moments
  const phaseLength = LUNAR_CYCLE / 8;
  const adjustedDays = (daysIntoCycle + phaseLength / 2) % LUNAR_CYCLE;
  const phaseIndex = Math.floor(adjustedDays / phaseLength) % 8;

  const phase = moonPhaseData[phaseIndex];

  return {
    ...phase,
    illumination,
    daysIntoCycle: Math.round(daysIntoCycle * 10) / 10,
  };
}

/**
 * Get the current moon phase
 */
export function getCurrentMoonPhase(): MoonPhase {
  return getMoonPhase(new Date());
}

/**
 * Parse a date string (YYYY-MM-DD) and optional time (HH:MM) into a Date object
 */
export function parseBirthDateTime(dateStr: string, timeStr?: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number);

  if (timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
  }

  // Default to noon if no time provided
  return new Date(year, month - 1, day, 12, 0);
}

/**
 * Zodiac signs with date ranges
 */
const zodiacSigns = [
  { name: 'Capricorn', start: [12, 22], end: [1, 19] },
  { name: 'Aquarius', start: [1, 20], end: [2, 18] },
  { name: 'Pisces', start: [2, 19], end: [3, 20] },
  { name: 'Aries', start: [3, 21], end: [4, 19] },
  { name: 'Taurus', start: [4, 20], end: [5, 20] },
  { name: 'Gemini', start: [5, 21], end: [6, 20] },
  { name: 'Cancer', start: [6, 21], end: [7, 22] },
  { name: 'Leo', start: [7, 23], end: [8, 22] },
  { name: 'Virgo', start: [8, 23], end: [9, 22] },
  { name: 'Libra', start: [9, 23], end: [10, 22] },
  { name: 'Scorpio', start: [10, 23], end: [11, 21] },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21] },
];

export interface ZodiacSign {
  name: string;
  symbol: string;
  element: string;
  quality: string;
  description: string;
}

const zodiacDetails: Record<string, Omit<ZodiacSign, 'name'>> = {
  Aries: { symbol: '♈', element: 'Fire', quality: 'Cardinal', description: "Your core identity is forged in fire. You're here to initiate, to lead, to be first. There's a pioneering spirit in you that refuses to wait for permission. You learn by doing, sometimes leaping before you look—but that courage is exactly what allows you to begin things others only dream about. Your life force is strong, direct, and unapologetically bold." },
  Taurus: { symbol: '♉', element: 'Earth', quality: 'Fixed', description: "Your essence is rooted in the physical world—beauty, comfort, stability, and the slow cultivation of what matters. You're here to build things that last, to show others that patience is its own kind of power. Reliability isn't boring to you; it's a form of love. You understand that the best things take time." },
  Gemini: { symbol: '♊', element: 'Air', quality: 'Mutable', description: "Your spirit is curious, restless, endlessly hungry for new information and connections. You're here to learn, communicate, and weave ideas together in ways others can't see. Versatility is your gift—you contain multitudes and see no reason to be just one thing. Life is a conversation, and you want to have all of it." },
  Cancer: { symbol: '♋', element: 'Water', quality: 'Cardinal', description: "Your identity is tied to nurturing, protecting, and creating emotional safety—for yourself and those you love. You feel the undercurrents that others miss. Home isn't just a place for you; it's a feeling you carry and create. Your sensitivity is your strength, allowing you to care deeply in a world that often forgets how." },
  Leo: { symbol: '♌', element: 'Fire', quality: 'Fixed', description: "You're here to shine, create, and inspire. There's a natural radiance to your presence that draws others in. Generosity flows from you easily—you want everyone to feel as alive as you do. Your need for recognition isn't vanity; it's the honest desire to be seen for who you truly are. When you lead with your heart, you light up rooms." },
  Virgo: { symbol: '♍', element: 'Earth', quality: 'Mutable', description: "Your purpose is refinement—taking what exists and making it better, clearer, more useful. You notice what others overlook and find satisfaction in solving problems others didn't know they had. Service isn't beneath you; it's how you express love. Your analytical mind is a gift, though learning to quiet your inner critic is part of your journey." },
  Libra: { symbol: '♎', element: 'Air', quality: 'Cardinal', description: "You're here to create harmony, beauty, and balance. Relationships are your laboratory—you understand yourself through others and genuinely need partnership to feel complete. Fairness matters deeply to you, sometimes to the point of indecision. Your gift is seeing all sides, even when it makes choosing harder." },
  Scorpio: { symbol: '♏', element: 'Water', quality: 'Fixed', description: "Your identity runs deep. You're here to transform—yourself, situations, sometimes the people around you. Surface-level existence doesn't interest you; you want truth, even when it's uncomfortable. There's an intensity to your presence that some find magnetic and others find unsettling. You're not afraid of the dark, because you know that's where the real treasure is buried." },
  Sagittarius: { symbol: '♐', element: 'Fire', quality: 'Mutable', description: "Your spirit is expansive, optimistic, and perpetually aimed at the horizon. You're here to explore—places, ideas, philosophies, possibilities. Freedom isn't a luxury for you; it's oxygen. You teach others that life is an adventure meant to be embraced, that meaning is found in the journey itself." },
  Capricorn: { symbol: '♑', element: 'Earth', quality: 'Cardinal', description: "You're here to build, achieve, and leave something lasting behind. There's an old soul quality to you, a quiet determination that plays the long game. You understand that real success requires discipline, patience, and sometimes doing the unglamorous work. Your ambition isn't about ego—it's about proving what's possible through sustained effort." },
  Aquarius: { symbol: '♒', element: 'Air', quality: 'Fixed', description: "Your identity is tied to the collective, to progress, to what could be rather than what is. You're here to innovate and challenge the status quo. Independence matters fiercely to you—you need space to think your own thoughts and be your own person. You care deeply about humanity, sometimes more easily than individuals." },
  Pisces: { symbol: '♓', element: 'Water', quality: 'Mutable', description: "Your essence is boundless, empathic, and connected to something larger than the material world. You're here to dream, to heal, to remind others of the magic that exists beneath everyday life. Boundaries can be challenging because you feel everything so deeply. Your imagination is a doorway, and your compassion is medicine." },
};

/**
 * Chinese Zodiac animals and elements
 */
const chineseAnimals = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
];

const chineseElements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];

/**
 * Chinese New Year dates (month, day) for years 1900-2050
 * Source: Based on lunar calendar calculations
 */
const CHINESE_NEW_YEAR_DATES: Record<number, [number, number]> = {
  1900: [1, 31], 1901: [2, 19], 1902: [2, 8], 1903: [1, 29], 1904: [2, 16],
  1905: [2, 4], 1906: [1, 25], 1907: [2, 13], 1908: [2, 2], 1909: [1, 22],
  1910: [2, 10], 1911: [1, 30], 1912: [2, 18], 1913: [2, 6], 1914: [1, 26],
  1915: [2, 14], 1916: [2, 3], 1917: [1, 23], 1918: [2, 11], 1919: [2, 1],
  1920: [2, 20], 1921: [2, 8], 1922: [1, 28], 1923: [2, 16], 1924: [2, 5],
  1925: [1, 24], 1926: [2, 13], 1927: [2, 2], 1928: [1, 23], 1929: [2, 10],
  1930: [1, 30], 1931: [2, 17], 1932: [2, 6], 1933: [1, 26], 1934: [2, 14],
  1935: [2, 4], 1936: [1, 24], 1937: [2, 11], 1938: [1, 31], 1939: [2, 19],
  1940: [2, 8], 1941: [1, 27], 1942: [2, 15], 1943: [2, 5], 1944: [1, 25],
  1945: [2, 13], 1946: [2, 2], 1947: [1, 22], 1948: [2, 10], 1949: [1, 29],
  1950: [2, 17], 1951: [2, 6], 1952: [1, 27], 1953: [2, 14], 1954: [2, 3],
  1955: [1, 24], 1956: [2, 12], 1957: [1, 31], 1958: [2, 18], 1959: [2, 8],
  1960: [1, 28], 1961: [2, 15], 1962: [2, 5], 1963: [1, 25], 1964: [2, 13],
  1965: [2, 2], 1966: [1, 21], 1967: [2, 9], 1968: [1, 30], 1969: [2, 17],
  1970: [2, 6], 1971: [1, 27], 1972: [2, 15], 1973: [2, 3], 1974: [1, 23],
  1975: [2, 11], 1976: [1, 31], 1977: [2, 18], 1978: [2, 7], 1979: [1, 28],
  1980: [2, 16], 1981: [2, 5], 1982: [1, 25], 1983: [2, 13], 1984: [2, 2],
  1985: [2, 20], 1986: [2, 9], 1987: [1, 29], 1988: [2, 17], 1989: [2, 6],
  1990: [1, 27], 1991: [2, 15], 1992: [2, 4], 1993: [1, 23], 1994: [2, 10],
  1995: [1, 31], 1996: [2, 19], 1997: [2, 7], 1998: [1, 28], 1999: [2, 16],
  2000: [2, 5], 2001: [1, 24], 2002: [2, 12], 2003: [2, 1], 2004: [1, 22],
  2005: [2, 9], 2006: [1, 29], 2007: [2, 18], 2008: [2, 7], 2009: [1, 26],
  2010: [2, 14], 2011: [2, 3], 2012: [1, 23], 2013: [2, 10], 2014: [1, 31],
  2015: [2, 19], 2016: [2, 8], 2017: [1, 28], 2018: [2, 16], 2019: [2, 5],
  2020: [1, 25], 2021: [2, 12], 2022: [2, 1], 2023: [1, 22], 2024: [2, 10],
  2025: [1, 29], 2026: [2, 17], 2027: [2, 6], 2028: [1, 26], 2029: [2, 13],
  2030: [2, 3], 2031: [1, 23], 2032: [2, 11], 2033: [1, 31], 2034: [2, 19],
  2035: [2, 8], 2036: [1, 28], 2037: [2, 15], 2038: [2, 4], 2039: [1, 24],
  2040: [2, 12], 2041: [2, 1], 2042: [1, 22], 2043: [2, 10], 2044: [1, 30],
  2045: [2, 17], 2046: [2, 6], 2047: [1, 26], 2048: [2, 14], 2049: [2, 2],
  2050: [1, 23],
};

/**
 * Get the Chinese lunar year for a given date
 * Takes into account the actual Chinese New Year date
 */
function getChineseLunarYear(date: Date): number {
  const gregorianYear = date.getFullYear();
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  // Get Chinese New Year date for this Gregorian year
  const cnyDate = CHINESE_NEW_YEAR_DATES[gregorianYear];

  if (!cnyDate) {
    // Fallback for years not in our table
    // Assume CNY is around Feb 5
    if (month < 2 || (month === 2 && day < 5)) {
      return gregorianYear - 1;
    }
    return gregorianYear;
  }

  const [cnyMonth, cnyDay] = cnyDate;

  // If the date is before Chinese New Year, it belongs to the previous lunar year
  if (month < cnyMonth || (month === cnyMonth && day < cnyDay)) {
    return gregorianYear - 1;
  }

  return gregorianYear;
}

const animalEmojis: Record<string, string> = {
  Rat: '🐀', Ox: '🐂', Tiger: '🐅', Rabbit: '🐇', Dragon: '🐉', Snake: '🐍',
  Horse: '🐴', Goat: '🐐', Monkey: '🐵', Rooster: '🐓', Dog: '🐕', Pig: '🐷'
};

const animalTraits: Record<string, string> = {
  Rat: "You're naturally resourceful with quick instincts that help you navigate any situation. There's a charm about you that draws people in, and your ability to spot opportunities before others makes you naturally successful. You think fast, adapt quickly, and know how to make the most of what you have. Beneath that clever exterior is genuine ambition—you're always working toward something.",
  Ox: "You're the definition of quiet strength. While others rush and burn out, you understand that real achievement comes from steady, patient effort. People trust you instinctively because you're reliable in ways few others are. You may be stubborn, but that same determination means when you commit to something, you see it through. Your presence is grounding for everyone around you.",
  Tiger: "There's something magnetic about your energy—you walk into rooms and people notice. You're naturally courageous, willing to take risks that make others hesitate. Leadership isn't something you try to do; it's just how you're built. Your confidence can be intimidating, but beneath it is a protective nature. You fight for what you believe in and inspire others to do the same.",
  Rabbit: "You move through life with a natural elegance that others admire. Your sensitivity isn't weakness—it's what allows you to create beauty and maintain peace in your environment. You have impeccable taste and a diplomatic nature that smooths over conflicts. There's a quiet wisdom to you; you observe more than you speak and understand more than you let on.",
  Dragon: "You're meant for big things and you know it. There's an energy about you that's hard to ignore—charismatic, bold, and larger than life. Luck seems to follow you, but it's really your confidence that creates opportunities. You dream big and have the drive to actually achieve those dreams. People are drawn to your fire, your vision, your refusal to think small.",
  Snake: "Your mind runs deep. You're naturally intuitive, often understanding situations and people before anything is said. There's a sophisticated, almost mysterious quality about you—you reveal yourself slowly and selectively. You're drawn to life's deeper questions and aren't satisfied with surface answers. When you move, it's deliberate. When you speak, it matters.",
  Horse: "Freedom isn't a preference for you; it's a necessity. You need space to run, to explore, to follow your energy wherever it leads. There's an enthusiasm in you that's infectious—your passion for life makes others want to join your adventures. You're independent and sometimes impatient, but that same fire makes you exciting to be around. You live fully.",
  Goat: "You have a rich inner world that others rarely get to see fully. Creativity flows naturally from you, whether in art, ideas, or how you arrange your life. You're deeply empathetic—sometimes absorbing others' emotions without meaning to. You need beauty and peace around you to thrive. Your gentle nature isn't weakness; it's what allows you to create and connect in ways others can't.",
  Monkey: "Your mind is quick and endlessly curious. You solve problems with creative approaches others don't think of, and you bring lightness wherever you go. Boredom is your enemy—you need stimulation, variety, and new challenges. There's a playful trickster quality about you that can be mischievous, but it comes from genuine wit and intelligence. Life with you is never dull.",
  Rooster: "You notice everything. Your observant nature catches details others miss, and your standards—for yourself and others—are high. You're hardworking and take pride in doing things well. There's an honesty to you that can be blunt, but people respect that you say what you mean. Your confidence is earned through real effort, and you're not afraid to show what you've accomplished.",
  Dog: "Loyalty is your defining trait—when you commit to someone, you're there through everything. You have a strong moral compass and can't look away from injustice. People feel safe with you because you're genuinely protective of those you love. You may worry more than others, but that's because you care deeply. Your friendship is rare and valuable; you don't give it lightly.",
  Pig: "You approach life with genuine warmth and generosity. There's a sincerity about you that people find refreshing—what they see is what they get. You know how to enjoy life's pleasures without guilt and bring that same appreciation to relationships. You're more intelligent than your easygoing nature suggests; you just don't feel the need to prove it. Your kindness creates real connections."
};

const elementTraits: Record<string, string> = {
  Wood: "Your element adds a generous, growth-oriented quality to your nature. You're naturally ethical and principled, with an expansive vision that sees possibilities others miss. Wood energy makes you benevolent and community-minded—you want to grow and help others grow alongside you. There's a natural idealism here, a belief that things can always improve.",
  Fire: "Your element adds passion and dynamism to everything you do. Fire energy makes you naturally warm, enthusiastic, and magnetic. You lead without trying, drawing others toward your vision through sheer energy. There's urgency in how you approach life—you want to experience everything fully and inspire others to do the same. Your presence ignites rooms.",
  Earth: "Your element gives you a grounded, stabilizing quality that others depend on. Earth energy makes you practical, patient, and nurturing. You build things that last because you understand the value of solid foundations. There's wisdom in your approach—you don't rush, you don't panic, you simply do what needs to be done. People trust your steadiness.",
  Metal: "Your element adds determination and clarity to your character. Metal energy makes you focused, disciplined, and unwavering once you've set a goal. There's refinement here—you value quality over quantity and have high standards. You can be unyielding, but that same strength means you can cut through obstacles that stop others. Your resolve is formidable.",
  Water: "Your element adds depth, intuition, and adaptability to your nature. Water energy makes you perceptive—you sense undercurrents and understand unspoken things. You flow around obstacles rather than fighting them, which makes you remarkably resilient. There's creativity and emotional intelligence here; you connect with people on levels others can't reach."
};

export interface ChineseZodiac {
  animal: string;
  element: string;
  emoji: string;
  animalDescription: string;
  elementDescription: string;
  yinYang: 'Yin' | 'Yang';
}

/**
 * Get Chinese Zodiac for a given date
 * Uses the actual Chinese lunar year based on Chinese New Year dates
 */
export function getChineseZodiac(date: Date): ChineseZodiac {
  // Get the Chinese lunar year (accounts for CNY date)
  const lunarYear = getChineseLunarYear(date);

  // 1984 is Year of the Wood Rat (index 0 for both animal and element cycle start)
  const animalIndex = (lunarYear - 1984) % 12;
  const normalizedAnimalIndex = animalIndex < 0 ? animalIndex + 12 : animalIndex;

  // Elements cycle every 2 years, 5 elements total = 10 year cycle
  const elementIndex = Math.floor(((lunarYear - 1984) % 10) / 2);
  const normalizedElementIndex = elementIndex < 0 ? elementIndex + 5 : elementIndex;

  const animal = chineseAnimals[normalizedAnimalIndex];
  const element = chineseElements[normalizedElementIndex];

  // Yin/Yang alternates by year (even years are Yang, odd years are Yin)
  const yinYang = lunarYear % 2 === 0 ? 'Yang' : 'Yin';

  return {
    animal,
    element,
    emoji: animalEmojis[animal],
    animalDescription: animalTraits[animal],
    elementDescription: elementTraits[element],
    yinYang,
  };
}

/**
 * Life Path Number calculation
 */
export interface LifePathNumber {
  number: number;
  isMasterNumber: boolean;
  description: string;
}

const lifePathDescriptions: Record<number, string> = {
  1: "You're here to lead, to pioneer, to forge paths that didn't exist before. Independence isn't just a preference—it's essential to who you are. You have original ideas and the courage to pursue them, even when you're standing alone. Your journey involves learning to trust your own direction while staying open to others. When you lead from authenticity rather than ego, you inspire everyone around you.",
  2: "You're here to connect, to harmonize, to bring people together. You sense the subtle dynamics in any room and know instinctively how to create peace. Partnership is where you thrive—not from dependency, but because you understand that collaboration creates more than any individual can alone. Your journey involves valuing your own needs as much as others' and trusting your remarkable intuition.",
  3: "You're here to express, to create, to bring joy into the world. There's an artist in you regardless of your profession—you communicate in ways that touch people. Optimism comes naturally, and your enthusiasm is contagious. Your journey involves taking your creative gifts seriously and learning that your voice matters. When you share authentically, you give others permission to do the same.",
  4: "You're here to build, to create structures that endure, to turn vision into reality through patient effort. There's nothing glamorous about your path, but there's deep satisfaction in it. You understand that lasting achievement requires discipline, process, and showing up every day. Your journey involves finding freedom within structure and learning that your steady presence is exactly what the world needs.",
  5: "You're here to experience everything—change, adventure, freedom in all its forms. Routine feels like slow death to you; you need variety, stimulation, and room to explore. You're naturally versatile, able to adapt to almost any situation. Your journey involves learning that freedom comes with responsibility and that some commitments actually enhance rather than limit your life.",
  6: "You're here to nurture, to create beauty, to take responsibility for the wellbeing of others. Home and family are central to your life, whether biological or chosen. You have high standards because you care deeply about doing things right. Your journey involves learning to care for yourself as generously as you care for others, and accepting that imperfection is part of love.",
  7: "You're here to seek truth, to dive beneath the surface, to understand what others take for granted. You need solitude and space to think—your inner world is rich and requires attention. Spirituality or philosophy often calls to you, whether through traditional paths or your own exploration. Your journey involves trusting your analytical gifts while staying open to mysteries that can't be fully explained.",
  8: "You're here to master the material world—to achieve, to build power, to demonstrate what's possible through focused effort. Abundance is your birthright when you align your ambition with integrity. You understand success requires strategy and discipline. Your journey involves wielding power responsibly and learning that true achievement includes giving back.",
  9: "You're here to serve something larger than yourself. You see the big picture naturally—how everything connects, what humanity needs. Compassion runs deep in you, sometimes painfully so. Creative and wise, you have gifts to share with the world. Your journey involves releasing attachments to personal outcomes and trusting that giving freely returns to you in unexpected ways.",
  11: "You carry heightened spiritual awareness and intuition that can feel like both gift and burden. You're here to illuminate, to inspire, to channel insights that help others awaken. Your sensitivity is extraordinary—you pick up on energies and truths invisible to most. Your journey involves grounding your spiritual gifts in practical reality and trusting your inner knowing even when it defies logic.",
  22: "You have the rare ability to turn visionary dreams into concrete reality. You're here to build something significant—not just for yourself, but for the collective good. Your potential is enormous, which means your challenges are too. You combine spiritual insight with practical mastery. Your journey involves stepping into your full power without being overwhelmed by it.",
  33: "You carry the energy of the master teacher—here to uplift humanity through compassionate wisdom. Your capacity for unconditional love is extraordinary, though the path to expressing it isn't easy. You're called to heal, to guide, to serve at the highest level. Your journey involves embodying the love you teach and accepting that your influence ripples far beyond what you can see.",
};

/**
 * Calculate Life Path Number from birth date
 */
export function getLifePathNumber(date: Date): LifePathNumber {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Reduce each component first
  const reduceToDigit = (num: number): number => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = String(num).split('').reduce((sum, d) => sum + parseInt(d), 0);
    }
    return num;
  };

  const yearReduced = reduceToDigit(year);
  const monthReduced = reduceToDigit(month);
  const dayReduced = reduceToDigit(day);

  let total = yearReduced + monthReduced + dayReduced;

  // Check for master numbers before final reduction
  if (total === 11 || total === 22 || total === 33) {
    return {
      number: total,
      isMasterNumber: true,
      description: lifePathDescriptions[total],
    };
  }

  // Final reduction
  const finalNumber = reduceToDigit(total);

  return {
    number: finalNumber,
    isMasterNumber: false,
    description: lifePathDescriptions[finalNumber],
  };
}

/**
 * Get the sun sign for a given date
 */
export function getSunSign(date: Date): ZodiacSign {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();

  let signName = 'Capricorn'; // Default

  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.start;
    const [endMonth, endDay] = sign.end;

    // Handle Capricorn which spans year boundary
    if (sign.name === 'Capricorn') {
      if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
        signName = 'Capricorn';
        break;
      }
    } else {
      if (
        (month === startMonth && day >= startDay) ||
        (month === endMonth && day <= endDay)
      ) {
        signName = sign.name;
        break;
      }
    }
  }

  return {
    name: signName,
    ...zodiacDetails[signName],
  };
}
