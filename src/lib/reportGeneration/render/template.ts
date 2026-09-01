/**
 * Relocation report — HTML template.
 *
 * Renders a ReportContent object into a single self-contained HTML document
 * styled to match The Lunar Playground's established relocation-report brand
 * (originally hand-built for manual Fiverr fulfillment, reverse-engineered
 * from two real client reports — see scripts/relocation-report/'s git
 * history). Promoted here unchanged as the production renderer; the
 * automated pipeline's assemble.ts builds the ReportContent this consumes
 * from grounded facts + LLM-generated prose instead of hand-authored copy.
 * pdf.ts prints this to PDF via Puppeteer.
 */
import { renderChartWheelSvg } from './chartWheel';
import { renderWorldMapSvg } from './worldMap';

export type Angle = 'MC' | 'IC' | 'AC' | 'DC';
export type Planet =
  | 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars'
  | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';

export const PLANET_ABBR: Record<Planet, string> = {
  Sun: 'SU', Moon: 'MO', Mercury: 'ME', Venus: 'VE', Mars: 'MA',
  Jupiter: 'JU', Saturn: 'SA', Uranus: 'UR', Neptune: 'NE', Pluto: 'PL',
};

export const PLANET_COLOR: Record<Planet, string> = {
  Sun: '#B08D3E',
  Moon: '#8CA0B3',
  Mercury: '#5B8A6B',
  Venus: '#A85D74',
  Mars: '#8B3A3A',
  Jupiter: '#3B4C7A',
  Saturn: '#6B7280',
  Uranus: '#4A8B8B',
  Neptune: '#453B7C',
  Pluto: '#6B3F73',
};

/** Classical astrological glyphs (Unicode, not emoji) — the same symbols astrology software renders on any real chart, matching chartWheel.ts's sign glyphs. */
export const PLANET_SYMBOL: Record<Planet, string> = {
  Sun: '☉', Moon: '☽', Mercury: '☿', Venus: '♀', Mars: '♂',
  Jupiter: '♃', Saturn: '♄', Uranus: '♅', Neptune: '♆', Pluto: '♇',
};

/** Keyed by SIGNS (reportFacts/vocabulary.ts) — same order/glyphs as chartWheel.ts's SIGN_SYMBOLS. */
// The zodiac symbols (unlike the planet symbols above) are registered Unicode
// emoji — without the U+FE0E text-presentation selector they render as
// colorful emoji glyphs on emoji-capable fonts instead of plain typographic
// marks, which is exactly what this is trying to avoid.
const VS15 = '︎';
export const SIGN_SYMBOL: Record<string, string> = {
  Aries: `♈${VS15}`, Taurus: `♉${VS15}`, Gemini: `♊${VS15}`, Cancer: `♋${VS15}`,
  Leo: `♌${VS15}`, Virgo: `♍${VS15}`, Libra: `♎${VS15}`, Scorpio: `♏${VS15}`,
  Sagittarius: `♐${VS15}`, Capricorn: `♑${VS15}`, Aquarius: `♒${VS15}`, Pisces: `♓${VS15}`,
};

export const ANGLE_COLOR: Record<Angle, string> = {
  MC: '#1A1A2E',
  IC: '#4A3B5C',
  AC: '#B99567',
  DC: '#6E7A4E',
};

export const ANGLE_LABEL: Record<Angle, string> = {
  MC: 'Midheaven',
  IC: 'Imum Coeli',
  AC: 'Ascendant',
  DC: 'Descendant',
};

export interface Badge { planet: Planet; angle: Angle }

export interface PlacementBlock {
  planet: Planet;
  angle: Angle;
  header: string; // e.g. "JUPITER ON MIDHEAVEN — CAREER EXPANSION & LUCK"
  body: string;
  whatToDo: string;
}

export interface SofterInfluence {
  planet: Planet;
  angle: Angle;
  miles: number;
  note: string;
}

export interface CitySection {
  name: string;
  country: string;
  nickname: string;
  tagline: string;
  badges: Badge[];
  intro: string;
  placements: PlacementBlock[];
  softerInfluences?: SofterInfluence[];
  forRomance?: string;
  forCareer?: string;
  combinedEnergy: string[];
  bottomLine: string;
  practicalNote?: { label: string; text: string };
}

export interface SummaryCity {
  name: string;
  country: string;
  lat: number;
  lon: number;
  badges: Badge[];
  nickname: string;
  paragraph: string;
}

/** One highlight card for the "Your Strongest Themes" page — built deterministically in assemble.ts from each city's nearest (strongest) activation and its already-grounded bottomLine, never a fresh LLM call. */
export interface ThemeHighlight {
  city: string;
  country: string;
  planet: Planet;
  angle: Angle;
  headline: string;
  blurb: string;
}

export interface NatalPlanetRow {
  planet: Planet;
  sign: string;
  degree: string; // e.g. "20°52'"
  longitude: number; // raw ecliptic longitude, 0-360 — needed to place this planet on the chart wheel
  house: number;
  description?: string; // omitted for outer planets with no tested per-sign copy
}

export interface BigThreeCard {
  label: 'Sun' | 'Moon' | 'Rising';
  sign: string;
  degree: string;
  house?: number;
  description: string;
}

export interface NatalChart {
  intro: string;
  bigThree: BigThreeCard[];
  planets: NatalPlanetRow[];
  ascendant: { sign: string; degree: string; longitude: number };
  midheaven: { sign: string; degree: string; longitude: number | null };
  /** 12 entries, cusps[0] = house 1's starting ecliptic longitude, etc. (see houses.ts's HouseCusps) — empty when no birth location was available. Drives the chart wheel's house/zodiac spokes; renderChartWheelSvg degrades to '' if this isn't exactly 12 entries. */
  cusps: number[];
}

