import { create } from "zustand";

export type AppMode = "menu" | "life-choices" | "reality-lens";

type AppStore = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  goToMenu: () => void;
};

export const useAppStore = create<AppStore>((set) => ({
  mode: "menu",
  setMode: (mode) => set({ mode }),
  goToMenu: () => set({ mode: "menu" }),
}));
