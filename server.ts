import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PRESET_SMART_STUDY_DATA } from './src/data/smartStudyTopics';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Enable CORS and preflight handling for all environments (Vercel & AI Studio)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Helper: Lấy Gemini API Key linh hoạt từ nhiều biến môi trường phổ biến trên Vercel / AI Studio
function getGeminiApiKey(): string {
  return (
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.API_KEY ||
    ''
  );
}

// Khởi tạo Gemini client linh hoạt với User-Agent chuẩn
function getGeminiClient(): GoogleGenAI {
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

const MISSING_API_KEY_ERROR =
  'Chưa tìm thấy GEMINI_API_KEY trên môi trường chạy. Nếu em hoặc thầy/cô đang mở web trên Vercel, vui lòng vào Vercel Dashboard -> Chọn Project -> Cài đặt (Settings) -> Environment Variables -> Thêm biến "GEMINI_API_KEY" với API key từ Google AI Studio rồi Redeploy lại nhé!';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function safeJsonParse<T = any>(text: string, fallback: T = {} as T): T {
  if (!text || typeof text !== 'string') return fallback;
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    let cleaned = trimmed.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    try {
      return JSON.parse(cleaned);
    } catch {
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

// Helper: Tự động chuyển đổi mô hình dự phòng nhanh chóng
async function generateContentWithRetryAndFallback(params: {
  contents: any;
  config?: any;
}) {
  const ai = getGeminiClient();
  // Fast, highly available model first: gemini-3.1-flash-lite (<1s) -> gemini-flash-latest
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
    }
  }

  throw lastError;
}

const SYSTEM_INSTRUCTION_GIA_SU_AI = `Bạn là Thầy Dũng - Chuyên gia và Trợ lý học tập Lịch sử 11 (Chương trình Giáo dục phổ thông 2018 - Bộ sách Kết nối tri thức với cuộc sống).
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

// Tạo apiRouter để phục vụ đồng bộ cả khi có prefix /api hoặc không có prefix (hỗ trợ hoàn hảo Vercel Serverless Function & Express)
const apiRouter = express.Router();

// Endpoint kiểm tra sức khỏe và đồng bộ kết nối giữa AI Studio và Vercel
apiRouter.get('/health', (_req, res) => {
  const hasKey = Boolean(getGeminiApiKey());
  return res.json({
    status: 'ok',
    environment: process.env.VERCEL ? 'vercel' : 'local_or_aistudio',
    hasGeminiKey: hasKey,
    timestamp: new Date().toISOString(),
    message: hasKey
      ? 'Hệ thống AI Sử Vàng 11 sẵn sàng hoạt động.'
      : 'Cảnh báo: Chưa tìm thấy GEMINI_API_KEY trên môi trường này.',
  });
});

// API: Chat with Gia sư AI Thầy Dũng
apiRouter.post('/chat', async (req, res) => {
  try {
    const { messages, context, actionType } = req.body;

    if (!getGeminiApiKey()) {
      return res.status(200).json({
        reply: `Chào em! Hiện tại trên môi trường Vercel chưa được kết nối với biến môi trường **GEMINI_API_KEY**.\n\n👉 **Hướng dẫn kích hoạt Gia sư AI trên Vercel**:\n1. Mở [Vercel Dashboard](https://vercel.com/dashboard) và chọn dự án Sử Vàng 11.\n2. Vào tab **Settings** -> chọn menu **Environment Variables**.\n3. Thêm biến mới: Key là \`GEMINI_API_KEY\` và Value là API Key của bạn từ Google AI Studio.\n4. Bấm **Save**, sau đó sang tab **Deployments** bấm dấu 3 chấm (...) ở bản deploy mới nhất -> chọn **Redeploy** là trò chuyện được ngay nhé!`,
      });
    }

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Dữ liệu tin nhắn không hợp lệ.' });
    }

    // Format conversation history for Gemini
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    let extendedInstruction = SYSTEM_INSTRUCTION_GIA_SU_AI;
    if (context) {
      extendedInstruction += `\n\n[Bối cảnh bài học/câu hỏi hiện tại]:\n${context}`;
    }
    if (actionType) {
      extendedInstruction += `\n\n[Chế độ người học vừa kích hoạt]: ${actionType}`;
    }

    const response = await generateContentWithRetryAndFallback({
      contents: contents,
      config: {
        systemInstruction: extendedInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'Thầy xin lỗi, kết nối bị gián đoạn đôi chút. Em gửi lại câu hỏi nhé!';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(200).json({
      reply:
        'Thầy Dũng xin chào em! Hệ thống AI đang tạm thời có lượng truy cập lớn trong vài giây. Em hãy bấm nút "🔄 Thử lại câu hỏi này ngay" bên dưới giúp Thầy nhé, hoặc hỏi Thầy về các bài học trọng tâm Lịch sử 11 (Cách mạng tư sản, Chủ nghĩa tư bản, Liên bang Xô Viết, Phong trào Cần vương...)!',
    });
  }
});

