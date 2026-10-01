export function getFallbackHistoryAnswer(question: string): string {
  const q = question.toLowerCase();

  // 1. So sánh Phan Bội Châu và Phan Châu Trinh
  if (
    (q.includes('phan bội châu') && q.includes('phan châu trinh')) ||
    (q.includes('bạo động') && q.includes('cải cách')) ||
    (q.includes('xu hướng cứu nước') && (q.includes('đầu thế kỉ xx') || q.includes('đầu thế kỷ xx') || q.includes('phan')))
  ) {
    return `Thầy chào em nhé! 👋 Thầy rất vui vì em đã hỏi câu này, đây là một trong những nội dung trọng tâm và xuất hiện rất nhiều trong các đề thi Lịch sử 11 (GDPT 2018).

Thầy trò mình cùng phân tích cặn kẽ và lập bảng so sánh chuẩn SGK nhé:

---

### I. ĐIỂM GIỐNG NHAU (TƯƠNG ĐỒNG)
1. **Bối cảnh lịch sử:** Đều xuất hiện vào đầu thế kỉ XX, sau khi thực dân Pháp bình định xong và tiến hành khai thác thuộc địa lần thứ nhất; phong trào Cần Vương theo ngọn cờ phong kiến đã thất bại hoàn toàn.
2. **Khuynh hướng cứu nước & Mục tiêu:**
   - Cả hai cụ đều chịu ảnh hưởng sâu sắc của **khuynh hướng dân chủ tư sản** (từ cuộc Duy tân Minh Trị ở Nhật Bản, Cách mạng Tân Hợi 1911 ở Trung Quốc và tư tưởng của các nhà Khai sáng Pháp).
   - Đều xuất phát từ lòng yêu nước nồng nàn, mục tiêu cao nhất là **giải phóng dân tộc, giành độc lập cho Tổ quốc và canh tân đất nước**.
3. **Lực lượng tập hợp:** Đều cố gắng thức tỉnh, giác ngộ đông đảo các tầng lớp nhân dân (trí thức tân học, thanh niên du học, nông dân, thương nhân...).
4. **Kết quả & Ý nghĩa:** Cả hai xu hướng đều chưa giành được thắng lợi cuối cùng do hạn chế về giai cấp, nhưng đã **chuyển phong trào yêu nước Việt Nam từ hệ tư tưởng phong kiến sang dân chủ tư sản**, tạo tiền đề cho giai đoạn cách mạng tiếp theo.

---

### II. BẢNG SO SÁNH ĐIỂM KHÁC NHAU (DỊ BIỆT)

| Tiêu chí | Cụ Phan Bội Châu (Xu hướng Bạo động) | Cụ Phan Châu Trinh (Xu hướng Cải cách) |
| :--- | :--- | :--- |
| **Chủ trương cứu nước** | Dùng **bạo lực vũ trang** đánh đuổi thực dân Pháp, giành lại độc lập dân tộc trước rồi mới tính đến chấn hưng đất nước. | Đánh đổ **ngôi vua và chế độ phong kiến hủ bại**, thực hiện dân quyền, khai dân trí, rồi mới tính đến việc đuổi Pháp. |
| **Phương châm hành động** | *"Bất bạo động vô dĩ đồ tồn"* (Không dùng bạo lực thì không thể tồn tại và cứu nước). | *"Bất bạo động, bạo động tất tử"* (Không được bạo động; chủ trương "Khai dân trí, chấn dân khí, hậu dân sinh"). |
| **Kẻ thù chính trước mắt** | **Thực dân Pháp** xâm lược (kẻ thù trực tiếp, nguy hiểm nhất). | **Chế độ phong kiến** chuyên chế, quan trường tham nhũng và các hủ tục lạc hậu. |
| **Chính sách đối ngoại** | Cầu viện sự giúp đỡ của nước ngoài (chủ yếu là **Nhật Bản** vì đồng chủng, đồng văn). | **Dựa vào Pháp** để cải cách ("ỷ Pháp cầu tiến bộ"), kiên quyết phản đối việc dựa vào Nhật ("Chẳng khác nào đuổi hổ cửa trước, rước beo cửa sau"). |
| **Hoạt động tiêu biểu** | - Thành lập Hội Duy tân (1904), Việt Nam Quang phục hội (1912).<br>- Tổ chức phong trào Đông Du (1905 – 1908).<br>- Tổ chức trừ gian, ám sát trùm thực dân. | - Mở trường Dục Thanh, lập các hiệu buôn tân dược, nông hội.<br>- Phong trào Duy tân ở Trung Kì (1906 – 1908).<br>- Vận động cải cách lối sống, cắt tóc ngắn; phong trào chống đi phu, chống thuế (1908). |
| **Chế độ xã hội hướng tới** | Ban đầu chủ trương **Quân chủ lập hiến**, sau chuyển sang **Cộng hòa Dân quốc Việt Nam**. | Xây dựng thể chế **Cộng hòa tư sản**, mở rộng dân chủ và quyền tự do cho nhân dân. |

---

### III. BÀI HỌC VÀ LỜI DẶN DÒ TỪ THẦY DŨNG:
- **Hạn chế lịch sử:** Cụ Phan Bội Châu chưa nhận rõ bản chất của chủ nghĩa đế quốc khi "dựa vào Nhật đuổi Pháp"; cụ Phan Châu Trinh lại ảo tưởng vào lòng tốt "khai hóa văn minh" của thực dân Pháp. Cả hai bài học đều chỉ ra rằng: muốn cứu nước phải tự lực tự cường và có đường lối cách mạng đúng đắn.
- **Mẹo nhớ khi thi trắc nghiệm:**
  - Nhớ cụ **Phan Bội Châu** gắn với từ khóa: *Bạo động, Hội Duy tân, Đông Du, Việt Nam Quang phục hội, cầu viện Nhật*.
  - Nhớ cụ **Phan Châu Trinh** gắn với từ khóa: *Cải cách, Khai dân trí - Chấn dân khí - Hậu dân sinh, chống thuế Trung Kì, dựa vào Pháp*.

Thầy tin em sẽ nắm rất vững phần này! Em có thắc mắc bài nào nữa cứ nhắn Thầy cùng học nhé! 😊`;
  }

  // 2. Phong trào Cần Vương
  if (q.includes('cần vương') || q.includes('hàm nghi') || q.includes('hương khê') || q.includes('ba đình') || q.includes('tôn thất thuyết')) {
    return `Thầy chào em nhé! 👋 Về **Phong trào Cần Vương (1885 – 1896)**, đây là bài học rất quan trọng về phong trào kháng chiến chống thực dân Pháp cuối thế kỉ XIX. Thầy tóm tắt ngắn gọn, dễ nhớ theo đúng chuẩn SGK Lịch sử 11 như sau:

---

### 1. Bối cảnh và Nguyên nhân bùng nổ:
- Sau khi triều đình Huế kí Hiệp ước Hác-măng (1883) và Pa-tơ-nốt (1884) đầu hàng thực dân Pháp, phái chủ chiến trong triều đình do **Tôn Thất Thuyết** đứng đầu quyết tâm kháng chiến.
- Đêm ngày 4 rạng sáng 5/7/1885, cuộc phản công tại kinh thành Huế thất bại. Tôn Thất Thuyết đưa vua trẻ **Hàm Nghi** ra căn cứ Tân Sở (Quảng Trị).
- Tại đây, nhân danh vua Hàm Nghi, Tôn Thất Thuyết ban **Chiếu Cần Vương** kêu gọi văn thân, sĩ phu và nhân dân cả nước đứng lên giúp vua cứu nước ("Cần Vương" nghĩa là giúp vua).

---

### 2. Hai giai đoạn phát triển:
* **Giai đoạn 1 (1885 – 1888):**
  - Phong trào bùng nổ sôi nổi trên diện rộng, từ Trung Kì ra Bắc Kì, dưới sự chỉ đạo trực tiếp của vua Hàm Nghi và Tôn Thất Thuyết.
  - Đến cuối năm 1888, do Trương Quang Ngọc phản bội, vua Hàm Nghi bị giặc Pháp bắt và đày sang Angiêri.
* **Giai đoạn 2 (1888 – 1896):**
  - Không còn sự chỉ đạo của triều đình kháng chiến, phong trào quy tụ lại thành các cuộc khởi nghĩa lớn ở vùng trung du và rừng núi: Khởi nghĩa Ba Đình, Bãi Sậy, Hùng Lĩnh và tiêu biểu nhất là **Khởi nghĩa Hương Khê (1885 – 1896)** do Phan Đình Phùng và Cao Thắng lãnh đạo.
  - Năm 1896, Phan Đình Phùng hy sinh, khởi nghĩa Hương Khê thất bại, đánh dấu sự kết thúc của phong trào Cần Vương.

---

### 3. Tính chất và Ý nghĩa:
- **Tính chất:** Là phong trào yêu nước chống thực dân Pháp mang lập trường, hệ tư tưởng phong kiến.
- **Ý nghĩa & Bài học:** Thể hiện tinh thần yêu nước quật cường của nhân dân ta; đồng thời chứng minh sự bất lực, bế tắc của ngọn cờ phong kiến trong việc giải quyết nhiệm vụ giải phóng dân tộc, đặt ra yêu cầu phải tìm con đường cứu nước mới.

📌 **Thầy dặn em:** Đề thi rất hay hỏi *"Cuộc khởi nghĩa tiêu biểu nhất trong phong trào Cần Vương là cuộc khởi nghĩa nào?"* -> Đáp án luôn là **Khởi nghĩa Hương Khê** em nhé!`;
  }

  // 3. Khởi nghĩa Yên Thế
  if (q.includes('yên thế') || q.includes('hoàng hoa thám') || q.includes('đề thám')) {
    return `Thầy chào em nhé! 👋 Thầy trò mình cùng ôn tập về **Khởi nghĩa Yên Thế (1884 – 1913)** nhé:

---

### 1. Tính chất đặc biệt cần nhớ:
- **Không thuộc phong trào Cần Vương:** Khởi nghĩa Yên Thế không hưởng ứng Chiếu Cần Vương, không vì mục tiêu khôi phục ngôi vua, mà là **phong trào đấu tranh tự vũ trang tự phát của giai cấp nông dân** nhằm bảo vệ xóm làng và quyền lợi thiết thân.
- Là cuộc khởi nghĩa nông dân kiên cường, bền bỉ nhất trong lịch sử chống Pháp, kéo dài gần **30 năm**.

---

### 2. Các giai đoạn phát triển:
- **1884 – 1892:** Do Đề Nắm lãnh đạo, xây dựng công sự làng chiến đấu kiên cố, bẻ gãy nhiều đợt tấn công của Pháp.
- **1893 – 1908:** Hoàng Hoa Thám (Đề Thám) lãnh đạo xuất sắc, 2 lần chủ động giảng hòa với Pháp để củng cố lực lượng, tổ chức khai hoang, tích lũy lương thực và bí mật hỗ trợ các nhà yêu nước Phan Bội Châu, Phan Châu Trinh.
- **1909 – 1913:** Thực dân Pháp tập trung toàn lực đàn áp khốc liệt. Năm 1913, Hoàng Hoa Thám bị sát hại, phong trào tan rã.

---

### 3. Nguyên nhân thất bại và Bài học:
- Tương quan lực lượng quá chênh lệch; phong trào mang nặng tính địa phương, thiếu sự liên kết chặt chẽ toàn quốc và đặc biệt là thiếu sự lãnh đạo của một giai cấp tiên tiến.

📌 **Mẹo làm bài thi của Thầy Dũng:** Khi đề bài hỏi điểm khác biệt cơ bản giữa Khởi nghĩa Yên Thế và phong trào Cần Vương -> Em nhớ chọn ngay: *Yên Thế là phong trào tự vệ của nông dân, không vì mục tiêu phò vua giúp nước phong kiến* nhé!`;
  }

  // Mặc định
  return `Thầy chào em nhé! 👋 Thầy Dũng đã nhận được câu hỏi của em: **"${question.trim()}"**.

Theo chuẩn Sách giáo khoa Lịch sử 11 (bộ Kết nối tri thức với cuộc sống) và tài liệu ôn tập của chương trình:
1. **Kiến thức trọng tâm:** Em hãy bám sát chính xác các mốc thời gian, diễn biến chính, nhân vật lịch sử và phân tích nguyên nhân - kết quả theo các bài học trong SGK.
2. **Kinh nghiệm làm bài:**
   - Trắc nghiệm: Đọc kĩ từ khóa, loại trừ các đáp án dùng từ tuyệt đối ("hoàn toàn", "duy nhất", "tất cả") hoặc sai mốc thời gian.
   - Tự luận: Lập dàn ý 3 phần (Mở bài, Thân bài với các luận điểm có dẫn chứng lịch sử, Kết bài rút ra ý nghĩa/bài học).

Em có thể gửi tiếp các câu hỏi trắc nghiệm hoặc đề bài cụ thể để Thầy trò mình cùng thảo luận nhé! Chúc em học thật tốt! 📖✨`;
}
