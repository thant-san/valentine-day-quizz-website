
import React from 'react';
import { QuizResult } from '../types';
import { RESULT_CATEGORIES } from '../constants';

interface ResultsViewProps {
  result: QuizResult;
  onRestart: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ result, onRestart }) => {
  const { score, total, aiMessage } = result;
  
  const getCategory = () => {
    if (score <= RESULT_CATEGORIES.LOW.max) return RESULT_CATEGORIES.LOW;
    if (score <= RESULT_CATEGORIES.MEDIUM.max) return RESULT_CATEGORIES.MEDIUM;
    return RESULT_CATEGORIES.HIGH;
  };

  const category = getCategory();

  return (
    <div className="bg-white/90 backdrop-blur-lg p-8 md:p-12 rounded-[2rem] shadow-2xl max-w-lg w-full text-center animate-scale-in">
      <div className="mb-6 relative inline-block">
        <div className="text-6xl md:text-8xl mb-2 animate-bounce">
          {score === total ? '🏆' : '💝'}
        </div>
        {score === total && (
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                PERFECT!
            </div>
        )}
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">
        {score} / {total}
      </h2>
      <p className="text-gray-500 font-medium uppercase tracking-widest text-sm mb-6">
        Final Score
      </p>

      <h3 className="text-2xl font-romantic text-rose-500 mb-4 font-bold">
        {category.message}
      </h3>
      
      <div className="bg-pink-50 rounded-2xl p-6 mb-8 border border-pink-100">
        <p className="text-gray-700 italic leading-relaxed">
          {aiMessage || category.sub}
        </p>
      </div>

      <div className="space-y-4">
        <button
          onClick={onRestart}
          className="w-full py-4 px-8 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-bold text-lg shadow-lg hover:from-pink-600 hover:to-rose-700 transition-all hover:scale-[1.02]"
        >
          Try Again 🔄
        </button>
        <p className="text-xs text-gray-400">
          Made with love, just for you.
        </p>
      </div>
    </div>
  );
};

export default ResultsView;
