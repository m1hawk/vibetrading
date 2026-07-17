# VibeTrading 前端整改计划 — 2026-07-17

> 状态：待执行（已与 7.16 内容冲刺 v4 计划对齐，不冲突）
> 项目路径：`/Users/yangzhen/Desktop/vibetrading`
> 目标域名：https://vibetrading.fun
> 范围：前端设计整改 + 无意义页面清理。**不涉及内容写作方向变更，不改动 blog 文章 URL。**

---

## 一、背景与目标

7.16 评审结论：内容量产能力已验证（136 篇双语 MDX），但前端存在三类问题：

1. **无意义页面长期未清理**：空壳 Hub 页（`/reviews`、`/challenges`）、孤儿页（`/starter-kit`）、无入口页（`/tutorials`）。
2. **视觉资产缺失**：全站 0 张配图，PostCard 无缩略图，社媒分享无 OG 预览图。
3. **信任与体验短板**：文章页无署名/更新时间/相关阅读；中文页 `lang` 写死为 en、Google Fonts CDN 对中文用户不友好、中英文标题字体质感断裂；小字对比度不达标。

**整改目标**：一次性清理信息架构，补齐视觉与信任组件，为 Day 15 之后的流量承接做准备。

**约束**：
- 当前处于 GSC 索引冲刺期（v4 计划 Day 1-14），所有改动**在 `frontend-overhaul` 分支上一次完成、一次合并、一次部署**，避免反复重建干扰抓取。
- `gsc-index-tracking.csv` 的 68 个手动提交 URL 全部为 blog 文章页，本次静态页清理**不影响提交队列**。
- 不改任何 blog 文章的 slug 与 URL。

---

## 二、执行总览

| 阶段 | 内容 | 预计耗时 |
|---|---|---|
| Phase 0 | 安全基线：分支、基线构建、删除清单确认 | 0.5h |
| P1 | 页面清理与信息架构收敛 | 0.5 天 |
| P2 | OG 图与配图系统 | 1 天 |
| P3 | 文章页信任与留存组件 | 0.5-1 天 |
| P4 | 中文体验与字体性能 | 0.5-1 天 |
| P5 | 可访问性与文案对齐（收尾） | 0.5 天 |

顺序：P0 → P1 → P2 → P3 → P4 → P5 → 一次合并部署。

---

## 三、Phase 0：安全基线

| 任务 | 说明 | 验收 |
|---|---|---|
| 创建 `frontend-overhaul` 分支 | 所有改动集中在分支上 | 分支存在且与 main 一致 |
| 基线 `npm run build` | 记录当前 sitemap 152 个 URL 作为对照 | 构建成功 |
| 导出待删页面渲染内容供确认 | `/reviews`、`/challenges`、`/starter-kit`、`/tutorials` | 用户确认删除清单 |

**待用户确认事项**：
- [ ] `/starter-kit`：直接删除，还是内容并入 `/build` 后删除？

---

## 四、P1：页面清理与信息架构收敛

### 4.1 页面处置

| 页面 | 现状 | 处置 |
|---|---|---|
| `/reviews` | 分类下 0 篇文章，纯空壳 | **删除** |
| `/challenges` | 分类下 0 篇文章，纯空壳 | **删除** |
| `/starter-kit` | 导航/页脚均无入口的孤儿页 | **删除**（或并入 `/build`，见 Phase 0 确认项） |
| `/tutorials` | 有 22 篇真实文章但无入口 | **保留升级**：进页脚导航，作为 Tutorials 分类 Hub |
| `/affiliate`、`/about`、`/privacy`、`/disclaimer` | 合规必需 | 保留不动 |
| ZH 侧 | 无 reviews/challenges/tutorials/starter-kit | 仅需同步检查无残余链接 |

### 4.2 分类体系收敛（改 frontmatter，EN + ZH 各一轮）

| 现分类 | 数量/语言 | 处置 |
|---|---|---|
| Basics | 3 | 并入 `Guides` |
| Claude | 1 | 并入 `Tutorials` |
| Guides / Tutorials / Strategies / Tools | 16/22/17/9 | 保留 |

最终 4 个分类：Guides 19 / Tutorials 23 / Strategies 17 / Tools 9（每语言）。
同步修正 `README.md` 与 `content-sprint-plan-v4.md` 中的分类清单。

### 4.3 结构性修复

- `/lab` 页 `posts={[]}` 硬编码 → 改为按 `"Lab"` 分类动态读取（当前为诚实的空状态，未来实验文章自动出现）。
- 页脚加入 Tutorials 入口；清理所有指向已删页面的链接。
- sitemap 预期：152 → 约 146 个 URL。

**验收**：build 通过；`scripts/seo-health-check.mjs` 全绿无死链；`/reviews`、`/challenges`、`/starter-kit` 返回 404。

---

## 五、P2：OG 图与配图系统

