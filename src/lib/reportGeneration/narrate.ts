import type { RelocationOrderInput } from './orderInput';
import type { OrderFacts } from './buildFacts';
import { generateSection, type ModelTier } from '../narrative/generateSection';
import { generatePlacement, type PlacementObject } from '../narrative/generatePlacement';
import { generateCitySynthesis, type CitySynthesisObject } from '../narrative/generateCitySynthesis';
import { tierForMiles, isFullPlacementTier } from './tiers';
import { themeLabelFor, type AstroAngle } from '../astrocartography/themes';
import type { GroundingViolation } from '../narrative/groundingCheck';

function summarizeViolations(violations?: GroundingViolation[]): string {
  if (!violations || violations.length === 0) return '';
  return ' — ' + violations.map((v) => `"${v.sentence}" (${v.reason})`).join('; ');
}

export interface CityProse {
  synthesis: CitySynthesisObject;
  /** activationIndex indexes into the matching CityFacts.lineActivations / placementFacts. */
  placements: { activationIndex: number; placement: PlacementObject }[];
}

export interface GeneratedProse {
  identityIntro?: string;
  /** Keyed by planet name, or 'Ascendant' for the rising-sign fact. Combined tier only. */
  perPlanetDescriptions?: Record<string, string>;
  cities: Record<string, CityProse>;
}

/**
 * Thrown by any narration step that exhausts its grounding retries — the
 * orchestrator's try/catch turns this into a 'held-for-review' job status
 * rather than shipping a degraded report or leaving the job stuck.
 */
export class HeldForReviewError extends Error {
  constructor(reason: string) {
    super(reason);
    this.name = 'HeldForReviewError';
  }
}

function modelTierFor(reportTier: RelocationOrderInput['reportTier']): ModelTier {
  return reportTier === 'combined' ? 'premium' : 'standard';
}

function fallbackSynthesisForEmptyCity(): CitySynthesisObject {
  return {
    nickname: '',
    tagline: '',
    intro: 'No major planetary lines were found within range of this location for this reading.',
    combinedEnergy: [],
    bottomLine: 'This location did not register a strong astrocartography signature in this reading.',
    forRomance: null,
    forCareer: null,
  };
}

/**
 * Runs every LLM narration call a report needs: natal identity (combined
 * tier only), and per-city synthesis + per-placement text. Each call is
 * scoped to the smallest facts payload that can still be strictly checked
 * (see generatePlacement.ts's header comment for why) — this function's job
 * is just to sequence those calls and assemble their results, not to
 * generate anything itself.
 */
export async function narrateOrder(input: RelocationOrderInput, facts: OrderFacts): Promise<GeneratedProse> {
  const modelTier = modelTierFor(input.reportTier);
  const prose: GeneratedProse = { cities: {} };

  if (input.reportTier === 'combined' && facts.identityFacts && facts.perPlanetIdentityFacts) {
    const introResult = await generateSection({
      payload: facts.identityFacts,
      promptTemplate: `Write a short (3-4 sentence) introduction to ${input.client}'s birth chart, previewing the overall pattern across the placements below.`,
      tier: modelTier,
    });
    if (introResult.heldForReview || !introResult.prose) {
      throw new HeldForReviewError(`Natal chart intro failed grounding after ${introResult.attempts} attempts${summarizeViolations(introResult.lastViolations)}`);
    }
    prose.identityIntro = introResult.prose;

    const perPlanetDescriptions: Record<string, string> = {};
    for (const payload of facts.perPlanetIdentityFacts) {
      const fact = payload.facts[0];
      const label = fact.type === 'planet-placement' ? fact.planet : 'Ascendant';
      const result = await generateSection({
        payload,
        promptTemplate: `Write a short (2-3 sentence) description of what this single placement means for ${input.client}. This payload contains only ONE placement — do not mention any other planet, sign, house, or angle, including a sign's traditional ruling planet or any other astrological association not listed in the facts below.`,
        tier: modelTier,
      });
      if (result.heldForReview || !result.prose) {
        throw new HeldForReviewError(`Natal identity placement for ${label} failed grounding after ${result.attempts} attempts${summarizeViolations(result.lastViolations)}`);
      }
      perPlanetDescriptions[label] = result.prose;
    }
    prose.perPlanetDescriptions = perPlanetDescriptions;
  }

  for (const city of facts.cities) {
    if (city.lineActivations.length === 0) {
      prose.cities[city.name] = { synthesis: fallbackSynthesisForEmptyCity(), placements: [] };
      continue;
    }

    const synthesisResult = await generateCitySynthesis({
      payload: city.angularityFacts,
      promptTemplate: `Write the introductory/summary copy for ${city.name}, ${city.country} in ${input.client}'s relocation reading, based on the placements below.`,
      tier: modelTier,
    });
    if (synthesisResult.heldForReview || !synthesisResult.synthesis) {
      throw new HeldForReviewError(`City synthesis for ${city.name} failed grounding after ${synthesisResult.attempts} attempts${summarizeViolations(synthesisResult.lastViolations)}`);
    }

    const placements: { activationIndex: number; placement: PlacementObject }[] = [];
    for (let i = 0; i < city.lineActivations.length; i++) {
      const activation = city.lineActivations[i];
      const tier = tierForMiles(activation.distance);
      if (!tier || !isFullPlacementTier(tier)) continue; // soft-tier: deterministic mention in assemble.ts, no LLM call

      // LineActivation.angle is typed as `string` (cityScorer.ts's general shape), but
      // buildFacts.ts's computeCityLineActivations always sources it from AstroLine.angle,
      // which is the real 'MC'|'IC'|'AC'|'DC' union.
      const label = themeLabelFor(activation.planet, activation.angle as AstroAngle);
      const result = await generatePlacement({
        payload: city.placementFacts[i],
        promptTemplate: `Write the placement box for ${activation.planet} on the ${activation.angle} in ${city.name}, ${city.country} (${activation.distance} miles away)${label ? `, themed around ${label}` : ''}.`,
        tier: modelTier,
      });
      if (result.heldForReview || !result.placement) {
        throw new HeldForReviewError(`Placement ${activation.planet} ${activation.angle} in ${city.name} failed grounding after ${result.attempts} attempts${summarizeViolations(result.lastViolations)}`);
      }
      placements.push({ activationIndex: i, placement: result.placement });
    }

    prose.cities[city.name] = { synthesis: synthesisResult.synthesis, placements };
  }

  return prose;
}
