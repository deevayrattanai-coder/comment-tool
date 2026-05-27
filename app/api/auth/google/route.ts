import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  // Allow the caller (login page) to tell us where to redirect after auth.
  const next = url.searchParams.get("next") || "/profile";

  // Generate a CSRF nonce and store it alongside the next-path in a
  // short-lived httpOnly cookie so the callback can validate both.
  const nonce = crypto.randomBytes(16).toString("hex");
  const cookieStore = await cookies();
  cookieStore.set(
    "oauth_state",
    JSON.stringify({ nonce, next }),
    {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 10, // 10 minutes
      secure: process.env.NODE_ENV === "production",
    }
  );

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    // Only the nonce is sent as the OAuth state — the next-path stays server-side.
    state: nonce,
  });

  return NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params}`
  );
}
