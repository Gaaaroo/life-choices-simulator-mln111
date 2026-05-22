import { sceneMap } from "../data/story";
import { checkConditions } from "../engine/checkConditions";
import type { GameState } from "../types/game";
import type { Choice, Scene } from "../types/story";

export function getSceneById(sceneId: string): Scene | undefined {
  return sceneMap.get(sceneId);
}

export function getVisibleChoices(
  scene: Scene | undefined,
  game: GameState,
): Choice[] {
  if (!scene?.choices) return [];
  return scene.choices.filter((c) => checkConditions(game, c.conditions));
}
