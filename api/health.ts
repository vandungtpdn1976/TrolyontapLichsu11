import { getGeminiApiKey, setCorsHeaders, sendJson } from './_gemini';

export default async function handler(req: any, res: any) {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    if (typeof res.status === 'function') {
      return res.status(200).end();
    }
    res.statusCode = 200;
    return res.end();
  }

  const hasKey = Boolean(getGeminiApiKey());
  return sendJson(res, 200, {
    status: 'ok',
    environment: process.env.VERCEL ? 'vercel' : 'local_or_aistudio',
    hasGeminiKey: hasKey,
    timestamp: new Date().toISOString(),
    message: hasKey
      ? 'Hệ thống AI Sử Vàng 11 sẵn sàng hoạt động.'
      : 'Cảnh báo: Chưa tìm thấy GEMINI_API_KEY trong Environment Variables của Vercel.',
  });
}
