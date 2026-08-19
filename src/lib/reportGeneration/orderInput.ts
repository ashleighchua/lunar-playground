import type { ThemeName } from '../astrocartography/themes';

/** 'combined' includes the natal-chart-identity section; 'relocation-only' doesn't. Also used by `products.ts` to mark which products route through this pipeline. */
export type ReportTier = 'relocation-only' | 'combined';

/**
 * The birth data + destination/theme shape `buildFacts.ts` needs from an
 * order. Written down explicitly because Phase 5 (the intake page that
 * would normally define this) doesn't exist yet — this is the contract
 * Phase 5's intake form should conform to, rather than Phase 6 guessing a
 * shape and reworking it later. Mirrors the birth shape already proven in
 * `scripts/relocation-report/facts.ts`'s `ClientInput`.
 */
export interface RelocationOrderInput {
  client: string;
  reportTier: ReportTier;
  birth: {
    date: string; // YYYY-MM-DD, local calendar date at birthplace
    time: string; // HH:MM, 24h local time at birthplace
    lat: number;
    lon: number;
    placeLabel: string;
  };
  /** Life themes driving the algorithmic top-city ranking (product copy: "Top 3 cities matched to your goals"). */
  themes: ThemeName[];
  /** How many top-ranked cities to include when `destinationCities` isn't given. */
  cityCount: number;
  /**
   * Explicit cities to analyze instead of an algorithmic ranking — the
   * Fiverr-style "should I move to X or Y" request `scripts/relocation-report/`
   * was originally built for. When present, these are used INSTEAD of ranking
   * the full `cities.json` dataset by theme.
   */
  destinationCities?: { name: string; country: string; lat: number; lon: number }[];
  /**
   * Closed-vocabulary reasons the client gave at intake for why they're
   * considering this move. Narrative framing/tone context ONLY — narrate.ts
   * appends these as a plain-language note on the two broadest LLM calls
   * (identity intro, city synthesis), explicitly told not to be stated back
   * as a chart fact. Never reaches the narrowly-scoped single-placement
   * calls, and checkGrounding never inspects it — it's not a fact claim.
   * Optional: the client may skip this at intake.
   */
  motivations?: RelocationMotivation[];
}

export type RelocationMotivation = 'career' | 'relationship' | 'family' | 'fresh-start' | 'lifestyle' | 'exploring';

export const MOTIVATION_LABELS: Record<RelocationMotivation, string> = {
  career: 'a specific job or career move',
  relationship: 'to be with, or closer to, someone',
  family: 'to be closer to family',
  'fresh-start': 'starting a new chapter',
  lifestyle: 'a better pace of life, climate, or cost of living',
  exploring: 'just exploring options, nothing decided yet',
};

/** Sample fixture for tests and the standalone test harness — not real customer data. */
export const SAMPLE_ORDER_INPUT: RelocationOrderInput = {
  client: 'Jordan Rivera',
  reportTier: 'combined',
  birth: {
    date: '1991-07-14',
    time: '06:32',
    lat: 40.7128,
    lon: -74.006,
    placeLabel: 'New York, NY, USA',
  },
  themes: ['love', 'career'],
  cityCount: 3,
  destinationCities: [
    { name: 'Los Angeles', country: 'United States', lat: 34.0522, lon: -118.2437 },
    { name: 'Austin', country: 'United States', lat: 30.2672, lon: -97.7431 },
  ],
  motivations: ['career', 'fresh-start'],
};