export interface TocEntry {
  title: string;
  page: number | null; // null until the second render pass fills it in
  indent?: boolean;
}

export interface ReportContent {
  client: string;
  monthYear: string;
  birth: { dateLabel: string; timeLabel: string; placeLabel: string };
  citiesListLabel: string;
  natalChart?: NatalChart;
  /** points is this line's full lat/lon polyline (from AstroLine), used to draw it on the world map — empty if the source line couldn't be matched (should not happen in practice, see assemble.ts's buildPlanetaryLines). */
  planetaryLines: { planet: Planet; angle: Angle; blurb: string; points: { lat: number; lon: number }[] }[];
  cities: CitySection[];
  summaryCities: SummaryCity[];
  themeHighlights: ThemeHighlight[];
  toc?: TocEntry[]; // omitted on the first (measurement) render pass
  closingMessage: string;
  /** First-person "If I were you..." editorial synthesis — interpretive, not a fact claim, so it deliberately skips checkGrounding (see generateSection's skipGrounding option). Undefined if generation failed or was skipped (natal-only tier). */
  closingReflection?: string;
}

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function badgePair(planet: Planet, angle: Angle): string {
  return `<span class="badge-pair">
    <span class="badge badge-planet" style="background:${PLANET_COLOR[planet]}">${PLANET_ABBR[planet]}</span
    ><span class="badge badge-angle" style="background:${ANGLE_COLOR[angle]}">${angle}</span>
  </span>`;
}

function badgeRow(badges: Badge[]): string {
  return `<div class="badge-row">${badges.map((b) => `<span class="badge-item">${badgePair(b.planet, b.angle)} <span class="badge-name">${b.planet} ${b.angle}</span></span>`).join('')}</div>`;
}

function dot(planet: Planet, faded = false): string {
  return `<span class="dot" style="background:${PLANET_COLOR[planet]}${faded ? ';opacity:.35' : ''}"></span>`;
}

/**
 * Jupiter's Unicode glyph (U+2643) renders as a mis-shapen, wrong-looking
 * character in this pipeline — verified broken across multiple fonts (Apple
 * Symbols, Google-hosted Noto Sans Symbols 2) and both plain-text and SVG
 * text rendering, and confirmed baked into the rasterized PDF output, not
 * just a preview artifact. Every other planet/sign glyph renders correctly.
 * Falls back to the same two-letter monogram already used in this
 * document's badges rather than shipping a broken character.
 */
function planetGlyph(planet: Planet): string {
  const color = PLANET_COLOR[planet];
  if (planet === 'Jupiter') {
    return `<span class="glyph glyph-abbr" style="color:${color}">${PLANET_ABBR[planet]}</span>`;
  }
  return `<span class="glyph" style="color:${color}">${PLANET_SYMBOL[planet]}</span>`;
}

function paragraphs(text: string): string {
  return text
    .split(/\n\n+/)
    .map((p) => `<p>${p.trim()}</p>`)
    .join('\n');
}

function renderPlacement(p: PlacementBlock): string {
  return `
  <div class="placement-box" style="border-left-color:${PLANET_COLOR[p.planet]}">
    <h3><span class="placement-badge">${badgePair(p.planet, p.angle)}</span> ${esc(p.header)} <span class="angle-tag">${p.angle}</span></h3>
    <p>${esc(p.body)}</p>
    <div class="what-to-do">
      <div class="what-to-do-label">What to do here</div>
      <p>${esc(p.whatToDo)}</p>
    </div>
  </div>`;
}

function renderCity(city: CitySection): string {
  const softer = city.softerInfluences?.length
    ? `
    <div class="softer-influences">
      <div class="softer-label">Softer influences</div>
      <p class="softer-intro">${city.softerInfluences.length === 1 ? 'One planetary line passes' : 'These planetary lines pass'} through the wider field of this city, present at a softer register than a defining force.</p>
      ${city.softerInfluences
        .map(
          (s) => `<p class="softer-line">${badgePair(s.planet, s.angle)} <strong>${s.planet} ${s.angle}</strong> (${s.miles} miles away) — ${esc(s.note)}</p>`
        )
        .join('')}
    </div>`
    : '';

  const romanceCareer = `
    <div class="rc-row">
      ${city.forRomance ? `<div class="rc-box rc-romance"><div class="rc-label">For romance</div><p>${esc(city.forRomance)}</p></div>` : ''}
      ${city.forCareer ? `<div class="rc-box rc-career"><div class="rc-label">For career</div><p>${esc(city.forCareer)}</p></div>` : ''}
    </div>`;

  return `
  <section class="city-section page-break">
    <h2 class="city-name">${esc(city.name)}, ${esc(city.country)}</h2>
    <p class="city-nickname">${esc(city.nickname)}</p>
    ${badgeRow(city.badges)}
    <p class="city-intro">${esc(city.intro)}</p>

    ${city.placements.map(renderPlacement).join('\n')}
    ${softer}
    ${city.forRomance || city.forCareer ? romanceCareer : ''}

    <div class="combined-energy">
      <div class="combined-label">Combined energy</div>
      ${city.combinedEnergy.map((p) => `<p>${esc(p)}</p>`).join('\n')}
    </div>

    <div class="bottom-line">
      <strong>The bottom line:</strong> <em>${esc(city.bottomLine)}</em>
    </div>

    ${city.practicalNote ? `<div class="practical-note"><div class="practical-note-label">${esc(city.practicalNote.label)}</div><p>${esc(city.practicalNote.text)}</p></div>` : ''}
  </section>`;
}

