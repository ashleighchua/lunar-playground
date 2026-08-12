/**
 * Relocation report — facts calculator.
 *
 * Computes real astrocartography line activations (planet, angle, distance
 * in miles) for a client's birth data against a list of candidate cities,
 * using the site's own production engine (ephemeris + lineCalculator).
 * This is the ONLY source of astrological placement facts for a report —
 * narrative content must not assert a placement that isn't in this output.
 *
 * Usage:
 *   npx tsx scripts/relocation-report/facts.ts <input.json> <output.json>
 *
 * Input JSON shape: see ClientInput below.
 */
import { find as findTimezone } from 'geo-tz';
import { toJulianDay, calculatePlanetEquatorial } from '../../src/lib/ephemeris';
import { calculatePlanetLines, type AstroLine } from '../../src/lib/astrocartography/lineCalculator';
import { readFileSync, writeFileSync } from 'fs';

const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
] as const;

const MILES_PER_DEGREE = 69;
const DEG_TO_RAD = Math.PI / 180;

interface City {
  name: string;
  country: string;
  lat: number;
  lon: number;
}

interface ClientInput {
  client: string;
  birth: {
    date: string; // YYYY-MM-DD (local calendar date at birthplace)
    time: string; // HH:MM 24h local time at birthplace
    lat: number;
    lon: number;
    placeLabel: string;
  };
  cities: City[];
}

export interface LineHit {
  planet: string;
  angle: 'MC' | 'IC' | 'AC' | 'DC';
  miles: number;
  tier: 'exact' | 'primary' | 'notable' | 'soft';
}

export interface CityFacts extends City {
  hits: LineHit[]; // sorted by miles ascending
}

export interface FactsOutput {
  client: string;
  birth: ClientInput['birth'] & { utcOffsetHours: number; timezone: string };
  cities: CityFacts[];
}

function longitudeDifference(lon1: number, lon2: number): number {
  let diff = Math.abs(lon1 - lon2);
  if (diff > 180) diff = 360 - diff;
  return diff;
}

function angularDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const latDiff = lat1 - lat2;
  const lonDiff = longitudeDifference(lon1, lon2);
  const avgLat = (lat1 + lat2) / 2;
  const lonDiffAdjusted = lonDiff * Math.cos(avgLat * DEG_TO_RAD);
  return Math.sqrt(latDiff * latDiff + lonDiffAdjusted * lonDiffAdjusted);
}

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

// Mirrors cityScorer.ts's distanceToLine (including its cos(latitude)
// correction for MC/IC meridian convergence) — kept in sync deliberately
// rather than imported, since cityScorer's version is private (unexported)
// and this script needs raw distances beyond its hardcoded 300-mile cutoff
// (relocation reports show a "softer influences" tier out past that orb).
function distanceToLineDegrees(lat: number, lon: number, line: AstroLine): number {
  const { points, angle } = line;
  if (points.length === 0) return Infinity;

  if (angle === 'MC' || angle === 'IC') {
    return longitudeDifference(lon, points[0].lon) * Math.cos(lat * DEG_TO_RAD);
  }

  let minDistance = Infinity;
  for (const point of points) {
    if (Math.abs(point.lat - lat) > 10) continue;
    minDistance = Math.min(minDistance, angularDistance(lat, lon, point.lat, point.lon));
  }
  if (minDistance === Infinity) {
    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i], p2 = points[i + 1];
      if (lat >= Math.min(p1.lat, p2.lat) && lat <= Math.max(p1.lat, p2.lat)) {
        const t = (lat - p1.lat) / (p2.lat - p1.lat);
        const interpolatedLon = p1.lon + t * (p2.lon - p1.lon);
        minDistance = Math.min(minDistance, longitudeDifference(lon, interpolatedLon));
      }
    }
  }
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i], p2 = points[i + 1];
    if (Math.abs(p1.lat - lat) > 15 && Math.abs(p2.lat - lat) > 15) continue;
    minDistance = Math.min(minDistance, pointToSegmentDistance(lat, lon, p1.lat, p1.lon, p2.lat, p2.lon));
  }
  return minDistance === Infinity ? 999 : minDistance;
}

