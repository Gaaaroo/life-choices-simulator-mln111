import type { GameState } from "../types/game";
import { hasMemory } from "./hasMemory";

export type AnalysisResult = {
  insightDepth: number;
  possibilities: string[];
  reflectionQuestions: string[];
};

export function computeAnalysis(state: GameState): AnalysisResult {
  const possibilities: string[] = [];

  if (state.stats.knowledge >= 70 || hasMemory(state, "minh_understood")) {
    possibilities.push("Học bổng / con đường học thuật");
  }
  if (hasMemory(state, "english_started_15")) {
    possibilities.push("Làm việc quốc tế / remote");
  }
  if (state.flags.learnedSkill) {
    possibilities.push("Kỹ năng chuyên môn → cơ hội nghề nghiệp");
  }
  if (state.stats.relationship >= 40) {
    possibilities.push("Mối quan hệ xã hội vững");
  }
  if (state.flags.startupSuccess) {
    possibilities.push("Khởi nghiệp thành công");
  }
  if (state.flags.gameHeavy && state.flags.learnedSkill) {
    possibilities.push("Làm nội dung / streamer");
  }
  if (hasMemory(state, "bf_borrowed_18")) {
    possibilities.push("Lòng tin bạn thân — đền ơn sau này");
  }
  if (possibilities.length === 0) {
    possibilities.push("Nhiều ngã rẽ chưa được khai phá");
  }

  const reflectionQuestions = [
    "Lần nào bạn đánh giá ai chỉ qua một khoảnh khắc?",
    "Điều gì bạn trao đi sớm mà muộn mới nhận ra giá trị?",
    "Nếu chọn lại tuổ 15, bạn giữ hay đổi điều gì?",
  ];

  return {
    insightDepth: state.insight.depth,
    possibilities,
    reflectionQuestions,
  };
}
