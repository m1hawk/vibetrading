# VibeTrading GSC 提交与索引追踪操作指南

> 目标：2 周内让至少 40 篇英文新页面在 Google Search Console（GSC）显示「已索引」。  
> 当前资产：68 个英文主题 + 68 个中文主题 = 136 篇 blog 页面，sitemap 已包含 152 个 URL。

---

## 一、GSC 提交前准备

1. 确认你已登录拥有 `vibetrading.fun` 权限的 Google Search Console 账号。
2. 确认 `public/sitemap.xml` 已更新并包含所有新 URL（当前 152 个 URL）。
3. 部署最新构建到 `vibetrading.fun`（将 `out/` 目录上传到对应主机）。
4. 打开 `gsc-index-tracking.csv`，准备记录每日提交与索引状态。

---

## 二、提交 Sitemap（一次性）

1. 进入 GSC → 选择 `vibetrading.fun` 资源。
2. 左侧菜单点击 **Sitemaps**。
3. 在「Add a new sitemap」输入框中填入：`sitemap.xml`。
4. 点击 **Submit**。
5. 等待状态变为 **Success**（通常几分钟到几小时）。

> 如果已提交过，点击 sitemap 旁边的刷新图标重新抓取。

---

## 三、手动 URL Inspection 提交（分批）

GSC 的「请求索引」功能有每日限额，建议分批提交。已按优先级分组：

| 批次 | 优先级 | URL 数量 | 建议提交日 |
|---|---|---|---|
| Batch 1 | P0 | 5 | Day 10 |
| Batch 2 | P1 | 16 | Day 11 |
| Batch 3 | P2 | 28 | Day 12 |
| Batch 4 | P3 | 19 | Day 13 |

### 单条 URL 提交步骤

1. 打开 GSC 顶部搜索框，粘贴完整 URL，例如：
   `https://vibetrading.fun/blog/ai-trading-for-beginners`
2. 按回车，等待 GSC 抓取页面。
3. 如果页面可被抓取，点击 **Request indexing**。
4. 在 `gsc-index-tracking.csv` 中记录提交日期。
5. 每天复查这些 URL 的索引状态。

> 如果显示「URL is not on Google」，可立即请求索引。  
> 如果显示「URL is on Google, but has issues」，先修复问题再请求。

---

## 四、优先级队列说明

### P0 — 支柱页（5 个）
这些页面搜索量高、内链多、转化意图强，优先提交：

- `https://vibetrading.fun/blog/ai-trading-for-beginners`
- `https://vibetrading.fun/blog/ai-trading-platform`
- `https://vibetrading.fun/blog/best-ai-trading-bots-2026`
- `https://vibetrading.fun/blog/does-ai-trading-really-work`
- `https://vibetrading.fun/blog/top-ai-trading-github-projects-2026`

### P1 — GitHub 项目教程 + 基础概念（16 个）
长尾精准流量，支撑 P0 支柱页：

- `freqtrade-beginner-guide-crypto-bot`
- `backtrader-backtesting-basics`
- `quantconnect-lean-first-algo`
- `openbb-python-quant-research-stack`
- `ai-hedge-fund-multi-agent-walkthrough`
- `tradingagents-multi-agent-setup`
- `fingpt-news-sentiment-trading-signal`
- `finrl-reinforcement-learning-trading-bot`
- `claude-code-trading-agent-alpaca`
- `ai-trader-agent-copy-trading-guide`
- `ai-trading-vs-algorithmic-trading`
- `machine-learning-trading-overview`
- `ai-trading-data-pipeline-explained`
- `ai-trading-risk-management-framework`
- `ai-trading-performance-metrics-guide`
- `ai-day-trading-strategies`

### P2 — 策略教程 + Reddit 痛点（28 个）
覆盖策略词与信任型查询：

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
- `overfitting-vs-robustness-trading`
- `backtest-vs-live-pnl-gap`
- `win-rate-vs-expectancy`
- `minimum-viable-python-stack-trading`
- `free-vs-paid-market-data`
- `retail-vs-institutional-ai-trading`
- `ai-trading-scams-red-flags`
- `ai-trading-scams-case-studies-2026`
- `first-bot-should-be-simple-ema-cross`
- `paper-to-live-trading-checklist`
- `what-retail-ai-trading-can-and-cannot-do`
- `how-to-backtest-without-overfitting`
- `first-ai-trading-bot-ema-cross-alpaca`

