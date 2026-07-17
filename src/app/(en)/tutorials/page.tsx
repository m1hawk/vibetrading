import { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "AI Trading Tutorials",
  description:
    "Step-by-step AI trading tutorials for retail traders. Build bots, automate strategies, connect broker APIs, and backtest before risking real capital.",

  alternates: {
    canonical: "/tutorials",
  },
  openGraph: {
    title: "AI Trading Tutorials",
    description:
      "Step-by-step AI trading tutorials for retail traders. Build bots, automate strategies, connect broker APIs, and backtest before risking real capital.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/tutorials.png", width: 1200, height: 630, alt: "AI Trading Tutorials" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/tutorials.png"],
  }};

export default function TutorialsPage() {
  const posts = getPostsByCategory("Tutorials");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Tutorials
        </h1>
        <p className="mt-4 text-lg text-muted">
          Build your own AI trading systems with copy-paste code and clear
          explanations.
        </p>
      </div>

      {posts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-muted">
          No tutorials published yet. Check back soon.
        </p>
      )}
    </div>
  );
}
