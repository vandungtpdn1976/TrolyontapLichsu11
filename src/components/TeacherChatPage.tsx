import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Send,
  User,
  Sparkles,
  RefreshCw,
  HelpCircle,
  Lightbulb,
  Image as ImageIcon,
  Clipboard,
  X,
  Maximize2,
  Trash2,
  UploadCloud,
  CheckCircle2,
  FileText,
  ZoomIn,
} from 'lucide-react';
import { ChatMessage, ChatMessageImage } from '../types/history';

interface TeacherChatPageProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

// Helper nén ảnh thông minh sang JPEG độ nén chuẩn để gửi siêu nhanh và không vượt quá giới hạn 4.5MB của Vercel
const compressImageIfNeeded = (file: File): Promise<{ dataUrl: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const maxDim = 1200; // Đạt chuẩn sắc nét tối ưu để Gemini đọc rõ văn bản mà dung lượng chỉ ~150KB
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve({ dataUrl: reader.result as string, mimeType: file.type || 'image/jpeg' });
          return;
        }
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        // Luôn nén sang JPEG 0.8 để tránh file PNG quá nặng gây lỗi 413 trên Vercel Serverless
        const mimeType = 'image/jpeg';
        const dataUrl = canvas.toDataURL(mimeType, 0.8);
        resolve({ dataUrl, mimeType });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
};

export const TeacherChatPage: React.FC<TeacherChatPageProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Chào em nhé! 👋 Thầy rất vui được đồng hành cùng em ôn tập môn **Lịch sử lớp 11**.

Thầy hỗ trợ em ôn tập kiến thức trọng tâm, bám sát **Sách giáo khoa Lịch sử 11 hiện hành của Bộ Giáo dục và Đào tạo (bộ Kết nối tri thức với cuộc sống)** cùng các tài liệu ôn thi chuẩn mực.

