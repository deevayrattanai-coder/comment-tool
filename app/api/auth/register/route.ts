import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from '@/lib/auth';
import { sendVerificationEmail } from '@/lib/verification';
import { z } from 'zod';

const Body = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120),
  password: z.string().min(6).max(200),
});

export async function POST(req: Request) {
  try {
    const data = Body.parse(await req.json());

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, data.email))
      .limit(1);

    if (existing[0]) {
      const user = existing[0];

      // Account was created via Google (no password set, already verified).
      // Trying to re-register with the same email should prompt Google login
      // instead of silently failing or leaking state.
      if (user.emailVerified && !user.passwordHash) {
        return NextResponse.json(
          {
            error:
              'This email is linked to a Google account. Please sign in with Google.',
            hint: 'google',
          },
          { status: 409 }
        );
      }

      // Account exists and is verified — treat as duplicate.
      if (user.emailVerified) {
        return NextResponse.json(
          { error: 'Email already registered' },
          { status: 409 }
        );
      }

      // Account exists but not yet verified — resend the verification email.
      try {
        await sendVerificationEmail(user.id, user.email, user.name);
      } catch (err) {
        console.error('resend verification on register failed', err);
      }
      return NextResponse.json({
        requiresVerification: true,
        email: user.email,
        message: 'Account already exists but is unverified. We sent a new verification link.',
      });
    }

    const hash = await hashPassword(data.password);
    const inserted = await db
      .insert(users)
      .values({
        email: data.email,
        name: data.name,
        passwordHash: hash,
        emailVerified: false,
      })
      .returning();

    const newUser = inserted[0];

    try {
      await sendVerificationEmail(newUser.id, newUser.email, newUser.name);
    } catch {
      return NextResponse.json(
        {
          error:
            'Account created but verification email could not be sent. Please try resending it.',
          requiresVerification: true,
          email: newUser.email,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      requiresVerification: true,
      email: newUser.email,
      message: 'Check your inbox for a verification link to activate your account.',
    });
  } catch (e: any) {
    if (e?.issues)
      return NextResponse.json(
        { error: 'Invalid input', details: e.issues },
        { status: 400 }
      );
    return NextResponse.json(
      { error: e?.message ?? 'Server error' },
      { status: 500 }
    );
  }
}
