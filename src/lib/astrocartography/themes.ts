/**
 * Weighted life-theme configuration for astrocartography city scoring.
 *
 * Replaces the old single-planet-per-category model (`CATEGORY_ANGLE_BOOSTS` in
 * cityScorer.ts, still present for the free single-planet /astrocartography page)
 * with an explicit, multi-planet blend per theme — e.g. "love" isn't just Venus,
 * it's Venus weighted heavily plus the Moon weighted lightly. Weights here are
 * the actual mechanism; `ANGLE_WEIGHTS` in cityScorer.ts still separately scores
 * how strong a line type (MC/AC/DC/IC) is in general.
 */

export type ThemeName =
  | 'love'
  | 'career'
  | 'luck'
  | 'transformation'
  | 'home'
  | 'communication'
  | 'adventure';

export type AstroAngle = 'MC' | 'IC' | 'AC' | 'DC';

export interface ThemeWeight {
  planet: string;
  angle?: AstroAngle; // omitted = applies to any angle this planet activates
  weight: number;
}

export const LIFE_THEMES: Record<ThemeName, ThemeWeight[]> = {
  love: [
    { planet: 'Venus', angle: 'DC', weight: 1.0 },
    { planet: 'Venus', angle: 'AC', weight: 0.5 },
    { planet: 'Moon', angle: 'DC', weight: 0.5 },
  ],
  career: [
    { planet: 'Saturn', angle: 'MC', weight: 1.0 },
    { planet: 'Sun', angle: 'MC', weight: 0.6 },
    { planet: 'Jupiter', angle: 'MC', weight: 0.3 },
  ],
  luck: [
    { planet: 'Jupiter', angle: 'MC', weight: 1.0 },
    { planet: 'Jupiter', angle: 'AC', weight: 0.6 },
    { planet: 'Jupiter', angle: 'DC', weight: 0.3 },
  ],
  transformation: [
    { planet: 'Pluto', weight: 1.0 },
    { planet: 'Saturn', weight: 0.4 },
  ],
  home: [
    { planet: 'Moon', angle: 'IC', weight: 1.0 },
    { planet: 'Moon', angle: 'AC', weight: 0.4 },
  ],
  communication: [
    { planet: 'Mercury', angle: 'MC', weight: 0.7 },
    { planet: 'Mercury', angle: 'AC', weight: 0.7 },
  ],
  adventure: [
    { planet: 'Uranus', weight: 0.8 },
    { planet: 'Jupiter', angle: 'AC', weight: 0.5 },
  ],
};

export const THEME_LABELS: Record<ThemeName, string> = {
  love: 'Love & Relationships',
  career: 'Career & Public Life',
  luck: 'Luck & Opportunity',
  transformation: 'Transformation & Depth',
  home: 'Home & Belonging',
  communication: 'Communication & Ideas',
  adventure: 'Adventure & Freedom',
};

export function isThemeName(value: string): value is ThemeName {
  return value in LIFE_THEMES;
}
