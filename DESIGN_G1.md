# Life Choices — Thiết kế Giai đoạn 1 (G1)

**Mục tiêu G1:** Biến game từ visual novel có stat → life sim có **người**, **ký ức**, **hậu quả cảm xúc**, **đánh đổi**, **payoff dài 15→35**, triết học **không giáo điều**.

**Phạm vi G1:** Không làm random event, personality system đầy đủ, hidden ending mới (để G2). Có thể làm **1 hidden beat** nhỏ nếu kịp.

**Trạng thái:** Tài liệu thiết kế — chưa implement. Bám codebase hiện tại (`scenes.ts`, `gameStore`, 11 ảnh).

---

## 1. Nguyên tắc thiết kế

### 1.1 Show, don't tell

| Tránh | Thay bằng |
|-------|-----------|
| "Bạn đã hiểu bản chất." | "Lần đầu, bạn tự hỏi liệu mình có đánh giá Minh quá nhanh." |
| "Không nên chỉ nhìn hiện tượng." | Mô tả cảnh / hành động → player tự rút ra |
| % hiện tượng / bản chất ở cuối (giáo điều) | **Nhật ký đời** + câu hỏi mở (G1 có thể giữ % nhưng không gọi "đúng/sai") |

### 1.2 Triết học = gameplay ẩn

- **Không** có đáp án C luôn thắng.
- Mỗi lựa chọn triết học → **nhiều lớp hệ quả** (memory, NPC, stat nhẹ, journal).
- Popup reveal = **thông tin thêm**, không phải "phần thưởng đạo đức".

### 1.3 Không lựa chọn hoàn hảo (hy sinh)

Mỗi nhánh lớn phải ghi rõ **được / mất** trong design table (mục 6).

### 1.4 Tích lũy

Hành động tuổi nhỏ → scene hoặc dòng nhật ký tuổi lớn (payoff registry, mục 5).

---

## 2. Mở rộng data model (so với hiện tại)

### 2.1 Quan hệ NPC (`relationships`)

```ts
type NpcId = "minh" | "mother" | "bestFriend" | "lover" | "mentor";

type NpcState = {
  affinity: number;      // 0–100, ảnh hưởng tone hội thoại & scene mở
  trust: number;         // 0–100
  memories: MemoryId[];  // id sự kiện đã xảy ra với player
  status?: string;       // optional: "distant" | "close" | "success" | "sick"
};

type Relationships = Record<NpcId, NpcState>;
```

**Khởi tạo gợi ý:**

| NPC | affinity | trust | Ghi chú |
|-----|----------|-------|---------|
| minh | 50 | 40 | Bạn cùng lớp |
| mother | 70 | 80 | Mẹ |
| bestFriend | 60 | 55 | Bạn thân |
| lover | 0 | 0 | Chưa có — mở tuổi 22 |
| mentor | 0 | 0 | Mở tuổi 18–22 tùy nhánh |

### 2.2 Memory (`MemoryId`)

Chuỗi cố định — scene/choice **ghi** memory, scene sau **đọc** memory.

| MemoryId | Kích hoạt khi | Dùng ở |
|----------|---------------|---------|
| `minh_game_summer_15` | Tuổi 15: chơi game (buổi chiều hoặc đêm) cùng/ngầm với Minh | Arc Minh, nhật ký |
| `minh_judged_lazy` | Triết học Minh: chọn Lười hoặc Hư | Tuổi 18–28 Minh distant |
| `minh_understood` | Triết học: Tìm hiểu | Scene Minh sau, affinity+ |
| `minh_helped_money` | (G1 optional) Tuổi 18 cho Minh mượn tiền | Tuổi 28 Minh nhắc lại |
| `bf_game_bond_15` | Tuổi 15: game đêm / chơi game buổi chiều + flag game | **Arc bạn thân 28** |
| `bf_study_together_15` | Tuổi 15: học bài (có thể gộp social) | Bạn thân arc |
| `bf_borrowed_18` | Tuổi 18: cho bạn mượn tiền (choice mới) | Tuổi 35 đầu tư |
| `bf_refused_18` | Tuổi 18: không cho mượn | Tuổi 28 bạn xa |
| `english_started_15` | Tuổi 15: học tiếng Anh (choice mới hoặc thay slot) | Tuổi 28 remote |
| `exam_sleep_15` | Tuổi 15: game xuyên đêm → beat cảm xúc thi | Nhật ký 18 |
| `mother_neglected` | Chọn học/startup nhiều lần bỏ qua gọi mẹ | Tuổi 35 |
| `mother_cared` | Tuổi 22/28 gọi về / về thăm (scene mới) | Tuổi 35 |
| `lover_started_22` | Tuổi 22 CLB hoặc social cao | Arc người yêu |
| `lover_lost_startup` | Tuổi 28 startup | Người yêu rời |
| `mentor_met` | Tuổi 18 thi ĐH / học bổng | Tuổi 22 mentor khuyên |

