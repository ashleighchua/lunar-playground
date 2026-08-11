import { describe, it, expect } from 'vitest';
import * as Astronomy from 'astronomy-engine';
import {
  calculateSunLongitude,
  calculateMoonLongitude,
  calculateMercuryLongitude,
  calculateVenusLongitude,
  calculateMarsLongitude,
  calculateJupiterLongitude,
  calculateSaturnLongitude,
  calculateUranusLongitude,
  calculateNeptuneLongitude,
  calculatePlutoLongitude,
  toJulianDay,
  calculateChart,
} from '../ephemeris';
import {
  calculateAscendantLongitude,
  getMidheaven,
  calculateHouseCusps,
  assignPlanetToHouse,
  calculateRelocatedHouses,
} from '../houses';

/**
 * Golden-fixture / invariant suite for Phase 1 (ephemeris accuracy + house system).
 *
 * Two kinds of checks here, deliberately kept separate:
 *  1. Cross-checks against astronomy-engine itself for the migrated planet
 *     longitudes — legitimate because astronomy-engine's own docs state it's
 *     validated against NOVAS/JPL Horizons to ~1 arcminute, so it's a real
 *     independent reference for whether *our* JD->AstroTime plumbing is wired
 *     correctly, not a test of the library's own accuracy.
 *  2. Self-contained mathematical invariants for the house-cusp code, which is
 *     genuinely new math with no prior implementation to compare against.
 *
 * NOTE: this does not replace a manual spot-check against an independent chart
 * calculator (e.g. astro.com) for a couple of real charts before launch — that
 * kind of end-to-end "does this look like a real astrologer's chart" check
 * isn't something this suite can automate, and is worth doing by hand once
 * before this goes live with paying customers.
 */

const ANGLE_TOLERANCE_DEG = 0.05; // astronomy-engine wrapper plumbing should match to well under 1 arcmin

