import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * Generate a GSC-friendly sitemap.
 *
 * Rules followed for Google Search Console reliability:
 * - Single canonical sitemap at /sitemap.xml
 * - lastmod as YYYY-MM-DD (date-only; most portable)
 * - Valid UTF-8 XML without BOM
 * - Stable absolute https URLs matching the live host
 */

const baseUrl = "https://vibetrading.fun";
const postsDir = path.join(process.cwd(), "content", "posts");
const publicDir = path.join(process.cwd(), "public");

const staticRoutes = [
  { route: "", priority: "1.0" },
  { route: "/vibe-trading", priority: "0.9" },
  { route: "/blog", priority: "0.9" },
  { route: "/tools", priority: "0.8" },
  { route: "/build", priority: "0.8" },
  { route: "/lab", priority: "0.8" },
  { route: "/about", priority: "0.5" },
  { route: "/disclaimer", priority: "0.3" },
  { route: "/privacy", priority: "0.3" },
  { route: "/affiliate", priority: "0.3" },
  { route: "/zh", priority: "1.0" },
  { route: "/zh/vibe-trading", priority: "0.9" },
  { route: "/zh/blog", priority: "0.9" },
  { route: "/zh/tools", priority: "0.8" },
  { route: "/zh/build", priority: "0.8" },
  { route: "/zh/lab", priority: "0.8" },
];

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** YYYY-MM-DD for maximum GSC compatibility */
function toLastmod(date) {
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return d.toISOString().slice(0, 10);
}

function parsePostFile(fileName) {
  if (fileName.endsWith(".zh.mdx")) {
    return {
      slug: fileName.replace(/\.zh\.mdx$/, ""),
      prefix: "/zh/blog/",
    };
  }
  return {
    slug: fileName.replace(/\.mdx$/, ""),
    prefix: "/blog/",
  };
}

function buildSitemap() {
  const now = new Date();
  const urls = [];

  for (const { route, priority } of staticRoutes) {
    urls.push({
      loc: route === "" ? `${baseUrl}/` : `${baseUrl}${route}`,
      lastmod: toLastmod(now),
      changefreq: "weekly",
      priority,
    });
  }

  if (fs.existsSync(postsDir)) {
    const files = fs
      .readdirSync(postsDir)
      .filter((f) => f.endsWith(".mdx"))
      .sort();

    for (const file of files) {
      const { slug, prefix } = parsePostFile(file);
      const content = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(content);
      const date = data.updated || data.date || now;
      urls.push({
        loc: `${baseUrl}${prefix}${slug}`,
        lastmod: toLastmod(date),
        changefreq: "weekly",
        priority: "0.9",
      });
    }
  }

  // Deduplicate by loc
  const seen = new Set();
  const unique = urls.filter((u) => {
    if (seen.has(u.loc)) return false;
    seen.add(u.loc);
    return true;
  });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    unique
      .map(
        (url) =>
          `  <url>\n` +
          `    <loc>${escapeXml(url.loc)}</loc>\n` +
          `    <lastmod>${url.lastmod}</lastmod>\n` +
          `    <changefreq>${url.changefreq}</changefreq>\n` +
          `    <priority>${url.priority}</priority>\n` +
          `  </url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  // Canonical file GSC should use
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf8");

  // Keep a text fallback (supported by Google) for manual debugging only
  fs.writeFileSync(
    path.join(publicDir, "sitemap.txt"),
    `${unique.map((u) => u.loc).join("\n")}\n`,
    "utf8"
  );

  // robots.txt — single Sitemap directive only
  const robots =
    `User-agent: *\n` +
    `Allow: /\n` +
    `\n` +
    `# Submit only this sitemap in Google Search Console\n` +
    `Sitemap: ${baseUrl}/sitemap.xml\n`;

  fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");

  // Remove legacy aliases that confused GSC (multiple Sitemap lines / index loops)
  for (const legacy of ["google-sitemap.xml", "sitemap_index.xml"]) {
    const p = path.join(publicDir, legacy);
    if (fs.existsSync(p)) {
      fs.unlinkSync(p);
      console.log(`Removed legacy ${legacy}`);
    }
  }

  console.log(`Generated sitemap.xml with ${unique.length} URLs`);
  console.log(`Canonical: ${baseUrl}/sitemap.xml`);
}

buildSitemap();
