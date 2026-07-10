"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

const footerCopy = {
  en: {
    description: "Turn market ideas into testable trading workflows with AI. No quant background required.",
    explore: "Explore",
    principles: "Principles",
    links: [["Start Here", "/vibe-trading"], ["Guides", "/blog"], ["Tools", "/tools"], ["Build", "/build"], ["Lab", "/lab"]],
    legal: [["About", "/about"], ["Risk Disclaimer", "/disclaimer"], ["Privacy", "/privacy"], ["Affiliate Disclosure", "/affiliate"]],
    note: "Education first. Paper first. Not financial advice.",
  },
  zh: {
    description: "用 AI 把市场想法变成可以验证的交易工作流，不需要量化背景。",
    explore: "探索",
    principles: "原则与披露",
    links: [["从这里开始", "/zh/vibe-trading"], ["指南", "/zh/blog"], ["工具", "/zh/tools"], ["构建", "/zh/build"], ["实验室", "/zh/lab"]],
    legal: [["关于我们", "/about"], ["风险声明", "/disclaimer"], ["隐私政策", "/privacy"], ["联盟披露", "/affiliate"]],
    note: "教育优先，模拟优先。不构成投资建议。",
  },
} as const;

export function Footer() {
  const pathname = usePathname();
  const lang = pathname.startsWith("/zh") ? "zh" : "en";
  const t = footerCopy[lang];
  const homeHref = lang === "zh" ? "/zh" : "/";

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_0.75fr_0.75fr]">
          <div>
            <Link href={homeHref} className="flex items-center gap-2.5 text-foreground"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white"><Sparkles className="h-4 w-4" /></span><span className="font-semibold tracking-tight">VibeTrading<span className="text-accent">.fun</span></span></Link>
            <p className="mt-5 max-w-md text-sm leading-6 text-muted">{t.description}</p>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Describe → Build → Backtest → Paper trade → Iterate</p>
          </div>
          <div><h3 className="text-sm font-semibold text-foreground">{t.explore}</h3><ul className="mt-4 space-y-3 text-sm text-muted">{t.links.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-foreground">{label}</Link></li>)}</ul></div>
          <div><h3 className="text-sm font-semibold text-foreground">{t.principles}</h3><ul className="mt-4 space-y-3 text-sm text-muted">{t.legal.map(([label, href]) => <li key={href}><Link href={href} className="hover:text-foreground">{label}</Link></li>)}</ul></div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} VibeTrading.fun</p><p>{t.note}</p></div>
      </div>
    </footer>
  );
}
