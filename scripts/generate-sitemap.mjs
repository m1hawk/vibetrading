import fs from "fs";
import path from "path";
import matter from "gray-matter";

const baseUrl = "https://vibetrading.fun";
const postsDir = path.join(process.cwd(), "content", "posts");
const outPath = path.join(process.cwd(), "public", "sitemap.xml");
const googleSitemapPath = path.join(process.cwd(), "public", "google-sitemap.xml");
const sitemapIndexPath = path.join(process.cwd(), "public", "sitemap_index.xml");

const staticRoutes = [
  { route: "", lang: "en" },
  { route: "/blog", lang: "en" },
  { route: "/about", lang: "en" },
  { route: "/disclaimer", lang: "en" },
  { route: "/privacy", lang: "en" },
  { route: "/affiliate", lang: "en" },
  { route: "/zh", lang: "zh" },
  { route: "/zh/blog", lang: "zh" },
];

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parsePostFile(fileName) {
  if (fileName.endsWith(".zh.mdx")) {
    return {
      slug: fileName.replace(/\.zh\.mdx$/, ""),
      lang: "zh",
      prefix: "/zh/blog/",
    };
  }
  return {
    slug: fileName.replace(/\.mdx$/, ""),
    lang: "en",
    prefix: "/blog/",
  };
}

function buildSitemap() {
  const now = new Date();
  const urls = [];

  for (const { route, lang } of staticRoutes) {
    urls.push({
      loc: route === "" ? `${baseUrl}/` : `${baseUrl}${route}`,
      lastmod: now,
      changefreq: "weekly",
      priority: route === "" || route === "/zh" ? "1.0" : "0.8",
      lang,
    });
  }

  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const { slug, prefix } = parsePostFile(file);
      const content = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(content);
      const date = data.updated || data.date;
      urls.push({
        loc: `${baseUrl}${prefix}${slug}`,
        lastmod: date ? new Date(date) : now,
        changefreq: "weekly",
        priority: "0.9",
        lang: data.lang || "en",
      });
    }
  }

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (url) =>
          `<url>\n` +
          `<loc>${escapeXml(url.loc)}</loc>\n` +
          `<lastmod>${url.lastmod.toISOString().split(".")[0] + "Z"}</lastmod>\n` +
          `<changefreq>${url.changefreq}</changefreq>\n` +
          `<priority>${url.priority}</priority>\n` +
          `</url>`
      )
      .join("\n") +
    `\n</urlset>\n`;

  fs.writeFileSync(outPath, xml, "utf8");
  fs.writeFileSync(googleSitemapPath, xml, "utf8");
  fs.writeFileSync(
    sitemapIndexPath,
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      `<sitemap>\n` +
      `<loc>${baseUrl}/sitemap.xml</loc>\n` +
      `<lastmod>${now.toISOString().split(".")[0] + "Z"}</lastmod>\n` +
      `</sitemap>\n` +
      `</sitemapindex>\n`,
    "utf8"
  );
  console.log(`Generated sitemap.xml with ${urls.length} URLs`);
}

buildSitemap();
