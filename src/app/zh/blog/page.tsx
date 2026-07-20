import { Metadata } from "next";
import { Suspense } from "react";
import { getAllPosts, getAllCategories, toPostMeta } from "@/lib/posts";
import { BlogBrowser } from "@/components/BlogBrowser";

export const metadata: Metadata = {
  title: "Vibe Trading 实践指南",
  description: "关于理解、构建、验证和改进 AI 交易工作流的实践指南。从入门概念、风险管理到开源项目教程，帮助散户交易者建立可重复、可回测、可持续改进的交易流程。",

  alternates: {
    canonical: "/zh/blog",
  },
  openGraph: {
    title: "Vibe Trading 实践指南",
    description: "关于理解、构建、验证和改进 AI 交易工作流的实践指南。从入门概念、风险管理到开源项目教程，帮助散户交易者建立可重复、可回测、可持续改进的交易流程。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og/zh/blog.png", width: 1200, height: 630, alt: "Vibe Trading 实践指南" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/zh/blog.png"],
  }};

export default function ZhBlogPage() {
  const posts = getAllPosts("zh");
  const categories = getAllCategories("zh");

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
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent-hover">指南</p>
        <h1 className="mt-5 text-5xl font-semibold tracking-[-0.045em] text-foreground sm:text-6xl">
          Vibe Trading 实践指南
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
          理解概念、检查工具、复现构建，并在投入真实资金前验证每一个想法。
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((category) => (
            <a
              key={category}
              href={`#${category.toLowerCase()}`}
              className="rounded-full border border-border bg-surface px-4 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-accent-hover"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      <Suspense fallback={null}>
        <BlogBrowser posts={posts.map(toPostMeta)} categories={categories} tags={topTags} lang="zh" />
      </Suspense>
    </div>
  );
}
