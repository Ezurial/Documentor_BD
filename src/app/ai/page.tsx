"use client";

import { useState, useEffect } from "react";
import { Room } from "@/app/documents/[documentId]/room";
import { Editor } from "@/app/documents/[documentId]/editor";
import { Navbar } from "@/app/documents/[documentId]/navbar";
import { Toolbar } from "@/app/documents/[documentId]/toolbar";
import { AiSidebar } from "@/components/ai-sidebar";

interface DocumentIdPageProps {
  params: { documentId: string };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const {
    /*documentId */
  } = params;
  const [documentContext, setDocumentContext] = useState("");
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Contoh: Ambil konteks dari editor saat komponen mount
  useEffect(() => {
    // Implementasi aktual tergantung bagaimana Anda mendapatkan konteks dokumen
    // Ini hanya contoh:
    const updateContext = () => {
      const editorContent = ""; // Dapatkan konten dari editor
      setDocumentContext(editorContent);
    };

    updateContext();
    // Tambahkan event listener jika perlu update konteks secara real-time
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <AiSidebar
        open={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        documentContext={documentContext}
      />

      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden">
        <Navbar />
        <Toolbar onAiClick={() => setIsAiOpen(true)} />
      </div>

      <div className="pt-[114px] print:pt-0">
        <Room>
          <Editor
            // Tambahkan prop untuk mendapatkan konten editor jika diperlukan
            onContentChange={(content) => setDocumentContext(content)}
          />
        </Room>
      </div>
    </div>
  );
};

export default DocumentIdPage;
