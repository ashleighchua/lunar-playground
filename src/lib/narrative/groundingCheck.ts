import { PLANETS, SIGNS, ANGLES, SYNONYMS, STYLISTIC_ADJECTIVES, type PlanetName, type SignName, type AngleName } from '../reportFacts/vocabulary';
import type { Fact, FactsPayload } from '../reportFacts/types';

/**
 * Deterministic (no LLM) grounding verifier. Checks generated prose against
 * the exact FactsPayload it was supposed to be written from, and rejects any
 * claim that isn't backed by it.
 *
 * Two tiers, deliberately:
 *  1. STRICT PAIRING — when a sentence names exactly one planet and exactly
 *     one house/sign/angle, that's an unambiguous single claim (e.g. "Venus in
 *     your 7th house"), checked as one bound tuple against the payload. This
 *     is what catches the false-negative hole plain token-presence matching
 *     has: two independently-true tokens ("Venus" and "7" both appear
 *     *somewhere* in the payload for unrelated facts) don't make "Venus in
 *     your 7th house" true unless that specific pairing is actually a fact.
 *  2. LOOSE TOKEN CHECK — every planet/sign/angle/house token mentioned
 *     *anywhere* in the prose must correspond to some fact in the payload.
 *     Catches wholesale fabrication (a planet/house that isn't in the payload
 *     at all) even in sentences too complex for tier 1 to confidently pair.
 *
 * This is a heuristic, not full NLP — sentences with more than one plausible
 * planet/house pairing fall through to the looser tier-2 check rather than
 * being confidently (and possibly wrongly) tier-1 rejected. Known, accepted
 * limitation: only vocabulary this system tracks (10 traditional planets,
 * 12 signs, 4 angles, 12 houses, life themes) can be checked at all — a
 * fabricated reference to something outside that vocabulary (e.g. an
 * asteroid or lunar node) isn't currently detectable.
 */

export interface GroundingViolation {
  sentence: string;
  reason: string;
}

export interface GroundingResult {
  grounded: boolean;
  violations: GroundingViolation[];
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function stripStylisticAdjectives(text: string): string {
  let result = text;
  for (const adj of STYLISTIC_ADJECTIVES) {
    result = result.replace(new RegExp(`\\b${adj}\\b`, 'gi'), ' ');
  }
  return result;
}

function applySynonyms(text: string): string {
  let result = text;
  // Longest phrase first so e.g. "10th house" doesn't get partially consumed
  // by a shorter, unrelated phrase before the full match is attempted.
  const phrases = Object.keys(SYNONYMS).sort((a, b) => b.length - a.length);
  for (const phrase of phrases) {
    const re = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'gi');
    result = result.replace(re, ` ${SYNONYMS[phrase]} `);
  }
  return result;
}

function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
}

interface Mentions {
  planets: PlanetName[];
  signs: SignName[];
  angles: AngleName[];
  houses: number[];
}

function findMentions(normalizedSentence: string): Mentions {
  const planets = PLANETS.filter((p) => new RegExp(`\\b${p}\\b`, 'i').test(normalizedSentence));
  const signs = SIGNS.filter((s) => new RegExp(`\\b${s}\\b`, 'i').test(normalizedSentence));
  const angles = ANGLES.filter((a) => new RegExp(`\\b${a}\\b`).test(normalizedSentence));
  const houses = [...normalizedSentence.matchAll(/\bHOUSE_(\d{1,2})\b/g)].map((m) => parseInt(m[1], 10));
  return { planets, signs, angles, houses };
}

function hasPlanetHouseFact(facts: Fact[], planet: PlanetName, house: number): boolean {
  return facts.some(
    (f) =>
      (f.type === 'planet-placement' && f.planet === planet && f.house === house) ||
      (f.type === 'relocated-house-shift' &&
        f.planet === planet &&
        (f.natalHouse === house || f.relocatedHouse === house))
  );
}

function hasPlanetSignFact(facts: Fact[], planet: PlanetName, sign: SignName): boolean {
  return facts.some((f) => f.type === 'planet-placement' && f.planet === planet && f.sign === sign);
}

function hasAscendantSignFact(facts: Fact[], sign: SignName): boolean {
  return facts.some((f) => f.type === 'ascendant-sign' && f.sign === sign);
}

