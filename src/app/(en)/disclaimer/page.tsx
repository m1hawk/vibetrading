import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Risk Disclaimer",
  description:
    "Important risk disclaimer for VibeTrading.fun. Trading and AI trading bots involve substantial risk of loss. Nothing on this site is financial advice.",

  alternates: {
    canonical: "/disclaimer",
  }};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Risk Disclaimer
      </h1>
      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          The content on vibetrading.fun is for informational and educational
          purposes only. It is not financial advice, investment advice, or a
          recommendation to buy, sell, or hold any security or financial
          instrument.
        </p>
        <p>
          Trading stocks, cryptocurrencies, forex, options, futures, and other
          financial instruments involves substantial risk of loss. You should
          never trade with money you cannot afford to lose.
        </p>
        <p>
          Past performance of any trading strategy, bot, or tool is not
          indicative of future results. AI trading tools and algorithms can and
          do lose money.
        </p>
        <p>
          Before making any financial decision, consult a qualified financial
          advisor. Do your own research and due diligence.
        </p>
      </div>
    </div>
  );
}
