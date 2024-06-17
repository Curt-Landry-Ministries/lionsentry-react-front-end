// src/app/data/questions.tsx

export interface Question {
  id: number;
  question: string;
}

const questions: Question[] = [
  { id: 0, question: "What makes you come alive?" },
  { id: 1, question: "What are the things you naturally excel at?" },
  { id: 2, question: "What do you believe about the world?" },
  { id: 3, question: "When have you felt the most fulfilled and satisfied?" },
  { id: 4, question: "What impact do you want to make on the world or in the lives of others?" },
  { id: 5, question: "What would you do even if you were not getting paid for it?" },
  { id: 6, question: "Who are the people you admire the most and why?" },
  { id: 7, question: "What has been a common thread in some of your most joyful and powerful experiences?" },
  { id: 8, question: "What are the challenges or hardships that you feel most driven to solve or overcome?" },
  { id: 9, question: "If fear or failure were not an issue what would you pursue?" },
  { id: 10, question: "What is a cause or belief that you would stand up for no matter what?" },
  { id: 11, question: "When you are at your best what does that look like?" },
  { id: 12, question: "What would make you feel that you have lived a fulfilling life?" }
];

export default questions;
