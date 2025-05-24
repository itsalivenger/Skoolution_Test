"use client";

import { useState, useEffect, useRef } from "react";
import { apiRequest } from "../utils/request";


export default function AddQuestionForm() {
  const [chapitres, setChapitres] = useState([]);
  const [selectedChapitre, setSelectedChapitre] = useState(null);
  const [selectedCompetence, setSelectedCompetence] = useState(null);
  const [selectedSousChapitre, setSelectedSousChapitre] = useState(null);
  const [questionData, setQuestionData] = useState({
    question: "",
    choices: ["", "", "", ""],
    correct_choice: 0,
    param_a: "1",
    param_b: ""
  });
  const [bulkQuestions, setBulkQuestions] = useState([]);
  const fileRef = useRef(null);

  useEffect(() => {
    let cancelled = false;                    // prevents state‑set after unmount
    const loadChapitres = async () => {
      try {
        const { success, data, error } = await apiRequest({ url: "/api/chapitres" });

        if (!cancelled) {
          if (success && Array.isArray(data)) {
            setChapitres(data);
          } else {
            console.error("API error:", error || "unexpected shape");
          }
        }
      } catch (err) {
        if (!cancelled) console.error("Fetch failed:", err);
      }
    };

    loadChapitres();
    return () => {
      cancelled = true;                       // cleanup
    };
  }, []);



  // helper: capitalize first letter and trim
  const cap = (str) =>
    str.trim().charAt(0).toUpperCase() + str.trim().slice(1);

  const handleSubmit = async () => {
    // ── basic validation ─────────────────────────────────────────────
    if (!selectedChapitre || !selectedCompetence || !selectedSousChapitre) {
      alert("Choisissez chapitre, compétence et sous‑chapitre.");
      return;
    }
    if (!questionData.question.trim()) {
      alert("La question ne peut pas être vide.");
      return;
    }
    if (questionData.choices.some((c) => !c.trim())) {
      alert("Tous les choix doivent être remplis.");
      return;
    }

    // ── build the payload with capitalised strings ───────────────────
    const payload = {
      chapitre_id: selectedChapitre.id,
      competence_id: selectedCompetence.id,
      sous_chapitre_id: selectedSousChapitre.id,
      question: cap(questionData.question),
      choices: questionData.choices.map(cap),
      correct_choice: questionData.correct_choice,
      param_a: parseFloat(questionData.param_a) || 0,
      param_b: parseFloat(questionData.param_b) || 0
    };

    // ── send to backend ──────────────────────────────────────────────
    const res = await apiRequest({
      url: "/api/questions/add",
      method: "POST",
      body: payload
    });

    if (res.success) {
      alert("Question enregistrée !");
      setQuestionData({
        question: "",
        choices: ["", "", "", ""],
        correct_choice: 0,
        param_a: "",
        param_b: ""
      });
      setSelectedCompetence(null);
      setSelectedSousChapitre(null);
      setTimeout(() => window.location.reload(), 3000)
    } else {
      alert("Erreur: " + (res.error || res.message));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) throw new Error("JSON must be an array");
      setBulkQuestions(parsed);
      alert(`${parsed.length} questions chargées !`);
    } catch (err) {
      alert("Fichier invalide : " + err.message);
    } finally {
      e.target.value = ""; // reset file input
    }
  };

  const pushBulkToDB = async () => {
    if (!bulkQuestions.length) return;

    /* ---- sanity‑check IDs chosen in the UI ---- */
    if (!selectedChapitre || !selectedCompetence || !selectedSousChapitre) {
      alert("Choisissez chapitre, compétence et sous‑chapitre avant l’import.");
      return;
    }

    /* ---- build payload array ---- */
    const payload = bulkQuestions.map((q) => ({
      chapitre_id: selectedChapitre.id,
      competence_id: selectedCompetence.id,
      sous_chapitre_id: selectedSousChapitre.id,
      question: cap(q.question),
      choices: q.choices.map(cap),
      correct_choice: q.response ?? q.correct_choice ?? 0,
      param_a: 1,
      param_b: parseFloat(q.b ?? 0)
    }));
    console.log(payload);

    /* ---- send to backend ---- */
    const res = await apiRequest({
      url: "/api/questions/bulk-add",
      method: "POST",
      body: { questions: payload }          // backend will iterate
    });

    if (res.success) {
      alert(`${payload.length} questions ajoutées !`);
      setBulkQuestions([]);
      // optional refresh
      // setTimeout(() => window.location.reload(), 3000)
    } else {
      alert("Erreur : " + (res.error || res.message));
    }
  };





  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Ajouter une question</h1>

      <select
        className="w-full p-2 border rounded"
        onChange={(e) => {
          // const ch = chapitres.find((c) => c.id === parseInt(e.target.value));
          setSelectedChapitre(chapitres[e.target.value]);
          setSelectedCompetence(null);
          setSelectedSousChapitre(null);
        }}
      >
        <option value="">Choisir un chapitre</option>
        {chapitres.map((ch, index) => (
          <option key={ch.id} value={index}>{ch.title}</option>
        ))}
      </select>

      {selectedChapitre && (
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            const comp = selectedChapitre.competences.find((c) => c.id === parseInt(e.target.value));
            setSelectedCompetence(comp);
            setSelectedSousChapitre(null);
          }}
        >
          <option value="">Choisir une compétence</option>
          {selectedChapitre.competences.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
      )}

      {selectedCompetence && (
        <select
          className="w-full p-2 border rounded"
          onChange={(e) => {
            const ss = selectedCompetence.sous_chapitres.find((s) => s.id === parseInt(e.target.value));
            setSelectedSousChapitre(ss);
          }}
        >
          <option value="">Choisir un sous-chapitre</option>
          {selectedCompetence.sous_chapitres.map((s) => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      )}

      {selectedSousChapitre && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Question"
            className="w-full p-2 border rounded"
            value={questionData.question}
            onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
          />

          {questionData.choices.map((choice, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Choix ${index + 1}`}
              className="w-full p-2 border rounded"
              value={choice}
              onChange={(e) => {
                const newChoices = [...questionData.choices];
                newChoices[index] = e.target.value;
                setQuestionData({ ...questionData, choices: newChoices });
              }}
            />
          ))}

          <select
            className="w-full p-2 border rounded"
            value={questionData.correct_choice}
            onChange={(e) => setQuestionData({ ...questionData, correct_choice: parseInt(e.target.value) })}
          >
            <option value={0}>Bonne réponse: Choix A</option>
            <option value={1}>Bonne réponse: Choix B</option>
            <option value={2}>Bonne réponse: Choix C</option>
            <option value={3}>Bonne réponse: Choix D</option>
          </select>

          <input
            type="text"
            placeholder="Param A"
            className="w-full p-2 border rounded"
            value={questionData.param_a}
            onChange={(e) => setQuestionData({ ...questionData, param_a: e.target.value })}
          />
          <input
            type="text"
            placeholder="Param B"
            className="w-full p-2 border rounded"
            value={questionData.param_b}
            onChange={(e) => setQuestionData({ ...questionData, param_b: e.target.value })}
          />

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ajouter la question
          </button>






          <div className="mb-8 border p-4 rounded-md bg-neutral-50">
            <h2 className="font-semibold mb-3">Import massif de questions (.json)</h2>

            <input
              ref={fileRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="mb-3"
            />

            {bulkQuestions.length > 0 && (
              <div className="flex items-center gap-4">
                <p>{bulkQuestions.length} questions prêtes à être importées.</p>
                <button
                  onClick={pushBulkToDB}
                  className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
                >
                  Envoyer vers la base
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
