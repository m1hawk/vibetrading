import type { Metadata } from "next";
import { VibeTradingGuide } from "@/components/VibeTradingGuide";

export const metadata: Metadata = { title: "What Is Vibe Trading?", description: "Learn how to turn market ideas into testable trading workflows with AI—from plain English to backtest and paper trading." ,
  alternates: {
    canonical: "/vibe-trading",
  },
  openGraph: {
    title: "What Is Vibe Trading?",
    description: "Learn how to turn market ideas into testable trading workflows with AI—from plain English to backtest and paper trading.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/vibe-trading.png", width: 1200, height: 630, alt: "What Is Vibe Trading?" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/vibe-trading.png"],
  }};

export default function VibeTradingPage() { return <VibeTradingGuide lang="en" />; }
