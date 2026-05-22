export type StatKey =
  | "knowledge"
  | "health"
  | "money"
  | "relationship"
  | "discipline";

export type Stats = Record<StatKey, number>;

export type MemoryId =
  | "minh_game_summer_15"
  | "minh_judged_lazy"
  | "minh_understood"
  | "minh_helped_money"
  | "bf_game_bond_15"
  | "bf_study_together_15"
  | "bf_borrowed_18"
  | "bf_refused_18"
  | "english_started_15"
  | "exam_sleep_15"
  | "mother_neglected"
  | "mother_cared"
  | "lover_started_22"
  | "lover_lost_startup"
  | "mentor_met";

export type NpcId = "minh" | "mother" | "bestFriend" | "lover" | "mentor";

export type NpcState = {
  affinity: number;
  trust: number;
  status?: "close" | "distant" | "success" | "sick" | "unknown";
};

export type Relationships = Record<NpcId, NpcState>;

export type GameFlags = {
  learnedSkill: boolean;
  philMinhEssence: boolean;
  philRichEssence: boolean;
  startupAttempted: boolean;
  startupSuccess: boolean;
  gameHeavy: boolean;
};

/** Độ sâu nhận thức — ẩn, không moralize */
export type InsightScore = {
  depth: number;
};

export type LifeJournalEntry = {
  age: number;
  text: string;
  templateId?: string;
};

export type ChoiceRecord = {
  sceneId: string;
  choiceId: string;
  label: string;
  age?: number;
};

export type GameState = {
  stats: Stats;
  flags: GameFlags;
  memories: MemoryId[];
  relationships: Relationships;
  insight: InsightScore;
  lifeJournal: LifeJournalEntry[];
  journal: string[];
  choiceHistory: ChoiceRecord[];
  currentSceneId: string;
};

export type AppScreen = "home" | "play" | "ending" | "analysis";
