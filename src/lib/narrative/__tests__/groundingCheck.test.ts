import { describe, it, expect } from 'vitest';
import { checkGrounding } from '../groundingCheck';
import type { FactsPayload } from '../../reportFacts/types';

describe('groundingCheck: correctly-grounded prose passes', () => {
  it('a straightforward, correctly-paired claim passes', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'planet-placement', planet: 'Venus', sign: 'Scorpio', house: 7 }],
    };
    const prose = 'Venus sits in Scorpio, in your 7th house, shaping how you love.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(true);
    expect(result.violations).toEqual([]);
  });

  it('stylistic adjectives never trigger a false-positive rejection', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'planet-placement', planet: 'Sun', sign: 'Leo' }],
    };
    const prose = 'There is something jovial and mercurial about how you move through a room, warm and quick all at once.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(true);
  });

  it('a Midheaven/MC synonym is recognized as the same claim as the literal token', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'city-line-activation', city: 'Los Angeles', planet: 'Saturn', angle: 'MC', orbMiles: 12 }],
    };
    const prose = 'Saturn was sitting right at your Midheaven above Los Angeles when you were born.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(true);
  });

  it('a "tenth house" synonym is recognized as the same claim as "10th house"', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'relocated-house-shift', planet: 'Sun', natalHouse: 5, relocatedHouse: 10, city: 'Los Angeles' }],
    };
    const prose = 'In LA, your Sun moves into the tenth house of career and public life.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(true);
  });
});

describe('groundingCheck: catches real hallucination', () => {
  it('rejects a wrong sign for a planet that IS in the payload (simple wrong-token case)', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'planet-placement', planet: 'Venus', sign: 'Scorpio' }],
    };
    const prose = 'Venus sits in Aries, giving you a bold, fast approach to love.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(false);
    expect(result.violations.length).toBeGreaterThan(0);
  });

  it('rejects a planet that never appears in the payload at all', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'planet-placement', planet: 'Venus', sign: 'Scorpio' }],
    };
    const prose = 'Mars drives you to act before you think.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(false);
  });

  it('THE KEY ADVERSARIAL CASE: catches a false pairing even when both tokens are independently true elsewhere in the payload', () => {
    // Venus and house 7 are each individually real facts here — but NOT paired
    // with each other. Venus is actually in house 3; house 7 actually belongs
    // to Saturn. A naive token-only verifier would wrongly pass this.
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [
        { type: 'planet-placement', planet: 'Venus', sign: 'Libra', house: 3 },
        { type: 'planet-placement', planet: 'Saturn', sign: 'Capricorn', house: 7 },
      ],
    };
    const prose = 'Venus in your 7th house means your relationships carry real weight and commitment.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(false);
    expect(result.violations.some((v) => v.reason.includes('Venus in house 7'))).toBe(true);
  });

  it('rejects a fabricated relocated-house claim not present in the payload', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'relocated-house-shift', planet: 'Pluto', natalHouse: 12, relocatedHouse: 7, city: 'Los Angeles' }],
    };
    const prose = 'Pluto moves into your 4th house here, deepening your sense of home.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(false);
  });

  it('rejects a planet claimed on an angle it was never actually activated on', () => {
    const payload: FactsPayload = {
      sectionId: 'test',
      facts: [{ type: 'city-line-activation', city: 'Los Angeles', planet: 'Saturn', angle: 'MC', orbMiles: 12 }],
    };
    const prose = 'Saturn sits right on your Descendant above this city, testing every partnership.';
    const result = checkGrounding(prose, payload);
    expect(result.grounded).toBe(false);
  });
});
