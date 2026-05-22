export type StatKey =
  | "knowledge"
  | "health"
  | "money"
  | "relationship"
  | "discipline";

export type Stats = Record<StatKey, number>;

export type GameFlags = {
  learnedSkill: boolean;
  philMinhEssence: boolean;
  philRichEssence: boolean;
  startupAttempted: boolean;
  startupSuccess: boolean;
  gameHeavy: boolean;
};

export type PhilosophyScore = {
  phenomenon: number;
  essence: number;
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
  philosophy: PhilosophyScore;
  journal: string[];
  choiceHistory: ChoiceRecord[];
  currentSceneId: string;
};

export type AppScreen = "home" | "play" | "ending" | "analysis";
