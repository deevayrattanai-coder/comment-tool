import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { effectivePlan } from '@/lib/plan';

export async function GET() {
  const u = await getCurrentUser();
  if (!u) return NextResponse.json({ user: null });
  // Surface the *effective* plan so the UI auto-downgrades when an
  // expired paid plan is detected.
  const plan = effectivePlan(u);
  return NextResponse.json({
    user: {
      id: u.id,
      email: u.email,
      name: u.name,
      plan,
      planExpiresAt: u.planExpiresAt
        ? new Date(u.planExpiresAt).toISOString()
        : null,
    },
  });
}
