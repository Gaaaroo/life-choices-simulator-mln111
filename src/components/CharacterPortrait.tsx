import { imageUrl, type ImageKey } from "../constants/images";

type Props = {
  imageKey: ImageKey;
  alt?: string;
};

export function CharacterPortrait({ imageKey, alt = "Nhân vật" }: Props) {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white/60 shadow-inner">
      <img
        src={imageUrl(imageKey)}
        alt={alt}
        className="max-h-[min(52vh,420px)] w-full object-contain object-bottom"
      />
    </div>
  );
}
