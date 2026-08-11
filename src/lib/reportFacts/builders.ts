import type { ChartData, PlanetPosition } from '../ephemeris';
import type { RelocatedChart } from '../houses';
import type { ScoredCity, LineActivation } from '../astrocartography/cityScorer';
import type { ThemeName } from '../astrocartography/themes';
import { isPlanet, isSign, isAngle, isHouse, type PlanetName } from './vocabulary';
import type { Fact, FactsPayload } from './types';

/**
 * One facts-builder per report section (mirrors sectionConfig.ts's per-section
 * granularity) — each returns a small, scoped payload containing only the
 * facts that section's prose is allowed to reference, never the whole chart.
 */

const NATAL_PLANET_KEYS = [
  'sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
] as const;

function getNatalPlanetPosition(chart: ChartData, planet: PlanetName): PlanetPosition | null {
  const key = planet.toLowerCase() as (typeof NATAL_PLANET_KEYS)[number];
  if (!NATAL_PLANET_KEYS.includes(key)) return null;
  return chart[key];
}

/**
 * Birth-chart identity facts: every natal planet's sign (+ house, if the
 * chart has houses) plus the Ascendant's sign. Used by "who this person is"
 * sections in the combined report.
 */
export function buildBirthChartIdentityFacts(chart: ChartData): FactsPayload {
  const facts: Fact[] = [];

  for (const key of NATAL_PLANET_KEYS) {
    const pos = chart[key];
    const planetName = pos.name;
    if (!isPlanet(planetName) || !isSign(pos.sign)) continue;
    facts.push({
      type: 'planet-placement',
      planet: planetName,
      sign: pos.sign,
      house: pos.house !== undefined && isHouse(pos.house) ? pos.house : undefined,
    });
  }

  if (chart.rising && isSign(chart.rising.sign)) {
    facts.push({ type: 'ascendant-sign', sign: chart.rising.sign });
  }

  return { sectionId: 'birth-chart-identity', facts };
}

/**
 * Relocated-house facts for a specific destination: for each planet, its
 * natal house paired with its recomputed house at the destination — the core
 * "what changes when you move here" mechanic. Only meaningful for the
 * combined (birth chart + relocation) report, since it needs natal houses.
 */
export function buildRelocatedHouseShiftFacts(
  chart: ChartData,
  relocated: RelocatedChart,
  cityName: string
): FactsPayload {
  const facts: Fact[] = [];

  for (const rp of relocated.planets) {
    if (!isPlanet(rp.name)) continue;
    const natalPos = getNatalPlanetPosition(chart, rp.name);
    if (!natalPos || natalPos.house === undefined || !isHouse(natalPos.house) || !isHouse(rp.house)) continue;

    facts.push({
      type: 'relocated-house-shift',
      planet: rp.name,
      natalHouse: natalPos.house,
      relocatedHouse: rp.house,
      city: cityName,
    });
  }

  return { sectionId: `relocated-houses-${cityName}`, facts };
}

/**
 * Astrocartography angularity facts for a specific city: which planets have
 * lines close enough to matter there, and on which angle (MC/IC/AC/DC).
 * Drives sections like "what the sky was doing over this city when you were
 * born" — this is where a claim like "Saturn was at its peak over LA" comes
 * from, grounded in the actual computed orb rather than the model recalling it.
 */
export function buildCityAngularityFacts(cityName: string, lineActivations: LineActivation[]): FactsPayload {
  const facts: Fact[] = [];

  for (const activation of lineActivations) {
    if (!isPlanet(activation.planet) || !isAngle(activation.angle)) continue;
    facts.push({
      type: 'city-line-activation',
      city: cityName,
      planet: activation.planet,
      angle: activation.angle,
      orbMiles: activation.distance,
    });
  }

  return { sectionId: `city-angularity-${cityName}`, facts };
}

/**
 * City ranking facts for a single life theme (love/career/luck/etc.) — the
 * ranked shortlist a "best cities for you" section draws from.
 */
export function buildCityRankingFacts(theme: ThemeName, rankedCities: ScoredCity[]): FactsPayload {
  const facts: Fact[] = rankedCities.map((city, index) => ({
    type: 'city-theme-ranking' as const,
    theme,
    city: city.name,
    rank: index + 1,
    score: city.totalScore,
  }));

  return { sectionId: `city-ranking-${theme}`, facts };
}
