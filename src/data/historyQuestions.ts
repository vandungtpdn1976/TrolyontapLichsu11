import { MultipleChoiceQuestion, TrueFalseQuestion, EssayQuestion } from '../types/history';

export const MULTIPLE_CHOICE_QUESTIONS: MultipleChoiceQuestion[] = [
  // Chủ đề 1
  {
    id: 'mc-1',
    topicId: 'chu-de-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    question: 'Nhiệm vụ dân tộc của các cuộc cách mạng tư sản thời cận đại là gì?',
    options: [
      'A. Xóa bỏ tình trạng phong kiến phân tán, thống nhất thị trường dân tộc hoặc giải phóng dân tộc.',
      'B. Đem lại ruộng đất cho giai cấp nông dân và thiết lập nền chuyên chính vô sản.',
      'C. Xóa bỏ hoàn toàn chế độ tư hữu tư nhân về tư liệu sản xuất trong xã hội.',
      'D. Thiết lập chế độ phong kiến quân chủ chuyên chế trung ương tập quyền cao độ.',
    ],
    correctIndex: 0,
    level: 'thong_hieu',
    explanation: 'Nhiệm vụ dân tộc của cách mạng tư sản nhằm xóa bỏ tình trạng cát cứ phong kiến để hình thành thị trường dân tộc thống nhất (như ở Anh, Pháp, Đức, I-ta-li-a) hoặc giải phóng dân tộc khỏi ách thống trị ngoại bang (như Bắc Mỹ, Hà Lan).',
    optionsAnalysis: [
      'A: ĐÚNG - Bản chất nhiệm vụ dân tộc là thống nhất thị trường nội địa hoặc giành độc lập dân tộc.',
      'B: SAI - Đem lại ruộng đất cho nông dân thuộc nhiệm vụ dân chủ; còn chuyên chính vô sản là mục tiêu của cách mạng vô sản XHCN.',
      'C: SAI - Cách mạng tư sản thiết lập và bảo vệ chế độ tư hữu TBCN, không xóa bỏ tư hữu.',
      'D: SAI - Chế độ phong kiến chuyên chế chính là đối tượng bị cách mạng tư sản đánh đổ.'
    ],
    trapTip: 'Từ khóa bẫy: Phân biệt rõ "Nhiệm vụ DÂN TỘC" (thị trường, độc lập) với "Nhiệm vụ DÂN CHỦ" (ruộng đất, quyền tự do dân chủ).',
    thayDungAdvice: 'Em nhớ phân biệt: "Nhiệm vụ dân chủ" là xóa bỏ chế độ phong kiến chuyên chế, đem lại quyền tự do dân chủ; còn "Nhiệm vụ dân tộc" là thống nhất thị trường hoặc đánh đuổi thực dân giải phóng đất nước!',
  },
  {
    id: 'mc-2',
    topicId: 'chu-de-1',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    question: 'Hình thức tổ chức độc quyền nào dưới đây xuất hiện phổ biến ở Mỹ vào cuối thế kỉ XIX - đầu thế kỉ XX?',
    options: [
      'A. Các-ten (Cartel)',
      'B. Tơ-rớt (Trust)',
      'C. Xanh-đi-ca (Syndicate)',
      'D. Hợp tác xã nông nghiệp',
    ],
    correctIndex: 1,
    level: 'nhan_biet',
    explanation: 'Vào cuối thế kỉ XIX - đầu thế kỉ XX, ở Mỹ hình thành các tổ chức độc quyền khổng lồ dưới hình thức Tơ-rớt (Trust) như Vua thép Morgan, Vua dầu mỏ Rockefeller.',
    optionsAnalysis: [
      'A: SAI - Cartel phổ biến nhất ở Đức (thỏa thuận giá cả, thị trường nhưng độc lập sản xuất).',
      'B: ĐÚNG - Trust là hình thức sáp nhập toàn diện cả sản xuất lẫn tiêu thụ, cực kỳ phổ biến tại Mỹ.',
      'C: SAI - Syndicate phổ biến ở Pháp, Đức (thống nhất đầu mối lưu thông, tiêu thụ sản phẩm).',
      'D: SAI - Hợp tác xã nông nghiệp thuộc hình thức kinh tế tập thể, không phải tổ chức độc quyền TBCN.'
    ],
    trapTip: 'Nhớ cặp đôi địa danh - hình thức: Mỹ gắn liền với Trust ("Vua thép", "Vua dầu mỏ"); Đức gắn liền với Cartel, Syndicate.',
    thayDungAdvice: 'Mẹo ghi nhớ của Thầy Dũng: Đức hay gắn với Cartel và Syndicate, còn Mỹ đặc trưng nhất là Trust (các "ông vua" thép, dầu mỏ thống trị nền kinh tế)!',
  },
  {
    id: 'mc-3',
    topicId: 'chu-de-1',
    lessonName: 'Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản',
    question: 'Đặc điểm nào sau đây KHÔNG phải là đặc trưng của chủ nghĩa tư bản hiện đại?',
    options: [
      'A. Lực lượng sản xuất phát triển mạnh mẽ gắn với cuộc cách mạng khoa học - công nghệ.',
      'B. Nhà nước tư sản tăng cường điều tiết, can thiệp vào nền kinh tế.',
      'C. Đã xóa bỏ hoàn toàn mọi mâu thuẫn giai cấp và khủng hoảng kinh tế chu kỳ.',
      'D. Có khả năng tự điều chỉnh để thích nghi trước những biến động toàn cầu.',
    ],
    correctIndex: 2,
    level: 'van_dung',
    explanation: 'Mặc dù có sự tự điều chỉnh và phát triển mạnh mẽ, CNTB hiện đại vẫn không thể xóa bỏ hoàn toàn mâu thuẫn vốn có giữa tính chất xã hội hóa của sản xuất với chế độ chiếm hữu tư nhân tư bản chủ nghĩa, các cuộc khủng hoảng tài chính và bất bình đẳng giàu nghèo vẫn tồn tại.',
    optionsAnalysis: [
      'A: SAI VÌ ĐÂY LÀ ĐẶC TRƯNG ĐÚNG - CNTB hiện đại ứng dụng đỉnh cao thành tựu CMCN 4.0.',
      'B: SAI VÌ ĐÂY LÀ ĐẶC TRƯNG ĐÚNG - CNTB độc quyền nhà nước can thiệp sâu để cứu trợ, điều tiết.',
      'C: ĐÚNG LÀ PHƯƠNG ÁN CẦN CHỌN - CNTB bản chất dựa trên bóc lột tư hữu, không bao giờ xóa bỏ hoàn toàn mâu thuẫn giai cấp.',
      'D: SAI VÌ ĐÂY LÀ ĐẶC TRƯNG ĐÚNG - CNTB có sức sống và khả năng tự điều chỉnh rất linh hoạt.'
    ],
    trapTip: 'Từ bẫy kinh điển: "Xóa bỏ hoàn toàn", "triệt để không còn", "duy nhất". Những từ mang tính tuyệt đối hóa trong câu hỏi bản chất CNTB thường là bẫy sai!',
    thayDungAdvice: 'Khi gặp các từ tuyệt đối hóa như "xóa bỏ hoàn toàn", "triệt để không còn", các em phải hết sức cảnh giác vì CNTB không thể tự triệt tiêu bản chất bóc lột của nó.',
  },

  // Chủ đề 2
  {
    id: 'mc-4',
    topicId: 'chu-de-2',
    lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
    question: 'Tư tưởng chỉ đạo của V.I.Lênin trong việc thành lập Liên bang Cộng hòa xã hội chủ nghĩa Xô viết năm 1922 là gì?',
    options: [
      'A. Bình đẳng về mọi mặt, tôn trọng quyền tự quyết của các dân tộc và tự nguyện gia nhập.',
      'B. Thống nhất quyền lực tuyệt đối vào người Nga và hạn chế ngôn ngữ bản địa.',
      'C. Cưỡng chế sáp nhập các nước cộng hòa vào lãnh thổ Liên bang Nga.',
      'D. Duy trì nền kinh tế tự cung tự cấp và bế quan tỏa cảng.',
    ],
    correctIndex: 0,
    level: 'thong_hieu',
    explanation: 'Lênin kiên quyết bảo vệ nguyên tắc: bình đẳng giữa các dân tộc, quyền tự quyết và trên cơ sở tinh thần liên minh tự nguyện giữa các nước cộng hòa Xô viết.',
    optionsAnalysis: [
      'A: ĐÚNG - Ba nguyên tắc vàng của Lênin: Tự nguyện - Bình đẳng - Tôn trọng quyền tự quyết.',
      'B: SAI - Lênin kiên quyết chống tư tưởng "Đại Nga" vị kỷ, kỳ thị dân tộc thiểu số.',
      'C: SAI - Bản chất liên bang là liên minh tự nguyện, không phải cưỡng chế sáp nhập.',
      'D: SAI - Liên bang Xô viết chủ trương liên kết kinh tế chặt chẽ, không bế quan tỏa cảng.'
    ],
    trapTip: 'Từ khóa bẫy: Cảnh giác các nhận định xuyên tạc mô hình liên bang của Lênin thành "sáp nhập cưỡng bức" hoặc "độc tôn người Nga".',
    thayDungAdvice: 'Đây là câu hỏi cốt lõi bài 3! Các em nhớ 3 chữ vàng Lênin đề ra: Tự nguyện - Bình đẳng - Tôn trọng quyền tự quyết dân tộc.',
  },
  {
    id: 'mc-5',
    topicId: 'chu-de-2',
    lessonName: 'Bài 4: Sự phát triển của CNXH từ sau CTTG thứ hai đến nay',
    question: 'Trọng tâm trong đường lối Cải cách - Mở cửa do Đặng Tiểu Bình khởi xướng ở Trung Quốc từ tháng 12/1978 là gì?',
    options: [
      'A. Tập trung cải cách chính trị, xóa bỏ sự lãnh đạo của Đảng Cộng sản.',
      'B. Lấy phát triển kinh tế làm trung tâm, kiên trì bốn nguyên tắc cơ bản.',
      'C. Ưu tiên phát triển công nghiệp quốc phòng và vũ trụ quân sự.',
      'D. Thực hiện quốc hữu hóa toàn bộ tư liệu sản xuất và hợp tác hóa triệt để.',
    ],
    correctIndex: 1,
    level: 'thong_hieu',
    explanation: 'Đường lối cải cách mở cửa của Trung Quốc kiên trì: lấy phát triển kinh tế làm trung tâm, tiến hành cải cách mở cửa, xây dựng CNXH đặc sắc Trung Quốc.',
    optionsAnalysis: [
      'A: SAI - Đây là sai lầm trong cải tổ của Goóc-ba-chốp ở Liên Xô, Trung Quốc kiên trì sự lãnh đạo của Đảng.',
      'B: ĐÚNG - Lấy phát triển kinh tế làm trọng tâm, chuyển sang nền kinh tế thị trường XHCN.',
      'C: SAI - Quốc phòng chỉ là 1 trong 4 hiện đại hóa, không phải trọng tâm duy nhất.',
      'D: SAI - Trung Quốc phát triển nền kinh tế nhiều thành phần, không duy trì công hữu tuyệt đối máy móc.'
    ],
    trapTip: 'So sánh Liên Xô vs Trung Quốc/Việt Nam: Liên Xô nóng vội cải tổ chính trị -> sụp đổ; Trung Quốc & Việt Nam lấy kinh tế làm trung tâm -> thành công rực rỡ.',
    thayDungAdvice: 'Hãy so sánh với Liên Xô: Liên Xô mắc sai lầm nghiêm trọng khi vội vã chuyển trọng tâm sang cải tổ chính trị đa nguyên, còn Trung Quốc và Việt Nam lấy đổi mới/cải cách kinh tế làm trọng tâm!',
  },

  // Chủ đề 3
  {
    id: 'mc-6',
    topicId: 'chu-de-3',
    lessonName: 'Bài 5: Quá trình xâm lược và cai trị của chủ nghĩa thực dân',
    question: 'Quốc gia duy nhất ở khu vực Đông Nam Á giữ được nền độc lập tương đối trước sự xâm lược của chủ nghĩa thực dân phương Tây cuối thế kỉ XIX là',
    options: [
      'A. Miến Điện (Myanmar).',
      'B. Xiêm (Thái Lan).',
      'C. Mã Lai (Malaysia).',
      'D. In-đô-nê-xi-a.',
    ],
    correctIndex: 1,
    level: 'nhan_biet',
    explanation: 'Nhờ chính sách cải cách tiến bộ của vua Rama V (Chulalongkorn) và chính sách ngoại giao mềm dẻo khôn khéo ("ngoại giao cây tre"), Xiêm đã duy trì được nền độc lập, trở thành vùng đệm giữa Anh và Pháp.',
    optionsAnalysis: [
      'A: SAI - Miến Điện bị thực dân Anh xâm chiếm và sáp nhập vào Ấn Độ thuộc Anh.',
      'B: ĐÚNG - Xiêm (Thái Lan) là quốc gia duy nhất giữ được độc lập nhờ cải cách và ngoại giao vùng đệm.',
      'C: SAI - Mã Lai bị thực dân Anh biến thành thuộc địa khai thác thiếc và cao su.',
      'D: SAI - In-đô-nê-xi-a bị thực dân Hà Lan đô hộ suốt hơn 300 năm.'
    ],
    trapTip: 'Từ khóa then chốt: Xiêm duy trì độc lập là "độc lập tương đối" (vẫn chịu một số thỏa hiệp kinh tế với Anh - Pháp), không phải hoàn toàn nguyên vẹn.',
    thayDungAdvice: 'Nhớ câu hỏi kinh điển này: Xiêm giữ được độc lập nhờ kết hợp cả nội lực (cải cách duy tân mở mang đất nước) và ngoại lực (tận dụng mâu thuẫn Anh - Pháp làm vùng đệm).',
  },

  // Chủ đề 4
  {
    id: 'mc-7',
    topicId: 'chu-de-4',
    lessonName: 'Bài 7: Khái quát các cuộc kháng chiến và khởi nghĩa giành độc lập',
    question: 'Nghệ thuật quân sự nổi bật của cha ông ta trong cuộc kháng chiến chống Tống (1075 - 1077) do Lý Thường Kiệt lãnh đạo là gì?',
    options: [
      'A. "Vườn không nhà trống", nhử địch vào sâu để tiêu hao sinh lực.',
      'B. Chủ động tiến công trước để tự vệ ("Tiên phát chế nhân") và lập phòng tuyến sông Như Nguyệt.',
      'C. Vây thành diệt viện, công tâm đánh vào lòng người.',
      'D. Tránh chỗ mạnh, đánh chỗ yếu, tiến hành chiến tranh du kích lâu dài.',
    ],
    correctIndex: 1,
    level: 'thong_hieu',
    explanation: 'Lý Thường Kiệt chủ trương: "Ngồi yên đợi giặc không bằng đem quân đánh trước để chặn mũi nhọn của giặc" (Tiên phát chế nhân), sau đó chủ động rút về lập phòng tuyến hiểm yếu trên sông Như Nguyệt.',
    optionsAnalysis: [
      'A: SAI - "Vườn không nhà trống" (thanh dã) là nghệ thuật tiêu biểu của nhà Trần chống Mông - Nguyên.',
      'B: ĐÚNG - Tiên phát chế nhân (đánh sang đất Tống phá cứ điểm hậu cần) và phòng tuyến sông Như Nguyệt.',
      'C: SAI - Vây thành diệt viện và tâm công là nghệ thuật đặc sắc của khởi nghĩa Lam Sơn.',
      'D: SAI - Tránh chỗ mạnh đánh chỗ yếu là lối đánh phổ biến của chiến tranh du kích sau này.'
    ],
    trapTip: 'Phân biệt nghệ thuật theo triều đại: Lý Thường Kiệt (Tiên phát chế nhân); Trần (Thanh dã, lấy đoản binh thắng trường trận); Lam Sơn (Tâm công, diệt viện).',
    thayDungAdvice: 'Phân biệt nghệ thuật quân sự: Lý Thường Kiệt -> "Tiên phát chế nhân"; Trần Hưng Đạo -> "Vườn không nhà trống", "dĩ đoản chế trường"; Lam Sơn -> "Vây thành diệt viện", "tâm công".',
  },
  {
    id: 'mc-8',
    topicId: 'chu-de-4',
    lessonName: 'Bài 8: Một số bài học lịch sử rút ra từ các cuộc kháng chiến',
    question: 'Nguyên nhân cơ bản nhất quyết định thắng lợi của các cuộc chiến tranh bảo vệ Tổ quốc trong lịch sử dân tộc Việt Nam là',
    options: [
      'A. Vũ khí trang bị hiện đại hơn kẻ thù xâm lược.',
      'B. Sự giúp đỡ to lớn và toàn diện của các nước láng giềng.',
      'C. Lòng yêu nước nồng nàn và khối đại đoàn kết toàn dân tộc.',
      'D. Địa hình hiểm trở nhiều sông ngòi, đầm lầy.',
    ],
    correctIndex: 2,
    level: 'van_dung',
    explanation: 'Tinh thần yêu nước và khối đại đoàn kết toàn dân tộc chính là nền tảng cội nguồn vững chắc nhất giúp dân tộc ta đánh bại mọi kẻ thù xâm lược hung bạo dù chúng có quân số và vũ khí áp đảo.',
    optionsAnalysis: [
      'A: SAI - Kẻ thù xâm lược phong kiến phương Bắc luôn có vũ khí, thiết kỵ vượt trội hơn ta.',
      'B: SAI - Trong các cuộc kháng chiến trước 1945, dân tộc ta tự lực cánh sinh là chính.',
      'C: ĐÚNG - Sức mạnh đoàn kết toàn dân tộc ("khoan thư sức dân") là nhân tố nội tại quyết định nhất.',
      'D: SAI - Địa hình là điều kiện khách quan hỗ trợ, không thể thay thế con người và ý chí.'
    ],
    trapTip: 'Từ khóa: "Quyết định nhất", "cơ bản nhất" luôn luôn là NHÂN TỐ CON NGƯỜI, tinh thần yêu nước và khối đại đoàn kết toàn dân.',
    thayDungAdvice: 'Trần Hưng Đạo từng đúc kết: "Khoan thư sức dân để làm kế sâu rễ bền gốc, đó là thượng sách giữ nước!". Dân là gốc!',
  },

  // Chủ đề 5
  {
    id: 'mc-9',
    topicId: 'chu-de-5',
    lessonName: 'Bài 9: Cuộc cải cách của Hồ Quý Ly và triều Hồ',
    question: 'Chính sách kinh tế - tài chính nào của Hồ Quý Ly được đánh giá là tiến bộ, đi trước thời đại nhưng lại gặp nhiều khó khăn trong khâu thực thi?',
    options: [
      'A. Chia ruộng đất công làng xã thành sở hữu tư nhân hoàn toàn.',
      'B. Phát hành tiền giấy "Thông bảo hội sao" và thu hồi tiền đồng.',
      'C. Cấm buôn bán và giao thương với thương nhân ngoại quốc.',
      'D. Bãi bỏ việc thu thuế nông nghiệp và thuế thương nghiệp.',
    ],
    correctIndex: 1,
    level: 'thong_hieu',
    explanation: 'Năm 1396, Hồ Quý Ly ban hành tiền giấy "Thông bảo hội sao", đây là đồng tiền giấy đầu tiên trong lịch sử Việt Nam. Tuy nhiên do dân chúng chưa quen và nạn làm tiền giả nên gặp nhiều trở ngại.',
    optionsAnalysis: [
      'A: SAI - Hồ Quý Ly hạn điền để hạn chế sở hữu tư nhân, tăng ruộng đất nhà nước, không tư hữu hóa.',
      'B: ĐÚNG - Phát hành tiền giấy "Thông bảo hội sao" (1396) thu đổi tiền đồng về đúc vũ khí.',
      'C: SAI - Triều Hồ không cấm ngoại thương hoàn toàn mà kiểm soát để tăng thu ngân sách.',
      'D: SAI - Nhà nước vẫn thu thuế dựa trên sổ hộ tịch và số ruộng đất canh tác.'
    ],
    trapTip: 'Tiền giấy Thông bảo hội sao (1396) là phát minh tài chính chấn động thời phong kiến, nhưng hạn chế ở khâu bảo an và lòng tin nhân dân.',
    thayDungAdvice: 'Em nhớ: Hồ Quý Ly là nhà cải cách táo bạo, tư duy đi trước thời đại cả mấy thế kỉ (tiền giấy, chữ Nôm, hạn điền, hạn nô), nhưng hạn chế lớn nhất là chưa tập hợp được lòng dân rộng rãi.',
  },
  {
    id: 'mc-10',
    topicId: 'chu-de-5',
    lessonName: 'Bài 10: Cuộc cải cách của Lê Thánh Tông (thế kỉ XV)',
    question: 'Dưới thời vua Lê Thánh Tông, cả nước được chia thành bao nhiêu đạo thừa tuyên?',
    options: [
      'A. 10 đạo thừa tuyên.',
      'B. 12 đạo thừa tuyên (sau đó là 13 đạo thừa tuyên).',
      'C. 30 tỉnh và 1 phủ Thừa Thiên.',
      'D. 24 lộ, phủ.',
    ],
    correctIndex: 1,
    level: 'nhan_biet',
    explanation: 'Năm 1466, Lê Thánh Tông chia cả nước thành 12 đạo thừa tuyên, đến năm 1471 lập thêm đạo thứ 13 là Quảng Nam. Mỗi đạo có 3 cơ quan độc lập kiềm chế lẫn nhau: Đô ty (quân sự), Thừa ty (hành chính), Hiến ty (thanh tra, tư pháp).',
    optionsAnalysis: [
      'A: SAI - 10 đạo là cách phân chia thời Đinh - Tiền Lê.',
      'B: ĐÚNG - 1466 chia 12 đạo, 1471 thêm đạo Quảng Nam thành 13 đạo thừa tuyên.',
      'C: SAI - 30 tỉnh và 1 phủ Thừa Thiên là cải cách của vua Minh Mạng (1831 - 1832).',
      'D: SAI - Lộ, phủ là đơn vị hành chính thời Lý - Trần.'
    ],
    trapTip: 'Cực kỳ dễ nhầm: Lê Thánh Tông (thế kỉ XV) -> 13 đạo thừa tuyên; Minh Mạng (thế kỉ XIX) -> 30 tỉnh và 1 phủ Thừa Thiên.',
    thayDungAdvice: 'Đừng nhầm lẫn nhé: Lê Thánh Tông là 13 đạo thừa tuyên (thế kỉ XV), còn Minh Mạng là 30 tỉnh và 1 phủ Thừa Thiên (thế kỉ XIX)!',
  },
  {
    id: 'mc-11',
    topicId: 'chu-de-5',
    lessonName: 'Bài 11: Cuộc cải cách của vua Minh Mạng (thế kỉ XIX)',
    question: 'Ý nghĩa lịch sử quan trọng nhất của cuộc cải cách hành chính dưới triều vua Minh Mạng là gì?',
    options: [
      'A. Tách biệt hoàn toàn quyền lập pháp và hành pháp theo mô hình phương Tây.',
      'B. Thống nhất đơn vị hành chính trong cả nước (30 tỉnh và 1 phủ Thừa Thiên), đặt cơ sở cho phân định địa giới hành chính hiện đại.',
      'C. Xóa bỏ chế độ phong kiến và mở đường cho chủ nghĩa tư bản phát triển.',
      'D. Biến nước ta thành cường quốc công nghiệp số một châu Á lúc bấy giờ.',
    ],
    correctIndex: 1,
    level: 'van_dung',
    explanation: 'Cải cách Minh Mạng đã chấm dứt tình trạng cát cứ, phân tán quyền lực ở Bắc Thành và Gia Định Thành, tạo ra sự thống nhất quốc gia cao độ về mặt hành chính từ Bắc chí Nam.',
    optionsAnalysis: [
      'A: SAI - Chế độ quân chủ chuyên chế Minh Mạng tập trung mọi quyền lực tối cao vào tay Hoàng đế.',
      'B: ĐÚNG - Thống nhất đất nước về hành chính, đặt nền móng địa giới các tỉnh Việt Nam ngày nay.',
      'C: SAI - Cải cách nhằm củng cố chế độ phong kiến chuyên chế, không xóa bỏ phong kiến.',
      'D: SAI - Nước ta thời Minh Mạng vẫn là nước nông nghiệp truyền thống, chưa công nghiệp hóa.'
    ],
    trapTip: 'Giá trị trường tồn của cải cách Minh Mạng là tính THỐNG NHẤT HÀNH CHÍNH QUỐC GIA và quy hoạch địa giới tỉnh.',
    thayDungAdvice: 'Nhiều tỉnh thành của Việt Nam ngày nay vẫn giữ tên gọi và ranh giới căn bản được hình thành từ cuộc cải cách Minh Mạng năm 1831 - 1832!',
  },

  // Chủ đề 6
  {
    id: 'mc-12',
    topicId: 'chu-de-6',
    lessonName: 'Bài 13: Lịch sử xác lập và thực thi chủ quyền ở Biển Đông',
    question: 'Tổ chức nào được chính quyền chúa Nguyễn thành lập từ thế kỉ XVII nhằm thực thi chủ quyền tại hai quần đảo Hoàng Sa và Trường Sa?',
    options: [
      'A. Đội Hoàng Sa và Đội Bắc Hải kiêm quản.',
      'B. Ty Thương bạc và Viện Cơ mật.',
      'C. Hải đoàn Áo tơi và Lực lượng Biên phòng.',
      'D. Hạm đội Viễn Đông Đại Nam.',
    ],
    correctIndex: 0,
    level: 'nhan_biet',
    explanation: 'Chúa Nguyễn đã lập ra Đội Hoàng Sa (tuyển mộ dân đinh xã An Vĩnh, huyện Bình Sơn, Quảng Ngãi) và sau đó là Đội Bắc Hải để hàng năm đi thuyền ra Hoàng Sa, Trường Sa đo vẽ, cắm mốc, thu lượm sản vật.',
    optionsAnalysis: [
      'A: ĐÚNG - Đội Hoàng Sa (70 suất) và Đội Bắc Hải kiêm quản được nhà nước phong kiến lập ra từ TK XVII.',
      'B: SAI - Ty Thương bạc quản lý ngoại thương, Viện Cơ mật là cơ quan tư vấn tối cao triều Nguyễn.',
      'C: SAI - Đây là tên hư cấu, không có trong sử sách.',
      'D: SAI - Hạm đội Viễn Đông là tên gọi của lực lượng hải quân phương Tây.'
    ],
    trapTip: 'Nhớ địa danh xuất phát: Làng An Vĩnh, Cù Lao Ré (đảo Lý Sơn, Quảng Ngãi) - cái nôi của những Hùng binh Hoàng Sa.',
    thayDungAdvice: 'Lễ khao lề thế lính Hoàng Sa tại đảo Lý Sơn (Quảng Ngãi) ngày nay chính là di sản văn hóa phi vật thể quốc gia thiêng liêng tri ấn những người lính năm xưa!',
  },
  {
    id: 'mc-13',
    topicId: 'chu-de-6',
    lessonName: 'Bài 12: Vị trí địa lí và tầm quan trọng chiến lược của Biển Đông',
    question: 'Theo Công ước của Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982), vùng đặc quyền kinh tế (EEZ) của quốc gia ven biển có chiều rộng bao nhiêu tính từ đường cơ sở?',
    options: [
      'A. 12 hải lý.',
      'B. 24 hải lý.',
      'C. 200 hải lý.',
      'D. 350 hải lý.',
    ],
    correctIndex: 2,
    level: 'thong_hieu',
    explanation: 'Theo UNCLOS 1982: Lãnh hải rộng 12 hải lý, Vùng tiếp giáp lãnh hải là 24 hải lý, và Vùng đặc quyền kinh tế (EEZ) mở rộng không quá 200 hải lý tính từ đường cơ sở.',
    optionsAnalysis: [
      'A: SAI - 12 hải lý là chiều rộng của LÃNH HẢI (chủ quyền hoàn toàn, đầy đủ).',
      'B: SAI - 24 hải lý tính từ đường cơ sở là ranh giới ngoài của VÙNG TIẾP GIÁP LÃNH HẢI.',
      'C: ĐÚNG - Vùng đặc quyền kinh tế (EEZ) rộng không quá 200 hải lý tính từ đường cơ sở.',
      'D: SAI - 350 hải lý là giới hạn tối đa mở rộng của thềm lục địa trong trường hợp đặc biệt.'
    ],
    trapTip: 'Các con số hải lý then chốt cần khắc sâu: 12 hải lý (Lãnh hải); 24 hải lý (Tiếp giáp); 200 hải lý (Đặc quyền kinh tế).',
    thayDungAdvice: 'Hãy thuộc lòng: 12 hải lý là Lãnh hải (chủ quyền hoàn toàn), 200 hải lý là Đặc quyền kinh tế (quyền chủ quyền về thăm dò, khai thác tài nguyên)!',
  },
  // Bổ sung các câu hỏi chuẩn từ Tài liệu ôn tập cuối kỳ I - 2025 và SGV/SGK
  {
    id: 'mc-14',
    topicId: 'chu-de-2',
    lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
    question: 'Bốn nước cộng hòa Xô viết đầu tiên gia nhập Liên bang Xô viết năm 1922 bao gồm những nước nào?',
    options: [
      'A. Nga, Bê-lô-rút-xi-a, U-crai-na và Ngoại Cáp-ca-dơ.',
      'B. Nga, Ba Lan, U-crai-na và Mông Cổ.',
      'C. Nga, Hung-ga-ri, Tiệp Khắc và Ru-ma-ni.',
      'D. Nga, Ca-dắc-xtan, Ép-xtô-ni-a và Lát-vi-a.',
    ],
    correctIndex: 0,
    level: 'nhan_biet',
    explanation: 'Ngày 30-12-1922, bốn nước cộng hòa Xô viết đầu tiên tự nguyện ký hiệp ước thành lập Liên Xô gồm: CHLB Xô viết Nga, CHXHCN Xô viết Bê-lô-rút-xi-a, CHXHCN Xô viết U-crai-na và CHXHCN Xô viết Liên bang Ngoại Cáp-ca-dơ.',
    optionsAnalysis: [
      'A: ĐÚNG - 4 nước cộng hòa sáng lập Liên Xô năm 1922.',
      'B: SAI - Ba Lan và Mông Cổ không phải nước cộng hòa thuộc Liên Xô.',
      'C: SAI - Hung-ga-ri, Tiệp Khắc là các nước Đông Âu sau CTTG II.',
      'D: SAI - Ca-dắc-xtan, Ép-xtô-ni-a gia nhập vào các giai đoạn sau.'
    ],
    trapTip: 'Ghi nhớ 4 thành viên sáng lập đầu tiên: Nga - Bê-lô-rút-xi-a - U-crai-na - Ngoại Cáp-ca-dơ.',
    thayDungAdvice: 'Nhớ câu viết tắt: Nga - Bê - U - Cáp. Đây là 4 cái tên đặt nền móng cho Liên bang Xô viết năm 1922!',
  },
  {
    id: 'mc-15',
    topicId: 'chu-de-3',
    lessonName: 'Bài 5: Quá trình xâm lược và cai trị của thực dân ở Đông Nam Á',
    question: 'Nguyên nhân chủ yếu giúp Xiêm (Thái Lan) là quốc gia duy nhất ở Đông Nam Á không bị biến thành thuộc địa là gì?',
    options: [
      'A. Do Xiêm có tiềm lực quân sự vượt trội đánh bại liên quân Anh - Pháp.',
      'B. Do thực dân phương Tây không hề có nhu cầu khai thác tài nguyên ở Xiêm.',
      'C. Nhờ chính sách cải cách tiến bộ của Rama V và chính sách ngoại giao khôn khéo tận dụng vị trí "vùng đệm".',
      'D. Do có sự bảo hộ quân sự trực tiếp từ Hợp chúng quốc Hoa Kỳ.',
    ],
    correctIndex: 2,
    level: 'thong_hieu',
    explanation: 'Vua Rama V (Chulalongkorn) đã tiến hành cải cách đất nước toàn diện theo hướng phương Tây, đồng thời thực hiện chính sách ngoại giao mềm dẻo, lợi dụng mâu thuẫn giữa hai đế quốc Anh và Pháp để biến Xiêm thành "vùng đệm" an toàn.',
    optionsAnalysis: [
      'A: SAI - Quân sự Xiêm không thể so sánh với các cường quốc đế quốc phương Tây.',
      'B: SAI - Cả Anh và Pháp đều khao khát thôn tính đất đai màu mỡ của Xiêm.',
      'C: ĐÚNG - Cải cách mở cửa + Ngoại giao cân bằng nước đệm giữa Anh và Pháp.',
      'D: SAI - Thời kỳ này Mỹ chủ yếu can thiệp vào Philippines, không bảo hộ Xiêm.'
    ],
    trapTip: 'Từ khóa quyết định của trường hợp Xiêm: "Cải cách Rama V" + "Vùng đệm ngoại giao giữa Anh và Pháp".',
    thayDungAdvice: 'Xiêm là trường hợp đặc biệt ở Đông Nam Á. Bài học ngoại giao cây tre mềm dẻo nhưng gốc vững chắc bắt nguồn từ tư duy nhìn xa trông rộng của người Xiêm thời đó!',
  },
  {
    id: 'mc-16',
    topicId: 'chu-de-3',
    lessonName: 'Bài 6: Hành trình đi đến độc lập dân tộc ở Đông Nam Á',
    question: 'Điều kiện khách quan thuận lợi nào đã tạo nên "thời cơ vàng" cho nhân dân In-đô-nê-xi-a, Việt Nam và Lào giành độc lập năm 1945?',
    options: [
      'A. Thực dân Pháp và Hà Lan tự nguyện trao trả độc lập hòa bình.',
      'B. Phát xít Nhật tuyên bố đầu hàng Đồng minh vô điều kiện vào giữa tháng 8/1945.',
      'C. Quân đội Đồng minh đã hoàn toàn quét sạch quân phát xít khỏi Đông Nam Á.',
      'D. Liên Hợp Quốc ra nghị quyết yêu cầu các nước đế quốc giải giáp quân đội.',
    ],
    correctIndex: 1,
    level: 'thong_hieu',
    explanation: 'Giữa tháng 8/1945, phát xít Nhật đầu hàng Đồng minh, quân đội Nhật ở Đông Nam Á mất tinh thần chiến đấu, chính quyền bù nhìn tan rã, tạo ra khoảng trống quyền lực thuận lợi cho nhân dân 3 nước đứng lên khởi nghĩa.',
    optionsAnalysis: [
      'A: SAI - Các nước thực dân đều muốn quay lại tái chiếm thuộc địa, không tự nguyện trao trả.',
      'B: ĐÚNG - Sự kiện Nhật đầu hàng Đồng minh (8/1945) là thời cơ khách quan quyết định.',
      'C: SAI - Khởi nghĩa nổ ra trước khi quân Đồng minh kịp kéo vào Đông Nam Á giải giáp quân Nhật.',
      'D: SAI - Thời điểm tháng 8/1945 Liên Hợp Quốc chưa chính thức đi vào hoạt động (đến 24/10/1945).'
    ],
    trapTip: 'Thời cơ chỉ tồn tại trong khoảng thời gian rất ngắn: từ khi Nhật đầu hàng đến trước khi quân Đồng minh đổ bộ!',
    thayDungAdvice: 'Chủ tịch Hồ Chí Minh đã chỉ rõ: "Dù hy sinh tới đâu, dù phải đốt cháy cả dãy Trường Sơn cũng phải kiên quyết giành cho được độc lập!". Đó là nghệ thuật chớp thời cơ vô song!',
  },
  {
    id: 'mc-17',
    topicId: 'chu-de-4',
    lessonName: 'Bài 7: Khái quát về chiến tranh bảo vệ Tổ quốc trong lịch sử Việt Nam',
    question: 'Tư tưởng chỉ đạo tác chiến mang tính chủ động của Lý Thường Kiệt trong cuộc kháng chiến chống Tống (1075 - 1077) được đúc kết qua câu nói nổi tiếng nào?',
    options: [
      'A. "Khoan thư sức dân để làm kế sâu rễ bền gốc".',
      'B. "Ngồi yên đợi giặc không bằng đem quân đánh trước để chặn mũi nhọn của giặc".',
      'C. "Đánh cho để dài tóc, đánh cho để đen răng".',
      'D. "Đem đại nghĩa để thắng hung tàn, lấy chí nhân để thay cường bạo".',
    ],
    correctIndex: 1,
    level: 'nhan_biet',
    explanation: 'Năm 1075, trước âm mưu xâm lược của nhà Tống, Lý Thường Kiệt chủ trương: "Ngồi yên đợi giặc không bằng đem quân đánh trước để chặn mũi nhọn của giặc" (tiên phát chế nhân), bất ngờ tấn công sang căn cứ Ung Châu, Khâm Châu, Liêm Châu rồi rút về phòng ngự sông Như Nguyệt.',
    optionsAnalysis: [
      'A: SAI - Câu nói của Hưng Đạo Đại Vương Trần Quốc Tuấn (1300).',
      'B: ĐÚNG - Kế sách "tiên phát chế nhân" của Lý Thường Kiệt.',
      'C: SAI - Lời hiểu dụ quân sĩ xuất quân của vua Quang Trung - Nguyễn Huệ (1789).',
      'D: SAI - Câu văn bất hủ trong "Bình Ngô đại cáo" của Nguyễn Trãi (1428).'
    ],
    trapTip: 'Phải ghép chính xác danh ngôn lịch sử với từng vị tướng: Lý Thường Kiệt -> "đánh trước chặn mũi nhọn"; Trần Hưng Đạo -> "khoan thư sức dân"; Nguyễn Huệ -> "đánh cho để dài tóc".',
    thayDungAdvice: 'Đừng nhầm các câu nói kinh điển của các danh nhân quân sự em nhé! Lý Thường Kiệt thể hiện tư duy quân sự tiến công chủ động rất tài tình!',
  },
  {
    id: 'mc-18',
    topicId: 'chuyen-de-2',
    lessonName: 'Phần 1: Hai cuộc Chiến tranh thế giới trong thế kỉ XX',
    question: 'Tổ chức quốc tế nào được thành lập năm 1945 với mục tiêu cao nhất là duy trì hòa bình và an ninh thế giới?',
    options: [
      'A. Hội Quốc Liên.',
      'B. Tổ chức Thương mại Thế giới (WTO).',
      'C. Liên Hợp Quốc (UN).',
      'D. Khối Quân sự Bắc Đại Tây Dương (NATO).',
    ],
    correctIndex: 2,
    level: 'nhan_biet',
    explanation: 'Sau Chiến tranh thế giới thứ hai, ngày 24-10-1945, Hiến chương Liên Hợp Quốc chính thức có hiệu lực, đánh dấu sự ra đời của tổ chức Liên Hợp Quốc với tôn chỉ giữ gìn hòa bình, an ninh quốc tế và thúc đẩy hợp tác hữu nghị giữa các quốc gia.',
    optionsAnalysis: [
      'A: SAI - Hội Quốc Liên thành lập năm 1919 sau CTTG I nhưng hoạt động bất lực.',
      'B: SAI - WTO là tổ chức thương mại thành lập năm 1995.',
      'C: ĐÚNG - Liên Hợp Quốc ra đời năm 1945 với 5 nước ủy viên thường trực Hội đồng Bảo an.',
      'D: SAI - NATO là khối quân sự do Mỹ đứng đầu thành lập năm 1949.'
    ],
    trapTip: 'Phân biệt: 1919 (Hội Quốc Liên - sau CTTG I) với 1945 (Liên Hợp Quốc - sau CTTG II).',
    thayDungAdvice: 'Sau bài học xương máu của hai cuộc đại chiến, nhân loại đã cùng nhau xây dựng Liên Hợp Quốc để đối thoại thay vì đối đầu!',
  },
  {
    id: 'mc-19',
    topicId: 'chuyen-de-3',
    lessonName: 'Phần 3: Danh nhân văn hóa, tư tưởng và khoa học',
    question: 'Tư tưởng cốt lõi xuyên suốt trong cuộc đời và sự nghiệp văn chương, chính trị của Danh nhân văn hóa thế giới Nguyễn Trãi là gì?',
    options: [
      'A. Tư tưởng quân phiệt và bành trướng lãnh thổ.',
      'B. Tư tưởng "Nhân nghĩa" gắn liền với yêu nước, thương dân ("Việc nhân nghĩa cốt ở yên dân").',
      'C. Tư tưởng xuất thế lánh đời, bế quan tỏa cảng.',
      'D. Đề cao quyền lực tuyệt đối không giới hạn của Hoàng đế chuyên chế.',
    ],
    correctIndex: 1,
    level: 'thong_hieu',
    explanation: 'Nguyễn Trãi đã kế thừa và nâng tầm tư tưởng nhân nghĩa thành triết lý chính trị vì dân: "Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo trừ bạo". Nhân nghĩa ở Nguyễn Trãi đồng nghĩa với yêu nước, bảo vệ nhân dân và diệt trừ bạo tàn.',
    optionsAnalysis: [
      'A: SAI - Nguyễn Trãi kiên quyết phản đối chiến tranh phi nghĩa tàn bạo.',
      'B: ĐÚNG - Tư tưởng Nhân nghĩa vì dân là linh hồn của Nguyễn Trãi.',
      'C: SAI - Nguyễn Trãi trọn đời đau đáu phụng sự đất nước: "Bui một tấc lòng ưu ái cũ / Đêm ngày cuồn cuộn nước triều đông".',
      'D: SAI - Nguyễn Trãi luôn nhắc nhở vua phải biết lắng nghe lòng dân ("Chở thuyền là dân, lật thuyền cũng là dân").'
    ],
    trapTip: 'Nhớ câu thơ định mệnh của Nguyễn Trãi: "Việc nhân nghĩa cốt ở yên dân". Nhân nghĩa của ông là nhân nghĩa hành động cứu nước!',
    thayDungAdvice: 'Năm 1980, UNESCO đã vinh danh Nguyễn Trãi là Danh nhân văn hóa thế giới nhân kỷ niệm 600 năm ngày sinh của ông!',
  },
];

