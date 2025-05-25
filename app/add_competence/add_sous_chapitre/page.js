"use client";

import { apiRequest } from "@/app/utils/request";
import { useEffect, useState } from "react";

export default function AddSousChapitre() {
  const [chapitres, setChapitres] = useState([]);
  const [selectedChapitreId, setSelectedChapitreId] = useState("");
  const [competences, setCompetences] = useState([]);
  const [selectedCompetenceId, setSelectedCompetenceId] = useState("");
  const [sousChapitreTitle, setSousChapitreTitle] = useState("");

  useEffect(() => {
    async function fetchChapitres() {
      try {
        const res = await apiRequest({ url: "/api/add_competence/get_chapters" });
        console.log(res);
        setChapitres(res.data.chapitres || []);
      } catch (e) {
        console.error("Failed to load chapitres", e);
      }
    }
    fetchChapitres();
  }, []);

  // Load competences when a chapitre is selected
  useEffect(() => {
    if (!selectedChapitreId) {
      setCompetences([]);
      setSelectedCompetenceId("");
      return;
    }
    console.log(chapitres);

    const chapitre = chapitres.find((c) => c.id == selectedChapitreId);
    if (chapitre && chapitre.competences) {
      setCompetences(chapitre.competences);
    } else {
      setCompetences([]);
    }
    setSelectedCompetenceId("");
  }, [selectedChapitreId, chapitres]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChapitreId || !selectedCompetenceId || !sousChapitreTitle.trim()) {
      alert("Please select chapitre, competence and enter sous-chapitre title.");
      return;
    }

    try {
      const body = {
        chapitreId: selectedChapitreId,
        competenceId: selectedCompetenceId,
        sousChapitreTitle: sousChapitreTitle.trim(),
      };

      const res = await apiRequest({
        url: "/api/add_sous_chapitre",
        method: "POST",
        body,
      });

      if (res.success) {
        alert("Sous-chapitre added successfully.");
        setSousChapitreTitle("");
      } else {
        alert("Error: " + (res.error || "Unknown error"));
      }
    } catch (error) {
      alert("Request failed: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Sous-Chapitre</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-semibold">Select Chapitre</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedChapitreId}
          onChange={(e) => setSelectedChapitreId(e.target.value)}
        >
          <option value="">-- Select Chapitre --</option>
          {chapitres.map((chap) => (
            <option key={chap.id} value={chap.id}>
              {chap.title}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Select Competence</label>
        <select
          className="w-full p-2 border rounded mb-4"
          value={selectedCompetenceId}
          onChange={(e) => setSelectedCompetenceId(e.target.value)}
          disabled={!competences.length}
        >
          <option value="">-- Select Competence --</option>
          {competences.map((comp) => (
            <option key={comp.id} value={comp.id}>
              {comp.title}
            </option>
          ))}
        </select>

        <label className="block mb-2 font-semibold">Sous-Chapitre Title</label>
        <input
          type="text"
          className="w-full p-2 border rounded mb-4"
          value={sousChapitreTitle}
          onChange={(e) => setSousChapitreTitle(e.target.value)}
          placeholder="Enter sous-chapitre title"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Sous-Chapitre
        </button>
      </form>
    </div>
  );
}
