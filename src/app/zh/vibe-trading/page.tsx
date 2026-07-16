import type { Metadata } from "next";
import { VibeTradingGuide } from "@/components/VibeTradingGuide";

export const metadata: Metadata = { title: "什么是 Vibe Trading？", description: "了解如何通过与 AI 对话，把市场想法变成可以回测和模拟验证的交易工作流。不需要量化背景，从自然语言开始系统学习。" ,
  alternates: {
    canonical: "/zh/vibe-trading",
  }};

export default function ZhVibeTradingPage() { return <VibeTradingGuide lang="zh" />; }
