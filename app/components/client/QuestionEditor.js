"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function QuestionEditor({ questionData, onSave, handleDelete }) {
  const [question, setQuestion] = useState(questionData?.question || "");
  const [choices, setChoices] = useState(questionData?.choices || ["", "", "", ""]);
  // Initialize correctChoice as index (number), default to 0 if not set or invalid
  const initialCorrectIndex = typeof questionData?.correct_choice === 'number' 
    ? questionData.correct_choice 
    : 0;
  const [correctChoice, setCorrectChoice] = useState(initialCorrectIndex);

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleSave = () => {
    console.log(correctChoice);
    onSave({
      ...questionData,
      question,
      choices,
      // Save correct_choice as index (number)
      correct_choice: Number(correctChoice),
    });
  };

  return (
    <div className="p-4 border rounded-lg max-w-xl mx-auto">
      <label className="block mb-2 font-semibold">Question Text (Edit):</label>
      <textarea
        className="w-full p-2 border rounded mb-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        rows={4}
      />

      <label className="block mb-2 font-semibold">Rendered Question (LaTeX):</label>
      <div className="p-4 mb-6 border rounded bg-gray-50">
        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
          {question}
        </ReactMarkdown>
      </div>

      <label className="block mb-2 font-semibold">Choices:</label>
      {choices.map((choice, idx) => (
        <input
          key={idx}
          type="text"
          className="w-full p-2 border rounded mb-2"
          value={choice}
          onChange={(e) => handleChoiceChange(idx, e.target.value)}
        />
      ))}

      <label className="block mt-4 mb-2 font-semibold">Correct Choice:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={correctChoice}
        onChange={(e) => setCorrectChoice(Number(e.target.value))}
      >
        {choices.map((choice, idx) => (
          <option key={idx} value={idx}>
            {choice || `Choice ${idx + 1}`}
          </option>
        ))}
      </select>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Question
      </button>

      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Supprimer Question
      </button>
    </div>
  );
}
