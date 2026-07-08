import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "vibetrading.fun is a blog about AI trading bots, prediction markets, and automated trading strategies.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        About vibetrading.fun
      </h1>

      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          vibetrading.fun is a blog for retail traders who are tired of AI
          trading hype and want real, tested information about bots, prediction
          markets, and automated strategies.
        </p>

        <h2>What We Do</h2>
        <ul>
          <li>
            <strong>Test tools honestly.</strong> We open accounts, use the
            software, and report what actually happens.
          </li>
          <li>
            <strong>Publish buildable tutorials.</strong> Every tutorial includes
            working code you can adapt for your own strategies.
          </li>
          <li>
            <strong>Research new markets.</strong> We explore prediction markets,
            crypto automation, and AI agents as they evolve.
          </li>
        </ul>

        <h2>What We Don't Do</h2>
        <ul>
          <li>Promise guaranteed returns</li>
          <li>Sell "secret" trading signals</li>
          <li>Promote scams or unregulated platforms</li>
          <li>Hide affiliate relationships</li>
        </ul>

        <h2>Our Methodology</h2>
        <p>
          Every review and challenge follows a consistent process: define the
          strategy, run it in paper or small live mode, record every trade,
          measure risk-adjusted returns, and publish the raw data.
        </p>

        <h2>Disclosures</h2>
        <p>
          Some links on this site are affiliate links. We only recommend tools we
          have personally tested or researched deeply. Our opinions are our own.
          This site is for educational purposes only and does not constitute
          financial advice.
        </p>
      </div>
    </div>
  );
}
