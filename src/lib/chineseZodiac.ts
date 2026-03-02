import { getDateParts } from '@/lib/utils';

export interface ChineseZodiacProfile {
  animal: string;
  element: string;
  yinYang: 'Yin' | 'Yang';
  year: number;
  personality: string;
  compatible: string[];
  challenging: string[];
  luckyNumbers: number[];
  luckyColors: string[];
  elementEmoji: string;
}

const ANIMALS = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
] as const;

const ELEMENTS: Record<number, string> = {
  0: 'Metal',
  1: 'Metal',
  2: 'Water',
  3: 'Water',
  4: 'Wood',
  5: 'Wood',
  6: 'Fire',
  7: 'Fire',
  8: 'Earth',
  9: 'Earth',
};

const ELEMENT_EMOJIS: Record<string, string> = {
  Metal: '\u2699\uFE0F',
  Water: '\uD83C\uDF0A',
  Wood: '\uD83C\uDF3F',
  Fire: '\uD83D\uDD25',
  Earth: '\u26F0\uFE0F',
};

const PERSONALITY_TAGLINES: Record<string, string> = {
  Rat: 'The Resourceful Rat',
  Ox: 'The Steadfast Ox',
  Tiger: 'The Courageous Tiger',
  Rabbit: 'The Graceful Rabbit',
  Dragon: 'The Mighty Dragon',
  Snake: 'The Wise Snake',
  Horse: 'The Spirited Horse',
  Goat: 'The Gentle Goat',
  Monkey: 'The Clever Monkey',
  Rooster: 'The Elegant Rooster',
  Dog: 'The Loyal Dog',
  Pig: 'The Generous Pig',
};

const COMPATIBLE_ANIMALS: Record<string, string[]> = {
  Rat: ['Dragon', 'Monkey', 'Ox'],
  Ox: ['Snake', 'Rooster', 'Rat'],
  Tiger: ['Horse', 'Dog', 'Pig'],
  Rabbit: ['Goat', 'Pig', 'Dog'],
  Dragon: ['Rat', 'Monkey', 'Rooster'],
  Snake: ['Ox', 'Rooster', 'Monkey'],
  Horse: ['Tiger', 'Goat', 'Dog'],
  Goat: ['Rabbit', 'Horse', 'Pig'],
  Monkey: ['Rat', 'Dragon', 'Snake'],
  Rooster: ['Ox', 'Snake', 'Dragon'],
  Dog: ['Tiger', 'Rabbit', 'Horse'],
  Pig: ['Tiger', 'Rabbit', 'Goat'],
};

const CHALLENGING_ANIMALS: Record<string, string[]> = {
  Rat: ['Horse', 'Goat', 'Rabbit'],
  Ox: ['Goat', 'Horse', 'Dog'],
  Tiger: ['Monkey', 'Snake', 'Ox'],
  Rabbit: ['Rooster', 'Dragon', 'Rat'],
  Dragon: ['Dog', 'Rabbit', 'Dragon'],
  Snake: ['Pig', 'Tiger', 'Monkey'],
  Horse: ['Rat', 'Ox', 'Horse'],
  Goat: ['Ox', 'Rat', 'Dog'],
  Monkey: ['Tiger', 'Pig', 'Snake'],
  Rooster: ['Rabbit', 'Dog', 'Rooster'],
  Dog: ['Dragon', 'Ox', 'Goat'],
  Pig: ['Snake', 'Monkey', 'Pig'],
};

const LUCKY_NUMBERS: Record<string, number[]> = {
  Rat: [2, 3, 6],
  Ox: [1, 4, 9],
  Tiger: [1, 3, 7],
  Rabbit: [3, 4, 9],
  Dragon: [1, 6, 7],
  Snake: [2, 8, 9],
  Horse: [2, 3, 7],
  Goat: [3, 4, 9],
  Monkey: [1, 7, 8],
  Rooster: [5, 7, 8],
  Dog: [3, 4, 9],
  Pig: [2, 5, 8],
};

const LUCKY_COLORS: Record<string, string[]> = {
  Rat: ['Blue', 'Gold', 'Green'],
  Ox: ['White', 'Yellow', 'Green'],
  Tiger: ['Blue', 'Gray', 'Orange'],
  Rabbit: ['Red', 'Pink', 'Purple'],
  Dragon: ['Gold', 'Silver', 'Gray'],
  Snake: ['Red', 'Yellow', 'Black'],
  Horse: ['Yellow', 'Red', 'Green'],
  Goat: ['Green', 'Red', 'Purple'],
  Monkey: ['White', 'Gold', 'Blue'],
  Rooster: ['Gold', 'Brown', 'Yellow'],
  Dog: ['Green', 'Red', 'Purple'],
  Pig: ['Yellow', 'Gray', 'Brown'],
};

