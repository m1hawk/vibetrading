"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const nav = {
  en: [
    { href: "/vibe-trading", label: "Start Here" },
    { href: "/blog", label: "Guides" },
    { href: "/tools", label: "Tools" },
    { href: "/build", label: "Build" },
    { href: "/lab", label: "Lab" },
  ],
  zh: [
    { href: "/zh/vibe-trading", label: "从这里开始" },
    { href: "/zh/blog", label: "指南" },
    { href: "/zh/tools", label: "工具" },
    { href: "/zh/build", label: "构建" },
    { href: "/zh/lab", label: "实验室" },
  ],
} as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const lang = pathname.startsWith("/zh") ? "zh" : "en";
  const links = nav[lang];
  const homeHref = lang === "zh" ? "/zh" : "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={homeHref} className="flex items-center gap-2.5 text-foreground" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent text-white"><Sparkles className="h-4 w-4" /></span>
          <span className="text-base font-semibold tracking-tight">VibeTrading<span className="text-accent">.fun</span></span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
          {links.map((link) => {
            const active = pathname === link.href || (link.href.endsWith("/blog") && pathname.startsWith(`${link.href}/`));
            return <Link key={link.href} href={link.href} className={`text-sm font-medium transition-colors ${active ? "text-foreground" : "text-muted hover:text-foreground"}`}>{link.label}</Link>;
          })}
          <div className="flex items-center gap-2 border-l border-border pl-6 text-sm">
            <Link href="/" className={lang === "en" ? "font-medium text-foreground" : "text-muted hover:text-foreground"}>EN</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/zh" className={lang === "zh" ? "font-medium text-foreground" : "text-muted hover:text-foreground"}>中文</Link>
          </div>
        </nav>

        <button type="button" className="rounded-lg p-2 text-foreground md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-5 md:hidden" aria-label="Mobile navigation">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-surface hover:text-foreground">{link.label}</Link>)}
            <div className="mt-3 flex gap-3 border-t border-border px-3 pt-4 text-sm"><Link href="/" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">English</Link><Link href="/zh" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">中文</Link></div>
          </div>
        </nav>
      )}
    </header>
  );
}
