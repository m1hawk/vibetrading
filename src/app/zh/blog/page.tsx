import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "博客",
  description:
    "vibetrading.fun 的全部文章 — 关于 AI 交易、预测市场和自动化策略的评测与教程。",
};

export default function ZhBlogPage() {
  const posts = getAllPosts("zh");
  const categories = getAllCategories("zh");

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          全部文章
        </h1>
        <p className="mt-4 text-lg text-muted">
          浏览我们发布的所有关于 AI 交易、Polymarket 和自动化策略的评测与教程。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted"
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
