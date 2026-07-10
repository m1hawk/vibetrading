import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = { title: "AI Trading Tools", description: "Independent guides to AI models, trading platforms, APIs, and automation tools for vibe trading." };

export default function ToolsPage() {
  return <HubPage eyebrow="Tools" title="Choose tools by what you want to build." description="A Vibe Trading stack can include an AI model, market data, a backtesting environment, and an execution platform. We compare them by workflow—not marketing claims." principles={["Hands-on status clearly labeled", "Limits included", "No paid rankings"]} cards={[
    { eyebrow: "AI models", title: "Think and research", description: "Use ChatGPT, Claude, and research tools to structure questions, inspect evidence, and turn ideas into explicit rules." },
    { eyebrow: "Platforms", title: "Chart and prototype", description: "Use TradingView and no-code platforms to move from an idea to something visible and testable." },
    { eyebrow: "Frameworks", title: "Backtest honestly", description: "Test assumptions with realistic costs, out-of-sample data, and reproducible code." },
    { eyebrow: "APIs", title: "Automate carefully", description: "Connect data and brokers only after the workflow has passed paper testing and risk checks." },
  ]} posts={getPostsByCategory("Tools", "en")} postsTitle="Tool guides and comparisons" emptyTitle="Tool testing is underway" emptyText="We will publish a guide only when its research status and limitations can be stated clearly." ctaLabel="Browse all guides" ctaHref="/blog" />;
}
