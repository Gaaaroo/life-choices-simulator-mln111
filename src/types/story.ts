import type { ImageKey } from "../constants/images";
import type { StatKey } from "./game";

export type SceneType =
  | "narrative"
  | "choice"
  | "event"
  | "philosophy"
  | "branch";

export type StatCondition = {
  gte?: number;
  lte?: number;
};

export type Conditions = Partial<Record<StatKey, StatCondition>> & {
  flag?: keyof import("./game").GameFlags;
  flagValue?: boolean;
};

export type StatEffects = Partial<Record<StatKey, number>>;

export type PhilosophyKind = "phenomenon" | "essence";

export type Choice = {
  id: string;
  label: string;
  effects?: StatEffects;
  imageAfter?: ImageKey;
  feedback?: string[];
  journal?: string;
  timelineLabel?: string;
  next: string;
  conditions?: Conditions;
  philosophy?: PhilosophyKind;
  flag?: keyof import("./game").GameFlags;
  revealTitle?: string;
  revealText?: string;
  popup?: string;
};

export type Scene = {
  id: string;
  type: SceneType;
  age?: number;
  image: ImageKey;
  text: string;
  choices?: Choice[];
  next?: string;
};
