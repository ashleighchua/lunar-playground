/**
 * Relocation report — top-city finder.
 *
 * Ranks the site's full world-cities dataset against a weighted life-theme
 * blend (love, career, or both combined) using the same production scoring
 * engine (cityScorer.ts + themes.ts) that powers the app's own results page.
 * Use this to find real, data-backed city candidates for a report rather
 * than picking cities by hand.
 *
 * Usage:
 *   npx tsx scripts/relocation-report/find-top-cities.ts <input.json> [themes] [limit] [exclude] [country]
 *
 *   themes  - comma-separated theme names (default: "love,career")
 *             one of: love, career, luck, transformation, home, communication, adventure
 *   limit   - how many top cities to show (default: 15)
 *   exclude - comma-separated city names to exclude (e.g. already-covered cities)
 *   country - restrict candidates to this country only (exact match against
 *             cities.json's `country` field, e.g. "United States")
 *
 * Input JSON shape: { birth: { date, time, lat, lon, placeLabel } } (birth-only
 * subset of facts.ts's ClientInput — no `cities` field needed here).
 */
import { find as findTimezone } from 'geo-tz';
import { toJulianDay, calculatePlanetEquatorial } from '../../src/lib/ephemeris';
import { calculatePlanetLines, type AstroLine } from '../../src/lib/astrocartography/lineCalculator';
import { scoreCitiesForTheme, scoreCitiesForCombinedThemes, type CityData } from '../../src/lib/astrocartography/cityScorer';
import { LIFE_THEMES, type ThemeName } from '../../src/lib/astrocartography/themes';
import { readFileSync } from 'fs';
import citiesData from '../../src/data/cities.json';

const PLANETS = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto',
] as const;

interface BirthInput {
  birth: {
    date: string;
    time: string;
    lat: number;
    lon: number;
    placeLabel: string;
  };
}

function resolveUtcOffsetHours(lat: number, lon: number, isoDate: string, isoTime: string): number {
  const zones = findTimezone(lat, lon);
  if (!zones.length) throw new Error(`No timezone found for lat=${lat}, lon=${lon}`);
  const timezone = zones[0];

  const [y, m, d] = isoDate.split('-').map(Number);
  const [hh, mm] = isoTime.split(':').map(Number);
  const approxUtc = new Date(Date.UTC(y, m - 1, d, hh, mm));

  const parts = new Intl.DateTimeFormat('en', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  }).formatToParts(approxUtc);

  const offsetStr = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  const match = offsetStr.match(/GMT([+-])(\d+)(?::(\d+))?/);
  if (!match) return 0;
  const sign = match[1] === '+' ? 1 : -1;
  const hours = parseInt(match[2], 10);
  const minutes = match[3] ? parseInt(match[3], 10) : 0;
  return sign * (hours + minutes / 60);
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

function main() {
  const [inputPath, themesArg, limitArg, excludeArg, countryArg] = process.argv.slice(2);
  if (!inputPath) {
    console.error('Usage: npx tsx scripts/relocation-report/find-top-cities.ts <input.json> [themes] [limit] [exclude] [country]');
    process.exit(1);
  }

  const input: BirthInput = JSON.parse(readFileSync(inputPath, 'utf-8'));
  const themeNames = (themesArg ?? 'love,career').split(',').map((s) => s.trim()) as ThemeName[];
  const limit = limitArg ? parseInt(limitArg, 10) : 15;
  const exclude = new Set((excludeArg ?? '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean));

  const offset = resolveUtcOffsetHours(input.birth.lat, input.birth.lon, input.birth.date, input.birth.time);
  const lines = computeAllPlanetLines(input.birth.date, input.birth.time, offset);

  let cities = (citiesData as CityData[]).filter((c) => !exclude.has(c.name.toLowerCase()));
  if (countryArg) cities = cities.filter((c) => c.country.toLowerCase() === countryArg.toLowerCase());

  console.log(`\nTop ${limit} cities for [${themeNames.join(' + ')}] — ${input.birth.placeLabel}, ${input.birth.date} ${input.birth.time}\n`);

  if (themeNames.length > 1) {
    const weightSets = themeNames.map((t) => LIFE_THEMES[t]);
    const combined = scoreCitiesForCombinedThemes(cities, lines, weightSets, limit);
    for (const c of combined) {
      console.log(`${c.name.padEnd(20)} ${c.country.padEnd(20)} score=${c.totalScore.toFixed(2)}  top: ${c.lineActivations.slice(0, 3).map((a) => `${a.planet} ${a.angle} (${a.distance}mi)`).join(', ')}`);
    }
  } else {
    const single = scoreCitiesForTheme(cities, lines, LIFE_THEMES[themeNames[0]], limit);
    for (const c of single) {
      console.log(`${c.name.padEnd(20)} ${c.country.padEnd(20)} score=${c.totalScore.toFixed(2)}  top: ${c.lineActivations.slice(0, 3).map((a) => `${a.planet} ${a.angle} (${a.distance}mi)`).join(', ')}`);
    }
  }

  // Also show each theme independently, since a combined score can hide a
  // city that's spectacular for one theme but middling for the other.
  if (themeNames.length > 1) {
    for (const theme of themeNames) {
      console.log(`\n--- ${theme} only (top 8) ---`);
      const ranked = scoreCitiesForTheme(cities, lines, LIFE_THEMES[theme], 8);
      for (const c of ranked) {
        console.log(`${c.name.padEnd(20)} ${c.country.padEnd(20)} score=${c.totalScore.toFixed(2)}  top: ${c.lineActivations.slice(0, 2).map((a) => `${a.planet} ${a.angle} (${a.distance}mi)`).join(', ')}`);
      }
    }
  }
}

main();
