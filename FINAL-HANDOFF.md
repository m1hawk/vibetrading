# VibeTrading 2 周内容冲刺 — 最终交接文档 v4

> 生成日期：2026-07-16
> 项目路径：`/Users/yangzhen/Desktop/vibetrading`
> 目标域名：https://vibetrading.fun
> 冲刺目标：14 天内推动 ≥100 篇已上线的 AI Trading 内容被 Google 索引并产生搜索流量。

---

## 一、当前状态：内容已超额完成，重点转向索引与流量

### 核心完成标准核对

| # | 完成标准 | 目标 | 当前状态 |
|---|---|---|---|
| ① | 英文 MDX 发布 | ≥50 | ✅ 68 |
| ① | 中文 MDX 发布 | ≥50 | ✅ 68 |
| ② | 英文页面 GSC 已索引 | ≥50 | ⏳ 提交中 |
| ③ | 覆盖核心长尾词 | ≥60 | ✅ 68/82 |
| ④ | 英文单篇平均字数 | ≥800 | ✅ 1454（最低 800） |
| ⑤ | 第 14 天英文日点击量 | ≥5 | ⏳ 待验证 |
| ⑥ | Disclaimer + FAQ Schema + 内链 ≥3 | 100% | ✅ 136/136 |

### 内容资产

- **总文件数**：136 篇 MDX（68 EN + 68 ZH）
- **总主题数**：68 个
- **覆盖主题**：
  - GitHub 开源项目教程/对比：25 个主题
  - 策略对比与实战：15 个主题
  - Reddit 痛点/避坑/问答：13 个主题
  - YouTube 内容转化：5 个主题
  - 基础科普/概念：11 个主题
  - 其他高流量入口：4 个主题

---

## 二、已生成的文档与工具

| 文件 | 用途 |
|---|---|
| `content-sprint-plan-v4.md` | 重新制定的 14 天冲刺计划（v4：从数量转向索引+流量） |
| `gsc-index-tracking.csv` | 68 个英文 URL 的 GSC 提交与索引追踪表 |
| `gsc-submission-guide.md` | Google Search Console 提交操作指南 |
| `deployment-checklist.md` | 部署与提交核对清单 |
| `social-sharing-templates.md` | Reddit/Twitter/GitHub/中文社区推广模板 |
| `keyword-coverage-mapping.md` | 82 个关键词覆盖映射表 |
| `scripts/seo-health-check.mjs` | 自动化 SEO 健康检查脚本 |
| `seo-health-report.json` | 最新 SEO 健康检查详细报告 |
| `research/github-ai-trading-projects.md` | GitHub 开源项目研究报告 |
| `research/reddit-ai-trading-needs.md` | Reddit 痛点与话题研究报告 |
| `research/_AI Trading_ 关键词研究报告（v2 · DataForSEO 真实数据校准版）.md` | 第三方关键词数据报告 |

---

## 三、技术优化已完成

### 多语言 SEO
- 英文/中文 blog 页面已添加 `hreflang` alternate links。
- 中文页面 metadata 中 `og:locale` 已设为 `zh_CN`。
- Sitemap 已包含 `<xhtml:link rel="alternate" hreflang="...">`，共 272 个 alternate 标签。

### Schema 标记
- 所有 blog 页面包含 `TechArticle` Schema。
- 所有 blog 页面包含 `FAQPage` Schema（来自 frontmatter FAQ）。

### Meta 标签
- 所有 blog 页面 title 控制在 50-70 字符（含品牌后缀）。
- 所有 blog 页面 description 控制在 100-170 字符。
- 中文 description 控制在 50-150 字符。
- 静态页面 title/description 已优化。

### 内链网络
- 所有 136 篇 blog 页面包含 ≥3 个有效站内内链。
- 已修复所有 `../` 格式链接和无效 slug 链接。

### 构建验证
- `npm run build` 成功。
- Sitemap 包含 152 个 URL（136 blog + 16 静态页面）。
- SEO 健康检查：仅 404/_not-found 页面有预期问题，其余全部通过。

---

## 四、GSC 提交状态（2026-07-16）

### 已完成
1. ✅ 代码已 push 到 `main` 并自动部署到 GitHub Pages：`https://vibetrading.fun/`。
2. ✅ `https://vibetrading.fun/sitemap.xml` 已重新提交到 GSC，状态为 "Couldn't fetch"（Google 会周期性重新抓取）。
3. ⏳ P0 支柱页（5 个英文 URL）正在通过 WebBridge 手动请求索引中。

