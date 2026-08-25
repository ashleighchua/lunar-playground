import { MOTIVATION_LABELS, NATAL_MOTIVATION_LABELS, type RelocationOrderInput } from './orderInput';
import type { OrderFacts } from './buildFacts';
import { generateSection, type ModelTier } from '../narrative/generateSection';
import { generatePlacement, type PlacementObject } from '../narrative/generatePlacement';
import { generateCitySynthesis, type CitySynthesisObject } from '../narrative/generateCitySynthesis';
import { generateLifeAreaInsight, type LifeAreaInsightObject } from '../narrative/generateLifeAreaInsight';
import { generateNatalSynthesis, type NatalSynthesisObject } from '../narrative/generateNatalSynthesis';
import { tierForMiles, isFullPlacementTier } from './tiers';
import { themeLabelFor, type AstroAngle } from '../astrocartography/themes';
import type { FactsPayload } from '../reportFacts/types';
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
  /** Keyed by planet name, or 'Ascendant' for the rising-sign fact. Combined tier: all planets. Natal-only tier: Sun/Moon/Ascendant/Uranus/Neptune/Pluto only — the rest live in the domain-section fields below. */
  perPlanetDescriptions?: Record<string, string>;
  /** Natal-only tier only — one Core Drives card per planet. */
  coreDrives?: Partial<Record<'Mercury' | 'Venus' | 'Mars' | 'Saturn', LifeAreaInsightObject>>;
  /** Natal-only tier only — single-planet domain sections. */
  decisionMaking?: LifeAreaInsightObject;
  emotionalPattern?: LifeAreaInsightObject;
  restRecharge?: LifeAreaInsightObject;
  relationshipBlueprint?: LifeAreaInsightObject;
  workImpact?: LifeAreaInsightObject;
  shadowGrowth?: LifeAreaInsightObject;
  /** Natal-only tier only — closing whole-chart synthesis. */
  practicalTakeaways?: NatalSynthesisObject;
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
  return reportTier === 'combined' || reportTier === 'natal-only' ? 'premium' : 'standard';
}

/**
 * Client-provided framing, not a fact — only appended to the two broadest
 * calls below (identity intro, city synthesis), never to the narrowly-scoped
 * single-placement calls, and never inspected by checkGrounding. Empty
 * string when the client skipped this at intake.
 */
export function motivationContext(input: RelocationOrderInput): string {
  if (!input.motivations || input.motivations.length === 0) return '';
  const labels = input.motivations.map((m) => MOTIVATION_LABELS[m]);
  return ` The client shared why they're considering this move: ${labels.join('; ')}. Use this only to inform tone and which of the given facts you lead with — never state it back as if the chart itself said it.`;
}

/**
 * Same guarantee as `motivationContext` above, for natal-only orders'
 * `natalMotivations` vocabulary instead of relocation `motivations`.
 */
