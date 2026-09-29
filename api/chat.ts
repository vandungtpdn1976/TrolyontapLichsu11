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
      return res.status(200).json({
        reply: `Chào em! Hiện tại trên môi trường Vercel chưa được kết nối với biến môi trường **GEMINI_API_KEY**.\n\n👉 **Hướng dẫn kích hoạt Gia sư AI trên Vercel**:\n1. Mở [Vercel Dashboard](https://vercel.com/dashboard) và chọn dự án Sử Vàng 11.\n2. Vào tab **Settings** -> chọn menu **Environment Variables**.\n3. Thêm biến mới: Key là \`GEMINI_API_KEY\` và Value là API Key của bạn từ Google AI Studio.\n4. Bấm **Save**, sau đó sang tab **Deployments** bấm dấu 3 chấm (...) ở bản deploy mới nhất -> chọn **Redeploy** là trò chuyện được ngay nhé!`,
      });
    }

    const body = await parseRequestBody(req);
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

    const reply = response && response.text? response.text: || 'Thầy xin lỗi, kết nối bị gián đoạn đôi chút. Em gửi lại câu hỏi nhé!';
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(200).json({
      reply:
        'Thầy Dũng xin chào em! Hệ thống AI đang tạm thời có lượng truy cập lớn trong vài giây. Em hãy bấm nút "🔄 Thử lại câu hỏi này ngay" bên dưới giúp Thầy nhé, hoặc hỏi Thầy về các bài học trọng tâm Lịch sử 11 (Cách mạng tư sản, Chủ nghĩa tư bản, Liên bang Xô Viết, Phong trào Cần vương...)!',
    });
  }
}
