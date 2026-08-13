import { find as findTimezone } from 'geo-tz';

export interface ResolvedTimezone {
  offset: number; // UTC offset in hours, historically correct (handles DST)
  timezone: string; // IANA timezone name
}

/**
 * Historical UTC offset (DST-correct) for a location + local date/time, via
 * the IANA tz database. Same technique already proven twice in
 * scripts/relocation-report/{facts,natal}.ts — extracted here so
 * buildFacts.ts doesn't need a third copy of it.
 */
export function resolveUtcOffsetHours(lat: number, lon: number, isoDate: string, isoTime: string): ResolvedTimezone {
  const zones = findTimezone(lat, lon);
  if (!zones.length) throw new Error(`No timezone found for lat=${lat}, lon=${lon}`);
  const timezone = zones[0];

  const [y, m, d] = isoDate.split('-').map(Number);
  const [hh, mm] = isoTime.split(':').map(Number);
  // Approximate instant (UTC) just to resolve which offset (incl. DST) is in
  // effect on this date; a few hours of error here cannot flip a DST boundary
  // for all but a handful of transition-night births.
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
