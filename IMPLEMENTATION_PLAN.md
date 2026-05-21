# Life Choices – Kế hoạch implement

**Tên dự án:** Life Choices – Hiện tượng hay Bản chất?  
**Tagline:** Mỗi lựa chọn hôm nay tạo ra hiện thực ngày mai.

**Phạm vi đã chốt**

- React frontend thông thường (Vite + TypeScript), không backend.
- **Một nhân vật duy nhất** — bạn cung cấp bộ ảnh; app không có màn chọn giới tính / nhân vật / đặt tên.
- Nội dung và flow driven bởi JSON; UI chỉ render scene + cập nhật state.

---

## 1. Mục tiêu sản phẩm

| Mục tiêu | Mô tả |
|----------|--------|
| Trải nghiệm | Visual novel nhẹ: ảnh + stats + lựa chọn A/B/C/D theo từng tuổi |
| Triết học (MLN111) | Phân biệt hiện tượng / bản chất; khả năng → hiện thực (có điều kiện) |
| Kỹ thuật | ~12 ảnh nhân vật + icon overlay; toàn bộ logic trong JSON + vài hàm TS |
| Demo | Chạy static, deploy GitHub Pages / Vercel |

---

## 2. Stack & tooling

| Thành phần | Lựa chọn |
|------------|----------|
| Framework | React 18+ |
| Ngôn ngữ | TypeScript |
| Build | Vite |
| State | Zustand hoặc `useReducer` + Context |
| Style | Tailwind CSS hoặc CSS Modules (chọn một, giữ xuyên suốt) |
| Test (tuỳ chọn) | Vitest cho `engine/*` |
| Deploy | Static hosting |

**Không dùng:** API server, database, AI, game engine.

---

## 3. Flow người chơi

```
Trang chủ
    ↓
Tuổi 15 (THPT)
    ↓
[Sự kiện / lựa chọn lặp]
    ↓
Màn triết học #1 (Minh – hiện tượng vs bản chất)
    ↓
Tuổi 18 (thi đại học) — nhánh theo stat
    ↓
Tuổi 22 (đại học) — có payoff trễ (kỹ năng)
    ↓
Màn triết học #2 (doanh nhân)
    ↓
Tuổi 28 (đi làm)
    ↓
Tuổi 35 (sự nghiệp / chiều sâu)
    ↓
Kết thúc (timeline + archetype)
    ↓
Phân tích triết học (% hiện tượng / bản chất)
```

**Đã bỏ so với bản ý tưởng ban đầu**

- Màn “Chọn nhân vật” (nam/nữ, tên, tính cách A–D).
- Bonus stat khởi tạo theo personality — thay bằng **stat mặc định cố định** khi bắt đầu game.

**Tùy chọn nhỏ (không bắt buộc phase 1)**

- Trang chủ vẫn có nút **Bắt đầu** → vào thẳng tuổi 15 với stats default.

---

## 4. Stats, flags & scoring

### 4.1 Chỉ số (gợi ý ban đầu)

| Stat | Key | Giá trị khởi đầu (gợi ý) |
|------|-----|---------------------------|
| Kiến thức | `knowledge` | 50 |
| Sức khỏe | `health` | 50 |
| Tiền | `money` | 10 |
| Quan hệ | `relationship` | 20 |
| Kỷ luật | `discipline` | 40 |

- Mọi effect trong JSON dùng đúng các key trên (tránh thêm “vui vẻ” riêng trừ khi sau này thêm stat `happiness`).
- Clamp stat trong khoảng `0–100` (tiền có thể `0–999` tùy balance).

### 4.2 Flags (boolean)

Dùng cho nhánh và payoff trễ, ví dụ:

- `learnedSkill` — tuổi 22 chọn học kỹ năng
- `philMinhEssence` — màn Minh chọn “Tìm hiểu thêm”
- `philRichEssence` — màn doanh nhân chọn “Tìm hiểu”
- `startupAttempted` — tuổi 28 chọn startup

### 4.3 Đếm triết học (màn phân tích cuối)

- `philosophy.phenomenon` — số lần chọn kiểu “nhìn hiện tượng” (A/B nhanh)
- `philosophy.essence` — số lần chọn “tìm hiểu bản chất” (C)

