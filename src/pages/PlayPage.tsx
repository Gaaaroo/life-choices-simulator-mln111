import { useMemo } from "react";
import { CharacterPortrait } from "../components/CharacterPortrait";
import { ChoiceList } from "../components/ChoiceList";
import { EffectFeedback } from "../components/EffectFeedback";
import { JournalPanel } from "../components/JournalPanel";
import { PhilosophyPopup } from "../components/PhilosophyPopup";
import { GameLayout } from "../components/layout/GameLayout";
import { StatPanel } from "../components/layout/StatPanel";
import { getSceneById, getVisibleChoices } from "../store/selectors";
import { useGameStore } from "../store/gameStore";

export function PlayPage() {
  const currentSceneId = useGameStore((s) => s.game.currentSceneId);
  const game = useGameStore((s) => s.game);
  const portraitKey = useGameStore((s) => s.portraitKey);
  const lastFeedback = useGameStore((s) => s.lastFeedback);
  const philosophyReveal = useGameStore((s) => s.philosophyReveal);
  const startupMessage = useGameStore((s) => s.startupMessage);
  const continueNarrative = useGameStore((s) => s.continueNarrative);
  const selectChoice = useGameStore((s) => s.selectChoice);
  const dismissPhilosophy = useGameStore((s) => s.dismissPhilosophy);

  const scene = useMemo(
    () => getSceneById(currentSceneId),
    [currentSceneId],
  );

  const choices = useMemo(
    () => getVisibleChoices(scene, game),
    [scene, game],
  );

  if (!scene) {
    return (
      <p className="p-8 text-center text-red-600">
        Không tìm thấy scene: {currentSceneId}
      </p>
    );
  }

  const isNarrative = scene.type === "narrative";
  const narrativeText =
    scene.id === "age28_startup_result" && startupMessage
      ? `${scene.text}\n\n${startupMessage}`
      : scene.text;

  return (
    <>
      {philosophyReveal && (
        <PhilosophyPopup
          reveal={philosophyReveal}
          onClose={dismissPhilosophy}
        />
      )}

      <GameLayout
        header={
          <h1 className="text-center text-xl font-bold text-teal-deep sm:text-2xl">
            Life Choices
          </h1>
        }
        stats={<StatPanel stats={game.stats} age={scene.age} />}
        portrait={<CharacterPortrait imageKey={portraitKey} />}
        journal={<JournalPanel entries={game.journal} />}
      >
        <div className="rounded-2xl bg-white/90 p-5 shadow-md">
          <p className="whitespace-pre-line text-base leading-relaxed text-slate-800">
            {narrativeText}
          </p>

          <div className="mt-4">
            <EffectFeedback items={lastFeedback} />
          </div>

          {isNarrative && scene.next && (
            <button
              type="button"
              onClick={continueNarrative}
              className="mt-6 w-full rounded-xl bg-teal-deep py-3 font-semibold text-white hover:bg-teal-mid sm:w-auto sm:px-10"
            >
              Tiếp tục
            </button>
          )}

          {!isNarrative && choices.length > 0 && (
            <div className="mt-6">
              <ChoiceList
                choices={choices}
                onSelect={selectChoice}
                disabled={!!philosophyReveal}
              />
            </div>
          )}

          {!isNarrative && choices.length === 0 && (
            <p className="mt-4 text-sm text-red-600">
              Không có lựa chọn khả dụng.
            </p>
          )}
        </div>

        <div className="mt-4 lg:hidden">
          <JournalPanel entries={game.journal} />
        </div>
      </GameLayout>
    </>
  );
}
