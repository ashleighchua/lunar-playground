// Executive Summary Generation for Birth Report
// Creates personalized archetypes and synthesis based on Big Three

type ZodiacSign = 'Aries' | 'Taurus' | 'Gemini' | 'Cancer' | 'Leo' | 'Virgo' |
                  'Libra' | 'Scorpio' | 'Sagittarius' | 'Capricorn' | 'Aquarius' | 'Pisces';

type Element = 'Fire' | 'Earth' | 'Air' | 'Water';

const signElements: Record<ZodiacSign, Element> = {
  Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
  Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
  Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
  Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water',
};

const signModalities: Record<ZodiacSign, 'Cardinal' | 'Fixed' | 'Mutable'> = {
  Aries: 'Cardinal', Cancer: 'Cardinal', Libra: 'Cardinal', Capricorn: 'Cardinal',
  Taurus: 'Fixed', Leo: 'Fixed', Scorpio: 'Fixed', Aquarius: 'Fixed',
  Gemini: 'Mutable', Virgo: 'Mutable', Sagittarius: 'Mutable', Pisces: 'Mutable',
};

// Core essence keywords for each sign
const signEssence: Record<ZodiacSign, { noun: string; verb: string; quality: string }> = {
  Aries: { noun: 'Pioneer', verb: 'initiate', quality: 'bold' },
  Taurus: { noun: 'Builder', verb: 'cultivate', quality: 'steady' },
  Gemini: { noun: 'Messenger', verb: 'connect', quality: 'curious' },
  Cancer: { noun: 'Nurturer', verb: 'protect', quality: 'intuitive' },
  Leo: { noun: 'Creator', verb: 'illuminate', quality: 'magnetic' },
  Virgo: { noun: 'Analyst', verb: 'refine', quality: 'discerning' },
  Libra: { noun: 'Harmonizer', verb: 'balance', quality: 'diplomatic' },
  Scorpio: { noun: 'Transformer', verb: 'penetrate', quality: 'intense' },
  Sagittarius: { noun: 'Explorer', verb: 'expand', quality: 'visionary' },
  Capricorn: { noun: 'Architect', verb: 'structure', quality: 'determined' },
  Aquarius: { noun: 'Innovator', verb: 'revolutionize', quality: 'original' },
  Pisces: { noun: 'Mystic', verb: 'transcend', quality: 'empathic' },
};