function renderLinesTable(cities: SummaryCity[]): string {
  const allBadges: Badge[] = [];
  const seen = new Set<string>();
  for (const c of cities) {
    for (const b of c.badges) {
      const key = `${b.planet}_${b.angle}`;
      if (!seen.has(key)) {
        seen.add(key);
        allBadges.push(b);
      }
    }
  }

  return `
  <table class="lines-table">
    <thead>
      <tr>
        <th class="loc-col">Location</th>
        ${allBadges.map((b) => `<th>${badgePair(b.planet, b.angle)}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${cities
        .map(
          (c) => `<tr>
        <td class="loc-col">${esc(c.name)}</td>
        ${allBadges
          .map((b) => {
            const has = c.badges.some((x) => x.planet === b.planet && x.angle === b.angle);
            return `<td>${has ? dot(b.planet) : ''}</td>`;
          })
          .join('')}
      </tr>`
        )
        .join('')}
    </tbody>
  </table>`;
}

/**
 * Part One — Big Three cards, the full sign/degree/house data table, and
 * the Ascendant/Midheaven cards. Exported on its own so natalTemplate.ts
 * can place its own new domain sections between this and
 * `renderChartShowsCards` below (their relative order isn't fixed for
 * every consumer the way it is for the relocation/combined report).
 */
export function renderBirthChartOverview(chart: NatalChart): string {
  return `
<main class="page page-break">
  <p class="part-eyebrow">Part One — Your Birth Chart</p>
  <h2 class="section-title">Your Birth Chart</h2>
  <p class="city-intro">${esc(chart.intro)}</p>

  <div class="chart-wheel-wrap">${renderChartWheelSvg(chart)}</div>

  <div class="big-three-row">
    ${chart.bigThree
      .map(
        (b) => `<div class="big-three-card">
        <div class="big-three-label">${esc(b.label)}</div>
        <div class="big-three-sign"><span class="glyph">${SIGN_SYMBOL[b.sign] ?? ''}</span>${esc(b.sign)}</div>
        <div class="big-three-degree">${esc(b.degree)}${b.house ? ` &middot; House ${b.house}` : ''}</div>
        <p>${esc(b.description)}</p>
      </div>`
      )
      .join('')}
  </div>

  <table class="natal-table">
    <thead>
      <tr><th>Planet</th><th>Sign</th><th>Degree</th><th>House</th></tr>
    </thead>
    <tbody>
      ${chart.planets
        .map(
          (p) => `<tr>
        <td class="natal-planet">${planetGlyph(p.planet)}${esc(p.planet)}</td>
        <td><span class="glyph glyph-muted">${SIGN_SYMBOL[p.sign] ?? ''}</span>${esc(p.sign)}</td>
        <td>${esc(p.degree)}</td>
        <td>${p.house}</td>
      </tr>`
        )
        .join('')}
    </tbody>
  </table>

  <div class="angles-row">
    <div class="angle-card"><div class="angle-card-label">Ascendant</div><div class="angle-card-value"><span class="glyph">${SIGN_SYMBOL[chart.ascendant.sign] ?? ''}</span>${esc(chart.ascendant.sign)} ${esc(chart.ascendant.degree)}</div></div>
    <div class="angle-card"><div class="angle-card-label">Midheaven</div><div class="angle-card-value"><span class="glyph">${SIGN_SYMBOL[chart.midheaven.sign] ?? ''}</span>${esc(chart.midheaven.sign)} ${esc(chart.midheaven.degree)}</div></div>
  </div>
</main>`;
}

/**
 * "What Your Chart Shows" — one card per planet that has a `description`
 * (`NatalPlanetRow.description` is optional precisely so a consumer can
 * omit planets covered elsewhere; natal-only's assemble.ts only populates
 * this for Uranus/Neptune/Pluto, since the six personal planets get their
 * own domain sections instead — see the natal-chart-automation plan).
 */
export function renderChartShowsCards(chart: NatalChart): string {
  return `
<main class="page">
  <h2 class="section-title">What Your Chart Shows</h2>
  ${chart.planets
    .filter((p) => p.description)
    .map(
      (p) => `<div class="placement-box" style="border-left-color:${PLANET_COLOR[p.planet]}">
      <h3>${planetGlyph(p.planet)}${esc(p.planet)} in ${esc(p.sign)} <span class="angle-tag">House ${p.house}</span></h3>
      <p>${esc(p.description!)}</p>
    </div>`
    )
    .join('\n')}
</main>`;
}

/** Explicitly promises astrocartography content follows — relocation/combined tier only. */
export function renderChartTravelsBridge(): string {
  return `
<main class="page page-break bridge-section">
  <h2 class="section-title">How Your Chart Travels</h2>
  <p>Your birth chart is anchored to one place and one moment: the exact time and location given at the front of this report. It describes who you are wherever you go, your Sun, Moon, and every planet above stay exactly where they are in your chart no matter where you're standing.</p>
  <p>Astrocartography works with those same planets, but asks a different question: at the moment you were born, where else on Earth would each one have been rising, setting, culminating overhead, or at its lowest point? Wherever one of those lines crosses is a place where that planet's themes become more active and more visible, not because you become a different person there, but because that placement gets called forward by the location itself.</p>
  <p>The pages so far told you what each planet means for you, personally, wherever you are. The pages that follow tell you where in the world those same meanings get amplified.</p>
</main>`;
}

/**
 * `includeBridge` renders "How Your Chart Travels" — true for the
 * relocation/combined-tier document this was built for, wrong for a
 * standalone natal-only reading with no relocation content. Defaults to
 * true so relocation/combined rendering is unchanged. Composes the three
 * pieces above in the relocation report's fixed order; natalTemplate.ts
 * calls the pieces directly instead, since it needs a different order.
 */
export function renderNatalChart(chart: NatalChart, options: { includeBridge?: boolean } = {}): string {
  const { includeBridge = true } = options;
  return `
${renderBirthChartOverview(chart)}

${renderChartShowsCards(chart)}

${includeBridge ? renderChartTravelsBridge() : ''}
`;
}

/**
 * Titles used both as ToC entries and as the exact search strings render.ts
 * looks for (via pdftotext) to find each section's real page number after a
 * first measurement pass. Keep these identical to the actual heading text
 * rendered elsewhere in this file, or the page lookup will silently miss.
 */
export function buildTocEntries(content: ReportContent): TocEntry[] {
  const entries: TocEntry[] = [{ title: 'Introduction', page: null }];

  if (content.themeHighlights.length > 0) {
    entries.push({ title: 'Your Strongest Themes', page: null });
  }

  if (content.natalChart) {
    entries.push({ title: 'Your Birth Chart', page: null });
    entries.push({ title: 'What Your Chart Shows', page: null, indent: true });
    entries.push({ title: 'How Your Chart Travels', page: null });
  }

  entries.push({ title: 'What is Astrocartography?', page: null });
  entries.push({ title: 'The Planetary Lines in Your Reading', page: null, indent: true });
  entries.push({ title: 'Lines at Each Location', page: null, indent: true });
  entries.push({ title: 'Your Cities on the Map', page: null, indent: true });

  for (const city of content.cities) {
    entries.push({ title: `${city.name}, ${city.country}`, page: null, indent: true });
  }

  entries.push({ title: 'Summary', page: null });

  return entries;
}

function renderTocPage(toc: TocEntry[]): string {
  return `
<main class="page toc-section">
  <h2 class="section-title">Contents</h2>
  <div class="toc-list">
    ${toc
      .map(
        (e) => `<div class="toc-row ${e.indent ? 'toc-indent' : ''}">
      <span class="toc-title">${esc(e.title)}</span>
      <span class="toc-dots"></span>
      <span class="toc-pagenum">${e.page != null ? e.page : ''}</span>
    </div>`
      )
      .join('')}
  </div>
</main>`;
}

function renderSummaryCity(c: SummaryCity): string {
  return `
  <div class="summary-city">
    <div class="summary-head">
      <strong>${esc(c.name)}, ${esc(c.country)}</strong>
      ${badgeRow(c.badges)}
    </div>
    <p class="summary-nickname">${esc(c.nickname)}</p>
    <p>${esc(c.paragraph)}</p>
  </div>`;
}

function renderThemeHighlight(h: ThemeHighlight): string {
  return `
  <div class="big-three-card theme-highlight-card">
    <div class="big-three-label">${esc(h.city)}, ${esc(h.country)}</div>
    <div class="theme-highlight-headline">${badgePair(h.planet, h.angle)} ${esc(h.headline)}</div>
    <p>${esc(h.blurb)}</p>
  </div>`;
}

function renderThemeHighlights(highlights: ThemeHighlight[]): string {
  return `
<main class="page page-break">
  <h2 class="section-title">Your Strongest Themes</h2>
  <p class="city-intro">At a glance, before the full breakdown: the single strongest planetary line in each location you're considering.</p>
  <div class="big-three-row theme-highlight-row">
    ${highlights.map(renderThemeHighlight).join('')}
  </div>
</main>`;
}

export function renderReportHtml(content: ReportContent): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Relocation Report | The Lunar Playground</title>
<style>
${CSS}
</style>
</head>
<body>

<div class="cover-page">
  <div class="cover-blob blob-1"></div>
  <div class="cover-blob blob-2"></div>
  <div class="cover-blob blob-3"></div>
  <div class="cover-blob blob-4"></div>
  <div class="cover-noise"></div>
  <div class="cover-inner">
    <div class="cover-rule"></div>
    <img class="cover-logo" src="LOGO_SRC" alt="">
    <h1 class="cover-title">RELOCATION<br>REPORT</h1>
    <p class="cover-month">${esc(content.monthYear)}</p>
    <p class="cover-for">PREPARED FOR ${esc(content.client).toUpperCase()}</p>
    <p class="cover-url">WWW.THELUNARPLAYGROUND.COM</p>
  </div>
</div>

${content.toc ? renderTocPage(content.toc) : ''}

<main class="page page-break">
  <h2 class="section-title">Introduction</h2>
  <p class="intro-lead">Thank you for your request and welcome to <em>The Lunar Playground</em>. This reading explores the energetic influences of different locations using astrocartography, the art of mapping your birth chart onto the world to discover where specific planetary energies are strongest for you.</p>
  <p>Astrocartography reveals that we don't experience life the same way everywhere. Certain places amplify our capacity for love, others catalyze career success, and some invite deep transformation. By understanding which planetary lines cross through the locations you're considering, you can make more aligned choices about where to live, travel, or invest your energy.</p>
  <p>Your placements are calculated using Swiss Ephemeris, the same tool professional astrologers rely on, with every line checked against your real chart before it reaches you. Here's what's running through your areas of interest: <strong>${esc(content.citiesListLabel)}</strong>. Each location carries distinct energies that will shape your experience differently.</p>

  <div class="client-info">
    <p><strong>Client:</strong> ${esc(content.client)}</p>
    <p><strong>Date of Birth:</strong> ${esc(content.birth.dateLabel)}</p>
    <p><strong>Time:</strong> ${esc(content.birth.timeLabel)}</p>
    <p><strong>Place of Birth:</strong> ${esc(content.birth.placeLabel)}</p>
    <p><strong>Locations Analyzed:</strong> ${esc(content.citiesListLabel)}</p>
  </div>
</main>

${content.themeHighlights.length > 0 ? renderThemeHighlights(content.themeHighlights) : ''}

${content.natalChart ? renderNatalChart(content.natalChart) : ''}

<main class="page page-break">
  <p class="part-eyebrow">Part Two — Astrocartography</p>
  <h2 class="section-title">What is Astrocartography?</h2>
  <p>Your birth chart, on the previous pages, captures the positions of the planets at the exact moment you were born, as seen from ${esc(content.birth.placeLabel)}. But if you had been born at that same moment in a different location, those planets would have appeared in different positions relative to you.</p>
  <p>Astrocartography maps those differences across the globe. It shows where each planet was rising, setting, or at its peak at your birth moment. When you visit or live near one of these lines, that planet's themes become more active in your life. The four angles below are the same Ascendant, Descendant, Midheaven, and IC from your birth chart, just traced as lines across the world instead of fixed points at one location.</p>

  <div class="glossary-box">
    <div class="glossary-title">Quick reference: the four angles</div>
    <p><strong>AC (Ascendant)</strong> — The eastern horizon. Planets here affect how you present yourself and how others first perceive you.</p>
    <p><strong>DC (Descendant)</strong> — The western horizon. Planets here influence partnerships, relationships, and one-on-one connections.</p>
    <p><strong>MC (Midheaven)</strong> — The highest point in the sky. Planets here shape your public image, career, and visibility.</p>
    <p><strong>IC (Imum Coeli)</strong> — The lowest point. Planets here affect your inner world, home life, and private self.</p>
  </div>
</main>

<main class="page page-break">
  <h2 class="section-title">The Planetary Lines in Your Reading</h2>
  ${content.planetaryLines
    .map(
      (l) => `<p class="pl-line">${badgePair(l.planet, l.angle)} <strong>${l.planet} ${l.angle}</strong> <span class="pl-angle-label">(${ANGLE_LABEL[l.angle]})</span><br><span class="pl-blurb">${esc(l.blurb)}</span></p>`
    )
    .join('')}

  <h2 class="section-title" style="margin-top:36px">Lines at Each Location</h2>
  ${renderLinesTable(content.summaryCities)}
</main>

<main class="page page-break">
  <h2 class="section-title">Your Cities on the Map</h2>
  <p class="city-intro">Where each location sits, and the planetary lines running through it. Each tag on the map shows the line's symbol and angle — see below for what each one means.</p>
  ${renderWorldMapSvg(content.summaryCities, content.planetaryLines)}
  <div class="map-legend">
    ${badgeRow(content.planetaryLines)}
  </div>
</main>

${content.cities.map((c) => renderCity(c)).join('\n')}

<main class="page page-break">
  <h2 class="section-title">Summary</h2>
  ${content.summaryCities.map(renderSummaryCity).join('\n')}
  <p class="closing-italic">Let the astrology inform you. Let your instincts decide.</p>
  <p>These are favourable conditions, not guarantees. The planetary lines open doors; walking through them is up to you.</p>

  <div class="deeper-box">
    <div class="deeper-label">Want to go deeper?</div>
    <p>A <strong>Relocation Chart Reading</strong> examines how your entire birth chart reshapes when cast for a specific location, revealing which houses your planets occupy, how your angles shift, and what themes become most active in your daily life there. If you're seriously considering a move, this deeper analysis can illuminate the full picture.</p>
  </div>
</main>

<main class="page page-break closing-page">
  ${content.closingReflection ? `
  <div class="if-i-were-you">
    <div class="if-i-were-you-label">If I were you...</div>
    <p>${esc(content.closingReflection)}</p>
  </div>` : ''}
  <p class="closing-message">${esc(content.closingMessage)}</p>
  <p class="signature-text">With warmth and cosmic guidance,</p>
  <p class="signature-name">Ashleigh @ The Lunar Playground</p>

  <hr class="about-rule">

  <div class="about-box">
    <div class="about-label">About The Lunar Playground</div>
    <p>I'm Ashleigh, an intuitive astrologer drawn to the spaces where energy, place, and purpose meet. My path has been shaped by years of meditation, a deep love of psychology, and a lifelong curiosity about how the stars mirror our inner world. Astrology, for me, isn't about prediction. It's about remembering who we are. Through birth chart and astrocartography readings, I help you tune into the places and patterns that bring you back to yourself. My work is rooted in mindfulness, compassion, and the quiet magic that unfolds when we align with our own rhythm.</p>
  </div>
</main>

<div class="promo-page">
  <div class="cover-blob blob-1"></div>
  <div class="cover-blob blob-2"></div>
  <div class="cover-blob blob-3"></div>
  <div class="promo-card">
    <img class="promo-logo" src="LOGO_SRC" alt="">
    <h2 class="promo-title">Ready for your next reading?</h2>
    <div class="promo-code">LUNAR20</div>
    <p class="promo-sub">20% off your next reading</p>
    <p class="promo-url">www.thelunarplayground.com</p>
    <p class="promo-share">Share this code with friends — they'll get 20% off too.</p>
  </div>
</div>

</body>
</html>`;
}

