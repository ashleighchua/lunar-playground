import { generateObject } from 'ai';
import { z } from 'zod';
import type { FactsPayload } from '../reportFacts/types';
import { checkGrounding, type GroundingViolation } from './groundingCheck';
import type { ModelTier } from './generateSection';

/**
 * Natal-only sibling to generatePlacement.ts, same shape and same reason:
 * the Natal Chart Reading's domain sections (Core Drives, Decision Making,
 * Emotional Pattern, Rest & Recharge, Relationship Blueprint, Work &
 * Impact, Shadow & Growth) each interpret ONE real chart placement through
 * a specific life-area lens, replacing the free interactive tool's
 * sign-only static lookup tables (src/lib/{decisionMaking,emotionalPattern,
 * restRecharge,relationshipBlueprint,workStyle,shadowGrowth}.ts) with
 * something genuinely grounded in the customer's real chart (sign AND
 * house, not just sign).
 *
 * Single-tuple payload only, same load-bearing reason generatePlacement.ts
 * documents: batching multiple placements into one call would defeat
 * checkGrounding's strict tuple-pairing (a model could write a swapped,
 * false pairing between two independently-true placements and still pass).
 * A section that draws on a planet already used by another section (e.g.
 * Mercury powers both the Core Drives card and Decision Making) still gets
 * its own independent single-tuple call with its own life-area prompt.
 */

const LIFE_AREA_INSIGHT_SCHEMA = z.object({
  pattern: z.string().describe('2-3 sentences: what this placement means for the client in this specific life area.'),
  watchFor: z.string().describe('1-2 sentences: the trap or blind spot this placement tends to create here.'),
  practice: z.string().describe('1 sentence: one concrete, specific thing the client can actually do about it.'),
  reflect: z
    .string()
    .describe(
      '1 open-ended question inviting the client to notice this pattern in their own life — a genuine question to sit with, not another instruction or a restated fact.'
    ),
});

export type LifeAreaInsightObject = z.infer<typeof LIFE_AREA_INSIGHT_SCHEMA>;

const SYSTEM_INSTRUCTIONS = `You are writing one life-area insight in a paid natal chart reading for The Lunar Playground, interpreting exactly ONE placement (one planet in one sign, possibly one house) through a specific life-area lens (e.g. decision-making, work, relationships).

STRICT RULES — breaking any of these makes the reading wrong, not just stylistically off:
- Only reference the ONE placement given in the facts below. Do not name any other planet, sign, house, or angle, even in passing.
- Do not hedge ("might," "could," "perhaps") — state what this placement means directly and specifically.
- Write in second person, warm but direct, psychologically grounded — not generic horoscope language.
- Write for someone with no astrology background. If a term they might not know comes up (house, angle, retrograde, etc.), explain what it means in plain words right where you use it — don't assume prior knowledge, and don't lean on jargon to sound authoritative.
- Follow the shape: pattern (what this actually looks like for them, specifically in this life area) → watchFor (the trap this creates) → practice (one real thing to do about it, not vague advice like "be mindful") → reflect (an actual open-ended question, not a restated instruction — something they answer for themselves, not something you answer for them). reflect must not name any other planet, sign, house, or angle.
- Frame this as a pattern worth noticing about themselves, not a verdict — invite their own reflection rather than declaring a fixed truth.
- You may use ordinary astrological adjectives (mercurial, jovial, saturnine, etc.) as color/tone without that counting as a placement claim.`;

export interface GenerateLifeAreaInsightOptions {
  /** Must contain exactly one fact — a single-tuple payload is what keeps grounding strict. */
  payload: FactsPayload;
  /** e.g. "Interpret this Mercury placement through the lens of how this client makes decisions." */
  promptTemplate: string;
  tier: ModelTier;
  maxRetries?: number;
}

export interface GenerateLifeAreaInsightResult {
  insight: LifeAreaInsightObject | null;
  attempts: number;
  heldForReview: boolean;
  lastViolations?: GroundingViolation[];
}

const MODEL_BY_TIER: Record<ModelTier, string> = {
  premium: 'anthropic/claude-sonnet-5',
  standard: 'anthropic/claude-sonnet-5',
};

export async function generateLifeAreaInsight(options: GenerateLifeAreaInsightOptions): Promise<GenerateLifeAreaInsightResult> {
  const { payload, promptTemplate, tier, maxRetries = 2 } = options;
  if (payload.facts.length !== 1) {
    throw new Error(`generateLifeAreaInsight requires a single-tuple payload, got ${payload.facts.length} facts for section "${payload.sectionId}"`);
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
      schema: LIFE_AREA_INSIGHT_SCHEMA,
      prompt,
    });

    const combinedProse = `${object.pattern}\n${object.watchFor}\n${object.practice}\n${object.reflect}`;
    const check = checkGrounding(combinedProse, payload);
    if (check.grounded) {
      return { insight: object, attempts, heldForReview: false };
    }
    lastViolations = check.violations;
  }

  return { insight: null, attempts, heldForReview: true, lastViolations };
}
