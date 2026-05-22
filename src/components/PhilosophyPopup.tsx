import type { PhilosophyReveal } from "../store/gameStore";

type Props = {
  reveal: PhilosophyReveal;
  onClose: () => void;
};

export function PhilosophyPopup({ reveal, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        className="max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-accent">
          {reveal.title}
        </p>
        <p className="mt-3 text-base leading-relaxed text-slate-800">
          {reveal.text}
        </p>
        <p className="mt-4 rounded-lg bg-teal-deep/10 p-3 text-sm font-medium text-teal-deep">
          {reveal.popup}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-teal-deep py-3 font-semibold text-white hover:bg-teal-mid"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
}
