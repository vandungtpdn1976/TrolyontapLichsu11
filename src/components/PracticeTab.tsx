import React, { useState } from 'react';
import { MultipleChoiceQuestion, TrueFalseQuestion, EssayQuestion } from '../types/history';
import { MultipleChoiceView } from './MultipleChoiceView';
import { TrueFalseView } from './TrueFalseView';
import { EssayView } from './EssayView';
import { CheckSquare, ToggleLeft, PenTool, Sparkles } from 'lucide-react';

interface PracticeTabProps {
  multipleChoiceQuestions: MultipleChoiceQuestion[];
  trueFalseQuestions: TrueFalseQuestion[];
  essayQuestions: EssayQuestion[];
  onAskTeacher: (context: string) => void;
  defaultSubTab?: 'mc' | 'tf' | 'essay';
}

export const PracticeTab: React.FC<PracticeTabProps> = ({
  multipleChoiceQuestions,
  trueFalseQuestions,
  essayQuestions,
  onAskTeacher,
  defaultSubTab = 'tf',
}) => {
  const [subTab, setSubTab] = useState<'mc' | 'tf' | 'essay'>(defaultSubTab);

  return (
    <div>
      {/* Sub-navigation for the 3 Question Types */}
      <div className="max-w-4xl mx-auto px-4 pt-4">
        <div className="bg-stone-200/80 p-1.5 rounded-2xl flex items-center justify-between gap-1 shadow-inner border border-stone-300">
          <button
            onClick={() => setSubTab('tf')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
              subTab === 'tf'
                ? 'bg-red-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <ToggleLeft className="w-4 h-4" />
            <span>1. Trắc Nghiệm Đúng - Sai</span>
            <span className="hidden sm:inline-block text-[10px] bg-amber-400 text-stone-950 font-bold px-1.5 py-0.5 rounded-full">
              Mới Bộ GD&ĐT
            </span>
          </button>

          <button
            onClick={() => setSubTab('mc')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
              subTab === 'mc'
                ? 'bg-red-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <CheckSquare className="w-4 h-4" />
            <span>2. Trắc Nghiệm 4 Lựa Chọn</span>
          </button>

          <button
            onClick={() => setSubTab('essay')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 ${
              subTab === 'essay'
                ? 'bg-purple-800 text-white shadow-sm'
                : 'text-stone-700 hover:text-stone-900 hover:bg-white/60'
            }`}
          >
            <PenTool className="w-4 h-4" />
            <span>3. Tự Luận Vận Dụng</span>
            <span className="hidden sm:inline-block text-[10px] bg-purple-200 text-purple-900 font-bold px-1.5 py-0.5 rounded-full">
              AI Chấm Điểm
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
    </div>
  );
};
