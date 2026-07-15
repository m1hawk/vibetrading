import { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Honest, hands-on reviews of AI trading bots and software. We test each tool and publish the real results.",

  alternates: {
    canonical: "/reviews",
  }};

export default function ReviewsPage() {
  const posts = getPostsByCategory("Reviews");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Reviews
        </h1>
        <p className="mt-4 text-lg text-muted">
          Hands-on reviews of AI trading tools. Every review includes real usage
          time, transparent methodology, and actual results.
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
          No reviews published yet. Check back soon or start with our guides.
        </p>
      )}
    </div>
  );
}
