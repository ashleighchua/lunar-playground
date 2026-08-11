/**
 * House-system math: Ascendant, Midheaven, and whole-sign house cusps.
 *
 * Nothing here existed before this module — the birth chart previously had no
 * house cusps at all. Whole Sign houses are used (each sign = one house,
 * starting from the Ascendant's sign): simpler and avoids Placidus's
 * intercepted-sign/polar-latitude edge cases, at the cost of not matching
 * Placidus-based software degree-for-degree. `houseSystem` is threaded through
 * to callers precisely so a future Placidus addition never leaves two
 * deliveries for the same customer disagreeing with no record of why.
 */

export type HouseSystem = 'whole-sign';

export interface HouseCusps {
  system: HouseSystem;
  ascendantSign: number; // 0-11, index into the zodiac (0 = Aries)
  cusps: number[]; // 12 entries, cusps[0] = house 1's starting ecliptic longitude, etc.
}

function normalize360(deg: number): number {
  let d = deg % 360;
  if (d < 0) d += 360;
  return d;
}

/** Greenwich Mean Sidereal Time, in degrees, via the standard IAU formula. */
export function calculateGMST(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) +
    0.000387933 * T * T - (T * T * T) / 38710000;
  return normalize360(gmst);
}

/** Mean obliquity of the ecliptic, in degrees. */
export function calculateObliquity(jd: number): number {
  const T = (jd - 2451545.0) / 36525;
  return 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
}

/** Right Ascension of the Meridian (= Local Sidereal Time) for a given geographic longitude. */
export function calculateRAMC(jd: number, geoLongitude: number): number {
  return normalize360(calculateGMST(jd) + geoLongitude);
}

/**
 * Ascendant's ecliptic longitude. Same formula previously private inside
 * ephemeris.ts's `calculateAscendant` — moved here so all sphere-geometry
 * (RAMC/obliquity/Ascendant/Midheaven/houses) lives in one module.
 */
export function calculateAscendantLongitude(jd: number, latitude: number, geoLongitude: number): number {
  const ramc = calculateRAMC(jd, geoLongitude);
  const eps = calculateObliquity(jd);

  const ramcRad = ramc * Math.PI / 180;
  const latRad = latitude * Math.PI / 180;
  const epsRad = eps * Math.PI / 180;

  // ASC = atan2(-cos(RAMC), sin(eps)*tan(lat) + cos(eps)*sin(RAMC))
  const y = -Math.cos(ramcRad);
  const x = Math.sin(epsRad) * Math.tan(latRad) + Math.cos(epsRad) * Math.sin(ramcRad);

  let asc = Math.atan2(y, x) * 180 / Math.PI;
  asc += 180; // adjust to the correct ecliptic-longitude quadrant
  return normalize360(asc);
}

/**
 * Midheaven (MC) ecliptic longitude — the ecliptic point currently on the
 * local meridian. Standard relation: tan(MC) = tan(RAMC) / cos(obliquity),
 * implemented via atan2 for correct quadrant handling:
 * MC = atan2(sin(RAMC), cos(RAMC) * cos(obliquity)).
 * Independent of house system — this is a chart point, not a cusp.
 */
export function getMidheaven(jd: number, geoLongitude: number): number {
  const ramc = calculateRAMC(jd, geoLongitude);
  const eps = calculateObliquity(jd);

  const ramcRad = ramc * Math.PI / 180;
  const epsRad = eps * Math.PI / 180;

  const y = Math.sin(ramcRad);
  const x = Math.cos(ramcRad) * Math.cos(epsRad);

  const mc = Math.atan2(y, x) * 180 / Math.PI;
  return normalize360(mc);
}

/**
 * Whole-sign house cusps for a given birth moment (jd, in UT) and location.
 * House 1 begins at 0° of the Ascendant's sign; each subsequent house is the
 * next full sign, regardless of the Ascendant's exact degree within its sign.
 */
export function calculateHouseCusps(jd: number, latitude: number, geoLongitude: number): HouseCusps {
  const ascendant = calculateAscendantLongitude(jd, latitude, geoLongitude);
  const ascendantSign = Math.floor(ascendant / 30) % 12;

  const cusps: number[] = [];
  for (let i = 0; i < 12; i++) {
    cusps.push(normalize360((ascendantSign + i) * 30));
  }

  return { system: 'whole-sign', ascendantSign, cusps };
}

/**
 * Whole-sign house number (1-12) for a planet at the given ecliptic longitude,
 * relative to an already-computed set of house cusps.
 */
export function assignPlanetToHouse(planetLongitude: number, houses: HouseCusps): number {
  const signIndex = Math.floor(normalize360(planetLongitude) / 30) % 12;
  return ((signIndex - houses.ascendantSign + 12) % 12) + 1;
}

export interface RelocatedPlanetPosition {
  name: string;
  longitude: number;
  house: number;
}

export interface RelocatedChart {
  houses: HouseCusps;
  midheaven: number;
  planets: RelocatedPlanetPosition[];
}

/**
 * Recompute houses (and each natal planet's house) for a destination location,
 * holding the birth moment (jd, in UT) fixed. This is the "what changes when
 * you move here" mechanic: the planets' ecliptic longitudes don't change —
 * only which house they fall into does, because the Ascendant/Midheaven shift
 * with geographic longitude and latitude.
 */
export function calculateRelocatedHouses(
  natalPlanetLongitudes: { name: string; longitude: number }[],
  jd: number,
  destLatitude: number,
  destLongitude: number
): RelocatedChart {
  const houses = calculateHouseCusps(jd, destLatitude, destLongitude);
  const midheaven = getMidheaven(jd, destLongitude);

  const planets: RelocatedPlanetPosition[] = natalPlanetLongitudes.map((p) => ({
    name: p.name,
    longitude: p.longitude,
    house: assignPlanetToHouse(p.longitude, houses),
  }));

  return { houses, midheaven, planets };
}
