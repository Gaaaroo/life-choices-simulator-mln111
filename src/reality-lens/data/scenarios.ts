export type ScenarioGuess = {
  id: string;
  label: string;
  /** Chạm đúng bản chất (không chỉ mô tả lại hiện tượng) */
  isCorrect: boolean;
  /** Giải thích sau khi quét — vì sao đúng / sai */
  feedback: string;
};

export type PhenomenonScenario = {
  id: string;
  title: string;
  phenomenon: string;
  /** Manh mối quan sát — user phải đọc để suy luận */
  clues: string[];
  question: string;
  guesses: ScenarioGuess[];
  essence: string;
  philosophy: {
    phenomenon: string;
    essence: string;
  };
};

export const CHAPTER1_SCENARIOS: PhenomenonScenario[] = [
  {
    id: "student_sleep",
    title: "Hồ sơ quan sát #01 — Lớp học buổi sáng",
    phenomenon:
      "Minh — sinh viên năm 2 — gục xuống bàn trong giờ học. Giáo viên gọi tên hai lần mới tỉnh. Tuần trước Minh vẫn trả lời được bài; bài tập nộp đúng hạn, điểm không tụt.",
    clues: [
      "Bạn cùng phòng nói Minh mới đổi ca làm thêm ở quán 24h — ca đêm 22h–6h, bốn đêm/tuần.",
      "Mẹ Minh gọi điện cho cố vấn: gia đình đang gom tiền học phí kỳ sau, chưa đủ.",
      "Minh không chơi game trong lớp; sách vở vẫn có ghi chú, không như bỏ học.",
    ],
    question:
      "Dựa trên hiện tượng và manh mối, nguyên nhân sâu nhất (bản chất) là gì?",
    guesses: [
      {
        id: "lazy",
        label: "Thiếu ý thức, lười học",
        isCorrect: false,
        feedback:
          "Đây là kết luận từ hành vi nhìn thấy (ngủ gục), không giải thích vì sao bài vẫn nộp đúng hạn và có ghi chú.",
      },
      {
        id: "disrespect",
        label: "Không tôn trọng giáo viên / thái độ học tập kém",
        isCorrect: false,
        feedback:
          "Vẫn gán cho thái độ cá nhân. Manh mối về ca đêm và học phí cho thấy vấn đề nằm ở hoàn cảnh sống.",
      },
      {
        id: "gaming",
        label: "Thức khuya chơi game, sinh hoạt không lành mạnh",
        isCorrect: false,
        feedback:
          "Gần hiện tượng (mệt, ngủ) nhưng không khớp dữ kiện: làm thêm ca đêm, không chơi game trong lớp.",
      },
      {
        id: "financial",
        label: "Áp lực tài chính — phải làm thêm ca đêm để trang trải học phí",
        isCorrect: true,
        feedback:
          "Đúng bản chất: mệt vì lao động thêm gánh nặng kinh tế, không phải vì “bản chất lười”.",
      },
    ],
    essence:
      "Minh ngủ trong lớp vì kiệt sức sau ca làm đêm — hệ quả của áp lực tài chính gia đình. Hiện tượng “lười” che đi bản chất “phải kiếm sống để học”.",
    philosophy: {
      phenomenon: "Ngủ gục trong lớp.",
      essence: "Áp lực tài chính và lao động thêm.",
    },
  },
  {
    id: "startup_fail",
    title: "Hồ sơ quan sát #02 — Startup sau 12 tháng",
    phenomenon:
      "App “FoodFlash” giao đồ ăn trong 15 phút — ra mắt rầm rộ, quảng cáo đầy MXH, nhận vốn seed. Sau 12 tháng đóng cửa: nhà đầu tư rút, team giải tán.",
    clues: [
      "Khảo sát tuần đầu: 70% user thử 1 lần rồi gỡ app — phản hồi “đợi lâu hơn app khác, không có gì đặc biệt”.",
      "Đối thủ đã có mạng shipper dày; FoodFlash không hợp tác nhà hàng đủ khu vực.",
      "Burn rate cao cho marketing, trong khi retention (giữ chân user) dưới 5% sau tháng đầu.",
      "Sản phẩm không có tính năng giải quyết pain point mà khảo sát ghi nhận: “đồ ăn đến đúng giờ cam kết”.",
    ],
    question:
      "Điều gì ở tầng bản chất khiến startup thất bại — không chỉ “khó kinh doanh”?",
    guesses: [
      {
        id: "luck",
        label: "Thiếu may mắn / thời điểm thị trường không thuận",
        isCorrect: false,
        feedback:
          "May mắn là hiện tượng bên ngoài. Dữ liệu retention và phản hồi user chỉ ra lỗi cấu trúc sản phẩm.",
      },
      {
        id: "team",
        label: "Team yếu, thiếu kinh nghiệm vận hành",
        isCorrect: false,
        feedback:
          "Có thể đúng một phần nhưng chưa chạm lõi: ngay cả team giỏi cũng khó cứu sản phẩm không đúng nhu cầu.",
      },
      {
        id: "competition",
        label: "Cạnh tranh gay gắt, thị trường đã bão hòa",
        isCorrect: false,
        feedback:
          "Mô tả bối cảnh (hiện tượng kinh tế) chứ chưa nói vì sao user không ở lại — bản chất nằm ở giá trị sản phẩm.",
      },
      {
        id: "pmf",
        label: "Sản phẩm không giải quyết đúng nhu cầu thật của người dùng",
        isCorrect: true,
        feedback:
          "Đúng bản chất: sai product–market fit — quảng cáo lớn không bù được giá trị cốt lõi yếu.",
      },
    ],
    essence:
      "Startup chết vì bản chất sản phẩm: không tạo giá trị bền cho user (retention thấp, pain point không được giải quyết). Hiện tượng “thất bại sau 1 năm” che đi bản chất “sai nhu cầu thị trường”.",
    philosophy: {
      phenomenon: "Đóng cửa sau 12 tháng.",
      essence: "Sai nhu cầu / giá trị sản phẩm.",
    },
  },
  {
    id: "quiet_person",
    title: "Hồ sơ quan sát #03 — Đồng nghiệp im lặng",
    phenomenon:
      "Lan — nhân viên mới 8 tháng — từ năng động, hay phát biểu trong họp, giờ ngồi góc, trả lời ngắn, tránh ăn trưa cùng team.",
    clues: [
      "Ba tuần trước Lan bị sếp phê bình trước mặt cả phòng vì sai số liệu báo cáo — không có cố ý, nhưng bị gọi là “cẩu thả”.",
      "HR ghi nhận Lan vẫn làm đủ KPI; không có kỷ luật, không xin nghỉ dài ngày.",
      "Bạn thân nói Lan đêm không ngủ được, sợ vào họp, sợ bị hỏi thêm.",
      "Lan không từ chối giao tiếp với khách hàng qua email/chat — chỉ né họp nội bộ.",
    ],
    question:
      "Bản chất nào giải thích sự thay đổi hành vi của Lan — không chỉ “khó gần”?",
    guesses: [
      {
        id: "arrogant",
        label: "Kiêu ngạo, không muốn hòa đồng",
        isCorrect: false,
        feedback:
          "Suy đoán từ hiện tượng (ít nói). Trước đây Lan năng động — thay đổi đột ngột sau sự kiện phê bình.",
      },
      {
        id: "introvert",
        label: "Tính cách hướng nội, không thích giao tiếp",
        isCorrect: false,
        feedback:
          "Gán nhãn cố định cho con người. Lan vẫn làm việc qua email/chat — vấn đề gắn với sợ hãi sau biến cố.",
      },
      {
        id: "cold",
        label: "Coi thường đồng nghiệp, thái độ lạnh lùng",
        isCorrect: false,
        feedback:
          "Đánh giá đạo đức từ bề ngoài. Manh mối trỏ tới tổn thương tâm lý sau phê bình công khai.",
      },
      {
        id: "psychological",
        label: "Mất tự tin, áp lực tâm lý sau biến cố phê bình",
        isCorrect: true,
        feedback:
          "Đúng bản chất: hành vi im lặng là triệu chứng của tổn thương tâm lý, không phải “bản chất kiêu ngạo”.",
      },
    ],
    essence:
      "Lan rút lui vì mất tự tin và lo âu sau khi bị phê bình trước tập thể — bản chất tâm lý, không phải bản chất “không thích giao tiếp”. Hiện tượng “lạnh lùng” che đi bản chất “đang tổn thương”.",
    philosophy: {
      phenomenon: "Ít nói, tránh họp.",
      essence: "Áp lực tâm lý, mất tự tin.",
    },
  },
  {
    id: "influencer_luxury",
    title: "Hồ sơ quan sát #04 — Influencer và cuộc sống “sang”",
    phenomenon:
      "Huy — 24 tuổi — luôn xuất hiện trên mạng với xe thuê, quán rooftop, caption “Grind & Glow”. Follower 200K, được gọi là “thành công sớm”.",
    clues: [
      "Story đăng lúc 2–3 giờ sáng rồi xóa sáng hôm sau; bạn chụp hình nói mỗi buổi chụp mất cả ngày setup.",
      "Ngân hàng gửi nhắc nợ thẻ tín dụng; Huy vay bạn mượn tiền trả góp iPhone “để quay content”.",
      "Hợp đồng brand trả chậm — doanh thu thật chủ yếu từ 2–3 video viral, không ổn định.",
      "Trong livestream riêng (bị leak): “Nếu không post hôm nay, tháng sau không biết ăn gì.”",
    ],
    question:
      "Bản chất nào đứng sau hình ảnh “thành công” — không phải chỉ “sống giàu”?",
    guesses: [
      {
        id: "born_rich",
        label: "Gia đình giàu, được bố mẹ tài trợ",
        isCorrect: false,
        feedback:
          "Suy đoán từ hiện tượng (đồ hiệu, xe sang). Manh mối nợ nần và thu nhập bấp bênh mâu thuẫn với giàu có thật.",
      },
      {
        id: "lucky_viral",
        label: "May mắn viral — tài năng được công nhận",
        isCorrect: false,
        feedback:
          "Nhìn kết quả (follower) mà bỏ qua cơ chế: một vài video viral không tạo nên ổn định — vẫn là hiện tượng thành công.",
      },
      {
        id: "lazy_showoff",
        label: "Thích khoe, sống ảo, thiếu nghiêm túc",
        isCorrect: false,
        feedback:
          "Phán xét đạo đức từ bề ngoài. “Sống ảo” là hiện tượng; chưa giải thích vì sao phải duy trì hình ảnh đó để sinh tồn.",
      },
      {
        id: "attention_economy",
        label:
          "Sống bằng cách bán hình ảnh — áp lực kinh tế trong nền kinh tế chú ý",
        isCorrect: true,
        feedback:
          "Đúng bản chất: thành công hiển thị là công cụ kiếm sống; hiện tượng “giàu sang” che cấu trúc bất ổn và lao động ẩn phía sau content.",
      },
    ],
    essence:
      "Huy không “giàu” — anh đang lao động để duy trì một hiện tượng thành công có thể monetize. Bản chất là kinh tế chú ý: hình ảnh trở thành hàng hóa, con người bị ép perform để tồn tại.",
    philosophy: {
      phenomenon: "Lifestyle sang, influencer thành công.",
      essence: "Lao động ẩn & áp lực kinh tế — hình ảnh là hàng hóa.",
    },
  },
  {
    id: "layoff_performance",
    title: "Hồ sơ quan sát #05 — Thông báo sa thải “vì hiệu suất”",
    phenomenon:
      "Công ty TechNova công bố cắt 20% nhân sự. Email toàn công ty: “Tái cấu trúc để nâng hiệu suất — chia tay những người không phù hợp văn hóa và năng suất.”",
    clues: [
      "Cùng ngày công bố, CEO nhận thưởng thêm; báo cáo tài chính ghi “tối ưu chi phí nhân sự” là mục tiêu quý.",
      "Một số team vừa giao sản phẩm đúng deadline vẫn bị cắt — trong danh sách có cả senior 10 năm.",
      "HR nội bộ (rò rỉ): tiêu chí chính là mức lương cao và vị trí không “core”, không phải KPI cá nhân.",
      "Cổ phiếu tăng 8% sau thông báo — phân tích viên ghi “margin improvement”.",
    ],
    question:
      "Bản chất của đợt sa thải là gì — không dừng ở “người kém hiệu suất bị loại”?",
    guesses: [
      {
        id: "bad_employees",
        label: "Đúng là nhân viên kém — công ty cần người giỏi hơn",
        isCorrect: false,
        feedback:
          "Tin vào lời giải hiện tượng (email HR). Manh mối cho thấy người làm tốt vẫn bị cắt — tiêu chí không phải năng suất thuần.",
      },
      {
        id: "culture_fit",
        label: "Không hòa nhập văn hóa công ty",
        isCorrect: false,
        feedback:
          "“Văn hóa” dễ trở thành nhãn che số liệu. Không giải thích vì sao cắt senior và team hoàn thành deadline.",
      },
      {
        id: "market_crisis",
        label: "Khủng hoảng kinh tế — công ty phải sống còn",
        isCorrect: false,
        feedback:
          "Bối cảnh vĩ mô có thể đúng một phần, nhưng bản chất ở đây là chuyển chi phí lao động thành lợi nhuận cổ đông — cổ phiếu tăng ngay sau cắt giảm.",
      },
      {
        id: "profit_over_people",
        label:
          "Cắt giảm chi phí nhân sự phục vụ lợi nhuận — hiệu suất chỉ là lớp ngôn từ",
        isCorrect: true,
        feedback:
          "Đúng bản chất: hiện tượng “meritocracy” che cơ chế tích lũy vốn — lao động bị coi là biến số tối ưu hóa.",
      },
    ],
    essence:
      "Sa thải không phải sàng lọc năng suất thuần túy — bản chất là tái phân bổ giá trị: giảm chi phí lao động, tăng margin, làm hài lòng nhà đầu tư. Hiện tượng “kém hiệu suất” biện hóa cho quyết định kinh tế.",
    philosophy: {
      phenomenon: "Sa thải vì hiệu suất / văn hóa.",
      essence: "Logic lợi nhuận & tích lũy vốn.",
    },
  },
  {
    id: "elder_scavenger",
    title: "Hồ sơ quan sát #06 — Bà cụ nhặt ve chai",
    phenomenon:
      "Bà Năm — 71 tuổi — mỗi sáng đẩy xe ba bánh đi nhặt ve chai. Quần áo phai, tay chai sạn. Hàng xóm hay bảo: “Tuổi già nên nghỉ, con cháu lo được rồi.”",
    clues: [
      "Con trai bà ở tỉnh gọi điện cảm ơn hàng xóm — tiền gửi về đều đặn mỗi tháng cho cháu học đại học.",
      "Bà có sổ tiết kiệm nhỏ; từ chối nhận trợ cấp xã vì “còn đi được thì tự kiếm, đừng tranh với người khó hơn”.",
      "Bà từng là công nhân may 30 năm; chồng mất sớm, nuôi ba con một mình.",
      "Hàng xóm không biết: bà nhặt thêm để có việc “ra khỏi nhà trống”, không phải vì thiếu cơm.",
    ],
    question:
      "Bản chất nào giải thích hành vi của bà — không chỉ “nghèo khó nên phải nhặt”?",
    guesses: [
      {
        id: "poverty",
        label: "Quá nghèo — không đủ sống nên phải nhặt ve chai",
        isCorrect: false,
        feedback:
          "Nhìn hiện tượng vật chất (quần áo cũ, công việc vất vả). Bà có tiết kiệm, con gửi tiền — không khớp “thiếu cơm” thuần túy.",
      },
      {
        id: "greedy",
        label: "Tham tiền, không chịu nghỉ dù đủ sống",
        isCorrect: false,
        feedback:
          "Phán xét đạo đức từ bên ngoài. Bà từ chối trợ cấp và gửi tiền cho cháu — động cơ không phải tham lam cá nhân.",
      },
      {
        id: "family_abandoned",
        label: "Con cháu bất hiếu, bà bị bỏ rơi",
        isCorrect: false,
        feedback:
          "Suy đoán không có căn cứ trong manh mối. Con trai vẫn liên lạc và nhận tiền bà gửi — quan hệ không đứt.",
      },
      {
        id: "dignity_sacrifice",
        label:
          "Lao động để giữ phẩm giá, hy sinh & gắn kết thế hệ — không chỉ vì thiếu tiền",
        isCorrect: true,
        feedback:
          "Đúng bản chất: nhặt ve chai là cách bà tự chủ, có việc, tiếp tục đóng góp cho con cháu — hiện tượng “nghèo hèn” che phẩm giá lao động và tình thương có điều kiện xã hội.",
      },
    ],
    essence:
      "Bà Năm không đơn thuần “nghèo” — bà chọn lao động để giữ tự trọng, không phụ thuộc, và tiếp tục chăm thế hệ sau. Hiện tượng ve chai che bản chất: người lao động cả đời vẫn tự khẳng định mình qua hành động, trong cấu trúc xã hội khiến tuổi già khó được nghỉ thật sự.",
    philosophy: {
      phenomenon: "Tuổi già nhặt ve chai.",
      essence: "Phẩm giá lao động, hy sinh & quan hệ gia đình.",
    },
  },
];

