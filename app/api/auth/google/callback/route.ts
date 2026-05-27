import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const returnedNonce = url.searchParams.get("state");
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  // --- CSRF: validate the nonce against the stored cookie ---
  const cookieStore = await cookies();
  const raw = cookieStore.get("oauth_state")?.value;
  cookieStore.delete("oauth_state"); // always consume, even on failure

  let storedNonce = "";
  let next = "/profile";
  try {
    if (raw) {
      const parsed = JSON.parse(raw) as { nonce: string; next: string };
      storedNonce = parsed.nonce ?? "";
      next = parsed.next?.startsWith("/") ? parsed.next : "/profile";
    }
  } catch {
    // malformed cookie — treat as missing
  }

  if (!storedNonce || storedNonce !== returnedNonce) {
    return NextResponse.redirect(`${baseUrl}/login?error=state_mismatch`);
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=google_failed`);
  }

  try {
    // Exchange code for tokens
    const body = new URLSearchParams();
    body.append("code", code);
    body.append("client_id", process.env.GOOGLE_CLIENT_ID!);
    body.append("client_secret", process.env.GOOGLE_CLIENT_SECRET!);
    body.append("redirect_uri", `${baseUrl}/api/auth/google/callback`);
    body.append("grant_type", "authorization_code");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return NextResponse.redirect(`${baseUrl}/login?error=google_failed`);
    }

    // Fetch Google profile
    const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await userRes.json();

    const email: string | undefined = profile.email;
    const googleId: string | undefined = profile.id;
    const name: string = profile.name || "User";
    const avatarUrl: string | undefined = profile.picture;

    if (!email || !googleId) {
      return NextResponse.redirect(`${baseUrl}/login?error=no_email`);
    }

    // Look up by googleId first, then fall back to email (account linking)
    let existing = await db
      .select()
      .from(users)
      .where(eq(users.googleId, googleId))
      .limit(1);

    if (!existing[0]) {
      existing = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    }

    let user = existing[0];

    if (user) {
      // Merge Google data into existing account (link googleId, sync avatar)
      const updates: Partial<typeof users.$inferInsert> = {};
      if (!user.googleId) updates.googleId = googleId;
      if (!user.avatarUrl && avatarUrl) updates.avatarUrl = avatarUrl;
      if (!user.emailVerified) updates.emailVerified = true;

      if (Object.keys(updates).length > 0) {
        await db.update(users).set(updates).where(eq(users.id, user.id));
      }
    } else {
      // Brand-new user — create account (pre-verified via Google)
      const inserted = await db
        .insert(users)
        .values({ email, name, googleId, avatarUrl: avatarUrl ?? null, emailVerified: true })
        .returning();
      user = inserted[0];
    }

    await createSession(user.id);
    return NextResponse.redirect(`${baseUrl}${next}`);
  } catch (err: any) {
    console.error("Google auth error:", err);
    return NextResponse.redirect(`${baseUrl}/login?error=google_failed`);
  }
}
