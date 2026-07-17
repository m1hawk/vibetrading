import type { Metadata } from "next";
import { VibeHome } from "@/components/VibeHome";

export const metadata: Metadata = {
  title: "VibeTrading.fun — AI Trading for Everyone",
  description:
    "Turn market ideas into research, strategies, backtests, and automated workflows with AI. No quant background required.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VibeTrading.fun — AI Trading for Everyone",
    description:
      "Turn market ideas into research, strategies, backtests, and automated workflows with AI. No quant background required.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/home.png", width: 1200, height: 630, alt: "VibeTrading.fun — AI Trading for Everyone" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/home.png"],
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
