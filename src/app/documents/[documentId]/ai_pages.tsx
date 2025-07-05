"use client";
import React, { useState } from "react";
import { marked } from "marked";

export default function AiPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi validasi input
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const validateInput = (text: string): boolean => {
    const bannedWords = ["hack", "exploit", "politik", "agama", "seks", "game"];
    return !bannedWords.some((word) => text.toLowerCase().includes(word));
  };

  // Fungsi filter respons AI
  const filterResponse = (text: string): string => {
    const offTopicKeywords = [
      "sebagai AI",
      "model bahasa",
      "saya tidak bisa",
      "saya hanyalah",
      "saya tidak mengetahui",
    ];

    const normalized = text.toLowerCase();

    if (offTopicKeywords.some((keyword) => normalized.includes(keyword))) {
      return "Maaf, saya hanya dapat membantu hal-hal terkait penulisan dokumen seperti karya ilmiah, makalah, esai, laporan, dan lainnya.";
    }

    return text;
  };

  const sendMessage = async () => {
    if (!input.trim()) {
      setResponse("Silakan masukkan pertanyaan.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: "Bearer <API_KEY_MU>",
          "HTTP-Referer": "https://yourdomain.com",
          "X-Title": "YourSite",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `
                Anda adalah AI Assistant untuk aplikasi dokumen ilmiah.
                - Fokus pada karya ilmiah, makalah, esai, laporan, dan format akademik.
                - Jika pertanyaan di luar konteks, jawab dengan sopan bahwa Anda tidak bisa menjawab.
                - Jangan jawab pertanyaan tentang topik lain seperti politik, hiburan, atau pribadi.
                - Gunakan bahasa Indonesia formal dan ringkas.
              `,
            },
            { role: "user", content: input },
          ],
          temperature: 0.3,
          max_tokens: 1500,
        }),
      });

      if (!res.ok) {
        throw new Error(`Gagal respons AI (${res.status})`);
      }

      const data = await res.json();
      const raw =
        data.choices?.[0]?.message?.content || "Tidak ada respons dari AI.";
      const filtered = filterResponse(raw); // kalau kamu punya validasi tambahan

      try {
        setResponse(marked.parse(filtered));
      } catch {
        setResponse(filtered); // fallback plain text
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setResponse("Terjadi error: " + err.message);
      } else {
        setResponse("Terjadi error yang tidak diketahui.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Asisten Dokumen</h2>
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        placeholder="Tanyakan seputar dokumen karya ilmiah..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        className="bg-indigo-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Memproses..." : "Tanyakan"}
      </button>
      <div
        className="mt-6 prose max-w-full overflow-y-auto max-h-[400px]"
        dangerouslySetInnerHTML={{ __html: response }}
      />
    </div>
  );
}
