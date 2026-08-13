/**
 * Orb-distance tier bands, matching scripts/relocation-report/facts.ts's
 * original tierFor cutoffs. 'exact'/'primary'/'notable' placements get a
 * full generated placement box; 'soft' gets a lighter, deterministic mention
 * (see assemble.ts) rather than its own LLM call — low enough stakes not to
 * be worth the extra generation + grounding-check cost.
 */
export type OrbTier = 'exact' | 'primary' | 'notable' | 'soft';

export function tierForMiles(miles: number): OrbTier | null {
  if (miles <= 30) return 'exact';
  if (miles <= 150) return 'primary';
  if (miles <= 300) return 'notable';
  if (miles <= 600) return 'soft';
  return null;
}

export function isFullPlacementTier(tier: OrbTier): boolean {
  return tier !== 'soft';
}
