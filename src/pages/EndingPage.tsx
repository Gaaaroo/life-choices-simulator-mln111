import { CharacterPortrait } from "../components/CharacterPortrait";
import { LifeJournal } from "../components/LifeJournal";
import { StatPanel } from "../components/layout/StatPanel";
import { useGameStore } from "../store/gameStore";

export function EndingPage() {
  const game = useGameStore((s) => s.game);
  const ending = useGameStore((s) => s.ending);
  const goToAnalysis = useGameStore((s) => s.goToAnalysis);

  if (!ending) return null;

  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-8">
      <h1 className="text-center text-2xl font-bold text-teal-deep">
        Một chương kết
      </h1>
      <p className="mt-2 text-center text-slate-600">Bạn trở thành:</p>
      <h2 className="mt-1 text-center text-xl font-semibold text-accent">
        {ending.title}
      </h2>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <CharacterPortrait imageKey={ending.image} />
        <div className="space-y-4">
          <StatPanel stats={game.stats} age={35} />
          <p className="rounded-xl bg-white/90 p-4 text-sm leading-relaxed text-slate-700 shadow">
            {ending.description}
          </p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-white/90 p-6 shadow-md">
        <h3 className="mb-4 font-bold text-teal-deep">Nhật ký cuộc đời</h3>
        <LifeJournal entries={game.lifeJournal} />
      </div>

      <div className="mt-8 text-center">
        <button
          type="button"
          onClick={goToAnalysis}
          className="rounded-xl bg-teal-deep px-8 py-3 font-semibold text-white hover:bg-teal-mid"
        >
          Nhìn lại
        </button>
      </div>
    </div>
  );
}
