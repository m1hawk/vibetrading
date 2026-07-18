"use client";

import { useMemo, useState } from "react";
import { CalendarRange, Target } from "lucide-react";
import type { Lang } from "@/lib/posts";
import type { MuskWeek } from "@/lib/dataSnapshots";

const copy = {
  en: {
    seasonTitle: "Which months does Elon post the most?",
    seasonNote:
      "Average estimated weekly posts by calendar month, across all tracked years. Two-plus years of data is a small sample—seasonality here is a hint, not a law.",
    seasonAria: "Monthly average weekly posts",
    bracketTitle: "What if you backed the same bracket every week?",
    bracketNote:
      "We bucket every settled week into wide ranges. Hit rate = share of weeks landing in that range. The break-even price is the hit rate itself: buy below it often enough and the strategy is profitable.",
    priceLabel: "Assumed avg. entry price",
    headers: ["Bracket", "Weeks won", "Hit rate", "Break-even price", "ROI at your price"],
    posts: "posts",
    posNote: "Green = positive ROI at your assumed price.",
    disclaimer: "Backtested on settled market outcomes. Historical hit rates do not guarantee future ones.",
  },
  zh: {
    seasonTitle: "哪几个月 Musk 发帖最多？",
    seasonNote: "按自然月统计的平均每周发帖估计（跨所有已统计年份）。两年多的数据样本偏小——这里的季节性是线索，不是定律。",
    seasonAria: "月度平均每周发帖数",
    bracketTitle: "如果每周都押同一个区间呢？",
    bracketNote: "我们把所有已结算周归入几个宽区间。命中率 = 落入该区间的周数占比。盈亏平衡价就是命中率本身：平均买入价长期低于它，策略就是正收益。",
    priceLabel: "假设平均买入价",
    headers: ["区间", "命中周数", "命中率", "盈亏平衡价", "该价格下 ROI"],
    posts: "帖",
    posNote: "绿色 = 在你的假设价格下 ROI 为正。",
    disclaimer: "基于已结算市场结果的回测。历史命中率不代表未来。",
  },
} as const;

const MONTHS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const BINS = [
  { label: "<200", test: (m: number) => m < 200 },
  { label: "200–249", test: (m: number) => m >= 200 && m < 250 },
  { label: "250–299", test: (m: number) => m >= 250 && m < 300 },
  { label: "300–349", test: (m: number) => m >= 300 && m < 350 },
  { label: "350–399", test: (m: number) => m >= 350 && m < 400 },
  { label: "400+", test: (m: number) => m >= 400 },
];

export function MuskSeasonalityTool({ weeks, lang }: { weeks: MuskWeek[]; lang: Lang }) {
  const t = copy[lang];
  const [price, setPrice] = useState(0.2);

  const monthly = useMemo(() => {
    const sums = Array.from({ length: 12 }, () => ({ sum: 0, n: 0 }));
    for (const w of weeks) {
      const month = Number(w.weekStart.slice(5, 7)) - 1;
      if (month >= 0 && month < 12) {
        sums[month].sum += w.midpoint;
        sums[month].n += 1;
      }
    }
    const avgs = sums.map((s) => (s.n ? s.sum / s.n : 0));
    const max = Math.max(1, ...avgs);
    return avgs.map((avg, i) => ({
      label: lang === "zh" ? `${i + 1}月` : MONTHS_EN[i],
      avg,
      n: sums[i].n,
      heightPct: (avg / max) * 100,
    }));
  }, [weeks, lang]);

  const brackets = useMemo(() => {
    const total = weeks.length;
    return BINS.map((bin) => {
      const wins = weeks.filter((w) => bin.test(w.midpoint)).length;
      const hit = total ? wins / total : 0;
      const profit = wins * (1 - price) - (total - wins) * price;
      const roi = total * price > 0 ? (profit / (total * price)) * 100 : 0;
      return { label: bin.label, wins, total, hit, roi };
    });
  }, [weeks, price]);

  return (
    <section className="nx-section px-4 pt-0 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
        {/* Month-of-year seasonality */}
        <div className="nx-card p-7">
          <div className="flex items-center gap-3">
            <CalendarRange className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-2xl font-semibold">{t.seasonTitle}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{t.seasonNote}</p>
          <div className="mt-6 flex h-44 items-end gap-1.5" role="img" aria-label={t.seasonAria}>
            {monthly.map((m) => (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {m.n ? Math.round(m.avg) : "—"}
                </span>
                <div
                  className="w-full rounded-sm bg-accent/75"
                  style={{ height: `${Math.max(2, m.heightPct * 0.75)}%` }}
                  title={`${m.label} · ~${Math.round(m.avg)} ${t.posts} (${m.n}w)`}
                />
                <span className="font-mono text-[10px] text-muted-foreground">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Same-bracket backtester */}
        <div className="nx-card p-7">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-2xl font-semibold">{t.bracketTitle}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{t.bracketNote}</p>

          <div className="mt-5">
            <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>{t.priceLabel}</span>
              <span className="text-foreground">{price.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.6}
              step={0.01}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="mt-2 w-full accent-[#e56a35]"
            />
          </div>

          <table className="mt-5 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-soft text-muted-foreground">
                <th className="py-2 pr-2 font-medium">{t.headers[0]}</th>
                <th className="py-2 pr-2 font-medium">{t.headers[1]}</th>
                <th className="py-2 pr-2 font-medium">{t.headers[2]}</th>
                <th className="py-2 pr-2 font-medium">{t.headers[3]}</th>
                <th className="py-2 font-medium">{t.headers[4]}</th>
              </tr>
            </thead>
            <tbody>
              {brackets.map((b) => (
                <tr key={b.label} className="border-b border-border last:border-0">
                  <td className="py-2.5 pr-2 font-medium text-foreground">{b.label}</td>
                  <td className="py-2.5 pr-2 text-muted">
                    {b.wins}/{b.total}
                  </td>
                  <td className="py-2.5 pr-2 text-muted">{(b.hit * 100).toFixed(1)}%</td>
                  <td className="py-2.5 pr-2 text-muted">{b.hit.toFixed(2)}</td>
                  <td className={`py-2.5 font-medium ${b.roi >= 0 ? "text-success" : "text-danger"}`}>
                    {b.roi >= 0 ? "+" : ""}
                    {b.roi.toFixed(0)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-muted-foreground">
            {t.posNote} {t.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
