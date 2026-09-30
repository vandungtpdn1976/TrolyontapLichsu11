export type DifficultyLevel = 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';

export type ExamMode = '15min' | '45min' | '50min' | 'hocki1';

export interface Topic {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  period: string;
  lessons: string[];
  description: string;
  keyConcepts: string[];
  icon: string;
  color: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  topicId: string;
  lessonName?: string;
  question: string;
  options: [string, string, string, string]; // [A, B, C, D]
  correctIndex: number; // 0, 1, 2, 3
  level: DifficultyLevel;
  difficulty?: DifficultyLevel;
  explanation: string;
  optionsAnalysis?: [string, string, string, string]; // Phân tích từng phương án A, B, C, D vì sao đúng/sai
  trapTip?: string; // Mẹo tránh bẫy từ khóa
  thayDungAdvice?: string;
}

export interface StatementItem {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean;
  explanation: string;
  trapKeywords?: string[]; // Các từ bẫy: luôn luôn, hoàn toàn, duy nhất, tất cả, chỉ...
  trapAlert?: string;
}

export interface TrueFalseQuestion {
  id: string;
  topicId: string;
  lessonName?: string;
  title: string;
  passage: string; // Sử liệu / Ngữ liệu lịch sử
  source: string; // Nguồn trích dẫn (SGK, Đại Việt Sử Ký Toàn Thư, Tuyên ngôn...)
  statements: StatementItem[];
  thayDungAnalysis: string; // Lời phân tích chuyên sâu của Gia sư AI
  trapAlert?: string; // Cảnh báo bẫy ngữ liệu
}

export interface ModelAnswerStructured {
  introduction?: string;
  mainPoints?: string[];
  analysisAndEvidence?: string;
  evaluationAndConnection?: string;
  conclusion?: string;
  moVanDe?: string; // Mở vấn đề
  noiDungChinh?: string; // Nội dung chính
  phanTich?: string; // Phân tích quan hệ nhân quả
  danhGia?: string; // Nhận xét, đánh giá
  ketLuan?: string; // Kết luận & bài học
}

export interface EssayQuestion {
  id: string;
  topicId: string;
  lessonName?: string;
  title: string;
  question: string;
  context?: string;
  guidance: string[]; // Các ý chính cần đạt
  modelAnswer: string;
  modelAnswerStructured?: ModelAnswerStructured;
  rubricCriteria: {
    criterion: string;
    maxScore: number;
  }[];
}

export interface EssayGradingResult {
  score: number;
  maxScore: number;
  feedbackSummary: string;
  strengths: string[];
  improvements: string[];
  criteriaBreakdown: {
    criterion: string;
    score: number;
    max: number;
    comment: string;
  }[];
  modelAnswerStructured?: ModelAnswerStructured;
  modelAnswerExcerpt?: string;
  teacherAdvice: string;
}

export interface ChatMessageImage {
  id: string;
  dataUrl: string;
  mimeType: string;
  name?: string;
  size?: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  images?: ChatMessageImage[];
  relatedTopicId?: string;
  suggestedQuestions?: string[];
  actionType?: 'why' | 'simplify' | 'example' | 'confused' | 'forgot' | 'quiz';
}

export interface TimelineEvent {
  year: string;
  title: string;
  topicId: string;
  description: string;
  significance: string;
}

export interface CognitiveLevelItem {
  title: string;
  detail: string;
  highlight?: string; // Dữ kiện cốt lõi cần nhớ nằm lòng / từ khóa vàng
}

export interface CognitiveLevelKnowledge {
  level: 'nhan_biet' | 'thong_hieu' | 'van_dung';
  levelName: string; // VD: 'Cấp độ 1: BIẾT (Nhận biết)'
  badge: string; // 'Mức 1' | 'Mức 2' | 'Mức 3'
  summary: string; // Tóm tắt chuẩn đầu ra / yêu cầu cần đạt
  points: CognitiveLevelItem[];
  tips?: string[]; // Mẹo làm bài thi cho cấp độ này
}

export interface SmartStudyLevels {
  nhanBiet: CognitiveLevelKnowledge;
  thongHieu: CognitiveLevelKnowledge;
  vanDung: CognitiveLevelKnowledge;
}

export interface SmartStudyData {
  topicTitle: string;
  lessonName: string;
  inputContentSummary?: string; // Tóm tắt nội dung học sinh đã nhập
  levelsKnowledge?: SmartStudyLevels; // Phân hóa kiến thức 3 cấp độ: Biết, Hiểu, Vận dụng
  coreKnowledge: string[];
  keywords: {
    timeline: string[];
    characters: string[];
    events: string[];
    locations: string[];
    documents: string[];
    terms: string[];
  };
  causeAndEffect: {
    cause: string;
    event: string;
    result: string;
    significance: string;
    impact: string;
  }[];
  comparison?: {
    title: string;
    target1Name: string;
    target2Name: string;
    rows: {
      aspect: string;
      target1: string;
      target2: string;
    }[];
  };
  commonMistakes: {
    trap: string;
    truth: string;
    tip: string;
  }[];
  mindmapSteps: string[];
  threeLevelQuestions?: {
    level: DifficultyLevel;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  teacherAdvice?: string; // Lời căn dặn của Thầy Dũng
}

export interface MasteryReport {
  mastered: string[];
  reviewNeeded: string[];
  notMastered: string[];
}

export interface OfficialExam {
  id: string;
  code: string;
  title: string;
  durationMinutes: number;
  scope: string;
  source: string;
  description: string;
  multipleChoiceQuestions: MultipleChoiceQuestion[];
  essayQuestions: EssayQuestion[];
}

