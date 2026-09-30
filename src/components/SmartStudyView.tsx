import React, { useState } from 'react';
import { SmartStudyData, DifficultyLevel } from '../types/history';
import { PRESET_SMART_STUDY_DATA } from '../data/smartStudyTopics';
import { TOPICS } from '../data/historyTopics';
import {
  BookOpen,
  KeyRound,
  GitCommit,
  GitBranch,
  Split,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Award,
  Layers,
  Search,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SmartStudyViewProps {
  onAskTeacher: (context: string) => void;
  onGoToPractice?: (topicId: string) => void;
}

export const SmartStudyView: React.FC<SmartStudyViewProps> = ({ onAskTeacher, onGoToPractice }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('chu-de-1');
  const [studyData, setStudyData] = useState<SmartStudyData>(PRESET_SMART_STUDY_DATA['chu-de-1']);
  const [activeSection, setActiveSection] = useState<'all' | 'core' | 'keywords' | 'cause_effect' | 'comparison' | 'mistakes' | 'mindmap' | 'practice'>('all');

  // AI Generator state
  const [customTopicInput, setCustomTopicInput] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Practice mini quiz state
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    if (PRESET_SMART_STUDY_DATA[id]) {
      setStudyData(PRESET_SMART_STUDY_DATA[id]);
    } else {
      // Trigger AI generation if not in preset
      const found = TOPICS.find((t) => t.id === id);
      if (found) {
        generateStudyDataForTopic(found.title, found.lessons[0]);
      }
    }
    setUserAnswers({});
    setQuizSubmitted(false);
  };

  const generateStudyDataForTopic = async (topicTitle: string, lessonName: string) => {
    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/smart-study', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicTitle, lessonName }),
      });

      const rawText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(rawText);
      } catch {
        // non-JSON
      }

      if (!res.ok) {
        let errorMsg = data?.error || '';
        if (!errorMsg) {
          if (rawText.includes('A server error') || rawText.includes('FUNCTION_INVOCATION')) {
            errorMsg =
              'Máy chủ Vercel đang xử lý hoặc chưa cấu hình biến môi trường GEMINI_API_KEY. Vui lòng kiểm tra lại cài đặt Vercel.';
          } else {
            errorMsg = rawText || `Lỗi máy chủ (${res.status})`;
          }
        }
        throw new Error(errorMsg);
      }

      if (!data) {
        throw new Error('Dữ liệu từ máy chủ không hợp lệ. Em hãy bấm tạo lại nhé!');
      }

      setStudyData(data);
      setUserAnswers({});
      setQuizSubmitted(false);
    } catch (err: any) {
      console.error(err);
      alert('Có lỗi khi tạo nội dung ôn tập: ' + (err.message || 'Lỗi không xác định'));
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleCustomGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopicInput.trim()) return;
    generateStudyDataForTopic(customTopicInput.trim(), customTopicInput.trim());
  };

  // Evaluation breakdown (Đã nắm vững – Cần củng cố – Chưa nắm)
  const questions = studyData.threeLevelQuestions || [];
  const correctCount = questions.filter((q, idx) => userAnswers[idx] === q.correctIndex).length;

  const getMasteryReport = () => {
    const mastered: string[] = [];
    const reviewNeeded: string[] = [];
    const notMastered: string[] = [];

    questions.forEach((q, idx) => {
      const isRight = userAnswers[idx] === q.correctIndex;
      const levelLabel = q.level === 'nhan_biet' ? 'Nhận biết' : q.level === 'thong_hieu' ? 'Thông hiểu' : 'Vận dụng';
      const label = `Câu ${idx + 1} (${levelLabel}): ${q.question.substring(0, 45)}...`;

      if (isRight) {
        mastered.push(label);
      } else if (userAnswers[idx] !== undefined) {
        notMastered.push(label);
      } else {
        reviewNeeded.push(label);
      }
    });

    return { mastered, reviewNeeded, notMastered };
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    if (correctCount === questions.length && questions.length > 0) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-900 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 mb-6 shadow-xl border border-amber-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
                Chế Độ Ôn Tập Thông Minh 9 Bước
              </span>
              <span className="text-xs bg-red-800 text-white px-2 py-0.5 rounded font-semibold">
                Chuẩn GDPT 2018
              </span>
            </div>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-100 mt-2">
              Hệ Thống Hóa Kiến Thức Khoa Học & Rèn Luyện Tư Duy Lịch Sử
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
              Học hiểu bản chất thay vì học vẹt. Trả lời 10 câu hỏi cốt lõi: <em>Chuyện gì? Khi nào? Ở đâu? Vì sao? Diễn biến? Kết quả? Ý nghĩa? Tác động? Quan hệ trước - sau? Bài học lịch sử?</em>
            </p>
          </div>

          {/* Quick AI Lesson Generator */}
          <form
            onSubmit={handleCustomGenerate}
            className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 flex flex-col sm:flex-row gap-2 shrink-0 max-w-md w-full"
          >
            <input
              type="text"
              value={customTopicInput}
              onChange={(e) => setCustomTopicInput(e.target.value)}
              placeholder="Nhập tên bài học / chủ đề muốn ôn..."
              className="flex-1 bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={isGeneratingAI || !customTopicInput.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 shrink-0"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isGeneratingAI ? 'Đang soạn...' : 'Gia sư AI Soạn'}</span>
            </button>
          </form>
        </div>

        {/* Topic Pills */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto pb-1 text-xs">
          <span className="text-amber-300 font-semibold shrink-0">Chủ đề mẫu:</span>
          <button
            onClick={() => handleSelectTopic('on-tap-cuoi-ki-1')}
            className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition flex items-center gap-1.5 ${
              selectedTopicId === 'on-tap-cuoi-ki-1'
                ? 'bg-red-600 text-white font-bold shadow-md ring-2 ring-red-400'
                : 'bg-red-950/70 text-red-200 border border-red-500/40 hover:bg-red-900'
            }`}
          >
            <span>⭐ Ôn Cuối Kỳ I (2025)</span>
          </button>
          {TOPICS.map((t) => {
            const isSelected = selectedTopicId === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelectTopic(t.id)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-white/10 text-stone-200 hover:bg-white/20'
                }`}
              >
                <span>{t.number <= 6 ? `Chủ đề ${t.number}` : `Chuyên đề ${t.number - 6}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Tabs for the 6 Sections */}
      <div className="bg-white border border-stone-200 rounded-2xl p-2 mb-6 shadow-xs flex items-center gap-1 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'all', label: 'Toàn Bộ Cẩm Nang' },
          { id: 'core', label: 'A. Kiến Thức Cốt Lõi' },
          { id: 'keywords', label: 'B. Từ Khóa Lịch Sử' },
          { id: 'cause_effect', label: 'C. Quan Hệ Nhân - Quả' },
          { id: 'comparison', label: 'D. Bảng So Sánh' },
          { id: 'mistakes', label: 'E. Điểm Dễ Nhầm' },
          { id: 'mindmap', label: 'F. Sơ Đồ Tư Duy' },
          { id: 'practice', label: 'G. Luyện 3 Mức Độ' },
        ].map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveSection(sec.id as any)}
            className={`px-3 py-2 rounded-xl transition shrink-0 ${
              activeSection === sec.id
                ? 'bg-red-800 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* Active Content Container */}
      <div className="space-y-6">
        {/* Topic Title Bar */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold text-red-800 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full uppercase">
              {studyData.topicTitle}
            </span>
            <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              {studyData.lessonName}
            </h3>
          </div>

          <button
            onClick={() =>
              onAskTeacher(
                `Thầy Dũng ơi, em đang ôn tập bài: "${studyData.lessonName}". Em muốn Thầy phân tích cho em quan hệ nguyên nhân - kết quả và những câu hỏi vận dụng thường xuất hiện trong đề thi ạ!`
              )
            }
            className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <span>Hỏi Thầy Dũng về bài này</span>
          </button>
        </div>

        {/* SECTION A: KIẾN THỨC CỐT LÕI */}
        {(activeSection === 'all' || activeSection === 'core') && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h4 className="font-serif-title text-lg font-bold text-red-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-red-700" />
              <span>A. KIẾN THỨC CỐT LÕI (Bắt buộc phải ghi nhớ)</span>
            </h4>
            <div className="grid grid-cols-1 gap-3">
              {studyData.coreKnowledge.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-red-800 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION B: TỪ KHÓA LỊCH SỬ */}
        {(activeSection === 'all' || activeSection === 'keywords') && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h4 className="font-serif-title text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-amber-700" />
              <span>B. TỪ KHÓA LỊCH SỬ QUAN TRỌNG (Keywords)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {studyData.keywords.timeline?.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-red-800 mb-2">
                    ⏱️ Mốc thời gian then chốt:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {studyData.keywords.timeline.map((t, i) => (
                      <span key={i} className="text-xs bg-white border border-stone-300 font-mono font-bold text-stone-800 px-2.5 py-1 rounded-md">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {studyData.keywords.characters?.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    👤 Nhân vật lịch sử:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {studyData.keywords.characters.map((c, i) => (
                      <span key={i} className="text-xs bg-amber-50 border border-amber-200 text-amber-950 font-semibold px-2.5 py-1 rounded-md">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {studyData.keywords.events?.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-2">
                    ⚔️ Sự kiện trọng đại:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {studyData.keywords.events.map((e, i) => (
                      <span key={i} className="text-xs bg-blue-50 border border-blue-200 text-blue-950 font-medium px-2.5 py-1 rounded-md">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {studyData.keywords.documents?.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-purple-800 mb-2">
                    📜 Văn kiện / Hiệp ước:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {studyData.keywords.documents.map((d, i) => (
                      <span key={i} className="text-xs bg-purple-50 border border-purple-200 text-purple-950 font-medium px-2.5 py-1 rounded-md">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {studyData.keywords.terms?.length > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 md:col-span-2">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-2">
                    💡 Khái niệm / Thuật ngữ then chốt:
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {studyData.keywords.terms.map((term, i) => (
                      <span key={i} className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium px-2.5 py-1 rounded-md">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION C: QUAN HỆ NGUYÊN NHÂN - KẾT QUẢ */}
        {(activeSection === 'all' || activeSection === 'cause_effect') && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h4 className="font-serif-title text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-indigo-700" />
              <span>C. QUAN HỆ NGUYÊN NHÂN – KẾT QUẢ & Ý NGHĨA</span>
            </h4>

            {studyData.causeAndEffect.map((item, idx) => (
              <div key={idx} className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs">
                    <span className="font-bold text-rose-900 block mb-1">1. Nguyên nhân:</span>
                    <p className="text-stone-700 leading-relaxed">{item.cause}</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs">
                    <span className="font-bold text-amber-900 block mb-1">2. Diễn biến:</span>
                    <p className="text-stone-700 leading-relaxed">{item.event}</p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs">
                    <span className="font-bold text-blue-900 block mb-1">3. Kết quả:</span>
                    <p className="text-stone-700 leading-relaxed">{item.result}</p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs">
                    <span className="font-bold text-emerald-900 block mb-1">4. Ý nghĩa:</span>
                    <p className="text-stone-700 leading-relaxed">{item.significance}</p>
                  </div>

                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 text-xs">
                    <span className="font-bold text-purple-900 block mb-1">5. Tác động:</span>
                    <p className="text-stone-700 leading-relaxed">{item.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SECTION D: BẢNG SO SÁNH */}
        {(activeSection === 'all' || activeSection === 'comparison') && studyData.comparison && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h4 className="font-serif-title text-lg font-bold text-stone-900 mb-2 flex items-center gap-2">
              <Split className="w-5 h-5 text-amber-700" />
              <span>D. SO SÁNH PHÂN BIỆT ĐỐI TƯỢNG DỄ NHẦM LẪN</span>
            </h4>
            <p className="text-xs text-stone-500 mb-4 font-medium">
              {studyData.comparison.title}
            </p>

            <div className="overflow-x-auto rounded-xl border border-stone-200">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-100 text-stone-800 font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-3.5 w-1/4">Nội dung so sánh</th>
                    <th className="p-3.5 w-3/8 text-amber-900 bg-amber-50/70 border-l border-stone-200">
                      {studyData.comparison.target1Name}
                    </th>
                    <th className="p-3.5 w-3/8 text-red-900 bg-red-50/70 border-l border-stone-200">
                      {studyData.comparison.target2Name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 text-stone-700">
                  {studyData.comparison.rows.map((r, i) => (
                    <tr key={i} className="hover:bg-stone-50 transition">
                      <td className="p-3.5 font-bold text-stone-900 bg-stone-50/50">{r.aspect}</td>
                      <td className="p-3.5 border-l border-stone-200 leading-relaxed">{r.target1}</td>
                      <td className="p-3.5 border-l border-stone-200 leading-relaxed">{r.target2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION E: NHỮNG ĐIỂM DỄ NHẦM */}
        {(activeSection === 'all' || activeSection === 'mistakes') && studyData.commonMistakes?.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h4 className="font-serif-title text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <span>E. NHỮNG ĐIỂM HỌC SINH HAY NHẦM LẪN (Mẹo Vạch Trần Bẫy)</span>
            </h4>

            <div className="space-y-3">
              {studyData.commonMistakes.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm space-y-2"
                >
                  <div className="flex items-start gap-2 text-rose-800 font-semibold">
                    <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                    <span>Lỗi hay nhầm: {item.trap}</span>
                  </div>

                  <div className="flex items-start gap-2 text-emerald-900 font-semibold pl-6">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>Bản chất đúng trong SGK: {item.truth}</span>
                  </div>

                  <div className="flex items-start gap-2 text-amber-950 font-bold bg-amber-100/70 p-2.5 rounded-lg border border-amber-300/80 ml-6">
                    <Lightbulb className="w-4 h-4 shrink-0 text-amber-700" />
                    <span>Mẹo ghi nhớ của Thầy: {item.tip}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION F: SƠ ĐỒ TƯ DUY */}
        {(activeSection === 'all' || activeSection === 'mindmap') && studyData.mindmapSteps?.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs">
            <h4 className="font-serif-title text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-purple-700" />
              <span>F. SƠ ĐỒ TƯ DUY LOGIC (Chuỗi tiến trình lịch sử)</span>
            </h4>

            <div className="flex flex-col space-y-3">
              {studyData.mindmapSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1 bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs sm:text-sm font-semibold text-stone-800">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION G & 9: LUYỆN TẬP 3 MỨC ĐỘ & BẢNG ĐÁNH GIÁ NĂNG LỰC */}
        {(activeSection === 'all' || activeSection === 'practice') && questions.length > 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <span className="text-xs font-bold text-purple-800 uppercase tracking-wider bg-purple-50 border border-purple-200 px-2 py-0.5 rounded">
                  Bước 9: Kiểm Tra 3 Mức Độ
                </span>
                <h4 className="font-serif-title text-lg font-bold text-stone-900 mt-1">
                  Đánh Giá Năng Lực Học Sinh (Nhận Biết – Thông Hiểu – Vận Dụng)
                </h4>
              </div>

              {quizSubmitted && (
                <div className="bg-amber-100 text-amber-900 font-bold text-xs sm:text-sm px-3.5 py-1.5 rounded-xl border border-amber-300 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-700" />
                  <span>Kết quả: {correctCount} / {questions.length} câu đúng</span>
                </div>
              )}
            </div>

            {/* Questions list */}
            <div className="space-y-5">
              {questions.map((q, idx) => {
                const userChoice = userAnswers[idx];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div key={idx} className="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-stone-900 text-xs sm:text-sm">
                        Câu {idx + 1}:
                      </span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-700 uppercase">
                        {q.level === 'nhan_biet' ? 'Mức 1: Nhận biết' : q.level === 'thong_hieu' ? 'Mức 2: Thông hiểu' : 'Mức 3: Vận dụng'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-stone-900">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = userChoice === optIdx;
                        let btnClass = 'bg-white border-stone-200 text-stone-800 hover:bg-stone-100';
                        if (quizSubmitted) {
                          if (optIdx === q.correctIndex) {
                            btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
                          } else if (isChosen) {
                            btnClass = 'bg-rose-50 border-rose-500 text-rose-950';
                          } else {
                            btnClass = 'opacity-50 border-stone-200';
                          }
                        } else if (isChosen) {
                          btnClass = 'bg-amber-100 border-amber-600 text-amber-950 font-bold ring-2 ring-amber-500/20';
                        }

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            disabled={quizSubmitted}
                            onClick={() => setUserAnswers((prev) => ({ ...prev, [idx]: optIdx }))}
                            className={`p-3 rounded-xl border text-left transition flex items-start gap-2 ${btnClass}`}
                          >
                            <span className="font-bold shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                            <span>{opt.replace(/^[A-D]\.\s*/, '')}</span>
                          </button>
                        );
                      })}
                    </div>

                    {quizSubmitted && (
                      <div className="pt-2 text-xs text-stone-700 border-t border-stone-200/80">
                        <strong className="text-emerald-800">Đáp án: {String.fromCharCode(65 + q.correctIndex)}.</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(userAnswers).length === 0}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition flex items-center gap-2 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Hoàn Thành & Đánh Giá Năng Lực</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setUserAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold text-xs sm:text-sm transition flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài luyện này</span>
                </button>
              )}
            </div>

            {/* Cuối buổi tạo bảng: Đã nắm vững – Cần củng cố – Chưa nắm (Mục 9) */}
            {quizSubmitted && (
              <div className="mt-6 pt-6 border-t border-stone-200 bg-stone-50 rounded-2xl p-5 space-y-4">
                <h5 className="font-serif-title font-bold text-stone-900 text-base flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-700" />
                  <span>BẢNG ĐÁNH GIÁ NĂNG LỰC CUỐI BUỔI ÔN TẬP (Mục 9)</span>
                </h5>

                {(() => {
                  const report = getMasteryReport();
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Đã nắm vững */}
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                        <span className="font-bold text-emerald-900 uppercase block mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Đã nắm vững ({report.mastered.length}):
                        </span>
                        {report.mastered.length > 0 ? (
                          <ul className="space-y-1.5 text-stone-700">
                            {report.mastered.map((m, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-stone-400 italic">Chưa có câu nào đạt.</p>
                        )}
                      </div>

                      {/* Cần củng cố */}
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <span className="font-bold text-amber-900 uppercase block mb-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          Cần củng cố ({report.reviewNeeded.length}):
                        </span>
                        {report.reviewNeeded.length > 0 ? (
                          <ul className="space-y-1.5 text-stone-700">
                            {report.reviewNeeded.map((r, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-amber-600 font-bold">•</span>
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-stone-400 italic">Đã trả lời hết các câu.</p>
                        )}
                      </div>

                      {/* Chưa nắm */}
                      <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                        <span className="font-bold text-rose-900 uppercase block mb-2 flex items-center gap-1.5">
                          <XCircle className="w-4 h-4 text-rose-600" />
                          Chưa nắm ({report.notMastered.length}):
                        </span>
                        {report.notMastered.length > 0 ? (
                          <ul className="space-y-1.5 text-stone-700">
                            {report.notMastered.map((n, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-rose-600 font-bold">•</span>
                                <span>{n}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-stone-400 italic">Không có câu sai!</p>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
