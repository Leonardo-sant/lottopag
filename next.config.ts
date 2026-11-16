import type { NextConfig } from "next";

/**
 * O site é publicado como HTML estático (GitHub Pages).
 * NEXT_PUBLIC_BASE_PATH: subcaminho de publicação. No endereço leonardo-sant.github.io/lottopag
 * o workflow usa "/lottopag"; com domínio próprio, deixe vazio.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim().replace(/\/$/, "") || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
