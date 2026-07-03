import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Trading Lab — Tested. Transparent. Buildable.",
    template: "%s | AI Trading Lab",
  },
  description:
    "Honest reviews, real performance tests, and step-by-step tutorials for AI trading bots, strategies, and tools. Built for retail traders who want facts, not hype.",
  keywords: [
    "AI trading",
    "AI trading bot",
    "algorithmic trading",
    "trading automation",
    "Claude Code trading",
    "Alpaca API",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibetrading.fun",
    siteName: "AI Trading Lab",
    title: "AI Trading Lab — Tested. Transparent. Buildable.",
    description:
      "Honest reviews, real performance tests, and step-by-step tutorials for AI trading bots, strategies, and tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Trading Lab — Tested. Transparent. Buildable.",
    description:
      "Honest reviews, real performance tests, and step-by-step tutorials for AI trading bots, strategies, and tools.",
  },
  metadataBase: new URL("https://vibetrading.fun"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
