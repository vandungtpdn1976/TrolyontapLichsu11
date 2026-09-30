export function getFallbackHistoryAnswer(question: string): string {
  const q = question.toLowerCase();

  // So sánh Phan Bội Châu và Phan Châu Trinh
  if (
    (q.includes('phan bội châu') && q.includes('phan châu trinh')) ||
    (q.includes('bạo động') && q.includes('cải cách')) ||
    (q.includes('xu hướng cứu nước') && (q.includes('đầu thế kỉ xx') || q.includes('đầu thế kỷ xx') || q.includes('phan')))
  ) {
    return `Chào em! Câu hỏi của em về **"So sánh xu hướng cứu nước của cụ Phan Bội Châu và cụ Phan Châu Trinh"** là một trong những nội dung trọng tâm của chương trình Lịch sử 11 (GDPT 2018). Thầy xin giải đáp chi tiết như sau:

---

### I. ĐIỂM GIỐNG NHAU (TƯƠNG ĐỒNG)
1. **Bối cảnh lịch sử:** Đều diễn ra trong bối cảnh thực dân Pháp đã hoàn thành bình định và tiến hành cuộc khai thác thuộc địa lần thứ nhất; các phong trào cứu nước phong kiến (Cần Vương) đã hoàn toàn thất bại.
2. **Hệ tư tưởng và mục tiêu tối cao:**
   - Cả hai cụ đều chịu ảnh hưởng sâu sắc của **khuynh hướng dân chủ tư sản** (từ cuộc Duy Tân Minh Trị ở Nhật Bản, Cách mạng Tân Hợi ở Trung Quốc và tư tưởng của các nhà Khai sáng Pháp).
   - Đều xuất phát từ lòng yêu nước nồng nàn, mục tiêu cao nhất là **giải phóng dân tộc, giành độc lập cho Tổ quốc và đưa đất nước phát triển theo con đường tư bản chủ nghĩa**.
3. **Lực lượng tham gia:** Đều cố gắng thức tỉnh, giác ngộ và huy động đông đảo nhân dân (trí thức, thanh niên du học, nông dân, thương nhân...).
4. **Ý nghĩa:** Cùng tạo nên phong trào dân tộc dân chủ sôi nổi đầu thế kỉ XX, chuẩn bị điều kiện cho bước phát triển tiếp theo của cách mạng Việt Nam.

---

### II. ĐIỂM KHÁC NHAU (DỊ BIỆT)

| Tiêu chí | Cụ Phan Bội Châu (Xu hướng Bạo động) | Cụ Phan Châu Trinh (Xu hướng Cải cách) |
| :--- | :--- | :--- |
| **Chủ trương cốt lõi** | Dùng **bạo lực vũ trang** đánh đuổi thực dân Pháp, khôi phục độc lập dân tộc trước, rồi mới chấn hưng đất nước. | Đánh đổ **ngôi vua và chế độ phong kiến hủ bại**, thực hiện dân quyền, khai dân trí, rồi mới tính đến đuổi Pháp. |
| **Phương châm hành động** | *"Bất bạo động vô dĩ đồ tồn"* (Không dùng bạo lực thì không thể tồn tại và cứu nước). | *"Bất bạo động, bạo động tất tử"* (Không được bạo động, manh động sẽ bị tiêu diệt; chủ trương "Khai dân trí, chấn dân khí, hậu dân sinh"). |
| **Kẻ thù chính trước mắt** | **Thực dân Pháp** xâm lược (kẻ thù trực tiếp, nguy hiểm nhất). | **Chế độ phong kiến** chuyên chế, quan trường tham nhũng và các hủ tục lạc hậu. |
| **Chính sách đối ngoại** | Cầu viện sự giúp đỡ của nước ngoài (chủ yếu là **Nhật Bản**). | **Dựa vào Pháp** để cải cách, kiên quyết phản đối việc dựa vào Nhật ("Chẳng khác nào đuổi hổ cửa trước, rước beo cửa sau"). |
| **Hoạt động tiêu biểu** | - Thành lập Hội Duy tân (1904), Việt Nam Quang phục hội (1912).<br>- Phong trào Đông Du (1905 - 1908).<br>- Tổ chức trừ gian, ám sát các trùm thực dân. | - Lập hội trường Dục Thanh, mở các hiệu buôn tân dược, nông hội.<br>- Phong trào Duy tân ở Trung Kì (1906 - 1908).<br>- Vận động cải cách lối sống, cắt tóc ngắn; phong trào chống đi phu, chống thuế (1908). |
| **Chế độ xã hội hướng tới** | Ban đầu chủ trương **Quân chủ lập hiến**, sau chuyển sang **Cộng hòa Dân quốc Việt Nam**. | Xây dựng chế độ **Cộng hòa tư sản**, mở rộng dân chủ và quyền tự do cho nhân dân. |

---

### III. Ý NGHĨA VÀ BÀI HỌC LỊCH SỬ
- **Ý nghĩa:** Đánh dấu bước chuyển biến căn bản của phong trào yêu nước Việt Nam từ hệ tư tưởng phong kiến sang dân chủ tư sản.
- **Hạn chế:** Cụ Phan Bội Châu ảo tưởng vào sự giúp đỡ của đế quốc Nhật; cụ Phan Châu Trinh ảo tưởng vào sự "khai hóa văn minh" của thực dân Pháp. Sự thất bại của cả 2 xu hướng chứng tỏ giai cấp tư sản Việt Nam non yếu chưa thể gánh vác sứ mệnh giải phóng dân tộc.

*Thầy chúc em học tốt! Em có thể gửi tiếp bất kỳ câu hỏi nào về Lịch sử 11 để Thầy giải đáp nhé!*`;
  }

  // Phong trào Cần Vương
  if (q.includes('cần vương') || q.includes('hàm nghi') || q.includes('hương khê') || q.includes('ba đình')) {
    return `Chào em! Thầy xin giải đáp về **Phong trào Cần Vương (1885 - 1896)**:
- **Bùng nổ:** Ngày 5/7/1885, sau cuộc phản công kinh thành Huế thất bại, Tôn Thất Thuyết đưa vua Hàm Nghi ra Tân Sở (Quảng Trị) ban Chiếu Cần Vương kêu gọi văn thân, sĩ phu và nhân dân phò vua cứu nước.
- **Giai đoạn 1 (1885 - 1888):** Phong trào bùng nổ rộng khắp cả nước dưới sự chỉ huy của vua Hàm Nghi và Tôn Thất Thuyết. Đến cuối năm 1888, vua Hàm Nghi bị bắt.
- **Giai đoạn 2 (1888 - 1896):** Không còn vua chỉ đạo, phong trào quy tụ lại thành các cuộc khởi nghĩa lớn ở vùng trung du và miền núi (Bãi Sậy, Ba Đình, Hùng Lĩnh, Hương Khê). Tiêu biểu nhất là Khởi nghĩa Hương Khê (1885 - 1896) do Phan Đình Phùng và Cao Thắng lãnh đạo.
- **Tính chất & Ý nghĩa:** Là phong trào yêu nước chống Pháp theo lập trường ý thức hệ phong kiến, thể hiện lòng yêu nước nồng nàn và chấm dứt vai trò lãnh đạo của hệ tư tưởng phong kiến.`;
  }

  // Mặc định
  return `Chào em! Thầy Dũng đã nhận được câu hỏi: **"${question.trim()}"**.

Theo chuẩn chương trình Lịch sử 11 GDPT 2018 (bộ Kết nối tri thức với cuộc sống):
1. **Về kiến thức trọng tâm:** Em cần bám sát các mốc thời gian, nhân vật lịch sử tiêu biểu, phân tích nguyên nhân, diễn biến và ý nghĩa lịch sử của sự kiện trong SGK.
2. **Về phương pháp làm bài:**
   - Trắc nghiệm: Tìm từ khóa (keywords), loại trừ các phương án tuyệt đối hóa hoặc sai mốc thời gian.
   - Tự luận: Lập dàn ý 3 phần (Mở bài, Thân bài với các luận điểm rõ ràng, Kết bài rút ra bài học lịch sử).

*Em có thể gửi tiếp các câu hỏi trắc nghiệm hoặc bài tập cụ thể để Thầy trò mình cùng thảo luận nhé!*`;
}
