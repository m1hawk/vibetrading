import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Braces,
  CheckCircle2,
  MessageSquareText,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { getAllPosts, getFeaturedPosts, type Lang } from "@/lib/posts";
import { JsonLd } from "@/components/JsonLd";
import { PostCard } from "@/components/PostCard";

const copy = {
  en: {
    eyebrow: "The practical field guide to AI-powered trading",
    title: "Vibe Trading for Everyone",
    intro:
      "Turn a market idea into research, a strategy, a backtest, or an automated workflow by talking to AI. Start with no-code. Go as deep as you want.",
    primaryCta: "Start vibe trading",
    secondaryCta: "See what we build",
    proof: ["No quant background required", "Paper first", "No signals for sale"],
    pathEyebrow: "Choose a starting point",
    pathTitle: "What do you want to make with AI?",
    paths: [
      {
        title: "Research a market",
        description: "Turn filings, news, and market data into a repeatable research workflow.",
        href: "/blog/does-ai-trading-really-work",
        cta: "Learn the foundations",
        icon: Search,
      },
      {
        title: "Test a strategy",
        description: "Translate a plain-English idea into rules, then pressure-test the result.",
        href: "/lab",
        cta: "Explore the lab",
        icon: BarChart3,
      },
      {
        title: "Build a trading tool",
        description: "Create a no-code workflow, TradingView script, Python bot, or AI agent.",
        href: "/build",
        cta: "Browse builds",
        icon: Braces,
      },
      {
        title: "Choose the right tools",
        description: "Compare AI models, trading platforms, APIs, and automation tools.",
        href: "/tools",
        cta: "Compare tools",
        icon: Bot,
      },
    ],
    methodEyebrow: "The Vibe Trading loop",
    methodTitle: "An idea is only the beginning.",
    methodIntro:
      "AI makes building faster. The edge still comes from asking a clear question, testing honestly, and knowing when not to trade.",
    steps: [
      ["01", "Describe", "Explain the market idea and constraints in plain language."],
      ["02", "Build", "Use AI to turn the idea into research, rules, code, or a tool."],
      ["03", "Backtest", "Check the idea against data, fees, slippage, and bad regimes."],
      ["04", "Paper trade", "Run it without capital and record every decision."],
      ["05", "Iterate", "Keep, change, or kill the idea based on evidence."],
    ],
    levelsEyebrow: "Built for every starting level",
    levelsTitle: "Start with conversation. Add code only when it helps.",
    levels: [
      ["No-code", "Prompts, AI research, ready-made tools, and reusable checklists.", "Start here"],
      ["Low-code", "AI-generated scripts, TradingView strategies, and editable automations.", "Build a workflow"],
      ["Developer", "Python, broker APIs, backtesting frameworks, and autonomous agents.", "Go deeper"],
    ],
    featuredEyebrow: "Build notes",
    featuredTitle: "See the idea, the build, and the limits.",
    featuredIntro:
      "We publish the workflow—not just the polished result—so you can reproduce it and decide what to trust.",
    guidesTitle: "Latest field guides",
    guidesCta: "Browse all guides",
    principleTitle: "We do not sell signals.",
    principleText:
      "We show how market ideas are researched, built, tested, and sometimes rejected. Every workflow starts with education and ends with human responsibility.",
    principleCta: "Read the Vibe Trading guide",
  },
  zh: {
    eyebrow: "AI 驱动交易的实践指南",
    title: "人人都能开始的 Vibe Trading",
    intro:
      "用自然语言告诉 AI 你的市场想法，把它变成研究、策略、回测或自动化工作流。从无代码开始，按自己的节奏深入。",
    primaryCta: "开始 Vibe Trading",
    secondaryCta: "看看我们做了什么",
    proof: ["不需要量化背景", "先模拟，再实盘", "不出售交易信号"],
    pathEyebrow: "选择你的起点",
    pathTitle: "你想用 AI 做什么？",
    paths: [
      {
        title: "研究一个市场",
        description: "把财报、新闻和市场数据变成可以重复执行的研究流程。",
        href: "/zh/blog/does-ai-trading-really-work",
        cta: "了解基础",
        icon: Search,
      },
      {
        title: "验证一个策略",
        description: "把自然语言想法转换成规则，再用真实约束检验结果。",
        href: "/zh/lab",
        cta: "进入实验室",
        icon: BarChart3,
      },
      {
        title: "构建一个交易工具",
        description: "创建无代码工作流、TradingView 脚本、Python Bot 或 AI Agent。",
        href: "/zh/build",
        cta: "浏览构建指南",
        icon: Braces,
      },
      {
        title: "选择正确的工具",
        description: "比较 AI 模型、交易平台、API 和自动化工具。",
        href: "/zh/tools",
        cta: "比较工具",
        icon: Bot,
      },
    ],
    methodEyebrow: "Vibe Trading 循环",
    methodTitle: "想法只是开始。",
    methodIntro:
      "AI 让构建更快，优势仍然来自清晰的问题、诚实的验证，以及知道什么时候不应该交易。",
    steps: [
      ["01", "描述", "用自然语言说明市场想法、规则和约束。"],
      ["02", "构建", "让 AI 把想法变成研究、规则、代码或工具。"],
      ["03", "回测", "把手续费、滑点和不同市场环境纳入验证。"],
      ["04", "模拟盘", "先不投入真实资金，并记录每一次决策。"],
      ["05", "迭代", "根据证据保留、修改或者放弃想法。"],
    ],
    levelsEyebrow: "适合每一种起点",
    levelsTitle: "从对话开始，只在真正有用时增加代码。",
    levels: [
      ["无代码", "Prompt、AI 研究、现成工具和可复用检查表。", "从这里开始"],
      ["低代码", "AI 生成脚本、TradingView 策略和可编辑自动化。", "构建工作流"],
      ["开发者", "Python、券商 API、回测框架和自主 Agent。", "继续深入"],
    ],
    featuredEyebrow: "构建笔记",
    featuredTitle: "看见想法、构建过程和真实边界。",
    featuredIntro:
      "我们公开完整工作流，而不只展示漂亮的结果，让你可以复现并自行判断什么值得信任。",
    guidesTitle: "最新实践指南",
    guidesCta: "浏览全部指南",
    principleTitle: "我们不出售交易信号。",
    principleText:
      "我们展示市场想法如何被研究、构建、验证，有时也会被否定。每个工作流始于教育，最终由人承担责任。",
    principleCta: "阅读 Vibe Trading 指南",
  },
} as const;

