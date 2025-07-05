import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* mungkin sudah ada config options lain di sini */

  // Tambahkan blok typescript di sini
  typescript: {
    // !! PERINGATAN !!
    // Mengizinkan build produksi untuk berhasil diselesaikan meskipun
    // proyek Anda memiliki error tipe. Gunakan dengan hati-hati.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
