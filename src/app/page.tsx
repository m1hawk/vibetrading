import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, FlaskConical } from "lucide-react";

const categoryDescriptions: Record<string, string> = {
  Polymarket: "Prediction market agents, tools, and strategies.",
  Crypto: "Trading bots and automation for crypto markets.",
  Claude: "Build AI trading agents with Claude Code.",
  TradingView: "Strategy automation, Pine Script, and backtesting.",
  Futures: "Futures and perpetuals strategies with AI.",
  Tools: "Reviews and comparisons of trading software.",
  Basics: "Risk, scams, and getting started with AI trading.",
};

export default function Home() {
  const featuredPosts = getFeaturedPosts("en");
  const recentPosts = getAllPosts("en").slice(0, 6);
  const categories = getAllCategories("en");

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "vibetrading.fun",
    url: "https://vibetrading.fun",
    description:
      "A blog about AI trading bots, prediction markets, and automated trading strategies.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vibetrading.fun/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "vibetrading.fun",
    url: "https://vibetrading.fun",
    logo: "https://vibetrading.fun/logo.png",
    sameAs: [
      "https://twitter.com/vibetrading",
      "https://github.com/vibetrading",
    ],
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
            <FlaskConical className="h-4 w-4 text-accent" />
            vibetrading.fun
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            AI Trading. Prediction Markets. Automated Strategies.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Tutorials, tools, and guides organized by topic. Find what you want
            without the fluff.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Browse Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-elevated"
            >
              About
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Topic */}
      <section className="border-b border-border bg-surface px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
            Browse by Topic
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/blog#${category.toLowerCase()}`}
                className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
                  {category}
                </h3>
                <p className="mt-2 text-sm text-muted">
                  {categoryDescriptions[category] || `Articles about ${category}.`}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Featured
              </h2>
              <Link
                href="/blog"
                className="text-sm font-medium text-accent hover:text-accent-hover"
              >
                View all →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recent Posts */}
      <section className="border-t border-border bg-surface px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Latest Articles
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-accent hover:text-accent-hover"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