Công thức % cuối game: `essence / (phenomenon + essence) * 100` (làm tròn).

### 4.4 Journal & timeline

- `journal: string[]` — câu ngắn sau mỗi lựa chọn quan trọng.
- `choiceHistory: { sceneId, choiceId, age? }[]` — build timeline màn kết thúc.

---

## 5. Danh sách ảnh cần chuẩn bị (~12)

Đặt tại `public/assets/character/` (một nhân vật, tên file thống nhất):

| File (gợi ý) | Dùng khi |
|--------------|----------|
| `idle.png` | Mặc định, ngã tư, đứng |
| `study.png` | Học bài |
| `game.png` | Chơi game |
| `gym.png` | Đá bóng / tập |
| `social.png` | Đi chơi bạn (hoặc reuse `idle`) |
| `phone.png` | Sự kiện bạn rủ game |
| `work.png` | Đi làm |
| `sad.png` | Buồn / thất bại |
| `graduate.png` | Tốt nghiệp |
| `success-vest.png` | Thành công / vest |
| `laptop.png` | Học kỹ năng tuổi 22 |
| `sleep-class.png` | Triết học: bạn ngủ lớp (hiện tượng) |
| `minh-work.png` | Triết học: Minh đi làm (bản chất) |
| `rich-night.png` | Triết học: doanh nhân thức khuya (bản chất) |

**Overlay icon** (SVG hoặc emoji component, không bắt buộc PNG): 🎓 ❤️ 💰 📉 📈 😢 ⭐ 🏆

**Background (tuỳ chọn):** `home-crossroads.png`, `classroom.png` — có thể phase 2.

Trong JSON chỉ cần `"image": "study.png"` — component ghép path ` /assets/character/${image}`.

---

## 6. Cấu trúc thư mục

```
life-choices-simulator-mln111/
├── public/
│   └── assets/
│       ├── character/          # ~12 PNG bạn cung cấp
│       └── overlays/           # SVG icon (optional)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── types/
│   │   ├── game.ts
│   │   └── story.ts
│   ├── data/
│   │   ├── initialState.ts     # stats + flags default
│   │   ├── endings.ts          # rule → ending id + timeline
│   │   └── story/
│   │       ├── index.ts          # export all scenes, startSceneId
│   │       ├── home.json
│   │       ├── age-15.json
│   │       ├── age-18.json
│   │       ├── age-22.json
│   │       ├── age-28.json
│   │       ├── age-35.json
│   │       ├── philosophy.json
│   │       └── ending.json
│   ├── engine/
│   │   ├── applyEffects.ts
│   │   ├── checkConditions.ts
│   │   ├── getScene.ts
│   │   └── computeAnalysis.ts
│   ├── store/
│   │   └── gameStore.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── GameLayout.tsx
│   │   │   └── StatPanel.tsx
│   │   ├── CharacterPortrait.tsx
│   │   ├── ChoiceList.tsx
│   │   ├── EffectFeedback.tsx
│   │   ├── JournalPanel.tsx
│   │   ├── PhilosophyPopup.tsx
│   │   └── EndingTimeline.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PlayPage.tsx
│   │   ├── EndingPage.tsx
│   │   └── AnalysisPage.tsx
│   └── hooks/
│       └── useCurrentScene.ts
├── IMPLEMENTATION_PLAN.md
├── package.json
└── README.md
```

---

## 7. Schema JSON scene

### 7.1 Các loại scene (`type`)

| Type | Mô tả |
|------|--------|
| `narrative` | Chỉ text + nút “Tiếp” |
| `choice` | Hiển thị A/B/C/D, apply effect, chuyển scene |
| `event` | Giống choice nhưng copy kiểu “sự kiện” |
| `philosophy` | 3 lựa chọn; option C đổi ảnh + popup bản chất |
| `branch` | Danh sách choice lọc theo `conditions` |
| `ending` | Snapshot stats + archetype |
| `analysis` | Màn % + bullet “khả năng đã mở” |

### 7.2 Ví dụ scene

