import { OfficialExam } from '../types/history';

export const OFFICIAL_WORKBOOK_EXAMS: OfficialExam[] = [
  // ĐỀ MINH HỌA SỐ 1
  {
    id: 'de-minh-hoa-1',
    code: 'ĐMH-01',
    title: 'Đề minh hoạ số 1 (Chuẩn Sách bài tập NXBGDVN)',
    durationMinutes: 60,
    scope: 'Học kì I (Chủ đề 1, 2, 3: Cách mạng tư sản, CNXH từ 1917, Đông Nam Á)',
    source: 'Sách Bài tập Lịch sử 11 - Kết nối tri thức với cuộc sống (Trang 28 - 32, NXB Giáo dục Việt Nam)',
    description: 'Đề thi chuẩn 60 phút gồm 24 câu trắc nghiệm (6,0 điểm) và 2 câu tự luận (4,0 điểm) bám sát tuyệt đối ngân hàng câu hỏi Sách bài tập Lịch sử 11 có đáp án chính thức.',
    multipleChoiceQuestions: [
      {
        id: 'dmh1-mc-1',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Ở châu Âu và châu Mỹ, chủ nghĩa tư bản được xác lập trong các thế kỉ:',
        options: [
          'A. XVI – XIX.',
          'B. XVI – XVII.',
          'C. XVIII – XIX.',
          'D. XV – XVI.',
        ],
        correctIndex: 2,
        level: 'nhan_biet',
        explanation: 'Theo Sách bài tập Lịch sử 11 (tr. 28, đáp án tr. 74), ở châu Âu và Bắc Mỹ, chủ nghĩa tư bản được xác lập trong các thế kỉ XVIII – XIX thông qua các cuộc cách mạng tư sản và cách mạng công nghiệp.',
        optionsAnalysis: [
          'A: SAI - Thế kỉ XVI - XVII mới chỉ là giai đoạn manh nha và bùng nổ các cuộc cách mạng tư sản đầu tiên.',
          'B: SAI - Thời kì này CNTB chưa xác lập trên phạm vi rộng.',
          'C: ĐÚNG - Các thế kỉ XVIII - XIX là thời kì xác lập vững chắc của CNTB ở châu Âu và Bắc Mỹ.',
          'D: SAI - Thế kỉ XV - XVI là thời kì tích lũy ban đầu của tư bản.'
        ],
        trapTip: 'Phân biệt giữa thời kì "manh nha/tiền đề" (TK XVI - XVII) với thời kì "xác lập" (TK XVIII - XIX).',
        thayDungAdvice: 'Em chú ý mốc thời gian xác lập hoàn chỉnh của CNTB ở Tây Âu và Bắc Mỹ là vào thế kỉ XVIII - XIX nhé!',
      },
      {
        id: 'dmh1-mc-2',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Các nước tư bản chuyển sang giai đoạn chủ nghĩa đế quốc vào thời gian nào?',
        options: [
          'A. Từ nửa sau thế kỉ XVII.',
          'B. Cuối thế kỉ XIX – đầu thế kỉ XX.',
          'C. Từ nửa sau thế kỉ XX.',
          'D. Cuối thế kỉ XVIII – đầu thế kỉ XIX.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Vào khoảng 30 năm cuối thế kỉ XIX - đầu thế kỉ XX, các tổ chức độc quyền ra đời và chi phối nền kinh tế, đánh dấu bước chuyển từ CNTB tự do cạnh tranh sang CNTB độc quyền (chủ nghĩa đế quốc).',
        optionsAnalysis: [
          'A: SAI - Nửa sau thế kỉ XVII mới là thời kì Cách mạng tư sản Anh.',
          'B: ĐÚNG - Cuối thế kỉ XIX - đầu thế kỉ XX là giai đoạn hình thành chủ nghĩa đế quốc.',
          'C: SAI - Nửa sau thế kỉ XX là thời kì CNTB hiện đại.',
          'D: SAI - Cuối thế kỉ XVIII - đầu thế kỉ XIX là thời kì cách mạng công nghiệp lần thứ nhất.'
        ],
        trapTip: 'Mốc chuyển sang CNĐQ luôn gắn liền với cuối thế kỉ XIX - đầu thế kỉ XX.',
      },
      {
        id: 'dmh1-mc-3',
        topicId: 'chu-de-2',
        lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
        question: 'Khi mới thành lập (12-1922), Liên Xô gồm 4 nước Cộng hoà Xô viết là:',
        options: [
          'A. Nga, U-crai-na, Bê-lô-rút-xi-a và Lít-va.',
          'B. Nga, U-crai-na, Bê-lô-rút-xi-a và Ngoại Cáp-ca-dơ.',
          'C. Nga, U-crai-na, Môn-đô-va và Lát-vi-a.',
          'D. Nga, U-crai-na, Tuốc-mê-nix-tan và Ác-mê-ni-a.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Ngày 30-12-1922, Đại hội lần thứ nhất các Xô viết toàn Liên bang thông qua Tuyên ngôn và Hiệp ước thành lập Liên Xô gồm 4 nước ban đầu: Nga, U-crai-na, Bê-lô-rút-xi-a và Liên bang Ngoại Cáp-ca-dơ.',
        optionsAnalysis: [
          'A: SAI - Lít-va gia nhập sau này vào năm 1940.',
          'B: ĐÚNG - Bốn nước đầu tiên là Nga, U-crai-na, Bê-lô-rút-xi-a và Ngoại Cáp-ca-dơ.',
          'C: SAI - Môn-đô-va và Lát-vi-a gia nhập năm 1940.',
          'D: SAI - Tuốc-mê-nix-tan gia nhập năm 1925; Ác-mê-ni-a nằm trong Liên bang Ngoại Cáp-ca-dơ.'
        ],
        trapTip: 'Ghi nhớ 4 thành viên sáng lập: Nga, U-crai-na, Bê-lô-rút-xi-a và Ngoại Cáp-ca-dơ.',
      },
      {
        id: 'dmh1-mc-4',
        topicId: 'chu-de-2',
        lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
        question: 'Liên bang Cộng hoà xã hội chủ nghĩa Xô viết (Liên Xô) được thành lập vào thời gian nào?',
        options: [
          'A. Tháng 3 – 1921.',
          'B. Tháng 12 – 1922.',
          'C. Tháng 3 – 1923.',
          'D. Tháng 1 – 1924.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Ngày 30-12-1922, Đại hội lần thứ nhất các Xô viết toàn Liên bang đã tuyên bố thành lập Liên bang Cộng hòa xã hội chủ nghĩa Xô viết.',
      },
      {
        id: 'dmh1-mc-5',
        topicId: 'chu-de-2',
        lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG 2 đến nay',
        question: 'Sau khi cách mạng thắng lợi, một Nhà nước mới ra đời ở Trung Quốc (1-10-1949) có tên gọi là:',
        options: [
          'A. Cộng hoà Trung Hoa.',
          'B. Cộng hoà Dân chủ Trung Hoa.',
          'C. Cộng hoà Nhân dân Trung Hoa.',
          'D. Cộng hoà xã hội chủ nghĩa Trung Hoa.',
        ],
        correctIndex: 2,
        level: 'nhan_biet',
        explanation: 'Ngày 1-10-1949, tại Quảng trường Thiên An Môn, Chủ tịch Mao Trạch Đông trịnh trọng tuyên bố thành lập nước Cộng hòa Nhân dân Trung Hoa.',
      },
      {
        id: 'dmh1-mc-6',
        topicId: 'chu-de-2',
        lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG 2 đến nay',
        question: 'Mốc thời gian nào đánh dấu sự chấm dứt chế độ xã hội chủ nghĩa ở Liên Xô?',
        options: [
          'A. Tháng 12 – 1989.',
          'B. Tháng 12 – 1991.',
          'C. Tháng 12 – 1990.',
          'D. Tháng 12 – 1992.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Ngày 25-12-1991, Tổng thống M. Goóc-ba-chốp từ chức, lá cờ búa liềm trên nóc điện Crem-li bị hạ xuống, đánh dấu Liên Xô tan rã sau 69 năm tồn tại.',
      },
      {
        id: 'dmh1-mc-7',
        topicId: 'chu-de-3',
        lessonName: 'Bài 5: Quá trình xâm lược và cai trị của chủ nghĩa thực dân ở Đông Nam Á',
        question: 'Người lãnh đạo đội quân đánh thắng thực dân Tây Ban Nha (1521) ở Phi-líp-pin là ai?',
        options: [
          'A. A-cha Xoa.',
          'B. Ra-pu-ra-pu.',
          'C. Pu-côm-bô.',
          'D. Đi-pô-nê-gô-rô.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Thủ lĩnh Ra-pu-ra-pu đã chỉ huy dân đảo Mác-tan đánh bại đội quân xâm lược của Ma-gien-lăng (Tây Ban Nha) vào năm 1521.',
      },
      {
        id: 'dmh1-mc-8',
        topicId: 'chu-de-3',
        lessonName: 'Bài 5: Quá trình xâm lược và cai trị của chủ nghĩa thực dân ở Đông Nam Á',
        question: 'Đến đầu thế kỉ XX, hầu hết các nước Đông Nam Á đều trở thành thuộc địa của thực dân phương Tây, ngoại trừ:',
        options: [
          'A. Phi-líp-pin.',
          'B. Xiêm (Thái Lan).',
          'C. Xin-ga-po.',
          'D. Miến Điện (Mi-an-ma).',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Nhờ chính sách ngoại giao mềm dẻo khéo léo và công cuộc cải cách toàn diện của vua Ra-ma V (Chu-la-long-kon), Xiêm là quốc gia duy nhất ở Đông Nam Á giữ được nền độc lập.',
      },
      {
        id: 'dmh1-mc-9',
        topicId: 'chu-de-3',
        lessonName: 'Bài 6: Hành trình đi đến độc lập dân tộc ở Đông Nam Á',
        question: 'Nước nào dưới đây tuyên bố độc lập sớm nhất ở Đông Nam Á sau Chiến tranh thế giới thứ hai?',
        options: [
          'A. In-đô-nê-xi-a.',
          'B. Miến Điện.',
          'C. Bru-nây.',
          'D. Việt Nam.',
        ],
        correctIndex: 0,
        level: 'nhan_biet',
        explanation: 'In-đô-nê-xi-a tuyên bố độc lập ngày 17-8-1945, là quốc gia tuyên bố độc lập sớm nhất ở Đông Nam Á sau CTTG 2 (Việt Nam tuyên bố 2-9-1945, Lào tuyên bố 12-10-1945).',
      },
      {
        id: 'dmh1-mc-10',
        topicId: 'chu-de-3',
        lessonName: 'Bài 6: Hành trình đi đến độc lập dân tộc ở Đông Nam Á',
        question: 'Năm nước thành viên ban đầu sáng lập tổ chức ASEAN (8-8-1967) bao gồm:',
        options: [
          'A. In-đô-nê-xi-a, Phi-líp-pin, Xin-ga-po, Mi-an-ma, Ma-lai-xi-a.',
          'B. Mi-an-ma, Phi-líp-pin, Xin-ga-po, Ma-lai-xi-a, Bru-nây.',
          'C. In-đô-nê-xi-a, Ma-lai-xi-a, Phi-líp-pin, Xin-ga-po, Thái Lan.',
          'D. Bru-nây, Thái Lan, Xin-ga-po, Ma-lai-xi-a, Mi-an-ma.',
        ],
        correctIndex: 2,
        level: 'nhan_biet',
        explanation: 'Ngày 8-8-1967, tại Băng Cốc (Thái Lan), 5 nước sáng lập ASEAN ký bản Tuyên ngôn ASEAN gồm: In-đô-nê-xi-a, Ma-lai-xi-a, Phi-líp-pin, Xin-ga-po và Thái Lan.',
      },
      {
        id: 'dmh1-mc-11',
        topicId: 'chu-de-1',
        lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
        question: 'Cách mạng tư sản là:',
        options: [
          'A. cuộc cách mạng do liên minh giữa giai cấp tư sản và quý tộc mới lãnh đạo.',
          'B. cuộc cách mạng do giai cấp tư sản lãnh đạo.',
          'C. cuộc cách mạng do liên minh giữa giai cấp tư sản và giai cấp công nhân lãnh đạo.',
          'D. cuộc cách mạng do liên minh giữa giai cấp tư sản và nông dân lãnh đạo.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Theo định nghĩa chuẩn SGK và Sách bài tập Lịch sử 11, Cách mạng tư sản là cuộc cách mạng do giai cấp tư sản (hoặc tầng lớp đại diện cho lợi ích tư sản) lãnh đạo nhằm lật đổ chế độ phong kiến, mở đường cho CNTB phát triển.',
      },
      {
        id: 'dmh1-mc-12',
        topicId: 'chu-de-1',
        lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
        question: 'Ý nào đúng khi nói về tiền đề đưa đến sự bùng nổ của cách mạng tư sản?',
        options: [
          'A. Cách mạng tư sản chỉ có thể xảy ra khi các tiền đề về kinh tế, xã hội, chính trị và triết học chín muồi.',
          'B. Cách mạng tư sản chỉ có thể xảy ra khi các tiền đề về kinh tế, xã hội, tư tưởng, chính trị chín muồi.',
          'C. Cách mạng tư sản chỉ có thể xảy ra khi các tiền đề về kinh tế, xã hội, tư tưởng chín muồi.',
          'D. Cách mạng tư sản chỉ có thể xảy ra khi các tiền đề về xã hội, tư tưởng, chính trị chín muồi.',
        ],
        correctIndex: 1,
        level: 'thong_hieu',
        explanation: 'Bốn tiền đề toàn diện đưa đến cách mạng tư sản bùng nổ là: Tiền đề kinh tế, Tiền đề chính trị, Tiền đề xã hội và Tiền đề tư tưởng.',
      },
      {
        id: 'dmh1-mc-13',
        topicId: 'chu-de-1',
        lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
        question: 'Ý nào KHÔNG phản ánh đúng tình trạng nền kinh tế của 13 thuộc địa Anh ở Bắc Mỹ trước khi chiến tranh bùng nổ?',
        options: [
          'A. Nền kinh tế của 13 thuộc địa Anh ở Bắc Mỹ phát triển ngang bằng với chính quốc Anh.',
          'B. Không có quyền tự do buôn bán với các nước, phải thông qua chính quốc.',
          'C. Sản xuất trong các công trường thủ công phát triển, nhiều trung tâm công nghiệp hình thành ở miền Bắc, miền Trung.',
          'D. Phải nộp nhiều loại thuế khác nhau cho chính quốc.',
        ],
        correctIndex: 0,
        level: 'thong_hieu',
        explanation: 'Kinh tế 13 thuộc địa phát triển theo hướng TBCN nhưng bị thực dân Anh kìm hãm bằng nhiều luật thuế vô lý và độc quyền ngoại thương, không thể phát triển "ngang bằng" với nền công nghiệp hàng đầu thế giới của chính quốc Anh thời bấy giờ.',
      },
      {
        id: 'dmh1-mc-14',
        topicId: 'chu-de-1',
        lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
        question: 'Ý nào KHÔNG phản ánh đúng ý nghĩa của Cách mạng tư sản Anh thế kỉ XVII?',
        options: [
          'A. Cách mạng tư sản Anh có ý nghĩa to lớn đối với sự phát triển của xã hội loài người trong buổi đầu chuyển từ chế độ phong kiến sang chế độ tư bản.',
          'B. Cách mạng tư sản Anh thắng lợi đã đặt dấu mốc cho sự xác lập chủ nghĩa tư bản ở Anh.',
          'C. Cách mạng tư sản Anh đã lật đổ chế độ phong kiến.',
          'D. Cách mạng tư sản Anh được ví như "cái chổi khổng lồ" quét sạch mọi rác rưởi của chế độ phong kiến.',
        ],
        correctIndex: 3,
        level: 'thong_hieu',
        explanation: 'Nhận định ví cách mạng như "cái chổi khổng lồ quét sạch mọi rác rưởi của chế độ phong kiến" là của Các Mác khi đánh giá về Đại Cách mạng Pháp năm 1789 (cuộc cách mạng triệt để nhất), không phải cách mạng tư sản Anh.',
      },
      {
        id: 'dmh1-mc-15',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Ý nào đúng khi nói về các cuộc cách mạng công nghiệp thời cận đại?',
        options: [
          'A. Từ thập kỉ 80 của thế kỉ XVIII, khởi đầu từ nước Anh, cách mạng công nghiệp lan rộng ra các nước khác ở châu Âu.',
          'B. Từ thập kỉ 80 của thế kỉ XVIII, khởi đầu từ Hà Lan, cách mạng công nghiệp lan rộng ra châu Âu và thế giới.',
          'C. Từ thập kỉ 60 của thế kỉ XVIII, khởi đầu từ nước Anh, cách mạng công nghiệp lan rộng ra châu Âu và thế giới.',
          'D. Từ thập kỉ 60 của thế kỉ XVIII, khởi đầu từ Hà Lan, cách mạng công nghiệp lan rộng ra châu Âu và Bắc Mỹ.',
        ],
        correctIndex: 2,
        level: 'nhan_biet',
        explanation: 'Cách mạng công nghiệp lần thứ nhất khởi đầu từ nước Anh vào thập niên 60 của thế kỉ XVIII (với các phát minh máy móc ngành dệt và máy hơi nước J.Watt), sau đó lan rộng sang Pháp, Đức, Mỹ và thế giới.',
      },
      {
        id: 'dmh1-mc-16',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Trong những năm cuối thế kỉ XIX – đầu thế kỉ XX, sự phát triển nhanh chóng của chủ nghĩa tư bản kéo theo nhu cầu ngày càng cao về:',
        options: [
          'A. than đá và điện.',
          'B. hương liệu và vàng bạc.',
          'C. nguyên liệu và nhân công.',
          'D. hàng hoá xa xỉ.',
        ],
        correctIndex: 2,
        level: 'nhan_biet',
        explanation: 'Sự phát triển vượt bậc của đại công nghiệp cơ khí và các ngành luyện kim, hóa chất đòi hỏi nguồn nguyên liệu dồi dào, nhân công rẻ mạt và thị trường tiêu thụ rộng lớn, thúc đẩy các nước tư bản xâm lược thuộc địa.',
      },
      {
        id: 'dmh1-mc-17',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Ý nào phản ánh đúng về hệ thống thuộc địa của đế quốc Anh vào đầu thế kỉ XX?',
        options: [
          'A. "Mặt Trời không bao giờ lặn trên đế quốc Anh".',
          'B. Châu Á là nơi đế quốc Anh có nhiều thuộc địa nhất.',
          'C. Châu Phi là nơi đế quốc Anh có ít thuộc địa nhất.',
          'D. Đế quốc Anh có nhiều thuộc địa ở khu vực Mỹ La-tinh.',
        ],
        correctIndex: 0,
        level: 'nhan_biet',
        explanation: 'Đế quốc Anh sở hữu hệ thống thuộc địa rộng lớn nhất thế giới (chiếm 1/4 diện tích và 1/4 dân số địa cầu), trải dài khắp các châu lục nên được mệnh danh là đế quốc "Mặt Trời không bao giờ lặn".',
      },
      {
        id: 'dmh1-mc-18',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Cuộc Duy tân Minh Trị (1868) ở Nhật Bản đã:',
        options: [
          'A. đặt nền móng cho xây dựng chủ nghĩa xã hội ở Nhật Bản.',
          'B. đưa Nhật Bản mở rộng ảnh hưởng sang châu Âu và châu Phi.',
          'C. đưa Nhật Bản từ một nước phong kiến trở thành một nước tư bản chủ nghĩa.',
          'D. giúp Nhật Bản đạt được nhiều tiến bộ về nghiên cứu hải dương.',
        ],
        correctIndex: 2,
        level: 'thong_hieu',
        explanation: 'Cuộc Duy tân Minh Trị có tính chất như một cuộc cách mạng tư sản, đã xóa bỏ chế độ Mạc phủ, canh tân đất nước và đưa Nhật Bản trở thành cường quốc TBCN duy nhất ở châu Á.',
      },
      {
        id: 'dmh1-mc-19',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Ý nào phản ánh đúng về các tổ chức độc quyền ở các nước Anh, Pháp, Đức, Mỹ trong những năm đầu thế kỉ XX?',
        options: [
          'A. Chiếm khoảng 1% tổng số xí nghiệp toàn thế giới nhưng chiếm gần 3/4 tổng số sản phẩm làm ra.',
          'B. Chiếm khoảng 50% tổng số xí nghiệp toàn thế giới nhưng chiếm 3/4 tổng số sản phẩm làm ra.',
          'C. Chiếm 3/4 tổng số máy hơi nước và động cơ điện nhưng chiếm gần 1% tổng số sản phẩm làm ra của châu Âu và Bắc Mỹ.',
          'D. Chiếm khoảng 50% tổng số xí nghiệp toàn châu Âu và Bắc Mỹ nhưng chỉ làm ra 1% sản phẩm.',
        ],
        correctIndex: 0,
        level: 'thong_hieu',
        explanation: 'Các tổ chức độc quyền tuy chỉ chiếm tỉ lệ nhỏ về số lượng (khoảng 1% tổng số xí nghiệp) nhưng lại thâu tóm và sản xuất gần 3/4 tổng sản lượng công nghiệp, chứng tỏ mức độ tập trung sản xuất và tư bản cực kỳ cao.',
      },
      {
        id: 'dmh1-mc-20',
        topicId: 'chu-de-2',
        lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
        question: 'Sau thắng lợi của Cách mạng tháng Mười Nga năm 1917, nhiệm vụ hàng đầu của Chính quyền Xô viết là gì?',
        options: [
          'A. Đập tan bộ máy nhà nước cũ, xây dựng nhà nước mới của những người lao động.',
          'B. Khôi phục kinh tế, xây dựng chủ nghĩa xã hội và bảo vệ đất nước.',
          'C. Ban hành Hiến pháp mới.',
          'D. Chống thù trong, giặc ngoài.',
        ],
        correctIndex: 0,
        level: 'thong_hieu',
        explanation: 'Sau khi giành chính quyền, nhiệm vụ cấp bách số một của giai cấp vô sản là phải đập tan bộ máy nhà nước tư sản - phong kiến quan liêu cũ và thiết lập nhà nước kiểu mới của công - nông - binh.',
      },
      {
        id: 'dmh1-mc-21',
        topicId: 'chu-de-2',
        lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
        question: 'Ý nào KHÔNG phản ánh đúng nội dung của Hiến pháp Liên Xô năm 1924?',
        options: [
          'A. Ghi nhận việc hợp tác trên cơ sở tự nguyện của các nước Cộng hoà để tạo thành một nhà nước Liên bang.',
          'B. Phân định các quyền của Liên bang và của các nước Cộng hoà.',
          'C. Quy định cơ cấu tổ chức cơ quan Nhà nước tối cao Liên bang và các nước Cộng hoà.',
          'D. Khẳng định quyền lực của Chính quyền Xô viết.',
        ],
        correctIndex: 3,
        level: 'thong_hieu',
        explanation: 'Hiến pháp Liên Xô năm 1924 tập trung vào việc hoàn thành quá trình thành lập Nhà nước Liên bang Xô viết, phân định quyền hạn giữa Liên bang và các nước thành viên; việc khẳng định bản chất quyền lực Xô viết đã được quy định từ bản Hiến pháp đầu tiên năm 1918 của nước Nga Xô viết.',
      },
      {
        id: 'dmh1-mc-22',
        topicId: 'chu-de-2',
        lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG 2 đến nay',
        question: 'Nguyên nhân quan trọng nhất dẫn đến sự tan rã của chế độ chủ nghĩa xã hội ở Liên Xô và Đông Âu là gì?',
        options: [
          'A. Do đường lối lãnh đạo của Đảng Cộng sản Liên Xô và các nước Đông Âu mang tính chủ quan, duy ý chí; chậm đổi mới cơ chế quản lí;...',
          'B. Tình trạng lạc hậu về khoa học – kĩ thuật, không theo kịp sự phát triển chung của thế giới.',
          'C. Chậm tiến hành cải cách, sửa đổi và khi thực hiện cải cách lại mắc phải sai lầm.',
          'D. Sự chống phá của các thế lực thù địch ở trong và ngoài nước.',
        ],
        correctIndex: 0,
        level: 'van_dung',
        explanation: 'Nguyên nhân sâu xa và có ý nghĩa quyết định nhất bắt nguồn từ nguyên nhân chủ quan nội tại: đường lối lãnh đạo duy ý chí, duy trì quá lâu mô hình tập trung quan liêu bao cấp và sai lầm nghiêm trọng trong quá trình cải tổ (xoá bỏ vai trò lãnh đạo của Đảng).',
      },
      {
        id: 'dmh1-mc-23',
        topicId: 'chu-de-3',
        lessonName: 'Bài 5: Quá trình xâm lược và cai trị của chủ nghĩa thực dân ở Đông Nam Á',
        question: 'Thực dân phương Tây sử dụng phương thức phổ biến nào để làm suy yếu khối đoàn kết dân tộc ở các nước Đông Nam Á?',
        options: [
          'A. Chính sách "chia để trị".',
          'B. Chính sách "đồng hoá văn hoá".',
          'C. Chính sách ngoại giao mềm dẻo.',
          'D. Chính sách bóc lột, khai thác thuộc địa.',
        ],
        correctIndex: 0,
        level: 'nhan_biet',
        explanation: 'Để dễ bề cai trị và dập tắt các cuộc khởi nghĩa, thực dân phương Tây triệt để thi hành chính sách "chia để trị": chia rẽ các dân tộc, tôn giáo, vùng miền và các giai cấp trong xã hội thuộc địa.',
      },
      {
        id: 'dmh1-mc-24',
        topicId: 'chu-de-3',
        lessonName: 'Bài 6: Hành trình đi đến độc lập dân tộc ở Đông Nam Á',
        question: 'Nét mới nổi bật trong phong trào đấu tranh giành độc lập dân tộc ở Đông Nam Á từ cuối thế kỉ XIX đến năm 1945 là:',
        options: [
          'A. Giai cấp tư sản nắm trọn quyền lãnh đạo tuyệt đối phong trào.',
          'B. Phong trào chỉ diễn ra dưới hình thức hòa bình hợp pháp.',
          'C. Giai cấp vô sản bước lên vũ đài chính trị, xuất hiện xu hướng mới – xu hướng vô sản.',
          'D. Hoàn toàn chấm dứt các cuộc khởi nghĩa mang tính chất nông dân.',
        ],
        correctIndex: 2,
        level: 'thong_hieu',
        explanation: 'Điểm mới lớn nhất là sự xuất hiện của giai cấp vô sản và xu hướng cách mạng vô sản dưới ảnh hưởng của Cách mạng tháng Mười Nga, tiêu biểu là sự thành lập các Đảng Cộng sản (In-đô-nê-xi-a 1920, Việt Nam 1930...).',
      },
    ],
    essayQuestions: [
      {
        id: 'dmh1-essay-1',
        topicId: 'chu-de-3',
        lessonName: 'Bài 5: Xâm lược và cai trị của thực dân ở Đông Nam Á',
        title: 'Đánh giá tác động của chủ nghĩa thực dân đối với cơ sở hạ tầng Đông Nam Á',
        question:
          'Có ý kiến cho rằng: "Sự thống trị của chủ nghĩa thực dân phương Tây đã gây ra nhiều tác động tiêu cực đến chính trị, kinh tế, văn hoá của các nước Đông Nam Á, nhưng bên cạnh đó cũng tạo ra những chuyển biến nhất định đến quá trình phát triển của một số nước Đông Nam Á về hạ tầng cơ sở".\n\nEm có đồng ý với ý kiến này không? Hãy lấy ví dụ cụ thể để chứng minh quan điểm của em.',
        guidance: [
          'Bày tỏ quan điểm đồng ý với ý kiến nhận định.',
          'Bản chất: Thực dân phương Tây không hề có mục đích tốt đẹp là khai hóa, mà xây dựng hạ tầng (đường sá, cầu cống, cảng biển) là để phục vụ mục đích cai trị quân sự và bóc lột tài nguyên vận chuyển về chính quốc.',
          'Dẫn chứng thực tế: Tuyến đường sắt Bắc - Nam ở Việt Nam, cảng Hải Phòng, cảng Sài Gòn, cầu Long Biên; hệ thống đường sắt ở Miến Điện, In-đô-nê-xi-a.',
          'Đánh giá hai mặt khách quan: Mặt tích cực tạo ra sự chuyển biến khách quan ngoài ý muốn của thực dân, tạo tiền đề hạ tầng cho sự phát triển sau độc lập.',
        ],
        modelAnswer: `1. Bày tỏ quan điểm:
Em hoàn toàn đồng ý với ý kiến trên. Đây là một nhận định khách quan, toàn diện và biện chứng về tác động nhiều mặt của chủ nghĩa thực dân đối với khu vực Đông Nam Á.

2. Phân tích và chứng minh qua các ví dụ thực tiễn:
- Về bản chất và mục đích ban đầu:
  Chính sách cai trị của thực dân phương Tây mục đích cao nhất là vơ vét tài nguyên, bóc lột sức lao động và đàn áp phong trào yêu nước. Tuy nhiên, để phục vụ cho việc vận chuyển khoáng sản, nông sản đồn điền và điều động quân đội đàn áp các cuộc khởi nghĩa, chính quyền thực dân buộc phải đầu tư xây dựng một số công trình hạ tầng cơ sở hiện đại.
- Dẫn chứng cụ thể:
  + Tại Việt Nam: Thực dân Pháp đã xây dựng tuyến đường sắt xuyên Việt (đường sắt Bắc - Nam), tuyến Hà Nội - Hải Phòng, Hà Nội - Đồng Đăng; xây dựng các cây cầu thép quy mô lớn thời bấy giờ như cầu Long Biên (Hà Nội), cầu Tràng Tiền (Huế), cầu Bình Lợi (Sài Gòn); nâng cấp hệ thống cảng biển nước sâu như cảng Hải Phòng, cảng Sài Gòn, cảng Đà Nẵng.
  + Tại In-đô-nê-xi-a: Thực dân Hà Lan xây dựng đường sắt trên đảo Gia-va để chuyên chở đường, cà phê, cao su ra các cảng biển lớn.
  + Tại Mi-an-ma: Thực dân Anh xây dựng hệ thống giao thông đường sông và đường sắt dọc sông I-ra-oa-đi để khai thác dầu mỏ và lúa gạo.

3. Đánh giá ý nghĩa lịch sử:
Những chuyển biến về cơ sở hạ tầng này là hệ quả khách quan nằm ngoài mong muốn chủ quan của chủ nghĩa thực dân. Dù được xây dựng bằng xương máu, mồ hôi nước mắt của nhân dân bản địa, nhưng sau khi giành được độc lập, các công trình này đã trở thành tiền đề cơ sở vật chất quan trọng để các quốc gia Đông Nam Á tái thiết và phát triển kinh tế đất nước.`,
        rubricCriteria: [
          { criterion: 'Khẳng định rõ quan điểm đồng ý và giải thích bản chất khách quan', maxScore: 0.5 },
          { criterion: 'Lấy dẫn chứng thực tế thuyết phục về giao thông, cảng biển, đường sắt', maxScore: 1.0 },
          { criterion: 'Đánh giá ý nghĩa của hạ tầng sau khi giành độc lập', maxScore: 0.5 },
        ],
      },
      {
        id: 'dmh1-essay-2',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        title: 'Phân tích tiềm năng và thách thức của chủ nghĩa tư bản hiện đại',
        question:
          'Phân tích tiềm năng và thách thức của chủ nghĩa tư bản hiện đại. Lấy ví dụ thực tiễn để chứng minh.',
        guidance: [
          'Khái niệm CNTB hiện đại: Xác lập từ nửa sau thế kỉ XX đến nay.',
          'Tiềm năng: Kinh tế quy mô lớn, khoa học - công nghệ (CMCN 4.0), kinh nghiệm quản lý, khả năng tự điều chỉnh.',
          'Thách thức: Khủng hoảng kinh tế chu kỳ, phân hóa giàu nghèo sâu sắc, các vấn đề toàn cầu (ô nhiễm, biến đổi khí hậu).',
          'Ví dụ chứng minh: Khủng hoảng 2008, phong trào Chiếm lấy phố Wall (Occupy Wall Street), các tập đoàn công nghệ Apple, Microsoft.',
        ],
        modelAnswer: `1. Tiềm năng của chủ nghĩa tư bản hiện đại:
- Tiềm lực kinh tế và tài chính khổng lồ: Các nước tư bản phát triển (G7) nắm giữ phần lớn tổng sản phẩm quốc nội (GDP) và các trung tâm tài chính, thương mại lớn nhất thế giới (New York, London, Tokyo).
- Đi đầu trong cuộc Cách mạng công nghiệp 4.0: CNTB hiện đại có ưu thế vượt trội về nghiên cứu khoa học - công nghệ, ứng dụng trí tuệ nhân tạo (AI), điện toán đám mây, công nghệ sinh học, chíp bán dẫn. (Ví dụ: Sự phát triển vượt bậc của các tập đoàn công nghệ đa quốc gia như Apple, Microsoft, Google, NVIDIA).
- Kinh nghiệm quản lý và khả năng tự điều chỉnh: Nền quản trị hiện đại, linh hoạt điều chỉnh chính sách nhà nước để can thiệp, cứu trợ thị trường khi xảy ra suy thoái.

2. Thách thức lớn của chủ nghĩa tư bản hiện đại:
- Khủng hoảng kinh tế, tài chính mang tính chu kỳ: Bản chất mâu thuẫn giữa sở hữu tư nhân và xã hội hóa sản xuất dẫn tới các cuộc khủng hoảng nghiêm trọng (Ví dụ: Cuộc đại suy thoái tài chính toàn cầu năm 2008 bùng nổ từ thị trường nhà đất tại Mỹ).
- Phân hóa giàu nghèo và bất bình đẳng xã hội ngày càng gay gắt: Của cải tập trung vào tay nhóm 1% tinh hoa, trong khi 99% người lao động chịu nhiều áp lực (Ví dụ: Phong trào "Chiếm lấy phố Uôn - Occupy Wall Street" tại New York năm 2011 với khẩu hiệu "Chúng tôi là 99%").
- Vấn đề ô nhiễm môi trường và biến đổi khí hậu: Mục tiêu tối đa hóa lợi nhuận đã và đang gây ra suy kiệt tài nguyên thiên nhiên và khủng hoảng khí hậu toàn cầu (Ví dụ: Các cuộc biểu tình "Rebel for Life" chống biến đổi khí hậu tại London, Anh).

3. Kết luận:
Chủ nghĩa tư bản hiện đại vẫn còn tiềm năng phát triển và khả năng tự thích nghi, nhưng do không thể xóa bỏ được bản chất tư hữu và mâu thuẫn đối kháng giai cấp, nó đang phải đối mặt với những giới hạn lịch sử sâu sắc.`,
        rubricCriteria: [
          { criterion: 'Phân tích đầy đủ các tiềm năng cốt lõi (kinh tế, KHCN, quản trị)', maxScore: 0.75 },
          { criterion: 'Phân tích sâu sắc các thách thức (khủng hoảng, bất bình đẳng, môi trường)', maxScore: 0.75 },
          { criterion: 'Có dẫn chứng thực tế sinh động (khủng hoảng 2008, Occupy Wall Street)', maxScore: 0.5 },
        ],
      },
    ],
  },

  // ĐỀ MINH HỌA SỐ 2
  {
    id: 'de-minh-hoa-2',
    code: 'ĐMH-02',
    title: 'Đề minh hoạ số 2 (Chuẩn Sách bài tập NXBGDVN)',
    durationMinutes: 60,
    scope: 'Học kì I (Kiểm tra định kỳ tổng hợp Chủ đề 1, 2, 3)',
    source: 'Sách Bài tập Lịch sử 11 - Kết nối tri thức với cuộc sống (Trang 32 - 36, NXB Giáo dục Việt Nam)',
    description: 'Đề thi 60 phút chuẩn Bộ GD&ĐT gồm 24 câu trắc nghiệm và phần Tự luận phân tích tư liệu về nguyên nhân khủng hoảng CNXH ở Liên Xô, bài học cho Việt Nam.',
    multipleChoiceQuestions: [
      {
        id: 'dmh2-mc-1',
        topicId: 'chu-de-1',
        lessonName: 'Bài 2: Sự xác lập và phát triển của CNTB',
        question: 'Ý nào phản ánh đúng thời gian chủ nghĩa tư bản mở rộng phạm vi ảnh hưởng ra toàn thế giới?',
        options: [
          'A. Nửa sau thế kỉ XVIII.',
          'B. Cuối thế kỉ XIX – đầu thế kỉ XX.',
          'C. Nửa sau thế kỉ XX.',
          'D. Nửa sau thế kỉ XXI.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Vào cuối thế kỉ XIX – đầu thế kỉ XX, các cường quốc tư bản hoàn thành việc phân chia thuộc địa, chủ nghĩa tư bản bành trướng và mở rộng phạm vi ảnh hưởng ra toàn cầu.',
      },
      {
        id: 'dmh2-mc-2',
        topicId: 'chu-de-2',
        lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
        question: 'Chính quyền Xô viết do V.I. Lê-nin đứng đầu được thành lập vào năm nào?',
        options: [
          'A. Năm 1918.',
          'B. Năm 1917.',
          'C. Năm 1919.',
          'D. Năm 1922.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Thắng lợi của Cách mạng tháng Mười Nga (7-11-1917 tức 25-10 theo lịch Nga) đã khai sinh ra Chính quyền Xô viết đầu tiên do Lê-nin đứng đầu.',
      },
      {
        id: 'dmh2-mc-3',
        topicId: 'chu-de-2',
        lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
        question: 'Sau khi V.I. Lê-nin qua đời (1-1924), ai là người tiếp tục lãnh đạo công cuộc xây dựng và bảo vệ đất nước Liên Xô?',
        options: [
          'A. V. I. Xta-lin.',
          'B. M. Goóc-ba-chốp.',
          'C. N. Khơ-rút-xốp.',
          'D. L. Brê-giơ-nhép.',
        ],
        correctIndex: 0,
        level: 'nhan_biet',
        explanation: 'Sau khi Lê-nin qua đời, I.V. Xta-lin được bầu làm Tổng Bí thư và lãnh đạo nhân dân Liên Xô thực hiện các kế hoạch 5 năm công nghiệp hóa, tập thể hóa và đánh thắng phát xít.',
      },
      {
        id: 'dmh2-mc-4',
        topicId: 'chu-de-2',
        lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG 2 đến nay',
        question: 'Sau Chiến tranh thế giới thứ hai, chủ nghĩa xã hội đã mở rộng ra phạm vi:',
        options: [
          'A. Đông Âu, một số nước ở châu Á và khu vực Mỹ La-tinh.',
          'B. Đông Âu và một số nước châu Á.',
          'C. một số nước châu Á và khu vực Mỹ La-tinh.',
          'D. một số nước Tây Âu, Đông Âu và khu vực Mỹ La-tinh.',
        ],
        correctIndex: 0,
        level: 'thong_hieu',
        explanation: 'CNXH phát triển vượt ra khỏi phạm vi một nước (Liên Xô) và trở thành hệ thống thế giới, mở rộng sang Đông Âu, châu Á (Trung Quốc, Việt Nam, Triều Tiên, Lào) và Mỹ La-tinh (Cu-ba).',
      },
      {
        id: 'dmh2-mc-5',
        topicId: 'chu-de-2',
        lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG 2 đến nay',
        question: 'Công cuộc đổi mới đất nước ở Việt Nam được Đảng Cộng sản Việt Nam khởi xướng từ năm nào?',
        options: [
          'A. Năm 1976.',
          'B. Năm 1978.',
          'C. Năm 1982.',
          'D. Năm 1986.',
        ],
        correctIndex: 3,
        level: 'nhan_biet',
        explanation: 'Đại hội đại biểu toàn quốc lần thứ VI của Đảng Cộng sản Việt Nam (tháng 12-1986) đã đề ra đường lối đổi mới toàn diện đất nước.',
      },
      {
        id: 'dmh2-mc-6',
        topicId: 'chu-de-2',
        lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG 2 đến nay',
        question: 'Từ khi thực hiện cải cách mở cửa (12-1978) đến nay, quy mô nền kinh tế Trung Quốc đã vươn lên đứng ở vị trí thứ mấy thế giới?',
        options: [
          'A. Đứng vị trí thứ tám thế giới.',
          'B. Đứng vị trí thứ năm thế giới.',
          'C. Đứng vị trí thứ ba thế giới.',
          'D. Đứng vị trí thứ hai thế giới (từ năm 2010).',
        ],
        correctIndex: 3,
        level: 'nhan_biet',
        explanation: 'Từ vị trí thứ 8 vào cuối thập niên 1970, kinh tế Trung Quốc đã tăng trưởng kỳ diệu và chính thức vượt qua Nhật Bản vào năm 2010 để trở thành nền kinh tế lớn thứ hai thế giới (sau Mỹ).',
      },
      {
        id: 'dmh2-mc-7',
        topicId: 'chu-de-1',
        lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
        question: 'Nửa cuối thế kỉ XIX, nhiệm vụ cấp thiết đặt ra cho các dân tộc Đức và I-ta-li-a là gì?',
        options: [
          'A. Thoát khỏi ách thống trị của nước ngoài.',
          'B. Thành lập chính quyền của giai cấp tư sản.',
          'C. Xoá bỏ tình trạng phân tán về chính trị, thống nhất đất nước.',
          'D. Giải quyết vấn đề ruộng đất cho nông dân.',
        ],
        correctIndex: 2,
        level: 'thong_hieu',
        explanation: 'Tại Đức và I-ta-li-a nửa sau thế kỉ XIX, đất nước bị chia cắt thành nhiều tiểu quốc phong kiến cản trở thị trường dân tộc, do đó nhiệm vụ hàng đầu là đấu tranh xóa bỏ tình trạng phân tán để thống nhất quốc gia.',
      },
      {
        id: 'dmh2-mc-8',
        topicId: 'chu-de-3',
        lessonName: 'Bài 5: Quá trình xâm lược và cai trị của chủ nghĩa thực dân ở Đông Nam Á',
        question: 'Đến giữa thế kỉ XIX, In-đô-nê-xi-a đã trở thành thuộc địa hoàn toàn của nước thực dân nào?',
        options: [
          'A. Hà Lan.',
          'B. Bồ Đào Nha.',
          'C. Tây Ban Nha.',
          'D. Anh.',
        ],
        correctIndex: 0,
        level: 'nhan_biet',
        explanation: 'Sau khi đánh bật ảnh hưởng của Bồ Đào Nha và Anh, thực dân Hà Lan đã thiết lập ách thống trị tàn bạo trên toàn bộ quần đảo In-đô-nê-xi-a.',
      },
    ],
    essayQuestions: [
      {
        id: 'dmh2-essay-1',
        topicId: 'chu-de-2',
        lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG 2 đến nay',
        title: 'Khai thác tư liệu giải thích nguyên nhân khủng hoảng và sụp đổ của CNXH ở Liên Xô và Đông Âu',
        question:
          'Khai thác đoạn tư liệu sau đây:\n"Do duy trì quá lâu những khiếm khuyết của mô hình cũ của chủ nghĩa xã hội, chậm trễ trong cách mạng khoa học và công nghệ, nhiều nước xã hội chủ nghĩa đã lâm vào khủng hoảng trầm trọng. Ở một số nước, Đảng Cộng sản và công nhân không còn nắm vai trò lãnh đạo, chế độ xã hội đã thay đổi..."\n(Đảng Cộng sản Việt Nam, Văn kiện Đảng toàn tập, Tập 51, 1991)\n\n1. Hãy giải thích các nguyên nhân dẫn đến sự khủng hoảng và tan rã của CNXH ở Đông Âu và Liên Xô.\n2. Theo em trong những nguyên nhân trên, nguyên nhân nào là quan trọng nhất? Vì sao?',
        guidance: [
          'Phân tích 4 nhóm nguyên nhân: Đường lối chủ quan duy ý chí; chậm ứng dụng KH-CN; sai lầm trong cải tổ; sự chống phá của thế lực thù địch.',
          'Chỉ rõ nguyên nhân quan trọng nhất: Đường lối lãnh đạo chủ quan, duy ý chí, áp dụng máy móc mô hình kinh tế tập trung quan liêu bao cấp.',
          'Vì sao quan trọng nhất: Đây là nguyên nhân nội tại, quyết định năng suất lao động và niềm tin của quần chúng nhân dân.',
        ],
        modelAnswer: `1. Phân tích các nguyên nhân dẫn đến sự khủng hoảng và sụp đổ của CNXH ở Liên Xô và Đông Âu:
- Thứ nhất: Do đường lối lãnh đạo của Đảng Cộng sản ở Liên Xô và các nước Đông Âu mang tính chủ quan, duy ý chí; áp dụng máy móc mô hình kinh tế kế hoạch hóa tập trung, quan liêu, bao cấp trong nhiều năm; chậm đổi mới cơ chế quản lý kinh tế.
- Thứ hai: Những thành tựu của cuộc cách mạng khoa học - công nghệ hiện đại không được áp dụng kịp thời vào sản xuất; năng suất lao động suy giảm dẫn tới tình trạng trì trệ kéo dài về kinh tế, đời sống nhân dân gặp nhiều khó khăn, làm giảm sút lòng tin trong xã hội.
- Thứ ba: Quá trình cải tổ (Perestroika) phạm sai lầm nghiêm trọng về đường lối và cách thức tiến hành, từ bỏ nguyên tắc tập trung dân chủ, thực hiện đa nguyên chính trị, dẫn đến xóa bỏ vai trò lãnh đạo của Đảng Cộng sản, đẩy khủng hoảng lên đỉnh điểm.
- Thứ tư: Hoạt động chống phá tinh vi theo chiến lược "diễn biến hòa bình" của các thế lực đế quốc thù địch từ bên ngoài kết hợp với các phần tử phản động trong nước.

2. Xác định nguyên nhân quan trọng nhất và lý giải:
- Nguyên nhân quan trọng nhất là: Đường lối lãnh đạo của Đảng Cộng sản mang tính chủ quan, duy ý chí; chậm đổi mới mô hình kinh tế và cơ chế quản lý.
- Vì sao:
  + Yếu tố nội tại bên trong luôn giữ vai trò quyết định; sự chống phá bên ngoài chỉ có thể phát huy tác dụng khi bên trong đã suy yếu và mất phương hướng.
  + Chính sự trì trệ kéo dài về kinh tế và sự suy thoái phẩm chất của một bộ phận cán bộ đã làm suy giảm năng suất lao động và làm xói mòn niềm tin của quần chúng nhân dân đối với chế độ XHCN.`,
        rubricCriteria: [
          { criterion: 'Phân tích đầy đủ 4 nhóm nguyên nhân bám sát tư liệu', maxScore: 1.5 },
          { criterion: 'Chỉ rõ và khẳng định chính xác nguyên nhân quan trọng nhất', maxScore: 0.5 },
          { criterion: 'Lập luận thuyết phục vì sao nguyên nhân nội tại giữ vai trò quyết định', maxScore: 1.0 },
        ],
      },
    ],
  },

  // ĐỀ MINH HỌA SỐ 3
  {
    id: 'de-minh-hoa-3',
    code: 'ĐMH-03',
    title: 'Đề minh hoạ số 3 (Chuẩn Sách bài tập NXBGDVN)',
    durationMinutes: 60,
    scope: 'Học kì II (Chủ đề 4: Kháng chiến bảo vệ Tổ quốc, Chủ đề 5: Cải cách lịch sử, Chủ đề 6: Biển Đông)',
    source: 'Sách Bài tập Lịch sử 11 - Kết nối tri thức với cuộc sống (Trang 64 - 68, NXB Giáo dục Việt Nam)',
    description: 'Đề kiểm tra chuẩn kiến thức Lịch sử Việt Nam (kháng chiến, cải cách Lê Thánh Tông, Minh Mạng và chủ quyền Biển Đông) kèm đáp án chính thức.',
    multipleChoiceQuestions: [
      {
        id: 'dmh3-mc-1',
        topicId: 'chu-de-4',
        lessonName: 'Bài 7: Khái quát chiến tranh bảo vệ Tổ quốc',
        question: 'Năm 1077, quân và dân Đại Việt dưới sự lãnh đạo của Lý Thường Kiệt đã đánh bại quân Tống tại đâu?',
        options: [
          'A. Kinh thành Thăng Long.',
          'B. Biên giới Việt – Trung.',
          'C. Phòng tuyến sông Như Nguyệt (Bắc Ninh).',
          'D. Thành Cổ Loa (Hà Nội).',
        ],
        correctIndex: 2,
        level: 'nhan_biet',
        explanation: 'Trận quyết chiến chiến lược trên phòng tuyến sông Như Nguyệt (sông Cầu) vào đầu năm 1077 đã đè bẹp ý chí xâm lược của 10 vạn quân Tống do Quách Quỳ chỉ huy.',
      },
      {
        id: 'dmh3-mc-2',
        topicId: 'chu-de-4',
        lessonName: 'Bài 7: Khái quát chiến tranh bảo vệ Tổ quốc',
        question: 'Những trận đánh lớn tiêu biểu trong ba lần kháng chiến chống quân Mông – Nguyên của nhà Trần là:',
        options: [
          'A. Đông Bộ Đầu, Hàm Tử, Chương Dương, Bạch Đằng.',
          'B. Bạch Đằng, Như Nguyệt, Chi Lăng – Xương Giang.',
          'C. Tốt Động – Chúc Động, Chi Lăng – Xương Giang.',
          'D. Rạch Gầm – Xoài Mút, Ngọc Hồi – Đống Đa.',
        ],
        correctIndex: 0,
        level: 'nhan_biet',
        explanation: 'Các trận đánh lừng lẫy của nhà Trần: Đông Bộ Đầu (1258 chống Mông Cổ); Hàm Tử, Chương Dương, Tây Kết, Vạn Kiếp (1285 chống Nguyên); Bạch Đằng, Vân Đồn (1288 chống Nguyên).',
      },
      {
        id: 'dmh3-mc-3',
        topicId: 'chu-de-4',
        lessonName: 'Bài 8: Khởi nghĩa và chiến tranh giải phóng dân tộc',
        question: 'Kế hoạch tạm thời rời núi rừng Thanh Hóa chuyển quân tiến vào Nghệ An của nghĩa quân Lam Sơn do ai đưa ra?',
        options: [
          'A. Nguyễn Trãi.',
          'B. Lê Lai.',
          'C. Lê Lợi.',
          'D. Nguyễn Chích.',
        ],
        correctIndex: 3,
        level: 'nhan_biet',
        explanation: 'Tướng Nguyễn Chích đã hiến kế chuyển quân vào Nghệ An – nơi đất rộng người đông, hiểm trở để xây dựng bàn đạp vững chắc trước khi tiến quân ra Bắc.',
      },
      {
        id: 'dmh3-mc-4',
        topicId: 'chu-de-5',
        lessonName: 'Bài 10: Cuộc cải cách của Lê Thánh Tông',
        question: 'Bộ luật hoàn chỉnh, tiến bộ bậc nhất được ban hành dưới thời vua Lê Thánh Tông có tên là gì?',
        options: [
          'A. Quốc triều hình luật (Luật Hồng Đức).',
          'B. Hình thư.',
          'C. Hình luật.',
          'D. Hoàng Việt luật lệ (Luật Gia Long).',
        ],
        correctIndex: 0,
        level: 'nhan_biet',
        explanation: 'Quốc triều hình luật (thường gọi là Luật Hồng Đức) gồm 722 điều, được ban hành dưới thời Lê Thánh Tông, là đỉnh cao lập pháp cổ truyền của dân tộc mang tính nhân văn sâu sắc.',
      },
      {
        id: 'dmh3-mc-5',
        topicId: 'chu-de-5',
        lessonName: 'Bài 11: Cuộc cải cách của Minh Mạng',
        question: 'Thời vua Minh Mạng, bộ máy chính quyền địa phương trong cả nước được chia thành:',
        options: [
          'A. các châu, phủ, huyện.',
          'B. 30 tỉnh và 1 phủ Thừa Thiên.',
          'C. 20 tỉnh và 3 phủ.',
          'D. 34 tỉnh và 4 phủ.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Vua Minh Mạng bãi bỏ Bắc Thành và Gia Định Thành, chia cả nước thống nhất thành 30 tỉnh và 1 phủ Thừa Thiên (khu vực kinh đô Huế).',
      },
      {
        id: 'dmh3-mc-6',
        topicId: 'chu-de-6',
        lessonName: 'Bài 13: Việt Nam và Biển Đông',
        question: 'Việc xác lập chủ quyền và thực thi quản lý liên tục tại quần đảo Hoàng Sa và quần đảo Trường Sa trong các thế kỉ XVII, XVIII được nhà nước phong kiến Việt Nam tiến hành thông qua hoạt động của lực lượng nào?',
        options: [
          'A. Thuỷ quân triều đình.',
          'B. Đội Hoàng Sa và đội Bắc Hải.',
          'C. Đô đốc hải quân.',
          'D. Thương thuyền buôn bán tự do.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: 'Thời các chúa Nguyễn, triều đình đã chính thức lập ra Đội Hoàng Sa và Đội Bắc Hải kiêm quản ra khai thác sản vật, đo vẽ hải trình, cắm mốc chủ quyền hàng năm một cách hòa bình và liên tục.',
      },
      {
        id: 'dmh3-mc-7',
        topicId: 'chu-de-6',
        lessonName: 'Bài 13: Việt Nam và Biển Đông',
        question: 'Tác phẩm nào dưới đây do Bảng nhãn Lê Quý Đôn biên soạn (1776) đã ghi chép cụ thể về cương vực và hoạt động của Đội Hoàng Sa tại Biển Đông?',
        options: [
          'A. Đại Việt sử ký toàn thư.',
          'B. Phủ biên tạp lục.',
          'C. Lịch triều hiến chương loại chí.',
          'D. Ức Trai thi tập.',
        ],
        correctIndex: 1,
        level: 'nhan_biet',
        explanation: '"Phủ biên tạp lục" (1776) của Lê Quý Đôn ghi chép vô cùng chi tiết về nguồn gốc, địa hình, hoạt động khai thác hải vật và chế độ đãi ngộ của triều đình đối với Đội Hoàng Sa.',
      },
    ],
    essayQuestions: [
      {
        id: 'dmh3-essay-1',
        topicId: 'chu-de-6',
        lessonName: 'Bài 12 & 13: Biển Đông và chủ quyền Việt Nam',
        title: 'Vị trí địa chiến lược của Biển Đông và nguyên tắc giải quyết tranh chấp trong Tuyên bố DOC',
        question:
          '1. Giải thích tại sao Biển Đông có vị trí chiến lược đặc biệt quan trọng trong an ninh và hàng hải quốc tế?\n2. Nêu nguyên tắc giải quyết các tranh chấp chủ quyền ở Biển Đông đã được các nước ASEAN và Trung Quốc thống nhất trong Tuyên bố về ứng xử của các bên ở Biển Đông (DOC 2002). Lấy ví dụ cụ thể về các hoạt động thực tiễn mà Việt Nam đã triển khai trên cơ sở tuân thủ nguyên tắc đó.',
        guidance: [
          'Vị trí Biển Đông: Tuyến đường biển huyết mạch nối liền Thái Bình Dương và Ấn Độ Dương, châu Á với châu Âu; mật độ tàu thuyền qua lại lớn thứ hai thế giới; nguồn tài nguyên dầu khí và hải sản phong phú.',
          'Nguyên tắc DOC 2002: Giải quyết hòa bình, không sử dụng vũ lực hoặc đe dọa dùng vũ lực; tuân thủ luật pháp quốc tế và UNCLOS 1982; tự kiềm chế, giữ nguyên trạng, thúc đẩy đàm phán COC.',
          'Ví dụ thực tiễn của Việt Nam: Đàm phán phân định ranh giới biển với các nước láng giềng (Vịnh Bắc Bộ với Trung Quốc năm 2000, phân định thềm lục địa với Indonesia); ban hành Luật Biển Việt Nam 2012; kiên quyết đấu tranh bảo vệ chủ quyền bằng biện pháp hòa bình ngoại giao.',
        ],
        modelAnswer: `1. Tại sao Biển Đông có vị trí chiến lược đặc biệt quan trọng trong an ninh và hàng hải quốc tế:
- Tuyến đường hàng hải huyết mạch toàn cầu: Biển Đông là tuyến đường hàng hải quốc tế nhộn nhịp thứ hai thế giới, nối liền Thái Bình Dương với Ấn Độ Dương, kết nối các nền kinh tế năng động châu Á (Nhật Bản, Hàn Quốc, Trung Quốc, ASEAN) với Trung Đông, châu Âu và châu Phi. Hàng năm có hơn 50% khối lượng thương mại đường biển toàn cầu vận chuyển qua vùng biển này.
- Các eo biển chiến lược: Chứa đựng các eo biển yết hầu như eo biển Ma-lắc-ca, Lu-xôn, Ba-si – nơi điều tiết lưu lượng dầu mỏ và hàng hóa sống còn của thế giới.
- Vị trí địa chính trị - an ninh: Nằm ở vị trí trung tâm Đông Nam Á, là lá chắn phòng thủ tự nhiên hướng Đông của bán đảo Đông Dương và là địa bàn cạnh tranh ảnh hưởng chiến lược giữa các cường quốc lớn.
- Nguồn tài nguyên giàu có: Trữ lượng dầu khí lớn ở thềm lục địa (bồn trũng Nam Côn Sơn, Cửu Long, Hoàng Sa) và nguồn lợi sinh vật biển vô cùng phong phú (hơn 12.000 loài sinh vật).

2. Nguyên tắc giải quyết tranh chấp trong DOC 2002 và thực tiễn của Việt Nam:
- Các nguyên tắc cốt lõi của Tuyên bố DOC:
  + Giải quyết mọi tranh chấp lãnh thổ và quyền tài phán bằng các biện pháp hòa bình, không sử dụng vũ lực hoặc đe dọa sử dụng vũ lực.
  + Tuân thủ nghiêm túc các nguyên tắc được thừa nhận phổ biến của luật pháp quốc tế, đặc biệt là Công ước Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982).
  + Các bên cam kết tự kiềm chế, không tiến hành các hoạt động làm phức tạp thêm hoặc gia tăng tranh chấp; cùng nhau xây dựng Bộ Quy tắc ứng xử ở Biển Đông (COC) có hiệu lực và ràng buộc pháp lý.
- Hoạt động thực tiễn của Việt Nam:
  + Việt Nam kiên định chủ trương giải quyết tranh chấp bằng biện pháp hòa bình, trên cơ sở luật pháp quốc tế và UNCLOS 1982.
  + Đã ký Hiệp định phân định Vịnh Bắc Bộ và Hiệp định Hợp tác nghề cá với Trung Quốc (năm 2000).
  + Ký thỏa thuận phân định ranh giới thềm lục địa và vùng đặc quyền kinh tế với Thái Lan (1997), In-đô-nê-xi-a (2003 và 2022).
  + Ban hành Luật Biển Việt Nam năm 2012 quy định chuẩn mực theo UNCLOS 1982; tích cực cùng các nước ASEAN thúc đẩy đàm phán thực chất Bộ Quy tắc COC với Trung Quốc.`,
        rubricCriteria: [
          { criterion: 'Phân tích đầy đủ vị trí hàng hải, eo biển và an ninh quốc tế của Biển Đông', maxScore: 1.5 },
          { criterion: 'Nêu chính xác các nguyên tắc hòa bình của DOC 2002 và UNCLOS 1982', maxScore: 1.0 },
          { criterion: 'Nêu dẫn chứng thực tiễn đàm phán phân định biển hòa bình của Việt Nam', maxScore: 0.5 },
        ],
      },
    ],
  },

  // ĐỀ MINH HỌA SỐ 4
  {
    id: 'de-minh-hoa-4',
    code: 'ĐMH-04',
    title: 'Đề minh hoạ số 4 (Chuẩn Sách bài tập NXBGDVN)',
    durationMinutes: 60,
    scope: 'Học kì II (Khảo thí cuối năm Lịch sử 11 GDPT 2018)',
    source: 'Sách Bài tập Lịch sử 11 - Kết nối tri thức với cuộc sống (Trang 69 - 73, NXB Giáo dục Việt Nam)',
    description: 'Đề khảo thí toàn diện 24 câu trắc nghiệm và 2 câu tự luận về bài học kháng chiến chống ngoại xâm và chủ quyền biển đảo của cha ông ta.',
    multipleChoiceQuestions: [
      {
        id: 'dmh4-mc-1',
        topicId: 'chu-de-4',
        lessonName: 'Bài 7: Khái quát chiến tranh bảo vệ Tổ quốc',
        question: 'Chiến thắng nào đã đè bẹp và chấm dứt hoàn toàn mưu đồ xâm lược Đại Việt của nhà Nguyên năm 1288?',
        options: [
          'A. Đông Bộ Đầu.',
          'B. Vạn Kiếp.',
          'C. Vân Đồn.',
          'D. Bạch Đằng.',
        ],
        correctIndex: 3,
        level: 'nhan_biet',
        explanation: 'Trận đại thắng Bạch Đằng ngày 9-4-1288 do Quốc công Tiết chế Trần Hưng Đạo chỉ huy đã tiêu diệt hoàn toàn thủy quân giặc do Ô Mã Nhi cầm đầu, chấm dứt vĩnh viễn mộng xâm lược của đế quốc Mông - Nguyên.',
      },
      {
        id: 'dmh4-mc-2',
        topicId: 'chu-de-5',
        lessonName: 'Bài 9: Cuộc cải cách của Hồ Quý Ly và Triều Hồ',
        question: 'Hồ Quý Ly ban hành chính sách hạn điền và hạn nô nhằm mục đích chủ yếu gì?',
        options: [
          'A. Thúc đẩy sản xuất nông nghiệp phát triển.',
          'B. Hạn chế thế lực kinh tế của quý tộc Trần, tăng nguồn thu thuế và tăng quyền lực tập quyền.',
          'C. Chia lại toàn bộ ruộng đất cho nông dân nghèo.',
          'D. Phát triển kinh tế hàng hóa và thủ công nghiệp.',
        ],
        correctIndex: 1,
        level: 'thong_hieu',
        explanation: 'Chính sách hạn điền (giới hạn số ruộng tư) và hạn nô (giới hạn số gia nô quý tộc) trực tiếp đánh vào nền tảng kinh tế của tầng lớp quý tộc nhà Trần, biến nô tì thành dân tự do để triều đình thu thuế và tuyển lính.',
      },
      {
        id: 'dmh4-mc-3',
        topicId: 'chu-de-6',
        lessonName: 'Bài 13: Việt Nam và Biển Đông',
        question: 'Năm 1951, chủ quyền của Việt Nam đối với quần đảo Hoàng Sa và quần đảo Trường Sa đã được tuyên bố chính thức tại hội nghị quốc tế nào mà không gặp phải sự phản đối?',
        options: [
          'A. Hội nghị Giơ-ne-vơ.',
          'B. Hội nghị Pốt-xđam.',
          'C. Hội nghị Pa-ri.',
          'D. Hội nghị San Francisco (Xan Phran-xi-xcô).',
        ],
        correctIndex: 3,
        level: 'nhan_biet',
        explanation: 'Tại Hội nghị Hòa bình San Francisco năm 1951 với sự tham dự của 51 quốc gia, Trưởng phái đoàn đại diện quốc gia Việt Nam đã dõng dạc tuyên bố chủ quyền lâu đời của Việt Nam đối với hai quần đảo Hoàng Sa và Trường Sa mà không có bất kỳ quốc gia nào phản đối.',
      },
    ],
    essayQuestions: [
      {
        id: 'dmh4-essay-1',
        topicId: 'chu-de-6',
        lessonName: 'Bài 13: Việt Nam và Biển Đông',
        title: 'Ý nghĩa của việc thành lập các đội dân binh Hoàng Sa và Bắc Hải thời phong kiến',
        question:
          'Hãy phân tích ý nghĩa lịch sử và giá trị pháp lý của việc thành lập các đội dân binh Hoàng Sa và Bắc Hải đối với quá trình xác lập, thực thi và bảo vệ chủ quyền biển đảo của cha ông ta.',
        guidance: [
          'Tổ chức và hoạt động: Do chính quyền chúa Nguyễn và triều Nguyễn chính thức thành lập, quản lý và cấp phương tiện, lương thực.',
          'Nhiệm vụ: Đo đạc hải trình, thu lượm hải vật, cắm mốc chủ quyền hàng năm từ tháng 2 đến tháng 8 âm lịch.',
          'Ý nghĩa pháp lý quốc tế: Khẳng định sự thực thi chủ quyền của Nhà nước Việt Nam mang tính hòa bình, thực sự, liên tục và danh nghĩa nhà nước hợp pháp theo luật biển quốc tế.',
        ],
        modelAnswer: `1. Bối cảnh ra đời và tổ chức của Đội Hoàng Sa và Bắc Hải:
- Từ thế kỉ XVII, các chúa Nguyễn ở Đàng Trong đã chính thức tổ chức Đội Hoàng Sa (lấy người từ xã An Vĩnh, huyện Bình Sơn, Quảng Ngãi) và Đội Bắc Hải kiêm quản (lấy người ở Bình Thuận).
- Đây là tổ chức dân binh do Nhà nước trực tiếp thành lập, chỉ huy và chu cấp quân lương, giấy công lệnh để dong thuyền buồm ra các đảo Hoàng Sa, Trường Sa làm nhiệm vụ định kỳ hàng năm từ tháng 2 đến tháng 8 âm lịch.

2. Ý nghĩa lịch sử và giá trị pháp lý quốc tế to lớn:
- Bằng chứng lịch sử đanh thép về chủ quyền quốc gia:
  Hoạt động của các đội Hoàng Sa và Bắc Hải chứng minh Nhà nước Việt Nam đã chiếm hữu thực sự, hòa bình và liên tục hai quần đảo Hoàng Sa và Trường Sa từ thế kỉ XVII khi chúng còn là vùng lãnh thổ vô chủ (res nullius).
- Phù hợp hoàn toàn với nguyên tắc thụ đắc lãnh thổ của Luật pháp quốc tế:
  Theo luật pháp quốc tế, việc thụ đắc lãnh thổ phải do Nhà nước tiến hành nhân danh quyền lực công, hòa bình và được thực thi thường xuyên liên tục. Đội Hoàng Sa là lực lượng bán quân sự của triều đình, có lệnh bài, được ghi nhận tỉ mỉ trong các châu bản, mộc bản và thư tịch chính thống của triều đình (Đại Nam thực lục, Phủ biên tạp lục).
- Nền tảng pháp lý vững chắc cho công cuộc bảo vệ Tổ quốc hôm nay:
  Các bằng chứng hoạt động liên tục của Đội Hoàng Sa là di sản vô giá, là cơ sở pháp lý và lịch sử không thể chối cãi để nhân dân ta kiên quyết bảo vệ toàn vẹn chủ quyền lãnh thổ thiêng liêng ở Biển Đông hôm nay.`,
        rubricCriteria: [
          { criterion: 'Trình bày chính xác tổ chức và hoạt động của Đội Hoàng Sa, Bắc Hải', maxScore: 0.75 },
          { criterion: 'Phân tích tính pháp lý quốc tế: Chiếm hữu thực sự, hòa bình, liên tục', maxScore: 0.75 },
          { criterion: 'Rút ra ý nghĩa bảo vệ chủ quyền biển đảo hôm nay', maxScore: 0.5 },
        ],
      },
    ],
  },
];
