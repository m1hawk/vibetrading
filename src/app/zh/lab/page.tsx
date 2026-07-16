import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";

export const metadata: Metadata = { title: "Vibe Trading 实验室", description: "公开规则、现实成本、模拟盘过程和失败结果的透明 AI 交易实验。让每个有吸引力的想法都面对不方便但真实的证据，帮助散户交易者理性评估策略的真实可行性。",
  alternates: {
    canonical: "/zh/lab",
  }};

export default function ZhLabPage() {
  return <HubPage eyebrow="实验室" title="公开构建，公开验证。" description="实验室让有吸引力的想法面对不方便的证据。每个实验从固定规则开始，以完整结果结束，包括失败。" principles={["看到结果前固定规则", "计入手续费和滑点", "不挑选结果"]} cards={[
    { eyebrow: "实验方案", title: "先声明假设", description: "在测试前确定想法、数据、周期、成功指标、风险上限和停止条件。" },
    { eyebrow: "证据", title: "保留审计记录", description: "公开 Prompt、代码版本、决策、数据假设和重要修改。" },
    { eyebrow: "现实", title: "加入真实约束", description: "计入成本、滑点、延迟、缺失数据，以及回测本身可能错误的可能性。" },
    { eyebrow: "结论", title: "也发布失败", description: "被否定的想法同样是有价值的证据，不因为结果不漂亮而隐藏。" },
  ]} posts={[]} postsTitle="当前实验" emptyTitle="第一个公开实验正在设计" emptyText="只有当假设、规则、数据、成本和停止条件被提前固定后，实验才会正式发布。" ctaLabel="了解完整方法" ctaHref="/zh/vibe-trading" />;
}
