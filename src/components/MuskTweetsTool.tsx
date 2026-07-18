import { BarChart3, MessageSquare, TrendingUp, Info } from "lucide-react";
import type { Lang } from "@/lib/posts";
import { getMuskTweets } from "@/lib/dataSnapshots";
import { formatDate } from "@/lib/date";
import { MuskSeasonalityTool } from "@/components/MuskSeasonalityTool";

const copy = {
  en: {
    eyebrow: "Free data tool",
    title: "Elon Musk's tweet count: the weekly record",
    lead: "Every week Polymarket settles a market on how many times Elon Musk posts. We archive the official results so you can see the real distribution before you guess the next week.",
    updated: "Data updated",
    source: "Source: resolved Polymarket bracket markets. A new data point lands after each weekly settlement.",
    weeksTracked: "Weeks tracked",
    avgWeek: "Average week",
    last12: "Last 12 weeks",
    busiest: "Busiest week",
    quietest: "Quietest week",
    chartTitle: "Estimated posts per week",
    chartNote: "Each bar is the midpoint of the winning bracket for that week's market. Ranges, not exact counts.",
    liveTitle: "This week on Polymarket",
    liveNote: "Implied probabilities for the currently trading bracket market.",
    historyTitle: "Weekly history",
    week: "Week",
    range: "Winning bracket",
    estimate: "Est. posts",
    posts: "posts",
    orMore: "or more",
    orFewer: "or fewer",
    howTitle: "Where this data comes from",
    howText:
      "Polymarket runs a weekly bracket market on @elonmusk's post count. When the week settles, exactly one bracket resolves to YES—that bracket is the official count range. We collect those results over time. The dataset is free, public, and updated after each settlement.",
    disclaimer: "For research and education only. Not investment advice.",
    noLive: "No live bracket market is trading right now. Check back after the next weekly market opens.",
  },
  zh: {
    eyebrow: "免费数据工具",
    title: "Elon Musk 每周发帖数：历史记录",
    lead: "Polymarket 每周都有一个关于 Musk 发帖数量的结算市场。我们把官方结算结果存档，让你在猜下一周之前，先看看真实的分布长什么样。",
    updated: "数据更新于",
    source: "数据来源：Polymarket 已结算区间市场。每周结算后新增一个数据点。",
    weeksTracked: "已统计周数",
    avgWeek: "平均每周",
    last12: "近 12 周",
    busiest: "最忙的一周",
    quietest: "最闲的一周",
    chartTitle: "每周发帖数估计",
    chartNote: "每根柱子是当周市场获胜区间的中位数。是区间，不是精确计数。",
    liveTitle: "本周 Polymarket 行情",
    liveNote: "当前交易中的区间市场隐含概率。",
    historyTitle: "周度历史",
    week: "周",
    range: "获胜区间",
    estimate: "估计帖数",
    posts: "帖",
    orMore: "或更多",
    orFewer: "或更少",
    howTitle: "数据来自哪里",
    howText:
      "Polymarket 每周运行一个关于 @elonmusk 发帖数量的区间市场。结算时恰好有一个区间 resolves 为 YES——这个区间就是官方计数范围。我们持续收集这些结果。数据集免费、公开，并在每次结算后更新。",
    disclaimer: "仅供研究与教育用途，不构成投资建议。",
    noLive: "当前没有进行中的区间市场。等下一个周度市场开盘后再来看。",
  },
} as const;

function rangeLabel(w: { low: number; high: number | null }, t: { orMore: string; orFewer: string }) {
  if (w.high === null) return `${w.low}+ ${t.orMore}`;
  if (w.low === 0) return `<${w.high + 1} ${t.orFewer}`;
  return `${w.low}–${w.high}`;
}

