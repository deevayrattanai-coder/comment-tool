import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { users, verificationTokens } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { randomBytes } from 'crypto';
import { sendMail, buildVerificationEmail } from '@/lib/mailer';

const Body = z.object({ email: z.string().email() });

function getAppUrl() {
  return (process.env.NEXT_PUBLIC_APP_URL ?? '').replace(/\/$/, '');
}

export async function POST(req: Request) {
  try {
    const { email } = Body.parse(await req.json());

    const rows = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    const user = rows[0];

    // Silently succeed when user not found (don't reveal account existence).
    if (user) {
      const token = randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.insert(verificationTokens).values({
        userId: user.id,
        token,
        purpose: 'password_reset',
        expiresAt,
      });

      const link = `${getAppUrl()}/reset-password?token=${token}`;
      await sendMail({
        to: email,
        subject: 'Set your password — Comment tools',
        html: buildVerificationEmail(
          user.name,
          link,
          'Set your password',
          'Click the button below to set a new password for your account. This link expires in 1 hour.',
        ),
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'If an account exists for that email, a reset link has been sent.',
    });
  } catch (e: any) {
    if (e?.issues)
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
