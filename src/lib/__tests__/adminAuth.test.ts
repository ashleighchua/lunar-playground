import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { verifyPassword, createSessionCookieValue, verifySessionCookieValue, getClientIp } from '../adminAuth';

describe('adminAuth', () => {
  beforeEach(() => {
    process.env.ADMIN_TOOL_PASSWORD = 'correct-horse-battery-staple';
    process.env.ADMIN_SESSION_SECRET = 'test-secret-value-not-a-real-secret';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('verifyPassword', () => {
    it('accepts the correct password', () => {
      expect(verifyPassword('correct-horse-battery-staple')).toBe(true);
    });

    it('rejects an incorrect password of the same length', () => {
      expect(verifyPassword('wrong-donkey-battery-staple!')).toBe(false);
    });

    it('rejects a password of a different length without throwing', () => {
      expect(verifyPassword('short')).toBe(false);
    });

    it('rejects an empty password', () => {
      expect(verifyPassword('')).toBe(false);
    });
  });

  describe('session cookie', () => {
    it('verifies a freshly created cookie', () => {
      const value = createSessionCookieValue();
      expect(verifySessionCookieValue(value)).toBe(true);
    });

    it('rejects an undefined cookie', () => {
      expect(verifySessionCookieValue(undefined)).toBe(false);
    });

    it('rejects a malformed cookie', () => {
      expect(verifySessionCookieValue('not-a-valid-token')).toBe(false);
    });

    it('rejects a cookie with a tampered signature', () => {
      const value = createSessionCookieValue();
      const [payload] = value.split('.');
      expect(verifySessionCookieValue(`${payload}.dGFtcGVyZWQtc2lnbmF0dXJl`)).toBe(false);
    });

    it('rejects a cookie signed under a different secret', () => {
      const value = createSessionCookieValue();
      process.env.ADMIN_SESSION_SECRET = 'a-completely-different-secret';
      expect(verifySessionCookieValue(value)).toBe(false);
    });

    it('rejects an expired cookie', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
      const value = createSessionCookieValue();

      vi.setSystemTime(new Date('2026-01-01T02:00:00Z')); // 2h later, past the 1h TTL
      expect(verifySessionCookieValue(value)).toBe(false);
    });

    it('still accepts a cookie just under the TTL', () => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));
      const value = createSessionCookieValue();

      vi.setSystemTime(new Date('2026-01-01T00:59:00Z')); // 59m later, within the 1h TTL
      expect(verifySessionCookieValue(value)).toBe(true);
    });
  });

  describe('getClientIp', () => {
    it('returns the first IP from x-forwarded-for', () => {
      const headers = new Headers({ 'x-forwarded-for': '1.2.3.4, 5.6.7.8' });
      expect(getClientIp(headers)).toBe('1.2.3.4');
    });

    it('returns "unknown" when the header is absent', () => {
      expect(getClientIp(new Headers())).toBe('unknown');
    });
  });
});
