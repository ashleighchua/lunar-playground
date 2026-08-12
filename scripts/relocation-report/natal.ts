/**
 * Relocation report — natal chart calculator.
 *
 * Computes a client's real natal chart (Sun/Moon/Rising, all planets in
 * sign + house, Ascendant, Midheaven) using the site's own production
 * engine (ephemeris.ts's calculateChart), resolving historical UTC offset
 * (incl. DST) for the birthplace the same way facts.ts does. This is the
 * ONLY source of natal placement facts for a report — narrative content
 * must not assert a placement that isn't in this output.
 *
 * Usage:
 *   npx tsx scripts/relocation-report/natal.ts <input.json> <output.json>
 *
 * Input JSON shape: see ClientInput below (same birth shape as facts.ts).
 */
import { find as findTimezone } from 'geo-tz';
import { calculateChart, type BirthData } from '../../src/lib/ephemeris';
import { readFileSync, writeFileSync } from 'fs';

interface ClientInput {
  client: string;
  birth: {
    date: string; // YYYY-MM-DD (local calendar date at birthplace)
    time: string; // HH:MM 24h local time at birthplace
    lat: number;
    lon: number;
    placeLabel: string;
  };
}

// Same historical-offset resolution technique as facts.ts (IANA tz database
// via geo-tz), reimplemented here so this script has no server dependency.
function resolveUtcOffsetHours(lat: number, lon: number, isoDate: string, isoTime: string): { offset: number; timezone: string } {
  const zones = findTimezone(lat, lon);
  if (!zones.length) throw new Error(`No timezone found for lat=${lat}, lon=${lon}`);
  const timezone = zones[0];

  const [y, m, d] = isoDate.split('-').map(Number);
  const [hh, mm] = isoTime.split(':').map(Number);
  const approxUtc = new Date(Date.UTC(y, m - 1, d, hh, mm));

  const parts = new Intl.DateTimeFormat('en', {
    timeZone: timezone,
    timeZoneName: 'shortOffset',
  }).formatToParts(approxUtc);

  const offsetStr = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
  const match = offsetStr.match(/GMT([+-])(\d+)(?::(\d+))?/);
  let offset = 0;
  if (match) {
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = match[3] ? parseInt(match[3], 10) : 0;
    offset = sign * (hours + minutes / 60);
  }
  return { offset, timezone };
}

async function main() {
  const [inputPath, outputPath] = process.argv.slice(2);
  if (!inputPath || !outputPath) {
    console.error('Usage: npx tsx scripts/relocation-report/natal.ts <input.json> <output.json>');
    process.exit(1);
  }

  const input: ClientInput = JSON.parse(readFileSync(inputPath, 'utf-8'));
  const { offset, timezone } = resolveUtcOffsetHours(
    input.birth.lat,
    input.birth.lon,
    input.birth.date,
    input.birth.time
  );

  const [y, m, d] = input.birth.date.split('-').map(Number);
  const [hh, mm] = input.birth.time.split(':').map(Number);

  const birthData: BirthData = {
    year: y,
    month: m,
    day: d,
    hour: hh,
    minute: mm,
    latitude: input.birth.lat,
    longitude: input.birth.lon,
    timezone: offset,
  };

  const chart = await calculateChart(birthData);
  if (!chart) throw new Error('calculateChart returned null');

  const output = {
    client: input.client,
    birth: { ...input.birth, utcOffsetHours: offset, timezone },
    chart,
  };

  writeFileSync(outputPath, JSON.stringify(output, null, 2));

  console.log(`\nNatal chart computed for ${output.client}`);
  console.log(`Birthplace resolved to ${timezone} (UTC${offset >= 0 ? '+' : ''}${offset})\n`);
  console.log(`Sun:     ${chart.sun.sign} ${chart.sun.degree}° (House ${chart.sun.house})`);
  console.log(`Moon:    ${chart.moon.sign} ${chart.moon.degree}° (House ${chart.moon.house})`);
  if (chart.rising) console.log(`Rising:  ${chart.rising.sign} ${chart.rising.degree}°`);
  console.log(`Mercury: ${chart.mercury.sign} ${chart.mercury.degree}° (House ${chart.mercury.house})`);
  console.log(`Venus:   ${chart.venus.sign} ${chart.venus.degree}° (House ${chart.venus.house})`);
  console.log(`Mars:    ${chart.mars.sign} ${chart.mars.degree}° (House ${chart.mars.house})`);
  console.log(`Jupiter: ${chart.jupiter.sign} ${chart.jupiter.degree}° (House ${chart.jupiter.house})`);
  console.log(`Saturn:  ${chart.saturn.sign} ${chart.saturn.degree}° (House ${chart.saturn.house})`);
  console.log(`Uranus:  ${chart.uranus.sign} ${chart.uranus.degree}° (House ${chart.uranus.house})`);
  console.log(`Neptune: ${chart.neptune.sign} ${chart.neptune.degree}° (House ${chart.neptune.house})`);
  console.log(`Pluto:   ${chart.pluto.sign} ${chart.pluto.degree}° (House ${chart.pluto.house})`);
  if (chart.midheaven !== null) {
    const mcSign = Math.floor(chart.midheaven / 30) % 12;
    const mcDeg = Math.floor(chart.midheaven % 30);
    const signs = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
    console.log(`Midheaven: ${signs[mcSign]} ${mcDeg}°`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
