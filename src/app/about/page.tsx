import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "AI Trading Lab is an independent publication testing AI trading tools and sharing honest, data-driven insights.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        About AI Trading Lab
      </h1>

      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          AI Trading Lab is an independent publication for retail traders who are
          tired of AI trading hype and want real, tested information.
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
            <strong>Run transparent challenges.</strong> We test strategies with
            fixed rules and publish every trade.
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
