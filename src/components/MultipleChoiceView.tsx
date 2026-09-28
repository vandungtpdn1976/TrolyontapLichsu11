import React, { useState } from 'react';
import { MultipleChoiceQuestion, DifficultyLevel } from '../types/history';
import { TOPICS } from '../data/historyTopics';
import { CheckCircle2, XCircle, HelpCircle, MessageSquare, Lightbulb, Filter, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MultipleChoiceViewProps {
  questions: MultipleChoiceQuestion[];
  onAskTeacher: (context: string) => void;
}

export const MultipleChoiceView: React.FC<MultipleChoiceViewProps> = ({
  questions,
  onAskTeacher,
}) => {
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});

  // Filtered list
  const filteredQuestions = questions.filter((q) => {
    const matchTopic = selectedTopic === 'all' || q.topicId === selectedTopic;
    const matchLevel = selectedLevel === 'all' || q.level === selectedLevel;
    return matchTopic && matchLevel;
  });

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];
  const questionId = currentQ?.id;
  const selectedOption = questionId ? selectedAnswers[questionId] : undefined;
  const isSubmitted = questionId ? submittedQuestions[questionId] : false;

  const handleSelectOption = (idx: number) => {
    if (isSubmitted || !questionId) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: idx }));
  };

  const handleSubmit = () => {
    if (selectedOption === undefined || !questionId) return;
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }));
    if (selectedOption === currentQ.correctIndex) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
  };

  const handleReset = () => {
    if (!questionId) return;
    const nextAnswers = { ...selectedAnswers };
    delete nextAnswers[questionId];
    setSelectedAnswers(nextAnswers);

    const nextSubmitted = { ...submittedQuestions };
    delete nextSubmitted[questionId];
    setSubmittedQuestions(nextSubmitted);
  };

  // Score stats
  const totalAttempted = Object.keys(submittedQuestions).length;
  const totalCorrect = Object.entries(submittedQuestions).filter(([qId, submitted]) => {
    if (!submitted) return false;
    const q = questions.find((item) => item.id === qId);
    return q && selectedAnswers[qId] === q.correctIndex;
  }).length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Filter and Stats Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-700 text-white px-2 py-0.5 rounded">
                Dạng 1 &bull; 4 Phương Án
              </span>
              <span className="text-xs text-stone-500 font-medium">
                {filteredQuestions.length > 0 ? `Câu ${currentIndex + 1} / ${filteredQuestions.length}` : '0 câu'}
              </span>
            </div>
            <h2 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Trắc Nghiệm Nhiều Lựa Chọn (Chọn 1 Đáp Án Đúng)
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-xs">
            <Award className="w-5 h-5 text-amber-600" />
            <div>
              <span className="text-stone-500 block">Tiến độ luyện tập:</span>
              <span className="font-bold text-stone-900">
                Đúng {totalCorrect}/{totalAttempted} câu ({totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0}%)
              </span>
            </div>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mt-4 pt-4 border-t border-stone-100 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium">
            <Filter className="w-3.5 h-3.5 text-amber-700" />
            <span>Chủ đề:</span>
          </div>

          <select
            value={selectedTopic}
            onChange={(e) => {
              setSelectedTopic(e.target.value);
              setCurrentIndex(0);
            }}
            className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-none focus:border-amber-600"
          >
            <option value="all">Tất cả 6 Chủ đề</option>
            {TOPICS.map((t) => (
              <option key={t.id} value={t.id}>
                Chủ đề {t.number}: {t.title}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-1.5 text-xs text-stone-600 font-medium ml-2">
            <span>Mức độ:</span>
          </div>
          <div className="flex items-center gap-1">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'nhan_biet', label: 'Nhận biết' },
              { id: 'thong_hieu', label: 'Thông hiểu' },
              { id: 'van_dung', label: 'Vận dụng' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => {
                  setSelectedLevel(lvl.id);
                  setCurrentIndex(0);
                }}
                className={`text-xs px-2.5 py-1 rounded-md transition font-medium ${
                  selectedLevel === lvl.id
                    ? 'bg-amber-800 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question dots */}
        {filteredQuestions.length > 0 && (
          <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-stone-100 overflow-x-auto pb-1">
            {filteredQuestions.map((q, idx) => {
              const hasDone = submittedQuestions[q.id];
              const isCorrect = hasDone && selectedAnswers[q.id] === q.correctIndex;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition flex items-center justify-center shrink-0 ${
                    isCurrent
                      ? 'bg-red-800 text-white shadow-xs ring-2 ring-red-800/30'
                      : hasDone
                      ? isCorrect
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-stone-50 text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Main Question Display */}
      {currentQ ? (
        <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden mb-6">
          <div className="p-5 sm:p-7">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                {currentQ.lessonName || 'Lịch sử 11 GDPT 2018'}
              </span>
              <span className="text-xs text-stone-400 capitalize">
                {currentQ.level === 'nhan_biet'
                  ? 'Mức độ: Nhận biết'
                  : currentQ.level === 'thong_hieu'
                  ? 'Mức độ: Thông hiểu'
                  : 'Mức độ: Vận dụng'}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug mb-5">
              {currentQ.question}
            </h3>

            {/* Options A, B, C, D */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isThisSelected = selectedOption === idx;
                const isCorrectOption = currentQ.correctIndex === idx;

                let optClass = 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-800';
                if (isSubmitted) {
                  if (isCorrectOption) {
                    optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500';
                  } else if (isThisSelected) {
                    optClass = 'bg-rose-50 border-rose-500 text-rose-900';
                  } else {
                    optClass = 'bg-stone-50 border-stone-200 opacity-60 text-stone-500';
                  }
                } else if (isThisSelected) {
                  optClass = 'bg-amber-50 border-amber-600 text-amber-950 font-semibold ring-2 ring-amber-500/30';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3 ${optClass}`}
                  >
                    <div
                      className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isSubmitted
                          ? isCorrectOption
                            ? 'bg-emerald-600 text-white'
                            : isThisSelected
                            ? 'bg-rose-600 text-white'
                            : 'bg-stone-200 text-stone-600'
                          : isThisSelected
                          ? 'bg-amber-700 text-white'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-sm sm:text-base leading-relaxed flex-1">
                      {opt.replace(/^[A-D]\.\s*/, '')}
                    </span>
                    {isSubmitted && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    )}
                    {isSubmitted && isThisSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box - Structured according to Requirement 5 */}
            {isSubmitted && (
              <div className="mt-5 p-5 rounded-2xl bg-amber-50/90 border border-amber-300 text-sm space-y-4 shadow-xs">
                {/* Result header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-200">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-stone-900">Kết quả:</span>
                    <span className="bg-white px-2.5 py-0.5 rounded-md border border-stone-300 font-bold text-red-900">
                      Đáp án đúng: {String.fromCharCode(65 + currentQ.correctIndex)}
                    </span>
                    <span className="bg-white px-2.5 py-0.5 rounded-md border border-stone-300 font-semibold text-stone-700">
                      Em chọn: {selectedOption !== undefined ? String.fromCharCode(65 + selectedOption) : 'Chưa chọn'}
                    </span>
                  </div>

                  <span
                    className={`font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1 ${
                      selectedOption === currentQ.correctIndex
                        ? 'bg-emerald-600 text-white'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {selectedOption === currentQ.correctIndex ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>KẾT LUẬN: CHÍNH XÁC</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        <span>KẾT LUẬN: CHƯA ĐÚNG</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Explanation */}
                <div>
                  <h5 className="font-bold text-amber-950 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Giải thích bản chất kiến thức:</span>
                  </h5>
                  <p className="text-stone-800 leading-relaxed pl-5 font-medium">
                    {currentQ.explanation}
                  </p>
                </div>

                {/* Detailed Analysis of all 4 Options: A, B, C, D */}
                {currentQ.optionsAnalysis && (
                  <div className="pt-2">
                    <h5 className="font-bold text-stone-800 text-xs uppercase tracking-wider mb-2">
                      Phân tích từng phương án (Vì sao Đúng / Sai):
                    </h5>
                    <div className="space-y-1.5 pl-2">
                      {currentQ.optionsAnalysis.map((ana, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                          <span className="font-mono font-bold text-stone-900 shrink-0">• Phương án {String.fromCharCode(65 + i)}:</span>
                          <span className="leading-relaxed">{ana.replace(/^[A-D]:\s*/, '')}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Trap avoidance tip */}
                {currentQ.trapTip && (
                  <div className="p-3 rounded-xl bg-orange-100/70 border border-orange-300/80 text-xs text-orange-950 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-bold text-orange-900">Mẹo tránh bẫy từ khóa:</strong> {currentQ.trapTip}
                    </div>
                  </div>
                )}

                {currentQ.thayDungAdvice && (
                  <div className="pt-2 border-t border-amber-200 flex items-start gap-2">
                    <div className="w-6 h-6 rounded-md bg-stone-900 text-amber-300 font-serif-title font-bold text-xs flex items-center justify-center shrink-0">
                      T.D
                    </div>
                    <p className="text-xs text-amber-950 font-medium italic leading-relaxed">
                      <strong className="not-italic font-bold">Thầy Dũng dặn dò:</strong> {currentQ.thayDungAdvice}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Control buttons */}
            <div className="mt-6 pt-5 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={selectedOption === undefined}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 disabled:opacity-40 text-white font-bold text-sm shadow-sm transition disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kiểm tra đáp án</span>
                  </button>
                ) : (
                  <button
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-sm transition flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm lại</span>
                  </button>
                )}

                <button
                  onClick={() =>
                    onAskTeacher(
                      `Thầy Dũng ơi, em đang làm câu hỏi trắc nghiệm: "${currentQ.question}". Em muốn Thầy phân tích sâu hơn vì sao lại chọn đáp án ${String.fromCharCode(
                        65 + currentQ.correctIndex
                      )} và các bẫy thường gặp của dạng câu này ạ!`
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-medium text-xs sm:text-sm transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  <span>Hỏi Thầy Dũng</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (currentIndex < filteredQuestions.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                  }
                }}
                disabled={currentIndex >= filteredQuestions.length - 1}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-red-900 hover:text-red-950 disabled:opacity-30 disabled:cursor-not-allowed self-end sm:self-center"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-stone-200 rounded-2xl p-10 text-center text-stone-500">
          Không tìm thấy câu hỏi phù hợp với bộ lọc hiện tại. Em hãy thử đổi bộ lọc khác nhé!
        </div>
      )}
    </div>
  );
};
