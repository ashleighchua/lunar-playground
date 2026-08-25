import { describe, it, expect } from 'vitest';
import { assembleReportContent, assembleNatalReportContent } from '../assemble';
import { SAMPLE_ORDER_INPUT, SAMPLE_NATAL_ORDER_INPUT } from '../orderInput';
import type { OrderFacts, CityFacts } from '../buildFacts';
import type { GeneratedProse } from '../narrate';
import type { ChartData } from '../../ephemeris';

// A minimal, hand-built ChartData — enough fields for assemble.ts's natal-chart
// mapping, not a real computed chart (buildFacts.test.ts already covers real computation).
function fakeChart(): ChartData {
  const planet = (name: string, sign: string, house: number) => ({
    name, symbol: '', longitude: 0, sign, signSymbol: '', degree: 12, element: '', quality: '', description: '', house,
  });
  return {
    sun: planet('Sun', 'Leo', 5),
    moon: planet('Moon', 'Cancer', 4),
    rising: { ...planet('Rising', 'Libra', 1), name: 'Rising', symbol: '↑' },
    mercury: planet('Mercury', 'Virgo', 6),
    venus: planet('Venus', 'Libra', 7),
    mars: planet('Mars', 'Aries', 1),
    jupiter: planet('Jupiter', 'Sagittarius', 9),
    saturn: planet('Saturn', 'Capricorn', 10),
    uranus: planet('Uranus', 'Aquarius', 11),
    neptune: planet('Neptune', 'Pisces', 12),
    pluto: planet('Pluto', 'Scorpio', 8),
    houseSystem: 'whole-sign',
    midheaven: 100, // 100deg -> Cancer, 10deg
    houses: { system: 'whole-sign', ascendantSign: 6, cusps: [] },
  };
}

function fakeCityFacts(name: string, country: string): CityFacts {
  const lineActivations = [
    { planet: 'Venus', angle: 'DC', distance: 8, score: 0.9, key: 'Venus_DC' }, // exact tier -> full placement
    { planet: 'Saturn', angle: 'MC', distance: 450, score: 0.2, key: 'Saturn_MC' }, // soft tier -> softer influence
  ];
  return {
    name,
    country,
    lat: 0,
    lon: 0,
    lineActivations,
    angularityFacts: {
      sectionId: `city-angularity-${name}`,
      facts: lineActivations.map((a) => ({ type: 'city-line-activation', city: name, planet: a.planet as 'Venus' | 'Saturn', angle: a.angle as 'DC' | 'MC', orbMiles: a.distance })),
    },
    placementFacts: lineActivations.map((a, i) => ({
      sectionId: `city-angularity-${name}-${i}`,
      facts: [{ type: 'city-line-activation' as const, city: name, planet: a.planet as 'Venus' | 'Saturn', angle: a.angle as 'DC' | 'MC', orbMiles: a.distance }],
    })),
  };
}

function fakeFacts(): OrderFacts {
  return {
    chart: fakeChart(),
    timezone: 'America/New_York',
    identityFacts: { sectionId: 'birth-chart-identity', facts: [{ type: 'planet-placement', planet: 'Sun', sign: 'Leo', house: 5 }] },
    perPlanetIdentityFacts: [{ sectionId: 'birth-chart-identity-0', facts: [{ type: 'planet-placement', planet: 'Sun', sign: 'Leo', house: 5 }] }],
    cities: [fakeCityFacts('Los Angeles', 'United States'), fakeCityFacts('Austin', 'United States')],
    rankingFacts: {},
  };
}

function fakeProse(facts: OrderFacts): GeneratedProse {
  const cities: GeneratedProse['cities'] = {};
  for (const city of facts.cities) {
    cities[city.name] = {
      synthesis: {
        nickname: `${city.name} nickname`,
        tagline: `${city.name} tagline`,
        intro: `${city.name} intro.`,
        combinedEnergy: [`${city.name} combined energy paragraph.`],
        bottomLine: `${city.name} bottom line.`,
        forRomance: null,
        forCareer: null,
      },
      placements: [{ activationIndex: 0, placement: { body: 'Venus DC body.', whatToDo: 'Venus DC what to do.' } }],
    };
  }
  return {
    identityIntro: 'Natal chart intro.',
    perPlanetDescriptions: { Sun: 'Sun description.', Moon: 'Moon description.', Ascendant: 'Rising description.' },
    cities,
  };
}

