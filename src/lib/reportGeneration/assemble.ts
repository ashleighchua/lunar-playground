import { SIGNS } from '../reportFacts/vocabulary';
import { getInterpretation } from '../astrocartography/interpretations';
import { themeLabelFor, type AstroAngle } from '../astrocartography/themes';
import { tierForMiles, isFullPlacementTier } from './tiers';
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
  ThemeHighlight,
  Planet,
  Angle,
} from './render/template';
import type { NatalReportContent, DomainInsightCard, PracticalTakeaways } from './render/natalTemplate';
import type { LifeAreaInsightObject } from '../narrative/generateLifeAreaInsight';
import type { PlanetPosition } from '../ephemeris';

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
    lat: city.lat,
    lon: city.lon,
    badges: buildBadges(city),
    nickname: prose.synthesis.nickname,
    paragraph: prose.synthesis.bottomLine,
  };
}

/**
 * "Your Strongest Themes" highlight — deterministic, no LLM call. Every input
 * is already grounded: lineActivations is pre-sorted nearest-first
 * (buildFacts.ts's computeCityLineActivations), and bottomLine is already a
 * checked one-sentence takeaway. A themes summary that names concrete
 * placements is exactly what checkGrounding exists to verify — reusing
 * already-checked content sidesteps that judgment call instead of exempting
 * fresh prose from it.
 *
 * Picks the nearest *full-placement-tier* activation, not just the nearest
 * activation overall — lineActivations can include soft-tier (300-600mi)
 * entries that only ever get a one-line "softer influence" footnote in that
 * city's own section (see buildSofterInfluences/renderCity), never a full
 * placement box. Highlighting one of those here would headline a claim the
 * city's own detail page barely mentions, and would draw a line on the world
 * map that a reader can't map back to anything they read about that city.
 * Returns undefined (city omitted from the highlights page) if the city has
 * no full-tier activation at all, matching how it also gets no placement
 * boxes in its own section in that case.
 */
function buildThemeHighlight(city: CityFacts, prose: GeneratedProse['cities'][string]): ThemeHighlight | undefined {
  const top = city.lineActivations.find((a) => {
    const tier = tierForMiles(a.distance);
    return tier && isFullPlacementTier(tier);
  });
  if (!top) return undefined;
  const planet = top.planet as Planet;
  const angle = top.angle as Angle;
  const label = themeLabelFor(planet, angle as AstroAngle);
  return {
    city: city.name,
    country: city.country,
    planet,
    angle,
    headline: label ?? `${planet} on your ${ANGLE_LABEL[angle]}`,
    blurb: prose.synthesis.bottomLine,
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
      const sourceLine = facts.allLines?.find((l) => l.planet === activation.planet && l.angle === activation.angle);
      lines.push({
        planet: activation.planet as Planet,
        angle: activation.angle as Angle,
        blurb: getInterpretation(activation.planet, activation.angle)?.short ?? '',
        points: sourceLine?.points ?? [],
      });
    }
  }
  return lines;
}

function buildNatalChart(input: RelocationOrderInput, facts: OrderFacts, prose: GeneratedProse): NatalChart | undefined {
  if (
    (input.reportTier !== 'combined' && input.reportTier !== 'natal-only') ||
    !prose.identityIntro ||
    !prose.perPlanetDescriptions
  ) {
    return undefined;
  }
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

  // Natal-only tier: prose.perPlanetDescriptions only has entries for
  // Sun/Moon/Ascendant (Big Three, above) and Uranus/Neptune/Pluto — the
  // six personal planets moved into the domain sections below, so this
  // "What Your Chart Shows" list only shows the outer planets for that
  // tier (see narrate.ts). Combined tier is unchanged: every planet gets a
  // description here, exactly as before.
  const OUTER_PLANETS = new Set(['Uranus', 'Neptune', 'Pluto']);
  const planets: NatalPlanetRow[] = NATAL_PLANET_KEYS.map((key) => {
    const pos = chart[key];
    const includeDescription = input.reportTier === 'combined' || OUTER_PLANETS.has(pos.name);
    return {
      planet: pos.name as Planet,
      sign: pos.sign,
      degree: `${pos.degree}°`,
      longitude: pos.longitude,
      house: pos.house ?? 0,
      description: includeDescription ? prose.perPlanetDescriptions?.[pos.name] : undefined,
    };
  });

  const midheaven = chart.midheaven != null
    ? { ...longitudeToSignDegree(chart.midheaven), longitude: chart.midheaven }
    : { sign: '', degree: '', longitude: null };
  const ascendant = chart.rising
    ? { sign: chart.rising.sign, degree: `${chart.rising.degree}°`, longitude: chart.rising.longitude }
    : { sign: '', degree: '', longitude: 0 };
  const cusps = chart.houses?.cusps ?? [];

  return { intro: prose.identityIntro, bigThree, planets, ascendant, midheaven, cusps };
}

