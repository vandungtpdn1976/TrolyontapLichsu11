import { getGeminiApiKey, setCorsHeaders } from './_gemini';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const hasKey = Boolean(getGeminiApiKey());
  return res.status(200).json({
    status: 'ok',
    environment: process.env.VERCEL ? 'vercel' : 'local_or_aistudio',
    hasGeminiKey: hasKey,
    timestamp: new Date().toISOString(),
    message: hasKey
      ? 'Hệ thống AI Sử Vàng 11 sẵn sàng hoạt động.'
      : 'Cảnh báo: Chưa tìm thấy GEMINI_API_KEY trong Environment Variables của Vercel.',
  });
}
