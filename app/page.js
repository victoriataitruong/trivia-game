"use client";
import { useState, useEffect } from "react";
import DiceRoll from "./components/DiceRoll";
import Trivia from "./components/Trivia";
import Scoreboard from "./components/Scoreboard";
import CatContent from "./components/CatContent"; // ✅ New CatContent Component

export default function Home() {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [diceResult, setDiceResult] = useState(null);
  const [showCatContent, setShowCatContent] = useState(false); // ✅ Track reward state

  const handleCorrectAnswer = () => {
    const newScore = score + 1;
    setScore(newScore);

    if (newScore % 10 === 0) {
      setShowCatContent(true); // ✅ Show cat content after every 10 points
    }
  };

  // Auto-roll dice whenever question changes
  useEffect(() => {
    const rollDice = Math.floor(Math.random() * 6) + 1;
    setDiceResult(rollDice);
  }, [questionIndex]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
      <h1 className="text-4xl font-bold text-white mb-6">Victoria's Cat Image Reward Program 🐱</h1>
      <h3 className="text-white mb-6">You get a cat image reward for every 10 points you earn</h3>
      <Scoreboard score={score} />
      <p className="text-white mb-4">Points you could earn for this question: {diceResult}</p>

      <Trivia
        questionIndex={questionIndex}
        setQuestionIndex={setQuestionIndex}
        onCorrectAnswer={handleCorrectAnswer}
      />

      {showCatContent && (
        <CatContent onClose={() => setShowCatContent(false)} /> // ✅ Show cat content as reward
      )}
    </main>
  );
}
