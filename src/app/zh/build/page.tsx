import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = { title: "用 AI 构建交易工作流", description: "用 AI 构建无代码工作流、TradingView 策略、Python 交易机器人、回测和交易 Agent。从想法到可验证的自动化交易流程，适合没有量化背景但希望系统学习的交易者。",
  alternates: {
    canonical: "/zh/build",
  },
  openGraph: {
    title: "用 AI 构建交易工作流",
    description: "用 AI 构建无代码工作流、TradingView 策略、Python 交易机器人、回测和交易 Agent。从想法到可验证的自动化交易流程，适合没有量化背景但希望系统学习的交易者。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og/zh/build.png", width: 1200, height: 630, alt: "用 AI 构建交易工作流" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/zh/build.png"],
  }};

export default function ZhBuildPage() {
  const posts = getAllPosts("zh").filter((post) => post.tags.includes("tutorial") || post.category === "Tutorials");
  return <HubPage eyebrow="构建" title="从一句话，到可以验证的东西。" description="从自然语言描述的市场想法开始，先构建最小可用工作流，让每一条规则可见，只在证据支持时增加复杂度。" principles={["从无代码到开发者", "步骤可复现", "包含风险护栏"]} cards={[
    { eyebrow: "Level 01", title: "无代码工作流", description: "不需要编程的研究 Prompt、检查表、表格和现成工具。", href: "/zh/blog?tag=beginners" },
    { eyebrow: "Level 02", title: "低代码构建", description: "由 AI 生成并逐行解释的 TradingView 脚本和小型自动化。", href: "/zh/blog?tag=tutorial" },
    { eyebrow: "Level 03", title: "Python 与 API", description: "市场数据、回测、券商 API、日志、提醒和明确风险控制。", href: "/zh/blog?tag=python" },
    { eyebrow: "Level 04", title: "交易 Agent", description: "带结构化决策、权限控制和紧急停止机制的研究与执行 Agent。", href: "/zh/blog?tag=multi-agent" },
  ]} posts={posts} postsTitle="构建指南" emptyTitle="第一个构建项目正在进行" emptyText="每个构建都会包含前置条件、原始意图、实现、验证和已知限制。" ctaLabel="阅读全部指南" ctaHref="/zh/blog" />;
}
