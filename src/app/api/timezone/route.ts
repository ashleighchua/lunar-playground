import { NextRequest, NextResponse } from 'next/server';
import tzlookup from 'tz-lookup';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const lat = parseFloat(searchParams.get('lat') ?? '');
  const lng = parseFloat(searchParams.get('lng') ?? '');
  const ts = parseInt(searchParams.get('ts') ?? '');

  if (isNaN(lat) || isNaN(lng) || isNaN(ts)) {
    return NextResponse.json({ error: 'lat, lng, ts required' }, { status: 400 });
  }

  let tz: string;
  try {
    tz = tzlookup(lat, lng);
  } catch {
    return NextResponse.json({ error: 'No timezone found' }, { status: 404 });
  }

  const date = new Date(ts);

  // Use Intl to get the UTC offset for this timezone at the given moment
  const parts = new Intl.DateTimeFormat('en', {
    timeZone: tz,
    timeZoneName: 'shortOffset',
  }).formatToParts(date);

  const offsetStr = parts.find(p => p.type === 'timeZoneName')?.value ?? '';
  // offsetStr looks like "GMT-4", "GMT+5:30", "GMT"
  const match = offsetStr.match(/GMT([+-])(\d+)(?::(\d+))?/);
  let offset = 0;
  if (match) {
    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2]);
    const minutes = match[3] ? parseInt(match[3]) : 0;
    offset = sign * (hours + minutes / 60);
  }

  return NextResponse.json({ timezone: tz, offset });
}
