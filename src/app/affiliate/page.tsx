import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "Affiliate disclosure for vibetrading.fun. We only recommend tools we have tested or researched.",
};

export default function AffiliatePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Affiliate Disclosure
      </h1>
      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          vibetrading.fun participates in affiliate programs for some of the
          products and services we review. This means we may earn a commission if
          you click on a link and make a purchase or sign up for a service.
        </p>
        <p>
          Our affiliate relationships do not influence our reviews or opinions.
          We only recommend tools we have personally tested or researched
          thoroughly.
        </p>
        <p>
          We believe in transparency, so we disclose affiliate links when they
          are used. Your support through these links helps us continue producing
          independent, high-quality content.
        </p>
      </div>
    </div>
  );
}
