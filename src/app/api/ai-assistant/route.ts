import { NextResponse } from "next/server";

export const runtime = "edge"; // Optional: for Edge Runtime

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Validate input
    const bannedWords = ["hack", "bug", "exploit", "porn"];
    const lastUserMessage = messages[messages.length - 1]?.content || "";

    if (
      bannedWords.some((word) => lastUserMessage.toLowerCase().includes(word))
    ) {
      return NextResponse.json(
        { message: "❌ Pertanyaan mengandung kata terlarang." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "http://documentor-bd.vercel.app",
          "X-Title": "Documentor",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-r1:free",
          messages: [
            {
              role: "system",
              content: `Anda adalah AI Assistant untuk membantu menulis dokumen ilmiah. 
- Fokus pada makalah, skripsi, laporan, artikel ilmiah.
- Jika pertanyaan di luar topik, tolong tolak dengan sopan.
- Gunakan bahasa Indonesia yang formal.`,
            },
            ...messages,
          ],
          temperature: 0.4,
          max_tokens: 1000,
        }),
      }
    );

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "❌ Tidak ada respon.";

    // Filter off-topic responses
    const offTopicPhrases = ["sebagai AI", "model bahasa", "saya tidak bisa"];
    const filteredReply = offTopicPhrases.some((phrase) =>
      reply.includes(phrase)
    )
      ? "Maaf, saya hanya bisa membantu terkait penulisan dokumen."
      : reply;

    return NextResponse.json({ message: filteredReply });
  } catch (error) {
    let errorMessage = "❌ Terjadi kesalahan";
    if (error instanceof Error) {
      errorMessage += ": " + error.message;
    }
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
