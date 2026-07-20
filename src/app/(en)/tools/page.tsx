import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubPage } from "@/components/HubPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = {
  title: "AI Trading Tools",
  description:
    "Independent guides to AI trading tools, models, platforms, APIs, and automation workflows. Compare options by workflow, limits, and real retail use cases.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "AI Trading Tools",
    description:
      "Independent guides to AI trading tools, models, platforms, APIs, and automation workflows. Compare options by workflow, limits, and real retail use cases.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/tools.png", width: 1200, height: 630, alt: "AI Trading Tools" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/tools.png"],
  }};

const freeTools = [
  {
    eyebrow: "Free data tool",
    title: "Bitcoin up or down: daily history",
    description: "How often does BTC actually go up in a day? One year of daily results, streaks, and monthly stats.",
    href: "/tools/bitcoin-up-or-down",
  },
  {
    eyebrow: "Free data tool",
    title: "Elon Musk weekly tweet count",
    description: "The official record of Musk's weekly post counts, reconstructed from settled Polymarket markets.",
    href: "/tools/elon-musk-tweets",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="nx-section px-4 pb-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="nx-label">Free data tools</div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {freeTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="nx-card group p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-hover">
                  {tool.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight">
                  {tool.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">{tool.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-hover">
                  Open tool
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <HubPage eyebrow="Tools" title="Choose tools by what you want to build." description="A Vibe Trading stack can include an AI model, market data, a backtesting environment, and an execution platform. We compare them by workflow—not marketing claims." principles={["Hands-on status clearly labeled", "Limits included", "No paid rankings"]} cards={[
        { eyebrow: "AI models", title: "Think and research", description: "Use ChatGPT, Claude, and research tools to structure questions, inspect evidence, and turn ideas into explicit rules.", href: "/blog?tag=llm" },
        { eyebrow: "Platforms", title: "Chart and prototype", description: "Use TradingView and no-code platforms to move from an idea to something visible and testable.", href: "/blog?tag=comparison" },
        { eyebrow: "Frameworks", title: "Backtest honestly", description: "Test assumptions with realistic costs, out-of-sample data, and reproducible code.", href: "/blog?tag=backtesting" },
        { eyebrow: "APIs", title: "Automate carefully", description: "Connect data and brokers only after the workflow has passed paper testing and risk checks.", href: "/blog?tag=alpaca" },
      ]} posts={getPostsByCategory("Tools", "en")} postsTitle="Tool guides and comparisons" emptyTitle="Tool testing is underway" emptyText="We will publish a guide only when its research status and limitations can be stated clearly." ctaLabel="Browse all guides" ctaHref="/blog" />
    </>
  );
}
