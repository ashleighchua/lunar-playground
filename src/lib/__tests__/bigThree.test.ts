import { describe, it, expect } from 'vitest';
import { getBigThree } from '../bigThree';
import type { StoredBirthData } from '../birthData';

function stored(overrides: Partial<StoredBirthData>): StoredBirthData {
  return {
    birthdate: '1990-08-14',
    birthtime: '',
    birthplace: null,
    savedAt: Date.now(),
    ...overrides,
  };
}

describe('getBigThree', () => {
  it('returns null when no birthdate is stored', async () => {
    expect(await getBigThree(stored({ birthdate: '' }))).toBeNull();
  });

  it('returns a sun sign from date alone, with moon/rising null when time+place are missing', async () => {
    const result = await getBigThree(stored({}));
    expect(result).not.toBeNull();
    expect(result!.sun).toBe('Leo');
    expect(result!.moon).toBeNull();
    expect(result!.rising).toBeNull();
  });

  it('still resolves a sun sign when only time is provided (no place)', async () => {
    const result = await getBigThree(stored({ birthtime: '14:30' }));
    expect(result!.sun).toBe('Leo');
    expect(result!.moon).toBeNull();
    expect(result!.rising).toBeNull();
  });
});
