"use client";
import { Dot, X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { getFromStorage } from "@/app/utils/storage";
import { selectNextItem, updateTheta, finalize, update_b, update_a } from "@/app/utils/helper_functions";
import { useRouter } from "next/navigation";
import PopupModal from "../modal_box";

export default function Test1() {
	/* ────────────── state ────────────── */
	const [loading, setLoading] = useState(true);
	const [fetchError, setFetchError] = useState(null);

	const [pool, setPool] = useState([]);   // full question bank
	const [currentQ, setCurrentQ] = useState(null); // question shown now
	const [asked, setAsked] = useState([]);   // order of questions already asked

	const [selectedOption, setSelectedOption] = useState(null);
	const [answers, setAnswers] = useState([]);   // user answers in asked‑order
	const [validated, setValidated] = useState(false);

	const [theta, setTheta] = useState(0);         // θ courant
	const [itemsUsed, setItemsUsed] = useState([]); // objets déjà posés (pour updateΘ)

	const [currentChapter, setcurrentChapter] = useState();
	const [showPopup, setShowPopup] = useState(false);

	const router = useRouter();

	const MAX_QUESTIONS = 10;

	useEffect(() => {
		try {
			const currentTest = getFromStorage("currentTest");
			const chapter = getFromStorage('current_chapter');

			if (!currentTest?.questions?.length)
				throw new Error("Aucune question trouvée dans le test.");

			if (chapter) {
				setcurrentChapter(chapter);
			}
			setPool(currentTest.questions);

			const first = pickFirstQuestion(currentTest.questions);
			setCurrentQ(first);
			setAsked([first]);
		} catch (err) {
			setFetchError(err.message || "Erreur inconnue.");
		} finally {
			setLoading(false);
		}
	}, []);

	/* ────────────── FIRST-QUESTION STRATEGY ────────────── */
	function pickFirstQuestion(pool) {
		if (!Array.isArray(pool) || pool.length === 0) {
			throw new Error("Question pool is empty.");
		}

		return pool.reduce((best, q) =>
			Math.abs(q.param_b) < Math.abs(best.param_b) ? q : best
		);
	}


	const next = () => {
		const isCorrect = selectedOption === currentQ.correct_choice ? 1 : 0;

		const newResponses = [...answers, isCorrect];
		const newItems = [
			...itemsUsed,
			{ a: currentQ.param_a ?? 1, b: currentQ.param_b }
		];


		// update theta et b
		const newTheta = updateTheta(theta, newResponses, newItems);
		const user_id = getFromStorage('user_id');
		update_b({ currentQuest: currentQ, theta, r: isCorrect, question_num: asked.length });
		update_a({ currentQuest: currentQ, theta, r: isCorrect, user_id });

		// 3. Mettre à jour les états React
		setAnswers(newResponses);
		setItemsUsed(newItems);
		setTheta(newTheta);
		setValidated(false);
		setSelectedOption(null);

		// 4. Vérifier fin de test
		if (asked.length >= MAX_QUESTIONS || asked.length >= pool.length) {
			console.log("Finished – θ final:", newTheta);
			const user_id = getFromStorage('user_id')
			const competence_id = getFromStorage('current_competence_id')
			finalize({ user_id, competence_id, theta, setShowPopup })
			return;
		}

		const nextQ = selectNextItem({
			theta: newTheta,
			pool,
			askedSet: [...asked, currentQ],
		});



		if (!nextQ) {
			console.warn("No more questions available");
			return;
		}

		setCurrentQ(nextQ);
		setAsked((a) => [...a, nextQ]);
		console.log(currentQ, selectedOption, 'dedrnoo');
	};


	const showCorrectAnswer = () => {
		if (selectedOption === null) return;
		// update_params();
		setValidated(true);
	};

	const handle_close_popup = () => {
		setShowPopup(false);
		router.push('/subjects/math/lessons');
	}

	if (loading) {
		return (
			<div className="h-dvh flex items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
			</div>
		);
	}

	if (fetchError) {
		return (
			<div className="h-dvh flex flex-col items-center justify-center text-red-600">
				<p className="mb-4">{fetchError}</p>
				<a href="/subjects/math/lessons" className="underline text-blue-600">
					Retour
				</a>
			</div>
		);
	}

	return (
		<section className="relative w-screen min-h-dvh px-5 py-5 flex flex-col justify-center items-center gap-6 overflow-auto bg-neutral-50">
			{/* Close button */}
			<a
				href="/subjects/math/lessons"
				className="absolute top-5 right-5 flex justify-center items-center p-3 bg-neutral-200 hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-full"
			>
				<X />
			</a>

			{/* Title + steps */}
			<div className="flex flex-col sm:flex-row gap-3 w-full md:w-10/12 xl:w-8/12">
				<div className="flex flex-col gap-1">
					<p className="text-lg font-semibold whitespace-nowrap">
						{currentChapter.title}
					</p>
					<p className="text-xs text-neutral-600 flex items-center">
						Chapitre&nbsp; {currentChapter.id} <Dot /> Test&nbsp;
					</p>
				</div>
				<div className="px-3 flex flex-col gap-1.5 items-center justify-start w-full">
					<div className="self-end font-medium">
						{asked.length}
						{/* <span className="text-neutral-400">
							/{Math.max(MAX_QUESTIONS)}
						</span> */}
					</div>
					{/* <div className="grid grid-cols-20 gap-1 w-full">
						{pool.map((_, i) => (
							<div
								key={i}
								className={`h-1 rounded-full ${i <= asked.length - 1 ? "bg-blue-600" : "bg-neutral-300"
									}`}
							/>
						))}
					</div> */}
				</div>
			</div>

			{/* Question Block */}
			<div className="flex flex-col gap-10 bg-white p-5 sm:p-10 rounded-md w-full md:w-10/12 xl:w-8/12">
				<div className="flex flex-col gap-3">
					<p className="text-neutral-600 text-lg font-medium">
						Question {asked.length - 1 + 1} :
					</p>
					<ReactMarkdown
						remarkPlugins={[remarkMath]}
						rehypePlugins={[rehypeKatex]}
					>
						{/* if your stored question is an object with .question use currentQ.question */}
						{currentQ.question || currentQ}
					</ReactMarkdown>
				</div>

				<div className="flex flex-col gap-5">
					{currentQ.choices.map((opt, i) => {
						const isSelected = selectedOption === i;
						const isCorrect = validated && i === currentQ.correct_choice;
						const isWrong = validated && isSelected && !isCorrect;

						return (
							<button
								type="button"
								key={i}
								onClick={() => !validated && setSelectedOption(i)}   // lock selection after validation
								className={`flex gap-2.5 items-center border-2 rounded-md transition-all
          ${isCorrect
										? "border-green-600 bg-green-50"
										: isWrong
											? "border-red-600 bg-red-50"
											: isSelected
												? "border-blue-600 bg-blue-50"
												: "border-neutral-200 hover:border-blue-600"}`}
							>
								<div
									className={`py-2.5 px-4 font-medium rounded-l-md
            ${isCorrect
											? "bg-green-600 text-white"
											: isWrong
												? "bg-red-600 text-white"
												: isSelected
													? "bg-blue-600 text-white"
													: "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white"}`}
								>
									{String.fromCharCode(65 + i)}
								</div>

								<div
									className={
										isCorrect
											? "text-green-700"
											: isWrong
												? "text-red-700"
												: isSelected
													? "text-blue-700"
													: ""
									}
								>
									<ReactMarkdown
										remarkPlugins={[remarkMath]}
										rehypePlugins={[rehypeKatex]}
									>
										{opt}
									</ReactMarkdown>
								</div>
							</button>
						);
					})}
				</div>


				{/* Navigation Buttons */}
				<div className="flex justify-between mt-5">
					{validated ? (
						<button
							onClick={next}
							disabled={selectedOption === null}
							className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
						>
							{asked.length >= MAX_QUESTIONS ? "Terminer" : "Suivant"}
						</button>
					) : (
						<button
							onClick={showCorrectAnswer}
							disabled={selectedOption === null}
							className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
						>
							Valider
						</button>
					)}
				</div>


			</div>
			<PopupModal
				isOpen={showPopup}
				theta={theta}
				onClose={handle_close_popup}
			/>
		</section>
	);
}
