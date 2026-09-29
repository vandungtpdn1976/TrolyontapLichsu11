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
    const { topic, type, documentText, level } = body;

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
