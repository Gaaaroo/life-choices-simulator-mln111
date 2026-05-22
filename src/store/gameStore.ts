import { create } from "zustand";
import { collectLifeJournal } from "../data/journalTemplates";
import { resolveEnding, type EndingResult } from "../data/endings";
import { createInitialGameState } from "../data/initialState";
import { applyChoice } from "../engine/applyChoice";
import { hasMemory } from "../engine/hasMemory";
import { renderJournalTemplate } from "../data/journalTemplates";
import { resolveChoiceNext, resolveNarrativeNext } from "../engine/resolveNextScene";
import type { ImageKey } from "../constants/images";
import type { AppScreen, GameState } from "../types/game";
import type { Choice } from "../types/story";
import { getSceneById } from "./selectors";

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
  innerMonologue: string | null;
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
        ? "Startup vượt qua giai đoạn khó — không phải vì may."
        : "Startup dừng lại — khả năng có, điều kiện chưa đủ.",
    ],
  };
}

function onEnterScene(game: GameState, sceneId: string): GameState {
  let g = game;

  if (sceneId === "bf_mirror_28") {
    g = {
      ...g,
      relationships: {
        ...g.relationships,
        bestFriend: {
          ...g.relationships.bestFriend,
          status: "success",
          affinity: Math.min(100, g.relationships.bestFriend.affinity + 5),
        },
      },
    };
    if (!g.lifeJournal.some((e) => e.templateId === "j28_bf_mirror")) {
      g = {
        ...g,
        lifeJournal: [
          ...g.lifeJournal,
          {
            age: 28,
            text: "Khang thành công. Bạn vẫn đang tìm hướng đi.",
            templateId: "j28_bf_mirror",
          },
        ],
      };
    }
  }

  if (sceneId === "age18_intro") {
    const failText = renderJournalTemplate("j18_exam_fail", g);
    if (
      failText &&
      !g.lifeJournal.some((e) => e.templateId === "j18_exam_fail")
    ) {
      g = {
        ...g,
        lifeJournal: [
          ...g.lifeJournal,
          { age: 18, text: failText, templateId: "j18_exam_fail" },
        ],
      };
    }
  }

  if (sceneId === "age28_intro" && hasMemory(g, "english_started_15")) {
    g = {
      ...g,
      journal: [
        ...g.journal,
        "Một email remote — tiếng Anh mùa hè giờ có giá.",
      ],
    };
  }

  return g;
}

function navigateTo(
  game: GameState,
  sceneId: string,
  portraitKey: ImageKey,
): { game: GameState; portraitKey: ImageKey } {
  const entered = onEnterScene(
    { ...game, currentSceneId: sceneId },
    sceneId,
  );
  const scene = getSceneById(sceneId);
  return {
    game: entered,
    portraitKey: scene?.image ?? portraitKey,
  };
}

export const useGameStore = create<GameStore>((set, get) => ({
  screen: "home",
  game: createInitialGameState(),
  portraitKey: "idle",
  lastFeedback: [],
  innerMonologue: null,
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
      innerMonologue: null,
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
      innerMonologue: null,
      philosophyReveal: null,
      pendingNextSceneId: null,
      startupMessage: null,
    });
  },

  continueNarrative: () => {
    const scene = getSceneById(get().game.currentSceneId);
    if (!scene) return;

    if (scene.id === "home") {
      get().startGame();
      return;
    }

    let game = get().game;
    let portraitKey = get().portraitKey;
    let startupMessage = get().startupMessage;

    if (scene.id === "age28_startup_result" && game.flags.startupAttempted) {
      game = resolveStartup(game);
      startupMessage = game.flags.startupSuccess
        ? "Khang nhắn: \"Đúng là khó — nhưng mày làm được.\" Còn startup — mày cũng làm được."
        : "Tiền cạn. Team tan. Bạn ngồi trong phòng trọ — 28 tuổi, không biết bước tiếp.";
      portraitKey = game.flags.startupSuccess ? "successVest" : "sad";
    }

    const dynamicNext = resolveNarrativeNext(
      scene.id,
      game,
      scene.next,
    );
    const nextId = dynamicNext || scene.next;
    if (!nextId) return;

    if (nextId === "analysis") {
      get().goToAnalysis();
      return;
    }

    const nav = navigateTo(game, nextId, portraitKey);
    set({
      game: nav.game,
      portraitKey: nav.portraitKey,
      startupMessage,
      lastFeedback: [],
      innerMonologue: null,
    });
  },

  selectChoice: (choice: Choice) => {
    const scene = getSceneById(get().game.currentSceneId);
    if (!scene) return;

    const nextId = resolveChoiceNext(choice.next, get().game);
    const { game, innerMonologue } = applyChoice(get().game, scene, choice);
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
        innerMonologue,
        philosophyReveal: reveal,
        pendingNextSceneId: nextId,
      });
      return;
    }

    if (nextId === "ending") {
      set({
        game,
        portraitKey,
        lastFeedback: choice.feedback ?? [],
        innerMonologue,
        philosophyReveal: null,
        pendingNextSceneId: null,
      });
      get().goToEnding();
      return;
    }

    const nav = navigateTo(game, nextId, portraitKey);
    set({
      game: nav.game,
      portraitKey: nav.portraitKey,
      lastFeedback: choice.feedback ?? [],
      innerMonologue,
      philosophyReveal: null,
      pendingNextSceneId: null,
    });
  },

  dismissPhilosophy: () => {
    const nextId = get().pendingNextSceneId;
    if (!nextId) return;
    const resolved = resolveChoiceNext(nextId, get().game);
    const nav = navigateTo(get().game, resolved, get().portraitKey);
    set({
      game: nav.game,
      portraitKey: nav.portraitKey,
      philosophyReveal: null,
      pendingNextSceneId: null,
      lastFeedback: [],
      innerMonologue: null,
    });
  },

  goToEnding: () => {
    const game = {
      ...get().game,
      lifeJournal: collectLifeJournal(get().game),
    };
    const ending = resolveEnding(game);
    set({
      screen: "ending",
      game,
      ending,
      portraitKey: ending.image,
    });
  },

  goToAnalysis: () => {
    set({ screen: "analysis" });
  },
}));
