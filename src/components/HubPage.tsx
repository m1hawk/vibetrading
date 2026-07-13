import Link from "next/link";
import { ArrowRight, CheckCircle2, FlaskConical } from "lucide-react";
import type { Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export interface HubCard {
  eyebrow: string;
  title: string;
  description: string;
  href?: string;
}

interface HubPageProps {
  eyebrow: string;
  title: string;
  description: string;
  principles: string[];
  cards: HubCard[];
  posts: Post[];
  postsTitle: string;
  emptyTitle: string;
  emptyText: string;
  ctaLabel: string;
  ctaHref: string;
}

export function HubPage({
  eyebrow,
  title,
  description,
  principles,
  cards,
  posts,
  postsTitle,
  emptyTitle,
  emptyText,
  ctaLabel,
  ctaHref,
}: HubPageProps) {
  return (
    <div>
      <section className="hero-grid relative px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="nx-label">{eyebrow}</div>
          <h1 className="nx-display mt-5 max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="nx-lead mt-6 max-w-3xl text-lg sm:text-xl">{description}</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {principles.map((principle) => (
              <span key={principle} className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                {principle}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {cards.map((card, index) => {
            const content = (
              <>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                  FIG. {String(index + 1).padStart(2, "0")} · {card.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-2xl font-semibold tracking-tight">
                  {card.title}
                </h2>
                <p className="mt-3 leading-7 text-muted">{card.description}</p>
                {card.href && (
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">
                    Open guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                )}
              </>
            );
            return card.href ? (
              <Link key={card.title} href={card.href} className="nx-card group p-7">
                {content}
              </Link>
            ) : (
              <div key={card.title} className="nx-card p-7">
                {content}
              </div>
            );
          })}
        </div>
      </section>

      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6">
            <h2 className="nx-display text-3xl sm:text-4xl">{postsTitle}</h2>
            <Link
              href={ctaHref}
              className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent sm:inline-flex"
            >
              {ctaLabel}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="nx-card mt-8 border-dashed p-10 sm:p-14">
              <FlaskConical className="h-7 w-7 text-accent" />
              <h3 className="mt-6 font-serif text-2xl font-semibold">{emptyTitle}</h3>
              <p className="mt-3 max-w-2xl leading-7 text-muted">{emptyText}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