function hasPlanetAngleFact(facts: Fact[], planet: PlanetName, angle: AngleName): boolean {
  return facts.some((f) => f.type === 'city-line-activation' && f.planet === planet && f.angle === angle);
}

function anyFactMentionsPlanet(facts: Fact[], planet: PlanetName): boolean {
  return facts.some(
    (f) =>
      (f.type === 'planet-placement' && f.planet === planet) ||
      (f.type === 'relocated-house-shift' && f.planet === planet) ||
      (f.type === 'city-line-activation' && f.planet === planet)
  );
}

function anyFactMentionsSign(facts: Fact[], sign: SignName): boolean {
  return facts.some(
    (f) => (f.type === 'planet-placement' && f.sign === sign) || (f.type === 'ascendant-sign' && f.sign === sign)
  );
}

function anyFactMentionsAngle(facts: Fact[], angle: AngleName): boolean {
  return facts.some((f) => f.type === 'city-line-activation' && f.angle === angle);
}

function anyFactMentionsHouse(facts: Fact[], house: number): boolean {
  return facts.some(
    (f) =>
      (f.type === 'planet-placement' && f.house === house) ||
      (f.type === 'relocated-house-shift' && (f.natalHouse === house || f.relocatedHouse === house))
  );
}

export function checkGrounding(prose: string, payload: FactsPayload): GroundingResult {
  const violations: GroundingViolation[] = [];

  for (const rawSentence of splitSentences(prose)) {
    const normalized = applySynonyms(stripStylisticAdjectives(rawSentence));
    const { planets, signs, angles, houses } = findMentions(normalized);

    // Tier 1: unambiguous single-planet + single-house/sign/angle pairing.
    if (planets.length === 1 && houses.length === 1 && signs.length === 0 && angles.length === 0) {
      if (!hasPlanetHouseFact(payload.facts, planets[0], houses[0])) {
        violations.push({
          sentence: rawSentence,
          reason: `claims ${planets[0]} in house ${houses[0]}, which isn't in the facts given for this section`,
        });
        continue;
      }
    } else if (planets.length === 1 && signs.length === 1 && houses.length === 0 && angles.length === 0) {
      if (!hasPlanetSignFact(payload.facts, planets[0], signs[0])) {
        violations.push({
          sentence: rawSentence,
          reason: `claims ${planets[0]} in ${signs[0]}, which isn't in the facts given for this section`,
        });
        continue;
      }
    } else if (planets.length === 1 && angles.length === 1 && houses.length === 0 && signs.length === 0) {
      if (!hasPlanetAngleFact(payload.facts, planets[0], angles[0])) {
        violations.push({
          sentence: rawSentence,
          reason: `claims ${planets[0]} on the ${angles[0]}, which isn't in the facts given for this section`,
        });
        continue;
      }
    } else if (planets.length === 0 && signs.length === 1 && angles.some((a) => a === 'AC') && houses.length === 0) {
      if (!hasAscendantSignFact(payload.facts, signs[0])) {
        violations.push({
          sentence: rawSentence,
          reason: `claims an Ascendant in ${signs[0]}, which isn't in the facts given for this section`,
        });
        continue;
      }
    }

    // Tier 2: loose check — every mentioned token must be backed by *some*
    // fact in the payload, even if this sentence was too ambiguous for tier 1.
    for (const planet of planets) {
      if (!anyFactMentionsPlanet(payload.facts, planet)) {
        violations.push({ sentence: rawSentence, reason: `mentions ${planet}, which isn't in the facts given for this section at all` });
      }
    }
    for (const sign of signs) {
      if (!anyFactMentionsSign(payload.facts, sign)) {
        violations.push({ sentence: rawSentence, reason: `mentions ${sign}, which isn't in the facts given for this section at all` });
      }
    }
    for (const angle of angles) {
      if (!anyFactMentionsAngle(payload.facts, angle)) {
        violations.push({ sentence: rawSentence, reason: `mentions the ${angle}, which isn't in the facts given for this section at all` });
      }
    }
    for (const house of houses) {
      if (!anyFactMentionsHouse(payload.facts, house)) {
        violations.push({ sentence: rawSentence, reason: `mentions house ${house}, which isn't in the facts given for this section at all` });
      }
    }
  }

  return { grounded: violations.length === 0, violations };
}
