/**
 * Local visual-QA script for the new chart-wheel / world-map / strongest-
 * themes / closing-reflection sections added to the production relocation
 * report pipeline (src/lib/reportGeneration/render/). Uses REAL astronomy
 * (calculateChart + calculatePlanetLines against real city coordinates)
 * rather than hand-faked numbers, so the map/wheel geometry can be checked
 * against an actual chart — but hand-authored placeholder prose everywhere
 * an LLM call would normally run, since this never touches narrate.ts (no
 * AI_GATEWAY_API_KEY needed, no cost, no network dependency beyond the
 * Google Fonts import already baked into the report's CSS).
 *
 * Usage: npx tsx scripts/relocation-report/preview-new-pipeline.ts
 */
import { writeFileSync } from 'fs';
import path from 'path';
import { calculateChart, toJulianDay, calculatePlanetEquatorial, type BirthData } from '../../src/lib/ephemeris';
import { calculatePlanetLines, type AstroLine } from '../../src/lib/astrocartography/lineCalculator';
import { distanceToLine, MILES_PER_DEGREE, scoreCitiesForTheme, type CityData } from '../../src/lib/astrocartography/cityScorer';
import { LIFE_THEMES } from '../../src/lib/astrocartography/themes';
import { tierForMiles, isFullPlacementTier } from '../../src/lib/reportGeneration/tiers';
import { renderReportPdf } from '../../src/lib/reportGeneration/render/pdf';
import citiesData from '../../src/data/cities.json';
import type {
  ReportContent, CitySection, SummaryCity, ThemeHighlight, PlacementBlock, Planet,
} from '../../src/lib/reportGeneration/render/template';

const PLANETS = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'] as const;
const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];

function longitudeToSignDegree(lon: number): { sign: string; degree: string } {
  const norm = ((lon % 360) + 360) % 360;
  return { sign: SIGNS[Math.floor(norm / 30) % 12], degree: `${Math.floor(norm % 30)}°` };
}

