import { imageUrl } from "../constants/images";
import { useAppStore } from "../store/appStore";
import { useGameStore } from "../store/gameStore";
import { useRealityLensStore } from "../reality-lens/store/realityLensStore";

export function GameMenuPage() {
  const setMode = useAppStore((s) => s.setMode);
  const resetGame = useGameStore((s) => s.resetAll);
  const resetLens = useRealityLensStore((s) => s.reset);

  const playLifeChoices = () => {
    resetGame();
    setMode("life-choices");
  };

  const playRealityLens = () => {
    resetLens();
    setMode("reality-lens");
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-10">
      <h1 className="text-center text-3xl font-bold tracking-tight text-teal-deep sm:text-4xl">
        MLN111 — Triết học tương tác
      </h1>
      <p className="mt-2 text-center text-slate-600">
        Chọn trải nghiệm bạn muốn khám phá
      </p>

      <div className="mt-10 grid w-full max-w-2xl gap-6 sm:grid-cols-2">
        <button
          type="button"
          onClick={playLifeChoices}
          className="group flex flex-col overflow-hidden rounded-2xl border-2 border-teal-deep/20 bg-white/90 text-left shadow-lg transition hover:border-teal-deep hover:shadow-xl"
        >
          <div className="flex h-40 items-center justify-center bg-gradient-to-br from-teal-deep/10 to-cream p-4">
            <img
              src={imageUrl("idle")}
              alt=""
              className="max-h-32 object-contain transition group-hover:scale-105"
            />
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold text-teal-deep">Life Choices</h2>
            <p className="mt-1 text-sm text-slate-600">
              Simulator cuộc đời 15→35: lựa chọn, quan hệ, payoff dài hạn.
            </p>
            <p className="mt-2 text-xs font-medium text-teal-mid">
              Hiện tượng · Bản chất · Khả năng → hiện thực
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={playRealityLens}
          className="group flex flex-col overflow-hidden rounded-2xl border-2 border-violet-500/30 bg-slate-900 text-left shadow-lg transition hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]"
        >
          <div className="relative flex h-40 items-center justify-center overflow-hidden bg-gradient-to-br from-violet-950 via-slate-950 to-cyan-950 p-4">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.03)_50%)] bg-[length:100%_4px] animate-pulse" />
            <div className="relative text-center font-mono text-cyan-300">
              <p className="text-xs tracking-[0.3em] text-violet-300">
                REALITY LENS
              </p>
              <p className="mt-2 text-2xl font-bold text-white">v1.0</p>
              <p className="mt-1 text-[10px] text-cyan-400/80">
                SCAN · REVEAL · SIMULATE
              </p>
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold text-cyan-300">
              Reality Lens System
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Cyberpunk AI: quét hiện tượng, lộ bản chất, mô phỏng khả năng →
              hiện thực.
            </p>
            <p className="mt-2 text-xs font-medium text-violet-300">
              Chapter 1 & 2 · Animation · Storytelling
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
