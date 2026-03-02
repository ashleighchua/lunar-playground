import { reduceToSingleDigit, getDateParts } from '@/lib/utils';

/**
 * Numerology Calculator
 * All functions accept date strings in "YYYY-MM-DD" format.
 */

function getDigits(str: string): number[] {
  return str.replace(/-/g, '').split('').map(Number);
}

function sumDigits(num: number): number {
  return String(num)
    .split('')
    .reduce((sum, d) => sum + parseInt(d), 0);
}

function reduceNumber(num: number): number {
  return reduceToSingleDigit(num);
}

/**
 * Calculate Life Path Number
 * Sum all digits of the full date (YYYY-MM-DD), then reduce to 1-9 or master number (11, 22, 33).
 */
export function calculateLifePathNumber(dateStr: string): number {
  const digits = getDigits(dateStr);
  const total = digits.reduce((sum, d) => sum + d, 0);
  return reduceNumber(total);
}

/**
 * Calculate Birthday Number
 * The day of birth, reduced to a single digit or master number.
 */
export function calculateBirthdayNumber(dateStr: string): number {
  const { day } = getDateParts(dateStr);
  return reduceNumber(day);
}

/**
 * Calculate Innate Numbers
 * All unique digits present in the full birth date (hyphens removed).
 */
export function calculateInnateNumbers(dateStr: string): number[] {
  const digits = getDigits(dateStr);
  const unique = [...new Set(digits)].sort((a, b) => a - b);
  return unique;
}

/**
 * Calculate Talent Numbers
 * Month + Day digits summed together, then reduced.
 */
export function calculateTalentNumbers(dateStr: string): number {
  const { month, day } = getDateParts(dateStr);
  const sum = sumDigits(month) + sumDigits(day);
  return reduceNumber(sum);
}

/**
 * Calculate Life Number
 * Same as Life Path Number - the sum of all date digits reduced.
 */
export function calculateLifeNumber(dateStr: string): number {
  return calculateLifePathNumber(dateStr);
}

/**
 * Calculate Zodiac Number
 * The birth month reduced to a single digit (1-9).
 */
export function calculateZodiacNumber(dateStr: string): number {
  const { month } = getDateParts(dateStr);
  return reduceNumber(month);
}

/**
 * Calculate Year Number
 * Current year reduced + birth day reduced, then the total reduced again.
 */
export function calculateYearNumber(dateStr: string, currentYear?: number): number {
  const { day } = getDateParts(dateStr);
  const year = currentYear ?? new Date().getFullYear();
  const yearReduced = reduceNumber(sumDigits(year));
  const dayReduced = reduceNumber(day);
  return reduceNumber(yearReduced + dayReduced);
}

/**
 * Calculate Missing Numbers
 * Which digits 1-9 are NOT present in the birth date string.
 */
export function calculateMissingNumbers(dateStr: string): number[] {
  const digits = new Set(getDigits(dateStr));
  const missing: number[] = [];
  for (let i = 1; i <= 9; i++) {
    if (!digits.has(i)) {
      missing.push(i);
    }
  }
  return missing;
}

/**
 * Calculate Energy Grid
 * Returns a count of how many times each digit (1-9) appears in the birth date.
 */
export function calculateEnergyGrid(dateStr: string): Record<number, number> {
  const digits = getDigits(dateStr);
  const grid: Record<number, number> = {};
  for (let i = 1; i <= 9; i++) {
    grid[i] = 0;
  }
  for (const d of digits) {
    if (d >= 1 && d <= 9) {
      grid[d]++;
    }
  }
  return grid;
}

/**
 * Complete Numerology Profile
 */
export interface NumerologyProfile {
  lifePathNumber: number;
  birthdayNumber: number;
  innateNumbers: number[];
  talentNumber: number;
  lifeNumber: number;
  zodiacNumber: number;
  yearNumber: number;
  missingNumbers: number[];
  energyGrid: Record<number, number>;
}

export function getNumerologyProfile(dateStr: string): NumerologyProfile {
  return {
    lifePathNumber: calculateLifePathNumber(dateStr),
    birthdayNumber: calculateBirthdayNumber(dateStr),
    innateNumbers: calculateInnateNumbers(dateStr),
    talentNumber: calculateTalentNumbers(dateStr),
    lifeNumber: calculateLifeNumber(dateStr),
    zodiacNumber: calculateZodiacNumber(dateStr),
    yearNumber: calculateYearNumber(dateStr),
    missingNumbers: calculateMissingNumbers(dateStr),
    energyGrid: calculateEnergyGrid(dateStr),
  };
}