// Archetype combinations based on Sun-Moon pairs
const archetypes: Record<string, string> = {
  // Fire Sun combinations
  'Aries-Aries': 'The Fearless Initiator',
  'Aries-Taurus': 'The Grounded Warrior',
  'Aries-Gemini': 'The Quick Strategist',
  'Aries-Cancer': 'The Protective Champion',
  'Aries-Leo': 'The Bold Leader',
  'Aries-Virgo': 'The Precise Pioneer',
  'Aries-Libra': 'The Diplomatic Trailblazer',
  'Aries-Scorpio': 'The Intense Catalyst',
  'Aries-Sagittarius': 'The Adventurous Firestarter',
  'Aries-Capricorn': 'The Ambitious Achiever',
  'Aries-Aquarius': 'The Revolutionary Pioneer',
  'Aries-Pisces': 'The Intuitive Warrior',

  'Leo-Aries': 'The Radiant Trailblazer',
  'Leo-Taurus': 'The Luxurious Creator',
  'Leo-Gemini': 'The Charismatic Storyteller',
  'Leo-Cancer': 'The Nurturing Performer',
  'Leo-Leo': 'The Magnetic Luminary',
  'Leo-Virgo': 'The Refined Artist',
  'Leo-Libra': 'The Graceful Star',
  'Leo-Scorpio': 'The Powerful Presence',
  'Leo-Sagittarius': 'The Expansive Visionary',
  'Leo-Capricorn': 'The Dignified Leader',
  'Leo-Aquarius': 'The Progressive Luminary',
  'Leo-Pisces': 'The Compassionate Creator',

  'Sagittarius-Aries': 'The Fearless Explorer',
  'Sagittarius-Taurus': 'The Grounded Philosopher',
  'Sagittarius-Gemini': 'The Eternal Student',
  'Sagittarius-Cancer': 'The Nurturing Sage',
  'Sagittarius-Leo': 'The Inspiring Visionary',
  'Sagittarius-Virgo': 'The Practical Idealist',
  'Sagittarius-Libra': 'The Diplomatic Explorer',
  'Sagittarius-Scorpio': 'The Truth Seeker',
  'Sagittarius-Sagittarius': 'The Boundless Adventurer',
  'Sagittarius-Capricorn': 'The Ambitious Philosopher',
  'Sagittarius-Aquarius': 'The Visionary Revolutionary',
  'Sagittarius-Pisces': 'The Spiritual Wanderer',

  // Earth Sun combinations
  'Taurus-Aries': 'The Dynamic Builder',
  'Taurus-Taurus': 'The Steadfast Guardian',
  'Taurus-Gemini': 'The Curious Craftsperson',
  'Taurus-Cancer': 'The Devoted Nurturer',
  'Taurus-Leo': 'The Generous Provider',
  'Taurus-Virgo': 'The Meticulous Artisan',
  'Taurus-Libra': 'The Aesthetic Curator',
  'Taurus-Scorpio': 'The Intense Sensualist',
  'Taurus-Sagittarius': 'The Grounded Adventurer',
  'Taurus-Capricorn': 'The Patient Achiever',
  'Taurus-Aquarius': 'The Unconventional Builder',
  'Taurus-Pisces': 'The Gentle Artist',

  'Virgo-Aries': 'The Efficient Pioneer',
  'Virgo-Taurus': 'The Practical Perfectionist',
  'Virgo-Gemini': 'The Analytical Communicator',
  'Virgo-Cancer': 'The Caring Analyst',
  'Virgo-Leo': 'The Refined Performer',
  'Virgo-Virgo': 'The Master Craftsperson',
  'Virgo-Libra': 'The Diplomatic Perfectionist',
  'Virgo-Scorpio': 'The Penetrating Analyst',
  'Virgo-Sagittarius': 'The Practical Philosopher',
  'Virgo-Capricorn': 'The Strategic Achiever',
  'Virgo-Aquarius': 'The Systematic Innovator',
  'Virgo-Pisces': 'The Intuitive Healer',

  'Capricorn-Aries': 'The Ambitious Pioneer',
  'Capricorn-Taurus': 'The Patient Empire Builder',
  'Capricorn-Gemini': 'The Strategic Communicator',
  'Capricorn-Cancer': 'The Protective Provider',
  'Capricorn-Leo': 'The Dignified Authority',
  'Capricorn-Virgo': 'The Methodical Master',
  'Capricorn-Libra': 'The Diplomatic Executive',
  'Capricorn-Scorpio': 'The Powerful Strategist',
  'Capricorn-Sagittarius': 'The Visionary Builder',
  'Capricorn-Capricorn': 'The Determined Architect',
  'Capricorn-Aquarius': 'The Progressive Leader',
  'Capricorn-Pisces': 'The Intuitive Executive',

  // Air Sun combinations
  'Gemini-Aries': 'The Quick-Witted Pioneer',
  'Gemini-Taurus': 'The Grounded Communicator',
  'Gemini-Gemini': 'The Mercurial Messenger',
  'Gemini-Cancer': 'The Empathic Storyteller',
  'Gemini-Leo': 'The Charismatic Entertainer',
  'Gemini-Virgo': 'The Analytical Writer',
  'Gemini-Libra': 'The Diplomatic Conversationalist',
  'Gemini-Scorpio': 'The Probing Investigator',
  'Gemini-Sagittarius': 'The Philosophical Wanderer',
  'Gemini-Capricorn': 'The Strategic Thinker',
  'Gemini-Aquarius': 'The Inventive Mind',
  'Gemini-Pisces': 'The Imaginative Dreamer',

  'Libra-Aries': 'The Diplomatic Warrior',
  'Libra-Taurus': 'The Aesthetic Connoisseur',
  'Libra-Gemini': 'The Social Butterfly',
  'Libra-Cancer': 'The Nurturing Partner',
  'Libra-Leo': 'The Graceful Host',
  'Libra-Virgo': 'The Refined Perfectionist',
  'Libra-Libra': 'The Consummate Diplomat',
  'Libra-Scorpio': 'The Strategic Peacemaker',
  'Libra-Sagittarius': 'The Philosophical Romantic',
  'Libra-Capricorn': 'The Ambitious Mediator',
  'Libra-Aquarius': 'The Humanitarian Artist',
  'Libra-Pisces': 'The Romantic Idealist',

  'Aquarius-Aries': 'The Revolutionary Activist',
  'Aquarius-Taurus': 'The Grounded Innovator',
  'Aquarius-Gemini': 'The Brilliant Networker',
  'Aquarius-Cancer': 'The Nurturing Visionary',
  'Aquarius-Leo': 'The Magnetic Rebel',
  'Aquarius-Virgo': 'The Systematic Reformer',
  'Aquarius-Libra': 'The Social Architect',
  'Aquarius-Scorpio': 'The Transformative Visionary',
  'Aquarius-Sagittarius': 'The Freedom Philosopher',
  'Aquarius-Capricorn': 'The Pragmatic Revolutionary',
  'Aquarius-Aquarius': 'The Original Thinker',
  'Aquarius-Pisces': 'The Mystical Humanitarian',

  // Water Sun combinations
  'Cancer-Aries': 'The Protective Warrior',
  'Cancer-Taurus': 'The Devoted Caretaker',
  'Cancer-Gemini': 'The Emotionally Intelligent Communicator',
  'Cancer-Cancer': 'The Deep Nurturer',
  'Cancer-Leo': 'The Generous Guardian',
  'Cancer-Virgo': 'The Caring Perfectionist',
  'Cancer-Libra': 'The Harmonious Nurturer',
  'Cancer-Scorpio': 'The Intensely Protective',
  'Cancer-Sagittarius': 'The Adventurous Homebody',
  'Cancer-Capricorn': 'The Ambitious Caretaker',
  'Cancer-Aquarius': 'The Humanitarian Protector',
  'Cancer-Pisces': 'The Deeply Intuitive',

  'Scorpio-Aries': 'The Powerful Catalyst',
  'Scorpio-Taurus': 'The Sensual Investigator',
  'Scorpio-Gemini': 'The Probing Communicator',
  'Scorpio-Cancer': 'The Emotionally Intense',
  'Scorpio-Leo': 'The Magnetic Transformer',
  'Scorpio-Virgo': 'The Analytical Detective',
  'Scorpio-Libra': 'The Strategic Diplomat',
  'Scorpio-Scorpio': 'The Profound Transformer',
  'Scorpio-Sagittarius': 'The Seeking Truth-Teller',
  'Scorpio-Capricorn': 'The Powerful Executive',
  'Scorpio-Aquarius': 'The Revolutionary Transformer',
  'Scorpio-Pisces': 'The Mystical Depth-Seeker',

  'Pisces-Aries': 'The Intuitive Initiator',
  'Pisces-Taurus': 'The Grounded Dreamer',
  'Pisces-Gemini': 'The Imaginative Messenger',
  'Pisces-Cancer': 'The Empathic Healer',
  'Pisces-Leo': 'The Creative Visionary',
  'Pisces-Virgo': 'The Practical Mystic',
  'Pisces-Libra': 'The Romantic Idealist',
  'Pisces-Scorpio': 'The Psychic Transformer',
  'Pisces-Sagittarius': 'The Spiritual Explorer',
  'Pisces-Capricorn': 'The Ambitious Dreamer',
  'Pisces-Aquarius': 'The Visionary Humanitarian',
  'Pisces-Pisces': 'The Boundless Empath',
};

