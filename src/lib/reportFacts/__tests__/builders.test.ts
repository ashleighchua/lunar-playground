import { describe, it, expect } from 'vitest';
import { calculateChart } from '../../ephemeris';
import { calculateRelocatedHouses } from '../../houses';
import { calculateAllPlanetLines } from '../../astrocartography';
import { scoreCitiesForTheme } from '../../astrocartography/cityScorer';
import { LIFE_THEMES } from '../../astrocartography/themes';
import citiesData from '../../../data/cities.json';
import type { CityData } from '../../astrocartography/cityScorer';
import {
  buildBirthChartIdentityFacts,
  buildRelocatedHouseShiftFacts,
  buildCityAngularityFacts,
  buildCityRankingFacts,
} from '../builders';
import { validateFactsPayload } from '../validate';

const BIRTH_DATA = {
  year: 1991,
  month: 1,
  day: 26,
  hour: 21,
  minute: 35,
  latitude: 37.98,
  longitude: 23.73, // Athens
  timezone: 2,
};

describe('facts engine: every builder produces a payload that passes its own validator', () => {
  it('birth-chart identity facts', async () => {
    const chart = await calculateChart(BIRTH_DATA);
    expect(chart).not.toBeNull();

    const payload = buildBirthChartIdentityFacts(chart!);
    const result = validateFactsPayload(payload);
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);

    // 10 planets + 1 ascendant fact expected
    expect(payload.facts.length).toBe(11);
    const ascendantFacts = payload.facts.filter((f) => f.type === 'ascendant-sign');
    expect(ascendantFacts.length).toBe(1);
  });

  it('relocated-house-shift facts, for a real destination city', async () => {
    const chart = await calculateChart(BIRTH_DATA);
    expect(chart).not.toBeNull();

    const jd = 2448282.145; // approx JD for the fixture — exact value unimportant, consistency is
    const natalLongitudes = [
      { name: 'Sun', longitude: chart!.sun.longitude },
      { name: 'Moon', longitude: chart!.moon.longitude },
      { name: 'Saturn', longitude: chart!.saturn.longitude },
      { name: 'Pluto', longitude: chart!.pluto.longitude },
    ];
    const relocated = calculateRelocatedHouses(natalLongitudes, jd, 34.05, -118.24); // LA

    const payload = buildRelocatedHouseShiftFacts(chart!, relocated, 'Los Angeles');
    const result = validateFactsPayload(payload);
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
    expect(payload.facts.length).toBe(4);
    for (const fact of payload.facts) {
      expect(fact.type).toBe('relocated-house-shift');
    }
  });

  it('city-angularity facts from a real theme-scored city', () => {
    const { lines } = calculateAllPlanetLines(new Date(1991, 0, 26), '21:35', 2);
    const ranking = scoreCitiesForTheme(citiesData as CityData[], lines, LIFE_THEMES.career, 1);
    expect(ranking.length).toBeGreaterThan(0);

    const top = ranking[0];
    const payload = buildCityAngularityFacts(top.name, top.lineActivations);
    const result = validateFactsPayload(payload);
    expect(result.errors).toEqual([]);
    expect(result.valid).toBe(true);
    expect(payload.facts.length).toBe(top.lineActivations.length);
  });

  it('city-ranking facts from a theme-scored list', () => {
    const { lines } = calculateAllPlanetLines(new Date(1991, 0, 26), '21:35', 2);
    const ranking = scoreCitiesForTheme(citiesData as CityData[], lines, LIFE_THEMES.love, 5);

    const payload = buildCityRankingFacts('love', ranking);
    const result = validateFactsPayload(payload);
    expect(result.valid).toBe(true);
    expect(payload.facts.map((f) => (f.type === 'city-theme-ranking' ? f.rank : null))).toEqual(
      ranking.map((_, i) => i + 1)
    );
  });
});

describe('facts engine: validator catches fabricated/corrupted facts', () => {
  it('rejects an unknown planet name', () => {
    const result = validateFactsPayload({
      sectionId: 'test',
      // @ts-expect-error deliberately invalid for the test
      facts: [{ type: 'planet-placement', planet: 'Ceres', sign: 'Aries' }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('unknown planet'))).toBe(true);
  });

  it('rejects an out-of-range house number', () => {
    const result = validateFactsPayload({
      sectionId: 'test',
      facts: [{ type: 'planet-placement', planet: 'Venus', sign: 'Libra', house: 14 as never }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('invalid house'))).toBe(true);
  });

  it('rejects a fabricated relocated-house-shift with an invalid house', () => {
    const result = validateFactsPayload({
      sectionId: 'test',
      facts: [{
        type: 'relocated-house-shift',
        planet: 'Saturn',
        natalHouse: 5,
        relocatedHouse: 0 as never,
        city: 'Los Angeles',
      }],
    });
    expect(result.valid).toBe(false);
  });

  it('rejects an unknown theme token in a city ranking fact', () => {
    const result = validateFactsPayload({
      sectionId: 'test',
      // @ts-expect-error deliberately invalid for the test
      facts: [{ type: 'city-theme-ranking', theme: 'wealth', city: 'Tokyo', rank: 1, score: 0.8 }],
    });
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.includes('unknown theme'))).toBe(true);
  });
});
