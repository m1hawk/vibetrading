# VibeTrading 2周内容冲刺计划 v3

> 状态：基于当前内容资产重新校准，从「盲目追数量」转向「质量 + 索引」。  
> 目标域名：https://vibetrading.fun  
> 项目路径：`/Users/yangzhen/Desktop/vibetrading`  
> 当前基线：**115 篇 MDX 文件，覆盖 58 个主题**（57 个双语主题 + 1 个英文-only 主题）  
> 冲刺目标：2 周内确保 **≥100 篇高质量内容上线** 并系统推动 Google 索引。

---

## 一、为什么需要 v3？

v2 计划假设从 40 篇起步新增 100 篇。实际执行中已经远超 100 篇文件（115 篇），但：

1. **主题分布不均**：GitHub 开源项目、策略对比、Reddit 痛点已基本完成；YouTube 转化、基础概念仍有缺口。
2. **1 个主题缺少中文版**：`first-bot-should-be-simple-ema-cross.zh.mdx` 缺失。
3. **部分中文版本字数偏低**：英文平均 3100+ 字，中文平均 1069 字，需要补足以支撑中文 SEO 与用户体验。
4. **GSC 索引工作尚未开始**：目前已生成内容但未提交、未追踪。
5. **用户明确要求**：不写 app/产品对比，聚焦 GitHub 开源项目对比、策略对比、Reddit/YouTube 内容转化。

因此 v3 的核心是：**补齐缺口 → 质量审计 → 索引推动**，而非继续堆数量。

---

## 二、修正后的目标（Goal v3）

| # | 目标 | 指标 |
|---|---|---|
| 1 | 内容数量 | 14 天内保持 **≥100 篇可索引页面**（50 EN + 50 ZH），当前 115 篇已达标，但需补齐最后缺口。 |
| 2 | 内容覆盖 | 覆盖关键词库中 **≥60 个核心长尾词**（原目标 50，已生成主题已覆盖大量关键词，继续扩展 YouTube/基础概念词）。 |
| 3 | 内容质量 | 英文单篇平均字数 **≥800 字**（当前 3102，已达标）；教程/对比类英文 **≥1500 字**；中文单篇平均字数 **≥800 字**（当前 1069，已达标，但部分短文需补强）。 |
| 4 | 页面规范 | 100% 页面包含 `<Disclaimer />`、FAQ frontmatter、≥3 个站内内链、≥1 个代码块/表格/图片。 |
| 5 | Google 索引 | 至少 **40 篇英文新页面在 GSC 显示「已索引」**（80% 英文新页面）。 |
| 6 | 流量信号 | 第 14 天 GSC 英文页面日点击量 **≥5 次**，曝光 **≥2000 次**。 |
| 7 | 不做的事 | **不写 app/产品对比**（付费工具评测）；只做开源 GitHub 项目对比、策略对比、Reddit/YouTube 内容转化。 |

---

## 三、当前内容资产盘点

### 3.1 已完成的主题（58 个）

**GitHub 开源项目教程 / 对比（19 个主题）**
- `top-ai-trading-github-projects-2026`（榜单枢纽）
- `tradingagents-multi-agent-setup`
- `ai-hedge-fund-multi-agent-walkthrough`
- `tradingagents-vs-ai-hedge-fund`
- `openbb-python-quant-research-stack`
- `openbb-vs-bloomberg-terminal-retail`
- `openbb-alpaca-live-data-pipeline`
- `freqtrade-beginner-guide-crypto-bot`
- `freqtrade-ml-freqai-guide`
- `freqtrade-vs-hummingbot-crypto`
- `hummingbot-avellaneda-market-making`
- `backtrader-backtesting-basics`
- `backtrader-vs-vectorbt-python`
- `quantconnect-lean-first-algo`
- `quantconnect-vs-backtrader-vs-alpaca-vs-mql5`
- `lean-cli-python-factor-strategy`
- `nautilus-trader-beginner-guide`
- `jesse-ai-trading-framework-guide`
- `superalgos-crypto-automation-guide`
- `lumibot-stocks-options-backtest`
- `fingpt-news-sentiment-trading-signal`
- `finrl-reinforcement-learning-trading-bot`
- `finrl-vs-stable-baselines3-trading`
- `ai-trader-agent-copy-trading-guide`
- `claude-code-trading-agent-alpaca`