export function MuskTweetsTool({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const data = getMuskTweets();
  const weeks = data.weeks;
  const locale = lang === "zh" ? "zh-CN" : "en-US";

  const avg = weeks.length ? Math.round(weeks.reduce((s, w) => s + w.midpoint, 0) / weeks.length) : null;
  const last12 = weeks.slice(-12);
  const avg12 = last12.length ? Math.round(last12.reduce((s, w) => s + w.midpoint, 0) / last12.length) : null;
  const busiest = weeks.length ? weeks.reduce((a, b) => (b.midpoint > a.midpoint ? b : a)) : null;
  const quietest = weeks.length ? weeks.reduce((a, b) => (b.midpoint < a.midpoint ? b : a)) : null;
  const maxMid = Math.max(1, ...weeks.map((w) => w.midpoint));
  const recent = [...weeks].reverse().slice(0, 20);

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
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: BarChart3, label: t.weeksTracked, value: weeks.length || "—" },
            { icon: MessageSquare, label: t.avgWeek, value: avg === null ? "—" : `~${avg} ${t.posts}` },
            { icon: TrendingUp, label: t.last12, value: avg12 === null ? "—" : `~${avg12} ${t.posts}` },
            {
              icon: BarChart3,
              label: t.busiest,
              value: busiest ? `~${busiest.midpoint} (${formatDate(busiest.weekStart, locale)})` : "—",
            },
          ].map((card) => (
            <div key={card.label} className="nx-card p-6">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <card.icon className="h-4 w-4 text-accent" />
                {card.label}
              </div>
              <p className="mt-3 font-serif text-xl font-semibold sm:text-2xl">{card.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="nx-section px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.chartTitle}</h2>
          <p className="mt-3 text-sm text-muted">{t.chartNote}</p>
          <div className="nx-card mt-6 p-6">
            <div className="flex h-48 items-end gap-[3px]" role="img" aria-label={t.chartTitle}>
              {weeks.map((w) => (
                <div
                  key={`${w.weekStart}_${w.weekEnd}`}
                  title={`${formatDate(w.weekStart, locale)} → ${formatDate(w.weekEnd, locale)} · ~${w.midpoint} ${t.posts} (${rangeLabel(w, t)})`}
                  className="flex-1 rounded-sm bg-accent/75 transition-colors hover:bg-accent"
                  style={{ height: `${Math.max(3, (w.midpoint / maxMid) * 100)}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <MuskSeasonalityTool weeks={weeks} lang={lang} />

      <section className="nx-section px-4 pt-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.liveTitle}</h2>
          <p className="mt-3 text-sm text-muted">{t.liveNote}</p>
          {data.live.length > 0 ? (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {data.live.slice(0, 2).map((event) => (
                <div key={event.slug} className="nx-card p-6">
                  <p className="font-serif text-lg font-semibold">{event.title}</p>
                  <div className="mt-4 space-y-2">
                    {event.brackets.slice(0, 8).map((b) => (
                      <div key={`${b.low}_${b.high}`} className="flex items-center gap-3 text-sm">
                        <span className="w-24 shrink-0 font-mono text-xs text-muted-foreground">
                          {rangeLabel(b, t)}
                        </span>
                        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-border/50">
                          <div className="h-full rounded-full bg-accent/80" style={{ width: `${Math.round(b.prob * 100)}%` }} />
                        </div>
                        <span className="w-12 shrink-0 text-right font-mono text-xs text-foreground">
                          {Math.round(b.prob * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="nx-card mt-6 border-dashed p-8">
              <p className="flex items-center gap-2 text-muted">
                <Info className="h-4 w-4 text-accent" />
                {t.noLive}
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="nx-section px-4 pt-0 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="nx-display text-3xl sm:text-4xl">{t.historyTitle}</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border-soft">
                  <th className="px-6 py-4 text-foreground">{t.week}</th>
                  <th className="px-6 py-4 text-foreground">{t.range}</th>
                  <th className="px-6 py-4 text-foreground">{t.estimate}</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {recent.map((w) => (
                  <tr key={`${w.weekStart}_${w.weekEnd}`} className="border-b border-border last:border-0">
                    <td className="px-6 py-3.5 font-medium text-foreground">
                      {formatDate(w.weekStart, locale)} → {formatDate(w.weekEnd, locale)}
                    </td>
                    <td className="px-6 py-3.5">{rangeLabel(w, t)}</td>
                    <td className="px-6 py-3.5">~{w.midpoint}</td>
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
              <Info className="h-5 w-5 text-accent" />
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
