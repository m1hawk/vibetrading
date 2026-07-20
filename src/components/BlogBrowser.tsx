"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import type { Lang, PostMeta } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

const labels = {
  en: {
    searchPlaceholder: "Search by title, topic, or tag…",
    searchAria: "Search articles",
    all: "All topics",
    articles: (n: number) => `${n} ${n === 1 ? "article" : "articles"}`,
    noResults: "Nothing matches. Try a different keyword or clear the filters.",
    clear: "Clear filters",
  },
  zh: {
    searchPlaceholder: "按标题、主题或标签搜索…",
    searchAria: "搜索文章",
    all: "全部主题",
    articles: (n: number) => `${n} 篇文章`,
    noResults: "没有匹配的内容。换个关键词，或清空筛选。",
    clear: "清空筛选",
  },
} as const;

interface BlogBrowserProps {
  posts: PostMeta[];
  categories: string[];
  tags: string[];
  lang: Lang;
}

export function BlogBrowser({ posts, categories, tags, lang }: BlogBrowserProps) {
  const t = labels[lang];
  // Initial state is read from the URL on mount (not via useSearchParams)
  // so the full article list stays in the statically exported HTML.
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setActiveTag(params.get("tag"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the URL shareable: ?tag=x&q=y reflects current filter state
  useEffect(() => {
    const params = new URLSearchParams();
    if (activeTag) params.set("tag", activeTag);
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [activeTag, query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag && !post.tags.some((tag) => tag.toLowerCase() === activeTag.toLowerCase())) {
        return false;
      }
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [posts, query, activeTag]);

  const postsByCategory = categories
    .map((category) => ({
      category,
      posts: filtered.filter((post) => post.category.toLowerCase() === category.toLowerCase()),
    }))
    .filter((group) => group.posts.length > 0);

  const isFiltering = query.trim() !== "" || activeTag !== null;

  return (
    <>
      <div className="mb-10 space-y-5">
        <div className="relative max-w-xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchAria}
            className="w-full rounded-full border border-border bg-surface py-3 pl-11 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
              activeTag === null
                ? "border-ink bg-ink text-on-ink"
                : "border-border bg-surface text-muted hover:border-accent hover:text-accent-hover"
            }`}
          >
            {t.all}
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`border px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] transition-colors ${
                activeTag === tag
                  ? "border-ink bg-ink text-on-ink"
                  : "border-border bg-surface text-muted hover:border-accent hover:text-accent-hover"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {postsByCategory.length > 0 ? (
        <div className="space-y-16">
          {postsByCategory.map(({ category, posts: categoryPosts }) => (
            <section key={category} id={category.toLowerCase()} className="scroll-mt-24">
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">{category}</h2>
                <span className="text-sm text-muted">{t.articles(categoryPosts.length)}</span>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryPosts.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="nx-card border-dashed p-10 text-center sm:p-14">
          <p className="text-muted">{t.noResults}</p>
          {isFiltering && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveTag(null);
              }}
              className="nx-btn nx-btn-outline mt-6"
            >
              {t.clear}
            </button>
          )}
        </div>
      )}
    </>
  );
}
