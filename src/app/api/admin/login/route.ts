import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  ADMIN_SESSION_COOKIE,
  checkLoginRateLimit,
  createSessionCookieValue,
  getClientIp,
  recordLoginAttempt,
  verifyPassword,
} from '@/lib/adminAuth';

const RequestSchema = z.object({ password: z.string().min(1) });

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);

  const underLimit = await checkLoginRateLimit(ip);
  if (!underLimit) {
    return NextResponse.json({ error: 'Too many failed attempts. Try again later.' }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = RequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const ok = verifyPassword(parsed.data.password);
  await recordLoginAttempt(ip, ok);

  if (!ok) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE.name, createSessionCookieValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_SESSION_COOKIE.maxAgeSeconds,
  });
  return response;
}
