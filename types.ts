
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export enum AppState {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS'
}

export interface QuizResult {
  score: number;
  total: number;
  aiMessage?: string;
}
