# VibeTrading 内容推广模板包

> 用途：在 Reddit、Twitter/X、GitHub Discussions、中文社区分享新内容，获取外链信号和早期流量，辅助 Google 索引。  
> 原则：先提供价值，再带链接；不要spam；每个社区每周只发1-2次。

---

## 一、Reddit r/algotrading 发帖模板

### 模板 1：开源项目对比

**Title**: I compared the most popular open-source AI trading projects on GitHub — here is what actually works for retail traders

**Body**:

```text
I've been digging into open-source AI trading frameworks for a retail setup. Most "top 10" lists just copy star counts, so I wrote a hands-on comparison covering install pain, paper trading support, asset classes, and where each one breaks.

Covered: TradingAgents, ai-hedge-fund, freqtrade, OpenBB, Backtrader, QuantConnect Lean, FinRL, FinGPT, Hummingbot, Nautilus Trader, Jesse, Superalgos, Lumibot.

If you're starting out, my suggestion is to pick ONE tool, run it on paper trading for 30 days, and only then think about live capital.

Full write-up: https://vibetrading.fun/blog/top-ai-trading-github-projects-2026

Happy to answer questions about any of them.
```

### 模板 2：回测 vs 实盘差距

**Title**: Backtests that look amazing often die in live trading — here is my checklist before going live

**Body**:

```text
I've seen too many strategies with 50%+ annual backtest returns turn flat or negative in live trading. The usual killers are slippage, repainting indicators, partial fills, fees, and unrealistic paper fills.

I put together a checklist I now run before deploying anything with real money:
- Add slippage and commission assumptions
- Avoid repainting indicators
- Simulate partial fills
- Compare paper vs live P&L for the first 30 days
- Run walk-forward validation

Details + examples: https://vibetrading.fun/blog/backtest-vs-live-pnl-gap

What would you add to the list?
```

### 模板 3：EMA 交叉第一个机器人

**Title**: Your first algo bot should be boring — here is why I recommend a simple EMA cross

**Body**:

```text
I know it is tempting to build a multi-agent LLM bot with sentiment analysis on day one. But after watching a few friends blow up accounts, I think the best first bot is a simple EMA crossover.

Why? It forces you to learn data, execution, logging, and risk management before complexity hides your mistakes.

Wrote a step-by-step guide with Python code and Alpaca paper trading setup: https://vibetrading.fun/blog/first-bot-should-be-simple-ema-cross

Would love feedback from anyone who actually went from backtest to live with a simple strategy.
```

### 模板 4：散户 vs 机构 AI 交易

**Title**: A reality check: what retail AI trading can and cannot do

**Body**:

```text
There is a lot of "AI trading will replace quants" hype. Having worked on both tiny Python bots and institutional-grade systems, the gap is huge: data quality, latency, compliance, talent, and infrastructure spend.

That does not mean retail is hopeless. It means you should play a different game: longer timeframes, simpler edges, strict risk rules.

I wrote a detailed breakdown: https://vibetrading.fun/blog/retail-vs-institutional-ai-trading

Curious what others think — where do retail traders actually have an edge?
```

### 模板 5：识别 AI 交易骗局

**Title**: AI trading scams are everywhere in 2026 — here are 7 red flags

**Body**:

```text
"Guaranteed 1% daily returns", anonymous teams, fake celebrity endorsements, $250 minimum deposits, blocked withdrawals... the playbook is always the same.

I compiled the most common red flags and how to verify a tool before trusting it with capital: https://vibetrading.fun/blog/ai-trading-scams-red-flags

If you have ever encountered a sketchy AI trading service, share the warning signs so others can avoid it.
```

---

## 二、Twitter/X 推文模板

### 推文 1：开源项目榜单

```text
Most "top AI trading GitHub repos" lists just sort by stars.

I wrote a hands-on comparison of 13+ open-source frameworks for retail traders, covering install pain, paper trading, and where each breaks.

→ https://vibetrading.fun/blog/top-ai-trading-github-projects-2026

#AITrading #AlgoTrading #OpenSource
```

### 推文 2：回测 vs 实盘

```text
A 50% annual backtest can easily become -18% live.

The gap usually comes from slippage, fees, repainting indicators, and unrealistic fills.

Here is my pre-live checklist:
→ https://vibetrading.fun/blog/backtest-vs-live-pnl-gap

#Trading #Backtesting #AlgoTrading
```

### 推文 3：EMA 交叉新手机器人

```text
Your first trading bot does not need neural networks.

Start with a simple EMA crossover. It teaches data, execution, logging, and risk — without hiding mistakes behind complexity.

Step-by-step guide with Python code:
→ https://vibetrading.fun/blog/first-bot-should-be-simple-ema-cross

#Python #AlgoTrading #Beginners
```

### 推文 4：YouTube 策略转回测

```text
Saw a great AI trading strategy on YouTube?

Before risking capital, convert it into a backtest first. Here is the workflow I use to avoid repainting, lookahead bias, and overfitting.

→ https://vibetrading.fun/blog/convert-youtube-strategy-to-backtest

#AITrading #YouTube #Backtesting
```

