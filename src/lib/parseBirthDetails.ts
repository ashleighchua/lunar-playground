import * as chrono from 'chrono-node';

export interface ParsedBirthDetails {
  date: string | null;   // "April 16, 2002"
  time: string | null;   // "7:51 AM"
  place: string | null;  // "Bridgeport, Connecticut"
  raw: string;
}

// Converts military time like "2358" or "@ 2358" to "23:58"
// Skips plausible years (1800–2100) to avoid mangling birth years like "2002"
function normalizeMilitaryTime(input: string): string {
  return input.replace(/\b(\d{4})\b/g, (match, digits) => {
    const num = parseInt(digits, 10);
    if (num >= 1800 && num <= 2100) return match;
    const h = parseInt(digits.slice(0, 2), 10);
    const m = parseInt(digits.slice(2), 10);
    if (h >= 0 && h <= 23 && m >= 0 && m <= 59) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }
    return match;
  });
}

function stripLabels(input: string): string {
  return input
    .replace(/birth\s*day\s*[:\-]?\s*/gi, '')
    .replace(/date\s*(of\s*birth)?\s*[:\-]?\s*/gi, '')
    .replace(/time\s*(of\s*birth)?\s*[:\-]?\s*/gi, '')
    .replace(/place\s*(of\s*birth)?\s*[:\-]?\s*/gi, '__PLACE__')
    .trim();
}

// Format time from chrono components — avoids timezone shifts from Date conversion
function formatTime(result: chrono.ParsedResult): string | null {
  const start = result.start;
  if (!start.isCertain('hour')) return null;
  const h24 = start.get('hour') ?? 0;
  const min = start.get('minute') ?? 0;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h12}:${min.toString().padStart(2, '0')} ${ampm}`;
}

// Format date from chrono components — avoids timezone shifts
function formatDate(result: chrono.ParsedResult): string | null {
  const start = result.start;
  if (!start.isCertain('year') || !start.isCertain('month') || !start.isCertain('day')) return null;
  const year = start.get('year');
  const month = start.get('month')! - 1; // chrono months are 1-indexed
  const day = start.get('day');
  const d = new Date(year!, month, day!);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function cleanPlace(text: string): string | null {
  const cleaned = text
    .replace(/__PLACE__/g, '')
    .replace(/please\s+note[:\s].*/gi, '')
    .replace(/this\s+is\s+(not\s+)?for.*/gi, '')
    .replace(/[@\-–—\/\\|.]/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/^[\s,]+|[\s,]+$/g, '')
    .trim();
  if (cleaned.length < 3 || !/[a-zA-Z]/.test(cleaned)) return null;
  return cleaned || null;
}

export function parseBirthDetails(raw: string): ParsedBirthDetails {
  if (!raw || !raw.trim()) {
    return { date: null, time: null, place: null, raw };
  }

  // Extract explicit "place of birth" label before stripping
  const placeMatch = raw.match(/place\s*(?:of\s*birth)?\s*[:\-]\s*(.+?)(?:\s*[-–—]|$)/i);
  const explicitPlace = placeMatch ? placeMatch[1].trim() : null;

  const normalized = normalizeMilitaryTime(raw);
  const stripped = stripLabels(normalized);

  const results = chrono.parse(stripped, undefined, { forwardDate: false });

  let parsedDate: string | null = null;
  let parsedTime: string | null = null;
  let remainingText = stripped;

  // Walk all results to collect date + time (they may be in separate tokens)
  const usedRanges: Array<{ index: number; len: number }> = [];
  for (const result of results) {
    if (!parsedDate) parsedDate = formatDate(result);
    if (!parsedTime) parsedTime = formatTime(result);
    usedRanges.push({ index: result.index, len: result.text.length });
    if (parsedDate && parsedTime) break;
  }

  // Remove matched tokens from text to isolate place
  // Sort descending so we splice from the end without shifting indices
  usedRanges.sort((a, b) => b.index - a.index);
  for (const { index, len } of usedRanges) {
    remainingText = remainingText.slice(0, index) + ' ' + remainingText.slice(index + len);
  }

  const place = explicitPlace ?? cleanPlace(remainingText);

  return { date: parsedDate, time: parsedTime, place, raw };
}
