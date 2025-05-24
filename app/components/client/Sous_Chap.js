"use client";
import { getFromStorage, removeFromStorage, saveInStorage } from "@/app/utils/storage";
import Link from "next/link";
import { useEffect, useState } from "react";

function Sous_Chap() {
    const [competences, setCompetences] = useState([]);
    useEffect(() => {
        const chapter = getFromStorage('current_chapter').competences ? getFromStorage('current_chapter').competences : [];
        removeFromStorage('current_competence')
        setCompetences(chapter);
    }, [])

    const setCurrentCompetence = (item) => {
        saveInStorage('current_competence_id', item.id)
        saveInStorage('tests', item.sous_chapitres)
    }


    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {competences.map((item, index) => (
                <Link
                    key={index}
                    href={`/subjects/math/lessons/${item.title}/tests`}
                    className="group block bg-white rounded-2xl shadow-md p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                    onClick={() => setCurrentCompetence(item)}
                >
                    <h2 className="text-lg font-semibold text-blue-600 group-hover:text-blue-700">
                        {item.title}
                    </h2>
                </Link>
            ))}
        </div>
    );
}

export default Sous_Chap;