### 2.3 Payoff registry

```ts
type PayoffRule = {
  id: string;
  requiresMemories: MemoryId[];
  optionalFlags?: (keyof GameFlags)[];
  triggerAtScene: string;   // scene id khi vào tuổi X
  journalTemplate: string;
};
```

| Payoff id | Cần memory / flag | Trigger scene | Kết quả (narrative) |
|-----------|-------------------|---------------|---------------------|
| `payoff_remote_28` | `english_started_15` | `age28_intro` | Mở choice "Remote lương cao" hoặc narrative insert |
| `payoff_bf_invest_35` | `bf_borrowed_18` + affinity bf ≥ 50 | `age35_intro` | Dòng nhật ký / ending modifier |
| `payoff_bf_contrast_28` | `bf_game_bond_15` + bf status success | `age28_career` hoặc scene mới | **Bạn thành công, mình trượt/ thất nghiệp** |
| `payoff_exam_crash_18` | `exam_sleep_15` | `age18_intro` | Beat cảm xúc trước thi |
| `payoff_streamer_path` | `gameHeavy` + `learnedSkill` | `age28_career` | Giữ ending streamer, thêm dialogue |

### 2.4 Scene types mới (schema)

| Type | Mục đích |
|------|----------|
| `emotional` | Full màn: ảnh + đoạn văn dài, không moralize; có thể 1 nút Tiếp |
| `relationship` | Hội thoại NPC (tên, 1–3 câu), branch nhỏ |
| `philosophy_v2` | Giống philosophy nhưng **không** +essence/phenomenon công khai; ghi `insightDepth` ẩn hoặc memory |

### 2.5 Journal / timeline (nhật ký đời)

Thay `timelineLabel` ngắn bằng **template** generate khi ghi:

```ts
type JournalEntry = {
  age: number;
  text: string;        // đã render
  templateId?: string;
};
```

Engine: `renderJournal(templateId, state)` → thay `{knowledge}`, `{bfName}`, v.v.

---

## 3. NPC — arc & scene (G1 bắt buộc)

### 3.1 Minh (bạn lớp — đã có màn triết học)

| Tuổi | Scene id (gợi ý) | Điều kiện | Nội dung ngắn |
|------|------------------|-----------|---------------|
| 15 | (gộp vào choice game) | Chọn game | Memory `minh_game_summer_15` |
| 15 | `phil_minh_v2` | Sau phone event | 3 lựa chọn **phức tạp** (mục 4) |
| 18 | `minh_after_exam` | `minh_understood` | Minh cảm ơn / ngại |
| 18 | `minh_after_exam` | `minh_judged_lazy` | Minh tránh mặt |
| 28 | `minh_reunion` | `minh_understood` + minh affinity ≥ 60 | Minh vẫn làm, nhưng đã học thêm |

**Reveal mới (Tìm hiểu):**  
*"Minh đi làm thêm sau giờ học. Mẹ anh ốm. Buổi sáng anh vẫn ngủ gục vì mệt — không chỉ vì lười."*

### 3.2 Bạn thân (`bestFriend` — arc “cực đau” ưu tiên)

| Tuổi | Scene | Memory | Cảm xúc |
|------|-------|--------|---------|
| 15 | Cùng game đêm / chiều | `bf_game_bond_15` | Ấm, đồng điệu |
| 18 | Xin mượn tiền thi / startup nhỏ | `bf_borrowed_18` / `bf_refused_18` | Hy sinh tiền |
| 28 | `bf_mirror_28` | `bf_game_bond_15` + stat thấp + bf success | **"Hè đó hai đứa cùng rank. Giờ nó lên sếp, bạn gửi CV lần ba."** |
| 35 | 1 dòng nhật ký | payoff borrow | Đầu tư hoặc im lặng |