| 任务 | 方案 |
|---|---|
| OG 图生成器 | 新增 `scripts/generate-og-images.mjs`，satori + resvg 构建期生成 1200×630 图：纸色底 + Playfair 标题 + 橙色分类标签 + logo，延用 Nexus 设计系统 |
| 覆盖范围 | 68 主题 × 双语 + 全站默认图 + 各 Hub 页，约 145 张，输出 `public/og/` |
| 接入 metadata | 文章页 `openGraph.images` 指向各自 OG 图 |
| PostCard 缩略图 | 卡片顶部加 16:9 图位，列表页不再是纯文字墙 |

**验收**：build 后抽查 5 张图视觉质量；页面源码中 `og:image` 标签指向正确路径。

---

## 六、P3：文章页信任与留存组件

1. **署名栏**：默认 "VibeTrading Editorial Team"，frontmatter 支持按篇覆盖（E-E-A-T 地基）。
2. **"最后更新于"**：`post.updated` 已在数据层，页面补充展示，与 Schema `dateModified` 一致。
3. **相关阅读自动化**：按分类 + tags 重合度计算，文末自动渲染 3 篇 PostCard。
4. **阅读进度条**：客户端组件，支持 `prefers-reduced-motion` 降级。
5. **上一篇 / 下一篇**：分类内导航，增加 crawl 深度与停留时长。

**验收**：任意文章页底部出现相关阅读且链接有效；更新日期展示与 Schema 一致。

---

## 七、P4：中文体验与字体性能

| 问题 | 方案 |
|---|---|
| 根 layout 写死 `lang="en"` | 重构为路由组双 root layout：`(en)` 树输出 `lang="en"`，`/zh` 树输出 `lang="zh-CN"` |
| Google Fonts CDN 对中文用户慢/可能失败 | 改 `next/font/local` 自托管 Inter / Playfair Display / IBM Plex Mono（woff2），构建无外部网络依赖 |
| 中文标题字体 fallback 失控，中英文质感断裂 | zh 显式字体栈：正文 `"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Noto Sans SC",sans-serif`；标题 `"Songti SC","Noto Serif SC",serif` 兜底；Playfair 仅作用于拉丁字符 |

**验收**：`/zh` 页面源码 `<html lang="zh-CN">`；断网环境 build 成功；中文页标题字形符合预期。

---

## 八、P5：可访问性与文案对齐（收尾）

- **对比度**：`nx-label` 等小字从 `#ff8a57`（约 2.6:1，低于 WCAG 4.5:1）改用 `--accent-hover`（#e56a35）；橙色保留给装饰元素与大字号。
- 全局 `focus-visible` 样式补齐；`nx-pulse` 动画加 `prefers-reduced-motion` 降级。
- **文案对齐内容红线**（v4 不做付费 app 对比）：
  - `/tools` 页 "Compare AI models, trading platforms" → 改为"开源工具栈选型框架"类表述。
  - 首页四入口卡片文案同步校准，消除"承诺对比付费平台 vs 红线不做"的错位。

---

## 九、部署与 GSC 联动（P1-P5 合并后执行一次）

1. 合并 `frontend-overhaul` → push main → GitHub Pages 自动部署。
2. GSC 重新提交 sitemap（URL 数下降为预期）。
3. GSC Removals 工具提交已删 URL（`/reviews`、`/challenges`、`/starter-kit`）的移除请求。
4. `gsc-index-tracking.csv` 无需改动（不含静态页）。
5. 部署后一周观察 Coverage 报告，确认无意外 404 激增。

---

## 十、风险与注意事项

| 风险 | 应对 |
|---|---|
| 重构期间影响索引冲刺节奏 | 全部改动一个批次部署；blog 文章 URL 零改动 |
| 删页产生 404 | 删除页未被手动提交索引；用 GSC Removals 主动清除 |
| 分类合并影响内链锚点 | 合并后跑 seo-health-check 验证无死链 |
| OG 图生成脚本体积/速度 | 构建期生成，输出静态 png 到 `public/og/`，不影响运行时 |
| 双 root layout 重构波及面 | 仅移动 layout 结构，页面组件不变；build 全量验证 |

---

## 十一、完成标准检查表

- [x] Phase 0：分支创建 + 基线构建 + 删除清单确认（`/starter-kit` 直接删除：其付费工具对比矩阵与 v4 内容红线冲突）
- [x] P1：4 类分类收敛、空壳页删除、`/lab` 动态化、页脚补 Tutorials
- [x] P2：151 张 OG 图生成并接入 metadata、PostCard 缩略图上线
- [x] P3：署名/更新时间/相关阅读/进度条/上下篇全部上线
- [x] P4：`lang="zh-CN"` 生效、字体自托管、中文标题字形正确
- [x] P5：对比度达标、focus-visible、文案与内容红线对齐
- [ ] 部署 + sitemap 重提 + Removals 提交 + 一周 Coverage 观察（部署已完成 ✅ 2026-07-17；GSC 三项为手动操作，待执行）

---

*计划版本：v1*
*创建日期：2026-07-17*
*关联文档：`content-sprint-plan-v4.md`、`FINAL-HANDOFF.md`、`checkpoint-2026-07-16.md`*
