import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = { title: "Vibe Trading Lab", description: "Transparent AI trading experiments with fixed rules, realistic costs, paper trading, and published limits." ,
  alternates: {
    canonical: "/lab",
  },
  openGraph: {
    title: "Vibe Trading Lab",
    description: "Transparent AI trading experiments with fixed rules, realistic costs, paper trading, and published limits.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/lab.png", width: 1200, height: 630, alt: "Vibe Trading Lab" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/lab.png"],
  }};

export default function LabPage() {
  const posts = getPostsByCategory("Lab");
  return <HubPage eyebrow="Lab" title="Build in public. Test in public." description="The Lab is where promising ideas meet inconvenient evidence. Every experiment begins with fixed rules and ends with the complete result—including failures." principles={["Rules fixed before results", "Fees and slippage included", "No cherry-picking"]} cards={[
    { eyebrow: "Protocol", title: "State the hypothesis", description: "Define the idea, data, timeframe, success metric, risk limit, and stop condition before testing.", href: "/blog/how-to-backtest-without-overfitting" },
    { eyebrow: "Evidence", title: "Keep an audit trail", description: "Publish prompts, code versions, decisions, data assumptions, and material changes.", href: "/blog/backtest-vs-live-pnl-gap" },
    { eyebrow: "Reality", title: "Use realistic constraints", description: "Include costs, slippage, latency, missing data, and the possibility that a backtest is wrong.", href: "/blog/free-vs-paid-market-data" },
    { eyebrow: "Conclusion", title: "Publish the failure", description: "A rejected idea is useful evidence. Results are not hidden because they make a weak headline.", href: "/blog/win-rate-vs-expectancy" },
  ]} posts={posts} postsTitle="Current experiments" emptyTitle="The first public experiment is being designed" emptyText="It will be published only after the hypothesis, rules, data, costs, and stop conditions are fixed in advance." ctaLabel="Learn the method" ctaHref="/vibe-trading" />;
}
