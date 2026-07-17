export function formatDate(dateString: string, locale: "en-US" | "zh-CN" = "en-US"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
