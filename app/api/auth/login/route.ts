import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { verifyPassword, createSession } from '@/lib/auth';
import { effectivePlan } from '@/lib/plan';
import { z } from 'zod';

const Body = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: Request) {
  try {
    const data = Body.parse(await req.json());
    const result = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    const u = result[0];

    if (!u || !u.passwordHash || !(await verifyPassword(data.password, u.passwordHash))) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    if (!u.emailVerified) {
      return NextResponse.json(
        {
          error: 'Please verify your email before logging in.',
          requiresVerification: true,
          email: u.email,
        },
        { status: 403 }
      );
    }

    await createSession(u.id);
    return NextResponse.json({
      user: {
        id: u.id,
        email: u.email,
        name: u.name,
        plan: effectivePlan(u),
        planExpiresAt: u.planExpiresAt
          ? new Date(u.planExpiresAt).toISOString()
          : null,
      },
    });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
