import { Metadata } from "next";

export const metadata: Metadata = {
  title: "风险声明",
  description:
    "vibetrading.fun 的重要风险声明。交易涉及重大亏损风险。",
};

export default function DisclaimerPageZh() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        风险声明
      </h1>
      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          vibetrading.fun 上的内容仅供信息和教育目的，不构成投资建议、金融建议，也不推荐买入、卖出或持有任何证券或金融工具。
        </p>
        <p>
          交易股票、加密货币、外汇、期权、期货及其他金融工具涉及重大亏损风险。你永远不应该用无法承受损失的资金进行交易。
        </p>
        <p>
          任何交易策略、机器人或工具的历史表现不代表未来结果。AI 交易工具和算法也可能亏损。
        </p>
        <p>
          在做出任何财务决定前，请咨询合格的金融顾问，并自行做好研究与尽职调查。
        </p>
      </div>
    </div>
  );
}
