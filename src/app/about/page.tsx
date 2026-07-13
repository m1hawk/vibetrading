import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Why VibeTrading.fun exists, how we build and test, and what we will never sell.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="nx-label">About</div>
      <h1 className="nx-display mt-5 text-5xl sm:text-6xl">Market ideas should be testable.</h1>
      <div className="prose mt-10 max-w-3xl">
        <p>VibeTrading.fun is a practical field guide for people using AI to research markets, formalize strategies, build tools, and test trading workflows.</p>
        <p>We believe the most useful part of AI is not a confident prediction. It is the ability to move faster from a vague idea to explicit assumptions, inspectable rules, working code, and evidence that can prove the idea wrong.</p>
        <h2>What we publish</h2>
        <ul><li>Beginner-friendly explanations of AI and algorithmic trading</li><li>No-code, low-code, and developer build guides</li><li>Tool comparisons with research status and limitations</li><li>Backtests, paper-trading experiments, and failed ideas</li><li>Reusable prompts, checklists, code, and evaluation frameworks</li></ul>
        <h2>What we do not sell</h2>
        <ul><li>Guaranteed returns</li><li>Secret signals or copy-trading promises</li><li>Rankings influenced by undisclosed compensation</li><li>Results without the assumptions and risks needed to interpret them</li></ul>
        <h2>Our method</h2>
        <p>Describe → Build → Backtest → Paper trade → Iterate. Rules are stated before results. Costs and limitations are included. A failed experiment is still publishable evidence.</p>
        <h2>Responsibility</h2>
        <p>Everything on this site is educational. AI can help write research and code, but it cannot take responsibility for capital. Every tool, assumption, and output must be independently checked.</p>
      </div>
      <Link href="/vibe-trading" className="nx-btn nx-btn-primary mt-10">
        Read the Vibe Trading guide
      </Link>
    </div>
  );
}
