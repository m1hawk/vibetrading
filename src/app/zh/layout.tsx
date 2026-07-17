import type { Metadata } from "next";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";
import { fontVariables } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "VibeTrading.fun — 人人都能用的 Vibe Trading",
    template: "%s | VibeTrading.fun",
  },
  description:
    "用 AI 把市场想法转化为研究、策略、回测和自动化交易流程。无需量化背景。",
  keywords: [
    "AI 交易",
    "AI 交易机器人",
    "算法交易",
    "量化交易",
    "加密货币交易机器人",
  ],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://vibetrading.fun/zh",
    siteName: "vibetrading.fun",
    title: "VibeTrading.fun — 人人都能用的 Vibe Trading",
    description:
      "用 AI 把市场想法转化为可验证的交易流程。无需量化背景。",
    images: [
      {
        url: "/og/zh/home.png",
        width: 1200,
        height: 630,
        alt: "VibeTrading.fun — 人人都能用的 Vibe Trading",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeTrading.fun — 人人都能用的 Vibe Trading",
    description:
      "用 AI 把市场想法转化为可验证的交易流程。无需量化背景。",
    images: ["/og/zh/home.png"],
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
    canonical: "/zh",
    languages: {
      "en": "/",
      "zh": "/zh",
    },
    types: {
      "application/xml": "https://vibetrading.fun/sitemap.xml",
    },
  },
};

export default function ZhRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`h-full antialiased ${fontVariables}`}>
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
