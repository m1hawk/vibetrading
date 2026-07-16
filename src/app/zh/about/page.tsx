import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "关于我们 - VibeTrading.fun",
  description: "了解 VibeTrading.fun 的创立原因、我们的测试方法，以及我们对散户交易者提供诚实、基于证据教育的长期承诺。本站不卖课、不推荐未验证工具，只分享可复现的方法。",

  alternates: {
    canonical: "/zh/about",
  }};

export default function AboutPageZh() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="nx-label">关于我们</div>
      <h1 className="nx-display mt-5 text-5xl sm:text-6xl">市场想法应该可以被验证。</h1>
      <div className="prose mt-10 max-w-3xl">
        <p>VibeTrading.fun 是一本实用指南，面向那些想用 AI 研究市场、把策略形式化、构建工具并测试交易工作流的人。</p>
        <p>我们相信 AI 最有用的部分不是给出一个自信的预测，而是能帮你更快地把模糊的想法变成明确的假设、可检查的规则、可运行的代码，以及可以证明这个想法错误的证据。</p>
        <h2>我们发布什么</h2>
        <ul><li>面向新手的 AI 与算法交易解释</li><li>无代码、低代码与开发者构建指南</li><li>带研究现状与局限性的工具对比</li><li>回测、模拟交易实验与失败的想法</li><li>可复用的提示词、检查清单、代码与评估框架</li></ul>
        <h2>我们不销售什么</h2>
        <ul><li>保证收益</li><li>秘密信号或跟单承诺</li><li>受未披露报酬影响的排名</li><li>没有假设与风险说明的结果</li></ul>
        <h2>我们的方法</h2>
        <p>描述 → 构建 → 回测 → 模拟交易 → 迭代。规则先于结果。成本与局限性会被一并列出。失败的实验仍然是可发表的证据。</p>
        <h2>责任</h2>
        <p>本站所有内容均用于教育目的。AI 可以帮助撰写研究与代码，但它无法为资金承担责任。每个工具、假设和输出都必须经过独立核查。</p>
      </div>
      <Link href="/zh/vibe-trading" className="nx-btn nx-btn-primary mt-10">
        阅读 Vibe Trading 指南
      </Link>
    </div>
  );
}