export function natalMotivationContext(input: RelocationOrderInput): string {
  if (!input.natalMotivations || input.natalMotivations.length === 0) return '';
  const labels = input.natalMotivations.map((m) => NATAL_MOTIVATION_LABELS[m]);
  return ` The client shared why they wanted this reading: ${labels.join('; ')}. Use this only to inform tone and which of the given facts you lead with — never state it back as if the chart itself said it.`;
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

/** Thin wrapper: runs one generateLifeAreaInsight call and turns a failed/held result into a HeldForReviewError, so each call site below is one line. */
async function runLifeAreaInsight(payload: FactsPayload, promptTemplate: string, tier: ModelTier, errorLabel: string): Promise<LifeAreaInsightObject> {
  const result = await generateLifeAreaInsight({ payload, promptTemplate, tier });
  if (result.heldForReview || !result.insight) {
    throw new HeldForReviewError(`${errorLabel} failed grounding after ${result.attempts} attempts${summarizeViolations(result.lastViolations)}`);
  }
  return result.insight;
}

/** Angle each Core Drives card interprets its planet through — matches CoreDrivesSection.tsx's own framing ("How you think" / "How you connect" / "How you act" / "How you grow"). */
const CORE_DRIVE_ANGLE: Record<'Mercury' | 'Venus' | 'Mars' | 'Saturn', string> = {
  Mercury: 'how they think and process information',
  Venus: 'how they connect with and value others',
  Mars: 'how they act and assert themselves',
  Saturn: 'how they handle pressure, responsibility, and growth over time',
};

/**
 * Runs every LLM narration call a report needs. For the natal-only tier,
 * personal-planet content (Sun/Moon/Mercury/Venus/Mars/Saturn) is organized
 * into the same 9 life-domain categories the free interactive tool defines
 * in src/lib/sectionConfig.ts (Operating System, Core Drives, Decision
 * Making, Emotional Pattern, Rest & Recharge, Relationship Blueprint, Work &
 * Impact, Shadow & Growth, Practical Takeaways) rather than flat per-planet
 * blurbs — see the natal-chart-automation plan for why. The combined tier's
 * identity section is untouched (still flat per-planet descriptions), and
 * every relocation-report call below is untouched too.
 *
 * Each call is scoped to the smallest facts payload that can still be
 * strictly checked (see generatePlacement.ts's header comment for why) —
 * this function's job is just to sequence those calls and assemble their
 * results, not to generate anything itself.
 */
export async function narrateOrder(input: RelocationOrderInput, facts: OrderFacts): Promise<GeneratedProse> {
  const modelTier = modelTierFor(input.reportTier);
  const prose: GeneratedProse = { cities: {} };

  if ((input.reportTier === 'combined' || input.reportTier === 'natal-only') && facts.identityFacts && facts.perPlanetIdentityFacts) {
    const introResult = await generateSection({
      payload: facts.identityFacts,
      promptTemplate: `Write a short (3-4 sentence) introduction to ${input.client}'s birth chart, previewing the overall pattern across the placements below.${motivationContext(input)}${natalMotivationContext(input)}`,
      tier: modelTier,
    });
    if (introResult.heldForReview || !introResult.prose) {
      throw new HeldForReviewError(`Natal chart intro failed grounding after ${introResult.attempts} attempts${summarizeViolations(introResult.lastViolations)}`);
    }
    prose.identityIntro = introResult.prose;

    if (input.reportTier === 'combined') {
      // Combined tier: unchanged flat per-planet descriptions for every planet.
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
    } else {
      // Natal-only tier: Sun/Moon/Ascendant keep a flat description (feeds
      // the Big Three cards); Uranus/Neptune/Pluto keep a flat description
      // (feeds "Other Placements", not covered by any domain section);
      // Mercury/Venus/Mars/Saturn get NO flat description — their content
      // lives entirely in the domain sections below instead.
      const FLAT_DESCRIPTION_LABELS = new Set(['Sun', 'Moon', 'Ascendant', 'Uranus', 'Neptune', 'Pluto']);
      const perPlanetDescriptions: Record<string, string> = {};
      const coreDrives: GeneratedProse['coreDrives'] = {};

      for (const payload of facts.perPlanetIdentityFacts) {
        const fact = payload.facts[0];
        const label = fact.type === 'planet-placement' ? fact.planet : 'Ascendant';

        if (FLAT_DESCRIPTION_LABELS.has(label)) {
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

        if (label === 'Mercury' || label === 'Venus' || label === 'Mars' || label === 'Saturn') {
          coreDrives[label] = await runLifeAreaInsight(
            payload,
            `Interpret this ${label} placement through the lens of ${CORE_DRIVE_ANGLE[label]}, for ${input.client}.${natalMotivationContext(input)}`,
            modelTier,
            `Core Drives (${label})`
          );
        }

        if (label === 'Mercury') {
          prose.decisionMaking = await runLifeAreaInsight(
            payload,
            `Interpret this Mercury placement through the lens of ${input.client}'s natural style for making decisions — how they choose, and where that style tends to trip them up.${natalMotivationContext(input)}`,
            modelTier,
            'Decision Making'
          );
        }

        if (label === 'Moon') {
          prose.emotionalPattern = await runLifeAreaInsight(
            payload,
            `Interpret this Moon placement through the lens of how ${input.client} processes feelings day-to-day, and what happens emotionally under pressure.${natalMotivationContext(input)}`,
            modelTier,
            'Emotional Pattern'
          );
          prose.restRecharge = await runLifeAreaInsight(
            payload,
            `Interpret this Moon placement through the lens of what actually restores and recharges ${input.client}, versus what just looks like rest.${natalMotivationContext(input)}`,
            modelTier,
            'Rest & Recharge'
          );
          prose.relationshipBlueprint = await runLifeAreaInsight(
            payload,
            `Interpret this Moon placement through the lens of how ${input.client} bonds and attaches in close relationships, and where misunderstandings tend to begin.${natalMotivationContext(input)}`,
            modelTier,
            'Relationship Blueprint'
          );
        }

        if (label === 'Sun') {
          prose.workImpact = await runLifeAreaInsight(
            payload,
            `Interpret this Sun placement through the lens of what motivates ${input.client} at work, how burnout tends to develop for them, and the environment where they do their best work.${natalMotivationContext(input)}`,
            modelTier,
            'Work & Impact'
          );
          prose.shadowGrowth = await runLifeAreaInsight(
            payload,
            `Interpret this Sun placement through the lens of the recurring friction or pattern ${input.client} carries, and the path through it — their growth edge.${natalMotivationContext(input)}`,
            modelTier,
            'Shadow & Growth'
          );
        }
      }

      prose.perPlanetDescriptions = perPlanetDescriptions;
      prose.coreDrives = coreDrives;

      const takeawaysResult = await generateNatalSynthesis({
        payload: facts.identityFacts,
        promptTemplate: `Write the closing "Practical Takeaways" section of ${input.client}'s natal chart reading — a grounded, whole-chart summary they can actually use day to day.${natalMotivationContext(input)}`,
        tier: modelTier,
      });
      if (takeawaysResult.heldForReview || !takeawaysResult.synthesis) {
        throw new HeldForReviewError(`Practical Takeaways failed grounding after ${takeawaysResult.attempts} attempts${summarizeViolations(takeawaysResult.lastViolations)}`);
      }
      prose.practicalTakeaways = takeawaysResult.synthesis;
    }
  }

  for (const city of facts.cities) {
    if (city.lineActivations.length === 0) {
      prose.cities[city.name] = { synthesis: fallbackSynthesisForEmptyCity(), placements: [] };
      continue;
    }

    const synthesisResult = await generateCitySynthesis({
      payload: city.angularityFacts,
      promptTemplate: `Write the introductory/summary copy for ${city.name}, ${city.country} in ${input.client}'s relocation reading, based on the placements below.${motivationContext(input)}`,
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
