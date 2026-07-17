import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { formatDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const isZh = post.lang === "zh";
  const postHref = isZh ? `/zh/blog/${post.slug}` : `/blog/${post.slug}`;
  const ctaText = isZh ? "阅读文章" : "Read article";
  const imageSrc = isZh ? `/og/zh/blog/${post.slug}.png` : `/og/blog/${post.slug}.png`;

  return (
    <article
      className={`nx-card group relative flex flex-col overflow-hidden p-6 ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-8" : ""
      }`}
    >
      <div
        className={`-mx-6 -mt-6 mb-4 overflow-hidden ${
          featured ? "lg:col-span-2 lg:mb-6" : ""
        }`}
      >
        <img
          src={imageSrc}
          alt={post.title}
          width={1200}
          height={630}
          loading="lazy"
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className={`flex flex-1 flex-col ${featured ? "lg:col-span-2" : ""}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
          <span className="border border-accent/25 bg-accent/10 px-2.5 py-1 text-accent-hover">
            {post.category}
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="border border-border bg-[var(--page)] px-2.5 py-1">
              {tag}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date, isZh ? "zh-CN" : "en-US")}
          </span>
        </div>

        <h3
          className={`font-serif font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent-hover ${
            featured ? "text-2xl lg:text-3xl" : "text-lg"
          }`}
        >
          <Link href={postHref} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        <p className={`mt-3 text-muted ${featured ? "text-base leading-7" : "text-sm leading-6"}`}>
          {post.description}
        </p>

        <div className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-accent-hover">
          {ctaText}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
