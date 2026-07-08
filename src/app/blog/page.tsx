import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutorials, tools, and guides for AI trading, Polymarket, crypto bots, and automated strategies.",
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
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          All Articles
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Browse by topic. Each category covers one area of AI trading and
          automation.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase()}`}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
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
