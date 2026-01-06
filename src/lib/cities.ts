/**
 * City search using OpenStreetMap Nominatim API
 * Can find any city in the world
 */

export interface City {
  label: string; // Display name (City, State/Region, Country)
  value: string; // Same as label for simplicity
  lat: number;
  lng: number;
  country?: string; // Country name for timezone lookup
}

/**
 * Country to timezone offset mapping (standard time, not DST)
 * This covers major countries - for accurate historical dates,
 * a full timezone database would be needed
 */
export const COUNTRY_TIMEZONES: Record<string, number> = {
  // Asia
  'Japan': 9,
  'South Korea': 9,
  'Korea': 9,
  'China': 8,
  'Hong Kong': 8,
  'Taiwan': 8,
  'Singapore': 8,
  'Malaysia': 8,
  'Philippines': 8,
  'Brunei': 8,
  'Indonesia': 7, // WIB (most populous), some areas are +8 or +9
  'Thailand': 7,
  'Vietnam': 7,
  'Cambodia': 7,
  'Laos': 7,
  'Myanmar': 6.5,
  'Bangladesh': 6,
  'Bhutan': 6,
  'Nepal': 5.75,
  'India': 5.5,
  'Sri Lanka': 5.5,
  'Pakistan': 5,
  'Uzbekistan': 5,
  'Tajikistan': 5,
  'Turkmenistan': 5,
  'Afghanistan': 4.5,
  'United Arab Emirates': 4,
  'Oman': 4,
  'Azerbaijan': 4,
  'Georgia': 4,
  'Armenia': 4,
  'Saudi Arabia': 3,
  'Kuwait': 3,
  'Qatar': 3,
  'Bahrain': 3,
  'Iraq': 3,
  'Yemen': 3,
  'Jordan': 3, // Can be +2 in winter
  'Israel': 2, // Can be +3 in summer
  'Palestine': 2,
  'Lebanon': 2,
  'Syria': 3,
  'Turkey': 3,
  'Iran': 3.5,

  // Europe
  'United Kingdom': 0,
  'UK': 0,
  'England': 0,
  'Scotland': 0,
  'Wales': 0,
  'Northern Ireland': 0,
  'Ireland': 0,
  'Portugal': 0,
  'Iceland': 0,
  'France': 1,
  'Spain': 1,
  'Germany': 1,
  'Italy': 1,
  'Netherlands': 1,
  'Belgium': 1,
  'Switzerland': 1,
  'Austria': 1,
  'Czech Republic': 1,
  'Czechia': 1,
  'Poland': 1,
  'Hungary': 1,
  'Slovakia': 1,
  'Slovenia': 1,
  'Croatia': 1,
  'Serbia': 1,
  'Denmark': 1,
  'Norway': 1,
  'Sweden': 1,
  'Luxembourg': 1,
  'Monaco': 1,
  'Andorra': 1,
  'Malta': 1,
  'Albania': 1,
  'North Macedonia': 1,
  'Montenegro': 1,
  'Bosnia and Herzegovina': 1,
  'Kosovo': 1,
  'Greece': 2,
  'Finland': 2,
  'Estonia': 2,
  'Latvia': 2,
  'Lithuania': 2,
  'Ukraine': 2,
  'Moldova': 2,
  'Romania': 2,
  'Bulgaria': 2,
  'Cyprus': 2,
  'Belarus': 3,
  'Russia': 3, // Moscow time, Russia spans many zones

  // Africa
  'Morocco': 1,
  'Algeria': 1,
  'Tunisia': 1,
  'Libya': 2,
  'Egypt': 2,
  'South Africa': 2,
  'Botswana': 2,
  'Zimbabwe': 2,
  'Zambia': 2,
  'Malawi': 2,
  'Mozambique': 2,
  'Namibia': 2,
  'eSwatini': 2,
  'Lesotho': 2,
  'Rwanda': 2,
  'Burundi': 2,
  'Sudan': 2,
  'Ethiopia': 3,
  'Kenya': 3,
  'Tanzania': 3,
  'Uganda': 3,
  'Somalia': 3,
  'Madagascar': 3,
  'Nigeria': 1,
  'Ghana': 0,
  'Senegal': 0,
  'Ivory Coast': 0,
  "Côte d'Ivoire": 0,
  'Cameroon': 1,
  'Democratic Republic of the Congo': 1, // Kinshasa
  'Congo': 1,

  // Americas
  'United States': -5, // EST (varies by state)
  'USA': -5,
  'Canada': -5, // EST (varies by province)
  'Mexico': -6, // CST (varies)
  'Guatemala': -6,
  'Honduras': -6,
  'El Salvador': -6,
  'Nicaragua': -6,
  'Costa Rica': -6,
  'Panama': -5,
  'Colombia': -5,
  'Ecuador': -5,
  'Peru': -5,
  'Cuba': -5,
  'Jamaica': -5,
  'Haiti': -5,
  'Dominican Republic': -4,
  'Puerto Rico': -4,
  'Venezuela': -4,
  'Bolivia': -4,
  'Paraguay': -4,
  'Chile': -4, // Can be -3
  'Argentina': -3,
  'Uruguay': -3,
  'Brazil': -3, // Brasília time (varies)

  // Oceania
  'Australia': 10, // AEST (varies by state)
  'New Zealand': 12,
  'Fiji': 12,
  'Papua New Guinea': 10,

  // Default fallback handled in function
};