**Scene bắt buộc G1:** `bf_mirror_28` (emotional).

### 3.3 Mẹ (`mother`)

| Tuổi | Scene | Trigger |
|------|-------|---------|
| 15 | `mother_call_15` (ngắn) | Sau tuổi 15 hoặc trước thi |
| 22 | `mother_remind_22` | discipline thấp hoặc `mother_neglected` |
| 35 | Nhật ký | money cao + `mother_neglected` | *"Có tiền, không còn số nhà quen gọi về."* |

Không cần arc dài — **2–3 beat** là đủ G1.

### 3.4 Người yêu (`lover` — G1 lite)

| Tuổi | Scene | Điều kiện |
|------|-------|-----------|
| 22 | `lover_meet_22` | relationship ≥ 35 hoặc CLB |
| 28 | `lover_distance_28` | startup + `lover_started_22` | *"Ở lại hay đi — không có câu trả lời đúng."* |

### 3.5 Mentor (`mentor` — G1 lite)

| Tuổi | Scene | Điều kiện |
|------|-------|-----------|
| 20 | `mentor_coffee` | knowledge ≥ 60 hoặc học bổng |
| 28 | 1 câu trong narrative | `mentor_met` | Gợi ý remote / ổn định |

---

## 4. Triết học v2 (Minh & doanh nhân)

### 4.1 Minh — bảng lựa chọn

| ID | Label | Hiển thị với player | Memory | Stat nhẹ | NPC |
|----|-------|---------------------|--------|----------|-----|
| `snap_lazy` | "Chắc lại lười thôi" | Không popup moral | `minh_judged_lazy` | — | minh trust −15 |
| `snap_bad` | "Hư học, không nể ai" | Câu nội tâm: *"Bạn từng chơi game đến sáng — có đủ hiểu Minh không?"* | `minh_judged_lazy` | discipline +5 (tự biện minh) | minh affinity −10 |
| `ask_why` | "Hỏi han thêm" | Reveal phức hợp (mục 3.1) | `minh_understood` | — | minh trust +20 |

**Không** tăng `philosophy.essence` công khai G1 — hoặc đổi tên thành `insight` nội bộ.

### 4.2 Doanh nhân — bảng lựa chọn

| ID | Label | Reveal khi hỏi sâu |
|----|-------|-------------------|
| `snap_luck` | "May mắn thôi" | — |
| `snap_born` | "Giàu sẵn" | Một phần đúng: *"Bố mẹ cho vốn căn hộ đầu tiên."* |
| `ask_story` | "Nghe câu chuyện" | *"Mười năm làm đêm. Cũng từng phá sản năm 26."* |

→ Player tự cân: nỗ lực + nền + may mắn.

---

## 5. Beat cảm xúc (scene `emotional`)

| Scene id | Trigger | Ảnh (gợi ý) | Văn (tóm tắt) |
|----------|---------|-------------|--------------|
| `emo_exam_after_allnighter` | `exam_sleep_15` | **mới** `exam-sleep.png` hoặc tái `study` | *"Bạn thức trắng chơi game. Sáng hôm sau, gục trong phòng thi."* |
| `emo_white_night` | game đêm "Đi" | `game` | Ngắn, trước exam beat |
| `emo_bf_mirror_28` | `bf_mirror_28` | **mới** `friend-success.png` | Contrast bạn thân / mình |
| `emo_mother_phone_35` | money ≥ 80, `mother_neglected` | `sad` hoặc **mới** `phone-mom.png` | Nhật ký style |
| `emo_lover_note_28` | startup + lover | `sad` / **mới** `letter.png` | Tin nhắn chia tay nhẹ |

**G1 tối thiểu:** 2 beat (`exam` + `bf_mirror_28`).

---

## 6. Hy sinh — bảng đánh đổi (chỉnh choice hiện có + mới)

