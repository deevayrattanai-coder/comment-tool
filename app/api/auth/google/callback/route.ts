import { NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { createSession } from "@/lib/auth";


export async function GET(req: Request) {


  const url = new URL(req.url);
  const code = url.searchParams.get("code");
 const next = url.searchParams.get("state") || "/profile";

  if (!code) {
   return NextResponse.redirect(
  new URL("/login?error=google_failed", req.url)
);
  }

  try {
    // 🔥 1. Exchange code → token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: "http://localhost:5000/api/auth/google/callback",
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    // 🔥 2. Get user info
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
    const name = profile.name;

    if (!email) {
      return NextResponse.redirect("/login?error=no_email");
    }

    // 🔥 3. Check if user exists
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    let user = existing[0];

    // 🔥 4. Create user if not exists
    if (!user) {
      const inserted = await db
        .insert(users)
        .values({
          email,
          name,
          emailVerified: true, // ✅ IMPORTANT
        })
        .returning();

      user = inserted[0];
      }
        await createSession(user.id);
    // 🔥 6. Redirect
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:5000";
return NextResponse.redirect(new URL(next, baseUrl));
  } catch (err) {
   return NextResponse.redirect(
  new URL("/login?error=google_failed", req.url)
);
  }
}