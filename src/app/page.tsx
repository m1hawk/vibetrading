import Link from "next/link";
import { getAllPosts, getFeaturedPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, FlaskConical, Shield, Code, TrendingUp } from "lucide-react";

export default function Home() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = getAllPosts().slice(0, 6);

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
            Real tests. No hype.
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            AI Trading. Prediction Markets. Automated Strategies.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            A blog about building and testing AI trading bots, Polymarket
            agents, crypto automation, and rule-based strategies. No hype, no
            guaranteed returns.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Read the Blog
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

      {/* Value Props */}
      <section className="border-b border-border bg-surface px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-background p-6">
            <Shield className="mb-4 h-8 w-8 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">
              Honest Reviews
            </h3>
            <p className="mt-2 text-sm text-muted">
              We test AI trading tools and prediction market bots with real
              accounts, then publish the actual results.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6">
            <Code className="mb-4 h-8 w-8 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">
              Buildable Tutorials
            </h3>
            <p className="mt-2 text-sm text-muted">
              Copy-paste code for bots using Claude Code, Polymarket, Alpaca,
              Python, and TradingView.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6">
            <TrendingUp className="mb-4 h-8 w-8 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">
              Strategy Research
            </h3>
            <p className="mt-2 text-sm text-muted">
              Deep dives into prediction markets, crypto automation, and
              rule-based trading systems.
            </p>
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
