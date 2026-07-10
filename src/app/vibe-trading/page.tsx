import type { Metadata } from "next";
import { VibeTradingGuide } from "@/components/VibeTradingGuide";

export const metadata: Metadata = { title: "What Is Vibe Trading?", description: "Learn how to turn market ideas into testable trading workflows with AI—from plain English to backtest and paper trading." };

export default function VibeTradingPage() { return <VibeTradingGuide lang="en" />; }
