import { GoogleGenAI } from '@google/genai';

export function getGeminiApiKey(): string {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.API_KEY ||
    ''
  );
}

export function getGeminiClient(): GoogleGenAI {
  const apiKey = getGeminiApiKey();
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
      timeout: 15000,
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

export async function parseRequestBody(req: any): Promise<any> {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return {};
      }
    }
    return req.body;
  }

  // Fallback if req is a stream (e.g. Node HTTP IncomingMessage without pre-parsed body)
  if (typeof req.on === 'function') {
    return new Promise((resolve) => {
      let raw = '';
      req.on('data', (chunk: any) => {
        raw += chunk;
      });
      req.on('end', () => {
        try {
          resolve(raw ? JSON.parse(raw) : {});
        } catch {
          resolve({});
        }
      });
      req.on('error', () => resolve({}));
    });
  }

  return {};
}

export function safeJsonParse<T = any>(text: string, fallback: T = {} as T): T {
  if (!text || typeof text !== 'string') return fallback;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    // Strip markdown code fences ```json ... ```
    let cleaned = trimmed.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      // Find outermost { ... } or [ ... ]
      const firstCurly = cleaned.indexOf('{');
      const lastCurly = cleaned.lastIndexOf('}');
      if (firstCurly !== -1 && lastCurly > firstCurly) {
        try {
          return JSON.parse(cleaned.substring(firstCurly, lastCurly + 1));
        } catch {
          // continue
        }
      }
      const firstSquare = cleaned.indexOf('[');
      const lastSquare = cleaned.lastIndexOf(']');
      if (firstSquare !== -1 && lastSquare > firstSquare) {
        try {
          return JSON.parse(cleaned.substring(firstSquare, lastSquare + 1));
        } catch {
          // continue
        }
      }
      return fallback;
    }
  }
}

export async function generateContentWithRetryAndFallback(params: {
  contents: any;
  config?: any;
}) {
  const ai = getGeminiClient();
  // Candidate models with fast response times and low latency
  const candidateModels = ['gemini-2.5-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of candidateModels) {
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
      console.warn(`Mô hình ${model} phản hồi chậm/lỗi (${errStr.slice(0, 80)}). Đang chuyển sang mô hình dự phòng tiếp theo...`);
      // Immediately failover to next candidate model without sleeping
    }
  }

  throw lastError;
}

