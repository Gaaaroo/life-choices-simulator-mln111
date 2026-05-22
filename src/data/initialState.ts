import type { GameState, Relationships } from "../types/game";

export const INITIAL_STATS = {
  knowledge: 50,
  health: 50,
  money: 10,
  relationship: 20,
  discipline: 40,
} as const;

export function createInitialRelationships(): Relationships {
  return {
    minh: { affinity: 50, trust: 40, status: "close" },
    mother: { affinity: 70, trust: 80, status: "close" },
    bestFriend: { affinity: 60, trust: 55, status: "close" },
    lover: { affinity: 0, trust: 0, status: "unknown" },
    mentor: { affinity: 0, trust: 0, status: "unknown" },
  };
}

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
    memories: [],
    relationships: createInitialRelationships(),
    insight: { depth: 0 },
    lifeJournal: [],
    journal: [],
    choiceHistory: [],
    currentSceneId: "home",
  };
}
