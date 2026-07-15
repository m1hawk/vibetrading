import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllPosts, getPostBySlug, getAvailableLanguages } from "@/lib/posts";
import { MDXContent } from "@/components/MDXContent";
import { formatDate } from "@/lib/date";
import { Calendar, Clock, Tag, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import { TableOfContents } from "@/components/TableOfContents";
import { JsonLd } from "@/components/JsonLd";

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

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/zh/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      tags: post.tags,
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: "vibetrading.fun",
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
                  className="font-medium text-accent hover:text-accent-hover"
                >
                  English
                </Link>
              </div>
            )}

            <header className="mb-10">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted">
                <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                  {post.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
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
