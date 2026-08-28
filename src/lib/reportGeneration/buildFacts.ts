import { calculateChart, toJulianDay, calculatePlanetEquatorial, type ChartData, type BirthData } from '../ephemeris';
import { calculateRelocatedHouses, type RelocatedChart } from '../houses';
import { calculatePlanetLines, type AstroLine } from '../astrocartography/lineCalculator';
import {
  scoreCitiesForTheme,
  scoreCitiesForCombinedThemes,
  distanceToLine,
  MILES_PER_DEGREE,
  type CityData,
  type LineActivation,
} from '../astrocartography/cityScorer';
import { LIFE_THEMES, type ThemeName } from '../astrocartography/themes';
import {
  buildBirthChartIdentityFacts,
  buildRelocatedHouseShiftFacts,
  buildCityAngularityFacts,
  buildCityRankingFacts,
} from '../reportFacts/builders';
import type { FactsPayload } from '../reportFacts/types';
import { resolveUtcOffsetHours } from '../timezoneOffset';
import type { RelocationOrderInput } from './orderInput';
import citiesData from '../../data/cities.json';

const PLANETS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'] as const;
const NATAL_PLANET_KEYS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'] as const;

// Same tier-band cutoff as scripts/relocation-report/facts.ts's tierFor — the
// widest "soft" orb worth mentioning in a report. Independent of theme
// weighting: this decides which placements get a badge/box in a *specific*
// city's section, not which cities rank highest for a theme (that's
// cityScorer's job, reused as-is below).
const MAX_ORB_MILES_FOR_REPORT = 600;

export interface CityFacts {
  name: string;
  country: string;
  lat: number;
  lon: number;
  /** All (planet, angle) activations within MAX_ORB_MILES_FOR_REPORT, sorted nearest-first. */
  lineActivations: LineActivation[];
  /** All activations for this city in one payload — used for per-city synthesis-text grounding (intro, combinedEnergy, etc). */
  angularityFacts: FactsPayload;
  /** One payload per activation, each containing exactly one tuple — used for strict per-placement grounding. */
  placementFacts: FactsPayload[];
  /** Combined tier only. */
  relocatedHouseFacts?: FactsPayload;
  relocatedChart?: RelocatedChart;
}

export interface OrderFacts {
  chart: ChartData;
  timezone: string;
  /** Combined tier only — all natal planets + Ascendant in one payload. */
  identityFacts?: FactsPayload;
  /** Combined tier only — one payload per planet/Ascendant, each a single tuple, for strict per-placement grounding. */
  perPlanetIdentityFacts?: FactsPayload[];
  cities: CityFacts[];
  rankingFacts: Partial<Record<ThemeName, FactsPayload>>;
  /** Every computed planet line (relocation/combined tiers only) — retained so assemble.ts can attach each activated line's full lat/lon polyline to ReportContent.planetaryLines for the world-map render. Undefined for natal-only orders, which never compute lines. */
  allLines?: AstroLine[];
}

function computeAllPlanetLines(jd: number): AstroLine[] {
  const lines: AstroLine[] = [];
  for (const planet of PLANETS) {
    const eq = calculatePlanetEquatorial(planet, jd);
    lines.push(...calculatePlanetLines(planet, eq, jd));
  }
  return lines;
}

function computeCityLineActivations(lat: number, lon: number, lines: AstroLine[]): LineActivation[] {
  const activations: LineActivation[] = [];
  for (const line of lines) {
    const miles = Math.round(distanceToLine(lat, lon, line) * MILES_PER_DEGREE * 10) / 10;
    if (miles > MAX_ORB_MILES_FOR_REPORT) continue;
    activations.push({
      planet: line.planet,
      angle: line.angle,
      distance: miles,
      score: Math.round((1 - miles / MAX_ORB_MILES_FOR_REPORT) * 1000) / 1000, // orb-tier weight only, not theme-weighted
      key: `${line.planet}_${line.angle}`,
    });
  }
  activations.sort((a, b) => a.distance - b.distance);
  return activations;
}

function rankTopCities(themes: ThemeName[], lines: AstroLine[], limit: number) {
  const cities = citiesData as CityData[];
  if (themes.length > 1) {
    return scoreCitiesForCombinedThemes(cities, lines, themes.map((t) => LIFE_THEMES[t]), limit);
  }
  return scoreCitiesForTheme(cities, lines, LIFE_THEMES[themes[0]], limit);
}

