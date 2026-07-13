"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
  const [scrolled, setScrolled] = useState(false);
  const lang = pathname.startsWith("/zh") ? "zh" : "en";
  const links = nav[lang];
  const homeHref = lang === "zh" ? "/zh" : "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl transition-shadow ${
        scrolled
          ? "bg-[rgba(246,243,238,0.9)] shadow-[0_8px_24px_rgba(20,16,12,0.04)]"
          : "bg-[rgba(246,243,238,0.82)]"
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={homeHref}
          className="flex items-center gap-2.5 text-foreground"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-7 w-7 items-center justify-center bg-ink font-mono text-[11px] font-semibold text-accent">
            V
          </span>
          <span className="font-serif text-[1.15rem] font-bold tracking-tight">
            VibeTrading
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {links.map((link) => {
            const active =
              pathname === link.href ||
              (link.href.endsWith("/blog") && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium transition-colors after:absolute after:bottom-[-4px] after:left-0 after:h-px after:bg-accent after:transition-[right] after:duration-250 ${
                  active
                    ? "text-foreground after:right-0"
                    : "text-muted after:right-full hover:text-foreground hover:after:right-0"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="flex overflow-hidden border border-border font-mono text-[11px] tracking-wider">
            <Link
              href="/"
              className={`px-2.5 py-1.5 transition-colors ${
                lang === "en"
                  ? "bg-ink text-on-ink"
                  : "text-muted hover:text-foreground"
              }`}
            >
              EN
            </Link>
            <Link
              href="/zh"
              className={`px-2.5 py-1.5 transition-colors ${
                lang === "zh"
                  ? "bg-ink text-on-ink"
                  : "text-muted hover:text-foreground"
              }`}
            >
              中文
            </Link>
          </div>
        </nav>

        <button
          type="button"
          className="border border-border p-2 text-foreground md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-page px-4 py-5 md:hidden"
          aria-label="Mobile navigation"
          style={{ background: "var(--page)" }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm font-medium text-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex gap-3 border-t border-border px-3 pt-4 font-mono text-xs tracking-wider">
              <Link href="/" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
                EN
              </Link>
              <Link href="/zh" onClick={() => setOpen(false)} className="text-muted hover:text-foreground">
                中文
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
