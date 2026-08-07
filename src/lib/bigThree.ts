import { getSunSign, parseBirthDateTime } from './moon';
import { calculateChart, type BirthData } from './ephemeris';
import type { StoredBirthData } from './birthData';

export interface BigThree {
  sun: string;
  moon: string | null;
  rising: string | null;
}

// Mirrors the sun/moon/rising computation in src/app/birth-report/page.tsx:
// sun sign only needs a date; moon/rising need a full chart calculation,
// which requires birth time + place (and a DST-correct timezone lookup).
export async function getBigThree(stored: StoredBirthData): Promise<BigThree | null> {
  if (!stored.birthdate) return null;

  const birthDate = parseBirthDateTime(stored.birthdate, stored.birthtime || undefined);
  const sun = getSunSign(birthDate).name;

  let moon: string | null = null;
  let rising: string | null = null;

  if (stored.birthtime && stored.birthplace) {
    const [year, month, day] = stored.birthdate.split('-').map(Number);
    const [hour, minute] = stored.birthtime.split(':').map(Number);
    const { lat, lng } = stored.birthplace;

    const birthTs = Date.UTC(year, month - 1, day, hour, minute);
    let timezone: number;
    try {
      const res = await fetch(`/api/timezone?lat=${lat}&lng=${lng}&ts=${birthTs}`);
      const data = await res.json();
      timezone = typeof data.offset === 'number' ? data.offset : Math.round(lng / 15);
    } catch {
      timezone = Math.round(lng / 15);
    }

    const birthData: BirthData = { year, month, day, hour, minute, latitude: lat, longitude: lng, timezone };
    try {
      const chart = await calculateChart(birthData);
      moon = chart?.moon?.sign ?? null;
      rising = chart?.rising?.sign ?? null;
    } catch {
      moon = null;
      rising = null;
    }
  }

  return { sun, moon, rising };
}
