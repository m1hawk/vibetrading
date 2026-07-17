import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPostBySlug, getAvailableLanguages, DEFAULT_AUTHOR } from "@/lib/posts";
import { MDXContent } from "@/components/MDXContent";
import { formatDate } from "@/lib/date";
import { Calendar, Clock, Tag, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import { TableOfContents } from "@/components/TableOfContents";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ArticleFooter } from "@/components/ArticleFooter";

interface ZhBlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts("zh");
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: ZhBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "zh");

  if (!post) {
    return {};
  }

  const availableLanguages = getAvailableLanguages(slug);
  const hasEn = availableLanguages.includes("en");

  const alternates: Metadata["alternates"] = {
    canonical: `/zh/blog/${post.slug}`,
    languages: {
      "zh": `/zh/blog/${post.slug}`,
    },
  };

  if (hasEn) {
    alternates.languages = {
      ...alternates.languages,
      "en": `/blog/${post.slug}`,
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
      locale: "zh_CN",
      images: [
        {
          url: `/og/zh/blog/${post.slug}.png`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [`/og/zh/blog/${post.slug}.png`],
    },
  };
}

export default async function ZhBlogPostPage({ params }: ZhBlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "zh");

  if (!post) {
    notFound();
  }

  const availableLanguages = getAvailableLanguages(slug);
  const hasEn = availableLanguages.includes("en");
  const byline = post.author || DEFAULT_AUTHOR;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    image: `https://vibetrading.fun/og/zh/blog/${post.slug}.png`,
    author: {
      "@type": "Organization",
      name: byline,
      url: "https://vibetrading.fun",
    },
    publisher: {
      "@type": "Organization",
      name: "vibetrading.fun",
      logo: {
        "@type": "ImageObject",
        url: "https://vibetrading.fun/logo.png",
      },
    },
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://vibetrading.fun/zh/blog/${post.slug}`,
    },
    keywords: post.tags.join(", "),
  };

  const faqSchema = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <ReadingProgress />
      <JsonLd data={articleSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <article className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          <div>
            <Link
              href="/zh/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              返回博客
            </Link>

            {hasEn && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted">
                <Globe className="h-4 w-4" />
                <span>Also available in</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium text-accent-hover hover:underline"
                >
                  English
                </Link>
              </div>
            )}

            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-accent-hover">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date, "zh-CN")}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-muted">{post.description}</p>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5 text-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/15 font-serif text-xs font-bold text-accent-hover">
                  VT
                </span>
                <div>
                  <p className="font-medium text-foreground">{byline}</p>
                  <p className="text-xs text-muted-foreground">
                    发布于 {formatDate(post.date, "zh-CN")}
                    {post.updated && ` · 最后更新于 ${formatDate(post.updated, "zh-CN")}`}
                  </p>
                </div>
              </div>

              {post.tags.length > 0 && (
                <div className="mt-6 flex flex-wrap items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-invert max-w-none">
              <MDXContent source={post.content} />
            </div>

            <ArticleFooter post={post} lang="zh" />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents content={post.content} />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