export function getArchetype(sunSign: string, moonSign: string | null): string {
  if (!moonSign) {
    // Fallback to Sun-only archetype
    const essence = signEssence[sunSign as ZodiacSign];
    return essence ? `The ${essence.quality.charAt(0).toUpperCase() + essence.quality.slice(1)} ${essence.noun}` : 'Your Unique Blueprint';
  }

  const key = `${sunSign}-${moonSign}`;
  return archetypes[key] || `The ${signEssence[sunSign as ZodiacSign]?.noun || 'Seeker'}`;
}

export function getElementBalance(sunSign: string, moonSign: string | null, risingSign: string | null): {
  dominant: Element | null;
  balance: Record<Element, number>;
  description: string;
} {
  const balance: Record<Element, number> = { Fire: 0, Earth: 0, Air: 0, Water: 0 };

  if (sunSign && signElements[sunSign as ZodiacSign]) {
    balance[signElements[sunSign as ZodiacSign]] += 2; // Sun weighted more
  }
  if (moonSign && signElements[moonSign as ZodiacSign]) {
    balance[signElements[moonSign as ZodiacSign]] += 1.5;
  }
  if (risingSign && signElements[risingSign as ZodiacSign]) {
    balance[signElements[risingSign as ZodiacSign]] += 1;
  }

  const total = Object.values(balance).reduce((a, b) => a + b, 0);
  const sorted = Object.entries(balance).sort((a, b) => b[1] - a[1]);
  const dominant = sorted[0][1] > 0 ? sorted[0][0] as Element : null;

  // Calculate percentages
  const percentages = Object.fromEntries(
    Object.entries(balance).map(([k, v]) => [k, total > 0 ? Math.round((v / total) * 100) : 0])
  ) as Record<Element, number>;

  let description = '';
  if (dominant) {
    const dominantPercent = percentages[dominant];
    if (dominantPercent >= 60) {
      description = `Strongly ${dominant.toLowerCase()}-dominant`;
    } else if (dominantPercent >= 40) {
      description = `${dominant}-leaning with balance`;
    } else {
      description = 'Elementally balanced';
    }
  }

  return { dominant, balance: percentages, description };
}

