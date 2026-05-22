import type { GameState, NpcId } from "../types/game";
import type { NpcEffects } from "../types/story";

function clampNpcStat(value: number): number {
  return Math.max(0, Math.min(100, value));
}

export function applyNpcEffects(
  state: GameState,
  effects?: NpcEffects,
): GameState {
  if (!effects) return state;

  const relationships = { ...state.relationships };
  for (const [npc, delta] of Object.entries(effects) as [
    NpcId,
    NonNullable<NpcEffects[NpcId]>,
  ][]) {
    const current = { ...relationships[npc] };
    if (delta.affinity !== undefined) {
      current.affinity = clampNpcStat(current.affinity + delta.affinity);
    }
    if (delta.trust !== undefined) {
      current.trust = clampNpcStat(current.trust + delta.trust);
    }
    if (delta.status) current.status = delta.status;
    relationships[npc] = current;
  }
  return { ...state, relationships };
}
