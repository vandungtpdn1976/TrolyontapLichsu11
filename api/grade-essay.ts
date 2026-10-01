import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  generateContentWithRetryAndFallback,
  setCorsHeaders,
  parseRequestBody,
  sendJson,
} from './_gemini';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      return res.status(200).end();
    }
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Phương thức không được hỗ trợ.' });
  }

  try {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      return sendJson(res, 500, { error: MISSING_API_KEY_ERROR });
    }

    const body = await parseRequestBody(req);
    const { question, rubric, studentAnswer, topicTitle } = body;

    if (!studentAnswer || studentAnswer.trim().length < 10) {
      return sendJson(res, 400, {
        error: 'Bài làm quá ngắn để Thầy Dũng chấm điểm. Em hãy viết chi tiết hơn nhé!',
      });
    }

    const prompt = `Bạn là Gia sư AI Lịch sử THPT giàu kinh nghiệm chấm thi học sinh giỏi và thi tốt nghiệp môn Lịch sử 11 GDPT 2018.
Hãy chấm điểm bài tự luận của học sinh dưới đây một cách công tâm, chính xác, khích lệ và chỉ dẫn chi tiết:

[ĐỀ BÀI]:
${question}

[CHỦ ĐỀ]:
${topicTitle || 'Lịch sử 11 GDPT 2018'}

[HƯỚNG DẪN CHẤM & ĐÁP ÁN THAM KHẢO]:
${rubric}

[BÀI LÀM CỦA HỌC SINH]:
${studentAnswer}

Yêu cầu trả về đúng định dạng JSON:
{
  "score": 8.5,
  "maxScore": 10,
  "feedbackSummary": "<Tóm tắt nhận xét tổng quát>",
  "strengths": ["<Điểm mạnh 1>", "<Điểm mạnh 2>"],
  "improvements": ["<Điểm cần bổ sung 1>"],
  "criteriaBreakdown": [
    { "criterion": "Xác định đúng trọng tâm vấn đề & bố cục", "score": 2.0, "max": 2.0, "comment": "<nhận xét>" },
    { "criterion": "Kiến thức lịch sử chính xác, đầy đủ sự kiện, mốc thời gian", "score": 3.0, "max": 3.5, "comment": "<nhận xét>" },
    { "criterion": "Kĩ năng phân tích quan hệ nhân quả & lập luận", "score": 2.0, "max": 2.5, "comment": "<nhận xét>" },
    { "criterion": "Liên hệ thực tiễn, rút ra bài học lịch sử", "score": 1.5, "max": 2.0, "comment": "<nhận xét>" }
  ],
  "modelAnswerStructured": {
    "moVanDe": "<Mở vấn đề>",
    "noiDungChinh": "<Nội dung chính>",
    "phanTich": "<Phân tích>",
    "danhGia": "<Đánh giá>",
    "ketLuan": "<Kết luận>"
  },
  "teacherAdvice": "<Lời khuyên của Thầy Dũng>"
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
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      resultJson = JSON.parse(cleaned);
    }

    return sendJson(res, 200, resultJson);
  } catch (error: any) {
    console.error('Error in /api/grade-essay:', error);
    const rawError = String(error?.message || '');
    let cleanMessage = 'Hệ thống đang chịu tải cao tạm thời. Em vui lòng bấm chấm lại sau vài giây nhé!';
    if (
      rawError &&
      !rawError.includes('503') &&
      !rawError.includes('high demand') &&
      !rawError.includes('429') &&
      !rawError.includes('{"error"')
    ) {
      cleanMessage = rawError;
    }
    return sendJson(res, 500, { error: cleanMessage });
  }
}
