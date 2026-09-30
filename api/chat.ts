import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  SYSTEM_INSTRUCTION_GIA_SU_AI,
  generateContentWithRetryAndFallback,
  setCorsHeaders,
  parseRequestBody,
  sendJson,
} from './_gemini';
import { getFallbackHistoryAnswer } from './_historyFallback';

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

  const body = await parseRequestBody(req);
  const { messages, context, actionType } = body;
  const userMessages = Array.isArray(messages) ? messages.filter((m: any) => m.role === 'user') : [];
  const lastUserText = userMessages.length > 0 ? userMessages[userMessages.length - 1].content : '';

  try {
    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      // Nếu chưa có API key trên Vercel, phản hồi ngay bằng kho tri thức Lịch sử 11
      const fallbackReply = getFallbackHistoryAnswer(lastUserText);
      return sendJson(res, 200, { reply: fallbackReply });
    }

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

    const reply = response.text || getFallbackHistoryAnswer(lastUserText);
    return sendJson(res, 200, { reply });
  } catch (error: any) {
    console.error('Error in /api/chat, falling back to knowledge engine:', error);
    const fallbackReply = getFallbackHistoryAnswer(lastUserText);
    return sendJson(res, 200, { reply: fallbackReply });
  }
}
