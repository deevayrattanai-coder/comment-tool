import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { users, PLAN_LIMITS } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const Body = z.object({ plan: z.enum(['free', 'pro', 'business']) });

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { plan } = Body.parse(await req.json());
    await db.update(users).set({ plan }).where(eq(users.id, me.id));
    return NextResponse.json({ ok: true, plan, label: PLAN_LIMITS[plan].label });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
