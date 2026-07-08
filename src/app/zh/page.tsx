import Link from "next/link";
import { getAllPosts, getFeaturedPosts, getAllCategories } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, FlaskConical } from "lucide-react";

const categoryDescriptions: Record<string, string> = {
  Polymarket: "预测市场 Agent、工具与策略。",
  Crypto: "加密货币市场的交易机器人与自动化。",
  Claude: "用 Claude Code 构建 AI 交易 Agent。",
  TradingView: "策略自动化、Pine Script 与回测。",
  Futures: "期货与永续合约的 AI 策略。",
  Tools: "交易软件的评测与对比。",
  Basics: "AI 交易入门、风险与防骗。",
};

export default function ZhHome() {
  const featuredPosts = getFeaturedPosts("zh");
  const recentPosts = getAllPosts("zh").slice(0, 6);
  const categories = getAllCategories("zh");

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "vibetrading.fun",
    url: "https://vibetrading.fun/zh",
    description:
      "一个关于 AI 交易机器人、预测市场和自动化交易策略的博客。",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://vibetrading.fun/zh/blog?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "vibetrading.fun",
    url: "https://vibetrading.fun",
    logo: "https://vibetrading.fun/logo.png",
    sameAs: [
      "https://twitter.com/vibetrading",
      "https://github.com/vibetrading",
    ],
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={organizationSchema} />
      <div className="flex flex-col">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border bg-background px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
              <FlaskConical className="h-4 w-4 text-accent" />
              vibetrading.fun
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              AI 交易 · 预测市场 · 自动化策略
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
              按主题整理的教程、工具与指南。快速找到你想要的内容。
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/zh/blog"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-base font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                浏览文章
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-surface-elevated"
              >
                关于
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by Topic */}
        <section className="border-b border-border bg-surface px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-8 text-2xl font-bold tracking-tight text-foreground">
              按主题浏览
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/zh/blog#${category.toLowerCase()}`}
                  className="group rounded-xl border border-border bg-background p-6 transition-colors hover:border-accent"
                >
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-accent">
                    {category}
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    {categoryDescriptions[category] || `${category} 相关文章。`}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  精选文章
                </h2>
                <Link
                  href="/zh/blog"
                  className="text-sm font-medium text-accent hover:text-accent-hover"
                >
                  查看全部 →
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post) => (
                  <PostCard key={post.slug} post={post} featured />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Recent Posts */}
        <section className="border-t border-border bg-surface px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                最新文章
              </h2>
              <Link
                href="/zh/blog"
                className="text-sm font-medium text-accent hover:text-accent-hover"
              >
                查看全部 →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