/**
 * Given an order's birth data + destination cities/themes, computes every
 * deterministic fact the narrative layer is allowed to phrase: natal chart,
 * relocated houses per destination, and planetary-line activations per
 * destination. This is the ONLY source of astrological facts for a report —
 * narrative content must not assert a placement that isn't in this output.
 *
 * Replaces scripts/relocation-report/{facts,natal}.ts's duplicate logic —
 * same production engine (ephemeris.ts, houses.ts, cityScorer.ts), no
 * reimplementation.
 */
export async function buildFactsForOrder(input: RelocationOrderInput): Promise<OrderFacts> {
  const { offset, timezone } = resolveUtcOffsetHours(input.birth.lat, input.birth.lon, input.birth.date, input.birth.time);
  const [y, m, d] = input.birth.date.split('-').map(Number);
  const [hh, mm] = input.birth.time.split(':').map(Number);

  const birthData: BirthData = {
    year: y,
    month: m,
    day: d,
    hour: hh,
    minute: mm,
    latitude: input.birth.lat,
    longitude: input.birth.lon,
    timezone: offset,
  };

  const chart = await calculateChart(birthData);
  if (!chart) throw new Error(`calculateChart failed for order "${input.client}"`);

  let identityFacts: FactsPayload | undefined;
  let perPlanetIdentityFacts: FactsPayload[] | undefined;
  if (input.reportTier === 'combined' || input.reportTier === 'natal-only') {
    identityFacts = buildBirthChartIdentityFacts(chart);
    perPlanetIdentityFacts = identityFacts.facts.map((fact, i) => ({
      sectionId: `${identityFacts!.sectionId}-${i}`,
      facts: [fact],
    }));
  }

  // natal-only has no relocation content at all — skip planetary-line
  // computation and city ranking entirely rather than doing wasted work for
  // a product that never uses it.
  if (input.reportTier === 'natal-only') {
    return { chart, timezone, identityFacts, perPlanetIdentityFacts, cities: [], rankingFacts: {} };
  }

  if (!input.themes || input.themes.length === 0) {
    throw new Error(`Order "${input.client}" (tier ${input.reportTier}) has no themes — required for relocation content`);
  }
  const themes = input.themes;
  const cityCount = input.cityCount ?? 3;

  const utcHour = hh + mm / 60 - offset;
  const jd = toJulianDay(y, m, d, utcHour);
  const lines = computeAllPlanetLines(jd);

  const destinations = input.destinationCities?.length
    ? input.destinationCities
    : rankTopCities(themes, lines, cityCount);

  const natalPlanetLongitudes = NATAL_PLANET_KEYS.map((key) => ({
    name: chart[key].name,
    longitude: chart[key].longitude,
  }));

  const cities: CityFacts[] = destinations.map((dest) => {
    const lineActivations = computeCityLineActivations(dest.lat, dest.lon, lines);
    const angularityFacts = buildCityAngularityFacts(dest.name, lineActivations);
    const placementFacts = lineActivations.map((activation, i) => ({
      ...buildCityAngularityFacts(dest.name, [activation]),
      sectionId: `city-angularity-${dest.name}-${i}`,
    }));

    let relocatedHouseFacts: FactsPayload | undefined;
    let relocatedChart: RelocatedChart | undefined;
    if (input.reportTier === 'combined') {
      relocatedChart = calculateRelocatedHouses(natalPlanetLongitudes, jd, dest.lat, dest.lon);
      relocatedHouseFacts = buildRelocatedHouseShiftFacts(chart, relocatedChart, dest.name);
    }

    return {
      name: dest.name,
      country: dest.country,
      lat: dest.lat,
      lon: dest.lon,
      lineActivations,
      angularityFacts,
      placementFacts,
      relocatedHouseFacts,
      relocatedChart,
    };
  });

  const rankingFacts: Partial<Record<ThemeName, FactsPayload>> = {};
  for (const theme of themes) {
    const ranked = scoreCitiesForTheme(citiesData as CityData[], lines, LIFE_THEMES[theme], cityCount);
    rankingFacts[theme] = buildCityRankingFacts(theme, ranked);
  }

  return { chart, timezone, identityFacts, perPlanetIdentityFacts, cities, rankingFacts, allLines: lines };
}
