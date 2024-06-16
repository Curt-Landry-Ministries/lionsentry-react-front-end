"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; 
import { submitAnswerToServer, generateWhyStatementFromAnswers } from '../api/app';
import { Answer } from '../data/answers';
import { Question } from '../data/questions';

const FormComponent: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [whyStatement, setWhyStatement] = useState<string | null>(null);

  const router = useRouter(); // Initialize useRouter for navigation

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswers({
      ...answers,
      [questions[currentQuestionIndex].id]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    // Collect all question and answer pairs into an array of objects
    const questionAnswerPairs = questions.map((question, index) => ({
      question: question.question,
      answer: answers[question.id] || '',
      questionIndex: index,
    }));

    console.log('Submitting the following data:', questionAnswerPairs);

    // Submit each answer to the server individually
    try {
      for (const { answer, question, questionIndex } of questionAnswerPairs) {
        let submitAnswerToServerResponse = await submitAnswerToServer(answer, question, questionIndex);
      }
    } catch (error) {
      console.error('Error submitting answers to server:', error);
    }

    // Generate the Why statement after submitting all answers
    try {
      const generatedWhyStatement = await generateWhyStatementFromAnswers(
        questions.map(q => ({ title: q.question })), // Send only the question titles
        questionAnswerPairs.map(qa => qa.answer) // Send the corresponding answers
      );
      setWhyStatement(generatedWhyStatement);
      console.log('Generated Why Statement:', generatedWhyStatement);

      // Store the Why statement in local storage
      localStorage.setItem('whyStatement', generatedWhyStatement);

      // Redirect to the dashboard page
      router.push('/dashboard');
    } catch (error) {
      console.error('Error generating Why Statement:', error);
    }

    // Clear the answers and reset the current question index after submission
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  const handleClear = () => {
    // Clear the answers and reset the current question index
    setAnswers({});
    setCurrentQuestionIndex(0);
  };

  // Variants for animation
  const variants = {
    enterFromLeft: { opacity: 0, x: -20 },
    center: { opacity: 1, x: 0 },
    enterFromRight: { opacity: 0, x: 20 },
  };

  // Determine initial and exit animation states based on current question index
  const initialAnimation = currentQuestionIndex % 2 === 0 ? 'enterFromLeft' : 'enterFromRight';
  const exitAnimation = currentQuestionIndex % 2 === 0 ? 'enterFromRight' : 'enterFromLeft';

  return (
    <div className="space-y-4 md:space-y-6">
      <motion.div
        key={currentQuestionIndex}
        initial={initialAnimation}
        animate="center"
        exit={exitAnimation}
        variants={variants}
        transition={{ duration: 2.0 }}
      >
        <div className="max-w-md w-full">
          <label className="block text-lg mb-4">{questions[currentQuestionIndex].question}</label>
          <textarea
            value={answers[questions[currentQuestionIndex].id] || ''}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full h-24 resize-none text-black"
            placeholder="Type your answer here..."
          />
          <div className="flex justify-between items-center">
            <button
              onClick={handleNext}
              className="px-6 py-2 font-semibold text-white bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 hover:from-pink-500 hover:via-purple-500 hover:to-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Submit'}
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-500 text-white font-semibold px-6 py-2 rounded-md"
            >
             {currentQuestionIndex < questions.length - 1 ? 'Reset' : 'Clear'} 
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FormComponent;
