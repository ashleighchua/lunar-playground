import { SIGNS } from '../reportFacts/vocabulary';
import { getInterpretation } from '../astrocartography/interpretations';
import { themeLabelFor, type AstroAngle } from '../astrocartography/themes';
import { tierForMiles } from './tiers';
import type { RelocationOrderInput } from './orderInput';
import type { OrderFacts, CityFacts } from './buildFacts';
import type { GeneratedProse } from './narrate';
import type {
  ReportContent,
  CitySection,
  SummaryCity,
  NatalChart,
  NatalPlanetRow,
  BigThreeCard,
  Badge,
  PlacementBlock,
  SofterInfluence,
  Planet,
  Angle,
} from './render/template';

/**
 * Pure function: maps facts + already-generated prose into the ReportContent
 * shape render/template.ts consumes. Deliberately does no LLM calls and no
 * side effects — badges, theme labels, and interpretive blurbs all come from
 * deterministic sources (astrocartography/interpretations.ts's hand-authored
 * per-placement copy, astrocartography/themes.ts's theme weights), never
 * invented here or left to the LLM, since checkGrounding has no vocabulary
 * to verify free-text theme names or city nicknames against.
 */

const NATAL_PLANET_KEYS = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'] as const;

const ANGLE_LABEL: Record<Angle, string> = {
  MC: 'Midheaven',
  IC: 'Imum Coeli',
  AC: 'Ascendant',
  DC: 'Descendant',
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDateLabel(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  return `${MONTH_NAMES[m - 1]} ${d}, ${y}`;
}

function formatTimeLabel(isoTime: string): string {
  const [hh, mm] = isoTime.split(':').map(Number);
  const period = hh >= 12 ? 'PM' : 'AM';
  const hour12 = hh % 12 === 0 ? 12 : hh % 12;
  return `${hour12}:${String(mm).padStart(2, '0')} ${period}`;
}

function longitudeToSignDegree(lon: number): { sign: string; degree: string } {
  const norm = ((lon % 360) + 360) % 360;
  const signIndex = Math.floor(norm / 30) % 12;
  const degree = Math.floor(norm % 30);
  return { sign: SIGNS[signIndex], degree: `${degree}°` };
}

function placementHeader(planet: Planet, angle: Angle): string {
  const label = themeLabelFor(planet, angle as AstroAngle);
  const base = `${planet.toUpperCase()} ON ${ANGLE_LABEL[angle].toUpperCase()}`;
  return label ? `${base} — ${label.toUpperCase()}` : base;
}

function buildBadges(city: CityFacts): Badge[] {
  return city.lineActivations
    .filter((a) => {
      const tier = tierForMiles(a.distance);
      return tier && tier !== 'soft';
    })
    .map((a) => ({ planet: a.planet as Planet, angle: a.angle as Angle }));
}

function buildSofterInfluences(city: CityFacts): SofterInfluence[] {
  return city.lineActivations
    .filter((a) => tierForMiles(a.distance) === 'soft')
    .map((a) => ({
      planet: a.planet as Planet,
      angle: a.angle as Angle,
      miles: a.distance,
      note: getInterpretation(a.planet, a.angle)?.short ?? 'A softer background presence here.',
    }));
}

function buildCitySection(city: CityFacts, prose: GeneratedProse['cities'][string]): CitySection {
  const placements: PlacementBlock[] = prose.placements.map(({ activationIndex, placement }) => {
    const activation = city.lineActivations[activationIndex];
    const planet = activation.planet as Planet;
    const angle = activation.angle as Angle;
    return {
      planet,
      angle,
      header: placementHeader(planet, angle),
      body: placement.body,
      whatToDo: placement.whatToDo,
    };
  });

  return {
    name: city.name,
    country: city.country,
    nickname: prose.synthesis.nickname,
    tagline: prose.synthesis.tagline,
    badges: buildBadges(city),
    intro: prose.synthesis.intro,
    placements,
    softerInfluences: buildSofterInfluences(city),
    forRomance: prose.synthesis.forRomance ?? undefined,
    forCareer: prose.synthesis.forCareer ?? undefined,
    combinedEnergy: prose.synthesis.combinedEnergy,
    bottomLine: prose.synthesis.bottomLine,
  };
}

function buildSummaryCity(city: CityFacts, prose: GeneratedProse['cities'][string]): SummaryCity {
  return {
    name: city.name,
    country: city.country,
    badges: buildBadges(city),
    nickname: prose.synthesis.nickname,
    paragraph: prose.synthesis.bottomLine,
  };
}

function buildPlanetaryLines(facts: OrderFacts): ReportContent['planetaryLines'] {
  const seen = new Set<string>();
  const lines: ReportContent['planetaryLines'] = [];
  for (const city of facts.cities) {
    for (const activation of city.lineActivations) {
      const tier = tierForMiles(activation.distance);
      if (!tier || tier === 'soft') continue;
      const key = `${activation.planet}_${activation.angle}`;
      if (seen.has(key)) continue;
      seen.add(key);
      lines.push({
        planet: activation.planet as Planet,
        angle: activation.angle as Angle,
        blurb: getInterpretation(activation.planet, activation.angle)?.short ?? '',
      });
    }
  }
  return lines;
}

function buildNatalChart(input: RelocationOrderInput, facts: OrderFacts, prose: GeneratedProse): NatalChart | undefined {
  if (input.reportTier !== 'combined' || !prose.identityIntro || !prose.perPlanetDescriptions) return undefined;
  const { chart } = facts;

  const bigThree: BigThreeCard[] = [
    { label: 'Sun', sign: chart.sun.sign, degree: `${chart.sun.degree}°`, house: chart.sun.house, description: prose.perPlanetDescriptions['Sun'] ?? '' },
    { label: 'Moon', sign: chart.moon.sign, degree: `${chart.moon.degree}°`, house: chart.moon.house, description: prose.perPlanetDescriptions['Moon'] ?? '' },
  ];
  if (chart.rising) {
    bigThree.push({
      label: 'Rising',
      sign: chart.rising.sign,
      degree: `${chart.rising.degree}°`,
      description: prose.perPlanetDescriptions['Ascendant'] ?? '',
    });
  }

  const planets: NatalPlanetRow[] = NATAL_PLANET_KEYS.map((key) => {
    const pos = chart[key];
    return {
      planet: pos.name as Planet,
      sign: pos.sign,
      degree: `${pos.degree}°`,
      house: pos.house ?? 0,
      description: prose.perPlanetDescriptions?.[pos.name],
    };
  });

  const midheaven = chart.midheaven != null ? longitudeToSignDegree(chart.midheaven) : { sign: '', degree: '' };
  const ascendant = chart.rising ? { sign: chart.rising.sign, degree: `${chart.rising.degree}°` } : { sign: '', degree: '' };

  return { intro: prose.identityIntro, bigThree, planets, ascendant, midheaven };
}

export interface AssembleOptions {
  input: RelocationOrderInput;
  facts: OrderFacts;
  prose: GeneratedProse;
  generatedAt?: Date;
}

export function assembleReportContent({ input, facts, prose, generatedAt = new Date() }: AssembleOptions): ReportContent {
  const cities: CitySection[] = facts.cities.map((city) => buildCitySection(city, prose.cities[city.name]));
  const summaryCities: SummaryCity[] = facts.cities.map((city) => buildSummaryCity(city, prose.cities[city.name]));

  return {
    client: input.client,
    monthYear: `${MONTH_NAMES[generatedAt.getMonth()]} ${generatedAt.getFullYear()}`,
    birth: {
      dateLabel: formatDateLabel(input.birth.date),
      timeLabel: formatTimeLabel(input.birth.time),
      placeLabel: input.birth.placeLabel,
    },
    citiesListLabel: facts.cities.map((c) => c.name).join(', '),
    natalChart: buildNatalChart(input, facts, prose),
    planetaryLines: buildPlanetaryLines(facts),
    cities,
    summaryCities,
    closingMessage: `May this reading offer clarity as you consider where in the world calls to you next, ${input.client}.`,
  };
}
