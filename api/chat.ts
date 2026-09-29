import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  SYSTEM_INSTRUCTION_GIA_SU_AI,
  generateContentWithRetryAndFallback,
  setCorsHeaders,
  parseRequestBody,
} from './_gemini.js';

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
    const { messages, context, actionType } = body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Dữ liệu tin nhắn không hợp lệ.' });
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
    return res.status(200).json({ reply });
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
    return res.status(500).json({ error: cleanMessage });
  }
}
