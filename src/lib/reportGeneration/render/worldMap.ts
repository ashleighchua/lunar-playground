/**
 * Astrocartography world map — inline SVG, no dependency on template.ts at
 * runtime (only `import type` below, erased at compile time) so template.ts
 * can import this module's render function without a circular runtime
 * import.
 *
 * Continent outlines are a hand-authored stylized illustration (a handful of
 * anchor points per landmass, smoothed into soft blobs via Catmull-Rom
 * splines), not traced survey-grade coastline data — deliberately: no map
 * library or licensed map asset exists anywhere in this codebase, and a
 * literal accurate coastline would look like a screenshot, working against
 * the "mystical travel guide" brand this report is going for. Anchor points
 * are approximate; nudge them directly in the arrays below if a specific
 * region looks off once rendered.
 *
 * Each line carries an inline glyph+angle tag at its own path (not just a
 * color) since color alone doesn't identify a line, plus template.ts adds a
 * full text legend below this SVG using the same badge component the rest
 * of the report already uses.
 */
import type { SummaryCity, ReportContent } from './template';

const PLANET_COLOR: Record<string, string> = {
  Sun: '#D9A441', Moon: '#7B93B8', Mercury: '#5B8A6B', Venus: '#C4577B', Mars: '#B8503F',
  Jupiter: '#4A5F9E', Saturn: '#7A8699', Uranus: '#3F9E96', Neptune: '#6A5AC4', Pluto: '#8A4F92',
};

// Real astrological glyphs, not emoji — the same vocabulary the rest of the
// report already leans on (nickname/tagline copy, italic serif accents).
const PLANET_GLYPH: Record<string, string> = {
  Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂',
  Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇',
};

export const MAP_WIDTH = 1000;
export const MAP_LAT_MIN = -58;
export const MAP_LAT_MAX = 78;
export const MAP_HEIGHT = Math.round((MAP_WIDTH * (MAP_LAT_MAX - MAP_LAT_MIN)) / 360); // 378

export function projectLatLon(lat: number, lon: number): { x: number; y: number } {
  return {
    x: ((lon + 180) / 360) * MAP_WIDTH,
    y: ((MAP_LAT_MAX - lat) / (MAP_LAT_MAX - MAP_LAT_MIN)) * MAP_HEIGHT,
  };
}

/** Smooth closed Catmull-Rom spline through the given points, as an SVG cubic-bezier path. */
function smoothClosedPath(points: { x: number; y: number }[]): string {
  const n = points.length;
  if (n < 3) return '';
  const at = (i: number) => points[((i % n) + n) % n];
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  for (let i = 0; i < n; i++) {
    const p0 = at(i - 1), p1 = at(i), p2 = at(i + 1), p3 = at(i + 2);
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
  }
  return d + 'Z';
}

