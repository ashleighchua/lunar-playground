import { generateObject } from 'ai';
import { z } from 'zod';
import type { FactsPayload } from '../reportFacts/types';
import { checkGrounding, type GroundingViolation } from './groundingCheck';
import type { ModelTier } from './generateSection';

/**
 * City-level synthesis text: intro, a nickname/tagline, a couple of
 * combined-energy paragraphs that read across multiple placements together,
 * a bottom-line takeaway, and optional romance/career callouts. Unlike
 * `generatePlacement.ts`, this is deliberately checked against the city's
 * FULL fact set (multi-tuple), because synthesizing across placements is
 * this content's actual job — the same risk profile Phase 4's original
 * `generateSection()` design already accepted for any multi-fact prose
 * section. That's a different, already-reviewed tradeoff from the one the
 * first Phase 6 draft got wrong: this never carries the strict single-
 * placement claims (those live only in `generatePlacement.ts`'s narrowly-
 * scoped calls), so bundling these looser fields together doesn't dilute
 * any strictness that would otherwise exist.
 *
 * Nickname/tagline are cultural color (e.g. "The City of Angels"), not
 * astrology claims — `checkGrounding` has no vocabulary for them and can't
 * check them either way; the prompt asks for well-known, low-risk phrasing.
 */

const CITY_SYNTHESIS_SCHEMA = z.object({
  nickname: z.string().describe('A short, well-known nickname or epithet for this city (e.g. "The City of Angels"). Keep it accurate and low-key if no famous nickname exists.'),
  tagline: z.string().describe('A short, evocative one-line tagline for why this city matters in this reading.'),
  intro: z.string().describe('2-3 sentences introducing this city and setting up the placements that follow.'),
  combinedEnergy: z.array(z.string()).describe('1-3 short paragraphs synthesizing how this city\'s placements work together.'),
  bottomLine: z.string().describe('One punchy takeaway sentence for this city.'),
  forRomance: z.string().nullable().describe('1-2 sentences on this city for romance/relationships, or null if nothing distinct to say.'),
  forCareer: z.string().nullable().describe('1-2 sentences on this city for career/public life, or null if nothing distinct to say.'),
});

export type CitySynthesisObject = z.infer<typeof CITY_SYNTHESIS_SCHEMA>;

const SYSTEM_INSTRUCTIONS = `You are writing the introductory and summary copy for one city's section in a paid astrocartography reading for The Lunar Playground.

STRICT RULES — breaking any of these makes the reading wrong, not just stylistically off:
- Only state a planet's placement (sign, house, or angle) if it is explicitly listed in the FACTS given below. Never state, infer, or guess a placement that isn't listed.
- Do not hedge ("might," "could," "perhaps") — state what the chart shows directly and specifically.
- Write in second person, warm but direct, psychologically grounded — not generic horoscope language.
- The nickname/tagline are cultural color, not astrology claims — keep them plausible and well-known, don't invent obscure or made-up nicknames.
- You may use ordinary astrological adjectives (mercurial, jovial, saturnine, etc.) as color/tone without that counting as a placement claim.
- The prompt may include a short note on why the client is considering this move — that's context from them, not a chart fact. Use it only to shape tone and emphasis; never state it back as if the chart itself said it.`;

const MODEL_BY_TIER: Record<ModelTier, string> = {
  premium: 'anthropic/claude-sonnet-5',
  standard: 'anthropic/claude-sonnet-5',
};

export interface GenerateCitySynthesisOptions {
  payload: FactsPayload; // full city angularity payload (all placements for this city)
  promptTemplate: string;
  tier: ModelTier;
  maxRetries?: number;
}

export interface GenerateCitySynthesisResult {
  synthesis: CitySynthesisObject | null;
  attempts: number;
  heldForReview: boolean;
  lastViolations?: GroundingViolation[];
}

function proseFieldsToCheck(obj: CitySynthesisObject): string {
  return [obj.intro, ...obj.combinedEnergy, obj.bottomLine, obj.forRomance, obj.forCareer].filter(Boolean).join('\n');
}

export async function generateCitySynthesis(options: GenerateCitySynthesisOptions): Promise<GenerateCitySynthesisResult> {
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
      schema: CITY_SYNTHESIS_SCHEMA,
      prompt,
    });

    // Nickname/tagline are intentionally excluded from grounding — they're
    // not astrology claims and checkGrounding has no vocabulary for them.
    const check = checkGrounding(proseFieldsToCheck(object), payload);
    if (check.grounded) {
      return { synthesis: object, attempts, heldForReview: false };
    }
    lastViolations = check.violations;
  }

  return { synthesis: null, attempts, heldForReview: true, lastViolations };
}
