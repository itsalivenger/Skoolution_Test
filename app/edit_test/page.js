"use client";

import { useEffect, useState } from "react";
import QuestionEditor from "@/app/components/client/QuestionEditor"; // your editor component
import { apiRequest } from "../utils/request";

export default function QuestionsManager() {
    const [questions, setQuestions] = useState([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);

    // Flat list of questions with metadata to identify them for update
    // e.g., { questionId, chapitreId, competenceId, sousChapitreId, questionData }

    useEffect(() => {
        async function fetchQuestions() {
            try {
                // Replace with your real API endpoint that returns all questions with their IDs and parent IDs
                const res = await apiRequest({ url: "/api/get_all_questions" })
                console.log(res);
                setQuestions(res.data?.questions || []);
            } catch (e) {
                console.error("Failed to load questions", e);
            }
        }
        fetchQuestions();
    }, []);

    const handle_selected = (id) => {
        setSelectedQuestionId(id);
        if (id) {
            const found = questions.find((q) => q.questionId === id);
            setSelectedQuestion(found);
        } else {
            setSelectedQuestion(null);
        }
    };


    const handleSave = async (updatedQuestion) => {
        try {
            // Call your update API with updatedQuestion and its identifiers
            const res = await apiRequest({
                url: "/api/questions/edit",
                method: 'POST',
                body: updatedQuestion
            })
            console.log(res);

            if (res.success) {
                alert("Question updated successfully");
                // Update local state
                setQuestions((prev) =>
                    prev.map((q) =>
                        q.questionId === updatedQuestion.questionId ? updatedQuestion : q
                    )
                );
            } else {
                alert("Error updating question: " + res.error);
            }
        } catch (error) {
            alert("Update failed: " + error.message);
        }
    };

    const handleDelete = async () => {
        if (!selectedQuestionId) return;

        if (!confirm("Êtes-vous sûr de vouloir supprimer cette question ?")) return;

        try {
            const res = await apiRequest({
                url: "/api/questions/delete",
                method: "POST",
                body: { questionId: selectedQuestionId },
            });

            if (res.success) {
                alert("Question supprimée avec succès");
                setQuestions(prev => prev.filter(q => q.questionId !== selectedQuestionId));
                setSelectedQuestionId(null);
                setSelectedQuestion(null);
            } else {
                alert("Erreur lors de la suppression : " + res.error);
            }
        } catch (error) {
            alert("Échec de la suppression : " + error.message);
        }
    };


    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Select a Question to Edit</h2>

            <select
                className="w-full p-2 mb-6 border rounded"
                value={selectedQuestionId || ""}
                onChange={(e) => handle_selected(e.target.value)}
            >
                <option value="" disabled>
                    -- Select a question --
                </option>
                {questions.map(({ questionId, question, chapitreTitle, competenceTitle, sousChapitreTitle }) => (
                    <option key={questionId} value={questionId}>

                        {`${chapitreTitle} > ${competenceTitle} > ${sousChapitreTitle} : ${question.slice(0, 40)}...`}
                    </option>
                ))}
            </select>

            {selectedQuestion && (
                <QuestionEditor
                    key={selectedQuestion.questionId}
                    questionData={selectedQuestion}
                    onSave={handleSave}
                    handleDelete={handleDelete}
                />
            )}
        </div>
    );
}
