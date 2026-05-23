import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHAPTER1_SCENARIOS } from "../data/scenarios";
import type { ScenarioGuess } from "../data/scenarios";
import { RealityLensShell } from "../components/RealityLensShell";
import { useRealityLensStore } from "../store/realityLensStore";

export function RLChapter1Page() {
  const scenarioIndex = useRealityLensStore((s) => s.scenarioIndex);
  const revealed = useRealityLensStore((s) => s.revealed);
  const revealScenario = useRealityLensStore((s) => s.revealScenario);
  const nextScenario = useRealityLensStore((s) => s.nextScenario);
  const finishChapter1 = useRealityLensStore((s) => s.finishChapter1);
  const [selectedGuessId, setSelectedGuessId] = useState<string | null>(null);
  const [glitch, setGlitch] = useState(false);

  const scenario = CHAPTER1_SCENARIOS[scenarioIndex];
  const total = CHAPTER1_SCENARIOS.length;
  const progress =
    ((scenarioIndex + (revealed ? 1 : selectedGuessId ? 0.75 : 0.35)) / total) *
    100;

  const selectedGuess: ScenarioGuess | undefined = useMemo(
    () => scenario?.guesses.find((g) => g.id === selectedGuessId),
    [scenario, selectedGuessId],
  );

  useEffect(() => {
    setSelectedGuessId(null);
  }, [scenarioIndex]);

  if (!scenario) return null;

  const handleReveal = () => {
    if (!selectedGuess) return;
    setGlitch(true);
    revealScenario({
      scenarioId: scenario.id,
      guessId: selectedGuess.id,
      correct: selectedGuess.isCorrect,
    });
    window.setTimeout(() => setGlitch(false), 400);
  };

  const handleNext = () => {
    if (scenarioIndex >= total - 1) {
      finishChapter1();
    } else {
      nextScenario();
    }
  };

  return (
    <RealityLensShell>
      <header className="mb-6">
        <p className="rl-mono text-xs tracking-[0.25em] text-violet-400">
          CHAPTER 1
        </p>
        <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">
          Bản chất – Hiện tượng
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Đọc kỹ manh mối — chỉ một suy đoán chạm đúng bản chất.
        </p>
        <div className="rl-progress-bar mt-4 rounded-full">
          <span style={{ width: `${progress}%` }} />
        </div>
        <p className="rl-mono mt-2 text-xs text-cyan-500/80">
          SCENARIO {scenarioIndex + 1} / {total}
        </p>
      </header>

      {!revealed && (
        <div className="rl-mono mb-4 rounded-lg border border-cyan-500/20 bg-cyan-950/20 px-4 py-3 text-xs text-cyan-200/90">
          <span className="text-cyan-400">①</span> Đọc hiện tượng + manh mối
          &nbsp;→&nbsp;
          <span className="text-cyan-400">②</span> Chọn suy đoán (có đúng / sai)
          &nbsp;→&nbsp;
          <span className="text-cyan-400">③</span> Quét bản chất
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={scenario.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={`rl-hologram-card rounded-xl p-6 sm:p-8 ${glitch ? "rl-glitch" : ""}`}
        >
          <p className="rl-mono text-xs text-violet-300/90">{scenario.title}</p>

          <p className="rl-mono mt-4 text-xs font-bold tracking-widest text-fuchsia-400">
            HIỆN TƯỢNG — NHỮNG GÌ BẠN NHÌN THẤY
          </p>
          <div className="mt-3 rounded-lg border border-fuchsia-500/25 bg-fuchsia-950/20 p-4">
            <p className="text-sm leading-relaxed text-white sm:text-base">
              {scenario.phenomenon}
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-slate-600/40 bg-slate-900/50 p-4">
            <p className="rl-mono text-xs font-bold text-amber-300/90">
              MANH MỐI — ĐỌC TRƯỚC KHI SUY ĐOÁN
            </p>
            <ul className="mt-3 space-y-2">
              {scenario.clues.map((clue) => (
                <li
                  key={clue}
                  className="flex gap-2 text-sm leading-relaxed text-slate-300"
                >
                  <span className="rl-mono shrink-0 text-cyan-500">›</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          {!revealed && (
            <div className="mt-8">
              <p className="text-sm font-medium text-slate-200">
                {scenario.question}
              </p>
              <p className="rl-mono mt-1 text-xs text-slate-500">
                Một lựa chọn đúng bản chất · các lựa chọn khác chỉ dừng ở hiện
                tượng hoặc đoán sai
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {scenario.guesses.map((g) => {
                  const active = selectedGuessId === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGuessId(g.id)}
                      className={`rounded-lg border px-4 py-3 text-left text-sm transition ${
                        active
                          ? "border-cyan-400 bg-cyan-950/50 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                          : "border-slate-600/50 text-slate-300 hover:border-violet-400/50 hover:bg-violet-950/30"
                      }`}
                    >
                      {active && (
                        <span className="rl-mono mb-1 block text-[10px] text-cyan-400">
                          ĐÃ CHỌN
                        </span>
                      )}
                      {g.label}
                    </button>
                  );
                })}
              </div>

              {selectedGuess && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 rounded-lg bg-slate-900/60 p-3 text-sm text-slate-400"
                >
                  Bạn chọn: &ldquo;{selectedGuess.label}&rdquo;. Quét để biết
                  đúng hay chỉ chạm hiện tượng.
                </motion.p>
              )}

              <button
                type="button"
                onClick={handleReveal}
                disabled={!selectedGuess}
                className="rl-btn-primary rl-mono mt-6 w-full rounded-lg py-3 text-xs disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-8"
              >
                {selectedGuess ? "QUÉT BẢN CHẤT" : "CHỌN SUY ĐOÁN TRƯỚC"}
              </button>
            </div>
          )}

          {revealed && selectedGuess && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-6 rounded-lg border p-4 ${
                  selectedGuess.isCorrect
                    ? "border-emerald-500/40 bg-emerald-950/30"
                    : "border-red-500/40 bg-red-950/25"
                }`}
              >
                <p
                  className={`rl-mono text-xs font-bold ${
                    selectedGuess.isCorrect
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {selectedGuess.isCorrect
                    ? "✓ SUY ĐOÁN ĐÚNG BẢN CHẤT"
                    : "✗ SUY ĐOÁN CHƯA ĐÚNG"}
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  &ldquo;{selectedGuess.label}&rdquo;
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {selectedGuess.feedback}
                </p>
              </motion.div>

              <motion.div
                initial={{ filter: "blur(8px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mt-6"
              >
                <div className="my-4 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
                <p className="rl-mono text-xs font-bold tracking-widest text-cyan-300">
                  BẢN CHẤT — SAU KHI QUÉT
                </p>
                <div className="mt-3 rounded-lg border border-cyan-400/40 bg-cyan-950/30 p-4">
                  <p className="text-base leading-relaxed text-cyan-50">
                    {scenario.essence}
                  </p>
                </div>
              </motion.div>

              {!selectedGuess.isCorrect && (
                <p className="rl-mono mt-4 text-xs text-violet-300/80">
                  Gợi ý: Đáp án đúng — &ldquo;
                  {scenario.guesses.find((g) => g.isCorrect)?.label}&rdquo;
                </p>
              )}

              <div className="mt-8 rounded-lg border border-violet-500/30 bg-violet-950/30 p-4">
                <p className="rl-mono text-xs text-violet-300">TRIẾT HỌC</p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="text-fuchsia-300">Hiện tượng:</span>{" "}
                  {scenario.philosophy.phenomenon}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  <span className="text-cyan-300">Bản chất:</span>{" "}
                  {scenario.philosophy.essence}
                </p>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="rl-btn-primary rl-mono mt-8 rounded-lg px-8 py-3 text-xs"
              >
                {scenarioIndex >= total - 1
                  ? "HOÀN THÀNH CHAPTER 1"
                  : "SCENARIO TIẾP THEO →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </RealityLensShell>
  );
}
