import fs from "fs";
import path from "path";

export interface BtcDay {
  date: string;
  close: number;
  changePct: number | null;
  up: boolean | null;
}

export interface BtcDailyData {
  updated: string;
  source: string;
  days: BtcDay[];
}

export interface MuskWeek {
  weekStart: string;
  weekEnd: string;
  low: number;
  high: number | null;
  midpoint: number;
  slug: string;
}

export interface MuskLiveBracket {
  low: number;
  high: number | null;
  prob: number;
}

export interface MuskLiveEvent {
  slug: string;
  title: string;
  weekStart: string;
  weekEnd: string;
  brackets: MuskLiveBracket[];
}

export interface MuskTweetsData {
  updated: string;
  source: string;
  note: string;
  weeks: MuskWeek[];
  live: MuskLiveEvent[];
}

function readJson<T>(file: string): T | null {
  try {
    const full = path.join(process.cwd(), "data", file);
    return JSON.parse(fs.readFileSync(full, "utf8")) as T;
  } catch {
    return null;
  }
}

export function getBtcDaily(): BtcDailyData {
  return readJson<BtcDailyData>("btc-daily.json") || { updated: "", source: "coingecko", days: [] };
}

export function getMuskTweets(): MuskTweetsData {
  return (
    readJson<MuskTweetsData>("musk-tweets.json") || {
      updated: "",
      source: "polymarket-resolved-events",
      note: "",
      weeks: [],
      live: [],
    }
  );
}
