import type { Metadata } from "next";
import { MuskTweetsTool } from "@/components/MuskTweetsTool";

export const metadata: Metadata = {
  title: "Elon Musk Tweet Count: Weekly Historical Data",
  description:
    "Free historical dataset of Elon Musk's weekly tweet counts from settled Polymarket bracket markets. Ranges, trends, and live bracket odds, updated weekly.",
  alternates: {
    canonical: "/tools/elon-musk-tweets",
  },
  openGraph: {
    title: "Elon Musk Tweet Count: Weekly Historical Data",
    description:
      "Free historical dataset of Elon Musk's weekly tweet counts from settled Polymarket bracket markets. Ranges, trends, and live bracket odds, updated weekly.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/tools-elon-musk-tweets.png", width: 1200, height: 630, alt: "Elon Musk Tweet Count: Weekly Historical Data" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/tools-elon-musk-tweets.png"],
  },
};

export default function ElonMuskTweetsPage() {
  return <MuskTweetsTool lang="en" />;
}
