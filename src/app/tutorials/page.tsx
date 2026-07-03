import { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Tutorials",
  description:
    "Step-by-step tutorials for building AI trading bots, automating strategies, and connecting broker APIs.",
};

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
