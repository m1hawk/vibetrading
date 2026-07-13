import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true,
  },
  // Parent home dir also has a package-lock.json; pin Turbopack root to this app.
  turbopack: {
    root: rootDir,
  },
};

export default nextConfig;
