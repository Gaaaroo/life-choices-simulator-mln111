import type { GameFlags, GameState, StatKey } from "../types/game";
import type { Conditions } from "../types/story";
import { hasMemory } from "./hasMemory";

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

  if (conditions.memory && !hasMemory(state, conditions.memory)) {
    return false;
  }

  if (conditions.notMemory && hasMemory(state, conditions.notMemory)) {
    return false;
  }

  if (conditions.npcAffinity) {
    const { npc, gte, lte } = conditions.npcAffinity;
    const value = state.relationships[npc].affinity;
    if (gte !== undefined && value < gte) return false;
    if (lte !== undefined && value > lte) return false;
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
