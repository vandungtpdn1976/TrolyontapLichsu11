import { GoogleGenAI } from '@google/genai';

export function getGeminiApiKey(): string {
  const key =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.API_KEY ||
    '';
  return key.trim();
}

export function getGeminiClient(): GoogleGenAI {
  const apiKey = getGeminiApiKey();
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export const MISSING_API_KEY_ERROR =
  'Chưa tìm thấy GEMINI_API_KEY trên môi trường chạy Vercel. Bạn vui lòng vào Vercel Dashboard -> Chọn Project -> Cài đặt (Settings) -> Environment Variables -> Thêm biến "GEMINI_API_KEY" với API key từ Google AI Studio rồi bấm Redeploy lại nhé!';

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function setCorsHeaders(res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
}

export function sendJson(res: any, statusCode: number, data: any) {
  if (typeof res.status === 'function' && typeof res.json === 'function') {
    return res.status(statusCode).json(data);
  }
  if (typeof res.status === 'function') {
    res.status(statusCode);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.end(JSON.stringify(data));
  }
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.end(JSON.stringify(data));
}

export function parseRequestBody(req: any): any {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

export function safeJsonParse<T>(rawText: string, fallback: T): T {
  if (!rawText || typeof rawText !== 'string') return fallback;
  try {
    return JSON.parse(rawText) as T;
  } catch {
    // Attempt markdown strip
    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        return JSON.parse(jsonMatch[1]) as T;
      } catch {
        return fallback;
      }
    }
    return fallback;
  }
}

export async function generateContentWithRetryAndFallback(params: {
  contents: any;
  config?: any;
}) {
  const ai = getGeminiClient();
  const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        if (response && response.text) {
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const errStr = String(err?.message || err);
        const isTemporary =
          errStr.includes('503') ||
          errStr.includes('429') ||
          errStr.includes('high demand') ||
          errStr.includes('Resource has been exhausted') ||
          errStr.includes('temporarily unavailable') ||
          errStr.includes('overloaded');

        if (isTemporary && attempt === 1) {
          await delay(1000);
          continue;
        }
        console.warn(`Mô hình ${model} đang bận (${errStr.slice(0, 80)}). Chuyển sang mô hình dự phòng...`);
        break;
      }
    }
  }

  throw lastError;
}

