import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  SYSTEM_INSTRUCTION_GIA_SU_AI,
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
    const { messages, context, actionType } = body;

    if (!messages || !Array.isArray(messages)) {
      return sendJson(res, 400, { error: 'Dữ liệu tin nhắn không hợp lệ.' });
    }

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
    return sendJson(res, 200, { reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const rawError = String(error?.message || '');
    let cleanMessage =
      'Hệ thống máy chủ đang chịu tải cao tạm thời. Em vui lòng bấm "Thử lại câu hỏi này" hoặc gửi lại sau giây lát giúp Thầy nhé!';
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
