import type { ImageKey } from "../constants/images";
import type { GameState } from "../types/game";

export type EndingResult = {
  id: string;
  title: string;
  description: string;
  image: ImageKey;
};

type EndingRule = {
  id: string;
  title: string;
  description: string;
  image: ImageKey;
  test: (s: GameState) => boolean;
  priority: number;
};

const RULES: EndingRule[] = [
  {
    id: "streamer_ceo",
    title: "Streamer → CEO",
    description:
      "Từ game đến kỹ năng nội dung — bạn biến đam mê thành sự nghiệp.",
    image: "successVest",
    priority: 100,
    test: (s) => s.flags.gameHeavy && s.flags.learnedSkill,
  },
  {
    id: "founder",
    title: "Nhà sáng lập",
    description: "Startup thành công nhờ kỹ năng và quan hệ.",
    image: "successVest",
    priority: 90,
    test: (s) => s.flags.startupSuccess,
  },
  {
    id: "scholar",
    title: "Chuyên gia / học bổng",
    description: "Kiến thức và tư duy tìm hiểu bản chất đưa bạn xa.",
    image: "graduate",
    priority: 80,
    test: (s) =>
      s.stats.knowledge >= 75 ||
      (s.flags.philMinhEssence && s.stats.knowledge >= 65),
  },
  {
    id: "burnout_rich",
    title: "Giàu nhưng kiệt sức",
    description: "Tiền nhiều nhưng sức khỏe và quan hệ đã bị bỏ quên.",
    image: "sad",
    priority: 70,
    test: (s) => s.stats.money >= 80 && s.stats.health <= 25,
  },
  {
    id: "startup_fail",
    title: "Startup thất bại",
    description: "Khả năng có — nhưng thiếu điều kiện để thành hiện thực.",
    image: "sad",
    priority: 60,
    test: (s) => s.flags.startupAttempted && !s.flags.startupSuccess,
  },
  {
    id: "stable_worker",
    title: "Công việc ổn định",
    description: "Bạn chọn con đường an toàn và đều đặn.",
    image: "work",
    priority: 10,
    test: () => true,
  },
];

export function resolveEnding(state: GameState): EndingResult {
  const sorted = [...RULES].sort((a, b) => b.priority - a.priority);
  const match = sorted.find((r) => r.test(state)) ?? RULES[RULES.length - 1];
  return {
    id: match.id,
    title: match.title,
    description: match.description,
    image: match.image,
  };
}
