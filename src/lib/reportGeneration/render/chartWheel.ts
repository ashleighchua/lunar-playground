/**
 * Natal chart wheel — inline SVG, no dependency on template.ts at runtime
 * (only `import type` below, erased at compile time) so template.ts can
 * import this module's render function without a circular runtime import.
 *
 * Whole-sign houses mean a house cusp always falls exactly on a zodiac sign
 * boundary (a multiple of 30°) — so the same 12 evenly-spaced spokes serve
 * double duty as both the zodiac ring's sign divisions and the house
 * divisions. The Ascendant and Midheaven are drawn as their own axis lines,
 * separately, because they generally do NOT land exactly on one of those 12
 * spokes (the Ascendant sits somewhere inside house 1's wedge, not at its
 * edge; the Midheaven's position relative to the 10th-house cusp is a known
 * real quirk of whole-sign systems, not a bug here).
 */
import type { NatalChart, Planet, Angle } from './template';

const PLANET_COLOR: Record<string, string> = {
  Sun: '#B08D3E', Moon: '#8CA0B3', Mercury: '#5B8A6B', Venus: '#A85D74', Mars: '#8B3A3A',
  Jupiter: '#3B4C7A', Saturn: '#6B7280', Uranus: '#4A8B8B', Neptune: '#453B7C', Pluto: '#6B3F73',
};
const PLANET_ABBR: Record<string, string> = {
  Sun: 'SU', Moon: 'MO', Mercury: 'ME', Venus: 'VE', Mars: 'MA',
  Jupiter: 'JU', Saturn: 'SA', Uranus: 'UR', Neptune: 'NE', Pluto: 'PL',
};
const ANGLE_COLOR: Record<string, string> = { MC: '#1A1A2E', IC: '#4A3B5C', AC: '#B99567', DC: '#6E7A4E' };
const SIGN_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

const CX = 320;
const CY = 320;
const R_OUTER = 300;
const R_ZODIAC_INNER = 255;
const R_SIGN_GLYPH = 278;
const R_HOUSE_NUM = 232;
const R_INNER_HOLE = 26;
const R_PLANETS = 165;
const R_TICK_OUTER = 257;
const R_TICK_INNER = 247;
const MIN_PLANET_GAP_DEG = 9;

function normalize360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function offsetFromAsc(longitude: number, ascLongitude: number): number {
  return normalize360(longitude - ascLongitude);
}

/** offset=0 -> 9 o'clock (Ascendant), sweeping counterclockwise as offset increases (standard wheel convention). */
function screenPoint(offsetDeg: number, r: number): { x: number; y: number } {
  const theta = ((180 + offsetDeg) * Math.PI) / 180;
  return { x: CX + r * Math.cos(theta), y: CY - r * Math.sin(theta) };
}

function line(offsetDeg: number, rInner: number, rOuter: number, stroke: string, width: number): string {
  const a = screenPoint(offsetDeg, rInner);
  const b = screenPoint(offsetDeg, rOuter);
  return `<line x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${stroke}" stroke-width="${width}" />`;
}

/**
 * Spreads a list of raw offsets so no two are closer than
 * MIN_PLANET_GAP_DEG, without disturbing points that already have room.
 * Rotates the circle to start just after its largest gap first, so the
 * cascade has the most slack available and wraparound essentially never
 * binds for a realistic 10-planet chart. Tracks original indices throughout
 * (rather than the offset values) so exact conjunctions — two planets at the
 * identical longitude — never collide as map keys.
 */
function spreadOffsets(rawOffsets: number[]): number[] {
  const n = rawOffsets.length;
  if (n === 0) return [];
  const indices = rawOffsets.map((_, i) => i).sort((a, b) => rawOffsets[a] - rawOffsets[b]);

  let gapStartPos = 0;
  let largestGap = -1;
  for (let pos = 0; pos < n; pos++) {
    const nextPos = (pos + 1) % n;
    const current = rawOffsets[indices[pos]];
    const next = rawOffsets[indices[nextPos]] + (nextPos === 0 ? 360 : 0);
    const gap = next - current;
    if (gap > largestGap) {
      largestGap = gap;
      gapStartPos = nextPos;
    }
  }

  const rotatedIndices: number[] = [];
  const rotatedRaw: number[] = [];
  for (let k = 0; k < n; k++) {
    const pos = (gapStartPos + k) % n;
    const idx = indices[pos];
    const wrapped = gapStartPos > 0 && pos < gapStartPos;
    rotatedIndices.push(idx);
    rotatedRaw.push(rawOffsets[idx] + (wrapped ? 360 : 0));
  }

  const spread = [rotatedRaw[0]];
  for (let k = 1; k < n; k++) {
    spread.push(Math.max(rotatedRaw[k], spread[k - 1] + MIN_PLANET_GAP_DEG));
  }

  const result = new Array<number>(n);
  for (let k = 0; k < n; k++) result[rotatedIndices[k]] = normalize360(spread[k]);
  return result;
}

