import type { GameState } from "../types/game";

export type AnalysisResult = {
  phenomenonPercent: number;
  essencePercent: number;
  possibilities: string[];
};

export function computeAnalysis(state: GameState): AnalysisResult {
  const { phenomenon, essence } = state.philosophy;
  const total = phenomenon + essence;
  const essencePercent =
    total === 0 ? 0 : Math.round((essence / total) * 100);
  const phenomenonPercent = total === 0 ? 0 : 100 - essencePercent;

  const possibilities: string[] = [];
  if (state.stats.knowledge >= 70 || state.flags.philMinhEssence) {
    possibilities.push("Học bổng / con đường học thuật");
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
  if (possibilities.length === 0) {
    possibilities.push("Nhiều ngã rẽ chưa được khai phá");
  }

  return { phenomenonPercent, essencePercent, possibilities };
}
