"use client";
export default function Scoreboard({ score }) {
  return (
    <div className="mt-6 text-white bg-green-500 px-4 py-2 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">Total Points Earned: {score}</h2>
    </div>
  );
}
