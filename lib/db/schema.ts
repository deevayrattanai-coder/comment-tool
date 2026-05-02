import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
  boolean,
  index,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: text('password_hash'),
  googleId: varchar('google_id', { length: 64 }).unique(),
  avatarUrl: text('avatar_url'),
  emailVerified: boolean('email_verified').notNull().default(false),
  emailVerifiedAt: timestamp('email_verified_at'),
  plan: varchar('plan', { length: 32 }).notNull().default('free'),
  planExpiresAt: timestamp('plan_expires_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const verificationTokens = pgTable('verification_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 128 }).notNull().unique(),
  purpose: varchar('purpose', { length: 32 }).notNull().default('email_verify'),
  expiresAt: timestamp('expires_at').notNull(),
  consumedAt: timestamp('consumed_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const exports_ = pgTable(
  'exports',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    platform: varchar('platform', { length: 32 }).notNull(),
    subMode: varchar('sub_mode', { length: 64 }).notNull(),
    mode: varchar('mode', { length: 16 }).notNull().default('single'),
    count: integer('count').notNull().default(1),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (t) => ({
    userCreatedIdx: index('exports_user_created_idx').on(t.userId, t.createdAt),
    userPlatformCreatedIdx: index('exports_user_platform_created_idx').on(
      t.userId,
      t.platform,
      t.createdAt,
    ),
  }),
);

export const payments = pgTable(
  'payments',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    razorpayOrderId: varchar('razorpay_order_id', { length: 64 }).notNull(),
    razorpayPaymentId: varchar('razorpay_payment_id', { length: 64 }),
    razorpaySignature: varchar('razorpay_signature', { length: 255 }),
    amount: integer('amount').notNull(),
    currency: varchar('currency', { length: 8 }).notNull().default('INR'),
    plan: varchar('plan', { length: 32 }).notNull(),
    status: varchar('status', { length: 16 }).notNull().default('created'),
    notes: text('notes'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    verifiedAt: timestamp('verified_at'),
  },
  (t) => ({
    orderIdUnique: uniqueIndex('payments_order_id_unique').on(t.razorpayOrderId),
    paymentIdUnique: uniqueIndex('payments_payment_id_unique').on(t.razorpayPaymentId),
    userCreatedIdx: index('payments_user_created_idx').on(t.userId, t.createdAt),
  }),
);


export type User = typeof users.$inferSelect;
export type ExportRecord = typeof exports_.$inferSelect;
export type Payment = typeof payments.$inferSelect;


export const FREE_DAILY_PLATFORM_LIMITS: Record<string, number> = {
  tiktok: 5,
  instagram: 1,
  youtube: 1,
  twitter: 1,
};


export const PLAN_LIMITS = {
  free: { unlimited: false, bulkAllowed: false, label: 'Free' },
  monthly: { unlimited: true, bulkAllowed: true, label: 'Monthly' },
  annual: { unlimited: true, bulkAllowed: true, label: 'Annual' },
  // Legacy keys (backward compatibility for existing rows)
  pro: { unlimited: true, bulkAllowed: true, label: 'Pro' },
  business: { unlimited: true, bulkAllowed: true, label: 'Business' },
} as const;

export type PlanKey = keyof typeof PLAN_LIMITS;

/**
 * Razorpay pricing (in the smallest currency unit — paise for INR).
 * Adjust here only — server reads these to create orders, so the
 * client cannot tamper with the amount.
 */
export const PLAN_PRICING: Record<
  Exclude<PlanKey, 'free' | 'pro' | 'business'>,
  { amount: number; currency: 'USD'; durationDays: number; label: string }
> = {
  monthly: {
    amount: 400, // $4.00
    currency: 'USD',
    durationDays: 30,
    label: 'Monthly',
  },
  annual: {
    amount: 2000, // $20.00
    currency: 'USD',
    durationDays: 365,
    label: 'Annual',
  },
};