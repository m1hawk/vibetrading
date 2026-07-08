import Link from "next/link";
import { FlaskConical } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <FlaskConical className="h-6 w-6 text-accent" />
              <span className="text-lg font-semibold tracking-tight">
                vibetrading.fun
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted">
              A blog about AI trading bots, prediction markets, and automated
              strategies. No hype, no guaranteed returns.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Content</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="/disclaimer" className="hover:text-foreground">
                  Risk Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/affiliate" className="hover:text-foreground">
                  Affiliate Disclosure
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} vibetrading.fun. All rights reserved. Not financial
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
