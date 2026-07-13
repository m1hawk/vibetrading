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
4. Run `npm run build` to generate static files in `out/`.

## Build for Production

```bash
npm run build
```

Static files are output to `out/`.

## Design System

Nexus-inspired editorial system:

- **Colors:** Paper page `#f6f3ee`, ink `#0b0b0b`, signal orange `#ff8a57`. Soft light/dark section ramps (no hard seams).
- **Typography:** Playfair Display (display), Inter (body), IBM Plex Mono (labels).
- **Components:** `nx-label`, `nx-display`, `nx-card`, `nx-section-ink`, `nx-btn-*` utilities in `globals.css`.
- **Layout:** max content ~`max-w-6xl`, sticky header, soft section bands.

## SEO

- Custom metadata per page
- Open Graph and Twitter card tags
- XML sitemap at `/sitemap.xml`
- `robots.txt`
- JSON-LD schema for organization, website, and articles
