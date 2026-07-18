import { TrendingDown, TrendingUp, Activity, CalendarDays } from "lucide-react";
import type { Lang } from "@/lib/posts";
import { getBtcDaily, type BtcDay } from "@/lib/dataSnapshots";
import { formatDate } from "@/lib/date";
import { BtcStreakAndBetTool } from "@/components/BtcStreakAndBetTool";

const copy = {
  en: {
    eyebrow: "Free data tool",
    title: "Bitcoin up or down: the historical record",
    lead: "Daily BTC closes for the past year, turned into a simple question traders ask every day: how often does Bitcoin actually go up?",
    updated: "Data updated",
    source: "Source: CoinGecko daily closes (UTC). Snapshots refresh once per day.",
    streakTitle: "Current streak",
    upDays: (n: number) => `${n} consecutive up day${n === 1 ? "" : "s"}`,
    downDays: (n: number) => `${n} consecutive down day${n === 1 ? "" : "s"}`,
    upShareTitle: "Up-day frequency",
    d30: "Last 30 days",
    d90: "Last 90 days",
    d365: "Last 365 days",
    chartTitle: "One year of daily moves",
    chartNote: "Bar height = size of the daily move. Green = up day, red = down day.",
    best: "Best day",
    worst: "Worst day",
    monthlyTitle: "Month by month",
    month: "Month",
    upShare: "Up days",
    avgMove: "Avg. daily move",
    totalMove: "Total return",
    days: "Days",
    howTitle: "How to read this",
    howText:
      "Short-term Bitcoin direction is close to a coin flip, which is exactly why micro-timeframe 'up or down' markets are hard to beat after fees. The edge, when it exists, shows up in weeks and months—not in the next hourly candle.",
    disclaimer: "For research and education only. Not investment advice.",
  },
  zh: {
    eyebrow: "免费数据工具",
    title: "比特币猜涨跌：历史数据记录",
    lead: "把过去一年的 BTC 每日收盘价，变成交易者每天都在问的那个简单问题：比特币上涨的日子到底占多少？",
    updated: "数据更新于",
    source: "数据来源：CoinGecko 每日收盘价（UTC）。数据每天更新一次。",
    streakTitle: "当前连续",
    upDays: (n: number) => `连涨 ${n} 天`,
    downDays: (n: number) => `连跌 ${n} 天`,
    upShareTitle: "上涨日占比",
    d30: "近 30 天",
    d90: "近 90 天",
    d365: "近 365 天",
    chartTitle: "一年的每日涨跌",
    chartNote: "柱高 = 当日涨跌幅。绿色 = 上涨，红色 = 下跌。",
    best: "最佳单日",
    worst: "最差单日",
    monthlyTitle: "逐月统计",
    month: "月份",
    upShare: "上涨日占比",
    avgMove: "平均日涨跌",
    totalMove: "月度收益",
    days: "天数",
    howTitle: "怎么读这些数据",
    howText:
      "短期比特币方向接近抛硬币——这正是短周期“猜涨跌”市场在扣除手续费后很难战胜的原因。真正的优势如果存在，只会出现在周和月的尺度上，而不是下一根小时K线。",
    disclaimer: "仅供研究与教育用途，不构成投资建议。",
  },
} as const;

function upShare(days: BtcDay[]): number | null {
  const valid = days.filter((d) => d.up !== null);
  if (!valid.length) return null;
  return Math.round((valid.filter((d) => d.up).length / valid.length) * 1000) / 10;
}

function streak(days: BtcDay[]): { up: boolean; count: number } | null {
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].up === null) continue;
    const dir = days[i].up as boolean;
    let count = 0;
    for (let j = i; j >= 0 && days[j].up === dir; j--) count++;
    return { up: dir, count };
  }
  return null;
}

interface MonthRow {
  month: string;
  days: number;
  upShare: number;
  avgChange: number;
  totalReturn: number;
}

function monthlyRows(days: BtcDay[]): MonthRow[] {
  const groups = new Map<string, BtcDay[]>();
  for (const d of days) {
    const key = d.date.slice(0, 7);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(d);
  }
  return [...groups.entries()]
    .map(([month, ds]) => {
      const withChange = ds.filter((d) => d.changePct !== null);
      const first = ds[0];
      const last = ds[ds.length - 1];
      return {
        month,
        days: ds.length,
        upShare: upShare(ds) ?? 0,
        avgChange: withChange.length
          ? Math.round((withChange.reduce((s, d) => s + (d.changePct as number), 0) / withChange.length) * 100) / 100
          : 0,
        totalReturn:
          first && last
            ? Math.round(((last.close - (first.changePct !== null ? first.close / (1 + first.changePct / 100) : first.close)) /
                (first.changePct !== null ? first.close / (1 + first.changePct / 100) : first.close)) * 1000) / 10
            : 0,
      };
    })
    .reverse();
}