/**
 * Lunar New Year start dates (month, day) for each Gregorian year.
 * If a person is born before this date, they belong to the previous
 * year's zodiac cycle.
 */
const LUNAR_NEW_YEAR_DATES: Record<number, [number, number]> = {
  1924: [2, 5],  1925: [1, 24], 1926: [2, 13], 1927: [2, 2],  1928: [1, 23],
  1929: [2, 10], 1930: [1, 30], 1931: [2, 17], 1932: [2, 6],  1933: [1, 26],
  1934: [2, 14], 1935: [2, 4],  1936: [1, 24], 1937: [2, 11], 1938: [1, 31],
  1939: [2, 19], 1940: [2, 8],  1941: [1, 27], 1942: [2, 15], 1943: [2, 5],
  1944: [1, 25], 1945: [2, 13], 1946: [2, 2],  1947: [1, 22], 1948: [2, 10],
  1949: [1, 29], 1950: [2, 17], 1951: [2, 6],  1952: [1, 27], 1953: [2, 14],
  1954: [2, 3],  1955: [1, 24], 1956: [2, 12], 1957: [1, 31], 1958: [2, 18],
  1959: [2, 8],  1960: [1, 28], 1961: [2, 15], 1962: [2, 5],  1963: [1, 25],
  1964: [2, 13], 1965: [2, 2],  1966: [1, 21], 1967: [2, 9],  1968: [1, 30],
  1969: [2, 17], 1970: [2, 6],  1971: [1, 27], 1972: [2, 15], 1973: [2, 3],
  1974: [1, 23], 1975: [2, 11], 1976: [1, 31], 1977: [2, 18], 1978: [2, 7],
  1979: [1, 28], 1980: [2, 16], 1981: [2, 5],  1982: [1, 25], 1983: [2, 13],
  1984: [2, 2],  1985: [2, 20], 1986: [2, 9],  1987: [1, 29], 1988: [2, 17],
  1989: [2, 6],  1990: [1, 27], 1991: [2, 15], 1992: [2, 4],  1993: [1, 23],
  1994: [2, 10], 1995: [1, 31], 1996: [2, 19], 1997: [2, 7],  1998: [1, 28],
  1999: [2, 16], 2000: [2, 5],  2001: [1, 24], 2002: [2, 12], 2003: [2, 1],
  2004: [1, 22], 2005: [2, 9],  2006: [1, 29], 2007: [2, 18], 2008: [2, 7],
  2009: [1, 26], 2010: [2, 14], 2011: [2, 3],  2012: [1, 23], 2013: [2, 10],
  2014: [1, 31], 2015: [2, 19], 2016: [2, 8],  2017: [1, 28], 2018: [2, 16],
  2019: [2, 5],  2020: [1, 25], 2021: [2, 12], 2022: [2, 1],  2023: [1, 22],
  2024: [2, 10], 2025: [1, 29], 2026: [2, 17], 2027: [2, 6],  2028: [1, 26],
  2029: [2, 13], 2030: [2, 3],  2031: [1, 23], 2032: [2, 11], 2033: [1, 31],
  2034: [2, 19], 2035: [2, 8],  2036: [1, 28], 2037: [2, 15], 2038: [2, 4],
  2039: [1, 24], 2040: [2, 12], 2041: [2, 1],  2042: [1, 22], 2043: [2, 10],
  2044: [1, 30],
};

/**
 * Calculate Chinese Zodiac profile from a birth date string.
 *
 * Accounts for the Lunar New Year: if the birth date falls before
 * that year's Lunar New Year, the previous year's zodiac is used.
 */
export function getChineseZodiac(dateStr: string): ChineseZodiacProfile {
  const { year, month, day } = getDateParts(dateStr);

  // Determine the zodiac year based on Lunar New Year boundary
  const lnyDate = LUNAR_NEW_YEAR_DATES[year];
  const zodiacYear =
    lnyDate && (month < lnyDate[0] || (month === lnyDate[0] && day < lnyDate[1]))
      ? year - 1
      : year;

  const animalIndex = (zodiacYear - 4) % 12;
  const animal = ANIMALS[animalIndex >= 0 ? animalIndex : animalIndex + 12];

  const elementKey = zodiacYear % 10;
  const element = ELEMENTS[elementKey];

  const yinYang: 'Yin' | 'Yang' = zodiacYear % 2 === 0 ? 'Yang' : 'Yin';

  return {
    animal,
    element,
    yinYang,
    year,
    personality: PERSONALITY_TAGLINES[animal],
    compatible: COMPATIBLE_ANIMALS[animal],
    challenging: CHALLENGING_ANIMALS[animal],
    luckyNumbers: LUCKY_NUMBERS[animal],
    luckyColors: LUCKY_COLORS[animal],
    elementEmoji: ELEMENT_EMOJIS[element],
  };
}
