export function TableOfContents({ content }: { content: string }) {
  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, "").trim();
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
      return { text, id, level };
    });

  if (headings.length === 0) return null;

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Table of Contents
      </h2>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="block text-sm text-muted transition-colors hover:text-foreground"
            style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
