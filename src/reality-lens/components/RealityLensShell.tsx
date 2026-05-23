import type { ReactNode } from "react";
import { ScanBackground } from "./ScanBackground";
import { useRealityLensStore } from "../store/realityLensStore";
import "../reality-lens.css";

type Props = {
  children: ReactNode;
  showChapterBack?: boolean;
};

export function RealityLensShell({
  children,
  showChapterBack = true,
}: Props) {
  const goToChapterSelect = useRealityLensStore((s) => s.goToChapterSelect);
  const phase = useRealityLensStore((s) => s.phase);

  const inChapter = phase === "chapter1" || phase === "chapter2";

  return (
    <div className="reality-lens-root relative">
      <ScanBackground />
      <div className="relative z-10 mx-auto min-h-screen max-w-3xl px-4 py-8 sm:py-12">
        {showChapterBack && inChapter && (
          <div className="mb-6">
            <button
              type="button"
              onClick={goToChapterSelect}
              className="rl-btn-ghost rl-mono rounded px-3 py-1.5 text-xs transition hover:border-violet-400/50 hover:text-violet-300"
            >
              ← CHỌN CHAPTER
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
