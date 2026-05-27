CREATE TABLE "exports" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"platform" varchar(32) NOT NULL,
	"sub_mode" varchar(64) NOT NULL,
	"mode" varchar(16) DEFAULT 'single' NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"plan" varchar(32) DEFAULT 'free' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "exports" ADD CONSTRAINT "exports_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;


-- Migration: add Google auth fields, email verification, plan expiry,
--            verification_tokens table, and payments table.
-- Run with: pnpm --filter @workspace/db run push  (or drizzle-kit migrate)

-- 1. Relax password_hash so Google-only users don't need one.


-- ==========Latest  New Added  migration: 0000_sour_reaper.sql==========


ALTER TABLE "users"
  ALTER COLUMN "password_hash" DROP NOT NULL;

-- 2. Google OAuth fields.
ALTER TABLE "users"
  ADD COLUMN IF NOT EXISTS "google_id"          varchar(64)  UNIQUE,
  ADD COLUMN IF NOT EXISTS "avatar_url"          text,
  ADD COLUMN IF NOT EXISTS "email_verified"      boolean      NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS "email_verified_at"   timestamp,
  ADD COLUMN IF NOT EXISTS "plan_expires_at"     timestamp;

-- 3. Backfill: existing email/password users are considered verified.
UPDATE "users"
  SET "email_verified" = true
  WHERE "password_hash" IS NOT NULL AND "email_verified" = false;

-- 4. Indexes for Google lookup.
CREATE INDEX IF NOT EXISTS "users_google_id_idx" ON "users" ("google_id");

-- 5. Verification tokens table.
CREATE TABLE IF NOT EXISTS "verification_tokens" (
  "id"           serial PRIMARY KEY NOT NULL,
  "user_id"      integer NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "token"        varchar(128) NOT NULL,
  "purpose"      varchar(32)  NOT NULL DEFAULT 'email_verify',
  "expires_at"   timestamp    NOT NULL,
  "consumed_at"  timestamp,
  "created_at"   timestamp    NOT NULL DEFAULT now(),
  CONSTRAINT "verification_tokens_token_unique" UNIQUE ("token")
);

-- 6. Payments table.
CREATE TABLE IF NOT EXISTS "payments" (
  "id"                    serial PRIMARY KEY NOT NULL,
  "user_id"               integer NOT NULL REFERENCES "users"("id") ON DELETE cascade,
  "razorpay_order_id"     varchar(64)  NOT NULL,
  "razorpay_payment_id"   varchar(64),
  "razorpay_signature"    varchar(255),
  "amount"                integer      NOT NULL,
  "currency"              varchar(8)   NOT NULL DEFAULT 'INR',
  "plan"                  varchar(32)  NOT NULL,
  "status"                varchar(16)  NOT NULL DEFAULT 'created',
  "notes"                 text,
  "created_at"            timestamp    NOT NULL DEFAULT now(),
  "verified_at"           timestamp
);

-- Unique + lookup indexes for payments.
CREATE UNIQUE INDEX IF NOT EXISTS "payments_order_id_unique"
  ON "payments" ("razorpay_order_id");

-- razorpay_payment_id is nullable (NULL before payment), so a partial unique
-- index only covers non-NULL values — the correct approach in PostgreSQL.
CREATE UNIQUE INDEX IF NOT EXISTS "payments_payment_id_unique"
  ON "payments" ("razorpay_payment_id")
  WHERE "razorpay_payment_id" IS NOT NULL;

CREATE INDEX IF NOT EXISTS "payments_user_created_idx"
  ON "payments" ("user_id", "created_at");

CREATE INDEX IF NOT EXISTS "exports_user_created_idx"
  ON "exports" ("user_id", "created_at");

CREATE INDEX IF NOT EXISTS "exports_user_platform_created_idx"
  ON "exports" ("user_id", "platform", "created_at");
