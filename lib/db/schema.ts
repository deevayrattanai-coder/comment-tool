import { pgTable, serial, text, timestamp, integer, varchar, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  passwordHash: text('password_hash').notNull(),
  plan: varchar('plan', { length: 32 }).notNull().default('free'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const exports_ = pgTable('exports', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  platform: varchar('platform', { length: 32 }).notNull(),
  subMode: varchar('sub_mode', { length: 64 }).notNull(),
  mode: varchar('mode', { length: 16 }).notNull().default('single'),
  count: integer('count').notNull().default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type ExportRecord = typeof exports_.$inferSelect;

export const PLAN_LIMITS = {
  free: { exportsPerMonth: 5, bulkAllowed: false, label: 'Free' },
  pro: { exportsPerMonth: 500, bulkAllowed: true, label: 'Pro' },
  business: { exportsPerMonth: Infinity, bulkAllowed: true, label: 'Business' },
} as const;

export type PlanKey = keyof typeof PLAN_LIMITS;
