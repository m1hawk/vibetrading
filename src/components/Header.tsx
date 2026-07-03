import Link from "next/link";
import { Menu, X, FlaskConical } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reviews", label: "Reviews" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/challenges", label: "Challenges" },
  { href: "/about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <FlaskConical className="h-6 w-6 text-accent" />
          <span className="text-lg font-semibold tracking-tight">
            AI Trading Lab
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
        </nav>

        <div className="hidden md:block">
          <Link
            href="/starter-kit"
            className="inline-flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover"
          >
            Starter Kit
          </Link>
        </div>

        <button className="md:hidden text-foreground" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
