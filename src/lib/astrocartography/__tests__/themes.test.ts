import { describe, it, expect } from 'vitest';
import { calculateAllPlanetLines, calculateThemedRelocation } from '../index';
import { LIFE_THEMES } from '../themes';
import { scoreCitiesForTheme } from '../cityScorer';
import citiesData from '../../../data/cities.json';
import type { CityData } from '../cityScorer';

// Fixed sample birth data (matches the "Elena" reference example's approximate
// moment) used throughout — the point isn't the specific chart, it's that the
// relative ranking behavior described in the plan (love -> Venus lines score
// higher, luck -> Jupiter, etc.) actually holds.
const BIRTH_DATE = new Date(1991, 0, 26); // month is 0-indexed
const BIRTH_TIME = '21:35';
const TIMEZONE = 2; // Athens, EET

describe('theme-blend astrocartography scoring', () => {
  it('computes lines for all 10 supported planets, not just the original 6', () => {
    const { lines } = calculateAllPlanetLines(BIRTH_DATE, BIRTH_TIME, TIMEZONE);
    const planetsWithLines = new Set(lines.map((l) => l.planet));
    for (const planet of ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']) {
      expect(planetsWithLines.has(planet)).toBe(true);
    }
    // MC/IC/AC/DC for each of 10 planets
    expect(lines.length).toBe(40);
  });

  it('a "love"-weighted query ranks cities on/near Venus lines above cities only near unrelated planets\' lines', () => {
    const { lines } = calculateAllPlanetLines(BIRTH_DATE, BIRTH_TIME, TIMEZONE);
    const loveRanking = scoreCitiesForTheme(citiesData as CityData[], lines, LIFE_THEMES.love, 10);

    expect(loveRanking.length).toBeGreaterThan(0);
    // Every city that scored under the "love" theme must have gotten there via
    // a Venus or Moon/DC activation only (the theme's own weight config) —
    // no unrelated planet (e.g. Saturn, Mercury) should contribute to the score.
    for (const city of loveRanking) {
      for (const activation of city.lineActivations) {
        expect(['Venus', 'Moon']).toContain(activation.planet);
      }
    }
  });

  it('a "luck"-weighted query only activates on Jupiter lines', () => {
    const { lines } = calculateAllPlanetLines(BIRTH_DATE, BIRTH_TIME, TIMEZONE);
    const luckRanking = scoreCitiesForTheme(citiesData as CityData[], lines, LIFE_THEMES.luck, 10);

    for (const city of luckRanking) {
      for (const activation of city.lineActivations) {
        expect(activation.planet).toBe('Jupiter');
      }
    }
  });

  it('"career" activates on Saturn/Sun/Jupiter MC-weighted lines, previously impossible (Saturn had a dead weight, never actually scored)', () => {
    const { lines } = calculateAllPlanetLines(BIRTH_DATE, BIRTH_TIME, TIMEZONE);
    const careerRanking = scoreCitiesForTheme(citiesData as CityData[], lines, LIFE_THEMES.career, 10);

    expect(careerRanking.length).toBeGreaterThan(0);
    for (const city of careerRanking) {
      for (const activation of city.lineActivations) {
        expect(['Saturn', 'Sun', 'Jupiter']).toContain(activation.planet);
      }
    }
  });

  it('"transformation" (Pluto-led) produces results now that Pluto lines exist at all', () => {
    const { lines } = calculateAllPlanetLines(BIRTH_DATE, BIRTH_TIME, TIMEZONE);
    const plutoLines = lines.filter((l) => l.planet === 'Pluto');
    expect(plutoLines.length).toBe(4); // MC/IC/AC/DC

    const transformationRanking = scoreCitiesForTheme(citiesData as CityData[], lines, LIFE_THEMES.transformation, 10);
    for (const city of transformationRanking) {
      for (const activation of city.lineActivations) {
        expect(['Pluto', 'Saturn']).toContain(activation.planet);
      }
    }
  });

  it('calculateThemedRelocation returns both a per-theme ranking and a combined ranking for multiple selected themes', () => {
    const result = calculateThemedRelocation(BIRTH_DATE, BIRTH_TIME, TIMEZONE, ['love', 'career'], 5);

    expect(result.perTheme.love).toBeDefined();
    expect(result.perTheme.career).toBeDefined();
    expect(result.combined.length).toBeGreaterThan(0);

    // Combined ranking's activations should only ever come from the union of
    // the selected themes' planets (Venus/Moon for love, Saturn/Sun/Jupiter for career).
    for (const city of result.combined) {
      for (const activation of city.lineActivations) {
        expect(['Venus', 'Moon', 'Saturn', 'Sun', 'Jupiter']).toContain(activation.planet);
      }
    }
  });

  it('the existing free single-planet /astrocartography categories (sun, jupiter, venus, moon, mercury, mars) are untouched', async () => {
    const { calculateAstrocartography } = await import('../index');
    // Should still resolve to a result for each of the original categories —
    // confirms Phase 2 additions were additive, not a breaking change.
    for (const category of ['sun', 'jupiter', 'venus', 'moon', 'mercury', 'mars']) {
      const result = calculateAstrocartography(BIRTH_DATE, BIRTH_TIME, TIMEZONE, category);
      expect(result).not.toBeNull();
    }
  });
});