export function generateSynthesis(
  sunSign: string,
  moonSign: string | null,
  risingSign: string | null
): string {
  const sunEssence = signEssence[sunSign as ZodiacSign];

  if (!sunEssence) return '';

  if (!moonSign && !risingSign) {
    // Sun only
    return `At your core, you're driven to ${sunEssence.verb}. Your ${sunEssence.quality} nature shapes how you approach life's challenges and opportunities. This is your foundation—the rest builds from here.`;
  }

  if (!moonSign || !risingSign) {
    // Partial data
    const otherSign = moonSign || risingSign;
    const otherEssence = signEssence[otherSign as ZodiacSign];
    if (otherEssence) {
      return `Your ${sunEssence.quality} core meets a ${otherEssence.quality} inner world, creating a dynamic interplay between your drive to ${sunEssence.verb} and your need to ${otherEssence.verb}. Add your birth time for the complete picture.`;
    }
  }

  // Full Big Three
  const moonEssence = signEssence[moonSign as ZodiacSign];
  const risingEssence = signEssence[risingSign as ZodiacSign];

  if (!moonEssence || !risingEssence) return '';

  // Check for harmony or tension
  const sunElement = signElements[sunSign as ZodiacSign];
  const moonElement = signElements[moonSign as ZodiacSign];
  const risingElement = signElements[risingSign as ZodiacSign];

  const compatibleElements: Record<Element, Element[]> = {
    Fire: ['Fire', 'Air'],
    Earth: ['Earth', 'Water'],
    Air: ['Air', 'Fire'],
    Water: ['Water', 'Earth'],
  };

  const sunMoonHarmony = compatibleElements[sunElement]?.includes(moonElement);
  const sunRisingHarmony = compatibleElements[sunElement]?.includes(risingElement);

  if (sunMoonHarmony && sunRisingHarmony) {
    return `Your three core placements flow together naturally. The ${sunEssence.quality} identity you're building finds emotional support from your ${moonEssence.quality} inner world, while your ${risingEssence.quality} presence gives others an authentic glimpse of who you are. When you're in alignment, there's an ease to how you move through the world.`;
  } else if (!sunMoonHarmony && !sunRisingHarmony) {
    return `Your three core placements create productive tension. Your ${sunEssence.quality} drive to ${sunEssence.verb} meets a ${moonEssence.quality} emotional landscape and a ${risingEssence.quality} outer presence—each pulling in different directions. This isn't a flaw; it's range. You contain multitudes, and learning to honor each part is your ongoing work.`;
  } else {
    return `Your chart holds both harmony and creative tension. Your ${sunEssence.quality} core ${sunMoonHarmony ? 'resonates with' : 'challenges'} your ${moonEssence.quality} inner world, while your ${risingEssence.quality} presence ${sunRisingHarmony ? 'reflects' : 'contrasts with'} your deeper nature. This complexity gives you flexibility—you can adapt to many situations while staying true to yourself.`;
  }
}

