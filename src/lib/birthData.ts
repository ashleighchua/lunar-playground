// Utility for storing and retrieving birth data across the session

export interface StoredBirthData {
  birthdate: string;
  birthtime: string;
  birthplace: {
    name: string;
    country: string;
    lat: number;
    lng: number;
  } | null;
  gender?: string;
  savedAt: number;
}

const STORAGE_KEY = 'lunar_birth_data';

export function saveBirthData(data: Omit<StoredBirthData, 'savedAt'>): void {
  try {
    const toStore: StoredBirthData = {
      ...data,
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // localStorage might be unavailable
  }
}

export function loadBirthData(): StoredBirthData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const data: StoredBirthData = JSON.parse(stored);

    // Check if data is less than 24 hours old
    const oneDayMs = 24 * 60 * 60 * 1000;
    if (Date.now() - data.savedAt > oneDayMs) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function clearBirthData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage might be unavailable
  }
}
