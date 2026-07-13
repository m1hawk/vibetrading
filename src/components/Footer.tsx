"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerCopy = {
  en: {
    description:
      "Turn market ideas into testable trading workflows with AI. No quant background required.",
    explore: "Explore",
    principles: "Principles",
    links: [
      ["Start Here", "/vibe-trading"],
      ["Guides", "/blog"],
      ["Tools", "/tools"],
      ["Build", "/build"],
      ["Lab", "/lab"],
    ],
    legal: [
      ["About", "/about"],
      ["Risk Disclaimer", "/disclaimer"],
      ["Privacy", "/privacy"],
      ["Affiliate Disclosure", "/affiliate"],
    ],
    note: "Education first. Paper first. Not financial advice.",
  },
  zh: {
    description: "用 AI 把市场想法变成可以验证的交易工作流，不需要量化背景。",
    explore: "探索",
    principles: "原则与披露",
    links: [
      ["从这里开始", "/zh/vibe-trading"],
      ["指南", "/zh/blog"],
      ["工具", "/zh/tools"],
      ["构建", "/zh/build"],
      ["实验室", "/zh/lab"],
    ],
    legal: [
      ["关于我们", "/zh/about"],
      ["风险声明", "/zh/disclaimer"],
      ["隐私政策", "/zh/privacy"],
      ["联盟披露", "/zh/affiliate"],
    ],
    note: "教育优先，模拟优先。不构成投资建议。",
  },
} as const;

export function Footer() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/zh") ? "zh" : "en";
  const t = footerCopy[lang];
  const homeHref = lang === "zh" ? "/zh" : "/";

  return (
    <footer className="relative border-t border-border/60 bg-[var(--page)]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-[1.5fr_0.75fr_0.75fr]">
          <div>
            <Link href={homeHref} className="flex items-center gap-2.5 text-foreground">
              <span className="flex h-7 w-7 items-center justify-center bg-ink font-mono text-[11px] font-semibold text-accent">
                V
              </span>
              <span className="font-serif text-lg font-bold tracking-tight">VibeTrading</span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted">{t.description}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              Describe → Build → Backtest → Paper trade → Iterate
            </p>
          </div>

          <div>
            <div className="nx-label mb-5">{t.explore}</div>
            <ul className="space-y-3 text-sm text-muted">
              {t.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="nx-label mb-5">{t.principles}</div>
            <ul className="space-y-3 text-sm text-muted">
              {t.legal.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-foreground">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} VibeTrading.fun</p>
          <p className="normal-case tracking-normal">{t.note}</p>
        </div>
      </div>
    </footer>
  );
}
