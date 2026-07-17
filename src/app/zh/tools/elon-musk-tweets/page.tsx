import type { Metadata } from "next";
import { MuskTweetsTool } from "@/components/MuskTweetsTool";

export const metadata: Metadata = {
  title: "Elon Musk 每周发帖数：历史数据",
  description:
    "免费历史数据集：从 Polymarket 已结算区间市场还原的 Elon Musk 每周发帖数量。区间、趋势和当前市场赔率，每周更新。",
  alternates: {
    canonical: "/zh/tools/elon-musk-tweets",
  },
  openGraph: {
    title: "Elon Musk 每周发帖数：历史数据",
    description:
      "免费历史数据集：从 Polymarket 已结算区间市场还原的 Elon Musk 每周发帖数量。区间、趋势和当前市场赔率，每周更新。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og/zh/tools-elon-musk-tweets.png", width: 1200, height: 630, alt: "Elon Musk 每周发帖数：历史数据" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/zh/tools-elon-musk-tweets.png"],
  },
};

export default function ZhElonMuskTweetsPage() {
  return <MuskTweetsTool lang="zh" />;
}
