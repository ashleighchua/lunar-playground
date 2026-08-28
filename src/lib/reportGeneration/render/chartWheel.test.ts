import { describe, it, expect } from 'vitest';
import { renderChartWheelSvg } from './chartWheel';
import type { NatalChart } from './template';

function fixture(overrides: Partial<NatalChart> = {}): NatalChart {
  return {
    intro: '',
    bigThree: [],
    planets: [{ planet: 'Sun', sign: 'Aries', degree: '0°', longitude: 0, house: 1 }],
    ascendant: { sign: 'Aries', degree: '0°', longitude: 0 },
    midheaven: { sign: 'Capricorn', degree: '0°', longitude: 270 },
    cusps: [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330],
    ...overrides,
  };
}

describe('renderChartWheelSvg', () => {
  it('returns empty string when cusps are missing, so the caller falls back to the plain table', () => {
    expect(renderChartWheelSvg(fixture({ cusps: [] }))).toBe('');
  });

  it("places a planet at the Ascendant's own longitude at the wheel's 9 o'clock point", () => {
    // R_PLANETS=165, CX=CY=320 -> offset 0 (same longitude as the Ascendant) should land at (320-165, 320).
    const svg = renderChartWheelSvg(fixture());
    expect(svg).toContain('cx="155.0" cy="320.0"');
  });

  it('produces well-formed SVG with no NaN/undefined coordinates for a full 10-planet chart, including a tight conjunction', () => {
    const planets: NatalChart['planets'] = [
      { planet: 'Sun', sign: 'Aries', degree: '1°', longitude: 1, house: 1 },
      { planet: 'Moon', sign: 'Aries', degree: '2°', longitude: 2, house: 1 }, // near-exact conjunction with Sun, exercises spreadOffsets
      { planet: 'Mercury', sign: 'Taurus', degree: '10°', longitude: 40, house: 2 },
      { planet: 'Venus', sign: 'Gemini', degree: '5°', longitude: 65, house: 3 },
      { planet: 'Mars', sign: 'Cancer', degree: '20°', longitude: 110, house: 4 },
      { planet: 'Jupiter', sign: 'Leo', degree: '15°', longitude: 135, house: 5 },
      { planet: 'Saturn', sign: 'Virgo', degree: '0°', longitude: 150, house: 6 },
      { planet: 'Uranus', sign: 'Libra', degree: '0°', longitude: 180, house: 7 },
      { planet: 'Neptune', sign: 'Scorpio', degree: '0°', longitude: 210, house: 8 },
      { planet: 'Pluto', sign: 'Sagittarius', degree: '0°', longitude: 240, house: 9 },
    ];
    const svg = renderChartWheelSvg(fixture({ planets }));
    expect(svg).toContain('<svg');
    expect(svg).not.toMatch(/NaN/);
    expect(svg).not.toMatch(/undefined/);
    // 10 planet dots + Ascendant/Descendant markers should all be numeric, finite coordinates.
    const coords = [...svg.matchAll(/cx="(-?[\d.]+)" cy="(-?[\d.]+)"/g)];
    expect(coords.length).toBeGreaterThanOrEqual(10);
    for (const [, x, y] of coords) {
      expect(Number.isFinite(Number(x))).toBe(true);
      expect(Number.isFinite(Number(y))).toBe(true);
    }
  });

  it('omits the MC/IC axis when the Midheaven longitude is null, without breaking the rest of the wheel', () => {
    const svg = renderChartWheelSvg(fixture({ midheaven: { sign: '', degree: '', longitude: null } }));
    expect(svg).not.toMatch(/NaN/);
    expect(svg).toContain('>AC<');
    expect(svg).toContain('>DC<');
    expect(svg).not.toContain('>MC<');
    expect(svg).not.toContain('>IC<');
  });
});
