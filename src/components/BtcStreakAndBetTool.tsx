"use client";

import { useMemo, useState } from "react";
import { Dice5, LineChart } from "lucide-react";
import type { Lang } from "@/lib/posts";
import type { BtcDay } from "@/lib/dataSnapshots";

const copy = {
  en: {
    streakTitle: "After N consecutive down days, what happened next?",
    streakNote:
      "Conditional frequencies from the past year. Sample sizes get thin fast—treat anything under 10 samples as anecdote, not edge.",
    afterDowns: "Consecutive down days",
    samples: "Samples",
    nextDown: "Next day down",
    nextUp: "Next day up",
    betTitle: "What if you bet the same direction every day?",
    betNote:
      "Pick a start point and a direction. Flat 1-unit stake per day, filled at the price below—wins pay 1 unit. This is the math every short-timeframe market maker already knows.",
    direction: "Direction",
    betUp: "Always UP",
    betDown: "Always DOWN",
    startLabel: "Start",
    daysAgo: (n: number) => `${n} days ago`,
    priceLabel: "Avg. entry price",
    results: ["Trading days", "Win rate", "Profit (units)", "ROI on staked"],
    breakeven: "Break-even win rate at this price",
    disclaimer: "Backtested on historical daily closes. Past performance does not guarantee future results.",
  },
  zh: {
    streakTitle: "连跌 N 天之后，次日发生了什么？",
    streakNote: "基于过去一年数据的真实条件频率。样本量小得很快——少于 10 个样本的都只能当轶事看，不能当优势。",
    afterDowns: "连续下跌天数",
    samples: "样本数",
    nextDown: "次日下跌",
    nextUp: "次日上涨",
    betTitle: "如果每天都押同一个方向呢？",
    betNote: "选个起点和方向。每天固定 1 单位注码，按下方价格成交，猜中赔付 1 单位。每个短周期做市商都背过这笔账。",
    direction: "方向",
    betUp: "一直压涨",
    betDown: "一直压跌",
    startLabel: "起点",
    daysAgo: (n: number) => `${n} 天前`,
    priceLabel: "平均买入价",
    results: ["交易天数", "胜率", "盈亏（单位）", "注码 ROI"],
    breakeven: "该价格下的盈亏平衡胜率",
    disclaimer: "基于历史每日收盘价的回测。历史表现不代表未来结果。",
  },
} as const;

interface StreakRow {
  n: number;
  samples: number;
  downNext: number;
}

function streakStats(days: BtcDay[]): StreakRow[] {
  const valid = days.filter((d) => d.up !== null);
  const rows: StreakRow[] = [];
  for (let n = 1; n <= 6; n++) {
    let samples = 0;
    let downNext = 0;
    for (let i = n; i < valid.length; i++) {
      const window = valid.slice(i - n, i);
      if (window.every((d) => d.up === false)) {
        samples++;
        if (valid[i].up === false) downNext++;
      }
    }
    rows.push({ n, samples, downNext });
  }
  return rows;
}

