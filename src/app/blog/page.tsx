import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Vibe Trading Guides",
  description:
    "Practical field guides for understanding, building, testing, and improving AI-powered trading workflows.",
};

export default function BlogPage() {
  const posts = getAllPosts("en");
  const categories = getAllCategories("en");

  const postsByCategory = categories.map((category) => ({
    category,
    posts: posts.filter(
      (post) => post.category.toLowerCase() === category.toLowerCase()
    ),
  }));

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
              className="border border-border bg-surface px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-16">
        {postsByCategory.map(
          ({ category, posts: categoryPosts }) =>
            categoryPosts.length > 0 && (
              <section
                key={category}
                id={category.toLowerCase()}
                className="scroll-mt-24"
              >
                <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {category}
                  </h2>
                  <span className="text-sm text-muted">
                    {categoryPosts.length}{" "}
                    {categoryPosts.length === 1 ? "article" : "articles"}
                  </span>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryPosts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              </section>
            )
        )}
      </div>
    </div>
  );
}
