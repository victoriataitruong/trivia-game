"use client";
import { useEffect, useState } from "react";

export default function Trivia({ questionIndex, setQuestionIndex, onCorrectAnswer }) {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState(null);

  // Helper function to decode HTML entities
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      const res = await fetch(`https://opentdb.com/api.php?amount=10&type=multiple`);
      const data = await res.json();
      setQuestions(data.results);
      setQuestion(data.results[0]); // Start with the first question
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0) {
      if (questionIndex >= questions.length) {
        setQuestionIndex(0); // Reset to start after finishing all questions
      } else {
        setQuestion(questions[questionIndex]);
      }
    }
  }, [questionIndex, questions]);

  if (!question) return <p>Loading question...</p>;

  const answers = [
    ...question.incorrect_answers,
    question.correct_answer,
  ].sort(() => Math.random() - 0.5);

  const handleAnswerClick = (answer) => {
    if (answer === question.correct_answer) {
      onCorrectAnswer(); // Increase score if correct
    }
    setQuestionIndex((prevIndex) => prevIndex + 1); // Go to next question
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">{decodeHTML(question.question)}</h2>
      <ul className="space-y-2">
        {answers.map((answer, idx) => (
          <li
            key={idx}
            className="bg-blue-100 p-2 rounded-lg hover:bg-blue-200 cursor-pointer"
            onClick={() => handleAnswerClick(answer)}
          >
            {decodeHTML(answer)}
          </li>
        ))}
      </ul>
    </div>
  );
}
