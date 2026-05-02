import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("state") || "/profile";
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=google_failed`);
  }

  try {
    // ✅ FIXED: Proper URL encoded body
    const body = new URLSearchParams();
    body.append("code", code);
    body.append("client_id", process.env.GOOGLE_CLIENT_ID!);
    body.append("client_secret", process.env.GOOGLE_CLIENT_SECRET!);
    body.append("redirect_uri", `${baseUrl}/api/auth/google/callback`);
    body.append("grant_type", "authorization_code");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(), 
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.redirect(`${baseUrl}/login?error=google_failed`);
    }

    // ✅ Get user info
    const userRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      }
    );

    const profile = await userRes.json();

    const email = profile.email;
    const name = profile.name || "User";

    if (!email) {
      return NextResponse.redirect(`${baseUrl}/login?error=no_email`);
    }

    // ✅ Check existing user
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let user = existing[0];

    // ✅ Create user if not exists
    if (!user) {
      const inserted = await db
        .insert(users)
        .values({
          email,
          name,
          emailVerified: true,
        })
        .returning();

      user = inserted[0];
    }

    // ✅ Create session
    await createSession(user.id);

    // ✅ Redirect
    return NextResponse.redirect(`${baseUrl}${next}`);

  } catch (err: any) {
    console.error("Auth error:", err);

    if (
      err?.message?.includes("connect") ||
      err?.routine === "ClientAuthentication"
    ) {
      return NextResponse.redirect(`${baseUrl}/login?error=db_error`);
    }

    return NextResponse.redirect(`${baseUrl}/login?error=google_failed`);
  }
}