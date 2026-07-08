import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "vibetrading.fun — AI Trading Bots & Prediction Markets",
    template: "%s | vibetrading.fun",
  },
  description:
    "A blog about AI trading bots, prediction markets, and automated trading strategies. No hype, no guaranteed returns.",
  keywords: [
    "AI trading",
    "AI trading bot",
    "prediction market",
    "Polymarket bot",
    "crypto trading bot",
    "algorithmic trading",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vibetrading.fun",
    siteName: "vibetrading.fun",
    title: "vibetrading.fun — AI Trading Bots & Prediction Markets",
    description:
      "A blog about AI trading bots, prediction markets, and automated trading strategies.",
  },
  twitter: {
    card: "summary_large_image",
    title: "vibetrading.fun — AI Trading Bots & Prediction Markets",
    description:
      "A blog about AI trading bots, prediction markets, and automated trading strategies.",
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
