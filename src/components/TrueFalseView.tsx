import React, { useState } from 'react';
import { TrueFalseQuestion } from '../types/history';
import { BookOpen, CheckCircle2, XCircle, AlertCircle, AlertTriangle, HelpCircle, MessageSquare, Award, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrueFalseViewProps {
  questions: TrueFalseQuestion[];
  onAskTeacher: (context: string) => void;
}

export const TrueFalseView: React.FC<TrueFalseViewProps> = ({ questions, onAskTeacher }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, Record<'a' | 'b' | 'c' | 'd', boolean | null>>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  const currentQ = questions[currentIndex];
  const questionId = currentQ.id;

  const currentAnswers = selectedAnswers[questionId] || {
    a: null,
    b: null,
    c: null,
    d: null,
  };

  const isSubmitted = submittedQuestions[questionId] || false;

  const handleSelect = (stmtId: 'a' | 'b' | 'c' | 'd', val: boolean) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || { a: null, b: null, c: null, d: null }),
        [stmtId]: val,
      },
    }));
  };

  // Calculate score for this question according to official MOET rules:
  // 1 correct statement: 0.1 pt
  // 2 correct statements: 0.25 pt
  // 3 correct statements: 0.50 pt
  // 4 correct statements: 1.00 pt
  const calculateScore = () => {
    let correctCount = 0;
    currentQ.statements.forEach((st) => {
      if (currentAnswers[st.id] === st.isCorrect) {
        correctCount += 1;
      }
    });

    if (correctCount === 4) return 1.0;
    if (correctCount === 3) return 0.5;
    if (correctCount === 2) return 0.25;
    if (correctCount === 1) return 0.1;
    return 0;
  };

  const handleSubmit = () => {
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    const score = calculateScore();
    if (score === 1.0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleReset = () => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: { a: null, b: null, c: null, d: null },
    }));
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: false }));
  };

  const allAnswered =
    currentAnswers.a !== null &&
    currentAnswers.b !== null &&
    currentAnswers.c !== null &&
    currentAnswers.d !== null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Title & Guidelines Header */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-red-800 text-white px-2 py-0.5 rounded">
                Dạng Thức Mới GDPT 2018
              </span>
              <span className="text-xs text-stone-500 font-medium">
                Câu {currentIndex + 1} / {questions.length}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 mt-1 tracking-tight">
              Phần II: Trắc Nghiệm Đúng - Sai Theo Ngữ Liệu Lịch Sử
            </h2>
          </div>

          <div className="bg-white/90 border border-amber-300 rounded-xl px-3.5 py-2 text-xs text-stone-800 shadow-2xs">
            <span className="font-bold text-red-900 block mb-0.5">Quy tắc tính điểm Bộ GD&ĐT:</span>
            <span>1 ý = 0.1đ &bull; 2 ý = 0.25đ &bull; 3 ý = 0.5đ &bull; 4 ý = 1.0đ</span>
          </div>
        </div>

        {/* Question Selector Dots */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-amber-200/60 overflow-x-auto pb-1">
          {questions.map((q, idx) => {
            const hasDone = submittedQuestions[q.id];
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition flex items-center justify-center shrink-0 ${
                  isCurrent
                    ? 'bg-red-800 text-white shadow-xs ring-2 ring-red-800/30'
                    : hasDone
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden mb-6">
        {/* Historical Passage Card */}
        <div className="bg-gradient-to-b from-amber-50/70 via-stone-50 to-white p-5 sm:p-7 border-b border-stone-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              Tư liệu lịch sử gốc
            </span>
            <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-medium">
              {currentQ.lessonName || 'Lịch sử 11 GDPT 2018'}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-stone-900 mb-3 leading-snug">
            {currentQ.title}
          </h3>

          <div className="relative pl-5 py-3 border-l-4 border-amber-600 bg-amber-50/50 rounded-r-xl italic text-stone-800 leading-relaxed text-sm sm:text-base font-serif">
            <span className="text-amber-400 text-3xl font-serif absolute -top-1 left-1 select-none">“</span>
            {currentQ.passage}
          </div>

          <div className="mt-3 text-right text-xs text-stone-600 font-medium">
            — <span className="italic">{currentQ.source}</span>
          </div>
        </div>

        {/* 4 Statements Section */}
        <div className="p-5 sm:p-7 space-y-4">
          {/* Trap word awareness banner (Requirement 6) */}
          <div className="bg-amber-50 border border-amber-300 rounded-xl p-3.5 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-900 font-bold block mb-0.5">
                Cảnh giác từ bẫy trong câu hỏi Đúng - Sai (Bộ GD&ĐT):
              </strong>
              <span className="text-stone-700">
                Hãy quan sát kỹ các từ tuyệt đối hóa hoặc hạn định: <code className="bg-white px-1 rounded text-red-900 font-bold">luôn luôn</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">hoàn toàn</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">duy nhất</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">tất cả</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">chỉ</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">chủ yếu</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">trực tiếp</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">gián tiếp</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">đầu tiên</code>, <code className="bg-white px-1 rounded text-red-900 font-bold">quan trọng nhất</code>.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-800 shrink-0"></span>
              <span>Trong các nhận định a), b), c), d) dưới đây, nhận định nào là ĐÚNG, nhận định nào là SAI?</span>
            </h4>
            {isSubmitted && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 rounded-full font-bold text-sm shrink-0">
                <Award className="w-4 h-4 text-amber-700" />
                <span>Điểm đạt: {calculateScore()} / 1.0 đ</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            {currentQ.statements.map((stmt) => {
              const currentVal = currentAnswers[stmt.id];
              const isCorrectUserChoice = currentVal === stmt.isCorrect;

              return (
                <div
                  key={stmt.id}
                  className={`p-4 rounded-xl border transition ${
                    isSubmitted
                      ? isCorrectUserChoice
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : 'bg-rose-50/70 border-rose-300'
                      : 'bg-stone-50/80 border-stone-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-900 font-bold text-xs shrink-0 mt-0.5 tracking-wide">
                        Ý {stmt.id})
                      </span>
                      <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-normal">
                        {stmt.text}
                      </p>
                    </div>

                    {/* Choices buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelect(stmt.id, true)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          currentVal === true
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Đúng</span>
                      </button>

                      <button
                        type="button"
                        disabled={isSubmitted}
                        onClick={() => handleSelect(stmt.id, false)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          currentVal === false
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Sai</span>
                      </button>
                    </div>
                  </div>

                  {/* Feedback explanation after submit according to Requirement 6 */}
                  {isSubmitted && (
                    <div className="mt-3 pt-3 border-t border-stone-200/80 text-xs sm:text-sm space-y-2">
                      <div className="flex items-start gap-2">
                        {isCorrectUserChoice ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-bold text-stone-900">
                              Đáp án chuẩn Bộ GD&ĐT:{' '}
                              <span className={stmt.isCorrect ? 'text-emerald-700 font-extrabold' : 'text-rose-700 font-extrabold'}>
                                {stmt.isCorrect ? 'ĐÚNG' : 'SAI'}
                              </span>
                            </span>
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              isCorrectUserChoice ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {isCorrectUserChoice ? '✓ Bạn chọn chính xác' : '✗ Bạn chọn chưa chính xác'}
                            </span>
                          </div>

                          <div className="mt-1.5 text-stone-700 leading-relaxed bg-white/60 p-2.5 rounded-lg border border-stone-200/60">
                            <span className="font-semibold text-stone-900">Bản chất lịch sử: </span>
                            {stmt.explanation}
                          </div>

                          {/* Trap warning from Requirement 6 */}
                          {stmt.trapKeywords && stmt.trapKeywords.length > 0 && (
                            <div className="mt-1.5 p-2 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                              <div className="text-[11px] leading-tight">
                                <span className="font-bold text-amber-900">Mẹo tránh bẫy: </span>
                                Chú ý các từ khóa bẫy:{' '}
                                {stmt.trapKeywords.map((kw, i) => (
                                  <span key={i} className="inline-block px-1.5 py-0.2 mx-0.5 bg-amber-200/80 text-amber-900 rounded font-semibold text-[10px]">
                                    "{kw}"
                                  </span>
                                ))}
                                {stmt.trapAlert && <span className="block mt-0.5 text-amber-800">{stmt.trapAlert}</span>}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-stone-200">
            <div className="flex items-center gap-2">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 disabled:opacity-40 text-white font-bold text-sm shadow-sm transition disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Nộp bài & Chấm điểm</span>
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại câu này</span>
                </button>
              )}

              <button
                onClick={() =>
                  onAskTeacher(
                    `Thầy Dũng ơi, em đang làm câu hỏi trắc nghiệm Đúng - Sai: "${currentQ.title}". Đoạn tư liệu là: "${currentQ.passage.substring(
                      0,
                      150
                    )}...". Thầy giải thích thêm giúp em vì sao nhận định lại như vậy với ạ!`
                  )
                }
                className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-medium text-xs sm:text-sm transition flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>Hỏi Thầy Dũng về tư liệu này</span>
              </button>
            </div>

            <button
              onClick={() => {
                if (currentIndex < questions.length - 1) {
                  setCurrentIndex(currentIndex + 1);
                }
              }}
              disabled={currentIndex >= questions.length - 1}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-900 hover:text-red-950 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <span>Câu tiếp theo</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Teacher Dũng's Pedagogical Analysis */}
        {isSubmitted && (
          <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-red-950 text-white p-5 sm:p-6 border-t border-amber-600/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center font-serif-title font-bold text-amber-300 text-sm shrink-0">
                T.D
              </div>
              <div>
                <h5 className="font-serif-title text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2">
                  Lời Phân Tích Chuyên Sâu Của Thầy Dũng
                </h5>
                <p className="text-stone-300 text-sm leading-relaxed mt-1">
                  {currentQ.thayDungAnalysis}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
