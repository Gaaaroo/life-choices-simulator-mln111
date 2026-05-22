import { computeAnalysis } from "../engine/computeAnalysis";
import { useGameStore } from "../store/gameStore";

export function AnalysisPage() {
  const game = useGameStore((s) => s.game);
  const resetAll = useGameStore((s) => s.resetAll);
  const analysis = computeAnalysis(game);

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-10">
      <h1 className="text-center text-2xl font-bold text-teal-deep">
        PHÂN TÍCH
      </h1>

      <div className="mt-8 space-y-4 rounded-2xl bg-white/90 p-6 shadow-lg">
        <div>
          <p className="text-sm text-slate-600">
            Bạn thường đánh giá qua hiện tượng:
          </p>
          <p className="text-3xl font-bold text-slate-800">
            {analysis.phenomenonPercent}%
          </p>
        </div>
        <div>
          <p className="text-sm text-slate-600">
            Bạn thường tìm hiểu bản chất:
          </p>
          <p className="text-3xl font-bold text-teal-deep">
            {analysis.essencePercent}%
          </p>
        </div>

        <hr className="border-slate-200" />

        <div>
          <p className="mb-2 font-semibold text-teal-deep">
            Bạn đã mở các khả năng:
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
            {analysis.possibilities.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <p className="rounded-lg bg-teal-deep/10 p-3 text-sm italic text-teal-deep">
          Khả năng chỉ thành hiện thực khi đủ điều kiện.
        </p>
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={resetAll}
          className="rounded-xl border-2 border-teal-deep px-8 py-3 font-semibold text-teal-deep hover:bg-teal-deep hover:text-white"
        >
          Chơi lại từ đầu
        </button>
      </div>
    </div>
  );
}
