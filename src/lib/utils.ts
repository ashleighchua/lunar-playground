import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

/**
 * Generate a shareable seed from current time
 */
export function generateSeed(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

/**
 * Seeded random number generator (Mulberry32)
 * Produces reproducible sequences from a seed
 */
export function seededRandom(seed: string): () => number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  let t = (hash >>> 0) + 0x6d2b79f5;

  return function () {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Shuffle an array using a seeded random generator
 */
export function seededShuffle<T>(array: T[], seed: string): T[] {
  const result = [...array];
  const random = seededRandom(seed);

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

/**
 * Create a shareable URL for a reading
 */
export function createShareableUrl(
  baseUrl: string,
  seed: string,
  options?: {
    spread?: string;
    deck?: string;
    reversals?: boolean;
  }
): string {
  const url = new URL(baseUrl);
  url.searchParams.set('seed', seed);

  if (options?.spread) {
    url.searchParams.set('spread', options.spread);
  }
  if (options?.deck) {
    url.searchParams.set('deck', options.deck);
  }
  if (options?.reversals !== undefined) {
    url.searchParams.set('reversals', String(options.reversals));
  }

  return url.toString();
}

/**
 * Parse seed and options from URL search params
 */
export function parseReadingParams(searchParams: URLSearchParams): {
  seed: string | null;
  spread: string | null;
  deck: string | null;
  reversals: boolean;
} {
  return {
    seed: searchParams.get('seed'),
    spread: searchParams.get('spread'),
    deck: searchParams.get('deck'),
    reversals: searchParams.get('reversals') === 'true',
  };
}

/**
 * Delay utility for animations
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Validate a date string (YYYY-MM-DD) is a real calendar date
 */
export function isValidDate(dateString: string): boolean {
  if (!dateString) return false;
  const [year, month, day] = dateString.split('-').map(Number);
  if (year < 1900 || year > new Date().getFullYear()) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export const MONTH_ABBREVIATIONS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

/**
 * Parse a date string (YYYY-MM-DD) into its parts
 */
export function getDateParts(dateStr: string): { year: number; month: number; day: number } {
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month, day };
}

/**
 * Reduce a number to a single digit (1-9), preserving master numbers 11, 22, 33
 */
export function reduceToSingleDigit(num: number): number {
  if (num === 11 || num === 22 || num === 33) return num;
  while (num > 9) {
    num = num.toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
    if (num === 11 || num === 22 || num === 33) return num;
  }
  return num;
}
