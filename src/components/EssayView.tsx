import React, { useState } from 'react';
import { EssayQuestion, EssayGradingResult } from '../types/history';
import { BookOpen, PenTool, Sparkles, CheckCircle2, AlertCircle, HelpCircle, MessageSquare, ChevronDown, ChevronUp, Award, RotateCcw, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EssayViewProps {
  questions: EssayQuestion[];
  onAskTeacher: (context: string) => void;
}

export const EssayView: React.FC<EssayViewProps> = ({ questions, onAskTeacher }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studentAnswers, setStudentAnswers] = useState<Record<string, string>>({});
  const [gradingResults, setGradingResults] = useState<Record<string, EssayGradingResult>>({});
  const [isGrading, setIsGrading] = useState(false);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentQ = questions[currentIndex];
  const questionId = currentQ.id;
  const currentAnswer = studentAnswers[questionId] || '';
  const currentResult = gradingResults[questionId];

  const handleGrade = async () => {
    if (!currentAnswer.trim() || currentAnswer.trim().length < 20) {
      setErrorMessage('Bài làm của em cần dài ít nhất 20 kí tự để Thầy Dũng phân tích và chấm điểm nhé!');
      return;
    }

    setErrorMessage(null);
    setIsGrading(true);

    try {
      const response = await fetch('/api/grade-essay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQ.question,
          rubric: JSON.stringify(currentQ.rubricCriteria) + '\n\nĐáp án chuẩn:\n' + currentQ.modelAnswer,
          studentAnswer: currentAnswer,
          topicTitle: currentQ.lessonName,
        }),
      });

      const rawText = await response.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        data = null;
      }

      if (!response.ok) {
        let errorMsg = data?.error || '';
        if (!errorMsg) {
          if (rawText.includes('A server error') || rawText.includes('FUNCTION_INVOCATION') || rawText.includes('500')) {
            errorMsg =
              'Máy chủ Vercel đang xử lý hoặc chưa cấu hình biến môi trường GEMINI_API_KEY. Vui lòng kiểm tra lại cài đặt Vercel.';
          } else {
            errorMsg = `Lỗi máy chủ (${response.status})`;
          }
        }
        throw new Error(errorMsg);
      }

      const result: EssayGradingResult = data;
      setGradingResults((prev) => ({ ...prev, [questionId]: result }));

      if (result.score >= 8.0) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Có lỗi xảy ra khi chấm bài. Em vui lòng thử lại nhé!');
    } finally {
      setIsGrading(false);
    }
  };

  const handleFillSample = () => {
    // Fill with an exemplary student answer for quick testing
    const sample = `Kính gửi Thầy Dũng, em xin trình bày bài làm của mình:
1. Về bài học Đại đoàn kết toàn dân tộc trong lịch sử:
Dân tộc ta có truyền thống yêu nước nồng nàn, mỗi khi có giặc ngoại xâm thì tinh thần ấy lại kết thành một làn sóng vô cùng mạnh mẽ. 
- Thời Trần, trước sức mạnh của quân Mông - Nguyên, vua Trần mở Hội nghị Diên Hồng tập hợp ý chí muôn dân, "vua tôi đồng tâm, anh em hòa mục, cả nước góp sức" (Trần Quốc Tuấn). Kế sách thanh dã (vườn không nhà trống) chỉ có thể thực hiện thành công khi toàn thể nhân dân đồng lòng hy sinh của cải, sơ tán theo lệnh triều đình.
- Trong Khởi nghĩa Lam Sơn, Nguyễn Trãi khẳng định: "Việc nhân nghĩa cốt ở yên dân", nhân dân bốn phương hưởng ứng, đoàn kết một lòng đánh đuổi giặc Minh.
- Phong trào Tây Sơn: Vua Quang Trung quy tụ nhân tài và sĩ phu Bắc Hà, làm nên chiến thắng Ngọc Hồi - Đống Đa oanh liệt mùa xuân 1789.

2. Ý nghĩa đối với ngày nay:
Trong công cuộc đổi mới hiện nay, bài học đại đoàn kết toàn dân tộc là sức mạnh cội nguồn để giữ vững độc lập, chủ quyền biển đảo (đặc biệt tại Hoàng Sa, Trường Sa) và phát triển kinh tế bền vững.

3. Trách nhiệm bản thân:
Là một học sinh THPT thế hệ mới, em nhận thấy bản thân cần ra sức học tập thật giỏi, rèn luyện đạo đức trong sáng, xây dựng tình bạn đoàn kết, tôn trọng sự khác biệt và tích cực tuyên truyền bảo vệ chủ quyền biên cương hải đảo thiêng liêng của Tổ quốc.`;

    setStudentAnswers((prev) => ({ ...prev, [questionId]: sample }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header banner */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-purple-800 text-white px-2 py-0.5 rounded">
                Dạng 3 &bull; Tự Luận 4 Bước Chuẩn Sư Phạm
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Câu {currentIndex + 1} / {questions.length}
              </span>
            </div>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Tự Luận Giải Quyết Vấn Đề & Liên Hệ Thực Tiễn
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-purple-50 text-purple-900 border border-purple-200 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              Chấm điểm tự động bởi Thầy Dũng AI
            </span>
          </div>
        </div>

        {/* 4-Step Process Guide (Requirement 7) */}
        <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-700">
            <strong className="text-purple-900 block font-bold">Bước 1. Đưa đề bài</strong>
            <span className="text-[11px] text-stone-500">Phân tích yêu cầu và định hướng</span>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-700">
            <strong className="text-purple-900 block font-bold">Bước 2. Học sinh tự làm</strong>
            <span className="text-[11px] text-stone-500">Không đưa đáp án trước</span>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-700">
            <strong className="text-purple-900 block font-bold">Bước 3. Chấm bài công tâm</strong>
            <span className="text-[11px] text-stone-500">Đánh giá 8 tiêu chuẩn năng lực</span>
          </div>
          <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-stone-700">
            <strong className="text-purple-900 block font-bold">Bước 4. Đáp án tham khảo</strong>
            <span className="text-[11px] text-stone-500">Mở → Chính → Phân tích → Đánh giá → Kết</span>
          </div>
        </div>

        {/* Question Selector Dots */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-100 overflow-x-auto pb-1">
          {questions.map((q, idx) => {
            const hasGraded = !!gradingResults[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => {
                  setCurrentIndex(idx);
                  setShowModelAnswer(false);
                  setErrorMessage(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shrink-0 ${
                  isCurrent
                    ? 'bg-purple-800 text-white shadow-xs'
                    : hasGraded
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-stone-50 text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                <span>Chủ đề {idx + 4}:</span>
                <span className="truncate max-w-[120px]">{q.lessonName?.replace(/Bài \d+:\s*/, '')}</span>
                {hasGraded && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="p-5 sm:p-7 border-b border-stone-200">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-purple-900 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
              {currentQ.lessonName}
            </span>
            <span className="text-xs font-semibold text-stone-500">Thang điểm: 10.0 đ</span>
          </div>

          <h3 className="font-serif-title text-lg sm:text-xl font-bold text-stone-900 mb-3">
            {currentQ.title}
          </h3>

          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
            {currentQ.question}
          </div>

          {/* Key guidance points */}
          <div className="mt-4 pt-3 border-t border-stone-100">
            <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-purple-700" />
              Các ý chính định hướng bài làm:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-stone-600">
              {currentQ.guidance.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5 bg-stone-50 p-2 rounded-lg border border-stone-200/60">
                  <span className="text-purple-700 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Student Editor Section */}
        <div className="p-5 sm:p-7 bg-stone-50/50">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-purple-700" />
              <span>Phần làm bài của em:</span>
            </label>

            <button
              onClick={handleFillSample}
              className="text-xs text-purple-800 hover:text-purple-950 font-medium underline flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Thử nạp bài mẫu của học sinh</span>
            </button>
          </div>

          <textarea
            rows={10}
            value={currentAnswer}
            onChange={(e) => {
              setStudentAnswers((prev) => ({ ...prev, [questionId]: e.target.value }));
              setErrorMessage(null);
            }}
            placeholder="Em hãy vận dụng kiến thức lịch sử, dẫn chứng các sự kiện cụ thể và phân tích logic theo các ý của câu hỏi..."
            className="w-full bg-white border border-stone-300 rounded-xl p-4 text-stone-900 text-sm sm:text-base leading-relaxed placeholder-stone-400 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-500/20 transition-all font-sans"
          />

          <div className="flex items-center justify-between text-xs text-stone-500 mt-2">
            <span>Số từ: {currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0} từ &bull; {currentAnswer.length} kí tự</span>
            <span>Khuyến khích: Viết mạch lạc, chia thành các luận điểm rõ ràng (1, 2, 3...)</span>
          </div>

          {errorMessage && (
            <div className="mt-3 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={handleGrade}
                disabled={isGrading || !currentAnswer.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-800 via-indigo-900 to-purple-900 hover:from-purple-900 hover:to-indigo-950 disabled:opacity-40 text-white font-bold text-sm shadow-md transition disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGrading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Thầy Dũng đang thẩm định và chấm điểm...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Thầy Dũng Chấm Điểm Bằng AI</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="px-3.5 py-2.5 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5"
              >
                <span>{showModelAnswer ? 'Ẩn đáp án mẫu' : 'Xem đáp án mẫu chuẩn'}</span>
                {showModelAnswer ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>

            <button
              onClick={() =>
                onAskTeacher(
                  `Thầy Dũng ơi, với câu hỏi tự luận: "${currentQ.title}", em muốn Thầy chỉ cho em cách mở bài gây ấn tượng và các dẫn chứng đắt giá nhất để đạt điểm 9-10 ạ!`
                )
              }
              className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-medium text-xs sm:text-sm transition flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>Hỏi Thầy Dũng về đề này</span>
            </button>
          </div>
        </div>

        {/* Model Answer Drawer - 5 Steps as per Requirement 7 */}
        {showModelAnswer && (
          <div className="p-5 sm:p-7 bg-amber-50/60 border-t border-amber-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-serif-title text-base sm:text-lg font-bold text-amber-950 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-700" />
                Đáp Án Tham Khảo Chuẩn 5 Phần Của Thầy Dũng
              </h4>
              <span className="text-xs bg-amber-200/70 text-amber-900 font-bold px-2.5 py-1 rounded-full border border-amber-300">
                Bước 4: Chuẩn GDPT 2018
              </span>
            </div>

            {currentQ.modelAnswerStructured ? (
              <div className="space-y-3">
                <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block mb-1">
                    1. Mở đoạn / Mở bài ngắn gọn
                  </span>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {currentQ.modelAnswerStructured.introduction}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block mb-1">
                    2. Các luận điểm chính
                  </span>
                  <ul className="list-disc list-inside space-y-1 text-sm text-stone-800">
                    {currentQ.modelAnswerStructured.mainPoints?.map((pt: string, i: number) => (
                      <li key={i}>{pt}</li>
                    )) || <li>{currentQ.modelAnswerStructured.noiDungChinh}</li>}
                  </ul>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block mb-1">
                    3. Phân tích – Dẫn chứng lịch sử xác thực
                  </span>
                  <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                    {currentQ.modelAnswerStructured.analysisAndEvidence}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block mb-1">
                    4. Đánh giá – Liên hệ thực tiễn hiện nay
                  </span>
                  <p className="text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                    {currentQ.modelAnswerStructured.evaluationAndConnection}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-900 block mb-1">
                    5. Kết luận & Bài học lịch sử
                  </span>
                  <p className="text-sm text-stone-800 leading-relaxed">
                    {currentQ.modelAnswerStructured.conclusion}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-amber-200/80 rounded-xl p-4 sm:p-5 text-sm sm:text-base text-stone-800 leading-relaxed whitespace-pre-line shadow-xs">
                {currentQ.modelAnswer}
              </div>
            )}
          </div>
        )}

        {/* AI Scorecard Result */}
        {currentResult && (
          <div className="p-5 sm:p-7 bg-gradient-to-br from-stone-900 via-purple-950 to-stone-900 text-white border-t border-purple-800/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 p-0.5 shadow-lg">
                  <div className="w-full h-full bg-stone-950 rounded-[14px] flex flex-col items-center justify-center">
                    <span className="font-serif-title font-bold text-2xl text-amber-300">
                      {currentResult.score}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold">/ 10 đ</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif-title text-xl font-bold text-amber-200">
                      Phiếu Đánh Giá Của Thầy Dũng
                    </h4>
                    <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/30 font-medium">
                      {currentResult.score >= 8.5 ? 'Xuất sắc' : currentResult.score >= 7.0 ? 'Khá giỏi' : 'Đạt yêu cầu'}
                    </span>
                  </div>
                  <p className="text-stone-300 text-sm mt-1 leading-relaxed">
                    {currentResult.feedbackSummary}
                  </p>
                </div>
              </div>
            </div>

            {/* Criteria Breakdown Grid */}
            <div className="mt-5 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Chi tiết điểm từng tiêu chí chấm:
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentResult.criteriaBreakdown?.map((crit, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm font-semibold mb-1">
                      <span className="text-stone-200">{crit.criterion}</span>
                      <span className="text-amber-300 font-bold shrink-0 ml-2">
                        {crit.score} / {crit.max} đ
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed mt-1">
                      {crit.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths & Improvements */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentResult.strengths?.length > 0 && (
                <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-4">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Điểm sáng của bài làm:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {currentResult.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {currentResult.improvements?.length > 0 && (
                <div className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-4">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    Điểm cần hoàn thiện thêm:
                  </span>
                  <ul className="space-y-1.5 text-xs text-stone-300">
                    {currentResult.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Teacher's personal advice */}
            {currentResult.teacherAdvice && (
              <div className="mt-5 pt-4 border-t border-white/10 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-serif-title font-bold text-xs shrink-0">
                  T.D
                </div>
                <div>
                  <p className="text-xs text-amber-300 font-bold">Lời dặn dò của Thầy Dũng:</p>
                  <p className="text-xs sm:text-sm text-stone-300 italic mt-0.5 leading-relaxed">
                    "{currentResult.teacherAdvice}"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
