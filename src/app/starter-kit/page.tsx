import { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FlaskConical,
  Scale,
  Shield,
  Target,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learn AI Trading",
  description:
    "Free, evidence-based learning resources for retail traders: guides, checklists, tool comparisons, and a structured path from idea to paper trading.",
};

const learningPath = [
  {
    step: "01",
    title: "Learn the fundamentals",
    description:
      "Start with honest expectations, scam red flags, and what vibe trading means before spending a dollar.",
    links: [
      { label: "Does AI trading really work?", href: "/blog/does-ai-trading-really-work" },
      { label: "AI trading for beginners", href: "/blog/ai-trading-for-beginners" },
      { label: "Scam red flags", href: "/blog/ai-trading-scams-red-flags" },
    ],
  },
  {
    step: "02",
    title: "Build and backtest",
    description:
      "Turn an idea into rules, code, and a backtest. Validate with realistic costs and out-of-sample data.",
    links: [
      { label: "Your first AI trading bot", href: "/blog/first-ai-trading-bot-ema-cross-alpaca" },
      { label: "Backtesting basics", href: "/blog/backtrader-backtesting-basics" },
      { label: "Avoid overfitting", href: "/blog/how-to-backtest-without-overfitting" },
    ],
  },
  {
    step: "03",
    title: "Paper trade and go live",
    description:
      "Run your workflow without real capital, keep a decision log, and use a readiness checklist before live trading.",
    links: [
      { label: "Paper-to-live checklist", href: "/blog/paper-to-live-trading-checklist" },
      { label: "Tool stack comparison", href: "/blog/quantconnect-vs-backtrader-vs-alpaca-vs-mql5" },
      { label: "Browse all guides", href: "/blog" },
    ],
  },
];

const featuredGuides = [
  {
    eyebrow: "Basics",
    title: "Does AI Trading Really Work?",
    description:
      "A no-hype retail trader's guide to what AI trading can and cannot do in 2026.",
    href: "/blog/does-ai-trading-really-work",
  },
  {
    eyebrow: "Tutorial",
    title: "Your First AI Trading Bot",
    description:
      "Build an EMA-cross bot with Python and Alpaca paper trading, step by step.",
    href: "/blog/first-ai-trading-bot-ema-cross-alpaca",
  },
  {
    eyebrow: "Risk",
    title: "AI Trading Scam Red Flags",
    description:
      "Seven warning signs that help you spot overhyped or fraudulent services before you pay.",
    href: "/blog/ai-trading-scams-red-flags",
  },
  {
    eyebrow: "Validation",
    title: "Backtest Without Overfitting",
    description:
      "Use walk-forward tests, out-of-sample checks, and realistic costs to validate honestly.",
    href: "/blog/how-to-backtest-without-overfitting",
  },
];

const scamChecks = [
  "No guaranteed or 'risk-free' return claims",
  "Team members have real, verifiable identities",
  "Track record is third-party verified or auditable",
  "No pressure to deposit immediately",
  "No fake celebrity endorsements",
  "No minimum deposit traps like $250",
  "Withdrawals process within a reasonable timeframe",
  "Clear risk disclaimers are visible",
];

const riskRules = [
  {
    title: "Per Trade Risk",
    text: "Risk no more than 1-2% of your total account on any single trade.",
  },
  {
    title: "Daily Loss Limit",
    text: "Stop trading for the day if you lose more than 3% of your account.",
  },
  {
    title: "Position Sizing",
    text: "Position size = (Account × Risk%) ÷ (Entry − Stop Loss).",
  },
  {
    title: "Paper First",
    text: "Run every new strategy in paper trading for at least 30 days.",
  },
];

const tools = [
  { name: "Trade Ideas", bestFor: "Day trading, AI signals", price: "$118/mo", level: "Intermediate" },
  { name: "TrendSpider", bestFor: "Technical analysis", price: "$39/mo", level: "Intermediate" },
  { name: "TradingView", bestFor: "Charting, community", price: "Free / $15/mo", level: "Beginner" },
  { name: "Tickeron", bestFor: "AI predictions", price: "$180/yr", level: "Beginner" },
  { name: "Alpaca API", bestFor: "Custom bots", price: "Free", level: "Advanced" },
];

const challengeSteps = [
  "Choose one tool or strategy to test.",
  "Define entry, exit, and risk rules before starting.",
  "Start with a virtual $1,000–$10,000 account.",
  "Record every trade: symbol, entry, exit, reason, P&L.",
  "Review results every 7 days.",
  "After 30 days, calculate win rate, profit factor, and max drawdown.",
  "Only move to live trading if results are consistent.",
];