/** A simple 8-point sparkle/star mark — the same ✦ motif already used elsewhere on the site (hero stars, section dividers) — instead of a plain dot. */
function sparklePath(cx: number, cy: number, r: number): string {
  const rInner = r * 0.38;
  const pts: string[] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45 * Math.PI) / 180;
    const radius = i % 2 === 0 ? r : rInner;
    const x = cx + radius * Math.sin(angle);
    const y = cy - radius * Math.cos(angle);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M ${pts.join(' L ')} Z`;
}

// Hand-authored, approximate anchor points [lat, lon] per landmass — a stylized
// silhouette, not surveyed coastline. See file header.
const LANDMASSES: { name: string; points: [number, number][] }[] = [
  {
    name: 'North America',
    points: [
      [70, -165], [66, -168], [60, -165], [55, -135], [49, -125], [40, -124], [32, -117], [27, -113],
      [23, -110], [20, -105], [16, -95], [18, -88], [21, -97], [25, -97], [29, -94], [30, -89], [25, -80],
      [27, -80], [32, -80], [35, -76], [38, -75], [41, -71], [44, -68], [45, -67], [47, -60], [47, -52],
      [50, -60], [58, -78], [60, -65], [66, -75], [70, -95], [70, -125], [70, -140],
    ],
  },
  {
    name: 'South America',
    points: [
      [12, -72], [11, -74], [8, -77], [1, -79], [-5, -81], [-18, -70], [-23, -70], [-33, -72], [-45, -74],
      [-52, -73], [-55, -70], [-52, -68], [-42, -64], [-34, -58], [-34, -54], [-23, -43], [-13, -39],
      [-8, -35], [-1, -48], [2, -50], [5, -52], [10, -62], [11, -66], [12, -72],
    ],
  },
  {
    name: 'Africa',
    points: [
      [37, -6], [33, -8], [27, -13], [21, -17], [14, -17], [8, -13], [5, -9], [4, -3], [4, 7], [-1, 9],
      [-6, 12], [-12, 13], [-18, 12], [-26, 15], [-34, 18], [-34, 26], [-29, 32], [-20, 35], [-10, 40],
      [-5, 39], [2, 45], [8, 48], [12, 43], [15, 41], [21, 37], [28, 34], [31, 32], [32, 20], [33, 10],
      [37, 10], [36, 0], [37, -6],
    ],
  },
  {
    // Single clockwise sweep of the outer coastline, Portugal back to Portugal —
    // no backtracking jumps into the interior (an earlier draft's detour up
    // into Russia/the Caucasus after Italy, plus a stray Somalia point that
    // doesn't belong on this landmass at all, self-intersected into a visible
    // notch near the Arabian Sea; both are removed here).
    name: 'Eurasia',
    points: [
      [36, -9], [43, -9], [48, -5], [51, 2], [55, 8], [58, 11], [63, 8], [69, 17], [70, 30], [73, 55],
      [73, 80], [72, 105], [70, 140], [65, 178], [58, 160], [53, 140], [43, 132], [38, 128], [31, 121],
      [22, 114], [10, 106], [1, 104], [6, 80], [8, 77], [15, 74], [21, 72], [24, 67], [25, 58], [26, 52],
      [24, 48], [18, 42], [15, 43], [20, 39], [28, 35], [31, 34], [36, 36], [41, 29], [40, 20], [45, 14],
      [45, 9], [43, 10], [38, 15], [37, -2], [36, -9],
    ],
  },
  {
    name: 'Japan',
    points: [
      [45, 141], [43, 145], [41, 141], [38, 141], [35, 140], [34, 138], [33, 136], [31, 131], [33, 130],
      [35, 133], [37, 137], [40, 140], [41, 140], [45, 141],
    ],
  },
  {
    name: 'Australia',
    points: [
      [-11, 131], [-12, 137], [-16, 145], [-20, 149], [-25, 153], [-30, 153], [-34, 151], [-38, 147],
      [-38, 145], [-35, 138], [-32, 132], [-32, 115], [-26, 114], [-20, 114], [-16, 123], [-14, 126],
      [-11, 131],
    ],
  },
];

interface LabeledPoint {
  x: number;
  y: number;
  name: string;
}

function placeLabels(points: LabeledPoint[]): (LabeledPoint & { dy: number })[] {
  const sorted = [...points].sort((a, b) => a.x - b.x);
  const placed: { x: number; y: number }[] = [];
  const withDy = sorted.map((p) => {
    const crowded = placed.some((q) => Math.abs(q.x - p.x) < 70 && Math.abs(q.y - p.y) < 24);
    const dy = crowded ? 24 : -16;
    placed.push({ x: p.x, y: p.y + dy });
    return { ...p, dy };
  });
  // restore original order so downstream markup order stays deterministic across renders
  const byName = new Map(withDy.map((p) => [p.name, p]));
  return points.map((p) => byName.get(p.name)!);
}

/** Splits a raw lat/lon polyline into sub-paths wherever the source data has a real gap — a latitude jump (a dropped null range near the poles) or a longitude antimeridian wrap — so those gaps don't render as spurious straight connectors. */
function splitLineIntoSegments(points: { lat: number; lon: number }[]): { lat: number; lon: number }[][] {
  if (points.length === 0) return [];
  const segments: { lat: number; lon: number }[][] = [[points[0]]];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const cur = points[i];
    const latGap = Math.abs(cur.lat - prev.lat) > 3;
    const antimeridianWrap = Math.abs(cur.lon - prev.lon) > 180;
    if (latGap || antimeridianWrap) segments.push([]);
    segments[segments.length - 1].push(cur);
  }
  return segments.filter((seg) => seg.length >= 2);
}

/** Renders one planetary line plus a small glyph+angle tag on its longest visible segment — color alone doesn't identify a line on a print page. */
function renderLine(line: ReportContent['planetaryLines'][number], index: number): string {
  const color = PLANET_COLOR[line.planet] ?? '#888';
  const segments = splitLineIntoSegments(line.points);
  if (segments.length === 0) return '';

  const paths = segments
    .map((seg) => {
      const d = seg.map((p, i) => {
        const { x, y } = projectLatLon(p.lat, p.lon);
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      }).join(' ');
      return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.25" opacity="0.8" stroke-linecap="round" />`;
    })
    .join('');

  const longest = segments.reduce((a, b) => (b.length > a.length ? b : a));
  const mid = longest[Math.floor(longest.length / 2)];
  const { x, y } = projectLatLon(mid.lat, mid.lon);
  const dy = index % 2 === 0 ? -13 : 15; // alternate above/below the line to reduce label-on-label overlap across lines
  const glyph = PLANET_GLYPH[line.planet] ?? line.planet.slice(0, 2).toUpperCase();
  const tagWidth = 40;
  const tag = `
    <g transform="translate(${x.toFixed(1)}, ${(y + dy).toFixed(1)})">
      <rect x="${-tagWidth / 2}" y="-10" width="${tagWidth}" height="20" rx="10" fill="${color}" />
      <text x="0" y="1" text-anchor="middle" dominant-baseline="middle" font-family="'Inter', sans-serif" font-size="11" font-weight="700" fill="#fff">${glyph} ${line.angle}</text>
    </g>`;

  return paths + tag;
}

