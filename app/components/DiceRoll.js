"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function DiceRoll({ onRoll }) {
  const [rolling, setRolling] = useState(false);
  const [value, setValue] = useState(1);

  const rollDice = () => {
    setRolling(true);
    const randomValue = Math.floor(Math.random() * 6) + 1;

    setTimeout(() => {
      setValue(randomValue);
      setRolling(false);
      onRoll(randomValue);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={{ rotate: rolling ? 360 : 0 }}
        transition={{ duration: 1 }}
        className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center text-4xl font-bold rounded-xl shadow-lg"
      >
        {value}
      </motion.div>
      <button
        onClick={rollDice}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Roll Dice
      </button>
    </div>
  );
}
