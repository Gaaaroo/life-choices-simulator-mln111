import { motion } from "framer-motion";
import { RealityLensShell } from "../components/RealityLensShell";
import { useRealityLensStore } from "../store/realityLensStore";

export function RLIntroPage() {
  const startChapter1 = useRealityLensStore((s) => s.startChapter1);
  const startChapter2 = useRealityLensStore((s) => s.startChapter2);

  return (
    <RealityLensShell showChapterBack={false}>
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex min-h-[70vh] flex-col items-center justify-center"
      >
        <p className="rl-mono text-xs tracking-[0.3em] text-cyan-400">
          CHỌN CHƯƠNG
        </p>
        <h1 className="mt-4 text-center text-2xl font-bold text-white sm:text-3xl">
          Reality Lens
        </h1>
        <p className="rl-mono mt-4 max-w-md text-center text-sm text-slate-400">
          Mỗi chương độc lập — chọn chương bạn muốn khám phá, không cần chơi
          theo thứ tự.
        </p>

        <motion.div
          className="mt-10 grid w-full max-w-lg gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            type="button"
            onClick={startChapter1}
            className="rl-hologram-card group rounded-xl p-5 text-left transition hover:border-fuchsia-400/50"
          >
            <p className="rl-mono text-xs text-fuchsia-400">CHAPTER 1</p>
            <p className="mt-1 text-lg font-bold text-white">
              Bản chất – Hiện tượng
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Đọc manh mối, suy đoán có đúng/sai — tìm bản chất sau lớp hiện
              tượng.
            </p>
            <p className="rl-mono mt-3 text-xs text-cyan-500/80 group-hover:text-cyan-400">
              6 scenario · REVEAL · TRIẾT HỌC →
            </p>
          </button>

          <button
            type="button"
            onClick={startChapter2}
            className="rl-hologram-card group rounded-xl p-5 text-left transition hover:border-cyan-400/50"
          >
            <p className="rl-mono text-xs text-cyan-400">CHAPTER 2</p>
            <p className="mt-1 text-lg font-bold text-white">
              Khả năng – Hiện thực
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Mô phỏng sinh viên muốn thành Software Engineer — hành động quyết
              định khả năng có thành hiện thực.
            </p>
            <p className="rl-mono mt-3 text-xs text-violet-400/80 group-hover:text-violet-300">
              2 mô phỏng · SIMULATE · KẾT QUẢ →
            </p>
          </button>
        </motion.div>
      </motion.div>
    </RealityLensShell>
  );
}