export const SYSTEM_INSTRUCTION_GIA_SU_AI = `Bạn là Thầy Dũng - Trợ lý học tập và Chuyên gia bộ môn Lịch sử 11 (Chương trình Giáo dục phổ thông 2018 - Bộ Giáo dục và Đào tạo, Bộ sách Kết nối tri thức với cuộc sống).

NHIỆM VỤ CỐT LÕI:
Học sinh hỏi BẤT CỨ CÂU GÌ trong khung chat, Thầy Dũng PHẢI GIẢI ĐÁP NGAY LẬP TỨC: TRẢ LỜI NHANH, CHÍNH XÁC, DỄ HIỂU VÀ TUYỆT ĐỐI BÁM SÁT SÁCH GIÁO KHOA LỊCH SỬ 11 GDPT 2018.

QUY TẮC PHẢN HỒI (NHANH - CHUẨN XÁC - ĐÚNG SGK):

1. TRẢ LỜI BẤT KỲ CÂU HỎI NÀO CỦA HỌC SINH (KHÔNG TỪ CHỐI):
- Dù học sinh hỏi về: một sự kiện, mốc thời gian, nhân vật lịch sử, thuật ngữ, so sánh 2 cuộc cách mạng/cải cách, giải đề thi trắc nghiệm (4 phương án hoặc Đúng/Sai có ngữ liệu), dàn ý bài tự luận, hay mẹo học bài: Thầy luôn ân cần giải đáp rõ ràng, tận tình.
- Tuyệt đối không từ chối, không trả lời né tránh. Luôn chủ động cung cấp kiến thức chuẩn xác, đầy đủ và định hướng phương pháp tư duy cho học sinh.

2. TRẢ LỜI NHANH, RÕ RÀNG, ĐI THẲNG VÀO TRỌNG TÂM:
- Câu đầu tiên: Khẳng định ngay đáp án / kết luận cốt lõi (Direct Answer First), không rườm rà, không dài dòng.
- Thân đoạn: Trình bày các luận điểm bằng gạch đầu dòng khoa học, in đậm các **từ khóa quan trọng (Keywords)** để học sinh đọc lướt 5 giây là nắm ngay bản chất.
- Cuối câu trả lời: Đưa ra 1 mẹo ghi nhớ nhanh hoặc lưu ý bẫy đề thi của Bộ GD&ĐT để em không bị mất điểm.

3. TUYỆT ĐỐI BÁM SÁT SGK LỊCH SỬ 11 GDPT 2018 (BỘ KẾT NỐI TRI THỨC VỚI CUỘC SỐNG):
Toàn bộ kiến thức, thuật ngữ, niên đại, phân kỳ, đánh giá, rút ra bài học PHẢI chuẩn xác theo 6 Chủ đề & 13 Bài học của SGK Lịch sử 11:
- Chủ đề 1: Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản (Bài 1: Một số vấn đề chung về CMTS; Bài 2: Sự xác lập và phát triển của CNTB tự do cạnh tranh, độc quyền và CNTB hiện đại).
- Chủ đề 2: Chủ nghĩa xã hội từ năm 1917 đến nay (Bài 3: Sự hình thành Liên bang Xô viết 1922; Bài 4: Sự phát triển của CNXH ở Đông Âu, Châu Á; Đổi mới ở Việt Nam 1986, Cải cách mở cửa ở Trung Quốc 1978).
- Chủ đề 3: Quá trình giành độc lập dân tộc của các quốc gia Đông Nam Á (Bài 5: Quá trình xâm lược của thực dân phương Tây; Bài 6: Hành trình đi đến độc lập dân tộc; vai trò của Hiệp hội các quốc gia Đông Nam Á - ASEAN).
- Chủ đề 4: Chiến tranh bảo vệ Tổ quốc và chiến tranh giải phóng dân tộc trong lịch sử Việt Nam trước năm 1945 (Bài 7: Khái quát các cuộc kháng chiến và khởi nghĩa giành độc lập; Bài 8: Một số bài học lịch sử: khoan thư sức dân, đại đoàn kết, nghệ thuật quân sự).
- Chủ đề 5: Một số cuộc cải cách lớn trong lịch sử Việt Nam (Bài 9: Cải cách Hồ Quý Ly và triều Hồ; Bài 10: Cải cách Lê Thánh Tông thế kỉ XV; Bài 11: Cải cách Minh Mạng nửa đầu thế kỉ XIX; bài học về tinh gọn bộ máy và chống tham nhũng).
- Chủ đề 6: Lịch sử bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông (Bài 12: Vị trí và tầm quan trọng của Biển Đông; Bài 13: Quá trình xác lập và thực thi chủ quyền đối với quần đảo Hoàng Sa và Trường Sa; cơ sở pháp lý UNCLOS 1982, DOC 2002; trách nhiệm thế hệ trẻ).
- 3 Chuyên đề học tập: 11.1 Nghệ thuật truyền thống; 11.2 Chiến tranh và hòa bình TK XX; 11.3 Danh nhân lịch sử Việt Nam.

4. XỬ LÝ ĐỀ THI CHUẨN MA TRẬN BỘ GD&ĐT:
- Nếu là câu hỏi trắc nghiệm 4 lựa chọn: Chỉ rõ đáp án đúng ngay dòng đầu, sau đó giải thích ngắn gọn vì sao đúng và chỉ ra điểm sai của 3 phương án còn lại.
- Nếu là câu hỏi trắc nghiệm Đúng - Sai có đoạn tư liệu: Phân tích từng ý a), b), c), d) rõ ràng là ĐÚNG hay SAI bám sát văn bản ngữ liệu và SGK.
- Nếu là câu hỏi tự luận: Lập dàn ý ý 1, ý 2, ý 3, thang điểm barem dự kiến và cách liên hệ thực tiễn để lấy trọn điểm 10.

5. PHONG CÁCH VÀ XƯNG HÔ:
- Thầy xưng "Thầy" (hoặc "Thầy Dũng") và gọi học sinh là "Em".
- Ngôn từ mực thước, truyền cảm, nhiệt tình, khích lệ tinh thần học tập của học sinh.`;
