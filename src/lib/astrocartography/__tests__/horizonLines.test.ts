import { describe, it, expect } from 'vitest';
import * as Astronomy from 'astronomy-engine';
import { toJulianDay, calculatePlanetEquatorial } from '../../ephemeris';
import { calculateACLine, calculateDCLine } from '../lineCalculator';

/**
 * Regression test for a real bug: the DC line used to be computed as
 * "AC longitude + 180°". Rising and setting are 2H apart in longitude, where
 * cos H = -tan(lat)·tan(dec) — that's 180° only when the planet's declination
 * is 0. For a planet with real declination the DC line was tens of degrees
 * off, which put Venus-DC "love" cities in the wrong place on client reports.
 *
 * Check: at every sampled point on a planet's AC and DC lines, the planet's
 * geometric altitude (computed independently by astronomy-engine from the
 * same RA/Dec) must be ~0°.
 */
describe('AC/DC lines sit on the true horizon', () => {
  // 1989-04-20 07:37 UT — Venus at ~+12° dec, Jupiter at ~+21° dec.
  const jd = toJulianDay(1989, 4, 20, 7 + 37 / 60);
  const time = new Astronomy.AstroTime(jd - 2451545.0);

  function altitudeAt(ra: number, dec: number, lat: number, lon: number): number {
    const observer = new Astronomy.Observer(lat, lon, 0);
    // astronomy-engine wants RA in sidereal hours; '' = no refraction, so we get the geometric horizon ('normal' would lift it ~0.5°).
    const hor = Astronomy.Horizon(time, observer, ra / 15, dec, '');
    return hor.altitude;
  }

  for (const planet of ['Venus', 'Jupiter', 'Moon', 'Saturn']) {
    it(`${planet}: every AC and DC line point has altitude ≈ 0`, () => {
      const eq = calculatePlanetEquatorial(planet, jd);
      for (const line of [calculateACLine(planet, eq, jd), calculateDCLine(planet, eq, jd)]) {
        expect(line.points.length).toBeGreaterThan(100);
        for (const p of line.points) {
          // Sampled at whole-degree latitudes; the great-circle math is exact,
          // so anything beyond a small tolerance means the wrong formula.
          expect(Math.abs(altitudeAt(eq.ra, eq.dec, p.lat, p.lon))).toBeLessThan(0.5);
        }
      }
    });
  }

  it('DC is NOT simply AC + 180° for a planet with non-zero declination', () => {
    const eq = calculatePlanetEquatorial('Jupiter', jd);
    const ac = calculateACLine('Jupiter', eq, jd).points.find((p) => p.lat === -43)!;
    const dc = calculateDCLine('Jupiter', eq, jd).points.find((p) => p.lat === -43)!;
    let sep = Math.abs(dc.lon - ac.lon);
    if (sep > 180) sep = 360 - sep;
    expect(Math.abs(sep - 180)).toBeGreaterThan(10);
  });
});

/**
 * Regression test for a second real bug: calculatePlanetEquatorial returned
 * J2000 RA/Dec, but the line calculator subtracts sidereal time *of date*
 * from RA. The mismatch rotated every line by the precession since 2000 —
 * invisible in the test above (it feeds the engine's own RA back into
 * Horizon, and 1989 is too close to 2000 to notice), but ~0.6° / ~30 miles
 * for a 1956 birth. Here the altitude check uses astronomy-engine's own
 * independent of-date position for the planet instead of the engine's RA.
 */
describe('lines use of-date RA/Dec, not J2000', () => {
  // 1956-07-16 10:06 UT — 44 years of precession from J2000 (~0.6°).
  const jd = toJulianDay(1956, 7, 16, 10 + 6 / 60);
  const time = new Astronomy.AstroTime(jd - 2451545.0);

  for (const planet of ['Venus', 'Jupiter', 'Pluto']) {
    it(`${planet}: the planet is actually on the horizon at its AC/DC line points`, () => {
      const eq = calculatePlanetEquatorial(planet, jd);
      const body = Astronomy.Body[planet as keyof typeof Astronomy.Body];
      for (const line of [calculateACLine(planet, eq, jd), calculateDCLine(planet, eq, jd)]) {
        for (const p of line.points.filter((pt) => Math.abs(pt.lat) <= 60)) {
          const observer = new Astronomy.Observer(p.lat, p.lon, 0);
          const ofDate = Astronomy.Equator(body, time, observer, true, true);
          const hor = Astronomy.Horizon(time, observer, ofDate.ra, ofDate.dec, '');
          expect(Math.abs(hor.altitude)).toBeLessThan(0.1);
        }
      }
    });
  }
});