✨ **TÍNH NĂNG MỚI - DÁN HÌNH ẢNH & ĐOẠN VĂN TƯ LIỆU:**
- 📸 **Dán trực tiếp ảnh**: Em có thể nhấn phím \`Ctrl + V\` (hoặc \`Cmd + V\`) để dán ngay ảnh chụp đề thi, trang SGK, câu hỏi trắc nghiệm Đúng - Sai, hoặc bài tự luận viết tay.
- 📋 **Dán văn bản dài**: Bấm nút **"Dán văn bản"** hoặc \`Ctrl + V\` để dán trọn vẹn ngữ liệu lịch sử, đề cương ôn tập.
- 📂 **Kéo thả / Chọn ảnh**: Bấm nút hình máy ảnh hoặc kéo thả ảnh vào khung chat. Thầy sẽ đọc ảnh và phân tích cặn kẽ từng ý cho em!

Bây giờ, em muốn chúng mình cùng ôn bài nào, hoặc em có ảnh đề bài nào cần Thầy giải đáp không nè? 📖✨`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      suggestedQuestions: [
        'Thầy tạo cho em 1 bài tập Đúng - Sai bám sát tư liệu SGK Lịch sử 11',
        'Thầy phân tích giúp em đoạn tư liệu Lời dặn Trần Quốc Tuấn: "Khoan thư sức dân"',
        'Thầy giúp em ôn Bài 1 & Bài 2: Cách mạng tư sản và CNTB hiện đại',
        'Quá trình thực dân phương Tây xâm lược Đông Nam Á diễn ra như thế nào?',
        'Các mốc thời gian chính phong trào Cần vương (1885 - 1896) chống Pháp',
        'So sánh xu hướng cứu nước của cụ Phan Bội Châu và cụ Phan Châu Trinh',
        'Ôn tập kiến thức trọng tâm Đề cương giữa kỳ I và cuối kỳ I',
      ],
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [attachedImages, setAttachedImages] = useState<ChatMessageImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [previewModalImage, setPreviewModalImage] = useState<{ url: string; name?: string } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt) {
      sendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  // Xử lý nạp File ảnh vào state
  const handleAddImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showToast('⚠️ Vui lòng chỉ dán hoặc chọn tệp hình ảnh (PNG, JPG, WEBP).');
      return;
    }
    try {
      const { dataUrl, mimeType } = await compressImageIfNeeded(file);
      const newImg: ChatMessageImage = {
        id: 'img-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
        dataUrl,
        mimeType,
        name: file.name || `Anh_tu_lieu_${new Date().toLocaleTimeString('vi-VN').replace(/:/g, '-')}.jpg`,
        size: file.size,
      };
      setAttachedImages((prev) => [...prev, newImg]);
      showToast(`📸 Đã dán ảnh "${newImg.name}" vào khung chat!`);
    } catch (err) {
      console.error('Lỗi khi nén/đọc ảnh:', err);
      showToast('❌ Không thể tải hình ảnh này. Em vui lòng thử lại nhé!');
    }
  };

  // Lắng nghe sự kiện Paste (Ctrl+V) tại khung chat hoặc toàn trang
  const handlePaste = async (e: React.ClipboardEvent) => {
    const clipboardData = e.clipboardData;
    if (!clipboardData) return;

    let hasImage = false;
    const items = Array.from(clipboardData.items);

    for (const item of items) {
      if (item.type.startsWith('image/')) {
        hasImage = true;
        const file = item.getAsFile();
        if (file) {
          await handleAddImageFile(file);
        }
      }
    }

    if (hasImage) {
      // Đã xử lý ảnh, nếu không có văn bản đi kèm thì chặn default
      const text = clipboardData.getData('text/plain');
      if (!text.trim()) {
        e.preventDefault();
      } else {
        showToast('📋 Đã nhận cả hình ảnh và văn bản vừa dán!');
      }
    }
  };

  // Nút bấm: Dán nội dung từ bộ nhớ tạm Clipboard (Hỗ trợ cả ảnh và text một chạm)
  const handlePasteFromClipboardBtn = async () => {
    try {
      if (!navigator.clipboard) {
        showToast('⚠️ Trình duyệt chưa hỗ trợ truy cập bộ nhớ tạm. Em có thể bấm phím Ctrl+V nhé!');
        textareaRef.current?.focus();
        return;
      }

      // Thử đọc qua clipboard.read() (hỗ trợ blob ảnh)
      let foundContent = false;
      if (navigator.clipboard.read) {
        try {
          const items = await navigator.clipboard.read();
          for (const item of items) {
            const imageType = item.types.find((t) => t.startsWith('image/'));
            if (imageType) {
              const blob = await item.getType(imageType);
              const file = new File([blob], `clipboard_image_${Date.now()}.png`, { type: imageType });
              await handleAddImageFile(file);
              foundContent = true;
            }
          }
        } catch {
          // Bỏ qua nếu người dùng chưa cấp quyền đọc ảnh, sẽ thử đọc text bên dưới
        }
      }

      // Đọc text từ clipboard
      try {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setInput((prev) => (prev ? `${prev}\n${text.trim()}` : text.trim()));
          foundContent = true;
          showToast('📋 Đã dán văn bản từ bộ nhớ tạm vào khung soạn thảo!');
        }
      } catch {
        // clipboard text error
      }

      if (!foundContent) {
        showToast('💡 Bộ nhớ tạm đang trống. Em hãy copy đề bài hoặc chụp màn hình rồi bấm Ctrl+V nhé!');
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
      showToast('💡 Em hãy bấm Ctrl+V để dán trực tiếp vào khung chat nhé!');
    }
  };

  // Xử lý chọn tệp từ file input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    Array.from(files).forEach((file) => handleAddImageFile(file));
    e.target.value = '';
  };

  // Kéo thả ảnh (Drag and Drop)
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      for (const file of Array.from(files)) {
        if (file.type.startsWith('image/')) {
          await handleAddImageFile(file);
        }
      }
    }
  };

  const removeAttachedImage = (id: string) => {
    setAttachedImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Gửi tin nhắn
  const sendMessage = async (textToSend?: string, imagesToSend?: ChatMessageImage[]) => {
    const currentText = (textToSend !== undefined ? textToSend : input).trim();
    const currentImages = imagesToSend || attachedImages;

    // Không gửi nếu không có cả chữ lẫn ảnh
    if ((!currentText && currentImages.length === 0) || loading) return;

    const finalText = currentText || 'Thầy hãy phân tích chi tiết câu hỏi và nội dung trong hình ảnh này giúp em theo SGK Lịch sử 11 GDPT 2018 nhé!';

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: finalText,
      images: currentImages.length > 0 ? [...currentImages] : undefined,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setAttachedImages([]);
    setLoading(true);

    try {
      // Tối ưu cuộc trò chuyện gửi đi: chỉ lấy tối đa 8 lượt gần nhất và chỉ gửi ảnh ở lượt hiện tại để dung lượng JSON luôn siêu nhẹ (<300KB)
      const recentHistory = [...messages, userMsg].slice(-8).map((m, idx, arr) => {
        const isCurrent = idx === arr.length - 1;
        return {
          role: m.role,
          content: m.content,
          images: isCurrent && m.images ? m.images.map((img) => ({
            dataUrl: img.dataUrl,
            mimeType: img.mimeType,
            name: img.name,
          })) : undefined,
        };
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: recentHistory }),
      });

      // Đọc response một lần duy nhất bằng .text() để tuyệt đối không bị lỗi "body stream already read"
      const rawText = await response.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }

      if (!response.ok) {
        let serverErrorText = data?.error || '';
        if (!serverErrorText) {
          if (response.status === 413 || rawText.includes('413') || rawText.includes('Payload Too Large')) {
            serverErrorText = 'Hình ảnh đính kèm quá lớn đối với máy chủ Vercel. Thầy đã tự động nén nhỏ hơn, em thử gửi lại câu hỏi nhé!';
          } else if (
            rawText.includes('A server error') ||
            rawText.includes('FUNCTION_INVOCATION') ||
            rawText.includes('500') ||
            rawText.includes('504')
          ) {
            serverErrorText =
              'Máy chủ Vercel chưa được thêm biến môi trường GEMINI_API_KEY hoặc đang khởi động lại. Bạn vui lòng vào Vercel Dashboard -> Project Settings -> Environment Variables -> Thêm biến GEMINI_API_KEY rồi Redeploy nhé!';
          } else {
            serverErrorText = `Lỗi kết nối máy chủ (${response.status})`;
          }
        }
        throw new Error(serverErrorText);
      }

      const reply = data?.reply || 'Thầy xin lỗi, hiện tại mạng có chút chậm. Em hỏi lại lần nữa nhé!';
      const assistantMsg: ChatMessage = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const rawError = String(err?.message || '');
      let friendlyError =
        'Hệ thống máy chủ đang chịu tải cao tạm thời. Em hãy bấm "🔄 Thử lại câu hỏi này ngay" bên dưới giúp Thầy nhé!';
      if (rawError.includes('GEMINI_API_KEY')) {
        friendlyError = rawError;
      } else if (rawError.includes('Unexpected token') || rawError.includes('is not valid JSON')) {
        friendlyError =
          'Máy chủ Vercel chưa cấu hình biến môi trường GEMINI_API_KEY trong Project Settings -> Environment Variables. Bạn vui lòng kiểm tra trên Vercel nhé!';
      } else if (
        rawError &&
        !rawError.includes('503') &&
        !rawError.includes('high demand') &&
        !rawError.includes('{"error"') &&
        !rawError.includes('Failed to fetch') &&
        !rawError.includes('body stream already read')
      ) {
        friendlyError = rawError;
      }
      const errorMsg: ChatMessage = {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: `Thầy xin lỗi: ${friendlyError}`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [finalText],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (q: string) => {
    sendMessage(q);
  };

  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 text-stone-800 leading-relaxed text-sm sm:text-base">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          // Bullet points
          if (line.trim().startsWith('- ') || line.trim().startsWith('* ') || line.trim().startsWith('+ ')) {
            const clean = line.trim().substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-amber-700 font-bold mt-1 text-xs">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInline(clean) }} />
              </div>
            );
          }

          // Numbered list
          if (/^\d+\.\s/.test(line.trim())) {
            const match = line.trim().match(/^(\d+\.)\s(.*)$/);
            if (match) {
              return (
                <div key={idx} className="flex items-start gap-2 pl-2">
                  <span className="text-red-800 font-semibold text-sm shrink-0">{match[1]}</span>
                  <span dangerouslySetInnerHTML={{ __html: formatInline(match[2]) }} />
                </div>
              );
            }
          }

          // Headers
          if (line.trim().startsWith('### ')) {
            return (
              <h4 key={idx} className="font-bold text-amber-950 text-base mt-2 pt-1 border-b border-amber-100">
                {line.trim().substring(4)}
              </h4>
            );
          }
          if (line.trim().startsWith('## ') || line.trim().startsWith('# ')) {
            return (
              <h3 key={idx} className="font-serif-title font-bold text-red-900 text-lg mt-3">
                {line.trim().replace(/^#+\s/, '')}
              </h3>
            );
          }

          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-red-950">$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-stone-700">$1</em>');
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-amber-100/70 px-1 py-0.5 rounded text-amber-900 font-mono text-xs">$1</code>');

    return formatted;
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col h-[calc(100vh-130px)] sm:h-[calc(100vh-150px)]"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-stone-900/90 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-full shadow-xl flex items-center gap-2 border border-amber-500/40 backdrop-blur-sm animate-fade-in pointer-events-none">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Drag & Drop Overlay */}
      {isDragging && (
        <div className="absolute inset-2 z-40 bg-amber-900/80 backdrop-blur-xs rounded-3xl border-3 border-dashed border-amber-300 flex flex-col items-center justify-center text-white pointer-events-none p-6 text-center shadow-2xl animate-pulse">
          <UploadCloud className="w-16 h-16 text-amber-200 mb-3" />
          <h3 className="font-serif-title text-2xl font-bold text-amber-100">
            Thả ảnh đề bài hoặc tư liệu vào đây
          </h3>
          <p className="text-sm text-amber-200/90 mt-1 max-w-md">
            Thầy Dũng sẽ tiếp nhận hình ảnh, đọc nội dung câu hỏi và hướng dẫn giải chi tiết cho em!
          </p>
        </div>
      )}

      {/* Teacher Profile Header */}
      <div className="bg-gradient-to-r from-red-900 via-stone-900 to-amber-950 text-white rounded-2xl p-4 sm:p-5 shadow-lg border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 p-0.5 shadow-md">
              <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center overflow-hidden">
                <span className="font-serif-title text-2xl font-bold text-amber-300">T.D</span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-stone-900 flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Trực tuyến</span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-amber-200">
                Thầy Dũng &bull; Trợ Lý AI Lịch Sử 11
              </h2>
              <span className="text-[11px] bg-red-700/60 text-amber-200 px-2 py-0.5 rounded-full font-medium border border-amber-400/30 hidden sm:inline-block">
                GDPT 2018
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 mt-0.5">
              Hỗ trợ dán ảnh đề bài, nhận diện chữ viết tay & tư liệu SGK để giải đáp nhanh chóng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => {
              setMessages([messages[0]]);
              setAttachedImages([]);
              setInput('');
            }}
            className="flex items-center gap-1.5 text-xs text-amber-200 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition cursor-pointer"
            title="Làm mới cuộc trò chuyện"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trò chuyện mới</span>
          </button>
        </div>
      </div>

      {/* 6 Core Tutor Interactive Actions */}
      <div className="py-2 px-1 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs border-b border-stone-200/80 bg-white/70 rounded-xl my-1">
        <span className="text-red-900 font-bold flex items-center gap-1 shrink-0 px-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          Chế độ Gia sư:
        </span>
        {[
          { label: '❓ Tại sao?', prompt: 'Thầy Dũng ơi, tại sao sự kiện lịch sử này lại diễn ra như vậy? Thầy giải thích rõ bản chất và quan hệ nhân - quả giúp em với ạ!' },
          { label: '💡 Em không hiểu', prompt: 'Thầy ơi, em thấy phần kiến thức này hơi khó nhớ và phức tạp, Thầy có thể giải thích lại bằng ngôn ngữ đơn giản, dễ hiểu hơn được không ạ?' },
          { label: '📖 Cho em ví dụ', prompt: 'Thầy cho em xin một vài ví dụ lịch sử cụ thể, chuẩn xác trong SGK GDPT 2018 để minh họa cho vấn đề này nhé!' },
          { label: '⚖️ Em hay nhầm phần này', prompt: 'Thầy ơi, em rất hay bị nhầm lẫn giữa hai sự kiện / nhân vật này trong đề thi. Thầy chỉ cho em điểm giống, khác nhau và mẹo phân biệt với ạ!' },
          { label: '🗺️ Em quên kiến thức', prompt: 'Thầy ơi, em lỡ quên kiến thức phần này rồi ạ. Thầy tóm tắt nhanh lại giúp em bằng TỪ KHÓA và SƠ ĐỒ TƯ DUY nhé!' },
          { label: '🎯 Kiểm tra em đi', prompt: 'Thầy Dũng ơi! Thầy hãy ra cho em 1 bài kiểm tra nhanh gồm 3 mức độ (Nhận biết - Thông hiểu - Vận dụng) để kiểm tra em vừa học được gì nhé!' },
        ].map((btn, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(btn.prompt)}
            className="shrink-0 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg px-2.5 py-1 transition text-xs font-semibold hover:scale-105 active:scale-95 cursor-pointer"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Suggested Topic Chips */}
      <div className="py-1.5 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
        <span className="text-stone-500 font-medium flex items-center gap-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          Gợi ý ôn nhanh:
        </span>
        <button
          onClick={() => handleQuickQuestion('Thầy ơi, thầy hướng dẫn em các trọng tâm kiến thức và bẫy đề thi trong Đề cương Ôn tập Cuối kỳ I môn Lịch sử 11 với ạ!')}
          className="shrink-0 bg-red-100 hover:bg-red-200 text-red-900 border border-red-300 rounded-full px-3 py-1 transition text-xs font-bold shadow-xs cursor-pointer"
        >
          ⭐ Đề Cương Cuối Kỳ I (2025)
        </button>
        {[
          'Chủ đề 1: Cách mạng tư sản',
          'Chủ đề 2: Chủ nghĩa xã hội từ 1917',
          'Chủ đề 3: Độc lập Đông Nam Á',
          'Chủ đề 4: Kháng chiến bảo vệ Tổ quốc',
          'Chủ đề 5: Cải cách Hồ Quý Ly - Lê Thánh Tông - Minh Mạng',
          'Chủ đề 6: Quá trình thực thi chủ quyền Biển Đông',
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleQuickQuestion(`Thầy ơi, em muốn ôn tập trọng tâm ${prompt} trong SGK Kết nối tri thức ạ!`)}
            className="shrink-0 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200 rounded-full px-3 py-1 transition text-xs font-medium cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto bg-stone-50/70 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4 my-2 shadow-inner">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-red-800 p-0.5 shrink-0 shadow-sm">
                  <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center text-amber-300 font-serif-title font-bold text-sm">
                    T.D
                  </div>
                </div>
              )}

              <div
                className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 shadow-xs ${
                  isUser
                    ? 'bg-gradient-to-br from-red-800 to-amber-900 text-white rounded-tr-xs'
                    : 'bg-white border border-stone-200/90 text-stone-900 rounded-tl-xs shadow-xs'
                }`}
              >
                {/* User Message Attached Images */}
                {msg.images && msg.images.length > 0 && (
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-amber-200 mb-2">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Ảnh tư liệu / đề bài đính kèm ({msg.images.length} ảnh):</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {msg.images.map((img, i) => (
                        <div
                          key={img.id || i}
                          onClick={() => setPreviewModalImage({ url: img.dataUrl, name: img.name })}
                          className="group relative cursor-pointer rounded-xl overflow-hidden border border-white/20 shadow-md hover:scale-[1.02] transition-transform max-w-[240px]"
                        >
                          <img
                            src={img.dataUrl}
                            alt={img.name || 'Ảnh đính kèm'}
                            className="w-full h-32 sm:h-40 object-cover bg-stone-950"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-medium backdrop-blur-2xs">
                            <Maximize2 className="w-4 h-4" />
                            <span>Xem ảnh to</span>
                          </div>
                          {img.name && (
                            <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-[10px] text-stone-200 px-2 py-0.5 truncate">
                              {img.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!isUser ? (
                  renderFormattedContent(msg.content)
                ) : (
                  <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">
                    {msg.content}
                  </p>
                )}

                {msg.id.startsWith('error-') && msg.suggestedQuestions && msg.suggestedQuestions[0] && (
                  <div className="mt-3 pt-3 border-t border-amber-200/60">
                    <button
                      onClick={() => handleQuickQuestion(msg.suggestedQuestions![0])}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg shadow-xs transition active:scale-95 cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Thử lại câu hỏi này ngay
                    </button>
                  </div>
                )}

                {!msg.id.startsWith('error-') && msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-amber-100">
                    <p className="text-xs font-semibold text-amber-800 flex items-center gap-1 mb-2">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Câu hỏi em có thể tham khảo tiếp:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.suggestedQuestions.map((sq, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickQuestion(sq)}
                          className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg px-2.5 py-1 text-left transition cursor-pointer"
                        >
                          {sq}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div
                  className={`text-[10px] mt-2 font-medium ${
                    isUser ? 'text-amber-200/80 text-right' : 'text-stone-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-stone-700 to-stone-900 flex items-center justify-center text-white shrink-0 shadow-sm">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-3 items-start">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-red-800 p-0.5 shrink-0 shadow-sm">
              <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center text-amber-300 font-serif-title font-bold text-sm">
                T.D
              </div>
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-tl-xs p-4 shadow-xs">
              <div className="flex items-center gap-2 text-stone-600 text-sm">
                <span className="w-2 h-2 rounded-full bg-red-700 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-stone-500 italic ml-2">
                  Thầy Dũng đang đọc dữ liệu hình ảnh, tra cứu sử liệu SGK 11 và soạn lời giải cho em...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area Container */}
      <div className="shrink-0 flex flex-col bg-white border border-stone-300 rounded-2xl shadow-lg focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all overflow-hidden">
        {/* Attached Images Preview Strip */}
        {attachedImages.length > 0 && (
          <div className="p-3 bg-amber-50/60 border-b border-amber-200/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-amber-700" />
                Hình ảnh đã dán/tải lên ({attachedImages.length}):
              </span>
              <button
                type="button"
                onClick={() => setAttachedImages([])}
                className="text-[11px] text-red-700 hover:text-red-900 font-medium flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Xóa tất cả ảnh
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {attachedImages.map((img) => (
                <div
                  key={img.id}
                  className="relative group shrink-0 rounded-xl overflow-hidden border border-amber-300 bg-white shadow-xs w-28 h-20"
                >
                  <img
                    src={img.dataUrl}
                    alt={img.name || 'Ảnh đã dán'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewModalImage({ url: img.dataUrl, name: img.name })}
                      title="Xem ảnh to"
                      className="p-1 rounded-full bg-white/20 hover:bg-white/40 text-white cursor-pointer"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeAttachedImage(img.id)}
                      title="Xóa ảnh này"
                      className="p-1 rounded-full bg-red-600 hover:bg-red-700 text-white cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-stone-900/80 text-white text-[9px] px-1 truncate py-0.5">
                    {img.name}
                  </div>
                </div>
              ))}

              {/* Quick Prompt Suggestions when Image is attached */}
              <div className="shrink-0 flex flex-col justify-center gap-1 pl-2 border-l border-amber-200">
                <span className="text-[10px] font-semibold text-amber-800">Gợi ý yêu cầu Thầy:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    { label: '🔍 Giải thích câu hỏi trong ảnh', prompt: 'Thầy Dũng ơi, nhờ Thầy phân tích và giải thích chi tiết câu hỏi/ngữ liệu trong ảnh này giúp em với ạ!' },
                    { label: '⚖️ Kiểm tra Đúng - Sai', prompt: 'Thầy kiểm tra giúp em từng ý trong ảnh xem ý nào Đúng, ý nào Sai và chỉ ra bẫy từ khóa nhé!' },
                    { label: '📝 Chấm bài tự luận', prompt: 'Thầy Dũng chấm điểm và nhận xét bài tự luận em chụp trong ảnh giúp em theo thang điểm 10 với ạ!' },
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInput(chip.prompt);
                        textareaRef.current?.focus();
                      }}
                      className="text-[11px] bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-md transition font-medium shadow-2xs cursor-pointer"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Input Bar Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center gap-1.5 p-2 sm:p-2.5"
        >
          {/* Hidden File Input for Image Upload / Photo capture */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
          />

          {/* Quick Buttons: Image upload & Paste from Clipboard */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 sm:px-2.5 sm:py-2 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition flex items-center gap-1 text-xs font-semibold cursor-pointer border border-transparent hover:border-amber-200"
              title="Tải ảnh lên hoặc chụp ảnh đề bài"
            >
              <ImageIcon className="w-5 h-5 text-amber-700" />
              <span className="hidden md:inline">Chọn/Chụp ảnh</span>
            </button>

            <button
              type="button"
              onClick={handlePasteFromClipboardBtn}
              className="p-2 sm:px-2.5 sm:py-2 text-stone-600 hover:text-amber-800 hover:bg-amber-50 rounded-xl transition flex items-center gap-1 text-xs font-semibold cursor-pointer border border-transparent hover:border-amber-200"
              title="Dán nhanh nội dung hình ảnh hoặc văn bản từ bộ nhớ tạm Clipboard (Ctrl + V)"
            >
              <Clipboard className="w-5 h-5 text-amber-700" />
              <span className="hidden md:inline">Dán Clipboard</span>
            </button>
          </div>

          {/* Textarea with onPaste event */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={handlePaste}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={
                attachedImages.length > 0
                  ? "Nhập câu hỏi kèm theo ảnh (hoặc bấm Gửi để Thầy tự phân tích ảnh)..."
                  : "Nhập câu hỏi, hoặc bấm Ctrl+V để DÁN HÌNH ẢNH đề bài / văn bản dài vào đây..."
              }
              className="w-full bg-stone-50/80 focus:bg-white border border-stone-200 focus:border-amber-500 rounded-xl outline-none resize-none px-3 py-2 text-sm sm:text-base text-stone-800 placeholder-stone-400 max-h-28 overflow-y-auto transition"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={(!input.trim() && attachedImages.length === 0) || loading}
            className="bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 disabled:opacity-40 text-white rounded-xl p-3 flex items-center justify-center transition shadow-sm disabled:cursor-not-allowed shrink-0 cursor-pointer"
            title="Gửi câu hỏi cho Thầy Dũng"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {/* Bottom Quick Help Tip */}
        <div className="px-3 pb-2 text-[11px] text-stone-500 flex items-center justify-between gap-2 border-t border-stone-100 bg-stone-50/40">
          <div className="flex items-center gap-1.5 truncate">
            <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">
              💡 <strong>Mẹo hay:</strong> Em có thể chụp màn hình đề bài rồi bấm <strong>Ctrl + V</strong> để dán ngay lập tức vào khung chat!
            </span>
          </div>
          <span className="hidden sm:inline text-stone-400 shrink-0">
            Shift + Enter để xuống dòng &bull; Enter để gửi
          </span>
        </div>
      </div>

      {/* Lightbox Modal: Xem ảnh phóng to */}
      {previewModalImage && (
        <div
          onClick={() => setPreviewModalImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[90vh] bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700 flex flex-col"
          >
            <div className="p-3 bg-stone-800 text-stone-200 flex items-center justify-between border-b border-stone-700 text-xs sm:text-sm">
              <span className="font-medium truncate max-w-md">
                📸 {previewModalImage.name || 'Ảnh tư liệu đề bài Lịch sử 11'}
              </span>
              <button
                type="button"
                onClick={() => setPreviewModalImage(null)}
                className="p-1 rounded-lg bg-stone-700 hover:bg-stone-600 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto flex items-center justify-center max-h-[calc(90vh-60px)]">
              <img
                src={previewModalImage.url}
                alt="Ảnh phóng to"
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
