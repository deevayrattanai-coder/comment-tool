import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser, hashPassword, verifyPassword } from '@/lib/auth';

const Body = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6).max(200),
});

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = Body.parse(await req.json());
    const ok = await verifyPassword(data.currentPassword, me.passwordHash);
    if (!ok) return NextResponse.json({ error: 'Current password is incorrect' }, { status: 400 });
    const newHash = await hashPassword(data.newPassword);
    await db.update(users).set({ passwordHash: newHash }).where(eq(users.id, me.id));
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
