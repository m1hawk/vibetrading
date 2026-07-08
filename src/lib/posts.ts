import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Lang = "en" | "zh";

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
  content: string;
  lang: Lang;
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
        content,
        lang: fileLang,
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

export function getAvailableLanguages(slug: string): Lang[] {
  if (!fs.existsSync(postsDirectory)) {
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
