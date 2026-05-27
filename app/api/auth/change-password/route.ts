import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser, hashPassword, verifyPassword } from '@/lib/auth';

const SetPasswordBody = z.object({
  newPassword: z.string().min(6).max(200),
  // currentPassword is optional for Google-only accounts that are setting a
  // password for the first time.
  currentPassword: z.string().min(1).optional(),
});

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = SetPasswordBody.parse(await req.json());

    if (me.passwordHash) {
      // Standard account — must verify the existing password.
      if (!data.currentPassword) {
        return NextResponse.json(
          { error: 'Current password is required' },
          { status: 400 }
        );
      }
      const ok = await verifyPassword(data.currentPassword, me.passwordHash);
      if (!ok) {
        return NextResponse.json(
          { error: 'Current password is incorrect' },
          { status: 400 }
        );
      }
    }
    // Google-only accounts (passwordHash === null) may set a password without
    // providing the current one — they've already proven identity via Google.

    const newHash = await hashPassword(data.newPassword);
    await db
      .update(users)
      .set({ passwordHash: newHash })
      .where(eq(users.id, me.id));

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.issues)
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    return NextResponse.json(
      { error: e?.message ?? 'Server error' },
      { status: 500 }
    );
  }
}
