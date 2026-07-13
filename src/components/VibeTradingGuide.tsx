import Link from "next/link";
import { ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import type { Lang } from "@/lib/posts";

const content = {
  en: {
    eyebrow: "Start here",
    title: "What is Vibe Trading?",
    definition:
      "Vibe Trading is turning a market idea into a testable trading workflow by talking to AI.",
    intro:
      "Like vibe coding, it begins with intent expressed in plain language. AI can help research the market, formalize rules, write code, connect tools, and analyze results. You remain responsible for the assumptions, the tests, and every decision involving capital.",
    loopTitle: "The five-step loop",
    steps: [
      ["Describe", "State the market idea, timeframe, constraints, and what would prove it wrong."],
      ["Build", "Ask AI to turn the idea into research steps, explicit rules, code, or an automation."],
      ["Backtest", "Test with realistic data, fees, slippage, and out-of-sample periods."],
      ["Paper trade", "Run the workflow without capital and keep an auditable decision log."],
      ["Iterate", "Use evidence to improve the workflow—or stop using it."],
    ],
    levelsTitle: "You do not have to become a quant",
    levelsIntro: "Vibe Trading is a ladder. Begin at the level that matches what you want to make.",
    levels: [
      ["No-code", "Use prompts, AI research tools, spreadsheets, and ready-made platforms."],
      ["Low-code", "Let AI create TradingView scripts and small automations that you can inspect."],
      ["Developer", "Build with Python, market data, broker APIs, backtests, and agents."],
    ],
    isTitle: "What it is—and what it is not",
    is: [
      "A faster way to turn ideas into explicit, testable workflows",
      "A learning process that makes assumptions visible",
      "A human-and-AI collaboration with risk controls",
    ],
    isNot: [
      "A guarantee that AI can predict the market",
      "A replacement for validation or judgment",
      "A signal service or shortcut to certain returns",
    ],
    firstTitle: "Your first Vibe Trading project",
    firstText:
      "Take one simple market idea and ask AI to express it as unambiguous entry, exit, and risk rules. Do not use real money. Try to disprove the idea with historical data before you try to improve it.",
    cta: "Explore the build guides",
  },
  zh: {
    eyebrow: "从这里开始",
    title: "什么是 Vibe Trading？",
    definition: "Vibe Trading，就是通过与 AI 对话，把一个市场想法变成可以验证的交易工作流。",
    intro:
      "与 Vibe Coding 一样，它从用自然语言表达意图开始。AI 可以帮助研究市场、明确规则、编写代码、连接工具并分析结果；假设是否合理、验证是否充分以及是否投入真实资金，始终由人负责。",
    loopTitle: "五步工作循环",
    steps: [
      ["描述", "说明市场想法、时间周期、限制条件，以及什么证据能推翻它。"],
      ["构建", "让 AI 把想法转换成研究步骤、明确规则、代码或自动化流程。"],
      ["回测", "使用现实的数据、手续费、滑点和样本外区间进行验证。"],
      ["模拟盘", "先不投入真实资金，并保留可以审计的决策记录。"],
      ["迭代", "根据证据改进工作流，或者停止使用它。"],
    ],
    levelsTitle: "你不需要先成为量化专家",
    levelsIntro: "Vibe Trading 是一把梯子，从与你想构建的东西相匹配的层级开始。",
    levels: [
      ["无代码", "使用 Prompt、AI 研究工具、表格和现成平台。"],
      ["低代码", "让 AI 创建可以检查和修改的 TradingView 脚本与小型自动化。"],
      ["开发者", "使用 Python、市场数据、券商 API、回测框架和 Agent。"],
    ],
    isTitle: "它是什么，又不是什么",
    is: ["把想法快速转换成明确、可验证工作流的方法", "让假设和推理过程变得可见的学习方式", "带有风险控制的人机协作"],
    isNot: ["AI 可以准确预测市场的保证", "对验证和人工判断的替代", "交易信号服务或确定性收益捷径"],
    firstTitle: "你的第一个 Vibe Trading 项目",
    firstText:
      "选择一个简单的市场想法，让 AI 把它表达成没有歧义的入场、离场和风险规则。不要投入真实资金；先用历史数据设法推翻它，再考虑如何改进它。",
    cta: "浏览构建指南",
  },
} as const;

export function VibeTradingGuide({ lang }: { lang: Lang }) {
  const t = content[lang];
  const prefix = lang === "zh" ? "/zh" : "";
  return (
    <article>
      <section className="hero-grid relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="nx-label">{t.eyebrow}</div>
          <h1 className="nx-display mt-5 text-5xl sm:text-7xl">{t.title}</h1>
          <p className="nx-lead mt-8 max-w-4xl text-2xl sm:text-3xl">{t.definition}</p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{t.intro}</p>
        </div>
      </section>

      <section className="nx-section-ink px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[0.65fr_1.35fr]">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.loopTitle}</h2>
          <ol className="space-y-3">
            {t.steps.map(([title, description], index) => (
              <li
                key={title}
                className="nx-card-ink grid gap-3 px-5 py-5 sm:grid-cols-[3rem_8rem_1fr] sm:items-start"
              >
                <span className="font-mono text-sm text-accent">0{index + 1}</span>
                <strong className="font-serif text-lg text-on-ink">{title}</strong>
                <span className="leading-7 text-on-ink-muted">{description}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.levelsTitle}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-muted">{t.levelsIntro}</p>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {t.levels.map(([title, description], i) => (
              <div key={title} className="nx-card p-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
                  L{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.isTitle}</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <div className="nx-card border-success/25 p-7">
              {t.is.map((item) => (
                <p
                  key={item}
                  className="flex gap-3 border-b border-success/10 py-4 last:border-0"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
            <div className="nx-card border-danger/25 p-7">
              {t.isNot.map((item) => (
                <p
                  key={item}
                  className="flex gap-3 border-b border-danger/10 py-4 last:border-0"
                >
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-danger" />
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="nx-section-ink px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.firstTitle}</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-on-ink-muted">{t.firstText}</p>
          <Link href={`${prefix}/build`} className="nx-btn mt-8 bg-on-ink text-ink hover:bg-white">
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </article>
  );
}
