/**
 * Independent accuracy check for the natal/astrocartography engine.
 *
 * Cross-checks the hand-rolled formulas in ephemeris.ts / houses.ts against
 * astronomy-engine's own high-level functions (a separate code path within
 * the same well-validated library — Don Cross's astronomy-engine, itself
 * cross-checked against JPL Horizons/NOVAS to ~1 arcminute for planets).
 * Run this any time the underlying formulas change, or whenever a client
 * report's accuracy needs to be independently defensible.
 *
 * Usage: npx tsx scripts/relocation-report/verify-accuracy.ts
 */
import * as Astronomy from 'astronomy-engine';
import {
  toJulianDay,
  calculateSunLongitude,
  calculateMercuryLongitude,
} from '../../src/lib/ephemeris';
import { calculateGMST, calculateObliquity, calculateAscendantLongitude, getMidheaven } from '../../src/lib/houses';

function jdToAstroTime(jd: number): Astronomy.AstroTime {
  return new Astronomy.AstroTime(jd - 2451545.0);
}

function geoEclLon(body: Astronomy.Body, jd: number): number {
  const vec = Astronomy.GeoVector(body, jdToAstroTime(jd), true);
  const ecl = Astronomy.Ecliptic(vec);
  return ((ecl.elon % 360) + 360) % 360;
}

// A handful of real, spot-checkable birth moments (place, UT date/time).
const cases = [
  { label: 'carecombo (Redlands, CA) — 1991-12-13 21:44 UT', jd: toJulianDay(1991, 12, 13, 21 + 44 / 60), lat: 34.0556, lon: -117.1825 },
  { label: 'J2000.0 epoch — 2000-01-01 12:00 UT', jd: toJulianDay(2000, 1, 1, 12), lat: 0, lon: 0 },
];

for (const c of cases) {
  console.log(`\n=== ${c.label} (JD ${c.jd.toFixed(5)}) ===`);

  // Sun: hand-rolled Meeus low-precision series vs astronomy-engine's own Sun vector.
  const sunHand = calculateSunLongitude(c.jd);
  const sunLib = geoEclLon(Astronomy.Body.Sun, c.jd);
  console.log(`Sun longitude   — hand-formula: ${sunHand.toFixed(4)}°  astronomy-engine: ${sunLib.toFixed(4)}°  delta: ${Math.abs(sunHand - sunLib).toFixed(4)}° (${(Math.abs(sunHand - sunLib) * 3600).toFixed(1)}")`);

  // Mercury (sanity: this one already calls astronomy-engine internally in
  // ephemeris.ts, so this just confirms the wiring, not independent accuracy).
  const mercuryHand = calculateMercuryLongitude(c.jd);
  const mercuryLib = geoEclLon(Astronomy.Body.Mercury, c.jd);
  console.log(`Mercury longitude — ephemeris.ts: ${mercuryHand.toFixed(4)}°  direct astronomy-engine: ${mercuryLib.toFixed(4)}°  delta: ${Math.abs(mercuryHand - mercuryLib).toFixed(6)}°`);

  // Obliquity: hand-rolled IAU polynomial vs astronomy-engine's e_tilt.
  const oblHand = calculateObliquity(c.jd);
  const tilt = Astronomy.e_tilt(jdToAstroTime(c.jd));
  console.log(`Obliquity       — hand-formula: ${oblHand.toFixed(6)}°  astronomy-engine (mean): ${tilt.mobl.toFixed(6)}°  delta: ${Math.abs(oblHand - tilt.mobl).toFixed(6)}°`);

  // GMST: hand-rolled IAU 1982 formula vs astronomy-engine's SiderealTime
  // (GAST, apparent — includes nutation, so a few arcseconds of difference
  // from mean GMST is expected and is not an error).
  const gmstHand = calculateGMST(c.jd);
  const gastLib = Astronomy.SiderealTime(jdToAstroTime(c.jd)) * 15; // hours -> degrees
  console.log(`Sidereal time   — hand GMST: ${gmstHand.toFixed(4)}°  astronomy-engine GAST: ${gastLib.toFixed(4)}°  delta: ${Math.abs(gmstHand - gastLib).toFixed(4)}° (expected: small, from nutation/equation-of-equinoxes, not error)`);

  if (c.lat !== 0 || c.lon !== 0) {
    const asc = calculateAscendantLongitude(c.jd, c.lat, c.lon);
    const mc = getMidheaven(c.jd, c.lon);
    console.log(`Ascendant: ${asc.toFixed(2)}°  |  Midheaven: ${mc.toFixed(2)}°  (lat ${c.lat}, lon ${c.lon})`);
  }
}
