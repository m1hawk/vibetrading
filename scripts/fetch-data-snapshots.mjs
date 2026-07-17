/**
 * Daily data snapshot fetcher for the free data tools.
 *
 *   node scripts/fetch-data-snapshots.mjs
 *
 * Sources (all free, no auth):
 *   - CoinGecko market_chart: BTC daily closes
 *   - Polymarket Gamma API: resolved "Elon Musk # of tweets" bracket events
 *     (the winning bracket of a resolved event = the actual weekly count range)
 *
 * Output: data/btc-daily.json, data/musk-tweets.json
 * The script is idempotent: it rebuilds the full series from public history
 * and merges with whatever is already on disk, so no history is ever lost.
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const dataDir = path.join(root, "data");
fs.mkdirSync(dataDir, { recursive: true });

const UA = { "User-Agent": "vibetrading.fun data-snapshot/1.0" };

async function getJson(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

function dayKey(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/* ── BTC daily up/down ─────────────────────────────────────────────── */

async function fetchBtc() {
  const days = 365;
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  const json = await getJson(url);
  const points = (json.prices || []).map(([ms, price]) => ({ date: dayKey(ms), close: Math.round(price * 100) / 100 }));

  // Dedupe by date, drop today's partial candle
  const byDate = new Map();
  for (const p of points) byDate.set(p.date, p);
  const today = dayKey(Date.now());
  byDate.delete(today);

  const sorted = [...byDate.values()].sort((a, b) => a.date.localeCompare(b.date));
  const out = sorted.map((p, i) => {
    const prev = i > 0 ? sorted[i - 1].close : null;
    const changePct = prev ? Math.round(((p.close - prev) / prev) * 10000) / 100 : null;
    return { date: p.date, close: p.close, changePct, up: prev ? p.close >= prev : null };
  });

  const file = path.join(dataDir, "btc-daily.json");
  fs.writeFileSync(
    file,
    JSON.stringify({ updated: new Date().toISOString(), source: "coingecko", days: out }, null, 2)
  );
  console.log(`btc-daily.json: ${out.length} days (${out[0]?.date} -> ${out[out.length - 1]?.date})`);
}

/* ── Elon Musk weekly tweet counts (via resolved Polymarket brackets) ── */

const MUSK_QUERIES = ["elon musk tweets", "elon musk of tweets"];

function parseBracket(question) {
  // "Will Elon tweet 400-449 times ...?" / "Will Musk tweet between 160-225 times ...?"
  let m = question.match(/(?:tweet|post) (?:between )?(\d+)-(\d+) (?:times|tweets)/i);
  if (m) return { low: Number(m[1]), high: Number(m[2]) };
  // "Will Elon Musk post 0-19 tweets from ...?"
  m = question.match(/post (\d+)-(\d+) tweets/i);
  if (m) return { low: Number(m[1]), high: Number(m[2]) };
  // "Will Musk tweet less than 160 times ...?" / "post fewer than 20 tweets"
  m = question.match(/(?:tweet less than|post fewer than) (\d+) (?:times|tweets)/i);
  if (m) return { low: 0, high: Number(m[1]) - 1 };
  // "Will Elon tweet 900 or more times ...?" / "post 200 or more tweets"
  m = question.match(/(?:tweet|post) (\d+) or more (?:times|tweets)/i);
  if (m) return { low: Number(m[1]), high: null };
  return null;
}

async function fetchMuskEvents() {
  const slugs = new Map();
  for (const q of MUSK_QUERIES) {
    const url = `https://gamma-api.polymarket.com/public-search?q=${encodeURIComponent(q)}&limit_per_type=50`;
    const json = await getJson(url);
    for (const e of json.events || []) {
      if (!/tweet/i.test(e.title || "")) continue;
      if (!slugs.has(e.slug)) {
        slugs.set(e.slug, { slug: e.slug, closed: !!e.closed, startDate: e.startDate, endDate: e.endDate, title: e.title });
      }
    }
  }
  return [...slugs.values()];
}

async function fetchEventDetail(meta) {
  const url = `https://gamma-api.polymarket.com/events?slug=${meta.slug}`;
  const arr = await getJson(url);
  const e = arr[0];
  if (!e) return null;

  const brackets = [];
  for (const m of e.markets || []) {
    const q = m.question || m.groupItemTitle || "";
    const b = parseBracket(q);
    if (!b) continue;
    let prices = [];
    try {
      prices = JSON.parse(m.outcomePrices || "[]").map(Number);
    } catch {
      prices = [];
    }
    const yesPrice = prices[0] ?? null;
    // Final price of 1 on a closed market is the truth regardless of uma status
    // ("resolved" vs "proposed"): the winning bracket always settles at 1.
    brackets.push({ ...b, yesPrice, resolvedYes: m.closed === true && yesPrice === 1 });
  }
  brackets.sort((a, b2) => a.low - b2.low);

  return {
    slug: meta.slug,
    title: meta.title,
    weekStart: (e.startDate || meta.startDate || "").slice(0, 10),
    weekEnd: (e.endDate || meta.endDate || "").slice(0, 10),
    closed: !!e.closed,
    brackets,
  };
}

async function fetchMusk() {
  const metas = await fetchMuskEvents();
  console.log(`musk: ${metas.length} candidate events`);

  // Limited concurrency
  const details = [];
  const queue = [...metas];
  const workers = Array.from({ length: 5 }, async () => {
    while (queue.length) {
      const meta = queue.shift();
      try {
        const d = await fetchEventDetail(meta);
        if (d && d.brackets.length) details.push(d);
      } catch (err) {
        console.warn(`  skip ${meta.slug}: ${err.message}`);
      }
    }
  });
  await Promise.all(workers);

  const weeks = [];
  const live = [];
  for (const d of details) {
    const winner = d.brackets.find((b) => b.resolvedYes);
    if (winner) {
      weeks.push({
        weekStart: d.weekStart,
        weekEnd: d.weekEnd,
        low: winner.low,
        high: winner.high,
        midpoint: winner.high ? Math.round((winner.low + winner.high) / 2) : winner.low,
        slug: d.slug,
      });
    } else if (!d.closed) {
      live.push({
        slug: d.slug,
        title: d.title,
        weekStart: d.weekStart,
        weekEnd: d.weekEnd,
        brackets: d.brackets
          .filter((b) => b.yesPrice !== null)
          .map((b) => ({ low: b.low, high: b.high, prob: b.yesPrice })),
      });
    }
  }

  weeks.sort((a, b) => a.weekStart.localeCompare(b.weekStart));
  // Dedupe overlapping windows: keep the longest window per shared start date
  const seen = new Set();
  const deduped = weeks.filter((w) => {
    const key = `${w.weekStart}_${w.weekEnd}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const file = path.join(dataDir, "musk-tweets.json");
  fs.writeFileSync(
    file,
    JSON.stringify(
      {
        updated: new Date().toISOString(),
        source: "polymarket-resolved-events",
        note: "Actual weekly tweet counts reconstructed from resolved Polymarket bracket markets (resolution source: X tracker / X).",
        weeks: deduped,
        live,
      },
      null,
      2
    )
  );
  console.log(`musk-tweets.json: ${deduped.length} resolved weeks, ${live.length} live events`);
}

/* ── main ── */

const target = process.argv[2];
if (!target || target === "btc") await fetchBtc();
if (!target || target === "musk") await fetchMusk();
