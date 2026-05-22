import type { ChoiceRecord } from "../types/game";

type Props = {
  history: ChoiceRecord[];
};

export function EndingTimeline({ history }: Props) {
  if (history.length === 0) return null;

  return (
    <div className="rounded-2xl bg-white/80 p-4 shadow-md">
      <h3 className="mb-3 font-bold text-teal-deep">Timeline</h3>
      <ol className="relative space-y-3 border-l-2 border-teal-mid/40 pl-4">
        {history.map((item, i) => (
          <li key={`${item.sceneId}-${item.choiceId}-${i}`} className="text-sm">
            {item.age !== undefined && (
              <span className="font-semibold text-accent">{item.age} tuổi — </span>
            )}
            {item.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
