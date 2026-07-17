import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getAdjacentPosts, getRelatedPosts, type Lang, type Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

interface ArticleFooterProps {
  post: Post;
  lang: Lang;
}

const labels = {
  en: { related: "Related reading", prev: "Previous", next: "Next" },
  zh: { related: "相关阅读", prev: "上一篇", next: "下一篇" },
} as const;

function postHref(post: Post, lang: Lang) {
  return lang === "zh" ? `/zh/blog/${post.slug}` : `/blog/${post.slug}`;
}

export function ArticleFooter({ post, lang }: ArticleFooterProps) {
  const t = labels[lang];
  const related = getRelatedPosts(post, lang, 3);
  const { prev, next } = getAdjacentPosts(post, lang);

  return (
    <footer className="mt-16 border-t border-border pt-12">
      {(prev || next) && (
        <nav
          aria-label={lang === "zh" ? "分类内文章导航" : "More in this category"}
          className="grid gap-4 sm:grid-cols-2"
        >
          {prev ? (
            <Link
              href={postHref(prev, lang)}
              className="nx-card group flex flex-col p-6"
              rel="prev"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                {t.prev}
              </span>
              <span className="mt-3 font-serif text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-hover">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link
              href={postHref(next, lang)}
              className="nx-card group flex flex-col p-6 text-right sm:items-end"
              rel="next"
            >
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {t.next}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="mt-3 font-serif text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-hover">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}

      {related.length > 0 && (
        <section className="mt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="nx-display text-2xl sm:text-3xl">
            {t.related}
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </footer>
  );
}
