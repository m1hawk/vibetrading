import type { Metadata } from "next";
import { VibeHome } from "@/components/VibeHome";

export const metadata: Metadata = {
  title: "人人都能开始的 Vibe Trading",
  description:
    "用自然语言和 AI，把市场想法变成研究、策略、回测和自动化交易工作流。不需要量化背景，VibeTrading.fun 让每个人都能系统学习 AI 交易。",

  alternates: {
    canonical: "/zh",
  }};

export default function ZhHome() {
  return (
    <>
      <h1 className="sr-only">VibeTrading.fun — 人人都能开始的 Vibe Trading</h1>
      <VibeHome lang="zh" />
    </>
  );
}