| Lựa chọn (tuổi) | Được | Mất (stat / memory / NPC) |
|-----------------|------|---------------------------|
| Học bài 15 | +knowledge | −relationship nhẹ; miss `bf_game_bond` nếu không chơi |
| Game 15 / đêm | +bond bf/minh; streamer path | −discipline; `exam_sleep` nếu đêm; health |
| Học tiếng Anh 15 (mới) | `english_started_15` | −2h social; relationship −5 |
| Thi học bổng 18 | money, knowledge | stress; ít thời gian mẹ |
| Đi làm sớm 18 | money | knowledge; mentor khó |
| Học kỹ năng 22 | payoff 28 | weekend không gặp lover |
| Startup 28 | founder path | `lover_lost`; money −; mother `neglected` |
| Ổn định 28 | money, health | Không ending streamer / founder |
| Gia đình 35 | relationship | money −10 (đã có) |
| Tiền 35 | money | relationship, health (đã có) |

---

## 7. Flow G1 (cập nhật trên flow cũ)

```
Trang chủ
  → 15: 4h rảnh (+ optional: học tiếng Anh thay 1 slot HOẶC thêm 5th choice phụ)
  → phone đêm → (emo_white_night nếu "Đi")
  → phil_minh_v2
  → (emo_exam nếu exam_sleep) — có thể đặt trước 18
  → mother_call_15 (ngắn)
  → 18: thi + (bf mượn tiền — choice mới trên age18_exam)
  → 22: weekend + lover_meet (nếu đủ)
  → payoff skill (giữ)
  → phil_rich_v2
  → 28: career + (bf_mirror_28 nếu đủ memory)
  → startup resolve (giữ công thức)
  → lover_distance (nếu startup)
  → 35: reflection (giữ)
  → ending + nhật ký đời (template)
  → analysis (đổi copy — câu hỏi mở, không "đúng/sai")
```

---

## 8. Nhật ký đời — template G1

| templateId | Điều kiện | Văn mẫu |
|------------|-----------|---------|
| `j15_game_summer` | `bf_game_bond_15` | "Bạn dành đêm hè chơi game cùng {bfName}." |
| `j15_english` | `english_started_15` | "Mùa hè đó, bạn học tiếng Anh thay vì ra phố." |
| `j18_exam_fail` | knowledge < 70 khi thi | "Bạn trượt học bổng — thiếu vài điểm. Có đêm bạn không ngủ vì game." |
| `j18_exam_ok` | scholarship | "Học bổng mở ra — nhưng kỳ thi không ít căng thẳng." |
| `j28_startup_room` | startupAttempted | "Startup bắt đầu trong căn phòng trọ nhỏ." |
| `j28_bf_mirror` | bf_mirror scene | "{bfName} thành công. Bạn vẫn đang tìm hướng đi." |
| `j35_family_void` | mother_neglected, money high | "Bạn có tiền, nhưng ít khi gọi về nhà." |

Render khi: ghi memory, qua mốc tuổi, màn ending.

---

## 9. Ảnh — danh sách G1

### 9.1 Đã có (11) — giữ nguyên

`idle`, `study`, `game`, `soccer`, `social`, `phoneGame`, `work`, `sad`, `graduate`, `success-vest`, `laptopLearing`

### 9.2 Ảnh mới G1

| # | File gợi ý | Key | Dùng cho | Bắt buộc? |
|---|------------|-----|----------|-----------|
| 1 | `exam-sleep.png` | `examSleep` | Thi ngủ gục | **Có** |
| 2 | `friend-success.png` | `friendSuccess` | Bạn thân 28 thành công / contrast | **Có** |
| 3 | `two-friends-game.png` | `friendsGame` | 15 cùng game (optional) | Không — dùng `game` |
| 4 | `mother-phone.png` | `motherPhone` | Gọi mẹ | Không — dùng `phoneGame` |
| 5 | `lover-distance.png` | `loverSad` | Chia tay nhẹ | Không — dùng `sad` |
| 6 | `minh-work-tired.png` | `minhTired` | Reveal Minh | Không — dùng `work` |
| 7 | `mentor-coffee.png` | `mentorCoffee` | Mentor | Không — dùng `idle`/`social` |
| 8 | `english-study.png` | `englishStudy` | Học Anh | Không — dùng `study` |

**Tổng ảnh mới G1:**

