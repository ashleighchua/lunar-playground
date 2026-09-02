import { generateObject } from 'ai';
import { z } from 'zod';
import type { FactsPayload } from '../reportFacts/types';
import { checkGrounding, type GroundingViolation } from './groundingCheck';
import type { ModelTier } from './generateSection';

/**
 * Generates the Natal Chart Reading's closing "Practical Takeaways"
 * section — a whole-chart synthesis, not a single-placement interpretation,
 * so (unlike generateLifeAreaInsight.ts/generatePlacement.ts) this is
 * grounded against the FULL multi-tuple `identityFacts` payload rather than
 * one single-fact tuple. That's not a new risk: narrate.ts's identityIntro
 * call already grounds synthesis-level prose against this same full
 * multi-tuple payload today, live-tested and shipped.
 */

const NATAL_SYNTHESIS_SCHEMA = z.object({
  keyInsight: z.string().describe('1 sentence: the single most useful thing to know about this whole chart.'),
  leanInto: z.array(z.string()).length(3).describe('3 short phrases: strengths across the chart worth leaning into deliberately.'),
  watchFor: z.array(z.string()).length(3).describe('3 short phrases: patterns across the chart that emerge quietly under strain.'),
  reframe: z.string().describe('1-2 sentences: one practical reframe that ties the chart together.'),
  tryThis: z.string().describe('1 sentence: something concrete to try this week.'),
  notice: z.string().describe('1 sentence: something to notice about themselves this week.'),
  reflect: z
    .string()
    .describe(
      '1 open-ended question about the whole chart to sit with — a genuine question inviting their own reflection, not another instruction or a restated fact.'
    ),
});

export type NatalSynthesisObject = z.infer<typeof NATAL_SYNTHESIS_SCHEMA>;

const SYSTEM_INSTRUCTIONS = `You are writing the closing "Practical Takeaways" section of a paid natal chart reading for The Lunar Playground — a grounded, whole-chart summary the client can actually use day to day.

STRICT RULES — breaking any of these makes the reading wrong, not just stylistically off:
- Only state a planet's sign, house, or angle if it is explicitly listed in the FACTS given to you below. Never state, infer, or guess a placement that isn't listed, even if it would make the writing flow better.
- Do not hedge ("might," "could," "perhaps") — state what the chart shows directly and specifically.
- Write in second person, warm but direct, psychologically grounded — not generic horoscope language.
- Write for someone with no astrology background. If a term they might not know comes up (house, angle, retrograde, etc.), explain what it means in plain words right where you use it — don't assume prior knowledge, and don't lean on jargon to sound authoritative.
- This is a summary across the WHOLE chart, not a single placement — you may draw connections between multiple facts below, but every claim must still trace back to something actually listed.
- reflect is an actual open-ended question, not a restated instruction — something they answer for themselves, not something you answer for them.
- Frame this as a pattern worth noticing about themselves, not a verdict — invite their own reflection rather than declaring a fixed truth.
- You may use ordinary astrological adjectives (mercurial, jovial, saturnine, etc.) as color/tone without that counting as a placement claim.`;

export interface GenerateNatalSynthesisOptions {
  /** The full multi-tuple identityFacts payload — every natal planet + Ascendant. */
  payload: FactsPayload;
  promptTemplate: string;
  tier: ModelTier;
  maxRetries?: number;
}

export interface GenerateNatalSynthesisResult {
  synthesis: NatalSynthesisObject | null;
  attempts: number;
  heldForReview: boolean;
  lastViolations?: GroundingViolation[];
}

const MODEL_BY_TIER: Record<ModelTier, string> = {
  premium: 'anthropic/claude-sonnet-5',
  standard: 'anthropic/claude-sonnet-5',
};

export async function generateNatalSynthesis(options: GenerateNatalSynthesisOptions): Promise<GenerateNatalSynthesisResult> {
  const { payload, promptTemplate, tier, maxRetries = 2 } = options;
  const model = MODEL_BY_TIER[tier];

  const factsJson = JSON.stringify(payload.facts, null, 2);
  const prompt = `${promptTemplate}\n\nFACTS (only reference these; do not add anything not listed):\n${factsJson}`;

  let attempts = 0;
  let lastViolations: GroundingViolation[] | undefined;

  while (attempts <= maxRetries) {
    attempts++;

    const { object } = await generateObject({
      model,
      instructions: SYSTEM_INSTRUCTIONS,
      schema: NATAL_SYNTHESIS_SCHEMA,
      prompt,
    });

    const combinedProse = [object.keyInsight, ...object.leanInto, ...object.watchFor, object.reframe, object.tryThis, object.notice, object.reflect].join(
      '\n'
    );
    const check = checkGrounding(combinedProse, payload);
    if (check.grounded) {
      return { synthesis: object, attempts, heldForReview: false };
    }
    lastViolations = check.violations;
  }

  return { synthesis: null, attempts, heldForReview: true, lastViolations };
}
