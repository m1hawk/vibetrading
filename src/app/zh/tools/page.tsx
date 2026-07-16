import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { getPostsByCategory } from "@/lib/posts";

export const metadata: Metadata = { title: "AI 交易工具对比与选择指南", description: "按 Vibe Trading 工作流选择 AI 模型、交易平台、API 和自动化工具。独立对比每种工具的能力、局限和真实使用场景。" ,
  alternates: {
    canonical: "/zh/tools",
  }};

export default function ZhToolsPage() {
  return <HubPage eyebrow="工具" title="按照你想构建的东西选择工具。" description="一套 Vibe Trading 工具栈可能包含 AI 模型、市场数据、回测环境和执行平台。我们按照工作流比较，而不是照搬营销宣传。" principles={["明确标注测试状态", "同时说明局限", "不出售排名"]} cards={[
    { eyebrow: "AI 模型", title: "思考与研究", description: "使用 ChatGPT、Claude 和研究工具组织问题、检查证据，并把想法转换成明确规则。" },
    { eyebrow: "平台", title: "图表与原型", description: "使用 TradingView 和无代码平台，把想法快速变成可见、可验证的原型。" },
    { eyebrow: "框架", title: "诚实地回测", description: "把现实成本、样本外数据和可复现代码纳入验证。" },
    { eyebrow: "API", title: "谨慎地自动化", description: "只有当工作流通过模拟盘和风险检查后，才连接数据与券商。" },
  ]} posts={getPostsByCategory("Tools", "zh")} postsTitle="工具指南与比较" emptyTitle="工具测试正在进行" emptyText="只有当研究状态和局限可以被明确说明时，我们才会发布工具指南。" ctaLabel="浏览全部指南" ctaHref="/zh/blog" />;
}
