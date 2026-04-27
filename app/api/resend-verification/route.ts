import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { sendVerificationEmail } from '@/lib/verification';
import { z } from 'zod';

const Body = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  try {
    const { email } = Body.parse(await req.json());
    const found = await db.select().from(users).where(eq(users.email, email)).limit(1);
    const u = found[0];

    // Always respond OK to avoid email enumeration
    if (!u || u.emailVerified) {
      return NextResponse.json({ ok: true });
    }

    await sendVerificationEmail(u.id, u.email, u.name);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
