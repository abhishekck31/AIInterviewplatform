
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text, voiceId = "EXAVITQu4vr4xnSDxMaL" } = await req.json(); // Default voiceId can be changed
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.5,
      },
    }),
  });

  if (!response.ok) {
    return new NextResponse(JSON.stringify({ error: "Failed to generate audio" }), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  }

  const audioBuffer = await response.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}