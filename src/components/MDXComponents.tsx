import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

function Disclaimer() {
  return (
    <div className="mb-8 rounded-xl border border-border bg-surface p-4 text-sm text-muted">
      <strong className="text-foreground">Risk Disclaimer:</strong> This content
      is for educational purposes only. Trading involves significant risk of
      loss. Past performance does not guarantee future results. Always do your
      own research before using any trading tool or strategy.
    </div>
  );
}

function Alert({
  children,
  type = "info",
}: {
  children: React.ReactNode;
  type?: "info" | "warning" | "success" | "danger";
}) {
  const styles = {
    info: "border-accent/30 bg-accent/10 text-foreground",
    warning: "border-warning/30 bg-warning/10 text-foreground",
    success: "border-success/30 bg-success/10 text-foreground",
    danger: "border-danger/30 bg-danger/10 text-foreground",
  };

  return (
    <div className={cn("my-6 rounded-xl border p-4", styles[type])}>
      {children}
    </div>
  );
}

function ComparisonTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Disclaimer,
  Alert,
  ComparisonTable,
};