> 注：原 v2 队列规划 15 个 GitHub 主题，实际已扩展到 25 个，覆盖更完整。

**策略对比与实战（15 个主题）**
- `ai-trend-following-vs-mean-reversion`
- `ai-momentum-strategy-python`
- `ai-breakout-strategy-setup`
- `ai-pairs-trading-cointegration`
- `ai-long-short-equity-strategy`
- `ai-sector-rotation-strategy`
- `ai-earnings-volatility-strategy`
- `ai-news-event-trading`
- `ai-social-sentiment-strategy`
- `ai-multi-factor-ranking`
- `ai-risk-parity-portfolio`
- `ai-kelly-criterion-position-sizing`
- `ai-stop-loss-dynamic-atr`
- `ai-correlation-hedging`
- `ai-strategy-comparison-framework`

**Reddit 痛点 / 避坑 / 问答（10 个主题）**
- `overfitting-vs-robustness-trading`
- `backtest-vs-live-pnl-gap`
- `win-rate-vs-expectancy`
- `minimum-viable-python-stack-trading`
- `free-vs-paid-market-data`
- `retail-vs-institutional-ai-trading`
- `ai-trading-scams-red-flags`
- `ai-trading-scams-case-studies-2026`
- `first-bot-should-be-simple-ema-cross` ⚠️ 缺少中文版
- `paper-to-live-trading-checklist`
- `what-retail-ai-trading-can-and-cannot-do`

**基础科普 / 高流量入口（6 个主题）**
- `ai-trading-for-beginners`
- `ai-trading-platform`
- `does-ai-trading-really-work`
- `ai-day-trading-strategies`
- `best-ai-trading-bots-2026`
- `first-ai-trading-bot-ema-cross-alpaca`

### 3.2 仍缺的主题（10 个主题 = 20 篇 MDX）

**YouTube 内容转化（5 个主题）**
1. `youtube-ai-trading-playlist-curated`
2. `convert-youtube-strategy-to-backtest`
3. `best-ai-trading-youtube-channels-2026`
4. `paper-trade-youtube-strategy-alpaca`
5. `how-to-spot-fake-ai-trading-youtube`

**基础概念补充（5 个主题）**
6. `ai-trading-vs-algorithmic-trading`
7. `machine-learning-trading-overview`
8. `ai-trading-data-pipeline-explained`
9. `ai-trading-risk-management-framework`
10. `ai-trading-performance-metrics-guide`

**1 个缺失的中文版本**
11. `first-bot-should-be-simple-ema-cross.zh.mdx`

> 补齐后总主题数 = 68 个，总文件数 = 135 篇。保留最优质的 100 篇左右作为核心索引池，其余作为长尾支撑。

---

## 四、14 天执行日历（v3）

当前已经度过若干天，按「从今天起重新排 14 天」执行。

