# VibeTrading 内容冲刺最终部署与提交清单

> 目标：14 天内为 vibetrading.fun 新增 100 篇 AI Trading 内容并推动 Google 索引。  
> 当前状态：136 篇 MDX 已生成并通过质量审计，本地构建成功，sitemap 152 URLs。

---

## 一、本地质量验收（已完成 ✅）

| 检查项 | 标准 | 结果 |
|---|---|---|
| 英文 MDX 数量 | ≥50 | ✅ 68 |
| 中文 MDX 数量 | ≥50 | ✅ 68 |
| 总 blog URL 数 | ≥100 | ✅ 136 |
| 英文单篇平均字数 | ≥800 | ✅ 1454 |
| 英文单篇最低字数 | ≥800 | ✅ 800 |
| 中文单篇最低中文字符 | ≥500 | ✅ 全部 ≥500 |
| 所有页面含 Disclaimer | 100% | ✅ 136/136 |
| 所有页面含 FAQ frontmatter | 100% | ✅ 136/136 |
| 所有页面有效内链 ≥3 | 100% | ✅ 136/136 |
| 无效内链 | 0 | ✅ 0 |
| 本地构建 | 成功 | ✅ `npm run build` 通过 |
| sitemap URL 数 | ≥136 blog URLs | ✅ 152 URLs |

---

## 二、部署前准备

- [ ] 确认 `out/` 目录已生成最新静态文件。
- [ ] 确认 `out/sitemap.xml` 存在且包含 152 个 URL。
- [ ] 确认域名 `vibetrading.fun` 的 DNS 和托管配置正确。
- [ ] 准备 GSC 账号登录信息（需要 `vibetrading.fun` 的资源权限）。

---

## 三、部署步骤

1. 将 `/Users/yangzhen/Desktop/vibetrading/out/` 的内容上传到 `vibetrading.fun` 的根目录。
2. 验证首页 `https://vibetrading.fun/` 可访问。
3. 验证 blog 页面示例可访问：
   - `https://vibetrading.fun/blog/ai-trading-for-beginners`
   - `https://vibetrading.fun/zh/blog/ai-trading-for-beginners`
4. 验证 sitemap 可访问：
   - `https://vibetrading.fun/sitemap.xml`

---

## 四、GSC 提交步骤

### 4.1 提交 Sitemap

1. 登录 [Google Search Console](https://search.google.com/search-console/)。
2. 选择 `vibetrading.fun` 资源。
3. 左侧菜单 → **Sitemaps**。
4. 输入 `sitemap.xml` 并点击 **Submit**。
5. 等待状态显示 **Success**。

### 4.2 手动 URL Inspection（分批）

使用 `gsc-index-tracking.csv` 中的 URL，按优先级分批提交：

| 批次 | 优先级 | URL 数 | 建议日期 | 操作 |
|---|---|---|---|---|
| Batch 1 | P0 | 5 | Day 10 | 5 个支柱页 |
| Batch 2 | P1 | 16 | Day 11 | GitHub 项目教程 + 基础概念 |
| Batch 3 | P2 | 28 | Day 12 | 策略教程 + Reddit 痛点 |
| Batch 4 | P3 | 19 | Day 13 | YouTube 转化 + 其他长尾 |

单条提交步骤：
1. 复制 CSV 中的 URL。
2. 粘贴到 GSC 顶部 URL Inspection 搜索框。
3. 按回车，等待 Google 抓取。
4. 点击 **Request indexing**。
5. 在 CSV 的 `date_submitted` 列记录日期。

> GSC 手动请求索引每日有隐含限额，建议每批不超过 20 条。

---

## 五、每日追踪指标

在 `gsc-index-tracking.csv` 中记录：

- `date_submitted`：提交日期
- `status_day_3`：提交后第 3 天状态
- `status_day_7`：第 7 天状态
- `status_day_14`：第 14 天状态
- `clicks_day_14`：第 14 天英文页面总点击
- `impressions_day_14`：第 14 天英文页面总曝光
- `avg_position_day_14`：第 14 天英文页面平均排名
- `notes`：异常备注

目标状态：
- 至少 40 篇英文页面显示 **Submitted and indexed** 或 **Indexed**。
- 第 14 天英文页面日点击量 ≥5。
- 第 14 天英文页面曝光 ≥2000。

---

## 六、常见问题排查

| 问题 | 原因 | 行动 |
|---|---|---|
| Crawled - currently not indexed | Google 暂不认为页面值得收录 | 增加内链指向该页，小幅更新内容，2-3 天后重新提交 |
| Discovered - currently not indexed | Google 发现未抓取 | 从支柱页添加内链，等待或请求索引 |
| Soft 404 | 页面内容为空或模板错误 | 检查对应 MDX 是否渲染正常 |
| Duplicate, submitted URL not selected as canonical | hreflang 或 canonical 设置问题 | 确认英文和中文页面 lang 标签正确 |
| 提交按钮灰色 | 当日限额已到 | 次日再提交 |

---

## 七、14 天目标核对

| 完成标准 | 当前状态 |
|---|---|
| ① 50 英文 + 50 中文 MDX 发布 | ✅ 68 + 68 |
| ② 40 篇英文新页面 GSC 已索引 | ⏳ 待提交后验证 |
| ③ 覆盖 ≥50 核心长尾词 | ✅ 68/82 关键词已覆盖 |
| ④ 英文单篇平均字数 ≥800 | ✅ 1454 |
| ⑤ 第 14 天英文日点击 ≥5 | ⏳ 待验证 |
| ⑥ 所有页面 Disclaimer + FAQ + 内链 ≥3 | ✅ 全部通过 |

---

## 八、已生成文档

- `content-sprint-plan-v3.md` — 重新制定的冲刺计划
- `gsc-index-tracking.csv` — 68 个英文 URL 提交追踪表
- `gsc-submission-guide.md` — GSC 提交操作指南
- `deployment-checklist.md` — 本文件
- `keyword-coverage-mapping.md` — 82 个关键词覆盖映射表（已覆盖 68 个）
- `social-sharing-templates.md` — Reddit/Twitter/中文社区推广模板

---

*清单版本：v1*  
*更新日期：2026-07-16*
