import { isPlanet, isSign, isAngle, isHouse, THEME_NAMES } from './vocabulary';
import type { Fact, FactsPayload } from './types';

/**
 * Self-check that a facts payload is itself built entirely from recognized
 * vocabulary — i.e. the facts engine can't accidentally hand the narrative
 * layer (Phase 4) a fabricated planet/sign/house/angle any more than the
 * model is allowed to invent one. Run this on every payload before it's used.
 */
export function validateFactsPayload(payload: FactsPayload): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  for (const [i, fact] of payload.facts.entries()) {
    const prefix = `facts[${i}] (${fact.type})`;
    validateFact(fact, prefix, errors);
  }

  return { valid: errors.length === 0, errors };
}

function validateFact(fact: Fact, prefix: string, errors: string[]): void {
  switch (fact.type) {
    case 'planet-placement':
      if (!isPlanet(fact.planet)) errors.push(`${prefix}: unknown planet "${fact.planet}"`);
      if (!isSign(fact.sign)) errors.push(`${prefix}: unknown sign "${fact.sign}"`);
      if (fact.house !== undefined && !isHouse(fact.house)) {
        errors.push(`${prefix}: invalid house ${fact.house}`);
      }
      break;
    case 'ascendant-sign':
      if (!isSign(fact.sign)) errors.push(`${prefix}: unknown sign "${fact.sign}"`);
      break;
    case 'relocated-house-shift':
      if (!isPlanet(fact.planet)) errors.push(`${prefix}: unknown planet "${fact.planet}"`);
      if (!isHouse(fact.natalHouse)) errors.push(`${prefix}: invalid natalHouse ${fact.natalHouse}`);
      if (!isHouse(fact.relocatedHouse)) errors.push(`${prefix}: invalid relocatedHouse ${fact.relocatedHouse}`);
      if (!fact.city) errors.push(`${prefix}: missing city`);
      break;
    case 'city-line-activation':
      if (!isPlanet(fact.planet)) errors.push(`${prefix}: unknown planet "${fact.planet}"`);
      if (!isAngle(fact.angle)) errors.push(`${prefix}: unknown angle "${fact.angle}"`);
      if (!fact.city) errors.push(`${prefix}: missing city`);
      if (!(fact.orbMiles >= 0)) errors.push(`${prefix}: invalid orbMiles ${fact.orbMiles}`);
      break;
    case 'city-theme-ranking':
      if (!(THEME_NAMES as readonly string[]).includes(fact.theme)) {
        errors.push(`${prefix}: unknown theme "${fact.theme}"`);
      }
      if (!fact.city) errors.push(`${prefix}: missing city`);
      if (!(fact.rank >= 1)) errors.push(`${prefix}: invalid rank ${fact.rank}`);
      break;
    default: {
      // Exhaustiveness check — a new Fact variant added to types.ts without a
      // matching case here will fail to compile, not fail silently at runtime.
      const _exhaustive: never = fact;
      errors.push(`${prefix}: unrecognized fact type`);
      void _exhaustive;
    }
  }
}
