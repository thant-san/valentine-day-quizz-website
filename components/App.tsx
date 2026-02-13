
import React, { useState, useCallback } from 'react';
import FloatingHearts from './components/FloatingHearts';
import QuizCard from './components/QuizCard';
import ResultsView from './components/ResultsView';
import { AppState, QuizResult } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { generateLoveMessage } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const startQuiz = () => {
    setAppState(AppState.QUIZ);
    setCurrentQuestionIndex(0);
    setAnswers(new Array(QUIZ_QUESTIONS.length).fill(null));
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = async () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate score
      let score = 0;
      QUIZ_QUESTIONS.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) {
          score++;
        }
      });

      setIsGenerating(true);
      setAppState(AppState.RESULTS);
      
      const aiMessage = await generateLoveMessage(score, QUIZ_QUESTIONS.length);
      setResult({
        score,
        total: QUIZ_QUESTIONS.length,
        aiMessage
      });
      setIsGenerating(false);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setAppState(AppState.HOME);
    setResult(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-100 via-white to-rose-100 overflow-hidden">
      <FloatingHearts />
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-200/30 to-transparent"></div>
      
      <main className="z-10 w-full flex flex-col items-center justify-center">
        {appState === AppState.HOME && (
          <div className="text-center max-w-2xl px-4 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-romantic text-rose-500 mb-6 drop-shadow-sm">
              How Well Do You Know Me? 💕
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 font-light leading-relaxed">
              A playful and romantic Valentine's Day quiz designed <br className="hidden md:block" /> specifically for my favorite person.
            </p>
            <button
              onClick={startQuiz}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold py-4 px-12 rounded-full text-xl shadow-xl hover:shadow-pink-200 transition-all transform hover:scale-105 active:scale-95"
            >
              Start the Love Quiz 💖
            </button>
            <div className="mt-12 flex justify-center gap-4 text-pink-300">
                <span className="animate-pulse">💌</span>
                <span className="animate-bounce delay-100">🌹</span>
                <span className="animate-pulse delay-200">✨</span>
            </div>
          </div>
        )}

        {appState === AppState.QUIZ && (
          <QuizCard
            question={QUIZ_QUESTIONS[currentQuestionIndex]}
            selectedAnswer={answers[currentQuestionIndex]}
            onSelect={handleSelectAnswer}
            currentIndex={currentQuestionIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}

        {appState === AppState.RESULTS && (
          <>
            {isGenerating ? (
              <div className="text-center p-12 bg-white/50 backdrop-blur-sm rounded-3xl">
                <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-2xl font-romantic text-pink-600">Whispering to the stars...</h3>
                <p className="text-gray-500 text-sm">Generating your special message</p>
              </div>
            ) : result && (
              <ResultsView result={result} onRestart={handleRestart} />
            )}
          </>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="absolute bottom-6 text-pink-400 text-xs font-semibold tracking-widest uppercase opacity-60">
        Happy Valentine's Day 2025
      </footer>

      {/* Custom Global Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
      `}</style>
    </div>
  );
};

export default App;
