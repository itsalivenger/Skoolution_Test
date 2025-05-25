// --- Client UI: AddCompetence.jsx ---
"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/app/utils/request";

export default function AddCompetence() {
  const [chapitres, setChapitres] = useState([]);
  const [selectedChapitreId, setSelectedChapitreId] = useState("");
  const [competenceTitle, setCompetenceTitle] = useState("");

  useEffect(() => {
    async function fetchChapitres() {
      const res = await apiRequest({ url: "/api/add_competence/get_chapters" });
      setChapitres(res.data?.chapitres || []);
    }
    fetchChapitres();
  }, []);

  const handleSubmit = async () => {
    if (!selectedChapitreId || !competenceTitle.trim()) return alert("Please fill all fields");

    const res = await apiRequest({
      url: "/api/add_competence",
      method: "POST",
      body: { chapitreId: parseInt(selectedChapitreId), title: competenceTitle },
    });

    if (res.success) {
      alert("Competence added");
      setCompetenceTitle("");
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Competence to Chapter</h2>

      <select
        className="w-full p-2 mb-4 border rounded"
        value={selectedChapitreId}
        onChange={(e) => setSelectedChapitreId(e.target.value)}
      >
        <option value="" disabled>
          -- Select Chapter --
        </option>
        {chapitres.map((c) => (
          <option key={c.id} value={c.id}>
            {c.title}
          </option>
        ))}
      </select>

      <input
        className="w-full p-2 border rounded mb-4"
        type="text"
        placeholder="Competence Title"
        value={competenceTitle}
        onChange={(e) => setCompetenceTitle(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Competence
      </button>
    </div>
  );
}
