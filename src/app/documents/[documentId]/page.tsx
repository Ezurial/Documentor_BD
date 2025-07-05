import { preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";

// Hapus baris ini: interface DocumentIdPageProps { ... }

// Ganti definisi komponen menjadi seperti ini:
const DocumentIdPage = async ({
  params,
}: {
  params: { documentId: string };
}) => {
  const { documentId } = params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) throw new Error("Unauthorized");

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    { id: documentId },
    { token }
  );

  // Bagian ini salah di kode Anda sebelumnya, seharusnya preloadedDocument bisa null
  if (!preloadedDocument) {
    // Anda bisa melempar error atau merender halaman not-found
    // import { notFound } from 'next/navigation';
    // notFound();
    // Atau lempar error seperti ini:
    throw new Error("Document not found");
  }

  return <Document preloadedDocument={preloadedDocument} />;
};

export default DocumentIdPage;