// API: Chấm điểm bài Tự luận Lịch sử 11
apiRouter.post('/grade-essay', async (req, res) => {
  try {
    const { question, rubric, studentAnswer, topicTitle } = req.body;

    if (!getGeminiApiKey()) {
      return res.status(500).json({ error: MISSING_API_KEY_ERROR });
    }

    if (!studentAnswer || studentAnswer.trim().length < 10) {
      return res.status(400).json({ error: 'Bài làm quá ngắn để Thầy Dũng chấm điểm. Em hãy viết chi tiết hơn nhé!' });
    }

    const prompt = `Bạn là Gia sư AI Lịch sử THPT giàu kinh nghiệm chấm thi học sinh giỏi và thi tốt nghiệp môn Lịch sử 11 GDPT 2018.
Hãy chấm điểm bài tự luận của học sinh dưới đây một cách công tâm, chính xác, khích lệ và chỉ dẫn chi tiết theo 4 bước chuẩn mực:
Bước 3: Chấm bài đánh giá các năng lực: Kiến thức, Tính chính xác lịch sử, Bố cục, Khả năng phân tích, Khả năng lập luận, Khả năng liên hệ, Khả năng sử dụng dẫn chứng, Trả lời đúng trọng tâm.
Bước 4: Đưa đáp án tham khảo chuẩn mực theo cấu trúc: Mở vấn đề → Nội dung chính → Phân tích → Nhận xét/đánh giá → Kết luận (Không yêu cầu học sinh học thuộc nguyên văn).

[ĐỀ BÀI]:
${question}

[CHỦ ĐỀ]:
${topicTitle || 'Lịch sử 11 GDPT 2018'}

[HƯỚNG DẪN CHẤM & ĐÁP ÁN THAM KHẢO]:
${rubric}

[BÀI LÀM CỦA HỌC SINH]:
${studentAnswer}

Yêu cầu trả về đúng định dạng JSON thuần túy (không bọc mã markdown code block thừa, chỉ JSON):
{
  "score": <số thực từ 0 đến 10, làm tròn 0.25 điểm>,
  "maxScore": 10,
  "feedbackSummary": "<Tóm tắt nhận xét tổng quát của Gia sư AI>",
  "strengths": ["<Điểm mạnh 1>", "<Điểm mạnh 2>"],
  "improvements": ["<Điểm cần bổ sung/sửa 1>", "<Điểm cần bổ sung/sửa 2>"],
  "criteriaBreakdown": [
    {
      "criterion": "Xác định đúng trọng tâm vấn đề & bố cục bài làm",
      "score": <điểm đạt>,
      "max": 2.0,
      "comment": "<nhận xét>"
    },
    {
      "criterion": "Kiến thức lịch sử chính xác, đầy đủ sự kiện, mốc thời gian, nhân vật",
      "score": <điểm đạt>,
      "max": 3.5,
      "comment": "<nhận xét>"
    },
    {
      "criterion": "Kĩ năng phân tích quan hệ nhân quả & lập luận logic",
      "score": <điểm đạt>,
      "max": 2.5,
      "comment": "<nhận xét>"
    },
    {
      "criterion": "Liên hệ thực tiễn, rút ra bài học lịch sử sâu sắc",
      "score": <điểm đạt>,
      "max": 2.0,
      "comment": "<nhận xét>"
    }
  ],
  "modelAnswerStructured": {
    "moVanDe": "<Mở vấn đề>",
    "noiDungChinh": "<Nội dung chính và các sự kiện lịch sử>",
    "phanTich": "<Phân tích bản chất và mối quan hệ nhân quả>",
    "danhGia": "<Nhận xét, đánh giá và ý nghĩa>",
    "ketLuan": "<Kết luận và bài học lịch sử rút ra>"
  },
  "teacherAdvice": "<Lời khuyên và động viên tâm huyết của Thầy Dũng>"
}`;

    const response = await generateContentWithRetryAndFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const responseText = response.text?.trim() || '{}';
    let resultJson;
    try {
      resultJson = JSON.parse(responseText);
    } catch {
      // Clean up markdown if any
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      resultJson = JSON.parse(cleaned);
    }

    return res.json(resultJson);
  } catch (error: any) {
    console.error('Error in /api/grade-essay:', error);
    const rawError = String(error?.message || '');
    let cleanMessage = 'Hệ thống đang chịu tải cao tạm thời. Em vui lòng bấm chấm lại sau vài giây nhé!';
    if (rawError && !rawError.includes('503') && !rawError.includes('high demand') && !rawError.includes('429') && !rawError.includes('{"error"')) {
      cleanMessage = rawError;
    }
    return res.status(500).json({
      error: cleanMessage,
    });
  }
});

