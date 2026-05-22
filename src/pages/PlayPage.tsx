import { useMemo } from "react";
import { CharacterPortrait } from "../components/CharacterPortrait";
import { ChoiceList } from "../components/ChoiceList";
import { DialogueBox } from "../components/DialogueBox";
import { EffectFeedback } from "../components/EffectFeedback";
import { JournalPanel } from "../components/JournalPanel";
import { PhilosophyPopup } from "../components/PhilosophyPopup";
import { RelationshipPanel } from "../components/RelationshipPanel";
import { GameLayout } from "../components/layout/GameLayout";
import { StatPanel } from "../components/layout/StatPanel";
import { getSceneText } from "../engine/getSceneText";
import { getSceneById, getVisibleChoices } from "../store/selectors";
import { useGameStore } from "../store/gameStore";

export function PlayPage() {
  const currentSceneId = useGameStore((s) => s.game.currentSceneId);
  const game = useGameStore((s) => s.game);
  const portraitKey = useGameStore((s) => s.portraitKey);
  const lastFeedback = useGameStore((s) => s.lastFeedback);
  const innerMonologue = useGameStore((s) => s.innerMonologue);
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

  const displayText = getSceneText(scene, game);
  const isNarrative =
    scene.type === "narrative" ||
    scene.type === "emotional" ||
    scene.type === "relationship";
  const narrativeBody =
    scene.id === "age28_startup_result" && startupMessage
      ? `${displayText}\n\n${startupMessage}`
      : displayText;

  const showContinue =
    isNarrative &&
    (scene.next !== undefined || scene.id === "after_phil_minh");

  const isEmotional = scene.type === "emotional";

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
        sidePanel={
          <RelationshipPanel relationships={game.relationships} />
        }
        journal={<JournalPanel entries={game.journal} />}
      >
        <div
          className={`rounded-2xl bg-white/90 p-5 shadow-md ${isEmotional ? "border border-teal-deep/20" : ""}`}
        >
          {scene.type === "relationship" && scene.npcId ? (
            <DialogueBox npcId={scene.npcId}>
              <p className="whitespace-pre-line">{narrativeBody}</p>
            </DialogueBox>
          ) : (
            <p
              className={`whitespace-pre-line leading-relaxed text-slate-800 ${isEmotional ? "text-base sm:text-lg" : "text-base"}`}
            >
              {narrativeBody}
            </p>
          )}

          {innerMonologue && (
            <p className="mt-4 rounded-lg bg-slate-100/90 p-3 text-sm italic text-slate-600">
              {innerMonologue}
            </p>
          )}

          <div className="mt-4">
            <EffectFeedback items={lastFeedback} />
          </div>

          {showContinue && (
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
          <RelationshipPanel relationships={game.relationships} />
          <div className="mt-4">
            <JournalPanel entries={game.journal} />
          </div>
        </div>
      </GameLayout>
    </>
  );
}
