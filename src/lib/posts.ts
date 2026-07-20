import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Lang = "en" | "zh";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  readTime: string;
  featured?: boolean;
  author?: string;
  content: string;
  lang: Lang;
  faq?: FaqItem[];
}

export const DEFAULT_AUTHOR = "VibeTrading Editorial Team";

/** Post without body payload — safe to serialize into client components. */
export type PostMeta = Omit<Post, "content" | "faq">;

export function toPostMeta(post: Post): PostMeta {
  const { content: _content, faq: _faq, ...meta } = post;
  return meta;
}

const postsDirectory = path.join(process.cwd(), "content", "posts");

function parseLang(fileName: string): { slug: string; lang: Lang } {
  if (fileName.endsWith(".zh.mdx")) {
    return { slug: fileName.replace(/\.zh\.mdx$/, ""), lang: "zh" };
  }
  return { slug: fileName.replace(/\.mdx$/, ""), lang: "en" };
}

export function getAllPosts(lang: Lang = "en"): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const { slug, lang: fileLang } = parseLang(fileName);
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        updated: data.updated,
        category: data.category,
        tags: data.tags || [],
        readTime: data.readTime || "5 min read",
        featured: data.featured || false,
        author: data.author || undefined,
        content,
        lang: fileLang,
        faq: data.faq || [],
      } as Post;
    })
    .filter((post) => post.lang === lang);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string, lang: Lang = "en"): Post | null {
  const posts = getAllPosts(lang);
  return posts.find((post) => post.slug === slug) || null;
}

export function getPostsByCategory(category: string, lang: Lang = "en"): Post[] {
  return getAllPosts(lang).filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getFeaturedPosts(lang: Lang = "en"): Post[] {
  return getAllPosts(lang).filter((post) => post.featured);
}

export function getAllCategories(lang: Lang = "en"): string[] {
  const posts = getAllPosts(lang);
  const categories = new Set(posts.map((post) => post.category));
  return Array.from(categories).sort();
}

export function getAllTags(lang: Lang = "en"): string[] {
  const posts = getAllPosts(lang);
  const tags = new Set(posts.flatMap((post) => post.tags));
  return Array.from(tags).sort();
}

export function getAvailableLanguages(slug: string): Lang[] {  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const languages: Lang[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".mdx")) continue;
    const { slug: fileSlug, lang } = parseLang(fileName);
    if (fileSlug === slug) {
      languages.push(lang);
    }
  }

  return languages.sort();
}

/**
 * Related posts ranked by same-category bonus + tag overlap.
 * Returns up to `count` posts, excluding the given slug.
 */
export function getRelatedPosts(post: Post, lang: Lang = "en", count = 3): Post[] {
  const tagSet = new Set(post.tags.map((t) => t.toLowerCase()));
  return getAllPosts(lang)
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const overlap = p.tags.filter((t) => tagSet.has(t.toLowerCase())).length;
      const sameCategory = p.category.toLowerCase() === post.category.toLowerCase() ? 1 : 0;
      return { post: p, score: sameCategory * 2 + overlap };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((r) => r.post);
}

/**
 * Previous / next posts within the same category, ordered by date ascending
 * (prev = older, next = newer). Returns nulls at the boundaries.
 */
export function getAdjacentPosts(
  post: Post,
  lang: Lang = "en"
): { prev: Post | null; next: Post | null } {
  const siblings = getPostsByCategory(post.category, lang).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const index = siblings.findIndex((p) => p.slug === post.slug);
  return {
    prev: index > 0 ? siblings[index - 1] : null,
    next: index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : null,
  };
}
