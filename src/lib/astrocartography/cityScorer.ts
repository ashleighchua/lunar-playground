/**
 * City Scoring Algorithm for Astrocartography
 * Ported from CityScorer.php
 *
 * Scores cities based on proximity to planetary lines.
 */

import type { AstroLine } from './lineCalculator';

export interface CityData {
  name: string;
  country: string;
  lat: number;
  lon: number;
  population: number;
}

export interface LineActivation {
  planet: string;
  angle: string;
  distance: number; // miles
  score: number;
  key: string; // e.g., "Venus_DC"
}

export interface ScoredCity extends CityData {
  totalScore: number;
  activationCount: number;
  lineActivations: LineActivation[];
  bestActivation: LineActivation | null;
}

// Planet weights for scoring
const PLANET_WEIGHTS: Record<string, number> = {
  Sun: 1.0,
  Moon: 0.95,
  Venus: 0.9,
  Jupiter: 0.9,
  Mars: 0.8,
  Saturn: 0.75,
  Mercury: 0.6,
};

// Angle weights
const ANGLE_WEIGHTS: Record<string, number> = {
  MC: 1.0,
  AC: 0.95,
  DC: 0.85,
  IC: 0.75,
};

// Category to preferred angle mapping (for boosting relevant results)
const CATEGORY_ANGLE_BOOSTS: Record<string, Record<string, number>> = {
  sun: { MC: 0.2, AC: 0.15 },
  jupiter: { MC: 0.2 },
  venus: { DC: 0.2, AC: 0.15 },
  moon: { IC: 0.2, DC: 0.15 },
  mercury: { MC: 0.15, AC: 0.15 },
  mars: { MC: 0.2, AC: 0.15 },
};

const MAX_ORB_MILES = 300;
const BONUS_ORB_MILES = 50;
const MILES_PER_DEGREE = 69;

const DEG_TO_RAD = Math.PI / 180;

/**
 * Calculate longitude difference handling wrap-around
 */
function longitudeDifference(lon1: number, lon2: number): number {
  let diff = Math.abs(lon1 - lon2);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

/**
 * Calculate angular distance between two points (simplified spherical approximation)
 */
function angularDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const latDiff = lat1 - lat2;
  const lonDiff = longitudeDifference(lon1, lon2);
  const avgLat = (lat1 + lat2) / 2;
  const lonDiffAdjusted = lonDiff * Math.cos(avgLat * DEG_TO_RAD);
  return Math.sqrt(latDiff * latDiff + lonDiffAdjusted * lonDiffAdjusted);
}

/**
 * Point to line segment distance in degrees
 */
function pointToSegmentDistance(
  px: number, py: number,
  x1: number, y1: number,
  x2: number, y2: number
): number {
  const dx = x2 - x1;
  const dy = y2 - y1;

  if (dx === 0 && dy === 0) {
    const lonDiff = longitudeDifference(py, y1);
    const cosLat = Math.cos(px * DEG_TO_RAD);
    return Math.sqrt((px - x1) ** 2 + (lonDiff * cosLat) ** 2);
  }

  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy)));
  const nearestX = x1 + t * dx;
  const nearestY = y1 + t * dy;

  let lonDiff = Math.abs(py - nearestY);
  if (lonDiff > 180) lonDiff = 360 - lonDiff;

  const cosLat = Math.cos(px * DEG_TO_RAD);
  return Math.sqrt((px - nearestX) ** 2 + (lonDiff * cosLat) ** 2);
}

/**
 * Calculate distance from a point to a line in degrees
 */
