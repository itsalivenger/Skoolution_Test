import { faSquareRootVariable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	ICertificatePaperOutline,
	IExamMultipleChoiceOutline,
	IExamQualificationOutline,
} from "healthicons-react";
import {
	Atom,
	Brain,
	BrainCircuit,
	ClipboardPenLine,
	Dna,
	FlaskConical,
	Languages,
} from "lucide-react";
import Link from "next/link";

export default function Competences() {
	return (
		<section className="px-0 md:px-5 py-5 flex flex-col gap-6">
			{/* Title + Cards */}
			<div className="flex flex-col gap-6">
				{/* Titles */}
				<div className="flex flex-col gap-1.5">
					<h1 className="flex gap-1 font-bold text-xl sm:text-3xl">
						Mathématiques{" "}
						<FontAwesomeIcon icon={faSquareRootVariable} className="w-8" />
					</h1>
					<p className="text-neutral-500 text-[13px] sm:text-sm">
						Défie-toi avec des exercices et des quiz adaptés.
					</p>
				</div>
				{/* Filter */}
				<div className="flex gap-2 mb-5">
					<div className="w-26 cursor-pointer hover:text-white hover:bg-skblue transition-all duration-300 rounded-xs text-center py-2 bg-skblue text-white border border-neutral-200">
						Toutes
					</div>
					<div className="w-10 min-[465px]:w-38  cursor-pointer hover:text-white hover:bg-skblue transition-all duration-300 rounded-xs text-center py-2 bg-white border border-neutral-200">
						<span className="hidden min-[465px]:inline">1er Semester</span>
						<span className="inline min-[465px]:hidden">S1</span>
					</div>
					<div className="w-10 min-[465px]:w-38  cursor-pointer hover:text-white hover:bg-skblue transition-all duration-300 rounded-xs text-center py-2 bg-white border border-neutral-200">
						<span className="hidden min-[465px]:inline">2ème Semester</span>
						<span className="inline min-[465px]:hidden">S2</span>
					</div>
				</div>
				{/* Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Card 1 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">les ensembles de définition</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">20%</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-[20%]"></div>
								</div>
							</div>
						</div>
					</Link>
					{/* Card 2 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row  gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">
								Calculer des limites de fonctions...
							</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">2/5</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-[40%]"></div>
								</div>
							</div>
						</div>
					</Link>
					{/* Card 3 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row  gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">
								Calculer des limites sous la for...
							</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">2/3</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-2/3"></div>
								</div>
							</div>
						</div>
					</Link>
					{/* Card 4 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row  gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">Calculer des limites grâce au...</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">0/5</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-[0%]"></div>
								</div>
							</div>
						</div>
					</Link>
					{/* Card 5 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row  gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">
								Calculer des limites à gauche et...
							</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">0/3</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-[0%]"></div>
								</div>
							</div>
						</div>
					</Link>
					{/* Card 6 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row  gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">
								 les caractéristiques de la conti...
							</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">0/3</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-[0%]"></div>
								</div>
							</div>
						</div>
					</Link>
					{/* Card 7 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row  gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">
								les caractéristiques de la contin...
							</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">20%</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-[0%]"></div>
								</div>
							</div>
						</div>
					</Link>
					{/* Card 8 */}
					<Link
						href={`#`}
						className="flex flex-col min-[465px]:flex-row  gap-0 bg-white shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)]"
					>
						<div className="flex justify-center items-center p-5 bg-skblue/10">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-9 text-[#135EA5]"
							/>
						</div>
						<div className="flex flex-col gap-1 p-3 flex-grow-1">
							<p className="font-semibold">Déterminer graphiquement si un...</p>
							<p className="text-neutral-400 text-xs">3 Test</p>
							<div>
								<p className="flex justify-end text-xs text-neutral-400">0/5</p>
								<div className="bg-neutral-200 h-3 w-full mt-1">
									<div className="bg-skblue h-3 w-[0%]"></div>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}
