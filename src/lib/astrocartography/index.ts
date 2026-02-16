/**
 * Astrocartography Calculator - Main Entry Point
 *
 * Calculates real astrocartography lines for a given birth chart
 * and finds the top city near the selected planetary line.
 */

import {
  toJulianDay,
  calculateSunLongitude,
  calculateMoonLongitude,
  calculateMercuryLongitude,
  calculateVenusLongitude,
  calculateMarsLongitude,
  calculateJupiterLongitude,
} from '../ephemeris';
import { calculatePlanetLines } from './lineCalculator';
import { scoreCities, type CityData } from './cityScorer';
import { generateDescription, getInterpretation, getVision } from './interpretations';
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
};

// Life area definitions (mapped to planet categories)
const LIFE_AREAS: { category: string; label: string }[] = [
  { category: 'venus', label: 'Love & Relationships' },
  { category: 'sun', label: 'Identity & Career' },
  { category: 'jupiter', label: 'Growth & Opportunity' },
  { category: 'moon', label: 'Home & Emotions' },
];

// Map UI categories to planet longitude calculation functions
const PLANET_CALCULATORS: Record<string, (jd: number) => number> = {
  sun: calculateSunLongitude,
  moon: calculateMoonLongitude,
  mercury: calculateMercuryLongitude,
  venus: calculateVenusLongitude,
  mars: calculateMarsLongitude,
  jupiter: calculateJupiterLongitude,
};

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

  // Get the planet calculator for this category
  const calcFn = PLANET_CALCULATORS[category];
  const planetName = CATEGORY_PLANET[category];
  if (!calcFn || !planetName) return null;

  // Calculate the planet's ecliptic longitude
  const planetLongitude = calcFn(jd);

  // Calculate all 4 lines (MC, IC, AC, DC) for this planet
  const lines = calculatePlanetLines(planetName, planetLongitude, jd);

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
    const fn = PLANET_CALCULATORS[cat];
    const planet = CATEGORY_PLANET[cat];
    if (!fn || !planet) return { category: cat, label, strength: 'quiet' as const, active: cat === category };

    const lon = fn(jd);
    const catLines = calculatePlanetLines(planet, lon, jd);
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
