import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  generateContentWithRetryAndFallback,
  setCorsHeaders,
  parseRequestBody,
  safeJsonParse,
} from './_gemini';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
  }

  try {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return res.status(500).json({ error: MISSING_API_KEY_ERROR });
    }

    const body = parseRequestBody(req);
    const { topicTitle, lessonName, studentKnowledgeInput, focusLevel } = body;

    const inputContext = studentKnowledgeInput?.trim() || '';
    const mainTopic = topicTitle?.trim() || (inputContext ? 'Kiến thức theo yêu cầu học sinh' : 'Lịch sử 11 GDPT 2018');
    const mainLesson = lessonName?.trim() || (inputContext ? inputContext.slice(0, 80) : mainTopic);

    const prompt = `Bạn là Thầy Dũng - Giáo viên Lịch sử THPT giàu kinh nghiệm luyện thi tốt nghiệp và bồi dưỡng học sinh giỏi môn Lịch sử 11 (Chương trình GDPT 2018).
Học sinh vừa gửi yêu cầu để Gia sư AI soạn kiến thức ôn tập:

${inputContext ? `[NỘI DUNG / GHI CHÉP / CHỦ ĐỀ HỌC SINH NHẬP]:\n"""\n${inputContext}\n"""\n` : ''}
[CHỦ ĐỀ DỰ KIẾN]: "${mainTopic}"
[BÀI HỌC DỰ KIẾN]: "${mainLesson}"
${focusLevel ? `[TRỌNG TÂM CẤP ĐỘ ƯU TIÊN]: ${focusLevel}` : ''}

YÊU CẦU ĐẶC BIỆT CỦA HỌC SINH VÀ GIÁO VIÊN:
Học sinh yêu cầu: "Gia sư AI soạn kiến thức ĐÚNG TRỌNG TÂM, CHI TIẾT CỤ THỂ, ở các cấp độ BIẾT, HIỂU, VẬN DỤNG".
Tuyệt đối không viết lan man, không dùng từ ngữ mơ hồ, không bịa đặt sự kiện, bám sát SGK Lịch sử 11 (bộ Kết nối tri thức với cuộc sống / GDPT 2018).

BẮT BUỘC PHÂN ĐỊNH RÕ RÀNG VÀ SÂU SẮC 3 CẤP ĐỘ NHẬN THỨC:

1. CẤP ĐỘ 1: BIẾT (NHẬN BIẾT - MỨC 1):
- Nêu rõ Mốc thời gian then chốt, Nhân vật lịch sử tiêu biểu, Sự kiện lịch sử, Khái niệm cơ bản.
- Mỗi ý có title, detail, highlight.
- 2-3 mẹo ghi nhớ nhanh (tips).

2. CẤP ĐỘ 2: HIỂU (THÔNG HIỂU - MỨC 2):
- Phân tích bản chất, nguyên nhân sâu xa & duyên cớ trực tiếp, lý giải thắng lợi/thất bại, bẫy đề thi.

3. CẤP ĐỘ 3: VẬN DỤNG (MỨC 3):
- Đúc kết bài học lịch sử đắt giá, liên hệ thực tiễn Việt Nam hôm nay, phương pháp giải câu hỏi mở.

KÈM THEO:
- 3 câu hỏi trắc nghiệm chuẩn mực theo 3 cấp độ (nhan_biet, thong_hieu, van_dung) kèm đáp án và giải thích chi tiết.
- Lời khuyên ân cần của Thầy Dũng.

Trả về đúng định dạng JSON:
{
  "topicTitle": "${mainTopic}",
  "lessonName": "${mainLesson}",
  "inputContentSummary": "<Tóm tắt 1-2 câu>",
  "levelsKnowledge": {
    "nhanBiet": {
      "level": "nhan_biet",
      "levelName": "Cấp độ 1: BIẾT (Nhận biết - Dữ kiện cốt lõi)",
      "badge": "Mức 1",
      "summary": "<Tóm tắt>",
      "points": [{ "title": "<...>", "detail": "<...>", "highlight": "<...>" }],
      "tips": ["<...>"]
    },
    "thongHieu": {
      "level": "thong_hieu",
      "levelName": "Cấp độ 2: HIỂU (Thông hiểu - Bản chất & Nhân quả)",
      "badge": "Mức 2",
      "summary": "<Tóm tắt>",
      "points": [{ "title": "<...>", "detail": "<...>", "highlight": "<...>" }],
      "tips": ["<...>"]
    },
    "vanDung": {
      "level": "van_dung",
      "levelName": "Cấp độ 3: VẬN DỤNG (Liên hệ & Bài học lịch sử)",
      "badge": "Mức 3",
      "summary": "<Tóm tắt>",
      "points": [{ "title": "<...>", "detail": "<...>", "highlight": "<...>" }],
      "tips": ["<...>"]
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
  "causeAndEffect": [{ "cause": "<...>", "event": "<...>", "result": "<...>", "significance": "<...>", "impact": "<...>" }],
  "comparison": {
    "title": "<Tên bảng so sánh>",
    "target1Name": "<Tên đối tượng 1>",
    "target2Name": "<Tên đối tượng 2>",
    "rows": [{ "aspect": "<...>", "target1": "<...>", "target2": "<...>" }]
  },
  "commonMistakes": [{ "trap": "<...>", "truth": "<...>", "tip": "<...>" }],
  "mindmapSteps": ["1. ...", "2. ...", "3. ..."],
  "threeLevelQuestions": [
    { "level": "nhan_biet", "question": "<...>", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctIndex": 0, "explanation": "<...>" },
    { "level": "thong_hieu", "question": "<...>", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctIndex": 1, "explanation": "<...>" },
    { "level": "van_dung", "question": "<...>", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correctIndex": 2, "explanation": "<...>" }
  ],
  "teacherAdvice": "<Lời khuyên của Thầy Dũng>"
}`;

    const response = await generateContentWithRetryAndFallback({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.35,
      },
    });

    const parsed = safeJsonParse(response.text || '', {});
    if (!parsed || Object.keys(parsed).length === 0) {
      throw new Error('Không thể phân tích nội dung ôn tập thông minh từ AI. Vui lòng thử lại nhé!');
    }
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Error in /api/smart-study:', error);
    const rawError = String(error?.message || '');
    let cleanMessage = 'Hệ thống đang quá tải tạm thời. Em vui lòng thử lại sau vài giây nhé!';
    if (
      rawError &&
      !rawError.includes('503') &&
      !rawError.includes('high demand') &&
      !rawError.includes('429') &&
      !rawError.includes('{"error"')
    ) {
      cleanMessage = rawError;
    }
    return res.status(500).json({ error: cleanMessage });
  }
}
