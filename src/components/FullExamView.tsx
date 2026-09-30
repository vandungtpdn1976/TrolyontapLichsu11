import React, { useState, useEffect, useMemo } from 'react';
import {
  MultipleChoiceQuestion,
  TrueFalseQuestion,
  EssayQuestion,
  EssayGradingResult,
  ExamMode,
} from '../types/history';
import { safeFetchJson } from '../utils/apiHelper';
import { OFFICIAL_WORKBOOK_EXAMS } from '../data/officialWorkbookExams';
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  Sparkles,
  MessageSquare,
  RotateCcw,
  Check,
  X,
  BookOpen,
  AlertTriangle,
  Lightbulb,
  HelpCircle,
  ListFilter,
  BarChart3,
  ChevronRight,
  TrendingUp,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FullExamViewProps {
  multipleChoiceQuestions: MultipleChoiceQuestion[];
  trueFalseQuestions: TrueFalseQuestion[];
  essayQuestions: EssayQuestion[];
  onAskTeacher: (context: string) => void;
}

export type ExtendedExamMode = '15min' | '45min' | '50min' | 'officialWorkbook';

export const FullExamView: React.FC<FullExamViewProps> = ({
  multipleChoiceQuestions,
  trueFalseQuestions,
  essayQuestions,
  onAskTeacher,
}) => {
  // Modes: 'officialWorkbook' | '15min' | '45min' | '50min'
  const [selectedMode, setSelectedMode] = useState<ExtendedExamMode>('officialWorkbook');
  const [selectedOfficialExamId, setSelectedOfficialExamId] = useState<string>('de-minh-hoa-1');
  const [examCategoryTab, setExamCategoryTab] = useState<'workbook' | 'custom'>('workbook');
  
  // Optional scope filter for 45-min exam: 'all' or 'hocki1' (Semester 1)
  const [scope45Min, setScope45Min] = useState<'all' | 'hocki1'>('all');

  // Active official exam object
  const activeOfficialExam = useMemo(() => {
    return (
      OFFICIAL_WORKBOOK_EXAMS.find((e) => e.id === selectedOfficialExamId) ||
      OFFICIAL_WORKBOOK_EXAMS[0]
    );
  }, [selectedOfficialExamId]);

  // Semester 1 topics helper
  const sem1Topics = ['chu-de-1', 'chu-de-2', 'chu-de-3', 'chu-de-4'];
  const sem1MC = useMemo(
    () => multipleChoiceQuestions.filter((q) => sem1Topics.includes(q.topicId)),
    [multipleChoiceQuestions]
  );
  const sem1TF = useMemo(
    () => trueFalseQuestions.filter((q) => sem1Topics.includes(q.topicId)),
    [trueFalseQuestions]
  );
  const sem1Essay = useMemo(
    () => essayQuestions.filter((q) => sem1Topics.includes(q.topicId)),
    [essayQuestions]
  );

  // Filter questions according to the active mode & scope
  const part1Questions = useMemo(() => {
    if (selectedMode === 'officialWorkbook') {
      return activeOfficialExam.multipleChoiceQuestions;
    }
    if (selectedMode === '15min') {
      return multipleChoiceQuestions.slice(0, 6);
    }
    if (selectedMode === '45min') {
      if (scope45Min === 'hocki1' && sem1MC.length >= 10) {
        return sem1MC.slice(0, 10);
      }
      return multipleChoiceQuestions.slice(0, 10);
    }
    // 50min: 10 MC questions
    return multipleChoiceQuestions.slice(0, 10);
  }, [selectedMode, activeOfficialExam, scope45Min, multipleChoiceQuestions, sem1MC]);

  const part2Questions = useMemo(() => {
    if (selectedMode === 'officialWorkbook') {
      return []; // Official workbook format: Part I: 24 Multiple Choice, Part II: Essay
    }
    if (selectedMode === '15min') {
      return trueFalseQuestions.slice(0, 1);
    }
    if (selectedMode === '45min') {
      if (scope45Min === 'hocki1' && sem1TF.length >= 2) {
        return sem1TF.slice(0, 2);
      }
      return trueFalseQuestions.slice(0, 2);
    }
    // 50min: 4 TF questions
    return trueFalseQuestions.slice(0, 4);
  }, [selectedMode, scope45Min, trueFalseQuestions, sem1TF]);

  const hasEssayPart = selectedMode !== '15min';
  const part3Question = useMemo(() => {
    if (selectedMode === 'officialWorkbook') {
      return activeOfficialExam.essayQuestions[0] || essayQuestions[0];
    }
    if (selectedMode === '45min' && scope45Min === 'hocki1' && sem1Essay.length > 0) {
      return sem1Essay[0];
    }
    return essayQuestions[0];
  }, [selectedMode, activeOfficialExam, scope45Min, sem1Essay, essayQuestions]);

  // Exam state
  const [activePart, setActivePart] = useState<'part1' | 'part2' | 'part3'>('part1');
  const [totalExamDuration, setTotalExamDuration] = useState(45 * 60);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Review question filter (All / Wrong only / Correct only)
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');

  // Answers state
  const [part1Answers, setPart1Answers] = useState<Record<string, number>>({});
  const [part2Answers, setPart2Answers] = useState<
    Record<string, Record<'a' | 'b' | 'c' | 'd', boolean | null>>
  >({});
  const [part3Answer, setPart3Answer] = useState('');
  const [essayGrading, setEssayGrading] = useState<EssayGradingResult | null>(null);
  const [isGradingEssay, setIsGradingEssay] = useState(false);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerRunning) {
      setTimerRunning(false);
      handleSubmitExam();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartExam = (mode: ExtendedExamMode, officialExamId?: string) => {
    setSelectedMode(mode);
    if (officialExamId) {
      setSelectedOfficialExamId(officialExamId);
    }
    const duration =
      mode === '15min'
        ? 15 * 60
        : mode === '50min'
        ? 50 * 60
        : mode === 'officialWorkbook'
        ? 60 * 60
        : 45 * 60;
    setTotalExamDuration(duration);
    setTimeLeft(duration);
    setHasStarted(true);
    setTimerRunning(true);
    setIsSubmitted(false);
    setPart1Answers({});
    setPart2Answers({});
    setPart3Answer('');
    setEssayGrading(null);
    setActivePart('part1');
    setReviewFilter('all');
  };

  const handleResetExam = () => {
    setHasStarted(false);
    setTimerRunning(false);
    const duration =
      selectedMode === '15min'
        ? 15 * 60
        : selectedMode === '50min'
        ? 50 * 60
        : selectedMode === 'officialWorkbook'
        ? 60 * 60
        : 45 * 60;
    setTimeLeft(duration);
    setIsSubmitted(false);
    setPart1Answers({});
    setPart2Answers({});
    setPart3Answer('');
    setEssayGrading(null);
    setActivePart('part1');
    setReviewFilter('all');
  };

  // --- SCORING SYSTEM PER QUESTION & PER SECTION ---

  // Part 1: Multiple Choice Scoring per question
  // 15min: 6 questions -> 6.0 points (1.0 pt / question)
  // 45min: 10 questions -> 4.0 points (0.4 pt / question)
  // 50min: 10 questions -> 3.0 points (0.3 pt / question)
  // officialWorkbook: 24 questions -> 6.0 points (0.25 pt / question - Chuẩn NXBGDVN)
  const part1MaxScore =
    selectedMode === '15min'
      ? 6.0
      : selectedMode === '45min'
      ? 4.0
      : selectedMode === 'officialWorkbook'
      ? 6.0
      : 3.0;
  const part1PointsPerQuestion = useMemo(() => {
    if (part1Questions.length === 0) return 0;
    return parseFloat((part1MaxScore / part1Questions.length).toFixed(2));
  }, [part1MaxScore, part1Questions.length]);

  const getPart1QuestionScore = (qId: string, correctIndex: number) => {
    const userChoice = part1Answers[qId];
    const isCorrect = userChoice === correctIndex;
    const earned = isCorrect ? part1PointsPerQuestion : 0;
    return {
      userChoice,
      isCorrect,
      earned,
      max: part1PointsPerQuestion,
      isAnswered: userChoice !== undefined,
    };
  };

  const calculatePart1Score = () => {
    let earned = 0;
    part1Questions.forEach((q) => {
      if (part1Answers[q.id] === q.correctIndex) {
        earned += part1PointsPerQuestion;
      }
    });
    return parseFloat(Math.min(part1MaxScore, earned).toFixed(2));
  };

  // Part 2: True / False Scoring
  // 15min: 1 question (4 statements) -> 4.0 points total:
  //   1 correct stmt: 1.0 pt | 2: 2.0 pt | 3: 3.0 pt | 4: 4.0 pt
  // 45min: 2 questions -> 3.0 points total (1.5 pt / question):
  //   1 correct stmt: 0.15 pt | 2: 0.4 pt | 3: 0.8 pt | 4: 1.5 pt
  // 50min: 4 questions -> 4.0 points total (1.0 pt / question - Chuẩn Bộ GD&ĐT):
  //   1 correct stmt: 0.1 pt | 2: 0.25 pt | 3: 0.5 pt | 4: 1.0 pt
  const getPart2QuestionScore = (q: TrueFalseQuestion) => {
    const qAns = part2Answers[q.id] || { a: null, b: null, c: null, d: null };
    let correctCount = 0;
    const statementsResult: Record<
      'a' | 'b' | 'c' | 'd',
      { isCorrect: boolean; userVal: boolean | null; targetVal: boolean; isAnswered: boolean }
    > = {
      a: { isCorrect: false, userVal: null, targetVal: false, isAnswered: false },
      b: { isCorrect: false, userVal: null, targetVal: false, isAnswered: false },
      c: { isCorrect: false, userVal: null, targetVal: false, isAnswered: false },
      d: { isCorrect: false, userVal: null, targetVal: false, isAnswered: false },
    };

    q.statements.forEach((st) => {
      const uVal = qAns[st.id];
      const isRight = uVal === st.isCorrect;
      if (isRight) correctCount += 1;
      statementsResult[st.id] = {
        isCorrect: isRight,
        userVal: uVal,
        targetVal: st.isCorrect,
        isAnswered: uVal !== null && uVal !== undefined,
      };
    });

    let earned = 0;
    let max = 1.0;

    if (selectedMode === '15min') {
      max = 4.0;
      if (correctCount === 4) earned = 4.0;
      else if (correctCount === 3) earned = 3.0;
      else if (correctCount === 2) earned = 2.0;
      else if (correctCount === 1) earned = 1.0;
    } else if (selectedMode === '45min') {
      max = 1.5;
      if (correctCount === 4) earned = 1.5;
      else if (correctCount === 3) earned = 0.8;
      else if (correctCount === 2) earned = 0.4;
      else if (correctCount === 1) earned = 0.15;
    } else {
      // 50min: Official GDPT 2018 Ministry scale
      max = 1.0;
      if (correctCount === 4) earned = 1.0;
      else if (correctCount === 3) earned = 0.5;
      else if (correctCount === 2) earned = 0.25;
      else if (correctCount === 1) earned = 0.1;
    }

    return {
      correctCount,
      totalStatements: 4,
      earned: parseFloat(earned.toFixed(2)),
      max,
      statementsResult,
      isFullyCorrect: correctCount === 4,
    };
  };

  const calculatePart2Score = () => {
    if (part2Questions.length === 0) return 0;
    let score = 0;
    part2Questions.forEach((q) => {
      const qScore = getPart2QuestionScore(q);
      score += qScore.earned;
    });
    const max = selectedMode === '15min' ? 4.0 : selectedMode === '45min' ? 3.0 : 4.0;
    return parseFloat(Math.min(max, score).toFixed(2));
  };

  // Part 3: Essay Scoring
  // 15min: 0 pt
  // 45min: 3.0 pt
  // 50min: 3.0 pt
  // officialWorkbook: 4.0 pt (Chuẩn cấu trúc Đề NXBGDVN: I. Trắc nghiệm 6,0 đ; II. Tự luận 4,0 đ)
  const part3MaxScore = selectedMode === 'officialWorkbook' ? 4.0 : hasEssayPart ? 3.0 : 0.0;
  const calculatePart3Score = () => {
    if (!hasEssayPart) return 0;
    if (!essayGrading) return 0;
    return parseFloat(((essayGrading.score / 10) * part3MaxScore).toFixed(2));
  };

  const calculateTotalScore = () => {
    const p1 = calculatePart1Score();
    const p2 = calculatePart2Score();
    const p3 = calculatePart3Score();
    return parseFloat(Math.min(10.0, p1 + p2 + p3).toFixed(2));
  };

  // Submission handler
  const handleSubmitExam = async () => {
    setTimerRunning(false);
    setIsSubmitted(true);
    setTimeSpentSeconds(totalExamDuration - timeLeft);

    // If student wrote an essay, auto-grade it via AI
    if (hasEssayPart && part3Answer.trim().length >= 15) {
      setIsGradingEssay(true);
      try {
        const res = await fetch('/api/grade-essay', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: part3Question.question,
            rubric: JSON.stringify(part3Question.rubricCriteria),
            studentAnswer: part3Answer,
            topicTitle: part3Question.lessonName,
          }),
        });
        const data = await safeFetchJson<any>(res, 'Không thể chấm điểm tự luận');
        setEssayGrading(data);
      } catch (err) {
        console.error('Lỗi khi chấm tự luận:', err);
      } finally {
        setIsGradingEssay(false);
      }
    }

    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.6 },
    });
  };

  // Count correct/wrong statistics
  const examStats = useMemo(() => {
    let p1Correct = 0;
    let p1Wrong = 0;
    let p1Unanswered = 0;
    part1Questions.forEach((q) => {
      const u = part1Answers[q.id];
      if (u === undefined) p1Unanswered++;
      else if (u === q.correctIndex) p1Correct++;
      else p1Wrong++;
    });

    let p2FullCorrect = 0;
    let p2PartialCorrect = 0;
    let p2Wrong = 0;
    let totalStatementsCorrect = 0;
    part2Questions.forEach((q) => {
      const qScore = getPart2QuestionScore(q);
      totalStatementsCorrect += qScore.correctCount;
      if (qScore.correctCount === 4) p2FullCorrect++;
      else if (qScore.correctCount > 0) p2PartialCorrect++;
      else p2Wrong++;
    });

    return {
      p1Correct,
      p1Wrong,
      p1Unanswered,
      p2FullCorrect,
      p2PartialCorrect,
      p2Wrong,
      totalStatementsCorrect,
      totalStatementsCount: part2Questions.length * 4,
    };
  }, [part1Questions, part1Answers, part2Questions, part2Answers]);

  // Overall grade evaluation
  const totalScoreVal = calculateTotalScore();
  const getRatingInfo = (score: number) => {
    if (score >= 9.0) {
      return {
        title: 'Xuất Sắc - Đỉnh Cao Lịch Sử 11',
        color: 'from-amber-500 to-amber-700 text-amber-300',
        badge: 'bg-amber-400 text-stone-950',
        desc: 'Em nắm kiến thức vô cùng vững vàng, tư duy tổng hợp sắc sảo và phản xạ lịch sử tuyệt vời!',
      };
    }
    if (score >= 8.0) {
      return {
        title: 'Giỏi - Nắm Rất Chắc Kiến Thức',
        color: 'from-emerald-500 to-teal-700 text-emerald-300',
        badge: 'bg-emerald-400 text-stone-950',
        desc: 'Năng lực rất tốt! Chỉ cần rèn luyện thêm kỹ năng nhận diện bẫy Đúng - Sai để chạm mốc 10 điểm tuyệt đối.',
      };
    }
    if (score >= 6.5) {
      return {
        title: 'Khá - Đạt Chuẩn GDPT 2018',
        color: 'from-blue-500 to-indigo-700 text-blue-300',
        badge: 'bg-blue-400 text-stone-950',
        desc: 'Em đã nắm được phần lớn kiến thức cơ bản. Cần chú ý các từ khóa bẫy và bản chất sự kiện lịch sử.',
      };
    }
    if (score >= 5.0) {
      return {
        title: 'Trung Bình - Cần Cố Gắng Thêm',
        color: 'from-orange-500 to-amber-700 text-orange-300',
        badge: 'bg-orange-400 text-stone-950',
        desc: 'Em cần ôn lại các chủ đề kiến thức cốt lõi tại mục Cẩm nang Ôn tập để tự tin đạt điểm cao hơn.',
      };
    }
    return {
      title: 'Chưa Đạt - Cần Củng Cố Ngay',
      color: 'from-rose-500 to-red-800 text-rose-300',
      badge: 'bg-rose-400 text-stone-950',
      desc: 'Đừng nản lòng! Hãy bấm "Nhờ Thầy Dũng phân tích" để Thầy hướng dẫn em lộ trình bồi đắp lỗ hổng kiến thức.',
    };
  };

  const rating = getRatingInfo(totalScoreVal);

  // --------------------------------------------------------------------------
  // SCREEN 1: PRE-EXAM WELCOME & 3 EXAM MODES SELECTION
  // --------------------------------------------------------------------------
  if (!hasStarted) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-lg text-center relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Badge & Header */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-red-700 via-amber-600 to-amber-800 p-0.5 mx-auto mb-4 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-stone-900 rounded-[14px] flex items-center justify-center text-amber-300 font-serif-title font-bold text-2xl sm:text-3xl">
              11
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-red-100 text-red-900 px-3.5 py-1 rounded-full border border-red-200">
            <Sparkles className="w-3.5 h-3.5 text-red-700" />
            Hệ Thống Khảo Thí Lịch Sử 11 &bull; Chuẩn Cấu Trúc Bộ GD&ĐT
          </span>

          <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 mt-3 mb-2">
            Đề Thi Khảo Sát Năng Lực Môn Lịch Sử Lớp 11
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Hệ thống chấm điểm tự động tích hợp 3 chế độ thi chuẩn mực. Sau khi nộp bài, hệ thống sẽ{' '}
            <strong className="text-amber-900">chấm điểm tổng</strong>,{' '}
            <strong className="text-amber-900">chấm điểm chi tiết từng câu</strong> và{' '}
            <strong className="text-amber-900">phân tích đúng sai, giải thích bản chất</strong> theo
            đúng định dạng GDPT 2018.
          </p>

          {/* 3 CHẾ ĐỘ THI - USER REQUIREMENT */}
          <div className="my-8 text-left">
            <div className="flex items-center justify-between mb-3 px-1">
              <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-700 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-700" />
                <span>3 Chế Độ Thi Lịch Sử 11 (Vui Lòng Chọn Chế Độ):</span>
              </label>
              <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                Thang điểm chuẩn: 10.0 điểm
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CHẾ ĐỘ 1: 15 PHÚT */}
              <button
                type="button"
                onClick={() => setSelectedMode('15min')}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedMode === '15min'
                    ? 'bg-amber-50/90 border-amber-600 shadow-md ring-2 ring-amber-500/20 scale-[1.01]'
                    : 'bg-stone-50/80 border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wide bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                    Chế độ 1
                  </span>
                  <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 15 Phút
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-base sm:text-lg mb-1">
                  Kiểm Tra 15 Phút
                </h4>
                <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                  Khảo sát nhanh đầu giờ, đánh giá mức độ nhớ và hiểu kiến thức bài học cốt lõi.
                </p>
                <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần I: 6 câu Trắc nghiệm</span>
                    <strong className="text-amber-900">6.0 đ (1.0 đ/câu)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần II: 1 câu Đúng - Sai (4 ý)</span>
                    <strong className="text-amber-900">4.0 đ</strong>
                  </div>
                  <div className="flex items-center justify-between text-stone-400">
                    <span>&bull; Phần III: Tự luận</span>
                    <span>Không có</span>
                  </div>
                </div>
              </button>

              {/* CHẾ ĐỘ 2: 45 PHÚT */}
              <button
                type="button"
                onClick={() => setSelectedMode('45min')}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedMode === '45min'
                    ? 'bg-red-50/90 border-red-600 shadow-md ring-2 ring-red-500/20 scale-[1.01]'
                    : 'bg-stone-50/80 border-stone-200 hover:border-red-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wide bg-red-200 text-red-900 px-2 py-0.5 rounded-md">
                    Chế độ 2
                  </span>
                  <span className="text-xs font-bold text-red-800 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 45 Phút
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-base sm:text-lg mb-1">
                  Kiểm Tra 45 Phút
                </h4>
                <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                  Đánh giá định kỳ 1 tiết, kiểm tra giữa kì và cuối kì theo chuẩn ma trận trường THPT.
                </p>
                <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần I: 10 câu Trắc nghiệm</span>
                    <strong className="text-red-900">4.0 đ (0.4 đ/câu)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần II: 2 câu Đúng - Sai</span>
                    <strong className="text-red-900">3.0 đ (1.5 đ/câu)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần III: 1 câu Tự luận</span>
                    <strong className="text-red-900">3.0 đ (AI chấm)</strong>
                  </div>
                </div>
              </button>

              {/* CHẾ ĐỘ 3: 50 PHÚT */}
              <button
                type="button"
                onClick={() => setSelectedMode('50min')}
                className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                  selectedMode === '50min'
                    ? 'bg-amber-50/90 border-amber-600 shadow-md ring-2 ring-amber-500/20 scale-[1.01]'
                    : 'bg-stone-50/80 border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wide bg-stone-900 text-amber-300 px-2 py-0.5 rounded-md">
                    Chế độ 3
                  </span>
                  <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> 50 Phút
                  </span>
                </div>
                <h4 className="font-bold text-stone-900 text-base sm:text-lg mb-1">
                  Khảo Sát Tốt Nghiệp THPT
                </h4>
                <p className="text-xs text-stone-600 mb-3 leading-relaxed">
                  Chuẩn hóa toàn diện định dạng đề thi Tốt nghiệp THPT môn Lịch sử theo chương trình GDPT 2018.
                </p>
                <div className="pt-2 border-t border-stone-200/80 text-[11px] text-stone-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần I: 10 câu Trắc nghiệm</span>
                    <strong className="text-amber-900">3.0 đ (0.3 đ/câu)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần II: 4 câu Đúng - Sai</span>
                    <strong className="text-amber-900">4.0 đ (1.0 đ/câu)</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>&bull; Phần III: 1 câu Vận dụng cao</span>
                    <strong className="text-amber-900">3.0 đ (AI chấm)</strong>
                  </div>
                </div>
              </button>
            </div>

            {/* Scope option for 45-min mode */}
            {selectedMode === '45min' && (
              <div className="mt-4 p-3 bg-stone-100 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-stone-800">
                  Phạm vi kiến thức đề 45 phút:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setScope45Min('all')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      scope45Min === 'all'
                        ? 'bg-red-800 text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Toàn diện cả năm
                  </button>
                  <button
                    type="button"
                    onClick={() => setScope45Min('hocki1')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition ${
                      scope45Min === 'hocki1'
                        ? 'bg-red-800 text-white shadow-xs'
                        : 'bg-white text-stone-700 hover:bg-stone-200'
                    }`}
                  >
                    Trọng tâm Học kỳ I (Bài 1 - 8)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick info bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-stone-700 text-xs sm:text-sm mb-6 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-700" />
              <span>
                Thời gian làm bài:{' '}
                <strong>
                  {selectedMode === 'officialWorkbook'
                    ? '60'
                    : selectedMode === '15min'
                    ? '15'
                    : selectedMode === '45min'
                    ? '45'
                    : '50'}{' '}
                  phút
                </strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-700" />
              <span>
                Thang điểm tối đa: <strong>10.0 điểm</strong>
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>
                Nguồn bài tập:{' '}
                <strong>
                  {selectedMode === 'officialWorkbook'
                    ? 'Sách Bài tập Lịch sử 11 (NXBGDVN)'
                    : 'Ngân hàng đề thi GDPT 2018'}
                </strong>
              </span>
            </div>
          </div>

          {/* Start Exam Button */}
          <button
            onClick={() => handleStartExam(selectedMode)}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-red-800 via-amber-700 to-red-900 hover:from-red-900 hover:to-amber-800 text-white font-bold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2.5 mx-auto"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>
              Bắt Đầu Làm Bài Thi (
              {selectedMode === '15min'
                ? 'Chế độ 15 Phút'
                : selectedMode === '45min'
                ? 'Chế độ 45 Phút'
                : 'Chế độ 50 Phút'}
              )
            </span>
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // SCREEN 2: ACTIVE EXAM & POST-EXAM RESULTS SCREEN
  // --------------------------------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Sticky Header Bar: Timer & Tabs */}
      <div className="sticky top-20 z-30 bg-stone-900 text-white rounded-2xl p-4 mb-6 shadow-md border border-amber-500/20 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Mode badge & Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-stone-800 px-3.5 py-1.5 rounded-xl border border-stone-700">
            <Clock
              className={`w-4 h-4 ${
                timeLeft < 300 && timerRunning ? 'text-rose-400 animate-pulse' : 'text-amber-400'
              }`}
            />
            <span
              className={`font-mono text-base font-bold ${
                timeLeft < 300 && timerRunning ? 'text-rose-400' : 'text-amber-300'
              }`}
            >
              {isSubmitted ? `Đã xong (${formatTime(timeSpentSeconds)})` : formatTime(timeLeft)}
            </span>
          </div>

          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold text-stone-200">
              {selectedMode === '15min'
                ? 'Chế độ 1: 15 Phút'
                : selectedMode === '45min'
                ? `Chế độ 2: 45 Phút ${scope45Min === 'hocki1' ? '(Cuối kỳ I)' : ''}`
                : 'Chế độ 3: 50 Phút (TN THPT)'}
            </span>
            <span className="text-[11px] text-stone-400">Đề thi Lịch sử 11 GDPT 2018</span>
          </div>
        </div>

        {/* Center: Section Navigation Tabs */}
        <div className="flex items-center gap-1 bg-stone-800/80 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActivePart('part1')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePart === 'part1'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>Phần I ({part1Questions.length} câu)</span>
            {isSubmitted && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold">
                {calculatePart1Score()}/{part1MaxScore}đ
              </span>
            )}
          </button>

          <button
            onClick={() => setActivePart('part2')}
            className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
              activePart === 'part2'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <span>Phần II ({part2Questions.length} câu Đ/S)</span>
            {isSubmitted && (
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold">
                {calculatePart2Score()}/
                {selectedMode === '15min' ? '4.0' : selectedMode === '45min' ? '3.0' : '4.0'}đ
              </span>
            )}
          </button>

          {hasEssayPart && (
            <button
              onClick={() => setActivePart('part3')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activePart === 'part3'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>Phần III: Tự luận</span>
              {isSubmitted && (
                <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-bold">
                  {calculatePart3Score()}/{part3MaxScore}đ
                </span>
              )}
            </button>
          )}
        </div>

        {/* Right: Submit or Action Buttons */}
        {!isSubmitted ? (
          <button
            onClick={handleSubmitExam}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-700 to-amber-700 hover:from-red-800 hover:to-amber-800 text-white font-bold text-xs sm:text-sm shadow-md transition hover:scale-[1.02]"
          >
            Nộp bài & Chấm điểm
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-400/30 font-bold">
              Tổng điểm: {calculateTotalScore()} / 10.0 đ
            </span>
            <button
              onClick={handleResetExam}
              className="text-xs text-stone-300 hover:text-white underline ml-2 flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đổi chế độ</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* RESULT REPORT BANNER (CHẤM ĐIỂM TỔNG, PHÂN LOẠI & THỐNG KÊ CHI TIẾT)      */}
      {/* ========================================================================= */}
      {isSubmitted && (
        <div className="bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-white border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top row: Score + Classification + Action to Chat with AI Teacher */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              {/* Grand Total Score Badge */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-xl shrink-0">
                <div className="w-full h-full bg-stone-950 rounded-[22px] flex flex-col items-center justify-center p-2">
                  <span className="text-[10px] text-amber-300 uppercase font-bold tracking-widest">
                    Tổng điểm
                  </span>
                  <span className="font-serif-title font-bold text-3xl sm:text-4xl text-amber-300 my-0.5">
                    {calculateTotalScore()}
                  </span>
                  <span className="text-[11px] text-stone-400 font-bold">/ 10.0 điểm</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${rating.badge}`}
                  >
                    {rating.title}
                  </span>
                  <span className="text-xs bg-white/10 text-stone-300 px-2.5 py-0.5 rounded-full border border-white/10">
                    Thời gian: {formatTime(timeSpentSeconds)} / {selectedMode}
                  </span>
                </div>

                <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-100">
                  Bảng Điểm Khảo Sát Môn Lịch Sử 11
                </h3>
                <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                  {rating.desc}
                </p>
              </div>
            </div>

            {/* Ask teacher button */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() =>
                  onAskTeacher(
                    `Thầy Dũng ơi, em vừa hoàn thành bài thi môn Lịch sử 11 ở Chế độ thi ${
                      selectedMode === '15min'
                        ? '15 Phút'
                        : selectedMode === '45min'
                        ? '45 Phút'
                        : '50 Phút'
                    } với số điểm: ${calculateTotalScore()}/10.0 điểm (Phần I trắc nghiệm: ${calculatePart1Score()}/${part1MaxScore}đ; Phần II Đúng-Sai: ${calculatePart2Score()}đ; ${
                      hasEssayPart ? `Phần III Tự luận: ${calculatePart3Score()}đ` : ''
                    }). Thầy có thể nhận xét năng lực của em và chỉ ra cách khắc phục những câu em làm sai không ạ?`
                  )
                }
                className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-stone-950" />
                <span>Nhờ Thầy Dũng giải đáp thắc mắc</span>
              </button>
            </div>
          </div>

          {/* Section breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {/* Part 1 score card */}
            <div
              onClick={() => setActivePart('part1')}
              className={`cursor-pointer rounded-2xl p-4 border transition ${
                activePart === 'part1'
                  ? 'bg-amber-900/40 border-amber-400 ring-2 ring-amber-400/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                <span>Phần I: Trắc nghiệm</span>
                <span className="font-bold text-amber-300">
                  {examStats.p1Correct}/{part1Questions.length} câu đúng
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-serif-title font-bold text-2xl text-amber-200">
                  {calculatePart1Score()}{' '}
                  <span className="text-xs text-stone-400 font-sans font-normal">
                    / {part1MaxScore} đ
                  </span>
                </span>
                <span className="text-[11px] text-stone-400">
                  ({part1PointsPerQuestion} đ/câu)
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-2 flex items-center gap-1">
                <span>Xem chi tiết giải thích</span>
                <ChevronRight className="w-3 h-3 text-amber-400" />
              </p>
            </div>

            {/* Part 2 score card */}
            <div
              onClick={() => setActivePart('part2')}
              className={`cursor-pointer rounded-2xl p-4 border transition ${
                activePart === 'part2'
                  ? 'bg-amber-900/40 border-amber-400 ring-2 ring-amber-400/20'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                <span>Phần II: Đúng - Sai</span>
                <span className="font-bold text-amber-300">
                  {examStats.totalStatementsCorrect}/{examStats.totalStatementsCount} ý đúng
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-serif-title font-bold text-2xl text-amber-200">
                  {calculatePart2Score()}{' '}
                  <span className="text-xs text-stone-400 font-sans font-normal">
                    /{' '}
                    {selectedMode === '15min' ? '4.0' : selectedMode === '45min' ? '3.0' : '4.0'}{' '}
                    đ
                  </span>
                </span>
                <span className="text-[11px] text-stone-400">
                  {part2Questions.length} câu sử liệu
                </span>
              </div>
              <p className="text-[11px] text-stone-400 mt-2 flex items-center gap-1">
                <span>Xem chi tiết phân tích ngữ liệu</span>
                <ChevronRight className="w-3 h-3 text-amber-400" />
              </p>
            </div>

            {/* Part 3 score card */}
            <div
              onClick={() => hasEssayPart && setActivePart('part3')}
              className={`rounded-2xl p-4 border transition ${
                !hasEssayPart
                  ? 'opacity-40 bg-white/5 border-white/5 cursor-not-allowed'
                  : activePart === 'part3'
                  ? 'bg-amber-900/40 border-amber-400 ring-2 ring-amber-400/20 cursor-pointer'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 cursor-pointer'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-300 mb-1">
                <span>Phần III: Tự luận</span>
                <span className="text-amber-300 font-bold">
                  {hasEssayPart ? 'Vận dụng cao' : 'Không có trong đề 15p'}
                </span>
              </div>
              <div className="flex items-baseline justify-between mt-2">
                <span className="font-serif-title font-bold text-2xl text-amber-200">
                  {hasEssayPart ? calculatePart3Score() : '0.0'}{' '}
                  <span className="text-xs text-stone-400 font-sans font-normal">
                    / {part3MaxScore} đ
                  </span>
                </span>
                {isGradingEssay && (
                  <span className="text-[10px] text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded animate-pulse">
                    AI đang chấm...
                  </span>
                )}
              </div>
              <p className="text-[11px] text-stone-400 mt-2 flex items-center gap-1">
                <span>{hasEssayPart ? 'Xem rubric & đáp án mẫu' : 'Đề 15p bỏ qua tự luận'}</span>
                {hasEssayPart && <ChevronRight className="w-3 h-3 text-amber-400" />}
              </p>
            </div>
          </div>

          {/* Quick Review Filter Pills */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-stone-300 font-semibold">
              <ListFilter className="w-4 h-4 text-amber-400" />
              <span>Bộ lọc xem lại kết quả:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setReviewFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  reviewFilter === 'all'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                Tất cả câu hỏi
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('wrong')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  reviewFilter === 'wrong'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                <XCircle className="w-3.5 h-3.5 text-rose-300" />
                <span>Chỉ xem câu SAI ({examStats.p1Wrong + examStats.p1Unanswered})</span>
              </button>
              <button
                type="button"
                onClick={() => setReviewFilter('correct')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  reviewFilter === 'correct'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white/10 text-stone-300 hover:bg-white/20'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Chỉ xem câu ĐÚNG ({examStats.p1Correct})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART I: MULTIPLE CHOICE QUESTIONS & POST-EXAM ANALYSIS & EXPLANATION      */}
      {/* ========================================================================= */}
      {activePart === 'part1' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-serif-title text-lg font-bold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-800" />
                <span>PHẦN I: TRẮC NGHIỆM NHIỀU LỰA CHỌN ({part1Questions.length} câu)</span>
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Thí sinh chọn 1 phương án đúng duy nhất. Thang điểm:{' '}
                <strong>
                  {calculatePart1Score()}/{part1MaxScore} điểm
                </strong>{' '}
                ({part1PointsPerQuestion} điểm/câu).
              </p>
            </div>

            {isSubmitted && (
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="bg-emerald-100 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Đúng: {examStats.p1Correct} câu
                </span>
                <span className="bg-rose-100 text-rose-900 border border-rose-200 px-3 py-1 rounded-xl flex items-center gap-1">
                  <X className="w-3.5 h-3.5" /> Sai/Bỏ qua: {examStats.p1Wrong + examStats.p1Unanswered} câu
                </span>
              </div>
            )}
          </div>

          {part1Questions
            .filter((q) => {
              if (!isSubmitted || reviewFilter === 'all') return true;
              const qScore = getPart1QuestionScore(q.id, q.correctIndex);
              if (reviewFilter === 'wrong') return !qScore.isCorrect;
              if (reviewFilter === 'correct') return qScore.isCorrect;
              return true;
            })
            .map((q, idx) => {
              const qScore = getPart1QuestionScore(q.id, q.correctIndex);
              const qLevel = q.level || q.difficulty || 'nhan_biet';

              return (
                <div
                  key={q.id}
                  className={`bg-white border-2 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 transition ${
                    isSubmitted
                      ? qScore.isCorrect
                        ? 'border-emerald-300/80 bg-white'
                        : 'border-rose-300/80 bg-white'
                      : 'border-stone-200'
                  }`}
                >
                  {/* Question Header & Score Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-red-900 text-sm">Câu {idx + 1}:</span>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          qLevel === 'nhan_biet'
                            ? 'bg-blue-100 text-blue-900 border border-blue-200'
                            : qLevel === 'thong_hieu'
                            ? 'bg-amber-100 text-amber-900 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                        }`}
                      >
                        {qLevel === 'nhan_biet'
                          ? 'Mức 1: Nhận biết'
                          : qLevel === 'thong_hieu'
                          ? 'Mức 2: Thông hiểu'
                          : 'Mức 3: Vận dụng'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded font-medium">
                        {q.lessonName}
                      </span>

                      {/* INDIVIDUAL QUESTION SCORE BADGE - REQUIREMENT */}
                      {isSubmitted && (
                        <span
                          className={`text-xs font-bold px-3 py-1 rounded-xl border flex items-center gap-1.5 shadow-2xs ${
                            qScore.isCorrect
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border-rose-300'
                          }`}
                        >
                          {qScore.isCorrect ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                              <span>+{qScore.earned} / {qScore.max} điểm (ĐÚNG)</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5 text-rose-700" />
                              <span>0.0 / {qScore.max} điểm (CHƯA ĐÚNG)</span>
                            </>
                          )}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Content */}
                  <p className="text-sm sm:text-base font-semibold text-stone-900 leading-snug">
                    {q.question}
                  </p>

                  {/* 4 Options Grid */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = qScore.userChoice === optIdx;
                      const isTheCorrectOne = q.correctIndex === optIdx;

                      let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';
                      if (isSubmitted) {
                        if (isTheCorrectOne) {
                          btnStyle =
                            'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 ring-1 ring-rose-400';
                        } else {
                          btnStyle = 'opacity-40 border-stone-200 bg-stone-50 text-stone-600';
                        }
                      } else if (isSelected) {
                        btnStyle =
                          'bg-amber-50 border-amber-600 text-amber-950 font-semibold ring-2 ring-amber-500/20';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() => {
                            setPart1Answers((prev) => ({ ...prev, [q.id]: optIdx }));
                          }}
                          className={`text-left p-3.5 rounded-xl border text-sm transition flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className="font-bold shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                          <span className="leading-relaxed">{opt.replace(/^[A-D]\.\s*/, '')}</span>
                          {isSubmitted && isTheCorrectOne && (
                            <span className="ml-auto shrink-0 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                              Đáp án chuẩn
                            </span>
                          )}
                          {isSubmitted && isSelected && !isTheCorrectOne && (
                            <span className="ml-auto shrink-0 text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-md">
                              Em đã chọn
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* ================================================================= */}
                  {/* POST-EXAM ANALYSIS & EXPLANATION (PHÂN TÍCH ĐÚNG SAI & GIẢI THÍCH) */}
                  {/* ================================================================= */}
                  {isSubmitted && (
                    <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50/90 to-stone-50 rounded-2xl border border-amber-300 text-xs sm:text-sm text-stone-800 space-y-3.5 shadow-2xs">
                      {/* Compare user choice vs correct answer */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-amber-200/80">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900">Đối chiếu kết quả:</span>
                          <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            Đáp án đúng: {String.fromCharCode(65 + q.correctIndex)}
                          </span>
                          <span className="text-stone-700">|</span>
                          <span
                            className={`font-bold px-2 py-0.5 rounded ${
                              qScore.isCorrect
                                ? 'text-emerald-800 bg-emerald-50'
                                : 'text-rose-800 bg-rose-100'
                            }`}
                          >
                            Em chọn:{' '}
                            {qScore.userChoice !== undefined
                              ? String.fromCharCode(65 + qScore.userChoice)
                              : 'Chưa chọn'}
                          </span>
                        </div>

                        <span
                          className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
                            qScore.isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                          }`}
                        >
                          {qScore.isCorrect ? 'CHÍNH XÁC (+ ' + qScore.earned + ' đ)' : 'CHƯA CHÍNH XÁC (0.0 đ)'}
                        </span>
                      </div>

                      {/* Why it's correct (Explanation) */}
                      <div>
                        <span className="font-bold text-stone-900 flex items-center gap-1.5 mb-1 text-sm text-amber-950">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          <span>Bản chất kiến thức & Vì sao đáp án đúng:</span>
                        </span>
                        <p className="text-stone-800 leading-relaxed pl-5 border-l-2 border-amber-400 bg-white/60 p-2.5 rounded-r-xl">
                          {q.explanation}
                        </p>
                      </div>

                      {/* Options Analysis A, B, C, D */}
                      {q.optionsAnalysis && Array.isArray(q.optionsAnalysis) && (
                        <div className="mt-2 pt-2 border-t border-amber-200/70 text-xs">
                          <span className="font-bold text-stone-900 block mb-2">
                            Phân tích đúng/sai cho từng phương án lựa chọn:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.optionsAnalysis.map((analysis, aIdx) => (
                              <div
                                key={aIdx}
                                className={`p-2.5 rounded-xl border ${
                                  aIdx === q.correctIndex
                                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                                    : 'bg-white border-stone-200 text-stone-700'
                                }`}
                              >
                                <span className="font-bold text-stone-900 mr-1.5">
                                  {String.fromCharCode(65 + aIdx)}:
                                </span>
                                <span>{analysis.replace(/^[A-D]:\s*/, '')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Trap Tip & Teacher Advice */}
                      {(q.trapTip || q.thayDungAdvice) && (
                        <div className="pt-2 border-t border-amber-200/70 flex flex-col sm:flex-row gap-3 text-xs">
                          {q.trapTip && (
                            <div className="flex-1 bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-rose-950 flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="block text-rose-900 mb-0.5">Bẫy từ khóa:</strong>
                                <span>{q.trapTip}</span>
                              </div>
                            </div>
                          )}

                          {q.thayDungAdvice && (
                            <div className="flex-1 bg-amber-100/70 border border-amber-300 p-2.5 rounded-xl text-amber-950 flex items-start gap-2">
                              <MessageSquare className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                              <div>
                                <strong className="block text-amber-900 mb-0.5">
                                  Lời dặn từ Thầy Dũng:
                                </strong>
                                <span>{q.thayDungAdvice}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART II: TRUE - FALSE QUESTIONS & POST-EXAM ANALYSIS & EXPLANATIONS       */}
      {/* ========================================================================= */}
      {activePart === 'part2' && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 flex items-center gap-2 tracking-tight">
                <BookOpen className="w-5 h-5 text-red-800" />
                <span>PHẦN II: CÂU TRẮC NGHIỆM ĐÚNG - SAI ({part2Questions.length} câu)</span>
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Thí sinh đọc kỹ đoạn tư liệu lịch sử. Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn Đúng hoặc Sai.
                {selectedMode === '50min' && (
                  <span className="text-amber-900 font-bold ml-1">
                    (Barem điểm Bộ GD&ĐT: Đúng 1 ý: 0.1đ | Đúng 2 ý: 0.25đ | Đúng 3 ý: 0.5đ | Đúng 4 ý: 1.0đ)
                  </span>
                )}
              </p>
            </div>

            {isSubmitted && (
              <span className="text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 px-3 py-1.5 rounded-xl">
                Điểm Phần II: {calculatePart2Score()} /{' '}
                {selectedMode === '15min' ? '4.0' : selectedMode === '45min' ? '3.0' : '4.0'} đ
              </span>
            )}
          </div>

          {part2Questions.map((q, qIdx) => {
            const currentAns = part2Answers[q.id] || { a: null, b: null, c: null, d: null };
            const qScore = getPart2QuestionScore(q);

            return (
              <div
                key={q.id}
                className={`bg-white border-2 rounded-2xl shadow-xs overflow-hidden transition ${
                  isSubmitted
                    ? qScore.isFullyCorrect
                      ? 'border-emerald-300/80'
                      : 'border-amber-300/80'
                    : 'border-stone-200'
                }`}
              >
                {/* Passage Header */}
                <div className="bg-amber-50/80 p-5 border-b border-stone-200">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-red-900 text-sm sm:text-base">Câu {qIdx + 1}:</span>
                    <span className="text-xs sm:text-sm text-amber-950 font-bold bg-amber-100/90 border border-amber-300 px-2.5 py-0.5 rounded-lg">
                      {q.title}
                    </span>

                    {/* INDIVIDUAL QUESTION SCORE BADGE - REQUIREMENT */}
                    {isSubmitted && (
                      <span className="text-xs font-bold bg-stone-900 text-amber-300 px-3 py-1 rounded-xl shadow-2xs">
                        Điểm câu này: +{qScore.earned} / {qScore.max} điểm (Đúng{' '}
                        {qScore.correctCount}/4 ý)
                      </span>
                    )}
                  </div>

                  <div className="pl-4 border-l-4 border-amber-600 italic text-stone-800 text-sm leading-relaxed font-serif bg-white/80 p-3.5 rounded-r-xl shadow-inner">
                    <span className="not-italic text-stone-900 block mb-1 font-bold text-xs uppercase tracking-wider text-amber-900">
                      Đoạn tư liệu lịch sử:
                    </span>
                    “{q.passage}”
                  </div>
                  <div className="text-right text-[11px] text-stone-500 mt-2 font-medium">
                    — Nguồn: <span className="italic">{q.source}</span>
                  </div>
                </div>

                {/* Statements a, b, c, d */}
                <div className="p-5 space-y-4">
                  <div className="text-xs sm:text-sm font-bold text-stone-900 flex items-center gap-1.5 pb-1 border-b border-stone-200/60">
                    <span className="w-2 h-2 rounded-full bg-red-800 shrink-0"></span>
                    <span>Xác định tính Đúng / Sai cho từng ý a), b), c), d) dưới đây:</span>
                  </div>

                  {q.statements.map((stmt) => {
                    const stmtResult = qScore.statementsResult[stmt.id];
                    const userVal = currentAns[stmt.id];

                    return (
                      <div
                        key={stmt.id}
                        className={`p-4 rounded-xl border-2 transition space-y-2 ${
                          isSubmitted
                            ? stmtResult.isCorrect
                              ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                              : 'bg-rose-50/60 border-rose-300 text-rose-950'
                            : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        {/* Statement text & buttons */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
                          <div className="flex items-start gap-2.5">
                            <span className="font-bold text-stone-900 text-xs bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded shrink-0 mt-0.5">
                              Ý {stmt.id})
                            </span>
                            <span className="text-stone-900 leading-relaxed font-medium">
                              {stmt.text}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              type="button"
                              disabled={isSubmitted}
                              onClick={() => {
                                setPart2Answers((prev) => ({
                                  ...prev,
                                  [q.id]: {
                                    ...(prev[q.id] || { a: null, b: null, c: null, d: null }),
                                    [stmt.id]: true,
                                  },
                                }));
                              }}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                                userVal === true
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                              }`}
                            >
                              <span>Đúng</span>
                              {userVal === true && <Check className="w-3 h-3" />}
                            </button>

                            <button
                              type="button"
                              disabled={isSubmitted}
                              onClick={() => {
                                setPart2Answers((prev) => ({
                                  ...prev,
                                  [q.id]: {
                                    ...(prev[q.id] || { a: null, b: null, c: null, d: null }),
                                    [stmt.id]: false,
                                  },
                                }));
                              }}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                                userVal === false
                                  ? 'bg-rose-600 text-white shadow-xs'
                                  : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-100'
                              }`}
                            >
                              <span>Sai</span>
                              {userVal === false && <X className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>

                        {/* POST-EXAM ANALYSIS & EXPLANATION FOR THIS STATEMENT */}
                        {isSubmitted && (
                          <div className="mt-2 pt-2 border-t border-stone-200/80 text-xs space-y-1.5">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-stone-800">
                                  Đáp án chuẩn: <strong>{stmt.isCorrect ? 'ĐÚNG' : 'SAI'}</strong>
                                </span>
                                <span className="text-stone-400">|</span>
                                <span className="text-stone-700">
                                  Em chọn:{' '}
                                  <strong>
                                    {userVal === true
                                      ? 'ĐÚNG'
                                      : userVal === false
                                      ? 'SAI'
                                      : 'Chưa chọn'}
                                  </strong>
                                </span>
                              </div>

                              <span
                                className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                                  stmtResult.isCorrect
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-rose-100 text-rose-800'
                                }`}
                              >
                                {stmtResult.isCorrect ? '✓ ĐÚNG' : '✗ SAI'}
                              </span>
                            </div>

                            {/* Detailed Explanation for Statement */}
                            <p className="text-stone-700 leading-relaxed bg-white/80 p-2 rounded-lg border border-stone-200/60">
                              <strong>Giải thích:</strong> {stmt.explanation}
                            </p>

                            {/* Trap alert for this statement */}
                            {stmt.trapKeywords && stmt.trapKeywords.length > 0 && (
                              <p className="text-rose-800 text-[11px] flex items-center gap-1 font-semibold">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                                <span>
                                  Từ khóa bẫy trong câu:{' '}
                                  {stmt.trapKeywords.map((k) => `"${k}"`).join(', ')}
                                </span>
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* POST-EXAM ANALYSIS FOR WHOLE TRUE/FALSE QUESTION */}
                {isSubmitted && (
                  <div className="p-4 bg-amber-50/90 border-t border-amber-200 text-xs text-stone-800 space-y-2">
                    {q.trapAlert && (
                      <div className="flex items-start gap-2 bg-rose-50 border border-rose-200 p-2.5 rounded-xl text-rose-950">
                        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-rose-900 mb-0.5">
                            Cảnh báo bẫy ngữ liệu:
                          </strong>
                          <span>{q.trapAlert}</span>
                        </div>
                      </div>
                    )}

                    {q.thayDungAnalysis && (
                      <div className="flex items-start gap-2 bg-white border border-amber-300 p-3 rounded-xl text-amber-950 shadow-2xs">
                        <MessageSquare className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-amber-900 mb-0.5">
                            Lời phân tích chuyên sâu của Thầy Dũng:
                          </strong>
                          <span className="leading-relaxed">{q.thayDungAnalysis}</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* PART III: ESSAY QUESTION & POST-EXAM DETAILED RUBRIC & MODEL ANSWER       */}
      {/* ========================================================================= */}
      {activePart === 'part3' && hasEssayPart && (
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-serif-title text-lg font-bold text-stone-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-800" />
                <span>PHẦN III: TỰ LUẬN VẬN DỤNG CAO (1 câu - 3.0 điểm)</span>
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                Thí sinh nhập bài làm tự luận trực tiếp. Sau khi nộp bài thi, Trợ lý AI sẽ chấm điểm
                và cung cấp ma trận rubric chi tiết.
              </p>
            </div>

            {isSubmitted && (
              <span className="text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 px-3 py-1.5 rounded-xl">
                Điểm Tự luận: {calculatePart3Score()} / {part3MaxScore} đ
              </span>
            )}
          </div>

          <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif-title text-base sm:text-lg font-bold text-stone-900">
                {part3Question.title}
              </h4>
              <span className="text-xs font-bold bg-stone-100 text-stone-700 px-2.5 py-1 rounded-lg">
                Thang điểm: 3.0 đ
              </span>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-stone-800 text-sm whitespace-pre-line leading-relaxed">
              {part3Question.question}
            </div>

            {/* Student input textarea */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase block mb-1.5">
                Bài làm của thí sinh:
              </label>
              <textarea
                rows={8}
                value={part3Answer}
                onChange={(e) => setPart3Answer(e.target.value)}
                disabled={isSubmitted}
                placeholder="Nhập bài làm tự luận của em vào đây (tối thiểu 15-20 từ để AI chấm điểm)..."
                className="w-full bg-white border border-stone-300 rounded-xl p-4 text-sm text-stone-900 focus:outline-none focus:border-amber-600 leading-relaxed font-sans"
              />
            </div>

            {/* AI Grading result banner */}
            {isSubmitted && essayGrading && (
              <div className="bg-stone-950 text-white p-5 sm:p-6 rounded-2xl space-y-4 border border-amber-500/40 shadow-xl">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <span className="font-serif-title text-amber-300 font-bold text-lg flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>Kết Quả Chấm Điểm Tự Luận Của Thầy Dũng</span>
                  </span>
                  <span className="text-sm font-bold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
                    Điểm tự luận: {calculatePart3Score()} / {part3MaxScore} đ
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  {essayGrading.feedbackSummary}
                </p>

                {/* Rubric criteria breakdown */}
                {essayGrading.criteriaBreakdown && essayGrading.criteriaBreakdown.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <span className="text-xs font-bold text-amber-300 block uppercase tracking-wider">
                      Chi tiết barem chấm điểm từng tiêu chí:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {essayGrading.criteriaBreakdown.map((crit, cIdx) => (
                        <div key={cIdx} className="bg-white/5 border border-white/10 p-2.5 rounded-xl">
                          <div className="flex justify-between font-bold text-amber-200 mb-1">
                            <span>{crit.criterion}</span>
                            <span>
                              {crit.score} / {crit.max} đ
                            </span>
                          </div>
                          <p className="text-stone-300 text-[11px] leading-relaxed">{crit.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {essayGrading.strengths && essayGrading.strengths.length > 0 && (
                    <div className="bg-emerald-950/40 border border-emerald-500/30 p-3 rounded-xl text-xs">
                      <strong className="text-emerald-300 block mb-1">✓ Điểm mạnh đạt được:</strong>
                      <ul className="list-disc list-inside text-stone-300 space-y-1">
                        {essayGrading.strengths.map((str, sIdx) => (
                          <li key={sIdx}>{str}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {essayGrading.improvements && essayGrading.improvements.length > 0 && (
                    <div className="bg-rose-950/40 border border-rose-500/30 p-3 rounded-xl text-xs">
                      <strong className="text-rose-300 block mb-1">! Điểm cần khắc phục:</strong>
                      <ul className="list-disc list-inside text-stone-300 space-y-1">
                        {essayGrading.improvements.map((imp, iIdx) => (
                          <li key={iIdx}>{imp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {essayGrading.teacherAdvice && (
                  <p className="text-xs text-amber-200 italic pt-2 border-t border-white/10">
                    "{essayGrading.teacherAdvice}"
                  </p>
                )}
              </div>
            )}

            {/* Model Answer & Guidance for Post-Exam Review */}
            {isSubmitted && (
              <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-5 space-y-3">
                <span className="font-serif-title font-bold text-base text-amber-950 block">
                  Hướng Dẫn Dàn Ý & Đáp Án Mẫu Chuẩn (Để Học Sinh Đối Chiếu)
                </span>

                <div className="space-y-1.5 text-xs text-stone-800">
                  <span className="font-bold text-stone-900 block">Các luận điểm chính cần đạt:</span>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    {part3Question.guidance.map((g, gIdx) => (
                      <li key={gIdx} className="leading-relaxed">
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 pt-3 border-t border-amber-200/70">
                  <span className="font-bold text-stone-900 text-xs block mb-1.5">
                    Bài viết mẫu tham khảo:
                  </span>
                  <div className="bg-white p-4 rounded-xl border border-amber-200 text-stone-800 text-xs leading-relaxed whitespace-pre-line font-sans">
                    {part3Question.modelAnswer}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
