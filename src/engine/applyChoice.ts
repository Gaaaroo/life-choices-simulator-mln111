import { renderJournalTemplate } from "../data/journalTemplates";
import { NPC_DISPLAY } from "../data/npcNames";
import type { GameState } from "../types/game";
import type { Choice, Scene } from "../types/story";
import { addMemories } from "./hasMemory";
import { applyEffects } from "./applyEffects";
import { applyNpcEffects } from "./applyNpcEffects";

export type ChoiceApplyResult = {
  game: GameState;
  innerMonologue: string | null;
};

export function applyChoice(
  state: GameState,
  scene: Scene,
  choice: Choice,
): ChoiceApplyResult {
  let game = applyEffects(state, choice.effects);
  game = applyNpcEffects(game, choice.npcEffects);

  if (choice.memories?.length) {
    game = addMemories(game, choice.memories);
  }

  if (choice.flag) {
    game = {
      ...game,
      flags: { ...game.flags, [choice.flag]: true },
    };
  }

  if (choice.insightDepth) {
    game = {
      ...game,
      insight: {
        depth: game.insight.depth + choice.insightDepth,
      },
    };
  }

  if (choice.philosophy === "phenomenon" || choice.philosophy === "essence") {
    /* legacy scenes only */
  }

  if (choice.journal) {
    game = { ...game, journal: [...game.journal, choice.journal] };
  }

  if (choice.journalTemplate) {
    const text = renderJournalTemplate(choice.journalTemplate, game);
    if (text) {
      const age = scene.age ?? 0;
      game = {
        ...game,
        lifeJournal: [
          ...game.lifeJournal,
          { age, text, templateId: choice.journalTemplate },
        ],
      };
    }
  }

  game = {
    ...game,
    choiceHistory: [
      ...game.choiceHistory,
      {
        sceneId: scene.id,
        choiceId: choice.id,
        label: choice.timelineLabel ?? choice.label,
        age: scene.age,
      },
    ],
  };

  if (choice.id === "startup" || choice.flag === "startupAttempted") {
    game = addMemories(game, ["mother_neglected"]);
  }

  if (choice.id === "care_mother" || choice.id === "answer_mother") {
    game = addMemories(game, ["mother_cared"]);
  }

  return {
    game,
    innerMonologue: choice.innerMonologue ?? null,
  };
}

export function formatJournalWithNames(text: string): string {
  return text
    .replace(/\{bfName\}/g, NPC_DISPLAY.bestFriend)
    .replace(/\{minhName\}/g, NPC_DISPLAY.minh);
}
