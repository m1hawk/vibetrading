import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/date";
import type { Post } from "@/lib/posts";

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  const postHref = post.lang === "zh" ? `/zh/blog/${post.slug}` : `/blog/${post.slug}`;
  const ctaText = post.lang === "zh" ? "阅读文章" : "Read article";

  return (
    <article
      className={`group relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-border-soft hover:bg-surface-elevated ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-8" : ""
      }`}
    >
      <div className="flex flex-1 flex-col">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent">
            {post.category}
          </span>
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(post.date)}
          </span>
        </div>

        <h3
          className={`font-semibold tracking-tight text-foreground group-hover:text-accent ${
            featured ? "text-2xl lg:text-3xl" : "text-lg"
          }`}
        >
          <Link href={postHref} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h3>

        <p className={`mt-3 text-muted ${featured ? "text-base" : "text-sm"}`}>
          {post.description}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent">
          {ctaText}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </article>
  );
}
