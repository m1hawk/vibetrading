import type { Metadata } from "next";
import { VibeHome } from "@/components/VibeHome";

export const metadata: Metadata = {
  title: "人人都能开始的 Vibe Trading",
  description:
    "用自然语言和 AI，把市场想法变成研究、策略、回测和自动化工作流，不需要量化背景。",
};

export default function ZhHome() {
  return <VibeHome lang="zh" />;
}
