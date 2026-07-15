import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for vibetrading.fun.",

  alternates: {
    canonical: "/privacy",
  }};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        Privacy Policy
      </h1>
      <div className="prose prose-invert mt-8 max-w-none">
        <p>
          vibetrading.fun respects your privacy. This policy explains what
          information we collect and how we use it.
        </p>
        <h2>Information We Collect</h2>
        <p>
          When you sign up for our newsletter or download the starter kit, we
          collect your email address. We may also collect anonymous usage data
          through analytics tools.
        </p>
        <h2>How We Use Your Information</h2>
        <p>
          We use your email to send you the requested resources and occasional
          updates. We do not sell your email address to third parties.
        </p>
        <h2>Cookies</h2>
        <p>
          We may use cookies to improve your experience and analyze site usage.
          You can disable cookies in your browser settings.
        </p>
        <h2>Contact</h2>
        <p>
          If you have questions about this privacy policy, please contact us.
        </p>
      </div>
    </div>
  );
}
