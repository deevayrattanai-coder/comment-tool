import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { payments, PLAN_PRICING } from '@/lib/db/schema';
import { getCurrentUser } from '@/lib/auth';
import { createRazorpayOrder, getPublicKeyId } from '@/lib/razorpay';

const Body = z.object({
  plan: z.enum(['monthly', 'annual']),
});

/**
 * Create a Razorpay order for the requested plan.
 * The amount is read from server-side PLAN_PRICING — the client cannot
 * choose what they pay.
 */
export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
  }

  const pricing = PLAN_PRICING[body.plan];
  if (!pricing) return NextResponse.json({ error: 'Unknown plan' }, { status: 400 });

  // Razorpay receipts must be <= 40 chars.
  const receipt = `u${me.id}_${body.plan}_${Date.now()}`.slice(0, 40);

  let order;
  try {
    order = await createRazorpayOrder({
      amount: pricing.amount,
      currency: pricing.currency,
      receipt,
      notes: { userId: String(me.id), plan: body.plan },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: 'Could not create payment order. Please try again.' },
      { status: 502 },
    );
  }

  // Record the order so we can later verify and reconcile.
  await db.insert(payments).values({
    userId: me.id,
    razorpayOrderId: order.id,
    amount: pricing.amount,
    currency: pricing.currency,
    plan: body.plan,
    status: 'created',
  });

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: getPublicKeyId(),
    plan: body.plan,
    planLabel: pricing.label,
    user: { name: me.name, email: me.email },
  });
}
