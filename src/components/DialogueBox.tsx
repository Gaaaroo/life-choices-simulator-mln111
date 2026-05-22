import type { ReactNode } from "react";
import { NPC_DISPLAY } from "../data/npcNames";
import type { NpcId } from "../types/game";

type Props = {
  npcId: NpcId;
  children: ReactNode;
};

export function DialogueBox({ npcId, children }: Props) {
  return (
    <div className="mb-4 rounded-xl border-l-4 border-accent bg-cream/80 px-4 py-3">
      <p className="text-xs font-bold text-teal-deep">{NPC_DISPLAY[npcId]}</p>
      <div className="mt-1 text-sm leading-relaxed text-slate-800">
        {children}
      </div>
    </div>
  );
}
