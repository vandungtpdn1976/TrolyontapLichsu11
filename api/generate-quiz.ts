import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  generateContentWithRetryAndFallback,
  setCorsHeaders,
  parseRequestBody,
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
    const { topic, type } = body;

    const prompt = `Bạn là Thầy Dũng. Hãy tạo 1 bài luyện tập môn Lịch sử 11 GDPT 2018 về chủ đề: "${topic}".
Dạng bài yêu cầu: ${type === 'true_false' ? 'Trắc nghiệm Đúng - Sai (1 đoạn tư liệu và 4 ý a, b, c, d)' : type === 'essay' ? 'Tự luận vận dụng' : 'Trắc nghiệm nhiều lựa chọn (3 câu hỏi A, B, C, D)'}.

Trả về kết quả dưới định dạng JSON:
${
  type === 'true_false'
    ? `{
  "type": "true_false",
  "topic": "${topic}",
  "passage": "<Đoạn tư liệu lịch sử>",
  "source": "<Nguồn trích dẫn>",
  "statements": [
    { "id": "a", "text": "<nhận định a>", "isCorrect": true, "explanation": "<giải thích>" },
    { "id": "b", "text": "<nhận định b>", "isCorrect": false, "explanation": "<giải thích>" },
    { "id": "c", "text": "<nhận định c>", "isCorrect": true, "explanation": "<giải thích>" },
    { "id": "d", "text": "<nhận định d>", "isCorrect": false, "explanation": "<giải thích>" }
  ]
}`
    : type === 'essay'
    ? `{
  "type": "essay",
  "topic": "${topic}",
  "question": "<Câu hỏi tự luận>",
  "guidance": "<Gợi ý các ý chính>",
  "rubric": "<Thang điểm chi tiết>"
}`
    : `{
  "type": "multiple_choice",
  "topic": "${topic}",
  "questions": [
    {
      "question": "<Nội dung câu hỏi>",
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctIndex": 0,
      "explanation": "<Giải thích chi tiết>"
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

    const parsed = JSON.parse(response.text?.trim() || '{}');
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.error('Error in /api/generate-quiz:', error);
    const rawError = String(error?.message || '');
    let cleanMessage = 'Hệ thống đang chịu tải cao tạm thời. Em vui lòng thử lại sau vài giây nhé!';
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