function tierFor(miles: number): LineHit['tier'] | null {
  if (miles <= 30) return 'exact';
  if (miles <= 150) return 'primary';
  if (miles <= 300) return 'notable';
  if (miles <= 600) return 'soft';
  return null;
}

// Historical UTC offset (handles DST correctly) for the birthplace at the
// birth date, via the IANA tz database — same technique as
// src/app/api/timezone/route.ts, reimplemented here so this script has no
// dependency on a running Next.js server.
function resolveUtcOffsetHours(lat: number, lon: number, isoDate: string, isoTime: string): { offset: number; timezone: string } {
  const zones = findTimezone(lat, lon);
  if (!zones.length) throw new Error(`No timezone found for lat=${lat}, lon=${lon}`);
  const timezone = zones[0];

  const [y, m, d] = isoDate.split('-').map(Number);
  const [hh, mm] = isoTime.split(':').map(Number);
  // Approximate instant (UTC) just to resolve which offset (incl. DST) is in
  // effect on this date; a few hours of error here cannot flip a DST boundary
  // for all but a handful of transition-night births.
  const approxUtc = new Date(Date.UTC(y, m - 1, d, hh, mm));

  const parts = new Intl.DateTimeFormat('en', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  }).formatToParts(approxUtc);

  const offsetStr = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  const match = offsetStr.match(/GMT([+-])(\d+)(?::(\d+))?/);
  let offset = 0;
  if (match) {
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = match[3] ? parseInt(match[3], 10) : 0;
    offset = sign * (hours + minutes / 60);
  }
  return { offset, timezone };
}

function computeAllPlanetLines(isoDate: string, isoTime: string, utcOffsetHours: number): AstroLine[] {
  const [y, m, d] = isoDate.split('-').map(Number);
  const [hh, mm] = isoTime.split(':').map(Number);
  const utcHour = hh + mm / 60 - utcOffsetHours;
  const jd = toJulianDay(y, m, d, utcHour);

  const lines: AstroLine[] = [];
  for (const planet of PLANETS) {
    const eq = calculatePlanetEquatorial(planet, jd);
    lines.push(...calculatePlanetLines(planet, eq, jd));
  }
  return lines;
}

export function computeFacts(input: ClientInput): FactsOutput {
  const { offset, timezone } = resolveUtcOffsetHours(
    input.birth.lat,
    input.birth.lon,
    input.birth.date,
    input.birth.time
  );

  const lines = computeAllPlanetLines(input.birth.date, input.birth.time, offset);

  const cities: CityFacts[] = input.cities.map((city) => {
    const hits: LineHit[] = [];
    for (const line of lines) {
      const miles = Math.round(distanceToLineDegrees(city.lat, city.lon, line) * MILES_PER_DEGREE * 10) / 10;
      const tier = tierFor(miles);
      if (tier) {
        hits.push({ planet: line.planet, angle: line.angle, miles, tier });
      }
    }
    hits.sort((a, b) => a.miles - b.miles);
    return { ...city, hits };
  });

  return {
    client: input.client,
    birth: { ...input.birth, utcOffsetHours: offset, timezone },
    cities,
  };
}

// CLI entry point
if (require.main === module) {
  const [inputPath, outputPath] = process.argv.slice(2);
  if (!inputPath || !outputPath) {
    console.error('Usage: npx tsx scripts/relocation-report/facts.ts <input.json> <output.json>');
    process.exit(1);
  }
  const input: ClientInput = JSON.parse(readFileSync(inputPath, 'utf-8'));
  const output = computeFacts(input);
  writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\nFacts computed for ${output.client}`);
  console.log(`Birthplace resolved to ${output.birth.timezone} (UTC${output.birth.utcOffsetHours >= 0 ? '+' : ''}${output.birth.utcOffsetHours})\n`);
  for (const city of output.cities) {
    console.log(`${city.name}, ${city.country}:`);
    if (city.hits.length === 0) {
      console.log('  (no lines within 600 miles)');
    }
    for (const hit of city.hits) {
      console.log(`  ${hit.planet.padEnd(8)} ${hit.angle}  ${hit.miles}mi  [${hit.tier}]`);
    }
  }
}
