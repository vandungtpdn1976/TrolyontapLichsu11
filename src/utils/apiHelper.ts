/**
 * Helper an toàn để đọc phản hồi từ Fetch API trên mọi môi trường (Vercel, AI Studio, Local).
 * 
 * Khắc phục hoàn toàn lỗi:
 * "Failed to execute 'text' on 'Response': body stream already read"
 * Bằng cách chỉ đọc stream 1 lần duy nhất bằng response.text() trước khi parse JSON,
 * không bao giờ gọi response.text() sau khi response.json() bị lỗi.
 */
export async function safeFetchJson<T = any>(
  response: Response,
  defaultErrorMessage = 'Lỗi kết nối máy chủ'
): Promise<T> {
  let rawText = '';
  try {
    // Đọc body stream đúng 1 lần duy nhất dưới dạng text
    rawText = await response.text();
  } catch (err: any) {
    throw new Error(`Không thể đọc phản hồi từ máy chủ: ${err?.message || defaultErrorMessage}`);
  }

  // Thử parse dữ liệu dạng JSON
  let jsonData: any = null;
  let isJson = false;
  if (rawText && rawText.trim()) {
    try {
      jsonData = JSON.parse(rawText);
      isJson = true;
    } catch {
      isJson = false;
    }
  }

  // Nếu HTTP status không thành công (4xx, 5xx)
  if (!response.ok) {
    // Nếu server trả về JSON có trường error
    if (isJson && jsonData?.error) {
      throw new Error(jsonData.error);
    }

    // Nếu Vercel trả về trang lỗi HTML hoặc quá thời gian (504 Gateway Timeout)
    if (response.status === 504 || rawText.includes('504') || rawText.includes('GATEWAY_TIMEOUT')) {
      throw new Error(
        'Máy chủ Vercel bị quá thời gian xử lý (504 Gateway Timeout). Bạn vui lòng bấm nút "Thử lại câu hỏi này ngay" nhé!'
      );
    }

    // Nếu Vercel trả về lỗi Function Invocation Failed hoặc 500 do chưa có GEMINI_API_KEY
    if (
      response.status === 500 ||
      rawText.includes('FUNCTION_INVOCATION_FAILED') ||
      rawText.includes('A server error has occurred')
    ) {
      throw new Error(
        'Máy chủ Vercel đang xử lý hoặc chưa được thêm biến môi trường GEMINI_API_KEY. Bạn vui lòng vào Vercel Dashboard -> Project Settings -> Environment Variables -> Thêm biến GEMINI_API_KEY rồi Redeploy nhé!'
      );
    }

    // Nếu không tìm thấy API route trên Vercel
    if (response.status === 404 || rawText.includes('404')) {
      throw new Error(
        `Không tìm thấy đường dẫn API trên Vercel (${response.status}). Vui lòng kiểm tra lại cấu hình Vercel.`
      );
    }

    // Lỗi khác
    const cleanSnippet = rawText && rawText.length < 200 && !rawText.includes('<html') ? rawText : '';
    throw new Error(cleanSnippet || `${defaultErrorMessage} (Mã lỗi HTTP ${response.status})`);
  }

  // Nếu HTTP status thành công (200) nhưng dữ liệu không phải JSON
  if (!isJson) {
    throw new Error('Dữ liệu phản hồi từ máy chủ không đúng định dạng JSON.');
  }

  return jsonData as T;
}
