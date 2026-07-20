import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HubPage } from "@/components/HubPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = { title: "AI 交易工具对比与选择指南", description: "按 Vibe Trading 工作流选择 AI 模型、交易平台、API 和自动化工具。独立对比每种工具的能力、局限和真实使用场景。" ,
  alternates: {
    canonical: "/zh/tools",
  },
  openGraph: {
    title: "AI 交易工具对比与选择指南",
    description: "按 Vibe Trading 工作流选择 AI 模型、交易平台、API 和自动化工具。独立对比每种工具的能力、局限和真实使用场景。",
    type: "website",
    locale: "zh_CN",
    images: [{ url: "/og/zh/tools.png", width: 1200, height: 630, alt: "AI 交易工具对比与选择指南" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/zh/tools.png"],
  }};

const freeTools = [
  {
    eyebrow: "免费数据工具",
    title: "比特币猜涨跌：每日历史",
    description: "比特币一天之内到底涨多还是跌多？过去一年的每日涨跌记录、连涨连跌和逐月统计。",
    href: "/zh/tools/bitcoin-up-or-down",
  },
  {
    eyebrow: "免费数据工具",
    title: "Elon Musk 每周发帖数",
    description: "从 Polymarket 已结算市场还原的 Musk 每周发帖数量官方记录。",
    href: "/zh/tools/elon-musk-tweets",
  },
];

export default function ZhToolsPage() {
  return (
    <>
      <section className="nx-section px-4 pb-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="nx-label">免费数据工具</div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {freeTools.map((tool) => (
              <Link key={tool.href} href={tool.href} className="nx-card group p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-hover">
                  {tool.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight">
                  {tool.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">{tool.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-hover">
                  打开工具
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <HubPage eyebrow="工具" title="按照你想构建的东西选择工具。" description="一套 Vibe Trading 工具栈可能包含 AI 模型、市场数据、回测环境和执行平台。我们按照工作流比较，而不是照搬营销宣传。" principles={["明确标注测试状态", "同时说明局限", "不出售排名"]} cards={[
        { eyebrow: "AI 模型", title: "思考与研究", description: "使用 ChatGPT、Claude 和研究工具组织问题、检查证据，并把想法转换成明确规则。", href: "/zh/blog?tag=llm" },
        { eyebrow: "平台", title: "图表与原型", description: "使用 TradingView 和无代码平台，把想法快速变成可见、可验证的原型。", href: "/zh/blog?tag=comparison" },
        { eyebrow: "框架", title: "诚实地回测", description: "把现实成本、样本外数据和可复现代码纳入验证。", href: "/zh/blog?tag=backtesting" },
        { eyebrow: "API", title: "谨慎地自动化", description: "只有当工作流通过模拟盘和风险检查后，才连接数据与券商。", href: "/zh/blog?tag=alpaca" },
      ]} posts={getPostsByCategory("Tools", "zh")} postsTitle="工具指南与比较" emptyTitle="工具测试正在进行" emptyText="只有当研究状态和局限可以被明确说明时，我们才会发布工具指南。" ctaLabel="浏览全部指南" ctaHref="/zh/blog" />
    </>
  );
}
