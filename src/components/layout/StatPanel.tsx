import type { Stats } from "../../types/game";

const STAT_LABELS: Record<keyof Stats, { label: string; icon: string }> = {
  knowledge: { label: "Kiến thức", icon: "🎓" },
  health: { label: "Sức khỏe", icon: "❤️" },
  money: { label: "Tiền", icon: "💰" },
  relationship: { label: "Quan hệ", icon: "🤝" },
  discipline: { label: "Kỷ luật", icon: "⭐" },
};

type Props = {
  stats: Stats;
  age?: number;
};

export function StatPanel({ stats, age }: Props) {
  return (
    <aside className="rounded-2xl bg-white/80 p-4 shadow-md backdrop-blur-sm">
      {age !== undefined && (
        <p className="mb-3 text-sm font-semibold text-teal-deep">
          Tuổi: <span className="text-lg">{age}</span>
        </p>
      )}
      <ul className="space-y-2.5">
        {(Object.keys(STAT_LABELS) as (keyof Stats)[]).map((key) => (
          <li key={key}>
            <div className="mb-0.5 flex justify-between text-xs font-medium text-slate-600">
              <span>
                {STAT_LABELS[key].icon} {STAT_LABELS[key].label}
              </span>
              <span>{stats[key]}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-teal-mid transition-all duration-500"
                style={{
                  width: `${Math.min(100, key === "money" ? stats[key] / 10 : stats[key])}%`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