/**
 * Get timezone offset for a country
 * Returns offset in hours from UTC
 */
export function getTimezoneForCountry(country: string): number | null {
  if (!country) return null;

  // Try exact match first
  if (COUNTRY_TIMEZONES[country] !== undefined) {
    return COUNTRY_TIMEZONES[country];
  }

  // Try case-insensitive match
  const lowerCountry = country.toLowerCase();
  for (const [key, value] of Object.entries(COUNTRY_TIMEZONES)) {
    if (key.toLowerCase() === lowerCountry) {
      return value;
    }
  }

  // Try partial match (e.g., "United States of America" -> "United States")
  for (const [key, value] of Object.entries(COUNTRY_TIMEZONES)) {
    if (lowerCountry.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerCountry)) {
      return value;
    }
  }

  return null;
}

/**
 * Popular cities for quick selection (shown when dropdown opens)
 */
export const POPULAR_CITIES: City[] = [
  { label: "New York, New York, United States", value: "New York, New York, United States", lat: 40.7128, lng: -74.006, country: "United States" },
  { label: "Los Angeles, California, United States", value: "Los Angeles, California, United States", lat: 34.0522, lng: -118.2437, country: "United States" },
  { label: "London, England, United Kingdom", value: "London, England, United Kingdom", lat: 51.5074, lng: -0.1278, country: "United Kingdom" },
  { label: "Paris, Ile-de-France, France", value: "Paris, Ile-de-France, France", lat: 48.8566, lng: 2.3522, country: "France" },
  { label: "Tokyo, Tokyo, Japan", value: "Tokyo, Tokyo, Japan", lat: 35.6762, lng: 139.6503, country: "Japan" },
  { label: "Sydney, New South Wales, Australia", value: "Sydney, New South Wales, Australia", lat: -33.8688, lng: 151.2093, country: "Australia" },
  { label: "Singapore, Singapore, Singapore", value: "Singapore, Singapore, Singapore", lat: 1.3521, lng: 103.8198, country: "Singapore" },
  { label: "Hong Kong, Hong Kong, China", value: "Hong Kong, Hong Kong, China", lat: 22.3193, lng: 114.1694, country: "Hong Kong" },
  { label: "Dubai, Dubai, United Arab Emirates", value: "Dubai, Dubai, United Arab Emirates", lat: 25.2048, lng: 55.2708, country: "United Arab Emirates" },
  { label: "Berlin, Berlin, Germany", value: "Berlin, Berlin, Germany", lat: 52.52, lng: 13.405, country: "Germany" },
  { label: "Toronto, Ontario, Canada", value: "Toronto, Ontario, Canada", lat: 43.6532, lng: -79.3832, country: "Canada" },
  { label: "Mumbai, Maharashtra, India", value: "Mumbai, Maharashtra, India", lat: 19.076, lng: 72.8777, country: "India" },
  { label: "Shanghai, Shanghai, China", value: "Shanghai, Shanghai, China", lat: 31.2304, lng: 121.4737, country: "China" },
  { label: "Seoul, Seoul, South Korea", value: "Seoul, Seoul, South Korea", lat: 37.5665, lng: 126.978, country: "South Korea" },
  { label: "Bangkok, Bangkok, Thailand", value: "Bangkok, Bangkok, Thailand", lat: 13.7563, lng: 100.5018, country: "Thailand" },
  { label: "Mexico City, Federal District, Mexico", value: "Mexico City, Federal District, Mexico", lat: 19.4326, lng: -99.1332, country: "Mexico" },
  { label: "São Paulo, São Paulo, Brazil", value: "São Paulo, São Paulo, Brazil", lat: -23.5505, lng: -46.6333, country: "Brazil" },
  { label: "Amsterdam, North Holland, Netherlands", value: "Amsterdam, North Holland, Netherlands", lat: 52.3676, lng: 4.9041, country: "Netherlands" },
  { label: "Rome, Lazio, Italy", value: "Rome, Lazio, Italy", lat: 41.9028, lng: 12.4964, country: "Italy" },
  { label: "Madrid, Madrid, Spain", value: "Madrid, Madrid, Spain", lat: 40.4168, lng: -3.7038, country: "Spain" },
];

