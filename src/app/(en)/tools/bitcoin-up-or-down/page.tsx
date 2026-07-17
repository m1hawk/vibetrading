import type { Metadata } from "next";
import { BtcUpDownTool } from "@/components/BtcUpDownTool";

export const metadata: Metadata = {
  title: "Bitcoin Up or Down: Historical Daily Data",
  description:
    "Free historical dataset: how often does Bitcoin actually go up in a day? One year of daily up/down results, streaks, and monthly stats—updated daily.",
  alternates: {
    canonical: "/tools/bitcoin-up-or-down",
  },
  openGraph: {
    title: "Bitcoin Up or Down: Historical Daily Data",
    description:
      "Free historical dataset: how often does Bitcoin actually go up in a day? One year of daily up/down results, streaks, and monthly stats—updated daily.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/tools-bitcoin-up-or-down.png", width: 1200, height: 630, alt: "Bitcoin Up or Down: Historical Daily Data" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/tools-bitcoin-up-or-down.png"],
  },
};

export default function BitcoinUpOrDownPage() {
  return <BtcUpDownTool lang="en" />;
}
