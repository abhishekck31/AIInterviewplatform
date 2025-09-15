// utils/playVoice.ts
export async function playVoice(text: string, voiceId?: string) {
  const res = await fetch("/api/tts", {
    method: "POST",
    body: JSON.stringify({ text, voiceId }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch audio");
  }
  const audioBlob = await res.blob();
  const audioUrl = URL.createObjectURL(audioBlob);
  const audio = new Audio(audioUrl);
  audio.play();
}
