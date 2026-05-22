import type { GameFlags, GameState, StatKey } from "../types/game";
import type { Conditions } from "../types/story";

export function checkConditions(
  state: GameState,
  conditions?: Conditions,
): boolean {
  if (!conditions) return true;

  if (conditions.flag) {
    const expected = conditions.flagValue ?? true;
    if (state.flags[conditions.flag as keyof GameFlags] !== expected) {
      return false;
    }
  }

  const statKeys: StatKey[] = [
    "knowledge",
    "health",
    "money",
    "relationship",
    "discipline",
  ];

  for (const key of statKeys) {
    const cond = conditions[key];
    if (!cond) continue;
    const value = state.stats[key];
    if (cond.gte !== undefined && value < cond.gte) return false;
    if (cond.lte !== undefined && value > cond.lte) return false;
  }

  return true;
}
