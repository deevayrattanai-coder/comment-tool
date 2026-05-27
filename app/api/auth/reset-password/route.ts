import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { users, verificationTokens } from '@/lib/db/schema';
import { and, eq, gt, isNull } from 'drizzle-orm';
import { hashPassword, createSession } from '@/lib/auth';

const Body = z.object({
  token: z.string().min(32).max(128),
  password: z.string().min(6).max(200),
});

/**
 * Consume a password-reset token and set a new password.
 * Also auto-logs the user in so they land directly on their dashboard.
 */
export async function POST(req: Request) {
  try {
    const { token, password } = Body.parse(await req.json());

    const now = new Date();
    const rows = await db
      .select()
      .from(verificationTokens)
      .where(
        and(
          eq(verificationTokens.token, token),
          eq(verificationTokens.purpose, 'password_reset'),
          isNull(verificationTokens.consumedAt),
          gt(verificationTokens.expiresAt, now),
        ),
      )
      .limit(1);

    const record = rows[0];
    if (!record) {
      return NextResponse.json(
        { error: 'This link is invalid or has expired. Please request a new one.' },
        { status: 400 },
      );
    }

    // Mark token consumed
    await db
      .update(verificationTokens)
      .set({ consumedAt: now })
      .where(eq(verificationTokens.id, record.id));

    // Set new password and mark email verified (covers Google-only users setting a password)
    const newHash = await hashPassword(password);
    await db
      .update(users)
      .set({ passwordHash: newHash, emailVerified: true })
      .where(eq(users.id, record.userId));

    // Auto-login
    await createSession(record.userId);

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.issues)
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
