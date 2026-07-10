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

export function HubPage({ eyebrow, title, description, principles, cards, posts, postsTitle, emptyTitle, emptyText, ctaLabel, ctaHref }: HubPageProps) {
  return (
    <div>
      <section className="hero-grid border-b border-border px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{description}</p>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">{principles.map((principle) => <span key={principle} className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" />{principle}</span>)}</div>
        </div>
      </section>

      <section className="border-b border-border bg-surface px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          {cards.map((card) => {
            const content = <><p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{card.eyebrow}</p><h2 className="mt-4 text-2xl font-semibold tracking-tight">{card.title}</h2><p className="mt-3 leading-7 text-muted">{card.description}</p>{card.href && <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">Open guide<ArrowRight className="h-4 w-4" /></span>}</>;
            return card.href ? <Link key={card.title} href={card.href} className="group rounded-3xl border border-border bg-background p-7 transition hover:border-accent/50">{content}</Link> : <div key={card.title} className="rounded-3xl border border-border bg-background p-7">{content}</div>;
          })}
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between gap-6"><h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{postsTitle}</h2><Link href={ctaHref} className="hidden items-center gap-2 text-sm font-medium text-accent sm:flex">{ctaLabel}<ArrowRight className="h-4 w-4" /></Link></div>
          {posts.length > 0 ? <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{posts.map((post) => <PostCard key={post.slug} post={post} />)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-border-soft bg-surface p-10 sm:p-14"><FlaskConical className="h-7 w-7 text-accent" /><h3 className="mt-6 text-2xl font-semibold">{emptyTitle}</h3><p className="mt-3 max-w-2xl leading-7 text-muted">{emptyText}</p></div>}
        </div>
      </section>
    </div>
  );
}
