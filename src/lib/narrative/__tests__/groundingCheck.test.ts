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

describe('groundingCheck: multi-entity sentences and why Phase 6 scopes placement generation to a single tuple', () => {
  // Real Phase 6 review finding: the first draft of Phase 6's narrative
  // layer planned to batch a whole city's placements into one
  // generateObject call, checked against that city's FULL multi-fact
  // payload. This reopens the exact hole tier-1 pairing exists to close —
  // tier-1 only fires for a sentence naming exactly one planet + one
  // house/sign/angle; a sentence naming TWO planets and TWO angles (which
  // synthesis text like "combinedEnergy" requires, by design) falls through
  // to tier-2's loose "does each token appear somewhere" check.
  const multiFactCityPayload: FactsPayload = {
    sectionId: 'city-angularity-Los Angeles',
    facts: [
      { type: 'city-line-activation', city: 'Los Angeles', planet: 'Venus', angle: 'DC', orbMiles: 8 },
      { type: 'city-line-activation', city: 'Los Angeles', planet: 'Saturn', angle: 'MC', orbMiles: 15 },
    ],
  };

  // Both individually-true placements, swapped: Venus is really on the DC
  // (relationships), Saturn is really on the MC (career) — this sentence
  // asserts the opposite pairing.
  const swappedPairingProse = 'Venus energizes your career ambition here while Saturn steadies your close partnerships.';

  it('demonstrates the vulnerability: a multi-fact payload lets a swapped pairing slip through', () => {
    const result = checkGrounding(swappedPairingProse, multiFactCityPayload);
    // Every token (Venus, Saturn, MC, DC-implied-by-"partnerships"... in this
    // case no literal angle words appear, so tier-2's token check has
    // nothing to flag either) has *some* backing fact in the payload, so
    // this incorrectly grounds. This is exactly why generatePlacement.ts
    // never checks against a multi-fact payload.
    expect(result.grounded).toBe(true);
  });

  it('the fix: the SAME prose, checked against a single-tuple payload, correctly rejects the out-of-scope claim', () => {
    // This is what generatePlacement.ts actually does: scope the payload to
    // exactly the one placement being written about (here, only Venus/DC).
    const singleTuplePayload: FactsPayload = {
      sectionId: 'city-angularity-Los Angeles-0',
      facts: [multiFactCityPayload.facts[0]], // Venus/DC only
    };
    const result = checkGrounding(swappedPairingProse, singleTuplePayload);
    expect(result.grounded).toBe(false);
    // Saturn and MC aren't in this placement's payload at all.
    expect(result.violations.some((v) => v.reason.includes('Saturn'))).toBe(true);
  });
});
