import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { users, PLAN_LIMITS } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

/**
 * Self-service downgrade endpoint.
 *
 * After Razorpay was integrated, plan UPGRADES are *only* allowed via the
 * verified payment path (`/api/billing/razorpay/verify` or webhook). This
 * endpoint now accepts the `free` plan only — used by the user to cancel /
 * downgrade their account from the profile page.
 */
const Body = z.object({ plan: z.literal('free') });

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const { plan } = Body.parse(await req.json());
    await db
      .update(users)
      .set({ plan, planExpiresAt: null })
      .where(eq(users.id, me.id));
    return NextResponse.json({ ok: true, plan, label: PLAN_LIMITS[plan].label });
  } catch (e: any) {
    if (e?.issues) {
      return NextResponse.json(
        {
          error:
            'Plan upgrades must go through the Razorpay checkout. Use /api/billing/razorpay/order then /api/billing/razorpay/verify.',
        },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
