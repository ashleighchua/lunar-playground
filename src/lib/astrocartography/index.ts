/**
 * Astrocartography Calculator - Main Entry Point
 *
 * Calculates real astrocartography lines for a given birth chart
 * and finds the top city near the selected planetary line.
 */

import { toJulianDay, calculatePlanetEquatorial } from '../ephemeris';
import { calculatePlanetLines, type AstroLine } from './lineCalculator';
import { scoreCities, scoreCitiesForTheme, scoreCitiesForCombinedThemes, type CityData, type ScoredCity } from './cityScorer';
import { generateDescription, getInterpretation, getVision } from './interpretations';
import { LIFE_THEMES, THEME_LABELS, type ThemeName } from './themes';
import citiesData from '../../data/cities.json';

export interface LifeArea {
  category: string;
  label: string;
  strength: 'strong' | 'active' | 'present' | 'quiet';
  active: boolean; // true for the selected category
}

export interface AstrocartographyResult {
  city: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  planetLine: string; // e.g., "Venus DC"
  distanceMiles: number;
  interpretationTitle: string;
  interpretationShort: string;
  themes: string[];
  vision: string;
  strength: 'exact' | 'strong' | 'moderate'; // based on distance
  otherAngles: string[]; // other angles this planet activates in this city
  lifeAreas: LifeArea[];
}

// Map UI categories to planet names
const CATEGORY_PLANET: Record<string, string> = {
  sun: 'Sun',
  moon: 'Moon',
  mercury: 'Mercury',
  venus: 'Venus',
  mars: 'Mars',
  jupiter: 'Jupiter',
  saturn: 'Saturn',
  uranus: 'Uranus',
  neptune: 'Neptune',
  pluto: 'Pluto',
};

// Life area definitions (mapped to planet categories)
const LIFE_AREAS: { category: string; label: string }[] = [
  { category: 'venus', label: 'Love & Relationships' },
  { category: 'sun', label: 'Identity & Career' },
  { category: 'jupiter', label: 'Growth & Opportunity' },
  { category: 'moon', label: 'Home & Emotions' },
];

/**
 * Calculate astrocartography for a given birth data and category
 */
export function calculateAstrocartography(
  birthDate: Date,
  birthTime: string | undefined,
  timezone: number,
  category: string
): AstrocartographyResult | null {
  // Parse birth time
  let hour = 12; // default to noon if no time given
  let minute = 0;
  if (birthTime) {
    const parts = birthTime.split(':').map(Number);
    hour = parts[0];
    minute = parts[1] || 0;
  }

  // Convert to UTC
  const utcHour = hour + minute / 60 - timezone;

  // Calculate Julian Day
  const jd = toJulianDay(
    birthDate.getFullYear(),
    birthDate.getMonth() + 1,
    birthDate.getDate(),
    utcHour
  );

  // Get the planet name for this category
  const planetName = CATEGORY_PLANET[category];
  if (!planetName) return null;

  // Calculate the planet's true equatorial position (RA/Dec)
  const equatorial = calculatePlanetEquatorial(planetName, jd);

  // Calculate all 4 lines (MC, IC, AC, DC) for this planet
  const lines = calculatePlanetLines(planetName, equatorial, jd);

  // Score all cities against these lines
  const cities = citiesData as CityData[];
  const topCities = scoreCities(cities, lines, category, 1);

  if (topCities.length === 0) return null;

  const topCity = topCities[0];
  const best = topCity.bestActivation;

  if (!best) return null;

  // Generate description
  const description = generateDescription(
    best.planet,
    best.angle,
    topCity.name,
    topCity.country
  );

  // Get interpretation details
  const interp = getInterpretation(best.planet, best.angle);

  // Get themes and vision
  const themes = interp?.themes ?? [];
  const vision = getVision(best.planet, best.angle, topCity.name) ?? '';

  // Determine strength based on distance
  const strength: 'exact' | 'strong' | 'moderate' =
    best.distance <= 30 ? 'exact' :
    best.distance <= 100 ? 'strong' : 'moderate';

  // Collect other active angles for this city
  const otherAngles = topCity.lineActivations
    .filter(a => a.key !== best.key)
    .map(a => `${a.planet} ${a.angle}`);

  // Calculate life area scores for this city across all 4 planets
  const cityData: CityData = {
    name: topCity.name,
    country: topCity.country,
    lat: topCity.lat,
    lon: topCity.lon,
    population: 0,
  };

  const lifeAreas: LifeArea[] = LIFE_AREAS.map(({ category: cat, label }) => {
    const planet = CATEGORY_PLANET[cat];
    if (!planet) return { category: cat, label, strength: 'quiet' as const, active: cat === category };

    const eq = calculatePlanetEquatorial(planet, jd);
    const catLines = calculatePlanetLines(planet, eq, jd);
    const scored = scoreCities([cityData], catLines, cat, 1);
    const score = scored.length > 0 ? scored[0].totalScore : 0;

    const areaStrength: LifeArea['strength'] =
      score >= 0.7 ? 'strong' :
      score >= 0.3 ? 'active' :
      score > 0 ? 'present' : 'quiet';

    return { category: cat, label, strength: areaStrength, active: cat === category };
  });

  return {
    city: topCity.name,
    country: topCity.country,
    lat: topCity.lat,
    lng: topCity.lon,
    description,
    planetLine: `${best.planet} ${best.angle}`,
    distanceMiles: best.distance,
    interpretationTitle: interp?.title ?? '',
    interpretationShort: interp?.short ?? '',
    themes,
    vision,
    strength,
    otherAngles,
    lifeAreas,
  };
}

