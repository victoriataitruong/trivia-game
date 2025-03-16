"use client";
import { useEffect, useState } from "react";

export default function CatContent({ onClose }) {
  const [catContent, setCatContent] = useState("");

  useEffect(() => {
    const fetchCatContent = async () => {
      const res = await fetch("https://api.thecatapi.com/v1/images/search?mime_types=video");
      const data = await res.json();
      if (data.length > 0) {
        setCatContent(data[0].url);
      } else {
        const imgRes = await fetch("https://api.thecatapi.com/v1/images/search");
        const imgData = await imgRes.json();
        setCatContent(imgData[0].url);
      }
    };

    fetchCatContent();
  }, []);

  if (!catContent) return <p>Loading your cat reward...</p>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 Cat Reward Unlocked! 🎉</h2>
        {catContent.includes(".mp4") ? (
          <video controls className="rounded-lg shadow-lg w-full max-w-md">
            <source src={catContent} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={catContent}
            alt="Adorable Cat"
            className="rounded-lg shadow-lg w-full max-w-md"
          />
        )}
        <button
          className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-lg"
          onClick={onClose}
        >
          Continue Game
        </button>
      </div>
    </div>
  );
}
