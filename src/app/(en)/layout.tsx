import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fontVariables } from "@/lib/fonts";

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
    images: [
      {
        url: "/og/home.png",
        width: 1200,
        height: 630,
        alt: "VibeTrading.fun — Vibe Trading for Everyone",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeTrading.fun — Vibe Trading for Everyone",
    description:
      "Turn market ideas into testable trading workflows with AI. No quant background required.",
    images: ["/og/home.png"],
  },
  metadataBase: new URL("https://vibetrading.fun"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
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
    <html lang="en" className={`h-full antialiased ${fontVariables}`}>
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-LDTV9DY41K" />
    </html>
  );
}