| 日期 | 英文任务 | 中文任务 | 重点工作 |
|---|---|---|---|
| Day 1 | — | `first-bot-should-be-simple-ema-cross.zh` | 补齐单语言缺口；全站内链/字数初检 |
| Day 2 | YouTube #1-2 | YouTube #1-2 ZH | `youtube-ai-trading-playlist-curated`、`convert-youtube-strategy-to-backtest` |
| Day 3 | YouTube #3-5 | YouTube #3-5 ZH | `best-ai-trading-youtube-channels-2026`、`paper-trade-youtube-strategy-alpaca`、`how-to-spot-fake-ai-trading-youtube` |
| Day 4 | 基础概念 #1-3 | 基础概念 #1-3 ZH | `ai-trading-vs-algorithmic-trading`、`machine-learning-trading-overview`、`ai-trading-data-pipeline-explained` |
| Day 5 | 基础概念 #4-5 | 基础概念 #4-5 ZH | `ai-trading-risk-management-framework`、`ai-trading-performance-metrics-guide` |
| Day 6 | — | — | 全站质量审计：字数、内链、FAQ、Disclaimer |
| Day 7 | 加固 5 篇核心英文页 | 加固 5 篇核心中文页 | 优先优化 `best-ai-trading-bots-2026`、`ai-trading-for-beginners`、`top-ai-trading-github-projects-2026`、`ai-trading-platform`、`does-ai-trading-really-work` |
| Day 8 | 内链网络优化 | 内链网络优化 | 每篇新内容必须链接到 3+ 已有相关页；支柱页互链 |
| Day 9 | `npm run build`、部署 | 部署验证 | 生成 sitemap，确保所有 URL 可达 |
| Day 10 | GSC 手动提交（Batch 1：20 个英文 URL） | — | 优先提交高流量/低 KD 关键词页 |
| Day 11 | GSC 手动提交（Batch 2：20 个英文 URL） | — | 提交 GitHub 项目与策略页 |
| Day 12 | GSC 手动提交（Batch 3：剩余英文 URL） | — | 提交 Reddit/YouTube/基础概念页 |
| Day 13 | 索引排查 + Coverage 修复 | — | 处理 Crawled not indexed、Soft 404 等 |
| Day 14 | 数据复盘 + 报告 | — | 统计已索引数、点击量、曝光、平均排名 |

> **日均执行原则**：每天先完成当日内容，再跑 `npm run build`，再记录到追踪表。

---

## 五、内容质量标准（每篇必检）

### Frontmatter 模板
```yaml
---
title: "Your Post Title"
description: "150-160 character meta description with target keyword."
date: "2026-07-16"
category: "Guides" # Guides | Tutorials | Strategies | Reviews | Tools
tags: ["ai trading", "open source", "github"]
readTime: "10 min read"
featured: false
lang: "en" # or "zh"
faq:
  - question: "Question 1?"
    answer: "Answer 1."
  - question: "Question 2?"
    answer: "Answer 2."
---
```

### 发布前检查清单
- [ ] 英文 ≥ 800 字；教程/对比类英文 ≥ 1500 字；中文 ≥ 800 字
- [ ] 标题、首段、至少 1 个 H2、Meta description 中包含主关键词
- [ ] 至少 3 个站内内链（指向 `/blog/[slug]`）
- [ ] 至少 1 个代码块 / 对比表格 / 图片
- [ ] 包含 `<Disclaimer />`
- [ ] 包含 FAQ frontmatter（自动生成 FAQPage Schema）
- [ ] 中文版本本地化：案例、术语、监管提示
- [ ] 文末「相关阅读」推荐 2-3 篇

### 不做清单
- [ ] **不写付费 app/产品对比**（如 TrendSpider、3Commas、Kavout 等商业工具深度评测）
- [ ] 不写保证收益、夸大效果的表述
- [ ] 不堆砌无意义关键词

---

## 六、内容来源与转化策略

### GitHub 转化（已饱和，不再新增）
- 当前已覆盖 25 个 GitHub 相关主题，足以支撑「开源 AI Trading」权威定位。
- 后续只做 **star 数/功能更新** 的月度刷新，不再新开主题。

### Reddit 转化（已饱和，不再新增）
- 已覆盖过拟合、回测偏差、胜率 vs 期望值、Python 栈、数据成本、散户 vs 机构、骗局、模拟转实盘等核心痛点。
- 后续根据 r/algotrading 热帖做补充更新。

### YouTube 转化（5 EN + 5 ZH，本次补齐）
- 不直接搬运视频，而是把高播放视频中的策略转化为 **可回测代码 + 风险提示**。
- 每篇标注参考的视频来源（不嵌入视频，仅文字引用以降低版权风险）。
- 目标关键词：`ai trading youtube`、`convert youtube strategy to backtest`、`fake ai trading youtube`。

### 基础概念（5 EN + 5 ZH，本次补齐）
- 针对高搜索量、低 KD 的入门词：`ai trading vs algorithmic trading`、`machine learning trading overview`、`ai trading data pipeline`、`ai trading risk management`、`ai trading performance metrics`。
- 与已有教程形成漏斗：概念 → 教程 → GitHub 项目 → 策略实战。

