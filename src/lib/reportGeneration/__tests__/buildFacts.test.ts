import { describe, it, expect } from 'vitest';
import { buildFactsForOrder } from '../buildFacts';
import { SAMPLE_ORDER_INPUT, type RelocationOrderInput } from '../orderInput';

describe('buildFactsForOrder', () => {
  it('computes a natal chart and per-city facts for the sample fixture (combined tier)', async () => {
    const facts = await buildFactsForOrder(SAMPLE_ORDER_INPUT);

    expect(facts.chart.sun.sign).toBeTruthy();
    expect(facts.chart.houseSystem).toBe('whole-sign');
    expect(facts.timezone).toBeTruthy();

    // Combined tier: identity facts present, one payload per planet/Ascendant.
    expect(facts.identityFacts).toBeDefined();
    expect(facts.identityFacts!.facts.length).toBeGreaterThan(0);
    expect(facts.perPlanetIdentityFacts).toBeDefined();
    for (const payload of facts.perPlanetIdentityFacts!) {
      expect(payload.facts).toHaveLength(1);
    }

    // Explicit destinationCities from the fixture were used, not algorithmic ranking.
    expect(facts.cities.map((c) => c.name)).toEqual(['Los Angeles', 'Austin']);

    for (const city of facts.cities) {
      // Every placementFacts entry is single-tuple — this is what keeps
      // generatePlacement's grounding check strict (see groundingCheck.test.ts).
      for (const payload of city.placementFacts) {
        expect(payload.facts).toHaveLength(1);
      }
      // angularityFacts contains every activation for the city, matching lineActivations.
      expect(city.angularityFacts.facts).toHaveLength(city.lineActivations.length);

      // Combined tier: relocated houses computed per destination.
      expect(city.relocatedChart).toBeDefined();
      expect(city.relocatedHouseFacts).toBeDefined();
    }

    // City ranking facts computed for every requested theme.
    for (const theme of SAMPLE_ORDER_INPUT.themes) {
      expect(facts.rankingFacts[theme]).toBeDefined();
    }
  });

  it('relocation-only tier omits identity and relocated-house facts', async () => {
    const input: RelocationOrderInput = { ...SAMPLE_ORDER_INPUT, reportTier: 'relocation-only' };
    const facts = await buildFactsForOrder(input);

    expect(facts.identityFacts).toBeUndefined();
    expect(facts.perPlanetIdentityFacts).toBeUndefined();
    for (const city of facts.cities) {
      expect(city.relocatedChart).toBeUndefined();
      expect(city.relocatedHouseFacts).toBeUndefined();
    }
  });

  it('falls back to algorithmic top-city ranking when no destinationCities are given', async () => {
    const input: RelocationOrderInput = { ...SAMPLE_ORDER_INPUT, destinationCities: undefined, cityCount: 2 };
    const facts = await buildFactsForOrder(input);

    expect(facts.cities).toHaveLength(2);
    // Algorithmically-ranked cities should differ from the fixture's explicit picks
    // in general, but at minimum must be real, named cities from the dataset.
    for (const city of facts.cities) {
      expect(city.name).toBeTruthy();
      expect(city.country).toBeTruthy();
    }
  });
});
