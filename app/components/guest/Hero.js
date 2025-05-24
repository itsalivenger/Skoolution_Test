import { Award, Check, GraduationCap, Send } from "lucide-react";
import Button from "../ui/Button";

export default function Hero() {
	return (
		<section
			id="accueil"
			className="
			w-full px-5 py-10 xl:px-0 lg:w-11/12 xl:w-10/12 max-w-[1260px] 
			min-h-[calc(100dvh-64px)] flex flex-col-reverse gap-6 sm:gap-0 sm:flex-row 
			justify-center sm:justify-between items-center"
		>
			{/* Left Section */}
			<div className="z-10 flex flex-col gap-2 sm:gap-6">
				{/* First */}
				<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold flex flex-col gap-1 sm:gap-2 ">
					<p className="text-nowrap">Révisez intelligemment,</p>
					<p className="text-nowrap">progressez rapidement</p>
					<p className="text-nowrap">
						avec <span className="text-skblue">Skoolution.</span>
					</p>
				</h2>
				{/* Second */}
				<div className="flex flex-col gap-2">
					<p className="text-skgray dark:text-skgray-second block w-full sm:w-7/8 md:w-5/6">
						Bienvenue sur SKOOLUTION, la plateforme d’évaluation en ligne pour
						les lycéens au Maroc.
					</p>
					<div className="flex items-center  gap-2">
						<img src="/morocco.webp" alt="Moroccan Flag" />
						<p className="text-skgray dark:text-skgray-second text-[14px]">
							Programme officiel 2024-2025
						</p>
					</div>
				</div>
				{/* Third */}
				<div className="flex gap-3">
					<Button
						href="/login"
						color="text-white"
						bg="bg-skblue"
						text="Commencer"
					/>
					<Button
						href="/login"
						color="text-skblue"
						bg="bg-white"
						text="Testez gratuitement"
					/>
				</div>
			</div>
			{/* Right Section */}
			<div className="flex flex-row-reverse justify-center sm:justify-start">
				<img
					src="/sk/student_1.webp"
					alt="Student"
					className="w-7/8 min-[460px]:w-2/3 sm:w-full md:w-3/4 inline-block dark:hidden"
				/>
				<img
					src="/sk_dark/student_1.webp"
					alt="Student"
					className="w-7/8 min-[460px]:w-2/3 sm:w-full md:w-3/4 hidden dark:inline-block"
				/>
			</div>
		</section>
	);
}
