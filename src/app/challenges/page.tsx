import { Metadata } from "next";
import { getPostsByCategory } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Challenges",
  description:
    "Follow 30-day AI trading challenges with fixed rules, fixed capital, and transparent results.",

  alternates: {
    canonical: "/challenges",
  }};

export default function ChallengesPage() {
  const posts = getPostsByCategory("Challenges");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Challenges
        </h1>
        <p className="mt-4 text-lg text-muted">
          Real-time strategy challenges with fixed rules and capital. No
          cherry-picking, no hidden losses.
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
          No active challenges. Sign up for the newsletter to be notified when
          the next one starts.
        </p>
      )}
    </div>
  );
}
