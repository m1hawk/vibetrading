import type { Metadata } from "next";
import { VibeHome } from "@/components/VibeHome";

export const metadata: Metadata = {
  title: "Vibe Trading for Everyone",
  description:
    "Turn market ideas into research, strategies, backtests, and automated workflows with AI. No quant background required.",
};

export default function Home() {
  return <VibeHome lang="en" />;
}