/** Pairs a planet's real sign/house (from the computed chart, not the LLM) with its generated life-area insight. */
function buildDomainInsightCard(pos: PlanetPosition, insight: LifeAreaInsightObject): DomainInsightCard {
  return {
    planet: pos.name as Planet,
    sign: pos.sign,
    house: pos.house ?? 0,
    pattern: insight.pattern,
    watchFor: insight.watchFor,
    practice: insight.practice,
  };
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
  const themeHighlights: ThemeHighlight[] = facts.cities
    .map((city) => buildThemeHighlight(city, prose.cities[city.name]))
    .filter((h): h is ThemeHighlight => !!h);

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
    themeHighlights,
    closingMessage: `May this reading offer clarity as you consider where in the world calls to you next, ${input.client}.`,
    closingReflection: prose.closingReflection,
  };
}

/**
 * Natal-only tier's lean equivalent of assembleReportContent — no
 * cities/summaryCities/planetaryLines/citiesListLabel, since a standalone
 * Natal Chart Reading has no relocation content to carry through a document
 * that never renders it.
 */
export function assembleNatalReportContent({ input, facts, prose, generatedAt = new Date() }: AssembleOptions): NatalReportContent {
  const natalChart = buildNatalChart(input, facts, prose);
  if (!natalChart) {
    throw new Error(`assembleNatalReportContent: no natalChart for order "${input.client}" — narration must complete before assembly`);
  }

  const { chart } = facts;
  function required<T>(value: T | undefined, label: string): T {
    if (value === undefined) {
      throw new Error(`assembleNatalReportContent: missing "${label}" for order "${input.client}" — narration must complete before assembly`);
    }
    return value;
  }

  const coreDrives: DomainInsightCard[] = (['mercury', 'venus', 'mars', 'saturn'] as const).map((key) => {
    const planetName = chart[key].name as 'Mercury' | 'Venus' | 'Mars' | 'Saturn';
    const insight = required(prose.coreDrives?.[planetName], `coreDrives.${planetName}`);
    return buildDomainInsightCard(chart[key], insight);
  });

  const decisionMaking = buildDomainInsightCard(chart.mercury, required(prose.decisionMaking, 'decisionMaking'));
  const emotionalPattern = buildDomainInsightCard(chart.moon, required(prose.emotionalPattern, 'emotionalPattern'));
  const restRecharge = buildDomainInsightCard(chart.moon, required(prose.restRecharge, 'restRecharge'));
  const relationshipBlueprint = buildDomainInsightCard(chart.moon, required(prose.relationshipBlueprint, 'relationshipBlueprint'));
  const workImpact = buildDomainInsightCard(chart.sun, required(prose.workImpact, 'workImpact'));
  const shadowGrowth = buildDomainInsightCard(chart.sun, required(prose.shadowGrowth, 'shadowGrowth'));
  const practicalTakeaways: PracticalTakeaways = required(prose.practicalTakeaways, 'practicalTakeaways');

  return {
    client: input.client,
    monthYear: `${MONTH_NAMES[generatedAt.getMonth()]} ${generatedAt.getFullYear()}`,
    birth: {
      dateLabel: formatDateLabel(input.birth.date),
      timeLabel: formatTimeLabel(input.birth.time),
      placeLabel: input.birth.placeLabel,
    },
    natalChart,
    coreDrives,
    decisionMaking,
    emotionalPattern,
    restRecharge,
    relationshipBlueprint,
    workImpact,
    shadowGrowth,
    practicalTakeaways,
    closingMessage: `May this reading offer clarity as you continue getting to know yourself, ${input.client}.`,
  };
}