export default function StarterKitPage() {
  return (
    <div>
      {/* Hero */}
      <section className="hero-grid relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="nx-label">Education</div>
          <h1 className="nx-display mt-5 text-5xl sm:text-7xl">
            Learn Vibe Trading
          </h1>
          <p className="nx-lead mt-8 max-w-4xl text-2xl sm:text-3xl">
            A curated, no-hype education hub for retail traders who want to turn
            market ideas into testable, AI-assisted workflows.
          </p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {[
              "Free guides and checklists",
              "Evidence-based testing",
              "Risk-first approach",
              "No coding required to start",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="nx-display text-3xl sm:text-4xl">Start with your goal</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Everyone starts at a different level. Pick the stage that matches
            where you are today and follow the guides in order.
          </p>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {learningPath.map(({ step, title, description, links }) => (
              <div key={step} className="nx-card p-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
                  {step}
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{description}</p>
                <ul className="mt-6 space-y-2">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
                      >
                        <BookOpen className="h-4 w-4" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Guides */}
      <section className="nx-section-ink px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="nx-display text-3xl sm:text-4xl">Curated guides</h2>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-on-ink-muted">
            Hand-picked posts that answer the most common questions we see from
            retail traders getting started with AI.
          </p>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {featuredGuides.map((guide) => (
              <Link key={guide.href} href={guide.href} className="nx-card-ink group p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  {guide.eyebrow}
                </p>
                <h3 className="mt-4 font-serif text-xl font-semibold text-on-ink">
                  {guide.title}
                </h3>
                <p className="mt-3 leading-7 text-on-ink-muted">
                  {guide.description}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scam Checklist */}
      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="nx-card border-warning/25 p-8 sm:p-12">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-warning" />
              <h2 className="nx-display text-2xl sm:text-3xl">
                AI Trading Scam Red Flags
              </h2>
            </div>
            <p className="mt-4 max-w-2xl leading-7 text-muted">
              Before using any AI trading service, verify each item below. Read
              the{" "}
              <Link
                href="/blog/ai-trading-scams-red-flags"
                className="text-accent hover:underline"
              >
                full red flags guide
              </Link>{" "}
              for real examples.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {scamChecks.map((item) => (
                <li key={item} className="flex items-start gap-3 text-foreground">
                  <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-warning" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Risk Framework */}
      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <Scale className="h-6 w-6 text-accent" />
            <h2 className="nx-display text-3xl sm:text-4xl">
              Risk Management Framework
            </h2>
          </div>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Survival comes before returns. These four rules are the minimum
            safety net for any new strategy.
          </p>
          <div className="mt-9 grid gap-4 md:grid-cols-2">
            {riskRules.map(({ title, text }) => (
              <div key={title} className="nx-card p-7">
                <h3 className="font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Comparison */}
      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <Wrench className="h-6 w-6 text-accent" />
            <h2 className="nx-display text-3xl sm:text-4xl">
              Tool Comparison Matrix
            </h2>
          </div>
          <p className="mt-4 max-w-2xl leading-7 text-muted">
            Match a tool to your skill level and goal. Prices and features
            change often, so verify on the vendor&apos;s site before signing up.
          </p>
          <div className="mt-9 overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-soft">
                  <th className="px-6 py-4 text-foreground">Tool</th>
                  <th className="px-6 py-4 text-foreground">Best For</th>
                  <th className="px-6 py-4 text-foreground">Price</th>
                  <th className="px-6 py-4 text-foreground">Skill Level</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {tools.map((tool) => (
                  <tr key={tool.name} className="border-b border-border last:border-0">
                    <td className="px-6 py-4 font-medium text-foreground">
                      {tool.name}
                    </td>
                    <td className="px-6 py-4">{tool.bestFor}</td>
                    <td className="px-6 py-4">{tool.price}</td>
                    <td className="px-6 py-4">{tool.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 30-Day Challenge */}
      <section className="nx-section-ink px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-accent" />
            <h2 className="nx-display text-3xl sm:text-4xl">
              30-Day Paper Trading Challenge
            </h2>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-on-ink-muted">
            Use this structure for your first month of AI trading testing. No
            real capital, just evidence.
          </p>
          <ol className="mt-9 space-y-3">
            {challengeSteps.map((step, index) => (
              <li
                key={step}
                className="nx-card-ink grid gap-3 px-5 py-5 sm:grid-cols-[3rem_1fr] sm:items-start"
              >
                <span className="font-mono text-sm text-accent">0{index + 1}</span>
                <span className="leading-7 text-on-ink-muted">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="nx-section px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="nx-card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-12">
            <div>
              <div className="flex items-center gap-3">
                <FlaskConical className="h-6 w-6 text-accent" />
                <h2 className="nx-display text-2xl sm:text-3xl">
                  Ready to build something?
                </h2>
              </div>
              <p className="mt-3 max-w-2xl leading-7 text-muted">
                Explore step-by-step tutorials for building bots, backtests, and
                broker automations.
              </p>
            </div>
            <Link href="/tutorials" className="nx-btn nx-btn-primary shrink-0">
              Browse tutorials
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
