import type { ThemeName } from '../astrocartography/themes';

/**
 * 'combined' and 'natal-only' both include the natal-chart-identity section;
 * 'relocation-only' doesn't. 'natal-only' additionally skips all relocation
 * computation (planetary lines, city ranking) entirely — see buildFacts.ts.
 * Also used by `products.ts` to mark which products route through this
 * pipeline.
 */
export type ReportTier = 'relocation-only' | 'combined' | 'natal-only';

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
  /**
   * Life themes driving the algorithmic top-city ranking (product copy:
   * "Top 3 cities matched to your goals"). Required in practice for
   * 'relocation-only'/'combined' orders, unused for 'natal-only' — optional
   * here because 'natal-only' intake never collects it.
   */
  themes?: ThemeName[];
  /** How many top-ranked cities to include when `destinationCities` isn't given. Unused for 'natal-only'. */
  cityCount?: number;
  /**
   * Explicit cities to analyze instead of an algorithmic ranking — the
   * Fiverr-style "should I move to X or Y" request `scripts/relocation-report/`
   * was originally built for. When present, these are used INSTEAD of ranking
   * the full `cities.json` dataset by theme. Unused for 'natal-only'.
   */
  destinationCities?: { name: string; country: string; lat: number; lon: number }[];
  /**
   * Closed-vocabulary reasons the client gave at intake for why they're
   * considering this move. Narrative framing/tone context ONLY — narrate.ts
   * appends these as a plain-language note on the two broadest LLM calls
   * (identity intro, city synthesis), explicitly told not to be stated back
   * as a chart fact. Never reaches the narrowly-scoped single-placement
   * calls, and checkGrounding never inspects it — it's not a fact claim.
   * Optional: the client may skip this at intake. 'relocation-only'/
   * 'combined' orders only — 'natal-only' orders use `natalMotivations`
   * instead, since this vocabulary is framed entirely around relocation.
   */
  motivations?: RelocationMotivation[];
  /**
   * Closed-vocabulary reasons the client gave at intake for why they want a
   * natal chart reading. Same framing-only guarantee as `motivations` above
   * (never a fact claim, never inspected by checkGrounding). 'natal-only'
   * orders only.
   */
  natalMotivations?: NatalMotivation[];
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

export type NatalMotivation =
  | 'self-understanding'
  | 'relationship-patterns'
  | 'career-purpose'
  | 'life-transition'
  | 'feeling-stuck'
  | 'just-curious';

export const NATAL_MOTIVATION_LABELS: Record<NatalMotivation, string> = {
  'self-understanding': 'understanding themselves better',
  'relationship-patterns': 'making sense of their relationship patterns',
  'career-purpose': 'figuring out their career direction or purpose',
  'life-transition': 'navigating a big life transition',
  'feeling-stuck': 'feeling stuck and wanting clarity',
  'just-curious': 'just curious, nothing specific',
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

/**
 * Sample fixture for natal-only tests — deliberately has no themes/
 * cityCount/destinationCities, matching the real shape a natal-only intake
 * submission has (the intake form never collects those fields for this
 * tier). Not real customer data.
 */
export const SAMPLE_NATAL_ORDER_INPUT: RelocationOrderInput = {
  client: 'Jordan Rivera',
  reportTier: 'natal-only',
  birth: {
    date: '1991-07-14',
    time: '06:32',
    lat: 40.7128,
    lon: -74.006,
    placeLabel: 'New York, NY, USA',
  },
  natalMotivations: ['self-understanding', 'career-purpose'],
};
