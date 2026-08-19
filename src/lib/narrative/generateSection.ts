import { generateText } from 'ai';
import type { FactsPayload } from '../reportFacts/types';
import { checkGrounding, type GroundingViolation } from './groundingCheck';

/**
 * LLM narrative generation for one report section at a time — never the
 * whole report in one prompt. The model receives only this section's facts
 * (never the full chart) and is instructed to phrase them, not invent them;
 * `checkGrounding` (deterministic, no LLM) verifies the output afterward.
 *
 * NOT yet exercised against a live model in this build — it needs
 * `AI_GATEWAY_API_KEY` (or Vercel OIDC once deployed) configured, and real
 * calls cost real money, so this is wired correctly but deliberately left
 * unrun pending that setup and your go-ahead before spending anything.
 *
 * Model IDs fetched live from the AI Gateway's model list at implementation
 * time (`curl https://ai-gateway.vercel.sh/v1/models`), not from memory —
 * re-check this list before relying on these if much time has passed, since
 * new point releases (e.g. a newer Opus generation) may have shipped since.
 */

export type ModelTier = 'premium' | 'standard';

// Both tiers use Sonnet-5 — live-tested output quality was strong enough
// that Opus's extra cost isn't justified for either report type.
const MODEL_BY_TIER: Record<ModelTier, string> = {
  premium: 'anthropic/claude-sonnet-5', // combined (birth chart + relocation) report
  standard: 'anthropic/claude-sonnet-5', // relocation-only report
};

const SYSTEM_INSTRUCTIONS = `You are writing one section of a paid astrology reading for The Lunar Playground.

STRICT RULES — breaking any of these makes the reading wrong, not just stylistically off:
- Only state a planet's sign, house, or angle (MC/IC/AC/DC) if it is explicitly listed in the FACTS given to you below. Never state, infer, or guess a placement that isn't listed, even if it would make the writing flow better.
- Never invent a city, ranking, or score that isn't in the FACTS.
- Do not hedge ("might," "could," "perhaps") — state what the chart shows directly and specifically.
- Write in second person, warm but direct, psychologically grounded — not generic horoscope language.
- You may use ordinary astrological adjectives (mercurial, jovial, saturnine, etc.) as color/tone without that counting as a placement claim.
- The prompt may include a short note on why the client is considering this move — that's context from them, not a chart fact. Use it only to shape tone and emphasis; never state it back as if the chart itself said it.`;

export interface GenerateSectionOptions {
  payload: FactsPayload;
  /** Section-specific instructions, e.g. "Write about why this city pulls them, using only the facts below." */
  promptTemplate: string;
  tier: ModelTier;
  maxRetries?: number;
}

export interface GenerateSectionResult {
  /** null when every attempt failed grounding — see heldForReview. */
  prose: string | null;
  attempts: number;
  /** Confirmed policy: repeated grounding failure holds the order for manual review, never auto-ships a degraded plain-facts version. */
  heldForReview: boolean;
  lastViolations?: GroundingViolation[];
}

export async function generateSection(options: GenerateSectionOptions): Promise<GenerateSectionResult> {
  const { payload, promptTemplate, tier, maxRetries = 2 } = options;
  const model = MODEL_BY_TIER[tier];

  const factsJson = JSON.stringify(payload.facts, null, 2);
  const prompt = `${promptTemplate}\n\nFACTS (only reference these; do not add anything not listed):\n${factsJson}`;

  let attempts = 0;
  let lastViolations: GroundingViolation[] | undefined;

  while (attempts <= maxRetries) {
    attempts++;

    const { text } = await generateText({
      model,
      instructions: SYSTEM_INSTRUCTIONS,
      prompt,
    });

    const check = checkGrounding(text, payload);
    if (check.grounded) {
      return { prose: text, attempts, heldForReview: false };
    }
    lastViolations = check.violations;
  }

  return { prose: null, attempts, heldForReview: true, lastViolations };
}
