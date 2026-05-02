import 'server-only';
import { db } from './db/client';
import {
  exports_,
  PLAN_LIMITS,
  FREE_DAILY_PLATFORM_LIMITS,
  type PlanKey,
  type User,
} from './db/schema';
import { and, eq, gte, sql } from 'drizzle-orm';

export const ROLLING_WINDOW_MS = 24 * 60 * 60 * 1000;

/**
 * Compute the user's *effective* plan.
 *
 *   - Returns 'free' if their paid plan has expired.
 *   - Returns the stored plan otherwise.
 *
 * NOTE: We never mutate the DB on read. The plan column is the historical
 * record; effective plan is derived. Webhook / verify endpoint refresh
 * plan + planExpiresAt on successful payment.
 */
export function effectivePlan(user: Pick<User, 'plan' | 'planExpiresAt'>): PlanKey {
  const stored = (user.plan as PlanKey) ?? 'free';
  if (stored === 'free') return 'free';
  if (!user.planExpiresAt) return stored; // safety: treat as still active if unset
  if (user.planExpiresAt.getTime() <= Date.now()) return 'free';
  return stored;
}

export function planConfig(plan: PlanKey) {
  return PLAN_LIMITS[plan] ?? PLAN_LIMITS.free;
}

/**
 * Per-platform rolling-window usage for a free user.
 * Returns count + nextResetAt (ISO) per known platform.
 */
export async function getFreeUsage(userId: number) {
  const since = new Date(Date.now() - ROLLING_WINDOW_MS);

  // Aggregated count per platform in the last 24h.
  const rows = await db
    .select({
      platform: exports_.platform,
      total: sql<number>`COALESCE(SUM(${exports_.count}), 0)`,
      oldestAt: sql<Date>`MIN(${exports_.createdAt})`,
    })
    .from(exports_)
    .where(and(eq(exports_.userId, userId), gte(exports_.createdAt, since)))
    .groupBy(exports_.platform);

  const byPlatform: Record<
    string,
    { used: number; limit: number; remaining: number; nextResetAt: string | null }
  > = {};

  for (const [platform, limit] of Object.entries(FREE_DAILY_PLATFORM_LIMITS)) {
    byPlatform[platform] = {
      used: 0,
      limit,
      remaining: limit,
      nextResetAt: null,
    };
  }

  for (const row of rows) {
    const limit = FREE_DAILY_PLATFORM_LIMITS[row.platform];
    if (limit == null) continue; // unknown platform — ignore for limits
    const used = Number(row.total);
    const remaining = Math.max(0, limit - used);
    byPlatform[row.platform] = {
      used,
      limit,
      remaining,
      nextResetAt:
        row.oldestAt
          ? new Date(new Date(row.oldestAt).getTime() + ROLLING_WINDOW_MS).toISOString()
          : null,
    };
  }

  return byPlatform;
}

/**
 * Check if a free user can make a single export of the given platform.
 * Returns either { ok: true } or { ok: false, message, retryAfterMs }.
 */
export async function checkFreeQuota(
  userId: number,
  platform: string,
  count: number,
): Promise<
  | { ok: true }
  | { ok: false; message: string; retryAfterMs: number; nextResetAt: string }
> {
  const limit = FREE_DAILY_PLATFORM_LIMITS[platform];
  if (limit == null) {
    // Free plan is restricted to known platforms.
    return {
      ok: false,
      message: `The Free plan does not include exports for "${platform}". Please upgrade.`,
      retryAfterMs: 0,
      nextResetAt: new Date(Date.now() + ROLLING_WINDOW_MS).toISOString(),
    };
  }

  const since = new Date(Date.now() - ROLLING_WINDOW_MS);
  const row = await db
    .select({
      total: sql<number>`COALESCE(SUM(${exports_.count}), 0)`,
      oldestAt: sql<Date>`MIN(${exports_.createdAt})`,
    })
    .from(exports_)
    .where(
      and(
        eq(exports_.userId, userId),
        eq(exports_.platform, platform),
        gte(exports_.createdAt, since),
      ),
    );

  const used = Number(row[0]?.total ?? 0);
  if (used + count > limit) {
    const oldestAt = row[0]?.oldestAt ? new Date(row[0]!.oldestAt) : new Date();
    const nextResetAt = new Date(oldestAt.getTime() + ROLLING_WINDOW_MS);
    const retryAfterMs = Math.max(0, nextResetAt.getTime() - Date.now());
    const hours = Math.ceil(retryAfterMs / (60 * 60 * 1000));
    return {
      ok: false,
      message: `You've used your free ${limit} ${platform} export${
        limit === 1 ? '' : 's'
      } for the day. New credits in ~${hours}h, or upgrade for unlimited exports.`,
      retryAfterMs,
      nextResetAt: nextResetAt.toISOString(),
    };
  }
  return { ok: true };
}
