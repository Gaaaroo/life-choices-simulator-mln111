/** Ánh xạ key logic → file thực tế trong public/image */
export const IMAGE_FILES = {
  idle: "idle.png",
  study: "study.png",
  game: "game.png",
  soccer: "soccer.png",
  social: "social.png",
  phoneGame: "phoneGame.png",
  work: "work.png",
  sad: "sad.png",
  graduate: "graduate.png",
  successVest: "success-vest.png",
  laptopLearning: "laptopLearing.png",
  examSleep: "exam-sleep.png",
  friendSuccess: "friend-success.png",
  friendsGame: "two-friends-game.png",
  minhTired: "minh-tired.png",
  motherPhone: "mother-phone.png",
  loverSad: "lover-distance.png",
  mentorCoffee: "mentor-coffee.png",
  englishStudy: "english-study.png",
} as const;

export type ImageKey = keyof typeof IMAGE_FILES;

export function imageUrl(key: ImageKey): string {
  return `/image/${IMAGE_FILES[key]}`;
}
