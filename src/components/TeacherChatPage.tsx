import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, BookOpen, RefreshCw, HelpCircle, Lightbulb, Compass, Award } from 'lucide-react';
import { ChatMessage } from '../types/history';
import { safeFetchJson } from '../utils/apiHelper';

interface TeacherChatPageProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const TeacherChatPage: React.FC<TeacherChatPageProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      content: `Chào em nhé! 👋 Thầy rất vui được đồng hành cùng em ôn tập môn **Lịch sử lớp 11**.

Thầy sẽ hỗ trợ em ôn tập kiến thức trọng tâm, bám sát **Sách giáo khoa Lịch sử 11 hiện hành của Bộ Giáo dục và Đào tạo** và các tài liệu ôn tập chuẩn được cung cấp.

📌 **Nguyên tắc cùng học tập của chúng ta:**
1. **Bám sát nguồn chuẩn**: Chỉ ôn tập dựa trên SGK Lịch sử 11 và tài liệu học tập được cung cấp, không học lan man.
2. **Trọng tâm & Dễ nhớ**: Nêu rõ mốc thời gian, sự kiện, nhân vật chính, giải thích ngắn gọn, dễ hiểu kèm ví dụ và sơ đồ trực quan.
3. **Phạm vi trọng tâm**: Tập trung trong phạm vi **Lịch sử thế giới (1789 – 1918)** và **Lịch sử Việt Nam (1858 – 1918)** cùng các chủ đề theo phân phối chương trình SGK 11.
4. **Học hiểu bản chất**: Khuyến khích em đặt câu hỏi, thảo luận và hiểu sâu nguyên nhân - kết quả - ý nghĩa lịch sử.

Bây giờ, em muốn chúng mình cùng ôn bài nào trong chương trình Lịch sử 11 trước nè? 📖✨`,
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await safeFetchJson<{ reply?: string }>(response, 'Lỗi kết nối máy chủ chat');

      const assistantMsg: ChatMessage = {
        id: 'assistant-' + Date.now(),
        role: 'assistant',
        content: data.reply || 'Thầy xin lỗi, hiện tại mạng có chút chậm. Em hỏi lại lần nữa nhé!',
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      const rawError = String(err?.message || '');
      let friendlyError =
        'Hệ thống máy chủ đang chịu tải cao tạm thời trong vài giây do lượng truy cập lớn. Em hãy bấm "🔄 Thử lại câu hỏi này ngay" bên dưới giúp Thầy nhé!';
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
        !rawError.includes('Failed to fetch')
      ) {
        friendlyError = rawError;
      }
      const errorMsg: ChatMessage = {
        id: 'error-' + Date.now(),
        role: 'assistant',
        content: `Thầy xin lỗi: ${friendlyError}`,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [textToSend.trim()],
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
    // Process markdown headers, bold, bullets
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
    // Escape basic html
    let formatted = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold **text**
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-red-950">$1</strong>');
    // Italic *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic text-stone-700">$1</em>');
    // Inline code `code`
    formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-amber-100/70 px-1 py-0.5 rounded text-amber-900 font-mono text-xs">$1</code>');

    return formatted;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 sm:py-6 flex flex-col h-[calc(100vh-130px)] sm:h-[calc(100vh-150px)]">
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
              Chuyên gia giải đáp thắc mắc, phương pháp thi Đúng - Sai, chấm chữa tự luận Lịch sử 11
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => {
              setMessages([messages[0]]);
            }}
            className="flex items-center gap-1.5 text-xs text-amber-200 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-lg transition"
            title="Làm mới cuộc trò chuyện"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trò chuyện mới</span>
          </button>
        </div>
      </div>

      {/* 6 Core Tutor Interactive Actions (Requirement 8) */}
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
            className="shrink-0 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg px-2.5 py-1 transition text-xs font-semibold hover:scale-105 active:scale-95"
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Suggested Topic Chips */}
      <div className="py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0 text-xs">
        <span className="text-stone-500 font-medium flex items-center gap-1 shrink-0">
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          Gợi ý ôn nhanh:
        </span>
        <button
          onClick={() => handleQuickQuestion('Thầy ơi, thầy hướng dẫn em các trọng tâm kiến thức và bẫy đề thi trong Đề cương Ôn tập Cuối kỳ I môn Lịch sử 11 với ạ!')}
          className="shrink-0 bg-red-100 hover:bg-red-200 text-red-900 border border-red-300 rounded-full px-3 py-1 transition text-xs font-bold shadow-xs"
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
          'Chuyên đề 1: Lịch sử nghệ thuật truyền thống',
          'Chuyên đề 2: Chiến tranh và hoà bình thế kỉ XX',
          'Chuyên đề 3: Danh nhân trong lịch sử Việt Nam',
        ].map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleQuickQuestion(`Thầy ơi, em muốn ôn tập trọng tâm ${prompt} trong SGK Kết nối tri thức ạ!`)}
            className="shrink-0 bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900 border border-stone-200 rounded-full px-3 py-1 transition text-xs font-medium"
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
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 shadow-xs ${
                  isUser
                    ? 'bg-gradient-to-br from-red-800 to-amber-900 text-white rounded-tr-xs'
                    : 'bg-white border border-stone-200/90 text-stone-900 rounded-tl-xs shadow-xs'
                }`}
              >
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
                          className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg px-2.5 py-1 text-left transition"
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
                  Thầy Dũng đang tra cứu sử liệu và soạn câu trả lời cho em...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="shrink-0 flex items-center gap-2 bg-white border border-stone-300 rounded-2xl p-2 shadow-md focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all"
      >
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              sendMessage(input);
            }
          }}
          placeholder="Hỏi Thầy Dũng bất kì câu hỏi nào về Lịch sử 11 GDPT 2018 (hoặc dán bài tự luận để Thầy chấm)..."
          className="flex-1 bg-transparent border-0 outline-none resize-none px-3 py-2 text-sm sm:text-base text-stone-800 placeholder-stone-400 max-h-24 overflow-y-auto"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 disabled:opacity-40 text-white rounded-xl p-3 flex items-center justify-center transition shadow-sm disabled:cursor-not-allowed shrink-0"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
