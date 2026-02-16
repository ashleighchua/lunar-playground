/**
 * Astrocartography Line Calculator
 * Ported from LineCalculator.php
 *
 * Computes planetary lines (MC, IC, AC, DC) across the globe
 * using spherical astronomy formulas.
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

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

function normalizeAngle(angle: number): number {
  let result = angle % 360;
  if (result < 0) result += 360;
  return result;
}

/**
 * Calculate the geographic longitude where a planet's MC line is located
 */
function calculateMCLongitude(planetLong: number, julianDay: number): number {
  const d = julianDay - 2451545.0;
  const obliquity = 23.4393 - 0.0000004 * d;
  const oblRad = obliquity * DEG_TO_RAD;
  const planetRad = planetLong * DEG_TO_RAD;

  // Right ascension of the planet
  const ra = Math.atan2(
    Math.sin(planetRad) * Math.cos(oblRad),
    Math.cos(planetRad)
  );

  // GMST at epoch
  const gmst = (280.46061837 + 360.98564736629 * d) * DEG_TO_RAD;

  // Geographic longitude
  let geoLon = (ra - gmst) * RAD_TO_DEG;
  geoLon = normalizeAngle(geoLon);
  if (geoLon > 180) geoLon -= 360;

  return geoLon;
}

/**
 * Calculate the geographic longitude where a planet's AC line crosses a given latitude
 */
function calculateACLongitude(planetLong: number, latitude: number, julianDay: number): number | null {
  const d = julianDay - 2451545.0;
  const obliquity = 23.4393 - 0.0000004 * d;
  const oblRad = obliquity * DEG_TO_RAD;
  const latRad = latitude * DEG_TO_RAD;
  const planetRad = planetLong * DEG_TO_RAD;

  // Calculate declination of the planet
  const sinDecl = Math.sin(planetRad) * Math.sin(oblRad);
  const decl = Math.asin(sinDecl);

  // Check if planet can rise at this latitude
  if (Math.abs(decl) > Math.PI / 2 - Math.abs(latRad)) {
    return null;
  }

  // Calculate hour angle
  const cosH = -Math.tan(latRad) * Math.tan(decl);
  if (Math.abs(cosH) > 1) {
    return null;
  }

  // Right ascension of the planet
  const ra = Math.atan2(
    Math.sin(planetRad) * Math.cos(oblRad),
    Math.cos(planetRad)
  );

  // Hour angle
  const H = Math.acos(cosH);

  // Local sidereal time at rising
  const lst = ra - H;

  // GMST at epoch
  const gmst = (280.46061837 + 360.98564736629 * d) * DEG_TO_RAD;

  // Geographic longitude
  let geoLon = (lst - gmst) * RAD_TO_DEG;
  geoLon = normalizeAngle(geoLon);
  if (geoLon > 180) geoLon -= 360;

  return geoLon;
}

/**
 * Calculate MC (Midheaven) line - vertical meridian where planet culminates
 */
export function calculateMCLine(planet: string, longitude: number, julianDay: number): AstroLine {
  const mcLon = calculateMCLongitude(longitude, julianDay);
  const points: LinePoint[] = [];

  for (let lat = -66; lat <= 66; lat += 2) {
    points.push({ lat, lon: mcLon });
  }

  return { planet, angle: 'MC', points, longitude: mcLon };
}

/**
 * Calculate IC (Nadir) line - opposite of MC
 */
export function calculateICLine(planet: string, longitude: number, julianDay: number): AstroLine {
  const mcLon = calculateMCLongitude(longitude, julianDay);
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
export function calculateACLine(planet: string, longitude: number, julianDay: number): AstroLine {
  const points: LinePoint[] = [];

  for (let lat = -66; lat <= 66; lat += 1) {
    const lon = calculateACLongitude(longitude, lat, julianDay);
    if (lon !== null) {
      points.push({ lat, lon });
    }
  }

  return { planet, angle: 'AC', points };
}

/**
 * Calculate DC (Descendant/Setting) line - opposite of AC
 */
export function calculateDCLine(planet: string, longitude: number, julianDay: number): AstroLine {
  const points: LinePoint[] = [];

  for (let lat = -66; lat <= 66; lat += 1) {
    const acLon = calculateACLongitude(longitude, lat, julianDay);
    if (acLon !== null) {
      let dcLon = normalizeAngle(acLon + 180);
      if (dcLon > 180) dcLon -= 360;
      points.push({ lat, lon: dcLon });
    }
  }

  return { planet, angle: 'DC', points };
}

/**
 * Calculate all 4 lines for a single planet
 */
export function calculatePlanetLines(planet: string, longitude: number, julianDay: number): AstroLine[] {
  return [
    calculateMCLine(planet, longitude, julianDay),
    calculateICLine(planet, longitude, julianDay),
    calculateACLine(planet, longitude, julianDay),
    calculateDCLine(planet, longitude, julianDay),
  ];
}
