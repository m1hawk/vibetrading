import { Metadata } from "next";
import { getAllPosts, getAllCategories, toPostMeta } from "@/lib/posts";
import { BlogBrowser } from "@/components/BlogBrowser";

export const metadata: Metadata = {
  title: "Vibe Trading Guides",
  description:
    "Practical field guides for understanding, building, testing, and improving AI-powered trading workflows.",

  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Vibe Trading Guides",
    description:
      "Practical field guides for understanding, building, testing, and improving AI-powered trading workflows.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og/blog.png", width: 1200, height: 630, alt: "Vibe Trading Guides" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/blog.png"],
  }};

export default function BlogPage() {
  const posts = getAllPosts("en");
  const categories = getAllCategories("en");

  const tagCounts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }
  }
  const topTags = [...tagCounts.entries()]
    .filter(([, count]) => count >= 4)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12">
        <div className="nx-label">Guides</div>
        <h1 className="nx-display mt-5 text-5xl text-foreground sm:text-6xl">
          The Vibe Trading field guide
        </h1>
        <p className="nx-lead mt-5 max-w-2xl text-lg">
          Learn the concepts, inspect the tools, reproduce the builds, and test
          every idea before capital is involved.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase()}`}
              className="border border-border bg-surface px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent hover:text-accent-hover"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      <BlogBrowser posts={posts.map(toPostMeta)} categories={categories} tags={topTags} lang="en" />
    </div>
  );
}