/**
 * Search cities using OpenStreetMap Nominatim API
 * This can find any city in the world
 */
export async function searchCitiesAPI(query: string): Promise<City[]> {
  if (!query || query.length < 1) return [];

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?` +
      new URLSearchParams({
        q: query,
        format: 'json',
        addressdetails: '1',
        limit: '30',
        featuretype: 'city',
        'accept-language': 'en',
      }),
      {
        headers: {
          'User-Agent': 'LunarPlayground/1.0',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Nominatim API error');
    }

    const data = await response.json();

    // Transform results to our City format
    const cities: City[] = data
      .filter((item: any) => {
        // Include cities, towns, villages, and administrative areas
        const validTypes = ['city', 'town', 'village', 'municipality', 'administrative'];
        return validTypes.some(type =>
          item.type?.includes(type) || item.class === 'place' || item.class === 'boundary'
        );
      })
      .map((item: any) => {
        const address = item.address || {};

        // Build location parts
        const city = address.city || address.town || address.village || address.municipality || item.name;
        const state = address.state || address.region || address.county || '';
        const country = address.country || '';

        // Create label in "City, State, Country" format
        let label = city;
        if (state && state !== city) {
          label += `, ${state}`;
        }
        if (country) {
          label += `, ${country}`;
        }

        return {
          label,
          value: label,
          lat: parseFloat(item.lat),
          lng: parseFloat(item.lon),
          country,
        };
      })
      // Remove duplicates by label
      .filter((city: City, index: number, self: City[]) =>
        index === self.findIndex(c => c.label === city.label)
      );

    // Sort results: cities starting with query first, then alphabetically
    const lowerQuery = query.toLowerCase();
    cities.sort((a, b) => {
      const aStarts = a.label.toLowerCase().startsWith(lowerQuery);
      const bStarts = b.label.toLowerCase().startsWith(lowerQuery);

      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return a.label.localeCompare(b.label);
    });

    return cities;
  } catch (error) {
    console.error('City search error:', error);
    // Fallback to filtering popular cities
    return searchPopularCities(query);
  }
}

/**
 * Search popular cities locally (fallback when API fails)
 */
export function searchPopularCities(query: string): City[] {
  if (!query) return POPULAR_CITIES;

  const lowerQuery = query.toLowerCase();

  // Filter cities that match
  const matches = POPULAR_CITIES.filter(city =>
    city.label.toLowerCase().includes(lowerQuery)
  );

  // Sort: cities starting with query first, then alphabetically
  matches.sort((a, b) => {
    const aStarts = a.label.toLowerCase().startsWith(lowerQuery);
    const bStarts = b.label.toLowerCase().startsWith(lowerQuery);

    if (aStarts && !bStarts) return -1;
    if (!aStarts && bStarts) return 1;
    return a.label.localeCompare(b.label);
  });

  return matches;
}