// API: Tạo đề luyện tập bám sát tư liệu từ AI Thầy Dũng
apiRouter.post('/generate-quiz', async (req, res) => {
  try {
    const { topic, type, documentText, level } = req.body;
    if (!getGeminiApiKey()) {
      return res.status(500).json({ error: MISSING_API_KEY_ERROR });
    }

    const sourceMaterialInstruction = documentText && documentText.trim().length > 10
      ? `ĐOẠN TƯ LIỆU DO NGƯỜI DÙNG CUNG CẤP:\n"""\n${documentText.trim()}\n"""\n\nYÊU CẦU ĐẶC BIỆT BẮT BUỘC:\n- BẮT BUỘC BÁM SÁT 100% NỘI DUNG TƯ LIỆU ĐƯỢC GỬI Ở TRÊN.\n- Mọi câu hỏi, các phương án lựa chọn, các nhận định Đúng/Sai và giải thích PHẢI được trích xuất hoặc suy luận trực tiếp từ đoạn tư liệu này.\n- Tuyệt đối không bịa đặt sự kiện, không đưa thông tin ngoài lề không liên quan.`
      : `CHỦ ĐỀ LỊCH SỬ 11:\n"${topic || 'Cách mạng tư sản và sự phát triển của CNTB'}"\n\nYÊU CẦU: Trích dẫn 1 đoạn tư liệu chuẩn mực từ Sách giáo khoa hoặc Sách bài tập Lịch sử 11 Kết nối tri thức NXBGDVN có ghi rõ nguồn trích, và tạo bài tập bám sát tuyệt đối nội dung tư liệu đó.`;

    const prompt = `Bạn là Thầy Dũng - Chuyên gia luyện thi Lịch sử 11 GDPT 2018.
Nhiệm vụ: Tạo 1 bài tập lịch sử 11 chất lượng cao, bám sát cấu trúc đề thi mới nhất của Bộ GD&ĐT.

${sourceMaterialInstruction}

Dạng bài yêu cầu: ${
  type === 'true_false'
    ? 'Dạng Đúng - Sai theo format mới của Bộ GD&ĐT (gồm 1 đoạn tư liệu chính xác và 4 mệnh đề a, b, c, d để học sinh đánh giá Đúng hoặc Sai)'
    : type === 'essay'
    ? 'Dạng Tự luận vận dụng phân tích tư liệu (1 câu hỏi tự luận hay, gợi ý các ý chính, bài làm mẫu và rubric biểu điểm)'
    : 'Dạng Trắc nghiệm 4 lựa chọn (3 câu hỏi trắc nghiệm A, B, C, D chuyên sâu khai thác tư liệu kèm giải thích chi tiết và phân tích bẫy)'
}.
Mức độ nhận thức ưu tiên: ${level || 'Thông hiểu và Vận dụng'}.

Trả về kết quả DUY NHẤT dưới định dạng JSON (không có lời dẫn ngoài markdown JSON):
${
  type === 'true_false'
    ? `{
  "type": "true_false",
  "topic": "${topic || 'Lịch sử 11'}",
  "lessonName": "<Tên bài học liên quan>",
  "title": "<Tiêu đề ngắn gọn về tư liệu>",
  "passage": "<Nội dung đoạn tư liệu lịch sử được trích dẫn>",
  "source": "<Nguồn trích dẫn uy tín>",
  "statements": [
    { "id": "a", "text": "<Mệnh đề a>", "isCorrect": true, "explanation": "<Giải thích vì sao đúng dựa vào tư liệu>" },
    { "id": "b", "text": "<Mệnh đề b>", "isCorrect": false, "explanation": "<Giải thích vì sao sai, chỉ rõ điểm sai so với tư liệu>", "trapTip": "<Điểm bẫy dễ nhầm>" },
    { "id": "c", "text": "<Mệnh đề c>", "isCorrect": true, "explanation": "<Giải thích vì sao đúng dựa vào tư liệu>" },
    { "id": "d", "text": "<Mệnh đề d>", "isCorrect": false, "explanation": "<Giải thích vì sao sai>", "trapTip": "<Điểm bẫy dễ nhầm>" }
  ],
  "trapAlert": "<Cảnh báo các bẫy thường gặp trong đoạn tư liệu này>",
  "thayDungAnalysis": "<Lời dặn dò tâm huyết của Thầy Dũng hướng dẫn học sinh phương pháp phân tích tư liệu>"
}`
    : type === 'essay'
    ? `{
  "type": "essay",
  "topic": "${topic || 'Lịch sử 11'}",
  "lessonName": "<Tên bài học liên quan>",
  "title": "<Tiêu đề câu hỏi tự luận>",
  "passage": "<Đoạn tư liệu làm ngữ liệu phân tích>",
  "question": "<Câu hỏi tự luận vận dụng bám sát tư liệu>",
  "guidance": [
    "<Gợi ý ý chính 1>",
    "<Gợi ý ý chính 2>",
    "<Gợi ý ý chính 3>",
    "<Bài học liên hệ thực tiễn hiện nay>"
  ],
  "modelAnswer": "<Bài làm mẫu chuẩn điểm 10 đầy đủ lập luận>",
  "rubricCriteria": [
    { "criterion": "<Tiêu chí 1: Khai thác đúng dữ liệu tư liệu>", "maxScore": 0.75 },
    { "criterion": "<Tiêu chí 2: Phân tích bản chất lịch sử>", "maxScore": 0.75 },
    { "criterion": "<Tiêu chí 3: Rút ra bài học / liên hệ thực tế>", "maxScore": 0.5 }
  ]
}`
    : `{
  "type": "multiple_choice",
  "topic": "${topic || 'Lịch sử 11'}",
  "passage": "<Đoạn tư liệu làm ngữ liệu trích dẫn>",
  "source": "<Nguồn trích dẫn tư liệu>",
  "questions": [
    {
      "id": "mc-gen-1",
      "question": "<Nội dung câu hỏi 1 khai thác tư liệu>",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "level": "thong_hieu",
      "explanation": "<Giải thích chi tiết căn cứ vào tư liệu>",
      "optionsAnalysis": [
        "A: ĐÚNG - ...",
        "B: SAI - ...",
        "C: SAI - ...",
        "D: SAI - ..."
      ],
      "trapTip": "<Bẫy trắc nghiệm cần lưu ý>",
      "thayDungAdvice": "<Lời khuyên của Thầy Dũng>"
    },
    {
      "id": "mc-gen-2",
      "question": "<Nội dung câu hỏi 2>",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 1,
      "level": "van_dung",
      "explanation": "<Giải thích>",
      "optionsAnalysis": ["A: SAI - ...", "B: ĐÚNG - ...", "C: SAI - ...", "D: SAI - ..."],
      "trapTip": "<Bẫy>",
      "thayDungAdvice": "<Lời khuyên>"
    },
    {
      "id": "mc-gen-3",
      "question": "<Nội dung câu hỏi 3>",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 2,
      "level": "thong_hieu",
      "explanation": "<Giải thích>",
      "optionsAnalysis": ["A: SAI - ...", "B: SAI - ...", "C: ĐÚNG - ...", "D: SAI - ..."],
      "trapTip": "<Bẫy>",
      "thayDungAdvice": "<Lời khuyên>"
    }
  ]
}`
}`;

    const response = await generateContentWithRetryAndFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.5,
      },
    });

    const parsed = safeJsonParse(response.text || '', {});
    if (!parsed || Object.keys(parsed).length === 0) {
      throw new Error('Không thể phân tích kết quả bài tập từ AI. Vui lòng thử lại sau vài giây nhé!');
    }
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-quiz:', error);
    const rawError = String(error?.message || '');
    let cleanMessage = 'Hệ thống đang chịu tải cao tạm thời. Em vui lòng thử lại sau vài giây nhé!';
    if (rawError && !rawError.includes('503') && !rawError.includes('high demand') && !rawError.includes('429') && !rawError.includes('{"error"')) {
      cleanMessage = rawError;
    }
    return res.status(500).json({ error: cleanMessage });
  }
});

