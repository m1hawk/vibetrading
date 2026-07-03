# AI Trading Lab

An SEO-driven blog focused on AI trading tools, strategies, and tutorials for retail traders. Built with Next.js, Tailwind CSS, and MDX.

## Project Structure

```
content/posts/          # MDX blog posts with frontmatter
src/app/                # Next.js App Router pages
src/components/         # React components
src/lib/                # Utilities (posts, date, cn)
public/                 # Static assets
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Live site: [https://vibetrading.fun](https://vibetrading.fun)

## Adding a New Post

1. Create a new `.mdx` file in `content/posts/`.
2. Add frontmatter:

```yaml
---
title: "Your Post Title"
description: "A short description for SEO and cards."
date: "2026-07-03"
category: "Guides" # Guides | Reviews | Tutorials | Challenges
tags: ["ai trading", "beginners"]
readTime: "8 min read"
featured: false
---
```

3. Write content using Markdown and MDX components (`<Disclaimer />`, `<Alert type="info">`, etc.).
4. Run `npm run build` to generate static files in `dist/`.

## Build for Production

```bash
npm run build
```

Static files are output to `dist/`.

## Design System

- **Colors:** Dark mode by default (`#0a0a0f` background, `#6366f1` accent).
- **Typography:** System font stack with Inter and JetBrains Mono.
- **Layout:** 12-column grid, max content width 720px, sticky TOC on article pages.

## SEO

- Custom metadata per page
- Open Graph and Twitter card tags
- XML sitemap at `/sitemap.xml`
- `robots.txt`
- JSON-LD schema for organization, website, and articles
