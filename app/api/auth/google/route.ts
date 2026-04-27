import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=" + process.env.GOOGLE_CLIENT_ID +
    "&redirect_uri=http://localhost:5000/api/auth/google/callback" +
    "&response_type=code" +
    "&scope=openid email profile";

  return NextResponse.redirect(url);
}