import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { exports_ } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';
import {
  effectivePlan,
  planConfig,
  getFreeUsage,
  checkFreeQuota,
} from '@/lib/plan';

const Body = z.object({
  platform: z.string().min(1).max(32),
  subMode: z.string().min(1).max(64),
  mode: z.enum(['single', 'bulk']).default('single'),
  count: z.number().int().min(1).max(1000).default(1),
});

export async function GET() {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const plan = effectivePlan(me);
  const limits = planConfig(plan);

  const rows = await db
    .select()
    .from(exports_)
    .where(eq(exports_.userId, me.id))
    .orderBy(desc(exports_.createdAt))
    .limit(100);

  const usage =
    plan === 'free'
      ? {
          plan,
          unlimited: false,
          bulkAllowed: limits.bulkAllowed,
          windowHours: 24,
          perPlatform: await getFreeUsage(me.id),
          planExpiresAt: null as string | null,
        }
      : {
          plan,
          unlimited: true,
          bulkAllowed: limits.bulkAllowed,
          windowHours: 24,
          perPlatform: {},
          planExpiresAt: me.planExpiresAt
            ? new Date(me.planExpiresAt).toISOString()
            : null,
        };

  return NextResponse.json({ exports: rows, usage });
}

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let data: z.infer<typeof Body>;
  try {
    data = Body.parse(await req.json());
  } catch (e: any) {
    if (e?.issues) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const plan = effectivePlan(me);
  const limits = planConfig(plan);

  // Bulk gate — only paid plans.
  if (data.mode === 'bulk' && !limits.bulkAllowed) {
    return NextResponse.json(
      {
        error: 'Bulk export is a paid feature. Please upgrade to Monthly or Annual.',
        upgrade: true,
      },
      { status: 403 },
    );
  }

  // Quota check — free plan only (paid plans are unlimited).
  if (!limits.unlimited) {
    const check = await checkFreeQuota(me.id, data.platform, data.count);
    if (check.ok === false) {
      return NextResponse.json(
        {
          error: check.message,
          upgrade: true,
          retryAfterMs: check.retryAfterMs,
          nextResetAt: check.nextResetAt,
        },
        {
          status: 403,
          headers: {
            'Retry-After': String(Math.ceil(check.retryAfterMs / 1000)),
          },
        },
      );
    }
  }

  try {
    await db.insert(exports_).values({
      userId: me.id,
      platform: data.platform,
      subMode: data.subMode,
      mode: data.mode,
      count: data.count,
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? 'Server error' },
      { status: 500 },
    );
  }
}
