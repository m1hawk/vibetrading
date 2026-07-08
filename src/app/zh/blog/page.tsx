import { Metadata } from "next";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "博客",
  description:
    "关于 AI 交易、Polymarket、加密货币机器人和自动化策略的教程、工具与指南。",
};

export default function ZhBlogPage() {
  const posts = getAllPosts("zh");
  const categories = getAllCategories("zh");

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
          全部文章
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          按主题浏览。每个分类覆盖 AI 交易和自动化的一个领域。
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
                    {categoryPosts.length} 篇文章
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
