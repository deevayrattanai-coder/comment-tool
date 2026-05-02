import 'server-only';
import crypto from 'node:crypto';

/**
 * Tiny, dependency-free Razorpay server helper.
 *
 * Why no SDK?
 *   - Keeps the patch surface small.
 *   - Razorpay's REST surface for orders + signature verification is trivial.
 *   - Less third-party code = smaller supply-chain risk.
 *
 * SECURITY NOTES
 *   - RAZORPAY_KEY_SECRET is *never* exposed to the client. We only ever
 *     send NEXT_PUBLIC_RAZORPAY_KEY_ID to the browser.
 *   - Signature verification uses HMAC-SHA256 with timing-safe comparison.
 *   - Amounts are computed from server-side PLAN_PRICING — the client
 *     never sends an amount.
 */

const API_BASE = 'https://api.razorpay.com/v1';

function getCreds(): { keyId: string; keySecret: string } {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    throw new Error('RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables are required');
  }
  return { keyId, keySecret };
}

export function getPublicKeyId(): string {
  // Used by the client component to initialize the Razorpay checkout.
  // We prefer the explicitly-public env var, but fall back to the same
  // KEY_ID since it's already considered safe to expose.
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY_ID ||
    ''
  );
}

export type RazorpayOrder = {
  id: string;
  entity: 'order';
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string | null;
  status: string;
  attempts: number;
  notes: Record<string, string>;
  created_at: number;
};

export async function createRazorpayOrder(opts: {
  amount: number; // smallest currency unit (paise)
  currency: string;
  receipt: string;
  notes?: Record<string, string>;
}): Promise<RazorpayOrder> {
  const { keyId, keySecret } = getCreds();
  const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify({
      amount: opts.amount,
      currency: opts.currency,
      receipt: opts.receipt,
      notes: opts.notes ?? {},
      payment_capture: 1,
    }),
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Razorpay order creation failed (${res.status}): ${text.slice(0, 500)}`);
  }
  return (await res.json()) as RazorpayOrder;
}

/**
 * Verify the checkout response signature.
 * Razorpay docs: signature = HMAC_SHA256(`${order_id}|${payment_id}`, key_secret)
 */
export function verifyCheckoutSignature(opts: {
  orderId: string;
  paymentId: string;
  signature: string;
}): boolean {
  if (!opts.orderId || !opts.paymentId || !opts.signature) return false;
  const { keySecret } = getCreds();
  const expected = crypto
    .createHmac('sha256', keySecret)
    .update(`${opts.orderId}|${opts.paymentId}`)
    .digest('hex');
  return safeEqualHex(expected, opts.signature);
}

/**
 * Verify an incoming webhook body against the X-Razorpay-Signature header.
 * Uses RAZORPAY_WEBHOOK_SECRET (configured per-webhook in the Razorpay dashboard).
 */
export function verifyWebhookSignature(rawBody: string, signature: string): boolean {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !signature) return false;
  const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
  return safeEqualHex(expected, signature);
}

function safeEqualHex(a: string, b: string): boolean {
  // Length-check first so timingSafeEqual doesn't throw.
  if (a.length !== b.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(a, 'hex'), Buffer.from(b, 'hex'));
  } catch {
    return false;
  }
}
