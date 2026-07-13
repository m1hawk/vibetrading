import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex",
  display: "swap",
  weight: ["400", "500", "600"],
});

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${inter.variable} ${playfair.variable} ${plex.variable}`}
    >
      <body className="flex min-h-full flex-col bg-background font-sans text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