function fakeDomainInsight(label: string) {
  return { pattern: `${label} pattern.`, watchFor: `${label} watch for.`, practice: `${label} practice.` };
}

/** fakeProse() plus the natal-only domain-section fields assembleNatalReportContent requires. */
function fakeNatalProse(facts: OrderFacts): GeneratedProse {
  return {
    ...fakeProse(facts),
    // Natal-only tier only describes Sun/Moon/Ascendant/Uranus/Neptune/Pluto flatly — Mercury/Venus/Mars/Saturn move into the domain sections below.
    perPlanetDescriptions: {
      Sun: 'Sun description.',
      Moon: 'Moon description.',
      Ascendant: 'Rising description.',
      Uranus: 'Uranus description.',
      Neptune: 'Neptune description.',
      Pluto: 'Pluto description.',
    },
    coreDrives: {
      Mercury: fakeDomainInsight('Mercury'),
      Venus: fakeDomainInsight('Venus'),
      Mars: fakeDomainInsight('Mars'),
      Saturn: fakeDomainInsight('Saturn'),
    },
    decisionMaking: fakeDomainInsight('Decision Making'),
    emotionalPattern: fakeDomainInsight('Emotional Pattern'),
    restRecharge: fakeDomainInsight('Rest & Recharge'),
    relationshipBlueprint: fakeDomainInsight('Relationship Blueprint'),
    workImpact: fakeDomainInsight('Work & Impact'),
    shadowGrowth: fakeDomainInsight('Shadow & Growth'),
    practicalTakeaways: {
      keyInsight: 'Key insight.',
      leanInto: ['Lean 1', 'Lean 2', 'Lean 3'],
      watchFor: ['Watch 1', 'Watch 2', 'Watch 3'],
      reframe: 'Reframe.',
      tryThis: 'Try this.',
      notice: 'Notice this.',
    },
  };
}

describe('assembleReportContent', () => {
  it('maps facts + prose into a well-formed ReportContent for the combined tier', () => {
    const facts = fakeFacts();
    const prose = fakeProse(facts);
    const content = assembleReportContent({ input: SAMPLE_ORDER_INPUT, facts, prose, generatedAt: new Date('2026-08-01') });

    expect(content.client).toBe(SAMPLE_ORDER_INPUT.client);
    expect(content.monthYear).toBe('August 2026');
    expect(content.citiesListLabel).toBe('Los Angeles, Austin');

    // Natal chart present for combined tier, sourced from prose, not invented.
    expect(content.natalChart).toBeDefined();
    expect(content.natalChart!.intro).toBe('Natal chart intro.');
    expect(content.natalChart!.bigThree.find((b) => b.label === 'Sun')?.description).toBe('Sun description.');
    expect(content.natalChart!.bigThree.find((b) => b.label === 'Rising')?.description).toBe('Rising description.');

    for (const city of content.cities) {
      // Only the exact-tier Venus/DC activation becomes a full placement box.
      expect(city.placements).toHaveLength(1);
      expect(city.placements[0].planet).toBe('Venus');
      expect(city.placements[0].angle).toBe('DC');
      expect(city.placements[0].header).toContain('VENUS ON DESCENDANT');

      // Only the soft-tier Saturn/MC activation becomes a softer influence, with a
      // deterministic (non-LLM) note sourced from astrocartography/interpretations.ts.
      expect(city.softerInfluences).toHaveLength(1);
      expect(city.softerInfluences![0].planet).toBe('Saturn');
      expect(city.softerInfluences![0].note.length).toBeGreaterThan(0);

      // Badges only include the full-placement tier, not soft-tier.
      expect(city.badges).toEqual([{ planet: 'Venus', angle: 'DC' }]);
    }

    // planetaryLines is deduplicated across cities and uses the deterministic interpretation blurb.
    expect(content.planetaryLines).toHaveLength(1); // Venus/DC appears in both cities but only once here
    expect(content.planetaryLines[0].blurb.length).toBeGreaterThan(0);
  });

  it('omits natalChart entirely for the relocation-only tier', () => {
    const facts = fakeFacts();
    facts.identityFacts = undefined;
    facts.perPlanetIdentityFacts = undefined;
    const prose = fakeProse(facts);
    prose.identityIntro = undefined;
    prose.perPlanetDescriptions = undefined;

    const content = assembleReportContent({
      input: { ...SAMPLE_ORDER_INPUT, reportTier: 'relocation-only' },
      facts,
      prose,
    });

    expect(content.natalChart).toBeUndefined();
  });
});

