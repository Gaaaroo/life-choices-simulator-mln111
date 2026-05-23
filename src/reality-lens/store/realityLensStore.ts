import { create } from "zustand";

export type RealityLensPhase =
  | "landing"
  | "intro"
  | "chapter1"
  | "chapter2"
  | "conclusion";

export type Chapter2Result = "success" | "fail" | null;

export type Chapter1Answer = {
  scenarioId: string;
  guessId: string;
  correct: boolean;
};

export type Chapter2Answer = {
  scenarioId: string;
  actionId: string;
  success: boolean;
};

type RealityLensStore = {
  phase: RealityLensPhase;
  scenarioIndex: number;
  revealed: boolean;
  chapter1Answers: Chapter1Answer[];
  chapter2Index: number;
  chapter2Result: Chapter2Result;
  chapter2Results: Chapter2Answer[];
  selectedActionId: string | null;

  reset: () => void;
  setPhase: (phase: RealityLensPhase) => void;
  goToChapterSelect: () => void;
  startChapter1: () => void;
  startChapter2: () => void;
  revealScenario: (answer: Chapter1Answer) => void;
  nextScenario: () => void;
  finishChapter1: () => void;
  selectChapter2Action: (
    scenarioId: string,
    actionId: string,
    isCorrect: boolean,
  ) => void;
  nextChapter2Scenario: () => void;
  finishChapter2: () => void;
};

const INITIAL = {
  phase: "intro" as RealityLensPhase,
  scenarioIndex: 0,
  revealed: false,
  chapter1Answers: [] as Chapter1Answer[],
  chapter2Index: 0,
  chapter2Result: null as Chapter2Result,
  chapter2Results: [] as Chapter2Answer[],
  selectedActionId: null as string | null,
};

export const useRealityLensStore = create<RealityLensStore>((set, get) => ({
  ...INITIAL,

  reset: () => set({ ...INITIAL }),

  setPhase: (phase) => set({ phase }),

  goToChapterSelect: () => set({ phase: "intro" }),

  startChapter1: () =>
    set({
      phase: "chapter1",
      scenarioIndex: 0,
      revealed: false,
      chapter1Answers: [],
    }),

  startChapter2: () =>
    set({
      phase: "chapter2",
      chapter2Index: 0,
      chapter2Result: null,
      chapter2Results: [],
      selectedActionId: null,
    }),

  revealScenario: (answer) =>
    set({
      revealed: true,
      chapter1Answers: [...get().chapter1Answers, answer],
    }),

  nextScenario: () => {
    const { scenarioIndex } = get();
    set({
      scenarioIndex: scenarioIndex + 1,
      revealed: false,
    });
  },

  finishChapter1: () => set({ phase: "conclusion" }),

  selectChapter2Action: (scenarioId, actionId, isCorrect) =>
    set({
      selectedActionId: actionId,
      chapter2Result: isCorrect ? "success" : "fail",
      chapter2Results: [
        ...get().chapter2Results,
        { scenarioId, actionId, success: isCorrect },
      ],
    }),

  nextChapter2Scenario: () =>
    set({
      chapter2Index: get().chapter2Index + 1,
      chapter2Result: null,
      selectedActionId: null,
    }),

  finishChapter2: () => set({ phase: "conclusion" }),
}));
