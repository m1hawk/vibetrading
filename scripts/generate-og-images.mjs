/**
 * Generates static Open Graph images (1200×630 PNG) into public/og/.
 *
 *   node scripts/generate-og-images.mjs
 *
 * Design follows the Nexus tokens: paper background, Playfair Display titles,
 * IBM Plex Mono labels, signal-orange accents. Latin glyphs use the vendored
 * TTFs in scripts/assets/fonts/; Chinese glyphs use a build-time subset of
 * Noto Serif SC fetched once from Google Fonts (cached on disk afterwards).
 */
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";

const root = process.cwd();
const postsDir = path.join(root, "content", "posts");
const fontsDir = path.join(root, "scripts", "assets", "fonts");
const outDir = path.join(root, "public", "og");

const COLORS = {
  page: "#f6f3ee",
  ink: "#0b0b0b",
  muted: "#6e6e6e",
  accent: "#ff8a57",
  accentText: "#e56a35",
  border: "rgba(20, 16, 12, 0.16)",
};

function loadFont(file) {
  return fs.readFileSync(path.join(fontsDir, file));
}

/** Fetch (or reuse cached) a Noto Serif SC subset covering `chars`. */
async function loadCjkFont(chars) {
  const cache = path.join(fontsDir, "NotoSerifSC-700-subset.ttf");
  const uniq = [...new Set(chars.replace(/\s/g, ""))].join("");
  const url =
    "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@700&text=" +
    encodeURIComponent(uniq);
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/4.0" } });
    const css = await res.text();
    const m = css.match(/url\((https:[^)]+)\)/);
    if (!m) throw new Error("no font url in css");
    const fontRes = await fetch(m[1], { headers: { "User-Agent": "Mozilla/4.0" } });
    const buf = Buffer.from(await fontRes.arrayBuffer());
    fs.writeFileSync(cache, buf);
    console.log(`Fetched Noto Serif SC subset (${uniq.length} glyphs, ${buf.length} bytes)`);
    return buf;
  } catch (err) {
    if (fs.existsSync(cache)) {
      console.warn(`CJK subset fetch failed (${err.message}); using cached file`);
      return fs.readFileSync(cache);
    }
    throw err;
  }
}

function readPosts() {
  const posts = [];
  for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"))) {
    const isZh = file.endsWith(".zh.mdx");
    const slug = isZh ? file.replace(/\.zh\.mdx$/, "") : file.replace(/\.mdx$/, "");
    const { data } = matter(fs.readFileSync(path.join(postsDir, file), "utf8"));
    posts.push({
      slug,
      lang: isZh ? "zh" : "en",
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "Guides",
    });
  }
  return posts;
}

const staticPages = [
  { key: "home", lang: "en", category: "Vibe Trading", title: "AI Trading for Everyone", description: "Turn market ideas into research, strategies, backtests, and automated workflows with AI. No quant background required." },
  { key: "vibe-trading", lang: "en", category: "Start Here", title: "What Is Vibe Trading?", description: "Learn how to turn market ideas into testable trading workflows with AI—from plain English to backtest and paper trading." },
  { key: "blog", lang: "en", category: "Guides", title: "Vibe Trading Guides", description: "Evidence-based guides on AI trading, backtesting, and automation for retail traders." },
  { key: "tutorials", lang: "en", category: "Tutorials", title: "AI Trading Tutorials", description: "Step-by-step tutorials: build bots, automate strategies, connect broker APIs, and backtest before risking real capital." },
  { key: "tools", lang: "en", category: "Tools", title: "AI Trading Tools", description: "An open-source tool stack for research, backtesting, and automation." },
  { key: "build", lang: "en", category: "Build", title: "Build with AI", description: "Build no-code workflows, TradingView strategies, Python bots, backtests, and trading agents with AI." },
  { key: "lab", lang: "en", category: "Lab", title: "Vibe Trading Lab", description: "Transparent AI trading experiments with fixed rules, realistic costs, paper trading, and published limits." },
  { key: "about", lang: "en", category: "About", title: "About VibeTrading.fun", description: "Who we are, what we publish, and how we make money." },
  { key: "zh/home", lang: "zh", category: "Vibe Trading", title: "人人都能开始的 Vibe Trading", description: "用 AI 把市场想法转化为研究、策略、回测和自动化交易流程。无需量化背景。" },
  { key: "zh/vibe-trading", lang: "zh", category: "从这里开始", title: "什么是 Vibe Trading？", description: "学习如何用 AI 把市场想法变成可验证的交易工作流——从自然语言到回测与模拟盘。" },
  { key: "zh/blog", lang: "zh", category: "指南", title: "Vibe Trading 实践指南", description: "面向散户的 AI 交易、回测与自动化实证指南。" },
  { key: "zh/tools", lang: "zh", category: "工具", title: "AI 交易工具栈", description: "用于研究、回测与自动化的开源工具栈选型框架。" },
  { key: "zh/build", lang: "zh", category: "构建", title: "用 AI 构建交易工作流", description: "用 AI 构建无代码工作流、TradingView 策略、Python 交易机器人、回测和交易 Agent。" },
  { key: "zh/lab", lang: "zh", category: "实验室", title: "Vibe Trading 实验室", description: "公开规则、现实成本、模拟盘过程和失败结果的透明 AI 交易实验。" },
  { key: "zh/about", lang: "zh", category: "关于", title: "关于 VibeTrading.fun", description: "我们是谁，发布什么内容，以及如何盈利。" },
];

