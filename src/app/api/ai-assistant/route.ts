import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { messages, model } = await request.json();

    const openRouterResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer":
            process.env.NEXT_PUBLIC_SITE_URL ||
            "https://documentor-bd.vercel.app",
          "X-Title": "Documentor",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "system",
              content: `Anda adalah AI Assistant untuk membantu menulis dokumen ilmiah...`,
            },
            ...messages,
          ],
          temperature: 0.4,
          max_tokens: 1000,
        }),
      }
    );

    const data = await openRouterResponse.json();

    if (data.choices?.[0]?.message?.content) {
      return NextResponse.json({ content: data.choices[0].message.content });
    } else if (data.error?.message) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "No response from AI" }, { status: 500 });
  } catch (error) {
    console.error("AI Assistant error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
