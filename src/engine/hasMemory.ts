import type { GameState, MemoryId } from "../types/game";

export function hasMemory(state: GameState, id: MemoryId): boolean {
  return state.memories.includes(id);
}

export function addMemories(
  state: GameState,
  ids: MemoryId[],
): GameState {
  const next = new Set([...state.memories, ...ids]);
  return { ...state, memories: [...next] };
}
