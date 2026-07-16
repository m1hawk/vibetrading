import type { Metadata } from "next";
import { VibeHome } from "@/components/VibeHome";

export const metadata: Metadata = {
  title: "VibeTrading.fun — AI Trading for Everyone",
  description:
    "Turn market ideas into research, strategies, backtests, and automated workflows with AI. No quant background required.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <h1 className="sr-only">VibeTrading.fun — AI Trading for Everyone</h1>
      <VibeHome lang="en" />
    </>
  );
}