export type CapabilityAction = {
  id: string;
  label: string;
  description: string;
  isCorrect: boolean;
};

export type CapabilityScenario = {
  id: string;
  title: string;
  situation: string;
  capabilities: string[];
  /** Điều kiện còn thiếu — giúp user hiểu khả năng ≠ hiện thực */
  conditionsNeeded: string[];
  actions: CapabilityAction[];
  successMessage: string;
  failMessage: string;
  philosophy: {
    potential: string;
    reality: string;
    insight: string;
  };
};

export const CHAPTER2_SCENARIOS: CapabilityScenario[] = [
  {
    id: "software_engineer",
    title: "Mô phỏng #01 — Trở thành Software Engineer",
    situation:
      "Nam — sinh viên IT năm 2 — muốn trở thành Software Engineer tại công ty lớn sau khi tốt nghiệp.",
    capabilities: [
      "Biết code cơ bản (Python, HTML)",
      "Có laptop và internet ổn định",
      "Có đam mê công nghệ",
      "Có thời gian 2–3 giờ/ngày ngoài giờ học",
    ],
    conditionsNeeded: [
      "Kỹ năng đủ điểm phỏng vấn (DSA, Git, project thật)",
      "Portfolio / kinh nghiệm thực tế được nhìn thấy",
      "Môi trường luyện tập & phản hồi (mentor, team)",
    ],
    actions: [
      {
        id: "study_daily",
        label: "Học đều mỗi ngày",
        description: "Duy trì kỷ luật — nền tảng vững dần, biến khả năng thành kỹ năng.",
        isCorrect: true,
      },
      {
        id: "real_projects",
        label: "Làm project thực tế",
        description: "Đưa code lên GitHub, có sản phẩm — điều kiện để khả năng được chứng minh.",
        isCorrect: true,
      },
      {
        id: "networking",
        label: "Networking & teamwork",
        description: "Hackathon, CLB dev — môi trường giúp khả năng thành cơ hội thật.",
        isCorrect: true,
      },
      {
        id: "procrastinate",
        label: "Trì hoãn — “còn nhiều năm mà”",
        description: "Chỉ xem video, không code — khả năng nằm im trong đầu.",
        isCorrect: false,
      },
    ],
    successMessage:
      "Potential → Reality. Nam có portfolio, vượt vòng phỏng vấn — khả năng gặp đủ điều kiện nên trở thành Software Engineer.",
    failMessage:
      "Khả năng vẫn chỉ là tiềm năng — biết code nhưng thiếu hành động và điều kiện (project, kỷ luật).",
    philosophy: {
      potential: "Muốn làm SE, biết code cơ bản.",
      reality: "Có việc làm SE — khi kỹ năng được chứng minh.",
      insight:
        "Đam mê là khả năng; offer letter là hiện thực — cần hành động liên tục và bằng chứng thực tế.",
    },
  },
  {
    id: "study_abroad",
    title: "Mô phỏng #02 — Học bổng du học Thạc sĩ",
    situation:
      "Trang — sinh viên năm 3, GPA 3.7 — mơ nhận học bổng thạc sĩ ở nước ngoài năm tới. Bạn bè nói “giỏi vậy chắc được”.",
    capabilities: [
      "Học tốt môn chuyên ngành",
      "IELTS 6.0 (chưa đạt yêu cầu 6.5–7.0)",
      "Có ý tưởng nghiên cứu rõ ràng",
      "Gia đình có thể hỗ trợ một phần chi phí",
    ],
    conditionsNeeded: [
      "Điểm ngôn ngữ đạt chuẩn chương trình",
      "Bài luận + thư giới thiệu chất lượng",
      "Kinh nghiệm nghiên cứu / thực tập được ghi nhận",
      "Hồ sơ nộp đúng deadline, đúng quy trình",
    ],
    actions: [
      {
        id: "ielts_research",
        label: "Luyện IELTS + làm đề án với giảng viên",
        description: "Biến ý tưởng thành bài nghiên cứu — điều kiện cốt lõi của hồ sơ.",
        isCorrect: true,
      },
      {
        id: "apply_early",
        label: "Lập timeline & nộp hồ sơ sớm",
        description: "Nhờ mentor review — tạo điều kiện thời gian và chất lượng.",
        isCorrect: true,
      },
      {
        id: "lab_poster",
        label: "Tham gia lab, trình bày poster",
        description: "Môi trường học thuật — khả năng được công nhận bên ngoài bảng điểm.",
        isCorrect: true,
      },
      {
        id: "gpa_only",
        label: "Chỉ giữ GPA cao — “năm sau lo hồ sơ”",
        description: "Tin rằng học giỏi = đủ — bỏ qua điều kiện ngôn ngữ và hồ sơ.",
        isCorrect: false,
      },
    ],
    successMessage:
      "Potential → Reality. Trang nhận học bổng một phần — khả năng học giỏi đã gặp đủ điều kiện (ngôn ngữ, nghiên cứu, hồ sơ).",
    failMessage:
      "GPA cao vẫn chỉ là khả năng — thiếu điều kiện hồ sơ và hành động, ước mơ du học không thành hiện thực.",
    philosophy: {
      potential: "Giỏi, có ước mơ du học.",
      reality: "Có học bổng — khi hồ sơ & điều kiện khớp chương trình.",
      insight:
        "Xã hội hay nhầm khả năng (GPA) với hiện thực (học bổng). Giữa hai điều là điều kiện khách quan và hành động có kế hoạch.",
    },
  },
];

/** @deprecated — dùng CHAPTER2_SCENARIOS */
export const CHAPTER2_ACTIONS = CHAPTER2_SCENARIOS[0].actions;
/** @deprecated */
export const CHAPTER2_CONTEXT = {
  situation: CHAPTER2_SCENARIOS[0].situation,
  capabilities: CHAPTER2_SCENARIOS[0].capabilities,
  successMessage: CHAPTER2_SCENARIOS[0].successMessage,
  failMessage: CHAPTER2_SCENARIOS[0].failMessage,
};
