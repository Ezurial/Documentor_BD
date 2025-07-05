"use client";

import React, { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { marked } from "marked";
import DOMPurify from "dompurify";

interface AiSidebarProps {
  open: boolean;
  onClose: () => void;
}

type Message = {
  role: "user" | "assistant";
  content: string;
};

type OpenRouterResponse = {
  choices?: {
    message?: {
      content: string;
    };
  }[];
  error?: {
    message: string;
  };
};

export const AiSidebar: React.FC<AiSidebarProps> = ({ open, onClose }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const validateInput = (text: string): boolean => {
    const bannedWords = ["hack", "bug", "exploit", "porn"];
    return !bannedWords.some((word) => text.toLowerCase().includes(word));
  };

  const filterResponse = (text: string): string => {
    const offTopicPhrases = ["sebagai AI", "model bahasa", "saya tidak bisa"];
    if (offTopicPhrases.some((phrase) => text.includes(phrase))) {
      return "Maaf, saya hanya bisa membantu terkait penulisan dokumen.";
    }
    return text;
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    if (!validateInput(input)) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Pertanyaan mengandung kata terlarang.",
        },
      ]);
      return;
    }

    const updatedMessages = [...messages, { role: "user", content: input }];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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",
          "HTTP-Referer": "http://localhost:3000",
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
            ...updatedMessages,
          ],
          temperature: 0.4,
          max_tokens: 1000,
        }),
      });

      const data: OpenRouterResponse = await res.json();

      let reply = "❌ Tidak ada respon.";
      if (data.choices?.[0]?.message?.content) {
        reply = data.choices[0].message.content;
      } else if (data.error?.message) {
        reply = `❌ Error: ${data.error.message}`;
      }

      const sanitized = DOMPurify.sanitize(marked.parse(filterResponse(reply)));
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: sanitized },
      ]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan yang tidak diketahui";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `❌ Terjadi kesalahan: ${errorMessage}` },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
  };

  if (!open) return null;

  return (
    <div className="fixed top-36 right-0 w-full max-w-xs h-[calc(100%-10rem)] z-50 bg-white border-l shadow-xl rounded-xl flex flex-col animate-slide-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b bg-gradient-to-r from-blue-500 to-primary-green rounded-t-xl text-white shadow-sm">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        <button onClick={onClose} className="hover:text-gray-200 transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`max-w-[85%] p-3 rounded-lg text-sm ${
              msg.role === "user"
                ? "bg-indigo-100 self-end ml-auto"
                : "bg-gray-100 self-start"
            }`}
            dangerouslySetInnerHTML={{ __html: msg.content }}
          />
        ))}
      </div>

      {/* Input Section */}
      <div className="p-4 border-t space-y-2">
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Tanyakan seputar dokumen..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <div className="flex gap-2">
          <button
            onClick={sendMessage}
            disabled={loading}
            className="flex-1 bg-primary-blue hover:bg-black text-white font-medium py-2 rounded-md transition"
          >
            {loading ? "Memproses..." : "Kirim"}
          </button>
          <button
            onClick={resetChat}
            className="flex-1 bg-gray-200 hover:bg-red-400 text-gray-700 font-medium py-2 rounded-md transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