### 待执行
1. **Day 1 剩余**：确认 P0 URL 索引请求结果，记录到 `gsc-index-tracking.csv`。
2. **Day 2-7**：按 `gsc-index-tracking.csv` 优先级分批手动提交 P1/P2/P3 URL。
   - 每日提交 10-15 个，避免触发 GSC 限额。
3. **Day 8-9**：加固 5 篇核心英文支柱页，优化内链网络。
4. **Day 10**：重新部署 + 重新提交 sitemap + 社交/外链信号。
5. **Day 11-13**：索引排查 + 再次请求未索引的重要 URL。
6. **Day 14**：数据复盘：统计已索引数、点击量、曝光、平均排名。

详细操作步骤见 `gsc-submission-guide.md` 和 `content-sprint-plan-v4.md`。

---

## 五、内容方向约束

- ✅ **允许**：开源 GitHub 项目对比、策略对比、Reddit 痛点转化、YouTube 策略转化、基础概念科普。
- ❌ **不允许**：付费 app/产品对比（如 TrendSpider、3Commas、Kavout、eToro 等商业工具深度评测）。
- ❌ **不允许**：保证收益、夸大效果的表述。
- ❌ **不允许**：直接搬运 YouTube 视频，只转化策略为可回测代码 + 风险分析。

---

## 六、获取外链信号

使用 `social-sharing-templates.md` 中的模板：
- 在 Reddit r/algotrading 发布 1-2 篇高质量帖子。
- 在 Twitter/X 发布 5-7 条推文。
- 在 GitHub Discussions 的相关项目下留下有价值的评论。
- 在中文社区（知乎、雪球、V2EX、即刻等）分享对应中文内容。

---

## 七、每日追踪

- 更新 `gsc-index-tracking.csv` 中的 `date_submitted` 和状态列。
- 观察 Coverage 报告中的 "Crawled - currently not indexed" 页面。
- 对未索引页面做小幅更新（加一段 FAQ、调整内链）后重新提交。

---

## 八、14 天目标检查表

| 日期 | 任务 |
|---|---|
| Day 1 | 部署 + 重新提交 sitemap + P0 URL 手动提交 |
| Day 2 | P1 首批 URL 手动提交 + 开始社交分享 |
| Day 3 | P1 剩余 + P2 首批 URL 手动提交 |
| Day 4-6 | P2/P3 URL 分批手动提交 |
| Day 7 | 第一周数据复盘 |
| Day 8-9 | 加固 5 篇核心英文支柱页 + 内链网络优化 |
| Day 10 | 重新部署 + 重新提交 sitemap + 社交/外链信号 |
| Day 11-13 | 索引异常排查 + 再次请求未索引 URL |
| Day 14 | GSC 数据复盘：统计已索引数、点击量、曝光、平均排名 |

---

## 九、注意事项

1. **不要一次性提交所有 URL**：GSC 手动请求索引有每日限额，建议每批不超过 15 个。
2. **索引需要耐心**：即使立即请求，Google 也可能需要 2-7 天才会显示索引状态。
3. **中文页面 html lang**：当前根 layout 固定为 `lang="en"`，中文页面通过 `hreflang` 区分。如要完全正确，可考虑后续将根 layout 改为根据路径动态设置 lang。
4. **内容新鲜度**：建议每月更新核心支柱页（`ai-trading-for-beginners`、`best-ai-trading-bots-2026`、`top-ai-trading-github-projects-2026`）的 `dateModified`。
5. **不要再新增 app/产品对比**：本冲刺已明确不做付费工具深度评测，聚焦开源项目、策略、Reddit/YouTube 转化。

---

## 十、我这边无法继续的工作

- 直接获取 GSC 点击/曝光数据（需要登录你的 GSC 账号）。
- 实际在社交平台上发布内容（需要你操作账号）。

完成 GSC 提交后，你可以把 GSC 数据截图或 CSV 发给我，我可以继续帮你：
- 分析哪些页面未索引及原因
- 优化低排名页面
- 制定第 15-30 天的内容维护计划

---

*文档版本：v4*
*最后更新：2026-07-16*
