# Life Choices G1 — Prompt tạo ảnh (tiếng Việt)

**Mục tiêu:** 11 ảnh cũ + **8 ảnh mới** = **19 ảnh** (G1 đủ polish).  
**Tối thiểu implement:** chỉ cần **#1 + #2** (+11 cũ = 13).

**Lưu file:** `public/image/` · Đặt tên file đúng cột **File**.

**Style chung (dán cuối mỗi prompt):**  
> Minh họa visual novel bán thực tế Việt Nam, nét sạch, cel-shading mềm, palette pastel (xanh ngọc, kem, cam nhạt). Tỉ lệ 2:3 dọc, 768×1152, không chữ, không watermark, không logo.

**Nhân vật chính (player):** Nam trẻ Việt Nam, tóc đen ngắn, mắt nâu, thân gầy — **cùng một khuôn mặt** như ảnh `idle.png` đã có. Gen `idle` trước, dùng làm reference.

**NPC:** Cùng style game; Minh và Khang (bạn thân) **khác** khuôn mặt nhau và khác player.

---

## Bắt buộc G1 (2 ảnh)

### 1. `exam-sleep.png` — Thi ngủ gục

**Key code:** `examSleep`  
**Scene:** Sau game xuyên đêm → sáng gục trong phòng thi.

```
Nam sinh Việt Nam 17–18 tuổi (cùng khuôn mặt nhân vật chính), gục đầu trên bàn thi trong phòng thi phổ thông, bút rơi, giấy thi, ánh sáng huỳnh quang lạnh buổi sáng, vẻ kiệt sức và hối hận. Giám thị hoặc học sinh khác chỉ là hình bóng mờ phía sau. Không máu, không kịch tính thái quá. Góc 3/4, nhấn mệt mỏi. Visual novel bán thực tế Việt Nam.
```

---

### 2. `friend-success.png` — Bạn thân thành công / mình tụt (tuổi 28)

**Key code:** `friendSuccess`  
**Scene:** `bf_mirror_28` — contrast cảm xúc.

```
Hai nam trẻ Việt Nam 27–28 tuổi trong hành lang văn phòng hiện đại. Người bên trái (bạn thân Khang): vest công sở, tự tin, nụ cười nhẹ, đeo badge. Người bên phải (nhân vật chính — cùng face idle.png): áo sơ mi nhăn, mệt, nhìn xuống hoặc nhìn bạn với vẻ phức tạp (ghen tị + tự ti + nhớ hồi game cùng nhau). Không gian sáng nhưng cảm giác cách biệt. Visual novel, contrast cảm xúc rõ, không chữ.
```

---

## Khuyến nghị — lên 15 ảnh (+2)

### 3. `two-friends-game.png` — Tuổi 15: cùng chơi game

**Key code:** `friendsGame`  
**Scene:** Memory `bf_game_bond_15`, đêm hè.

```
Hai nam học sinh Việt Nam 15–16 tuổi cùng chơi game trên PC trong phòng nhỏ, đèn RGB, đêm hè, cửa sổ mở gió nhẹ. Nhân vật chính (face giống idle.png) và bạn thân Khang (khuôn mặt khác, tóc khác một chút) đều cười thoải mái, tai nghe, năng lượng đồng điệu. Ấm áp, hoài niệm. Visual novel bán thực tế. Không logo game trên màn hình.
```

---

### 4. `minh-tired.png` — Minh: vừa làm thêm vừa mệt học (bản chất phức tạp)

**Key code:** `minhTired`  
**Scene:** Reveal triết học Minh v2 — không moralize.

```
Nam học sinh Việt Nam 16 tuổi tên Minh (khuôn mật KHÁC nhân vật chính), mặc đồng phục quán cà phê hoặc tạp hóa, vừa mang khay nước vừa ôm sách trên tay, mắt mệt nhưng kiên nhẫn, ánh đèn vàng quán. Gợi ý vừa đi làm thêm vừa thiếu ngủ — không villain. Cảm giác đồng cảm. Visual novel. Không chữ trên áo.
```

---

## Khuyến nghị — lên ~17–19 ảnh (+4 NPC / beat)

### 5. `mother-phone.png` — Mẹ gọi / nhắc nhở

**Key code:** `motherPhone`  
**Scene:** `mother_call_15`, `mother_remind_22`.

