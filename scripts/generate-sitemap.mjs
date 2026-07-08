import fs from "fs";
import path from "path";
import matter from "gray-matter";

const baseUrl = "https://vibetrading.fun";
const postsDir = path.join(process.cwd(), "content", "posts");
const outPath = path.join(process.cwd(), "public", "sitemap.xml");

const staticRoutes = [
  "",
  "/blog",
  "/reviews",
  "/tutorials",
  "/challenges",
  "/about",
  "/starter-kit",
  "/disclaimer",
  "/privacy",
  "/affiliate",
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function buildSitemap() {
  const now = new Date();

  const urls = staticRoutes.map((route) => ({
    loc: `${baseUrl}${route}`,
    lastmod: now,
    changefreq: "weekly",
    priority: route === "" ? "1.0" : "0.8",
  }));

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const content = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(content);
      const date = data.updated || data.date;
      urls.push({
        loc: `${baseUrl}/blog/${slug}`,
        lastmod: date ? new Date(date) : now,
        changefreq: "weekly",
        priority: "0.9",
      });
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod.toISOString()}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

  fs.writeFileSync(outPath, xml, "utf8");
  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
}

buildSitemap();
