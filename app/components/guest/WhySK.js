import { FlaskConical, Loader, NotepadText, Waypoints } from "lucide-react";
import Button from "../ui/Button";

export default function WhySK() {
	return (
		<section
			id="services"
			className="bg-skblue-second dark:bg-skblack-second w-full flex justify-center px-5 xl:px-0 py-10 text-[14px] lg:text-[16px] min-h-screen"
		>
			<div className="flex flex-col  sm:flex-row justify-between items-center gap-0 sm:gap-3 md:gap-10 w-full lg:w-11/12 xl:w-10/12 max-w-[1260px]">
				{/* Left Column */}
				<img
					src="/sk/student_2.webp"
					alt="Student 2"
					className="max-w-[350px] w-2/3 min-[460px]:w-2/3 sm:w-1/2  md:w-2/4  -mb-5 sm:-mb-0 inline-block dark:hidden"
				/>
				<img
					src="/sk_dark/student_2.webp"
					alt="Student 2"
					className="max-w-[350px] w-2/3 min-[460px]:w-2/3 sm:w-1/2  md:w-2/4  -mb-5 sm:-mb-0 hidden dark:inline-block"
				/>
				{/* Right Column */}
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-4">
						<h2 className="text-3xl md:text-4xl xl:text-5xl font-bold">
							Pourquoi <span className="text-skblue">Skoolution?</span>
						</h2>
						<p className="text-skgray dark:text-skgray-second">
							La plateforme qui s'adapte à vos besoins pour améliorer vos notes
						</p>
					</div>
					<div className="grid grid-cols-2 gap-5 sm:gap-10">
						{/* First */}
						<div className="flex flex-col gap-4">
							<div className="bg-skblue-third w-fit p-4 text-skblue rounded-sm">
								<FlaskConical />
							</div>
							<h3 className="font-bold">Suivi personnalisé</h3>
							<p className="text-skgray dark:text-skgray-second -my-1.5 max-w-[300px]">
								Des tests qui s'adaptent à ton niveau et te guident étape par
								étape.
							</p>
						</div>
						{/* Second */}
						<div className="flex flex-col gap-4">
							<div className="bg-skblue-third w-fit p-4 text-skblue rounded-sm">
								<NotepadText />
							</div>
							<h3 className="font-bold">Rapports de progression</h3>
							<p className="text-skgray dark:text-skgray-second -my-1.5 max-w-[300px]">
								Identifie tes points faibles et améliore tes compétences grâce à
								un suivi en temps réel.
							</p>
						</div>
						{/* Third */}
						<div className="flex flex-col gap-4">
							<div className="bg-skblue-third w-fit p-4 text-skblue rounded-sm">
								<Loader />
							</div>
							<h3 className="font-bold">Programme officiel marocain</h3>
							<p className="text-skgray dark:text-skgray-second -my-1.5 max-w-[300px]">
								Des contenus alignés sur les référentiels du Ministère de
								l'Éducation.
							</p>
						</div>
						{/* Fourth */}
						<div className="flex flex-col gap-4">
							<div className="bg-skblue-third w-fit p-4 text-skblue rounded-sm">
								<Waypoints />
							</div>
							<h3 className="font-bold">Flexibilité</h3>
							<p className="text-skgray dark:text-skgray-second -my-1.5 lg:max-w-[300px]">
								Révisez quand vous voulez, où vous voulez, sur tous vos
								appareils.
							</p>
						</div>
					</div>
					<Button
						href="#fonctionnalité"
						text="voir plus"
						bg="bg-white"
						color="text-skblue"
						addStyle="w-[160px] hover:inset-shadow-[0_25px_25px] hover:inset-shadow-black/12"
					/>
				</div>
			</div>
		</section>
	);
}
