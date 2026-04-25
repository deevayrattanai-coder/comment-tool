import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';
import { db } from './db/client';
import { users } from './db/schema';
import { eq } from 'drizzle-orm';

const SESSION_COOKIE = 'cc_session';

function getSecret() {
  const s = process.env.SESSION_SECRET || process.env.AUTH_SECRET;
  if (!s) throw new Error('SESSION_SECRET environment variable is required');
  return new TextEncoder().encode(s);
}

export async function hashPassword(plain: string) {
  return bcrypt.hash(plain, 10);
}
export async function verifyPassword(plain: string, hash: string) {
  return bcrypt.compare(plain, hash);
}

export async function createSession(userId: number) {
  const token = await new SignJWT({ uid: userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(getSecret());
  const c = await cookies();
  c.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function destroySession() {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

export async function getCurrentUser() {
  try {
    const c = await cookies();
    const tok = c.get(SESSION_COOKIE)?.value;
    if (!tok) return null;
    const { payload } = await jwtVerify(tok, getSecret());
    const uid = Number(payload.uid);
    if (!uid) return null;
    const result = await db.select().from(users).where(eq(users.id, uid)).limit(1);
    return result[0] ?? null;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const u = await getCurrentUser();
  if (!u) throw new Error('UNAUTHORIZED');
  return u;
}