### P3 — YouTube 转化 + 其他长尾（19 个）
剩余新增长尾和对比页：

- `youtube-ai-trading-playlist-curated`
- `convert-youtube-strategy-to-backtest`
- `best-ai-trading-youtube-channels-2026`
- `paper-trade-youtube-strategy-alpaca`
- `how-to-spot-fake-ai-trading-youtube`
- `freqtrade-vs-hummingbot-crypto`
- `backtrader-vs-vectorbt-python`
- `quantconnect-vs-backtrader-vs-alpaca-vs-mql5`
- `finrl-vs-stable-baselines3-trading`
- `tradingagents-vs-ai-hedge-fund`
- `openbb-vs-bloomberg-terminal-retail`
- `openbb-alpaca-live-data-pipeline`
- `freqtrade-ml-freqai-guide`
- `hummingbot-avellaneda-market-making`
- `nautilus-trader-beginner-guide`
- `jesse-ai-trading-framework-guide`
- `superalgos-crypto-automation-guide`
- `lumibot-stocks-options-backtest`
- `lean-cli-python-factor-strategy`

完整列表见 `gsc-index-tracking.csv`。

---

## 五、索引状态解读

| GSC 状态 | 含义 | 行动 |
|---|---|---|
| **Submitted and indexed** | 已收录，理想状态 | 记录，继续优化排名 |
| **Indexed, not submitted in sitemap** | Google 自己发现并收录 | 可补提交，确保 sitemap 覆盖 |
| **Crawled - currently not indexed** | Google 已抓取但暂不收录 | 检查内容质量、内链、重复度；等待或小幅更新后重新提交 |
| **Discovered - currently not indexed** | 已发现但未抓取 | 增加内链指向该页，等待 Google 抓取 |
| **Duplicate, submitted URL not selected as canonical** | 重复内容，Google 选择了其他版本 | 检查 hreflang、canonical 标签 |
| **Soft 404** | 页面返回 200 但看起来像 404 | 检查内容是否为空或模板错误 |
| **Page with redirect** | 页面被重定向 | 确认重定向是否是预期的 |

---

## 六、每日检查节奏

### Day 10-12（提交期）
- 每天提交一个批次的英文 URL。
- 记录 `date_submitted` 到 `gsc-index-tracking.csv`。

### Day 13（排查期）
- 进入 GSC → **Coverage** → **Excluded**。
- 导出所有被排除的 URL，检查是否有本批次页面。
- 对 **Crawled - currently not indexed** 的页面，做小幅更新（改一句话、加一段 FAQ、调整内链），然后重新提交。

### Day 14（复盘期）
- 统计：已索引英文页面数、日点击量、曝光、平均排名。
- 填写 `gsc-index-tracking.csv` 的 `status_day_14`、`clicks_day_14`、`impressions_day_14`、`avg_position_day_14`。
- 判断是否达到 40 篇英文索引的目标。

---

## 七、加速索引的辅助动作

1. **内链补强**：确保每个 P0/P1 页面链接到 5+ 相关子页面。
2. **社交分享**：在 Reddit r/algotrading、GitHub Discussions、Twitter/X 分享新内容，获取外部信号。
3. **内容更新**：对已提交但未索引的页面，每隔 2-3 天做小幅更新并重新提交。
4. **避免重复**：确保英文和中文页面有正确的 hreflang/lang 区分，不要让 Google 误判为重复内容。

---

## 八、目标核对

| 指标 | Day 14 目标 | 当前状态 |
|---|---|---|
| 英文 blog 页面数 | 50+ | ✅ 68 |
| 中文 blog 页面数 | 50+ | ✅ 68 |
| 所有页面含 Disclaimer | 100% | ✅ 136/136 |
| 所有页面含 FAQ | 100% | ✅ 136/136 |
| 所有页面内链 ≥ 3 | 100% | ✅ 136/136 |
| 英文平均字数 ≥ 800 | ✅ | ✅ 1318 |
| GSC 英文索引数 ≥ 40 | 目标 | 待提交 |
| 英文日点击量 ≥ 5 | 目标 | 待验证 |

---

## 九、下一步行动

1. 部署最新 `out/` 到 `vibetrading.fun`。
2. 在 GSC 提交 `sitemap.xml`。
3. 按 Batch 1 → Batch 4 顺序手动提交英文 URL。
4. 每日更新 `gsc-index-tracking.csv`。
5. Day 14 进行数据复盘。

---

*文档版本：v1*  
*更新日期：2026-07-16*
