import { computeAnalysis } from "../engine/computeAnalysis";
import { useAppStore } from "../store/appStore";
import { useGameStore } from "../store/gameStore";

export function AnalysisPage() {
  const game = useGameStore((s) => s.game);
  const resetAll = useGameStore((s) => s.resetAll);
  const goToMenu = useAppStore((s) => s.goToMenu);
  const analysis = computeAnalysis(game);

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 py-10">
      <h1 className="text-center text-2xl font-bold text-teal-deep">
        Những gì bạn để lại
      </h1>
      <p className="mt-2 text-center text-sm text-slate-500">
        Không có đáp án đúng — chỉ có những gì bạn chọn.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl bg-white/90 p-6 shadow-lg">
        <div>
          <p className="text-sm text-slate-600">Độ sâu nhận thức (ẩn):</p>
          <p className="text-3xl font-bold text-teal-deep">
            {analysis.insightDepth}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Mỗi lần bạn hỏi thêm thay vì kết luận vội.
          </p>
        </div>

        <hr className="border-slate-200" />

        <div>
          <p className="mb-2 font-semibold text-teal-deep">
            Khả năng đã mở (có thể chưa thành hiện thực):
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-700">
            {analysis.possibilities.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <hr className="border-slate-200" />

        <div>
          <p className="mb-2 font-semibold text-teal-deep">Tự hỏi:</p>
          <ul className="space-y-2 text-sm italic text-slate-600">
            {analysis.reflectionQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={resetAll}
          className="rounded-xl border-2 border-teal-deep px-8 py-3 font-semibold text-teal-deep hover:bg-teal-deep hover:text-white"
        >
          Chơi lại từ đầu
        </button>
        <button
          type="button"
          onClick={goToMenu}
          className="rounded-xl px-8 py-3 text-sm text-slate-500 hover:text-teal-deep"
        >
          Menu chính
        </button>
      </div>
    </div>
  );
}