async function main() {
  const birth: BirthData = { year: 1992, month: 7, day: 14, hour: 14, minute: 30, latitude: 40.7128, longitude: -74.006, timezone: -4 };
  const chart = await calculateChart(birth);
  if (!chart) throw new Error('calculateChart failed for the sample birth data');
  if (!chart.rising || !chart.houses) throw new Error('Sample birth data unexpectedly produced no houses/rising');

  const utcHour = birth.hour + birth.minute / 60 - birth.timezone;
  const jd = toJulianDay(birth.year, birth.month, birth.day, utcHour);
  const allLines: AstroLine[] = PLANETS.flatMap((p) => calculatePlanetLines(p, calculatePlanetEquatorial(p, jd), jd));

  // Real theme-ranked cities (the same scoreCitiesForTheme production uses to pick
  // destinations), not hardcoded ones — a hardcoded city list can easily turn out to
  // have no tight activation at all for a given birth chart, which produces a
  // deceptively weak preview: badges/placements for lines 300-600mi away, and a map
  // where "the city's own line" is nowhere near the dot. Ranking against a real theme
  // guarantees every destination has a genuine reason to be on this list.
  const ranked = scoreCitiesForTheme(citiesData as CityData[], allLines, LIFE_THEMES['love'], 3);
  const destinations = ranked.map((c) => ({ name: c.name, country: c.country, lat: c.lat, lon: c.lon }));

  const cities: CitySection[] = [];
  const summaryCities: SummaryCity[] = [];
  const themeHighlights: ThemeHighlight[] = [];
  const seenLines = new Set<string>();
  const planetaryLines: ReportContent['planetaryLines'] = [];

  for (const dest of destinations) {
    const activations = allLines
      .map((line) => ({ line, miles: Math.round(distanceToLine(dest.lat, dest.lon, line) * MILES_PER_DEGREE * 10) / 10 }))
      .filter((a) => a.miles <= 600)
      .sort((a, b) => a.miles - b.miles);

    // Matches narrate.ts/assemble.ts exactly: only full-placement-tier activations
    // (exact/primary/notable, <=300mi) get a full box + badge; soft-tier (300-600mi)
    // only ever gets a one-line "softer influence" footnote, never shown here.
    const fullTierActivations = activations.filter((a) => {
      const tier = tierForMiles(a.miles);
      return tier && isFullPlacementTier(tier);
    });

    const placements: PlacementBlock[] = fullTierActivations.slice(0, 2).map((a) => ({
      planet: a.line.planet as Planet,
      angle: a.line.angle,
      header: `${a.line.planet.toUpperCase()} ON ${a.line.angle}`,
      body: `Sample body copy: ${a.line.planet} on the ${a.line.angle} runs about ${a.miles} miles from ${dest.name}.`,
      whatToDo: `Sample "what to do" copy for ${a.line.planet} ${a.line.angle} in ${dest.name}.`,
      reflect: `Sample reflect copy for ${a.line.planet} ${a.line.angle} in ${dest.name}.`,
    }));
    const badges = placements.map((p) => ({ planet: p.planet, angle: p.angle }));

    cities.push({
      name: dest.name,
      country: dest.country,
      nickname: `The ${dest.name} Nickname`,
      tagline: `Sample tagline for ${dest.name}.`,
      badges,
      intro: `Sample intro paragraph for ${dest.name}, standing in for narrate.ts's LLM output.`,
      placements,
      combinedEnergy: [`Sample combined-energy paragraph for ${dest.name}.`],
      bottomLine: `${dest.name} is a strong pull for you right now.`,
    });

    summaryCities.push({
      name: dest.name, country: dest.country, lat: dest.lat, lon: dest.lon,
      badges, nickname: `The ${dest.name} Nickname`, paragraph: `${dest.name} is a strong pull for you right now.`,
    });

    const top = fullTierActivations[0];
    if (top) {
      themeHighlights.push({
        city: dest.name, country: dest.country,
        planet: top.line.planet as Planet, angle: top.line.angle,
        headline: `${top.line.planet} on your ${top.line.angle}`,
        blurb: `${dest.name} is a strong pull for you right now.`,
      });
    }

    for (const a of fullTierActivations) {
      const key = `${a.line.planet}_${a.line.angle}`;
      if (seenLines.has(key)) continue;
      seenLines.add(key);
      planetaryLines.push({
        planet: a.line.planet as Planet, angle: a.line.angle,
        blurb: `Sample blurb for ${a.line.planet} ${a.line.angle}.`, points: a.line.points,
      });
    }
  }

  const content: ReportContent = {
    client: 'Sample Client',
    monthYear: 'August 2026',
    birth: { dateLabel: 'July 14, 1992', timeLabel: '2:30 PM', placeLabel: 'New York, NY' },
    citiesListLabel: destinations.map((d) => d.name).join(', '),
    natalChart: {
      intro: 'Sample natal chart intro paragraph, standing in for narrate.ts\'s LLM output.',
      bigThree: [
        { label: 'Sun', sign: chart.sun.sign, degree: `${chart.sun.degree}°`, house: chart.sun.house, description: 'Sample Sun description.' },
        { label: 'Moon', sign: chart.moon.sign, degree: `${chart.moon.degree}°`, house: chart.moon.house, description: 'Sample Moon description.' },
        { label: 'Rising', sign: chart.rising.sign, degree: `${chart.rising.degree}°`, description: 'Sample Rising description.' },
      ],
      planets: [
        { planet: 'Sun', sign: chart.sun.sign, degree: `${chart.sun.degree}°`, longitude: chart.sun.longitude, house: chart.sun.house ?? 0, description: 'Sample Sun description.' },
        { planet: 'Moon', sign: chart.moon.sign, degree: `${chart.moon.degree}°`, longitude: chart.moon.longitude, house: chart.moon.house ?? 0, description: 'Sample Moon description.' },
        { planet: 'Mercury', sign: chart.mercury.sign, degree: `${chart.mercury.degree}°`, longitude: chart.mercury.longitude, house: chart.mercury.house ?? 0, description: 'Sample Mercury description.' },
        { planet: 'Venus', sign: chart.venus.sign, degree: `${chart.venus.degree}°`, longitude: chart.venus.longitude, house: chart.venus.house ?? 0, description: 'Sample Venus description.' },
        { planet: 'Mars', sign: chart.mars.sign, degree: `${chart.mars.degree}°`, longitude: chart.mars.longitude, house: chart.mars.house ?? 0, description: 'Sample Mars description.' },
        { planet: 'Jupiter', sign: chart.jupiter.sign, degree: `${chart.jupiter.degree}°`, longitude: chart.jupiter.longitude, house: chart.jupiter.house ?? 0, description: 'Sample Jupiter description.' },
        { planet: 'Saturn', sign: chart.saturn.sign, degree: `${chart.saturn.degree}°`, longitude: chart.saturn.longitude, house: chart.saturn.house ?? 0, description: 'Sample Saturn description.' },
        { planet: 'Uranus', sign: chart.uranus.sign, degree: `${chart.uranus.degree}°`, longitude: chart.uranus.longitude, house: chart.uranus.house ?? 0, description: 'Sample Uranus description.' },
        { planet: 'Neptune', sign: chart.neptune.sign, degree: `${chart.neptune.degree}°`, longitude: chart.neptune.longitude, house: chart.neptune.house ?? 0, description: 'Sample Neptune description.' },
        { planet: 'Pluto', sign: chart.pluto.sign, degree: `${chart.pluto.degree}°`, longitude: chart.pluto.longitude, house: chart.pluto.house ?? 0, description: 'Sample Pluto description.' },
      ],
      ascendant: { sign: chart.rising.sign, degree: `${chart.rising.degree}°`, longitude: chart.rising.longitude },
      midheaven: chart.midheaven != null ? { ...longitudeToSignDegree(chart.midheaven), longitude: chart.midheaven } : { sign: '', degree: '', longitude: null },
      cusps: chart.houses.cusps,
    },
    planetaryLines,
    cities,
    summaryCities,
    themeHighlights,
    closingMessage: 'May this reading offer clarity as you consider where in the world calls to you next, Sample Client.',
    closingReflection:
      `If I were you, I'd pay closest attention to ${destinations[0]?.name ?? 'the first city'} — it's the one where the most is asking to be lived out loud. Sample "If I were you" closing reflection, standing in for narrate.ts's LLM output.`,
  };

  const pdf = await renderReportPdf(content);
  const outPath = path.join(__dirname, 'preview-new-pipeline-output.pdf');
  writeFileSync(outPath, pdf);
  console.log('Wrote', outPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
