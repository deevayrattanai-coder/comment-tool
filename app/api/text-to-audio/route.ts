// app/api/text-to-audio/route.ts
import { NextResponse } from "next/server";

// Split text into chunks of max 200 chars, breaking at sentence/word boundaries
function splitTextIntoChunks(text: string, maxLength = 190): string[] {
  const sentences = text.match(/[^.!?,]+[.!?,]*/g) || [text];
  const chunks: string[] = [];
  let current = "";
  for (const sentence of sentences) {
    if ((current + sentence).length <= maxLength) {
      current += sentence;
    } else {
      if (current.trim()) chunks.push(current.trim());
      // If a single sentence is too long, split by words
      if (sentence.length > maxLength) {
        const words = sentence.split(" ");
        current = "";
        for (const word of words) {
          if ((current + " " + word).length <= maxLength) {
            current += (current ? " " : "") + word;
          } else {
            if (current.trim()) chunks.push(current.trim());
            current = word;
          }
        }
      } else {
        current = sentence;
      }
    }
  }

  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

async function fetchAudioChunk(text: string): Promise<Buffer> {
  const encoded = encodeURIComponent(text);
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=en&client=tw-ob`;

  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });

  if (!res.ok) throw new Error(`Failed to fetch audio for chunk: "${text}"`);
  return Buffer.from(await res.arrayBuffer());
}

export async function POST(req: Request) {
  let body: { text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  if (!body.text || body.text.trim().length === 0) {
    return NextResponse.json({ error: "Missing 'text' field" }, { status: 400 });
  }
  const chunks = splitTextIntoChunks(body.text.trim());
  // Fetch all chunks in parallel
  const audioBuffers = await Promise.all(chunks.map(fetchAudioChunk));
  // Join all MP3 buffers into one
  const combined = Buffer.concat(audioBuffers);
  return new NextResponse(combined, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Content-Disposition": "attachment; filename=speech.mp3",
    },
  });
}