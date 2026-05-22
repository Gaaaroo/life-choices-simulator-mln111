import { NPC_DISPLAY } from "../data/npcNames";
import type { GameState } from "../types/game";
import type { Scene } from "../types/story";
import { hasMemory } from "./hasMemory";

export function getSceneText(scene: Scene, game: GameState): string {
  switch (scene.id) {
    case "minh_after_exam":
      if (hasMemory(game, "minh_understood")) {
        return `${NPC_DISPLAY.minh} gặp bạn sau kỳ thi, ngại ngùng cảm ơn vì lần không xét người khác vội vàng.`;
      }
      if (hasMemory(game, "minh_judged_lazy")) {
        return `${NPC_DISPLAY.minh} tránh mắt bạn ở hành lang. Có lẽ lời đánh giá năm nào vẫn còn đó.`;
      }
      return `${NPC_DISPLAY.minh} đi ngang qua như không quen.`;

    case "mother_call_15":
      return `Điện thoại rung — ${NPC_DISPLAY.mother} gọi.\n\n"Mẹ chỉ muốn biết con ăn cơm chưa. Học cũng được, nghỉ cũng được — đừng quên mình còn có nhà."`;

    case "mother_remind_22":
      return `${NPC_DISPLAY.mother}: "Con bận quá rồi. Mẹ không trách — chỉ nhớ con thôi."`;

    case "mentor_coffee":
      return `${NPC_DISPLAY.mentor} mua ly cà phê thứ hai:\n\n"Em có thể chọn an toàn. Nhưng đừng chọn vì sợ."`;

    case "lover_meet_22":
      return `${NPC_DISPLAY.lover} cười: "Lần đầu gặp không cần phải ấn tượng — chỉ cần thật."`;

    case "age28_intro":
      if (hasMemory(game, "english_started_15")) {
        return `Tuổi 28 — Một công ty quốc tế mở vị trí remote. Tiếng Anh mùa hè năm 15 giờ mới có chỗ đứng.`;
      }
      return scene.text;

    case "bf_mirror_28":
      return scene.text;

    default:
      return scene.text;
  }
}
