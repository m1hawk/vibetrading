# VibeTrading 内容冲刺检查点 — 2026-07-16

> 本文件用于「暂停后继续」时快速恢复上下文。
> 目标域名：https://vibetrading.fun
> 项目路径：`/Users/yangzhen/Desktop/vibetrading`

---

## 一、当前已完成

### 内容资产
- **总文件数**：136 篇 MDX（68 EN + 68 ZH）
- **总主题数**：68 个
- **内容分布**：
  - GitHub 开源项目教程/对比：25 个主题
  - 策略对比与实战：15 个主题
  - Reddit 痛点/避坑/问答：13 个主题
  - YouTube 内容转化：5 个主题
  - 基础科普/概念：11 个主题

### 部署
- ✅ 代码已 push 到 `main`，自动部署到 GitHub Pages：`https://vibetrading.fun/`
- ✅ `npm run build` 通过，sitemap 包含 152 个 URL
- ✅ SEO 健康检查通过（仅 404/_not-found 为预期问题）

### GSC 提交状态
- ✅ `https://vibetrading.fun/sitemap.xml` 已重新提交
- ✅ 5 个 P0 支柱页已在 Google 显示 **"URL is on Google"**（已索引）：
  1. `https://vibetrading.fun/blog/ai-trading-for-beginners`
  2. `https://vibetrading.fun/blog/ai-trading-platform`
  3. `https://vibetrading.fun/blog/best-ai-trading-bots-2026`
  4. `https://vibetrading.fun/blog/does-ai-trading-really-work`
  5. `https://vibetrading.fun/blog/top-ai-trading-github-projects-2026`

> 记录位置：`gsc-index-tracking.csv`

---

## 二、核心参考文档

| 文件 | 用途 |
|---|---|
| `content-sprint-plan-v4.md` | 完整 14 天冲刺计划（v4：索引 + 流量导向） |
| `FINAL-HANDOFF.md` | 最终交接文档 v4 |
| `gsc-index-tracking.csv` | 68 个英文 URL 的提交/索引追踪表 |
| `gsc-submission-guide.md` | GSC 手动提交操作指南 |
| `social-sharing-templates.md` | Reddit/Twitter/GitHub/中文社区推广模板 |
| `keyword-coverage-mapping.md` | 82 个关键词覆盖映射表 |
| `research/github-ai-trading-projects.md` | GitHub 开源项目研究 |
| `research/reddit-ai-trading-needs.md` | Reddit 痛点研究 |
| `research/_AI Trading_ 关键词研究报告（v2 · DataForSEO 真实数据校准版）.md` | 第三方关键词数据 |

---

## 三、待继续执行的下一步

### 近期（Day 2-7）：GSC 手动提交
按 `gsc-index-tracking.csv` 优先级，分批提交剩余英文 URL：
- **P1**：16 个 URL（GitHub 项目 + 基础概念）
- **P2**：28 个 URL（策略教程 + Reddit 痛点）
- **P3**：19 个 URL（YouTube 转化 + 其他长尾）

**节奏**：每天 10-15 个，避免 GSC 限额。提交后在 `gsc-index-tracking.csv` 中记录 `date_submitted`。

### 中期（Day 8-10）
1. 加固 5 篇核心英文支柱页：
   - `best-ai-trading-bots-2026`
   - `ai-trading-for-beginners`
   - `top-ai-trading-github-projects-2026`
   - `ai-trading-platform`
   - `does-ai-trading-really-work`
2. 内链网络优化：确保每篇新内容链接到 3+ 相关页，支柱页互链。
3. 重新部署 + 再次提交 sitemap。
4. 使用 `social-sharing-templates.md` 在 Reddit/Twitter/GitHub/中文社区发布内容。

### 后期（Day 11-14）
1. GSC Coverage 排查：处理 "Crawled - currently not indexed"。
2. 对未索引的重要 URL 再次请求索引。
3. 第 14 天数据复盘：统计已索引数、点击量、曝光、平均排名。

---

## 四、方向约束（必须遵守）

- ✅ **允许**：开源 GitHub 项目对比、策略对比、Reddit 痛点转化、YouTube 策略转化、基础概念科普。
- ❌ **禁止**：付费 app/产品对比（如 TrendSpider、3Commas、Kavout、eToro 等商业工具深度评测）。
- ❌ **禁止**：保证收益、夸大效果的表述。
- ❌ **禁止**：直接搬运 YouTube 视频，只转化策略为可回测代码 + 风险分析。

---

## 五、快速恢复命令

```bash
# 1. 进入项目
cd /Users/yangzhen/Desktop/vibetrading

# 2. 检查当前状态
git status
git log --oneline -5

# 3. 查看待提交 URL 列表
cat gsc-index-tracking.csv

# 4. 继续 GSC 提交时参考
cat gsc-submission-guide.md
cat content-sprint-plan-v4.md
```

---

*检查点创建时间：2026-07-16*  
*对应 commit：08c23c7*
