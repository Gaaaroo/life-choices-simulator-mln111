# Life Choices – Hiện tượng hay Bản chất?

Simulator lựa chọn cuộc đời (MLN111) — React + Vite + TypeScript, data-driven, không backend.

**Tagline:** Mỗi lựa chọn hôm nay tạo ra hiện thực ngày mai.

## Chạy dự án

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run preview
```

## Ảnh

Đặt PNG trong `public/image/` (đồng bộ với folder `image/` ở root):

- `idle.png`, `study.png`, `game.png`, `soccer.png`, `social.png`
- `phoneGame.png`, `work.png`, `sad.png`, `graduate.png`
- `success-vest.png`, `laptopLearing.png`

## Cấu trúc

- `src/data/story/` — nội dung scene & lựa chọn
- `src/engine/` — effects, điều kiện, phân tích
- `src/store/` — state game (Zustand)
- `IMPLEMENTATION_PLAN.md` — kế hoạch chi tiết

## Ý nghĩa giáo dục

- **Hiện tượng** vs **bản chất** (màn triết học Minh, doanh nhân)
- **Khả năng → hiện thực** khi đủ điều kiện (học kỹ năng, startup)
