import type { ImageKey } from "../constants/images";
import type { MemoryId, NpcId, StatKey } from "./game";

export type SceneType =
  | "narrative"
  | "choice"
  | "event"
  | "philosophy"
  | "philosophy_v2"
  | "branch"
  | "emotional"
  | "relationship";

export type StatCondition = {
  gte?: number;
  lte?: number;
};

export type Conditions = Partial<Record<StatKey, StatCondition>> & {
  flag?: keyof import("./game").GameFlags;
  flagValue?: boolean;
  memory?: MemoryId;
  notMemory?: MemoryId;
  npcAffinity?: { npc: NpcId; gte?: number; lte?: number };
};

export type StatEffects = Partial<Record<StatKey, number>>;

export type NpcEffects = Partial<
  Record<
    NpcId,
    {
      affinity?: number;
      trust?: number;
      status?: "close" | "distant" | "success" | "sick" | "unknown";
    }
  >
>;

export type Choice = {
  id: string;
  label: string;
  effects?: StatEffects;
  imageAfter?: ImageKey;
  feedback?: string[];
  journal?: string;
  journalTemplate?: string;
  timelineLabel?: string;
  next: string;
  conditions?: Conditions;
  memories?: MemoryId[];
  npcEffects?: NpcEffects;
  flag?: keyof import("./game").GameFlags;
  /** Triết học cũ — G1 v2 không dùng */
  philosophy?: "phenomenon" | "essence";
  insightDepth?: number;
  revealTitle?: string;
  revealText?: string;
  /** Câu nội tâm sau chọn (không moralize) */
  innerMonologue?: string;
  /** Popup — chỉ khi có reveal phức tạp */
  popup?: string;
};

export type Scene = {
  id: string;
  type: SceneType;
  age?: number;
  image: ImageKey;
  text: string;
  /** relationship / emotional */
  npcId?: NpcId;
  choices?: Choice[];
  next?: string;
};