export function renderChartWheelSvg(chart: NatalChart): string {
  if (chart.cusps.length !== 12 || !Number.isFinite(chart.ascendant.longitude)) return '';
  const ascLon = chart.ascendant.longitude;

  const wedges = chart.cusps.map((cuspLon, i) => {
    const offset = offsetFromAsc(cuspLon, ascLon);
    const signIndex = Math.floor(normalize360(cuspLon) / 30) % 12;
    return { offset, signIndex, houseNumber: i + 1 };
  });

  const spokes = wedges
    .map((w) => line(w.offset, R_INNER_HOLE, R_OUTER, '#d9d2c2', 1))
    .join('');

  const signGlyphs = wedges
    .map((w) => {
      const p = screenPoint(w.offset + 15, R_SIGN_GLYPH);
      return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-family="'Noto Sans Symbols', sans-serif" font-size="15" fill="#a5822f">${SIGN_SYMBOLS[w.signIndex]}</text>`;
    })
    .join('');

  const houseNumbers = wedges
    .map((w) => {
      const p = screenPoint(w.offset + 15, R_HOUSE_NUM);
      return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="9" fill="#999">${w.houseNumber}</text>`;
    })
    .join('');

  const axisLine = (angleOffset: number, angle: Angle) =>
    line(angleOffset, 0, R_OUTER, ANGLE_COLOR[angle], 1.5) +
    (() => {
      const p = screenPoint(angleOffset, R_OUTER + 14);
      return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="10" font-weight="700" fill="${ANGLE_COLOR[angle]}">${angle}</text>`;
    })();

  let axes = axisLine(0, 'AC') + axisLine(180, 'DC');
  if (chart.midheaven.longitude != null) {
    const mcOffset = offsetFromAsc(chart.midheaven.longitude, ascLon);
    axes += axisLine(mcOffset, 'MC') + axisLine(normalize360(mcOffset + 180), 'IC');
  }

  const rawOffsets = chart.planets.map((p) => offsetFromAsc(p.longitude, ascLon));
  const displayOffsets = spreadOffsets(rawOffsets);

  const planets = chart.planets
    .map((p: NatalChart['planets'][number], i: number) => {
      const trueOffset = rawOffsets[i];
      const displayOffset = displayOffsets[i];
      const color = PLANET_COLOR[p.planet as Planet] ?? '#666';
      const tick = line(trueOffset, R_TICK_INNER, R_TICK_OUTER, color, 1.5);
      const dot = screenPoint(displayOffset, R_PLANETS);
      const glyph = `<circle cx="${dot.x.toFixed(1)}" cy="${dot.y.toFixed(1)}" r="11" fill="#fff" stroke="${color}" stroke-width="1.5" />
        <text x="${dot.x.toFixed(1)}" y="${dot.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="8" font-weight="700" fill="${color}">${PLANET_ABBR[p.planet as Planet] ?? p.planet.slice(0, 2).toUpperCase()}</text>`;
      return tick + glyph;
    })
    .join('');

  return `
  <svg viewBox="0 0 640 640" style="width:100%;max-width:420px;display:block;margin:0 auto;">
    <circle cx="${CX}" cy="${CY}" r="${R_OUTER}" fill="none" stroke="#cba135" stroke-width="1.5" />
    <circle cx="${CX}" cy="${CY}" r="${R_ZODIAC_INNER}" fill="none" stroke="#e5ded0" stroke-width="1" />
    <circle cx="${CX}" cy="${CY}" r="${R_INNER_HOLE}" fill="none" stroke="#e5ded0" stroke-width="1" />
    ${spokes}
    ${signGlyphs}
    ${houseNumbers}
    ${axes}
    ${planets}
  </svg>`;
}
