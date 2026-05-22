import type { GameState } from "../types/game";
import { hasMemory } from "./hasMemory";

/** Sau narrative/emotional — scene tiếp theo có thể phụ thuộc state */
export function resolveNarrativeNext(
  sceneId: string,
  game: GameState,
  fallbackNext?: string,
): string {
  switch (sceneId) {
    case "after_phil_minh":
      return hasMemory(game, "exam_sleep_15")
        ? "emo_exam_after_allnighter"
        : "mother_call_15";
    case "phil_minh_v2":
      return "after_phil_minh";
    case "emo_exam_after_allnighter":
      return "mother_call_15";
    case "emo_white_night":
      return "phil_minh_v2";
    case "age28_intro":
      return shouldBfMirror(game) ? "bf_mirror_28" : "age28_career";
    case "bf_mirror_28":
      return "age28_career";
    case "age28_startup_result":
      return "age28_post_startup";
    case "age28_post_startup":
      if (
        game.flags.startupAttempted &&
        hasMemory(game, "lover_started_22")
      ) {
        return "lover_distance_28";
      }
      return "age35_intro";
    case "minh_after_exam":
      return game.stats.knowledge >= 62 || hasMemory(game, "mentor_met")
        ? "mentor_coffee"
        : "age22_intro";
    case "age22_skill_payoff":
      return hasMemory(game, "mother_neglected") ||
        game.stats.discipline < 45
        ? "mother_remind_22"
        : "phil_rich_v2";
    case "mentor_coffee":
      return "age22_intro";
    case "lover_meet_22":
      return "phil_rich_v2";
    default:
      return fallbackNext ?? "";
  }
}

export function shouldBfMirror(game: GameState): boolean {
  return (
    hasMemory(game, "bf_game_bond_15") &&
    game.relationships.bestFriend.affinity >= 40 &&
    (game.stats.knowledge < 60 || game.stats.money < 45)
  );
}

export function resolveChoiceNext(
  choiceNext: string,
  game: GameState,
): string {
  if (choiceNext === "lover_meet_or_phil") {
    return game.stats.relationship >= 35
      ? "lover_meet_22"
      : "phil_rich_v2";
  }
  return choiceNext;
}