export function BtcUpDownTool({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const data = getBtcDaily();
  const days = data.days;
  const s = streak(days);
  const shares = [
    { label: t.d30, value: upShare(days.slice(-30)) },
    { label: t.d90, value: upShare(days.slice(-90)) },
    { label: t.d365, value: upShare(days) },
  ];
  const withChange = days.filter((d) => d.changePct !== null);
  const best = withChange.length ? withChange.reduce((a, b) => ((b.changePct as number) > (a.changePct as number) ? b : a)) : null;
  const worst = withChange.length ? withChange.reduce((a, b) => ((b.changePct as number) < (a.changePct as number) ? b : a)) : null;
  const maxAbs = Math.max(1, ...withChange.map((d) => Math.abs(d.changePct as number)));
  const months = monthlyRows(days);
  const locale = lang === "zh" ? "zh-CN" : "en-US";

  return (
    <div>
      <section className="hero-grid relative px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="nx-label">{t.eyebrow}</div>
          <h1 className="nx-display mt-5 max-w-4xl text-4xl sm:text-6xl">{t.title}</h1>
          <p className="nx-lead mt-6 max-w-3xl text-lg sm:text-xl">{t.lead}</p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {t.updated} {data.updated ? formatDate(data.updated, locale) : "—"} · {t.source}
          </p>
        </div>
      </section>

      <section className="px-4 pb-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          <div className="nx-card p-7">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <Activity className="h-4 w-4 text-accent" />
              {t.streakTitle}
            </div>
            <p className="mt-4 font-serif text-3xl font-semibold">
              {s ? (s.up ? t.upDays(s.count) : t.downDays(s.count)) : "—"}
            </p>
          </div>
          <div className="nx-card p-7 md:col-span-2">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <TrendingUp className="h-4 w-4 text-success" />
              {t.upShareTitle}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {shares.map((row) => (
                <div key={row.label}>
                  <p className="font-serif text-2xl font-semibold sm:text-3xl">
                    {row.value === null ? "—" : `${row.value}%`}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{row.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.chartTitle}</h2>
          <p className="mt-3 text-sm text-muted">{t.chartNote}</p>
          <div className="nx-card mt-6 p-6">
            <div className="flex h-48 items-end gap-px" role="img" aria-label={t.chartTitle}>
              {days.map((d) => {
                const h = d.changePct === null ? 2 : Math.max(2, (Math.abs(d.changePct) / maxAbs) * 100);
                return (
                  <div
                    key={d.date}
                    title={`${d.date} · ${d.changePct === null ? "—" : `${d.changePct}%`} · $${d.close.toLocaleString()}`}
                    className={`flex-1 rounded-sm ${d.up === null ? "bg-border" : d.up ? "bg-success/80" : "bg-danger/80"}`}
                    style={{ height: `${h}%` }}
                  />
                );
              })}
            </div>
          </div>
          {(best || worst) && (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {best && (
                <div className="nx-card flex items-center gap-3 p-5">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <span className="text-sm text-muted">
                    {t.best}: <strong className="text-foreground">{formatDate(best.date, locale)}</strong>{" "}
                    ({(best.changePct as number) > 0 ? "+" : ""}
                    {best.changePct}%)
                  </span>
                </div>
              )}
              {worst && (
                <div className="nx-card flex items-center gap-3 p-5">
                  <TrendingDown className="h-5 w-5 text-danger" />
                  <span className="text-sm text-muted">
                    {t.worst}: <strong className="text-foreground">{formatDate(worst.date, locale)}</strong> ({worst.changePct}%)
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <BtcStreakAndBetTool days={days} lang={lang} />

      <section className="nx-section px-4 pt-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.monthlyTitle}</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-soft">
                  <th className="px-6 py-4 text-foreground">{t.month}</th>
                  <th className="px-6 py-4 text-foreground">{t.days}</th>
                  <th className="px-6 py-4 text-foreground">{t.upShare}</th>
                  <th className="px-6 py-4 text-foreground">{t.avgMove}</th>
                  <th className="px-6 py-4 text-foreground">{t.totalMove}</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {months.map((m) => (
                  <tr key={m.month} className="border-b border-border last:border-0">
                    <td className="px-6 py-3.5 font-medium text-foreground">{m.month}</td>
                    <td className="px-6 py-3.5">{m.days}</td>
                    <td className="px-6 py-3.5">{m.upShare}%</td>
                    <td className={`px-6 py-3.5 ${m.avgChange >= 0 ? "text-success" : "text-danger"}`}>
                      {m.avgChange >= 0 ? "+" : ""}
                      {m.avgChange}%
                    </td>
                    <td className={`px-6 py-3.5 ${m.totalReturn >= 0 ? "text-success" : "text-danger"}`}>
                      {m.totalReturn >= 0 ? "+" : ""}
                      {m.totalReturn}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-4 pb-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="nx-card p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-accent" />
              <h2 className="nx-display text-2xl sm:text-3xl">{t.howTitle}</h2>
            </div>
            <p className="mt-4 max-w-3xl leading-7 text-muted">{t.howText}</p>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              {t.disclaimer}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