function findPresetTopic(topicTitle: string, lessonName: string): any {
  const query = `${topicTitle || ''} ${lessonName || ''}`.toLowerCase();
  for (const [key, data] of Object.entries(PRESET_SMART_STUDY_DATA)) {
    if (
      query.includes(key) ||
      (data.topicTitle && query.includes(data.topicTitle.toLowerCase())) ||
      (data.topicTitle && data.topicTitle.toLowerCase().includes(query)) ||
      (data.lessonName && query.includes(data.lessonName.toLowerCase())) ||
      (data.lessonName && data.lessonName.toLowerCase().includes(query))
    ) {
      return data;
    }
  }

  if (query.includes('tư sản') || query.includes('chủ nghĩa tư bản') || query.includes('chủ đề 1') || query.includes('bài 1') || query.includes('bài 2')) return PRESET_SMART_STUDY_DATA['chu-de-1'];
  if (query.includes('xô viết') || query.includes('chủ nghĩa xã hội') || query.includes('cnxh') || query.includes('chủ đề 2')) return PRESET_SMART_STUDY_DATA['chu-de-2'];
  if (query.includes('đông nam á') || query.includes('asean') || query.includes('chủ đề 3')) return PRESET_SMART_STUDY_DATA['chu-de-3'];
  if (query.includes('bảo vệ tổ quốc') || query.includes('chiến tranh') || query.includes('chủ đề 4')) return PRESET_SMART_STUDY_DATA['chu-de-4'];
  if (query.includes('cải cách') || query.includes('hồ quý ly') || query.includes('minh mạng') || query.includes('chủ đề 5')) return PRESET_SMART_STUDY_DATA['chu-de-5'];
  if (query.includes('biển đông') || query.includes('chủ quyền') || query.includes('chủ đề 6')) return PRESET_SMART_STUDY_DATA['chu-de-6'];

  return PRESET_SMART_STUDY_DATA['chu-de-1'];
}

