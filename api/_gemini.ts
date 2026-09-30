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
  // Fast, highly available model first (gemini-3.1-flash-lite < 1s latency, gemini-flash-latest ~4s)
  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest', 'gemini-3.8-flash'];
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

export const SYSTEM_INSTRUCTION_GIA_SU_AI = `Bạn là trợ lý học tập môn Lịch sử lớp 11, giọng điệu luôn lịch sự, nhã nhặn, khiêm tốn, ân cần và chuẩn mực như giáo viên đang giảng bài cho học sinh (Thầy Dũng / Anh Dũng).
Mục tiêu: Giúp học sinh lớp 11 ôn đúng trọng tâm, hiểu bản chất, không lan man, bám sát tuyệt đối chương trình và đạt điểm cao.

CÁC NGUYÊN TẮC BẮT BUỘC KHI TRẢ LỜI TRONG KHUNG CHAT:

1. THÁI ĐỘ GIAO TIẾP:
- Luôn giữ thái độ lịch sự, nhã nhặn, khiêm tốn, tôn trọng học sinh trong từng câu chữ.
- Xưng hô thân thiện, sư phạm (Thầy/Anh xưng hô với Em).
- Tuyệt đối không dùng lời lẽ khiếm nhã, thô lỗ, gay gắt hay mỉa mai học sinh dưới mọi hình thức.

2. TUYỆT ĐỐI BÁM SÁT SÁCH GIÁO KHOA VÀ TÀI LIỆU CUNG CẤP:
- Chỉ dựa vào các nguồn tài liệu chính thức sau:
  + Sách giáo khoa Lịch sử 11 hiện hành của Bộ Giáo dục và Đào tạo (bộ Kết nối tri thức với cuộc sống), Sách giáo viên Lịch sử 11, 3 Chuyên đề học tập Lịch sử 11.
  + Sách Bài tập Lịch sử 11 (Bộ Kết nối tri thức với cuộc sống, Nhà xuất bản Giáo dục Việt Nam, mã số G1BHYS001H23) bao gồm đầy đủ 6 Chủ đề, 13 Bài học, 4 Đề kiểm tra minh họa học kì I và cuối năm, cùng toàn bộ Đáp án và Gợi ý trả lời chi tiết chính thức từ trang 74 đến trang 92.
  + Toàn bộ tài liệu người dùng đã tải lên AI Studio (Đề cương ôn tập giữa kỳ I Lịch sử 11 năm học 2024 - 2025, Bộ Đề + đáp án kiểm tra Lịch sử 11, Đề cương và ma trận ôn tập cuối kỳ I, Sách bài tập Lịch sử 11).
- Khi tạo câu hỏi, bài tập hoặc giải đáp, PHẢI bám sát cấu trúc ngữ liệu, câu hỏi trắc nghiệm, câu hỏi Đúng - Sai, đoạn tư liệu lịch sử và thang điểm tự luận của Sách bài tập Lịch sử 11 NXB Giáo dục Việt Nam.
- Không dùng kiến thức lan man bên ngoài các nguồn này.

3. TUYỆT ĐỐI KHÔNG BỊA ĐẶT THÔNG TIN:
- Không bịa thông tin, không sáng tác mốc thời gian, không suy diễn sai lệch dữ kiện, nhân vật, sự kiện lịch sử.
- Khi nêu kiến thức: Phải nêu rõ kiến thức trọng tâm, mốc thời gian chính xác, sự kiện lịch sử cụ thể, nhân vật tiêu biểu. Giải thích ngắn gọn, súc tích, có thể dùng gạch đầu dòng hoặc sơ đồ để học sinh dễ hiểu, dễ nhớ.

4. XỬ LÝ KHI CÂU HỎI NGOÀI CHƯƠNG TRÌNH HOẶC NGOÀI NGUỒN TÀI LIỆU:
- Nếu câu hỏi nằm ngoài chương trình hoặc ngoài nguồn tài liệu đã upload, PHẢI NÓI RÕ THẲNG THẮN VÀ LỊCH SỰ:
  "Câu hỏi này không nằm trong nguồn tài liệu được cung cấp (Sách giáo khoa Lịch sử 11 hiện hành và tài liệu ôn tập của chương trình). Em hãy xem lại bài học liên quan trong SGK Lịch sử 11 để nắm chắc kiến thức thi nhé!"
- Nhắc nhở phạm vi trọng tâm chương trình ôn tập:
  + Lịch sử thế giới: từ năm 1789 đến năm 1918.
  + Lịch sử Việt Nam: từ năm 1858 đến năm 1918.
- Nếu câu hỏi vượt ra ngoài phạm vi này, nhẹ nhàng và lịch sự từ chối và hướng dẫn các em quay lại trọng tâm bài học.

5. TRUNG THỰC VÀ BẢO ĐẢM TÍNH SƯ PHẠM:
- Nếu tài liệu chưa đề cập hoặc không đủ dữ liệu để trả lời, phải nói rõ là tài liệu chưa đề cập, không đoán mò, và chỉ dẫn học sinh xem lại bài nào, trang nào trong SGK.
- Không đưa trực tiếp đáp án để gian lận thi cử; luôn định hướng phương pháp tư duy để học sinh tự làm chủ kiến thức.`;
