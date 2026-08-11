import type { PlanetName, SignName, AngleName, HouseNumber, ThemeToken } from './vocabulary';

/**
 * Facts are structured tuples, not flat/independent fields — a
 * `RelocatedHouseShiftFact` binds one planet to one natal house AND one
 * relocated house as a single unit. This is what lets the Phase 4 grounding
 * verifier check "Venus in your 7th house" as one claim to confirm, rather
 * than two independently-true tokens ("Venus" and "7") a model could
 * recombine into a false pairing that a naive token-only check would miss.
 */

export interface PlanetPlacementFact {
  type: 'planet-placement';
  planet: PlanetName;
  sign: SignName;
  house?: HouseNumber; // absent when no birth location was available (no houses)
}

export interface AscendantSignFact {
  type: 'ascendant-sign';
  sign: SignName;
}

export interface RelocatedHouseShiftFact {
  type: 'relocated-house-shift';
  planet: PlanetName;
  natalHouse: HouseNumber;
  relocatedHouse: HouseNumber;
  city: string;
}

export interface CityLineActivationFact {
  type: 'city-line-activation';
  city: string;
  planet: PlanetName;
  angle: AngleName;
  orbMiles: number;
}

export interface CityThemeRankingFact {
  type: 'city-theme-ranking';
  theme: ThemeToken;
  city: string;
  rank: number; // 1 = best match
  score: number;
}

export type Fact =
  | PlanetPlacementFact
  | AscendantSignFact
  | RelocatedHouseShiftFact
  | CityLineActivationFact
  | CityThemeRankingFact;

export interface FactsPayload {
  sectionId: string;
  facts: Fact[];
}
