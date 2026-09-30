import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FullExamView } from './components/FullExamView';
import { PracticeTab } from './components/PracticeTab';
import { SmartStudyView } from './components/SmartStudyView';
import { CurriculumSummaryView } from './components/CurriculumSummaryView';
import { TeacherChatPage } from './components/TeacherChatPage';
import { MULTIPLE_CHOICE_QUESTIONS, TRUE_FALSE_QUESTIONS, ESSAY_QUESTIONS } from './data/historyQuestions';
import { MessageSquare, Sparkles, BookOpen, Heart, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'smartStudy' | 'exam' | 'practice' | 'chat' | 'curriculum'>('smartStudy');
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);

  const handleAskTeacher = (contextPrompt: string) => {
    setChatInitialPrompt(contextPrompt);
    setActiveTab('chat');
  };

  const handleSelectTopicForPractice = (_topicId: string) => {
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen bg-stone-100/60 flex flex-col selection:bg-amber-700 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openChatWithContext={handleAskTeacher}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'smartStudy' && (
          <SmartStudyView
            onAskTeacher={handleAskTeacher}
            onGoToPractice={(_topicId: string) => setActiveTab('practice')}
          />
        )}

        {activeTab === 'exam' && (
          <FullExamView
            multipleChoiceQuestions={MULTIPLE_CHOICE_QUESTIONS}
            trueFalseQuestions={TRUE_FALSE_QUESTIONS}
            essayQuestions={ESSAY_QUESTIONS}
            onAskTeacher={handleAskTeacher}
          />
        )}

        {activeTab === 'practice' && (
          <PracticeTab
            multipleChoiceQuestions={MULTIPLE_CHOICE_QUESTIONS}
            trueFalseQuestions={TRUE_FALSE_QUESTIONS}
            essayQuestions={ESSAY_QUESTIONS}
            onAskTeacher={handleAskTeacher}
          />
        )}

        {activeTab === 'curriculum' && (
          <CurriculumSummaryView
            onSelectTopicForPractice={handleSelectTopicForPractice}
            onAskTeacher={handleAskTeacher}
          />
        )}

        {activeTab === 'chat' && (
          <TeacherChatPage
            initialPrompt={chatInitialPrompt}
            onClearInitialPrompt={() => setChatInitialPrompt(undefined)}
          />
        )}
      </main>

      {/* Floating Teacher Dũng AI Badge Button (when not on chat tab) */}
      {activeTab !== 'chat' && (
        <aside aria-label="Trợ lý học tập" className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setActiveTab('chat')}
            className="flex items-center gap-3 bg-gradient-to-r from-red-800 via-amber-700 to-red-900 hover:from-red-900 hover:to-amber-800 text-white pl-4 pr-5 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 group border border-amber-400/30"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center font-serif-title font-bold text-amber-300 border border-amber-400/50">
                T.D
              </div>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-stone-900 animate-pulse" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-amber-200">Trợ lý AI Thầy Dũng</span>
                <Sparkles className="w-3 h-3 text-amber-300" />
              </div>
              <p className="text-[11px] text-stone-200 group-hover:text-white transition">
                Cần Thầy giải đáp câu nào? Nhắn ngay!
              </p>
            </div>
          </button>
        </aside>
      )}

      {/* Modern Academic Footer */}
      <footer className="bg-stone-900 text-stone-400 border-t border-stone-800 py-8 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-950 border border-amber-600/40 flex items-center justify-center text-amber-400 font-serif-title font-bold">
              Sử
            </div>
            <div>
              <span className="font-serif-title text-sm font-bold text-amber-200 block">
                Sử Vàng 11 &bull; Lịch Sử THPT GDPT 2018
              </span>
              <span className="text-stone-500">
                Đồng hành cùng học sinh lớp 11 bứt phá điểm số với Trợ lý AI Thầy Dũng
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
              Chuẩn cấu trúc đề Bộ GD&ĐT
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-red-500" />
              6 Chủ Đề Cốt Lõi Lịch Sử 11
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
