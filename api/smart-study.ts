import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  generateContentWithRetryAndFallback,
  setCorsHeaders,
  parseRequestBody,
  safeJsonParse,
} from './_gemini';
import { PRESET_SMART_STUDY_DATA } from '../src/data/smartStudyTopics';

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

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Phương thức không được hỗ trợ.' });
  }

  try {
    const body = await parseRequestBody(req);
    const { topicTitle, lessonName, studentKnowledgeInput, focusLevel } = body;

    const inputContext = studentKnowledgeInput?.trim() || '';
    const mainTopic = topicTitle?.trim() || (inputContext ? 'Kiến thức theo yêu cầu học sinh' : 'Lịch sử 11 GDPT 2018');
    const mainLesson = lessonName?.trim() || (inputContext ? inputContext.slice(0, 80) : mainTopic);

    // If no custom student text provided, instantly return the rich verified preset data
    if (!inputContext) {
      const preset = findPresetTopic(mainTopic, mainLesson);
      if (preset) {
        return res.status(200).json(preset);
      }
    }

    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      const preset = findPresetTopic(mainTopic, mainLesson);
      return res.status(200).json({
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
      return res.status(200).json(parsed);
    }

    const fallback = findPresetTopic(mainTopic, mainLesson);
    return res.status(200).json(fallback);
  } catch (error: any) {
    console.error('Error in /api/smart-study:', error);
    // On any error, return matching preset data with status 200 so Vercel client never crashes
    const fallback = PRESET_SMART_STUDY_DATA['chu-de-1'];
    return res.status(200).json(fallback);
  }
}