---

## 七、GSC 索引推动计划

### 7.1 提交策略
1. **sitemap 自动提交**：确保 `public/sitemap.xml` 包含所有新 URL，并在 GSC 中重新提交。
2. **手动 URL Inspection**：每天分批提交英文新页面 URL，GSC 每日手动提交限额约 10-20 次，14 天内可覆盖全部。
3. **优先队列**：先提交支柱页（高流量、低 KD、内链多），再提交长尾页。

### 7.2 优先提交的英文 URL（40 个）
| 优先级 | URL | 原因 |
|---|---|---|
| P0 | `/blog/ai-trading-for-beginners` | 高流量入门词 |
| P0 | `/blog/ai-trading-platform` | 高流量、低 KD |
| P0 | `/blog/best-ai-trading-bots-2026` | 商业意图高 |
| P0 | `/blog/does-ai-trading-really-work` | 信任型高转化词 |
| P0 | `/blog/top-ai-trading-github-projects-2026` | 枢纽页 |
| P1 | `/blog/ai-day-trading-strategies` | 高搜索量 |
| P1 | `/blog/ai-trading-vs-algorithmic-trading` | 新增基础概念 |
| P1 | `/blog/machine-learning-trading-overview` | 增长最快的集群 |
| P1 | GitHub 项目教程 × 10 | 长尾精准流量 |
| P2 | 策略教程 × 15 | 覆盖策略关键词 |
| P2 | Reddit 痛点 × 10 | 信任型内容 |
| P2 | YouTube 转化 × 5 | 新增长尾 |

### 7.3 索引加速动作
- **内链补强**：从新页面链接到已索引的支柱页。
- **支柱页互链**：`top-ai-trading-github-projects-2026`、`best-ai-trading-bots-2026`、`ai-trading-for-beginners` 必须链接到所有相关子页面。
- **社交/外链信号**：在 Reddit r/algotrading、GitHub Discussions、Twitter/X 分享新内容。
- **新鲜度维护**：GSC 中观察到索引后，每月更新核心页 dateModified。

---

## 八、关键监测指标

| 指标 | Day 7 目标 | Day 14 目标 |
|---|---|---|
| 总发布文件数 | 120+ | 135 |
| 英文主题数 | 60+ | 68 |
| 中文主题数 | 60+ | 68 |
| GSC 已索引英文页 | 15+ | 40+ |
| 英文日点击量 | 1+ | 5+ |
| 英文日曝光 | 300+ | 2000+ |
| 平均排名 | 45+ | 30+ |
| 覆盖关键词数 | 40+ | 60+ |

---

## 九、风险控制

| 风险 | 应对 |
|---|---|
| 内容质量下降 | 每篇发布前跑质量检查脚本；低于 800 字或缺少 FAQ/Disclaimer 禁止发布。 |
| Google 不索引 | 每日手动提交 + 内链补强 + Day 13 集中排查 Coverage。 |
| 中文监管风险 | 所有中文内容加入「不构成投资建议」声明，不涉及具体个股推荐。 |
| 开源项目信息过时 | 每月更新 star 数和功能描述；用 GitHub API 自动校准。 |
| 用户再次调整方向 | 本计划 v3 已明确不做 app/产品对比，聚焦开源/策略/Reddit/YouTube。 |

---

## 十、下一步行动

1. **立即执行**：补齐 `first-bot-should-be-simple-ema-cross.zh.mdx`。
2. **Day 2-5**：按日历补齐 YouTube 转化（5 EN + 5 ZH）和基础概念（5 EN + 5 ZH）。
3. **Day 6-8**：全站质量审计 + 内链网络优化。
4. **Day 9**：`npm run build` + 部署 + sitemap 验证。
5. **Day 10-12**：分批手动提交英文 URL 到 GSC。
6. **Day 13-14**：索引排查 + 数据复盘。

---

*计划版本：v3*  
*最后更新：2026-07-16*  
*负责人：Kimi Code CLI + VibeTrading 内容团队*  
