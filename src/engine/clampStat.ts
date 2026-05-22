import type { StatKey } from "../types/game";

export function clampStat(key: StatKey, value: number): number {
  if (key === "money") return Math.max(0, Math.min(999, value));
  return Math.max(0, Math.min(100, value));
}
