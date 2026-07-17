import localFont from "next/font/local";

/**
 * Self-hosted fonts (woff2, latin subset) served from /_next/static/media.
 * CJK glyphs intentionally fall through to the system stacks declared in
 * globals.css (PingFang SC / Songti SC / Noto), so no CJK webfont is shipped.
 */
export const inter = localFont({
  src: "../app/fonts/Inter-Variable.woff2",
  variable: "--font-inter",
  display: "swap",
});

export const playfair = localFont({
  src: [
    { path: "../app/fonts/PlayfairDisplay-Variable.woff2", style: "normal" },
    { path: "../app/fonts/PlayfairDisplay-Italic-Variable.woff2", style: "italic" },
  ],
  variable: "--font-playfair",
  display: "swap",
});

export const plexMono = localFont({
  src: [
    { path: "../app/fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "../app/fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/IBMPlexMono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontVariables = `${inter.variable} ${playfair.variable} ${plexMono.variable}`;
