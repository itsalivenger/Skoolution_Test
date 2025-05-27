"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumb from "./BreadCrumb";
import { getFromStorage, saveInStorage } from "@/app/utils/storage";

export default function TestSelector() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [tests, setTests] = useState([]);
  const [current_compentence, setCurrentCompetence] = useState(null);
  const [user, setUser] = useState();
  const pathname = usePathname();
  const router = useRouter();
  const THETA_THRESHOLD = 1.5;

  useEffect(() => {
    const chapter = getFromStorage("current_chapter");
    const current_user = getFromStorage("user");
    const arr = [];
    chapter.competences.forEach((competence) => {
      competence.sous_chapitres.forEach((sous_chapitre) => {
        arr.push({ sous_chapitre, current_compentence: competence });
      });
    });

    setTests(arr);
    setUser(current_user);
  }, []);

  const handleStartTest = () => {
    if (selectedTest) {
      saveInStorage("currentTest", selectedTest.sous_chapitre);
      saveInStorage("current_competence_id", current_compentence.id);
      router.push(`${pathname}/test1`);
    }
  };

  const getColor = (theta) => {
    if (theta >= THETA_THRESHOLD) return "bg-green-500";
    if (theta >= 0) return "bg-orange-400";
    return "bg-red-500";
  };

  const thetaToScore = (theta) => {
    const clamped = Math.min(Math.max((theta + 3) / (THETA_THRESHOLD + 3), 0), 1);
    return (clamped * 20).toFixed(1);
  };

  return (
    <div className="relative">
      <Breadcrumb />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tests.map((test, idx) => {
          const scId = test.sous_chapitre.id;
          const theta = user?.sous_chapitre_thetas?.[scId]?.theta ?? -3;
          const progress = Math.min(Math.max((theta + 3) / (THETA_THRESHOLD + 3), 0), 1) * 100;
          const score = thetaToScore(theta);

          return (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer relative"
              onClick={() => {
                setSelectedTest(test);
                setCurrentCompetence(test.current_compentence);
              }}
            >
              <h2 className="text-xl font-bold text-blue-600">{test.sous_chapitre.title}</h2>
              <p className="text-sm text-gray-500 mb-2">{test.sous_chapitre.description}</p>

              <div className="h-3 w-full bg-gray-200 rounded-full mb-1 relative">
                <div
                  className={`h-3 rounded-full ${getColor(theta)}`}
                  style={{ width: `${progress}%` }}
                ></div>
                {theta >= THETA_THRESHOLD && (
                  <div className="absolute right-1 -top-5 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                    ✔ Validé
                  </div>
                )}

              </div>

              <p className="text-xs mt-1">
                Compétence: {test.current_compentence.title} – Note: {score}/20{" "}
              </p>
            </div>
          );
        })}
      </div>

      {selectedTest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-11/12 max-w-md relative">
            <button
              onClick={() => setSelectedTest(null)}
              className="absolute top-2 right-3 text-gray-500 text-xl"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-2 text-blue-700">{selectedTest.sous_chapitre.title}</h2>
            <p className="mb-4">{selectedTest.sous_chapitre.description}</p>
            <p className="mb-4 text-sm text-gray-600">
              Nombre de questions : {selectedTest.sous_chapitre.length || 20}
            </p>
            <button
              onClick={handleStartTest}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded cursor-pointer"
            >
              Commencer le test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