function clampText(text, max) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

// Conservative 3-line character capacity per title font size (Playfair 700).
const TITLE_BUCKETS = [
  { size: 70, capacity: 48 },
  { size: 62, capacity: 62 },
  { size: 54, capacity: 76 },
  { size: 46, capacity: 96 },
];

function fitTitle(title) {
  for (const b of TITLE_BUCKETS) {
    if (title.length <= b.capacity) return { size: b.size, text: title };
  }
  const b = TITLE_BUCKETS[TITLE_BUCKETS.length - 1];
  return { size: b.size, text: clampText(title, b.capacity) };
}

function template({ title, description, category, lang }) {
  const isZh = lang === "zh";
  const titleFont = isZh ? "Playfair Display, Noto Serif SC" : "Playfair Display";
  const fitted = fitTitle(title);
  const titleSize = fitted.size;
  title = fitted.text;
  description = clampText(description, isZh ? 72 : 110);
  return {
    type: "div",
    props: {
      style: {
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        padding: "64px 72px",
        backgroundColor: COLORS.page,
        backgroundImage:
          "linear-gradient(rgba(11,11,11,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(11,11,11,0.035) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        fontFamily: "Inter",
        position: "relative",
      },
      children: [
        // top row
        {
          type: "div",
          props: {
            style: { display: "flex", alignItems: "center", justifyContent: "space-between" },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    fontFamily: "IBM Plex Mono",
                    fontSize: "21px",
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    color: COLORS.ink,
                  },
                  children: [
                    {
                      type: "div",
                      props: {
                        style: { width: "12px", height: "12px", borderRadius: "999px", backgroundColor: COLORS.accent },
                      },
                    },
                    "VIBETRADING.FUN",
                  ],
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "IBM Plex Mono",
                    fontSize: "19px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: COLORS.accentText,
                    border: `1px solid ${COLORS.border}`,
                    backgroundColor: "rgba(255,138,87,0.10)",
                    padding: "8px 16px",
                    borderRadius: "999px",
                  },
                  children: category,
                },
              },
            ],
          },
        },
        // title
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              flex: 1,
              alignItems: "center",
              paddingTop: "24px",
              paddingBottom: "24px",
            },
            children: {
              type: "div",
              props: {
                style: {
                  fontFamily: titleFont,
                  fontWeight: 700,
                  fontSize: `${titleSize}px`,
                  lineHeight: 1.16,
                  letterSpacing: "-0.02em",
                  color: COLORS.ink,
                  maxHeight: "400px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineClamp: 3,
                },
                children: title,
              },
            },
          },
        },
        // bottom row
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "48px",
            },
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "23px",
                    lineHeight: 1.45,
                    color: COLORS.muted,
                    maxWidth: "820px",
                    maxHeight: "70px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    lineClamp: 2,
                  },
                  children: description,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontFamily: "IBM Plex Mono",
                    fontSize: "18px",
                    letterSpacing: "0.12em",
                    color: COLORS.muted,
                    textTransform: "uppercase",
                    flexShrink: 0,
                  },
                  children: isZh ? "教育优先 · 模拟优先" : "EDUCATION FIRST · PAPER FIRST",
                },
              },
            ],
          },
        },
        // bottom accent bar
        {
          type: "div",
          props: {
            style: {
              position: "absolute",
              left: 0,
              bottom: 0,
              width: "1200px",
              height: "8px",
              backgroundImage: `linear-gradient(90deg, ${COLORS.accent} 0%, rgba(255,138,87,0.25) 60%, rgba(255,138,87,0) 100%)`,
            },
          },
        },
      ],
    },
  };
}

async function render(item, outFile, fonts) {
  const svg = await satori(template(item), {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = new Resvg(svg, {
    fitTo: { mode: "width", value: 1200 },
    font: { loadSystemFonts: false },
  })
    .render()
    .asPng();
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, png);
}

async function main() {
  const posts = readPosts();
  const zhText = [...posts.filter((p) => p.lang === "zh"), ...staticPages.filter((p) => p.lang === "zh")]
    .map((p) => p.title + p.description + p.category)
    .join("");
  const cjk = await loadCjkFont(zhText);

  const fonts = [
    { name: "Inter", data: loadFont("Inter-400.ttf"), weight: 400, style: "normal" },
    { name: "Inter", data: loadFont("Inter-600.ttf"), weight: 600, style: "normal" },
    { name: "Playfair Display", data: loadFont("PlayfairDisplay-700.ttf"), weight: 700, style: "normal" },
    { name: "IBM Plex Mono", data: loadFont("IBMPlexMono-400.ttf"), weight: 400, style: "normal" },
    { name: "IBM Plex Mono", data: loadFont("IBMPlexMono-500.ttf"), weight: 500, style: "normal" },
    { name: "Noto Serif SC", data: cjk, weight: 700, style: "normal" },
  ];

  let count = 0;
  for (const post of posts) {
    const rel = post.lang === "zh" ? `zh/blog/${post.slug}.png` : `blog/${post.slug}.png`;
    await render(
      { title: post.title, description: post.description, category: post.category, lang: post.lang },
      path.join(outDir, rel),
      fonts
    );
    count++;
  }
  for (const page of staticPages) {
    await render(page, path.join(outDir, `${page.key}.png`), fonts);
    count++;
  }
  console.log(`Generated ${count} OG images in public/og/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
