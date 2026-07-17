import type { Metadata } from "next";
import { BtcUpDownTool } from "@/components/BtcUpDownTool";

export const metadata: Metadata = {
  title: "比特币猜涨跌：每日历史数据",
  description:
    "免费历史数据集：比特币一天之内到底涨多还是跌多？过去一年的每日涨跌记录、连涨连跌和逐月统计，每天更新。",
  alternates: {
    canonical: "/zh/tools/bitcoin-up-or-down",
  },
  openGraph: {
    title: "比特币猜涨跌：每日历史数据",
    description:
      "免费历史数据集：比特币一天之内到底涨多还是跌多？过去一年的每日涨跌记录、连涨连跌和逐月统计，每天更新。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og/zh/tools-bitcoin-up-or-down.png", width: 1200, height: 630, alt: "比特币猜涨跌：每日历史数据" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/zh/tools-bitcoin-up-or-down.png"],
  },
};

export default function ZhBitcoinUpOrDownPage() {
  return <BtcUpDownTool lang="zh" />;
}
