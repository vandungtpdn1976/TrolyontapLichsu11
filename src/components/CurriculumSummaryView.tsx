import React, { useState } from 'react';
import { TOPICS, TIMELINE_EVENTS } from '../data/historyTopics';
import { BookOpen, Compass, Shield, Flame, Landmark, ScrollText, Anchor, Clock, ArrowRight, MessageSquare, CheckCircle2, Palette, Globe, Award, Sparkles, FileText, AlertTriangle, Layers } from 'lucide-react';

interface CurriculumSummaryViewProps {
  onSelectTopicForPractice: (topicId: string) => void;
  onAskTeacher: (context: string) => void;
}

export const CurriculumSummaryView: React.FC<CurriculumSummaryViewProps> = ({
  onSelectTopicForPractice,
  onAskTeacher,
}) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'timeline' | 'examPrep'>('topics');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'sgk' | 'chuyende'>('all');
  const [expandedTopic, setExpandedTopic] = useState<string>(TOPICS[0].id);

  const filteredTopics = TOPICS.filter((t) => {
    if (categoryFilter === 'sgk') return t.number <= 6;
    if (categoryFilter === 'chuyende') return t.number >= 7;
    return true;
  });

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark className="w-5 h-5 text-amber-700" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-red-700" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-700" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-blue-700" />;
      case 'ScrollText':
        return <ScrollText className="w-5 h-5 text-purple-700" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5 text-cyan-700" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-pink-700" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-indigo-700" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-800" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-900 via-amber-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-lg border border-amber-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30 flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chương Trình GDPT 2018 &bull; Kết Nối Tri Thức &bull; Lịch Sử 11</span>
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-amber-100 mt-2">
              Chương Trình Chuẩn SGK, SGV & 3 Chuyên Đề Nâng Cao
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Hệ thống hóa toàn diện 6 Chủ đề cốt lõi, 3 Chuyên đề học tập nâng cao cùng Cẩm nang Đề cương Ôn tập Cuối kỳ I (2024 - 2025) theo định dạng mới của Bộ GD&ĐT.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-stone-800/80 p-1 rounded-xl self-start md:self-center text-xs font-semibold">
            <button
              onClick={() => setActiveTab('topics')}
              className={`px-3 py-2 rounded-lg transition ${
                activeTab === 'topics' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
            >
              Chủ Đề & Chuyên Đề
            </button>
            <button
              onClick={() => setActiveTab('examPrep')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'examPrep' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Đề Cương Cuối Kỳ I (2025)</span>
            </button>
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'timeline' ? 'bg-amber-600 text-white shadow-xs' : 'text-stone-300 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Dòng Thời Gian</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'topics' ? (
        <div className="space-y-4">
          {/* Sub-filters for categories */}
          <div className="flex items-center gap-2 pb-2 overflow-x-auto no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`px-3.5 py-1.5 rounded-full border transition ${
                categoryFilter === 'all'
                  ? 'bg-amber-800 text-white border-amber-800'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              Tất cả ({TOPICS.length})
            </button>
            <button
              onClick={() => setCategoryFilter('sgk')}
              className={`px-3.5 py-1.5 rounded-full border transition ${
                categoryFilter === 'sgk'
                  ? 'bg-amber-800 text-white border-amber-800'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              6 Chủ đề SGK Lịch sử 11
            </button>
            <button
              onClick={() => setCategoryFilter('chuyende')}
              className={`px-3.5 py-1.5 rounded-full border transition ${
                categoryFilter === 'chuyende'
                  ? 'bg-amber-800 text-white border-amber-800'
                  : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
              }`}
            >
              3 Chuyên đề học tập nâng cao
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topics List on Left */}
            <div className="lg:col-span-1 space-y-3">
              {filteredTopics.map((topic) => {
                const isSelected = expandedTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    onClick={() => setExpandedTopic(topic.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-50/80 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                        : 'bg-white border-stone-200 hover:border-amber-300 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 shadow-xs flex items-center justify-center shrink-0">
                        {getTopicIcon(topic.icon)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">
                            {topic.number <= 6 ? `Chủ đề ${topic.number}` : `Chuyên đề ${topic.number - 6}`}
                          </span>
                          <span className="text-[11px] text-stone-400 font-medium">
                            {topic.period}
                          </span>
                        </div>
                        <h4 className="font-serif-title font-bold text-stone-900 text-sm mt-0.5 leading-snug">
                          {topic.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Topic Detailed Overview on Right */}
            <div className="lg:col-span-2">
              {(() => {
                const topic = TOPICS.find((t) => t.id === expandedTopic) || TOPICS[0];
                return (
                  <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    <div className="flex items-start justify-between gap-4 border-b border-stone-100 pb-5">
                      <div>
                        <span className="text-xs font-bold text-red-900 uppercase tracking-wider bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">
                          {topic.number <= 6 ? `Chủ đề ${topic.number}` : `Chuyên đề học tập ${topic.number - 6}`} &bull; {topic.period}
                        </span>
                        <h3 className="font-serif-title text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                          {topic.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-stone-500 font-medium mt-0.5">
                          {topic.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={() =>
                          onAskTeacher(
                            `Thầy Dũng ơi, Thầy có thể tóm tắt cho em những nội dung quan trọng nhất của "${topic.title}" và các dạng câu hỏi thường gặp trong đề thi không ạ?`
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold text-xs transition flex items-center gap-1.5 shrink-0"
                      >
                        <MessageSquare className="w-4 h-4 text-amber-700" />
                        <span>Hỏi Thầy về bài này</span>
                      </button>
                    </div>

                    {/* Description */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Khái quát nội dung cốt lõi:
                      </h5>
                      <p className="text-sm sm:text-base text-stone-700 leading-relaxed bg-stone-50 p-4 rounded-2xl border border-stone-200/70">
                        {topic.description}
                      </p>
                    </div>

                    {/* Lessons */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Các bài học / mục trọng tâm:
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {topic.lessons.map((lesson, idx) => (
                          <div
                            key={idx}
                            className="bg-amber-50/50 border border-amber-200/80 p-3 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-stone-800"
                          >
                            <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
                            <span>{lesson}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Concepts */}
                    <div>
                      <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                        Khái niệm & Thuật ngữ then chốt:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {topic.keyConcepts.map((concept, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-stone-100 text-stone-800 font-medium px-3 py-1.5 rounded-lg border border-stone-200 flex items-center gap-1.5"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                            {concept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                      <span className="text-xs text-stone-500">
                        Sẵn sàng kiểm tra kiến thức của nội dung này?
                      </span>
                      <button
                        onClick={() => onSelectTopicForPractice(topic.id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-800 to-amber-700 hover:from-red-900 hover:to-amber-800 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shadow-sm"
                      >
                        <span>Luyện bài tập {topic.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      ) : activeTab === 'examPrep' ? (
        /* Exam Preparation Tab (Cuối kỳ I - 2025) */
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
          <div className="border-b border-stone-100 pb-5">
            <span className="text-xs font-bold text-red-900 uppercase tracking-wider bg-red-100/70 border border-red-200 px-3 py-1 rounded-full">
              Chuẩn Định Dạng Mới 2025 &bull; Bộ Giáo Dục & Đào Tạo
            </span>
            <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              Đề Cương Ôn Tập Lịch Sử Cuối Kỳ I (Năm Học 2024 - 2025)
            </h3>
            <p className="text-stone-600 text-sm mt-1">
              Phạm vi kiến thức trọng tâm học kỳ I: <strong>Bài 1 đến Bài 8 SGK Lịch sử 11 Kết nối tri thức</strong> (Chủ đề 1 đến Chủ đề 4).
            </p>
          </div>

          {/* 3 Formats Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded-full">
                Phần I: 4 Phương Án
              </span>
              <h4 className="font-serif-title font-bold text-stone-900 text-base mt-2">
                Trắc Nghiệm Nhiều Lựa Chọn
              </h4>
              <p className="text-stone-600 text-xs mt-1.5 leading-relaxed">
                Kiểm tra mức độ <strong>Nhận biết</strong> và <strong>Thông hiểu</strong>. Mỗi câu chọn 1 đáp án đúng duy nhất. Cần nắm chắc mốc thời gian, nhân vật, sự kiện và nguyên nhân.
              </p>
              <div className="mt-3 pt-3 border-t border-amber-200/60 text-xs font-semibold text-amber-900">
                &bull; Thang điểm: 0.25 điểm / câu
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200">
              <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider bg-blue-100 px-2.5 py-0.5 rounded-full">
                Phần II: Ngữ Liệu Lịch Sử
              </span>
              <h4 className="font-serif-title font-bold text-stone-900 text-base mt-2">
                Trắc Nghiệm Đúng - Sai
              </h4>
              <p className="text-stone-600 text-xs mt-1.5 leading-relaxed">
                Cho 1 đoạn trích sử liệu và 4 mệnh đề a, b, c, d từ dễ đến khó. Phân hóa cao, đòi hỏi phân tích từ khóa và tư duy bản chất sử liệu.
              </p>
              <div className="mt-3 pt-3 border-t border-blue-200/60 text-xs font-semibold text-blue-900">
                &bull; 1 ý: 0.1đ | 2 ý: 0.25đ | 3 ý: 0.5đ | 4 ý: 1.0đ
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-red-50/60 border border-red-200">
              <span className="text-[11px] font-bold text-red-800 uppercase tracking-wider bg-red-100 px-2.5 py-0.5 rounded-full">
                Phần III: Năng Lực Lập Luận
              </span>
              <h4 className="font-serif-title font-bold text-stone-900 text-base mt-2">
                Tự Luận / Vận Dụng
              </h4>
              <p className="text-stone-600 text-xs mt-1.5 leading-relaxed">
                Phân tích nguyên nhân - kết quả, so sánh điểm giống/khác, rút ra bài học lịch sử và liên hệ trách nhiệm công dân thế hệ trẻ hôm nay.
              </p>
              <div className="mt-3 pt-3 border-t border-red-200/60 text-xs font-semibold text-red-900">
                &bull; Cấu trúc 5 bước: Mở - Thân - Phân tích - Đánh giá - Kết
              </div>
            </div>
          </div>

          {/* Key Topics Checklist for Semester 1 */}
          <div>
            <h4 className="font-serif-title text-lg font-bold text-stone-900 mb-3 flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-700" />
              <span>4 Trọng Tâm Kiến Thức Bắt Buộc Ôn Cuối Kỳ I</span>
            </h4>
            <div className="space-y-3">
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <h5 className="font-bold text-amber-900 text-sm">
                  1. Chủ đề 1: Cách mạng tư sản và sự phát triển của chủ nghĩa tư bản (Bài 1 & 2)
                </h5>
                <p className="text-stone-600 text-xs mt-1">
                  Tiền đề (kinh tế, chính trị, xã hội, tư tưởng); Phân biệt nhiệm vụ dân tộc và nhiệm vụ dân chủ; So sánh CMTS Anh (1640) và CMTS Pháp (1789); Các hình thức tổ chức độc quyền (Cartel, Syndicate, Trust); Đặc trưng của CNTB hiện đại.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <h5 className="font-bold text-red-900 text-sm">
                  2. Chủ đề 2: Chủ nghĩa xã hội từ năm 1917 đến nay (Bài 3 & 4)
                </h5>
                <p className="text-stone-600 text-xs mt-1">
                  Cách mạng tháng Mười Nga 1917; Ba nguyên tắc Lênin thành lập Liên bang Xô viết năm 1922 (Tự nguyện - Bình đẳng - Quyền tự quyết); Trọng tâm Cải cách mở cửa ở Trung Quốc từ 1978 (lấy kinh tế làm trung tâm); Bài học cho công cuộc Đổi mới ở Việt Nam.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <h5 className="font-bold text-emerald-900 text-sm">
                  3. Chủ đề 3: Quá trình giành độc lập dân tộc ở Đông Nam Á (Bài 5 & 6)
                </h5>
                <p className="text-stone-600 text-xs mt-1">
                  Quá trình phương Tây xâm lược và chính sách cai trị; Vì sao Xiêm giữ được độc lập (Rama V cải cách và ngoại giao vùng đệm); Thời cơ vàng tháng 8-1945 khi Nhật đầu hàng; Ba nước In-đô-nê-xi-a (17-8), Việt Nam (2-9), Lào (12-10) giành độc lập.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
                <h5 className="font-bold text-blue-900 text-sm">
                  4. Chủ đề 4: Chiến tranh bảo vệ Tổ quốc và giải phóng dân tộc (Bài 7 & 8)
                </h5>
                <p className="text-stone-600 text-xs mt-1">
                  Các cuộc kháng chiến tiêu biểu: Lý (Như Nguyệt 1077), Trần (3 lần kháng chiến chống Mông - Nguyên 1258, 1285, 1288), Lam Sơn (Chi Lăng - Xương Giang 1427), Tây Sơn (Rạch Gầm - Xoài Mút 1785, Ngọc Hồi - Đống Đa 1789); Bài học "Khoan thư sức dân", "Lấy dân làm gốc" và nghệ thuật quân sự độc đáo.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Button */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-stone-800">
                Muốn thử sức ngay với Đề Thi Chuẩn Cuối Kỳ I được sinh từ kho dữ liệu này?
              </span>
            </div>
            <button
              onClick={() => onSelectTopicForPractice('on-tap-cuoi-ki-1')}
              className="px-4 py-2 rounded-xl bg-red-800 hover:bg-red-900 text-white font-bold text-xs sm:text-sm transition flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <span>Vào Làm Đề Ôn Cuối Kỳ I</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Timeline View */
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
          <h3 className="font-serif-title text-xl font-bold text-stone-900 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-700" />
            <span>Trục Mốc Thời Gian Lịch Sử Quan Trọng Lớp 11 (Chuẩn GDPT 2018)</span>
          </h3>

          <div className="relative border-l-2 border-amber-600/40 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-amber-600 border-4 border-white shadow-xs group-hover:scale-125 transition-transform" />

                <div className="bg-stone-50 hover:bg-amber-50/50 border border-stone-200 rounded-2xl p-4 sm:p-5 transition">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <span className="font-mono text-sm font-bold text-red-800 bg-red-100/70 px-2.5 py-0.5 rounded-full self-start">
                      {event.year}
                    </span>
                    <span className="text-xs text-amber-800 font-semibold">
                      Chủ đề: {TOPICS.find((t) => t.id === event.topicId)?.title || 'Lịch sử 11'}
                    </span>
                  </div>

                  <h4 className="font-serif-title font-bold text-stone-900 text-base sm:text-lg mb-1">
                    {event.title}
                  </h4>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-2">
                    {event.description}
                  </p>
                  <div className="text-xs text-amber-950 font-medium bg-amber-100/60 p-2.5 rounded-xl border border-amber-200/60">
                    <strong>Ý nghĩa lịch sử:</strong> {event.significance}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
