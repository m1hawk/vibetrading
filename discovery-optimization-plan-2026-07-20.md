# 内容发现与导流优化计划 — 2026-07-20

> 状态：待执行
> 项目路径：`/Users/yangzhen/Desktop/vibetrading`
> 范围：首页导流、Hub 卡片可点击化、/blog 快速查找。**不改文章 slug/URL，不动数据工具管线。**

---

## 一、背景与问题

站点本质是 blog（136 篇双语文章），但当前用户流程有三处断裂：

1. **Hub 卡片是死胡同**：`/build`（Level 01-04）、`/tools`（4 类卡片）、`/lab`（4 张原则卡）、首页"方法五步"全部是静态展示，不可点击。用户看完概念无路可走。
2. **CTA 预期错位**：首页次 CTA「看看我们做了什么」→ `/build`，落地是静态层级图而不是"做过的东西"。
3. **内容无快速检索**：136 篇文章只能靠 `/blog` 的分类分组 + 首页"最新 3 篇"发现，没有搜索、没有按主题过滤。用户找不到想看的内容就会走。

**目标**：每个展示模块都能通向对应文章列表；用户 10 秒内能按主题找到内容。

**现状盘点**：
- 分类已收敛为 4 类（Guides 19 / Tutorials 23 / Strategies 17 / Tools 9 每语言）
- 标签可用但参差：`backtesting` 24、`python` 54、`beginners` 14、`alpaca` 12、`llm` 8、`multi-agent` 6（双语合计）；`no-code` 仅 2、无 `tradingview` 标签
- `/blog` 已有分类分组 + 锚点 chips
- `/build` posts 区已按 Tutorials 动态读取

---

## 二、执行总览

| 阶段 | 内容 | 预计耗时 |
|---|---|---|
| P1 | `/blog` 加客户端搜索 + 标签过滤（支持 `?tag=` 深链） | 0.5 天 |
| P2 | 全部 Hub 卡片挂链接（/build、/tools、/lab、首页方法五步） | 0.5 天 |
| P3 | 首页导流修正（次 CTA 指向 + guides 区分类快捷入口） | 1 小时 |
| P4 | 验证 + 部署 | 1 小时 |

原则：**不新增独立 tag 页面**（避免 30+ 个薄内容页稀释索引）；用 `/blog?tag=x` 客户端过滤实现"主题文章列表"，可分享、可链接，索引面不膨胀。

---

## 三、P1：/blog 搜索与标签过滤

在 `/blog`（EN）与 `/zh/blog` 顶部加客户端组件 `BlogFilter`：

- 搜索框：即时过滤标题 / 描述 / 标签（不区分大小写）
- 标签 chips：取每语言出现次数 ≥4 的标签（约 12-15 个），单选过滤
- URL 状态：`?tag=backtesting&q=alpaca` 可读写（`useSearchParams`），使过滤视图可分享、可被 Hub 卡片链接
- 无结果时给出清空按钮
- 保留现有分类分组展示（过滤时按分组显示命中文 章）

**验收**：`/blog?tag=backtesting` 直接呈现过滤结果；搜索 "alpaca" 只剩匹配文章；无 console 报错。

---

## 四、P2：Hub 卡片全部可点击

### 4.1 卡片 → 链接映射（EN + ZH 同步）

`/build`：
| 卡片 | 链接 |
|---|---|
| Level 01 无代码工作流 | `/blog?tag=beginners` |
| Level 02 低代码构建 | `/tutorials` |
| Level 03 Python 与 API | `/blog?tag=python` |
| Level 04 交易 Agent | `/blog?tag=multi-agent` |

`/tools`：
| 卡片 | 链接 |
|---|---|
| AI models | `/blog?tag=llm` |
| Platforms | `/blog?tag=comparison` |
| Frameworks | `/blog?tag=backtesting` |
| APIs | `/blog?tag=alpaca` |

`/lab`（4 张原则卡）：
| 卡片 | 链接 |
|---|---|
| 先声明假设 | `/blog/how-to-backtest-without-overfitting` |
| 保留审计记录 | `/blog/backtest-vs-live-pnl-gap` |
| 加入真实约束 | `/blog/free-vs-paid-market-data` |
| 也发布失败 | `/blog/win-rate-vs-expectancy` |

首页"方法五步"（描述→构建→回测→模拟盘→迭代）：每步链到对应一篇核心文章（实现时从该主题下最新一篇选）。

实现：HubPage 的 `HubCard.href` 已支持（渲染为 Link），只需给各 cards 数组补 `href`；首页五步卡片目前是纯展示，需小改组件支持可选链接。

**验收**：上述所有卡片可点击且落地页有对应文章；无 404。

---

## 五、P3：首页导流修正

1. 次 CTA「看看我们做了什么 / See what we build」：`/build` → `/blog`（预期对齐：看内容）
2. 首页 guides 区（Latest field guides）下方加一行分类快捷链接：Guides / Tutorials / Strategies / Tools → `/blog#guides` 等现有锚点（EN+ZH）
3. 首页 Levels 卡片维持指向 `/build`（P2 后 /build 已可用）

**验收**：两个 CTA 落地页与文案预期一致；分类链接跳转正确。

---

## 六、P4：验证与部署

- `npm run build` 通过；`seo-check` 与基线一致（无新增页面，sitemap 不变）
- 抽查 `/blog?tag=backtesting` 深链、/build 卡片点击路径、首页 CTA
- 提交 main 推送，CI 部署后线上复核

---

## 七、风险与注意

| 风险 | 应对 |
|---|---|
| `useSearchParams` 需要 Suspense 边界（静态导出） | BlogFilter 用 `<Suspense>` 包裹，参考 Next 16 文档 |
| 标签中英文混排（tags 均为英文） | ZH 页面 chips 直接展示英文 tag（与文章卡片标签一致，现状如此） |
| 部分映射标签文章数少（multi-agent 3 篇/语言） | 可接受——过滤结果少但精准；后续内容冲刺自然补充 |
| 首页五步卡改组件 | 小改，不动其他使用方 |

---

## 八、完成标准检查表

- [ ] P1：/blog 搜索 + 标签过滤 + `?tag=` 深链（EN+ZH）
- [ ] P2：/build、/tools、/lab、首页五步卡全部可点击
- [ ] P3：次 CTA 改指 /blog；guides 区加分类快捷链接
- [ ] P4：build + seo-check 通过，部署上线

---

*计划版本：v1*
*创建日期：2026-07-20*
