import { find as findTimezone } from 'geo-tz';
import { toJulianDay, calculateSunLongitude, calculateUranusLongitude, calculateMoonLongitude, calculateNeptuneLongitude } from '../../src/lib/ephemeris';

const lat = 31.8947, lon = 34.8086;
const zones = findTimezone(lat, lon);
const approxUtc = new Date(Date.UTC(2000, 1, 5, 21, 15));
const parts = new Intl.DateTimeFormat('en', { timeZone: zones[0], timeZoneName: 'shortOffset' }).formatToParts(approxUtc);
const offsetStr = parts.find(p => p.type === 'timeZoneName')?.value ?? '';
const match = offsetStr.match(/GMT([+-])(\d+)/);
const offset = match ? (match[1] === '+' ? 1 : -1) * parseInt(match[2], 10) : 0;

const utcHour = 21 + 15/60 - offset;
const jd = toJulianDay(2000, 2, 5, utcHour);

const sun = calculateSunLongitude(jd);
const uranus = calculateUranusLongitude(jd);
const moon = calculateMoonLongitude(jd);
const neptune = calculateNeptuneLongitude(jd);

function toDMS(lon: number) {
  const signs = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];
  const signIdx = Math.floor(lon / 30);
  const deg = lon % 30;
  const d = Math.floor(deg);
  const m = Math.floor((deg - d) * 60);
  const s = Math.round(((deg - d) * 60 - m) * 60);
  return `${signs[signIdx]} ${d}°${m}'${s}"`;
}

console.log('UTC offset used:', offset, '| timezone:', zones[0]);
console.log('Sun:     ', sun.toFixed(4), 'deg  ->', toDMS(sun));
console.log('Uranus:  ', uranus.toFixed(4), 'deg  ->', toDMS(uranus));
console.log('Sun-Uranus orb:', Math.abs(sun - uranus).toFixed(4), 'deg =', (Math.abs(sun-uranus)*60).toFixed(1), 'arcminutes');
console.log('Moon:    ', moon.toFixed(4), 'deg  ->', toDMS(moon));
console.log('Neptune: ', neptune.toFixed(4), 'deg  ->', toDMS(neptune));
