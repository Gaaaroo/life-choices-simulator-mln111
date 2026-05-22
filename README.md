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

**Gốc:** `idle`, `study`, `game`, `soccer`, `social`, `phoneGame`, `work`, `sad`, `graduate`, `success-vest`, `laptopLearing`

**G1:** `exam-sleep`, `friend-success`, `two-friends-game`, `minh-tired`, `mother-phone`, `lover-distance`, `mentor-coffee`, `english-study`

## G1 (đã implement)

- Quan hệ NPC (Minh, Khang, Mẹ, Linh, mentor) + panel affinity
- Memory & payoff dài hạn (tiếng Anh → remote, game đêm → thi, Khang 15→28)
- Beat cảm xúc, triết học v2 (không C = đúng)
- Nhật ký cuộc đời ở màn kết thúc

Chi tiết: `DESIGN_G1.md`

## Cấu trúc

- `src/data/story/` — nội dung scene & lựa chọn
- `src/engine/` — effects, điều kiện, phân tích
- `src/store/` — state game (Zustand)
- `IMPLEMENTATION_PLAN.md` — kế hoạch chi tiết

## Ý nghĩa giáo dục

- **Hiện tượng** vs **bản chất** (màn triết học Minh, doanh nhân)
- **Khả năng → hiện thực** khi đủ điều kiện (học kỹ năng, startup)
