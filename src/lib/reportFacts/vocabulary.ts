/**
 * The single source of truth for every token the LLM narrative layer (Phase 4)
 * is allowed to assert as a fact. Facts payloads are built from this
 * vocabulary; the grounding verifier checks generated prose against it.
 * Keeping both on one registry means they can't silently drift apart.
 */

export const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
] as const;
export type PlanetName = (typeof PLANETS)[number];

export const SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
] as const;
export type SignName = (typeof SIGNS)[number];

export const ANGLES = ['MC', 'IC', 'AC', 'DC'] as const;
export type AngleName = (typeof ANGLES)[number];

export const HOUSES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;
export type HouseNumber = (typeof HOUSES)[number];

export const THEME_NAMES = [
  'love', 'career', 'luck', 'transformation', 'home', 'communication', 'adventure',
] as const;
export type ThemeToken = (typeof THEME_NAMES)[number];

export function isPlanet(value: string): value is PlanetName {
  return (PLANETS as readonly string[]).includes(value);
}

export function isSign(value: string): value is SignName {
  return (SIGNS as readonly string[]).includes(value);
}

export function isAngle(value: string): value is AngleName {
  return (ANGLES as readonly string[]).includes(value);
}

export function isHouse(value: number): value is HouseNumber {
  return Number.isInteger(value) && value >= 1 && value <= 12;
}

/**
 * Phrasing the model is likely to use for an angle or house that isn't the
 * literal vocabulary token — normalized before the grounding verifier compares
 * prose against a facts payload, so "tenth house" / "10th house" / "house 10" /
 * "career house" are all treated as the same claim rather than as unmatched
 * (and therefore rejected) text.
 *
 * Keys are normalized (lowercased) phrases. House values are deliberately
 * `HOUSE_<n>` rather than a bare number — the verifier must never confuse an
 * arbitrary digit in the prose ("3 things to know") with a house-number claim;
 * only text that matched one of these explicit phrases produces a house token.
 */
export const SYNONYMS: Record<string, string> = {
  'midheaven': 'MC',
  'medium coeli': 'MC',
  'imum coeli': 'IC',
  'nadir': 'IC',
  'ascendant': 'AC',
  'rising': 'AC',
  'descendant': 'DC',
  'first house': 'HOUSE_1', '1st house': 'HOUSE_1', 'house 1': 'HOUSE_1',
  'second house': 'HOUSE_2', '2nd house': 'HOUSE_2', 'house 2': 'HOUSE_2',
  'third house': 'HOUSE_3', '3rd house': 'HOUSE_3', 'house 3': 'HOUSE_3',
  'fourth house': 'HOUSE_4', '4th house': 'HOUSE_4', 'house 4': 'HOUSE_4', 'home house': 'HOUSE_4',
  'fifth house': 'HOUSE_5', '5th house': 'HOUSE_5', 'house 5': 'HOUSE_5',
  'sixth house': 'HOUSE_6', '6th house': 'HOUSE_6', 'house 6': 'HOUSE_6',
  'seventh house': 'HOUSE_7', '7th house': 'HOUSE_7', 'house 7': 'HOUSE_7',
  'eighth house': 'HOUSE_8', '8th house': 'HOUSE_8', 'house 8': 'HOUSE_8',
  'ninth house': 'HOUSE_9', '9th house': 'HOUSE_9', 'house 9': 'HOUSE_9',
  'tenth house': 'HOUSE_10', '10th house': 'HOUSE_10', 'house 10': 'HOUSE_10', 'career house': 'HOUSE_10',
  'eleventh house': 'HOUSE_11', '11th house': 'HOUSE_11', 'house 11': 'HOUSE_11',
  'twelfth house': 'HOUSE_12', '12th house': 'HOUSE_12', 'house 12': 'HOUSE_12',
};

/**
 * Purely stylistic astrological adjectives — never fact-claims on their own,
 * so the grounding verifier must not flag them as unbacked mentions of a
 * planet. ("Your mercurial energy" isn't a claim that Mercury is anywhere in
 * particular; "Venus in your 7th house" is.)
 */
export const STYLISTIC_ADJECTIVES = [
  'solar', 'lunar', 'mercurial', 'venusian', 'martial',
  'jovial', 'saturnine', 'uranian', 'neptunian', 'plutonian',
] as const;
