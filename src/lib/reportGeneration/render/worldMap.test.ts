import { describe, it, expect } from 'vitest';
import { renderWorldMapSvg, projectLatLon, MAP_WIDTH, MAP_HEIGHT } from './worldMap';
import type { SummaryCity, ReportContent } from './template';

function city(name: string, lat: number, lon: number): SummaryCity {
  return { name, country: 'Testland', lat, lon, badges: [], nickname: '', paragraph: '' };
}

type PlanetaryLine = ReportContent['planetaryLines'][number];

describe('projectLatLon', () => {
  it('maps the antimeridian and both map edges to the expected pixel bounds', () => {
    expect(projectLatLon(0, -180)).toEqual({ x: 0, y: expect.any(Number) });
    expect(projectLatLon(0, 180)).toEqual({ x: MAP_WIDTH, y: expect.any(Number) });
  });
});

describe('renderWorldMapSvg', () => {
  it('produces well-formed SVG with no NaN/undefined coordinates for a realistic set of cities and lines', () => {
    const cities = [city('Los Angeles', 34.05, -118.24), city('Tokyo', 35.68, 139.69), city('London', 51.51, -0.13)];
    const lines: PlanetaryLine[] = [
      { planet: 'Venus', angle: 'DC', blurb: '', points: [{ lat: 10, lon: 10 }, { lat: 11, lon: 11 }] },
      { planet: 'Jupiter', angle: 'MC', blurb: '', points: [] }, // no source line matched — must be skipped, not crash
    ];

    const svg = renderWorldMapSvg(cities, lines);
    expect(svg).toContain('<svg');
    expect(svg).toContain(`viewBox="0 0 ${MAP_WIDTH} ${MAP_HEIGHT}"`);
    expect(svg).not.toMatch(/NaN/);
    expect(svg).not.toMatch(/undefined/);
    for (const c of cities) expect(svg).toContain(`>${c.name}<`);
  });

  it('splits a line into separate sub-paths across a latitude gap, instead of drawing a spurious straight connector', () => {
    const lines: PlanetaryLine[] = [
      {
        planet: 'Mars', angle: 'AC', blurb: '',
        points: [{ lat: 0, lon: 0 }, { lat: 1, lon: 1 }, { lat: 20, lon: 20 }, { lat: 21, lon: 21 }], // 19deg gap between the two pairs
      },
    ];
    const svg = renderWorldMapSvg([], lines);
    const marsPaths = svg.match(/<path d="[^"]*" fill="none" stroke="#B8503F"/g) ?? [];
    expect(marsPaths).toHaveLength(2);
  });

  it('splits a line at an antimeridian wrap, instead of drawing a line across the whole map', () => {
    const lines: PlanetaryLine[] = [
      {
        planet: 'Saturn', angle: 'IC', blurb: '',
        points: [{ lat: 0, lon: 170 }, { lat: 1, lon: 175 }, { lat: 2, lon: -175 }, { lat: 3, lon: -170 }],
      },
    ];
    const svg = renderWorldMapSvg([], lines);
    const saturnPaths = svg.match(/<path d="[^"]*" fill="none" stroke="#7A8699"/g) ?? [];
    expect(saturnPaths).toHaveLength(2);
  });

  it('renders no path at all for a line with fewer than two points (never matched a source AstroLine)', () => {
    const lines: PlanetaryLine[] = [{ planet: 'Pluto', angle: 'DC', blurb: '', points: [] }];
    const svg = renderWorldMapSvg([], lines);
    expect(svg).not.toContain('stroke="#8A4F92"');
  });

  it('tags each line with its planet glyph and angle, not color alone', () => {
    const lines: PlanetaryLine[] = [
      { planet: 'Jupiter', angle: 'MC', blurb: '', points: [{ lat: 10, lon: 10 }, { lat: 11, lon: 11 }] },
    ];
    const svg = renderWorldMapSvg([], lines);
    expect(svg).toContain('♃ MC');
  });
});
