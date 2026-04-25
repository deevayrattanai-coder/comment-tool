import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/client';
import { exports_, PLAN_LIMITS, type PlanKey } from '@/lib/db/schema';
import { and, eq, gte, sql, desc } from 'drizzle-orm';
import { getCurrentUser } from '@/lib/auth';

const Body = z.object({
  platform: z.string().min(1).max(32),
  subMode: z.string().min(1).max(64),
  mode: z.enum(['single', 'bulk']).default('single'),
  count: z.number().int().min(1).max(1000).default(1),
});

function startOfMonthUtc() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1));
}

export async function GET() {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await db
    .select()
    .from(exports_)
    .where(eq(exports_.userId, me.id))
    .orderBy(desc(exports_.createdAt))
    .limit(100);
  const since = startOfMonthUtc();
  const monthRow = await db
    .select({ total: sql<number>`COALESCE(SUM(${exports_.count}), 0)` })
    .from(exports_)
    .where(and(eq(exports_.userId, me.id), gte(exports_.createdAt, since)));
  const monthTotal = Number(monthRow[0]?.total ?? 0);
  const plan = (me.plan as PlanKey) ?? 'free';
  const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
  return NextResponse.json({
    exports: rows,
    usage: {
      monthTotal,
      limit: Number.isFinite(limits.exportsPerMonth) ? limits.exportsPerMonth : null,
      plan,
      bulkAllowed: limits.bulkAllowed,
    },
  });
}

export async function POST(req: Request) {
  const me = await getCurrentUser();
  if (!me) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const data = Body.parse(await req.json());
    const plan = (me.plan as PlanKey) ?? 'free';
    const limits = PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;

    if (data.mode === 'bulk' && !limits.bulkAllowed) {
      return NextResponse.json(
        { error: 'Bulk export is not available on the Free plan. Please upgrade to Pro.', upgrade: true },
        { status: 403 },
      );
    }

    const since = startOfMonthUtc();
    const monthRow = await db
      .select({ total: sql<number>`COALESCE(SUM(${exports_.count}), 0)` })
      .from(exports_)
      .where(and(eq(exports_.userId, me.id), gte(exports_.createdAt, since)));
    const monthTotal = Number(monthRow[0]?.total ?? 0);

    if (Number.isFinite(limits.exportsPerMonth) && monthTotal + data.count > limits.exportsPerMonth) {
      return NextResponse.json(
        {
          error: `You've reached your ${limits.label} plan monthly limit (${limits.exportsPerMonth} exports). Please purchase a higher plan to continue.`,
          upgrade: true,
          monthTotal,
          limit: limits.exportsPerMonth,
        },
        { status: 403 },
      );
    }

    await db.insert(exports_).values({
      userId: me.id,
      platform: data.platform,
      subMode: data.subMode,
      mode: data.mode,
      count: data.count,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.issues) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    return NextResponse.json({ error: e?.message ?? 'Server error' }, { status: 500 });
  }
}
