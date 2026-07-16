/**
 * SEO health check for built static HTML files in out/
 * Run after `npm run build`
 */
import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "out");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }
  return files;
}

function extractTag(html, tag) {
  const regex = new RegExp(`<${tag}[^>]*>([^<]*)</${tag}>`, "i");
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function extractMeta(html, name) {
  const regex = new RegExp(
    `<meta[^>]+(?:name|property)=["']${name}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function extractLinkRel(html, rel) {
  const regex = new RegExp(
    `<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']`,
    "ig"
  );
  const matches = [];
  let m;
  while ((m = regex.exec(html)) !== null) {
    matches.push(m[1]);
  }
  return matches;
}

function extractCanonical(html) {
  const regex = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i;
  const match = html.match(regex);
  return match ? match[1] : null;
}

function hasJsonLd(html, type) {
  const regex = new RegExp(`"@type"\\s*:\\s*"${type}"`, "i");
  return regex.test(html);
}

function main() {
  if (!fs.existsSync(outDir)) {
    console.error("out/ directory not found. Run `npm run build` first.");
    process.exit(1);
  }

  const files = walk(outDir);
  const results = [];
  const titles = {};
  const descriptions = {};

  for (const file of files) {
    const html = fs.readFileSync(file, "utf8");
    const relative = path.relative(outDir, file);
    const urlPath = relative.replace(/index\.html$/, "").replace(/\.html$/, "");
    const url = `https://vibetrading.fun/${urlPath}`;

    const title = extractTag(html, "title") || "";
    const description = extractMeta(html, "description") || "";
    const canonical = extractCanonical(html);
    const hreflangs = extractLinkRel(html, "alternate");
    const h1 = extractTag(html, "h1") || "";
    const hasNoindex = /noindex/i.test(extractMeta(html, "robots") || "");
    const hasFaqSchema = hasJsonLd(html, "FAQPage");
    const hasArticleSchema = hasJsonLd(html, "TechArticle") || hasJsonLd(html, "Article");

    // Track duplicates
    titles[title] = (titles[title] || 0) + 1;
    descriptions[description] = (descriptions[description] || 0) + 1;

    const issues = [];
    const isZhPage = urlPath.startsWith("zh/") || urlPath === "zh";
    if (title.length < 30 || title.length > 70) {
      issues.push(`title length ${title.length}`);
    }
    // Chinese pages use shorter descriptions because each character carries more information
    const descMin = isZhPage ? 50 : 100;
    const descMax = isZhPage ? 150 : 170;
    if (description.length < descMin || description.length > descMax) {
      issues.push(`description length ${description.length}`);
    }
    if (!canonical) {
      issues.push("missing canonical");
    }
    if (!h1) {
      issues.push("missing h1");
    }
    if (hasNoindex) {
      issues.push("has noindex");
    }

    results.push({
      url,
      title,
      description,
      canonical,
      hreflangCount: hreflangs.length,
      h1,
      hasFaqSchema,
      hasArticleSchema,
      issues,
    });
  }

  // Summary
  const blogPages = results.filter((r) => r.url.includes("/blog/"));
  const pagesWithIssues = results.filter((r) => r.issues.length > 0);
  const duplicateTitles = Object.entries(titles).filter(([k, v]) => v > 1 && k);
  const duplicateDescriptions = Object.entries(descriptions).filter(([k, v]) => v > 1 && k);

  console.log("=== SEO Health Check Summary ===\n");
  console.log(`Total HTML pages checked: ${results.length}`);
  console.log(`Blog pages: ${blogPages.length}`);
  console.log(`Pages with issues: ${pagesWithIssues.length}`);
  console.log(`Duplicate titles: ${duplicateTitles.length}`);
  console.log(`Duplicate descriptions: ${duplicateDescriptions.length}`);
  console.log(`Pages with FAQPage schema: ${results.filter((r) => r.hasFaqSchema).length}`);
  console.log(`Pages with Article schema: ${results.filter((r) => r.hasArticleSchema).length}`);
  console.log();

  if (duplicateTitles.length > 0) {
    console.log("=== Duplicate Titles ===");
    for (const [title, count] of duplicateTitles) {
      console.log(`  (${count}x) ${title}`);
    }
    console.log();
  }

  if (duplicateDescriptions.length > 0) {
    console.log("=== Duplicate Descriptions ===");
    for (const [desc, count] of duplicateDescriptions) {
      console.log(`  (${count}x) ${desc.slice(0, 80)}...`);
    }
    console.log();
  }

  if (pagesWithIssues.length > 0) {
    console.log("=== Pages with Issues ===");
    for (const r of pagesWithIssues.slice(0, 30)) {
      console.log(`  ${r.url}`);
      console.log(`    Issues: ${r.issues.join(", ")}`);
    }
    if (pagesWithIssues.length > 30) {
      console.log(`    ... and ${pagesWithIssues.length - 30} more`);
    }
    console.log();
  }

  // Write detailed report
  const reportPath = path.join(process.cwd(), "seo-health-report.json");
  fs.writeFileSync(reportPath, JSON.stringify({
    summary: {
      total: results.length,
      blogPages: blogPages.length,
      withIssues: pagesWithIssues.length,
      duplicateTitles: duplicateTitles.length,
      duplicateDescriptions: duplicateDescriptions.length,
      withFaqSchema: results.filter((r) => r.hasFaqSchema).length,
      withArticleSchema: results.filter((r) => r.hasArticleSchema).length,
    },
    duplicateTitles,
    duplicateDescriptions,
    pagesWithIssues: pagesWithIssues.map((r) => ({ url: r.url, issues: r.issues })),
    details: results,
  }, null, 2));
  console.log(`Detailed report written to ${reportPath}`);
}

main();
