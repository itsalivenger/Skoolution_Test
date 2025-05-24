"use client";

import { useEffect, useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { apiRequest } from "@/app/utils/request";

/* ───────────────────── component ──────────────────────── */
export default function QuestionAdmin() {
    /* selections */
    const [chapitres, setChapitres] = useState([]);
    const [chapitreId, setChapitreId] = useState("");
    const [competenceId, setCompetenceId] = useState("");
    const [sousChapitreId, setSousChapitreId] = useState("");

    /* questions */
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /* ─ fetch all chapitres at mount ─ */
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await apiRequest({ url: "/api/chapitres" });
                if (!cancelled) setChapitres(res.data.map((e) => { return { title: e.title, id: e.id } }));   // your api already returns plain array
            } catch (e) {
                console.error(e);
            }
        })();
        return () => { cancelled = true; };
    }, []);

    /* ─ fetch questions after every full selection ─ */
    useEffect(() => {
        if (chapitreId === "" || competenceId === "" || sousChapitreId === "") {
            setData([]);
            return;
        }
        let cancelled = false;
        setLoading(true);
        setError(null);

        (async () => {
            try {
                const res = await apiRequest({
                    url: `/api/questions?chapitreId=${chapitreId}&competenceId=${competenceId}&sousChapitreId=${sousChapitreId}`,
                });
                if (!cancelled) setData(res.data || []);
            } catch (e) {
                if (!cancelled) setError(e.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, [chapitreId, competenceId, sousChapitreId]);

    /* ─ delete handler ─ */
    const deleteQuestion = async (id) => {
        if (!confirm("Supprimer cette question ?")) return;
        const prev = data;
        setData(q => q.filter(item => item._id !== id));

        const res = await apiRequest({ url: `/api/questions/delete?id=${id}`, method: "DELETE" });
        if (!res.success) {
            alert("Erreur de suppression");
            setData(prev);
        }
    };

    /* ─ helpers for child lists ─ */
    const competences =
        chapitres.find(c => c.id === chapitreId)?.competences || [];
    const sousChapitres =
        competences.find(c => c.id === competenceId)?.sous_chapitres || [];

    /* ───────────────────── UI ───────────────────── */
    return (
        <div className="space-y-8">
            {/* selectors */}
            <div className="flex flex-wrap gap-4">
                {/* Chapitre */}
                <select
                    className="border p-2 rounded"
                    value={chapitreId}
                    onChange={e => {
                        setChapitreId(e.target.value === "" ? "" : Number(e.target.value));
                        setCompetenceId("");
                        setSousChapitreId("");
                    }}
                >
                    <option value="">Choisir un chapitre</option>
                    {chapitres.map(ch => (
                        <option key={ch.id} value={ch.id}>{ch.title}</option>
                    ))}
                </select>

                {/* Compétence */}
                <select
                    className="border p-2 rounded"
                    value={competenceId}
                    onChange={e => {
                        setCompetenceId(e.target.value === "" ? "" : Number(e.target.value));
                        setSousChapitreId("");
                    }}
                    disabled={chapitreId === ""}
                >
                    <option value="">Choisir une compétence</option>
                    {competences.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                </select>

                {/* Sous‑chapitre */}
                <select
                    className="border p-2 rounded"
                    value={sousChapitreId}
                    onChange={e => setSousChapitreId(e.target.value === "" ? "" : Number(e.target.value))}
                    disabled={competenceId === ""}
                >
                    <option value="">Choisir un sous‑chapitre</option>
                    {sousChapitres.map(sc => (
                        <option key={sc.id} value={sc.id}>{sc.titre}</option>
                    ))}
                </select>
            </div>

            {/* questions list */}
            {loading && (
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" /> Chargement…
                </div>
            )}

            {error && <p className="text-red-600">Erreur: {error}</p>}

            {!loading && !error && data.length === 0 && (
                <p>Aucune question pour cette sélection.</p>
            )}

            <div className="space-y-6">
                {data.map(q => (
                    <div key={q._id} className="border rounded-md p-4 shadow-sm bg-white relative">
                        <button
                            onClick={() => deleteQuestion(q._id)}
                            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                            aria-label="Supprimer"
                        >
                            <Trash2 size={18} />
                        </button>

                        <p className="font-medium mb-3">
                            {q.question}
                            <span className="ml-2 text-xs text-neutral-500">(b&nbsp;=&nbsp;{q.b})</span>
                        </p>

                        <ul className="space-y-1">
                            {q.choices.map((choice, i) => (
                                <li
                                    key={i}
                                    className={i === q.correct_choice ? "font-semibold text-blue-700" : ""}
                                >
                                    <span className="mr-1 font-bold">{String.fromCharCode(65 + i)}.</span>
                                    {choice}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
