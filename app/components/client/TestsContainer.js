"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Breadcrumb from "./BreadCrumb";
import { getFromStorage, saveInStorage, saveToStorage } from "@/app/utils/storage";

export default function TestSelector() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [tests] = useState(getFromStorage("tests") || []);
  const pathname = usePathname();
  const router = useRouter();

  const handleStartTest = () => {
    if (selectedTest) {
      console.log(selectedTest);
      saveInStorage("currentTest", selectedTest);
      router.push(`${pathname}/test1`); // Navigate to /test1
    }
  };

  return (
    <div className="relative">
      <Breadcrumb />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {tests.length > 0 &&
          tests.map((test, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer"
              onClick={() => setSelectedTest(test)}
            >
              <h2 className="text-xl font-bold text-blue-600">{test.title}</h2>
              <p className="text-sm text-gray-500">{test.description}</p>
            </div>
          ))}
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
            <h2 className="text-2xl font-bold mb-2 text-blue-700">
              {selectedTest.title}
            </h2>
            <p className="mb-4">{selectedTest.description}</p>
            <p className="mb-4 text-sm text-gray-600">
              Nombre de questions : {selectedTest.numQuestions || 10} <br />
              Durée estimée : {selectedTest.duration || "15 minutes"}
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
