import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, createSession } from '@/lib/auth';
import { z } from 'zod';

const Body = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(120),
  password: z.string().min(6).max(200),
});

export async function POST(req: Request) {
  try {
    const data = Body.parse(await req.json());
    const existing = await db.select().from(users).where(eq(users.email, data.email)).limit(1);
    if (existing[0]) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    const hash = await hashPassword(data.password);
    const inserted = await db
      .insert(users)
      .values({ email: data.email, name: data.name, passwordHash: hash })
      .returning();
    await createSession(inserted[0].id);
    return NextResponse.json({
      user: {
        id: inserted[0].id,
        email: inserted[0].email,
        name: inserted[0].name,
        plan: inserted[0].plan,
      },
    });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ error: 'Invalid input', details: e.issues }, { status: 400 });
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