/**
 * Compute every supported planet's MC/IC/AC/DC lines for a birth chart in one
 * pass — the shared input for weighted multi-planet life-theme scoring, so a
 * theme blend never needs to recompute a planet's lines it already has.
 */
export function calculateAllPlanetLines(
  birthDate: Date,
  birthTime: string | undefined,
  timezone: number
): { lines: AstroLine[]; jd: number } {
  let hour = 12;
  let minute = 0;
  if (birthTime) {
    const parts = birthTime.split(':').map(Number);
    hour = parts[0];
    minute = parts[1] || 0;
  }
  const utcHour = hour + minute / 60 - timezone;
  const jd = toJulianDay(
    birthDate.getFullYear(),
    birthDate.getMonth() + 1,
    birthDate.getDate(),
    utcHour
  );

  const lines: AstroLine[] = [];
  for (const cat of Object.keys(CATEGORY_PLANET)) {
    const planetName = CATEGORY_PLANET[cat];
    const eq = calculatePlanetEquatorial(planetName, jd);
    lines.push(...calculatePlanetLines(planetName, eq, jd));
  }

  return { lines, jd };
}

export interface ThemedRelocationResult {
  perTheme: Partial<Record<ThemeName, ScoredCity[]>>;
  combined: ScoredCity[];
}

/**
 * Rank destination cities by customer-selected life themes (e.g. "love",
 * "career"), each a weighted blend of multiple planets' lines (see themes.ts)
 * rather than a single planet. Returns both each theme's own ranking and a
 * combined ranking across all selected themes.
 */
export function calculateThemedRelocation(
  birthDate: Date,
  birthTime: string | undefined,
  timezone: number,
  themeNames: ThemeName[],
  limit: number = 5
): ThemedRelocationResult {
  const { lines } = calculateAllPlanetLines(birthDate, birthTime, timezone);
  const cities = citiesData as CityData[];

  const perTheme: Partial<Record<ThemeName, ScoredCity[]>> = {};
  for (const themeName of themeNames) {
    perTheme[themeName] = scoreCitiesForTheme(cities, lines, LIFE_THEMES[themeName], limit);
  }

  const combined = scoreCitiesForCombinedThemes(
    cities,
    lines,
    themeNames.map((t) => LIFE_THEMES[t]),
    limit
  );

  return { perTheme, combined };
}

export { THEME_LABELS };
export type { ThemeName };
