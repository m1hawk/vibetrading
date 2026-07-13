import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "VibeTrading.fun — Vibe Trading for Everyone",
    template: "%s | VibeTrading.fun",
  },
  description:
    "Turn market ideas into research, strategies, backtests, and automated workflows with AI. No quant background required.",
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
    title: "VibeTrading.fun — Vibe Trading for Everyone",
    description:
      "Turn market ideas into testable trading workflows with AI. No quant background required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeTrading.fun — Vibe Trading for Everyone",
    description:
      "Turn market ideas into testable trading workflows with AI. No quant background required.",
  },
  metadataBase: new URL("https://vibetrading.fun"),
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    // Helps crawlers discover the canonical sitemap
    types: {
      "application/xml": "https://vibetrading.fun/sitemap.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
