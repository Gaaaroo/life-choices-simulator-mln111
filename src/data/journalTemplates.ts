import { NPC_DISPLAY } from "./npcNames";
import type { GameState } from "../types/game";
import { hasMemory } from "../engine/hasMemory";

const TEMPLATES: Record<string, (s: GameState) => string | null> = {
  j15_game_summer: (s) =>
    hasMemory(s, "bf_game_bond_15")
      ? `Bạn dành đêm hè chơi game cùng ${NPC_DISPLAY.bestFriend}.`
      : null,
  j15_english: (s) =>
    hasMemory(s, "english_started_15")
      ? "Mùa hè đó, bạn học tiếng Anh thay vì ra phố."
      : null,
  j18_exam_fail: (s) =>
    hasMemory(s, "exam_sleep_15") && s.stats.knowledge < 70
      ? "Kỳ thi đến. Có một đêm bạn không ngủ vì game — và điểm số không đủ cho học bổng."
      : null,
  j18_exam_ok: (s) =>
    s.stats.knowledge >= 70 && hasMemory(s, "bf_borrowed_18")
      ? `Học bổng mở ra. ${NPC_DISPLAY.bestFriend} nhắn: "Còn nợ anh ly trà sữa nhé."`
      : s.stats.knowledge >= 70
        ? "Học bổng mở ra — nhưng kỳ thi không ít căng thẳng."
        : null,
  j28_startup_room: (s) =>
    s.flags.startupAttempted
      ? "Startup bắt đầu trong căn phòng trọ nhỏ."
      : null,
  j28_bf_mirror: (s) =>
    hasMemory(s, "bf_game_bond_15") &&
    s.relationships.bestFriend.status === "success"
      ? `${NPC_DISPLAY.bestFriend} thành công. Bạn vẫn đang tìm hướng đi.`
      : null,
  j35_family_void: (s) =>
    hasMemory(s, "mother_neglected") && s.stats.money >= 60
      ? "Bạn có tiền, nhưng ít khi gọi về nhà."
      : null,
  j35_bf_invest: (s) =>
    hasMemory(s, "bf_borrowed_18") &&
    s.relationships.bestFriend.affinity >= 50
      ? `${NPC_DISPLAY.bestFriend} nhắc lại khoản tiền năm 18 — lần này là cơ hội, không phải nợ.`
      : null,
};

export function renderJournalTemplate(
  templateId: string,
  state: GameState,
): string | null {
  return TEMPLATES[templateId]?.(state) ?? null;
}

export function collectLifeJournal(state: GameState): typeof state.lifeJournal {
  const entries = [...state.lifeJournal];
  const ages: Record<string, number> = {
    j15_game_summer: 15,
    j15_english: 15,
    j18_exam_fail: 18,
    j18_exam_ok: 18,
    j28_startup_room: 28,
    j28_bf_mirror: 28,
    j35_family_void: 35,
    j35_bf_invest: 35,
  };

  for (const [id, age] of Object.entries(ages)) {
    if (entries.some((e) => e.templateId === id)) continue;
    const text = renderJournalTemplate(id, state);
    if (text) entries.push({ age, text, templateId: id });
  }

  return entries.sort((a, b) => a.age - b.age);
}