- **Tối thiểu:** **+2** (`exam-sleep`, `friend-success`)
- **Khuyến nghị:** **+4** (+ `two-friends-game` hoặc `minhTired`)
- **Đủ polish:** **+6~8**

**Tổng project sau G1:** 13–19 ảnh.

### 9.3 Prompt ngắn (2 ảnh bắt buộc)

**exam-sleep:**  
Nam sinh gục trên bàn thi, phòng thi Việt Nam, giám thị mờ, ánh sáng lạnh, mệt bã, visual novel bán thực tế.

**friend-success:**  
Hai nam trẻ, một vest tự tin (bạn thân), một áo thường trông mệt (player POV hoặc nhìn từ vai), hành lang văn phòng, contrast cảm xúc, không chữ.

---

## 10. UI G1 (không cần art mới)

| Thành phần | Mô tả |
|------------|--------|
| `RelationshipPanel` | 5 icon NPC + thanh affinity (collapse mobile) |
| `DialogueBox` | Tên NPC + 1–3 câu trên scene `relationship` |
| `EmotionalPage` | Layout giống Play nhưng text lớn hơn, 1 nút |
| `LifeJournal` (ending) | Cuốn nhật ký: đoạn theo tuổi, không bullet timeline |
| Analysis | Đổi title: "Những gì bạn để lại" + 2–3 câu hỏi mở |

---

## 11. File code sẽ sửa (khi implement — checklist)

| File / area | Việc |
|-------------|------|
| `types/game.ts` | `relationships`, `JournalEntry`, mở rộng flags |
| `types/story.ts` | `emotional`, `relationship`, `memory`, `journalTemplate` |
| `data/initialState.ts` | NPC init |
| `data/payoffs.ts` | **mới** — registry |
| `data/journalTemplates.ts` | **mới** |
| `data/story/scenes.ts` | Viết lại + scene mới (ước ~25–35 scene) |
| `engine/recordMemory.ts` | **mới** |
| `engine/renderJournal.ts` | **mới** |
| `engine/checkConditions.ts` | memory, npc affinity |
| `store/gameStore.ts` | hook payoff, emotional flow |
| `components/RelationshipPanel.tsx` | **mới** |
| `components/DialogueBox.tsx` | **mới** |
| `pages/PlayPage.tsx` | type emotional |
| `pages/EndingPage.tsx` | LifeJournal |
| `constants/images.ts` | +2–8 key |

---

## 12. Thứ tự implement (khi bắt đầu code)

- [ ] **G1.0** Schema + memory + payoff engine (không scene mới)
- [ ] **G1.1** Viết lại `phil_minh` → `phil_minh_v2` + copy show don't tell
- [ ] **G1.2** Beat `emo_exam` + `exam_sleep` memory
- [ ] **G1.3** Arc bạn thân: memory 15 + `bf_mirror_28` + ảnh `friend-success`
- [ ] **G1.4** Payoff `english_started_15` → remote 28 (1 choice)
- [ ] **G1.5** Mẹ 2 beat + journal templates
- [ ] **G1.6** Lover lite + startup distance
- [ ] **G1.7** Journal đời ở ending + analysis copy
- [ ] **G1.8** RelationshipPanel UI
- [ ] **G1.9** Playtest + cân stat

**Ước lượng:** 10–14 ngày part-time (1 người, content + code).

---

## 13. Tiêu chí nghiệm thu G1

- [ ] Ít nhất **2 NPC** nhớ lựa chọn (Minh + bạn thân)
- [ ] **1 payoff** 15→28 và **1 payoff** 18→35 (hoặc 28 contrast)
- [ ] **2 beat emotional** có ảnh + văn (thi + bạn thân)
- [ ] Triết học **không** gợi ý C = đúng
- [ ] Ending hiển thị **nhật ký đoạn văn**, không chỉ bullet
- [ ] Mỗi nhánh lớn có **trade-off** thể hiện trong stat hoặc NPC

---

## 14. Ngoài phạm vi G1 (ghi cho G2)

- Random event pool
- Personality drift (tham vọng / hướng nội / …)
- Hidden ending: du lịch, tối giản, triết gia, phá sản làm lại
- Màu UI / nhạc theo tuổi
- Animation

---

*Phiên bản: 1.0 — G1 design doc. Cập nhật khi chốt tên NPC (bfName mặc định: "Khang").*
