import type { Metadata } from "next";

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
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeTrading.fun — 人人都能用的 Vibe Trading",
    description:
      "用 AI 把市场想法转化为可验证的交易流程。无需量化背景。",
  },
  metadataBase: new URL("https://vibetrading.fun"),
  alternates: {
    canonical: "/zh",
    languages: {
      "en": "/",
      "zh": "/zh",
    },
  },
};

export default function ZhLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
