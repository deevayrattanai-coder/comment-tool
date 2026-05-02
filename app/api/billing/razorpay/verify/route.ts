import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { payments, users, PLAN_PRICING } from '@/lib/db/schema';
import { and, eq } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import { verifyCheckoutSignature } from '@/lib/razorpay';

const Body = z.object({
  razorpay_order_id: z.string().min(8).max(64),
  razorpay_payment_id: z.string().min(8).max(64),
  razorpay_signature: z.string().min(8).max(255),
});

/**
 * Verify a Razorpay checkout response.
 *
 * Flow:
 *   1. Verify HMAC signature (timing-safe).
 *   2. Look up the matching `payments` row by order_id.
 *   3. Make sure it belongs to the current user (prevents cross-user attacks).
 *   4. Mark the row as `paid` (idempotent — re-running is a no-op).
 *   5. Upgrade the user's plan + set planExpiresAt.
 */
export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  // 1. Signature check.
  const sigOk = verifyCheckoutSignature({
    orderId: body.razorpay_order_id,
    paymentId: body.razorpay_payment_id,
    signature: body.razorpay_signature,
  });
  if (!sigOk) {
    return NextResponse.json({ error: 'Signature verification failed' }, { status: 400 });
  }

  // 2 + 3. Order must exist and belong to this user.
  const orderRow = await db
    .select()
    .from(payments)
    .where(
      and(
        eq(payments.razorpayOrderId, body.razorpay_order_id),
        eq(payments.userId, me.id),
      ),
    )
    .limit(1);
  const payment = orderRow[0];
  if (!payment) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  // Already verified — return success idempotently.
  if (payment.status === 'paid') {
    return NextResponse.json({
      ok: true,
      plan: payment.plan,
      alreadyVerified: true,
    });
  }

  const pricing =
    PLAN_PRICING[payment.plan as keyof typeof PLAN_PRICING] ??
    PLAN_PRICING.monthly;

  const now = new Date();
  const newExpiry = new Date(
    now.getTime() + pricing.durationDays * 24 * 60 * 60 * 1000,
  );

  // 4. Mark payment row as paid (idempotent on payment_id via unique idx).
  await db
    .update(payments)
    .set({
      razorpayPaymentId: body.razorpay_payment_id,
      razorpaySignature: body.razorpay_signature,
      status: 'paid',
      verifiedAt: now,
    })
    .where(eq(payments.id, payment.id));

  // 5. Upgrade the user. If they already have time left on a plan, extend
  //    instead of overwriting.
  const meRow = await db
    .select()
    .from(users)
    .where(eq(users.id, me.id))
    .limit(1);
  const current = meRow[0];
  let nextExpiry = newExpiry;
  if (
    current?.planExpiresAt &&
    current.plan === payment.plan &&
    new Date(current.planExpiresAt).getTime() > now.getTime()
  ) {
    nextExpiry = new Date(
      new Date(current.planExpiresAt).getTime() +
        pricing.durationDays * 24 * 60 * 60 * 1000,
    );
  }

  await db
    .update(users)
    .set({ plan: payment.plan, planExpiresAt: nextExpiry })
    .where(eq(users.id, me.id));

  return NextResponse.json({
    ok: true,
    plan: payment.plan,
    planExpiresAt: nextExpiry.toISOString(),
  });
}
