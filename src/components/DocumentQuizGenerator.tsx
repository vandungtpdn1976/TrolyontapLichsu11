import React, { useState } from 'react';
import { Sparkles, FileText, CheckCircle2, XCircle, AlertCircle, AlertTriangle, ArrowRight, RotateCcw, PenTool, CheckSquare, ToggleLeft, BookOpen, Send, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DocumentQuizGeneratorProps {
  onAskTeacher: (context: string) => void;
}

// Sample textbook & historical documents from Grade 11 History curriculum
const CURATED_DOCUMENTS = [
  {
    id: 'doc-us-1776',
    title: 'Tuyên ngôn Độc lập Mỹ (1776) - Quyền con người',
    topic: 'Chủ đề 1: Cách mạng tư sản và sự phát triển của CNTB',
    lesson: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    source: 'Tuyên ngôn Độc lập Hợp chúng quốc Mỹ (Thomas Jefferson soạn thảo, 4-7-1776)',
    text: `“Chúng tôi khẳng định một chân lý hiển nhiên rằng mọi người sinh ra đều có quyền bình đẳng, tạo hóa đã ban cho họ những quyền tất yếu bất khả xâm phạm, trong đó có quyền được sống, quyền được tự do và quyền mưu cầu hạnh phúc... Để đảm bảo những quyền này, chính quyền được lập ra trong nhân dân và có được quyền lực chính đáng trên cơ sở sự ưng thuận của dân chúng. Bất cứ khi nào một hình thức chính quyền nào phá hoại những mục tiêu này, thì nhân dân có quyền thay đổi hoặc lật đổ chính quyền đó...”`,
  },
  {
    id: 'doc-vn-tq-1300',
    title: 'Lời dặn của Trần Quốc Tuấn (1300) - Khoan thư sức dân',
    topic: 'Chủ đề 4: Chiến tranh bảo vệ Tổ quốc và giải phóng dân tộc',
    lesson: 'Bài 8: Một số bài học lịch sử rút ra từ các cuộc kháng chiến',
    source: 'Đại Việt sử ký toàn thư, Tập II, NXB Khoa học Xã hội, Hà Nội, 1998, tr. 77',
    text: `“Vua ngự đến thăm nhà riêng hỏi Quốc Tuấn rằng: ‘Nếu có giặc phương Bắc lại sang thì kế sách như thế nào?’. Quốc Tuấn thưa: ‘Ngày xưa Triệu Vũ dựng nước, vua Hán sai quân sang đánh, nhân dân làm kế thanh dã, đại quân kéo đến Khâm Châu, Liêm Châu đánh úp lại phía sau, đó là một thời... Vừa rồi Toa Đô, Ô Mã Nhi bốn mặt bao vây, vì vua tôi đồng tâm, anh em hòa mục, cả nước góp sức, giặc phải bị bắt, đó là trời giúp... Khoan thư sức dân để làm kế sâu rễ bền gốc, đó là thượng sách giữ nước’.”`,
  },
  {
    id: 'doc-vn-bn-1428',
    title: 'Bình Ngô đại cáo (1428) - Tư tưởng nhân nghĩa',
    topic: 'Chủ đề 4: Chiến tranh bảo vệ Tổ quốc và giải phóng dân tộc',
    lesson: 'Bài 7: Khái quát các cuộc kháng chiến và khởi nghĩa giành độc lập',
    source: 'Nguyễn Trãi, Bình Ngô đại cáo (1428), Đại Việt sử ký toàn thư',
    text: `“Việc nhân nghĩa cốt ở yên dân / Quân điếu phạt trước lo trừ bạo.
Như nước Đại Việt ta từ trước / Vốn xưng nền văn hiến đã lâu.
Núi sông bờ cõi đã chia / Phong tục Bắc Nam cũng khác.
Từ Triệu, Đinh, Lý, Trần bao đời gây nền độc lập / Cùng Hán, Đường, Tống, Nguyên mỗi bên xưng đế một phương.
Tuy mạnh yếu từng lúc khác nhau / Song hào kiệt đời nào cũng có...”`,
  },
  {
    id: 'doc-vn-hql-1396',
    title: 'Cải cách tiền giấy và ruộng đất của Hồ Quý Ly (1396 - 1397)',
    topic: 'Chủ đề 5: Một số cuộc cải cách lớn trong lịch sử Việt Nam',
    lesson: 'Bài 9: Cuộc cải cách của Hồ Quý Ly và triều Hồ',
    source: 'Khâm định Việt sử thông giám cương mục, Chính biên, Quyển XI',
    text: `“Mùa hạ, tháng 4 năm Bính Tý [1396], bắt đầu phát hành tiền giấy ‘Thông bảo hội sao’. Cứ 1 quan tiền đồng đổi lấy tiền giấy 1 quan 2 tiền... Cấm chỉ việc dùng tiền đồng, ai vi phạm sẽ bị tội tử hình, tài sản sung công. Đến năm Đinh Sửu [1397], Hồ Quý Ly ban hành chính sách hạn điền: Trừ đại vương và trưởng công chúa không bị hạn chế, còn lại quan lại đến thứ dân đều chỉ được sở hữu không quá 10 mẫu ruộng tư. Số ruộng thừa phải nộp lại cho triều đình làm ruộng công...”`,
  },
  {
    id: 'doc-vn-hs-1838',
    title: 'Châu bản triều Nguyễn về kiểm tra quần đảo Hoàng Sa (1838)',
    topic: 'Chủ đề 6: Lịch sử bảo vệ chủ quyền của Việt Nam ở Biển Đông',
    lesson: 'Bài 13: Lịch sử xác lập chủ quyền và bảo vệ các quyền ở Biển Đông',
    source: 'Châu bản triều Nguyễn, Minh Mạng năm thứ 19 (1838), Trung tâm Lưu trữ Quốc gia I',
    text: `“Bộ Công tâu: Hằng năm phái người ra Hoàng Sa đo đạc vẽ đồ đồ hải trình là việc rất quan trọng... Nay chuẩn bị sai Suất đội Thủy quân Phạm Văn Triều cùng binh thuyền dẫn đoàn sang đảo Hoàng Sa cắm cọc tiêu, thu nhặt hải vật, dựng bia khắc chữ để lưu lại dấu vết rõ ràng. Các đảo thuộc xứ Hoàng Sa non nước mênh mông, cần phải khảo sát tường tận địa thế, đo độ sâu của nước, ghi chép chu đáo vào tập bản đồ dâng lên Hoàng thượng ngự lãm...”`,
  },
  {
    id: 'doc-fra-1789',
    title: 'Tuyên ngôn Nhân quyền và Dân quyền Pháp (1789)',
    topic: 'Chủ đề 1: Cách mạng tư sản và sự phát triển của CNTB',
    lesson: 'Bài 1: Một số vấn đề chung về cách mạng tư sản',
    source: 'Tuyên ngôn Nhân quyền và Dân quyền Pháp do Quốc hội Lập hiến thông qua ngày 26-8-1789',
    text: `“Điều 1: Người ta sinh ra tự do và bình đẳng về quyền lợi; sự phân biệt xã hội chỉ có thể được thiết lập trên cơ sở lợi ích chung.
Điều 2: Mục đích của mọi tổ chức chính trị là bảo tồn các quyền tự nhiên và bất khả xâm phạm của con người. Đó là quyền tự do, quyền sở hữu, quyền an toàn và quyền chống lại sự áp bức.
Điều 3: Nguồn gốc của mọi chủ quyền về căn bản thuộc về Quốc dân...”`,
  },
];

export const DocumentQuizGenerator: React.FC<DocumentQuizGeneratorProps> = ({ onAskTeacher }) => {
  const [topicInput, setTopicInput] = useState('');
  const [documentInput, setDocumentInput] = useState('');
  const [quizType, setQuizType] = useState<'true_false' | 'multiple_choice' | 'essay'>('true_false');
  const [level, setLevel] = useState<'thong_hieu' | 'van_dung'>('thong_hieu');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState<any>(null);

  // States for answering the generated quiz
  const [userTFAnswers, setUserTFAnswers] = useState<Record<'a' | 'b' | 'c' | 'd', boolean | null>>({
    a: null,
    b: null,
    c: null,
    d: null,
  });
  const [isTFSubmitted, setIsTFSubmitted] = useState(false);

  const [userMCAnswers, setUserMCAnswers] = useState<Record<number, number>>({});
  const [isMCSubmitted, setIsMCSubmitted] = useState(false);

  const [essayAnswer, setEssayAnswer] = useState('');
  const [isGradingEssay, setIsGradingEssay] = useState(false);
  const [essayGradingResult, setEssayGradingResult] = useState<any>(null);

  const handleSelectCurated = (doc: typeof CURATED_DOCUMENTS[0]) => {
    setDocumentInput(doc.text);
    setTopicInput(`${doc.topic} - ${doc.lesson}`);
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!documentInput.trim() && !topicInput.trim()) {
      setErrorMsg('Vui lòng nhập đoạn tư liệu hoặc chọn chủ đề bài học để tạo bài tập.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');
    setGeneratedQuiz(null);
    setIsTFSubmitted(false);
    setUserTFAnswers({ a: null, b: null, c: null, d: null });
    setIsMCSubmitted(false);
    setUserMCAnswers({});
    setEssayAnswer('');
    setEssayGradingResult(null);

    try {
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicInput.trim() || 'Lịch sử 11',
          type: quizType,
          documentText: documentInput.trim(),
          level,
        }),
      });

      const rawText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }

      if (!res.ok) {
        let err = data?.error || '';
        if (!err) {
          if (rawText.includes('A server error') || rawText.includes('FUNCTION_INVOCATION') || rawText.includes('500')) {
            err = 'Máy chủ Vercel đang xử lý hoặc chưa cấu hình biến môi trường GEMINI_API_KEY. Vui lòng kiểm tra lại biến môi trường.';
          } else {
            err = `Lỗi máy chủ (${res.status})`;
          }
        }
        throw new Error(err);
      }

      setGeneratedQuiz(data);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Lỗi khi tạo bài tập từ tư liệu.');
    } finally {
      setIsLoading(false);
    }
  };

  // Grade TF
  const calculateTFScore = () => {
    if (!generatedQuiz || !generatedQuiz.statements) return 0;
    let count = 0;
    generatedQuiz.statements.forEach((st: any) => {
      if (userTFAnswers[st.id as 'a' | 'b' | 'c' | 'd'] === st.isCorrect) {
        count += 1;
      }
    });
    if (count === 4) return 1.0;
    if (count === 3) return 0.5;
    if (count === 2) return 0.25;
    if (count === 1) return 0.1;
    return 0;
  };

  const handleTFSubmit = () => {
    setIsTFSubmitted(true);
    const score = calculateTFScore();
    if (score === 1.0) {
      confetti({ particleCount: 70, spread: 80, origin: { y: 0.7 } });
    }
  };

  // Grade Essay
  const handleGradeGeneratedEssay = async () => {
    if (!essayAnswer.trim() || essayAnswer.trim().length < 15) {
      alert('Em hãy viết câu trả lời ít nhất 1-2 câu hoàn chỉnh để Thầy chấm điểm nhé!');
      return;
    }

    setIsGradingEssay(true);
    try {
      const res = await fetch('/api/grade-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: generatedQuiz.question || generatedQuiz.title,
          rubric: JSON.stringify(generatedQuiz.rubricCriteria || generatedQuiz.guidance),
          studentAnswer: essayAnswer,
          topicTitle: topicInput || generatedQuiz.topic || 'Lịch sử 11',
        }),
      });

      if (!res.ok) {
        throw new Error('Lỗi máy chủ khi chấm bài tự luận.');
      }

      const result = await res.json();
      setEssayGradingResult(result);
      if (result.score >= 8.0) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      }
    } catch (err: any) {
      alert(err.message || 'Có lỗi khi chấm bài tự luận.');
    } finally {
      setIsGradingEssay(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-red-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-7 mb-6 shadow-xl border border-amber-500/30">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Trợ Lý AI Thầy Dũng
          </span>
          <span className="text-xs bg-red-800 text-white px-2 py-0.5 rounded font-semibold">
            Bám Sát Tư Liệu Lịch Sử 11
          </span>
        </div>
        <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-100">
          Tạo Bài Tập Lịch Sử Bám Sát Tư Liệu (Chuẩn Cấu Trúc Bộ GD&ĐT)
        </h2>
        <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
          Dán đoạn tư liệu lịch sử của em hoặc chọn các đoạn trích kinh điển trong SGK &amp; Sách bài tập Lịch sử 11. Hệ thống AI sẽ tự động phân tích và tạo bài tập bám sát 100% nội dung tư liệu, chống học vẹt và rèn tư duy lịch sử chuyên sâu.
        </p>
      </div>

      {/* Input Form */}
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 mb-8 shadow-xs">
        <h3 className="font-serif-title text-base sm:text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-red-800" />
          <span>1. Nhập Hoặc Chọn Đoạn Tư Liệu Lịch Sử Cần Tạo Bài Tập</span>
        </h3>

        {/* Curated quick select pills */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
            Hoặc chọn nhanh tư liệu mẫu chuẩn SGK &amp; SBT Lịch sử 11:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {CURATED_DOCUMENTS.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => handleSelectCurated(doc)}
                className="text-left text-xs p-2.5 rounded-xl border border-stone-200 hover:border-amber-600 hover:bg-amber-50/50 transition bg-stone-50/80 group"
              >
                <div className="font-bold text-stone-800 group-hover:text-amber-900 line-clamp-1">
                  {doc.title}
                </div>
                <div className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                  {doc.topic}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Document Text Area */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Nội Dung Đoạn Tư Liệu (Ngữ liệu bắt buộc bám sát):
          </label>
          <textarea
            value={documentInput}
            onChange={(e) => setDocumentInput(e.target.value)}
            rows={5}
            placeholder="Dán đoạn tư liệu lịch sử từ đề thi, sách giáo khoa hoặc tư liệu em muốn tạo bài tập vào đây..."
            className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-stone-300 focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50 font-sans leading-relaxed"
          />
        </div>

        {/* Topic / Scope Input */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
            Chủ Đề / Tên Bài Học (Tùy chọn):
          </label>
          <input
            type="text"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
            placeholder="Ví dụ: Chủ đề 4: Bài 7 - Khái quát các cuộc kháng chiến bảo vệ Tổ quốc..."
            className="w-full text-xs sm:text-sm p-3 rounded-xl border border-stone-300 focus:outline-hidden focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 bg-stone-50/50"
          />
        </div>

        {/* Options Row: Type & Level */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-stone-100 mb-5">
          {/* Quiz Type */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Dạng Bài Tập Mong Muốn:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setQuizType('true_false')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                  quizType === 'true_false'
                    ? 'bg-red-800 text-white border-red-800 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <ToggleLeft className="w-4 h-4" />
                <span>Đúng - Sai</span>
              </button>

              <button
                type="button"
                onClick={() => setQuizType('multiple_choice')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                  quizType === 'multiple_choice'
                    ? 'bg-red-800 text-white border-red-800 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <CheckSquare className="w-4 h-4" />
                <span>4 Lựa Chọn</span>
              </button>

              <button
                type="button"
                onClick={() => setQuizType('essay')}
                className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center gap-1 border transition ${
                  quizType === 'essay'
                    ? 'bg-purple-800 text-white border-purple-800 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <PenTool className="w-4 h-4" />
                <span>Tự Luận</span>
              </button>
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
              Mức Độ Nhận Thức:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setLevel('thong_hieu')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                  level === 'thong_hieu'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Thông Hiểu (Chuẩn thi)
              </button>
              <button
                type="button"
                onClick={() => setLevel('van_dung')}
                className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                  level === 'van_dung'
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Vận Dụng (Nâng cao)
              </button>
            </div>
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-3.5 mb-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>{errorMsg}</div>
          </div>
        )}

        {/* Generate Button */}
        <button
          type="button"
          onClick={() => handleGenerate()}
          disabled={isLoading}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-800 via-amber-800 to-red-900 hover:from-red-900 hover:to-amber-900 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Thầy Dũng đang giải mã tư liệu và tạo bài tập...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Tạo Bài Tập Bám Sát Tư Liệu Này Ngay</span>
            </>
          )}
        </button>
      </div>

      {/* Render Generated Quiz */}
      {generatedQuiz && (
        <div className="bg-white border-2 border-amber-600/40 rounded-3xl p-6 mb-8 shadow-lg animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-red-800 text-white px-2.5 py-1 rounded-md">
                {generatedQuiz.type === 'true_false'
                  ? 'Dạng Đúng - Sai 4 Ý'
                  : generatedQuiz.type === 'essay'
                  ? 'Dạng Tự Luận Phân Tích'
                  : 'Dạng Trắc Nghiệm 4 Lựa Chọn'}
              </span>
              <span className="text-xs text-stone-600 font-semibold">
                {generatedQuiz.topic || topicInput || 'Lịch sử 11'}
              </span>
            </div>
            <button
              onClick={() => handleGenerate()}
              className="text-xs text-stone-600 hover:text-red-800 font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tạo bộ câu hỏi khác</span>
            </button>
          </div>

          {/* Passage Box */}
          {(generatedQuiz.passage || documentInput) && (
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-6 text-stone-900 leading-relaxed shadow-xs">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Đoạn Tư Liệu Lịch Sử Trích Dẫn:</span>
              </div>
              <div className="font-serif italic text-stone-800 text-xs sm:text-sm whitespace-pre-line pl-3 border-l-3 border-amber-700">
                {generatedQuiz.passage || documentInput}
              </div>
              {generatedQuiz.source && (
                <div className="text-[11px] text-stone-500 font-medium text-right mt-2">
                  — Nguồn: {generatedQuiz.source}
                </div>
              )}
            </div>
          )}

          {/* DẠNG 1: TRẮC NGHIỆM ĐÚNG - SAI */}
          {generatedQuiz.type === 'true_false' && generatedQuiz.statements && (
            <div>
              <p className="text-xs font-bold text-stone-700 mb-3">
                Trong mỗi ý a), b), c), d) dưới đây, học sinh hãy chọn Đúng hoặc Sai căn cứ vào đoạn tư liệu trên:
              </p>

              <div className="space-y-3 mb-6">
                {generatedQuiz.statements.map((st: any) => {
                  const userChoice = userTFAnswers[st.id as 'a' | 'b' | 'c' | 'd'];
                  const isCorrectAnswer = userChoice === st.isCorrect;

                  return (
                    <div
                      key={st.id}
                      className={`p-3.5 sm:p-4 rounded-2xl border transition ${
                        isTFSubmitted
                          ? isCorrectAnswer
                            ? 'bg-emerald-50/80 border-emerald-300'
                            : 'bg-rose-50/80 border-rose-300'
                          : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex items-start gap-2.5 flex-1">
                          <span className="font-bold text-sm text-stone-900 shrink-0 bg-white border border-stone-300 rounded-lg w-6 h-6 flex items-center justify-center">
                            {st.id})
                          </span>
                          <span className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                            {st.text}
                          </span>
                        </div>

                        {/* Choice buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                          <button
                            type="button"
                            disabled={isTFSubmitted}
                            onClick={() =>
                              setUserTFAnswers((prev) => ({ ...prev, [st.id]: true }))
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                              userChoice === true
                                ? 'bg-emerald-700 text-white shadow-xs'
                                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Đúng</span>
                          </button>

                          <button
                            type="button"
                            disabled={isTFSubmitted}
                            onClick={() =>
                              setUserTFAnswers((prev) => ({ ...prev, [st.id]: false }))
                            }
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                              userChoice === false
                                ? 'bg-rose-700 text-white shadow-xs'
                                : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Sai</span>
                          </button>
                        </div>
                      </div>

                      {/* Explanation after submit */}
                      {isTFSubmitted && (
                        <div className="mt-3 pt-3 border-t border-stone-200 text-xs">
                          <div className="flex items-center gap-1.5 font-bold mb-1">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] ${
                                st.isCorrect
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              Đáp án chính thức: {st.isCorrect ? 'ĐÚNG' : 'SAI'}
                            </span>
                            {isCorrectAnswer ? (
                              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Em đã chọn chính xác!
                              </span>
                            ) : (
                              <span className="text-rose-700 font-semibold flex items-center gap-1">
                                <XCircle className="w-3.5 h-3.5" /> Em chọn chưa đúng
                              </span>
                            )}
                          </div>
                          <p className="text-stone-700 leading-relaxed">{st.explanation}</p>
                          {st.trapTip && (
                            <div className="mt-1 text-amber-800 font-medium">
                              ⚠️ <strong>Cảnh giác:</strong> {st.trapTip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Submit / Score bar */}
              {!isTFSubmitted ? (
                <button
                  type="button"
                  onClick={handleTFSubmit}
                  className="w-full py-3 px-6 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm shadow-md transition"
                >
                  Nộp Bài &amp; Xem Thang Điểm Chuẩn Bộ GD&amp;ĐT
                </button>
              ) : (
                <div className="bg-stone-900 text-white p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                      Kết Quả Đánh Giá
                    </div>
                    <div className="text-lg font-bold">
                      Điểm đạt được: <span className="text-amber-400">{calculateTFScore()} / 1.0 điểm</span>
                    </div>
                    <div className="text-xs text-stone-300">
                      (Quy chế Bộ GD: 1 ý đúng = 0.1đ | 2 ý đúng = 0.25đ | 3 ý đúng = 0.5đ | 4 ý đúng = 1.0đ)
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsTFSubmitted(false);
                      setUserTFAnswers({ a: null, b: null, c: null, d: null });
                    }}
                    className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-center"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại câu này</span>
                  </button>
                </div>
              )}

              {/* Trap alert & Teacher advice */}
              {isTFSubmitted && (generatedQuiz.trapAlert || generatedQuiz.thayDungAnalysis) && (
                <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-300/70 text-xs sm:text-sm text-stone-800">
                  {generatedQuiz.trapAlert && (
                    <div className="mb-2">
                      <span className="font-bold text-amber-900 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4 text-amber-700" /> Bẫy Tư Liệu Cần Nhớ:
                      </span>
                      <p className="mt-0.5 text-stone-700">{generatedQuiz.trapAlert}</p>
                    </div>
                  )}
                  {generatedQuiz.thayDungAnalysis && (
                    <div>
                      <span className="font-bold text-red-900">Lời khuyên của Thầy Dũng:</span>
                      <p className="mt-0.5 italic text-stone-700">{generatedQuiz.thayDungAnalysis}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* DẠNG 2: TRẮC NGHIỆM 4 LỰA CHỌN */}
          {generatedQuiz.type === 'multiple_choice' && generatedQuiz.questions && (
            <div className="space-y-6">
              {generatedQuiz.questions.map((q: any, qIdx: number) => {
                const userChoice = userMCAnswers[qIdx];
                const isAnswered = userChoice !== undefined;
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={q.id || qIdx} className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-stone-50/60">
                    <div className="font-bold text-sm sm:text-base text-stone-900 mb-3 flex items-start gap-2">
                      <span className="text-red-800 font-extrabold">Câu {qIdx + 1}:</span>
                      <span>{q.question}</span>
                    </div>

                    <div className="space-y-2 mb-3">
                      {q.options.map((opt: string, optIdx: number) => {
                        let btnStyle = 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100';
                        if (isMCSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                          } else if (userChoice === optIdx) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-900';
                          }
                        } else if (userChoice === optIdx) {
                          btnStyle = 'bg-stone-900 text-white border-stone-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={isMCSubmitted}
                            onClick={() => setUserMCAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))}
                            className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {isMCSubmitted && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {isMCSubmitted && (
                      <div className="p-3.5 rounded-xl bg-white border border-stone-200 text-xs">
                        <div className="font-bold text-stone-900 mb-1">
                          {isCorrect ? (
                            <span className="text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Chính xác!
                            </span>
                          ) : (
                            <span className="text-rose-700 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Chưa chính xác. Đáp án đúng là {q.options[q.correctIndex]}
                            </span>
                          )}
                        </div>
                        <p className="text-stone-700 leading-relaxed mb-2">{q.explanation}</p>
                        {q.optionsAnalysis && (
                          <div className="space-y-1 text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                            {q.optionsAnalysis.map((oa: string, oaIdx: number) => (
                              <div key={oaIdx}>{oa}</div>
                            ))}
                          </div>
                        )}
                        {q.thayDungAdvice && (
                          <div className="mt-2 text-amber-900 font-medium italic">
                            💡 {q.thayDungAdvice}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              {!isMCSubmitted ? (
                <button
                  type="button"
                  onClick={() => setIsMCSubmitted(true)}
                  className="w-full py-3 px-6 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-sm shadow-md transition"
                >
                  Kiểm Tra Đáp Án &amp; Xem Phân Tích Bẫy
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMCSubmitted(false);
                    setUserMCAnswers({});
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs transition"
                >
                  Làm lại các câu này
                </button>
              )}
            </div>
          )}

          {/* DẠNG 3: TỰ LUẬN VẬN DỤNG */}
          {generatedQuiz.type === 'essay' && (
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-purple-50/80 border border-purple-200">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-1">
                  Câu Hỏi Tự Luận Vận Dụng:
                </div>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  {generatedQuiz.question || generatedQuiz.title}
                </h4>
              </div>

              {/* Student Answer Box */}
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Bài làm của em:
                </label>
                <textarea
                  value={essayAnswer}
                  onChange={(e) => setEssayAnswer(e.target.value)}
                  rows={6}
                  placeholder="Trình bày bài làm của em tại đây (luận điểm rõ ràng, dẫn chứng từ tư liệu lịch sử, phân tích ý nghĩa và liên hệ thực tiễn)..."
                  className="w-full text-xs sm:text-sm p-3.5 rounded-2xl border border-stone-300 focus:outline-hidden focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 bg-white"
                />
                <button
                  type="button"
                  onClick={handleGradeGeneratedEssay}
                  disabled={isGradingEssay}
                  className="mt-2 py-3 px-6 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isGradingEssay ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Thầy Dũng đang đọc và chấm điểm theo Rubric...</span>
                    </>
                  ) : (
                    <>
                      <PenTool className="w-4 h-4" />
                      <span>Chấm Điểm &amp; Nhận Xét Bằng AI Thầy Dũng</span>
                    </>
                  )}
                </button>
              </div>

              {/* Grading Result */}
              {essayGradingResult && (
                <div className="p-5 rounded-2xl bg-stone-900 text-white border border-purple-500/40 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div>
                      <div className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                        Kết Quả Chấm Bài Tự Luận
                      </div>
                      <div className="text-2xl font-bold text-amber-400">
                        {essayGradingResult.score} / 10.0 Điểm
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                      {essayGradingResult.score >= 8.5 ? 'Xuất Sắc' : essayGradingResult.score >= 7 ? 'Khá Giỏi' : 'Đạt'}
                    </span>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      Nhận Xét Chi Tiết Của Thầy Dũng:
                    </h5>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed whitespace-pre-line">
                      {essayGradingResult.feedback || essayGradingResult.detailedEvaluation}
                    </p>
                  </div>
                </div>
              )}

              {/* Guidance & Model Answer */}
              {generatedQuiz.guidance && (
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200 text-xs sm:text-sm">
                  <div className="font-bold text-stone-900 mb-2">
                    💡 Dàn Ý &amp; Gợi Ý Các Luận Điểm Cần Đạt:
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
                    {Array.isArray(generatedQuiz.guidance) ? (
                      generatedQuiz.guidance.map((g: string, idx: number) => <li key={idx}>{g}</li>)
                    ) : (
                      <li>{String(generatedQuiz.guidance)}</li>
                    )}
                  </ul>

                  {generatedQuiz.modelAnswer && (
                    <div className="mt-4 pt-4 border-t border-stone-200">
                      <div className="font-bold text-purple-900 mb-1">Bài Làm Mẫu Tham Khảo:</div>
                      <p className="text-stone-700 italic leading-relaxed whitespace-pre-line">
                        {generatedQuiz.modelAnswer}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Action button: Chat with teacher */}
          <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-stone-500">
              Cần Thầy Dũng phân tích sâu hơn về tư liệu này?
            </span>
            <button
              type="button"
              onClick={() => {
                const context = `Em muốn hỏi Thầy về đoạn tư liệu: "${(generatedQuiz.passage || documentInput).slice(0, 150)}..." trong bài học "${topicInput || generatedQuiz.topic}"`;
                onAskTeacher(context);
              }}
              className="py-2 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Hỏi Thầy Dũng Trong Khung Chat</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
