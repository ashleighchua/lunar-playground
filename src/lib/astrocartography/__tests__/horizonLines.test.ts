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
    // astronomy-engine wants RA in sidereal hours; no refraction so we get the geometric horizon.
    const hor = Astronomy.Horizon(time, observer, ra / 15, dec, 'normal');
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
