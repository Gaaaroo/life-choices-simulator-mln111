import { imageUrl } from "../constants/images";
import { useGameStore } from "../store/gameStore";

export function HomePage() {
  const startGame = useGameStore((s) => s.startGame);

  return (
    <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-4 py-10 text-center">
      <img
        src={imageUrl("idle")}
        alt=""
        className="mb-6 max-h-64 w-auto object-contain"
      />
      <h1 className="text-3xl font-bold tracking-tight text-teal-deep sm:text-4xl">
        LIFE CHOICES
      </h1>
      <p className="mt-2 text-lg text-slate-600">
        Hiện tượng hay Bản chất?
      </p>
      <p className="mt-1 text-sm text-slate-500">
        Mỗi lựa chọn hôm nay tạo ra hiện thực ngày mai.
      </p>
      <p className="mt-6 max-w-md text-sm italic text-teal-mid">
        Bạn sẽ nhìn thấy hiện tượng hay tìm ra bản chất?
      </p>
      <button
        type="button"
        onClick={startGame}
        className="mt-8 rounded-2xl bg-teal-deep px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-teal-mid hover:shadow-xl"
      >
        Bắt đầu
      </button>
    </div>
  );
}