export const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Symbols+2&display=swap');

:root {
  --ink: #1a1a2e;
  --gold: #b98f3c;
  --gold-deep: #a5822f;
  --gold-tint: #f4efe4;
  --cream: #f8f5ef;
  --rose: #A85D74;
  --plum: #5b4b6b;
  --hairline: #e7e0d2;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: 'Inter', -apple-system, sans-serif;
  font-size: 11pt;
  line-height: 1.7;
  color: #2c2b30;
  background: #fff;
}

em, i { font-style: italic; }

h1, h2, h3 { font-family: 'Playfair Display', Georgia, serif; }

/* Editorial lead paragraph — drop cap on the Introduction's opening line, a
   print-native device instead of one more tinted card. */
.intro-lead::first-letter {
  font-family: 'Playfair Display', serif;
  font-size: 42pt;
  font-weight: 500;
  color: var(--gold-deep);
  float: left;
  line-height: 0.8;
  padding: 6px 8px 0 0;
}

/* ---------- Cover ---------- */
.cover-page, .promo-page {
  position: relative;
  width: 100%;
  min-height: 297mm;
  background: #101820;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  page-break-before: always;
  break-before: page;
  page-break-inside: avoid;
  break-inside: avoid;
}
.cover-page { page-break-before: avoid; break-before: avoid; }
.cover-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.55;
}
.blob-1 { width: 480px; height: 480px; background: #3a6b8f; top: -120px; left: -100px; }
.blob-2 { width: 420px; height: 420px; background: #7a5a72; top: 20%; right: -140px; }
.blob-3 { width: 460px; height: 460px; background: #c98a5e; bottom: -140px; left: 10%; }
.blob-4 { width: 320px; height: 320px; background: #4f7a52; bottom: 10%; right: 5%; opacity: 0.35; }
.cover-noise {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.03), transparent 60%);
}
.cover-inner {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fdfaf4;
  padding: 60px;
}
.cover-rule {
  width: 260px;
  height: 1px;
  background: rgba(253,250,244,0.35);
  margin: 0 auto 48px;
}
.cover-logo { width: 70px; height: auto; filter: brightness(0) invert(1); margin-bottom: 28px; opacity: 0.92; }
.cover-title {
  font-size: 40pt;
  font-weight: 500;
  letter-spacing: 4px;
  line-height: 1.25;
  margin-bottom: 22px;
}
.cover-month {
  font-family: 'Inter', sans-serif;
  font-size: 10pt;
  font-weight: 600;
  letter-spacing: 3px;
  color: #d8b978;
  margin-bottom: 14px;
}
.cover-for {
  font-family: 'Inter', sans-serif;
  font-size: 9pt;
  letter-spacing: 2.5px;
  color: rgba(253,250,244,0.75);
  margin-bottom: 120px;
}
.cover-url {
  font-family: 'Inter', sans-serif;
  font-size: 8pt;
  letter-spacing: 2px;
  color: rgba(253,250,244,0.55);
}

/* ---------- Content pages ---------- */
.page { padding: 6mm 2mm; }
.page-break { page-break-before: always; }

.section-title {
  font-size: 19pt;
  font-weight: 500;
  color: var(--ink);
  padding-bottom: 10px;
  border-bottom: 1px solid var(--gold);
  margin-bottom: 20px;
}

.part-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 8.5pt;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 6px;
}

.bridge-section { padding-top: 20mm; }
.bridge-section p { font-size: 11.5pt; color: #333; }

/* table of contents */
.toc-list { margin-top: 24px; }
.toc-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 7px 0;
  border-bottom: 1px solid #f0ece2;
}
.toc-row.toc-indent { padding-left: 22px; }
.toc-title {
  font-family: 'Playfair Display', serif;
  font-size: 11.5pt;
  color: #2c2b30;
  white-space: nowrap;
}
.toc-row.toc-indent .toc-title { font-family: 'Inter', sans-serif; font-size: 10.5pt; color: #555; }
.toc-dots {
  flex: 1;
  border-bottom: 1px dotted #c9bfa8;
  margin-bottom: 4px;
}
.toc-pagenum {
  font-family: 'Inter', sans-serif;
  font-size: 10pt;
  color: var(--gold-deep);
  font-weight: 600;
  min-width: 1.5em;
  text-align: right;
}

p { margin-bottom: 14px; }

.client-info {
  background: var(--cream);
  border-left: 3px solid var(--gold);
  padding: 20px 26px;
  margin-top: 28px;
  page-break-inside: avoid;
  break-inside: avoid;
}
.client-info p { margin: 5px 0; font-size: 10.5pt; }

.glossary-box {
  background: var(--cream);
  border: 1px solid var(--hairline);
  padding: 20px 26px;
  margin-top: 22px;
  page-break-inside: avoid;
  break-inside: avoid;
}
.glossary-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 9pt;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--ink);
  margin-bottom: 12px;
}
.glossary-box p { font-size: 10.5pt; margin-bottom: 8px; }
.glossary-box strong { color: var(--gold-deep); }

