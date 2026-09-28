import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fixa a raiz no proprio repo: sem isto o Turbopack sobe ate o diretorio pai
  // e tenta usar um package-lock.json que nao pertence a este projeto.
  turbopack: { root: path.resolve(import.meta.dirname) },

  images: {
    // Capas de álbum do Spotify. Sem isto o next/image recusa a origem.
    remotePatterns: [{ protocol: "https", hostname: "i.scdn.co" }],
  },
};

export default nextConfig;
