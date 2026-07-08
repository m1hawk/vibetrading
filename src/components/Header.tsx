import Link from "next/link";
import { Menu, X, FlaskConical } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <FlaskConical className="h-6 w-6 text-accent" />
          <span className="text-lg font-semibold tracking-tight">
            vibetrading.fun
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 border-l border-border pl-6 text-sm">
            <Link
              href="/"
              className="font-medium text-foreground"
              aria-label="English"
            >
              EN
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href="/zh"
              className="text-muted transition-colors hover:text-foreground"
              aria-label="中文"
            >
              中文
            </Link>
          </div>
        </nav>

        <button className="md:hidden text-foreground" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
