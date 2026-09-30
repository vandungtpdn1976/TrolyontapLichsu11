import {
  getGeminiApiKey,
  MISSING_API_KEY_ERROR,
  SYSTEM_INSTRUCTION_GIA_SU_AI,
  generateContentWithRetryAndFallback,
  setCorsHeaders,
  parseRequestBody,
  formatInlineImagePart,
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
    const { messages, context, actionType } = body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Dữ liệu tin nhắn không hợp lệ.' });
    }

    const contents = messages.map((m: {
      role: string;
      content: string;
      images?: Array<{ dataUrl: string; mimeType?: string; name?: string }>;
    }) => {
      const parts: any[] = [];

      if (Array.isArray(m.images) && m.images.length > 0) {
        for (const img of m.images) {
          const imgPart = formatInlineImagePart(img.dataUrl, img.mimeType);
          if (imgPart) {
            parts.push(imgPart);
          }
        }
      }

      const text = (m.content || '').trim();
      if (text) {
        parts.push({ text });
      } else if (parts.length > 0) {
        parts.push({ text: 'Thầy hãy phân tích chi tiết hình ảnh đính kèm này và giải đáp đầy đủ cho em theo kiến thức SGK Lịch sử 11 GDPT 2018 nhé!' });
      } else {
        parts.push({ text: '...' });
      }

      return {
        role: m.role === 'assistant' ? 'model' : 'user',
        parts,
      };
    });

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

    const reply = await response.text() || 'Thầy xin lỗi, kết nối bị gián đoạn đôi chút. Em gửi lại câu hỏi nhé!';
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
