import { createHmac, timingSafeEqual } from 'crypto';
import { eq, and, gt, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { adminLoginAttempts } from '../db/schema';

/**
 * Password gate for the internal admin/Fiverr order tool
 * (`/admin/relocation-order`). That route triggers real paid AI Gateway
 * calls with no Stripe payment gate in front of it, so a leaked or
 * brute-forced password is a direct cost-exposure risk — this file is the
 * only thing standing in front of it.
 *
 * Two independent controls:
 *  - `checkLoginRateLimit` / `recordLoginAttempt`: an IP-windowed lockout
 *    backed by Postgres (not an in-memory counter, which wouldn't survive
 *    across serverless instances) that blocks even a correct password once
 *    a threshold of recent failures is hit.
 *  - `createSessionCookie` / `verifySessionCookie`: a short-lived
 *    HMAC-signed session token. No server-side session storage — the
 *    signature plus embedded expiry is the whole check.
 */

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_TTL_MS = 60 * 60 * 1000; // 1 hour
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_FAILED_ATTEMPTS_PER_WINDOW = 5;

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error('ADMIN_SESSION_SECRET is not set');
  return secret;
}

function sign(payload: string): string {
  return createHmac('sha256', getSessionSecret()).update(payload).digest('base64url');
}

/** Constant-time compare against the shared admin password. */
export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_TOOL_PASSWORD;
  if (!expected) throw new Error('ADMIN_TOOL_PASSWORD is not set');

  const candidateBuf = Buffer.from(candidate);
  const expectedBuf = Buffer.from(expected);
  // Lengths must match for timingSafeEqual; a length mismatch is itself not
  // secret (password length isn't the thing being protected), so it's fine
  // to short-circuit here rather than pad to a fixed size.
  if (candidateBuf.length !== expectedBuf.length) return false;
  return timingSafeEqual(candidateBuf, expectedBuf);
}

export function createSessionCookieValue(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = String(expiresAt);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionCookieValue(value: string | undefined): boolean {
  if (!value) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;

  const expectedSignature = sign(payload);
  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) return false;

  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt)) return false;
  return Date.now() < expiresAt;
}

export const ADMIN_SESSION_COOKIE = {
  name: SESSION_COOKIE_NAME,
  maxAgeSeconds: SESSION_TTL_MS / 1000,
};

/**
 * Extracts the caller's IP from Vercel's `x-forwarded-for` header (the
 * platform sets this reliably; there's no proxy in front of it a client
 * could use to spoof a different value than the one Vercel recorded).
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get('x-forwarded-for');
  const first = forwardedFor?.split(',')[0]?.trim();
  return first || 'unknown';
}

/**
 * Returns true if this IP is currently locked out from logging in — checked
 * BEFORE comparing the submitted password, so a lockout can't be bypassed
 * just by eventually guessing right.
 */
export async function checkLoginRateLimit(ip: string): Promise<boolean> {
  const db = getDb();
  const windowStart = new Date(Date.now() - LOGIN_WINDOW_MS);

  const [row] = await db
    .select({ count: sql<string>`count(*)` })
    .from(adminLoginAttempts)
    .where(
      and(
        eq(adminLoginAttempts.ip, ip),
        eq(adminLoginAttempts.succeeded, false),
        gt(adminLoginAttempts.createdAt, windowStart)
      )
    );

  // Postgres `count(*)` returns bigint, which the neon-http driver surfaces
  // as a string (bigint doesn't round-trip through JS `number` safely) —
  // coerce explicitly rather than trusting a bare `+row.count`.
  return Number(row?.count ?? 0) < MAX_FAILED_ATTEMPTS_PER_WINDOW;
}

export async function recordLoginAttempt(ip: string, succeeded: boolean): Promise<void> {
  const db = getDb();
  await db.insert(adminLoginAttempts).values({ ip, succeeded });
}
