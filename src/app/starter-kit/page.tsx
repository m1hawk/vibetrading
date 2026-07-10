import { Metadata } from "next";
import Link from "next/link";
import { Download, AlertTriangle } from "lucide-react";
import { StarterKitForm } from "@/components/StarterKitForm";

export const metadata: Metadata = {
  title: "Starter Kit",
  description:
    "Free starter kit with a checklist, code templates, and a tool comparison sheet for retail traders getting started with AI trading.",
};

export default function StarterKitPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero */}
      <div className="rounded-2xl border border-border bg-surface p-8 sm:p-12">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-accent">
          <Download className="h-4 w-4" />
          Free Download
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Starter Kit
        </h1>
        <p className="mt-4 text-lg text-muted">
          A free collection of checklists, templates, and frameworks to help you
          start testing AI trading tools without blowing up your account.
        </p>

        <StarterKitForm />
      </div>

      {/* Kit Contents */}
      <div className="mt-12 space-y-12">
        {/* Scam Checklist */}
        <section className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-2xl font-bold text-foreground">
            AI Trading Scam Red Flags Checklist
          </h2>
          <p className="mt-2 text-muted">
            Before using any AI trading service, verify each item below.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "No guaranteed or 'risk-free' return claims",
              "Team members have real, verifiable identities",
              "Track record is third-party verified or auditable",
              "No pressure to deposit immediately",
              "No fake celebrity endorsements",
              "No minimum deposit traps like $250",
              "Withdrawals process within a reasonable timeframe",
              "Clear risk disclaimers are visible",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-foreground">
                <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Risk Framework */}
        <section className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-2xl font-bold text-foreground">
            Risk Management Framework
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-semibold text-foreground">Per Trade Risk</h3>
              <p className="mt-2 text-sm text-muted">
                Risk no more than 1-2% of your total account on any single trade.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-semibold text-foreground">Daily Loss Limit</h3>
              <p className="mt-2 text-sm text-muted">
                Stop trading for the day if you lose more than 3% of your account.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-semibold text-foreground">Position Sizing</h3>
              <p className="mt-2 text-sm text-muted">
                Position size = (Account × Risk%) ÷ (Entry − Stop Loss).
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <h3 className="font-semibold text-foreground">Paper First</h3>
              <p className="mt-2 text-sm text-muted">
                Run every new strategy in paper trading for at least 30 days.
              </p>
            </div>
          </div>
        </section>

        {/* Tool Comparison */}
        <section className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-2xl font-bold text-foreground">
            Tool Comparison Matrix
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-soft">
                  <th className="pb-3 text-foreground">Tool</th>
                  <th className="pb-3 text-foreground">Best For</th>
                  <th className="pb-3 text-foreground">Price</th>
                  <th className="pb-3 text-foreground">Skill Level</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-border">
                  <td className="py-3 font-medium text-foreground">Trade Ideas</td>
                  <td>Day trading, AI signals</td>
                  <td>$118/mo</td>
                  <td>Intermediate</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 font-medium text-foreground">TrendSpider</td>
                  <td>Technical analysis</td>
                  <td>$39/mo</td>
                  <td>Intermediate</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 font-medium text-foreground">TradingView</td>
                  <td>Charting, community</td>
                  <td>Free / $15/mo</td>
                  <td>Beginner</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 font-medium text-foreground">Tickeron</td>
                  <td>AI predictions</td>
                  <td>$180/yr</td>
                  <td>Beginner</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 font-medium text-foreground">Alpaca API</td>
                  <td>Custom bots</td>
                  <td>Free</td>
                  <td>Advanced</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 30-Day Challenge Tracker */}
        <section className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-2xl font-bold text-foreground">
            30-Day Paper Trading Challenge
          </h2>
          <p className="mt-2 text-muted">
            Use this structure for your first month of AI trading testing.
          </p>
          <ol className="mt-6 list-decimal space-y-3 pl-5 text-foreground">
            <li>Choose one tool or strategy to test.</li>
            <li>Define entry, exit, and risk rules before starting.</li>
            <li>Start with a virtual $1,000–$10,000 account.</li>
            <li>Record every trade: symbol, entry, exit, reason, P&L.</li>
            <li>Review results every 7 days.</li>
            <li>
              After 30 days, calculate win rate, profit factor, and max drawdown.
            </li>
            <li>Only move to live trading if results are consistent.</li>
          </ol>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-accent p-8 text-center">
          <h2 className="text-2xl font-bold text-accent-foreground">
            Ready to Start Testing?
          </h2>
          <p className="mt-2 text-accent-foreground/90">
            Begin with our honest guide to what AI trading can and can&apos;t do.
          </p>
          <Link
            href="/blog/does-ai-trading-really-work"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent-foreground"
          >
            Read the Guide
          </Link>
        </div>
      </div>
    </div>
  );
}
