import { NextResponse } from "next/server";

const TEXT_TO_AUDIO_API_URL = "https://be1e5c3b-6657-47b2-ba3c-5e4122dfc61a-00-3u9nmjnpwhze8.pike.replit.dev/api/text-to-audio";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const response = await fetch(TEXT_TO_AUDIO_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Audio generation failed" }));
    return NextResponse.json(err, { status: response.status });
  }

  const audioBuffer = await response.arrayBuffer();

  return new NextResponse(audioBuffer, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "attachment; filename=speech.mp3",
    },
  });
}