/* badges */
.badge-pair { display: inline-flex; vertical-align: middle; margin-right: 4px; }
.badge {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 7.5pt;
  color: #fff;
  padding: 2px 5px;
  letter-spacing: 0.3px;
}
.badge-planet { border-radius: 3px 0 0 3px; }
.badge-angle { border-radius: 0 3px 3px 0; }
.badge-row { margin: 14px 0 18px; }
.badge-item { display: inline-flex; align-items: center; gap: 5px; margin-right: 16px; margin-bottom: 6px; font-size: 9.5pt; color: #555; }
.badge-name { font-weight: 500; }
.dot { display: inline-block; width: 9px; height: 9px; border-radius: 50%; }

/* Classical planet/sign glyphs — real astrological typography, not emoji. */
.glyph { font-family: 'Noto Sans Symbols 2', 'Apple Symbols', 'Segoe UI Symbol', 'Playfair Display', serif; font-size: 1.15em; margin-right: 7px; display: inline-block; }
.glyph-muted { opacity: 0.55; font-size: 1.05em; }
.glyph-abbr { font-family: 'Inter', sans-serif; font-size: 0.6em; font-weight: 700; letter-spacing: 0.3px; margin-right: 8px; }

/* planetary lines list */
.pl-line { font-size: 10.5pt; margin-bottom: 16px; }
.pl-angle-label { color: #888; font-size: 9.5pt; }
.pl-blurb { color: #555; }

/* lines table */
.lines-table { width: 100%; border-collapse: collapse; margin-top: 18px; font-size: 8.5pt; }
.lines-table th {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  background: var(--cream);
  border-bottom: 2px solid var(--gold);
  padding: 8px 4px;
  text-align: center;
}
.lines-table th.loc-col, .lines-table td.loc-col { text-align: left; font-weight: 600; color: var(--ink); padding-left: 8px; }
.lines-table td { border-bottom: 1px solid #eee; padding: 8px 4px; text-align: center; }

/* city sections */
.city-section { padding: 6mm 2mm; }
.city-name { font-size: 22pt; font-weight: 500; color: var(--ink); margin-bottom: 2px; }
.city-nickname { font-family: 'Playfair Display', serif; font-style: italic; font-size: 13pt; color: var(--gold); margin-bottom: 4px; }
.city-intro { font-size: 11.5pt; color: #333; margin: 16px 0 22px; }

.placement-box {
  border-left: 3px solid #ccc;
  background: var(--cream);
  padding: 16px 20px;
  margin-bottom: 16px;
  page-break-inside: avoid;
  break-inside: avoid;
}
.placement-box h3 {
  font-family: 'Inter', sans-serif;
  font-size: 10.5pt;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: var(--ink);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
}
.placement-badge { display: inline-flex; }
.angle-tag { margin-left: auto; font-size: 8pt; color: #999; font-weight: 500; text-transform: none; }
.placement-box p { font-size: 10.3pt; color: #333; margin-bottom: 10px; }

.what-to-do {
  background: var(--gold-tint);
  border-left: 2px solid var(--gold);
  padding: 10px 14px;
  margin-top: 8px;
}
.what-to-do-label { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--gold-deep); margin-bottom: 4px; }
.what-to-do p { margin: 0; font-size: 9.8pt; color: #4a4a4a; }

/* Softer influences, the "what to do" recap, and combined energy read as
   quiet asides rather than more tinted cards — a hairline rule and room to
   breathe instead of another box, so the placement boxes above keep their
   visual weight instead of competing with lookalike siblings. */
.softer-influences { border-top: 1px solid var(--hairline); padding-top: 14px; margin: 22px 0; page-break-inside: avoid; break-inside: avoid; }
.softer-label { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #888; margin-bottom: 6px; }
.softer-intro { font-size: 9.5pt; font-style: italic; color: #777; margin-bottom: 8px; }
.softer-line { font-size: 9.8pt; margin-bottom: 6px; }

.rc-row { display: flex; gap: 28px; margin: 22px 0; padding-top: 14px; border-top: 1px solid var(--hairline); page-break-inside: avoid; break-inside: avoid; }
.rc-box { flex: 1; padding-left: 14px; }
.rc-romance { border-left: 2px solid var(--rose); }
.rc-career { border-left: 2px solid var(--gold); }
.rc-label { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--ink); margin-bottom: 6px; }
.rc-box p { font-size: 9.8pt; margin: 0; color: #444; }

.combined-energy { margin: 22px 0; padding-top: 14px; border-top: 1px solid var(--hairline); page-break-inside: avoid; break-inside: avoid; }
.combined-label { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--ink); margin-bottom: 8px; }
.combined-energy p { font-size: 9.8pt; color: #444; margin-bottom: 10px; }
.combined-energy p:last-child { margin-bottom: 0; }

.bottom-line {
  background: var(--plum);
  color: #f4eef7;
  padding: 18px 22px;
  font-size: 10.3pt;
  line-height: 1.7;
  page-break-inside: avoid;
  break-inside: avoid;
}
.bottom-line strong { color: var(--gold); }

.practical-note { border-top: 1px solid var(--hairline); padding-top: 14px; margin-top: 20px; page-break-inside: avoid; break-inside: avoid; }
.practical-note-label { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #888; margin-bottom: 6px; }
.practical-note p { font-size: 9.8pt; font-style: italic; color: #666; margin: 0; }

/* chart wheel */
.chart-wheel-wrap { margin: 20px 0 28px; page-break-inside: avoid; break-inside: avoid; }

/* world map legend */
.map-legend { margin-top: 20px; }
.map-legend .badge-row { margin: 0; }

/* strongest themes */
.theme-highlight-row { flex-wrap: wrap; }
.theme-highlight-card { flex: 1 1 30%; min-width: 150px; }
.theme-highlight-headline { font-family: 'Inter', sans-serif; font-size: 9.5pt; font-weight: 600; color: var(--ink); margin: 4px 0 8px; display: flex; align-items: center; gap: 6px; }

/* natal chart */
.big-three-row { display: flex; gap: 14px; margin: 24px 0 30px; }
.big-three-card { flex: 1; background: var(--cream); border-top: 3px solid var(--gold); padding: 18px 18px 16px; page-break-inside: avoid; break-inside: avoid; }
.big-three-label { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-deep); margin-bottom: 6px; }
.big-three-sign { font-family: 'Playfair Display', serif; font-size: 15pt; color: var(--ink); margin-bottom: 2px; }
.big-three-degree { font-size: 8.5pt; color: #888; margin-bottom: 10px; }
.big-three-card p { font-size: 9.5pt; color: #444; margin: 0; }

.natal-table { width: 100%; border-collapse: collapse; margin: 10px 0 26px; font-size: 9.5pt; }
.natal-table th { font-family: 'Inter', sans-serif; font-weight: 700; background: var(--cream); border-bottom: 2px solid var(--gold); padding: 8px 10px; text-align: left; }
.natal-table td { border-bottom: 1px solid #eee; padding: 7px 10px; }
.natal-planet { display: flex; align-items: center; gap: 8px; font-weight: 500; }
.natal-planet .dot { width: 8px; height: 8px; }

.angles-row { display: flex; gap: 14px; margin-bottom: 26px; }
.angle-card { flex: 1; background: var(--cream); border-left: 3px solid var(--ink); padding: 12px 16px; }
.angle-card-label { font-family: 'Inter', sans-serif; font-size: 8pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: #888; margin-bottom: 4px; }
.angle-card-value { font-family: 'Playfair Display', serif; font-size: 12pt; color: var(--ink); }

/* summary */
.summary-city { background: var(--cream); border-left: 3px solid var(--gold); padding: 18px 22px; margin-bottom: 16px; page-break-inside: avoid; break-inside: avoid; }
.summary-head { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 4px; }
.summary-head strong { font-size: 12pt; color: var(--ink); }
.summary-nickname { font-family: 'Playfair Display', serif; font-style: italic; color: var(--gold); margin-bottom: 8px; font-size: 10.5pt; }
.summary-city p:last-child { margin-bottom: 0; font-size: 10pt; color: #444; }

.closing-italic { font-style: italic; color: #777; text-align: center; margin: 20px 0; }

.deeper-box { background: var(--cream); border-left: 3px solid var(--rose); padding: 18px 24px; margin-top: 26px; page-break-inside: avoid; break-inside: avoid; }
.deeper-label { font-family: 'Inter', sans-serif; font-size: 9pt; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; color: var(--rose); margin-bottom: 8px; }
.deeper-box p { font-size: 10pt; margin: 0; color: #444; }

/* if I were you — the reading's one deliberate pull-quote moment, marked
   with an oversized quotation glyph rather than another tinted card. */
.if-i-were-you { position: relative; padding: 26px 32px 22px 40px; margin: 0 auto 30px; max-width: 480px; text-align: left; page-break-inside: avoid; break-inside: avoid; }
.if-i-were-you::before {
  content: '\\201C';
  position: absolute;
  top: -6px;
  left: -4px;
  font-family: 'Playfair Display', serif;
  font-size: 64pt;
  color: var(--gold);
  opacity: 0.35;
  line-height: 1;
}
.if-i-were-you-label { font-family: 'Playfair Display', serif; font-style: italic; font-size: 13pt; color: var(--gold-deep); margin-bottom: 10px; }
.if-i-were-you p { font-family: 'Playfair Display', serif; font-style: italic; font-size: 11.5pt; color: #444; line-height: 1.8; margin: 0; }

/* closing */
.closing-page { text-align: center; padding-top: 40mm; }
.closing-message { font-family: 'Playfair Display', serif; font-style: italic; font-size: 13pt; color: #444; max-width: 480px; margin: 0 auto 26px; line-height: 1.9; }
.signature-text { font-style: italic; color: #888; margin-bottom: 2px; }
.signature-name { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 10.5pt; color: var(--ink); }
.about-rule { border: none; border-top: 1px solid var(--hairline); width: 200px; margin: 40px auto; }
.about-box { max-width: 560px; margin: 0 auto; text-align: left; }
.about-label { font-family: 'Inter', sans-serif; font-size: 8.5pt; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: var(--gold-deep); text-align: center; margin-bottom: 14px; }
.about-box p { font-size: 9.8pt; color: #555; line-height: 1.8; }

/* promo */
.promo-card {
  position: relative; z-index: 2;
  background: rgba(20,16,22,0.55);
  border: 1px solid rgba(253,250,244,0.15);
  border-radius: 10px;
  padding: 56px 60px;
  text-align: center;
  color: #fdfaf4;
  max-width: 480px;
}
.promo-logo { width: 46px; filter: brightness(0) invert(1); opacity: 0.85; margin-bottom: 20px; }
.promo-title { font-size: 20pt; font-weight: 500; margin-bottom: 26px; }
.promo-code {
  display: inline-block;
  background: #e8cf8f;
  color: #2a2216;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  letter-spacing: 3px;
  padding: 12px 34px;
  border-radius: 30px;
  margin-bottom: 16px;
}
.promo-sub { font-size: 9.5pt; color: rgba(253,250,244,0.75); margin-bottom: 18px; }
.promo-url { font-weight: 600; color: #d8b978; margin-bottom: 14px; }
.promo-share { font-style: italic; font-size: 9pt; color: rgba(253,250,244,0.6); margin-bottom: 0; }

@media print {
  .cover-page, .promo-page { min-height: 100vh; }
}
`;
