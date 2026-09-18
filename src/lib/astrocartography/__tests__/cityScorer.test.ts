import { describe, it, expect } from 'vitest';
import { distanceToLine } from '../cityScorer';
import type { AstroLine } from '../lineCalculator';

describe('distanceToLine', () => {
  it('does not create a phantom segment where an AC/DC curve crosses the antimeridian', () => {
    // A DC curve sampled per degree of latitude that wraps from +177 to -177
    // around 30°N — the exact shape that used to make Austin (30.3°N, -97.7°)
    // read as sitting 2.7 miles from a Jupiter DC line on the far side of the
    // Pacific.
    const points = [];
    for (let lat = 20; lat <= 40; lat++) {
      let lon = 177 + (lat - 30) * -0.6; // 183 at 20N ... 171 at 40N
      if (lon > 180) lon -= 360;
      points.push({ lat, lon });
    }
    const line: AstroLine = { planet: 'Jupiter', angle: 'DC', points };

    // Austin is ~85° of longitude from the curve — nowhere near it.
    expect(distanceToLine(30.2672, -97.7431, line)).toBeGreaterThan(60);
    // A point actually on the curve, past the antimeridian, is still close...
    expect(distanceToLine(24, -179.4, line)).toBeLessThan(1);
    // ... as is one before it.
    expect(distanceToLine(31, 176.4, line)).toBeLessThan(1);
    // And a point straddling the wrap is measured across the antimeridian, not around the globe.
    expect(distanceToLine(25.5, 179.9, line)).toBeLessThan(1);
  });
});