export function getQuickStats(
  sunSign: string,
  moonSign: string | null,
  risingSign: string | null
): { label: string; value: string }[] {
  const stats: { label: string; value: string }[] = [];

  // Element balance
  const elements = getElementBalance(sunSign, moonSign, risingSign);
  if (elements.dominant) {
    stats.push({ label: 'Dominant Element', value: elements.dominant });
  }

  // Modality
  const modalities: Record<string, number> = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  if (sunSign) modalities[signModalities[sunSign as ZodiacSign]] += 2;
  if (moonSign) modalities[signModalities[moonSign as ZodiacSign]] += 1.5;
  if (risingSign) modalities[signModalities[risingSign as ZodiacSign]] += 1;

  const dominantModality = Object.entries(modalities).sort((a, b) => b[1] - a[1])[0];
  if (dominantModality[1] > 0) {
    stats.push({ label: 'Primary Mode', value: dominantModality[0] });
  }

  return stats;
}

// Sign population percentages (approximate)
export const signPopulation: Record<ZodiacSign, number> = {
  Aries: 8.1,
  Taurus: 8.3,
  Gemini: 8.5,
  Cancer: 8.6,
  Leo: 8.5,
  Virgo: 8.7,
  Libra: 8.4,
  Scorpio: 8.2,
  Sagittarius: 8.1,
  Capricorn: 8.0,
  Aquarius: 7.9,
  Pisces: 8.7,
};

export function getRarityContext(sunSign: string, moonSign: string | null): string {
  const sunPercent = signPopulation[sunSign as ZodiacSign] || 8.3;

  if (!moonSign) {
    return `About ${sunPercent}% of people share your Sun sign.`;
  }

  const moonPercent = signPopulation[moonSign as ZodiacSign] || 8.3;
  const combinedPercent = ((sunPercent / 100) * (moonPercent / 100) * 100).toFixed(2);

  if (parseFloat(combinedPercent) < 0.6) {
    return `Your Sun-Moon combination is relatively uncommon—roughly ${combinedPercent}% of people share it.`;
  } else if (parseFloat(combinedPercent) < 0.75) {
    return `About ${combinedPercent}% of people share your Sun-Moon combination.`;
  } else {
    return `Your Sun-Moon combination is fairly common, shared by about ${combinedPercent}% of people.`;
  }
}