```json
{
  "id": "age15_after_school",
  "type": "choice",
  "age": 15,
  "image": "idle.png",
  "text": "Bạn vừa tan học. Bạn còn 4 tiếng rảnh.",
  "choices": [
    {
      "id": "study",
      "label": "Học bài",
      "effects": { "knowledge": 10, "discipline": 5 },
      "imageAfter": "study.png",
      "feedback": ["+10 Kiến thức", "+5 Kỷ luật"],
      "journal": "Hôm nay bạn quyết định học thêm.",
      "next": "age15_phone_event"
    }
  ]
}
```

### 7.3 Điều kiện (tuổi 18, startup 28)

```json
{
  "id": "age18_scholarship",
  "label": "Thi học bổng",
  "conditions": { "knowledge": { "gte": 70 } },
  "next": "age18_scholarship_result"
}
```

Engine: `checkConditions(state, conditions) => boolean`.

### 7.4 Scene triết học

```json
{
  "id": "phil_minh",
  "type": "philosophy",
  "age": 15,
  "image": "sleep-class.png",
  "text": "Bạn thấy Minh nghỉ học liên tục. Bạn nghĩ:",
  "choices": [
    { "id": "lazy", "label": "Lười", "philosophy": "phenomenon", "next": "..." },
    { "id": "bad", "label": "Hư", "philosophy": "phenomenon", "next": "..." },
    {
      "id": "learn_more",
      "label": "Tìm hiểu thêm",
      "philosophy": "essence",
      "imageAfter": "minh-work.png",
      "revealTitle": "Bản chất",
      "revealText": "Minh phải đi làm thêm nuôi mẹ bệnh.",
      "popup": "Không nên chỉ nhìn hiện tượng.",
      "flag": "philMinhEssence",
      "next": "age18_intro"
    }
  ]
}
```

---

## 8. Map nội dung → scene ID

| # | Màn hình | Scene ID (gợi ý) | Ghi chú |
|---|----------|------------------|---------|
| 1 | Trang chủ | `home` | Ảnh ngã tư / idle; tagline; [Bắt đầu] |
| 2 | Tuổi 15 intro | `age15_intro` | Stats panel; text tan học |
| 3 | Tuổi 15 choices | `age15_after_school` | 4 lựa chọn học/game/đá bóng/bạn |
| 4 | Sự kiện điện thoại | `age15_phone_event` | 3 lựa chọn xuyên đêm |
| 5 | Triết học Minh | `phil_minh` | type `philosophy` |
| 6 | Tuổi 18 | `age18_exam` | branch theo `knowledge` |
| 7 | Tuổi 22 | `age22_weekend` | học kỹ năng / làm thêm / game / CLB |
| 8 | Payoff kỹ năng | `age22_skill_payoff` | Điều kiện `learnedSkill`; narrative |
| 9 | Triết học rich | `phil_rich` | type `philosophy` |
| 10 | Tuổi 28 | `age28_career` | ổn định / startup / freelancer |
| 11 | Startup result | `age28_startup_result` | conditions skill + relationship |
| 12 | Tuổi 35 | `age35_reflection` | Gia đình / Sức khỏe / Tiền |
| 13 | Kết thúc | `ending` | Ảnh cuối + timeline từ history |
| 14 | Phân tích | `analysis` | % + danh sách khả năng đã mở |

---

## 9. Quy tắc ending (gợi ý)

Tính **archetype** từ stats + flags (ưu tiên flag nếu trùng):

| Điều kiện (ví dụ) | Ending label |
|-------------------|--------------|
| `game` nhiều + `learnedSkill` video | Streamer → CEO (timeline dài) |
| `knowledge` cao + `philMinhEssence` | Học bổng / chuyên gia |
| startup + skill + relationship cao | Founder thành công |
| startup fail flag | Thất bại / sad image |
| `money` cao, `health` thấp | Giàu nhưng kiệt sức |

Implement trong `data/endings.ts`: mảng rule `{ test: (s) => boolean, id, title, image, timelineSteps }`.

---

## 10. UI layout chung (PlayPage)

```
┌─────────────────────────────────────────────────────────┐
│  Tuổi: 15                                               │
├──────────────┬──────────────────────┬───────────────────┤
│  StatPanel   │  CharacterPortrait   │  (optional)       │
│  Kiến thức   │                      │  Journal          │
│  Sức khỏe    │                      │                   │
│  ...         │                      │                   │
├──────────────┴──────────────────────┴───────────────────┤
│  Narrative text                                         │
│  [ A ] [ B ] [ C ] [ D ]                                │
│  EffectFeedback (+10 Kiến thức)                         │
└─────────────────────────────────────────────────────────┘
```

