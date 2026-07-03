import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: "/Users/yangzhen/Desktop/vibetrading",
  },
};

export default nextConfig;
