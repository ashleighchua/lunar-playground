import type { ThemeName } from '../astrocartography/themes';

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
  /** 'combined' includes the natal-chart-identity section; 'relocation-only' doesn't. */
  reportTier: 'relocation-only' | 'combined';
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
}

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
};
