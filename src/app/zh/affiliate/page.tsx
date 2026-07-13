import { Metadata } from "next";

export const metadata: Metadata = {
  title: "联盟披露",
  description:
    "vibetrading.fun 的联盟披露。我们只推荐亲自测试或研究过的工具。",
};

export default function AffiliatePageZh() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        联盟披露
      </h1>
      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          vibetrading.fun 参与了部分我们评测产品与服务的联盟计划。这意味着如果你点击链接并完成购买或注册服务，我们可能会获得佣金。
        </p>
        <p>
          我们的联盟关系不会影响我们的评测或观点。我们只推荐亲自测试过或彻底研究过的工具。
        </p>
        <p>
          我们崇尚透明，因此在使用联盟链接时会进行披露。你通过这些链接的支持帮助我们持续产出独立、高质量的内容。
        </p>
      </div>
    </div>
  );
}
