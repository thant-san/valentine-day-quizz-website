
import { Question } from './types';

/**
 * EDIT THESE QUESTIONS TO CUSTOMIZE YOUR QUIZ!
 * 
 * Each question needs:
 * - id: A unique number
 * - text: The question string
 * - options: An array of 4 possible answers
 * - correctAnswer: The index of the correct answer (0, 1, 2, or 3)
 */
export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What is my favorite food?",
    options: ["Pizza", "Fried Chicken", "Ice Cream", "Mai"],
    correctAnswer: 3 // 'Mai' is correct
  },
  {
    id: 2,
    text: "What is my favorite sport?",
    options: ["Tennis", "Badminton", "Football", "Swimming"],
    correctAnswer: 0 // 'Tennis' is correct
  },
  {
    id: 3,
    text: "What is my 'secret talent' that most people don't know?",
    options: ["Playing the Ukulele", "Solving Rubik's cubes", "Good Sex", "Baking amazing cookies"],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "Who care me the most?",
    options: ["my girlfriend", "my father", "my mother", "my friends"],
    correctAnswer: 0
  },
  {
    id: 5,
    text: "What's the one thing I always do when I am angry",
    options: ["Talk really fast", "stay calm and control myself", "shout at you", "Clean something"],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "Why u like me ? because",
    options: ["I m tall", "I am kind", "I am smart", "I have big  d**k"],
    correctAnswer: 3
  },
  {
    id: 7,
    text: "If I won the lottery tomorrow, what's the first thing I'd buy?",
    options: ["A Sports Car", "A Plane Ticket for us", "A Giant House", "buy everything u want"],
    correctAnswer: 3
  },
  {
    id: 8,
    text: "What's my favorite way to spend time with u?",
    options: ["hug", "eat food together", "sex", "walking together"],
    correctAnswer: 2
  }
];

export const RESULT_CATEGORIES = {
  LOW: {
    min: 0,
    max: 3,
    message: "Still learning... but I love you anyway! ❤️",
    sub: "Every day is a new chance to learn something new about us."
  },
  MEDIUM: {
    min: 4,
    max: 6,
    message: "You know me pretty well! 😘",
    sub: "You've definitely been paying attention to my heart."
  },
  HIGH: {
    min: 7,
    max: 8,
    message: "Wow, you know my heart completely! 💞",
    sub: "You are my soulmate, and this proves it."
  }
};