export const TRUE_FALSE_QUESTIONS: TrueFalseQuestion[] = [
  // Chủ đề 1: Cách mạng tư sản
  {
    id: 'tf-1',
    topicId: 'chu-de-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    title: 'Tư liệu về Tuyên ngôn Độc lập của Hợp chúng quốc Mỹ (1776)',
    passage: `“Chúng tôi khẳng định một chân lý hiển nhiên rằng mọi người sinh ra đều có quyền bình đẳng, tạo hóa đã ban cho họ những quyền tất yếu bất khả xâm phạm, trong đó có quyền được sống, quyền được tự do và quyền mưu cầu hạnh phúc... Để đảm bảo những quyền này, chính quyền được lập ra trong nhân dân và có được quyền lực chính đáng trên cơ sở sự ưng thuận của dân chúng. Bất cứ khi nào một hình thức chính quyền nào phá hoại những mục tiêu này, thì nhân dân có quyền thay đổi hoặc lật đổ chính quyền đó...”`,
    source: 'Trích Tuyên ngôn Độc lập nước Mỹ do Thomas Jefferson soạn thảo, công bố ngày 4-7-1776',
    statements: [
      {
        id: 'a',
        text: 'Đoạn trích khẳng định các quyền tự nhiên thiêng liêng của con người bao gồm quyền sống, quyền tự do và quyền mưu cầu hạnh phúc.',
        isCorrect: true,
        explanation: 'Đúng. Văn bản nêu rõ: "tạo hóa đã ban cho họ những quyền tất yếu bất khả xâm phạm, trong đó có quyền được sống, quyền được tự do và quyền mưu cầu hạnh phúc".',
      },
      {
        id: 'b',
        text: 'Tuyên ngôn khẳng định quyền lực của chính quyền bắt nguồn từ sự thỏa thuận và đồng thuận của nhân dân.',
        isCorrect: true,
        explanation: 'Đúng. Văn bản chỉ rõ chính quyền lập ra dựa trên "sự ưng thuận của dân chúng", phản ánh thuyết khế ước xã hội tiến bộ.',
      },
      {
        id: 'c',
        text: 'Bản Tuyên ngôn Độc lập năm 1776 đã lập tức xóa bỏ hoàn toàn chế độ nô lệ da đen và trao quyền bình đẳng trọn vẹn cho người da đỏ bản địa.',
        isCorrect: false,
        explanation: 'Sai. Đây là hạn chế lớn mang tính giai cấp của bản Tuyên ngôn: vẫn duy trì chế độ nô lệ da đen và không bảo vệ quyền lợi người da đỏ.',
        trapKeywords: ['hoàn toàn', 'lập tức', 'trọn vẹn'],
      },
      {
        id: 'd',
        text: 'Nội dung bản Tuyên ngôn Độc lập của Mỹ đã được Chủ tịch Hồ Chí Minh trích dẫn mở đầu trong bản Tuyên ngôn Độc lập của nước Việt Nam Dân chủ Cộng hòa ngày 2-9-1945.',
        isCorrect: true,
        explanation: 'Đúng. Chủ tịch Hồ Chí Minh đã trích dẫn câu văn bất hủ này trong Tuyên ngôn ngày 2-9-1945 để khẳng định quyền dân tộc bình đẳng thiêng liêng.',
      },
    ],
    trapAlert: 'Chú ý từ bẫy "hoàn toàn", "lập tức" ở ý c. Tuyên ngôn 1776 tiến bộ về mặt tư tưởng nhưng mang tính hạn chế giai cấp tư sản sâu sắc.',
    thayDungAnalysis:
      'Thầy Dũng lưu ý: Đề thi thường gài bẫy ở ý c. Khi đọc tư liệu, em thấy lời lẽ rất tiến bộ về quyền con người, nhưng thực tế lịch sử giai cấp tư sản Mỹ lúc bấy giờ vẫn chưa thủ tiêu nạn buôn bán nô lệ da đen mãi cho tới cuộc Nội chiến 1861-1865!',
  },

  // Chủ đề 4: Kháng chiến chống Mông - Nguyên
  {
    id: 'tf-2',
    topicId: 'chu-de-4',
    lessonName: 'Bài 7: Khái quát các cuộc kháng chiến và khởi nghĩa giành độc lập',
    title: 'Tư liệu về kế sách đánh giặc của Hưng Đạo Đại Vương Trần Quốc Tuấn',
    passage: `“Năm Canh Dần [1300]... vua ngự đến thăm nhà riêng [của Quốc Tuấn] hỏi rằng: ‘Nếu có giặc phương Bắc lại sang thì kế sách như thế nào?’. Quốc Tuấn thưa: ‘Ngày xưa Triệu Vũ dựng nước, vua Hán sai quân sang đánh, nhân dân làm kế thanh dã, đại quân kéo đến Khâm Châu, Liêm Châu đánh úp lại phía sau, đó là một thời... Vừa rồi Toa Đô, Ô Mã Nhi bốn mặt bao vây, vì vua tôi đồng tâm, anh em hòa mục, cả nước góp sức, giặc phải bị bắt, đó là trời giúp... Khoan thư sức dân để làm kế sâu rễ bền gốc, đó là thượng sách giữ nước’.”`,
    source: 'Đại Việt sử ký toàn thư, Tập II, NXB Khoa học Xã hội, Hà Nội, 1998, tr. 77',
    statements: [
      {
        id: 'a',
        text: 'Kế sách "khoan thư sức dân" được Trần Quốc Tuấn coi là thượng sách muôn đời để bảo vệ và dựng xây đất nước.',
        isCorrect: true,
        explanation: 'Đúng. Trần Hưng Đạo khẳng định: "Khoan thư sức dân để làm kế sâu rễ bền gốc, đó là thượng sách giữ nước".',
      },
      {
        id: 'b',
        text: 'Đoạn trích khẳng định sức mạnh đánh tan quân Nguyên của nhà Trần là nhờ triều đình mua được nhiều vũ khí hiện đại từ phương Tây.',
        isCorrect: false,
        explanation: 'Sai. Sức mạnh là do: "vua tôi đồng tâm, anh em hòa mục, cả nước góp sức" (khối đại đoàn kết toàn dân), không phải vũ khí phương Tây.',
      },
      {
        id: 'c',
        text: 'Chiến thuật "thanh dã" (vườn không nhà trống) là một trong những nét đặc sắc trong nghệ thuật quân sự của nhà Trần.',
        isCorrect: true,
        explanation: 'Đúng. Kế sách "làm kế thanh dã" (vườn không nhà trống) khiến quân Mông - Nguyên đông đảo nhưng lâm vào thế thiếu đói, suy kiệt lực lượng.',
      },
      {
        id: 'd',
        text: 'Tư tưởng coi trọng nhân dân của Trần Quốc Tuấn chỉ có ý nghĩa trong thời phong kiến và không còn giá trị trong công cuộc bảo vệ Tổ quốc hôm nay.',
        isCorrect: false,
        explanation: 'Sai. Bài học "dân là gốc", phát huy sức mạnh khối đại đoàn kết toàn dân tộc luôn là nguyên tắc vàng bất biến trong chiến lược bảo vệ Tổ quốc của Đảng và Nhà nước ta.',
      },
    ],
    thayDungAnalysis:
      'Thầy Dũng phân tích: Đây là dạng câu hỏi Đúng - Sai kết hợp khai thác sử liệu và vận dụng liên hệ bài học lịch sử. Câu b và d là hai câu đánh lừa rõ rệt về mặt lập luận lịch sử mà học sinh dễ nhận ra nếu nắm chắc bản chất "lấy dân làm gốc".',
  },

  // Chủ đề 5: Cải cách Hồ Quý Ly
  {
    id: 'tf-3',
    topicId: 'chu-de-5',
    lessonName: 'Bài 9: Cuộc cải cách của Hồ Quý Ly và triều Hồ',
    title: 'Tư liệu về cải cách kinh tế - xã hội của Hồ Quý Ly',
    passage: `“Năm Đinh Sửu [1397], mùa hạ, tháng 6, ban hành lệnh hạn điền: Đại vương và Trưởng công chúa thì ruộng đất không hạn chế; từ thứ dân trở xuống, mỗi người chỉ được giữ tối đa 10 mẫu ruộng... Năm Tân Tỵ [1401], Hồ Hán Thương định hạn nô: quan lại thứ dân tùy theo tước bậc mà có số lượng nô tỳ nhất định, số thừa phải nộp vào nhà nước... Lại kiểm tra hộ khẩu trong cả nước, làm sổ đinh mới, biên cả những người trước đây chạy trốn, trốn thuế vào sổ...”`,
    source: 'Đại Việt sử ký toàn thư, NXB Văn học, Hà Nội, tr. 488-492',
    statements: [
      {
        id: 'a',
        text: 'Chính sách hạn điền của Hồ Quý Ly nhằm mục đích hạn chế sự phát triển của chế độ tư hữu ruộng đất lớn của quý tộc, gia tăng ruộng đất công cho triều đình.',
        isCorrect: true,
        explanation: 'Đúng. Hạn điền đánh trực tiếp vào quyền sở hữu đất đai bạt ngàn của tầng lớp quý tộc Trần nhằm tập trung nguồn lực kinh tế vào tay nhà nước.',
      },
      {
        id: 'b',
        text: 'Chính sách hạn nô và kiểm tra hộ khẩu giúp triều đình nắm chắc nguồn nhân lực phục vụ cho lao dịch, binh dịch và tăng nguồn thu thuế.',
        isCorrect: true,
        explanation: 'Đúng. Việc đăng ký hộ tịch và sung nộp nô tỳ thừa giúp nhà nước tăng cường binh lính và nguồn nộp thuế.',
      },
      {
        id: 'c',
        text: 'Cuộc cải cách của Hồ Quý Ly đã nhận được sự đồng thuận tuyệt đối của mọi tầng lớp xã hội, đặc biệt là tầng lớp quý tộc triều Trần.',
        isCorrect: false,
        explanation: 'Sai. Cải cách xâm phạm trực tiếp quyền lợi của tầng lớp quý tộc tôn thất nhà Trần nên gặp phải sự phản kháng quyết liệt ngầm và công khai.',
      },
      {
        id: 'd',
        text: 'Mặc dù có nhiều điểm tiến bộ nhưng cuộc cải cách chưa đáp ứng đầy đủ nguyện vọng căn bản của quần chúng nhân dân lao động nghèo.',
        isCorrect: true,
        explanation: 'Đúng. Ruộng đất tịch thu phần lớn đưa vào công điền cho thuê chứ không chia không cho nông dân nghèo, khiến triều Hồ bị cô lập khi giặc Minh xâm lược ("Lòng dân không theo").',
      },
    ],
    thayDungAnalysis:
      'Thầy Dũng nhắn nhủ: Hồ Quý Ly là một hiện tượng lịch sử vô cùng thú vị. Hồ Nguyên Trừng (con trai Hồ Quý Ly) từng nói câu đau xót trước quân giặc: "Thần không sợ đánh, chỉ sợ lòng dân không theo". Đây là bài học xương máu cho mọi công cuộc đổi mới!',
  },

  // Chủ đề 6: Chủ quyền Biển Đông
  {
    id: 'tf-4',
    topicId: 'chu-de-6',
    lessonName: 'Bài 13: Lịch sử xác lập và thực thi chủ quyền ở Biển Đông',
    title: 'Tư liệu về Đội Hoàng Sa trong tác phẩm "Phủ biên tạp lục" của Lê Quý Đôn',
    passage: `“Phủ Quảng Ngãi, huyện Bình Sơn có xã An Vĩnh, ở bờ biển, ngoài biển về phía đông bắc có nhiều cù lao, các núi linh tinh hơn 130 ngọn... Bãi Cát Vàng (Hoàng Sa) ước chừng dài hơn 30 dặm, bằng phẳng rộng lớn... Trước họ Nguyễn đặt đội Hoàng Sa 70 suất, lấy người xã An Vĩnh sung vào, cắt phiên mỗi năm cứ tháng hai nhận giấy sai đi, mang lương đủ 6 tháng, đi bằng 5 chiếc thuyền câu nhỏ, ra biển 3 ngày 3 đêm thì đến... Lượm được hải vật, đến tháng 8 thì về, vào cửa Eo nộp ở kinh sư...”`,
    source: 'Lê Quý Đôn, Phủ biên tạp lục (soạn năm 1776), NXB Khoa học Xã hội, Hà Nội, 1977',
    statements: [
      {
        id: 'a',
        text: 'Đoạn trích trong "Phủ biên tạp lục" chứng minh chính quyền chúa Nguyễn đã tổ chức quản lý, thực thi chủ quyền liên tục và có tổ chức đối với quần đảo Hoàng Sa.',
        isCorrect: true,
        explanation: 'Đúng. Nhà nước cắt phiên hàng năm, ban giấy lệnh, tuyển lính, quy định chế độ lương bổng và nộp sản vật lên kinh sư rõ ràng.',
      },
      {
        id: 'b',
        text: 'Đội Hoàng Sa gồm 70 suất lính được lấy nòng cốt từ những người dân sinh sống tại xã An Vĩnh, huyện Bình Sơn (nay thuộc tỉnh Quảng Ngãi).',
        isCorrect: true,
        explanation: 'Đúng. Văn bản nêu rõ: "Trước họ Nguyễn đặt đội Hoàng Sa 70 suất, lấy người xã An Vĩnh sung vào".',
      },
      {
        id: 'c',
        text: 'Hoạt động của Đội Hoàng Sa chỉ mang tính tự phát của ngư dân ven biển chứ chưa có bất kỳ sự can thiệp hay chứng nhận nào từ nhà nước phong kiến.',
        isCorrect: false,
        explanation: 'Sai. Đây là hành vi mang tính công quyền nhà nước: "nhận giấy sai đi", sản vật thu lượm "nộp ở kinh sư", có kiểm duyệt của triều đình.',
      },
      {
        id: 'd',
        text: 'Tư liệu lịch sử này là chứng cứ hùng hồn khẳng định Việt Nam là quốc gia đầu tiên xác lập chủ quyền hòa bình, liên tục và hợp pháp ở Hoàng Sa phù hợp với luật pháp quốc tế.',
        isCorrect: true,
        explanation: 'Đúng. Theo nguyên tắc thụ đắc lãnh thổ của luật pháp quốc tế (chiếm hữu thực sự, hòa bình, liên tục dưới danh nghĩa nhà nước), đây là bằng chứng có giá trị pháp lý quốc tế đặc biệt cao.',
      },
    ],
    thayDungAnalysis:
      'Thầy Dũng nhấn mạnh: Câu hỏi về Hoàng Sa - Trường Sa luôn là trọng tâm thi tốt nghiệp THPT. Chú ý từ khóa: "Công quyền", "Nhà nước tổ chức", "Liên tục", "Hòa bình". Phủ biên tạp lục của bác học Lê Quý Đôn là một trong những sử liệu đắt giá nhất!',
  },

  // Chủ đề 2: Thành lập Liên bang Xô viết (Tài liệu Ôn tập Cuối kỳ I - 2025)
  {
    id: 'tf-5',
    topicId: 'chu-de-2',
    lessonName: 'Bài 3: Sự hình thành Liên bang CHXHCN Xô viết',
    title: 'Tư liệu về nguyên tắc thành lập Liên bang Xô viết năm 1922',
    passage: `“Đại hội đại biểu các Xô viết toàn Nga lần thứ nhất họp ngày 30-12-1922 tại Mát-xcơ-va đã thông qua bản Tuyên ngôn và Hiệp ước thành lập Liên bang Cộng hòa xã hội chủ nghĩa Xô viết... Bản Tuyên ngôn nêu rõ sự cần thiết phải hợp nhất các nước cộng hòa Xô viết lại thành một liên bang thống nhất để bảo đảm an ninh, xây dựng chủ nghĩa xã hội và phát triển kinh tế... Các nước cộng hòa Xô viết bình đẳng về mọi mặt, có quyền tự do phân lập (tách khỏi liên bang) nếu muốn.”`,
    source: 'Lịch sử Liên Xô, NXB Chính trị quốc gia, Hà Nội; SGK Lịch sử 11 Kết nối tri thức',
    statements: [
      {
        id: 'a',
        text: 'Liên bang Xô viết được thành lập dựa trên sự tự nguyện tham gia và quyền tự quyết của các dân tộc.',
        isCorrect: true,
        explanation: 'Đúng. Nguyên tắc cốt lõi của Lênin là tự nguyện, bình đẳng và tôn trọng quyền tự quyết của các nước cộng hòa.',
      },
      {
        id: 'b',
        text: 'Nước Nga Xô viết có quyền áp đặt tối cao và tước bỏ quyền phân lập của các nước cộng hòa thành viên.',
        isCorrect: false,
        explanation: 'Sai. Bản Hiệp ước quy định rõ các nước cộng hòa bình đẳng về mọi mặt và có quyền tự do phân lập nếu muốn.',
        trapKeywords: ['áp đặt tối cao', 'tước bỏ'],
      },
      {
        id: 'c',
        text: 'Sự ra đời của Liên bang Xô viết đã tạo ra sức mạnh tổng hợp to lớn giúp nhân dân các dân tộc vượt qua bao vây cấm vận và chiến thắng chủ nghĩa phát xít.',
        isCorrect: true,
        explanation: 'Đúng. Nhờ sức mạnh liên bang đoàn kết, Liên Xô đã công nghiệp hóa thành công và đóng vai trò trụ cột tiêu diệt phát xít Đức trong CTTG II.',
      },
      {
        id: 'd',
        text: 'Ngay khi vừa thành lập năm 1922, Liên bang Xô viết đã bao gồm toàn bộ 15 nước cộng hòa như thời điểm năm 1991.',
        isCorrect: false,
        explanation: 'Sai. Ban đầu năm 1922 chỉ có 4 nước cộng hòa đầu tiên (Nga, Bê-lô-rút-xi-a, U-crai-na, Ngoại Cáp-ca-dơ); sau này mới mở rộng lên 15 nước.',
        trapKeywords: ['ngay khi vừa thành lập', 'toàn bộ 15 nước'],
      },
    ],
    trapAlert: 'Bẫy thời gian và số lượng thành viên ở ý d: Năm 1922 chỉ có 4 nước, đến trước năm 1991 mới có 15 nước cộng hòa!',
    thayDungAnalysis:
      'Thầy Dũng lưu ý: Câu hỏi về Liên bang Xô viết hay gài bẫy số lượng thành viên sáng lập (4 nước năm 1922) và nguyên tắc bình đẳng tự nguyện của Lênin. Ý b và d là các bẫy thường gặp trong đề thi chuẩn GDPT 2018.',
  },

  // Chủ đề 3: Độc lập Đông Nam Á 1945 (Tài liệu Ôn tập Cuối kỳ I - 2025)
  {
    id: 'tf-6',
    topicId: 'chu-de-3',
    lessonName: 'Bài 6: Hành trình đi đến độc lập dân tộc ở Đông Nam Á',
    title: 'Tư liệu về Tuyên ngôn Độc lập của In-đô-nê-xi-a (17-8-1945)',
    passage: `“Chúng tôi, nhân dân In-đô-nê-xi-a, qua văn kiện này tuyên bố nền độc lập của In-đô-nê-xi-a. Những vấn đề liên quan đến việc chuyển giao quyền lực và các công việc khác sẽ được thực hiện một cách cẩn trọng và trong thời gian ngắn nhất có thể.”`,
    source: 'Gia-các-ta, ngày 17 tháng 8 năm 1945, Thay mặt nhân dân In-đô-nê-xi-a: Xu-các-nô - Hát-ta',
    statements: [
      {
        id: 'a',
        text: 'In-đô-nê-xi-a là quốc gia đầu tiên ở khu vực Đông Nam Á tuyên bố độc lập trong năm 1945.',
        isCorrect: true,
        explanation: 'Đúng. In-đô-nê-xi-a tuyên bố độc lập ngày 17-8-1945, trước Việt Nam (2-9) và Lào (12-10).',
      },
      {
        id: 'b',
        text: 'Nền độc lập của In-đô-nê-xi-a được trao trả hoàn toàn thông qua sự hào phóng và thiện chí của thực dân Hà Lan.',
        isCorrect: false,
        explanation: 'Sai. Sau khi tuyên bố độc lập, nhân dân In-đô-nê-xi-a phải trải qua cuộc kháng chiến vũ trang kiên cường chống thực dân Hà Lan quay lại xâm lược cho đến năm 1949 mới buộc Hà Lan công nhận.',
        trapKeywords: ['trao trả hoàn toàn', 'hào phóng thiện chí'],
      },
      {
        id: 'c',
        text: 'Bản tuyên ngôn thể hiện ý chí quật cường của nhân dân In-đô-nê-xi-a khi chớp đúng thời cơ phát xít Nhật đầu hàng Đồng minh.',
        isCorrect: true,
        explanation: 'Đúng. Các nhà yêu nước In-đô-nê-xi-a đã chớp lấy khoảng trống quyền lực khi Nhật đầu hàng để tuyên bố độc lập.',
      },
      {
        id: 'd',
        text: 'Thắng lợi của phong trào giải phóng dân tộc ở Đông Nam Á năm 1945 đã lập tức chấm dứt hoàn toàn sự hiện diện của mọi thế lực thực dân phương Tây tại khu vực.',
        isCorrect: false,
        explanation: 'Sai. Các nước thực dân Pháp, Anh, Hà Lan tiếp tục quay lại xâm lược; các dân tộc phải chiến đấu bền bỉ nhiều thập kỷ sau đó mới giải phóng hoàn toàn.',
        trapKeywords: ['lập tức chấm dứt hoàn toàn'],
      },
    ],
    trapAlert: 'Ý b và d chứa từ tuyệt đối hóa "hoàn toàn", "hào phóng", "lập tức chấm dứt". Đây là các bẫy điển hình!',
    thayDungAnalysis:
      'Thầy Dũng nhắn nhủ: Lịch sử Đông Nam Á sau năm 1945 không phải là một con đường trải đầy hoa hồng. Thực dân phương Tây không hề tự nguyện rút lui mà nhân dân các nước đã phải tiếp tục đổ bao máu xương để bảo vệ thành quả độc lập!',
  },

  // Chủ đề 4: Nghệ thuật quân sự Lam Sơn (Tài liệu Ôn tập Cuối kỳ I - 2025)
  {
    id: 'tf-7',
    topicId: 'chu-de-4',
    lessonName: 'Bài 7 & 8: Khởi nghĩa Lam Sơn và nghệ thuật quân sự',
    title: 'Tư liệu về tư tưởng nhân nghĩa và mưu lược quân sự trong "Bình Ngô đại cáo"',
    passage: `“Đem đại nghĩa để thắng hung tàn,
Lấy chí nhân để thay cường bạo...
Đánh một trận, sạch không kình ngạc,
Đánh hai trận, tan tác chim muông...
Họ đã tham sống sợ chết mà hòa hiếu thực lòng,
Ta lấy toàn quân là hơn, để nhân dân nghỉ sức...
Chẳng những dập tắt ngọn lửa chiến tranh,
Mà còn mở nền thái bình muôn thuở.”`,
    source: 'Nguyễn Trãi, Bình Ngô đại cáo (1428)',
    statements: [
      {
        id: 'a',
        text: 'Tư tưởng "nhân nghĩa", "lấy chí nhân thay cường bạo" là nền tảng tư tưởng nhân văn cao đẹp của khởi nghĩa Lam Sơn.',
        isCorrect: true,
        explanation: 'Đúng. Nguyễn Trãi khẳng định chiến tranh chính nghĩa lấy lòng nhân nghĩa vì dân làm trọng.',
      },
      {
        id: 'b',
        text: 'Mục đích tối cao của nghĩa quân Lam Sơn là tiêu diệt đến người lính giặc cuối cùng và tàn sát tù binh để trả thù.',
        isCorrect: false,
        explanation: 'Sai. Nghĩa quân Lam Sơn mở đường hòa hiếu, cấp ngựa cho Vương Thông, cấp thuyền cho Mã Anh về nước: "Ta lấy toàn quân là hơn, để nhân dân nghỉ sức".',
        trapKeywords: ['tiêu diệt đến người lính cuối cùng', 'tàn sát tù binh'],
      },
      {
        id: 'c',
        text: 'Nghệ thuật quân sự Lam Sơn kết hợp nhuần nhuyễn giữa tiến công quân sự tiêu diệt viện binh với đấu tranh binh vận và ngoại giao.',
        isCorrect: true,
        explanation: 'Đúng. Trận Chi Lăng - Xương Giang tiêu diệt viện binh Liễu Thăng, sau đó dùng đòn "tâm công" bức hàng thành Đông Quan trong hòa bình.',
      },
      {
        id: 'd',
        text: 'Tư tưởng hòa hiếu kết thúc chiến tranh của Lê Lợi và Nguyễn Trãi thể hiện sự mềm yếu, nhượng bộ trước quân xâm lược.',
        isCorrect: false,
        explanation: 'Sai. Đây là tầm nhìn chiến lược sâu sắc, thể hiện tinh thần nhân đạo cao cả và giữ gìn hòa hiếu lâu dài cho hai dân tộc, không phải mềm yếu nhượng bộ.',
      },
    ],
    thayDungAnalysis:
      'Thầy Dũng phân tích: Điểm sáng chói nhất trong nghệ thuật quân sự Lam Sơn là "Đánh vào lòng người" (tâm công) và kết thúc chiến tranh bằng hòa hiếu. Cấp ngựa, cấp thuyền cho giặc về nước là đỉnh cao văn hiến Đại Việt!',
  },
];

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 'essay-1',
    topicId: 'chu-de-4',
    lessonName: 'Bài 8: Một số bài học lịch sử rút ra từ các cuộc kháng chiến',
    title: 'Phân tích bài học "Đại đoàn kết toàn dân tộc" trong lịch sử giữ nước và liên hệ thế hệ trẻ',
    question:
      'Từ thắng lợi của các cuộc kháng chiến bảo vệ Tổ quốc trong lịch sử dân tộc (trước năm 1945), em hãy:\n1. Phân tích bài học lịch sử về "Khối đại đoàn kết toàn dân tộc".\n2. Rút ra ý nghĩa của bài học này đối với công cuộc xây dựng và bảo vệ Tổ quốc hiện nay.\n3. Trách nhiệm của bản thân một học sinh THPT đối với việc gìn giữ và phát huy truyền thống đó.',
    guidance: [
      'Nêu bật vai trò quyết định của nhân dân ("Dân là gốc", vua tôi đồng tâm, anh em hòa mục).',
      'Dẫn chứng các triều đại tiêu biểu: Hội nghị Diên Hồng (nhà Trần), Bình Ngô đại cáo (Lam Sơn: "Manh lệ chi đồ tứ phương bôn tẩu"), vua Quang Trung tập hợp sĩ phu và muôn dân.',
      'Ý nghĩa hiện tại: Đoàn kết toàn dân tộc, kết hợp sức mạnh dân tộc với sức mạnh thời đại để giữ vững chủ quyền biển đảo, phát triển kinh tế.',
      'Liên hệ bản thân: Học tập chăm chỉ, rèn luyện đạo đức, không chia rẽ vùng miền, tích cực tuyên truyền bảo vệ chủ quyền biên cương hải đảo.',
    ],
    modelAnswer: `1. Phân tích bài học "Khối đại đoàn kết toàn dân tộc":
Trong suốt chiều dài hàng ngàn năm dựng nước và giữ nước, dân tộc Việt Nam luôn phải đối mặt với những đế chế xâm lược hùng mạnh bậc nhất. Nhân tố quyết định thắng lợi của mọi cuộc kháng chiến chính là khối đại đoàn kết toàn dân tộc.
- Thời nhà Trần: Ba lần đánh tan quân Mông - Nguyên nhờ "Vua tôi đồng tâm, anh em hòa mục, cả nước góp sức" (Trần Hưng Đạo). Hình ảnh các bô lão đồng thanh hô vang "Đánh!" tại Hội nghị Diên Hồng là biểu tượng chói lọi của sức mạnh đại đoàn kết dân tộc.
- Khởi nghĩa Lam Sơn: Lê Lợi và Nguyễn Trãi đã vận động toàn dân khởi nghĩa: "Tướng sĩ một lòng phụ tử, hòa nước sông chén rượu ngọt ngào", quy tụ mọi tầng lớp từ quý tộc đến dân nghèo đánh đuổi giặc Minh.
- Phong trào Tây Sơn: Nguyễn Huệ đã giương cao ngọn cờ dân tộc, tập hợp nông dân, sĩ phu Bắc Hà giải phóng Thăng Long trong mùa xuân Kỷ Dậu 1789.

2. Ý nghĩa bài học đối với công cuộc xây dựng và bảo vệ Tổ quốc hiện nay:
- Đại đoàn kết toàn dân tộc là đường lối chiến lược cách mạng xuyên suốt của Đảng ta: "Đoàn kết, đoàn kết, đại đoàn kết; Thành công, thành công, đại thành công".
- Trong bối cảnh đất nước hội nhập quốc tế sâu rộng và tình hình an ninh biển đảo phức tạp, đại đoàn kết là nguồn lực nội sinh vô tận giúp vượt qua mọi khó khăn thử thách, giữ vững độc lập, chủ quyền toàn vẹn lãnh thổ.

3. Trách nhiệm của học sinh THPT:
- Nỗ lực học tập, nâng cao tri thức khoa học và hiểu biết lịch sử, có bản lĩnh chính trị vững vàng.
- Nêu cao tinh thần đoàn kết, tương thân tương ái, nói không với bạo lực học đường và tư tưởng kì thị vùng miền.
- Sử dụng mạng xã hội thông minh, cảnh giác trước các luận điệu xuyên tạc, chia rẽ khối đại đoàn kết dân tộc; tích cực lan tỏa hình ảnh đẹp về đất nước, con người Việt Nam.`,
    rubricCriteria: [
      { criterion: 'Mở bài & Xác định chuẩn xác vấn đề bài học đại đoàn kết', maxScore: 1.5 },
      { criterion: 'Phân tích kiến thức lịch sử chính xác, dẫn chứng tiêu biểu (Trần, Lê, Tây Sơn)', maxScore: 4.0 },
      { criterion: 'Khái quát ý nghĩa thực tiễn đối với đất nước trong giai đoạn hiện nay', maxScore: 2.5 },
      { criterion: 'Liên hệ trách nhiệm bản thân thực tế, sâu sắc, hành văn truyền cảm', maxScore: 2.0 },
    ],
  },
  {
    id: 'essay-2',
    topicId: 'chu-de-5',
    lessonName: 'Bài 10: Cuộc cải cách của Lê Thánh Tông (thế kỉ XV)',
    title: 'Đánh giá cuộc cải cách của vua Lê Thánh Tông và bài học cho cải cách hành chính ngày nay',
    question:
      'Trình bày những nội dung cải cách cơ bản trên lĩnh vực hành chính và pháp luật của vua Lê Thánh Tông ở thế kỉ XV. Từ đó, em hãy rút ra những bài học kinh nghiệm có giá trị đối với công cuộc cải cách thủ tục hành chính và xây dựng Nhà nước pháp quyền ở Việt Nam hiện nay.',
    guidance: [
      'Nội dung hành chính: Bãi bỏ các chức vụ quyền lực trung gian, chia cả nước thành 13 đạo thừa tuyên; ở mỗi đạo lập Tam ty kiểm soát lẫn nhau.',
      'Nội dung luật pháp: Ban hành bộ Quốc triều hình luật (Luật Hồng Đức) - bộ luật tiến bộ, bảo vệ quyền lợi người phụ nữ và sự ổn định của nhà nước.',
      'Bài học kinh nghiệm: Tinh gọn bộ máy, phân định rõ thẩm quyền trách nhiệm, kiểm soát quyền lực, đề cao tính thượng tôn pháp luật.',
    ],
    modelAnswer: `1. Nội dung cải cách của vua Lê Thánh Tông:
- Về tổ chức bộ máy hành chính:
  + Ở trung ương: Vua bãi bỏ các chức quan đại thần lộng quyền (Tướng quốc, Đại tư mã), vua trực tiếp chỉ đạo Lục bộ (Lại, Hộ, Lễ, Binh, Hình, Công). Thành lập Lục tự, Lục khoa để giám sát lẫn nhau.
  + Ở địa phương: Năm 1471, vua chia cả nước thành 13 đạo thừa tuyên. Tại mỗi đạo, đặt "Tam ty" gồm Đô ty (quân sự), Thừa ty (hành chính) và Hiến ty (tư pháp, thanh tra) ngang quyền nhau, kiềm chế và bổ trợ lẫn nhau dưới quyền giám sát của triều đình.
- Về luật pháp:
  + Ban hành bộ "Quốc triều hình luật" (Luật Hồng Đức) gồm 722 điều - đỉnh cao thành tựu pháp lý phong kiến Việt Nam.
  + Điểm tiến bộ đặc sắc: Luật bảo vệ chủ quyền quốc gia, quyền lợi của người phụ nữ (quyền thừa kế hương hỏa), khuyến khích phát triển sản xuất.

2. Bài học kinh nghiệm đối với cải cách hành chính và xây dựng Nhà nước pháp quyền hiện nay:
- Tinh gọn bộ máy, tránh chồng chéo chức năng, giảm tầng nấc trung gian, nâng cao hiệu lực hiệu quả quản trị.
- Cơ chế kiểm soát quyền lực: Quyền lực phải được ràng buộc bởi trách nhiệm, tăng cường thanh tra giám sát để phòng ngừa tham nhũng, quan liêu.
- Thượng tôn pháp luật: Xây dựng hệ thống pháp luật đồng bộ, minh bạch, công bằng và nhân văn; lấy con người làm trung tâm của sự phát triển.`,
    rubricCriteria: [
      { criterion: 'Trình bày trọn vẹn cải cách bộ máy hành chính trung ương và địa phương', maxScore: 3.5 },
      { criterion: 'Phân tích được ý nghĩa, giá trị tiến bộ của Quốc triều hình luật', maxScore: 2.5 },
      { criterion: 'Rút ra bài học tinh gọn bộ máy và kiểm soát quyền lực sâu sắc', maxScore: 2.5 },
      { criterion: 'Kỹ năng lập luận, so sánh và liên hệ thực tế nhà nước pháp quyền hiện nay', maxScore: 1.5 },
    ],
  },
  {
    id: 'essay-3',
    topicId: 'chu-de-6',
    lessonName: 'Bài 13: Lịch sử xác lập và thực thi chủ quyền ở Biển Đông',
    title: 'Chứng cứ lịch sử khẳng định chủ quyền của Việt Nam đối với quần đảo Hoàng Sa và Trường Sa',
    question:
      'Dựa trên các tư liệu lịch sử đã học trong chương trình Lịch sử 11 GDPT 2018, em hãy:\n1. Chứng minh Nhà nước Việt Nam qua các thời kỳ lịch sử đã xác lập và thực thi chủ quyền đối với quần đảo Hoàng Sa và Trường Sa một cách hòa bình, liên tục, phù hợp với luật pháp quốc tế.\n2. Nêu các văn bản pháp lý quốc tế và trong nước hiện nay đang là cơ sở bảo vệ chủ quyền biển đảo của Việt Nam.\n3. Là một công dân trẻ, em cần làm gì để góp phần bảo vệ chủ quyền biển đảo thiêng liêng của Tổ quốc?',
    guidance: [
      'Chứng cứ thời chúa Nguyễn (thế kỉ XVII - XVIII): Đội Hoàng Sa, Bắc Hải, ghi chép trong Phủ biên tạp lục của Lê Quý Đôn, Toản tập Thiên Nam tứ chí lộ đồ thư.',
      'Chứng cứ thời Tây Sơn & triều Nguyễn (thế kỉ XIX): Vua Gia Long sai lính ra cắm mốc, Minh Mạng cho xây chùa lập bia, Đại Nam thực lục, Châu bản, Mộc bản triều Nguyễn.',
      'Cơ sở pháp lý: UNCLOS 1982, Tuyên bố DOC 2002, Luật Biển Việt Nam năm 2012.',
      'Hành động thiết thực của học sinh: Tìm hiểu chủ quyền, lan tỏa thông điệp hòa bình, học tập tốt để dựng xây đất nước.',
    ],
    modelAnswer: `1. Quá trình xác lập và thực thi chủ quyền hòa bình, liên tục qua các thời kỳ:
- Thời các chúa Nguyễn (thế kỉ XVII - XVIII):
  + Thành lập Đội Hoàng Sa và Đội Bắc Hải kiêm quản từ thế kỉ XVII, hàng năm dong thuyền ra khai thác hải vật, đo vẽ hải trình.
  + Các thư tịch cổ: "Toản tập Thiên Nam tứ chí lộ đồ thư" (Đỗ Bá soạn năm 1686), "Phủ biên tạp lục" (Lê Quý Đôn soạn năm 1776) đều ghi nhận Hoàng Sa và Trường Sa thuộc lãnh thổ Đại Việt.
- Thời nhà Tây Sơn và triều Nguyễn (thế kỉ XVIII - XIX):
  + Nhà Tây Sơn duy trì các đội Hoàng Sa.
  + Năm 1816, vua Gia Long chính thức cử thủy quân ra Hoàng Sa cắm cờ và tuyên bố chủ quyền.
  + Vua Minh Mạng đẩy mạnh công tác đo đạc thủy trình, vẽ bản đồ, dựng bia chủ quyền, trồng cây, xây dựng miếu thờ tại Hoàng Sa (ghi chép tỉ mỉ trong Đại Nam thực lục, Châu bản và Mộc bản triều Nguyễn - di sản tư liệu thế giới).
  + Năm 1838, "Đại Nam nhất thống toàn đồ" thể hiện rõ ràng Hoàng Sa, Vạn lý Trường Sa nằm trong cương giới lãnh thổ Đại Nam.

2. Cơ sở pháp lý bảo vệ chủ quyền hiện nay:
- Pháp lý quốc tế: Công ước của Liên Hợp Quốc về Luật Biển năm 1982 (UNCLOS 1982) khẳng định quyền và lợi ích hợp pháp của các quốc gia ven biển; Tuyên bố về cách ứng xử của các bên ở Biển Đông (DOC 2002) và tiến tới COC.
- Pháp lý trong nước: Luật Biển Việt Nam năm 2012 quy định rõ ranh giới các vùng biển, đảo, khẳng định chủ quyền không thể chối cãi của Việt Nam đối với Hoàng Sa và Trường Sa.

3. Trách nhiệm của học sinh:
- Tích cực học tập, nghiên cứu và nắm vững chứng cứ lịch sử, pháp lý khẳng định chủ quyền của đất nước.
- Tham gia các cuộc thi, phong trào hướng về biển đảo quê hương (như phong trào "Vì biển đảo quê hương - Vì tuyến đầu Tổ quốc").
- Tỉnh táo trước các thông tin sai lệch, luận điệu kích động trên mạng xã hội; dùng kiến thức và ngoại ngữ để truyền thông điệp chính nghĩa của Việt Nam ra bạn bè quốc tế.`,
    rubricCriteria: [
      { criterion: 'Trình bày đầy đủ chứng cứ lịch sử thời chúa Nguyễn và triều Nguyễn', maxScore: 4.0 },
      { criterion: 'Nêu chính xác các văn bản pháp lý (UNCLOS 1982, Luật Biển VN 2012)', maxScore: 2.5 },
      { criterion: 'Phân tích tính pháp lý: Hòa bình, liên tục, danh nghĩa nhà nước', maxScore: 2.0 },
      { criterion: 'Liên hệ hành động trách nhiệm thiết thực của công dân trẻ', maxScore: 1.5 },
    ],
  },
  // Câu tự luận mới từ Tài liệu Ôn tập Cuối kỳ I - 2025
  {
    id: 'essay-4',
    topicId: 'chu-de-1',
    lessonName: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    title: 'So sánh mức độ triệt để giữa Cách mạng tư sản Anh (1640) và Đại Cách mạng tư sản Pháp (1789)',
    question:
      'Dựa trên kiến thức đã học trong SGK Lịch sử 11 Kết nối tri thức, em hãy:\n1. Lập bảng so sánh Cách mạng tư sản Anh (thế kỉ XVII) và Đại Cách mạng tư sản Pháp (thế kỉ XVIII) về: giai cấp lãnh đạo, nhiệm vụ dân tộc - dân chủ, thể chế chính trị thiết lập, và mức độ giải quyết vấn đề ruộng đất cho nông dân.\n2. Vì sao Đại Cách mạng tư sản Pháp được đánh giá là cuộc cách mạng tư sản triệt để nhất thời cận đại?',
    guidance: [
      'Giai cấp lãnh đạo: Anh (tư sản liên minh quý tộc mới); Pháp (giai cấp tư sản).',
      'Nhiệm vụ: Anh chủ yếu lật đổ chế độ phong kiến chuyên chế, thiết lập quân chủ lập hiến; Pháp xóa bỏ triệt để chế độ đẳng cấp phong kiến, thiết lập nền cộng hòa.',
      'Ruộng đất: Anh chưa chia ruộng đất cho nông dân nghèo; Pháp (thời Gia-cô-banh) tịch thu đất quý tộc chia nhỏ bán trả góp trong 10 năm cho nông dân.',
      'Lý giải tính triệt để của Pháp: Đập tan hoàn toàn chế độ phong kiến, giải quyết vấn đề ruộng đất, ban hành Tuyên ngôn Nhân quyền và Dân quyền có tầm ảnh hưởng toàn cầu.',
    ],
    modelAnswer: `1. So sánh CMTS Anh và Đại CMTS Pháp:
- Về giai cấp lãnh đạo:
  + Anh: Tư sản liên minh chặt chẽ với tầng lớp Quý tộc mới.
  + Pháp: Giai cấp Tư sản đóng vai trò lãnh đạo độc lập (qua các phái Lập hiến, Gi-rông-đanh, Gia-cô-banh).
- Về thể chế chính trị thiết lập:
  + Anh: Chế độ Quân chủ lập hiến (vẫn giữ ngôi vua, quyền lực thực tế thuộc Nghị viện).
  + Pháp: Thiết lập nền Cộng hòa dân chủ tư sản, xử chém vua Lu-i XVI phản quốc.
- Về việc giải quyết vấn đề ruộng đất cho nông dân:
  + Anh: Không triệt để, quyền sở hữu ruộng đất rơi vào tay địa chủ và quý tộc mới, nông dân bị tước đoạt đất đai (phong trào rào đất cướp ruộng).
  + Pháp: Giải quyết triệt để nhất, chính quyền Gia-cô-banh ban hành sắc lệnh chia nhỏ đất đai phong kiến bán trả góp cho nông dân nghèo và xóa bỏ mọi đặc quyền phong kiến mà không phải bồi thường.

2. Lý giải vì sao Đại Cách mạng tư sản Pháp là cuộc cách mạng triệt để nhất thời cận đại:
- Đã lật đổ hoàn toàn và xóa sạch mọi tàn tích của chế độ phong kiến chuyên chế hàng nghìn năm, xóa bỏ chế độ đẳng cấp áp bức.
- Giải quyết được nguyện vọng sống còn của động lực cách mạng đông đảo nhất là nông dân (vấn đề ruộng đất).
- Ban hành bản "Tuyên ngôn Nhân quyền và Dân quyền" (1789) với khẩu hiệu bất hủ "Tự do - Bình đẳng - Bác ái", mở đường cho CNTB phát triển vượt bậc và làm rung chuyển tận gốc rễ trật tự phong kiến khắp lục địa châu Âu.`,
    rubricCriteria: [
      { criterion: 'Lập bảng hoặc so sánh đầy đủ 4 tiêu chí rõ ràng, chính xác', maxScore: 4.5 },
      { criterion: 'Phân tích sâu sắc bản chất vấn đề ruộng đất và thể chế chính trị', maxScore: 2.5 },
      { criterion: 'Lý giải thuyết phục tính triệt để của cách mạng Pháp', maxScore: 2.0 },
      { criterion: 'Bố cục mạch lạc, chuẩn thuật ngữ lịch sử', maxScore: 1.0 },
    ],
  },
  {
    id: 'essay-5',
    topicId: 'chu-de-3',
    lessonName: 'Bài 6: Hành trình đi đến độc lập dân tộc ở Đông Nam Á',
    title: 'Nghệ thuật chớp thời cơ trong Cách mạng tháng Tám năm 1945 và bài học cho thanh niên kỷ nguyên số',
    question:
      'Phân tích nghệ thuật "chớp thời cơ" của Đảng Cộng sản Đông Dương và Chủ tịch Hồ Chí Minh trong Cách mạng tháng Tám năm 1945. Từ bài học lịch sử quý báu đó, em hãy rút ra ý nghĩa đối với thanh niên Việt Nam trong việc chủ động nắm bắt cơ hội phát triển bản thân và cống hiến cho đất nước trong kỷ nguyên số.',
    guidance: [
      'Phân tích hoàn cảnh thời cơ: Thời cơ xuất hiện khi Nhật đầu hàng (15/8/1945) và sẽ kết thúc khi quân Đồng minh kéo vào (đầu tháng 9/1945).',
      'Nghệ thuật chớp thời cơ: Chuẩn bị chu đáo lực lượng chính trị, vũ trang từ trước (Mặt trận Việt Minh, căn cứ địa, Đội Việt Nam Tuyên truyền Giải phóng quân), ra lệnh Tổng khởi nghĩa kịp thời "Dù hy sinh tới đâu... cũng phải giành cho được độc lập".',
      'Liên hệ thanh niên kỷ nguyên số: Thời cơ của cuộc CMCN 4.0; rèn luyện tri thức, kỹ năng mềm, làm chủ công nghệ, chủ động hội nhập.',
    ],
    modelAnswer: `1. Phân tích nghệ thuật "chớp thời cơ" trong Cách mạng tháng Tám năm 1945:
- Nhận định chính xác và đón đầu thời cơ:
  + Từ năm 1941, lãnh tụ Nguyễn Ái Quốc đã tiên đoán: "Phe Đồng minh nhất định thắng... Cách mạng Việt Nam sẽ thành công vào khoảng năm 1945".
  + Khi Nhật đảo chính Pháp (9/3/1945), Trung ương Đảng ra chỉ thị "Nhật - Pháp bắn nhau và hành động của chúng ta", kịp thời phát động cao trào kháng Nhật cứu nước.
- Thời cơ "ngàn năm có một":
  + Xuất hiện vào giữa tháng 8/1945 khi Nhật đầu hàng Đồng minh, chính quyền bù nhìn Trần Trọng Kim tê liệt.
  + Thời cơ chỉ tồn tại trong khoảng 20 ngày ngắn ngủi: trước khi quân Đồng minh (quân Tưởng ở miền Bắc, quân Anh ở miền Nam) kéo vào tước vũ khí quân Nhật với danh nghĩa giải giáp nhưng thực chất mở đường cho thực dân xâm lược.
- Quyết định chớp thời cơ thần tốc:
  + Hội nghị toàn quốc của Đảng và Đại hội Quốc dân Tân Trào quyết định phát động Tổng khởi nghĩa giành chính quyền trước khi quân Đồng minh vào nước ta.
  + Nhân dân cả nước nhất tề nổi dậy, chỉ trong vòng 15 ngày (từ 14-8 đến 28-8-1945), chính quyền về tay nhân dân, ngày 2-9 Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.

2. Ý nghĩa bài học đối với thanh niên Việt Nam trong kỷ nguyên số hôm nay:
- Tinh thần chủ động đón đầu xu thế: Cơ hội không tự nhiên đến mà cần sự tích lũy thực lực bền bỉ mỗi ngày. Thanh niên phải không ngừng trau dồi tri thức công nghệ mới (AI, dữ liệu lớn, chuyển đổi số) và ngoại ngữ để sẵn sàng nắm bắt cơ hội việc làm toàn cầu.
- Bản lĩnh bứt phá và dám nghĩ dám làm: Khi thời cơ đến, phải quyết đoán, bản lĩnh hành động, không do dự lùi bước trước khó khăn.
- Khát vọng cống hiến: Gắn hoài bão cá nhân với sứ mệnh đưa đất nước vươn mình trong kỷ nguyên mới, góp phần bảo vệ chủ quyền số và khẳng định trí tuệ Việt Nam trên trường quốc tế.`,
    rubricCriteria: [
      { criterion: 'Phân tích chính xác bối cảnh và tính chất ngàn năm có một của thời cơ', maxScore: 3.5 },
      { criterion: 'Làm nổi bật vai trò chuẩn bị chu đáo và sự chỉ đạo tài tình của Đảng và Bác Hồ', maxScore: 3.5 },
      { criterion: 'Rút ra bài học thời cơ thực tế và liên hệ sâu sắc tới thanh niên kỷ nguyên số', maxScore: 2.0 },
      { criterion: 'Hành văn chặt chẽ, truyền cảm hứng và sáng tạo', maxScore: 1.0 },
    ],
  },
];