- Responsive: mobile xếp dọc (stats trên, ảnh giữa, choice dưới).
- `PhilosophyPopup` modal khi chọn C.

---

## 11. Lộ trình implement theo phase

### Phase 0 — Khởi tạo (0.5 ngày)

- [ ] `npm create vite@latest` → React + TS
- [ ] Cài Tailwind (nếu dùng), Zustand (nếu dùng)
- [ ] Tạo folder theo mục 6
- [ ] Placeholder ảnh trong `public/assets/character/`

### Phase 1 — Core engine (1 ngày)

- [ ] `types/game.ts`, `types/story.ts`
- [ ] `initialState.ts`
- [ ] `applyEffects`, `checkConditions`, `clampStat`
- [ ] `gameStore`: `loadScene`, `chooseOption`, `goNext`
- [ ] 1 scene JSON test + unit test effect/condition

### Phase 2 — UI shell (1 ngày)

- [ ] `GameLayout`, `StatPanel`, `CharacterPortrait`, `ChoiceList`
- [ ] `HomePage` → reset state → `PlayPage`
- [ ] `EffectFeedback`, đổi ảnh khi `imageAfter`

### Phase 3 — Vertical slice tuổi 15 (1 ngày)

- [ ] `home.json`, `age-15.json` (intro + 4 choice + phone event)
- [ ] Journal append
- [ ] Chuyển scene đúng `next`

### Phase 4 — Triết học & tuổi 18–22 (1–1.5 ngày)

- [ ] `philosophy.json` (Minh + rich)
- [ ] `PhilosophyPopup`
- [ ] `age-18.json` branch knowledge
- [ ] `age-22.json` + flag `learnedSkill` + payoff scene

### Phase 5 — Tuổi 28–35 & ending (1 ngày)

- [ ] `age-28.json` startup conditions
- [ ] `age-35.json` reflection
- [ ] `endings.ts` + `EndingPage` + `EndingTimeline`
- [ ] `AnalysisPage` + `computeAnalysis`

### Phase 6 — Polish (0.5–1 ngày)

- [ ] Thay placeholder bằng ảnh thật
- [ ] localStorage save (optional)
- [ ] README hướng dẫn chạy + ý nghĩa MLN111
- [ ] Deploy static

**Tổng ước lượng:** 5–7 ngày (content JSON chiếm phần lớn thời gian).

---

## 12. Tiêu chí hoàn thành (Definition of Done)

- [ ] Chơi được từ trang chủ đến màn phân tích không lỗi console
- [ ] Stats thay đổi đúng theo JSON; ảnh đổi theo `image` / `imageAfter`
- [ ] Ít nhất 2 màn `philosophy` có popup bản chất khi chọn C
- [ ] Tuổi 18 ẩn/hiện option theo `knowledge`
- [ ] Tuổi 22: chọn học kỹ năng → sau đó có scene payoff
- [ ] Tuổi 28 startup: thành công / thất bại theo stat
- [ ] Ending hiển thị timeline từ `choiceHistory`
- [ ] Analysis hiển thị % hiện tượng / bản chất
- [ ] Build production `npm run build` thành công

---

## 13. README & demo (sau khi xong)

Nội dung README ngắn:

- Cách chạy: `npm install` → `npm run dev`
- Ý nghĩa giáo dục: hiện tượng / bản chất / khả năng – hiện thực
- Credit ảnh nhân vật (bạn tự cung cấp)

---

## 14. Ghi chú thay đổi so với bản ý tưởng gốc

| Bản gốc | Bản implement này |
|---------|-------------------|
| Chọn nam/nữ, tên, tính cách | **Bỏ** — một nhân vật, stats default |
| Nhiều ảnh theo giới | **Một folder** `character/` |
| 8+ pose nam | ~12 file list mục 5 |

Mọi chỗ JSON trước đây có `image.male` / `image.female` → chỉ còn `"image": "file.png"`.

---

*Tài liệu này dùng làm checklist khi bắt đầu code. Cập nhật tick [ ] trong phase khi hoàn thành từng mục.*