function distanceToLine(lat: number, lon: number, line: AstroLine): number {
  const { points, angle } = line;

  if (points.length === 0) return Infinity;

  // For MC/IC lines (vertical meridians), distance is longitude-based
  if (angle === 'MC' || angle === 'IC') {
    const lineLon = points[0].lon;
    return longitudeDifference(lon, lineLon);
  }

  // For AC/DC lines (curved), find closest point on curve
  let minDistance = Infinity;

  // First pass: check nearby points
  for (const point of points) {
    if (Math.abs(point.lat - lat) > 10) continue;
    const dist = angularDistance(lat, lon, point.lat, point.lon);
    minDistance = Math.min(minDistance, dist);
  }

  // Interpolation pass for segments
  if (minDistance === Infinity) {
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      if (lat >= Math.min(p1.lat, p2.lat) && lat <= Math.max(p1.lat, p2.lat)) {
        const t = (lat - p1.lat) / (p2.lat - p1.lat);
        const interpolatedLon = p1.lon + t * (p2.lon - p1.lon);
        const dist = longitudeDifference(lon, interpolatedLon);
        minDistance = Math.min(minDistance, dist);
      }
    }
  }

  // Also do segment-based check for accuracy
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    if (Math.abs(p1.lat - lat) > 15 && Math.abs(p2.lat - lat) > 15) continue;

    const dist = pointToSegmentDistance(lat, lon, p1.lat, p1.lon, p2.lat, p2.lon);
    minDistance = Math.min(minDistance, dist);
  }

  return minDistance === Infinity ? 999 : minDistance;
}

/**
 * Score a single city against a set of planetary lines
 */
function scoreCity(
  city: CityData,
  lines: AstroLine[],
  category: string
): ScoredCity {
  const lineActivations: LineActivation[] = [];
  let totalScore = 0;

  for (const line of lines) {
    const distance = distanceToLine(city.lat, city.lon, line);
    const distanceMiles = distance * MILES_PER_DEGREE;

    if (distanceMiles <= MAX_ORB_MILES) {
      // Base score (inverse of distance)
      let baseScore = 1 - (distanceMiles / MAX_ORB_MILES);

      // Bonus for very close lines
      if (distanceMiles <= BONUS_ORB_MILES) {
        baseScore += 0.5 * (1 - distanceMiles / BONUS_ORB_MILES);
      }

      // Planet and angle weights
      const planetWeight = PLANET_WEIGHTS[line.planet] ?? 0.5;
      const angleWeight = ANGLE_WEIGHTS[line.angle] ?? 0.5;

      // Category-specific angle boost
      const angleBoosts = CATEGORY_ANGLE_BOOSTS[category] ?? {};
      const angleBoost = angleBoosts[line.angle] ?? 0;

      const lineScore = baseScore * planetWeight * angleWeight * (1 + angleBoost);

      lineActivations.push({
        planet: line.planet,
        angle: line.angle,
        distance: Math.round(distanceMiles * 10) / 10,
        score: Math.round(lineScore * 1000) / 1000,
        key: `${line.planet}_${line.angle}`,
      });

      totalScore += lineScore;
    }
  }

  // Sort by score descending
  lineActivations.sort((a, b) => b.score - a.score);

  return {
    ...city,
    totalScore: Math.round(totalScore * 100) / 100,
    activationCount: lineActivations.length,
    lineActivations,
    bestActivation: lineActivations[0] ?? null,
  };
}

// Countries to exclude (conflict zones)
const EXCLUDED_COUNTRIES = new Set([
  'Ukraine', 'Russia', 'Syria', 'Yemen', 'Sudan', 'South Sudan',
  'Myanmar', 'Libya', 'Somalia', 'Afghanistan', 'Iraq', 'North Korea',
  'Iran', 'Venezuela', 'Haiti', 'Central African Republic',
  'Mali', 'Burkina Faso', 'Niger', 'Ethiopia', 'Pakistan', 'Lebanon', 'Israel',
]);

/**
 * Score all cities and return the top results
 */
export function scoreCities(
  cities: CityData[],
  lines: AstroLine[],
  category: string,
  limit: number = 1
): ScoredCity[] {
  const scored: ScoredCity[] = [];

  for (const city of cities) {
    // Skip excluded countries
    if (EXCLUDED_COUNTRIES.has(city.country)) continue;

    const result = scoreCity(city, lines, category);
    if (result.totalScore > 0) {
      scored.push(result);
    }
  }

  // Sort by total score descending
  scored.sort((a, b) => b.totalScore - a.totalScore);

  return scored.slice(0, limit);
}