function angularDiff(a: number, b: number): number {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

describe('planet longitudes match astronomy-engine directly (plumbing correctness)', () => {
  const cases: { label: string; jd: number }[] = [
    { label: '2000-01-01 (J2000 epoch)', jd: toJulianDay(2000, 1, 1, 12) },
    { label: '1990-07-15', jd: toJulianDay(1990, 7, 15, 3.5) },
    { label: '1850-03-02 (pre-1900)', jd: toJulianDay(1850, 3, 2, 18) },
    { label: '2026-07-27', jd: toJulianDay(2026, 7, 27, 9.25) },
  ];

  const bodies: { name: string; fn: (jd: number) => number; body: Astronomy.Body }[] = [
    { name: 'Moon', fn: calculateMoonLongitude, body: Astronomy.Body.Moon },
    { name: 'Mercury', fn: calculateMercuryLongitude, body: Astronomy.Body.Mercury },
    { name: 'Venus', fn: calculateVenusLongitude, body: Astronomy.Body.Venus },
    { name: 'Mars', fn: calculateMarsLongitude, body: Astronomy.Body.Mars },
    { name: 'Jupiter', fn: calculateJupiterLongitude, body: Astronomy.Body.Jupiter },
    { name: 'Saturn', fn: calculateSaturnLongitude, body: Astronomy.Body.Saturn },
    { name: 'Uranus', fn: calculateUranusLongitude, body: Astronomy.Body.Uranus },
    { name: 'Neptune', fn: calculateNeptuneLongitude, body: Astronomy.Body.Neptune },
    { name: 'Pluto', fn: calculatePlutoLongitude, body: Astronomy.Body.Pluto },
  ];

  for (const { label, jd } of cases) {
    for (const { name, fn, body } of bodies) {
      it(`${name} at ${label}`, () => {
        const time = new Astronomy.AstroTime(jd - 2451545.0);
        const vec = Astronomy.GeoVector(body, time, true);
        const expected = Astronomy.Ecliptic(vec).elon;
        const actual = fn(jd);
        expect(angularDiff(actual, expected)).toBeLessThan(ANGLE_TOLERANCE_DEG);
      });
    }
  }
});

describe('Sun longitude at known equinox/solstice moments (independent anchor)', () => {
  // Published (~minute-level) 2020 equinox/solstice UTC instants. Tolerance is
  // generous (0.5°, ~12 hours of Sun-motion) to absorb any imprecision in the
  // remembered timestamp while still catching a gross error (the old Mars
  // formula, for comparison, could be off by single-digit degrees).
  const anchors: { label: string; date: [number, number, number, number]; expectedLongitude: number }[] = [
    { label: 'March 2020 equinox', date: [2020, 3, 20, 3.83], expectedLongitude: 0 },
    { label: 'June 2020 solstice', date: [2020, 6, 20, 21.73], expectedLongitude: 90 },
    { label: 'September 2020 equinox', date: [2020, 9, 22, 13.31], expectedLongitude: 180 },
    { label: 'December 2020 solstice', date: [2020, 12, 21, 10.02], expectedLongitude: 270 },
  ];

  for (const { label, date, expectedLongitude } of anchors) {
    it(label, () => {
      const jd = toJulianDay(...date);
      const longitude = calculateSunLongitude(jd);
      expect(angularDiff(longitude, expectedLongitude)).toBeLessThan(0.5);
    });
  }
});

describe('house-cusp math invariants', () => {
  it('the Ascendant always falls in house 1 by construction', () => {
    const jd = toJulianDay(1990, 7, 15, 3.5);
    const latLons: [number, number][] = [
      [51.5, -0.13], // London
      [-33.87, 151.21], // Sydney (southern hemisphere)
      [40.71, -74.0], // New York
      [64.5, -165.4], // Nome, Alaska (high latitude)
      [-54.8, -68.3], // Ushuaia, Argentina (extreme southern latitude)
    ];
    for (const [lat, lon] of latLons) {
      const asc = calculateAscendantLongitude(jd, lat, lon);
      const houses = calculateHouseCusps(jd, lat, lon);
      expect(assignPlanetToHouse(asc, houses)).toBe(1);
    }
  });

  it('house cusps are 12 whole signs, each exactly 30° apart, starting at the Ascendant sign', () => {
    const jd = toJulianDay(1975, 11, 3, 14);
    const houses = calculateHouseCusps(jd, 35.68, 139.69); // Tokyo
    expect(houses.cusps).toHaveLength(12);
    for (let i = 0; i < 12; i++) {
      const expectedCusp = ((houses.ascendantSign + i) * 30) % 360;
      expect(houses.cusps[i]).toBeCloseTo(expectedCusp, 6);
    }
  });

  it('assignPlanetToHouse cycles 1-12 correctly across all 12 signs', () => {
    const jd = toJulianDay(2005, 5, 20, 8);
    const houses = calculateHouseCusps(jd, 48.85, 2.35); // Paris
    for (let signIndex = 0; signIndex < 12; signIndex++) {
      const longitude = signIndex * 30 + 15; // middle of the sign
      const house = assignPlanetToHouse(longitude, houses);
      const expectedHouse = ((signIndex - houses.ascendantSign + 12) % 12) + 1;
      expect(house).toBe(expectedHouse);
      expect(house).toBeGreaterThanOrEqual(1);
      expect(house).toBeLessThanOrEqual(12);
    }
  });

  it('relocating to the birth location itself reproduces the natal houses exactly', () => {
    const jd = toJulianDay(1998, 2, 14, 22.5);
    const lat = 37.77;
    const lon = -122.42; // San Francisco
    const natalHouses = calculateHouseCusps(jd, lat, lon);
    const relocated = calculateRelocatedHouses(
      [{ name: 'Sun', longitude: 123.4 }, { name: 'Moon', longitude: 55.1 }],
      jd,
      lat,
      lon
    );
    expect(relocated.houses.ascendantSign).toBe(natalHouses.ascendantSign);
    expect(relocated.houses.cusps).toEqual(natalHouses.cusps);
  });

  it('relocating to a genuinely different city changes at least one planet\'s house', () => {
    const jd = toJulianDay(1991, 1, 26, 21.583); // matches the reference "Elena" example's UTC-ish moment
    const athens: [number, number] = [37.98, 23.73];
    const la: [number, number] = [34.05, -118.24];

    const natal = calculateHouseCusps(jd, ...athens);
    const planets = [
      { name: 'Saturn', longitude: 300.2 },
      { name: 'Pluto', longitude: 224.7 },
    ];
    const natalAssignments = planets.map((p) => assignPlanetToHouse(p.longitude, natal));

    const relocated = calculateRelocatedHouses(planets, jd, ...la);
    const relocatedAssignments = relocated.planets.map((p) => p.house);

    expect(relocatedAssignments).not.toEqual(natalAssignments);
  });

  it('does not throw and returns a valid Ascendant/Midheaven for pre-1900 dates and extreme latitudes', () => {
    const jd = toJulianDay(1850, 6, 1, 6);
    const asc = calculateAscendantLongitude(jd, 65.0, 25.0); // above the Arctic Circle
    const mc = getMidheaven(jd, 25.0);
    expect(Number.isFinite(asc)).toBe(true);
    expect(asc).toBeGreaterThanOrEqual(0);
    expect(asc).toBeLessThan(360);
    expect(Number.isFinite(mc)).toBe(true);
  });
});

describe('calculateChart integration', () => {
  it('returns houses, midheaven, and house numbers on every planet when a location is given', async () => {
    const chart = await calculateChart({
      year: 1991,
      month: 1,
      day: 26,
      hour: 21,
      minute: 35,
      latitude: 37.98,
      longitude: 23.73,
      timezone: 2, // Athens, EET
    });

    expect(chart).not.toBeNull();
    expect(chart!.houseSystem).toBe('whole-sign');
    expect(chart!.midheaven).not.toBeNull();
    expect(chart!.houses).not.toBeNull();
    for (const planet of [chart!.sun, chart!.moon, chart!.mercury, chart!.venus, chart!.mars, chart!.jupiter, chart!.saturn, chart!.uranus, chart!.neptune, chart!.pluto]) {
      expect(planet.house).toBeGreaterThanOrEqual(1);
      expect(planet.house).toBeLessThanOrEqual(12);
    }
  });

  it('returns null houses/midheaven (not a crash) when no location is given', async () => {
    const chart = await calculateChart({
      year: 1991,
      month: 1,
      day: 26,
      hour: 21,
      minute: 35,
      latitude: NaN,
      longitude: NaN,
      timezone: 2,
    });

    expect(chart).not.toBeNull();
    expect(chart!.rising).toBeNull();
    expect(chart!.houses).toBeNull();
    expect(chart!.midheaven).toBeNull();
  });

  it('computes houses/rising correctly for a birth exactly on the equator or Greenwich meridian', async () => {
    const chart = await calculateChart({
      year: 1991,
      month: 1,
      day: 26,
      hour: 21,
      minute: 35,
      latitude: 0,
      longitude: 0,
      timezone: 0,
    });

    expect(chart).not.toBeNull();
    expect(chart!.rising).not.toBeNull();
    expect(chart!.houses).not.toBeNull();
    expect(chart!.midheaven).not.toBeNull();
  });
});
