import type { GameState } from "../types/game";

export const INITIAL_STATS = {
  knowledge: 50,
  health: 50,
  money: 10,
  relationship: 20,
  discipline: 40,
} as const;

export function createInitialGameState(): GameState {
  return {
    stats: { ...INITIAL_STATS },
    flags: {
      learnedSkill: false,
      philMinhEssence: false,
      philRichEssence: false,
      startupAttempted: false,
      startupSuccess: false,
      gameHeavy: false,
    },
    philosophy: { phenomenon: 0, essence: 0 },
    journal: [],
    choiceHistory: [],
    currentSceneId: "home",
  };
}