```
Nam trẻ 18–22 tuổi (face nhân vật chính) cầm điện thoại ngồi trong phòng trọ hoặc KTX, biểu cảm dao động (muốn cúp máy nhưng lại thương), màn hình điện thoại sáng gợi ý cuộc gọi “Mẹ” (không chữ đọc được, chỉ icon trái tim hoặc màu xanh). Đồ đạc gọn, tối nhẹ. Visual novel, ấm buồn. Không hiện số điện thoại thật.
```

**Hoặc thay bằng:** ảnh mẹ (silhouette) ở cửa — prompt alt:

```
Phòng ăn Việt Nam tối, bàn cơm đơn giản, ghế trống phía đối diện, bóng người phụ nữ trung niên (mẹ) đứng ở cửa như chờ con về, ánh vàng ấm, không thấy rõ mặt mẹ, góc nhìn từ phía con. Melancholic, visual novel. Không chữ.
```

---

### 6. `lover-distance.png` — Người yêu / khoảng cách

**Key code:** `loverSad`  
**Scene:** `lover_distance_28` sau startup.

```
Cặp nam nữ trẻ Việt Nam trong căn hộ nhỏ, không khí lạnh nhẹ. Nữ (tóc dài, áo đơn giản) quay lưng hoặc ngồi xa, nam (nhân vật chính, face idle) đứng với túi laptop/vali startup. Cửa sổ đêm mưa hoặc đèn thành phố. Cảm giác chia tay nhẹ, không drama bạo lực. Visual novel bán thực tế. Không chữ.
```

---

### 7. `mentor-coffee.png` — Mentor gặp gỡ

**Key code:** `mentorCoffee`  
**Scene:** `mentor_coffee` tuổi 20.

```
Quán cà phê Việt Nam ban ngày, nam trẻ 20 tuổi (nhân vật chính) ngồi đối diện nam trung niên 40 tuổi (mentor, vest casual, ấm áp), ly cà phê, sách hoặc laptop mở. Mentor chỉ tay hoặc lắng nghe, vibe cố vấn. Sáng, hy vọng. Visual novel. Không logo quán, không chữ.
```

---

### 8. `english-study.png` — Học tiếng Anh (payoff dài hạn)

**Key code:** `englishStudy`  
**Scene:** Choice tuổi 15 / memory `english_started_15`.  
*(Có thể bỏ nếu tái dùng `study.png`.)*

```
Nam học sinh 15–16 tuổi (face nhân vật chính) ngồi bàn trong phòng, sách tiếng Anh + tai nghe, mồ hôi nhẹ, quyết tâm, cửa sổ mùa hè. Khác vibe “học bài thường” — có laptop hoặc app học (màn hình mờ không chữ). Visual novel, ánh sáng vàng ấm. Gợi ý đầu tư tương lai.
```

---

## Bảng tóm tắt

| # | File | Bắt buộc G1? | Thay bằng ảnh cũ? |
|---|------|--------------|-------------------|
| 1 | exam-sleep.png | **Có** | — |
| 2 | friend-success.png | **Có** | — |
| 3 | two-friends-game.png | Không | `game.png` (1 người) |
| 4 | minh-tired.png | Không | `work.png` |
| 5 | mother-phone.png | Không | `phoneGame.png` / beat text-only |
| 6 | lover-distance.png | Không | `sad.png` |
| 7 | mentor-coffee.png | Không | `social.png` |
| 8 | english-study.png | Không | `study.png` |

---

## Thứ tự gen đề xuất

1. `idle.png` (đã có) → reference  
2. `exam-sleep.png`  
3. `friend-success.png` (cần rõ 2 khuôn mặt)  
4. `two-friends-game.png`  
5. `minh-tired.png`  
6. `mother-phone.png`  
7. `lover-distance.png`  
8. `mentor-coffee.png`  
9. `english-study.png` (tuỳ chọn)

---

## Sau khi có ảnh — cập nhật code (nhắc lúc implement)

Thêm vào `src/constants/images.ts`:

```ts
examSleep: "exam-sleep.png",
friendSuccess: "friend-success.png",
friendsGame: "two-friends-game.png",
minhTired: "minh-tired.png",
motherPhone: "mother-phone.png",
loverSad: "lover-distance.png",
mentorCoffee: "mentor-coffee.png",
englishStudy: "english-study.png",
```

Copy vào `public/image/` và folder `image/` ở root nếu bạn sync tay.
