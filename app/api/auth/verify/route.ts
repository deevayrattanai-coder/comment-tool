import { NextResponse } from 'next/server';
import { consumeVerificationToken } from '@/lib/verification';
import { createSession } from '@/lib/auth';

function getAppUrl() {
  return (
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'http://localhost:5000'
  ).replace(/\/$/, '');
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(`${getAppUrl()}/verify?status=invalid`);
  }

  try {
    const userId = await consumeVerificationToken(token);
    if (!userId) {
      return NextResponse.redirect(`${getAppUrl()}/verify?status=expired`);
    }
    // Auto-login the user after successful verification
    await createSession(userId);
    return NextResponse.redirect(`${getAppUrl()}/verify?status=success`);
  } catch (err) {
    return NextResponse.redirect(`${getAppUrl()}/verify?status=invalid`);
  }
}
