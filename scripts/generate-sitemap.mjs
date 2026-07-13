/**
 * Generates public/sitemap.xml + public/robots.txt for static export.
 * Run automatically before `next build`.
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const baseUrl = "https://vibetrading.fun";
const postsDir = path.join(process.cwd(), "content", "posts");
const publicDir = path.join(process.cwd(), "public");

const staticRoutes = [
  "/",
  "/vibe-trading",
  "/blog",
  "/tools",
  "/build",
  "/lab",
  "/about",
  "/disclaimer",
  "/privacy",
  "/affiliate",
  "/zh",
  "/zh/vibe-trading",
  "/zh/blog",
  "/zh/tools",
  "/zh/build",
  "/zh/lab",
];

function toDay(d) {
  const x = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(x.getTime())) return new Date().toISOString().slice(0, 10);
  return x.toISOString().slice(0, 10);
}

function build() {
  const entries = staticRoutes.map((p) => ({
    loc: p === "/" ? `${baseUrl}/` : `${baseUrl}${p}`,
    lastmod: toDay(new Date()),
  }));

  if (fs.existsSync(postsDir)) {
    for (const file of fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith(".mdx"))
      .sort()) {
      const isZh = file.endsWith(".zh.mdx");
      const slug = isZh ? file.replace(/\.zh\.mdx$/, "") : file.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
      entries.push({
        loc: `${baseUrl}${isZh ? "/zh/blog" : "/blog"}/${slug}`,
        lastmod: toDay(data.updated || data.date || new Date()),
      });
    }
  }

  // Deduplicate
  const seen = new Set();
  const urls = entries.filter((e) => {
    if (seen.has(e.loc)) return false;
    seen.add(e.loc);
    return true;
  });

  // Minimal required tags only (loc + lastmod) for max GSC compatibility
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          `    <lastmod>${u.lastmod}</lastmod>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf8");

  // Also write a tiny probe sitemap for GSC A/B testing if needed
  const probe =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${toDay(new Date())}</lastmod>\n  </url>\n` +
    `  <url>\n    <loc>${baseUrl}/blog</loc>\n    <lastmod>${toDay(new Date())}</lastmod>\n  </url>\n` +
    `  <url>\n    <loc>${baseUrl}/vibe-trading</loc>\n    <lastmod>${toDay(new Date())}</lastmod>\n  </url>\n` +
    `</urlset>\n`;
  fs.writeFileSync(path.join(publicDir, "sitemap-probe.xml"), probe, "utf8");

  const robots =
    `User-agent: *\n` +
    `Allow: /\n` +
    `\n` +
    `Sitemap: ${baseUrl}/sitemap.xml\n`;
  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

  // Ensure GitHub Pages never runs Jekyll on the artifact
  fs.writeFileSync(path.join(publicDir, ".nojekyll"), "", "utf8");

  console.log(`Generated sitemap.xml (${urls.length} URLs) + sitemap-probe.xml (3 URLs) + robots.txt`);
}

build();