export function renderWorldMapSvg(cities: SummaryCity[], lines: ReportContent['planetaryLines']): string {
  const landPaths = LANDMASSES.map((land) => {
    const projected = land.points.map(([lat, lon]) => projectLatLon(lat, lon));
    return `<path d="${smoothClosedPath(projected)}" fill="#F6E4C6" stroke="#D9B65C" stroke-width="1.25" />`;
  }).join('');

  const linePaths = lines.filter((l) => l.points.length > 0).map((l, i) => renderLine(l, i)).join('');

  const rawCityPoints: LabeledPoint[] = cities.map((c) => ({ ...projectLatLon(c.lat, c.lon), name: c.name }));
  const labeled = placeLabels(rawCityPoints);

  const markers = labeled
    .map((c) => `
    <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="13" fill="#cba135" opacity="0.22" />
    <path d="${sparklePath(c.x, c.y, 7)}" fill="#cba135" stroke="#1a1a2e" stroke-width="0.75" />
    <text x="${c.x.toFixed(1)}" y="${(c.y + c.dy).toFixed(1)}" text-anchor="middle" font-family="'Playfair Display', serif" font-size="13" font-weight="600" fill="#1a1a2e">${c.name}</text>`)
    .join('');

  return `
  <svg viewBox="0 0 ${MAP_WIDTH} ${MAP_HEIGHT}" style="width:100%;display:block;overflow:hidden;border-radius:12px;">
    <rect x="0" y="0" width="${MAP_WIDTH}" height="${MAP_HEIGHT}" fill="#EEF0F8" />
    ${landPaths}
    ${linePaths}
    ${markers}
  </svg>`;
}
