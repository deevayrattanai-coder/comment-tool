import { NextResponse } from 'next/server';
import { db } from '@/lib/db/client';
import { payments, users, PLAN_PRICING } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { verifyWebhookSignature } from '@/lib/razorpay';

/**
 * Razorpay webhook receiver.
 *
 * In the Razorpay dashboard, configure a webhook pointing at this route
 * with `payment.captured` (and optionally `payment.failed`) events and the
 * RAZORPAY_WEBHOOK_SECRET env var.
 *
 * The webhook is the *authoritative* source of truth — even if a user
 * closes their browser before the verify call returns, the webhook will
 * still upgrade the plan based on the payment Razorpay actually captured.
 *
 * SECURITY: We must read the raw body BEFORE parsing it because the
 * signature is computed over the raw bytes.
 */
export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get('x-razorpay-signature') ?? '';

  if (!verifyWebhookSignature(raw, sig)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const type: string = event?.event ?? '';
  const paymentEntity = event?.payload?.payment?.entity;
  if (!paymentEntity) {
    // Acknowledge so Razorpay doesn't retry on irrelevant events.
    return NextResponse.json({ ok: true, ignored: true });
  }

  const orderId: string | undefined = paymentEntity.order_id;
  const paymentId: string | undefined = paymentEntity.id;
  if (!orderId || !paymentId) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const payRows = await db
    .select()
    .from(payments)
    .where(eq(payments.razorpayOrderId, orderId))
    .limit(1);
  const payment = payRows[0];
  if (!payment) {
    // Unknown order — ignore but acknowledge so Razorpay stops retrying.
    return NextResponse.json({ ok: true, unknownOrder: true });
  }

  if (type === 'payment.captured' || type === 'order.paid') {
    if (payment.status !== 'paid') {
      const pricing =
        PLAN_PRICING[payment.plan as keyof typeof PLAN_PRICING] ??
        PLAN_PRICING.monthly;
      const now = new Date();
      const newExpiry = new Date(
        now.getTime() + pricing.durationDays * 24 * 60 * 60 * 1000,
      );

      await db
        .update(payments)
        .set({
          razorpayPaymentId: paymentId,
          status: 'paid',
          verifiedAt: now,
        })
        .where(eq(payments.id, payment.id));

      const meRow = await db
        .select()
        .from(users)
        .where(eq(users.id, payment.userId))
        .limit(1);
      const u = meRow[0];
      let nextExpiry = newExpiry;
      if (
        u?.planExpiresAt &&
        u.plan === payment.plan &&
        new Date(u.planExpiresAt).getTime() > now.getTime()
      ) {
        nextExpiry = new Date(
          new Date(u.planExpiresAt).getTime() +
            pricing.durationDays * 24 * 60 * 60 * 1000,
        );
      }
      await db
        .update(users)
        .set({ plan: payment.plan, planExpiresAt: nextExpiry })
        .where(eq(users.id, payment.userId));
    }
  } else if (type === 'payment.failed') {
    if (payment.status !== 'paid') {
      await db
        .update(payments)
        .set({ status: 'failed', razorpayPaymentId: paymentId })
        .where(eq(payments.id, payment.id));
    }
  }

  return NextResponse.json({ ok: true });
}
