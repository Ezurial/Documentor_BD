"use client";

import { useState } from "react";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Room } from "./room";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { AiSidebar } from "@/components/ai-sidebar";
import { api } from "../../../../convex/_generated/api";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);

  const [isAiOpen, setIsAiOpen] = useState(false); // ✅ state AI sidebar

  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD] relative">
        {/* ✅ AI SIDEBAR muncul jika isAiOpen = true */}
        <AiSidebar open={isAiOpen} onClose={() => setIsAiOpen(false)} />

        {/* ✅ Navbar dan Toolbar */}
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
          <Navbar data={document} />
          <Toolbar onAiClick={() => setIsAiOpen(true)} /> {/* 👈 click ini */}
        </div>

        {/* Editor */}
        <div className="pt-[114px] print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
};
