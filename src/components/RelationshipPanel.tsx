import { NPC_DISPLAY } from "../data/npcNames";
import type { GameState, NpcId } from "../types/game";

const NPC_ORDER: NpcId[] = [
  "bestFriend",
  "minh",
  "mother",
  "lover",
  "mentor",
];

const ICONS: Record<NpcId, string> = {
  bestFriend: "🤝",
  minh: "👤",
  mother: "❤️",
  lover: "💕",
  mentor: "⭐",
};

type Props = {
  relationships: GameState["relationships"];
};

export function RelationshipPanel({ relationships }: Props) {
  return (
    <aside className="rounded-2xl bg-white/80 p-3 shadow-md backdrop-blur-sm">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-teal-deep">
        Quan hệ
      </h3>
      <ul className="space-y-2">
        {NPC_ORDER.map((id) => {
          const npc = relationships[id];
          if (id === "lover" || id === "mentor") {
            if (npc.affinity < 15 && npc.trust < 15) return null;
          }
          return (
            <li key={id}>
              <div className="flex justify-between text-xs text-slate-600">
                <span>
                  {ICONS[id]} {NPC_DISPLAY[id]}
                </span>
                <span>{npc.affinity}</span>
              </div>
              <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-accent/80 transition-all"
                  style={{ width: `${npc.affinity}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
