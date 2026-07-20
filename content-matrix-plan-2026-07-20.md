# 内容矩阵规划 — 2026-07-20

> 状态：待执行
> 项目路径：`/Users/yangzhen/Desktop/vibetrading`
> 输入：用户提出的四维矩阵（市场 / 品种 / 策略 / 数据源）
> 约束：v4 内容红线（不做付费 app 对比评测）、教育优先模拟盘优先、双语同步

---

## 一、对矩阵的评价（先说结论）

这个四维矩阵是**很好的覆盖面检查表，但不是好的选题生成器**。
如果按格子均匀填，会产出大量低搜索量、与站点权威不匹配的内容。
正确用法：**矩阵 × 搜索需求 × 现有权威 × 工具协同，取交集排优先级。**

## 二、现有 68 篇在矩阵中的位置

| 维度 | 覆盖 | 判断 |
|---|---|---|
| 美股 | 5 篇（财报波动、多空、板块轮动、多因子等） | 有底子，非短板，也非差异化 |
| 加密 | 6 篇（freqtrade×2、hummingbot、jesse、superalgos 等） | 开源工具向较强，继续加深 |
| **预测市场** | **0 篇文章（但有 2 个数据工具在线）** | **最大空档，且我们已有资产** |
| 现货 | 几乎全部文章 | 已饱和 |
| 期权 | 1 篇（lumibot 回测） | 只做基础数据教育，不推策略 |
| 期货 | 0 | 只做 1-2 篇基础概念（展期/连续合约），服务量化方法 |
| 价值投资 | 0 | 与 AI 定位弱相关，只做"AI 辅助基本面筛选"1-2 篇 |
| **套利** | **0 篇标题（配对交易/相关性对冲相邻）** | **高空档 × 高契合** |
| 量化 | 全部 | 主场 |
| 数据源-免费 | 5 篇 | 强项，继续做成系列 |
| 数据源-付费 | 0 | **红线相邻：只做 1 篇"什么时候值得付费"的判断框架，不做产品对比** |
| 数据源-企业级 | 0 | **放弃**。受众错位 + 红线冲突 |

## 三、优先级与节奏

节奏：每周 3 篇 × 双语（6 个文件），8 周共 24 篇/语言。
每周四更新 `content-sprint-queue.md` 进度。

### Wave 1（W1-W3，9 篇）：预测市场集群 🔥 最高优先级

理由：0 文章 + 2 个自有数据工具 + 关键词竞争低 + 2026 搜索量高增长 +
工具提供的**原创数据**（62 周 Musk 结算、364 天 BTC 涨跌）让这些文章无法被复制。

| # | EN 标题（slug 方向） | 切入角度 |
|---|---|---|
| 1 | Polymarket vs Kalshi Fees: The Real Cost Per Trade | 费率公式拆解 + 免费计算器（接未来三合一工具） |
| 2 | Polymarket-Kalshi Arbitrage: The Math Nobody Shows You | 套利公式 + 为什么 2.7 秒窗口散户吃不到 |
| 3 | We Archived 62 Weeks of Elon Musk's Tweet Counts | **原创数据文**：分布、月度规律、区间命中率 |
| 4 | Bitcoin Up or Down: What 365 Days of Data Says | **原创数据文**：连跌概率、押注回测 |
| 5 | How Prediction Market Resolution Actually Works | 结算机制、UMA、争议案例（Musk 市场 xtracker 之死） |
| 6 | Prediction Market Order Books for Beginners | CLOB、点差、流动性，用真实市场截图 |
| 7 | Backtesting a Prediction Market Strategy | 方法论：结算数据回测的坑（存活者偏差、区间粒度） |
| 8 | Polymarket API Tutorial: Pull Any Market's Data | 教程：Gamma API + 我们的抓取脚本 |
| 9 | Are Prediction Markets Accurate? Calibration Data | 校准概念 + 如何自己算 |

### Wave 2（W4-W5，6 篇）：套利集群

| # | 标题方向 | 切入角度 |
|---|---|---|
| 10 | Arbitrage Trading for Retail: What's Actually Left in 2026 | 诚实盘点：哪些套利散户还能做，哪些已死 |
| 11 | Funding Rate Arbitrage: Spot-Perp Basics with Freqtrade | 加密资金费率套利（轻触期货，教育向） |
| 12 | Triangular Arbitrage: Why Your Bot Loses to the Pros | 三角套利数学 + 延迟的现实 |
| 13 | Cross-Exchange Price Gaps: Reading the Data Honestly | 价差数据怎么读（接免费数据源） |
| 14 | Pairs Trading Revisited: Cointegration vs Correlation | 已有配对文的深化：检验方法对比 |
| 15 | The Arbitrageur's Checklist: Costs That Kill the Spread | 费用、滑点、转账时间、提币限额 |

### Wave 3（W6-W7，6 篇）：免费数据源系列（强化既有优势）

| # | 标题方向 |
|---|---|
| 16 | Every Free BTC/Crypto Data API Worth Using in 2026 |
| 17 | yfinance Gotchas: Bad Data That Ruins Backtests |
| 18 | SEC EDGAR API: Pull Any Filing for Free |
| 19 | CoinGecko API Limits and How to Cache Correctly |
| 20 | When Is Paid Market Data Actually Worth It?（判断框架，非产品对比） |
| 21 | Building a Daily Data Pipeline with GitHub Actions（我们的 cron 实战） |

### Wave 4（W8，3 篇）：品种基础 + 价值投资补位

| # | 标题方向 |
|---|---|
| 22 | Options Data for Backtests: Why Free Sources Fail You |
| 23 | Futures Continuous Contracts: Roll Rules That Distort Backtests |
| 24 | AI-Assisted Value Screening: Read 100 Filings in an Hour |

### 明确不做

- 付费数据 100 刀+/企业级评测（红线 + 受众错位）
- 期权/期货策略推荐（YMYL 风险 + 与模拟盘优先冲突）
- 纯价值投资方法论（与 AI 定位无关）

## 四、执行规范

1. **分类**：全部归入现有 4 类（集群主要落 Strategies/Tutorials/Guides）
2. **标签规范化**：新增并持续使用 `prediction market`、`arbitrage`、`us stocks`、`crypto`、`options`、`futures`，支撑 /blog 标签过滤的发现能力
3. **内链**：每篇集群文章链接对应数据工具；工具页"相关阅读"区反向链接
4. **OG 图**：新文章发布后跑 `npm run og`（脚本自动覆盖新 slug）
5. **GSC**：每篇发布后次日手动请求索引（每天 ≤10 个，优先集群文）
6. **数据来源**：Wave 1 #3/#4 必须用 `data/*.json` 的真实数字，写作前先跑 `node scripts/fetch-data-snapshots.mjs --full` 取最新

## 五、验收（8 周后）

- [ ] 24 篇新文（双语 48 文件），预测市场成为站内第二大主题集群
- [ ] 数据工具页外链/引用 ≥ 5 个自然引用（Reddit/Quora 回答引用）
- [ ] sitemap 收录率（GSC Pages 已发现）> 60%
- [ ] "polymarket" 相关关键词进入 GSC 查询前 20

---

*计划版本：v1*
*创建日期：2026-07-20*
*关联文档：`content-sprint-plan-v4.md`、`discovery-optimization-plan-2026-07-20.md`*
