import { motion } from "framer-motion";
import { RealityLensShell } from "../components/RealityLensShell";
import { TypingText } from "../components/TypingText";
import { useRealityLensStore } from "../store/realityLensStore";

const CONCLUSION_LINES = [
  "Reality Lens Analysis Completed.",
  "",
  "Do not judge reality only through appearances.",
  "",
  "Potential becomes reality only through action and conditions.",
];

const FINAL_MESSAGE = `Con người thường nhìn thế giới qua hiện tượng.

Nhưng bản chất mới quyết định sự vật.

Mọi khả năng đều có thể trở thành hiện thực,
nếu có đủ điều kiện và hành động đúng đắn.`;

export function RLConclusionPage() {
  const chapter2Results = useRealityLensStore((s) => s.chapter2Results);
  const chapter1Answers = useRealityLensStore((s) => s.chapter1Answers);
  const goToChapterSelect = useRealityLensStore((s) => s.goToChapterSelect);

  const ch1Correct = chapter1Answers.filter((a) => a.correct).length;
  const ch1Total = chapter1Answers.length;
  const ch2Success = chapter2Results.filter((r) => r.success).length;
  const ch2Total = chapter2Results.length;

  return (
    <RealityLensShell showChapterBack={false}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[80vh] flex-col items-center justify-center"
      >
        <p className="rl-mono text-xs tracking-[0.35em] text-cyan-400">
          ANALYSIS COMPLETE
        </p>

        <div className="rl-hologram-card mt-8 w-full max-w-lg rounded-xl p-6 sm:p-8">
          <TypingText lines={CONCLUSION_LINES} speedMs={35} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-10 max-w-lg text-center"
        >
          <p className="whitespace-pre-line text-sm leading-relaxed text-slate-300 sm:text-base">
            {FINAL_MESSAGE}
          </p>

          {ch1Total > 0 && (
            <p className="rl-mono mt-4 text-sm text-violet-300">
              Chapter 1 — Bản chất: {ch1Correct}/{ch1Total} suy đoán đúng
            </p>
          )}

          {ch2Total > 0 && (
            <p className="rl-mono mt-4 text-sm text-cyan-300">
              Chapter 2 — Khả năng → hiện thực: {ch2Success}/{ch2Total} mô
              phỏng thành công
            </p>
          )}
        </motion.div>

        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={goToChapterSelect}
            className="rl-btn-primary rl-mono rounded-lg px-8 py-3 text-xs"
          >
            CHỌN CHAPTER KHÁC
          </button>
        </div>
      </motion.div>
    </RealityLensShell>
  );
}