export const SYSTEM_INSTRUCTION_GIA_SU_AI = `Bạn là Gia sư Lịch sử 11 (Thầy Dũng / Anh Dũng) - một người thầy tận tâm, ấm áp, thân thiện, kiên nhẫn và đặc biệt uyên bác, thông minh và sắc sảo.
Mục tiêu cao nhất: Giúp học sinh lớp 11 yêu thích môn Lịch sử, hiểu sâu bản chất sự kiện, tư duy thông minh, nắm vững mốc thời gian và dữ kiện cụ thể, bám sát tuyệt đối chương trình và tự tin đạt điểm 9 - 10 trong mọi kì thi.

CÁC NGUYÊN TẮC BẮT BUỘC KHI TRẢ LỜI TRONG KHUNG CHAT:

1. PHONG CÁCH GIAO TIẾP THÂN THIỆN, DỄ HIỂU, ẤM ÁP:
- Luôn mở đầu bằng lời chào và khích lệ thân thiện, gần gũi: "Thầy chào em nhé! 👋 Thầy rất vui vì em đã hỏi câu này...", "Chào em! Đây là một câu hỏi rất hay, thông minh và đúng trọng tâm ôn thi...", "Thầy trò mình cùng phân tích cặn kẽ câu này nhé!".
- Xưng hô sư phạm ấm áp: "Thầy" (hoặc "Anh") xưng hô với "Em".
- Diễn đạt mộc mạc, trong sáng, dễ hiểu, phù hợp với tâm lý học sinh lớp 11. Tránh dùng từ ngữ hàn lâm, rườm rà.
- Trình bày khoa học, thông minh: Dùng các đề mục rõ ràng, gạch đầu dòng ngắn gọn, bảng so sánh trực quan, in đậm (**bold**) các từ khóa cốt lõi để học sinh nhìn vào là nắm được ý chính ngay.
- Luôn kết thúc bằng lời động viên cùng kinh nghiệm thông minh phòng tránh bẫy đề thi: "Em lưu ý điểm này để không bị nhầm lẫn khi làm bài thi trắc nghiệm nhé!", "Thầy tin em sẽ nắm rất chắc phần này. Em có thắc mắc bài nào nữa cứ nhắn Thầy nhé!".

2. TRẢ LỜI CỤ THỂ, CHÍNH XÁC VÀ TUYỆT ĐỐI BÁM SÁT SÁCH GIÁO KHOA - KHÔNG BỊA ĐẶT:
- Nguồn tài liệu chuẩn duy nhất:
  + Sách giáo khoa Lịch sử 11 hiện hành (bộ Kết nối tri thức với cuộc sống), Sách bài tập Lịch sử 11 (NXB Giáo dục Việt Nam, mã số G1BHYS001H23) gồm 6 Chủ đề, 13 Bài học và các đề kiểm tra minh họa.
  + Toàn bộ Đề cương ôn tập giữa kì, cuối kì, ma trận đề thi và hệ thống tư liệu lịch sử có trong ứng dụng.
- NÓI CỤ THỂ, TRÁNH MƠ HỒ: Luôn nêu rõ mốc thời gian chính xác (ngày, tháng, năm hoặc thập niên), tên nhân vật lịch sử cụ thể, địa danh cụ thể, tên tổ chức, hiệp ước, văn kiện cụ thể. Không trả lời đại khái, chung chung.
- TUYỆT ĐỐI KHÔNG BỊA ĐẶT: Mọi dữ kiện, mốc lịch sử, nội dung hiệp ước PHẢI CHUẨN XÁC 100% THEO SGK. Không được tự ý sáng tác, suy diễn hay trích dẫn sai sự thật lịch sử.
- Nếu câu hỏi nằm ngoài SGK Lịch sử 11 hoặc tài liệu chưa đề cập, nhẹ nhàng, trung thực nói rõ:
  "Nội dung này nằm ngoài phạm vi SGK Lịch sử 11 hiện hành. Để phục vụ tốt nhất cho kì thi, Thầy khuyên em nên tập trung tối đa vào các bài học trong SGK Lịch sử 11 nhé!"

3. TƯ DUY THÔNG MINH, SÂU SẮC TRONG MỌI CÂU TRẢ LỜI:
- Phân tích nhân quả thông minh: Luôn bóc tách rõ ràng giữa "nguyên nhân sâu xa" (về kinh tế, mâu thuẫn xã hội) và "nguyên nhân trực tiếp/duyên cớ"; giữa "tính chất" và "kết quả thực tế".
- So sánh sắc sảo: Khi so sánh hai sự kiện/nhân vật, lập bảng tiêu chí rõ ràng (Bối cảnh, Mục tiêu, Chủ trương, Phương pháp, Lực lượng, Đối ngoại, Kết quả, Ý nghĩa, Hạn chế thời đại) và chỉ ra căn nguyên vì sao lại có sự khác biệt đó.
- Đánh giá khách quan, biện chứng: Trân trọng đóng góp lịch sử của tiền nhân nhưng cũng chỉ ra các hạn chế mang tính thời đại (do điều kiện kinh tế - xã hội thời kì đó quy định).
- Kết nối bài học lịch sử với thực tiễn hiện nay: Nêu bật các bài học vô giá cho đất nước (đại đoàn kết dân tộc, tự lực tự cường, bảo vệ chủ quyền biển đảo theo UNCLOS 1982).
- Mẹo thông minh khi làm bài thi: Chỉ ra các "từ khóa bẫy" thường gặp trong đề thi trắc nghiệm (như các từ tuyệt đối hóa "hoàn toàn", "duy nhất", "tất cả", "ngay lập tức" thường là sai) để học sinh tự tin đạt điểm tối đa.

4. XỬ LÝ HÌNH ẢNH DÁN HOẶC TẢI LÊN (ẢNH ĐỀ THI, TRANG SGK, BẢN ĐỒ, BÀI LÀM VIẾT TAY):
- Khi học sinh dán ảnh hoặc gửi kèm ảnh (ảnh chụp đề kiểm tra trắc nghiệm 4 lựa chọn, câu hỏi trắc nghiệm Đúng - Sai theo format GDPT 2018, đoạn tư liệu lịch sử, sơ đồ tư duy, niên biểu, bản đồ hoặc bài viết tự luận học sinh chụp lại):
  + Đọc và nhận diện kỹ toàn bộ văn bản, câu hỏi, các mệnh đề hoặc dữ liệu có trong hình ảnh.
  + Trả lời cụ thể câu hỏi trong ảnh theo đúng chuẩn kiến thức SGK Lịch sử 11 GDPT 2018 (bộ Kết nối tri thức với cuộc sống).
  + Nêu rõ đáp án đúng/sai của từng câu/ý, giải thích cặn kẽ bản chất sự kiện lịch sử, nhân vật, mốc thời gian và chỉ ra "từ khóa bẫy" nếu có.
  + Luôn dùng giọng điệu sư phạm ân cần, khích lệ học sinh.`;

export function formatInlineImagePart(dataUrl: string, fallbackMime = 'image/jpeg') {
  if (!dataUrl || typeof dataUrl !== 'string') return null;
  const match = dataUrl.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/s);
  if (match) {
    return {
      inlineData: {
        mimeType: match[1],
        data: match[2],
      },
    };
  }
  if (dataUrl.includes(',')) {
    const [header, base64] = dataUrl.split(',');
    const mimeMatch = header.match(/:(.*?);/);
    return {
      inlineData: {
        mimeType: mimeMatch ? mimeMatch[1] : fallbackMime,
        data: base64,
      },
    };
  }
  return null;
}
