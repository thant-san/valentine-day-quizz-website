
import React from 'react';
import { Question } from '../types';

interface QuizCardProps {
  question: Question;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
  currentIndex: number;
  totalQuestions: number;
  onNext: () => void;
  onPrev: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  question,
  selectedAnswer,
  onSelect,
  currentIndex,
  totalQuestions,
  onNext,
  onPrev
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 md:p-10 rounded-3xl shadow-xl max-w-lg w-full transform transition-all animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-pink-600 font-semibold text-sm">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-gray-400 text-xs italic">
            Be honest! ❤️
          </span>
        </div>
        <div className="w-full bg-pink-100 h-2 rounded-full overflow-hidden">
          <div 
            className="bg-pink-500 h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-8 leading-tight">
        {question.text}
      </h2>

      <div className="space-y-4 mb-10">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 transform hover:scale-[1.02] flex items-center ${
              selectedAnswer === index
                ? 'bg-pink-500 border-pink-500 text-white shadow-lg shadow-pink-200'
                : 'bg-white border-pink-100 text-gray-700 hover:border-pink-300'
            }`}
          >
            <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
              selectedAnswer === index ? 'bg-white text-pink-500' : 'bg-pink-50 text-pink-400'
            } font-bold`}>
              {String.fromCharCode(65 + index)}
            </span>
            <span className="font-medium">{option}</span>
            {selectedAnswer === index && (
                <span className="ml-auto animate-bounce">💖</span>
            )}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center gap-4">
        <button
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            currentIndex === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
          }`}
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={selectedAnswer === null}
          className={`flex-[2] py-3 px-6 rounded-xl font-bold text-white transition-all shadow-md ${
            selectedAnswer === null
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 hover:shadow-lg'
          }`}
        >
          {currentIndex === totalQuestions - 1 ? 'Finish Quiz ✨' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default QuizCard;
