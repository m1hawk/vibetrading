# VibeTrading 2 周内容冲刺 — 最终交接文档

> 生成日期：2026-07-16  
> 项目路径：`/Users/yangzhen/Desktop/vibetrading`  
> 目标域名：https://vibetrading.fun  
> 冲刺目标：14 天内新增 100 篇 AI Trading 相关内容并推动 Google 索引。

---

## 一、当前状态：内容生产已完成，等待部署与 GSC 提交

### 核心完成标准核对

| # | 完成标准 | 目标 | 当前状态 |
|---|---|---|---|
| ① | 英文 MDX 发布 | ≥50 | ✅ 68 |
| ① | 中文 MDX 发布 | ≥50 | ✅ 68 |
| ② | 英文新页面 GSC 已索引 | ≥40（80%） | ⏳ 待提交后验证 |
| ③ | 覆盖核心长尾词 | ≥50 | ✅ 68/82 |
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
  - 基础科普/概念：6 个主题
  - 其他高流量入口：4 个主题

---

## 二、已生成的文档与工具

| 文件 | 用途 |
|---|---|
| `content-sprint-plan-v3.md` | 重新制定的 14 天冲刺计划 |
| `gsc-index-tracking.csv` | 68 个英文 URL 的 GSC 提交与索引追踪表 |
| `gsc-submission-guide.md` | Google Search Console 提交操作指南 |
| `deployment-checklist.md` | 部署与提交核对清单 |
| `social-sharing-templates.md` | Reddit/Twitter/GitHub/中文社区推广模板 |
| `keyword-coverage-mapping.md` | 82 个关键词覆盖映射表 |
| `scripts/seo-health-check.mjs` | 自动化 SEO 健康检查脚本 |
| `seo-health-report.json` | 最新 SEO 健康检查详细报告 |

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

## 四、你必须执行的下一步

### 1. 部署到生产环境

```bash
cd /Users/yangzhen/Desktop/vibetrading
# 确保构建成功
npm run build

# 将 out/ 目录内容上传到 vibetrading.fun 根目录
# 具体命令取决于你的托管方式（Vercel/Cloudflare Pages/GitHub Pages/自有服务器）
```

部署后验证：
- `https://vibetrading.fun/` 可访问
- `https://vibetrading.fun/sitemap.xml` 可访问并返回 152 个 URL
- 任意 blog 页面可访问，例如 `https://vibetrading.fun/blog/ai-trading-for-beginners`

### 2. Google Search Console 提交

1. 登录 [Google Search Console](https://search.google.com/search-console/)。
2. 选择 `vibetrading.fun` 资源。
3. 提交 sitemap：`sitemap.xml`。
4. 按 `gsc-index-tracking.csv` 中的优先级分批手动请求索引：
   - **Day 10**：P0 支柱页 5 个
   - **Day 11**：P1 GitHub 项目 + 基础概念 16 个
   - **Day 12**：P2 策略 + Reddit 痛点 28 个
   - **Day 13**：P3 YouTube 转化 + 其他长尾 19 个
5. 在 CSV 中记录 `date_submitted`。

详细操作步骤见 `gsc-submission-guide.md`。

### 3. 获取外链信号

使用 `social-sharing-templates.md` 中的模板：
- 在 Reddit r/algotrading 发布 1-2 篇高质量帖子。
- 在 Twitter/X 发布 5-7 条推文。
- 在 GitHub Discussions 的相关项目下留下有价值的评论。
- 在中文社区（知乎、雪球、V2EX、即刻等）分享对应中文内容。

### 4. 每日追踪

- 更新 `gsc-index-tracking.csv`。
- 观察 Coverage 报告中的 "Crawled - currently not indexed" 页面。
- 对未索引页面做小幅更新（加一段 FAQ、调整内链）后重新提交。

---

## 五、14 天目标检查表

| 日期 | 任务 |
|---|---|
| Day 10 | 部署 + 提交 sitemap + P0 URL 手动提交 |
| Day 11 | P1 URL 手动提交 + 开始社交分享 |
| Day 12 | P2 URL 手动提交 + 继续社交分享 |
| Day 13 | P3 URL 手动提交 + 索引异常排查 |
| Day 14 | GSC 数据复盘：统计已索引数、点击量、曝光、平均排名 |

---

## 六、注意事项

1. **不要一次性提交所有 URL**：GSC 手动请求索引有每日限额，建议每批不超过 20 个。
2. **索引需要耐心**：即使立即请求，Google 也可能需要 2-7 天才会显示索引状态。
3. **中文页面 html lang**：当前根 layout 固定为 `lang="en"`，中文页面通过 `hreflang` 区分。如要完全正确，可考虑后续将根 layout 改为根据路径动态设置 lang。
4. **内容新鲜度**：建议每月更新核心支柱页（`ai-trading-for-beginners`、`best-ai-trading-bots-2026`、`top-ai-trading-github-projects-2026`）的 `dateModified`。
5. **不要再新增 app/产品对比**：本冲刺已明确不做付费工具深度评测，聚焦开源项目、策略、Reddit/YouTube 转化。

---

## 七、我这边无法继续的工作

- 实际部署到 `vibetrading.fun`（需要你的服务器/托管权限）。
- 登录你的 GSC 账号提交 URL 和查看索引状态。
- 直接获取 GSC 点击/曝光数据。

完成部署和 GSC 提交后，你可以把 GSC 数据截图或 CSV 发给我，我可以继续帮你：
- 分析哪些页面未索引及原因
- 优化低排名页面
- 制定第 15-30 天的内容维护计划

---

*文档版本：v1*  
*最后更新：2026-07-16*
