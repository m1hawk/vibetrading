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
 * Default mode is incremental: only new days / newly resolved or newly
 * appearing Polymarket events are fetched and merged into the on-disk
 * series. Run with `--full` to rebuild the entire history from scratch
 * (useful for first runs or data repairs).
 */
import fs from "fs";
import path from "path";

const root = process.cwd();
const dataDir = path.join(root, "data");
fs.mkdirSync(dataDir, { recursive: true });

const FULL = process.argv.includes("--full");

const UA = { "User-Agent": "vibetrading.fun data-snapshot/1.0" };

async function getJson(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`GET ${url} -> ${res.status}`);
  return res.json();
}

function readData(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
  } catch {
    return fallback;
  }
}

function dayKey(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/* ── BTC daily up/down ─────────────────────────────────────────────── */

async function fetchBtc() {
  const existing = readData("btc-daily.json", { days: [] });
  const incremental = !FULL && existing.days.length > 0;
  // Incremental: refetch only a recent window (covers the latest candle and
  // corrects the previous day if it was still partial). Full: 365 days.
  const days = incremental ? 7 : 365;
  const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  const json = await getJson(url);
  const points = (json.prices || []).map(([ms, price]) => ({ date: dayKey(ms), close: Math.round(price * 100) / 100 }));

  // Merge: on-disk history wins except where fresh points exist
  const byDate = new Map();
  for (const p of existing.days) byDate.set(p.date, { date: p.date, close: p.close });
  for (const p of points) byDate.set(p.date, p);
  const today = dayKey(Date.now());
  byDate.delete(today); // drop today's partial candle

  const sorted = [...byDate.values()]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-365); // rolling year

  const out = sorted.map((p, i) => {
    const prev = i > 0 ? sorted[i - 1].close : null;
    const changePct = prev ? Math.round(((p.close - prev) / prev) * 10000) / 100 : null;
    return { date: p.date, close: p.close, changePct, up: prev ? p.close >= prev : null };
  });

  const added = out.length - existing.days.length;
  // Skip the write when nothing changed, so `updated` stays truthful and
  // the daily cron produces no empty commits.
  if (existing.days.length === out.length && JSON.stringify(existing.days) === JSON.stringify(out)) {
    console.log(`btc-daily.json: no changes (${out.length} days)`);
    return;
  }
  const file = path.join(dataDir, "btc-daily.json");
  fs.writeFileSync(
    file,
    JSON.stringify({ updated: new Date().toISOString(), source: "coingecko", days: out }, null, 2)
  );
  console.log(
    `btc-daily.json: ${out.length} days (${out[0]?.date} -> ${out[out.length - 1]?.date}) [${incremental ? `incremental, +${Math.max(0, added)} new` : "full rebuild"}]`
  );
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
  const existing = readData("musk-tweets.json", { weeks: [], live: [] });
  const knownResolved = new Set(existing.weeks.map((w) => w.slug));

  const metas = await fetchMuskEvents();
  // Incremental: skip events already resolved on disk. Always refetch
  // previously-live events (they may have settled) and anything new.
  const incremental = !FULL && existing.weeks.length > 0;
  const toFetch = incremental ? metas.filter((m) => !knownResolved.has(m.slug)) : metas;
  console.log(
    `musk: ${metas.length} candidate events, fetching ${toFetch.length} [${incremental ? "incremental" : "full rebuild"}]`
  );

  // Limited concurrency
  const details = [];
  const queue = [...toFetch];
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

  // Start from the on-disk resolved weeks; merge anything newly resolved
  const weeksBySlug = new Map(existing.weeks.map((w) => [w.slug, w]));
  const live = [];
  let newlyResolved = 0;
  for (const d of details) {
    const winner = d.brackets.find((b) => b.resolvedYes);
    if (winner) {
      if (!weeksBySlug.has(d.slug)) newlyResolved++;
      weeksBySlug.set(d.slug, {
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

  const weeks = [...weeksBySlug.values()].sort((a, b) => a.weekStart.localeCompare(b.weekStart));
  // Dedupe identical windows
  const seen = new Set();
  const deduped = weeks.filter((w) => {
    const key = `${w.weekStart}_${w.weekEnd}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  const payloadChanged =
    existing.weeks.length !== deduped.length ||
    JSON.stringify(existing.weeks) !== JSON.stringify(deduped) ||
    JSON.stringify(existing.live) !== JSON.stringify(live);
  if (!payloadChanged) {
    console.log(`musk-tweets.json: no changes (${deduped.length} weeks, ${live.length} live)`);
    return;
  }
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
  console.log(`musk-tweets.json: ${deduped.length} resolved weeks (+${newlyResolved} new), ${live.length} live events`);
}

/* ── main ── */

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const target = args[0];
if (!target || target === "btc") await fetchBtc();
if (!target || target === "musk") await fetchMusk();
