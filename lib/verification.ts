import 'server-only';
import { randomBytes } from 'crypto';
import { db } from './db/client';
import { verificationTokens, users } from './db/schema';
import { and, eq, gt, isNull } from 'drizzle-orm';
import { sendMail, buildVerificationEmail } from './mailer';

const TOKEN_TTL_HOURS = 24;

function getAppUrl() {
  return (
    process.env.NEXT_PUBLIC_APP_URL
  ).replace(/\/$/, '');
}

export async function createVerificationToken(userId: number) {
  const token = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + TOKEN_TTL_HOURS * 60 * 60 * 1000);
  await db.insert(verificationTokens).values({
    userId,
    token,
    purpose: 'email_verify',
    expiresAt,
  });
  return token;
}

export async function sendVerificationEmail(userId: number, email: string, name: string) {
  const token = await createVerificationToken(userId);
  const link = `${getAppUrl()}/api/auth/verify?token=${token}`;
  await sendMail({
    to: email,
    subject: 'Verify your email for Comment tools',
    html: buildVerificationEmail(name, link),
  });
}

export async function consumeVerificationToken(token: string) {
  const now = new Date();
  const rows = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.token, token),
        eq(verificationTokens.purpose, 'email_verify'),
        isNull(verificationTokens.consumedAt),
        gt(verificationTokens.expiresAt, now)
      )
    )
    .limit(1);

  const record = rows[0];
  if (!record) return null;

  await db
    .update(verificationTokens)
    .set({ consumedAt: now })
    .where(eq(verificationTokens.id, record.id));

  await db
    .update(users)
    .set({ emailVerified: true, emailVerifiedAt: now })
    .where(eq(users.id, record.userId));

  return record.userId;
}
