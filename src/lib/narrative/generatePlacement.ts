import { generateObject } from 'ai';
import { z } from 'zod';
import type { FactsPayload } from '../reportFacts/types';
import { checkGrounding, type GroundingViolation } from './groundingCheck';
import type { ModelTier } from './generateSection';

/**
 * Narrow, per-placement sibling to `generateSection.ts`. `generateSection`
 * returns one flat prose string checked against a section's whole facts
 * payload — fine for synthesis text, but the polished PDF template needs a
 * `{ body, whatToDo }` pair *per placement* (per planet+angle badge in a
 * city), and an earlier draft of Phase 6 tried to get that by batching all
 * of a city's placements into one `generateObject` call. Review caught that
 * batching multi-entity content together defeats `checkGrounding`'s strict
 * tuple-pairing (it only applies to single-entity sentences) — a model could
 * write a swapped, false pairing between two independently-true placements
 * and have every token still "ground" against the batched payload.
 *
 * The fix is scope, not mechanism: this function only ever receives a
 * `FactsPayload` containing exactly ONE fact tuple (see
 * `buildFacts.ts`'s `placementFacts`), so `checkGrounding`'s tier-2 fallback
 * has nothing else to spuriously match against — any sentence naming a
 * different planet or angle is correctly rejected.
 */

const PLACEMENT_SCHEMA = z.object({
  body: z.string().describe('2-4 sentences on what this placement means for the client in this city.'),
  whatToDo: z.string().describe('1-2 sentences of concrete, practical guidance for engaging with this placement here.'),
  reflect: z
    .string()
    .describe(
      '1 open-ended question inviting the client to notice this in their own experience of the place — a genuine question to sit with, not another instruction or a restated fact.'
    ),
});

export type PlacementObject = z.infer<typeof PLACEMENT_SCHEMA>;

const SYSTEM_INSTRUCTIONS = `You are writing one placement box in a paid astrocartography reading for The Lunar Playground, describing exactly ONE planetary line (one planet on one angle: MC/IC/AC/DC) at one city.

STRICT RULES — breaking any of these makes the reading wrong, not just stylistically off:
- Only reference the ONE planet+angle placement given in the facts below. Do not name any other planet, sign, house, or angle, even in passing.
- Do not hedge ("might," "could," "perhaps") — state what this placement means directly and specifically.
- Write in second person, warm but direct, psychologically grounded — not generic horoscope language.
- Write for someone with no astrology background. If a term they might not know comes up (house, angle, retrograde, etc.), explain what it means in plain words right where you use it — don't assume prior knowledge, and don't lean on jargon to sound authoritative.
- reflect is an actual open-ended question, not a restated instruction — something they answer for themselves, not something you answer for them. It must not name any other planet, sign, house, or angle.
- Frame this as a pattern worth noticing about themselves in this place, not a verdict — invite their own reflection rather than declaring a fixed truth.
- You may use ordinary astrological adjectives (mercurial, jovial, saturnine, etc.) as color/tone without that counting as a placement claim.`;

export interface GeneratePlacementOptions {
  /** Must contain exactly one fact — a single-tuple payload is what keeps grounding strict. */
  payload: FactsPayload;
  /** e.g. "Venus is on the Descendant (DC) in Los Angeles, 12 miles away." */
  promptTemplate: string;
  tier: ModelTier;
  maxRetries?: number;
}

export interface GeneratePlacementResult {
  placement: PlacementObject | null;
  attempts: number;
  heldForReview: boolean;
  lastViolations?: GroundingViolation[];
}

const MODEL_BY_TIER: Record<ModelTier, string> = {
  premium: 'anthropic/claude-sonnet-5',
  standard: 'anthropic/claude-sonnet-5',
};

export async function generatePlacement(options: GeneratePlacementOptions): Promise<GeneratePlacementResult> {
  const { payload, promptTemplate, tier, maxRetries = 2 } = options;
  if (payload.facts.length !== 1) {
    throw new Error(`generatePlacement requires a single-tuple payload, got ${payload.facts.length} facts for section "${payload.sectionId}"`);
  }
  const model = MODEL_BY_TIER[tier];

  const factsJson = JSON.stringify(payload.facts, null, 2);
  const prompt = `${promptTemplate}\n\nFACTS (only reference this; do not add anything not listed):\n${factsJson}`;

  let attempts = 0;
  let lastViolations: GroundingViolation[] | undefined;

  while (attempts <= maxRetries) {
    attempts++;

    const { object } = await generateObject({
      model,
      instructions: SYSTEM_INSTRUCTIONS,
      schema: PLACEMENT_SCHEMA,
      prompt,
    });

    const combinedProse = `${object.body}\n${object.whatToDo}\n${object.reflect}`;
    const check = checkGrounding(combinedProse, payload);
    if (check.grounded) {
      return { placement: object, attempts, heldForReview: false };
    }
    lastViolations = check.violations;
  }

  return { placement: null, attempts, heldForReview: true, lastViolations };
}
