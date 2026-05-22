import { create } from "zustand";
import { resolveEnding, type EndingResult } from "../data/endings";
import { createInitialGameState } from "../data/initialState";
import { getSceneById } from "./selectors";
import { applyEffects } from "../engine/applyEffects";
import type { ImageKey } from "../constants/images";
import type { AppScreen, GameState } from "../types/game";
import type { Choice, Scene } from "../types/story";

export type PhilosophyReveal = {
  title: string;
  text: string;
  popup: string;
};

type GameStore = {
  screen: AppScreen;
  game: GameState;
  portraitKey: ImageKey;
  lastFeedback: string[];
  philosophyReveal: PhilosophyReveal | null;
  pendingNextSceneId: string | null;
  ending: EndingResult | null;
  startupMessage: string | null;

  resetAll: () => void;
  startGame: () => void;
  continueNarrative: () => void;
  selectChoice: (choice: Choice) => void;
  dismissPhilosophy: () => void;
  goToEnding: () => void;
  goToAnalysis: () => void;
};

function resolveStartup(game: GameState): GameState {
  const skill = game.flags.learnedSkill;
  const success =
    game.stats.knowledge >= 55 &&
    game.stats.relationship >= 35 &&
    (skill || game.stats.discipline >= 50);

  return {
    ...game,
    flags: { ...game.flags, startupSuccess: success },
    journal: [
      ...game.journal,
      success
        ? "Startup của bạn vượt qua giai đoạn khó."
        : "Startup thất bại — khả năng chưa đủ điều kiện.",
    ],
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "home",
  game: createInitialGameState(),
  portraitKey: "idle",
  lastFeedback: [],
  philosophyReveal: null,
  pendingNextSceneId: null,
  ending: null,
  startupMessage: null,

  resetAll: () =>
    set({
      screen: "home",
      game: createInitialGameState(),
      portraitKey: "idle",
      lastFeedback: [],
      philosophyReveal: null,
      pendingNextSceneId: null,
      ending: null,
      startupMessage: null,
    }),

  startGame: () => {
    const game = createInitialGameState();
    game.currentSceneId = "age15_intro";
    set({
      screen: "play",
      game,
      portraitKey: "idle",
      lastFeedback: [],
      philosophyReveal: null,
      pendingNextSceneId: null,
      startupMessage: null,
    });
  },

  continueNarrative: () => {
    const scene = getSceneById(get().game.currentSceneId);
    if (!scene?.next) return;

    let game = get().game;
    let portraitKey = get().portraitKey;
    let startupMessage = get().startupMessage;

    if (scene.id === "age28_startup_result" && game.flags.startupAttempted) {
      game = resolveStartup(game);
      startupMessage = game.flags.startupSuccess
        ? "Startup thành công nhờ kỹ năng và quan hệ!"
        : "Startup thất bại — thiếu điều kiện để hiện thực hóa khả năng.";
      portraitKey = game.flags.startupSuccess ? "successVest" : "sad";
    }

    if (scene.id === "home") {
      get().startGame();
      return;
    }

    if (scene.next === "analysis") {
      get().goToAnalysis();
      return;
    }

    const nextScene = getSceneById(scene.next);
    const nextKey = nextScene?.image ?? portraitKey;

    set({
      game: { ...game, currentSceneId: scene.next },
      portraitKey: nextKey,
      startupMessage,
      lastFeedback: [],
    });
  },

  selectChoice: (choice: Choice) => {
    let game = get().game;
    const scene = getSceneById(get().game.currentSceneId);
    if (!scene) return;

    game = applyEffects(game, choice.effects);

    if (choice.flag) {
      game = {
        ...game,
        flags: { ...game.flags, [choice.flag]: true },
      };
    }

    if (choice.philosophy === "phenomenon") {
      game = {
        ...game,
        philosophy: {
          ...game.philosophy,
          phenomenon: game.philosophy.phenomenon + 1,
        },
      };
    } else if (choice.philosophy === "essence") {
      game = {
        ...game,
        philosophy: {
          ...game.philosophy,
          essence: game.philosophy.essence + 1,
        },
      };
    }

    if (choice.journal) {
      game = { ...game, journal: [...game.journal, choice.journal] };
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

    const portraitKey = choice.imageAfter ?? get().portraitKey;

    const reveal =
      choice.revealTitle && choice.revealText && choice.popup
        ? {
            title: choice.revealTitle,
            text: choice.revealText,
            popup: choice.popup,
          }
        : null;

    if (reveal) {
      set({
        game,
        portraitKey,
        lastFeedback: choice.feedback ?? [],
        philosophyReveal: reveal,
        pendingNextSceneId: choice.next,
      });
      return;
    }

    if (choice.next === "ending") {
      set({
        game,
        portraitKey,
        lastFeedback: choice.feedback ?? [],
        philosophyReveal: null,
        pendingNextSceneId: null,
      });
      get().goToEnding();
      return;
    }

    const nextScene = getSceneById(choice.next);
    set({
      game: { ...game, currentSceneId: choice.next },
      portraitKey: nextScene?.image ?? portraitKey,
      lastFeedback: choice.feedback ?? [],
      philosophyReveal: null,
      pendingNextSceneId: null,
    });
  },

  dismissPhilosophy: () => {
    const nextId = get().pendingNextSceneId;
    if (!nextId) return;
    const nextScene = getSceneById(nextId);
    set({
      game: { ...get().game, currentSceneId: nextId },
      portraitKey: nextScene?.image ?? get().portraitKey,
      philosophyReveal: null,
      pendingNextSceneId: null,
      lastFeedback: [],
    });
  },

  goToEnding: () => {
    const ending = resolveEnding(get().game);
    set({
      screen: "ending",
      ending,
      portraitKey: ending.image,
    });
  },

  goToAnalysis: () => {
    set({ screen: "analysis" });
  },
}));

export function isPlayableScene(scene: Scene): boolean {
  return scene.type !== "narrative" || Boolean(scene.next);
}