describe('assembleNatalReportContent', () => {
  it('maps facts + prose into a well-formed NatalReportContent, with no relocation content at all', () => {
    // Realistic natal-only shape: no cities, matching what buildFactsForOrder
    // actually returns for this tier (see buildFacts.test.ts).
    const facts = { ...fakeFacts(), cities: [], rankingFacts: {} };
    const prose = fakeNatalProse(facts);

    const content = assembleNatalReportContent({
      input: SAMPLE_NATAL_ORDER_INPUT,
      facts,
      prose,
      generatedAt: new Date('2026-08-01'),
    });

    expect(content.client).toBe(SAMPLE_NATAL_ORDER_INPUT.client);
    expect(content.monthYear).toBe('August 2026');
    expect(content.natalChart.intro).toBe('Natal chart intro.');
    expect(content.natalChart.bigThree.find((b) => b.label === 'Sun')?.description).toBe('Sun description.');

    // Not present on NatalReportContent at all — no city/relocation shape to carry.
    expect('cities' in content).toBe(false);
    expect('planetaryLines' in content).toBe(false);

    // "What Your Chart Shows" only lists the outer planets for natal-only —
    // Sun/Moon are already covered by the Big Three cards (checked above),
    // and Mercury/Venus/Mars/Saturn moved into the domain sections below.
    const planetDescription = (name: string) => content.natalChart.planets.find((p) => p.planet === name)?.description;
    expect(planetDescription('Sun')).toBeUndefined();
    expect(planetDescription('Moon')).toBeUndefined();
    expect(planetDescription('Mercury')).toBeUndefined();
    expect(planetDescription('Venus')).toBeUndefined();
    expect(planetDescription('Mars')).toBeUndefined();
    expect(planetDescription('Saturn')).toBeUndefined();
    expect(planetDescription('Uranus')).toBe('Uranus description.');
    expect(planetDescription('Neptune')).toBe('Neptune description.');
    expect(planetDescription('Pluto')).toBe('Pluto description.');

    // Core Drives: one card per planet, paired with that planet's real sign/house from the chart, not invented.
    expect(content.coreDrives).toHaveLength(4);
    const mercuryCard = content.coreDrives.find((c) => c.planet === 'Mercury');
    expect(mercuryCard?.sign).toBe('Virgo'); // from fakeChart()
    expect(mercuryCard?.house).toBe(6);
    expect(mercuryCard?.pattern).toBe('Mercury pattern.');

    // Single-planet domain sections paired with the right real placement.
    expect(content.decisionMaking.sign).toBe('Virgo'); // Mercury
    expect(content.emotionalPattern.sign).toBe('Cancer'); // Moon
    expect(content.restRecharge.sign).toBe('Cancer'); // Moon
    expect(content.relationshipBlueprint.sign).toBe('Cancer'); // Moon
    expect(content.workImpact.sign).toBe('Leo'); // Sun
    expect(content.shadowGrowth.sign).toBe('Leo'); // Sun

    // Whole-chart synthesis closing section, not invented.
    expect(content.practicalTakeaways.leanInto).toHaveLength(3);
    expect(content.practicalTakeaways.keyInsight).toBe('Key insight.');
  });

  it('throws if narration never produced a natalChart (should never happen given orchestrate.ts\'s flow, but assembly must not silently ship a report with no content)', () => {
    const facts = { ...fakeFacts(), cities: [], rankingFacts: {}, identityFacts: undefined, perPlanetIdentityFacts: undefined };
    const prose = fakeProse(facts);
    prose.identityIntro = undefined;
    prose.perPlanetDescriptions = undefined;

    expect(() => assembleNatalReportContent({ input: SAMPLE_NATAL_ORDER_INPUT, facts, prose })).toThrow();
  });

  it('throws with a clear message if a domain-section field is missing (narration must complete before assembly, not silently ship a gap)', () => {
    const facts = { ...fakeFacts(), cities: [], rankingFacts: {} };
    const prose = fakeNatalProse(facts);
    prose.decisionMaking = undefined;

    expect(() => assembleNatalReportContent({ input: SAMPLE_NATAL_ORDER_INPUT, facts, prose })).toThrow(/decisionMaking/);
  });
});
