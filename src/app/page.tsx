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
    name: "AI Trading Lab",
    url: "https://vibetrading.fun",
    description:
      "Honest reviews, real performance tests, and step-by-step tutorials for AI trading bots, strategies, and tools.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vibetrading.fun/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AI Trading Lab",
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
            Tested. Transparent. Buildable.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Honest reviews, real performance tests, and step-by-step tutorials
            for AI trading bots, strategies, and tools. Built for retail traders
            who want facts, not fairy tales.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reviews"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
            >
              Browse Reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tutorials"
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-elevated"
            >
              Build Your First Bot
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
              We test AI trading tools with real accounts and publish the actual
              results — wins, losses, and everything in between.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6">
            <Code className="mb-4 h-8 w-8 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">
              Buildable Tutorials
            </h3>
            <p className="mt-2 text-sm text-muted">
              Copy-paste code for bots using Claude Code, Alpaca, Python, and
              TradingView. Designed for traders who want to own their edge.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-background p-6">
            <TrendingUp className="mb-4 h-8 w-8 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">
              Strategy Challenges
            </h3>
            <p className="mt-2 text-sm text-muted">
              Follow 30-day challenges where we test AI strategies with fixed
              rules and fixed capital. Transparent, trackable, no cherry-picking.
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
                href="/reviews"
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