export function BtcStreakAndBetTool({ days, lang }: { days: BtcDay[]; lang: Lang }) {
  const t = copy[lang];
  const streaks = useMemo(() => streakStats(days), [days]);
  const [daysAgo, setDaysAgo] = useState(90);
  const [price, setPrice] = useState(0.5);
  const [dir, setDir] = useState<"up" | "down">("up");

  const result = useMemo(() => {
    const slice = days.slice(-daysAgo).filter((d) => d.up !== null);
    if (!slice.length) return null;
    const wins = slice.filter((d) => d.up === (dir === "up")).length;
    const losses = slice.length - wins;
    const profit = wins * (1 - price) - losses * price;
    const staked = slice.length * price;
    return {
      days: slice.length,
      winRate: (wins / slice.length) * 100,
      profit,
      roi: staked > 0 ? (profit / staked) * 100 : 0,
      breakeven: price * 100,
    };
  }, [days, daysAgo, price, dir]);

  return (
    <section className="nx-section px-4 pt-0 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
        {/* Streak conditional probabilities */}
        <div className="nx-card p-7">
          <div className="flex items-center gap-3">
            <Dice5 className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-2xl font-semibold">{t.streakTitle}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{t.streakNote}</p>
          <table className="mt-5 w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border-soft text-muted-foreground">
                <th className="py-2 pr-2 font-medium">{t.afterDowns}</th>
                <th className="py-2 pr-2 font-medium">{t.samples}</th>
                <th className="py-2 pr-2 font-medium">{t.nextDown}</th>
                <th className="py-2 font-medium">{t.nextUp}</th>
              </tr>
            </thead>
            <tbody>
              {streaks.map((row) => {
                const pDown = row.samples ? (row.downNext / row.samples) * 100 : null;
                const thin = row.samples < 10;
                return (
                  <tr key={row.n} className="border-b border-border last:border-0">
                      <td className="py-2.5 pr-2 font-medium text-foreground">{row.n}</td>
                    <td className={`py-2.5 pr-2 ${thin ? "text-muted-foreground" : "text-muted"}`}>{row.samples}</td>
                    <td className="py-2.5 pr-2 text-danger">{pDown === null ? "—" : `${pDown.toFixed(0)}%`}</td>
                    <td className="py-2.5 text-success">{pDown === null ? "—" : `${(100 - pDown).toFixed(0)}%`}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Same-direction backtester */}
        <div className="nx-card p-7">
          <div className="flex items-center gap-3">
            <LineChart className="h-5 w-5 text-accent" />
            <h2 className="font-serif text-2xl font-semibold">{t.betTitle}</h2>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{t.betNote}</p>

          <div className="mt-5 space-y-5">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{t.direction}</span>
              <div className="mt-2 flex border border-border font-mono text-xs">
                {(["up", "down"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDir(d)}
                    className={`flex-1 px-3 py-2 transition-colors ${
                      dir === d ? "bg-ink text-on-ink" : "text-muted hover:text-foreground"
                    }`}
                  >
                    {d === "up" ? t.betUp : t.betDown}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>{t.startLabel}</span>
                <span className="text-foreground">{t.daysAgo(daysAgo)}</span>
              </div>
              <input
                type="range"
                min={7}
                max={Math.max(7, days.length)}
                value={daysAgo}
                onChange={(e) => setDaysAgo(Number(e.target.value))}
                className="mt-2 w-full accent-[#e56a35]"
              />
            </div>

            <div>
              <div className="flex justify-between font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <span>{t.priceLabel}</span>
                <span className="text-foreground">{price.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={0.95}
                step={0.01}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="mt-2 w-full accent-[#e56a35]"
              />
            </div>
          </div>

          {result && (
            <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-5 sm:grid-cols-4">
              <div>
                <p className="font-serif text-xl font-semibold">{result.days}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t.results[0]}</p>
              </div>
              <div>
                <p className="font-serif text-xl font-semibold">{result.winRate.toFixed(1)}%</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t.results[1]}</p>
              </div>
              <div>
                <p className={`font-serif text-xl font-semibold ${result.profit >= 0 ? "text-success" : "text-danger"}`}>
                  {result.profit >= 0 ? "+" : ""}
                  {result.profit.toFixed(1)}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t.results[2]}</p>
              </div>
              <div>
                <p className={`font-serif text-xl font-semibold ${result.roi >= 0 ? "text-success" : "text-danger"}`}>
                  {result.roi >= 0 ? "+" : ""}
                  {result.roi.toFixed(1)}%
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t.results[3]}</p>
              </div>
            </div>
          )}
          <p className="mt-4 text-xs text-muted-foreground">
            {t.breakeven}: {result ? `${result.breakeven.toFixed(0)}%` : "—"} · {t.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
