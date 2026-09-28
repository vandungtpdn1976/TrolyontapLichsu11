import React from 'react';
import { BookOpen, CheckSquare, Award, MessageSquare, Compass, Sparkles, Clock } from 'lucide-react';

interface NavbarProps {
  activeTab: 'smartStudy' | 'exam' | 'practice' | 'chat' | 'curriculum';
  setActiveTab: (tab: 'smartStudy' | 'exam' | 'practice' | 'chat' | 'curriculum') => void;
  openChatWithContext?: (contextText: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
      {/* Top golden announcement bar */}
      <div className="bg-gradient-to-r from-red-800 via-amber-800 to-red-900 text-amber-100 text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span>Gia Sư AI Lịch Sử THPT &bull; Chuẩn GDPT 2018 &bull; Cấu Trúc Khảo Thí 3 Dạng & 3 Chế Độ Thi</span>
        <span className="hidden sm:inline-block bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full text-[11px] font-semibold">
          Lịch sử 11
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('smartStudy')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-600 via-red-700 to-amber-900 p-0.5 shadow-md shadow-amber-900/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-stone-900 rounded-[10px] flex items-center justify-center text-amber-400 font-serif-title font-bold text-lg sm:text-xl">
                Sử
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-title text-xl sm:text-2xl font-bold bg-gradient-to-r from-red-900 via-amber-800 to-red-950 bg-clip-text text-transparent">
                  Sử Vàng 11
                </span>
                <span className="text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.5 bg-red-100 text-red-800 rounded border border-red-200">
                  GDPT 2018
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium hidden sm:block">
                Gia sư AI &bull; Ôn tập khoa học &bull; Thầy Dũng
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-stone-100/80 p-1.5 rounded-xl border border-stone-200/80">
            <button
              onClick={() => setActiveTab('smartStudy')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'smartStudy'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Gia Sư Ôn Tập</span>
            </button>

            <button
              onClick={() => setActiveTab('exam')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'exam'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>3 Chế Độ Thi</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'practice'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
              <span>Luyện 3 Dạng Bài</span>
            </button>

            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'curriculum'
                  ? 'bg-red-800 text-white shadow-sm'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>6 Chủ Đề</span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'chat'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200/60'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-amber-500" />
              <span>Hỏi Đáp Thầy Dũng</span>
            </button>
          </nav>

          {/* Quick AI Advisor CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('chat')}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium text-xs sm:text-sm shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </div>
              <span className="hidden sm:inline">Hỏi đáp cùng</span>
              <span className="font-bold">Thầy Dũng AI</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-around py-2 border-t border-stone-200 text-xs">
          <button
            onClick={() => setActiveTab('smartStudy')}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded font-medium ${
              activeTab === 'smartStudy' ? 'text-red-800 font-bold' : 'text-stone-600'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Gia sư</span>
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded font-medium ${
              activeTab === 'exam' ? 'text-red-800 font-bold' : 'text-stone-600'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>3 Chế độ</span>
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded font-medium ${
              activeTab === 'practice' ? 'text-red-800 font-bold' : 'text-stone-600'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>3 Dạng</span>
          </button>
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded font-medium ${
              activeTab === 'curriculum' ? 'text-red-800 font-bold' : 'text-stone-600'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>6 Chủ đề</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-1 py-1 px-1.5 rounded font-medium ${
              activeTab === 'chat' ? 'text-amber-700 font-bold' : 'text-stone-600'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Hỏi Thầy</span>
          </button>
        </div>
      </div>
    </header>
  );
};
