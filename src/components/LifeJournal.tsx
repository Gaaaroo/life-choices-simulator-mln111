import type { LifeJournalEntry } from "../types/game";

type Props = {
  entries: LifeJournalEntry[];
};

export function LifeJournal({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <p className="text-sm italic text-slate-500">
        Hành trình còn đang được viết...
      </p>
    );
  }

  const byAge = [...entries].sort((a, b) => a.age - b.age);

  return (
    <div className="space-y-6">
      {byAge.map((entry, i) => (
        <article
          key={`${entry.templateId ?? i}-${entry.age}`}
          className="border-l-2 border-teal-mid/50 pl-4"
        >
          <p className="text-xs font-bold text-accent">{entry.age} tuổi</p>
          <p className="mt-1 text-sm leading-relaxed text-slate-700">
            {entry.text}
          </p>
        </article>
      ))}
    </div>
  );
}
