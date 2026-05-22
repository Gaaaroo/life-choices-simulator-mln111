import type { GameState } from "../types/game";
import type { StatEffects } from "../types/story";
import { clampStat } from "./clampStat";

export function applyEffects(
  state: GameState,
  effects?: StatEffects,
): GameState {
  if (!effects) return state;

  const stats = { ...state.stats };
  for (const [key, delta] of Object.entries(effects)) {
    const statKey = key as keyof typeof stats;
    if (delta !== undefined) {
      stats[statKey] = clampStat(statKey, stats[statKey] + delta);
    }
  }
  return { ...state, stats };
}