// API: Chế độ ôn tập thông minh (Smart Study) - Gia sư AI soạn kiến thức trọng tâm, cụ thể theo 3 cấp độ (Biết, Hiểu, Vận dụng)
apiRouter.post('/smart-study', async (req, res) => {
  try {
    const { topicTitle, lessonName, studentKnowledgeInput, focusLevel } = req.body;

    const inputContext = studentKnowledgeInput?.trim() || '';
    const mainTopic = topicTitle?.trim() || (inputContext ? 'Kiến thức theo yêu cầu học sinh' : 'Lịch sử 11 GDPT 2018');
    const mainLesson = lessonName?.trim() || (inputContext ? inputContext.slice(0, 80) : mainTopic);

    // If no custom student text provided, instantly return the rich verified preset data
    if (!inputContext) {
      const preset = findPresetTopic(mainTopic, mainLesson);
      if (preset) {
        return res.json(preset);
      }
    }

    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      const preset = findPresetTopic(mainTopic, mainLesson);
      return res.json({
        ...preset,
        teacherAdvice:
          'Chào em! Hệ thống đang hiển thị kiến thức chuẩn từ Sách giáo khoa Lịch sử 11 Kết nối tri thức. Nếu Thầy/Cô hoặc em muốn phân tích ghi chép tùy chỉnh bằng AI trên Vercel, vui lòng cấu hình biến GEMINI_API_KEY trong Project Settings -> Environment Variables nhé!',
      });
    }

    const prompt = `Bạn là Thầy Dũng - Giáo viên Lịch sử THPT (Chương trình GDPT 2018).
Học sinh yêu cầu: Soạn kiến thức cô đọng, súc tích, ĐÚNG TRỌNG TÂM ở 3 cấp độ: BIẾT, HIỂU, VẬN DỤNG.
Bám sát SGK Lịch sử 11 Kết nối tri thức. Viết ngắn gọn, trực diện, không dài dòng.

[CHỦ ĐỀ]: "${mainTopic}"
[BÀI HỌC]: "${mainLesson}"
${inputContext ? `[GHI CHÉP HỌC SINH]:\n"""\n${inputContext}\n"""\n` : ''}
${focusLevel ? `[TRỌNG TÂM CẤP ĐỘ]: ${focusLevel}` : ''}

Trả về DUY NHẤT định dạng JSON:
{
  "topicTitle": "${mainTopic}",
  "lessonName": "${mainLesson}",
  "inputContentSummary": "<Tóm tắt 1 câu>",
  "levelsKnowledge": {
    "nhanBiet": {
      "level": "nhan_biet",
      "levelName": "Cấp độ 1: BIẾT (Nhận biết)",
      "badge": "Mức 1",
      "summary": "<Tóm tắt>",
      "points": [{ "title": "<Tiêu đề>", "detail": "<1 câu chi tiết>", "highlight": "<Từ khóa>" }],
      "tips": ["<1 mẹo nhớ nhanh>"]
    },
    "thongHieu": {
      "level": "thong_hieu",
      "levelName": "Cấp độ 2: HIỂU (Thông hiểu)",
      "badge": "Mức 2",
      "summary": "<Tóm tắt>",
      "points": [{ "title": "<Tiêu đề>", "detail": "<1 câu bản chất>", "highlight": "<Từ khóa>" }],
      "tips": ["<1 mẹo suy luận>"]
    },
    "vanDung": {
      "level": "van_dung",
      "levelName": "Cấp độ 3: VẬN DỤNG",
      "badge": "Mức 3",
      "summary": "<Tóm tắt>",
      "points": [{ "title": "<Tiêu đề>", "detail": "<1 câu bài học/liên hệ>", "highlight": "<Từ khóa>" }],
      "tips": ["<1 mẹo vận dụng>"]
    }
  },
  "coreKnowledge": ["<Ý cốt lõi 1>", "<Ý cốt lõi 2>"],
  "keywords": {
    "timeline": ["<Mốc 1>"],
    "characters": ["<Nhân vật 1>"],
    "events": ["<Sự kiện 1>"],
    "locations": ["<Địa danh 1>"],
    "documents": ["<Văn kiện 1>"],
    "terms": ["<Khái niệm 1>"]
  },
  "causeAndEffect": [{ "cause": "<Nguyên nhân>", "event": "<Sự kiện>", "result": "<Kết quả>", "significance": "<Ý nghĩa>", "impact": "<Tác động>" }],
  "comparison": {
    "title": "<Tên bảng so sánh>",
    "target1Name": "<Đối tượng 1>",
    "target2Name": "<Đối tượng 2>",
    "rows": [{ "aspect": "<Tiêu chí>", "target1": "<Nội dung 1>", "target2": "<Nội dung 2>" }]
  },
  "commonMistakes": [{ "trap": "<Bẫy>", "truth": "<Bản chất>", "tip": "<Mẹo tránh>" }],
  "mindmapSteps": ["1. ...", "2. ...", "3. ..."],
  "threeLevelQuestions": [
    { "level": "nhan_biet", "question": "<Câu hỏi 1>", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctIndex": 0, "explanation": "<Giải thích ngắn>" },
    { "level": "thong_hieu", "question": "<Câu hỏi 2>", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctIndex": 1, "explanation": "<Giải thích ngắn>" },
    { "level": "van_dung", "question": "<Câu hỏi 3>", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctIndex": 2, "explanation": "<Giải thích ngắn>" }
  ],
  "teacherAdvice": "<Lời khuyên ân cần của Thầy Dũng>"
}`;

    const response = await generateContentWithRetryAndFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const parsed = safeJsonParse(response.text || '', {});
    if (parsed && Object.keys(parsed).length > 0) {
      return res.json(parsed);
    }

    const fallback = findPresetTopic(mainTopic, mainLesson);
    return res.json(fallback);
  } catch (error: any) {
    console.error('Error in /api/smart-study:', error);
    const fallback = PRESET_SMART_STUDY_DATA['chu-de-1'];
    return res.json(fallback);
  }
});

// Gắn router vào cả /api và root để mọi yêu cầu (dù qua rewrite Vercel hay trực tiếp Express) đều nhận diện chính xác
app.use('/api', apiRouter);
app.use(apiRouter);

// Serve frontend in dev (via vite middleware) or production
async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production' && !process.env.VERCEL;

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server Sử Vàng 11 đang chạy tại http://0.0.0.0:${PORT}`);
  });
}

// Khởi động server độc lập trong môi trường local hoặc AI Studio (không lắng nghe port khi chạy dưới dạng Vercel Serverless Function)
if (!process.env.VERCEL) {
  startServer();
}

export default app;