### 推文 5：风险管理框架

```text
The best AI model in the world won't save a bad risk framework.

Position sizing, max drawdown, kill switches, and correlation risk matter more than signal accuracy.

Wrote a practical framework:
→ https://vibetrading.fun/blog/ai-trading-risk-management-framework

#RiskManagement #Trading #AI
```

### 推文 6：性能指标指南

```text
Win rate is a vanity metric.

Expectancy, Sharpe, Sortino, max drawdown, and profit factor tell the real story.

Quick guide to trading performance metrics:
→ https://vibetrading.fun/blog/ai-trading-performance-metrics-guide

#TradingMetrics #Quant
```

### 推文 7：识别假 AI 交易 YouTube

```text
Rented Lambos, guaranteed returns, hidden broker affiliations.

AI trading YouTube is full of red flags. Here is how to spot the fake gurus before you lose money.

→ https://vibetrading.fun/blog/how-to-spot-fake-ai-trading-youtube

#AITrading #ScamAlert
```

---

## 三、GitHub Discussions / Issue 评论模板

### 在 TradingAgents / ai-hedge-fund / freqtrade 等仓库讨论区

```text
I wrote a beginner-friendly walkthrough of [ProjectName] that covers installation, first run, paper trading setup, and common pitfalls. It also compares it against a few similar frameworks.

If you are trying to evaluate which open-source AI trading tool fits your use case, it might save you some time:
https://vibetrading.fun/blog/[project-slug]

Feedback from maintainers and contributors is welcome — happy to correct anything that is out of date.
```

> 替换 `[ProjectName]` 和 `[project-slug]` 为实际项目名称和对应 URL slug，例如：
> - `freqtrade-beginner-guide-crypto-bot`
> - `ai-hedge-fund-multi-agent-walkthrough`
> - `tradingagents-multi-agent-setup`
> - `openbb-python-quant-research-stack`

---

## 四、中文社区分享模板

### 模板 1：知乎/掘金/思否 — 开源项目对比

```text
最近研究了 GitHub 上最火的十几个 AI 交易开源项目，包括 TradingAgents、ai-hedge-fund、freqtrade、OpenBB、Backtrader、QuantConnect Lean、FinRL 等。

很多榜单只看 star 数，不太实用。我按「安装难度、是否支持模拟盘、支持市场、学习曲线、坑点」做了对比，适合散户入门参考。

完整对比： https://vibetrading.fun/blog/top-ai-trading-github-projects-2026

欢迎指正和补充，尤其是实际跑通过的朋友。
```

### 模板 2：雪球/集思录 — 回测与实盘差距

```text
回测很漂亮的策略，实盘常常打脸。

常见原因：滑点、手续费、未来函数、部分成交、数据质量。我把自己的检查清单整理了一下，分享出来。

文章： https://vibetrading.fun/blog/backtest-vs-live-pnl-gap

对于 A 股/港美股都适用，欢迎大家补充实盘踩过的坑。
```

### 模板 3：V2EX/稀土掘金 — Python 技术栈

```text
入门 AI 交易/算法交易，Python 生态很庞大，新手容易迷失。

我整理了一个最小可用技术栈：pandas、yfinance/Alpaca、TA-Lib、pandas-ta、backtrader/vectorbt、scikit-learn/LightGBM。

文章里还写了从 Jupyter 原型到生产部署的演进路径： https://vibetrading.fun/blog/minimum-viable-python-stack-trading

适合刚入门的同学少走弯路。
```

### 模板 4：即刻/推特中文 — Kelly 仓位管理

```text
仓位管理比选股更重要。

Kelly 公式是著名的下注比例公式，但完整 Kelly 太激进，散户更适合分数 Kelly。文章里还有用蒙特卡洛模拟评估不同分数 Kelly 的方法。

https://vibetrading.fun/blog/ai-kelly-criterion-position-sizing
```

### 模板 5：币乎/链节点 — 加密货币机器人

```text
freqtrade 是目前 GitHub 上最接近"散户可投产"的加密货币算法交易机器人，支持 Binance、Bybit、Kraken、Hyperliquid 等。

我写了一篇从 config.json 到 dry-run 的完整新手指南： https://vibetrading.fun/blog/freqtrade-beginner-guide-crypto-bot

建议先用 dry-run（模拟交易）跑至少 30 天再上实盘。
```

---

## 五、使用建议

1. **不要一次性全发**：每个平台每周发 1-2 条即可，避免被判定为 spam。
2. **根据社区调性调整**：Reddit 偏 skeptical，先发价值再带链接；Twitter 可以短平快；中文社区更喜欢详细心得。
3. **互动优先**：回复评论、回答问题，建立可信度后再持续分享。
4. **追踪效果**：在 Google Analytics 或 GSC 中观察哪些来源带来点击，优化后续分享重点。
5. **避免收益承诺**：所有分享都应强调学习、风险和模拟交易，不做盈利保证。

---

*版本：v1*  
*更新日期：2026-07-16*
