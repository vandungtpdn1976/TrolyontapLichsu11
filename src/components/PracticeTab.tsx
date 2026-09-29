import React, { useState } from 'react';
import { MultipleChoiceQuestion, TrueFalseQuestion, EssayQuestion } from '../types/history';
import { MultipleChoiceView } from './MultipleChoiceView';
import { TrueFalseView } from './TrueFalseView';
import { EssayView } from './EssayView';
import { DocumentQuizGenerator } from './DocumentQuizGenerator';
import { CheckSquare, ToggleLeft, PenTool, Sparkles, FileText } from 'lucide-react';

interface PracticeTabProps {
  multipleChoiceQuestions: MultipleChoiceQuestion[];
  trueFalseQuestions: TrueFalseQuestion[];
  essayQuestions: EssayQuestion[];
  onAskTeacher: (context: string) => void;
  defaultSubTab?: 'mc' | 'tf' | 'essay' | 'doc_ai';
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  multipleChoiceQuestions,
  trueFalseQuestions,
  essayQuestions,
  onAskTeacher,
  defaultSubTab = 'tf',
}) => {
  const [subTab, setSubTab] = useState<'mc' | 'tf' | 'essay' | 'doc_ai'>(defaultSubTab);

  return (
    <div>
      {/* Sub-navigation for the 4 Question Types */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-stone-200/80 p-1.5 rounded-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-1 shadow-inner border border-stone-300">
          <button
            onClick={() => setSubTab('tf')}
            className={`flex-1 py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              subTab === 'tf'
                ? 'bg-red-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <ToggleLeft className="w-4 h-4 shrink-0" />
            <span>1. Đúng - Sai</span>
            <span className="hidden md:inline-block text-[10px] bg-amber-400 text-stone-950 font-bold px-1 py-0.5 rounded-full">
              Bộ GD 2025
            </span>
          </button>

          <button
            onClick={() => setSubTab('mc')}
            className={`flex-1 py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              subTab === 'mc'
                ? 'bg-red-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <CheckSquare className="w-4 h-4 shrink-0" />
            <span>2. 4 Lựa Chọn</span>
          </button>

          <button
            onClick={() => setSubTab('essay')}
            className={`flex-1 py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              subTab === 'essay'
                ? 'bg-purple-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <PenTool className="w-4 h-4 shrink-0" />
            <span>3. Tự Luận</span>
            <span className="hidden md:inline-block text-[10px] bg-purple-200 text-purple-900 font-bold px-1 py-0.5 rounded-full">
              Chấm AI
            </span>
          </button>

          <button
            onClick={() => setSubTab('doc_ai')}
            className={`flex-1 py-2.5 px-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-1.5 ${
              subTab === 'doc_ai'
                ? 'bg-gradient-to-r from-amber-700 to-amber-900 text-white shadow-sm border border-amber-500/40'
                : 'text-stone-800 hover:text-stone-950 hover:bg-amber-100/70'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />
            <span>4. Tạo Từ Tư Liệu</span>
            <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded-full animate-pulse">
              Mới
            </span>
          </button>
        </div>
      </div>

      {/* Render the appropriate view */}
      {subTab === 'tf' && (
        <TrueFalseView
          questions={trueFalseQuestions}
          onAskTeacher={onAskTeacher}
        />
      )}

      {subTab === 'mc' && (
        <MultipleChoiceView
          questions={multipleChoiceQuestions}
          onAskTeacher={onAskTeacher}
        />
      )}

      {subTab === 'essay' && (
        <EssayView
          questions={essayQuestions}
          onAskTeacher={onAskTeacher}
        />
      )}

      {subTab === 'doc_ai' && (
        <DocumentQuizGenerator
          onAskTeacher={onAskTeacher}
        />
      )}
    </div>
  );
};
