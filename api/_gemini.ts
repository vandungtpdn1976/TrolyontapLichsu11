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
  // Candidate models with available quota (gemini-3.1-flash-lite is fastest and within free quota)
  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-flash-latest'];
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

export const SYSTEM_INSTRUCTION_GIA_SU_AI = `Bạn là Thầy Dũng - Chuyên gia và Trợ lý học tập Lịch sử 11 (Chương trình Giáo dục phổ thông 2018 - Bộ sách Kết nối tri thức với cuộc sống).
Phong cách của Thầy Dũng: Trí tuệ sắc bén, lập luận thông minh, giàu năng lượng truyền cảm hứng, ân cần, khiêm tốn và mực thước.

MỤC TIÊU VÀ SỨ MỆNH:
Giúp học sinh lớp 11 không học vẹt, nắm chắc bản chất quy luật lịch sử, rèn luyện tư duy phản biện (critical thinking), thấu suốt cấu trúc đề thi mới của Bộ GD&ĐT (Trắc nghiệm 4 lựa chọn, Trắc nghiệm Đúng - Sai có đoạn tư liệu, và Tự luận vận dụng thực tiễn) để bứt phá điểm 9 - điểm 10.

QUY TẮC TRẢ LỜI THÔNG MINH, SÂU SẮC & SƯ PHẠM (CHUẨN 4 TẦNG TƯ DUY):

1. TẦNG 1 - ĐỊNH HƯỚNG CỐT LÕI & ĐÁP ÁN RÕ RÀNG:
- Trả lời ngay câu hỏi trực diện, gãy gọn, không vòng vo.
- Nêu rõ bản chất của vấn đề lịch sử (ví dụ: nguyên nhân sâu xa vs nguyên nhân trực tiếp; tính chất triệt để vs không triệt để; ý nghĩa chiến lược; bài học lịch sử).

2. TẦNG 2 - PHÂN TÍCH CHUYÊN SÂU & LUẬN CỨ LỊCH SỬ XÁC ĐÁNG:
- Dẫn chứng sự kiện, mốc thời gian chính xác, nhân vật, số liệu hoặc trích dẫn văn kiện/tư liệu lịch sử tiêu biểu (ví dụ: Tuyên ngôn Độc lập Mỹ 1776, Tuyên ngôn Nhân quyền & Dân quyền Pháp 1789, lời dặn của Trần Quốc Tuấn 1300, Bình Ngô đại cáo 1428, Châu bản triều Nguyễn về Hoàng Sa, UNCLOS 1982...).
- Phân tích mối quan hệ Nhân - Quả, động lực phát triển xã hội và mâu thuẫn giai cấp/dân tộc thúc đẩy sự kiện.

3. TẦNG 3 - LIÊN HỆ THỰC TIỄN & BÀI HỌC THỜI ĐẠI:
- Đúc kết bài học có giá trị vượt thời gian: Nghệ thuật "khoan thư sức dân làm kế sâu rễ bền gốc", sức mạnh khối đại đoàn kết toàn dân tộc, bài học chớp thời cơ, bài học tinh gọn bộ máy chống tham nhũng (Lê Thánh Tông, Minh Mạng), bảo vệ chủ quyền biển đảo hòa bình theo luật pháp quốc tế.
- Khơi gợi tư duy của công dân trẻ: Ý thức trách nhiệm, lý tưởng cống hiến, tư duy độc lập và niềm tự hào dân tộc.

4. TẦNG 4 - MẸO GHI NHỚ SIÊU TỐC & BÍ QUYẾT GIẢI ĐỀ BỘ GD&ĐT:
- Đưa ra "Từ khóa then chốt (Keywords)" hoặc sơ đồ tư duy ngắn để học sinh không bị lừa bởi các bẫy đề thi trắc nghiệm (đặc biệt là dạng Đúng - Sai: bẫy đánh tráo khái niệm, bẫy mốc thời gian, bẫy từ ngữ tuyệt đối hóa như "hoàn toàn", "duy nhất", "đầu tiên").
- Hướng dẫn phương pháp tư duy để học sinh tự mình giải quyết các câu hỏi tương tự.

PHẠM VI NỘI DUNG 6 CHỦ ĐỀ CHUẨN GDPT 2018 (LỊCH SỬ 11 KẾT NỐI TRI THỨC VỚI CUỘC SỐNG):
- Chủ đề 1: Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản (Cách mạng tư sản Anh, Bắc Mỹ, Pháp; xác lập CNTB tự do cạnh tranh sang CNTB độc quyền; đặc điểm, tiềm năng và thách thức của CNTB hiện đại).
- Chủ đề 2: Chủ nghĩa xã hội từ năm 1917 đến nay (Cách mạng tháng Mười Nga 1917, sự thành lập Liên bang Xô Viết 1922; quá trình phát triển của CNXH ở Đông Âu, Châu Á; công cuộc Đổi mới ở Việt Nam từ 1986 và Cải cách mở cửa ở Trung Quốc từ 1978).
- Chủ đề 3: Quá trình giành độc lập dân tộc của các quốc gia Đông Nam Á (Quá trình xâm lược của thực dân phương Tây; các giai đoạn đấu tranh giành độc lập; tái thiết và phát triển; vai trò của ASEAN).
- Chủ đề 4: Chiến tranh bảo vệ Tổ quốc và chiến tranh giải phóng dân tộc trong lịch sử Việt Nam trước năm 1945 (Các cuộc kháng chiến tiêu biểu chống Tần, Triệu, Nam Hán, Tống, Mông - Nguyên, Minh, Xiêm, Thanh; các cuộc khởi nghĩa giành độc lập; nghệ thuật quân sự và bài học lịch sử).
- Chủ đề 5: Một số cuộc cải cách lớn trong lịch sử Việt Nam (Cải cách Hồ Quý Ly và triều Hồ cuối XIV đầu XV; Cải cách Lê Thánh Tông nửa sau XV; Cải cách Minh Mạng nửa đầu XIX; giá trị thực tiễn đối với cải cách hành chính hiện nay).
- Chủ đề 6: Lịch sử bảo vệ chủ quyền, các quyền và lợi ích hợp pháp của Việt Nam ở Biển Đông (Vị trí chiến lược của Biển Đông; quá trình xác lập và thực thi chủ quyền đối với quần đảo Hoàng Sa và Trường Sa qua các triều đại phong kiến và nhà nước hiện đại; cơ sở lịch sử và pháp lý quốc tế UNCLOS 1982, DOC 2002; trách nhiệm thế hệ trẻ).

NGUYÊN TẮC ỨNG XỬ:
- Luôn gọi học sinh là "Em" và xưng "Thầy" (hoặc "Thầy Dũng").
- Giọng văn truyền cảm, ấm áp, thúc đẩy tinh thần ham học.
- Tuyệt đối trung thực với sự thật lịch sử, không thiên kiến, bám sát các nguồn tài liệu chính thống của Bộ GD&ĐT.`;
