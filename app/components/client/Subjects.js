import { faSquareRootVariable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Atom, BrainCircuit, Dna, FlaskConical, Languages } from "lucide-react";
import Link from "next/link";

export default function Subjects() {
	return (
		<section className="px-0 md:px-5 py-5 flex flex-col gap-6">
			{/* Title + Cards */}
			<div className="flex flex-col gap-6">
				{/* Titles */}
				<div className="flex flex-col gap-1.5">
					<h1 className="font-bold text-3xl">Mes matières</h1>
					<p className="text-neutral-500 text-[13px] sm:text-sm">
						Accède facilement à toutes tes matières
					</p>
				</div>
				{/* Filter */}
				<div className="hidden min-[500px]:flex gap-2 mb-5">
					<div className="w-26 cursor-pointer hover:text-white hover:bg-skblue transition-all duration-300 rounded-xs text-center py-2 bg-skblue text-white border border-neutral-200">
						Toutes
					</div>
					<div className="w-26 cursor-pointer hover:text-white hover:bg-skblue transition-all duration-300 rounded-xs text-center py-2 bg-white border border-neutral-200">
						Sciences
					</div>
					<div className="w-26 cursor-pointer hover:text-white hover:bg-skblue transition-all duration-300 rounded-xs text-center py-2 bg-white border border-neutral-200">
						Languages
					</div>
					<div className="w-26 cursor-pointer hover:text-white hover:bg-skblue transition-all duration-300 rounded-xs text-center p-2 bg-white border border-neutral-200">
						Humanités
					</div>
				</div>
				{/* Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
					{/* Card One */}
					<Link
						href={`/subjects/math`}
						className="flex flex-col flex-grow-1 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-xs overflow-hidden"
					>
						<div className="bg-white flex justify-center items-center h-[160px]">
							<FontAwesomeIcon
								icon={faSquareRootVariable}
								className="w-20 text-[#135EA5]"
							/>
						</div>
						<div className="bg-[#135EA5] text-white p-3 py-5 flex flex-col gap-0.5">
							<h3 className="font-semibold">Mathématiques</h3>
							<p className="text-sm text-neutral-200">12 Leçon</p>
						</div>
					</Link>
					{/* Card Two */}
					<Link
						href={`#`}
						className="flex flex-col flex-grow-1 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-xs overflow-hidden"
					>
						<div className="bg-white flex justify-center items-center h-[160px]">
							<Atom size={80} className="text-[#455A64]" />
						</div>
						<div className="bg-[#455A64] text-white p-3 py-5 flex flex-col gap-0.5">
							<h3 className="font-semibold">Physique</h3>
							<p className="text-sm text-neutral-200">7 Leçon</p>
						</div>
					</Link>
					{/* Card Three */}
					<Link
						href={`#`}
						className="flex flex-col flex-grow-1 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-xs overflow-hidden"
					>
						<div className="bg-white flex justify-center items-center h-[160px]">
							<FlaskConical size={80} className="text-[#306D8B]" />
						</div>
						<div className="bg-[#306D8B] text-white p-3 py-5 flex flex-col gap-0.5">
							<h3 className="font-semibold">Chimie</h3>
							<p className="text-sm text-neutral-200">8 Leçon</p>
						</div>
					</Link>
					{/* Card Four */}
					<Link
						href={`#`}
						className="flex flex-col flex-grow-1 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-xs overflow-hidden"
					>
						<div className="bg-white flex justify-center items-center h-[160px]">
							<Dna size={80} className="text-[#02874F]" />
						</div>
						<div className="bg-[#02874F] text-white p-3 py-5 flex flex-col gap-0.5">
							<h3 className="font-semibold">S.V.T</h3>
							<p className="text-sm text-neutral-200">9 Leçon</p>
						</div>
					</Link>
					{/* Card Five */}
					<Link
						href={`#`}
						className="flex flex-col flex-grow-1 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-xs overflow-hidden"
					>
						<div className="bg-white flex justify-center items-center h-[160px]">
							<Languages size={80} className="text-[#8E24AA]" />
						</div>
						<div className="bg-[#8E24AA] text-white p-3 py-5 flex flex-col gap-0.5">
							<h3 className="font-semibold">Anglais</h3>
							<p className="text-sm text-neutral-200">7 Leçon</p>
						</div>
					</Link>
					{/* Card Six */}
					<Link
						href={`#`}
						className="flex flex-col flex-grow-1 shadow-[3px_3px_10px_0px_rgba(0,_0,_0,_0.1)] rounded-xs overflow-hidden"
					>
						<div className="bg-white flex justify-center items-center h-[160px]">
							<BrainCircuit size={80} className="text-[#006064]" />
						</div>
						<div className="bg-[#006064] text-white p-3 py-5 flex flex-col gap-0.5">
							<h3 className="font-semibold">Philosophie</h3>
							<p className="text-sm text-neutral-200">4 Leçon</p>
						</div>
					</Link>
				</div>
			</div>
		</section>
	);
}
