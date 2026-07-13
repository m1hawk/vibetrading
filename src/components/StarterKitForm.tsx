"use client";

import { useState } from "react";
import { Mail } from "lucide-react";

export function StarterKitForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground"
          >
            Email address
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="you@example.com"
              className="block w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              className="nx-btn nx-btn-primary sm:w-auto"
            >
              <Mail className="h-5 w-5" />
              Get the Kit
            </button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          No spam. Unsubscribe anytime.
        </p>
      </form>

      {submitted && (
        <div className="mt-6 rounded-xl border border-success/30 bg-success/10 p-4 text-foreground">
          Thanks! Your starter kit access is confirmed. Below is the full content
          you can use immediately.
        </div>
      )}
    </>
  );
}
