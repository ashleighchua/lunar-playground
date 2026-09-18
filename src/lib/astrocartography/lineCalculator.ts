/**
 * Astrocartography Line Calculator
 * Ported from LineCalculator.php
 *
 * Computes planetary lines (MC, IC, AC, DC) across the globe
 * using spherical astronomy formulas.
 *
 * Takes each planet's true equatorial coordinates (Right Ascension,
 * Declination) as input rather than deriving them internally from ecliptic
 * longitude. RA/Dec depend on ecliptic longitude AND latitude; assuming
 * latitude = 0 (as this module used to, deriving RA/Dec from longitude
 * alone) is fine for the Sun but wrong enough for Pluto (whose orbit is
 * inclined ~17° to the ecliptic) to move an MC line by hundreds of miles.
 * Callers get true RA/Dec from `calculatePlanetEquatorial` in ephemeris.ts.
 */

export interface LinePoint {
  lat: number;
  lon: number;
}

export interface AstroLine {
  planet: string;
  angle: 'MC' | 'IC' | 'AC' | 'DC';
  points: LinePoint[];
  longitude?: number; // Fixed longitude for MC/IC lines
}

export interface Equatorial {
  ra: number; // Right Ascension, degrees, 0-360
  dec: number; // Declination, degrees, -90 to 90
}

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function normalizeAngle(angle: number): number {
  let result = angle % 360;
  if (result < 0) result += 360;
  return result;
}

/** Greenwich Mean Sidereal Time, in degrees, via the standard IAU formula (matches houses.ts's calculateGMST). */
function calculateGMST(julianDay: number): number {
  const d = julianDay - 2451545.0;
  const T = d / 36525;
  const gmst = 280.46061837 + 360.98564736629 * d + 0.000387933 * T * T - (T * T * T) / 38710000;
  return normalizeAngle(gmst);
}

/**
 * Calculate the geographic longitude where a planet's MC line is located
 */
function calculateMCLongitude(ra: number, julianDay: number): number {
  const gmst = calculateGMST(julianDay);

  let geoLon = normalizeAngle(ra - gmst);
  if (geoLon > 180) geoLon -= 360;

  return geoLon;
}

/**
 * Calculate the geographic longitude where a planet's AC or DC line crosses a
 * given latitude.
 *
 * Rising and setting happen at hour angles -H and +H respectively, where
 * cos H = -tan(lat) * tan(dec). Those two points are 2H apart in longitude,
 * which equals 180° only when H = 90° (i.e. the planet's declination is 0 or
 * the latitude is 0). The DC line used to be derived as "AC + 180°", which
 * placed it up to tens of degrees off for planets with any real declination —
 * e.g. ~24° off for a Venus at +12° dec seen from 43°S.
 */
function calculateHorizonLongitude(
  ra: number,
  dec: number,
  latitude: number,
  julianDay: number,
  angle: 'AC' | 'DC'
): number | null {
  const decRad = dec * DEG_TO_RAD;
  const latRad = latitude * DEG_TO_RAD;

  // Check if planet can rise/set at this latitude
  if (Math.abs(decRad) > Math.PI / 2 - Math.abs(latRad)) {
    return null;
  }

  // Calculate hour angle at the horizon
  const cosH = -Math.tan(latRad) * Math.tan(decRad);
  if (Math.abs(cosH) > 1) {
    return null;
  }

  const H = Math.acos(cosH) * RAD_TO_DEG;

  // Local sidereal time at rising (-H) or setting (+H)
  const lst = angle === 'AC' ? ra - H : ra + H;

  const gmst = calculateGMST(julianDay);

  // Geographic longitude
  let geoLon = normalizeAngle(lst - gmst);
  if (geoLon > 180) geoLon -= 360;

  return geoLon;
}

/**
 * Calculate MC (Midheaven) line - vertical meridian where planet culminates
 */
export function calculateMCLine(planet: string, eq: Equatorial, julianDay: number): AstroLine {
  const mcLon = calculateMCLongitude(eq.ra, julianDay);
  const points: LinePoint[] = [];

  for (let lat = -66; lat <= 66; lat += 2) {
    points.push({ lat, lon: mcLon });
  }

  return { planet, angle: 'MC', points, longitude: mcLon };
}

/**
 * Calculate IC (Nadir) line - opposite of MC
 */
export function calculateICLine(planet: string, eq: Equatorial, julianDay: number): AstroLine {
  const mcLon = calculateMCLongitude(eq.ra, julianDay);
  let icLon = normalizeAngle(mcLon + 180);
  if (icLon > 180) icLon -= 360;
  const points: LinePoint[] = [];

  for (let lat = -66; lat <= 66; lat += 2) {
    points.push({ lat, lon: icLon });
  }

  return { planet, angle: 'IC', points, longitude: icLon };
}

/**
 * Calculate AC (Ascendant/Rising) line - curved line where planet rises
 */
export function calculateACLine(planet: string, eq: Equatorial, julianDay: number): AstroLine {
  const points: LinePoint[] = [];

  for (let lat = -66; lat <= 66; lat += 1) {
    const lon = calculateHorizonLongitude(eq.ra, eq.dec, lat, julianDay, 'AC');
    if (lon !== null) {
      points.push({ lat, lon });
    }
  }

  return { planet, angle: 'AC', points };
}

/**
 * Calculate DC (Descendant/Setting) line - curved line where planet sets
 */
export function calculateDCLine(planet: string, eq: Equatorial, julianDay: number): AstroLine {
  const points: LinePoint[] = [];

  for (let lat = -66; lat <= 66; lat += 1) {
    const lon = calculateHorizonLongitude(eq.ra, eq.dec, lat, julianDay, 'DC');
    if (lon !== null) {
      points.push({ lat, lon });
    }
  }

  return { planet, angle: 'DC', points };
}

/**
 * Calculate all 4 lines for a single planet
 */
export function calculatePlanetLines(planet: string, eq: Equatorial, julianDay: number): AstroLine[] {
  return [
    calculateMCLine(planet, eq, julianDay),
    calculateICLine(planet, eq, julianDay),
    calculateACLine(planet, eq, julianDay),
    calculateDCLine(planet, eq, julianDay),
  ];
}
