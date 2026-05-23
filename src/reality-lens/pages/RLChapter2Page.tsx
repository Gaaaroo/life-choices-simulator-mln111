import { motion, AnimatePresence } from "framer-motion";
import { CHAPTER2_SCENARIOS } from "../data/scenarios";
import { RealityLensShell } from "../components/RealityLensShell";
import { useRealityLensStore } from "../store/realityLensStore";

export function RLChapter2Page() {
  const chapter2Index = useRealityLensStore((s) => s.chapter2Index);
  const chapter2Result = useRealityLensStore((s) => s.chapter2Result);
  const selectedActionId = useRealityLensStore((s) => s.selectedActionId);
  const selectChapter2Action = useRealityLensStore((s) => s.selectChapter2Action);
  const nextChapter2Scenario = useRealityLensStore((s) => s.nextChapter2Scenario);
  const finishChapter2 = useRealityLensStore((s) => s.finishChapter2);

  const scenario = CHAPTER2_SCENARIOS[chapter2Index];
  const total = CHAPTER2_SCENARIOS.length;
  const showResult = chapter2Result !== null;
  const isLast = chapter2Index >= total - 1;

  if (!scenario) return null;

  const progress =
    ((chapter2Index + (showResult ? 1 : 0.4)) / total) * 100;

  const handleContinue = () => {
    if (isLast) {
      finishChapter2();
    } else {
      nextChapter2Scenario();
    }
  };

  return (
    <RealityLensShell>
      <header className="mb-6">
        <p className="rl-mono text-xs tracking-[0.25em] text-cyan-400">
          CHAPTER 2
        </p>
        <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">
          Khả năng – Hiện thực
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Có khả năng chưa đủ — cần điều kiện và hành động đúng.
        </p>
        <div className="rl-progress-bar mt-4 rounded-full">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="rl-mono mt-2 text-xs text-cyan-500/80">
          MÔ PHỎNG {chapter2Index + 1} / {total}
        </p>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          className="rl-hologram-card rounded-xl p-6 sm:p-8"
        >
          <p className="rl-mono text-xs text-violet-300">{scenario.title}</p>

          <div className="mt-4">
            <p className="rl-mono text-xs text-violet-300">TÌNH HUỐNG</p>
            <p className="mt-2 text-base leading-relaxed text-white sm:text-lg">
              {scenario.situation}
            </p>
          </div>

          <div className="mt-6 rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-4">
            <p className="rl-mono text-xs font-bold text-cyan-300">
              KHẢ NĂNG HIỆN CÓ
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Những gì nhân vật đã có — chưa phải hiện thực.
            </p>
            <ul className="mt-3 space-y-1.5">
              {scenario.capabilities.map((c) => (
                <li
                  key={c}
                  className="flex gap-2 text-sm text-slate-300"
                >
                  <span className="rl-mono shrink-0 text-cyan-500">▸</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 rounded-lg border border-amber-500/25 bg-amber-950/15 p-4">
            <p className="rl-mono text-xs font-bold text-amber-300/90">
              ĐIỀU KIỆN CÒN THIẾU
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Khả năng → hiện thực chỉ khi các điều kiện này được đáp ứng.
            </p>
            <ul className="mt-3 space-y-1.5">
              {scenario.conditionsNeeded.map((c) => (
                <li
                  key={c}
                  className="flex gap-2 text-sm text-slate-400"
                >
                  <span className="rl-mono shrink-0 text-amber-500">○</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {!showResult && (
            <div className="mt-8">
              <p className="rl-mono mb-1 text-xs text-slate-500">
                CHỌN HÀNH ĐỘNG — MÔ PHỎNG KẾT QUẢ
              </p>
              <p className="mb-4 text-sm text-slate-400">
                Hành động nào giúp biến khả năng thành hiện thực?
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {scenario.actions.map((action, i) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() =>
                      selectChapter2Action(
                        scenario.id,
                        action.id,
                        action.isCorrect,
                      )
                    }
                    className="rounded-lg border border-cyan-500/25 bg-slate-900/60 p-4 text-left transition hover:border-cyan-400 hover:bg-cyan-950/40"
                  >
                    <span className="rl-mono text-xs text-violet-400">
                      OPTION {i + 1}
                    </span>
                    <p className="mt-1 font-semibold text-white">
                      {action.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      {action.description}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <AnimatePresence>
            {showResult && (
              <motion.div
                key={chapter2Result}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mt-8 rounded-lg border p-6 ${
                  chapter2Result === "success"
                    ? "border-cyan-400/50 bg-cyan-950/30"
                    : "rl-fail-pulse border-red-500/40 bg-red-950/20"
                }`}
              >
                {chapter2Result === "success" ? (
                  <>
                    <motion.p
                      className="rl-mono text-center text-sm font-bold tracking-widest text-cyan-300"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      POTENTIAL → REALITY
                    </motion.p>
                    <div className="my-4 flex justify-center gap-2">
                      {[0, 1, 2].map((n) => (
                        <motion.span
                          key={n}
                          className="h-2 w-8 rounded bg-gradient-to-r from-violet-500 to-cyan-400"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: n * 0.2, duration: 0.5 }}
                        />
                      ))}
                    </div>
                    <p className="text-center text-sm leading-relaxed text-cyan-100">
                      {scenario.successMessage}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="rl-mono text-center text-sm font-bold text-red-400">
                      POTENTIAL STAYS POTENTIAL
                    </p>
                    <p className="rl-mono mt-4 text-center text-xs text-red-300/80">
                      ░░ THIẾU ĐIỀU KIỆN / HÀNH ĐỘNG ░░
                    </p>
                    <p className="mt-4 text-center text-sm leading-relaxed text-slate-400">
                      {scenario.failMessage}
                    </p>
                  </>
                )}

                <div className="mt-8 rounded-lg border border-violet-500/20 bg-slate-900/50 p-4">
                  <p className="rl-mono text-xs text-violet-300">TRIẾT HỌC</p>
                  <p className="mt-2 text-xs text-slate-400">
                    <span className="text-cyan-300">Khả năng:</span>{" "}
                    {scenario.philosophy.potential}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    <span className="text-violet-300">Hiện thực:</span>{" "}
                    {scenario.philosophy.reality}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {scenario.philosophy.insight}
                  </p>
                </div>

                {selectedActionId && (
                  <p className="rl-mono mt-4 text-center text-[10px] text-slate-600">
                    ACTION LOG: {selectedActionId.toUpperCase()}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleContinue}
                  className="rl-btn-primary rl-mono mx-auto mt-8 block rounded-lg px-8 py-3 text-xs"
                >
                  {isLast ? "XEM KẾT LUẬN" : "MÔ PHỎNG TIẾP THEO →"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </RealityLensShell>
  );
}
