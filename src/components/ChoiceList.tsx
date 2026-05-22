import type { Choice } from "../types/story";

type Props = {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  disabled?: boolean;
};

export function ChoiceList({ choices, onSelect, disabled }: Props) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {choices.map((choice, i) => (
        <button
          key={choice.id}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(choice)}
          className="rounded-xl border-2 border-teal-mid/30 bg-white px-4 py-3 text-left text-sm font-medium text-slate-800 shadow-sm transition hover:border-accent hover:bg-cream disabled:opacity-50"
        >
          <span className="mr-2 font-bold text-teal-deep">{labels[i]}</span>
          {choice.label}
        </button>
      ))}
    </div>
  );
}