export function VibeHome({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const prefix = lang === "zh" ? "/zh" : "";
  const featuredPosts = getFeaturedPosts(lang).slice(0, 2);
  const recentPosts = getAllPosts(lang).slice(0, 3);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VibeTrading.fun",
    url: `https://vibetrading.fun${prefix}`,
    description: t.intro,
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <div className="overflow-hidden">
        <section className="hero-grid relative border-b border-border px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="absolute inset-x-0 top-0 mx-auto h-64 max-w-4xl bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
                <Sparkles className="h-4 w-4" />
                {t.eyebrow}
              </div>
              <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.055em] text-foreground sm:text-6xl lg:text-8xl">
                {t.title}
              </h1>
              <p className="mt-7 max-w-3xl text-lg leading-8 text-muted sm:text-xl">
                {t.intro}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link href={`${prefix}/vibe-trading`} className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground transition hover:bg-accent-hover">
                  {t.primaryCta}<ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={`${prefix}/build`} className="inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-surface/70 px-6 py-3.5 font-medium text-foreground transition hover:border-accent/50 hover:bg-surface-elevated">
                  {t.secondaryCta}
                </Link>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
                {t.proof.map((item) => (
                  <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{t.pathEyebrow}</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">{t.pathTitle}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {t.paths.map((path) => {
                const Icon = path.icon;
                return (
                  <Link key={path.title} href={path.href} className="group rounded-3xl border border-border bg-background p-7 transition hover:-translate-y-0.5 hover:border-accent/50 hover:bg-surface-elevated">
                    <div className="flex items-start justify-between gap-6">
                      <div className="rounded-2xl border border-border bg-surface p-3 text-accent"><Icon className="h-6 w-6" /></div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
                    </div>
                    <h3 className="mt-8 text-2xl font-semibold tracking-tight">{path.title}</h3>
                    <p className="mt-3 max-w-md leading-7 text-muted">{path.description}</p>
                    <p className="mt-6 text-sm font-medium text-accent">{path.cta}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{t.methodEyebrow}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{t.methodTitle}</h2>
              <p className="mt-5 leading-7 text-muted">{t.methodIntro}</p>
            </div>
            <ol className="border-t border-border">
              {t.steps.map(([number, title, description]) => (
                <li key={number} className="grid gap-3 border-b border-border py-6 sm:grid-cols-[3rem_9rem_1fr] sm:items-start">
                  <span className="font-mono text-sm text-accent">{number}</span>
                  <span className="font-semibold text-foreground">{title}</span>
                  <span className="leading-7 text-muted">{description}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{t.levelsEyebrow}</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold tracking-tight sm:text-5xl">{t.levelsTitle}</h2>
            <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-3">
              {t.levels.map(([title, description, cta], index) => (
                <div key={title} className="bg-background p-7">
                  <div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">0{index + 1}</span><MessageSquareText className="h-5 w-5 text-accent" /></div>
                  <h3 className="mt-10 text-2xl font-semibold">{title}</h3>
                  <p className="mt-3 min-h-14 leading-7 text-muted">{description}</p>
                  <Link href={`${prefix}/build`} className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent">{cta}<ArrowRight className="h-4 w-4" /></Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <section id="builds" className="border-b border-border px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                <div><p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{t.featuredEyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">{t.featuredTitle}</h2></div>
                <p className="leading-7 text-muted lg:pb-1">{t.featuredIntro}</p>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {featuredPosts.map((post) => <PostCard key={post.slug} post={post} />)}
              </div>
            </div>
          </section>
        )}

        <section className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-6"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.guidesTitle}</h2><Link href={`${prefix}/blog`} className="hidden items-center gap-2 text-sm font-medium text-accent sm:flex">{t.guidesCta}<ArrowRight className="h-4 w-4" /></Link></div>
            <div className="mt-8 grid gap-6 md:grid-cols-3">{recentPosts.map((post) => <PostCard key={post.slug} post={post} />)}</div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-accent/30 bg-accent/10 p-8 sm:p-12 lg:p-16">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl"><div className="inline-flex rounded-2xl border border-accent/30 bg-background/50 p-3 text-accent"><ShieldCheck className="h-6 w-6" /></div><h2 className="mt-7 text-3xl font-semibold tracking-tight sm:text-5xl">{t.principleTitle}</h2><p className="mt-5 text-lg leading-8 text-muted">{t.principleText}</p></div>
              <Link href={`${prefix}/vibe-trading`} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 font-medium text-background transition hover:opacity-90">{t.principleCta}<ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
