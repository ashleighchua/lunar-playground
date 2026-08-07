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

// Tracks completion of the /app onboarding wizard separately from birth data,
// since a user can complete onboarding via "Skip" without saving birth data.
const APP_ONBOARDED_KEY = 'lunar_app_onboarded';

export function isAppOnboarded(): boolean {
  try {
    return localStorage.getItem(APP_ONBOARDED_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAppOnboarded(): void {
  try {
    localStorage.setItem(APP_ONBOARDED_KEY, 'true');
  } catch {
    // localStorage might be unavailable
  }
}
