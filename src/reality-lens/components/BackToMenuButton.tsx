import { useAppStore } from "../../store/appStore";
import { useRealityLensStore } from "../store/realityLensStore";

export function BackToMenuButton({ label = "VỀ MENU CHÍNH" }: { label?: string }) {
  const goToMenu = useAppStore((s) => s.goToMenu);
  const reset = useRealityLensStore((s) => s.reset);

  return (
    <button
      type="button"
      onClick={() => {
        reset();
        goToMenu();
      }}
      className="rl-btn-ghost rl-mono w-full rounded-lg px-6 py-3 text-xs sm:w-auto"
    >
      {label}
    </button>
  );
}
