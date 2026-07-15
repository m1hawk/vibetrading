import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "Build with AI", description: "Build no-code workflows, TradingView strategies, Python bots, backtests, and trading agents with AI." ,
  alternates: {
    canonical: "/build",
  }};

export default function BuildPage() {
  const posts = getAllPosts("en").filter((post) => post.tags.includes("tutorial") || post.category === "Claude");
  return <HubPage eyebrow="Build" title="From a sentence to something you can test." description="Start with a market idea in plain English. Build the smallest useful workflow, make every rule visible, and add complexity only when the evidence justifies it." principles={["No-code to developer", "Copyable steps", "Guardrails included"]} cards={[
    { eyebrow: "Level 01", title: "No-code workflows", description: "Research prompts, checklists, spreadsheets, and tools that work without programming." },
    { eyebrow: "Level 02", title: "Low-code builds", description: "TradingView scripts and small automations generated with AI and explained line by line." },
    { eyebrow: "Level 03", title: "Python and APIs", description: "Market data, backtesting, broker APIs, logs, alerts, and explicit risk controls." },
    { eyebrow: "Level 04", title: "Trading agents", description: "Research and execution agents with structured decisions, permissions, and kill switches." },
  ]} posts={posts} postsTitle="Build guides" emptyTitle="The first build is in progress" emptyText="Every build will include prerequisites, the original intent, implementation, tests, and known limits." ctaLabel="Read all guides" ctaHref="/blog" />;
}
