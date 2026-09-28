import { SmartStudyData } from '../types/history';

export const PRESET_SMART_STUDY_DATA: Record<string, SmartStudyData> = {
  'chu-de-1': {
    topicTitle: 'Chủ đề 1: Cách mạng tư sản và sự phát triển của CNTB',
    lessonName: 'Bài 1 & Bài 2: Tiền đề, mục tiêu, động lực và các giai đoạn phát triển của CNTB',
    coreKnowledge: [
      'Tiền đề cách mạng tư sản: Kinh tế (kinh tế TBCN ra đời trong lòng chế độ phong kiến), Chính trị (sự thống trị độc đoán của vua chuyên chế), Xã hội (mâu thuẫn giữa tư sản, quý tộc mới, nông dân, bình dân với phong kiến), Tư tưởng (Triết học Ánh sáng ở Pháp, Thanh giáo ở Anh).',
      'Mục tiêu & nhiệm vụ: Nhiệm vụ dân tộc (thống nhất thị trường hoặc đánh đuổi thực dân) và Nhiệm vụ dân chủ (lật đổ phong kiến, xác lập quyền tự do bình đẳng).',
      'Động lực cách mạng: Giai cấp lãnh đạo là tư sản (hoặc liên minh quý tộc mới); lực lượng tham gia đông đảo nhất là quần chúng nhân dân (nông dân, thợ thủ công).',
      'CNTB hiện đại: Xác lập từ nửa sau thế kỉ XX, mang tính độc quyền nhà nước, ứng dụng CMCN 4.0, toàn cầu hóa nhưng không xóa bỏ được bản chất bóc lột và khủng hoảng.',
    ],
    keywords: {
      timeline: ['1640 (CMTS Anh)', '1776 (Tuyên ngôn Độc lập Mỹ)', '1789 (Đại CMTS Pháp)', 'Thế kỉ XIX (CNTB tự do cạnh tranh)', 'Nửa sau TK XX (CNTB hiện đại)'],
      characters: ['Oliver Cromwell (Anh)', 'George Washington (Mỹ)', 'Thomas Jefferson (Mỹ)', 'Robespierre (Pháp)', 'Napoleon Bonaparte'],
      events: ['Nội chiến Anh', 'Chiến tranh giành độc lập 13 thuộc địa Anh', 'Phá ngục Ba-xti (14-7-1789)', 'Chuyển sang CNTB độc quyền'],
      locations: ['Luân Đôn', 'Phila-đen-phi-a (Bắc Mỹ)', 'Pa-ri (Pháp)', 'Bắc Mỹ', 'Tây Âu'],
      documents: ['Đạo luật Quyền hành (1689)', 'Tuyên ngôn Độc lập Mỹ (1776)', 'Tuyên ngôn Nhân quyền và Dân quyền Pháp (1789)'],
      terms: ['Cách mạng tư sản', 'Quân chủ lập hiến', 'Cộng hòa dân chủ', 'Tổ chức độc quyền (Cartel, Syndicate, Trust, Concern)', 'CNTB độc quyền nhà nước'],
    },
    causeAndEffect: [
      {
        cause: 'Quan hệ sản xuất phong kiến kìm hãm lực lượng sản xuất TBCN mới nảy sinh.',
        event: 'Bùng nổ các cuộc cách mạng tư sản (Hà Lan, Anh, Bắc Mỹ, Pháp).',
        result: 'Lật đổ chế độ phong kiến / ách thực dân, giai cấp tư sản lên nắm quyền.',
        significance: 'Mở đường giải phóng lực lượng sản xuất, mở ra thời đại thắng lợi của CNTB.',
        impact: 'Xác lập nền dân chủ tư sản, tác động sâu sắc đến trật tự thế giới và phong trào giải phóng dân tộc.',
      },
    ],
    comparison: {
      title: 'So sánh Cách mạng tư sản Anh (1640) và Đại cách mạng Pháp (1789)',
      target1Name: 'CMTS Anh (1640 - 1688)',
      target2Name: 'Đại CMTS Pháp (1789 - 1794)',
      rows: [
        {
          aspect: 'Giai cấp lãnh đạo',
          target1: 'Tư sản liên minh với Quý tộc mới',
          target2: 'Giai cấp Tư sản (Phái Gia-cô-banh, Gi-rông-đanh...)',
        },
        {
          aspect: 'Tính chất & Mức độ triệt để',
          target1: 'Không triệt để (vẫn giữ ngôi vua, chưa giải quyết ruộng đất nông dân)',
          target2: 'Cách mạng triệt để nhất (xóa bỏ đẳng cấp phong kiến, chia ruộng đất)',
        },
        {
          aspect: 'Thể chế chính trị thiết lập',
          target1: 'Quân chủ lập hiến (Vua trị vì nhưng Nghị viện nắm thực quyền)',
          target2: 'Nền Cộng hòa dân chủ tư sản',
        },
        {
          aspect: 'Quy mô & Tầm ảnh hưởng',
          target1: 'Ảnh hưởng chủ yếu trong phạm vi đảo quốc Anh và châu Âu',
          target2: 'Làm rung chuyển toàn bộ chế độ phong kiến châu Âu, tính chất quốc tế sâu sắc',
        },
      ],
    },
    commonMistakes: [
      {
        trap: 'Nhầm lẫn giữa "Nhiệm vụ Dân tộc" và "Nhiệm vụ Dân chủ".',
        truth: 'Dân tộc là thống nhất thị trường / đuổi ngoại xâm; Dân chủ là xóa bỏ phong kiến chuyên chế, đem lại quyền tự do công dân.',
        tip: 'Nhớ câu thần chú: "Dân tộc = độc lập, thống nhất; Dân chủ = quyền sống, ruộng đất".',
      },
      {
        trap: 'Cho rằng CNTB hiện đại đã xóa bỏ hoàn toàn bất công và khủng hoảng.',
        truth: 'CNTB hiện đại chỉ có khả năng tự điều chỉnh và mở rộng sản xuất; bản chất tư hữu tư nhân và đối kháng giai cấp vẫn tồn tại.',
        tip: 'Gặp từ "hoàn toàn xóa bỏ mâu thuẫn" -> chắc chắn là SAI.',
      },
    ],
    mindmapSteps: [
      '1. Bối cảnh: Lực lượng sản xuất TBCN mâu thuẫn gay gắt với chế độ phong kiến bảo thủ',
      '2. Tiền đề: Kinh tế hàng hóa + Tư tưởng tiến bộ + Mâu thuẫn giai cấp sâu sắc',
      '3. Bùng nổ: Quần chúng nhân dân nổi dậy, đánh đổ các thiết chế phong kiến',
      '4. Xác lập: Ban hành các Tuyên ngôn dân quyền, xác lập nhà nước tư sản',
      '5. Phát triển: CNTB tự do cạnh tranh (TK XIX) → CNTB độc quyền → CNTB hiện đại ngày nay',
    ],
    threeLevelQuestions: [
      {
        level: 'nhan_biet',
        question: 'Bản Tuyên ngôn Độc lập của nước Mỹ được công bố vào năm nào?',
        options: ['A. Năm 1689.', 'B. Năm 1776.', 'C. Năm 1789.', 'D. Năm 1917.'],
        correctIndex: 1,
        explanation: 'Ngày 4-7-1776, Đại hội đại biểu 13 thuộc địa thông qua Tuyên ngôn Độc lập tại Philadelphia.',
      },
      {
        level: 'thong_hieu',
        question: 'Vì sao cuộc Đại cách mạng tư sản Pháp (1789) được đánh giá là cuộc cách mạng triệt để nhất thời cận đại?',
        options: [
          'A. Vì đã đánh bại tất cả các nước tư sản phương Tây lúc bấy giờ.',
          'B. Vì đã giải quyết triệt để vấn đề ruộng đất cho nông dân và đập tan chế độ phong kiến chuyên chế.',
          'C. Vì đưa giai cấp vô sản lên nắm chính quyền tối cao.',
          'D. Vì duy trì chế độ quân chủ lập hiến hòa bình không đổ máu.',
        ],
        correctIndex: 1,
        explanation: 'Thời kỳ chuyên chính Gia-cô-banh đã ban sắc lệnh chia nhỏ đất đai bán trả góp cho nông dân và hủy bỏ mọi đặc quyền phong kiến không bồi thường.',
      },
      {
        level: 'van_dung',
        question: 'Từ bài học của các cuộc cách mạng tư sản thời cận đại, nhân tố nào giữ vai trò quyết định thắng lợi nhưng quyền lợi thu được lại bị hạn chế nhất?',
        options: [
          'A. Giai cấp quý tộc phong kiến thoái bộ.',
          'B. Quần chúng nhân dân (nông dân, thợ thủ công).',
          'C. Tầng lớp đại tư sản công nghiệp.',
          'D. Các giáo sĩ tôn giáo chính thống.',
        ],
        correctIndex: 1,
        explanation: 'Quần chúng nhân dân là động lực chủ yếu làm nên thắng lợi cách mạng nhưng sau thắng lợi, chính quyền và quyền tư hữu tư liệu sản xuất lại rơi vào tay giai cấp tư sản.',
      },
    ],
  },
  'chu-de-4': {
    topicTitle: 'Chủ đề 4: Chiến tranh bảo vệ Tổ quốc và giải phóng dân tộc (trước 1945)',
    lessonName: 'Bài 7 & Bài 8: Khái quát các cuộc kháng chiến và bài học lịch sử',
    coreKnowledge: [
      'Các mốc kháng chiến thắng lợi tiêu biểu: Kháng chiến chống Tống (Lý Thường Kiệt 1075 - 1077), Ba lần kháng chiến chống Mông - Nguyên (nhà Trần 1258, 1285, 1287 - 1288), Khởi nghĩa Lam Sơn (Lê Lợi - Nguyễn Trãi 1418 - 1427), Kháng chiến chống Xiêm (Rạch Gầm - Xoài Mút 1785) và chống Thanh (Ngọc Hồi - Đống Đa 1789) của phong trào Tây Sơn.',
      'Bài học lịch sử số 1: Khối đại đoàn kết toàn dân tộc - "Dân là gốc", "Khoan thư sức dân để làm kế sâu rễ bền gốc" (Trần Hưng Đạo).',
      'Nghệ thuật quân sự độc đáo: Lấy ít địch nhiều, lấy yếu thắng mạnh, toàn dân đánh giặc, kết hợp đấu tranh quân sự với chính trị, binh vận và ngoại giao.',
    ],
    keywords: {
      timeline: ['938 (Bạch Đằng - Ngô Quyền)', '1077 (Phòng tuyến sông Như Nguyệt)', '1288 (Bạch Đằng - Trần Hưng Đạo)', '1427 (Chi Lăng - Xương Giang)', '1789 (Ngọc Hồi - Đống Đa)'],
      characters: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo (Trần Quốc Tuấn)', 'Lê Lợi', 'Nguyễn Trãi', 'Quang Trung (Nguyễn Huệ)'],
      events: ['Phá Tống bình Chiêm', 'Hội nghị Diên Hồng', 'Hội nghị Bình Than', 'Khởi nghĩa Lam Sơn', 'Chiến dịch Rạch Gầm - Xoài Mút'],
      locations: ['Sông Như Nguyệt', 'Bạch Đằng', 'Chi Lăng - Xương Giang', 'Rạch Gầm - Xoài Mút', 'Ngọc Hồi - Đống Đa'],
      documents: ['Nam quốc sơn hà (Lý Thường Kiệt)', 'Hịch tướng sĩ (Trần Quốc Tuấn)', 'Bình Ngô đại cáo (Nguyễn Trãi)'],
      terms: ['Tiên phát chế nhân', 'Thanh dã (Vườn không nhà trống)', 'Dĩ đoản chế trường', 'Tâm công', 'Toàn dân đánh giặc'],
    },
    causeAndEffect: [
      {
        cause: 'Kẻ thù bành trướng phương Bắc mang quân ồ ạt sang xâm lược nước ta.',
        event: 'Các triều đại lãnh đạo toàn dân kháng chiến anh dũng, lập phòng tuyến hiểm trở, đánh du kích và phản công quyết định.',
        result: 'Quân xâm lược bị tiêu diệt và tháo chạy, buộc phải thừa nhận nền độc lập của Đại Việt.',
        significance: 'Bảo vệ vững chắc độc lập, chủ quyền lãnh thổ, củng cố lòng tự tôn dân tộc.',
        impact: 'Làm phá sản âm mưu bành trướng xuống phương Nam của các đế chế phong kiến hùng mạnh nhất lịch sử nhân loại.',
      },
    ],
    comparison: {
      title: 'So sánh Nghệ thuật quân sự nhà Trần và Nghệ thuật quân sự Tây Sơn',
      target1Name: 'Kháng chiến chống Mông - Nguyên (Nhà Trần)',
      target2Name: 'Kháng chiến chống Thanh (Tây Sơn)',
      rows: [
        {
          aspect: 'Kế sách mở đầu',
          target1: 'Thanh dã (vườn không nhà trống), chủ động rút lui chiến lược để bảo toàn lực lượng',
          target2: 'Chủ động tạm rút về phòng tuyến Tam Điệp - Biện Sơn để củng cố quân sĩ',
        },
        {
          aspect: 'Cách thức phản công',
          target1: 'Chờ địch mệt mỏi, suy kiệt lương thảo rồi tổ chức phản công tổng lực (Đông Bộ Đầu, Hàm Tử, Bạch Đằng)',
          target2: 'Hành quân thần tốc, bất ngờ tiến công dồn dập vào dịp Tết Nguyên Đán, tiêu diệt địch chỉ trong 5 ngày đêm',
        },
        {
          aspect: 'Lực lượng lãnh đạo',
          target1: 'Vương triều quý tộc phong kiến nhà Trần (vua tôi đồng lòng)',
          target2: 'Thủ lĩnh nông dân áo vải cờ đào Nguyễn Huệ',
        },
      ],
    },
    commonMistakes: [
      {
        trap: 'Cho rằng kháng chiến thắng lợi là nhờ vũ khí của cha ông ta tối tân hơn địch.',
        truth: 'Vũ khí ta luôn thô sơ hơn địch (kỵ binh Mông Cổ mạnh nhất thế giới); thắng lợi nhờ LÒNG DÂN và NGHỆ THUẬT QUÂN SỰ.',
        tip: 'Bản chất sức mạnh giữ nước của Việt Nam luôn nằm ở: "DÂN LÀ GỐC" và "KHỐI ĐẠI ĐOÀN KẾT".',
      },
    ],
    mindmapSteps: [
      '1. Khởi nguồn: Kẻ thù xâm lược mang dã tâm thôn tính bờ cõi nước ta',
      '2. Chuẩn bị: Đoàn kết triều đình với muôn dân, củng cố hậu cần ("Khoan thư sức dân")',
      '3. Chiến thuật: Tránh mũi nhọn của giặc khi chúng đang mạnh, tiêu hao sinh lực bằng chiến tranh du kích',
      '4. Quyết chiến: Chọn thời cơ bước ngoặt giáng đòn sấm sét tiêu diệt sinh lực địch (Bạch Đằng, Ngọc Hồi...)',
      '5. Kết thúc: Mở đường hòa hiếu, giữ thể diện cho nước lớn để gìn giữ thái bình lâu dài',
    ],
  },
  'chu-de-5': {
    topicTitle: 'Chủ đề 5: Một số cuộc cải cách lớn trong lịch sử Việt Nam',
    lessonName: 'Bài 9, 10, 11: Cải cách Hồ Quý Ly, Lê Thánh Tông, Minh Mạng',
    coreKnowledge: [
      'Cuộc cải cách Hồ Quý Ly (cuối TK XIV - đầu TK XV): Tiến bộ, táo bạo (tiền giấy Thông bảo hội sao, hạn điền, hạn nô, đề cao chữ Nôm). Thất bại do chưa được lòng dân khi giặc Minh sang xâm lược.',
      'Cuộc cải cách Lê Thánh Tông (thế kỉ XV): Đưa chế độ phong kiến trung ương tập quyền Đại Việt đạt tới đỉnh cao. Chia 13 đạo thừa tuyên (đặt Tam ty giám sát lẫn nhau); ban hành Quốc triều hình luật (Luật Hồng Đức) và bản đồ Hồng Đức.',
      'Cuộc cải cách Minh Mạng (nửa đầu thế kỉ XIX): Xóa bỏ Bắc Thành và Gia Định Thành, thống nhất cả nước thành 30 tỉnh và 1 phủ Thừa Thiên; cải tổ Lục bộ, đặt Cơ mật viện. Đặt nền móng cho địa giới hành chính hiện đại.',
    ],
    keywords: {
      timeline: ['1396 (Phát hành tiền giấy)', '1397 (Hạn điền)', '1471 (13 đạo thừa tuyên)', '1490 (Bản đồ Hồng Đức)', '1831 - 1832 (Cải cách Minh Mạng: 30 tỉnh)'],
      characters: ['Hồ Quý Ly', 'Hồ Nguyên Trừng', 'Lê Thánh Tông', 'Vua Minh Mạng'],
      events: ['Cải cách Hồ Quý Ly', 'Cải cách hành chính Lê Thánh Tông', 'Cải cách hành chính Minh Mạng'],
      locations: ['Tây Đô (Thanh Hóa)', 'Đông Đô (Thăng Long)', '13 đạo thừa tuyên', '30 tỉnh và 1 phủ Thừa Thiên', 'Huế'],
      documents: ['Quốc triều hình luật (Luật Hồng Đức)', 'Hồng Đức bản đồ (1490)', 'Thông bảo hội sao'],
      terms: ['Tam ty (Đô ty, Thừa ty, Hiến ty)', 'Đạo thừa tuyên', 'Hạn điền', 'Hạn nô', 'Cơ mật viện', 'Nội các'],
    },
    causeAndEffect: [
      {
        cause: 'Khủng hoảng chính trị, cát cứ địa phương hoặc nhu cầu củng cố quyền lực tối cao của triều đình.',
        event: 'Tiến hành cải tổ đồng bộ bộ máy hành chính từ trung ương đến địa phương, pháp luật và tài chính.',
        result: 'Quyền lực nhà nước được thống nhất cao độ, tăng cường kiểm soát và phân định quyền hạn.',
        significance: 'Nâng cao năng lực quản trị quốc gia, đặt nền tảng thể chế và địa giới hành chính lâu dài.',
        impact: 'Cung cấp bài học kinh nghiệm sâu sắc về tinh gọn bộ máy, kiểm soát quyền lực và lắng nghe lòng dân.',
      },
    ],
    comparison: {
      title: 'So sánh Cải cách Lê Thánh Tông (TK XV) và Cải cách Minh Mạng (TK XIX)',
      target1Name: 'Cải cách Lê Thánh Tông (1460 - 1497)',
      target2Name: 'Cải cách Minh Mạng (1831 - 1832)',
      rows: [
        {
          aspect: 'Thời gian',
          target1: 'Thế kỉ XV (thời Lê sơ đỉnh cao)',
          target2: 'Nửa đầu thế kỉ XIX (thời nhà Nguyễn thống nhất)',
        },
        {
          aspect: 'Đơn vị hành chính địa phương',
          target1: 'Chia cả nước thành 13 đạo thừa tuyên (mỗi đạo có Tam ty)',
          target2: 'Xóa bỏ 2 thành trung gian, chia thành 30 tỉnh và 1 phủ Thừa Thiên',
        },
        {
          aspect: 'Cơ chế kiểm soát quyền lực',
          target1: 'Bãi bỏ Tướng quốc; đặt Lục bộ dưới quyền trực tiếp của vua; Tam ty ngang quyền kiềm chế nhau',
          target2: 'Thành lập Nội các, Cơ mật viện; quan Tổng đốc / Tuần phủ cai quản tỉnh',
        },
        {
          aspect: 'Dấu ấn pháp luật & di sản',
          target1: 'Quốc triều hình luật (Luật Hồng Đức) nhân văn, bảo vệ người phụ nữ',
          target2: 'Đặt cơ sở phân chia địa giới hành chính cấp tỉnh của Việt Nam đến tận ngày nay',
        },
      ],
    },
    commonMistakes: [
      {
        trap: 'Nhầm lẫn 13 đạo thừa tuyên của Lê Thánh Tông với 30 tỉnh của Minh Mạng.',
        truth: 'Lê Thánh Tông ở TK XV (13 đạo); Minh Mạng ở TK XIX (30 tỉnh).',
        tip: 'Mẹo nhớ: "Lê Thánh Tông - 13 đạo - Hồng Đức"; "Minh Mạng - 30 tỉnh - Thừa Thiên".',
      },
      {
        trap: 'Nghĩ rằng Hồ Quý Ly cải cách thất bại do nội dung cải cách phản động, thụt lùi.',
        truth: 'Nội dung rất tiến bộ, nhưng thất bại do làm vội vã, xâm phạm quý tộc cũ và không thu phục được lòng dân khi có chiến tranh.',
        tip: '"Thần không sợ đánh, chỉ sợ lòng dân không theo" - Hồ Nguyên Trừng.',
      },
    ],
    mindmapSteps: [
      '1. Nhu cầu: Khủng hoảng cuối triều đại hoặc yêu cầu tập trung quyền lực quốc gia',
      '2. Trung ương: Bãi bỏ chức vụ trung gian đại thần, vua nắm quyền điều hành trực tiếp',
      '3. Địa phương: Chia nhỏ đơn vị để dễ kiểm soát (Đạo thừa tuyên / Tỉnh)',
      '4. Giám sát: Thiết lập các cơ quan giám sát độc lập, chống quan liêu tham nhũng',
      '5. Pháp luật: Ban hành luật pháp chuẩn mực để trị nước theo quy củ',
    ],
  },
  'chu-de-6': {
    topicTitle: 'Chủ đề 6: Lịch sử bảo vệ chủ quyền của Việt Nam ở Biển Đông',
    lessonName: 'Bài 12 & Bài 13: Tầm quan trọng của Biển Đông và quá trình thực thi chủ quyền',
    coreKnowledge: [
      'Vị trí chiến lược của Biển Đông: Tuyến hàng hải quốc tế huyết mạch thứ hai thế giới nối liền Thái Bình Dương và Ấn Độ Dương. Việt Nam có bờ biển dài trên 3.260 km với hàng nghìn hòn đảo lớn nhỏ.',
      'Hai quần đảo Hoàng Sa và Trường Sa: Nằm ở trung tâm Biển Đông, có vị trí địa chiến lược và an ninh quốc phòng sinh tử đối với nước ta.',
      'Quá trình xác lập chủ quyền: Các chúa Nguyễn lập Đội Hoàng Sa, Đội Bắc Hải kiêm quản (thế kỉ XVII). Triều Tây Sơn duy trì các đội Hoàng Sa. Triều Nguyễn đo đạc hải trình, cắm bia chủ quyền, vẽ bản đồ "Đại Nam nhất thống toàn đồ" (1838).',
      'Cơ sở pháp lý: UNCLOS 1982 (quy định Lãnh hải 12 hải lý, EEZ 200 hải lý), Tuyên bố ứng xử DOC 2002, Luật Biển Việt Nam năm 2012.',
    ],
    keywords: {
      timeline: ['Thế kỉ XVII (Lập đội Hoàng Sa)', '1816 (Vua Gia Long cắm mốc)', '1838 (Đại Nam nhất thống toàn đồ)', '1982 (UNCLOS)', '2002 (Tuyên bố DOC)', '2012 (Luật Biển VN)'],
      characters: ['Chúa Nguyễn Hoàng', 'Vua Gia Long', 'Vua Minh Mạng', 'Lê Quý Đôn (Phủ biên tạp lục)', 'Đỗ Bá (Thiên Nam tứ chí lộ đồ thư)'],
      events: ['Thành lập Đội Hoàng Sa & Bắc Hải', 'Hải đội Hoàng Sa dong buồm hàng năm', 'Lễ khao lề thế lính Hoàng Sa', 'Ký kết UNCLOS 1982'],
      locations: ['Quần đảo Hoàng Sa', 'Quần đảo Trường Sa', 'Đảo Lý Sơn (Quảng Ngãi)', 'Cửa biển Eo (Thuận An)', 'Bãi Cát Vàng'],
      documents: ['Toản tập Thiên Nam tứ chí lộ đồ thư', 'Phủ biên tạp lục', 'Đại Nam thực lục', 'Châu bản - Mộc bản triều Nguyễn', 'UNCLOS 1982'],
      terms: ['Thụ đắc lãnh thổ', 'Chiếm hữu thực sự, hòa bình, liên tục', 'Đường cơ sở', 'Lãnh hải (12 hải lý)', 'Vùng đặc quyền kinh tế EEZ (200 hải lý)', 'Thềm lục địa'],
    },
    causeAndEffect: [
      {
        cause: 'Nhu cầu khai thác hải sản quý, cứu nạn tàu đắm và bảo vệ an ninh bờ cõi duyên hải.',
        event: 'Nhà nước Đại Việt liên tục phái quan quân, dân đinh ra cắm mốc, đo đạc hải trình, dựng miếu lập bia tại Hoàng Sa, Trường Sa dưới danh nghĩa nhà nước.',
        result: 'Xác lập và thực thi chủ quyền của Việt Nam đối với hai quần đảo Hoàng Sa và Trường Sa một cách hòa bình, hợp pháp suốt nhiều thế kỷ.',
        significance: 'Tạo lập nền tảng lịch sử và bằng chứng pháp lý quốc tế vững chắc không thể chối cãi.',
        impact: 'Cơ sở vững vàng để toàn dân ta kiên quyết, kiên trì bảo vệ toàn vẹn chủ quyền lãnh thổ biển đảo hôm nay.',
      },
    ],
    commonMistakes: [
      {
        trap: 'Nghĩ rằng hoạt động của Đội Hoàng Sa là do ngư dân tự phát đi đánh bắt cá.',
        truth: 'Đội Hoàng Sa do CHÍNH QUYỀN NHÀ NƯỚC (chúa Nguyễn, vua Nguyễn) thành lập, cấp văn bằng chỉ thị, trả lương và nhận nộp sản vật lên kinh sư.',
        tip: 'Phải ghi nhớ từ khóa: "Nhà nước công quyền", "Liên tục", "Hòa bình" phù hợp nguyên tắc thụ đắc lãnh thổ quốc tế.',
      },
      {
        trap: 'Nhầm lẫn phạm vi của Lãnh hải và Vùng đặc quyền kinh tế.',
        truth: 'Lãnh hải là 12 hải lý (chủ quyền quốc gia trọn vẹn); Vùng đặc quyền kinh tế (EEZ) là 200 hải lý tính từ đường cơ sở.',
        tip: '12 hải lý = Lãnh thổ trên biển; 200 hải lý = Quyền kinh tế.',
      },
    ],
    mindmapSteps: [
      '1. Địa lý: Biển Đông là ngã tư quốc tế - Hoàng Sa & Trường Sa là phên dậu tiền tiêu',
      '2. Thế kỉ XVII - XVIII: Chúa Nguyễn lập Đội Hoàng Sa và Đội Bắc Hải kiêm quản',
      '3. Thế kỉ XIX: Nhà Nguyễn chính thức hóa công quyền, cắm mốc, vẽ bản đồ Đại Nam nhất thống toàn đồ',
      '4. Pháp lý hiện đại: UNCLOS 1982 + Luật Biển Việt Nam 2012 khẳng định chủ quyền hợp pháp',
      '5. Trách nhiệm trẻ: Nắm vững lịch sử, giữ gìn hòa bình, bảo vệ thiêng liêng từng tấc đảo tấc biển',
    ],
  },
  'chu-de-2': {
    topicTitle: 'Chủ đề 2: Chủ nghĩa xã hội từ năm 1917 đến nay',
    lessonName: 'Bài 3 & Bài 4: Sự hình thành Liên bang Xô viết & Sự phát triển của CNXH',
    coreKnowledge: [
      'Cách mạng tháng Mười Nga 1917: Lật đổ chính phủ tư sản lâm thời, lập nên Nhà nước Xô viết công - nông đầu tiên trên thế giới do V.I.Lênin lãnh đạo.',
      'Sự thành lập Liên bang CHXHCN Xô viết (1922): Dựa trên 3 nguyên tắc căn bản của Lênin: Tự nguyện - Bình đẳng - Tôn trọng quyền tự quyết của các dân tộc.',
      'Sự mở rộng và phát triển của CNXH: Sau CTTG II, CNXH phát triển thành hệ thống thế giới trải dài từ châu Âu (Đông Âu) sang châu Á (Trung Quốc, Việt Nam, Triều Tiên) và Mỹ Latinh (Cuba).',
      'Khủng hoảng, sụp đổ và bài học: Liên Xô và Đông Âu sụp đổ (1989 - 1991) do sai lầm trong mô hình tập trung quan liêu bao cấp và cải tổ chính trị vội vã. Trong khi đó, Trung Quốc (Cải cách mở cửa 1978) và Việt Nam (Đổi mới 1986) kiên định mục tiêu XHCN, lấy kinh tế làm trọng tâm đã đạt nhiều thành tựu rực rỡ.',
    ],
    keywords: {
      timeline: ['1917 (CM tháng Mười Nga)', '30-12-1922 (Thành lập Liên Xô)', '1949 (Nước CHND Trung Hoa ra đời)', '1959 (Cách mạng Cuba thắng lợi)', '12-1978 (Trung Quốc cải cách mở cửa)', '1991 (Liên Xô tan rã)'],
      characters: ['V.I.Lênin', 'I.Xtalin', 'M.Goóc-ba-chốp', 'Mao Trạch Đông', 'Đặng Tiểu Bình', 'Chủ tịch Hồ Chí Minh', 'Phi-đen Cát-xtơ-rô'],
      events: ['Đại hội Xô viết toàn Nga lần thứ nhất', 'Công cuộc Cải tổ (Perestroika)', 'Hội nghị Trung ương 3 khóa XI ĐCSTQ (1978)', 'Đại hội VI Đảng Cộng sản Việt Nam (1986)'],
      locations: ['Pê-tơ-rô-grát (Mat-xcơ-va)', 'Bắc Kinh', 'La Ha-ba-na (Cuba)', 'Đông Âu'],
      documents: ['Tuyên ngôn hòa bình', 'Tuyên ngôn ruộng đất', 'Bản Tuyên ngôn và Hiệp ước thành lập Liên bang Xô viết (1922)'],
      terms: ['Nhà nước Xô viết', 'Liên bang CHXHCN Xô viết (USSR)', 'Hệ thống XHCN thế giới', 'Kinh tế thị trường XHCN', 'Chủ nghĩa xã hội đặc sắc Trung Quốc', 'Đổi mới'],
    },
    causeAndEffect: [
      {
        cause: 'Mô hình kinh tế chỉ huy quan liêu bao cấp kéo dài, chậm đổi mới cùng sự chống phá của các thế lực thù địch.',
        event: 'Liên Xô thực hiện cải tổ vội vã, từ bỏ vai trò lãnh đạo của Đảng Cộng sản, dẫn đến khủng hoảng trầm trọng.',
        result: 'Năm 1991, Liên bang Xô viết tan rã, chế độ XHCN ở Đông Âu sụp đổ.',
        significance: 'Tổn thất lớn lao của phong trào cách mạng thế giới, để lại bài học xương máu cho các nước XHCN còn lại.',
        impact: 'Các nước như Việt Nam, Trung Quốc kiên trì con đường XHCN nhưng sáng tạo đổi mới kinh tế thị trường, giữ vững ổn định chính trị.',
      },
    ],
    comparison: {
      title: 'So sánh Công cuộc Cải tổ ở Liên Xô và Cải cách mở cửa ở Trung Quốc',
      target1Name: 'Cải tổ ở Liên Xô (Goóc-ba-chốp, 1985 - 1991)',
      target2Name: 'Cải cách mở cửa ở Trung Quốc (Đặng Tiểu Bình, từ 1978)',
      rows: [
        {
          aspect: 'Trọng tâm đường lối',
          target1: 'Nóng vội chuyển trọng tâm sang cải tổ chính trị, đa nguyên đa đảng, bôi đen lịch sử',
          target2: 'Lấy phát triển kinh tế làm trung tâm, kiên trì 4 nguyên tắc cơ bản (sự lãnh đạo của ĐCS)',
        },
        {
          aspect: 'Cơ chế kinh tế',
          target1: 'Lúng túng, chưa kịp xây dựng cơ chế mới đã phá vỡ cơ chế cũ, khủng hoảng nghiêm trọng',
          target2: 'Xây dựng thành công thể chế kinh tế thị trường XHCN, mở cửa thu hút vốn và công nghệ',
        },
        {
          aspect: 'Kết quả cuối cùng',
          target1: 'Kinh tế sụp đổ, hỗn loạn xã hội, Liên bang Xô viết tan rã (tháng 12/1991)',
          target2: 'Kinh tế phát triển vượt bậc, trở thành nền kinh tế lớn thứ hai thế giới, CNXH củng cố vững chắc',
        },
      ],
    },
    commonMistakes: [
      {
        trap: 'Nghĩ rằng sự sụp đổ của Liên Xô đồng nghĩa với sự sụp đổ hoàn toàn của chủ nghĩa xã hội.',
        truth: 'Đây chỉ là sự sụp đổ của một mô hình cụ thể (tập trung quan liêu giáo điều), không phải bản chất lý tưởng nhân văn của CNXH.',
        tip: 'Các nước như Việt Nam, Trung Quốc, Cuba vẫn tiếp tục phát triển mạnh mẽ và chứng minh sức sống của CNXH.',
      },
      {
        trap: 'Nhầm lẫn ngày thành lập Liên Xô (1922) với Cách mạng tháng Mười (1917).',
        truth: '1917 là Cách mạng tháng Mười lập nên nước Nga Xô viết; đến ngày 30-12-1922 mới ký hiệp ước thành lập Liên bang Xô viết (Liên Xô).',
        tip: 'Khắc ghi: 1917 = Cách mạng tháng Mười; 1922 = Liên Xô ra đời.',
      },
    ],
    mindmapSteps: [
      '1. Khởi đầu (1917): Cách mạng tháng Mười Nga thắng lợi lập Nhà nước Xô viết',
      '2. Hợp nhất (1922): Thành lập Liên bang CHXHCN Xô viết (4 nước cộng hòa đầu tiên)',
      '3. Lan tỏa (Sau 1945): Phát triển thành hệ thống thế giới (Đông Âu, châu Á, Cuba)',
      '4. Thách thức (1985 - 1991): Khủng hoảng và tan rã ở Liên bang Xô viết do sai lầm cải tổ',
      '5. Khởi sắc (Từ 1978/1986 đến nay): Đổi mới và cải cách thành công ở Trung Quốc, Việt Nam',
    ],
    threeLevelQuestions: [
      {
        level: 'nhan_biet',
        question: 'Liên bang Cộng hòa xã hội chủ nghĩa Xô viết (Liên Xô) được thành lập vào năm nào?',
        options: ['A. Năm 1917.', 'B. Năm 1922.', 'C. Năm 1924.', 'D. Năm 1945.'],
        correctIndex: 1,
        explanation: 'Ngày 30-12-1922, Đại hội đại biểu các Xô viết toàn Nga lần thứ nhất đã thông qua bản Tuyên ngôn và Hiệp ước thành lập Liên bang Xô viết.',
      },
      {
        level: 'thong_hieu',
        question: 'Nguyên nhân cơ bản dẫn tới sự thành công của công cuộc Cải cách mở cửa ở Trung Quốc từ năm 1978 là gì?',
        options: [
          'A. Tập trung cải cách chính trị và xóa bỏ vai trò lãnh đạo của Đảng Cộng sản.',
          'B. Lấy phát triển kinh tế làm trọng tâm và kiên định sự lãnh đạo của Đảng Cộng sản.',
          'C. Đóng cửa nền kinh tế, kiên quyết cấm đầu tư từ các nước phương Tây.',
          'D. Duy trì nguyên vẹn mô hình bao cấp kế hoạch hóa tập trung trước đây.',
        ],
        correctIndex: 1,
        explanation: 'Trung Quốc kiên trì lấy phát triển kinh tế làm trung tâm, thực hiện kinh tế thị trường XHCN dưới sự lãnh đạo kiên định của Đảng.',
      },
      {
        level: 'van_dung',
        question: 'Từ bài học sụp đổ của Liên Xô và Đông Âu, Việt Nam đã rút ra bài học kinh nghiệm sinh tử nào cho công cuộc Đổi mới?',
        options: [
          'A. Tuyệt đối không thay đổi cơ chế kinh tế kế hoạch hóa bao cấp.',
          'B. Đổi mới kinh tế phải đi đôi với giữ vững ổn định chính trị và sự lãnh đạo tuyệt đối của Đảng.',
          'C. Cần thực hiện đa nguyên chính trị và đa đảng đối lập ngay từ đầu.',
          'D. Phụ thuộc hoàn toàn vào viện trợ của các cường quốc kinh tế bên ngoài.',
        ],
        correctIndex: 1,
        explanation: 'Việt Nam giữ vững nguyên tắc: Đổi mới toàn diện nhưng lấy đổi mới kinh tế làm trọng tâm, giữ vững sự lãnh đạo của Đảng để duy trì ổn định chính trị.',
      },
    ],
  },
  'chu-de-3': {
    topicTitle: 'Chủ đề 3: Quá trình giành độc lập dân tộc ở Đông Nam Á',
    lessonName: 'Bài 5 & Bài 6: Quá trình xâm lược của thực dân và hành trình đi đến độc lập',
    coreKnowledge: [
      'Quá trình xâm lược của phương Tây: Cuối thế kỉ XIX - đầu thế kỉ XX, hầu hết các nước Đông Nam Á đều bị biến thành thuộc địa của thực dân phương Tây (Anh chiếm Miến Điện, Mã Lai; Pháp chiếm Việt Nam, Lào, Campuchia; Hà Lan chiếm Indonesia; Tây Ban Nha rồi Mỹ chiếm Philippines). Riêng Xiêm (Thái Lan) duy trì được nền độc lập nhờ chính sách ngoại giao linh hoạt và cải cách của Rama V.',
      'Ba nước đầu tiên giành độc lập năm 1945: Khi phát xít Nhật đầu hàng Đồng minh (8/1945), nhân dân In-đô-nê-xi-a (17-8-1945), Việt Nam (2-9-1945) và Lào (12-10-1945) đã chớp thời cơ ngàn năm có một đứng lên tuyên bố độc lập.',
      'Hai con đường giành độc lập: Đấu tranh vũ trang gian khổ chống thực dân quay lại xâm lược (Việt Nam, Lào, Indonesia) và Đấu tranh chính trị, hòa bình đàm phán (Ấn Độ, Philippin, Malaysia).',
    ],
    keywords: {
      timeline: ['Tháng 8-1945 (Thời cơ vàng Nhật đầu hàng)', '17-8-1945 (Indonesia độc lập)', '2-9-1945 (Việt Nam độc lập)', '12-10-1945 (Lào độc lập)', '1954 (Hiệp định Giơ-ne-vơ)', '1975 (Thắng lợi trọn vẹn ở Đông Dương)'],
      characters: ['Chủ tịch Hồ Chí Minh', 'Xu-các-nô (Indonesia)', 'Xu-pha-nu-vông (Lào)', 'Vua Rama V Chulalongkorn (Xiêm)'],
      events: ['Cách mạng tháng Tám 1945', 'Chiến dịch Điện Biên Phủ 1954', 'Kháng chiến chống thực dân Hà Lan ở Indonesia', 'Hiệp định Paris 1973'],
      locations: ['Hà Nội', 'Gia-các-ta (Jakarta)', 'Viêng Chăn', 'Băng Cốc (Bangkok)'],
      documents: ['Tuyên ngôn Độc lập Việt Nam (2-9-1945)', 'Tuyên ngôn Độc lập Indonesia (17-8-1945)', 'Hiệp ước Ba-li (1976)'],
      terms: ['Thuộc địa', 'Chính sách chia để trị', 'Chính sách ngoại giao cây tre của Xiêm', 'Đấu tranh vũ trang', 'Độc lập dân tộc'],
    },
    causeAndEffect: [
      {
        cause: 'Phát xít Nhật tuyên bố đầu hàng Đồng minh vô điều kiện, quân Nhật ở Đông Nam Á tê liệt, chính quyền bù nhìn tan rã.',
        event: 'Nhân dân Indonesia, Việt Nam và Lào nhanh chóng chớp thời cơ nổi dậy khởi nghĩa giành chính quyền.',
        result: 'Cả 3 quốc gia đều thành lập chính phủ cách mạng và tuyên bố độc lập trước khi quân Đồng minh kéo vào.',
        significance: 'Đột phá khẩu đầu tiên đập tan mắt xích cai trị của chủ nghĩa thực dân ở Đông Nam Á.',
        impact: 'Cổ vũ mạnh mẽ phong trào giải phóng dân tộc của các nước thuộc địa ở châu Á, châu Phi và Mỹ Latinh.',
      },
    ],
    comparison: {
      title: 'So sánh con đường giành độc lập của Việt Nam và Ấn Độ / Phi-líp-pin',
      target1Name: 'Việt Nam & Lào (Đấu tranh vũ trang)',
      target2Name: 'Ấn Độ / Phi-líp-pin / Mã Lai (Hòa bình, thương lượng)',
      rows: [
        {
          aspect: 'Phương pháp chủ yếu',
          target1: 'Kết hợp khởi nghĩa vũ trang và chiến tranh cách mạng trường kỳ đánh đuổi thực dân Pháp và đế quốc Mỹ',
          target2: 'Chủ yếu bằng phương pháp hòa bình, đấu tranh nghị trường, bất bạo động, đàm phán chính trị',
        },
        {
          aspect: 'Mức độ triệt để',
          target1: 'Đập tan hoàn toàn chính quyền thực dân phong kiến, lập nhà nước của nhân dân, đi lên CNXH',
          target2: 'Giai cấp tư sản cầm quyền, thiết lập nền cộng hòa tư sản, vẫn còn nhiều ràng buộc kinh tế',
        },
      ],
    },
    commonMistakes: [
      {
        trap: 'Nghĩ rằng Xiêm giữ được độc lập là vì thực dân phương Tây không hề có dã tâm xâm lược.',
        truth: 'Cả Anh và Pháp đều thèm muốn Xiêm; Xiêm thoát nạn nhờ cải cách mở cửa của vua Rama V và chính sách ngoại giao "vùng đệm" khéo léo.',
        tip: 'Xiêm là nước duy nhất ở Đông Nam Á không bị biến thành thuộc địa.',
      },
      {
        trap: 'Nhầm lẫn thứ tự tuyên bố độc lập của 3 nước Đông Nam Á năm 1945.',
        truth: 'Indonesia đầu tiên (17-8), tiếp theo là Việt Nam (2-9), sau đó là Lào (12-10).',
        tip: 'Mẹo nhớ thứ tự: In-đô-nê-xi-a (17/8) -> Việt Nam (2/9) -> Lào (12/10).',
      },
    ],
    mindmapSteps: [
      '1. Thế kỉ XIX: Thực dân phương Tây xâm chiếm toàn bộ Đông Nam Á (trừ Xiêm)',
      '2. Đầu thế kỉ XX: Phong trào yêu nước chuyển biến theo khuynh hướng tư sản và vô sản',
      '3. Tháng 8-1945: Thời cơ vàng - In-đô-nê-xi-a, Việt Nam, Lào tuyên bố độc lập',
      '4. 1945 - 1975: Kháng chiến gian khổ chống thực dân, đế quốc xâm lược trở lại',
      '5. Hiện nay: Tất cả 11 quốc gia độc lập, chung tay xây dựng Cộng đồng ASEAN vững mạnh',
    ],
    threeLevelQuestions: [
      {
        level: 'nhan_biet',
        question: 'Quốc gia duy nhất ở khu vực Đông Nam Á không bị biến thành thuộc địa của thực dân phương Tây là nước nào?',
        options: ['A. In-đô-nê-xi-a.', 'B. Xiêm (Thái Lan).', 'C. Miến Điện.', 'D. Mã Lai.'],
        correctIndex: 1,
        explanation: 'Nhờ chính sách cải cách tiến bộ của Rama V và chính sách ngoại giao linh hoạt tận dụng vị trí nước đệm giữa Anh và Pháp, Xiêm giữ vững độc lập.',
      },
      {
        level: 'thong_hieu',
        question: 'Ba quốc gia nào ở Đông Nam Á đã chớp thời cơ Nhật đầu hàng năm 1945 để tuyên bố độc lập?',
        options: [
          'A. In-đô-nê-xi-a, Việt Nam, Lào.',
          'B. Việt Nam, Campuchia, Miến Điện.',
          'C. In-đô-nê-xi-a, Phi-líp-pin, Thái Lan.',
          'D. Mã Lai, Xing-ga-po, Bru-nây.',
        ],
        correctIndex: 0,
        explanation: 'Tháng 8 đến tháng 10 năm 1945, nhân dân Indonesia (17-8), Việt Nam (2-9) và Lào (12-10) đã vùng lên giành chính quyền và tuyên bố độc lập.',
      },
      {
        level: 'van_dung',
        question: 'Nghệ thuật chớp thời cơ trong Cách mạng tháng Tám năm 1945 ở Việt Nam để lại bài học gì cho công cuộc hội nhập quốc tế hôm nay?',
        options: [
          'A. Đóng cửa thụ động chờ đợi vận may của thời đại mang lại.',
          'B. Dự báo chính xác xu thế toàn cầu, chủ động chuẩn bị thực lực và nắm bắt cơ hội để phát triển đất nước.',
          'C. Nhượng bộ mọi điều kiện để thu hút vốn đầu tư nước ngoài bằng mọi giá.',
          'D. Chỉ chú trọng phát triển kinh tế mà bỏ qua nhiệm vụ quốc phòng an ninh.',
        ],
        correctIndex: 1,
        explanation: 'Thời cơ chỉ có ý nghĩa khi có sự chuẩn bị thực lực chu đáo từ trước, biết nhìn nhận xu thế khách quan để bứt phá đưa đất nước phát triển.',
      },
    ],
  },
  'chuyen-de-1': {
    topicTitle: 'Chuyên đề 1: Lịch sử nghệ thuật truyền thống Việt Nam',
    lessonName: 'Kiến trúc, điêu khắc, sân khấu và âm nhạc truyền thống',
    coreKnowledge: [
      'Nghệ thuật kiến trúc: Phản ánh bản sắc dân tộc độc đáo, hòa hợp với thiên nhiên (chùa Một Cột, tháp Phổ Minh, Kinh thành Huế, Hoàng thành Thăng Long, tháp Chăm).',
      'Nghệ thuật điêu khắc: Điêu khắc cung đình trang nghiêm (hình tượng Rồng thời Lý mảnh mai uốn lượn hình sin, rồng thời Trần khỏe khoắn, rồng thời Lê uy nghiêm); Điêu khắc đình làng thế kỉ XVI - XVIII hồn nhiên, mộc mạc, đậm chất dân dã (cảnh chèo thuyền, đánh vật, tắm ao).',
      'Nghệ thuật sân khấu & âm nhạc: Chèo (đồng bằng Bắc Bộ), Tuồng (cung đình và dân gian miền Trung), Múa rối nước (độc nhất vô nhị trên mặt nước); Nhã nhạc cung đình Huế, Ca trù, Đờn ca tài tử Nam Bộ được UNESCO ghi danh.',
    ],
    keywords: {
      timeline: ['Thời Lý - Trần (Đỉnh cao nghệ thuật Phật giáo)', 'Thời Lê sơ (Nho giáo chiếm ưu thế)', 'Thế kỉ XVI - XVIII (Nở rộ điêu khắc đình làng)', 'Năm 2003 (Nhã nhạc cung đình Huế được UNESCO vinh danh)'],
      characters: ['Đào Tấn (Hậu tổ nghệ thuật Tuồng)', 'Vua Lý Thái Tông (Xây chùa Một Cột 1049)'],
      events: ['Ghi danh Nhã nhạc cung đình Huế', 'Vinh danh Đờn ca tài tử Nam Bộ', 'Bảo tồn nghệ thuật Ca trù'],
      locations: ['Chùa Một Cột (Hà Nội)', 'Chùa Dâu (Bắc Ninh)', 'Chùa Bút Tháp', 'Kinh thành Huế', 'Đình Đình Bảng', 'Tháp Chăm Po Klong Garai'],
      documents: ['Hồ sơ di sản văn hóa phi vật thể UNESCO'],
      terms: ['Kiến trúc cung đình', 'Điêu khắc đình làng', 'Tượng Phật Bà Quan Âm nghìn mắt nghìn tay', 'Hát bội (Tuồng)', 'Đờn ca tài tử', 'Múa rối nước'],
    },
    causeAndEffect: [
      {
        cause: 'Kinh tế nông nghiệp lúa nước trù phú gắn bó mật thiết với tự nhiên và đời sống sinh hoạt xóm làng.',
        event: 'Nhân dân lao động sáng tạo nên các hình thức diễn xướng sân khấu (rối nước, chèo) và điêu khắc đình làng ngập tràn tình cảm nhân hậu, vui tươi.',
        result: 'Hình thành kho tàng nghệ thuật truyền thống độc đáo, đậm đà bản sắc nhân văn Việt Nam.',
        significance: 'Nuôi dưỡng tâm hồn dân tộc, cố kết cộng đồng và đóng góp vào kho tàng di sản văn hóa nhân loại.',
        impact: 'Cần kết hợp hài hòa giữa bảo tồn di sản nguyên gốc với phát triển công nghiệp văn hóa du lịch.',
      },
    ],
    commonMistakes: [
      {
        trap: 'Nhầm lẫn đặc điểm Rồng thời Lý với Rồng thời Lê sơ.',
        truth: 'Rồng thời Lý: thân thon dài, uốn lượn hình sin nhịp nhàng mềm mại, không có sừng; Rồng thời Lê: móng nhọn, thân to khỏe, uy quyền phong kiến.',
        tip: 'Lý = Mềm mại thanh thoát như hạt lúa; Lê = Uy nghi quyền lực bệ vệ.',
      },
    ],
    mindmapSteps: [
      '1. Cội nguồn: Nghệ thuật Đông Sơn cổ đại (Trống đồng, tượng cóc, hoa văn sông nước)',
      '2. Cổ - Trung đại: Đỉnh cao kiến trúc chùa tháp Lý - Trần và điêu khắc đình làng Lê - Nguyễn',
      '3. Âm nhạc: Chèo mộc mạc châu thổ sông Hồng - Ca trù tao nhã - Đờn ca tài tử phương Nam',
      '4. Tầm vóc quốc tế: Nhiều di sản được UNESCO ghi danh là kiệt tác của nhân loại',
      '5. Trách nhiệm: Tôn vinh nghệ nhân, quảng bá hình ảnh Việt Nam tươi đẹp ra năm châu',
    ],
  },
  'chuyen-de-2': {
    topicTitle: 'Chuyên đề 2: Chiến tranh và hoà bình trong thế kỉ XX',
    lessonName: 'Hai cuộc đại chiến thế giới và phong trào bảo vệ hòa bình nhân loại',
    coreKnowledge: [
      'Chiến tranh thế giới thứ nhất (1914 - 1918): Cuộc chiến tranh đế quốc phi nghĩa giữa phe Liên minh và phe Hiệp ước nhằm tranh giành thị trường thuộc địa.',
      'Chiến tranh thế giới thứ hai (1939 - 1945): Cuộc chiến tranh giữa phe Trục phát xít (Đức, Ý, Nhật) và Mặt trận Đồng minh (Liên Xô, Mỹ, Anh...). Liên Xô giữ vai trò trụ cột quyết định đánh bại phát xít Đức và quân phiệt Nhật.',
      'Phong trào bảo vệ hòa bình thế giới: Sự ra đời của Liên Hợp Quốc (1945) với mục tiêu duy trì hòa bình và an ninh quốc tế; cuộc đấu tranh chống chạy đua vũ trang hạt nhân trong thời kỳ Chiến tranh Lạnh.',
    ],
    keywords: {
      timeline: ['1914 - 1918 (CTTG I)', '1939 - 1945 (CTTG II)', '24-10-1945 (Hiến chương LHQ có hiệu lực)', '1947 - 1989 (Chiến tranh Lạnh)'],
      characters: ['V.I.Lênin', 'I.Xtalin', 'Franklin Roosevelt', 'Winston Churchill'],
      events: ['Trận Xtalin-grát (Bước ngoặt CTTG II)', 'Hội nghị Ianta (1945)', 'Thành lập Liên Hợp Quốc', 'Hiệp ước Không phổ biến vũ khí hạt nhân (NPT)'],
      locations: ['Xéc-bi-a', 'Xtalin-grát', 'Ianta', 'Ngoại ô Mat-xcơ-va', 'San Francisco'],
      documents: ['Hiến chương Liên Hợp Quốc', 'Tuyên ngôn về quyền hòa bình của các dân tộc'],
      terms: ['Chủ nghĩa phát xít', 'Trật tự hai cực Ianta', 'Chiến tranh Lạnh', 'Giải trừ quân bị', 'An ninh tập thể'],
    },
    causeAndEffect: [
      {
        cause: 'Chủ nghĩa phát xít hiếu chiến điên cuồng phát động chiến tranh hòng phân chia lại thế giới và nô dịch nhân loại.',
        event: 'Các lực lượng hòa bình dân chủ trên thế giới hợp thành Mặt trận Đồng minh chống phát xít do Liên Xô, Mỹ, Anh làm nòng cốt.',
        result: 'Chủ nghĩa phát xít Đức - Ý - Nhật bị tiêu diệt hoàn toàn, CTTG II kết thúc.',
        significance: 'Cứu nhân loại khỏi thảm họa diệt chủng phát xít, tạo điều kiện cho phong trào giải phóng dân tộc bùng nổ.',
        impact: 'Bài học đắt giá về việc ngăn ngừa nguy cơ xung đột từ sớm, từ xa bằng đối thoại và luật pháp quốc tế.',
      },
    ],
    commonMistakes: [
      {
        trap: 'Đánh giá CTTG I và CTTG II đều có tính chất hoàn toàn phi nghĩa giống nhau.',
        truth: 'CTTG I: Phi nghĩa cả 2 bên; CTTG II: Phe phát xít là phi nghĩa tàn bạo, phe Đồng minh mang tính chất chính nghĩa giải phóng nhân loại.',
        tip: 'Phải phân biệt tính chất chính nghĩa chống phát xít của CTTG II.',
      },
    ],
    mindmapSteps: [
      '1. Nguyên nhân: Sự phát triển không đều của CNTB và khủng hoảng kinh tế sinh ra phát xít',
      '2. Bùng nổ: CTTG I (1914-1918) và CTTG II (1939-1945) gây tổn thất hàng chục triệu người',
      '3. Bài học: Thiết lập Liên Hợp Quốc (1945) với 5 ủy viên thường trực Hội đồng Bảo an',
      '4. Thời kỳ mới: Chấm dứt Chiến tranh Lạnh, xu thế hòa hoãn, đối thoại và hợp tác phát triển',
      '5. Hiện tại: Việt Nam kiên định chính sách đối ngoại độc lập, tự chủ, đa phương hóa, là bạn tin cậy của cộng đồng quốc tế',
    ],
  },
  'chuyen-de-3': {
    topicTitle: 'Chuyên đề 3: Danh nhân trong lịch sử Việt Nam',
    lessonName: 'Khái niệm, vai trò của danh nhân và các anh hùng kiệt xuất',
    coreKnowledge: [
      'Khái niệm & Tiêu chí: Danh nhân là những nhân vật lịch sử có tài năng, phẩm chất kiệt xuất, có đóng góp to lớn đối với tiến trình lịch sử, văn hóa của dân tộc hoặc nhân loại.',
      'Danh nhân quân sự: Ngô Quyền (mở ra kỷ nguyên độc lập), Lý Thường Kiệt (Nam quốc sơn hà, tiên phát chế nhân), Trần Hưng Đạo (Khoan thư sức dân, Hịch tướng sĩ), Lê Lợi - Nguyễn Trãi (Bình Ngô đại cáo), Quang Trung - Nguyễn Huệ (Hành quân thần tốc), Đại tướng Võ Nguyên Giáp (Điện Biên Phủ).',
      'Danh nhân văn hóa, tư tưởng, khoa học: Chu Văn An (Người thầy của muôn đời), Nguyễn Trãi (Danh nhân văn hóa thế giới UNESCO, tư tưởng nhân nghĩa vì dân), Lê Quý Đôn (Nhà bác học uyên bác nhất thời phong kiến), Hải Thượng Lãn Ông Lê Hữu Trác (Đại danh y nhân ái), Chủ tịch Hồ Chí Minh (Anh hùng giải phóng dân tộc, Nhà văn hóa kiệt xuất).',
    ],
    keywords: {
      timeline: ['938 (Ngô Quyền)', '1077 (Lý Thường Kiệt)', '1288 (Trần Quốc Tuấn)', '1427 (Lê Lợi - Nguyễn Trãi)', '1789 (Quang Trung)', '1954 (Võ Nguyên Giáp)', '1987 (UNESCO vinh danh Hồ Chí Minh)'],
      characters: ['Ngô Quyền', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Nguyễn Trãi', 'Chu Văn An', 'Lê Quý Đôn', 'Hải Thượng Lãn Ông', 'Vua Quang Trung', 'Hồ Chí Minh', 'Võ Nguyên Giáp'],
      events: ['Chiến thắng Bạch Đằng', 'Phá Tống bình Chiêm', 'Ba lần đại thắng Mông - Nguyên', 'Chiến thắng Ngọc Hồi - Đống Đa', 'Chiến dịch Điện Biên Phủ'],
      locations: ['Sông Bạch Đằng', 'Sông Như Nguyệt', 'Vạn Kiếp', 'Lam Sơn', 'Phố Hiến', 'Kim Liên (Nghệ An)'],
      documents: ['Hịch tướng sĩ', 'Bình Ngô đại cáo', 'Hải Thượng y tông tâm lĩnh', 'Tuyên ngôn Độc lập (1945)'],
      terms: ['Danh nhân quân sự', 'Danh nhân văn hóa thế giới UNESCO', 'Tư tưởng nhân nghĩa', 'Khoan thư sức dân', 'Người thầy của muôn đời'],
    },
    causeAndEffect: [
      {
        cause: 'Lịch sử dân tộc trong những thời khắc hiểm nghèo đòi hỏi những cá nhân lỗi lạc đứng lên lãnh đạo toàn dân.',
        event: 'Các danh nhân anh hùng hội tụ tinh hoa dân tộc, hoạch định đường lối sáng suốt, cùng nhân dân lập nên chiến công oanh liệt.',
        result: 'Đất nước vượt qua phong ba bão táp, nền độc lập và văn hiến nghìn năm được bảo tồn vững chắc.',
        significance: 'Danh nhân là linh hồn của lịch sử, là tấm gương sáng ngời cho muôn đời con cháu noi theo.',
        impact: 'Thế hệ trẻ noi gương tiền nhân, nỗ lực tu dưỡng đạo đức và tri thức để làm rạng danh non sông đất nước.',
      },
    ],
    commonMistakes: [
      {
        trap: 'Tuyệt đối hóa vai trò của danh nhân mà quên mất vai trò của quần chúng nhân dân.',
        truth: 'Danh nhân chỉ phát huy được tài năng khi đứng về phía nhân dân và được muôn dân hết lòng ủng hộ.',
        tip: '"Nhân dân là người sáng tạo ra lịch sử" - danh nhân là ngọn cờ dẫn dắt phong trào của quần chúng.',
      },
    ],
    mindmapSteps: [
      '1. Khái niệm: Những nhân vật có cống hiến vượt bậc cho dân tộc và nhân loại',
      '2. Quân sự: Ngô Quyền, Lý Thường Kiệt, Trần Quốc Tuấn, Lê Lợi, Quang Trung, Võ Nguyên Giáp',
      '3. Văn hóa - Giáo dục: Chu Văn An, Nguyễn Trãi, Lê Quý Đôn, Lê Hữu Trác, Hồ Chí Minh',
      '4. Bài học nhân sinh: Đức độ song toàn, lấy dân làm gốc, cống hiến trọn đời cho nghĩa lớn',
      '5. Hành động học sinh: Uống nước nhớ nguồn, chăm ngoan học giỏi, phấn đấu trở thành người có ích cho xã hội',
    ],
  },
  'on-tap-cuoi-ki-1': {
    topicTitle: 'Cẩm nang Ôn tập Trọng tâm Cuối Học kỳ I (2024 - 2025)',
    lessonName: 'Tổng hợp Bài 1 đến Bài 8 SGK Lịch sử 11 Kết nối tri thức',
    coreKnowledge: [
      'Chủ đề 1 (Bài 1, 2): Tiền đề, mục tiêu, động lực của CMTS Anh, Bắc Mỹ, Pháp; các hình thức tổ chức độc quyền (Cartel, Syndicate, Trust, Concern); bản chất và đặc điểm của CNTB hiện đại.',
      'Chủ đề 2 (Bài 3, 4): Cách mạng tháng Mười Nga 1917; 3 nguyên tắc Lênin thành lập Liên Xô (1922); Cải cách mở cửa Trung Quốc (1978) lấy kinh tế làm trung tâm.',
      'Chủ đề 3 (Bài 5, 6): Quá trình xâm lược của thực dân phương Tây; ngoại giao Xiêm duy trì độc lập; 3 nước Đông Nam Á chớp thời cơ độc lập tháng 8-1945 (Indonesia, Việt Nam, Lào).',
      'Chủ đề 4 (Bài 7, 8): Các cuộc kháng chiến bảo vệ Tổ quốc tiêu biểu (Lý, Trần, Lam Sơn, Tây Sơn); bài học "Khoan thư sức dân", "Dân là gốc" và nghệ thuật quân sự độc đáo.',
      'Cấu trúc Đề thi Chuẩn 2025 của Bộ GD&ĐT: Phần I (Trắc nghiệm nhiều lựa chọn 4 phương án); Phần II (Trắc nghiệm Đúng - Sai theo đoạn tư liệu); Phần III (Tự luận phân tích và liên hệ).',
    ],
    keywords: {
      timeline: ['1640', '1776', '1789', '1917', '1922', '1945 (17/8, 2/9, 12/10)', '1077', '1288', '1427', '1789', '1978'],
      characters: ['Oliver Cromwell', 'George Washington', 'V.I.Lênin', 'Đặng Tiểu Bình', 'Lý Thường Kiệt', 'Trần Hưng Đạo', 'Lê Lợi', 'Nguyễn Trãi', 'Quang Trung', 'Hồ Chí Minh'],
      events: ['Đại hội Xô viết', 'Tuyên ngôn Độc lập Mỹ', 'Phá ngục Ba-xti', 'Hội nghị Diên Hồng', 'Trận Bạch Đằng', 'Chiến thắng Ngọc Hồi - Đống Đa'],
      locations: ['Philadelphia', 'Paris', 'Mat-xcơ-va', 'Bạch Đằng', 'Như Nguyệt', 'Chi Lăng - Xương Giang', 'Rạch Gầm - Xoài Mút'],
      documents: ['Tuyên ngôn Độc lập (1776)', 'Nam quốc sơn hà', 'Hịch tướng sĩ', 'Bình Ngô đại cáo'],
      terms: ['Nhiệm vụ dân tộc vs Dân chủ', 'Tổ chức độc quyền', 'Liên bang Xô viết', 'Thanh dã', 'Khoan thư sức dân', 'Tiên phát chế nhân'],
    },
    causeAndEffect: [
      {
        cause: 'Mâu thuẫn giữa nhân dân ta với các thế lực bành trướng, xâm lược phương Bắc.',
        event: 'Toàn thể dân tộc muôn người như một kết thành khối đại đoàn kết, vận dụng mưu lược quân sự tài ba đánh giặc.',
        result: 'Đánh tan các đạo quân xâm lược hùng mạnh bậc nhất thế giới, bảo vệ toàn vẹn non sông bờ cõi.',
        significance: 'Khẳng định sức mạnh bất diệt của lòng yêu nước và ý chí độc lập tự chủ của người Việt Nam.',
        impact: 'Cung cấp bài học vô giá cho chiến lược xây dựng nền quốc phòng toàn dân hôm nay.',
      },
    ],
    commonMistakes: [
      {
        trap: 'Nhầm lẫn ma trận điểm phần Đúng - Sai trong bài kiểm tra định kỳ.',
        truth: 'Đúng 1 ý: 0.1 điểm; Đúng 2 ý: 0.25 điểm; Đúng 3 ý: 0.5 điểm; Đúng cả 4 ý: trọn vẹn 1.0 điểm.',
        tip: 'Phải đọc kỹ từng từ bẫy ("duy nhất", "hoàn toàn", "chủ yếu") trong mỗi ý a, b, c, d.',
      },
    ],
    mindmapSteps: [
      'Bước 1: Nắm chắc kiến thức cốt lõi Bài 1 - Bài 8',
      'Bước 2: Phân biệt rõ các cặp sự kiện dễ nhầm (Anh vs Pháp, Liên Xô vs Trung Quốc, Lý vs Trần)',
      'Bước 3: Luyện trắc nghiệm nhiều lựa chọn nhận diện từ khóa',
      'Bước 4: Rèn kỹ năng đọc hiểu tư liệu phần Đúng - Sai',
      'Bước 5: Luyện viết tự luận theo 5 bước: Mở vấn đề → Nội dung chính → Phân tích → Nhận xét → Kết luận',
    ],
  },
};
